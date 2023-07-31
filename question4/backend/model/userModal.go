package model

type User struct {
	ID       uint   `json:"id" gorm:"primary_key`
	Username string `json:"username" binding: "required"`
	Password string `json:"password" binding: "required"`
	Email    string `json:"email" binding: "required"`
}
