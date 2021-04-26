---
title: Rsyslog
name: rsyslog
kind: integration
description: 'Configure Rsyslog to gather logs from your host, containers, & services.'
short_description: 'Configure Rsyslog to gather logs from your host, containers, & services.'
categories:
    - log collection
doc_link: /integrations/rsyslog/
aliases:
    - logs/log_collection/rsyslog
has_logo: true
integration_title: rsyslog
is_public: true
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/rsyslog.md']
public_title: Datadog-Rsyslog Integration
supported_os:
    - linux
integration_id: "rsyslog"
---

## Overview

Configure Rsyslog to gather logs from your host, containers, & services.

## Setup

### Log collection

#### Rsyslog version >=8

{{< tabs >}}
{{% tab "Datadog US site" %}}

1. (Optional) Activate Rsyslog file monitoring module. If you want to watch/monitor specific log files, then you have to activate the imfile module by adding this to your `rsyslog.conf`:

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. Create a `/etc/rsyslog.d/datadog.conf` file.
3. Set the log files to monitor and configure the destination endpoint. Add the following in `/etc/rsyslog.d/datadog.conf`.

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    ruleset(name="infiles") {
        action(type="omfwd" target="intake.logs.datadoghq.com" protocol="tcp" port="10514" template="DatadogFormat")
    }
    ```

4. (Optional) TLS Encryption:
   While sending your logs directly from Rsyslog to your Datadog account, if you want to add TLS encryption, take the following steps.

    - Install rsyslog-gnutls:

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    - Modify your `/etc/rsyslog.d/datadog.conf` to end with the following content:

        ```conf
        ## Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
        }
        ```

5. Restart Rsyslog and your new logs are forwarded directly to your Datadog account.

    ```shell
    sudo service rsyslog restart
    ```

6. Associate those logs with the host metrics and tags.
   To make sure that these logs are associated with the metrics and tags from the same host in your Datadog account, set the `HOSTNAME` in your `rsyslog.conf` to match the hostname of your Datadog metrics.
   If you did not specify any hostname in your configuration file for the metrics via `datadog.conf` or `datadog.yaml`, then you do not need to change anything.
   If you did specify a custom hostname for your metric, replace the **%HOSTNAME%** value in the format to match the same custom name.

7. Use Datadog integrations.
   To get the best use out of your logs in Datadog, set the source on your logs. The source can be set directly in the Agent if you forward your logs to the Datadog Agent.

    Otherwise you need a specific format per log source, which means you need a specific configuration file per source in `/etc/rsyslog.d/`.

    To set the source, use the following format (if you have several sources, change the name of the format in each file):

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```

    You can also add custom tags with the `ddtags` attribute:

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (Optional) Datadog cuts inactive connections after a period of inactivity. Some Rsyslog versions are not able to reconnect properly when necessary. To mitigate this issue, use time markers so the connection never stops. To achieve this, add the following line in your Rsyslog configuration:

    ```conf
    module(load="immark" interval="20")
    ```

    And don't forget to restart:

    ```shell
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{% tab "Datadog EU site" %}}

1. (Optional) Activate Rsyslog file monitoring module. If you want to watch or monitor specific log files, activate the `imfile` module by adding this to your `rsyslog.conf`:

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. Create a `/etc/rsyslog.d/datadog.conf` file.
3. Set the log files to monitor and configure the destination endpoint. Add the following in `/etc/rsyslog.d/datadog.conf`.

    ```conf
    ## For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>" StateFile="<UNIQUE_FILE_ID>")

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    ruleset(name="infiles") {
         action(type="omfwd" target="tcp-intake.logs.datadoghq.eu" protocol="tcp" port="1883" template="DatadogFormat")
    }
    ```

4. (Optional) TLS Encryption:
   While sending your logs directly from Rsyslog to your Datadog account, if you want to add TLS encryption, take the following steps.

    - Install rsyslog-gnutls:

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    - Modify your `/etc/rsyslog.d/datadog.conf` to end with the following content:

        ```conf
        ## Define the destination for the logs
        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat"           StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
        }
        ```

5. Restart Rsyslog, and your new logs are forwarded directly to your Datadog account.

    ```shell
    sudo service rsyslog restart
    ```

6. Associate those logs with the host metrics and tags.
   To make sure these logs are associated with the metrics and tags from the same host in your Datadog account, set the same `HOSTNAME` in your `rsyslog.conf` so that its value matches the hostname of your Datadog metrics.
   **Note**: If you did not specify any hostname in your configuration file for the metrics via `datadog.conf` or `datadog.yaml`, you do not need to change anything. If you did specify a custom hostname for your metric, make sure to replace the **%HOSTNAME%** value in the format to match the same custom name.

7. Use Datadog integrations.
   To get the best use out of your logs in Datadog, set the source on your logs. The source can be set directly in the Agent if you forward your logs to the Datadog Agent.

    Otherwise you need a specific format per log source which means you need a specific configuration file per source in `/etc/rsyslog.d/`.

    To set the source, use the following format (if you have several sources, change the name of the format in each file):

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```

    You can also add custom tags with the `ddtags` attribute:

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (Optional) Datadog cuts inactive connections after a period of inactivity.
   Some Rsyslog versions are not able to reconnect properly when necessary. To mitigate this issue, use time markers so the connection never stops. To achieve this, add the following line in your Rsyslog configuration:

    ```conf
    module(load="immark" interval="20")
    ```

    And don't forget to restart:

    ```shell
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{< /tabs >}}

#### Rsyslog version <8

{{< tabs >}}
{{% tab "Datadog US site" %}}

1. (Optional) Activate Rsyslog file monitoring module. If you want to watch or monitor specific log files, activate the `imfile` module by adding this to your `rsyslog.conf`:

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. Create a `/etc/rsyslog.d/datadog.conf` file.
3. Set the log files to monitor and configure the destination endpoint. Add the following in `/etc/rsyslog.d/datadog.conf`.

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    *.* @@intake.logs.datadoghq.com:10514;DatadogFormat
    ```

4. (Optional) TLS Encryption:
   While sending your logs directly from Rsyslog to your Datadog account, if you want to add TLS encryption, take the following steps.

    - Install rsyslog-gnutls:

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    - Modify your `/etc/rsyslog.d/datadog.conf` to end with the following content:

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.com
        *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
        ```

5. Restart Rsyslog and your new logs are forwarded directly to your Datadog account.

    ```shell
    sudo service rsyslog restart
    ```

6. Associate those logs with the host metrics and tags.
   To make sure these logs are associated with the metrics and tags from the same host in your Datadog account, set the same `HOSTNAME` in your `rsyslog.conf` so that its value matches the hostname of your Datadog metrics.
   **Note**: If you did not specify any hostname in your configuration file for the metrics via `datadog.conf` or `datadog.yaml`, you do not need to change anything. If you did specify a custom hostname for your metric, make sure to replace the **%HOSTNAME%** value in the format to match the same custom name.

7. Use Datadog integrations.
   To get the best use out of your logs in Datadog, set the source on your logs. The source can be set directly in the Agent if you forward your logs to the Datadog Agent.

    Otherwise you need a specific format per log source which means you need a specific configuration file per source in `/etc/rsyslog.d/`.

    To set the source, use the following format (if you have several sources, change the name of the format in each file):

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```

    You can also add custom tags with the `ddtags` attribute:

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (Optional) Datadog cuts inactive connections after a period of inactivity.
   Some Rsyslog versions are not able to reconnect properly when necessary. To mitigate this issue, use time markers so the connection never stops. To achieve this, add the following 2 lines in your Rsyslog configuration:

    ```conf
    $ModLoad immark
    $MarkMessagePeriod 20
    ```

    And don't forget to restart:

    ```shell
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{% tab "Datadog EU site" %}}

1. (Optional) Activate Rsyslog file monitoring module. If you want to watch or monitor specific log files, activate the `imfile` module by adding this to your `rsyslog.conf`:

    ```conf
    $ModLoad imfile
    $InputFilePollInterval 10
    $PrivDropToGroup adm
    $WorkDirectory /var/spool/rsyslog
    ```

2. Create a `/etc/rsyslog.d/datadog.conf` file.
3. Set the log files to monitor and configure the destination endpoint. Add the following in `/etc/rsyslog.d/datadog.conf`.

    ```conf
    ## Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor

    ## Set the Datadog Format to send the logs
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

    ## Define the destination for the logs
    *.* @@tcp-intake.logs.datadoghq.eu:1883;DatadogFormat
    ```

4. (Optional) TLS Encryption:
   While sending your logs directly from Rsyslog to your Datadog account, if you want to add TLS encryption, take the following steps.

    - Install rsyslog-gnutls:

        ```shell
        sudo apt-get install rsyslog-gnutls ca-certificates
        ```

    - Modify your `/etc/rsyslog.d/datadog.conf` to end with the following content:

        ```conf
        #Define the destination for the logs

        $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
        $ActionSendStreamDriver gtls
        $ActionSendStreamDriverMode 1
        $ActionSendStreamDriverAuthMode x509/name
        $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.eu
        *.* @@tcp-intake.logs.datadoghq.eu:443;DatadogFormat
        ```

5. Restart Rsyslog and your new logs are forwarded directly to your Datadog account.

    ```shell
    sudo service rsyslog restart
    ```

6. Associate those logs with the host metrics and tags.
   To make sure these logs are associated with the metrics and tags from the same host in your Datadog account, set the same `HOSTNAME` in your `rsyslog.conf` so that its value matches the hostname of your Datadog metrics.
   **Note**: If you did not specify any hostname in your configuration file for the metrics via `datadog.conf` or `datadog.yaml`, you do not need to change anything. If you did specify a custom hostname for your metric, make sure to replace the **%HOSTNAME%** value in the format to match the same custom name.

7. Use Datadog integrations.
   To get the best use out of your logs in Datadog, set the source on your logs. The source can be set directly in the Agent if you forward your logs to the Datadog Agent.

    Otherwise you need a specific format per log source which means you need a specific configuration file per source in `/etc/rsyslog.d/`.

    To set the source, use the following format (if you have several sources, change the name of the format in each file):

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```

    You can also add custom tags with the `ddtags` attribute:

    ```conf
    $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
    ```

8. (Optional) Datadog cuts inactive connections after a period of inactivity.
   Some Rsyslog versions are not able to reconnect properly when necessary. To mitigate this issue, use time markers so the connection never stops. To achieve this, add the following 2 lines in your Rsyslog configuration:

    ```conf
    $ModLoad immark
    $MarkMessagePeriod 20
    ```

    And don't forget to restart:

    ```shell
    sudo service rsyslog restart
    ```

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

Need help? Contact [Datadog support][1].

[1]: /help/
