package com.project.demo.Role;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * RoleController class is a REST controller that handles HTTP requests related to roles.
 * It uses the RoleService to perform the actual operations on roles.
 *
 * @author Tabnine
 */
@RestController("/api/v1/roles")
public class RoleController {

    private final RoleService roleService;

    /**
     * RoleService dependency is injected through constructor injection.
     *
     * @param roleService the RoleService instance to be used for role operations.
     */
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    /**
     * This method retrieves a role by its id.
     *
     * @param id the unique identifier of the role to be retrieved.
     * @return the Role object corresponding to the given id.
     */
    @GetMapping(path = "/{id}")
    public Role getRoleById(@PathVariable String id) {
        return roleService.findById(id);
    }

    /**
     * This method retrieves a role by its name.
     *
     * @param role the name of the role to be retrieved.
     * @return the Role object corresponding to the given name.
     */
    @GetMapping(path = "/{role}")
    public Role getRoleByName(@PathVariable String role) {
        return roleService.findByName(role);
    }

    /**
     * This method creates a new role.
     *
     * @param role the Role object to be created.
     * @return the newly created Role object.
     */
    @PostMapping(path = "/")
    public Role createRole(Role role) {
        return roleService.save(role);
    }

    /**
     * This method handles exceptions of type IllegalStateException.
     *
     * @return a ResponseEntity with a bad request status code.
     */
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Role> handleException() {
        return ResponseEntity.badRequest().build();
    }
}
