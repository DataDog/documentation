---
aliases:
- /continuous_integration/static_analysis/rules/go-security/http-support-timeout
- /static_analysis/rules/go-security/http-support-timeout
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/http-support-timeout
  language: Go
  severity: Notice
  severity_rank: 3
title: Avoid HTTP functions without timeouts
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/http-support-timeout`

**Language:** Go

**Severity:** Notice

**Category:** Security

**CWE**: [400](https://cwe.mitre.org/data/definitions/400.html)

## Description
When using an HTTP server in Go, it is highly recommended to define a timeout to handle and control the maximum duration of requests. Failing to set a timeout can lead to various issues, including:

1.  Denial of Service (DoS) attacks: Without a timeout, an attacker can send a request and keep the connection open indefinitely, exhausting server resources. This can lead to a DoS attack, causing the server to become unresponsive or crash. By setting a timeout, you limit the time a connection can remain open, protecting your server from such attacks.
2.  Resource utilization: Long-running or blocked requests can tie up server resources, leading to resource congestion and increased contention among requests. This can reduce the server's overall capacity and slow down the processing of other requests. By setting a timeout, you ensure that requests are completed within a reasonable timeframe, preventing resource bottlenecks.
3.  Zombie connections: In certain scenarios, clients may abruptly close connections or become unresponsive without completing the request. Without a timeout, these connections can linger indefinitely, consuming server resources and limiting the connection pool size for new incoming requests. By setting a timeout, you can proactively close idle or unresponsive connections and free up resources for new requests.
4.  Better user experience: Setting a timeout allows you to provide a more responsive and reliable user experience. If a request exceeds the defined timeout, you can handle it gracefully, such as returning an appropriate error response or terminating the connection cleanly. This ensures that clients receive timely responses, even in the face of unexpected delays or issues.

To set a timeout in an HTTP server using the `http.Server` package in Go, you can use the `ReadTimeout` and `WriteTimeout` fields of the `Server` struct. These fields control the maximum duration for reading the entire request and writing the entire response, respectively. For example:

```go
package main

import (
	"net/http"
	"time"
)

func main() {
	server := &http.Server{
		Addr:        ":8080",
		ReadTimeout: 5 * time.Second, // Set read timeout to 5 seconds
                WriteTimeout: 10 * time.Second, // Set write timeout to 10 seconds
	}

	err := server.ListenAndServe()
	if err != nil {
		// handle error
	}
}
```

In this example, the server is configured with a read timeout of 5 seconds and a write timeout of 10 seconds. Adjust these values according to the expected response times and the requirements of your application.

By defining appropriate timeouts, you can protect your server from DoS attacks, prevent resource congestion, improve user experience, and ensure the efficient utilization of server resources. It is a best practice to always include timeouts when working with HTTP servers in Go.


#### Learn More

 - [CWE-400: Uncontrolled Resource Consumption](https://cwe.mitre.org/data/definitions/400.html)

## Non-Compliant Code Examples
```go
package main

import (
	"log"
	"net/http"
)

func main() {
	s := http.Server{
			Addr:    fmt.Sprintf(":%s", config.Cfg.Webport),
			Handler: router,
	}

	otherServer := http.Server{
		Addr:    fmt.Sprintf(":%s", config.Cfg.Webport),
		Handler: router,
		ReadTimeout: 10 * time.Second,
	}
}
```

```go
package main

import (
	"log"
	"net"
	"net/http"
)

func main() {
	l, err := net.Listen("tcp", ":8443")
	if err != nil {
		log.Fatal(err)
	}
	defer l.Close()
	err = http.ServeTLS(l, nil, "cert.pem", "key.pem")
	log.Fatal(err)
}
```

```go
package main

import (
	"log"
	"net"
	"net/http"
)

func main() {
	l, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatal(err)
	}
	defer l.Close()
	err = http.Serve(l, nil)
	log.Fatal(err)
}
```

```go
package main

import (
	"log"
	"net/http"
)

func main() {
	err := http.ListenAndServeTLS(":8443", "cert.pem", "key.pem", nil)
	log.Fatal(err)
}
```

```go
package main

import (
	"log"
	"net/http"
)

func main() {
	err := http.ListenAndServe(":8080", nil)
	log.Fatal(err)
}
```

## Compliant Code Examples
```go
package main

import (
	"log"
	"net"
	"net/http"
)

func main() {
    server := &http.Server{
        Addr:              ":8443",
        ReadHeaderTimeout: 5 * time.Second,
        ReadTimeout: 10 * time.Second,
    }

    err := server.ListenAndServe()
    if err != nil {
        log.Fatal(err)
    }
}
```
