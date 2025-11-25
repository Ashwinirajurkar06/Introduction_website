package com.sample.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterReq {

    @NotBlank(message = "First name is required")
    private String fName;

    @NotBlank(message = "Last name is required")
    private String lName;

    @NotBlank(message = "Date of birth is required")
    private String dob;   // e.g. "2025-11-24"

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be 10 digits")
    private String mobile;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

//    @NotBlank(message = "Confirm password is required")
//    private String confirmPassword;
}