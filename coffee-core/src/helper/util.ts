const bcryptjs = require('bcryptjs');
const saltRounds = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
  try {
    return await bcryptjs.hash(plainPassword, saltRounds);
  } catch (error) {
    console.log(error);
  }
};

export const comparePasswordHelper = async (
  plainPassword: string,
  hashPassword: string,
) => {
  try {
    return await bcryptjs.compare(plainPassword, hashPassword);
  } catch (error) {
    console.log(error);
  }
};
