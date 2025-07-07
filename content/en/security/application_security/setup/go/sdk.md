---
title: App and API Protection SDK for Go
further_reading:
- link: "https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec"
  tag: "Documentation"
  text: "Go Security API docs"
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Adding user information to traces"
- link: 'https://github.com/DataDog/dd-trace-go'
  tag: "Source Code"
  text: 'Tracer source code'
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---

# SDK

Sometimes, instrumenting your application automatically using [orchestrion][1] is not enough.
That is why we offer an API under [github.com/DataDog/dd-trace-go/v2/appsec][2] for more flexibility and more features
that would not always be available.

## Preamble: errors

The API is designed to return errors when something goes wrong, so you can handle them in your code. More specifically
an error of type [`events.BlockingSecurityEvent`][3] will be returned when a blocking event occurs, such as a user being
blocked or a request being blocked.

**It is imperative to not write any response to the client when you receive a `BlockingEvent` error**, otherwise to are
potentially sending sensitive information to an attacker. A helper called [`events.IsSecurityError`][4] is here to help
this process. AAP SDK is designed to send a blocking response in your stead (by default, a HTTP 403) when a
`BlockingSecurityEvent` is returned. Customizing this behaviour is possible, more available in
the [Customize response to blocked requests][5] section.

## HTTP Body Monitoring

By default, a lot of Go HTTP Frameworks are not high level enough to provide parsed HTTP request & response bodies.
This is why AAP SDK provides a way to monitor the HTTP request and response bodies manually:

- [`appsec.MonitorRequestBody`][8] to monitor the request body.
- [`appsec.MonitorHTTPResponseBody`][9] to monitor the response body.

These functions will automatically block the current request if asked from Datadog's UI, and return a
`BlockingSecurityEvent` error.

## User tracking

When a user logs in to your application, it is important to track this event for security purposes.
The AAP offer a feature to [track and block login requests][1]. This feature is available under 2 functions:

- [`appsec.TrackUserLoginSuccess`][2] to track a successful login event on your login endpoint.
- [`appsec.TrackUserLoginFailure`][6] to track an attempted login event on your login endpoint.
- [`appsec.SetUser`][7] use on all authenticated requests to report users to Datadog.

These functions will automatically block the user if asked from Datadog's UI, and return a `BlockingSecurityEvent`
error.

## Business Logic Event Tracking

User login success and failure are what is called [Business logic events][10] behind the scene which are events that
are not directly related to security, but are important for security purposes. We offer the capability to track custom
events using the [`appsec.TrackBusinessLogicEvent`][11] function.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/how-it-works/add-user-info?tab=go#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[2]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#TrackUserLoginSuccess
[3]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec/events#BlockingSecurityEvent
[4]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec/events#IsSecurityError
[5]: /security/application_security/policies/#customize-protection-behavior
[6]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#TrackUserLoginFailure
[7]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#SetUser
[8]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#MonitorParsedHTTPBody
[9]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#MonitorHTTPResponseBody
[10]: /security/application_security/policies/custom_rules/#business-logic-abuse-detection-rule
[11]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec#TrackCustomEvent
