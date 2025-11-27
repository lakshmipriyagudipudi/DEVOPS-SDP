package klu.model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import klu.repository.UsersRepository;
@Service
public class UsersManager 
{
 @Autowired
 UsersRepository UR;
 @Autowired
 EmailManager EM;
 @Autowired
 JWTManager jwt;
 
 public String addUsers(Users U)
 {
  if(UR.validateEmail(U.getEmail())>0)
   return "401::email id already existed";
  UR.save(U);
  return "200::User Registered sccessfully";  
 }
 public String recoverPassword(String email)
 {
  Users U=UR.findById(email).get();
  String message=String.format("Dear %s \n\n Your passowrd is:%s",U.getFullname(),U.getPassword());
  return EM.sendEmail(U.getEmail(),"Job portal Recover password", message);
  
 }
 public String validateCredentials(String email,String password)
 {
	 if(UR.validateCredentials(email, password)>0)
	 {
		 String token=jwt.generateToken(email);
		 return "200::"+token;
		 	
	 }
	 else
	 {
		 return "401::Invalid Credentials";
	 }
	 
 }
 public String getFullname(String token)
 {
	String email=jwt.validateToken(token);
	if(email.compareTo("401")==0)
	{
		return "401::Token expired";
	}
	else
	{
		Users U=UR.findById(email).get();
		return U.getFullname();
	}
	
 }
 
 
}