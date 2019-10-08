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

<<<<<<< HEAD
Configure Fluent Bit to collect, parse, and forward log data from several different to Datadog for monitoring. Fluent Bit has a small memory footprint (~450 KB), so use it to collect logs in environments with limited resources, such as containerized services and embedded Linux systems. [Datadogs Fluent Bit output plugin][1] supports Fluent Bit v1.3.0+.
=======
Configure Fluent Bit to collect, parse, and forward log data from several different sources to Datadog for monitoring. Fluent Bit has a small memory footprint (~450 KB), so you can use it to collect logs in environments with limited resources, such as containerized services and embedded Linux systems. [Datadog's Fluent Bit output plugin][2] supports Fluent Bit v1.3.0+.
>>>>>>> origin/kaylyn/fluentbit

## Setup
### Log collection

<<<<<<< HEAD
Before you begin, you need to have a [Datadog account][2], a [Datadog API key][3], and you need to [activate Datadog Logs Management][4].

1. [Install][5] and [configure][6] Fluent Bit by using their reccomended method of a configuration file.
2. Update your [Fluent Bit configuration file][7] to add Datadog as an output plugin. For more information on the configuration parameters, see the [Configuration parameters table](#configuration-parameters). For an example `[OUTPUT]` configuration section, see the [Configuration file example](#configuration-file-example).
3. Once you start sending logs from Fluent Bit, verify the logs on the [Datadog Logs Explorer page][8].
=======
Before you begin, you need to have Fluent Bit [installed][6] and [configured][7]. You also need a [Datadog account][3], a [Datadog API key][4], and you need to [activate Datadog Logs Management][5]. These steps assume that you are managing Fluent Bit using their reccomended method of a configuration file, and not through the command line. 

1. Update your [Fluent Bit configuration file][8] to add Datadog as an output plugin. For more information on the configuration parameters, see the [Configuration parameters table](#configuration-parameters). For an example `[OUTPUT]` configuration section, see the [Configuration file example](#configuration-file-example)
2. [Recompile your Fluent Bit build][9].
>>>>>>> origin/kaylyn/fluentbit

#### Configuration parameters

| Key | Description | Default |
| :--- | :--- | :--- |
| Host | _Required_ - The Datadog server where you are sending your logs. | `http-intake.logs.datadoghq.com` |
| TLS | _Required_ - End-to-end security communications security protocol. Datadog recommends leaving this `on`. | `on` |
<<<<<<< HEAD
| apikey | _Required_ - Your [Datadog API key][3]. |  |
| dd\_service | _Recommended_ - The human readable name for your service generating the logs - the name of your application or database. |  |
=======
| apikey | _Required_ - Your [Datadog API key][4]. |  |
| dd\_service | _Recommended_ - The human readable name for your service generating the logs—the name of your application or database. |  |
>>>>>>> origin/kaylyn/fluentbit
| dd\_source | _Recommended_ - A human readable name for the underlying technology of your service. For example, `postgres` or `nginx`. |  |
| dd\_tags | _Optional_ - The [tags][9] you want to assign to your logs in Datadog. |  |

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

Need help? Contact [Datadog support][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.fluentbit.io/manual/output/datadog
[2]: https://app.datadoghq.com/signup
[3]: /account_management/api-app-keys
[4]: https://app.datadoghq.com/logs/activation
[5]: https://docs.fluentbit.io/manual/installation
[6]: https://docs.fluentbit.io/manual/configuration
[7]: https://docs.fluentbit.io/manual/configuration/file
[8]: https://app.datadoghq.com/logs
[9]: /tagging
[10]: /help
