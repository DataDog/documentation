---
assets:
  dashboards:
    Zscaler Overview: assets/dashboards/zscaler_overview.json
  logs:
    source: zscaler
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- ''
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zscaler/README.md
description: TODO
display_name: Zscaler
doc_link: https://docs.datadoghq.com/integrations/zscaler/
draft: false
git_integration_title: zscaler
guid: 595d2046-a122-4355-bfde-f4b42ece4a41
has_logo: true
integration_id: z-scaler
integration_title: Zscaler
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: zscaler.
metric_to_check: ''
name: zscaler
public_title: Intégration Datadog/Zscaler
short_description: L'intégration Zscaler fournit des logs de sécurité cloud.
support: contrib
supported_os:
- linux
- mac_os
- windows
version: '1.0'
---



## Présentation

[Zscaler Internet Access][1] (ZIA) est une passerelle Internet et Web sécurisée fournie en tant que service à partir du cloud. Les logs ZIA sont envoyés à Datadog via HTTPS à l'aide de la solution [Cloud NSS][2]. Datadog ingère des données de télémétrie ZIA afin que vous puissiez appliquer des règles de sécurité ou visualiser vos données dans des dashboards.

## Prérequis

Un abonnement à la solution Cloud NSS Zscaler est requis.

## Configuration

### Logs Web ZIA

1. Depuis la console ZIA, accédez à **Administration** > **Nanolog Streaming Service**.
2. Sélectionnez l'onglet **Cloud NSS Feeds**, puis cliquez sur **Add cloud NSS Feed**.
3. Dans la boîte de dialogue qui s'affiche, saisissez ou sélectionnez les valeurs suivantes :
   * Feed Name : `<NOM_FLUX>`
   * NSS Type : `NSS for Web`
   * SIEM Type : `Other`
   * Batch Size : `16`
   * API URL : `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * HTTP headers :
      * Key : `Content-Type` ; Value : `application/json`
      * Key : `DD-API-KEY` ; Value : `<VOTRE_CLÉ_API_DATADOG>`
4. Dans la section **Formatting**, saisissez ou sélectionnez les valeurs suivantes :
   * Log Type : `Web log`
   * Output Type : `JSON`
   * Feed Escape Character : `\",`
   * Feed Output Format :
      ```
      \{ "sourcetype" : "zscalernss-web", "event" : \{"datetime":"%d{yy}-%02d{mth}-%02d{dd} %02d{hh}:%02d{mm}:%02d{ss}","reason":"%s{reason}","event_id":"%d{recordid}","protocol":"%s{proto}","action":"%s{action}","transactionsize":"%d{totalsize}","responsesize":"%d{respsize}","requestsize":"%d{reqsize}","urlcategory":"%s{urlcat}","serverip":"%s{sip}","clienttranstime":"%d{ctime}","requestmethod":"%s{reqmethod}","refererURL":"%s{ereferer}","useragent":"%s{eua}","product":"NSS","location":"%s{elocation}","ClientIP":"%s{cip}","status":"%s{respcode}","user":"%s{elogin}","url":"%s{eurl}","vendor":"Zscaler","hostname":"%s{ehost}","clientpublicIP":"%s{cintip}","threatcategory":"%s{malwarecat}","threatname":"%s{threatname}","filetype":"%s{filetype}","appname":"%s{appname}","pagerisk":"%d{riskscore}","department":"%s{edepartment}","urlsupercategory":"%s{urlsupercat}","appclass":"%s{appclass}","dlpengine":"%s{dlpeng}","urlclass":"%s{urlclass}","threatclass":"%s{malwareclass}","dlpdictionaries":"%s{dlpdict}","fileclass":"%s{fileclass}","bwthrottle":"%s{bwthrottle}","servertranstime":"%d{stime}","contenttype":"%s{contenttype}","unscannabletype":"%s{unscannabletype}","deviceowner":"%s{deviceowner}","devicehostname":"%s{devicehostname}"\}\}
      ```
5. Cliquez sur **Save**.
6. Sélectionnez **Activate** pour appliquer vos modifications.

### Logs de pare-feu ZIA

1. Depuis la console ZIA, accédez à **Administration** > **Nanolog Streaming Service**.
2. Sélectionnez l'onglet **Cloud NSS Feeds**, puis cliquez sur **Add cloud NSS Feed**.
3. Dans la boîte de dialogue qui s'affiche, saisissez ou sélectionnez les valeurs suivantes :
   * Feed Name : `<NOM_FLUX>`
   * NSS Type : `NSS for Firewall`
   * SIEM Type : `Other`
   * Batch Size : `16`
   * API URL : `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * HTTP headers :
      * Key : `Content-Type` ; Value : `application/json`
      * Key : `DD-API-KEY` ; Value : `<VOTRE_CLÉ_API_DATADOG>`
4. Dans la section **Formatting**, saisissez ou sélectionnez les valeurs suivantes :
   * Log Type : `Firewall logs`
   * Firewall Log Type : Full Session Logs
   * Feed Output Type : `JSON`
   * Feed Escape Character : `\",`
   * Feed Output Format :
      ```
      \{ "sourcetype" : "zscalernss-fw", "event" :\{"datetime":"%s{time}","user":"%s{elogin}","department":"%s{edepartment}","locationname":"%s{elocation}","cdport":"%d{cdport}","csport":"%d{csport}","sdport":"%d{sdport}","ssport":"%d{ssport}","csip":"%s{csip}","cdip":"%s{cdip}","ssip":"%s{ssip}","sdip":"%s{sdip}","tsip":"%s{tsip}","tunsport":"%d{tsport}","tuntype":"%s{ttype}","action":"%s{action}","dnat":"%s{dnat}","stateful":"%s{stateful}","aggregate":"%s{aggregate}","nwsvc":"%s{nwsvc}","nwapp":"%s{nwapp}","proto":"%s{ipproto}","ipcat":"%s{ipcat}","destcountry":"%s{destcountry}","avgduration":"%d{avgduration}","rulelabel":"%s{erulelabel}","inbytes":"%ld{inbytes}","outbytes":"%ld{outbytes}","duration":"%d{duration}","durationms":"%d{durationms}","numsessions":"%d{numsessions}","ipsrulelabel":"%s{ipsrulelabel}","threatcat":"%s{threatcat}","threatname":"%s{ethreatname}","deviceowner":"%s{deviceowner}","devicehostname":"%s{devicehostname}"\}\}
      ```
5. Cliquez sur **Save**.
6. Sélectionnez **Activate** pour appliquer vos modifications.

### Logs DNS ZIA

1. Depuis la console ZIA, accédez à **Administration** > **Nanolog Streaming Service**.
2. Sélectionnez l'onglet **Cloud NSS Feeds**, puis cliquez sur **Add cloud NSS Feed**.
3. Dans la boîte de dialogue qui s'affiche, saisissez ou sélectionnez les valeurs suivantes :
   * Feed Name : `<NOM_FLUX>`
   * NSS Type : `NSS for Firewall`
   * SIEM Type : `Other`
   * Batch Size : `16`
   * API URL : `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * HTTP headers :
      * Key : `Content-Type` ; Value : `application/json`
      * Key : `DD-API-KEY` ; Value : `<VOTRE_CLÉ_API_DATADOG>`
4. Dans la section **Formatting**, saisissez ou sélectionnez les valeurs suivantes :
   * Log Type : `DNS logs`
   * Feed Output Type : `JSON`
   * Feed Escape Character : `\",`
   * Feed output format :
      ```
      \{ "sourcetype" : "zscalernss-dns", "event" :\{"datetime":"%s{time}","user":"%s{login}","department":"%s{dept}","location":"%s{location}","reqaction":"%s{reqaction}","resaction":"%s{resaction}","reqrulelabel":"%s{reqrulelabel}","resrulelabel":"%s{resrulelabel}","dns_reqtype":"%s{reqtype}","dns_req":"%s{req}","dns_resp":"%s{res}","srv_dport":"%d{sport}","durationms":"%d{durationms}","clt_sip":"%s{cip}","srv_dip":"%s{sip}","category":"%s{domcat}","odeviceowner":"%s{odeviceowner}","odevicehostname":"%s{odevicehostname}"\}\}
      ```
5. Cliquez sur **Save**.
6. Sélectionnez **Activate** pour appliquer vos modifications.

### Logs de tunnel ZIA

1. Depuis la console ZIA, accédez à **Administration** > **Nanolog Streaming Service**.
2. Sélectionnez l'onglet **Cloud NSS Feeds**, puis cliquez sur **Add cloud NSS Feed**.
3. Dans la boîte de dialogue qui s'affiche, saisissez ou sélectionnez les valeurs suivantes :
   * Feed Name : `<NOM_FLUX>`
   * NSS Type : `NSS for Web`
   * SIEM Type : `Other`
   * Batch Size : `16`
   * API URL : `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * HTTP headers :
      * Key : `Content-Type` ; Value : `application/json`
      * Key : `DD-API-KEY` ; Value : `<VOTRE_CLÉ_API_DATADOG>`
4. Dans la section **Formatting**, saisissez ou sélectionnez les valeurs suivantes :
   * Log Type : `Tunnel`
   * Feed Output Type : `JSON`
   * Feed Escape Character : `\",`
   * Feed Output Format :
      ```
      \{ "sourcetype" : "zscalernss-tunnel", "event" : \{"datetime":"%s{datetime}","Recordtype":"%s{tunnelactionname}","tunneltype":"IPSEC IKEV %d{ikeversion}","user":"%s{vpncredentialname}","location":"%s{locationname}","sourceip":"%s{sourceip}","destinationip":"%s{destvip}","sourceport":"%d{srcport}","destinationport":"%d{dstport}","lifetime":"%d{lifetime}","ikeversion":"%d{ikeversion}","spi_in":"%lu{spi_in}","spi_out":"%lu{spi_out}","algo":"%s{algo}","authentication":"%s{authentication}","authtype":"%s{authtype}","recordid":"%d{recordid}"\}\}
      ```
5. Cliquez sur **Save**.
6. Sélectionnez **Activate** pour appliquer vos modifications.

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `zscaler` dans la section Checks.

## Données collectées

### Métriques

Zscaler n'inclut aucune métrique.

### Checks de service

Zscaler n'inclut aucun check de service.

### Événements

Zscaler n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://www.zscaler.com/products/zscaler-internet-access
[2]: https://help.zscaler.com/zia/about-nanolog-streaming-service
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/