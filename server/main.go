package main

import (
	"encoding/json"
	"io/ioutil"
	"log"

	"sigs.k8s.io/yaml"
)

var serverConfig []Servers
var jsonParams map[string]interface{}

func main() {

	yFile, err1 := ioutil.ReadFile("./data/test.yaml")
	checkErr(err1)

	jFile, err2 := ioutil.ReadFile("./data/test.json")
	checkErr(err2)

	json.Unmarshal(jFile, &jsonParams)
	yaml.Unmarshal(yFile, &serverConfig)

	InitRouter()
}

func checkErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
