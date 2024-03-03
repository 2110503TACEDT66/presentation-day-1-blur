const Appointment  = require('../models/Appointment'); // require ติดต่อผ่านฐานข้อมูล
const Dentists = require('../models/Dentist');
const Clinic = require("../models/Clinic");

//@desc Get all appointments
//@route GET/api/v1/appointments
//@access Private

exports.getAppointments = async (req, res, next) => {
  try {
    let query;

    if (req.user.role !== "admin") {
      // General user: Only see their appointments and populate clinic and dentist
      query = Appointment.find({ user: req.user.id })
        .populate({
          path: "dentist",
          select: "name yearsOfExperience areaOfExpertise",
        })
        .populate({
          path: "clinic",
          select: "name address",
        });
    } else {
      // Admin: Control based on dentist ID parameter
      if (req.params.dentistId) {
        console.log(req.params.dentistId);
        query = Appointment.find({ dentist: req.params.dentistId })
          .populate({
            path: "dentist",
            select: "name yearsOfExperience areaOfExpertise",
          })
          .populate({
            path: "clinic",
            select: "name address",
          });
      } else {
        // Admin: All appointments, populate clinic and dentist
        query = Appointment.find()
          .populate({
            path: "dentist",
            select: "name yearsOfExperience areaOfExpertise",
          })
          .populate({
            path: "clinic",
            select: "name address",
          });
      }
    }

    const appointments = await query.exec(); // Execute the query asynchronously

    res.status(200).json({
      success: true,
      count: appointments.length, // Use count instead of "const" which is a reserved keyword
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching appointments" });
  }
};


//@desc Get single appointment
//@route GET /api/appointments/:id
//@access Public
exports.getAppointment = async(req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
    .populate({
      path: 'dentist',
      select: 'name description tel'
    }).populate({
      path: "clinic",
      select: "name address",
    });
    if(!appointment){
      return res.status(404).json({success:false, message: `No appointment with the id of ${req.params.id}`});
    }
    res.status(200).json({success:true,data: appointment});

  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"Cannot find Appointment"}); 
  }
};

//@desc Add appointment 
//@route POST / api/v1/dentists/:dentistId/appointment
//@access Private
exports.addAppointment = async(req,res,next)=> {
  try {
    req.body.dentist = req.params.dentistId;
    const dentist = await Dentists.findById(req.params.dentistId);

    if(!dentist){
      return res.status(404).json({success:false, 
        message: `No dentist with the id of ${req.params.dentistId}`});
    }
    // add user Id to req.body
    req.body.user = req.user.id;
    //Check for existed appointment
    const existedAppointments = await Appointment.find({user:req.user.id});
    //If the user is not an admin, they can only create 3 appointment
    if(existedAppointments.length >= 1 && req.user.role !== 'admin'){
      return res.status(400).json({success:false, 
        message: `The user with ID ${req.user.id} has already made 1 appointments`});
    }

    const appointment = await Appointment.create(req.body);

    res.status(201).json({success:true, data: appointment});

  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message: "Cannot create Appointment"});
  }
}

//@desc Update appointment
//@route PUT/api/v1/appointment/:id
//@access Private
exports.updateAppointment = async(req, res, next) =>{
  try {
    let appointment = await Appointment.findById(req.params.id);

    if(!appointment){
      return res.status(404).json({success:false, 
        message:`No appointment intment with the id of ${req.params.id}`});
    }

    //Make sure user is the appointment owner
    if(appointment.user.toString()!== req.user.id && req.user.role !== 'admin'){
      return res.status(401).json({success:false, 
        message: `User ${req.user.id} is not authorized to update this appointment`});
    }
    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body,{
      new:true,
      runValidators:true
    });

    res.status(200).json({success:true, data:appointment});
  } catch (error) {
      console.log(error);
      return res.status(500).json({success:false, message: "Cannot update Appointment"});
  }
};

//@desc Delete appointment
//@route DELETE/api/appointment/:id
//@access Private

exports.deleteAppointment = async(req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if(!appointment){
      return res.status(404).json({success:false, 
        message: `No appointment with the id of ${req.params.id}`});
    }

    //Make sure user is the appointment owner
    if(appointment.user.toString()!== req.user.id && req.user.role !== 'admin'){
      return res.status(401).json({success:false, 
        message:`User ${req.user.id} is not authorized to delete this appointment`});
    }
    

    await appointment.deleteOne();
    res.status(200).json({success:true, data:{}});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message: "Cannot delete Appointment"});
  }
};