const complaint = require("../Model/ComplaintModel");

const getAllcomplaints = async(req, res, next)=>{
    let complaints;

    //get all complaints
    try{
        complaints= await complaint.find();
    }catch(err)
    {
        console.log(err);
    }
    //not found
    if(!complaints){
        return res.status(404).json({message:"Complaint not found"});
    }
    //Display all complaints
    return res.status(200).json({complaints});
};


//data Insert
const addComplaints = async (req, res, next) =>{
    const{complaintid,serviceName,serviceProvider,date,location, bookingId, contactnumber, complaintCategory, urgencyLevel}=req.body;

    let complaints;
    try{
        complaints = new complaint({complaintid,serviceName,serviceProvider,date,location, bookingId, contactnumber, complaintCategory, urgencyLevel});
        await complaints.save();
        res.status(200).json(id);
    }catch(err)
    {
        console.log(err);
    }
    //not insert complaints
    if(!complaints){
        return res.status(404).json({message:"Unable to add complaints"});
    }
    return res.status(200).json({complaints});
};

//Get byId
const getById = async(req, res, next) => {

    const id = req.params.id;

    let Complaint;

    try{
        Complaint = await complaint.findById(id);

          //not available complaints
          if(!Complaint){
            return res.status(404).json({message:"Complaint not found"});
        }

        return res.status(200).json({ Complaint });
    }
    catch(err){
       console.log(err);
    }

};


//Update Complaint details
const updateComplaint = async (req, res, nest)=>{
    console.log(res.params);
    const id = req.params.id;
    const{complaintid,serviceName,serviceProvider,date,location, bookingId, contactnumber, complaintCategory, urgencyLevel,Status}=req.body;
 
    let Complaints;
    try{
        Complaints = await complaint.findByIdAndUpdate(id,
            {complaintid: complaintid,serviceName: serviceName ,serviceProvider: serviceProvider,date: date,location: location, bookingId: bookingId, contactnumber: contactnumber, complaintCategory: complaintCategory, urgencyLevel: urgencyLevel,Status:Status}
        , { new: true});
       // complaints = await complaints.save();
    }catch(err){
        console.log(err);
    }
    if(!Complaints){
        return res.status(404).json({message:"Unable to update the Complaints Details"});
    }

    return res.status(200).json({ Complaints });
};

//Deleta complaints
const deleteComplaint = async (req,res, next)=>{
    const id = req.params.id;

    let deleteComplaint;
    try{
        const Complaint = await complaint.findById(id)
        deleteComplaint = await complaint.findByIdAndDelete(id);
        if(!Complaint){
            return res.status(404).json({message:"Complaint not found"});
        }
        return res.status(200).json({message:"Complaint Deleted.",deleteComplaint});
    }catch(err)
    {
        console.log(err);
    }
    

}

exports.getAllComplaints = getAllcomplaints;
exports.addComplaints = addComplaints;
exports.getById=getById;
exports.updateComplaint = updateComplaint;
exports.deleteComplaint=deleteComplaint;