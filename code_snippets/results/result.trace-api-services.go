// response.body contains the string "OK".
body, _ := ioutil.ReadAll(response.Body)
fmt.Println(string(body))
