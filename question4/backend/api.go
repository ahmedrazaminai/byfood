package main

import (
	"errors"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type User struct {
	ID       string `gorm:"primary_key" json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

var Users []User
var db *gorm.DB

func init() {
	dbinit, err := gorm.Open("sqlite3", "gorm.db")
	if err != nil {
		panic("failed to connect database")
	}
	db = dbinit

	db.AutoMigrate(&User{})
}

func main() {
	r := gin.Default()

	r.Use(cors.Default())

	userRoutes := r.Group("/users")
	{
		userRoutes.GET("/", GetUsers)
		userRoutes.POST("/", CreateUser)
		userRoutes.PUT("/:id", EditUser)
		userRoutes.DELETE("/:id", DeleteUser)
		userRoutes.GET("/:id", GetUser)
	}

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func GetUsers(c *gin.Context) {
	var users []User
	db.Find(&users)

	c.JSON(http.StatusOK, users)
}

func CreateUser(c *gin.Context) {
	var reqBody User
	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "Invalid Input",
		})
		return
	}
	reqBody.ID = uuid.New().String()[:8]

	db.Create(&reqBody)

	c.JSON(http.StatusCreated, reqBody.ID)
}

func EditUser(c *gin.Context) {
	var reqBody User
	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   true,
			"message": "Invalid Input",
		})
		return
	}

	user, err := getUserById(c)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   true,
			"message": err.Error(),
		})
		return
	}

	reqBody.ID = user.ID
	db.Save(&reqBody)
	c.JSON(http.StatusNoContent, gin.H{"error": false})
}

func DeleteUser(c *gin.Context) {
	user, err := getUserById(c)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   true,
			"message": err.Error(),
		})
		return
	}

	db.Where("id = ?", user.ID).Delete(&user)
	c.JSON(http.StatusNoContent, gin.H{"error": false})
}

func GetUser(c *gin.Context) {
	user, err := getUserById(c)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   true,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, user)
}

func getUserById(c *gin.Context) (User, error) {
	var user User
	id := c.Param("id")

	db.Where("id = ?", id).Find(&user)
	if user.ID == "" {
		return user, errors.New("Invalid User Id")
	}

	return user, nil
}
