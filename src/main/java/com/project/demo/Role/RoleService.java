package com.project.demo.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * RoleService class provides methods to interact with the Role repository.
 *
 * @author Tabnine
 */
@Service
public class RoleService {

    /**
     * The RoleRepository instance used to interact with the database.
     */
    private final RoleRepository roleRepository;

    /**
     * Constructor for RoleService.
     *
     * @param roleRepository The RoleRepository instance to be used.
     */
    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    /**
     * Saves a Role object to the database.
     *
     * @param role The Role object to be saved.
     * @return The saved Role object.
     */
    public Role save(Role role) {
        return roleRepository.save(role);
    }

    /**
     * Finds a Role object by its id from the database.
     *
     * @param id The id of the Role object to be found.
     * @return The Role object with the given id.
     * @throws IllegalStateException If no Role object with the given id is found.
     */
    public Role findById(String id) {
        Optional<Role> role = roleRepository.findById(id);

        if (role.isEmpty()) {
            throw new IllegalStateException(
                    "There is no role with id " + id
            );
        }
        return role.get();
    }

    /**
     * Finds a Role object by its name from the database.
     *
     * @param name The name of the Role object to be found.
     * @return The Role object with the given name.
     * @throws IllegalStateException If no Role object with the given name is found.
     */
    public Role findByName(String name) {
        Optional<Role> role = roleRepository.findByName(name);

        if (role.isEmpty()) {
            throw new IllegalStateException(
                    "There is no role with name " + name
            );
        }
        return role.get();
    }
}
