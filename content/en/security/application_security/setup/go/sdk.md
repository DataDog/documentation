---
title: App and API Protection SDK for Go
further_reading:
- link: "https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec"
  tag: "Documentation"
  text: "Go Security API docs"
- link: "https://github.com/DataDog/appsec-go-test-app"
  tag: "Source Code"
  text: "Sample application used for exhaustive SDK testing"
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Adding user information to traces"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---

Sometimes, instrumenting your application automatically using [orchestrion][12] is not enough.
That is why Datadog offer an API under [github.com/DataDog/dd-trace-go/v2/appsec][2] for more flexibility and more features
that would not always be available.

## Preamble: errors

The API is designed to return errors when something goes wrong, so you can handle them in your code. More specifically
an error of type [`events.BlockingSecurityEvent`][3] is returned when a blocking event occurs, such as a user, IP, or a request being blocked.

**It is imperative to not write any response to the client when you receive a `BlockingSecurityEvent` error**, otherwise you are
potentially sending sensitive information to an attacker. A helper called [`events.IsSecurityError`][4] is here to help
this process. App and API Protection SDK is designed to send a blocking response in your stead (by default, a HTTP 403) when a
`BlockingSecurityEvent` is returned. Customizing this behavior is possible, more available in
the [Customize response to blocked requests][5] section.

## HTTP body monitoring

By default, a lot of Go HTTP Frameworks are not high level enough to provide parsed HTTP request & response bodies.
This is why App and API Protection SDK provides a way to monitor the HTTP request and response bodies manually:

- [`appsec.MonitorParsedHTTPBody`][8] to monitor the parsed request body.
- [`appsec.MonitorHTTPResponseBody`][9] to monitor the response body.

These functions automatically block the current request if asked from Datadog's UI, and return a
`BlockingSecurityEvent` error.

## User tracking

When a user logs in to your application, it is important to track this event for security purposes.
App and API Protection offers a feature to [track and block login requests][1]. This feature is available under 3 functions:

- [`appsec.TrackUserLoginSuccess`][10] to track a successful login event on your login endpoint. This function also calls [`appsec.SetUser`][7] internally to associate the user with the current request.
- [`appsec.TrackUserLoginFailure`][6] to track a failed login event on your login endpoint.
- [`appsec.SetUser`][7] use on all authenticated requests to report users to Datadog and enable user blocking.

These functions automatically block the user if asked from Datadog's UI, and return a `BlockingSecurityEvent`
error.

## Custom event tracking

User login success and failure are what is called [Business logic events][11] behind the scene which are events that
are not directly related to security, but are important for security purposes. Datadog offer the capability to track custom
events using the [`appsec.TrackCustomEvent`][13] function. This function sets custom event data as service entry span tags,
which triggers backend-side event monitoring that can ultimately block IP addresses and/or user IDs associated with them.

## Real world example

Here's a concise example showing how to integrate the App and API Protection SDK into a standard `net/http` web application:

{{< code-block lang="go" filename="main.go" collapsible="true" wrap="false" >}}
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/DataDog/dd-trace-go/v2/appsec"
	"github.com/DataDog/dd-trace-go/v2/appsec/events"
	"github.com/DataDog/dd-trace-go/v2/contrib/net/http/v2"
	"github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type User struct {
	Name     string `json:name`
	Username string `json:username`
	Email    string `json:email`
	password string
}

var users = []User{
	{
		Name: "John Doe",
		Username: "realjoe",
		Email: "john@gmail.com",
		password: "not-my-birthday",
	}
}

func main() {
	tracer.Start(tracer.WithService("my-web-app"), tracer.WithAppsecEnabled(true))
	defer tracer.Stop()

	mux := httptrace.NewServeMux()
	mux.HandleFunc("/login", loginHandler)
	mux.HandleFunc("/profile", authMiddleware(profileHandler))

	log.Fatal(http.ListenAndServe(":8080", mux))
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	json.NewDecoder(r.Body).Decode(&req)

	// Monitor parsed request body
	if err := appsec.MonitorParsedHTTPBody(r.Context(), req); err != nil {
		if events.IsSecurityError(err) {
			return // AppSec handles the blocking response
		}
	}

	for _, user := range users {
		if req.Username == user.Username && req.Password == user.Password {
			metadata := map[string]string{"login_method": "password"}
			if err := appsec.TrackUserLoginSuccess(r.Context(), req.Username, "user123", metadata); err != nil && events.IsSecurityError(err) {
				return // User is blocked
			}

			response := map[string]string{"token": "<token_created>", "status": "success"}
		
			// Monitor response body
			appsec.MonitorHTTPResponseBody(r.Context(), response)
		
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	// Track failed login
	appsec.TrackUserLoginFailure(r.Context(), req.Username, true, metadata)
	http.Error(w, "Invalid credentials", http.StatusUnauthorized)
}

func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user := "<username>" // Do real authentification here

		// Set user context on all authenticated requests
		if err := appsec.SetUser(r.Context(), user); err != nil && events.IsSecurityError(err) {
			return // User is blocked
		}

		next.ServeHTTP(w, r)
	}
}

func profileHandler(w http.ResponseWriter, r *http.Request) {
	// Track access to sensitive data
	appsec.TrackCustomEvent(r.Context(), "profile.access", map[string]string{
		"data_type": "personal_info",
	})

	userAsked := r.Query().Get("user")
	user := users[0] // Search for the user

	// Monitor response body
	appsec.MonitorHTTPResponseBody(r.Context(), user);
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}
{{< /code-block >}}

This example demonstrates:

- **Body Monitoring**: `MonitorParsedHTTPBody` and `MonitorHTTPResponseBody` for request/response security
- **User Tracking**: `TrackUserLoginSuccess`/`TrackUserLoginFailure` for login events, `SetUser` for authentication
- **Custom Events**: `TrackCustomEvent` for business logic monitoring  
- **Error Handling**: Proper `BlockingSecurityEvent` handling with `IsSecurityError`

Key points:
- Always check `IsSecurityError(err)` and return without writing responses when blocked
- Use `SetUser` on authenticated requests to enable user blocking capabilities
- Track important business events that could indicate suspicious activity

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/how-it-works/add-user-info?tab=go#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[2]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec
[3]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec/events#BlockingSecurityEvent
[4]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec/events#IsSecurityError
[5]: /security/application_security/policies/#customize-protection-behavior
[6]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#TrackUserLoginFailure
[7]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#SetUser
[8]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#MonitorParsedHTTPBody
[9]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#MonitorHTTPResponseBody
[10]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#TrackUserLoginSuccess
[11]: /security/application_security/policies/custom_rules/#business-logic-abuse-detection-rule
[12]: https://github.com/DataDog/orchestrion
[13]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#TrackCustomEvent
