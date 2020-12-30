'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

const {checkRoleGroup,listRoleGroup,roleGroupByName} = require('./implementation');
const {getEnv,postEnv,postOrg,getOrg} = require('./orgEnvImplementation');

module.exports.anypointEnvGET = function anypointEnvGET (req, res, next) {
  Default.anypointEnvGET()
    .then(function (response) {
      getEnv()
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.anypointEnvPOST = function anypointEnvPOST (req, res, next) {
  var generated = req.swagger.params['generated'].value;
  Default.anypointEnvPOST(generated)
    .then(function (response) {
      postEnv(generated)
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.anypointOrgGET = function anypointOrgGET (req, res, next) {
  Default.anypointOrgGET()
    .then(function (response) {
      getOrg()
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.anypointOrgPOST = function anypointOrgPOST (req, res, next) {
  var generated = req.swagger.params['generated'].value;
  Default.anypointOrgPOST(generated)
    .then(function (response) {
      postOrg(generated)
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.anypointRolePOST = function anypointRolePOST (req, res, next) {
  var generated = req.swagger.params['generated'].value;
  Default.anypointRolePOST(generated)
    .then(function (response) {
      //postRoles(generated)
      checkRoleGroup(generated)
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.anypointRoleRoleGroupGET = function anypointRoleRoleGroupGET (req, res, next) {
  Default.anypointRoleRoleGroupGET()
    .then(function (response) {
      listRoleGroup()
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.anypointRoleRoleGroupRoleGroupNameRolesGET = function anypointRoleRoleGroupRoleGroupNameRolesGET (req, res, next) {
  var roleGroupName = req.swagger.params['roleGroupName'].value;
  Default.anypointRoleRoleGroupRoleGroupNameRolesGET(roleGroupName)
    .then(function (response) {
      roleGroupByName(roleGroupName)
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
