'use strict';

class ErrorHandler {

  async validationError(err) {
    const error = await this.errorFormattor(err.message);
    const errResp = {
      type: 'ValidationError',
      message: error
    };
    return this.badRequestResp(errResp);
  };

  tryCatchError(err) {
    if (err.respHeadersStatus) {
      return this.serverErrorResp(err.respParams);
    } else {
      const errResp = {
        type: 'serverError',
        message: err.message,
      }
      return this.serverErrorResp(errResp);
    }
  };

  customError(code, err) {
    const errResp = {
      type: 'customError',
      message: err.message,
    }
    return this.customErrorResp(code, errResp);
  };

  errorHander(code, err) {
    if (code) {
      return this.customError(code, err);
    }
    else if (err.name === 'ValidationError') {
      return this.validationError(err);
    }
    else {
      return this.tryCatchError(err);
    }
  };

  badRequestResp(errData) {
    return {
      respHeadersStatus: 400,
      respParams: errData
    };
  };

  serverErrorResp(errData) {
    return {
      respHeadersStatus: 500,
      respParams: errData
    };
  }

  customErrorResp(code, errData) {
    return {
      respHeadersStatus: code,
      respParams: errData
    };
  };

  errorFormattor(e) {
    const error = e.substring(e.indexOf(':') + 1).trim();
    const final = error.substring(error.indexOf(':') + 1).trim();
    return final;
  }
}

module.exports = ErrorHandler;
