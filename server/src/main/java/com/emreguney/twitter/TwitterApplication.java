package com.emreguney.twitter;

import com.emreguney.twitter.dto.request.UserRequestDTO;
import com.emreguney.twitter.model.Role;
import com.emreguney.twitter.model.User;
import com.emreguney.twitter.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

@SpringBootApplication
public class TwitterApplication {

    public static void main(String[] args) {
        SpringApplication.run(TwitterApplication.class, args);
    }


}
