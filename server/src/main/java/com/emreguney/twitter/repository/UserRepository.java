package com.emreguney.twitter.repository;

import com.emreguney.twitter.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT COUNT(t) as tweet FROM Tweet t WHERE t.user.id = :userId ")
    Integer getTweetCountByUserId(Long userId);

    @Query("SELECT COUNT(lt) as tweet FROM LikedTweet lt WHERE lt.user.id = :userId")
    Integer getLikeCountByUserId(long userId);

    User findByUsername(String username);

    @Query("SELECT u as user FROM User u WHERE u.id = :userId")
    User findUserById(Long userId);
}
