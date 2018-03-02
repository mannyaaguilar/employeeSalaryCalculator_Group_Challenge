package com.manny.employeeCalculator.controller;

import com.manny.employeeCalculator.data.EmployeeRepository;
import com.manny.employeeCalculator.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class BaseController {

    @Autowired
    EmployeeRepository employeeRepository;

    @RequestMapping("/getAllEmployees")
    public @ResponseBody
    List<Employee> getAllEmployees(){
        return employeeRepository.getAllEmployees();
    }

    @RequestMapping("/get/{id}")
    public @ResponseBody List<Employee> findEmployeeById(@PathVariable String id){
        Employee foundEmployee = employeeRepository.findEmployeeById(id);
        List<Employee> responseArray = new ArrayList<>();
        responseArray.add(foundEmployee);
        return responseArray;
    }

    @RequestMapping(value = "/add/employee", method = RequestMethod.POST)
    public @ResponseBody Employee postEmployee(@RequestBody Map<String, Object> payload){
        String newId = String.valueOf(payload.get("id"));
        String newFName = String.valueOf(payload.get("firstName"));
        String newLName = String.valueOf(payload.get("lastName"));
        String newSalary = String.valueOf(payload.get("salary"));

        Employee newEmployee = new Employee(newId, newFName, newLName, newSalary);

        employeeRepository.addEmployee(newEmployee);

        return newEmployee;
    }

    @RequestMapping("/")
    public String baseRoute(){
        return "index";
    }
}
