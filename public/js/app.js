$(document).ready(function () {
  console.log("Onload");
  var tokenValue = Cookies.get("token");

  console.log("Onload");
  console.log("token " + tokenValue);

  const endpoint_real = "http://localhost:8000/api";
  const endpoint = "https://tools.ecpe.nu.ac.th/cims/api";

  $.ajax({
    method: "GET",
    url: endpoint + "/university-groups",
    dataType: "json",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
      Authorization: "Bearer " + tokenValue,
    },
    success: function (data) {
      console.log(data);
      console.log(data.data);
      var list = data.data.university_groups;

      console.log(list.length);
      var options = "";
      for (var i = 0; i < list.length; i++) {
        options +=
          '<option value="' +
          list[i].univ_group_id +
          '">' +
          list[i].univ_group_name +
          "</option>";
      }
      $("select#cboUniversityGroup").html(options);

      //alert("Done");
    },
  });
  //---------On Change-------

  $("select#cboUniversityGroup").change(function () {
    $("select#cboUniversity option:not(:first)").remove();
    $("select#cboFaculty option:not(:first)").remove();
    $("select#cboCurriculum option:not(:first)").remove();

    //clear datatable
    $("#tbSubject").find("tr:gt(0)").remove();

    //clear data
    clearCurriculumData();

    if ($(this).val() != "") {
      $.ajax({
        beforeSend: function (request) {
          request.setRequestHeader("Authorization", "Bearer " + tokenValue);
          request.setRequestHeader("Content-Type", "application/json");
        },
        dataType: "json",
        url: endpoint + "/universities-by-group/" + $(this).val(),
        success: function (data) {
          //Your code
          console.log(data);
          console.log(data.data);
          var list = data.data.universities;

          console.log(list.length);

          var options = "";
          for (var i = 0; i < list.length; i++) {
            options +=
              '<option value="' +
              list[i].univ_id +
              '">' +
              list[i].univ_name_th +
              "</option>";
          }
          $("#cboUniversity").append(options);
        },
      });
    } // end if
  });

  $("select#cboUniversity").change(function () {
    $("select#cboFaculty option:not(:first)").remove();

    if ($(this).val() != "") {
      $.ajax({
        beforeSend: function (request) {
          request.setRequestHeader("Authorization", "Bearer " + tokenValue);
          request.setRequestHeader("Content-Type", "application/json");
        },
        dataType: "json",
        url: endpoint + "/faculties-in-uni/" + $(this).val(),
        success: function (data) {
          //Your code
          console.log(data);
          console.log(data.data);
          var list = data.data.faculties;

          console.log(list.length);

          var options = "";
          for (var i = 0; i < list.length; i++) {
            options +=
              '<option value="' +
              list[i].fac_id +
              '">' +
              list[i].fac_name_th +
              "</option>";
          }
          $("#cboFaculty").append(options);
        },
      });
    } // end if
  });

  $("select#cboFaculty").change(function () {
    $("select#cboCurriculum option:not(:first)").remove();

    if ($(this).val() != "") {
      $.ajax({
        beforeSend: function (request) {
          request.setRequestHeader("Authorization", "Bearer " + tokenValue);
          request.setRequestHeader("Content-Type", "application/json");
        },
        dataType: "json",
        url:
          endpoint +
          "/curriculum/" +
          $("select#cboUniversity").val() +
          "/" +
          $(this).val(),
        success: function (data) {
          //Your code
          console.log(data);
          console.log(data.data);
          var list = data.data.curriculum;

          console.log(list.length);

          var options = "";
          for (var i = 0; i < list.length; i++) {
            options +=
              '<option value="' +
              list[i].curr_id +
              '">' +
              list[i].curr_name +
              "</option>";
          }
          $("#cboCurriculum").append(options);
        },
      });
    } else {
      //clear data
      console.log("clear data Curriculum.");
      clearCurriculumData();
    } // end if
  });

  $("select#cboCurriculum").change(function () {
    //clear data
    clearCurriculumData();

    if ($(this).val() != "") {
      applyCurriculumData($(this).val());
      applySubjectData($(this).val());
      applyResponsibleData($(this).val());
      applyLecturerData($(this).val());
    } // end if
  });

  //-----custom function------

  function applyCurriculumData(curr_id) {
    $.ajax({
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "Bearer " + tokenValue);
        request.setRequestHeader("Content-Type", "application/json");
      },
      dataType: "json",
      url: endpoint + "/curriculum/" + curr_id,
      success: function (data) {
        //Your code
        console.log(data);
        console.log(data.data);
        var result = data.data.curriculum;

        console.log(result.length);

        $("#txtCurriculumNameTh").val(result[0].bachelor_th);
        $("#txtAbbrCurriculumNameTh").val(result[0].s_bachelor_th);
        $("#txtCurriculumNameEn").val(result[0].bachelor_en);
        $("#txtAbbrCurriculumNameEn").val(result[0].s_bachelor_en);
        $("#txtBachelorBranch").val(result[0].bachelorbranch);
        $("#txtTotalCredit").val(result[0].credit_units_1);
      },
    });
  }

  function clearCurriculumData() {
    $("#txtCurriculumNameTh").val("");
    $("#txtAbbrCurriculumNameTh").val("");
    $("#txtCurriculumNameEn").val("");
    $("#txtAbbrCurriculumNameEn").val("");
    $("#txtBachelorBranch").val("");
    $("#txtTotalCredit").val("");
    $("#tbSubject").find("tr:gt(0)").remove();
    $("#tbResponsible").find("tr:gt(0)").remove();
    $("#tbLecturer").find("tr:gt(0)").remove();
    $("#tbExtraLecturer").find("tr:gt(0)").remove();
  }

  function applySubjectData(curr_id) {
    $.ajax({
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "Bearer " + tokenValue);
        request.setRequestHeader("Content-Type", "application/json");
      },
      dataType: "json",
      url: endpoint + "/subject/" + curr_id,
      success: function (result) {
        //Your code
        console.log(result.length);
        console.log("Update subject");
        updateSubject(result);
      },
    });
  }

  function applyResponsibleData(curr_id) {
    $.ajax({
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "Bearer " + tokenValue);
        request.setRequestHeader("Content-Type", "application/json");
      },
      dataType: "json",
      url: endpoint + "/responsible/" + curr_id,
      success: function (result) {
        //Your code
        console.log(result.length);
        console.log("Update responsible");
        updateResponsible(result);
      },
    });
  }

  function applyLecturerData(curr_id) {
    $.ajax({
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "Bearer " + tokenValue);
        request.setRequestHeader("Content-Type", "application/json");
      },
      dataType: "json",
      url: endpoint + "/lecturer/" + curr_id,
      success: function (result) {
        //Your code
        console.log(result.length);
        console.log("Update lecturer");
        updateLecturer(result);
      },
    });
  }

  //----------Utility----------------------
  function removeRow(obj) {
    objRowDelete = obj.parentNode.parentNode;
    alert(objRowDelete.nodeName);
  }

  function updateSubject(items) {
    console.log("updateSubject" + items.length);

    //clear datatable
    $("#tbSubject").find("tr:gt(0)").remove();

    for (var i = 0; i < items.length; i++) {
      var indexRef = i + 1;
      var col1 = indexRef;
      var col2 = items[i].subject_code;
      var col3 = items[i].subject_name;
      var col4 =
        "<input type='text' name='txtCreditSub" +
        indexRef +
        "' id='txtCreditSub" +
        indexRef +
        "' placeholder='หน่วยกิต' style='width:90px;'/>";
      var col5 =
        "<button class='btn btn-outline-primary' type='button' onclick='javascript:alert(100);return false;' >แก้ไข</button>";

      $("#tbody").append(
        '<tr id="rowSub' +
          indexRef +
          '"><td>' +
          col1 +
          "</td><td>" +
          col2 +
          "</td><td>" +
          col3 +
          "</td><td>" +
          col4 +
          "</td><td>" +
          col5 +
          "</td></tr>"
      );
    }
  }

  function updateResponsible(items) {
    console.log("updateResponsible" + items.length);

    //clear datatable
    $("#tbResponsible").find("tr:gt(0)").remove();

    for (var i = 0; i < items.length; i++) {
      var indexRef = i + 1;
      var col1 = indexRef;
      var col2 = items[i].positionname;
      var col3 = items[i].stf_fname + "    " + items[i].stf_lname;
      var col4 = items[i].grad_lev_name;
      var col5 =
        "<button class='btn btn-outline-primary' type='button' onclick='javascript:alert(1);return false;' >แก้ไข</button>";
      var col6 =
        "<button class='btn btn-outline-secondary' type='button' onclick='javascript:$(this.parentNode.parentNode).remove();return false;' > ลบ </button>";

      $("#tbodyResponsible").append(
        '<tr id="rowSub' +
          indexRef +
          '"><td>' +
          col1 +
          "</td><td>" +
          col2 +
          "</td><td>" +
          col3 +
          "</td><td>" +
          col4 +
          "</td><td>" +
          col5 +
          "</td><td>" +
          col6 +
          "</td><td>"
      );
    }
  }

  function updateLecturer(items) {
    console.log("updateLecturer" + items.length);

    //clear datatable
    $("#tbLecturer").find("tr:gt(0)").remove();

    for (var i = 0; i < items.length; i++) {
      var indexRef = i + 1;
      var col1 = indexRef;
      var col2 = items[i].positionname;
      var col3 = items[i].stf_fname + "    " + items[i].stf_lname;
      var col4 = items[i].grad_lev_name;
      var col5 =
        "<button class='btn btn-outline-primary' type='button' onclick='javascript:alert(1);return false;' >แก้ไข</button>";
      var col6 =
        "<button class='btn btn-outline-secondary' type='button' onclick='javascript:$(this.parentNode.parentNode).remove();return false;' > ลบ </button>";

      $("#tbodyLecturer").append(
        '<tr id="rowSub' +
          indexRef +
          '"><td>' +
          col1 +
          "</td><td>" +
          col2 +
          "</td><td>" +
          col3 +
          "</td><td>" +
          col4 +
          "</td><td>" +
          col5 +
          "</td><td>" +
          col6 +
          "</td><td>"
      );
    }
  }

  $("#btnProcessAI").click(function () {
    Swal.fire({
      title: "Process!",
      text: "Natural Language Processing (NLP)",
      icon: "success",
      confirmButtonText: "Okay",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("callback");
      }
    });
  });

  //----------Control Wizard-form----------------------
  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;

  $(".next").click(function () {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          next_fs.css({ opacity: opacity });
        },
        duration: 600,
      }
    );
  });

  $(".previous").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //Remove class active
    $("#progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 600,
      }
    );
  });

  $(".radio-group .radio").click(function () {
    $(this).parent().find(".radio").removeClass("selected");
    $(this).addClass("selected");
  });

  $(".submit").click(function () {
    return false;
  });
});
