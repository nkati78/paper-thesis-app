package models

type CreateUserRequest struct {
	Username   string `json:"username"`
	Email      string `json:"email"`
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Password   string `json:"password"`
	Connection string `json:"connection"`
	ProviderID string `json:"providerId"`
}

type CreateUserResponse struct {
	ID         string `json:"id"`
	Username   string `json:"username"`
	Email      string `json:"email"`
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Connection string `json:"connection"`
}

type LoginUserRequest struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}
