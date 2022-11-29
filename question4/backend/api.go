package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	// "github.com/mattn/go-sqlite3"
)

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

var Users []User

func db_connect() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	return db
}

func main() {
	r := gin.Default()

	r.Use(cors.Default())
	db := db_connect()

	userRoutes := r.Group("/users")
	{
		userRoutes.GET("/", GetUsers)
		userRoutes.POST("/", CreateUser)
		userRoutes.PUT("/:id", EditUser)
		userRoutes.DELETE("/:id", DeleteUser)
		userRoutes.GET("/:id", GetUser)
	}

	db.AutoMigrate(&User{})

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func GetUsers(c *gin.Context) {
	db := db_connect()
	db.Table("users").Find(&Users)

	c.JSON(200, Users)
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

	reqBody.ID = uuid.New().String()

	db := db_connect()
	db.Create(&reqBody)
	db.Commit()

	c.JSON(200, reqBody.ID)
}

func EditUser(c *gin.Context) {
	id := c.Param("id")

	var reqBody User
	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(422, gin.H{
			"error":   true,
			"message": "Invalid Input",
		})
		return
	}

	db := db_connect()
	new := db.Table("users").Where("id = ?", id).Updates(User{Username: reqBody.Username, Password: reqBody.Password, Email: reqBody.Email})
	db.Commit()

	if new.Error != nil {
		c.JSON(404, gin.H{
			"error":   true,
			"message": "Invalid User Id",
		})
		return
	}

	c.JSON(200, gin.H{"error": false})
	return
}

func DeleteUser(c *gin.Context) {
	id := c.Param("id")

	db := db_connect()
	new := db.Table("users").Where("id = ?", id).Delete("Users")
	db.Commit()

	if new.Error != nil {
		c.JSON(404, gin.H{
			"error":   true,
			"message": "Invalid User Id",
		})
		return
	}

	c.JSON(200, gin.H{"error": false})
	return
}

func GetUser(c *gin.Context) {
	id := c.Param("id")

	db := db_connect()
	db.Table("users").Where("id = ?", id).Find(&Users)

	c.JSON(200, Users[0])
}
