$(document).ready(function() {
    window.keydown = {};

    function keyName(event) {
      return jQuery.hotkeys.specialKeys[event.which] ||
        String.fromCharCode(event.which).toLowerCase();
    }

    $(document).bind("keydown", function(event) {
      if(keyName(event) === 'up' || keyName(event) === 'down') {
        event.preventDefault();
      } 
      keydown[keyName(event)] = true;
    });

    $(document).bind("keyup", function(event) {
      keydown[keyName(event)] = false;
    });

});
