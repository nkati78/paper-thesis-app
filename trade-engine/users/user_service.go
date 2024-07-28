package users

import (
	"context"
	"errors"
	"github.com/paper-thesis/trade-engine/users/data"
	"github.com/paper-thesis/trade-engine/users/models"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	dal data.DataProvider
}

type LoginError error

var (
	IncorrectEmailOrPass LoginError = errors.New("incorrect email or password")
)

func NewUserService(dal data.DataProvider) UserService {
	return UserService{dal: dal}
}

func (us UserService) CreateUser(ctx context.Context, request models.CreateUserRequest) (*models.CreateUserResponse, error) {
	user := data.UserDB{
		Username:   request.Username,
		Email:      request.Email,
		FirstName:  request.FirstName,
		LastName:   request.LastName,
		ProviderID: request.ProviderID,
	}

	if request.Password != "" {
		// hash the password
		passwordHash, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
		if err != nil {
			return nil, err
		}

		user.PasswordHash = string(passwordHash)
		user.ConnectionType = data.UsernamePassword
	}

	userResult, err := us.dal.CreateUser(ctx, user)
	if err != nil {
		return nil, err
	}

	return &models.CreateUserResponse{
		ID:        userResult.ID,
		Username:  userResult.Username,
		Email:     userResult.Email,
		FirstName: userResult.FirstName,
		LastName:  userResult.LastName,
	}, nil
}

func (us UserService) Login(ctx context.Context, request models.LoginUserRequest) (*User, error) {
	user, err := us.dal.GetUserByUsername(ctx, request.Username)
	if err != nil {
		return nil, IncorrectEmailOrPass
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(request.Password))
	if err != nil {
		return nil, IncorrectEmailOrPass
	}

	return &User{
		ID:        user.ID,
		Username:  user.Username,
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	}, nil
}
