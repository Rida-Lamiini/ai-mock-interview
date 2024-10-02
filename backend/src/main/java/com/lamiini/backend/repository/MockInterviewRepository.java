package com.lamiini.backend.repository;

import java.lang.StackWalker.Option;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lamiini.backend.model.MockInterview;

@Repository
public interface MockInterviewRepository extends JpaRepository<MockInterview,Long> {

    MockInterview findByMockId(String mockId);
    List<MockInterview> findByCreatedBy(String createdBy);

    
    
}
