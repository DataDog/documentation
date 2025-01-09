---
aliases:
- /continuous_integration/static_analysis/rules/go-security/grpc-client-insecure
- /static_analysis/rules/go-security/grpc-client-insecure
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/grpc-client-insecure
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid insecure GRPC connection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/grpc-client-insecure`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [300](https://cwe.mitre.org/data/definitions/300.html)

## Description
The code provided is not considered good practice and can create a security issue because it is using the "grpc.WithInsecure()" option when establishing a gRPC connection. The "grpc.WithInsecure()" option disables transport security, also known as TLS (Transport Layer Security) or SSL (Secure Sockets Layer).

By disabling transport security, the code allows communication to occur over an unencrypted connection, leaving data transmitted between the client and the server vulnerable to eavesdropping, tampering, and other security threats. Without encryption, malicious parties can intercept sensitive information such as authentication credentials, session data, or sensitive API payloads.

To ensure data security and protect against potential attacks, it is highly recommended to use transport security (TLS) in gRPC connections.

To fix the security issue, the code should be modified to use a secure connection by providing the appropriate TLS credentials. Here is an example of how the code can be updated:

```go
tlsCredentials, err := credentials.NewClientTLSFromFile("cert.pem", "")
if err != nil {
    // handle error
}

conn, err := grpc.Dial(address, grpc.WithTransportCredentials(tlsCredentials))
```

In this updated code, a TLS certificate is loaded from the "cert.pem" file and used to create the necessary TLS credentials for the gRPC connection. By using "grpc.WithTransportCredentials()" instead of "grpc.WithInsecure()", the connection is secured with TLS, encrypting the data transmitted between the client and the server, and mitigating potential security risks.


## Non-Compliant Code Examples
```go
func main() {
    conn, err := grpc.Dial(address, grpc.WithInsecure())
}
```

## Compliant Code Examples
```go
func main() {
    conn, err := grpc.Dial(address, grpc.WithInsecure())
}
```
