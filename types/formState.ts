export type CreateGoalFormState =
  | {
      errors?: {
        name?: string[];
        targetAmount?: string[];
      };
      message?: string;
    }
  | undefined;

export type LoginFormState =
  | {
      errors?: {
        name?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type DepositFormState =
  | {
      errors?: {
        amount?: string[];
      };
      message?: string;
    }
  | undefined;

export type WithdrawFormState =
  | {
      errors?: {
        amount?: string[];
      };
      message?: string;
    }
  | undefined;