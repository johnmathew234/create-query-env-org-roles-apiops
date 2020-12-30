const request = require('request')
const config = require('config')
const querystring = require('querystring')

const {generateToken,getOrgId,getEnvDetails} = require('./implementation');

//function to get env

  function getEnv(){
    generateToken((body)=>{
      const token = body.access_token
      getEnvDetails(token,(listOfEnvs)=>{
        //console.log("************listOfEnvironments***************")
        //console.log(listOfEnvs)
      })
    })
  }
  
//function to create environment by passing env name
function postEnv(generated){
    generateToken((body)=>{
  
      const token = body.access_token
  
      getOrgId(token,(orgId)=>{
        //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  
        request.post({
          "headers": { "content-type": "application/json","Authorization": `Bearer ${token}` },
          "url": config.get('anypoint.host') + orgId  + config.get('anypoint.path'),
          "body": JSON.stringify(generated)
  
        },
        (error, res, body) => {
            if (error) {
              console.error(error)
              return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log("ENVIRONMENT CREATED")
            console.log("----------------------------------------------")
            var postOrgRes = JSON.parse(body)
            console.log(postOrgRes)
            
          }
        )
      })
            
    })
}
  
//function to create org
function postOrg(generated){
    
    var orgName = generated.name
    //console.log(orgName)
    generateToken((body)=>{
      const token = body.access_token
      //to get complete user/org details
      request.get({
        "headers": { "content-type": "application/json","Authorization": `Bearer ${token}` },
        "url": config.get('anypoint.host2') + config.get('anypoint.path2')
      },
      (error, res, body) => {
        if (error) {
          console.error(error)
          return
        }
        //console.log(`statusCode: ${res.statusCode}`)
        //console.log(body)
        var obj = JSON.parse(body)
        var ownerId = obj.user.id
        //console.log(typeof obj.user.id)
        console.log("----------------------------------------------")
        //console.log("ORG CREATED")

        getOrgId(token,(orgId)=>{
            request.post({
                "headers": { "content-type": "application/json","Authorization": `Bearer ${token}` },
                "url": config.get('anypoint.host'),
                "json": {
                    "name": orgName,
                    "ownerId" : ownerId,
                    "parentOrganizationId" : orgId
                }
            },
            (error, res, body) => {
                if (error) {
                console.error(error)
                return
                }
            console.log(`statusCode: ${res.statusCode}`)
            if(res.statusCode == 201){
              //console.log(body)
              //console.log()
              console.log("ORGANIZATION CREATED")
            }
            else{
              console.log(body)
            } 
              
          }
          )
  
        })
              
    
      })
    })
}
  
//function to list of org and details
function getOrg(){
  
    generateToken((body)=>{
      request.get({
        "headers": { "content-type": "application/json","Authorization": `Bearer ${body.access_token}` },
        "url": "https://anypoint.mulesoft.com" +  config.get('anypoint.path2')
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          console.log(`statusCode: ${res.statusCode}`)
          console.log("LIST OF ORGs")
          console.log("----------------------------------------------")
          //console.log(JSON.parse(body))
          var getOrgRes = JSON.parse(body)
          var getOrgRes1 = getOrgRes.user.contributorOfOrganizations 
            
          const getOrgRes2 = getOrgRes1.map(item => {
          const container = {};
          container.id = item.id;
          container.name = item.name;
          container.parentOrg = item.isMaster
          return container;
          })
          console.log(getOrgRes2);
          console.log("----------------------------------------------")
          //console.log(getOrgRes.user.contributorOfOrganizations)
        }
  
      )
    })
}

module.exports={getEnv,postEnv,postOrg,getOrg}