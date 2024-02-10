const User = require('../Model/userModel');
const Cloudinary = require('cloudinary');

exports.createUser = async (req, res) => {


  
    
        const { name, email, password } = req.body;

       
try{

  const myCloud = await Cloudinary.v2.uploader.upload(req.body.avatar, {

    folder: "avatars",
    width: 150,
    crop: "scale"
 })
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        const token = user.getJWTToken();

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(200).json({
          success: true,
            user,
            token,
            
        });

      }catch(e){

          res.status(500).json({
             
              message: e.message
          })
      }

    
    
}

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
      if (!email || !password) {
          return res.status(400).json({
              success: false,
              error: {
                  message: "Enter the email and password"
              }
          });
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next("Invalid email or password", 401);
      }
    
      const isPasswordMatched = await user.comparePassword(password);
    
      if (!isPasswordMatched) {
        return next("Invalid email or password", 401);
      }

      const token = user.getJWTToken();

      const options = {
          expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
          httpOnly: true,
      };

      // Set the token as a cookie
      res.cookie('token', token, options);

      res.status(200).json({
          success: true,
         user,
          token,
      });

  } catch (e) {
      res.status(500).json({
          success: false,
          error: {
              message: e.message
          }
      });
  }
}

exports.logoutUser = async(req, res,next)=>{

      try{

           res.cookie("token", null,{

                expires: new Date(Date.now()),
                httpOnly: true,


           });

            res.status(200).json({

                message: "LOG OUT SUCCESSFULLY",
                success: true
            })
      }catch(e){

           res.status(500).json({
              
               message: e.message,
               success: false
           })
      }
}



// Get User Detail
exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    try{
  
    res.status(200).json({
      success: true,
      user,
    });

  }catch(e){

      res.status(500).json({

          message: e.message
  })
  }
  };

  // update User password
exports.updatePassword =  async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    try{
  
    if (!isPasswordMatched) {
      return next("Old password is incorrect", 400);
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next("password does not match", 400);
    }
  
    user.password = req.body.newPassword;
  
    await user.save();

    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    // Set the token as a cookie
    res.cookie('token', token, options);

    res.status(200).json({
        success: true,
        user,
        token,
    });

  }catch(e){

    res.status(500).json({

      message: e.message
})

  }
  
    
  };
  
  // update User Profile
  exports.updateProfile = async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    try{
  
    // if (req.body.avatar !== "") {
    //   const user = await User.findById(req.user.id);
  
    //   const imageId = user.avatar.public_id;
  
    //   await cloudinary.v2.uploader.destroy(imageId);
  
    //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //   });
  
    //   newUserData.avatar = {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   };
    // }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });

  }catch(e){

       res.status(500).json({

           message: e.message
       })
  }
  };
  
  // Get all users(admin)
  exports.getAllUser = async (req, res, next) => {
    const users = await User.find();

    try{
  
    res.status(200).json({
      success: true,
      users,
    });

  }catch(e){

      res.status(500).json({

           message: e.message
      })
  }
  };
  
  // Get single user (admin)
  exports.getSingleUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    try{
  
    if (!user) {
      return next(
        `User does not exist with Id: ${req.params.id}`)
      
    }
  
    res.status(200).json({
      success: true,
      user,
    });

  }catch(e){

      res.status(500).json({
           message: e.message
      })
  }
  };
  
  // update User Role -- Admin
  exports.updateUserRole = async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    try{
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });

  }catch(e){

      res.status(500).json({

        message: e.message
      })
  }
  };
  
  // Delete User --Admin
  exports.deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    try{
  
    if (!user) {
      return next(
     `User does not exist with Id: ${req.params.id}`, 400)
   
    }
  
    // const imageId = user.avatar.public_id;
  
    // await cloudinary.v2.uploader.destroy(imageId);
  
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });

  }catch(e){

       res.status(500).json({

           message: e.message
       })
  }
  };
  