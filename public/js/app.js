// CLIENT-SIDE JAVASCRIPT
// On page load
$(document).ready(function(){
  console.log('Hey, Earth!');

  $('#signup-button').on('submit', function(e){
  		// e.preventDefault();
  		$('signup-modal').modal();
  		console.log('clicked on sign up');
  });

  $('#login-button').on('submit', function(e){
  		// e.preventDefault();
  		$('login-modal').modal();
  		console.log('clicked on login ');
  });

  $('#popover').popover({html:true});
    
});

