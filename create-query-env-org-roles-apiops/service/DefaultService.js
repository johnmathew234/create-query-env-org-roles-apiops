'use strict';


/**
 *
 * returns Object
 **/
exports.anypointEnvGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : "4db24a92-eed0-499d-a44c-402e2208620a",
  "name" : "Design",
  "organizationId" : "734f2b9e-090c-42ee-a81d-80b6e0995b04",
  "isProduction" : false,
  "type" : "design",
  "clientId" : "bdec9c75e90d44cb9116f64196e856bd"
}, {
  "id" : "9a5ac489-0c9b-452b-9ade-af2c8eb2538e",
  "name" : "Production",
  "organizationId" : "734f2b9e-090c-42ee-a81d-80b6e0995b04",
  "isProduction" : true,
  "type" : "production",
  "clientId" : "dd7421e9bf1740fcb97c5a91672b8d93"
}, {
  "id" : "d1235e46-3714-4b3c-a18d-6c86bcd5b6ca",
  "name" : "Sandbox",
  "organizationId" : "734f2b9e-090c-42ee-a81d-80b6e0995b04",
  "isProduction" : false,
  "type" : "sandbox",
  "clientId" : "60089cf90e034f77a66d0308f8127dcb"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * generated Create-env-DT  (optional)
 * returns Object
 **/
exports.anypointEnvPOST = function(generated) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Environment Created"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * returns Object
 **/
exports.anypointOrgGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "Organization Name" : "NJC Labs",
  "id" : "8d0888ce-0877-4524-8983-063be18c34be"
}, {
  "Organization Name" : "core services sub",
  "id" : "aaeefd35-3f99-4193-9495-56dd2560dec4"
}, {
  "Organization Name" : "core services sub1",
  "id" : "c03fd737-9dff-46da-baa3-6a9cdb830010"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * generated Create-org-DT  (optional)
 * returns Object
 **/
exports.anypointOrgPOST = function(generated) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "organization created"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * generated Create-role-DT  (optional)
 * returns Object
 **/
exports.anypointRolePOST = function(generated) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Role Created"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * returns Object
 **/
exports.anypointRoleRoleGroupGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "/resources/examples/get-role-group-response.json";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * roleGroupName String 
 * returns Object
 **/
exports.anypointRoleRoleGroupRoleGroupNameRolesGET = function(roleGroupName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "context_params" : {
      "org" : "8d0888ce-0877-4524-8983-063be18c34be",
      "envId" : "efde6aed-a767-4bc6-9469-34d6e10c0059"
    },
    "created_at" : "2020-12-21T18:21:15.007Z",
    "role_group_assignment_id" : "97813ccd-06bf-4828-80ff-cee4a2b9e35d",
    "role_group_id" : "bf325a11-3317-49c7-8d60-cd569a207241",
    "role_id" : "8f77b09c-5376-4bfd-9e9d-5dfc1b6f7d3e",
    "org_id" : "8d0888ce-0877-4524-8983-063be18c34be",
    "name" : "Anypoint Monitoring User",
    "description" : "Role for Anypoint Monitoring User",
    "internal" : false
  }, {
    "context_params" : {
      "org" : "8d0888ce-0877-4524-8983-063be18c34be",
      "envId" : "efde6aed-a767-4bc6-9469-34d6e10c0059"
    },
    "created_at" : "2020-12-21T18:22:34.202Z",
    "role_group_assignment_id" : "a4ae3460-2c79-48b5-829d-33b0037df79a",
    "role_group_id" : "bf325a11-3317-49c7-8d60-cd569a207241",
    "role_id" : "86895647-efd1-43f2-ab44-3c5d5cc6c5cc",
    "org_id" : "8d0888ce-0877-4524-8983-063be18c34be",
    "name" : "Grant access to secrets",
    "description" : "Gives the ability to browse, read metadata and grant access to secrets in a specific environment.",
    "internal" : false
  } ],
  "total" : 2
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

