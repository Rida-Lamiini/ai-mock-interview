package com.lamiini.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lamiini.backend.model.MockInterview;
import com.lamiini.backend.repository.MockInterviewRepository;

@Service

public class MockInterviewService {

    @Autowired

    private MockInterviewRepository mockInterviewRepository;

    public List<MockInterview> getAllMockInterviews() {

        return mockInterviewRepository.findAll();


    }

    public Optional<MockInterview> getMockInterviewById(Long id) {

        return mockInterviewRepository.findById(id);


    }
    public MockInterview saveMockInterview(MockInterview mockInterview) {
        return mockInterviewRepository.save(mockInterview);
    }

    public void deleteMockInterview(Long id) {
        mockInterviewRepository.deleteById(id);
    }
    
    public MockInterview findByMockId(String mockId){
        return mockInterviewRepository.findByMockId(mockId);
    }
    public List<MockInterview> getInterviewsByCreator(String createdBy) {
        return mockInterviewRepository.findByCreatedBy(createdBy);
    }
}
