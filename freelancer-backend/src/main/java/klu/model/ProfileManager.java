package klu.model;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.gson.GsonBuilder;
import klu.repository.ProfileRepository;

@Service
public class ProfileManager {

    @Autowired
    ProfileRepository PR;

    public String insertProfile(Profile P) {
        try {
            PR.save(P);
            return "200::Profile added successfully";
        } catch (Exception e) {
            return "401::" + e.getMessage();
        }
    }

    public String readProfiles() {
        try {
            List<Profile> profiles = PR.findAll();
            return new GsonBuilder().create().toJson(profiles);
        } catch (Exception e) {
            return "401::" + e.getMessage();
        }
    }

    public String getProfileById(Long id) {
        try {
            Profile p = PR.findById(id).get();
            return new GsonBuilder().create().toJson(p);
        } catch (Exception e) {
            return "401::" + e.getMessage();
        }
    }

    public String updateProfile(Profile p) {
        try {
            PR.save(p);
            return "200::Profile updated successfully";
        } catch (Exception e) {
            return "401::" + e.getMessage();
        }
    }

    public String deleteProfile(Long id) {
        try {
            PR.deleteById(id);
            return "200::Profile deleted successfully";
        } catch (Exception e) {
            return "401::" + e.getMessage();
        }
    }
}
