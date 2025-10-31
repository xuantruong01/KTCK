export interface Expense {
  id: string;
  title: string;
  amount: number;
  createdAt: string;
  type: "Thu" | "Chi";
  isDeleted?: boolean;
}
