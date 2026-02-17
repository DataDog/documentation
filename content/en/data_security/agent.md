---
title: Agent Data Security
description: "Datadog Agent Security measures"
aliases:
    - /agent/security/
further_reading:
- link: "/data_security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security/" target="_blank">Security</a> section.</div>

You can send data to the Datadog service by using a locally installed [Agent][1] or through our [HTTP API][2]. While use of Datadog does not strictly require use of the Datadog Agent, the vast majority of customers leverage the Agent. This article describes the main security capabilities and features available to ensure your environment is secure.

## Agent distribution

The official repositories and binary packages of the Agent are signed. Verify the distribution channel by checking the signature against one of the following public keys:

- Linux DEB packages and repo metadata:
  - [D18886567EABAD8B2D2526900D826EB906462314][18]
  - [5F1E256061D813B125E156E8E6266D4AC0962C7D][15]
  - [D75CEA17048B9ACBF186794B32637D44F14F620E][4]
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE][3]
- Linux RPM packages and repo metadata:
  - [2416A37757B1BB0268B3634B52AFC5994F09D16B][17]
  - [7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3][16]
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915][5]
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3][6]
- MacOS PKG:
  - Apple certificate fingerprint `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

On Debian and Ubuntu, the `datadog-agent` package has a soft dependency on the `datadog-signing-keys` package, which makes the above keys trusted by APT. Keeping the package updated ensures the latest signing keys are present on your system.

### Windows MSI

To verify the signature of a Datadog Agent installer file on Windows, pipe the output of `Get-AuthenticodeSignature` through `FormatList` (`fl`) and make sure:
- the status is valid
- the certificate is signed by `Datadog, Inc`
- the issuer is `DigiCert`

For example, to verify an .msi file named `ddagent-cli-7.49.1.msi`:
{{< code-block lang="powershell" >}}
Get-AuthenticodeSignature ddagent-cli-7.49.1.msi | fl
{{< /code-block >}}

If the output of the command is `A certificate chain could not be built to a trusted root authority`, the machine may need a DigiCert root CA update.

## Information security

The Datadog Agent submits data to Datadog over a TLS-encrypted TCP connection by default. As of version 6, the Agent can be configured to enforce a minimum TLS version when connecting to Datadog. If you require the use of strong cryptography, for example, to meet PCI requirements, you should use Agent v6/7 and set the `min_tls_version: 'tlsv1.2'` setting, or `force_tls_12: true` for Agent < 6.39.0/7.39.0, in the Agent's configuration file.

## Networking and proxying

Datadog is a SaaS product: you need to establish an outbound connection from your network to the public internet in order to submit monitoring data. Traffic is always initiated by the Agent to Datadog from TLS-encrypted TCP connection by default. No sessions are ever initiated from Datadog back to the Agent. See the Agent's [Network][7] page for more information on configuring firewalls to allow list the required Datadog domains and ports. Additionally, if you want to monitor hosts with no direct connectivity to the public internet, or with restricted outbound traffic, consider submitting monitoring data from a [proxy][8].

## Agent logs obfuscation

The Datadog Agent generates local logs in order to support [Agent troubleshooting][9] as required. As a safety precaution, these local logs are filtered for some specific keywords and patterns that could indicate a potential credential (for example, API key, password, and token keywords), which are then obfuscated before being written to disk.

## Local HTTPS server

Agent v6/7 exposes a local HTTPS API to ease communication between a running Agent and Agent tools (for example, the `datadog-agent` commands). The API server can only be accessed from the local network interface (`localhost/127.0.0.1`), and authentication is enforced through a token that's only readable by the user that the Agent runs as. Communication to the local HTTPS API is encrypted in transport to protect from eavesdropping on `localhost`.

## Agent GUI

Agent v6/7 comes bundled with a Graphical User Interface (GUI) by default, which launches in your default web browser. The GUI is launched only if the user launching it has the correct user permissions, including the ability to open the Agent's configuration file. The GUI can only be accessed from the local network interface (`localhost/127.0.0.1`). Finally, the user's cookies must be enabled, as the GUI generates and saves a token used for authenticating all communications with the GUI server as well as protecting against Cross-Site Request Forgery (CSRF) attacks. The GUI can also be disabled altogether if needed.

## Agent security scans

Datadog's Vulnerability Management program includes regular assessments of supporting infrastructure and application components, including active scans of core supporting services. Datadog Security teams perform regular scans to identify configuration and software vulnerabilities, and track remediation of findings according to Datadog's Vulnerability Management policy.

Regarding its Container Agent specifically, Datadog performs regular vulnerability static analysis on both its general availability (GA) and release candidate (RC) releases. The Datadog Container Agent can be found in public registries as mentioned in [Docker Agent][10], and additionally, Datadog Agent source code is open source. This empowers customers to perform vulnerability scanning with their preferred tooling based on a cadence that meets their unique needs. This provides the required visibility for customers inclined to monitor the Datadog Agent for potential vulnerabilities.

If you believe you've discovered a bug in Datadog's security, see [Report An Issue][11]. To submit a vulnerability inquiry on a specific product as an existing customer, reach out to [Datadog Support][12] through your standard support process. If submitting a support ticket through the Datadog website, set the `Product type` field to `Vulnerability Inquiry on Datadog Product`.

## Running as an unprivileged user

By default, the Agent runs as the `dd-agent` user on Linux and as the `ddagentuser` account on [Windows][13]. The exceptions are as follows:

- The `system-probe` runs as `root` on Linux and as `LOCAL_SYSTEM` on Windows.
- The `process-agent` runs as `LOCAL_SYSTEM` on Windows.
- The `security-agent` runs as `root` on Linux.

## Secrets management

If you have a requirement to avoid storing secrets in plaintext in the Agent's configuration files, you can leverage the [secrets management][14] package. This package allows the Agent to call a user-provided executable to handle retrieval or decryption of secrets, which are then loaded in memory by the Agent. You can design your executable according to your preferred key management service, authentication method, and continuous integration workflow.

For more information, see the [Secrets Management][14] documentation.

## Telemetry collection

{{< site-region region="gov" >}}

The Agent on non-government sites collects environmental, performance, and feature usage information about the Datadog Agent. When the Agent detects a government site, or the [Datadog Agent FIPS Proxy][1] is used, the Agent automatically disables this telemetry collection. When such detection is impossible (for example, if a proxy is being used), Agent telemetry is emitted, but immediately dropped at Datadog's intake.

To avoid this data from being emitted in the first place, Datadog recommends disabling Agent telemetry explicitly by updating the `agent_telemetry` setting in the Agent configuration file, as shown in the example below.

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "Environment variables" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}
[1]: https://docs.datadoghq.com/agent/configuration/fips-compliance?tab=hostorvm&site=gov
{{< /site-region >}}
{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Datadog may collect environmental, performance, and feature usage information about the Datadog Agent. This may include diagnostic logs and crash dumps of the Datadog Agent with obfuscated stack traces to support and further improve the Datadog Agent.

You can disable this telemetry collection by updating the `agent_telemetry` setting in the Agent configuration file, as shown in the example below.
{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "Environment variables" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}

**Telemetry content:**

To view the latest Telemetry content, run the following command:
```bash
agent diagnose show-metadata agent-telemetry
```

| Metadata ([source][1]) |
| ---------------------- |
| Machine id             |
| Machine name           |
| OS                     |
| OS version             |
| Agent version          |

| Metrics ([source][2])                       | Description                                                                                                            |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Checks**                                  |                                                                                                                        |
| checks.execution_time                       | Check's execution time in milliseconds                                                                                 |
| pymem.inuse                                 | Number of bytes allocated by the Python interpreter                                                                    |
| **Logs and metrics**                        |                                                                                                                        |
| dogstatsd.udp_packets_bytes                 | DogStatsD UDP packets bytes                                                                                            |
| dogstatsd.uds_packets_bytes                 | DogStatsD UDS packets bytes                                                                                            |
| logs.auto_multi_line_aggregator_flush       | Number of multi-line logs aggregated by the Agent                                                                       |
| logs.bytes_missed                           | Total number of bytes lost before they could be consumed by the Agent, for example, after log rotation                 |
| logs.bytes_sent                             | Total number of bytes sent before encoding, if applicable                                                              |
| logs.decoded                                | Total number of decoded logs                                                                                           |
| logs.dropped                                | Total number of logs dropped                                                                                           |
| logs.encoded_bytes_sent                     | Total number of bytes sent after encoding, if applicable                                                               |
| logs.sender_latency                         | HTTP sender latency in milliseconds                                                                                    |
| logs.truncated                              | Total number of logs truncated by the Agent                                                                            |
| point.dropped                               | Total number of dropped metrics                                                                                        |
| point.sent                                  | Total number of sent metrics                                                                                           |
| transactions.input_count                    | Incoming transaction count                                                                                             |
| transactions.requeued                       | Transaction requeue count                                                                                              |
| transactions.retries                        | Transaction retry count                                                                                                |
| **Database**                                |                                                                                                                        |
| oracle.activity_samples_count               | Number of rows fetched in measuring query activity (Number of activity samples collected)                              |
| oracle.activity_latency                     | Time to retrieve query activity in milliseconds                                                                        |
| oracle.statement_metrics                    | Time to retrieve database metrics in milliseconds                                                                      |
| oracle.statement_plan_errors                | Number of errors in retrieving execution plans                                                                         |
| postgres.collect_activity_snapshot_ms       | Time to get activity snapshot in milliseconds                                                                          |
| postgres.collect_relations_autodiscovery_ms | Time to collect autodiscoverty relations in milliseconds                                                               |
| postgres.collect_statement_samples_ms       | Time to get statement samples in milliseconds                                                                          |
| postgres.collect_statement_samples_count    | Total rows fetched to collect statement samples                                                                        |
| postgres.collect_stat_autodiscovery_ms      | Time to collect Autodiscovery stats in milliseconds                                                                    |
| postgres.get_new_pg_stat_activity_ms        | Time to get `pg_stat_activity` in milliseconds                                                                         |
| postgres.get_new_pg_stat_activity_count     | Total rows fetched to collect `pg_stat_activity`                                                                       |
| postgres.get_active_connections_ms          | Time to get active connections in milliseconds                                                                         |
| postgres.get_active_connections_count       | Total rows fetched to get active connections                                                                           |
| postgres.schema_tables_elapsed_ms           | Time to collect tables in Postgres schema                                                                              |
| postgres.schema_tables_count                | Total tables in Postgres schema                                                                                        |
| **API**                                     |                                                                                                                        |
| api_server.request_duration_seconds         | CLI commands execution performance (if executed)                                                                       |
| **Events**                                  |                                                                                                                        |
| agent_bsod                                  | Agent-related Blue Screen of Death (BSOD) data, including the BugCheck code, four associated arguments, and the unsymbolized crashing call stack |
| **Service Discovery**                       |                                                                                                                        |
| service_discovery.discovered_services       | Number of services detected by the Agent's Service Discovery feature                                                   |
| **GPU Monitoring**                          |                                                                                                                        |
| gpu.device_total                            | Total number of GPUs in the system                                                                                     |
| **APM**                                     |                                                                                                                        |
| trace.enabled                               | Whether the trace-agent process is running.                                                                            |
| trace.working                               | Whether the trace-agent process is receiving and sending traces.                                                       |

Only applicable metrics are emitted. For example, if DBM is not enabled, none of the database related metrics are emitted.


[1]: https://github.com/DataDog/datadog-agent/blob/4dc6ed6eb069bdea7e93f2d267ac5086a98c968c/comp/core/agenttelemetry/impl/sender.go#L218-L221
[2]: https://github.com/DataDog/datadog-agent/blob/4dc6ed6eb069bdea7e93f2d267ac5086a98c968c/comp/core/agenttelemetry/impl/config.go#L156

{{< /site-region >}}

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /api/
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[7]: /agent/faq/network/
[8]: /agent/configuration/proxy/
[9]: /agent/troubleshooting/
[10]: /containers/docker/?tab=standard
[11]: https://www.datadoghq.com/security/?tab=contact
[12]: https://www.datadoghq.com/support/
[13]: /agent/faq/windows-agent-ddagent-user/
[14]: /agent/configuration/secrets-management/
[15]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[16]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
[17]: https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
[18]: https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public
