package com.lamiini.backend.controller;

import com.lamiini.backend.model.UserAnswer;
import com.lamiini.backend.service.UserAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-answers")
public class UserAnswerController {

    @Autowired
    private UserAnswerService userAnswerService;

    @GetMapping
    public List<UserAnswer> getAllUserAnswers() {
        return userAnswerService.getAllUserAnswers();
    }

    

  

    @PostMapping
    public UserAnswer createUserAnswer(@RequestBody UserAnswer userAnswer) {
        return userAnswerService.saveUserAnswer(userAnswer);
    }

   
    @GetMapping("/{mockIdRef}")
    public List<UserAnswer> getUserAnswersByMockIdRef(@PathVariable String mockIdRef) {
        return userAnswerService.getAllUserAnswersByMockIdRef(mockIdRef);
    }
}
