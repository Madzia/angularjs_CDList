module.exports = function (Data){

  return {
    //users
    'addUser': function ( user, callback ) {
      user.id = new Date().getTime();
      Data.insertData('user', user, callback);
    },
    'findAllUsers': function ( callback ) {
      Data.findAllData('user', undefined, callback);
    },
    'findUserById': function ( id, callback ) {
      Data.findData('user', { 'id': id }, callback);
    },
    'findUserByLogin': function( login, callback ) {
      Data.findData('user', { 'login': login }, callback);
    },
    //categories
    'addCategory': function ( category, callback ) {
      category.id = new Date().getTime();
      Data.insertData('category', category, callback);
    },
    'findAllCategories': function ( callback ) {
      Data.findAllData('category', undefined, callback);
    },
    'editCategory': function ( category, callback ) {
      Data.updateData('category', { 'id': category.id },
      { $set: { 'name': category.name } }, callback);
    },
    'rmCategory': function ( category, callback ) {
      Data.removeData('category', { 'id': category.id }, callback);
    },
    //cds
    'addCd': function ( cd, callback ) {
      cd.id = new Date().getTime();
      Data.insertData('cd', cd, callback);
    },
    'findAllCds': function ( callback ) {
      Data.findAllData('cd', undefined, callback);
    },
    'editCd': function ( cd, callback ) {
      Data.updateData('cd', { 'id': cd.id },
      { $set: { 'name': cd.name, 'url': cd.url } }, callback);
    },
    'rmCd': function ( cd, callback ) {
      Data.removeData('cd', { 'id': cd.id }, callback);
    }
  }
};
