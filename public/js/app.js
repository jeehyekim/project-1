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

  $('#logout-button').on('submit', function(e){
      e.preventDefault();
      // $('login-modal').modal();
      console.log('clicked on logout ');
  });

  $('#popover').popover({html:true});


  $('body').on('submit', '#new-plan', function(e) {
    e.preventDefault();
    var plan = $(this).serialize();
    console.log(plan);

    $.post('/plans', plan, function(data) {
      console.log("This is the new plan: " + data.title);

      window.location.href = '/plans/' + data._id;
    });
  });


  $('#new-todo').on('submit', function (e) {
    e.preventDefault();

  });

  

});


