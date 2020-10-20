import { Request, Response } from "express";

import AuthServices from "../services/AuthServices";
import UserServices from "../services/UsersServices";
import ProfileServices from './../services/ProfileServices';

export default class User {
  private name: string;
  private password: string;
  private id: number;
  private email: string;
  private isAdmin: boolean;

  constructor(name: string, password: string, id: number, email: string, isAdmin: boolean) {
    this.name = name;
    this.password = password;
    this.id = id;
    this.email = email;
    this.isAdmin = isAdmin;
  }

  static async signIn({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    return AuthServices.authenticate({ request, response });
  }

  static async signInSocial({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    return AuthServices.socialAuthenticate({ request, response });
  }

  static async recoverUserData({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    return ProfileServices.retrieveUserData({ request, response });
  }

  static async signUp({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    return UserServices.store({ request, response });
  }

  static async changeData({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    return UserServices.update({ request, response });
  }

  static async destroyData({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }) {
    return UserServices.destroy({ request, response });
  }

  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getId() {
    return this.id;
  }
  getPassword() {
    return this.password;
  }
  getIsAdmin() {
    return this.isAdmin;
  }
}
