/*
 * @file: Connection.js
 * @description: Connection file for the application
 * @date: 13.12.2018
 * @author: Suraj Sanwal
 * */
/* eslint-disable */
'use strict';

// const apiServer = "7hyhccb00d.execute-api.us-east-1.amazonaws.com";
const apiServer = 'kq7ikzm0kf.execute-api.eu-west-1.amazonaws.com';

//uncomment these four line for use staging

const running_url = apiServer,
  http_url = `https://${running_url}`,
  apiBase_url = `https://${running_url}/`;

export default class Connection {
  static getResturl() {
    return apiBase_url;
  }
  static getCmsUrl() {
    return frontEndUrl;
  }
  static getBaseUrl() {
    return http_url;
  }
  static getSuccessUrl() {
    return `${apiBase_url}success.html`;
  }
  static getErroUrl() {
    return `${apiBase_url}failure.html`;
  }
}
