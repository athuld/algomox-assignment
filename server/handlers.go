package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
	"sigs.k8s.io/yaml"
)

// The getServer handler will return the the selected server details combining the data from
// test.yaml and test.json file

func getServer(c *gin.Context) {
	id := c.Param("id")

	for _, server := range serverConfig {

		if server.SERVER == id {
			for _, v := range server.SERVER_PARAMS {
				for k, vv := range jsonParams {

					if v["PARAMETER_NAME"] == k {
						md := vv.(map[string]interface{})
						v["Level"] = md["Level"]
						v["Rank"] = md["Rank"]
					}
				}
			}
			c.JSON(http.StatusOK, server)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Server Not Found"})
}

// Post Handler updates the value to the test.yaml and test.json files with the edited data from user

func updateServer(c *gin.Context) {
	id := c.Param("id")

	for index, server := range serverConfig {
		if server.SERVER == id {
			serverConfig = append(serverConfig[:index], serverConfig[index+1:]...)
			var newServer Servers
			err := c.ShouldBindJSON(&newServer)
			checkErr(err)
			for _, v := range newServer.SERVER_PARAMS {
				for k, vv := range jsonParams {
					if v["PARAMETER_NAME"] == k {
						md := vv.(map[string]interface{})
						md["Level"] = v["Level"]
						md["Rank"] = v["Rank"]
						delete(v, "Level")
						delete(v, "Rank")
					}
				}
			}
			serverConfig = append(serverConfig, newServer)
			yData, err1 := yaml.Marshal(serverConfig)
			checkErr(err1)
			err2 := ioutil.WriteFile("./data/test.yaml", yData, 0664)
			checkErr(err2)

			jData, err3 := json.MarshalIndent(jsonParams, "", "\t")
			checkErr(err3)
			err4 := ioutil.WriteFile("./data/test.json", jData, 0664)
			checkErr(err4)
			c.JSON(http.StatusOK, serverConfig)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Update Failed"})
}
