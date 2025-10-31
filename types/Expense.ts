export interface Expense {
  id: string;
  title: string;
  amount: number;
  createAt: string;
  type: "Thu" | "Chi";
  isDeleted?: boolean;
}
