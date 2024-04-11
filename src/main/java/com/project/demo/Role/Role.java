package com.project.demo.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "roles")
public class Role {

    /**.
     * The id of the role
     */
    @Id
    @UuidGenerator
    private String id;

    /**.
     * The name of the role
     */
    private String name;
}
