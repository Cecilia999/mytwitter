$(document).ready(function() {
  $("#twitForm").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: "/twits",
      method: "post",
      data: { twit: $("#twitForm textarea").val() }
    }).done(function() {
      location.reload();
    });
  });
});
