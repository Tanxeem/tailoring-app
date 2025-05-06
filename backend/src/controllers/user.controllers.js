import User from "../models/user.models.js";


const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccesToken();

      await user.save({ validateBeforeSave: false });

      return { accessToken };
    } catch (error) {
      console.error("Error generating tokens:", error);
    }
}

export const signUp = async (req, res) => {
    
        const {name, email, password} = req.body;
        
        try {
    const existUser = await User.findOne({email});
    if(existUser){
        return res.status(401).json({
            success:false,
            message: "User already exist"
        })
    }


    const user = await User.create({
        name, email, password
    })

    if(!user){
        return res.status(401).json({
            success:false,
            message: "User not created"
        })
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "User Successfully Created",
        user,
    })
    
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:['User created failed please check the details', error.message]
    })
  }
};

// signin controller

export const logIn = async (req, res) => {
  const {email, password} = req.body;
  
  try {
    const user = await User.findOne({
      email
    });
    if(!user){
        return res.status(401).json({
            success:false,
            message: "Invalid Credentials User not found Please Register Now"
        })
    }

    const isPasswordValid = await user.isPasswordMatched(password);
    if(!isPasswordValid){
        return res.status(401).json({
            success:false,
            message: "Invalid Credentials Email or Password"
        })
    }

    const { accessToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password");

    const cookieOptions = {
      httpOnly: true,
  secure: true,
  sameSite: "Lax", 
  maxAge: 24 * 60 * 60 * 1000,
  }

  return res.status(200)
  .cookie("accessToken", accessToken, cookieOptions)
    .json({
        success:true,
        message: "User Login Successfully",
        loggedInUser,
        data:{
          accessToken
        }
    });    
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
        success:false,
        message:['Internal Server Error', error.message]
    })
  }
};

export const allUsers = async (req, res) => {
    try {
        const user = await User.find({});
        if(!user){
            res.status(401).json({
                success:false,
                message: "Users not awaiable"
            })
        }
        res.status(200).json({
            success:true,
            message: "All users",
            user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:['internal server error', error.message]
        })
    }
};

export const getUser = async (req, res) => {
  const {accessToken} = req.cookies;
  if(!accessToken){
      return res.status(401).json({
          success:false,
          message: "Invalid Access Token check token"
      })
  }

  try {
      const user = await User.findById({_id: req.user._id}).select("-password -refreshToken");
      if(!user){
          return res.status(401).json({
              success:false,
              message: "Users not found"
          })
      }
      return res.status(200).json({
          success:true,
          message: "user Fetched successfully",
          user
      })

  } catch (error) {
    console.error("Error Details:", error);
      return res.status(500).json({
          success:false,
          message:['internal server error while fetching user', error.message]
      })
  }
};

export const logOut = async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { refreshToken: null } },
        { new: true }
      );
      
      res.clearCookie("accessToken", { httpOnly: true, secure: true });
      return res.status(200).json({
        success: true,
        message: "User Logout Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: ["Internal Server Error", error.message],
      });
    }
};


export const removeUser = async (req, res) => {
    const { id } = req.body;
  
    // Validate `_id` input
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }
  
    try {
      // Find and delete the user by ID
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      // Successfully deleted user
      return res.status(200).json({
        success: true,
        message: "User deleted successfully.",
        user,
      });
    } catch (error) {
      // Handle internal server errors
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error.message,
      });
    }
  };


  export const updateUser = async (req, res) => {
        try {
            const id = req.params.id;
            const updateUserData = req.body;

      const user = await User.findByIdAndUpdate({_id: id}, {$set:updateUserData}, {new: true});
      return res.status(200).json({
        success: true,
        message: "User Update successfully.",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error.message,
      });
    }
  };