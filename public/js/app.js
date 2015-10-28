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

  // login modal
  $('#login-button').on('submit', function(e){
  		// e.preventDefault();
  		$('login-modal').modal();
  		console.log('clicked on login ');
  });

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
  $('#new-todo').keydown(function (e) {
    if(e.keyCode == 13) {
      console.log('new todo made');
      var newTodo = $(this).val();
      // $('#new-todo').val('');
      console.log('this is a new to do: ' ,newTodo);

      $.ajax({
        url:'/days',
        type: "POST", 
        data: newTodo
      })
      .done(function(data) {
        console.log('my posted todo: ', newTodo);
        var postedTodo = "<li class='list-group-item'>" + newTodo + "<span data-id='new-todo'class='close delete'>x</span></li>";
        $('#new-todos').append(postedTodo);     
      })
      .fail(function(data) {
        console.log('failed to post');
      });


      // $.post('/days', function(data) {
      //   // window.location.href = '/days/' + data._id;
      // });
    }

  });

  //show stored plans on home page
  

});


