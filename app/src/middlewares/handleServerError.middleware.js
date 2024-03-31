const handleServerError = (err, req, res, next) => {
	console.error(err);
	res.status(500).json({ status: 500, message: 'internal server error' });
};

export default handleServerError;
