package model

type User struct {
	ID         uint   `json:"id"; gorm:"primary_key`
	Username   string `json:"username"`
	Email      string `json:"email"`
	Role       string `json:"role"`
	Bio        string `json:"bio" `
	FirstNames string `json:"firstNames"`
	LastName   string `json:"lastName"`
}
