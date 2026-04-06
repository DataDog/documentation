---
title: Syslog Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' rsyslog or syslog-ng to receive logs sent to rsyslog or syslog-ng.

You can also [forward third-party log to syslog](#forward-third-party-logs-to-syslog) and then send them to the Observability Pipelines Worker.

## Prerequisites

{{% observability_pipelines/prerequisites/syslog %}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][7], using the [API][8], or with [Terraform][9]. The instructions in this section are for setting up the source in the UI.

To configure your Syslog source:

<div class="alert alert-danger">Only enter the identifiers for the syslog address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your syslog address. If you leave it blank, the [default](#set-secrets) is used.
1. In the **Socket Type** dropdown menu, select the communication protocol you want to use: **TCP** or **UDP**.

### Optional settings

Toggle the switch to **Enable TLS**.
- If you are using Secrets Management, enter the identifier for the syslog key pass. See [Set secrets](#set-secrets) for the defaults used.
{{% observability_pipelines/tls_settings %}}

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- rsyslog or syslog-ng address identifier:
	- References the bind address, such `0.0.0.0:9997`, on which the Observability Pipelines Worker listens to receive logs from the Syslog forwarder.
	- The default identifier is `SOURCE_SYSLOG_ADDRESS`.
- rsyslog or syslog-ng  TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_SYSLOG_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

## Send logs to the Observability Pipelines Worker over syslog

{{% observability_pipelines/log_source_configuration/syslog %}}

## Forward third-party logs to the Observability Pipelines Worker

Syslog is a widely used logging protocol for sending network logs to a central server. Many network devices support syslog output, so you can forward third-party logs to the Observability Pipelines's syslog source for processing and routing. Examples of these third-party services include:

### Fortinet
- [Configure log forwarding][2]
- [Configuring syslog settings][3]

### Palo Alto Networks
- [Configure log forwarding][4]
- [Forward traffic logs to a syslog server][5]

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.fortinet.com/fa/faz50hlp/56/5-6-1/FMG-FAZ/2400_System_Settings/1600_Log%20Forwarding/0400_Configuring.htm
[3]: https://help.fortinet.com/fadc/4-5-1/olh/Content/FortiADC/handbook/log_remote.htm
[4]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/configure-log-forwarding
[5]: https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClRxCAK
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline