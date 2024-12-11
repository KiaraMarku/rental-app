package com.example.rental.security;

import com.example.rental.entety.Authority;
import com.example.rental.entety.User;
import com.example.rental.exceptions.CustomRegistrationException;
import com.example.rental.repository.UserRepository;
import com.example.rental.dto.RegistrationDTO;
import com.example.rental.entety.Agent;
import com.example.rental.entety.Client;
import com.example.rental.repository.AgentRepository;
import com.example.rental.repository.ClientRepository;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;


@Service
@Transactional
public class UserRegistrationService {
    private final UserRepository userRepository;
    private final AgentRepository agentRepository;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;

    public UserRegistrationService(
            UserRepository userRepository,
            AgentRepository agentRepository, ClientRepository clientRepository, PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.agentRepository = agentRepository;
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public void registerCustomer(RegistrationDTO dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

            // Your existing registration logic
            User user = createUser(dto.getUsername(), dto.getPassword(), "ROLE_CUSTOMER");

            Client client = new Client();
            client.setUsername(dto.getUsername());
            client.setFirstName(dto.getFirstName());
            client.setLastName(dto.getLastName());
            client.setEmail(dto.getEmail());
            client.setPhone(dto.getPhone());

            userRepository.save(user);
            clientRepository.save(client);


    }

    public void registerAgent(RegistrationDTO dto) {
//        if (!isCurrentUserAdmin()) {
//            throw new SecurityException("Only admins can register agents");
//        }

        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = createUser(dto.getUsername(), dto.getPassword(), "ROLE_AGENT");

        Agent agent = new Agent();
        agent.setUsername(dto.getUsername());
        agent.setFirstName(dto.getFirstName());
        agent.setLastName(dto.getLastName());
        agent.setEmail(dto.getEmail());
        agent.setPhone(dto.getPhone());

        userRepository.save(user);
        agentRepository.save(agent);
    }

    private User createUser(String username, String password, String role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEnabled(true);
        user.addAuthority(new Authority(user, role));
        return user;
    }

//    private boolean isCurrentUserAdmin() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        return authentication.getAuthorities().stream()
//                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
//    }
}