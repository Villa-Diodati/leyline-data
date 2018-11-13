const handleErr = ({
  msg = 'unexpected error',
  status = 500,
  fatal = false,
  res,
  next,
}) => {
  res.locals = {
    status,
    fatal,
    data: { error: msg }
  }
  next()
}

module.exports = handleErr
