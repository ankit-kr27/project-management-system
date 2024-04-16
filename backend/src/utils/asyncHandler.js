// const asyncHandler = (fn) => async (req, res, next) =>{
//     try{
//         await fn(req, res, next);
//     }catch(err){
//         res.status(err.code || 500).json({   
//             success: false,
//             message: err.message
//         })
//     }
// }

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)) // next is just a boolean flag if the MW is done working or not
            .catch((err) => {
                res.status(err.code || 500).json({
                    // sets the http error status
                    success: false,
                    message: err.message,
                });
                next(err);
            });
    };
};

export {asyncHandler};
