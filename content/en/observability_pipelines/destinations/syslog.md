---
title: Syslog Destinations
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

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

The following destination settings are optional:

1. Toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required:
    - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.
1. Enter the number of seconds to wait before sending TCP keepalive probes on an idle connection.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

### How the destination works

#### Event batching

The rsyslog and syslog-ng destinations do not batch events.

[1]: https://app.datadoghq.com/observability-pipelines