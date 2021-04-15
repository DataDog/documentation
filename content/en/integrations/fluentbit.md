---
title: Fluent Bit
name: fluentbit
kind: integration
description: 'Configure Fluent Bit to collect, parse, and forward log data from several sources.'
short_description: 'Collect, parse, and forward log data from several sources.'
categories:
    - log collection
doc_link: /integrations/fluentbit/
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/fluentbit.md']
has_logo: true
integration_title: Fluent Bit
is_public: true
public_title: Datadog-Fluent Bit Integration
further_reading:
    - link: 'https://www.datadoghq.com/blog/fluentbit-integration-announcement/'
      tag: 'Blog'
      text: 'Centralize your logs with Datadog and Fluent Bit'
---

## Overview

Configure Fluent Bit to collect, parse, and forward log data from several different sources to Datadog for monitoring. Fluent Bit has a small memory footprint (~450 KB), so you can use it to collect logs in environments with limited resources, such as containerized services and embedded Linux systems. [Datadog's Fluent Bit output plugin][1] supports Fluent Bit v1.3.0+.

## Setup

Find below instructions to configure Fluent Bit on a host, if you want to configure it on AWS ECS, see the [ECS Fluent Bit and FireLens documentation][2].

### Log collection

Before you begin, you need to have a [Datadog account][3], a [Datadog API key][4], and you need to [activate Datadog Logs Management][5].

1. [Install][6] and [configure][7] Fluent Bit by using their recommended method of a configuration file.
2. Update your [Fluent Bit configuration file][8] to add Datadog as an output plugin. For more information on the configuration parameters, see the [Configuration parameters table](#configuration-parameters). For an example `[OUTPUT]` configuration section, see the [Configuration file example](#configuration-file-example).
3. Once you start sending logs from Fluent Bit, verify the logs on the [Datadog Logs Explorer page][9].

#### Configuration parameters

| Key            | Description                                                                                                              | Default                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Host           | _Required_ - The Datadog server where you are sending your logs.                                                         | {{< region-param key="http_endpoint" code="true" >}} |
| TLS            | _Required_ - End-to-end security communications security protocol. Datadog recommends setting this to `on`.              | `off`                                                                       |
| apikey         | _Required_ - Your [Datadog API key][4].                                                                                  |                                                                             |
| compress       | _Recommended_ - compresses the payload in GZIP format, Datadog supports and recommends setting this to `gzip`.           |                                                                             |
| dd_service     | _Recommended_ - The human readable name for your service generating the logs - the name of your application or database. |                                                                             |
| dd_source      | _Recommended_ - A human readable name for the underlying technology of your service. For example, `postgres` or `nginx`. |                                                                             |
| dd_message_key | _Recommended_ - Set the attribute to use to store your log message.                                                      |                                                                             |
| dd_tags        | _Optional_ - The [tags][10] you want to assign to your logs in Datadog.                                                  |                                                                             |
| provider       | _Optional_ - The provider to use. Set this to `ecs` if you want to send logs from your Fargate Tasks to Datadog.         |                                                                             |

#### Configuration file example

```text
[OUTPUT]
    Name              datadog
    Match             *
    Host              http-intake.logs.datadoghq.com
    TLS               on
    compress          gzip
    apikey            <DATADOG_API_KEY>
    dd_service        <APPLICATION_SERVICE>
    dd_source         <SOURCE>
    dd_message_key    log
    dd_tags           env:dev,<TAG_KEY>:<TAG_VALUE>
```

## Troubleshooting

Need help? Contact [Datadog support][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.fluentbit.io/manual/output/datadog
[2]: /integrations/ecs_fargate/#fluent-bit-and-firelens
[3]: https://app.datadoghq.com/signup
[4]: /account_management/api-app-keys/
[5]: https://app.datadoghq.com/logs/activation
[6]: https://docs.fluentbit.io/manual/installation/sources/build-and-install
[7]: https://docs.fluentbit.io/manual/administration/configuring-fluent-bit
[8]: https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/configuration-file
[9]: https://app.datadoghq.com/logs
[10]: /getting_started/tagging/
[11]: /help/
