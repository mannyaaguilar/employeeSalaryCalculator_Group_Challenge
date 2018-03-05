package com.manny.employeeCalculator.data;

import com.manny.employeeCalculator.model.Employee;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeRepository {
    List<Employee> employeeList = new ArrayList<>();

    public List<Employee> getAllEmployees(){
        return employeeList;
    }

    public void addEmployee(Employee employee){
        employeeList.add(employee);
    }

    public Employee findEmployeeById(String id){

        for(Employee kittyFoo : employeeList) {
            if(kittyFoo.getId().equalsIgnoreCase(id)){
                employeeList.add(kittyFoo);
                return kittyFoo;
            }
        }
        return null;
    }
    public List<Employee> findEmployeeByPosition(String position){
        List<Employee> employeePositionList = new ArrayList<>();
        //Make an array
        //Your for loop should compare the 'position' from the argument against the position of the employee
        //If they match, add the employee to the array.
        //Return the array (even if there is nothing in it)

        for(Employee kittyFooFoo : employeeList) {
            if(kittyFooFoo.getPosition().equalsIgnoreCase(position)){
                employeePositionList.add(kittyFooFoo);

            }
        }
        return employeePositionList;
    }

    public Employee deleteEmployeeById(String id){
        for(Employee employee : employeeList){
            if(employee.getId().equalsIgnoreCase(id)){
                employeeList.remove(employee);
                return employee;
            }
        }
        return null;
    }
}
