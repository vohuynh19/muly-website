import crypto from 'crypto';

const uuid = () => {
  return crypto.randomUUID();
};

/**
 * Create random id
 */
export default uuid;
