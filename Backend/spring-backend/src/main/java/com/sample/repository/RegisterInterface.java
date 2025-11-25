package com.sample.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sample.entity.EntityRegister;

public interface RegisterInterface extends JpaRepository<EntityRegister, Long> {

    boolean existsByEmail(String email);
    boolean existsByMobile(String mobile);

}
