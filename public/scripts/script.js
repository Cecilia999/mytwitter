$(document).ready(function() {
  function renderAllTwits() {
    location.reload();
  }
  $("#twitForm").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: "/twits",
      method: "post",
      data: { twit: $("#twitForm textarea").val() }
    })
      .done(function() {
        location.reload();
      })
      .catch(function(error) {
        flashError(error);
      });
  });

  $(".like-btn").click(function(event) {
    $.ajax({
      url: "/like",
      method: "post",
      data: { twit_id: event.currentTarget.value }
    })
      .done(function() {
        renderAllTwits();
      })
      .catch(function(error) {
        flashError(error);
      });
  });

  function flashError(error) {
    console.log(error);
    $(".alert .alert-text").text(
      error.status + ": " + error.responseJSON.error
    );
    $(".alert").removeClass("d-none");
  }
});
