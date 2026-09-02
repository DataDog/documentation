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

The following outlines the setup for log collection through HTTP endpoints and [NXLog TLS encryption](#nxlog-tls-encryption). For more information on logging endpoints, see [Log Collection][1].

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

1. Download the [CA certificate][2].

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

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: /logs/log_collection/
[2]: /resources/crt/ca-certificates.crt
[3]: /help/
