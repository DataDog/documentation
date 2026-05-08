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
    source_type_name: Zscaler(커뮤니티 버전)
  logs:
    source: zscaler
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
custom_kind: integration
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
short_description: Zscaler 통합은 클라우드 보안 로그를 제공합니다
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - "\b카테고리::클라우드"
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Zscaler 통합은 클라우드 보안 로그를 제공합니다
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Zscaler
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Zscaler Internet Access][1](ZIA)는 클라우드에서 서비스 형태로 제공되는 안전한 인터넷 및 웹 게이트웨이입니다. ZIA 로그는 [Cloud NSS][2]를 사용하여 HTTPS를 통해 Datadog으로 전송됩니다. Datadog은 ZIA 원격 측정 데이터를 수집하여 보안 규칙을 적용하거나 대시보드에서 데이터를 시각화할 수 있도록 지원합니다.

## 필수 조건

Zscaler Cloud NSS 구독이 필요합니다.

## 설정

### ZIA 웹 로그

1. ZIA 콘솔에서 **Administration** > **Nanolog Streaming Service**로 이동합니다.
2. **Cloud NSS Feeds** 탭을 선택하고 **Add Cloud NSS Feed**를 클릭합니다.
3. 대화 상자에서 다음 값을 입력하거나 선택합니다.
   * Feed Name: `<YOUR_FEED_NAME>`
   * NSS Type: `NSS for Web`
   * SIEM Type: `Other`
   * Batch Size: `16`
   * API URL: `{{< region-param key="http_endpoint" code="true" >}}/v1/input?ddsource=zscaler`
   * HTTP headers:
      * Key: `Content-Type`; Value: `application/json`
      * Key: `DD-API-KEY`; Value: `<YOUR_DATADOG_API_KEY>`
4. **Formatting** 섹션에서 다음 값을 입력하거나 선택합니다.
   * Log Type: `Web log`
   * Output Type: `JSON`
   * Feed Escape Character: `\",`
   * Feed Output Format:
      ```
      \{ "sourcetype" : "zscalernss-web", "event" : \{"datetime":"%d{yy}-%02d{mth}-%02d{dd} %02d{hh}:%02d{mm}:%02d{ss}","reason":"%s{reason}","event_id":"%d{recordid}","protocol":"%s{proto}","action":"%s{action}","transactionsize":"%d{totalsize}","responsesize":"%d{respsize}","requestsize":"%d{reqsize}","urlcategory":"%s{urlcat}","serverip":"%s{sip}","clienttranstime":"%d{ctime}","requestmethod":"%s{reqmethod}","refererURL":"%s{ereferer}","useragent":"%s{eua}","product":"NSS","location":"%s{elocation}","ClientIP":"%s{cip}","status":"%s{respcode}","user":"%s{elogin}","url":"%s{eurl}","vendor":"Zscaler","hostname":"%s{ehost}","clientpublicIP":"%s{cintip}","threatcategory":"%s{malwarecat}","threatname":"%s{threatname}","filetype":"%s{filetype}","appname":"%s{appname}","pagerisk":"%d{riskscore}","department":"%s{edepartment}","urlsupercategory":"%s{urlsupercat}","appclass":"%s{appclass}","dlpengine":"%s{dlpeng}","urlclass":"%s{urlclass}","threatclass":"%s{malwareclass}","dlpdictionaries":"%s{dlpdict}","fileclass":"%s{fileclass}","bwthrottle":"%s{bwthrottle}","servertranstime":"%d{stime}","contenttype":"%s{contenttype}","unscannabletype":"%s{unscannabletype}","deviceowner":"%s{deviceowner}","devicehostname":"%s{devicehostname}"\}\}
      ```
5. **Save**을 클릭합니다.
6. 변경 사항을 **적용**합니다.

### ZIA 방화벽 로그

1. ZIA 콘솔에서 **Administration** > **Nanolog Streaming Service**로 이동합니다.
2. **Cloud NSS Feeds** 탭을 선택하고 **Add Cloud NSS Feed**를 클릭합니다.
3. 대화 상자에서 다음 값을 입력하거나 선택합니다.
   * Feed Name: `<YOUR_FEED_NAME>`
   * NSS Type: `NSS for Firewall`
   * SIEM Type: `Other`
   * Batch Size: `16`
   * API URL: `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * HTTP headers:
      * Key: `Content-Type`; Value: `application/json`
      * Key: `DD-API-KEY`; Value: `<YOUR_DATADOG_API_KEY>`
4. **Formatting** 섹션에서 다음 값을 입력하거나 선택합니다.
   * Log Type: `Firewall logs`
   * Firewall Log Type: Full Session Logs
   * Feed Output Type: `JSON`
   * Feed Escape Character: `\",`
   * Feed Output Format:
      ```
      \{ "sourcetype" : "zscalernss-fw", "event" :\{"datetime":"%s{time}","user":"%s{elogin}","department":"%s{edepartment}","locationname":"%s{elocation}","cdport":"%d{cdport}","csport":"%d{csport}","sdport":"%d{sdport}","ssport":"%d{ssport}","csip":"%s{csip}","cdip":"%s{cdip}","ssip":"%s{ssip}","sdip":"%s{sdip}","tsip":"%s{tsip}","tunsport":"%d{tsport}","tuntype":"%s{ttype}","action":"%s{action}","dnat":"%s{dnat}","stateful":"%s{stateful}","aggregate":"%s{aggregate}","nwsvc":"%s{nwsvc}","nwapp":"%s{nwapp}","proto":"%s{ipproto}","ipcat":"%s{ipcat}","destcountry":"%s{destcountry}","avgduration":"%d{avgduration}","rulelabel":"%s{erulelabel}","inbytes":"%ld{inbytes}","outbytes":"%ld{outbytes}","duration":"%d{duration}","durationms":"%d{durationms}","numsessions":"%d{numsessions}","ipsrulelabel":"%s{ipsrulelabel}","threatcat":"%s{threatcat}","threatname":"%s{ethreatname}","deviceowner":"%s{deviceowner}","devicehostname":"%s{devicehostname}"\}\}
      ```
5. **Save**을 클릭합니다.
6. 변경 사항을 **적용**합니다.

### ZIA DNS 로그

1. ZIA 콘솔에서 **Administration** > **Nanolog Streaming Service**로 이동합니다.
2. **Cloud NSS Feeds** 탭을 선택하고 **Add Cloud NSS Feed**를 클릭합니다.
3. 대화 상자에서 다음 값을 입력하거나 선택합니다.
   * Feed Name: `<YOUR_FEED_NAME>`
   * NSS Type: `NSS for DNS`
   * SIEM Type: `Other`
   * Batch Size: `16`
   * API URL: `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * HTTP headers:
      * Key: `Content-Type`; Value: `application/json`
      * Key: `DD-API-KEY`; Value: `<YOUR_DATADOG_API_KEY>`
4. **Formatting** 섹션에서 다음 값을 입력하거나 선택합니다.
   * Log Type: `DNS logs`
   * Feed Output Type: `JSON`
   * Feed Escape Character: `\",`
   * Feed output format:
      ```
      \{ "sourcetype" : "zscalernss-dns", "event" :\{"datetime":"%s{time}","user":"%s{login}","department":"%s{dept}","location":"%s{location}","reqaction":"%s{reqaction}","resaction":"%s{resaction}","reqrulelabel":"%s{reqrulelabel}","resrulelabel":"%s{resrulelabel}","dns_reqtype":"%s{reqtype}","dns_req":"%s{req}","dns_resp":"%s{res}","srv_dport":"%d{sport}","durationms":"%d{durationms}","clt_sip":"%s{cip}","srv_dip":"%s{sip}","category":"%s{domcat}","odeviceowner":"%s{odeviceowner}","odevicehostname":"%s{odevicehostname}"\}\}
      ```
5. **Save**을 클릭합니다.
6. 변경 사항을 **적용**합니다.

### ZIA 터널 로그

1. ZIA 콘솔에서 **Administration** > **Nanolog Streaming Service**로 이동합니다.
2. **Cloud NSS Feeds** 탭을 선택하고 **Add Cloud NSS Feed**를 클릭합니다.
3. 대화 상자에서 다음 값을 입력하거나 선택합니다.
   * Feed Name: `<YOUR_FEED_NAME>`
   * NSS Type: `NSS for Web`
   * SIEM Type: `Other`
   * Batch Size: `16`
   * API URL: `https://http-intake.logs.datadoghq.com/v1/input?ddsource=zscaler`
   * HTTP headers:
      * Key: `Content-Type`; Value: `application/json`
      * Key: `DD-API-KEY`; Value: `<YOUR_DATADOG_API_KEY>`
4. **Formatting** 섹션에서 다음 값을 입력하거나 선택합니다.
   * Log Type: `Tunnel`
   * Feed Output Type: `JSON`
   * Feed Escape Character: `\",`
   * Feed Output Format:
      ```
      \{ "sourcetype" : "zscalernss-tunnel", "event" : \{"datetime":"%s{datetime}","Recordtype":"%s{tunnelactionname}","tunneltype":"IPSEC IKEV %d{ikeversion}","user":"%s{vpncredentialname}","location":"%s{locationname}","sourceip":"%s{sourceip}","destinationip":"%s{destvip}","sourceport":"%d{srcport}","destinationport":"%d{dstport}","lifetime":"%d{lifetime}","ikeversion":"%d{ikeversion}","spi_in":"%lu{spi_in}","spi_out":"%lu{spi_out}","algo":"%s{algo}","authentication":"%s{authentication}","authtype":"%s{authtype}","recordid":"%d{recordid}"\}\}
      ```
5. **Save**을 클릭합니다.
6. 변경 사항을 **적용**합니다.

### 검증

[Agent 상태 하위 명령을 실행][3]하고 Checks 섹션에서 `zscaler`를 찾습니다.

## 수집한 데이터

### 메트릭

Zscaler는 메트릭을 포함하지 않습니다.

### 서비스 점검

Zscaler는 서비스 점검을 포함하지 않습니다.

### 이벤트

Zscaler는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://www.zscaler.com/products/zscaler-internet-access
[2]: https://help.zscaler.com/zia/about-nanolog-streaming-service
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/help/