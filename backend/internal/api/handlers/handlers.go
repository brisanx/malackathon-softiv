package handlers

import (
	"backend/internal/models"
	"backend/internal/store"
	"backend/internal/utils/calculations"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)

var DB store.Client

func init() {
	err := DB.Init()
	if err != nil {
		panic(err)
	}
}

func HandlerGetEmbalses(w http.ResponseWriter, r *http.Request) {

	latitudStr := r.PathValue("latitud")
	longitudStr := r.PathValue("longitud")
	radioStr := r.PathValue("radio")

	if radioStr == "" {
		radioStr = "100"
	}

	// Get embalses
	respMap, err := DB.Get()
	if err != nil {
		w.Write([]byte("Error al obtener los embalses"))
		return
	}

	var embalseList []models.Embalse

	// Parse to float
	latitud, _ := strconv.ParseFloat(latitudStr, 64)
	longitud, _ := strconv.ParseFloat(longitudStr, 64)
	radio, _ := strconv.ParseFloat(radioStr, 64)

	response := make(map[string]interface{})

	// Filter embalses
	for _, embalse := range respMap {
		embalse.X = strings.Replace(embalse.X, ",", ".", -1)
		embalse.Y = strings.Replace(embalse.Y, ",", ".", -1)
		embalseX, _ := strconv.ParseFloat(embalse.X, 64)
		embalseY, _ := strconv.ParseFloat(embalse.Y, 64)

		dist := calculations.GetDistanceBetweenPoints(embalseX, embalseY, latitud, longitud)
		if dist <= radio {
			embalseList = append(embalseList, embalse)
		}
	}

	response["items"] = embalseList
	response["count"] = len(embalseList)
	RespondWithJSON(w, http.StatusOK, response)
}

func RespondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}
