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
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:3000")
                        .allowedMethods("PUT", "DELETE", "GET", "POST");
            }
        };
    }

}
