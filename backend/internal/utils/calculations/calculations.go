package calculations

import "math"

func Haversine(lat1, lon1, lat2, lon2 float64) float64 {
	return math.Acos(math.Sin(lat1)*math.Sin(lat2)+math.Cos(lat1)*math.Cos(lat2)*math.Cos(lon2-lon1)) * 6371
}
