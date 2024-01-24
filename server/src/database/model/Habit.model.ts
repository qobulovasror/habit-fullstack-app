export default interface IHabit {
    id: number;
    user_id: number;
    name: string;
    description: string;
    createdAt: string;
    frequency: number;
    amount: number;
    amountType: string;
    change: boolean;
    changeValue: number;
    target: number;
    reminder: boolean,
    reminderTime: string;
}