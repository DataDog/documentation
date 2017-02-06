package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

type Service map[string]map[string]string

func main() {
    // Send the service.
    service := make(Service)
    service["service_name"] = make(map[string]string)
    service["service_name"]["app"] = "my-app"
    service["service_name"]["app_type"] = "web"
    jsonService, _ := json.Marshal(service)

    client := &http.Client{}
    request, _ := http.NewRequest("PUT", "http://localhost:7777/v0.3/services", bytes.NewBuffer(jsonService))
    request.Header.Add("Content-Type", "application/json")
    response, _ := client.Do(request)
}
