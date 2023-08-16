import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

export const validateSchema = (schema, data) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    throw {
      valid: false,
      message: validate.errors,
    };
  }
  return {
    valid: true,
  };
};
