$(document).ready(function () {
  $("#twitForm").submit(function (event) {
    event.preventDefault();
    $.ajax({
      url: "/twits",
      method: "post",
      data: { twit: $("#twitForm textarea").val() }
    }).done(function () {
      location.reload();
    }).catch(function (error) {
      console.log(error);
      $(".alert .alert-text").text(error.status + ": " + error.responseJSON.error);
      $(".alert").removeClass("d-none");
    });
  });
});
