const GoalSchema = require("../models/goalModel");

exports.addGoal = async (req, res) => {
    const { goal, targetAmount, currentSavings } = req.body;

    const newGoal = new GoalSchema({
        goal,
        targetAmount,
        currentSavings
    });

    try {
        if (!goal || !targetAmount) {
            return res.status(400).json({ message: 'Goal name and target amount are required!' });
        }
        await newGoal.save();
        res.status(201).json({ message: 'Goal Added', goal: newGoal });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const goals = await GoalSchema.find().sort({ createdAt: -1 });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateGoalSavings = async (req, res) => {
    const { id } = req.params;
    const { additionalSavings } = req.body;

    try {
        const goal = await GoalSchema.findById(id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        goal.currentSavings += parseFloat(additionalSavings);
        await goal.save();
        res.status(200).json({ message: 'Savings updated', goal });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
