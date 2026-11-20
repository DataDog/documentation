---
app_id: bind9
categories:
- la red
- recopilación de logs
- métricas
custom_kind: integración
description: Una integración de Datadog para recopilar logs y métricas de servidor
  de Bind 9
integration_version: 1.1.0
media:
- caption: Bind9 - Información general
  image_url: images/bind9_overview.png
  media_type: imagen
- caption: Bind9 - Detalles
  image_url: images/bind9_details.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Bind 9
---
## Información general

[Bind 9](https://www.isc.org/bind/) es una implementación completa y altamente portable del protocolo del Sistema de Nombres de Dominio (DNS). El servidor de nombres Bind 9 (nombrado), puede actuar como servidor de nombres autoritativo, resolver recursivo, forwarder DNS o las tres cosas simultáneamente.

Esta integración proporciona enriquecimiento y visualización para los tipos de logs Query, Query Errors, Network, Lame Servers, Notify y Security. Ayuda a visualizar información detallada sobre patrones de solicitud DNS, comunicación DNS, configuraciones de servidor adecuadas y ataques DNS, asegurando un entorno de DNS robusto y fiable a través de dashboards predefinidos. Además, esta integración proporciona reglas de detección predefinidas. También recopilará estadísticas de Bind 9 en forma de métricas que pueden utilizarse para visualizaciones según sea necesario.

## Configuración

### Instalación

Para instalar la integración de Bind 9, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para obtener más información, consulta la documentación de [Gestión de la integración](https://docs.datadoghq.com/agent/guide/integration-management/?tab=linux#install) documentation.

**Nota**: Este paso no es necesario para la versión 7.58.0 o posterior del Agent.

Comando de Linux

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-bind9==1.1.0
```

#### Recopilación de logs

#### Monitorización de archivos

1. Inicia sesión en tu dispositivo de Bind 9.

1. Abre el archivo `named.conf` para añadir una cláusula de registro:

   ```
   logging {
    channel <example_channel> {
         file "/folder_path/file_name.log" versions <unlimited | <integer>> size <size> suffix <increment | timestamp>;
         print-time (yes | local | iso8601 | iso8601-utc);
         print-category yes;
         print-severity yes;
    };
    category <example-category> { <example_channel>; };
   }
   ```

   **NOTA**: El valor recomendado para `print-time` es `iso8601-utc`, ya que Datadog espera que todos los logs estén en la zona horaria UTC por defecto. Si la zona horaria de tus logs de Bind 9 no es UTC, asegúrate de seguir los [pasos para utilizar una zona horaria diferente](https://docs.datadoghq.com/integrations/bind9/#timezone-steps). Además, [consulta las categorías definidas por Bind 9](https://downloads.isc.org/isc/bind9/9.18.29/doc/arm/html/reference.html#namedconf-statement-category).

   Ejemplo de canal de generación de logs:

   ```
   logging {
    channel default_log {
         file "/var/log/named/query.log" versions 3 size 10m;
         print-time iso8601-utc;
         print-category yes;
         print-severity yes;
    };
      category default { default_log; };
   }
   ```

1. Guarda y sal del archivo.

1. Reinicia el servicio

   ```
   service named restart
   ```

#### Syslog

1. Inicia sesión en tu dispositivo de Bind 9.

1. Abre el archivo `named.conf` para añadir una cláusula de registro:

   ```
   logging {
    channel <example_channel> {
         syslog <syslog_facility>;
         severity (critical | error | warning | notice | info | debug [level ] | dynamic);
         print-time (yes | local | iso8601 | iso8601-utc);
         print-category yes;
         print-severity yes;
    };
    category <example-category> { <example_channel>; };
   }
   ```

   **NOTA**: El valor recomendado para `print-time` es `iso8601-utc`, ya que Datadog espera que todos los logs estén en la zona horaria UTC por defecto. Si la zona horaria de tus logs de Bind 9 no es UTC, asegúrate de seguir los [pasos para utilizar una zona horaria diferente](https://docs.datadoghq.com/integrations/bind9/#timezone-steps).. Además, [consulta las categorías definidas por Bind 9](https://downloads.isc.org/isc/bind9/9.18.29/doc/arm/html/reference.html#namedconf-statement-category).

   Ejemplo de canal de generación de logs:

   ```
   logging {
    channel default_log {
         syslog local3;
         print-time iso8601-utc;
         print-category yes;
         print-severity yes;
    };
      category default { default_log; };
   }
   ```

1. Guarda y sal del archivo.

1. Edita la configuración de syslog/rsyslog para loguear en Datadog utilizando la instalación que seleccionaste en Bind 9:

   ```
   <syslog_facility>.* @@<DATADOG_AGENT_IP_ADDRESS>:<PORT>
   ```

1. Reinicia los siguientes servicios.

   ```
   service syslog/rsyslog restart
   service named restart
   ```

**Nota**: Asegúrate de que `print-category` y `print-severity` están configurados como `yes` en la configuración de los canales para la aplicación Bind 9.

### Configuración

#### Recopilación de métricas

1. Edita el archivo `bind9.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus [métricas](https://docs.datadoghq.com/integrations/bind9/#metrics) de Bind 9. Consulta el [ejemplo de bind9.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     - url: "<BIND_9_STATS_URL>"
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

#### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

#### Monitorización de archivos

1. Añade este bloque de configuración a tu archivo `bind9.d/conf.yaml` para empezar a recopilar tus logs de Bind 9:

   Consulta el [ejemplo de bind9.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example) para conocer las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/named/*.log
       service: bind9
       source: bind9
   ```

   **Nota**: Cambia la variable `path` en `conf.yaml` a la misma ruta configurada en el parámetro `file` en canales para la aplicación de Bind 9.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Syslog

1. Añade este bloque de configuración a tu archivo `bind9.d/conf.yaml` para empezar a recopilar tus logs de Bind 9:

   Consulta el [ejemplo de bind9.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example) para conocer las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: tcp
       port: <PORT>
       service: bind9
       source: bind9
   ```

   **Nota**: El valor de `port` debe ser el mismo que el mencionado en `syslog.conf/rsyslog.conf`.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

<h4 id="timezone-steps"> Especifica una zona horaria distinta de UTC en el pipeline de logs de Bind 9 Datadog</h4>

Datadog espera que todos los logs estén en la zona horaria UTC por defecto. Si la zona horaria de tus logs de Bind 9 no es UTC, especifica la zona horaria correcta en el pipeline de Bind 9 Datadog.

Para cambiar la zona horaria en el pipeline de Bind 9:

1. Ve a la [página Pipelines](https://app.datadoghq.com/logs/pipelines) en la aplicación Datadog.

1. Introduce "Bind 9" en la casilla **Filter Pipelines** (Filtrar pipelines).

1. Pasa el ratón por encima del pipeline de Bind 9 y haz clic en el botón **clone** (clonar). Esto creará un clon editable del pipeline de Bind 9.

1. Edita el Grok Parser siguiendo los siguientes pasos:

   - En el pipeline clonado, busca un procesador con el nombre "Grok Parser: Parsing Bind 9 common log format" y haz clic en el botón `Edit` pasando el ratón por encima del pipeline.
   - En **Define parsing rules** (Definir reglas de parseo),
     - Cambia la cadena `UTC` por el [identificador TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) de la zona horaria de tu servidor Bind 9. Por ejemplo, si tu zona horaria es IST, cambia el valor a`Asia/Calcutta`.
   - Pulsa el botón **update** (actualizar).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `bind9` en la sección Checks.

## Compatibilidad

El check es compatible con las principales plataformas.

## Datos recopilados

### Logs

La integración de Bind 9 recopila los siguientes tipos de log.

| Tipos de evento    |
| -------------- |
| Query, Query Errors, Lame Servers, Notify, Security|

### Métricas

| | |
| --- | --- |
| **bind9.nsstat_AuthQryRej** <br>(gauge) | Número de consultas autoritativas (no recursivas) rechazadas.<br>_Se muestra como consulta_ |
| **bind9.nsstat_DNS64** <br>(gauge) | |
| **bind9.nsstat_ExpireOpt** <br>(gauge) | |
| **bind9.nsstat_NSIDOpt** <br>(gauge) | |
| **bind9.nsstat_OtherOpt** <br>(gauge) | |
| **bind9.nsstat_QryAuthAns** <br>(gauge) | Número de consultas que han dado lugar a una respuesta autoritativa.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryDropped** <br>(gauge) | Número de consultas recursivas para las que el servidor ha detectado un número excesivo de consultas recursivas existentes para el mismo nombre, tipo y clase y que posteriormente se descartaron.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryDuplicate** <br>(gauge) | Número de consultas para las que el servidor ha intentado recurrir pero detectó una consulta existente con la misma dirección IP, puerto, ID de consulta, nombre, tipo y clase que ya se estaba procesando.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryFailure** <br>(gauge) | Número de consultas que han fallado por otro motivo.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryFORMERR** <br>(gauge) | Número de consultas que han dado como resultado FORMERR.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryNoauthAns** <br>(gauge) | Número de consultas que han dado lugar a una respuesta no autoritativa.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryNXDOMAIN** <br>(gauge) | Número de consultas que han dado como resultado NXDOMAIN.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryNXRedir** <br>(gauge) | Número de consultas que han dado como resultado NXDOMAIN y han sido redirigidas.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryNXRedirRLookup** <br>(gauge) | Número de consultas que han dado como resultado NXDOMAIN, han sido redirigidas y han dado como resultado una búsqueda remota exitosa.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryNxrrset** <br>(gauge) | Número de consultas que han dado lugar a respuestas NOERROR sin datos<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryRecursion** <br>(gauge) | Número de consultas que han llevado al servidor a realizar una recursión para encontrar la respuesta final.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryReferral** <br>(gauge) | Número de consultas que han dado lugar a una respuesta de referencia.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QrySERVFAIL** <br>(gauge) | Número de consultas que han dado como resultado SERVFAIL.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QrySuccess** <br>(gauge) | Número de consultas que han dado lugar a una respuesta satisfactoria.<br>_Se muestra como consulta_ |
| **bind9.nsstat_QryTCP** <br>(gauge) | |
| **bind9.nsstat_QryUDP** <br>(gauge) | |
| **bind9.nsstat_RateDropped** <br>(gauge) | Número de respuestas descartadas por límites de frecuencia.<br>_Se muestra como respuesta_ |
| **bind9.nsstat_RateSlipped** <br>(gauge) | Número de respuestas truncadas por límites de frecuencia.<br>_Se muestra como respuesta_ |
| **bind9.nsstat_RecQryRej** <br>(gauge) | Número de consultas recursivas rechazadas.<br>_Se muestra como consulta_ |
| **bind9.nsstat_RecursClients** <br>(gauge) | |
| **bind9.nsstat_ReqBadEDNSVer** <br>(gauge) | Número de solicitudes con versión EDNS no compatible recibidas.<br>_Se muestra como solicitud_ |
| **bind9.nsstat_ReqBadSIG** <br>(gauge) | Número de solicitudes con firma no válida (TSIG o SIG(0)).<br>_Se muestra como solicitud_ |
| **bind9.nsstat_ReqEdns0** <br>(gauge) | Número de solicitudes con EDNS(0) recibidas.<br>_Se muestra como solicitud_ |
| **bind9.nsstat_ReqSIG0** <br>(gauge) | Número de solicitudes con SIG(0) recibidas.<br>_Se muestra como solicitud_ |
| **bind9.nsstat_ReqTCP** <br>(gauge) | Número de solicitudes TCP recibidas.<br>_Se muestra como solicitud_ |
| **bind9.nsstat_ReqTSIG** <br>(gauge) | Número de solicitudes con TSIG recibidas.<br>_Se muestra como solicitud_ |
| **bind9.nsstat_Requestv4** <br>(gauge) | Número de solicitudes IPv4 recibidas (también cuenta las solicitudes que no son de consulta).<br>_Se muestra como solicitud_ |
| **bind9.nsstat_Requestv6** <br>(gauge) | Número de solicitudes IPv6 recibidas (también cuenta las solicitudes que no son de consulta).<br>_Se muestra como solicitud_ |
| **bind9.nsstat_RespEDNS0** <br>(gauge) | Número de respuestas con EDNS(0) enviadas.<br>_Se muestra como respuesta_ |
| **bind9.nsstat_Response** <br>(gauge) | Número de respuestas enviadas.<br>_Se muestra como respuesta_ |
| **bind9.nsstat_RespSIG0** <br>(gauge) | Número de respuestas con SIG(0) enviadas.<br>_Se muestra como respuesta_ |
| **bind9.nsstat_RespTSIG** <br>(gauge) | Número de respuestas con TSIG enviadas.<br>_Se muestra como respuesta_ |
| **bind9.nsstat_RPZRewrites** <br>(gauge) | Número de reescrituras de zonas de la política de respuesta.|
| **bind9.nsstat_SitBadSize** <br>(gauge) | |
| **bind9.nsstat_SitBadTime** <br>(gauge) | |
| **bind9.nsstat_SitMatch** <br>(gauge) | |
| **bind9.nsstat_SitNew** <br>(gauge) | |
| **bind9.nsstat_SitNoMatch** <br>(gauge) | |
| **bind9.nsstat_SitOpt** <br>(gauge) | |
| **bind9.nsstat_TruncatedResp** <br>(gauge) | Número de respuestas truncadas enviadas.<br>_Se muestra como respuesta_ |
| **bind9.nsstat_UpdateBadPrereq** <br>(gauge) | Actualizaciones dinámicas rechazadas por fallos en los requisitos previos.|
| **bind9.nsstat_UpdateDone** <br>(gauge) | Actualizaciones dinámicas completadas.|
| **bind9.nsstat_UpdateFail** <br>(gauge) | Actualizaciones dinámicas fallidas.|
| **bind9.nsstat_UpdateFwdFail** <br>(gauge) | Reenvío de actualización dinámica fallido.|
| **bind9.nsstat_UpdateRej** <br>(gauge) | Número de solicitudes de actualización dinámica rechazadas.<br>_Se muestra como solicitud_ |
| **bind9.nsstat_UpdateReqFwd** <br>(gauge) | Número de solicitudes de actualización enviadas.<br>_Se muestra como solicitud_ |
| **bind9.nsstat_UpdateRespFwd** <br>(gauge) | Número de respuestas de actualización reenviadas.<br>_Se muestra como respuesta_ |
| **bind9.nsstat_XfrRej** <br>(gauge) | Número de solicitudes de transferencia de zona rechazadas.<br>_Se muestra como solicitud_ |
| **bind9.nsstat_XfrReqDone** <br>(gauge) | Número de transferencias de zona solicitadas completadas.|
| **bind9.opcode_IQUERY** <br>(gauge) | Número de consultas entrantes.<br>_Se muestra como consulta_ |
| **bind9.opcode_NOTIFY** <br>(gauge) | |
| **bind9.opcode_QUERY** <br>(gauge) | Número de consultas salientes.<br>_Se muestra como consulta_ |
| **bind9.opcode_RESERVED10** <br>(gauge) | |
| **bind9.opcode_RESERVED11** <br>(gauge) | |
| **bind9.opcode_RESERVED12** <br>(gauge) | |
| **bind9.opcode_RESERVED13** <br>(gauge) | |
| **bind9.opcode_RESERVED14** <br>(gauge) | |
| **bind9.opcode_RESERVED15** <br>(gauge) | |
| **bind9.opcode_RESERVED3** <br>(gauge) | |
| **bind9.opcode_RESERVED6** <br>(gauge) | |
| **bind9.opcode_RESERVED7** <br>(gauge) | |
| **bind9.opcode_RESERVED8** <br>(gauge) | |
| **bind9.opcode_RESERVED9** <br>(gauge) | |
| **bind9.opcode_STATUS** <br>(gauge) | |
| **bind9.opcode_UPDATE** <br>(gauge) | |
| **bind9.sockstat_FdwatchBindFail** <br>(gauge) | Número de fallos de sockets FDWatch de enlace.|
| **bind9.sockstat_FDWatchClose** <br>(gauge) | Número de sockets FDWatch cerrados.|
| **bind9.sockstat_FDwatchConn** <br>(gauge) | Número de conexiones FDWatch establecidas con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_FDwatchConnFail** <br>(gauge) | Número de fallos de los sockets de conexión FDWatch.|
| **bind9.sockstat_FDwatchRecvErr** <br>(gauge) | Número de errores en las operaciones de recepción de sockets FDWatch.|
| **bind9.sockstat_FDwatchSendErr** <br>(gauge) | Número de errores en las operaciones de envío de sockets FDWatch.|
| **bind9.sockstat_RawActive** <br>(gauge) | Número de sockets activos sin procesar.<br>_Se muestra como conexión_ |
| **bind9.sockstat_RawClose** <br>(gauge) | Número de sockets cerrados.<br>_Se muestra como conexión_ |
| **bind9.sockstat_RawOpen** <br>(gauge) | Sockets sin procesar abiertos con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_RawOpenFail** <br>(gauge) | Número de sockets sin procesar con fallos durante la apertura.<br>_Se muestra como conexión_ |
| **bind9.sockstat_RawRecvErr** <br>(gauge) | Número de errores en operaciones de recepción de sockets sin procesar.|
| **bind9.sockstat_TCP4Accept** <br>(gauge) | Número de conexiones TCP4 entrantes aceptadas con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP4AcceptFail** <br>(gauge) | Número de fallos de aceptación de solicitudes de conexiones TCP4 entrantes.|
| **bind9.sockstat_TCP4Active** <br>(gauge) | Número de sockets TCP4 activos.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP4BindFail** <br>(gauge) | Número de fallos de sockets de enlace TCP4.|
| **bind9.sockstat_TCP4Close** <br>(gauge) | Número de sockets TCP4 cerrados.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP4Conn** <br>(gauge) | Número de conexiones TCP4 establecidas con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP4ConnFail** <br>(gauge) | Número de fallos de sockets de conexión TCP4.|
| **bind9.sockstat_TCP4Open** <br>(gauge) | Número de sockets TCP4 abiertos con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP4OpenFail** <br>(gauge) | Número de sockets TCP4 con fallos durante la apertura.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP4RecvErr** <br>(gauge) | Número de errores en operaciones de recepción de sockets TCP4.|
| **bind9.sockstat_TCP4SendErr** <br>(gauge) | Número de errores en operaciones de envío de sockets TCP4.|
| **bind9.sockstat_TCP6Accept** <br>(gauge) | Número de conexiones TCP4 entrantes aceptadas con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP6AcceptFail** <br>(gauge) | Número de fallos de aceptación de solicitudes de conexión TCP6 entrantes.|
| **bind9.sockstat_TCP6Active** <br>(gauge) | Número de sockets TCP6 activos.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP6BindFail** <br>(gauge) | Número de fallos de sockets de enlace TCP6.|
| **bind9.sockstat_TCP6Close** <br>(gauge) | Número de sockets TCP6 cerrados.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP6Conn** <br>(gauge) | Número de conexiones TCP6 establecidas con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP6ConnFail** <br>(gauge) | Número de fallos de conexión de sockets TCP6.|
| **bind9.sockstat_TCP6Open** <br>(gauge) | Número de sockets TCP6 abiertos con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP6OpenFail** <br>(gauge) | Número de sockets TCP6 con fallos durante la apertura.<br>_Se muestra como conexión_ |
| **bind9.sockstat_TCP6RecvErr** <br>(gauge) | Número de errores en operaciones de recepción de sockets TCP6.|
| **bind9.sockstat_TCP6SendErr** <br>(gauge) | Número de errores en operaciones de envío de sockets TCP6.|
| **bind9.sockstat_UDP4Active** <br>(gauge) | Número de sockets UDP4 activos.<br>_Se muestra como conexión_ |
| **bind9.sockstat_UDP4BindFail** <br>(gauge) | Número de fallos de sockets de enlace UDP4.|
| **bind9.sockstat_UDP4Close** <br>(gauge) | Número de sockets UDP4 cerrados.<br>_Se muestra como conexión_ |
| **bind9.sockstat_UDP4Conn** <br>(gauge) | Número de conexiones UDP4 establecidas con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_UDP4ConnFail** <br>(gauge) | Número de fallos de sockets de conexión UDP4.|
| **bind9.sockstat_UDP4Open** <br>(gauge) | Número de sockets UDP4 abiertos con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_UDP4OpenFail** <br>(gauge) | Número de sockets UDP4 con fallos durante la apertura.<br>_Se muestra como conexión_ |
| **bind9.sockstat_UDP4RecvErr** <br>(gauge) | Número de errores en operaciones de recepción de sockets UDP4.|
| **bind9.sockstat_UDP4SendErr** <br>(gauge) | Número de errores en operaciones de envío de sockets UDP4.|
| **bind9.sockstat_UDP6Active** <br>(gauge) | Número de sockets UDP6 activos.<br>_Se muestra como conexión_ |
| **bind9.sockstat_UDP6BindFail** <br>(gauge) | Número de fallos de sockets de enlace UDP6.|
| **bind9.sockstat_UDP6Close** <br>(gauge) | Número de sockets UDP6 cerrados.<br>_Se muestra como conexión_ |
| **bind9.sockstat_UDP6Conn** <br>(gauge) | Número de conexiones UDP6 establecidas con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_UDP6ConnFail** <br>(gauge) | Número de fallos de sockets de enlace UDP6.|
| **bind9.sockstat_UDP6Open** <br>(gauge) | Número de sockets UDP6 abiertos con éxito.<br>_Se muestra como conexión_ |
| **bind9.sockstat_UDP6OpenFail** <br>(gauge) | Número de sockets UDP6 con fallos durante la apertura.<br>_Se muestra como conexión_ |
| **bind9.sockstat_UDP6RecvErr** <br>(gauge) | Número de errores en operaciones de recepción de sockets UDP6.|
| **bind9.sockstat_UDP6SendErr** <br>(gauge) | Número de errores en operaciones de envío de sockets UDP6.|
| **bind9.sockstat_UnixAccept** <br>(gauge) | Número de conexiones Unix entrantes aceptadas con éxito.|
| **bind9.sockstat_UnixAcceptFail** <br>(gauge) | Número de fallos de aceptación de solicitudes de conexión Unix entrantes.|
| **bind9.sockstat_UnixActive** <br>(gauge) | Número de sockets Unix activos.<br>_Se muestra como conexión_ |
| **bind9.sockstat_UnixBindFail** <br>(gauge) | Número de fallos de sockets de enlace Unix.|
| **bind9.sockstat_UnixClose** <br>(gauge) | Número de sockets Unix cerrados.|
| **bind9.sockstat_UnixConn** <br>(gauge) | Número de conexiones Unix establecidas con éxito.|
| **bind9.sockstat_UnixConnFail** <br>(gauge) | Número de fallos de sockets de enlace Unix.|
| **bind9.sockstat_UnixOpen** <br>(gauge) | Número de sockets Unix abiertos con éxito.|
| **bind9.sockstat_UnixOpenFail** <br>(gauge) | Número de sockets Unix con fallos durante la apertura.|
| **bind9.sockstat_UnixRecvErr** <br>(gauge) | Número de errores en operaciones de recepción de sockets Unix.|
| **bind9.sockstat_UnixSendErr** <br>(gauge) | Número de errores en operaciones de envío de sockets Unix.|
| **bind9.zonestat_AXFRReqv4** <br>(gauge) | IPv4 AXFR solicitado.|
| **bind9.zonestat_AXFRReqv6** <br>(gauge) | IPv6 AXFR solicitado.|
| **bind9.zonestat_IXFRReqv4** <br>(gauge) | IPv4 IXFR solicitado.|
| **bind9.zonestat_IXFRReqv6** <br>(gauge) | IPv6 IXFR solicitado.|
| **bind9.zonestat_NotifyInv4** <br>(gauge) | Notificaciones IPv4 recibidas.|
| **bind9.zonestat_NotifyInv6** <br>(gauge) | Notificaciones IPv6 recibidas.|
| **bind9.zonestat_NotifyOutv4** <br>(gauge) | Notificaciones IPv4 enviadas.|
| **bind9.zonestat_NotifyOutv6** <br>(gauge) | Notificaciones IPv6 enviadas.|
| **bind9.zonestat_NotifyRej** <br>(gauge) | Notificaciones entrantes rechazadas.|
| **bind9.zonestat_SOAOutv4** <br>(gauge) | Número de consultas SOA IPv4 enviadas.<br>_Se muestra como consulta_ |
| **bind9.zonestat_SOAOutv6** <br>(gauge) | Número de consultas SOA IPv4 enviadas.<br>_Se muestra como consulta_ |
| **bind9.zonestat_XfrFail** <br>(gauge) | Número de solicitudes de transferencia de zona fallidas.<br>_Se muestra como solicitud_ |
| **bind9.zonestat_XfrSuccess** <br>(gauge) | Número de solicitudes de transferencia de zona aceptadas.<br>_Se muestra como solicitud_ |

### Eventos

El check de Bind 9 no incluye eventos.

### Checks de servicio

**bind9.can_connect**

Devuelve `OK` Si la URL del canal de estadísticas de DNS está presente en la instancia. Devuelve `CRITICAL` si se producen errores de URL.

_Estados: ok, crítico_

## Solucionar problemas

Si ves un error de **Permission denied** (Permiso denegado) durante la monitorización de los archivos de log, debes dar al usuario el permiso de lectura `dd-agent` sobre ellos.

```shell
sudo chown -R dd-agent:dd-agent /var/log/named/
```

Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).