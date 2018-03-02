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
}

function getEmployees() {
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

        salaryNumber = (parseFloat(salaryText));
        total += salaryNumber;

        $("#totalSalary").text("Salary Total for all Employees: $" + total);
        $("#monthlySalary").text("Monthly Salary Spend for the Company: $" + total / 12);
        $("#biWeeklySalary").text("Bi-Weekly Salary Spend for the Company: $" + total / 26);
        $("#twiceAMonthSalary").text("Twice a Month Salary Spend for the Company: $" + total / 24);

        var newEmployee = {

            id: idText,
            firstName: fNameText,
            lastName: lNameText,
            salary: salaryText
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
}

function appendEmployee(employeeArray) {
    $("#container").empty();
    for(var i = 0; i < employeeArray.length; i++) {
        var person = employeeArray[i];
        $("#container").append("<div></div>");
        var el = $("#container").children().last();
        el.append("<p>" + person.id + " - " +
            person.firstName + " " +
            person.lastName + " " + " $" +
            person.salary + "</p>");
    }

}





