---
title: Syslog-ng
name: syslog_ng
kind: integration
description: 'Configure Syslog-ng to gather logs from your host, containers, & services.'
short_description: 'Configure Syslog-ng to gather logs from your host, containers, & services.'
categories:
    - log collection
doc_link: /integrations/syslog_ng/
aliases:
    - logs/log_collection/syslog_ng
has_logo: true
integration_title: syslog_ng
is_public: true
public_title: Datadog-Syslog-ng Integration
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/syslog_ng.md']
supported_os:
    - linux
    - windows
integration_id: "syslog_ng"
---

## Overview

Configure Syslog-ng to gather logs from your host, containers, & services.

## Setup

### Log collection

{{< tabs >}}
{{% tab "Datadog US site" %}}

1. Collect system logs and log files in `/etc/syslog-ng/syslog-ng.conf` make sure the source is correctly defined:

    ```conf
    source s_src {
    system();
    internal();

    };
    ```

    If you want to monitor files, add the following source:

    ```conf
    #########################
    # Sources
    #########################

    ...

    source s_files {
    file("path/to/your/file1.log",flags(no-parse),follow_freq(1),program_override("<program_name_file1>"));
    file("path/to/your/file2.log",flags(no-parse),follow_freq(1),program_override("<program_name_file2>"));

    };
    ```

2. Set the correct log format:

    ```conf
    #########################
    # Destination
    #########################

    ...

    # For Datadog platform:
    template DatadogFormat { template("YOURAPIKEY <${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n"); };
    destination d_datadog { tcp("intake.logs.datadoghq.com" port(10514) template(DatadogFormat)); };
    ```

3. Define the output in the path section:

    ```conf
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. (Optional) TLS Encryption:

    - Download the CA certificate:

        ```shell
        sudo apt-get install ca-certificates
        ```

    - Change the definition of the destination to the following:

        ```conf
        destination d_datadog { tcp("intake.logs.datadoghq.com" port(10516)     tls(peer-verify(required-trusted)) template(DatadogFormat)); };
        ```

    More information about the TLS parameters and possibilities for syslog-ng available in the [official documentation][1].

5. (Optional) Set the source on your logs. To set the source, use the following format (if you have several sources, change the name of the format in each file):

    ```conf
    template DatadogFormat { template("<API_KEY> <${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} [metas@0 ddsource=\"test\"] $MSG\n"); };
    ```

    You can also add custom tags with the `ddtags` attribute:

    ```conf
    template DatadogFormat { template("<API_KEY> <${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} [metas@0 ddsource=\"test\" ddtags=\"env:test,user:test_user,<KEY:VALUE>\"] $MSG\n"); };
    ```

6. Restart syslog-ng.


[1]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
{{% /tab %}}
{{% tab "Datadog EU site" %}}

1. Collect system logs and log files in `/etc/syslog-ng/syslog-ng.conf` make sure the source is correctly defined:

    ```conf
    source s_src {
    system();
    internal();

    };
    ```

    If you want to monitor files, add the following source:

    ```conf
    #########################
    # Sources
    #########################

    ...

    source s_files {
    file("path/to/your/file1.log",flags(no-parse),follow_freq(1),program_override("<program_name_file1>"));
     file("path/to/your/file2.log",flags(no-parse),follow_freq(1),program_override("<program_name_file2>"));

    };
    ```

2. Set the correct log format:

    ```conf
    #########################
    # Destination
    #########################

    ...

    # For Datadog platform
    template DatadogFormat { template("YOURAPIKEY <${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n"); };
    destination d_datadog { tcp("tcp-intake.logs.datadoghq.eu" port(1883) template(DatadogFormat)); };
    ```

3. Define the output in the path section:

    ```conf
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. (Optional) TLS Encryption:

    - Download the CA certificate:

        ```shell
        sudo apt-get install ca-certificates
        ```

    - Change the definition of the destination to the following:

        ```conf
        destination d_datadog { tcp("tcp-intake.logs.datadoghq.eu" port(443)     tls(peer-verify(required-trusted)) template(DatadogFormat)); };
        ```

    More information about the TLS parameters and possibilities for syslog-ng available in their [official documentation][1].

5. Restart syslog-ng.


[1]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

Need help? Contact [Datadog support][1].

[1]: /help/
