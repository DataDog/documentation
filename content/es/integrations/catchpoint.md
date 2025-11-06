---
app_id: catchpoint
categories:
- metrics
- issue tracking
- network
- event management
custom_kind: integración
description: Envía tus alertas de Catchpoint a tu flujo de eventos de Datadog.
integration_version: 1.0.0
media: []
title: Catchpoint
---
## Información general

Catchpoint es una plataforma de análisis del rendimiento digital que te proporciona información completa y práctica, así como visibilidad de todo tu ecosistema digital.

La integración de Catchpoint te permite:

- Configurar alertas completas en tu flujo de eventos.
- Acceder a enlaces directos a gráficos de análisis en el portal Catchpoint.
- Configurar etiquetas (tags) del tipo de alerta para filtrar eventos en forma más eficaz.

## Configuración

### Instalación

No requiere instalación.

### Configuración

Para recibir alertas de Catchpoint en tu flujo de eventosinicia sesión en el portal Catchpoint y ve a _Configuración_ > _API_.

1. En la API de alertas, selecciona Activar.

   ![evento de catchpoint](images/configuration.png)

1. Introduce la URL del endpoint de la API de Datadog.

   ```text
   {{< region-param key=dd_api code="true" >}}/api/v1/events?api_key=<YOUR_DATADOG_API_KEY>
   ```

   Puedes elegir una clave de API existente en Datadog o crear una clave de API en la [pestaña **Configurar** del cuadro de la integración](https://app.datadoghq.com/integrations/catchpoint).

1. Configura el estado en Activo.

1. Selecciona Plantilla para Formato.

1. Añade una nueva plantilla.

1. Introduce el nombre de la plantilla, como `DataDog` y configura el Formato en JSON.

1. Utiliza la siguiente plantilla de JSON y guárdala.

   ```json
   {
       "title": "${TestName} [${TestId}] - ${switch(${notificationLevelId},'0','WARNING','1','CRITICAL','3','OK')}",
       "text": "${TestName} - http://portal.catchpoint.com/ui/Content/Charts/Performance.aspx?tList=${testId}&uts=${alertProcessingTimestampUtc}&z=&chartView=1",
       "priority": "normal",
       "tags": [
           "alertType:${Switch(${AlertTypeId},'0', 'Unknown','2', 'Byte Length','3','Content Match','4', 'Host Failure','7', 'Timing','9', 'Test Failure', '10',Insight', '11','Javascript Failure', '12', 'Ping',13, 'Requests')}"
       ],
       "alert_type": "${switch(${notificationLevelId},'0','warning','1','error','3','success')}",
       "source_type_name": "catchpoint"
   }
   ```

Catchpoint envía las alertas directamente al [Explorador de eventos](https://docs.datadoghq.com/service_management/events/) en Datadog.

![evento de catchpoint](images/screenshot.png)

### Recopilación de métricas

Para recibir métricas de Catchpoint en Datadog, crea un Webhook de datos de test en el portal Catchpoint.

1. En el webhook de datos de test, añade el endpoint de la API Datadog junto con la clave de la API:

   ```text
   {{< region-param key=dd_api code="true" >}}/api/v2/series?api_key=<YOUR_DATADOG_API_KEY>
   ```

   Puedes elegir una clave de API existente en Datadog o crear una clave de API en la [pestaña **Configurar** del cuadro de la integración](https://app.datadoghq.com/integrations/catchpoint).

1. Selecciona "Plantilla".

1. Haz clic en "Añadir nueva" en el menú desplegable.

1. Introduce un nombre.

1. En formato, selecciona "JSON".

1. Pega la siguiente plantilla de JSON y haz clic en "Guardar".

```json
{
    "series": [
        {
            "metric": "catchpoint.error.error",
            "points": [["${timestampepoch}", "${if('${errorany}', 1, 0)}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}",
                "ErrorCode : ${errorcode}",
                "ErrorDescription : ${errorconnection}${errordns}${errorload}${errorloadobjects}${errorssl}${errorsystemlimit}${errortimeout}${errortransaction}"
            ],
            "type": "count"
        },
        {
            "metric": "catchpoint.success.rate",
            "points": [["${timestampepoch}", "1"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${testName}",
                "TestUrl: ${testurl}",
                "ErrorType:${if(${errordns},'DNS',${errorconnection},'Connection',${errorssl},'SSL',${errorload},'Response',${errortransaction},'Transaction',${errortimeout},'Timeout',${errorsystemlimit},'Limit','Success')}",
                "ErrorContent:${errorloadobjects}"
            ],
            "type": "count"
        },
        {
            "metric": "catchpoint.frontend.client_time",
            "points": [["${timestampepoch}", "${timingclient}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.network.tcp_connect_time",
            "points": [["${timestampepoch}", "${timingconnect}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.content_load_time",
            "points": [["${timestampepoch}", "${timingcontentload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.network.dns_resolution_time",
            "points": [["${timestampepoch}", "${timingdns}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.document_complete_time",
            "points": [
                [
                    "${timestampepoch}",
                    "${timingdocumentcomplete}",
                    "TestUrl: ${testurl}"
                ]
            ],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.dom_content_load_time",
            "points": [["${timestampepoch}", "${timingdomcontentloadedevent}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.dom_interactive_time",
            "points": [
                [
                    "${timestampepoch}",
                    "${timingdominteractive}",
                    "TestName: ${TestName}",
                    "TestUrl: ${testurl}"
                ]
            ],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.dom_load_time",
            "points": [
                [
                    "${timestampepoch}",
                    "${timingdomload}",
                    "TestName: ${TestName}",
                    "TestUrl: ${testurl}"
                ]
            ],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.first_party_zone_impact",
            "points": [["${timestampepoch}", "${timingimpactself}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.third_party_zone_impact",
            "points": [["${timestampepoch}", "${timingimpactthirdparty}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.load_time",
            "points": [["${timestampepoch}", "${timingload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.total_root_request_redirect_time",
            "points": [["${timestampepoch}", "${timingredirect}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.render_start_time",
            "points": [["${timestampepoch}", "${timingrenderstart}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.total_root_request_time",
            "points": [["${timestampepoch}", "${timingresponse}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.network.send_time",
            "points": [["${timestampepoch}", "${timingsend}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.network.ssl_time",
            "points": [["${timestampepoch}", "${timingssl}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.time_to_title",
            "points": [["${timestampepoch}", "${timingtimetotitle}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.total_test_time",
            "points": [["${timestampepoch}", "${timingtotal}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.network.wait_time",
            "points": [["${timestampepoch}", "${timingwait}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.webpage_response_time",
            "points": [["${timestampepoch}", "${timingwebpageresponse}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.wire_time",
            "points": [["${timestampepoch}", "${timingwire}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ping.percentage.ping_packet_loss",
            "points": [["${timestampepoch}", "${pingpacketlosspct}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ping.ping_round_trip_time",
            "points": [["${timestampepoch}", "${pingroundtriptimeavg}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.imap.message_fetch_time",
            "points": [["${timestampepoch}", "${timingfetch}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.imap.message_list_time",
            "points": [["${timestampepoch}", "${timinglist}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.imap.logout_time",
            "points": [["${timestampepoch}", "${timinglogout}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.imap.message_search_time",
            "points": [["${timestampepoch}", "${timingsearch}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.total_download_bytes",
            "points": [["${timestampepoch}", "${bytedownload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.total_get_bytes",
            "points": [["${timestampepoch}", "${byteget}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.uploaded_bytes",
            "points": [["${timestampepoch}", "${byteupload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.delete_time",
            "points": [["${timestampepoch}", "${timingdelete}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.download_time",
            "points": [["${timestampepoch}", "${timingdownload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.get_time",
            "points": [["${timestampepoch}", "${timingget}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.upload_time",
            "points": [["${timestampepoch}", "${timingupload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ntp.root_delay_time",
            "points": [["${timestampepoch}", "${timingrootdelay}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ntp.root_dispersion_time",
            "points": [["${timestampepoch}", "${timingrootdispersion}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ntp.round_trip_delay_time",
            "points": [["${timestampepoch}", "${timingroundtripdelay}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ntp.ntp_time",
            "points": [["${timestampepoch}", "${timinglocalclockoffset}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.total_self_zone_bytes",
            "points": [["${timestampepoch}", "${byteresponseselfzone}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.total_response_content_bytes",
            "points": [["${timestampepoch}", "${byteresponsetotalcontent}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.total_response_header_bytes",
            "points": [["${timestampepoch}", "${byteresponsetotalheaders}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.root_request_response_content_bytes",
            "points": [["${timestampepoch}", "${byteresponsecontent}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.root_request_response_header_bytes",
            "points": [["${timestampepoch}", "${byteresponseheaders}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.total_downloaded_bytes",
            "points": [["${timestampepoch}", "${bytereceive}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_connections",
            "points": [["${timestampepoch}", "${counterconnections}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_failed_requests",
            "points": [["${timestampepoch}", "${counterfailedrequests}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_filmstrip_images",
            "points": [["${timestampepoch}", "${counterfilmstripimages}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_hosts",
            "points": [["${timestampepoch}", "${counterhosts}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_js_errors",
            "points": [["${timestampepoch}", "${counterjsfailures}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_redirect",
            "points": [["${timestampepoch}", "${counterredirections}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_requests",
            "points": [["${timestampepoch}", "${counterrequests}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.page_speed_score",
            "points": [["${timestampepoch}", "${scorepagespeed}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.speed_index_score",
            "points": [["${timestampepoch}", "${scorespeedindex}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.above_the_fold_time",
            "points": [["${timestampepoch}", "${timingabovethefold}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.authentication_time",
            "points": [["${timestampepoch}", "${timingauth}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        }
    ]
}
```

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **catchpoint.network.timing.tcp_connect_time** <br>(gauge) | El tiempo que se tardó en establecer una conexión TCP con el servidor.<br>_Se muestra como milisegundo_ |
| **catchpoint.network.timing.dns_resolution_time** <br>(gauge) | El tiempo que se tardó en resolver el nombre de dominio a una dirección IP.<br>_Se muestra como milisegundo_ |
| **catchpoint.network.timing.send_time** <br>(gauge) | El tiempo que tardó en enviarse la solicitud al servidor.<br>_Se muestra como milisegundo_ |
| **catchpoint.network.timing.ssl_time** <br>(gauge) | El tiempo que tardó en completarse el handshake SSL con el servidor.<br>_Se muestra como milisegundo_ |
| **catchpoint.network.timing.wait_time** <br>(gauge) | Tiempo transcurrido desde el envío de la solicitud al servidor hasta la recepción del primer paquete de respuesta. (Conocido como "First Byte" (Primer byte) en algunas herramientas)<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.timing.client_time** <br>(gauge) | Cantidad total de tiempo sin ninguna solicitud, desde el inicio del test/paso hasta "Document Complete" (Documento completo).<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.timing.content_load_time** <br>(gauge) | El tiempo que tardó en cargarse todo el contenido de la página web después de que se estableciera conexión con el servidor de URL primario. Es el tiempo transcurrido desde el final de Envío (ms) hasta que se cargó el último elemento, u objeto, en la página. La carga de contenido excluye el tiempo de DNS, Conexión, SSL y Envío. Para los tests de monitor de Objeto, este valor equivale a Carga (ms).<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.timing.document_complete_time** <br>(gauge) | El tiempo transcurrido desde que se emitió la solicitud URL inicial hasta que el navegador disparó el evento "onload". Cualquier solicitud en línea o insertada a través de "document.write" debe completar la carga antes de que se dispare el evento. Document Complete no tiene en cuenta las solicitudes dinámicas que puedan generarse posteriormente a través de JavaScript o la manipulación del DOM.<br>_Se muestra en milisegundos_ |
| **catchpoint.frontend.timing.dom_content_load_time** <br>(gauge) | Tiempo de carga del contenido DOM<br>_Se muestra en milisegundos_ |
| **catchpoint.frontend.timing.dom_interactive_time** <br>(gauge) | Momento en el que la página comenzó a ser interactiva. El TTI marca el punto en el que la página web se renderiza visualmente y es capaz de responder de forma fiable a la entrada del usuario.<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.timing.dom_load_time** <br>(gauge) | El tiempo que tardó en cargarse el Modelo de Objetos del Documento (DOM) de la página web.<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.timing.first_party_zone_impact** <br>(gauge) | Tiempo de impacto principal en milisegundos.<br>_Se muestra en milisegundos_ |
| **catchpoint.frontend.timing.third_party_zone_impact** <br>(gauge) | Tiempo de impacto externo en milisegundos.<br>_Se muestra en milisegundos_ |
| **catchpoint.frontend.timing.load_time** <br>(gauge) | El tiempo transcurrido desde el primer paquete hasta el último paquete de datos de la respuesta. (Otras herramientas podrían llamar a esta métrica "Recibir" o "Recepción")<br>_Se muestra como milisegundo_. |
| **catchpoint.frontend.timing.total_root_request_redirect_time** <br>(gauge) | Tiempo total de redirección de la solicitud raíz reenviada en milisegundos.<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.timing.render_start_time** <br>(gauge) | Tiempo transcurrido desde el inicio de la navegación hasta el final de la última redirección.<br>_Se muestra en milisegundos_ |
| **catchpoint.frontend.timing.total_root_request_time** <br>(gauge) | Tiempo total de solicitud raíz<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.timing.time_to_title** <br>(gauge) | Tiempo que se tarda en analizar la etiqueta del título.<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.timing.webpage_response_time** <br>(gauge) | Tiempo que tarda en cargarse toda la página web, incluidos todos los componentes de la página.<br>_Se muestra en milisegundos_ |
| **catchpoint.frontend.timing.wire_time** <br>(gauge) | La cantidad total de tiempo en el que al menos una solicitud estuvo en el cable, desde el inicio del test o paso hasta que se completó el documento.<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.timing.total_test_time** <br>(gauge) | Métrica cohesiva que se aplica a todos los tipos de tests e indica la duración total de la ejecución de un test. Test Time (Tiempo de test) equivale a Response (Respuesta), Test Response (Respuesta de test) (tests de transacción y web) y Ping RTT (tests de rutas de trazas (traces)), y se utiliza al calcular Apdex. Test Time (Tiempo de test) no está disponible para los gráficos de solicitud, host o zona.<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.timing.above_the_fold_time** <br>(gauge) | Tiempo que tarda en cargarse el contenido "por encima del pliegue" de una página web.<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.timing.authentication_time** <br>(gauge) | Tiempo transcurrido para autenticarse con el servidor SMTP.<br>_Se muestra como milisegundo_ |
| **catchpoint.frontend.score.page_speed_score** <br>(count) | PageSpeed Score de Google, que representa que tan bien una página web utiliza diversas técnicas de optimización del rendimiento.|
| **catchpoint.frontend.score.speed_index_score** <br>(count) | Métrica calculada que representa que tan rápido la página muestra el contenido inicial visible para el usuario "por encima del pliegue". Un índice de velocidad más bajo indica una representación más rápida del contenido visible.|
| **catchpoint.frontend.counter.total_number_of_connections** <br>(count) | Número total de conexiones TCP establecidas durante el test.|
| **catchpoint.frontend.counter.total_number_of_failed_requests** <br>(count) | Número total de solicitudes fallidas.|
| **catchpoint.frontend.counter.total_number_of_filmstrip_images** <br>(count) | Número total de imágenes de película.|
| **catchpoint.frontend.counter.total_number_of_hosts** <br>(count) | Número total de hosts<br>_Se muestra como host_ |
| **catchpoint.frontend.counter.total_number_of_js_errors** <br>(count) | Número total de errores JS.|
| **catchpoint.frontend.counter.total_number_of_redirect** <br>(count) | Número total de redireccionamientos.|
| **catchpoint.frontend.counter.total_number_of_requests** <br>(count) | Número total de solicitudes<br>_Se muestra como solicitud_ |
| **catchpoint.frontend.bytes.total_downloaded_bytes** <br>(count) | Total de bytes descargados.<br>_Se muestra como byte_ |
| **catchpoint.frontend.bytes.root_request_response_content_bytes** <br>(count) | Bytes del cuerpo de la respuesta de una solicitud raíz<br>_Se muestra como byte_ |
| **catchpoint.frontend.bytes.root_request_response_header_bytes** <br>(count) | Bytes de la cabecera de la respuesta de una solicitud raíz<br>_Se muestra como byte_ |
| **catchpoint.frontend.bytes.total_self_zone_bytes** <br>(count) | Total de bytes de la zona propia<br>_Se muestra como byte_ |
| **catchpoint.frontend.bytes.total_response_content_bytes** <br>(count) | Total de bytes del cuerpo de la respuesta<br>_Se muestra como byte_ |
| **catchpoint.frontend.bytes.total_response_header_bytes** <br>(count) | Total de bytes de la cabecera de la respuesta<br>_Se muestra como byte_ |
| **catchpoint.ftp.bytes.total_download_bytes** <br>(count) | Total de bytes de descarga total FTP por parte del test.<br>_Se muestra como byte_ |
| **catchpoint.ftp.bytes.total_get_bytes** <br>(count) | Total de bytes GET total FTP por parte del test.<br>_Se muestra como byte_ |
| **catchpoint.ftp.bytes.uploaded_bytes** <br>(count) | Total de bytes cargados FTP por parte del test.<br>_Se muestra como byte_ |
| **catchpoint.ftp.timing.delete_time** <br>(gauge) | Tiempo transcurrido para borrar el archivo especificado del servidor FTP.<br>_Se muestra como milisegundo_ |
| **catchpoint.ftp.timing.download_time** <br>(gauge) | Tiempo transcurrido para descargar el archivo completo desde el servidor FTP.<br>_Se muestra como milisegundo_ |
| **catchpoint.ftp.timing.get_time** <br>(gauge) | Tiempo transcurrido para conectarse al servidor FTP y consultarle el tamaño del archivo.<br>_Se muestra como milisegundo_ |
| **catchpoint.ftp.timing.upload_time** <br>(gauge) | Tiempo transcurrido para cargar el archivo especificado en el servidor FTP.<br>_Se muestra como milisegundo_ |
| **catchpoint.imap.timing.message_fetch_time** <br>(gauge) | Tiempo transcurrido para obtener el mensaje del servidor IMAP.<br>_Se muestra como milisegundo_ |
| **catchpoint.imap.timing.message_list_time** <br>(gauge) | Tiempo transcurrido para listar las carpetas.<br>_Se muestra como milisegundo_ |
| **catchpoint.imap.timing.logout_time** <br>(gauge) | Tiempo transcurrido para desconectarse del servidor IMAP.<br>_Se muestra como milisegundo_ |
| **catchpoint.imap.timing.message_search_time** <br>(gauge) | Tiempo transcurrido para buscar los mensajes.<br>_Se muestra como milisegundo_ |
| **catchpoint.ntp.timing.ntp** <br>(gauge) | Tiempo total NTP.<br>_Se muestra como milisegundo_ |
| **catchpoint.ntp.timing.root_delay_time** <br>(gauge) | Retraso estimado entre el reloj del sistema local y el reloj raíz.<br>_Se muestra como milisegundo_ |
| **catchpoint.ntp.timing.root_dispersion_time** <br>(gauge) | Error estimado en el reloj del sistema local desde la última sincronización con el reloj anterior.<br>_Se muestra como milisegundo_ |
| **catchpoint.ntp.timing.round_trip_delay_time** <br>(gauge) | Cantidad total de tiempo que el paquete de solicitud NTP y el paquete de respuesta viajaron entre el nodo y el servidor NTP.<br>_Se muestra como milisegundo_ |
| **catchpoint.ping.percentage.ping_packet_loss** <br>(gauge) | Porcentaje de paquetes de pings enviados que no han recibido respuesta. Calculado como: (# paquetes recibidos / # paquetes enviados) * 100<br>_Se muestra como porcentaje_ |
| **catchpoint.ping.timing.ping_round_trip_time** <br>(gauge) | Tiempo medio entre el envío de un paquete ping y la recepción de una respuesta.<br>_Se muestra como milisegundo_ |
| **catchpoint.error.boolean.error** <br>(count) | Recuento de errores de todos los fallos, incluyendo los fallos de solicitudes secundarias.<br>_Se muestra como error_ |
| **catchpoint.success.rate** <br>(count) | Recuento de errores de fallos de tests.<br>_Se muestra como error_ |

### Eventos

Los eventos de Catchpoint aparecen en el widget de flujo (stream) de eventos del [dashboard de Catchpoint](https://app.datadoghq.com/dash/integration/32054/catchpoint-dashboard).

### Checks de servicio

La integración Catchpoint no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).