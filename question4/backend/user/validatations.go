package user

import (
	"api-tut/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func VerifyId(c *gin.Context) {
	var user model.User
	id := c.Param("id")
	db := model.Database()
	db.Where("id = ?", id).Find(&user)
	if user.Username == "" {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   true,
			"message": "User not found",
		})
		c.Abort()
		return
	}
	c.Set("user", user)
	c.Next()
}

func ValidateUser(c *gin.Context) {
	var reqBody model.User
	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "Invalid Input",
		})
		c.Abort()
		return
	}
	c.Set("reqBody", reqBody)
	c.Next()
}
