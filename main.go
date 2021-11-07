package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"sigs.k8s.io/yaml"
)

// Server Struct (Model)

type Servers struct {
	SERVER              string
	SERVER_DISPLAY_NAME string
	SERVER_PORT         int
	SERVER_PARAMS       []map[string]interface{}
}

type Parameters struct {
	FirstParameter  Params `json:"First Parameter"`
	SecondParameter Params `json:"Second Parameter"`
	ThirdParameter  Params `json:"Third Parameter"`
	FourthParameter Params `json:"Fourth Parameter"`
}

type Params struct {
	Level string
	Rank  int
}

var serverConfig []Servers
var jsonParams map[string]interface{}

func getServer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	for _, server := range serverConfig {

		if server.SERVER == params["id"] {
			for _, v := range server.SERVER_PARAMS {
				for k, vv := range jsonParams {

					if v["PARAMETER_NAME"] == k {
						md := vv.(map[string]interface{})
						v["Level"] = md["Level"]
						v["Rank"] = md["Rank"]
					}
				}
			}
			json.NewEncoder(w).Encode(server)
			return
		}
	}
	json.NewEncoder(w).Encode(&Servers{})
}

func updateServer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	params := mux.Vars(r)

	for index, server := range serverConfig {
		if server.SERVER == params["id"] {
			serverConfig = append(serverConfig[:index], serverConfig[index+1:]...)

			var newServer []Servers
			_ = json.NewDecoder(r.Body).Decode(&newServer)
			for _, v := range newServer[0].SERVER_PARAMS {
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
			serverConfig = append(serverConfig, newServer...)
			yData, err1 := yaml.Marshal(serverConfig)
			checkErr(err1)
			err2 := ioutil.WriteFile("test.yaml", yData, 0664)
			checkErr(err2)

			jData, err3 := json.MarshalIndent(jsonParams, "", "\t")
			checkErr(err3)
			err4 := ioutil.WriteFile("test.json", jData, 0664)
			checkErr(err4)

			json.NewEncoder(w).Encode(serverConfig)
			return
		}
	}
}

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {

	yFile, err1 := ioutil.ReadFile("./test.yaml")

	checkErr(err1)

	jFile, err2 := ioutil.ReadFile("./test.json")
	checkErr(err2)

	if json.Valid(jFile) {
		json.Unmarshal(jFile, &jsonParams)
	} else {
		fmt.Println("Json not valid")
	}

	yaml.Unmarshal(yFile, &serverConfig)

	// Init Router
	router := mux.NewRouter()

	// Route Handlers
	router.HandleFunc("/api/server/get/{id}", getServer).Methods("GET")
	router.HandleFunc("/api/server/update/{id}", updateServer).Methods("POST")
	log.Fatal(http.ListenAndServe(":5000", router))
}
