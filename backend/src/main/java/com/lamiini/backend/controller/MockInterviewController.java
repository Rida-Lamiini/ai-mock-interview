package com.lamiini.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lamiini.backend.model.MockInterview;
import com.lamiini.backend.repository.MockInterviewRepository;
import com.lamiini.backend.service.MockInterviewService;

@RestController
@RequestMapping("/api/mock-interviews")

public class MockInterviewController {

    @Autowired

    private MockInterviewService mockInterviewService;
    private MockInterviewRepository mockInterviewRepository;

    @GetMapping

    public ResponseEntity<List<MockInterview>> getAllMockInterviews() {

        List<MockInterview> mockInterviews = mockInterviewService.getAllMockInterviews();
        return new ResponseEntity<>(mockInterviews,HttpStatus.OK);
    }

    // @GetMapping("/{id}")
    //  public ResponseEntity<MockInterview> getMockInterviewById(@PathVariable Long id) {
    //     Optional<MockInterview> mockInterview = mockInterviewService.getMockInterviewById(id);
    //     return mockInterview.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    // }

     @PostMapping
    public ResponseEntity<MockInterview> createMockInterview(@RequestBody MockInterview mockInterview) {
        MockInterview savedMockInterview = mockInterviewService.saveMockInterview(mockInterview);
        return new ResponseEntity<>(savedMockInterview, HttpStatus.CREATED);
    }

     @PutMapping("/{id}")
    public ResponseEntity<MockInterview> updateMockInterview(
            @PathVariable Long id, @RequestBody MockInterview mockInterview) {
        if (mockInterviewService.getMockInterviewById(id).isPresent()) {
            mockInterview.setId(id);
            MockInterview updatedMockInterview = mockInterviewService.saveMockInterview(mockInterview);
            return new ResponseEntity<>(updatedMockInterview, HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMockInterview(@PathVariable Long id) {
        if (mockInterviewService.getMockInterviewById(id).isPresent()) {
            mockInterviewService.deleteMockInterview(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{mockId}")

    public ResponseEntity<MockInterview> getMockInterviewById(@PathVariable String mockId) {
        MockInterview mockInterview = mockInterviewService.findByMockId(mockId);
        if (mockInterview != null) {
            return ResponseEntity.ok(mockInterview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/createdBy/{createdBy}")
    public List<MockInterview> getInterviewsByCreator(@PathVariable String createdBy) {
        return mockInterviewService.getInterviewsByCreator(createdBy);
    }
    


    
}
