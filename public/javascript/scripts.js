// Hide forms
$("#create-group").hide();
$("#join-group").hide();
$("#add-mem-btn").hide();
$("#add-member").hide();
$("#current-members").hide();

$( "#create-btn" ).click(function() {
  $("#create-group").show();
  $("#join-group").hide();
  $("#add-member").hide();
  $("#add-mem-btn").hide();
});

$( "#join-btn" ).click(function() {
  $("#join-group").show();
  $("#create-group").hide();
  $("#add-member").hide();
  $("#add-mem-btn").hide();
});

$( "#create-submit" ).click(function() {
  //firebase code to check group availability

  //firebase code to add credentials to database

  //show and hide necessary fields
  $("#add-mem-btn").show();
  $("#current-members").show();
  $("#create-group").hide();
  $("#join-group").hide();
});

$( "#join-submit" ).click(function() {
  //firebase code to check credentials

  //firebase code to update necessary fields

  //show and hide necessary fields
  $("#add-mem-btn").show();
  $("#current-members").show();
  $("#create-group").hide();
  $("#join-group").hide();
});

$( "#add-mem-btn" ).click(function() {
  //show add member form
  $("#add-member").show();
});

$("#add-mem-submit").click(function() {
  //firebase code to add members

  //hide form once member is added to list
  $("#add-member").hide();
});
