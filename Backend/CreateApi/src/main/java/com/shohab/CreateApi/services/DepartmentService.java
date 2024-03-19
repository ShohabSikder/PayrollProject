package com.shohab.CreateApi.services;


import com.shohab.CreateApi.model.Department;
import com.shohab.CreateApi.repository.IDepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {


    @Autowired
    private IDepartmentRepo iDepartmentRepo;


    public Department saveDepartment(Department department) {
        return iDepartmentRepo.save(department);
    }

    public List<Department> getAllDepartments() {
        return iDepartmentRepo.findAll();
    }
}
