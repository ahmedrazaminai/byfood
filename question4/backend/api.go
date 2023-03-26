package main

import (
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
	dinit, err := gorm.Open("sqlite3", "gorm.db")
	if err != nil {
		panic("failed to connect database")
	}
	db = dinit

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

	c.JSON(200, users)
}

func CreateUser(c *gin.Context) {
	var reqBody User
	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(422, gin.H{
			"error":   true,
			"message": "Invalid Input",
		})
		return
	}
	reqBody.ID = uuid.New().String()[:8]

	db.Create(&reqBody)

	c.JSON(200, reqBody.ID)
}

func EditUser(c *gin.Context) {
	var reqBody User
	reqBody.ID = c.Param("id")

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(422, gin.H{
			"error":   true,
			"message": "Invalid Input",
		})
		return
	}
	update := db.Save(&reqBody)

	if update.Error != nil {
		c.JSON(404, gin.H{
			"error":   true,
			"message": "Invalid User Id",
		})
		return
	}
	c.JSON(200, gin.H{"error": false})
}

func DeleteUser(c *gin.Context) {
	var user User
	id := c.Param("id")

	db.Where("id = ?", id).Find(&user)

	if user.ID == "" {
		c.JSON(404, gin.H{
			"error":   true,
			"message": "Invalid User Id",
		})
		return
	}
	db.Where("id = ?", id).Delete(&user)

	c.JSON(200, gin.H{"error": false})
}

func GetUser(c *gin.Context) {
	var user User
	id := c.Param("id")

	db.Where("id = ?", id).Find(&user)

	if user.ID == "" {
		c.JSON(404, gin.H{
			"error":   true,
			"message": "Invalid User Id",
		})
		return
	}
	c.JSON(200, user)
}
