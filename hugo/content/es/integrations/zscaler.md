---
app_id: z-scaler
app_uuid: 102476f5-1e00-452f-b841-9e32bb66d4bc
assets:
  dashboards:
    Zscaler Overview: assets/dashboards/zscaler_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: zscaler.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10261
    source_type_name: Zscaler (versión de la comunidad)
  logs:
    source: zscaler
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zscaler/README.md
display_on_public_website: true
draft: false
git_integration_title: zscaler
integration_id: z-scaler
integration_title: Zscaler
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: zscaler
public_title: Zscaler
short_description: La integración Zscaler proporciona logs de seguridad en la nube
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: La integración Zscaler proporciona logs de seguridad en la nube
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Zscaler
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

[Zscaler Internet Access][1] (ZIA) es una puerta de enlace de Internet y web segura que se entrega como servicio desde la nube. Los logs de ZIA se envían a Datadog a través de HTTPS utilizando [Cloud NSS][2]. Datadog ingiere la telemetría de ZIA, lo que te permite aplicar reglas de seguridad o visualizar tus datos en dashboards.

## Requisitos

Se requiere una suscripción a Zscaler Cloud NSS.

## Configuración

### Logs web de ZIA

1. Desde la consola de ZIA, ve a **Administration** > **Nanolog Streaming Service** (Administración > Servicio de streaming Nanolog).
2. Selecciona la pestaña **Feeds Cloud NSS**. A continuación, haz clic en **Add Cloud NSS Feed** (Añadir feed Cloud NSS).
3. En el cuadro de diálogo, introduce o selecciona los siguientes valores:
   * Nombre del feed: `<YOUR_FEED_NAME>`
   * Tipo NSS: `NSS for Web`
   * Tipo SIEM: `Other`
   * Tamaño del lote: `16`
   * URL de la API: `{{< region-param key="http_endpoint" code="true" >}}/v1/input?ddsource=zscaler`
   * Cabeceras HTTP:
      * Clave: `Content-Type`; Valor: `application/json`
      * Clave: `DD-API-KEY`; Valor: `<YOUR_DATADOG_API_KEY>`
4. En la sección **Formatting** (Formato), introduce o selecciona los siguientes valores:
   * Tipo de log: `Web log`
   * Tipo de salida: `JSON`
   * Caracter de escape del feed: `\",`
   * Formato de salida del feed:
      ```
      \{ "sourcetype" : "zscalernss-web", "event" : \{"datetime":"%d{yy}-%02d{mth}-%02d{dd} %02d{hh}:%02d{mm}:%02d{ss}","reason":"%s{reason}","event_id":"%d{recordid}","protocol":"%s{proto}","action":"%s{action}","transactionsize":"%d{totalsize}","responsesize":"%d{respsize}","requestsize":"%d{reqsize}","urlcategory":"%s{urlcat}","serverip":"%s{sip}","clienttranstime":"%d{ctime}","requestmethod":"%s{reqmethod}","refererURL":"%s{ereferer}","useragent":"%s{eua}","product":"NSS","location":"%s{elocation}","ClientIP":"%s{cip}","status":"%s{respcode}","user":"%s{elogin}","url":"%s{eurl}","vendor":"Zscaler","hostname":"%s{ehost}","clientpublicIP":"%s{cintip}","threatcategory":"%s{malwarecat}","threatname":"%s{threatname}","filetype":"%s{filetype}","appname":"%s{appname}","pagerisk":"%d{riskscore}","department":"%s{edepartment}","urlsupercategory":"%s{urlsupercat}","appclass":"%s{appclass}","dlpengine":"%s{dlpeng}","urlclass":"%s{urlclass}","threatclass":"%s{malwareclass}","dlpdictionaries":"%s{dlpdict}","fileclass":"%s{fileclass}","bwthrottle":"%s{bwthrottle}","servertranstime":"%d{stime}","contenttype":"%s{contenttype}","unscannabletype":"%s{unscannabletype}","deviceowner":"%s{deviceowner}","devicehostname":"%s{devicehostname}"\}\}
      ```
5. Haz clic en **Guardar**.
6. **Activa** tus cambios.

### Logs de cortafuegos ZIA

1. Desde la consola de ZIA, ve a **Administration** > **Nanolog Streaming Service** (Administración > Servicio de streaming Nanolog).
2. Selecciona la pestaña **Feeds Cloud NSS**. A continuación, haz clic en **Add Cloud NSS Feed** (Añadir feed Cloud NSS).
3. En el cuadro de diálogo, introduce o selecciona los siguientes valores:
   * Nombre del feed: `<YOUR_FEED_NAME>`
   * Tipo NSS: `NSS for Firewall`
   * Tipo SIEM: `Other`
   * Tamaño del lote: `16`
   * URL de la API: `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * Cabeceras HTTP:
      * Clave: `Content-Type`; Valor: `application/json`
      * Clave: `DD-API-KEY`; Valor: `<YOUR_DATADOG_API_KEY>`
4. En la sección **Formatting** (Formato), introduce o selecciona los siguientes valores:
   * Tipo de log: `Firewall logs`
   * Tipo de log de cortafuegos: Logs de sesión completa
   * Tipo de salida del feed: `JSON`
   * Caracter de escape del feed: `\",`
   * Formato de salida del feed:
      ```
      \{ "sourcetype" : "zscalernss-fw", "event" :\{"datetime":"%s{time}","user":"%s{elogin}","department":"%s{edepartment}","locationname":"%s{elocation}","cdport":"%d{cdport}","csport":"%d{csport}","sdport":"%d{sdport}","ssport":"%d{ssport}","csip":"%s{csip}","cdip":"%s{cdip}","ssip":"%s{ssip}","sdip":"%s{sdip}","tsip":"%s{tsip}","tunsport":"%d{tsport}","tuntype":"%s{ttype}","action":"%s{action}","dnat":"%s{dnat}","stateful":"%s{stateful}","aggregate":"%s{aggregate}","nwsvc":"%s{nwsvc}","nwapp":"%s{nwapp}","proto":"%s{ipproto}","ipcat":"%s{ipcat}","destcountry":"%s{destcountry}","avgduration":"%d{avgduration}","rulelabel":"%s{erulelabel}","inbytes":"%ld{inbytes}","outbytes":"%ld{outbytes}","duration":"%d{duration}","durationms":"%d{durationms}","numsessions":"%d{numsessions}","ipsrulelabel":"%s{ipsrulelabel}","threatcat":"%s{threatcat}","threatname":"%s{ethreatname}","deviceowner":"%s{deviceowner}","devicehostname":"%s{devicehostname}"\}\}
      ```
5. Haz clic en **Guardar**.
6. **Activa** tus cambios.

### Logs DNS de ZIA

1. Desde la consola de ZIA, ve a **Administration** > **Nanolog Streaming Service** (Administración > Servicio de streaming Nanolog).
2. Selecciona la pestaña **Feeds Cloud NSS**. A continuación, haz clic en **Add Cloud NSS Feed** (Añadir feed Cloud NSS).
3. En el cuadro de diálogo, introduce o selecciona los siguientes valores:
   * Nombre del feed: `<YOUR_FEED_NAME>`
   * Tipo NSS: `NSS for DNS`
   * Tipo SIEM: `Other`
   * Tamaño del lote: `16`
   * URL de la API: `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * Cabeceras HTTP:
      * Clave: `Content-Type`; Valor: `application/json`
      * Clave: `DD-API-KEY`; Valor: `<YOUR_DATADOG_API_KEY>`
4. En la sección **Formatting** (Formato), introduce o selecciona los siguientes valores:
   * Tipo de log: `DNS logs`
   * Tipo de salida del feed: `JSON`
   * Caracter de escape del feed: `\",`
   * Formato de salida del feed:
      ```
      \{ "sourcetype" : "zscalernss-dns", "event" :\{"datetime":"%s{time}","user":"%s{login}","department":"%s{dept}","location":"%s{location}","reqaction":"%s{reqaction}","resaction":"%s{resaction}","reqrulelabel":"%s{reqrulelabel}","resrulelabel":"%s{resrulelabel}","dns_reqtype":"%s{reqtype}","dns_req":"%s{req}","dns_resp":"%s{res}","srv_dport":"%d{sport}","durationms":"%d{durationms}","clt_sip":"%s{cip}","srv_dip":"%s{sip}","category":"%s{domcat}","odeviceowner":"%s{odeviceowner}","odevicehostname":"%s{odevicehostname}"\}\}
      ```
5. Haz clic en **Guardar**.
6. **Activa** tus cambios.

### Logs Tunnel de ZIA

1. Desde la consola de ZIA, ve a **Administration** > **Nanolog Streaming Service** (Administración > Servicio de streaming Nanolog).
2. Selecciona la pestaña **Feeds Cloud NSS**. A continuación, haz clic en **Add Cloud NSS Feed** (Añadir feed Cloud NSS).
3. En el cuadro de diálogo, introduce o selecciona los siguientes valores:
   * Nombre del feed: `<YOUR_FEED_NAME>`
   * Tipo NSS: `NSS for Web`
   * Tipo SIEM: `Other`
   * Tamaño del lote: `16`
   * URL de la API: `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * Cabeceras HTTP:
      * Clave: `Content-Type`; Valor: `application/json`
      * Clave: `DD-API-KEY`; Valor: `<YOUR_DATADOG_API_KEY>`
4. En la sección **Formatting** (Formato), introduce o selecciona los siguientes valores:
   * Tipo de log: `Tunnel`
   * Tipo de salida del feed: `JSON`
   * Caracter de escape del feed: `\",`
   * Formato de salida del feed:
      ```
      \{ "sourcetype" : "zscalernss-tunnel", "event" : \{"datetime":"%s{datetime}","Recordtype":"%s{tunnelactionname}","tunneltype":"IPSEC IKEV %d{ikeversion}","user":"%s{vpncredentialname}","location":"%s{locationname}","sourceip":"%s{sourceip}","destinationip":"%s{destvip}","sourceport":"%d{srcport}","destinationport":"%d{dstport}","lifetime":"%d{lifetime}","ikeversion":"%d{ikeversion}","spi_in":"%lu{spi_in}","spi_out":"%lu{spi_out}","algo":"%s{algo}","authentication":"%s{authentication}","authtype":"%s{authtype}","recordid":"%d{recordid}"\}\}
      ```
5. Haz clic en **Guardar**.
6. **Activa** tus cambios.

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `zscaler` en la sección **Checks**.

## Datos recopilados

### Métricas

Zscaler no incluye métricas.

### Checks de servicio

Zscaler no incluye checks de servicio.

### Eventos

Zscaler no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://www.zscaler.com/products/zscaler-internet-access
[2]: https://help.zscaler.com/zia/about-nanolog-streaming-service
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/