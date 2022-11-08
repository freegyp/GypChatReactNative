import { validateEmail, validateUrl } from "./shared";

export type UserProfile = {
  uid:string,
  email?:string,
  displayName?:string,
  photoURL?:string,
};

export const validateUserProfile:((profile:UserProfile)=>void) = (profile:UserProfile) => {
  if (profile.uid.length === 0){
    throw "Empty profile user id!";
  }

  if (profile.email && !validateEmail(profile.email!)){
    throw "Invalid email!";
  }

  if (profile.photoURL && !validateUrl(profile.photoURL!)){
    throw "Invalid photo URL!";
  }
}
