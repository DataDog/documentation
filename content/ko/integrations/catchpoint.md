---
app_id: catchpoint
app_uuid: e80ef287-1a1a-4b73-94e7-3c1d6fe66eaf
assets:
  dashboards:
    catchpoint: assets/dashboards/Catchpoint_dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: true
    metrics:
      check:
      - catchpoint.success.rate
      metadata_path: metadata.csv
      prefix: catchpoint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 132
    source_type_name: Catchpoint
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- issue tracking
- network
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: catchpoint
integration_id: catchpoint
integration_title: Catchpoint
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: catchpoint
public_title: Catchpoint
short_description: Datadog 이벤트 스트림에 Catchpoint 알림을 발송하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Issue Tracking
  - Category::Network
  configuration: README.md#Setup
  description: Datadog 이벤트 스트림에 Catchpoint 알림을 발송하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Catchpoint
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Catchpoint는 디지털 성능 분석 플랫폼으로, 전체 디지털 에코시스템에 대해 완전하고 실행 가능한 인사이트와 가시성을 선사합니다.

Catchpoint 통합을 통해 다음 작업을 실행할 수 있습니다.

-   이벤트 스트림에서 종합적인 알림 설정
-   Catchpoint 포털에서 분석 차트로 바로 연결되는 링크 액세스
-   알림 유형 태그 설정으로 더욱 효과적인 이벤트 필터링

## 설정

### 설치

설치할 필요가 없습니다.

### 설정

이벤트 스트림으로 Catchpoint 알림을 보내려면, Catchpoint 포털레 로그인한 다음 _설정_>_API_로 이동합니다.

1. 알림 API에서 활성화를 선택합니다.

   {{< img src="integrations/catchpoint/catchpoint_configuration.png" alt="Catchpoint 이벤트" popup="true">}}

2. Datadog 엔드포인트 URL을 입력합니다.

    ```text
    https://app.datadoghq.com/api/v1/events?api_key=<YOUR_DATADOG_API_KEY>
    ```

   기존 Datadog API 키를 선택하거나 [통합 타일의 **설정** 탭][1]에서 API 키를 생성합니다.

3. 상태를 활성으로 설정합니다.
4. 형식에 대한 템플릿을 선택합니다.
5. 새로운 템플릿을 추가합니다.
6. 템플릿 이름(예: `DataDog`)을 입력하고 형식을 JSON으로 설정합니다.
7. 다음 JSON 템플릿을 사용하여 저장합니다.

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

Catchpoint는 Datadog의 [이벤트 탐색기][2]에 직접 알림을 전송합니다.

{{< img src="integrations/catchpoint/catchpoint_event.png" alt="catchpoint 이벤트" popup="true">}}

### 메트릭 수집

Datadog에서 Catchpoint 메트릭을 수신하려면 Catchpoint 포털에서 Test Data Webhook을 생성합니다.

1. Test Data Webhook에서 API 키와 함께 Datadog API 엔드포인트를 추가합니다
2. "템플릿"을 선택합니다.
3. 드롭다운 메뉴에서 "새 항목 추가"를 클릭합니다.
4. 이름을 입력합니다.
5. 형식에서 "JSON"을 선택합니다.
6. 다음 JSON 템플릿에 붙여넣기한 다음 "저장"을 클릭합니다.

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

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "catchpoint" >}}


### 이벤트

Catchpoint 이벤트가 [Catchpoint 대시보드][4]의 이벤트 스트림 위젯에 표시됩니다.

### 서비스 검사

Catchpoint 통합에는 서비스 검사가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://app.datadoghq.com/integrations/catchpoint
[2]: https://docs.datadoghq.com/ko/service_management/events/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/catchpoint/catchpoint_metadata.csv
[4]: https://app.datadoghq.com/dash/integration/32054/catchpoint-dashboard
[5]: https://docs.datadoghq.com/ko/help/