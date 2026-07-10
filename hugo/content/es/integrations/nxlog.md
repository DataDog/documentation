---
aliases:
- /es/logs/log_collection/nxlog
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/nxlog.md
description: Configura NxLog para recopilar logs de tus host, contenedores y servicios.
doc_link: /integrations/nxlog/
has_logo: true
integration_id: nxlog
integration_title: NxLog
is_public: true
name: nxlog
public_title: Integración de Datadog y NxLog
short_description: Configura NxLog para recopilar logs de tus host, contenedores y
  servicios.
supported_os:
- windows
title: NxLog
---

## Información general

Configurar NxLog para recopilar logs de tus host, contenedores y servicios.

## Configuración

A continuación, se describe la configuración para la recopilación de logs a través de endpoints de [TCP](#log-collection-over-tcp) o [HTTP](#log-collection-over-http) y [cifrado NxLog TLS](#nxlog-tls-encryption).

### Recopilación de logs a través de TCP

{{< site-region region="us3,us5,ap1,gov" >}}
  <div class="alert alert-danger">El endpoint de TCP no es compatible con tu <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}). Para una lista de los endpoints de registro, consulta <a href="/logs/log_collection/?tab=tcp#additional-configuration-options">Recopilación de logs e integraciones</a>.</div>
{{< /site-region >}}


1. Configura NxLog para enviar tus logs a tu plataforma de Datadog, sustituye todo el archivo en `C:\Program Files\nxlog\conf` por lo siguiente:

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

     No olvides sustituir `<DATADOG_API_KEY>` en el formato.

2. Activa el módulo watchfile de NxLog para cada archivo que desees monitorizar, añade lo siguiente antes de la sección de salida:

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

3. Asegúrate de que esos archivos están conectados en la sección de salida

    ```conf
    <Route file1>
        Path    FILE_WATCH_1,FILE_WATCH_2,... => out
    </Route>
    ```

4. Reinicia NxLog. Abre la herramienta administrativa del servicio:

    ```text
    C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Administrative Tools\Services.lnk
    ```

5. (Opcional) Establece parámetros adicionales o etiquetas (tags). Añade cualquier atributo específico a tus logs en cada sección de entrada de tu archivo de configuración de NxLog. Por ejemplo, para especificar la fuente que se utiliza en Datadog para identificar la integración de la que proceden los logs, utiliza:

    ```conf
    Exec        $ddsource = 'mysourcevalue';
    Exec        $ddtags = 'env:test,<KEY>:<VALUE>';
    ```

### Recopilación de logs a través de HTTP

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

### Cifrado TLS de NxLog

1. Descarga el [certificado CA][1].

2. Añade el módulo `om_ssl` en tu configuración de NxLog para habilitar la transferencia segura a través del puerto 10516:

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


## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].

[1]: /resources/crt/ca-certificates.crt
[2]: /es/help/