const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register =  async(req,res)=>{
    const {name, email, password} = req.body
    try{
        const existing = await User.findOne({email});
        if(existing) return res.status(400),json({message:"User already exists"});

        const hashedPasssword = await bcrypt.hash(password,10);
        const user = await User.create({name, email, password: hashedPasssword})
        res.status(201).json({message: "User registered successfully"})
    } catch(err){
        res.status(500).json({err:err.message})
    }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    console.log("JWT_SECRET:", JWT_SECRET);  

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};