---
title: NXLog
name: nxlog
custom_kind: integration
description: 'Configure NXLog to gather logs from your host, containers, & services.'
short_description: 'Configure NXLog to gather logs from your host, containers, & services.'
categories:
    - log collection
doc_link: /integrations/nxlog/
aliases:
    - /logs/log_collection/nxlog
has_logo: true
integration_title: NXLog
is_public: true
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/nxlog.md']
public_title: Datadog-NXlog Integration
supported_os:
    - windows
integration_id: "nxlog"
---

## Overview

Configure NXLog to gather logs from your host, containers, and services.

## Setup

The following outlines the setup for log collection through [TCP](#log-collection-over-tcp) or [HTTP](#log-collection-over-http) endpoints and [NXLog TLS encryption](#nxlog-tls-encryption).

### Log collection over TCP

{{< site-region region="us3,us5,ap1,gov" >}}
  <div class="alert alert-warning">The TCP endpoint is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}). For a list of logging endpoints, see <a href="/logs/log_collection/?tab=tcp#additional-configuration-options">Log Collection and Integrations</a>.</div>
{{< /site-region >}}


1. Configure NXLog to send your logs to your Datadog platform, replace the whole file in `C:\Program Files\nxlog\conf` by the following:

    ```conf
    ## Set the ROOT to the folder your nxlog was installed into,
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
        Host        {{< region-param key="web_integrations_endpoint" >}}
        Port        {{< region-param key="tcp_endpoint_port" >}}
        Exec        to_syslog_ietf();
        Exec        $raw_event="<DATADOG_API_KEY> "+$raw_event;
    </Output>
    ############ ROUTES TO CHOOSE #####
    <Route 1>
        Path        syslogs => out
    </Route>
    ```

     Do not forget to replace `<DATADOG_API_KEY>` in the format.

2. Activate NXLog watchfile module for each file you want to monitor, add the following before the output section:

    ```conf
    ##Module to watch a file
    <Input FILE_WATCH_1>
      Module im_file
      File "PATH\\TO\\YOUR\\FILE1"
      Exec   $SourceName = '<MY_APPLICATION_NAME>';
      SavePos TRUE

      ##include the message and add meta data
      Exec $Message = $raw_event;
    </Input>
    ```

3. Make sure those files are plugged in the output section:

    ```conf
    <Route file1>
        Path    FILE_WATCH_1,FILE_WATCH_2,... => out
    </Route>
    ```

4. Restart NXLog. Open the service administrative tool:

    ```text
    C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools\Services.lnk
    ```

5. (Optional) Set extra parameters or tags. Add any specific attribute to your logs in each input section of your NXLog configuration file. For instance, to specify the source that is used in Datadog to identify the integration the logs come from, use:

    ```conf
    Exec        $ddsource = 'mysourcevalue';
    Exec        $ddtags = 'env:test,<KEY>:<VALUE>';
    ```

### Log collection over HTTP

```conf
    ## Set the ROOT to the folder your nxlog was installed into,
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
    ##HTTP output module
    <Output out>
        Module      om_http
        URL         {{< region-param key="http_endpoint" >}}
        Port        {{< region-param key="http_port" >}}
        Exec        to_syslog_ietf();
        Exec        $raw_event="<DATADOG_API_KEY> "+$raw_event;
    </Output>
    ############ ROUTES TO CHOOSE #####
    <Route 1>
        Path        syslogs => out
    </Route>
```

### NXLog TLS encryption

1. Download the [CA certificate][1].

2. Add the `om_ssl` module in your NXLog configuration to enable secure transfer over port 10516:

    ```conf
    <Output out>
      Module  om_ssl
      Host    {{< region-param key="web_integrations_endpoint" >}}
      Port    {{< region-param key="tcp_endpoint_port" >}}
      Exec    to_syslog_ietf();
      Exec    $raw_event="my_api_key " + $raw_event;
      CAFile  <CERT_DIR>/ca-certificates.crt
      AllowUntrusted FALSE
    </Output>
    ```

[1]: /resources/crt/ca-certificates.crt


## Troubleshooting

Need help? Contact [Datadog support][2].

[1]: /resources/crt/ca-certificates.crt
[2]: /help/
