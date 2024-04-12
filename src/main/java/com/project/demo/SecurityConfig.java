package com.project.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .anyRequest()
                        .authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .formLogin((login) -> login
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl(
                                "http://localhost:8080/admin/page/id/1",
                                true)
                        .permitAll())
                .csrf().disable().headers().frameOptions().disable();
        return http.build();
    }

    /**
     * Adds users to the security config
     * @return The new users to add to the config
     */
    @Bean
    public UserDetailsService addServerUser() {
        BCryptPasswordEncoder bCryptPasswordEncoder =
                new BCryptPasswordEncoder();

        String adminPass = bCryptPasswordEncoder.encode("password");

        UserDetails admin = User.builder()
                .username("admin")
                .password("{bcrypt}" + adminPass)
                .roles("SERVER", "ADMIN")
                .build();

        return new InMemoryUserDetailsManager(admin);
    }
}
