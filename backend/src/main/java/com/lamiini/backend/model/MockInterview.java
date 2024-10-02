package com.lamiini.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "mockInterview")

public class MockInterview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jsonMockResp", nullable = false , columnDefinition = "TEXT" )
    private String jsonMockResp;

    @Column(name = "jobPosition", nullable = false)
    private String jobPosition;

    @Column(name = "jobDesc", nullable = false)
    private String jobDesc;

    @Column(name = "jobExperience", nullable = false)
    private String jobExperience;

    @Column(name = "createdBy", nullable = false)
    private String createdBy;

    @Column(name = "createdAt")
    private String createdAt;

    @Column(name = "mockId", nullable = false)
    private String mockId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJsonMockResp() {
        return jsonMockResp;
    }
    public void setJsonMockResp(String jsonMockResp) {
        this.jsonMockResp = jsonMockResp;
    }

    public String getJobPosition() {
        return jobPosition;
    }

    public void setJobPosition(String jobPosition) {
        this.jobPosition = jobPosition;
    }
    public String getJobDesc() {
        return jobDesc;
    }

    public void setJobDesc(String jobDesc) {
        this.jobDesc = jobDesc;
    }

    public String getJobExperience() {
        return jobExperience;
    }

    public void setJobExperience(String jobExperience) {
        this.jobExperience = jobExperience;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getMockId() {
        return mockId;
    }

    public void setMockId(String mockId) {
        this.mockId = mockId;
    }
    
}
