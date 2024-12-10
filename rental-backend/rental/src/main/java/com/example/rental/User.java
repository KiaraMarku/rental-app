package com.example.rental;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Setter
@Getter
public class User {

    @Id
    private String username;

    private String password;

    private Boolean enabled;

    @OneToMany(mappedBy = "username",cascade = CascadeType.ALL)
    private List<Authority> authorities;

    public void addAuthority(Authority authority){
        if(authorities==null)
            authorities=new ArrayList<>();

        authorities.add(authority);
    }


}

