package com.sample.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sample.dto.RegisterReq;
import com.sample.dto.RegisterResponse;
import com.sample.entity.EntityRegister;
import com.sample.repository.RegisterInterface;

@Service
public class RegisterServiceImpl implements RegisterService {   // <-- changed here

    @Autowired
    private RegisterInterface registerInterface;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public RegisterResponse registerUser(RegisterReq request) {

//        // 1. password == confirmPassword ?
//        if (!request.getPassword().equals(request.getConfirmPassword())) {
//            return new RegisterResponse(400, "Password and Confirm Password do not match");
//        }

        // 2. already registered ?
        if (registerInterface.existsByEmail(request.getEmail())) {
            return new RegisterResponse(422, "User Already Registered");
        }
        
        if (registerInterface.existsByMobile(request.getMobile())) {
            return new RegisterResponse(422, "Mobile Number Already Registered");
        }
        

        // 3. parse dob
        LocalDate dob = LocalDate.parse(request.getDob());

        // 4. map DTO to entity
        EntityRegister user = new EntityRegister();
        user.setFName(request.getFName());
        user.setLName(request.getLName());
        user.setDob(dob);
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());

        // 5. hash password
        String encrypted = passwordEncoder.encode(request.getPassword());
        user.setPassword(encrypted);

        // 6. save
        registerInterface.save(user);

        // 7. response
        return new RegisterResponse(200, "User Registered Successfully");
    }
}
	