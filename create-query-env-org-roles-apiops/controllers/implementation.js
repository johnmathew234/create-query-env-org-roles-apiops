
const request = require('request')
const config = require('config')
const querystring = require('querystring')

//const {getEnv} = require('./orgEnvImplementation');

//function to generate authorization token
function generateToken(cb){
  //console.log("tokennnnnnnnnn")
    request.post(
        config.get('anypoint.host1'),
        {
          json: {
          "username" : config.get('anypoint.username'),
          "password" : config.get('anypoint.password')
      },
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          console.log(`statusCode: ${res.statusCode}`)
          //console.log(body)     // token hidden from console
          console.log("TOKEN GENERATED FOR AUTHENTICATION")
          console.log("----------------------------------------------")
          cb(body)
        }
      )
}

//function to get org id
function getOrgId(token,cb){

  request.get({
  "headers": { "content-type": "application/json","Authorization": `Bearer ${token}` },
  "url": config.get('anypoint.host2') +  config.get('anypoint.path2')

},
(error, res, body) => {
  if (error) {
      console.error(error)
      return
  }
  //console.log(`statusCode: ${res.statusCode}`)
  //console.log("LIST OF ENVs")
  console.log("----------------------------------------------")
  //console.log(body)
  const resBody = JSON.parse(body)
  var orgId = resBody.user.organization.id
  cb(orgId)
  
  })

}

function getEnvDetails(token,cb){
  getOrgId(token,(orgId)=>{
    //console.log(orgId)
    request.get({
      "headers": { "content-type": "application/json","Authorization": "Bearer " + token},
      "url": config.get('anypoint.host') + orgId  + config.get('anypoint.path')
    },
    (error, res, body) => {
      if (error) {
        console.error(error)
        return
      }
      console.log(`statusCode: ${res.statusCode}`)
      console.log("LIST OF ENVs")
      console.log("----------------------------------------------")
      var listOfEnvs = JSON.parse(body)
      console.log(listOfEnvs.data)
      console.log("----------------------------------------------")
      cb(listOfEnvs.data)
              
    }
    )
  
  })
}

//function to list the role groups in platform
function getRoleGroups(token,orgId,cb){

  //console.log(orgId)
  request.get({
    "headers": {"content-type": "application/json","Authorization": "Bearer " + token},
    "url": config.get('anypoint.host2') + config.get('anypoint.getRoleGroupsPath')  + orgId + config.get('anypoint.getRoleGroupsSubpath')
  },
  (error, res, body) => {
    if (error){
      console.error(error)
      return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log("LIST OF ROLE-GROUPS")
    console.log("----------------------------------------------")
    //console.log(orgId)
    var roleGroup = JSON.parse(body)
    console.log(roleGroup.data)
    console.log("----------------------------------------------")
    if(cb){
      cb(roleGroup,res.statusCode)
      //console.log(res)
    }
  })
}

//function to create role group
//to add role grp name (pass name) - respone contain role grp id
function addRoleGroup(generated,token,orgId,cb){

  request.post({
    "headers": { "content-type": "application/json","Authorization": "Bearer " + token },
    "url": config.get('anypoint.host2') + config.get('anypoint.getRoleGroupsPath')  + orgId + config.get('anypoint.getRoleGroupsSubpath'),
    "json" : {
        "name" : (generated.name),
        "description" : (generated.description)
    }

    },
    (error, res, body) => {
      if (error) {
      console.error(error)
      return
      }
      console.log(`statusCode: ${res.statusCode}`)
      console.log(body)
      var roleGpId = body.role_group_id
      console.log("----------------------------------------------")
      //var listOfRoleGroups = JSON.parse(body)
      if(cb)
      cb(roleGpId,res.statusCode)
      
})
}

//get the id of the role to be inserted
//gets all roles with id. match the given role with the response
function getRoleId(generated,token,cb){
  request.get({
    "headers": { "Authorization": "Bearer " + token },
    "url": config.get('anypoint.host2') + config.get('anypoint.getAllRoles'),
    "qs" : {
        "name" : generated.role
    }
  },
  (error, res, body) => {
    if (error) {
      console.error(error)
      return
    }
    console.log(`statusCode: ${res.statusCode}`)
    var roleIdRes = JSON.parse(body)
    //console.log(roleIdRes)
    var roleId = roleIdRes.data
    //console.log("^^^^^^^^^")
    //console.log(roleId[0].role_id)
    var finalRoleId = roleId[0].role_id
    var roleGpId = body.role_group_id
    //console.log(generated.role)
    //console.log("----------------------------------------------")
        //console.log(generated.name)

        //console.log(orgId)
        //var listOfRoleGroups = JSON.parse(body)
        //console.log(listOfRoleGroups.data)
    if(cb)
      cb(finalRoleId,res.statusCode)
        //console.log(res)
  })
}

//function to add role using envid,grpid,roleid
function postRole(env,token,orgId,roleGroupId,finalRoleId){
  getEnvDetails(token,(listOfEnvs)=>{
    //console.log(listOfEnvs)
    var envid = null
    listOfEnvs.forEach(function(item){
      //console.log(item.name)
      //console.log(env)
      if(item.name == env){
        //console.log("inside if condition")
        envid = item.id
      }
    })
    //console.log("envid : ",envid)
    //console.log("orgid : ",orgId)
    //console.log("finalRoleId : ",finalRoleId)
    //console.log("roleGroupId : ",roleGroupId)
    //console.log("ROLE CREATED")
    request.post({
      "headers": { "content-type": "application/json","Authorization": "Bearer " + token},
      "url": "https://anypoint.mulesoft.com/accounts/api/organizations/"  + orgId + "/rolegroups/" + roleGroupId + "/roles",
      "json" : [
          { "role_id": finalRoleId,
          "context_params": {
                  "org": orgId,
                  "envId": envid
              }
            }
        ]
    },
    (error, res, body) => {
      if (error) {
        console.error(error)
        return
      }
      console.log(`statusCode: ${res.statusCode}`)
      if(res.statusCode == 200)
        console.log("ROLE CREATED")
      else
      console.log("ROLE NOT CREATED")
    })

  })
}

//function to add roles to group after checking if thr role group name passed exists or not. 
//If not then the role group is also created.
function checkRoleGroup(generated){

  generateToken((body)=>{
    const token = body.access_token
    getOrgId(token,(orgId)=>{
      getRoleGroups(token,orgId,(roleGroup)=>{
        //console.log("roleGroup : ",roleGroup)
        var flag = 0 //assume no group with given name exists
        var roleGroupId = null
        roleGroup.data.forEach(function(item){
          if (item.name == generated.name){
            flag = 1 //group exists
            roleGroupId = item.role_group_id
          }
        })
        //console.log("flag : ",flag)
        if(flag == 1){
          //add role alone
          //console.log("roleGroupId : ",roleGroupId)
          getRoleId(generated,token,(finalRoleId)=>{
            postRole(generated.environment,token,orgId,roleGroupId,finalRoleId)
          })
        }
        else{
          //add role and role group
          //console.log("roleGroupId : null")
          addRoleGroup(generated,token,orgId,(roleGroupId)=>{
            getRoleId(generated,token,(finalRoleId)=>{
              postRole(generated.environment,token,orgId,roleGroupId,finalRoleId)
            })

          })
        }

      })
    })
  })

}
 
function listRoleGroup(){
  generateToken((body)=>{
    const token = body.access_token
    getOrgId(token,(orgId)=>{
      getRoleGroups(token,orgId,(roleGroup)=>{
        //console.log("roleGroup : ",roleGroup)
      })
    })
  })
}

function roleGroupByName(roleGroupName){
  generateToken((body)=>{
    const token = body.access_token
    getOrgId(token,(orgId)=>{
      getRoleGroups(token,orgId,(roleGroup)=>{
        //console.log("roleGroup : ",roleGroup)
        //console.log("==================================")
        //console.log(roleGroupName)
        var flag = 0
        var roleGrpId = null
        roleGroup.data.forEach(function(item){
          if (item.name == roleGroupName){
            //console.log(item)
            flag = 1
            roleGrpId = item.role_group_id
          }
        })
        
        if (flag == 1){
          request.get({
            "headers": { "content-type": "application/json","Authorization": "Bearer " + token},
            "url": "https://anypoint.mulesoft.com/accounts/api/organizations/"  + orgId + "/rolegroups/" + roleGrpId + "/roles"
             },
          (error, res, body) => {
            if (error) {
              console.error(error)
              return
            }
            console.log(`statusCode: ${res.statusCode}`)
            //var rbyname = 
            console.log("ROLES UNDER THE GIVEN ROLE GROUP")
            console.log("----------------------------------------------")
            console.log(JSON.parse(body))
            console.log("----------------------------------------------")
            //console.log(rbyname)
            }
          )
        }
        else {
          console.log("The group name " + roleGroupName + " doesnt exist")
        }

      })
    })
  })
}

module.exports={generateToken,getOrgId,getEnvDetails,checkRoleGroup,listRoleGroup,roleGroupByName}