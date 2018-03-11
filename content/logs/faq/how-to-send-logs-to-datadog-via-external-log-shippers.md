---
title: How to Send Logs to Datadog via External Log Shippers
kind: faq
further_reading:
- link: "logs/faq/i-have-a-custom-log-file-with-heightened-read-permissions"
  tag: "FAQ"
  text: I have a custom log file with heightened read-permissions; how do I send it to Datadog
- link: "logs/"
  tag: "Documentation"
  text: Learn how to collect your logs
- link: "logs/explore"
  tag: "Documentation"
  text: Learn how to explore your logs
---

The best and easiest way to send logs to Datadog is through the Datadog Agent. You can read how to configure the dd-agent to send logs to [Datadog here](/logs/).

That said, you can also send logs to Datadog using many common non-Datadog log shippers, like the following:

* [Rsyslog](#rsyslog)
* [FluentD](#fluentd)
* [Logstash](#logstash)
* [Syslog-ng](#syslog-ng)
* [NXLog (Windows)](#nxlog)

## Forwarding logs from other shippers to the Datadog Log Agent

The Datadog Log Agent can be configured:

* [To tail logs from files](/logs/#tail-existing-files)
* [To listen for logs via UDP or TCP over a given port](/logs/#stream-logs-through-tcp-udp). 
 
So whatever your log shipper is, one option is just to have that shipper forward its logs to the Datadog Log Agent; it is often easy to configure this kind of setup, both from the dd-agent side, and from your log shipper. With this approach, you don't need to add your Datadog API key, hostname, or source values in your log shipper's configurations, since that is handled by the Datadog Log Agent.

This approach can be especially useful for sending to Datadog logs that have heightened permission requirements. The dd-agent does not run as root (and as a best practice we do not encourage running it as root), so that can block the Datadog Logs Agent from tailing some log files directly, such as /var/log/syslog. If you do not want to modify the permissions on these files or the access that you give to the dd-agent user, many of these open source log shippers do run as root, and can be used to forward logs to the Datadog Logs Agent over UDP / TCP.

## Rsyslog

1. (Optional) Activate Rsyslog file monitoring module:  
    If you want to watch/monitor specific log files, then you have to activate the imfile module by adding this to  your `rsyslog.conf`:

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

2. Create a `/etc/rsyslog.d/datadog.conf` file.
3. (Optional) Set the files to monitor. Add the following in `/etc/rsyslog.d/datadog.conf`.
    * **Rsyslog Version <8**.  

    ```
    # Input for FILE1
    $InputFileName /<path_to_file1>
    $InputFileTag <app_name_of_file1>
    $InputFileStateFile <unique_file_id1>
    $InputFileSeverity info
    $InputRunFileMonitor
    ```
    * **Rsyslog Version >= 8**

    ```
    # For each file to send
    input(type="imfile" ruleset="infiles" Tag="<app_name_of_file1>" File="<path_to_file1>" StateFile="<unique_file_id1>")
    ```
4. Send the logs to your Datadog platform
    To send logs directly to your Datadog account from Rsyslog over TCP, we firstly need to to define the format in `/etc/rsyslog.d/datadog.conf`:

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
    *.* @@localhost:PORT;DatadogFormat  # @@ for TCP, @ for UDP
    ```

5. (Optional) TLS Encryption
    While sending your logs directly from Rsyslog to your Datadog account, if you want to add TLS encryption, you can take the following steps.

    * Install rsyslog-gnutls:
     
    ```
    sudo apt-get install rsyslog-gnutls
    ```

    Download the public key for TLS encryption of logs from [this link](https://gist.githubusercontent.com/estib/8762bc1a2a5bda781a6e55cca40235f2/raw/665b6b2906a728027f508ea067f01cdf3cf72b49/intake.logs.datadoghq.com.crt). Save it to `/etc/ssl/certs/intake.logs.datadoghq.com.crt

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

    Otherwise you need a specific format per log source which means you need a specific configuration file per source in /etc/rsyslog.d/

    To set the source, use the following format (if you have several sources, change the name of the format in each file):

    ```
    $template DatadogFormat,"YOURAPIKEY <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"mysourcename\"] %msg%\n"
    ```
    Do not forge to replace mysourcename by the appropriate value.

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

## FluentD

As long as you can forward your FluentD logs over tcp/udp to a specific port, you can use that approach to forward your FluentD logs to your Datadog agent. But another option is to use the [Datadog FluentD plugin](http://www.rubydoc.info/gems/fluent-plugin-datadog/0.9.6) to forward the logs directly from FluentD to your Datadog account.

In order to get the best use out of your logs in Datadog, it is important to have the proper metadata associated with your logs (including hostname and source). For the current version of the Datadog FluentD plugin, you have to include this metadata in the logs that you're sending to FluentD, using the following format:

```
{
    "syslog.hostname": "myhostname",
    "syslog.appname": "myappname",
    "ddsource": "mysourcename"
}
```

## Logstash

We have [an ouput plugin](https://github.com/DataDog/logstash-output-datadog_logs) for Logstash that takes care of sending your logs to your Datadog platform.

To install this plugin run the following command:

* `logstash-plugin install logstash-output-datadog_logs`

Then Configure datadog_logs plugin with your Datadog API key:

```
output {
    datadog_logs {
        api_key => "<your_datadog_api_key>"
    }
}
```

In order to get the best use out of your logs in Datadog, it is important to have the proper metadata associated with your logs (including hostname and source). By default, the hostname and timestamp should be properly remapped thanks to our default [remapping for reserved attributes](/logs/#edit-reserved-attributes). To make sure the service is correctly remapped, add its attribute value to the Service remapping list.

To set the source on your logs, you need to setup a Logstash filter:

```
filter {
  mutate {
    add_field => {
 "ddsource" => "mysourcevalue"
       }
    }
 }
```

## Syslog-ng

1. Collect system logs and log files In `/etc/syslog-ng/syslog-ng.conf` make sure the source is correctly defined:
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

2. Set the correct log format
    ```
    #########################
    # Destination
    #########################

    ...

    # For Datadog platform
    template DatadogFormat { template("YOURAPIKEY <${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n"); };
    destination d_datadog { tcp("intake.logs.datadoghq.com" port(10514) template(DatadogFormat)); };
    ```

3. Define the output in the path section
    ```
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```
    
4. (Optional) TLS Encryption 
    To activate TLS encryption:
    
    1. Download our [certificate](https://gist.githubusercontent.com/estib/8762bc1a2a5bda781a6e55cca40235f2/raw/665b6b2906a728027f508ea067f01cdf3cf72b49/intake.logs.datadoghq.com.crt) and save it to `/etc/syslog-ng/certs.d/datadoghq.crt`. 

    2. Change the definition of the destination to the following:

        ```
        destination d_datadog { tcp("intake.logs.datadoghq.com" port(10516)     tls(peer-verify(required-untrusted) ca_dir('/opt/syslog-ng/certs.d/')) template(DatadogFormat)); };
        ```

    More information about the TLS parameters and possibilities for syslog-ng available in their [official documentation](https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html).

5. Restart syslog-ng


## NXLog

1. Configure NXLog to send your logs to your Datadog platform
    Replace the whole file in `C:\Program Files\nxlog\conf` by the following:

    ```
    ## Please set the ROOT to the folder your nxlog was installed into,
    ## otherwise it won't start.
    #To change for your own system if necessary
    define ROOT C:\Program Files\nxlog
    #define ROOT_STRING C:\Program Files\nxlog
    #define ROOT C:\Program Files (x86)\nxlog
    Moduledir %ROOT%\modules
    CacheDir %ROOT%\data
    Pidfile %ROOT%\data\nxlog.pid
    SpoolDir %ROOT%\data
    LogFile %ROOT%\data\nxlog.log
    ##Extension to format the message in JSON format
    <Extension json>
        Module xm_json
    </Extension>
    ##Extension to format the message in syslog format
    <Extension syslog>
    Module xm_syslog
    </Extension>
    ########## INPUTS ###########
    ##Input for windows event logs
    <Input syslogs>
        Module      im_msvistalog
    ##For windows 2003 and earlier use the following:
    #    Module      im_mseventlog
    </Input>
    ############ OUTPUTS ##############
    ##TCP output module
    <Output out>
        Module      om_tcp
        Host        intake.logs.datadoghq.com
        Port        10514
        Exec        to_syslog_ietf();
        Exec        $raw_event="YOURAPIKEY "+$raw_event;
    </Output>
    ############ ROUTES TO CHOOSE #####
    <Route 1>
        Path        syslogs => out
    </Route>
    ```
    Do not forget to replace YOURAPIKEY in the format.

2. Activate NXLog watchfile module
    Foreach file you want to monitor add the following before the output section:
    ```
    ##Module to watch a file
    <Input file_watch_1>
      Module im_file
      File "Path\\to\\your\\file1"
      Exec   $SourceName = 'my_application_file1';
      SavePos TRUE

      ##include the message and add meta data
      Exec $Message = $raw_event;
    </Input>
    ```

3. Make sure those files are plugged in the output section
    ```
    <Route file1>
        Path    file_watch_1,file_watch2,... => out
    </Route>
    ```

4. Restart NXLog.  
    Open the service administrative tool:  
    `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools\Services.lnk`.

5. (Optional) Set extra parameters or tags.  
    Add any specific attribute to your logs in each input section of your NXLog configuration file. For instance, to specify the source that is used in Datadog to identify the integration the logs come from, use:

    ```
    Exec        $ddsource = 'mysourcevalue';
    ```

### NXLog TLS encryption

1. [Download the public key for TLS encryption of logs](https://gist.githubusercontent.com/estib/8762bc1a2a5bda781a6e55cca40235f2/raw/665b6b2906a728027f508ea067f01cdf3cf72b49/intake.logs.datadoghq.com.crt).

2. Add the `om_sll` module in your NXLog configuration to enable secure transfer over port 10516:

    ```
    <Output out>
      Module  om_ssl
      Host    intake.logs.datadoghq.com
      Port    10516
      Exec    $raw_event="%YOURAPIKEY% " + $raw_event;
      CAFile  %CERTDIR%/intake.logs.datadoghq.com.crt
      AllowUntrusted FALSE
    </Output>
    ```

{{< partial name="whats-next/whats-next.html" >}}
