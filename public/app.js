/**
 *
 * @param {number} val
 * @returns
 */
function validate1(val) {
  const v1 = document.getElementById("name");
  const v2 = document.getElementById("email");
  const v3 = document.getElementById("mobile");

  let flag1 = true;
  let flag2 = true;
  let flag3 = true;

  if (val >= 1 || val == 0) {
    if (v1.value == "") {
      v1.style.borderColor = "red";
      flag1 = false;
    } else {
      v1.style.borderColor = "white";
      flag1 = true;
    }
  }

  if (val >= 2 || val == 0) {
    if (v2.value == "") {
      v2.style.borderColor = "red";
      flag2 = false;
    } else {
      v2.style.borderColor = "white";
      flag2 = true;
    }
  }

  if (val >= 3 || val == 0) {
    if (v3.value == "") {
      v3.style.borderColor = "red";
      flag3 = false;
    } else {
      v2.style.borderColor = "white";
      flag3 = true;
    }
  }

  const flag = flag1 && flag2;

  return flag;
}

$(document).ready(function () {
  let current_fs, next_fs, previous_fs;
  let val1;

  $(".next").click(function () {
    let str1 = "next1";

    const handlePrevNext = () => {
      let flag = false;

      for (let i = 0; i <= 13; i++) {
        if(i == 1) {
          continue;
        }
        
        flag = flag || !`next${i}`.localeCompare($(this).attr("id"));
      }

      return flag;
    };

    if (!str1.localeCompare($(this).attr("id")) && validate1(0) == true) {
      val1 = true;
    } else {
      val1 = false;
    }

    if (
      (!str1.localeCompare($(this).attr("id")) && val1 == true) ||
      handlePrevNext()
    ) {
      current_fs = $(this).parent().parent().parent();
      next_fs = $(this).parent().parent().parent().next();

      if ($(next_fs).attr("id") === "result") {
        const formElement = document.getElementById("healthCheckpointForm");
        const formData = new FormData(formElement);

        let totalScore = 0;
        const data = {};

        for (const [field, val] of formData) {
          if (field === "name" || field === "email" || field === "mobile") {
            data[field] = val;
          } else {
            totalScore += parseInt(val);
            data[field] = val;
          }
        }

        toastr.info("Computing your score...");

        fetch("/api", {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
              // Show the display message
              document.getElementById("greeting").innerHTML = "Thank You";
              // Show the success gif
              document.getElementById("checkImage").src = "images/check.gif";
              // Show the final score
              document.getElementById(
                "score"
              ).innerHTML = `Your total score is <i>${totalScore}<i>.`;
              toastr.success(
                "Thank you for being patient, your score has been computed"
              );
            } else if (response.status === 409) {
              // Show the error message
              document.getElementById("greeting").innerHTML = "Oops";
              // Show the error image
              document.getElementById("checkImage").src = "images/cross.gif";
              // Show error message
              document.getElementById(
                "score"
              ).innerHTML = `Looks like we have already recorded a response for this email.`;
              toastr.error("Response already recorded for this email id");
            } else {
              // Show the error message
              document.getElementById("greeting").innerHTML = "Oops";
              // Show error message
              document.getElementById(
                "score"
              ).innerHTML = `An error occured processing your score. Please try again after sometime`;
              // Show the error image
              document.getElementById("checkImage").src = "images/cross.gif";
              toastr.error("Internal Server Error");
            }
          })
          .catch((error) => {
            // Handle the error
            console.log(error);
          });
      }

      $(current_fs).removeClass("show");
      $(next_fs).addClass("show");

      $("#progressbar li").eq($(".card").index(next_fs)).addClass("active");

      current_fs.animate(
        {},
        {
          step: function () {
            current_fs.css({
              display: "none",
              position: "relative",
            });

            next_fs.css({
              display: "block",
            });
          },
        }
      );
    }
  });

  $(".prev").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    $(current_fs).removeClass("show");
    $(previous_fs).addClass("show");

    $("#progressbar li").eq($(".card").index(next_fs)).removeClass("active");

    current_fs.animate(
      {},
      {
        step: function () {
          current_fs.css({
            display: "none",
            position: "relative",
          });

          previous_fs.css({
            display: "block",
          });
        },
      }
    );
  });
});
