package klu.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.GsonBuilder;

import klu.repository.JobsRepository;

@Service
public class JobsManager
{
	@Autowired
	JobsRepository JR;
	 public String insertJob(Jobs J) 
	 {
		 try
		 {
			 JR.save(J);
			 return "200 :: new job added Successfully";
		 }
		 catch (Exception e) {
			return "401 ::"+ e.getMessage();
		}
	 }
	 public String readJobs()
	 {
		 try {
			 
			  List<Jobs> jobList=JR.findAll();
			  return new GsonBuilder().create().toJson(jobList);
			  
		} catch (Exception e) {
			return "401 ::"+ e.getMessage();
		}
	 }
	 public String getJobDetailsById(Long id)
	  {
	    try {
	      Jobs j = JR.findById(id).get();
	      return new GsonBuilder().create().toJson(j);
	    } catch (Exception e) {
	      return "401::"+e.getMessage();
	    }
	  }
	  
	  public String updateJob(Jobs j)
	  {
	    try {
	      JR.save(j);
	      return "200::Successfully Updated the Job Details";
	    } catch (Exception e) {
	      return "401::"+e.getMessage();
	    }
	  }
	  
	  public String deleteJob(Long id)
	  {
	    try {
	     JR.deleteById(id);
	      return "200::Job Details Deleted Successfully";
	    } catch (Exception e) {
	      return "401::"+e.getMessage();
	    }
	  }
	 
}