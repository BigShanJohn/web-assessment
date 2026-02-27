/**
 * HTTP Status Code Constants
 * ---------------------------------------
 * Centralized definition of HTTP status codes
 * to avoid magic numbers and improve readability,
 * maintainability, and scalability.
 *
 * Usage:
 *   res.status(HTTP_STATUS.UNAUTHORIZED).json(...)
 */

module.exports = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};
