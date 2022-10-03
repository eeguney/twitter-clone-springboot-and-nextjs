package com.emreguney.twitter.controller;

import com.emreguney.twitter.dto.request.UserRequestDTO;
import com.emreguney.twitter.dto.response.UserResponseDTO;
import com.emreguney.twitter.mapper.UserMapper;
import com.emreguney.twitter.model.Role;
import com.emreguney.twitter.service.UserService;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserService userService;
    private UserMapper userMapper;


    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('USER_ADMIN')")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userMapper.getAllUser();
        users.forEach(user ->{
            user.setTweetCount(userService.getTweetCountByUserId(user.getId()));
            user.setLikeCount(userService.getLikedTweetCountByUserId(user.getId()));
        });
        return ResponseEntity.ok().body(users);
    }

    @GetMapping(path = "/{userId}")
    public ResponseEntity<UserResponseDTO> getUserByUserId(@PathVariable Long userId) {
        UserResponseDTO user = userMapper.getUserByUserId(userId);
        user.setTweetCount(userService.getTweetCountByUserId(userId));
        user.setLikeCount(userService.getLikedTweetCountByUserId(userId));
        return ResponseEntity.ok().body(user);
    }

    @GetMapping(path = "/username/{username}")
    public ResponseEntity<UserResponseDTO> getUserByUsername(@PathVariable String username) {
        UserResponseDTO user = userMapper.getUserByUsername(username);
        user.setTweetCount(userService.getTweetCountByUserId(user.getId()));
        user.setLikeCount(userService.getLikedTweetCountByUserId(user.getId()));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/save")
    public ResponseEntity<UserResponseDTO> saveUser(@RequestBody UserRequestDTO user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save/").toUriString());
        return ResponseEntity.created(uri).body(userMapper.saveUser(user));
    }

    @PostMapping(path = "/role")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save/").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<Role>addRoleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @Data
    static class RoleToUserForm {
        private String username;

        private String roleName;
    }

}
