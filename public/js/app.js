// CLIENT-SIDE JAVASCRIPT
// On page load
$(document).ready(function(){
  console.log('Hey, Earth!');



  //signup modal
  $('#signup-button').on('submit', function(e){
  		// e.preventDefault();
  		$('signup-modal').modal();
  		console.log('clicked on sign up');
  });


$('#signup').on('submit', function(e) {
  // e.preventDefault();
  var signupData = $('#signup').serialize();

  console.log('signup data is: ' , signupData);

  $.post('/users', signupData, function(err, response) {
    console.log(response);
  });
});


  $('#login-link').on('click', function(e) {
    // e.preventDefault();
    $('#signup-modal').modal('hide');
    $('login-modal').modal('show');
  });

  // login modal
  $('#login-button').on('submit', function(e){
  		// e.preventDefault();
  		$('login-modal').modal();
  		console.log('clicked on login ');
  });

  $('#login').validate();

  $('#signup').validate();

  // logout modal
  $('#logout-button').on('submit', function(e){
      e.preventDefault();
      console.log('clicked on logout ');
  });

  $('#popover').popover({html:true});

  // create new plan 
  $('body').on('submit', '#new-plan', function(e) {
    e.preventDefault();
    var plan = $(this).serialize();
    console.log(plan);

    $.post('/plans', plan, function(data) {
      console.log("This is the new plan: " + data.title);
      // renders new page
      window.location.href = '/plans/' + data._id;
    });
  });

  // test from here
  // create new todos in days
  $('.new-todo').keydown(function (e) {
    if(e.keyCode == 13) {
      var todo = {
        body: $(this).val()
      };
      var dayPanel = $(this).closest(".panel");
      $(this).val('');
      var dayId = $(this).data("id");
      console.log('this is my new to do: ', todo);
     
      $.post('/days/' + dayId + "/todos", todo, function(data) {
        var todo = "<li class='list-group-item'>" + data.body + "<span data-id='new-todo'class='close delete'>x</span></li>";
        console.log("passed in data:", data);
        // $('.panel-heading').siblings('.day-todos').first().append(todo);
        $(dayPanel).append(todo);
        // $('.new-todo')[0].reset();
      });
  

    }

  });

  //display current date/time on home page

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var nowDate = "<h2>" + months[month-1] + " " + day + "," + " " + year + "</h2>";
    // document.write("<b>" months[month] + " " + day + "," + " " + year + "</b>");
    $('#currentdate').append(nowDate);



  //show stored plans on home page
  

});


