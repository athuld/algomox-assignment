package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Setup the router
func InitRouter() {
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/api/server/get/:id", getServer)
	router.POST("/api/server/update/:id", updateServer)

	router.Run("localhost:5000")
}