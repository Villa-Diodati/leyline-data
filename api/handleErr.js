const handleErr = ({
  message = 'unexpected error',
  status = 500,
  fatal = false,
  res,
  next,
}) => {
  res.locals = {
    status,
    fatal,
    data: { error: message }
  }
  next()
}

module.exports = handleErr
