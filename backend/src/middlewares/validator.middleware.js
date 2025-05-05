

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        return res.status(400).json({
        success: false,
            message: err.errors[0].message,
        });
    }
}

export default validate;