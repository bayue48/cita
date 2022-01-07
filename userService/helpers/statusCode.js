const success = (m) => ({
  code: "01",
  status: true,
  message: "Success",
  data: m,
});

const error = (m) => ({
  code: "02",
  status: false,
  message: m,
  data: null,
});

const code = {
  success: 200,
  error: 500,
  notFound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  badRequest: 400,
  noContent: 204,
  forbidden: 403,
  unprocessable: 422,
};

module.exports = { success, error, code };
