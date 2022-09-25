
exports.validateAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next()
    }else{
        res.status(401).send(' You dont have permission to access this admin page')
    }
}

exports.validatePlayer = (req, res, next) => {
    if (req.user.role === 'player') {
        next()
    }else{
        res.status(401).send(' You dont have permission to access this player page')
    }
}
