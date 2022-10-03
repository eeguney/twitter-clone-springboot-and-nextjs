package com.emreguney.twitter.service;

import com.emreguney.twitter.model.Role;
import com.emreguney.twitter.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getAllUser();

    User getUserById(long id);

    User getByUsername(String username);

    Optional<User> validateUserWithId(long id);

    Integer getTweetCountByUserId(long id);

    Integer getLikedTweetCountByUserId(long id);

    User saveUser(User user);

    Role saveRole(Role role);

    void addRoleToUser(String username, String roleName);


}
