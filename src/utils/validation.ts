export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    weight?: string;
    utility?: string;
    capacity?: string;
  };
}

export function validateResource(
  name: string,
  weight: number,
  utility: number
): ValidationResult {
  const errors: { name?: string; weight?: string; utility?: string } = {};

  if (!name || name.trim().length === 0) {
    errors.name = 'Resource name cannot be empty.';
  } else if (name.trim().length > 40) {
    errors.name = 'Name must be 40 characters or less.';
  }

  if (isNaN(weight) || weight <= 0) {
    errors.weight = 'Weight must be a positive number greater than 0.';
  } else if (weight > 100) {
    errors.weight = 'Weight cannot exceed 100 kg.';
  }

  if (isNaN(utility) || utility < 0) {
    errors.utility = 'Utility priority value must be 0 or greater.';
  } else if (utility > 1000) {
    errors.utility = 'Utility cannot exceed 1000.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateCapacity(capacity: number): { isValid: boolean; error?: string } {
  if (isNaN(capacity) || capacity < 0) {
    return { isValid: false, error: 'Truck capacity must be 0 or greater.' };
  }
  if (capacity > 60) {
    return { isValid: false, error: 'Maximum supported truck capacity for DP visualization is 60 kg.' };
  }
  return { isValid: true };
}
