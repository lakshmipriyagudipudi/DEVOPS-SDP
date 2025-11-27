package klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import klu.model.Profile;
import klu.model.ProfileManager;

@RestController
@RequestMapping("/profiles")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    ProfileManager PM;

    @PostMapping("/insert")
    public String insert(@RequestBody Profile P) {
        return PM.insertProfile(P);
    }

    @GetMapping("/readprofile")
    public String readProfiles() {
        return PM.readProfiles();
    }

    @GetMapping("/getprofile/{id}")
    public String getProfile(@PathVariable("id") Long id) {
        	return PM.getProfileById(id);
    }

    @PutMapping("/update")
    public String updateProfile(@RequestBody Profile p) {
        return PM.updateProfile(p);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProfile(@PathVariable("id") Long id) {
        return PM.deleteProfile(id);
    }
}
