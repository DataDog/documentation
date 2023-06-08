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

1. Collect system logs and log files in `/etc/syslog-ng/syslog-ng.conf` and make sure the source is correctly defined:

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
    destination d_datadog {
      http(
          url("https://http-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?ddsource=<SOURCE>&ddtags=<TAG_1:VALUE_1,TAG_2:VALUE_2>")
          method("POST")
          headers("Content-Type: application/json", "Accept: application/json", "DD-API-KEY: <DATADOG_API_KEY>")
          body("<${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n")
      );
    };
    ```

3. Define the output in the path section:

    ```conf
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. Restart syslog-ng.

## Troubleshooting

Need help? Contact [Datadog support][2].

[1]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
[2]: /help/
