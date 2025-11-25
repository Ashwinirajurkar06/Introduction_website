package com.sample.service;

import com.sample.dto.RegisterReq;
import com.sample.dto.RegisterResponse;

public interface RegisterService {      

    RegisterResponse registerUser(RegisterReq request); 
}
