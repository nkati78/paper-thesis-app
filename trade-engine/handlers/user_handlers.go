package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/paper-thesis/trade-engine/security"
	"github.com/paper-thesis/trade-engine/users"
	"github.com/paper-thesis/trade-engine/users/models"
)

type UserHandler struct {
	userService users.UserService
	auth        security.Auth
}

func NewUserHandler(userService users.UserService, auth security.Auth) *UserHandler {
	return &UserHandler{
		userService: userService,
		auth:        auth,
	}
}

type CreateUserHandlerResponse struct {
	Token string                     `json:"token"`
	User  *models.CreateUserResponse `json:"user"`
}

// CreateUser creates a new user
func (uh UserHandler) CreateUser(c *gin.Context) (HTTPStatusCode, interface{}) {
	var userRequest models.CreateUserRequest

	err := c.BindJSON(&userRequest)
	if err != nil {
		return HTTPStatusBadRequest, HTTPError{Message: "Invalid request"}
	}

	user, err := uh.userService.CreateUser(c, userRequest)
	if err != nil {
		return HTTPStatusInternalServerError, HTTPError{Message: "Internal server error"}
	}

	token, err := uh.auth.GenerateToken(user.ID)
	if err != nil {
		return HTTPStatusInternalServerError, HTTPError{Message: "Internal server error"}
	}

	return HTTPStatusCreated, CreateUserHandlerResponse{
		Token: token,
		User:  user,
	}
}

type LoginHandlerResponse struct {
	Token string      `json:"token"`
	User  *users.User `json:"user"`
}

// Login logs in a user
func (uh UserHandler) Login(c *gin.Context) (HTTPStatusCode, interface{}) {
	var loginRequest models.LoginUserRequest

	err := c.BindJSON(&loginRequest)
	if err != nil {
		return HTTPStatusBadRequest, HTTPError{Message: "Invalid request"}
	}

	user, err := uh.userService.Login(c, loginRequest)
	if err != nil {
		if err == users.IncorrectEmailOrPass {
			return HTTPStatusUnauthorized, HTTPError{Message: "Incorrect email or password"}
		}

		return HTTPStatusInternalServerError, HTTPError{Message: "Internal server error"}
	}

	token, err := uh.auth.GenerateToken(user.ID)
	if err != nil {
		return HTTPStatusInternalServerError, HTTPError{Message: "Internal server error"}
	}

	return HTTPStatusOK, LoginHandlerResponse{
		Token: token,
		User:  user,
	}
}
