const IncomeSchema= require("../models/incomeModel")


exports.addIncome = async (req, res) => {
    const {name, amount, date, type}  = req.body

    const income = IncomeSchema({
        name,
        amount,
        date,
        type
    })

    try {
        //validations
        if(!name || !date || !type){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    // Validate the ID first
    if (!id) {
        return res.status(400).json({ message: 'Invalid request: Income ID is required.' });
    }

    try {
        const deletedIncome = await IncomeSchema.findByIdAndDelete(id);

        if (!deletedIncome) {
            // If no document was found and thus none deleted
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income Deleted' });
    } catch (err) {
        console.error('Error deleting income:', err);
        res.status(500).json({ message: 'Server Error', details: err.message });
    }
};