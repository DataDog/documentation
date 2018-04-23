---
title: NXLog Log collection
kind: Documentation
description: "Configure NXLog to gather logs from your host, containers & services."
---


1. Configure NXLog to send your logs to your Datadog platform
    Replace the whole file in `C:\Program Files\nxlog\conf` by the following: 

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
        Module      im_msvistalog
    ##For windows 2003 and earlier use the following:
    #    Module      im_mseventlog
    </Input>
    ############ OUTPUTS ##############
    ##TCP output module
    <Output out>
        Module      om_tcp
        Host        intake.logs.datadoghq.com
        Port        10514
        Exec        to_syslog_ietf();
        Exec        $raw_event="YOURAPIKEY "+$raw_event;
    </Output>
    ############ ROUTES TO CHOOSE #####
    <Route 1>
        Path        syslogs => out
    </Route>
    ```
    Do not forget to replace YOURAPIKEY in the format.

2. Activate NXLog watchfile module
    Foreach file you want to monitor add the following before the output section:
    ```
    ##Module to watch a file
    <Input file_watch_1>
      Module im_file
      File "Path\\to\\your\\file1"
      Exec   $SourceName = 'my_application_file1';
      SavePos TRUE

      ##include the message and add meta data
      Exec $Message = $raw_event;
    </Input>
    ```

3. Make sure those files are plugged in the output section
    ```
    <Route file1>
        Path    file_watch_1,file_watch2,... => out
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

1. [Download the public key for TLS encryption of logs][1].

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

[1]: https://gist.githubusercontent.com/estib/8762bc1a2a5bda781a6e55cca40235f2/raw/665b6b2906a728027f508ea067f01cdf3cf72b49/intake.logs.datadoghq.com.crt