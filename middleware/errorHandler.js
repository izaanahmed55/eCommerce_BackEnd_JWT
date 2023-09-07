
// Error handling middleware
const errorHandler = (err, req, res, next) => {
   console.error("An error occurred:", err);

   // Default error values
   let statusCode = err.status || 500; 
   let error = err.message || "Internal server error" ;

   // Handle Mongoose validation errors
   if (err.name === "ValidationError") {
      statusCode = 400;
      error = "Validation error";
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(statusCode).json({ success: false, error, errors });
   }

   // Handle MongoDB duplicate key errors
   if (err.code === 11000) {
      statusCode = 400;
      error = "Duplicate key error";
      return res.status(statusCode).json({ success: false, error });
   }

   // Handle MongoDB ObjectId casting errors
   if (err.name === "CastError" && err.kind === "ObjectId") {
      statusCode = 400;
      error = "Invalid ObjectId";
      return res.status(statusCode).json({ success: false, error });
   }

   // Handle other types of errors
   return res.status(statusCode).json({ success: false, error });
};

module.exports = {
    errorHandler
}