package com.lamiini.backend.service;

import com.lamiini.backend.model.UserAnswer;
import com.lamiini.backend.repository.UserAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAnswerService {

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    public List<UserAnswer> getAllUserAnswers() {
        return userAnswerRepository.findAll();
    }

    public UserAnswer getUserAnswerById(Long id) {
        return userAnswerRepository.findById(id).orElse(null);
    }

 

    public UserAnswer saveUserAnswer(UserAnswer userAnswer) {
        return userAnswerRepository.save(userAnswer);
    }

    public void deleteUserAnswer(Long id) {
        userAnswerRepository.deleteById(id);
    }
    public List<UserAnswer> getAllUserAnswersByMockIdRef(String mockIdRef) {
        return userAnswerRepository.findByMockIdRef(mockIdRef);
    }
}
