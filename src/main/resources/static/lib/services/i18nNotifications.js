angular.module('services.i18nNotifications', ['services.notifications', 'services.localizedMessages']);
angular.module('services.i18nNotifications').factory('i18nNotifications', ['localizedMessages', 'notifications', '$timeout', 'APP_CONFIG', function (localizedMessages, notifications, $timeout, LMS_CONFIG) {
	
  var prepareNotification = function(msgKey, type, interpolateParams, otherProperties) {
     return angular.extend({
       message: localizedMessages.get(msgKey, interpolateParams),
       type: type
     }, otherProperties);
  };

  var I18nNotifications = {
    pushSticky:function (msgKey, type, interpolateParams, otherProperties) {
      return notifications.pushSticky(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    pushForCurrentRoute:function (msgKey, type, interpolateParams, otherProperties) {
    	$timeout(removeAlert, APP_CONFIG.timeOutNotification);
    	function removeAlert(){
    		jQuery('.alert-notification').slideUp();
    	} 
    	return notifications.pushForCurrentRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    pushForNextRoute:function (msgKey, type, interpolateParams, otherProperties) {
      return notifications.pushForNextRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    getCurrent:function () {
      return notifications.getCurrent();
    },
    remove:function (notification) {
      return notifications.remove(notification);
    }
  };

  return I18nNotifications;
}]);