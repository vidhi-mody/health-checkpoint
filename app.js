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

function validate2(val) {
  const v1 = document.getElementById("exercise");

  let flag1 = true;

  if (val >= 2 || val == 0) {
    if (v1.value == "") {
      v1.style.borderColor = "red";
      flag1 = false;
    } else {
      v1.style.borderColor = "white";
      flag1 = true;
    }
  }

  const flag = flag1;

  return flag;
}

$(document).ready(function () {
  let current_fs, next_fs, previous_fs;
  let val1;

  $(".next").click(function () {
    let str1 = "next1";
    let str2 = "next2";

    if (
      (!str1.localeCompare($(this).attr("id")) && validate1(0) == true) ||
      (!str2.localeCompare($(this).attr("id")) && validate2(0) == true)
    ) {
      val1 = true;
    } else {
      val1 = false;
    }

    if (!str1.localeCompare($(this).attr("id")) && val1 == true) {
      current_fs = $(this).parent().parent().parent();
      next_fs = $(this).parent().parent().parent().next();

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
