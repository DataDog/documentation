---
title: Syslog Destinations
disable_toc: false
---

Use Observability Pipelines' syslog destinations to send logs to rsyslog or syslog-ng.

## Setup

Set up the rsyslog or syslog-ng destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

<div class="alert alert-danger">The rsyslog and syslog-ng destinations support the <a href="https://datatracker.ietf.org/doc/html/rfc5424">RFC5424</a> format. </div>

The rsyslog and syslog-ng destinations match these log fields to the following Syslog fields:

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

To set up the syslog destination:

<div class="alert alert-danger">Only enter the identifiers for the syslog endpoint URL and, if applicable, the key pass. Do <b>not</b> enter the actual values.</div>

- Enter the identifier for your endpoint URL. If you leave it blank, the [default](#set-secrets) is used.

#### Optional settings

##### Enable TLS

Toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required:
- Enter the identifier for your syslog key pass. If you leave it blank, the [default](#set-secrets) is used.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

##### Wait time for TCP keepalive probes

Enter the number of seconds to wait before sending TCP keepalive probes on an idle connection.

##### Buffering options

Toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
- If left disabled, the maximum size for buffering is 500 events.
- If enabled:
	1. Select the buffer type you want to set (**Memory** or **Disk**).
	1. Enter the buffer size and select the unit.

### Set secrets

The following are the defaults used for secret identifiers and environment variables.

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Syslog endpoint URL identifier:
	- The default identifier is `DESTINATION_SYSLOG_ENDPOINT_URL`.
- Syslog TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_SYSLOG_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

### How the destination works

#### Event batching

The rsyslog and syslog-ng destinations do not batch events.

[1]: https://app.datadoghq.com/observability-pipelines