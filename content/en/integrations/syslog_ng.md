---
title: Syslog-ng
name: syslog_ng
kind: integration
description: "Configure Syslog-ng to gather logs from your host, containers, & services."
short_description: "Configure Syslog-ng to gather logs from your host, containers, & services."
categories:
- log collection
doc_link: /integrations/syslog_ng/
aliases:
    - logs/log_collection/syslog_ng
has_logo: true
integration_title: syslog_ng
is_public: true
public_title: Datadog-Syslog-ng Integration
supported_os:
- linux
- windows
---

## Overview

Configure Syslog-ng to gather logs from your host, containers, & services.

## Setup
### Log collection

{{< tabs >}}
{{% tab "Datadog US site" %}}

1. Collect system logs and log files in `/etc/syslog-ng/syslog-ng.conf` make sure the source is correctly defined:
    ```
    source s_src {
    system();
    internal();

    };
    ```
    If you want to monitor files, add the following source:  
    ```
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
    ```
    #########################
    # Destination
    #########################

    ...

    # For Datadog platform:
    template DatadogFormat { template("YOURAPIKEY <${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n"); };
    destination d_datadog { tcp("intake.logs.datadoghq.com" port(10514) template(DatadogFormat)); };
    ```

3. Define the output in the path section:
    ```
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. (Optional) TLS Encryption:  

    * Download the CA certificate:
    
     ```
    sudo apt-get install ca-certificates
     ```
            
    * Change the definition of the destination to the following:
    
        ```
        destination d_datadog { tcp("intake.logs.datadoghq.com" port(10516)     tls(peer-verify(required-untrusted)) template(DatadogFormat)); };
        ```

    More information about the TLS parameters and possibilities for syslog-ng available in the [official documentation][2].

5. Restart syslog-ng.


[1]: /resources/crt/FULL_intake.logs.datadoghq.com.crt
[2]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
{{% /tab %}}
{{% tab "Datadog EU site" %}}

1. Collect system logs and log files in `/etc/syslog-ng/syslog-ng.conf` make sure the source is correctly defined:
    ```
    source s_src {
    system();
    internal();

    };
    ```
    If you want to monitor files, add the following source:
    ```
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
    ```
    #########################
    # Destination
    #########################

    ...

    # For Datadog platform
    template DatadogFormat { template("YOURAPIKEY <${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n"); };
    destination d_datadog { tcp("tcp-intake.logs.datadoghq.eu" port(1883) template(DatadogFormat)); };
    ```

3. Define the output in the path section:
    ```
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. (Optional) TLS Encryption:  

    * Download the CA certificate:
      
     ```
    sudo apt-get install ca-certificates
      ```
      
    * Change the definition of the destination to the following:
    
        ```
        destination d_datadog { tcp("tcp-intake.logs.datadoghq.eu" port(443)     tls(peer-verify(required-untrusted)) template(DatadogFormat)); };
        ```

    More information about the TLS parameters and possibilities for syslog-ng available in their [official documentation][2].

5. Restart syslog-ng.


[2]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting
Need help? Contact [Datadog support][1].


[1]: /help
