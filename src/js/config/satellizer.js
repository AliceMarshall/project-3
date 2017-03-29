angular
 .module('dateApp')
 .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  $authProvider.facebook({
    clientId: '297135780706910',
    url: '/api/oauth/facebook'
  });

}
