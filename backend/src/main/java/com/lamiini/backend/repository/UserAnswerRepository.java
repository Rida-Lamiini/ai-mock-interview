package com.lamiini.backend.repository;

import com.lamiini.backend.model.UserAnswer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {
    List<UserAnswer> findByMockIdRef(String mockIdRef);

   
}
