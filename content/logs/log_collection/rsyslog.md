---
title: Rsyslog Log collection
kind: Documentation
description: "Configure Rsyslog to gather logs from your host, containers & services."
---

1. (Optional) Activate Rsyslog file monitoring module:  
    If you want to watch/monitor specific log files, then you have to activate the imfile module by adding this to  your `rsyslog.conf`:

    * **Rsyslog Version <8**
        ```
        $ModLoad imfile
        $InputFilePollInterval 10
        $PrivDropToGroup adm
        $WorkDirectory /var/spool/rsyslog
        ```

    * **Rsyslog Version >= 8**
        ```
        module(load="imfile" PollingInterval="10") #needs to be done just once
        ```

2. Create a `/etc/rsyslog.d/datadog.conf` file.  
3. (Optional) Set the files to monitor. Add the following in `/etc/rsyslog.d/datadog.conf`.  
    * **Rsyslog Version <8**.  

    ```
    # Input for FILE1
    $InputFileName /<PATH_TO_FILE1>
    $InputFileTag <APP_NAME_OF_FILE1>
    $InputFileStateFile <UNIQUE_FILE_ID>
    $InputFileSeverity info
    $InputRunFileMonitor
    ```
    * **Rsyslog Version >= 8**

    ```
    # For each file to send
    input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>" StateFile="<UNIQUE_FILE_ID>")
    ```
4. Send the logs to your Datadog platform
    To send logs directly to your Datadog account from Rsyslog over TCP, we firstly need to to define the format in `/etc/rsyslog.d/datadog.conf`:

    ```
    $template DatadogFormat,"YOURAPIKEY <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"
    ```

    Then define the endpoint:
    * **Rsyslog Version <8**

    ```
    *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
    ```
    * **Rsyslog Version >= 8**

    ```
    ruleset(name="infiles") {
        action(type="omfwd" target="intake.logs.datadoghq.com" protocol="tcp" port="10516" template="DatadogFormat")
    }
    ```
    This assumes that you have TLS enabled for your Rsyslog--if you do not, then you should use port 10514 instead of 10516. 

    Alternatively, to send logs from Rsyslog to your Datadog Logs Agent, configure your dd-agent to expect logs over UDP/TCP on a port of your choosing, add the following content to the end of your `/etc/rsyslog.d/datadog.conf`:
    ```
    $template DatadogFormat,"%msg%\n"
    *.* @@localhost:<PORT>;DatadogFormat  # @@ for TCP, @ for UDP
    ```

5. (Optional) TLS Encryption
    While sending your logs directly from Rsyslog to your Datadog account, if you want to add TLS encryption, you can take the following steps. 

    * Install rsyslog-gnutls:
     
    ```
    sudo apt-get install rsyslog-gnutls
    ```

    Download the public key for TLS encryption of logs from [this link][1]. Save it to `/etc/ssl/certs/intake.logs.datadoghq.com.crt`

    Modify your `/etc/rsyslog.d/datadog.conf` to end with the following content:

    ```
    $DefaultNetstreamDriverCAFile /etc/ssl/certs/intake.logs.datadoghq.com.crt
    $ActionSendStreamDriver gtls
    $ActionSendStreamDriverMode 1
    $ActionSendStreamDriverAuthMode x509/name
    $ActionSendStreamDriverPermittedPeer *.logs.datadoghq.com
    *.* @@intake.logs.datadoghq.com:10516;DatadogFormat
    ```

6. Restart Rsyslog and your new logs get forwarded directly to your Datadog account.

7. Associate those logs with the host metrics and tags
    In order to make sure that in your Datadog account these logs are associated with the metrics and tags from the same host, it is important to set the same HOSTNAME in your `rsyslog.conf` so that its value matches the hostname of your Datadog metrics.  
    Note that if you did not specify any hostname in your configuration file for the metrics via the `datadog.conf` or datadog.yaml, then you do not need to change anything.  
    If you did specify a custom Hostname for your metric, make sure to replace the **%HOSTNAME%** value in the format to match the same custom name.

8. Enjoy Datadog Integrations
    In order to get the best use out of your logs in Datadog, you need to set the source on your logs. The source can be set directly in the agent if you forward your logs to the Datadog agent.

    Otherwise you need a specific format per log source which means you need a specific configuration file per source in `/etc/rsyslog.d/`

    To set the source, use the following format (if you have several sources, change the name of the format in each file):

    ```
    $template DatadogFormat,"YOURAPIKEY <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
    ```
    
    You can also add custom tags thanks to the `ddtags` attribute:
    
    ```
    $template DatadogFormat,"YOURAPIKEY <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:test,<KEY:VALUE>\"] %msg%\n"
    ```

9. (Optional) Datadog cuts inactive connections after a period of inactivity.  
    Some Rsyslog versions that are not able to reconnect properly when necessary. To mitigate this issue, use time markers so the connection never stops. To achieve this, add the following 2 lines in your Rsyslog configuration:   
    ```
    $ModLoad immark
    $MarkMessagePeriod 45
    ```
    And don't forget to restart:
    ```
    sudo service rsyslog restart
    ```

[1]: https://gist.githubusercontent.com/estib/8762bc1a2a5bda781a6e55cca40235f2/raw/665b6b2906a728027f508ea067f01cdf3cf72b49/intake.logs.datadoghq.com.crt
