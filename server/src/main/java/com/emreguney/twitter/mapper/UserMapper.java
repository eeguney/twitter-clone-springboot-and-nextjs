package com.emreguney.twitter.mapper;

import com.emreguney.twitter.dto.request.UserRequestDTO;
import com.emreguney.twitter.dto.response.UserResponseDTO;
import com.emreguney.twitter.model.User;
import com.emreguney.twitter.service.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


@Component
public class UserMapper {

    private ModelMapper modelMapper;

    private MainMapper mainMapper;

    private UserService userService;

    public UserMapper(ModelMapper modelMapper, UserService userService, MainMapper mainMapper) {
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.mainMapper = mainMapper;
    }

    public List<UserResponseDTO> getAllUser() {
        List<User> user = userService.getAllUser();
        return mainMapper.toDTOList(user, UserResponseDTO.class);
    }

    public UserResponseDTO getUserByUserId(long userId) {

        User user = userService.getUserById(userId);

        return mainMapper.toDTO(user, UserResponseDTO.class);
    }

    public UserResponseDTO getUserByUsername(String username) {

        User user = userService.getByUsername(username);
        return mainMapper.toDTO(user, UserResponseDTO.class);
    }

    public UserResponseDTO saveUser(UserRequestDTO user) {
        User userEntity = mainMapper.toEntity(user, User.class);
        User newUser = userService.saveUser(userEntity);
        return mainMapper.toDTO(newUser, UserResponseDTO.class);
    }

}
