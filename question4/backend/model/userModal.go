package model

type User struct {
	ID       string `gorm:"primary_key" json:"id"`
	Username string `json:"username" binding: "required"`
	Password string `json:"password" binding: "required"`
	Email    string `json:"email" binding: "required"`
}
