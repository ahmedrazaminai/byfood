package main

import (
	"api-tut/model"
	"api-tut/user"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	model.Database()
}

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	userRoutes := router.Group("/users")
	{
		userRoutes.GET("/", user.GetUsers)
		userRoutes.POST("/", user.ValidateUser, user.CreateUser)
		userRoutes.PUT("/:id", user.VerifyId, user.ValidateUser, user.EditUser)
		userRoutes.DELETE("/:id", user.VerifyId, user.DeleteUser)
		userRoutes.GET("/:id", user.VerifyId, user.GetUser)
	}

	router.Run()
}
