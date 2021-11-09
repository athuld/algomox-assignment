package main

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
