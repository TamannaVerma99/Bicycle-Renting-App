// import validator from 'deep-email-validator';
import {validate} from 'deep-email-validator';

export const verifyUserDetails = async(req, res, next) => {
    const { firstName, lastName, username, password, usertype } = req.body;
    console.log(req.body);
    if(username.includes("--") || password.includes("--") || usertype.includes("--") || firstName.includes("--") || lastName.includes("--") ){
      return res.status(403).send({ message: "invalid credentials" });
    }
    try{
      const email_verification_result = await validate(username);   
      console.log("Email Verification Result:", email_verification_result);
      if(!email_verification_result.valid){
        // return res.status(401).send({ message: "Invalid email" });
        // Check for SMTP validation failure specifically
      if (email_verification_result.reason === 'smtp' && email_verification_result.validators.smtp.reason === 'Timeout') {
        console.log("SMTP validation timed out, proceeding with other validations.");
        // Optionally log this or take specific action if needed
      } else {
        return res.status(401).send({ message: "Invalid email" });
      }
      }
    }catch(error){
      return res.status(501).send({ message: "Internal server error" });
    }
    next();
  };