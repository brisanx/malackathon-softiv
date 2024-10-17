package store

import (
	"backend/internal/models"
	"database/sql"
	"fmt"
	"log"
)

type Client struct {
	Storage *sql.DB
}

var host string = "adb.eu-madrid-1.oraclecloud.com"
var port string = "1521"
var user string = "softiv"
var password string = "SoftixOriginal9"
var URL string = fmt.Sprintf("http://%s:%s@%s:%s/ords/softiv/aguas/", host, port, user, password)

func (c *Client) Init() error {

	dsn := `user="softiv"
	password="SoftixOriginal9"
	connectString="(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=tcps)(HOST=adb.eu-madrid-1.oraclecloud.com)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=gc3eeaeb007c725_ot9wq4pcwvtlr7me_high.adb.oraclecloud.com))(SECURITY=(SSL_SERVER_DN_MATCH=YES)))"
	libDir="/home/uni/tools/instantclient_23_5"`

	db, err := sql.Open("godror", dsn)
	if err != nil {
		fmt.Println(err)
		return nil
	}
	c.Storage = db
	return nil
}

func (c *Client) Get() ([]models.Embalse, error) {
	rows, err := c.Storage.Query("SELECT * FROM LISTADO ORDER BY CODIGO")
	if err != nil {
		log.Printf("GET() error: %s", err)
		return nil, err
	}

	defer rows.Close()
	var embalses []models.Embalse

	for rows.Next() {
		var embalse models.Embalse
		err := rows.Scan(&embalse.Codigo, &embalse.Nombre, &embalse.Embalse, &embalse.X, &embalse.Y, &embalse.DEMARC, &embalse.CAUCE, &embalse.GOOGLE, &embalse.OPENSTREETMAP, &embalse.WIKIDATA, &embalse.PROVINCIA, &embalse.CCAA, &embalse.TIPO, &embalse.COTA_CORON, &embalse.ALT_CIMIEN, &embalse.INFORME)

		if err != nil {
			log.Printf("GET() error: %s", err)
			return nil, err
		}
		embalses = append(embalses, embalse)
	}

	return embalses, nil
}
