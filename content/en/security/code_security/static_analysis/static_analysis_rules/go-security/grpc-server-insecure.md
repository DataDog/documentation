---
aliases:
- /continuous_integration/static_analysis/rules/go-security/grpc-server-insecure
- /static_analysis/rules/go-security/grpc-server-insecure
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/grpc-server-insecure
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid insecure GRPC server
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/grpc-server-insecure`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [300](https://cwe.mitre.org/data/definitions/300.html)

## Description
The provided code snippet creates a new gRPC server instance without any transport security options, which makes it insecure. By default, the server will use an insecure communication channel, allowing data to be transmitted without encryption.

To fix this security issue, it is crucial to enable transport security using TLS (Transport Layer Security) in the gRPC server. Here's an example of how the code can be updated to ensure a secure connection:

```go
tlsCredentials, err := credentials.NewServerTLSFromFile("cert.pem", "key.pem")
if err != nil {
    // handle error
}

s := grpc.NewServer(grpc.Creds(tlsCredentials))
```

In the updated code, TLS credentials are loaded from the "cert.pem" and "key.pem" files. These credentials contain the server's certificate and private key necessary for TLS encryption. By passing the TLS credentials to `grpc.Creds()`, the gRPC server is configured to use transport security, ensuring that all incoming connections are secured.

It is important to generate valid TLS certificates and private keys from a trusted certificate authority (CA), or self-sign the certificates for development/testing purposes. Additionally, make sure to keep the private key file secure and protect it from unauthorized access.

Enabling transport security with TLS in the gRPC server helps protect sensitive data exchanged between clients and the server by encrypting it, preventing unauthorized users from intercepting or tampering with the communication.


## Non-Compliant Code Examples
```go
func main() {
    s := grpc.NewServer()
}
```

## Compliant Code Examples
```go
func main() {
    options := []grpc.ServerOption{
		grpc.Creds(credentials.NewClientTLSFromCert(ceertificatePool, address)),
	}
	server := grpc.NewServer(options...)
}
```

```go
// filename is not_compliant_test.go
func main() {
    s := grpc.NewServer()
}
```
