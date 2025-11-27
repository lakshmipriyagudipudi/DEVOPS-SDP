package klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import klu.model.Jobs;
import klu.model.JobsManager; // <-- Corrected this line

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "*")
public class JobsController {

    @Autowired
    JobsManager JM;

    @PostMapping("/insert")
    public String insert(@RequestBody Jobs J) {
        return JM.insertJob(J);
    }

    @GetMapping("/readjob")
    public String readJobs() {
        return JM.readJobs();
    }

    @GetMapping("/getjob/{id}")
    public String getJobById(@PathVariable("id") Long id) {
        return JM.getJobDetailsById(id);
    }

    @PutMapping("/update")
    public String updateJob(@RequestBody Jobs j) {
        return JM.updateJob(j);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteJob(@PathVariable("id") Long id) {
        return JM.deleteJob(id);
    }
}
