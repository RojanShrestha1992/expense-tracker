const Transaction = require('../models/Transaction');

//get all transactions for a user

const getTransaction = async (req, res) => {
    try{
        const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(transactions); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//add new transaction

const addTransaction = async (req, res)=>{
    const {type,amount,category, description, date} = req.body;
    if(!type || !amount || !category){
        return res.status(400).json({ message: "Please fill in all required fields" });
    }

    try{
        const transaction = await Transaction.create({
            user: req.user._id,
            type,
            amount,
            category,
            description,
            date
        });
        const createdTransaction = await transaction.save();
        res.status(201).json(createdTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getTransaction, addTransaction };