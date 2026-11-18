| Field         | Description                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| `ca_cert`     | Path to a PEM-encoded CA certificate file.                                       |
| `ca_path`     | Path to a directory of PEM-encoded CA certificate files.                         |
| `client_cert` | Path to a PEM-encoded client certificate file for mTLS.                          |
| `client_key`  | Path to the private key file for the client certificate.                         |
| `tls_server`  | Expected server name for TLS SNI verification.                                   |
| `insecure`    | Set to `true` to disable TLS certificate verification. Do not use in production. |
