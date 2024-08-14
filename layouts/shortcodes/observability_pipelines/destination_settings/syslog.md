<div class="alert alert-warning">The Rsyslog and Syslog-ng destinations support the <a href="https://datatracker.ietf.org/doc/html/rfc5424">RFC5424</a> format. </div>

The Rsyslog and Syslog-ng destinations match these log fields to the following Syslog fields:

| Log Event       | SYSLOG FIELD | Default                    |
|-----------------|--------------|----------------------------|
| log["message"]  | MESSAGE      | `NIL`                      |
| log["procid"]   | PROCID       | The running Worker's process ID. |
| log["appname"]  | APP-NAME     | `observability_pipelines`  |
| log["facility"] | FACILITY     | `8 (log_user)`             |
| log["msgid"]    | MSGID        | `NIL`                      |
| log["severity"] | SEVERITY     | `info`                     |
| log["host"]     | HOSTNAME     | `NIL`                      |
| log["timestamp"]| TIMESTAMP    | Current UTC time.          |

The following destination settings are optional:

1. Toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required:
    - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.
1. Enter the number of seconds to wait before sending TCP keepalive probes on an idle connection.