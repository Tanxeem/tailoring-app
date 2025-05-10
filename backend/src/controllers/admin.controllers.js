import Client from "../models/client.model.js";


export const createMeasurement = async (req, res) => {
    const {
        customerName,
        email,
        phone,
        address,
        shoulder,
        chest,
        waist,
        hips,
        sleeveLength,
        length,
        neck,
        cuff,
        notes
    } = req.body;

    try {
        const exsitingClient = await Client.findOne({
            $or: [
                { email },
                { phone }
            ]
        });
    
        if(exsitingClient){
            return res.status(400).json({
                success: false,
                message: "Client already exists"
            })
        }
    
        const client = await Client.create({
            customerName,
            email,
            phone,
            address,
            shoulder,
            chest,
            waist,
            hips,
            sleeveLength,
            length,
            neck,
            cuff,
            notes,
            userId: req.user._id
        });
    
        await client.save();
    
        return res.status(200).json({
            success: true,
            message: "Client created successfully",
            client
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: ["Internal Server Error", error.message]
        })
    }
}

export const allClients = async (req, res) => {
    try {
        let clients;
        if(req.user.role === 'admin') {
        clients =await Client.find({}).populate('userId', 'name email');
        }else if (req.user.role === 'tailor') {
            clients = await Client.find({userId: req.user._id}).populate('userId', 'name email');
        }else {
            return res.status(403).json({
                success: false,
                message: "Unauthorized Role"
            })
        }

    if(!clients || clients.length === 0){
        res.status(401).json({
            success:false,
            message: "Clients not awaiable"
        })
    }
    res.status(200).json({
        success:true,
        message: "Fatech All clients",
        clients
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:['internal server error', error.message]
        })
    }
}

export const removeClient =async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByIdAndDelete(id);
        if(!client){
            return res.status(404).json({
                success: false,
                message: "Client not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Client deleted successfully",
            client
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: ["Internal Server Error", error.message]
        })
    }
}

export const updateClient = async (req, res) => {
    const {id} = req.params;
    try {
        const client =await Client.findByIdAndUpdate(id, req.body, {new: true});
        if(!client){
            return res.status(404).json({
                success: false,
                message: "Client not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Client updated successfully",
            client
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: ["Internal Server Error", error.message]
        })
    }
}
      