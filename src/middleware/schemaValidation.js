import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

const validateSchema = (schema) => {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid request data',
        details: validate.errors,
      });
    }
    next();
  };
};

export default validateSchema;
