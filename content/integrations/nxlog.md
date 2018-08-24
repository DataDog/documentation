---
title: NXLog
name: nxlog
kind: integration
description: "Configure NXLog to gather logs from your host, containers, & services."
short_description: "Configure NXLog to gather logs from your host, containers, & services."
categories:
- log collection
doc_link: https://docs.datadoghq.com/integrations/nxlog/
aliases:
    - logs/log_collection/nxlog
has_logo: true
integration_title: nxlog
is_public: true
public_title: Datadog-NXlog Integration
supported_os:
- windows
---

## Overview

Configure NXLog to gather logs from your host, containers, & services.

## Setup
### Log collection

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
        Exec        $raw_event="<YOUR_API_KEY> "+$raw_event;
    </Output>
    ############ ROUTES TO CHOOSE #####
    <Route 1>
        Path        syslogs => out
    </Route>
    ```
    Do not forget to replace <YOUR_API_KEY> in the format.

2. Activate NXLog watchfile module
    Foreach file you want to monitor add the following before the output section:
    ```
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

3. Make sure those files are plugged in the output section
    ```
    <Route file1>
        Path    FILE_WATCH_1,FILE_WATCH_2,... => out
    </Route>
    ```

4. Restart NXLog.  
    Open the service administrative tool:  
    `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools\Services.lnk`.

5. (Optional) Set extra parameters or tags.  
    Add any specific attribute to your logs in each input section of your NXLog configuration file. For instance, to specify the source that is used in Datadog to identify the integration the logs come from, use:

    ```
    Exec        $ddsource = 'mysourcevalue';
    Exec        $ddtags = 'env:test,<KEY:VALUE>';
    ```

### NXLog TLS encryption

1. [Download the public key for TLS encryption of logs][1].

2. Add the `om_sll` module in your NXLog configuration to enable secure transfer over port 10516:

    ```
    <Output out>
      Module  om_ssl
      Host    intake.logs.datadoghq.com
      Port    10516
      Exec    $raw_event="<YOUR_API_KEY> " + $raw_event;
      CAFile  <CERT_DIR>/intake.logs.datadoghq.com.crt
      AllowUntrusted FALSE
    </Output>
    ```

## Troubleshooting

Need help? Contact [Datadog Support][2].

[1]: /crt/intake.logs.datadoghq.com.crt
[2]: https://docs.datadoghq.com/help/
