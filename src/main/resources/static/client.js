$(document).ready(function(){
init();
});

function init(){
    enable();
    // $("#employees").on('click', 'deleteBtn', function(){
    //     console.log("Meow!");
    // });
}

function enable(){
    $("#btnSubmit").on("click", postEmployee);
    $("#btnSearch").on("click", searchEmployee);
    $("#posSearch").on("click", searchEmployeeByPosition);
    $("#btnGetAll").on("click", getEmployees);
    $("#container").on("click", ".deleteBtn", deleteEmployee);
}

function getEmployees() {
    if(event !=null){
        event.preventDefault();
    }
    $.ajax({

        type: "GET",
        url: "/getAllEmployees",
        success: function (response) {
            appendEmployee(response);

        }
    });
}
    var total = 0;
    var salaryNumber = 0;

    function postEmployee(event) {
        event.preventDefault();

        var idText = $("#id").val();
        var fNameText = $("#fName").val();
        var lNameText = $("#lName").val();
        var salaryText = $("#salary").val();
        var positionText = $("#position").val();

        // var twoPlacedFloat = parseFloat(salaryText).toFixed(2);
        salaryNumber=(parseFloat(salaryText));
        total += salaryNumber;

        $("#totalSalary").text("Salary Total for all Employees: $" + total);
        $("#monthlySalary").text("Monthly Salary Spend for the Company: $" + total / 12);
        $("#biWeeklySalary").text("Bi-Weekly Salary Spend for the Company: $" + total / 26);
        $("#twiceAMonthSalary").text("Twice a Month Salary Spend for the Company: $" + total / 24);

        var newEmployee = {

            id: idText,
            firstName: fNameText,
            lastName: lNameText,
            salary: salaryText,
            position: positionText
        };

        $.ajax({

            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(newEmployee),
            url: "/add/employee",
            success: function (response) {
                console.log(response);
                getEmployees();
            }
        });

        $("#id").val("");
        $("#fName").val("");
        $("#lName").val("");
        $("#salary").val("");
        $("#position").val("");
    }

function searchEmployee(event) {
    event.preventDefault();

    var searchId = $("#txtSearch").val();

    $.ajax({

        type: "GET",
        url: "/get/" + searchId,
        success: function (response) {
            appendEmployee(response);
        }
    });
    $("#txtSearch").val("");
}

function searchEmployeeByPosition(event) {
    event.preventDefault();

    var searchPosition = $("#positionSearch").val();

    $.ajax({

        type: "GET",
        url: "/getAll/" + searchPosition,
        success: function (response) {
            appendEmployee(response);
        }
    });

    $("#positionSearch").val("");
}

function deleteEmployee(){
        var id = $(this).parent().data("employeeId");
        console.log("Here is the ID of the person you clicked!" + id);

    $.ajax({

        type: "GET",
        url: "/delete/" + id,
        success: function(response){
            getEmployees();
        }
    });
}

function appendEmployee(employeeArray) {
    $("#container").empty();
        if(employeeArray.length == 0){
            $("#container").append("<div></div>");
            var el = $("#container").children().last();
            el.append("<p>" + "No Employees found!" + "</p>");
        }

    for(var i = 0; i < employeeArray.length; i++) {
        var person = employeeArray[i];

        $("#container").append("<div></div>");
        var el = $("#container").children().last();
        el.data("employeeId", person.id);

        el.append("<p>" + person.id + " - " +
            person.firstName + " " +
            person.lastName + " " + " $" +
            person.salary + " " +
            person.position + " " +
            "<button class='deleteBtn btn btn-danger'>x</button>");
        }

    }





