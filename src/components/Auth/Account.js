import React, { createContext, useState, useEffect,useContext } from "react";
import Pool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useLocation } from "react-router-dom"; // Import useLocation

const AccountContext = createContext();

const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  const { verifyEmail, user } = context; // Add user to the context value
  return { ...context, verifyEmail, user }; // Include user in the returned context value
};



const Account = ({ children, onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAttributes, setUserAttributes] = useState(null);
  const location = useLocation();


  useEffect(() => {
    // Fetch the email from location state if available
    const { state } = location;
    if (state && state.email) {
      // Perform the email verification here or store it in the component state
      console.log("Email from location state:", state.email);
    }
  }, [location]);

  useEffect(() => { 
    const user = Pool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          setIsLoggedIn(false);
          console.error("Failed to get user session:", err);
        } else {
          setIsLoggedIn(true);
        
          // Fetch user attributes after successfully getting session
          getUserAttributes(user);
        }
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const getUserAttributes = (user) => {
    user.getUserAttributes((err, attributes) => {
      if (err) {
        console.error("Failed to get user attributes:", err);
      } else {
        const attributeMap = {};
        attributes.forEach((attribute) => {
          attributeMap[attribute.getName()] = attribute.getValue();
        });
        setUserAttributes(attributeMap);
      }
    });
  };

  const verifyEmail = async (email, verificationCode) => { // Accept email as a parameter
    try {
      console.log("Email: ",email);
      console.log('Pool:', Pool); 
      console.log("verificationCode: ",verificationCode);
      const user = new CognitoUser({
        Username: email, // Use the email as the username
        Pool:Pool,
      });
      const confirmRegistrationAsync = () => {
        return new Promise((resolve, reject) => {
          user.confirmRegistration(verificationCode, true, (err, result) => {
            if (err) {
              console.error("Email verification failed:", err);
              reject(err);
            } else {
              console.log("Email verification successful:", result);
              resolve(result);
            }
          });
        });
      };
  
      await confirmRegistrationAsync();
      // Handle successful email verification
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  


  const getSession = () => {
    return new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (!user) {
        reject(new Error("User not found or session expired"));
        return;
      }
      user.getSession((err, session) => {
        if (err) {
          reject(err);
        }  else {
                resolve({ user, session });

      }
    });
  });
};
  

  const authenticate = async (Username, Password) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool,
      });
      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });
  
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess: ", data);
          setIsLoggedIn(true);
          resolve(data);
         
        },
        onFailure: (err) => {
          console.error("onFailure ", err);
          setIsLoggedIn(false);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired ", data);
          setIsLoggedIn(true);
          resolve(data);
        },
      });
    });
  };
  

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      setIsLoggedIn(false);
      if (typeof onLogout === "function") {
        onLogout();
      }
    }
  };


  const changePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            user.changePassword(currentPassword, newPassword, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          }
        });
      } else {
        reject(new Error("User not found"));
      }
    });
  };

  const contextValue = {
    isLoggedIn,
    userAttributes,
    getSession,
    authenticate,
    logout,
    changePassword,
    verifyEmail,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext, useAccount };
