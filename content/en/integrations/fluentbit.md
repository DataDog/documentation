---
title: Fluent Bit
name: fluentbit
kind: integration
description: "Configure Fluent Bit to collect, parse, and forward log data from several different sources to Datadog for monitoring."
short_description: "Collect, parse, and forward log data from several different sources to Datadog for monitoring."
categories:
- log collection
doc_link: /integrations/fluentbit/
has_logo: true
integration_title: Fluent Bit
is_public: true
public_title: Datadog-Fluent Bit Integration
further_reading:
- link: "https://www.datadoghq.com/blog/fluentbit-integration-announcement/"
  tag: "Blog"
  text: "Centralize your logs with Datadog and Fluent Bit"
---

## Overview

Configure Fluent Bit to collect, parse, and forward log data from several different to Datadog for monitoring. Fluent Bit has a small memory footprint (~450 KB), so use it to collect logs in environments with limited resources, such as containerized services and embedded Linux systems. [Datadogs Fluent Bit output plugin][2] supports Fluent Bit v1.3.0+.

## Setup
### Log collection

Before you begin, you need to have Fluent Bit [installed][6] and [configured][7], a [Datadog account][3], a [Datadog API key][4], and you need to [activate Datadog Logs Management][5]. These steps assume that you are managing Fluent Bit using their reccomended method of a configuration file, and not through the command line. 

1. Update your [Fluent Bit configuration file][8] to add Datadog as an output plugin. For more information on the configuration parameters, see the [Configuration parameters table](#configuration-parameters). For an example `[OUTPUT]` configuration section, see the [Configuration file example](#configuration-file-example)
2. [Recompile your Fluentbit build][9].

#### Configuration parameters

| Key | Description | Default |
| :--- | :--- | :--- |
| Host | _Required_ - The Datadog server where you are sending your logs. | `http-intake.logs.datadoghq.com` |
| TLS | _Required_ - End-to-end security communications security protocol. Datadog recommends leaving this `on`. | `on` |
| apikey | _Required_ - Your [Datadog API key][4]. |  |
| dd\_service | _Recommended_ - The human readable name for your service generating the logs - the name of your application or database. |  |
| dd\_source | _Recommended_ - A human readable name for the underlying technology of your service. For example, `postgres` or `nginx`. |  |
| dd\_tags | _Optional_ - The [tags][10] you want to assign to your logs in Datadog. |  |

#### Configuration file example

```text
[OUTPUT]
    Name        datadog
    Match       *
    Host        http-intake.logs.datadoghq.com
    TLS         on
    apikey      <my-datadog-api-key>
    dd_service  <my-app-service>
    dd_source   <my-app-source>
    dd_tags     team:logs,foo:bar
```

## Troubleshooting

Need help? Contact [Datadog support][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://docs.fluentbit.io/manual/output/datadog
[3]: https://app.datadoghq.com/signup
[4]: /account_management/api-app-keys/
[5]: https://app.datadoghq.com/logs/activation
[6]: https://docs.fluentbit.io/manual/installation
[7]: https://docs.fluentbit.io/manual/configuration
[8]: https://docs.fluentbit.io/manual/configuration/file
[9]: https://docs.fluentbit.io/manual/installation/build_install
[10]: /tagging/
