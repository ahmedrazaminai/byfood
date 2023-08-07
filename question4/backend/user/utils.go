package user

import (
	"api-tut/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {
	var users []model.User

	db := model.Database()
	db.Find(&users).Select("id, username, email, role")

	c.JSON(http.StatusOK, users)
}

func CreateUser(c *gin.Context) {
	reqBody := c.MustGet("reqBody").(model.User)

	if reqBody.Username == "" || reqBody.Email == "" || reqBody.Role == "" || reqBody.FirstNames == "" || reqBody.LastName == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "Invalid Input",
		})
		return
	}

	db := model.Database()
	db.Create(&reqBody)

	c.JSON(http.StatusCreated, reqBody.ID)
}

func EditUser(c *gin.Context) {
	reqBody := c.MustGet("reqBody").(model.User)

	user := getUserById(c)

	reqBody.ID = user.ID

	if reqBody.Username == "" {
		reqBody.Username = user.Username
	}
	if reqBody.Email == "" {
		reqBody.Email = user.Email
	}
	if reqBody.Role == "" {
		reqBody.Role = user.Role
	}
	if reqBody.FirstNames == "" {
		reqBody.FirstNames = user.FirstNames
	}
	if reqBody.LastName == "" {
		reqBody.LastName = user.LastName
	}

	db := model.Database()
	db.Save(&reqBody)
	c.JSON(http.StatusNoContent, gin.H{"error": false})
}

func DeleteUser(c *gin.Context) {
	user := getUserById(c)

	db := model.Database()
	db.Where("id = ?", user.ID).Delete(&user)
	c.JSON(http.StatusNoContent, gin.H{"error": false})
}

func GetUser(c *gin.Context) {
	user := getUserById(c)

	c.JSON(http.StatusOK, user)
}

func getUserById(c *gin.Context) model.User {
	user := c.MustGet("user").(model.User)

	return user
}
