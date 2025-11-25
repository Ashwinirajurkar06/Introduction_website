package com.sample.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sample.dto.RegisterReq;
import com.sample.dto.RegisterResponse;
import com.sample.service.RegisterService;   
@RestController
@RequestMapping("/api/auth")
public class RegisterController {

    @Autowired
    private RegisterService registerService;   

    @PostMapping("/register")
    public RegisterResponse registerUser(@RequestBody RegisterReq request) {
        return registerService.registerUser(request);
    }
}
