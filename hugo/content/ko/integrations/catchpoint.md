---
app_id: catchpoint
categories:
- metrics
- issue tracking
- network
- event management
custom_kind: 통합
description: Datadog 이벤트 스트림에 Catchpoint 알림을 전송하세요.
integration_version: 1.0.0
media: []
title: Catchpoint
---
## 개요

Catchpoint는 디지털 성능 분석 플랫폼으로, 전체 디지털 에코시스템에 대해 완전하고 실행 가능한 인사이트와 가시성을 선사합니다.

Catchpoint 통합을 통해 다음 작업을 실행할 수 있습니다.

- 이벤트 스트림에서 종합적인 알림 설정
- Catchpoint 포털에서 분석 차트로 바로 연결되는 링크 액세스
- 알림 유형 태그 설정으로 더욱 효과적인 이벤트 필터링

## 설정

### 설치

설치가 필요하지 않습니다.

### 설정

이벤트 스트림으로 Catchpoint 알림을 보내려면, Catchpoint 포털레 로그인한 다음 _설정_>_API_로 이동합니다.

1. 알림 API에서 활성화를 선택합니다.

   ![Catchpoint 이벤트](images/configuration.png)

1. Datadog 엔드포인트 URL을 입력합니다.

   ```text
   {{< region-param key=dd_api code="true" >}}/api/v1/events?api_key=<YOUR_DATADOG_API_KEY>
   ```

   기존 Datadog API 키를 선택하거나 [통합 타일의 **Configure** 탭](https://app.datadoghq.com/integrations/catchpoint)에서 API 키를 생성할 수 있습니다.

1. 상태를 활성으로 설정합니다.

1. 형식에 대한 템플릿을 선택합니다.

1. 새로운 템플릿을 추가합니다.

1. `DataDog`와 같은 템플릿 이름을 입력하고 Format을 JSON으로 설정합니다.

1. 다음 JSON 템플릿을 사용하여 저장합니다.

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

Catchpoint는 알림을 직접 Datadog의 [Events Explorer](https://docs.datadoghq.com/service_management/events/)로 전송합니다.

![Catchpoint 이벤트](images/screenshot.png)

### 메트릭 수집

Datadog에서 Catchpoint 메트릭을 수신하려면 Catchpoint 포털에서 Test Data Webhook을 생성합니다.

1. Test Data Webhook에서 Datadog API 엔드포인트와 API 키를 함께 추가합니다.

   ```text
   {{< region-param key=dd_api code="true" >}}/api/v2/series?api_key=<YOUR_DATADOG_API_KEY>
   ```

   기존 Datadog API 키를 선택하거나 [통합 타일의 **Configure** 탭](https://app.datadoghq.com/integrations/catchpoint)에서 API 키를 생성할 수 있습니다.

1. "템플릿"을 선택합니다.

1. 드롭다운 메뉴에서 "새 항목 추가"를 클릭합니다.

1. 이름을 입력합니다.

1. 형식에서 "JSON"을 선택합니다.

1. 다음 JSON 템플릿에 붙여넣기한 다음 "저장"을 클릭합니다.

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

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **catchpoint.network.timing.tcp_connect_time** <br>(gauge) | 서버로의 TCP 연결을 설정하는 데 소요된 시간.<br>_millisecond로 표시_ |
| **catchpoint.network.timing.dns_resolution_time** <br>(gauge) | IP 주소로 도메인 이름을 변환하는 데 소요된 시간.<br>_millisecond로 표시_ |
| **catchpoint.network.timing.send_time** <br>(gauge) | 요청이 서버로 전송되는 데 걸린 시간.<br>_millisecond로 표시_ |
| **catchpoint.network.timing.ssl_time** <br>(gauge) | 서버와 SSL 핸드셰이크를 완료하는 데 걸린 시간.<br>_millisecond로 표시_ |
| **catchpoint.network.timing.wait_time** <br>(gauge) | 요청이 서버로 전송된 시점부터 첫 번째 응답 패킷을 수신할 때까지 걸린 시간(일부 도구에서는 “First Byte”라고도 함).<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.client_time** <br>(gauge) | 테스트(또는 단계) 시작부터 Document Complete 시점까지 요청 트래픽이 없었던 총 시간.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.content_load_time** <br>(gauge) | 기본 URL 서버와의 연결이 설정된 이후 웹페이지의 전체 콘텐츠를 로드하는 데 걸린 시간.  Send(ms) 종료 시점부터 페이지의 마지막 요소(또는 객체)가 로드될 때까지의 시간을 의미합니다. Content Load에는 DNS, Connect, SSL 및 Send 시간은 포함되지 않습니다. Object 모니터 테스트의 경우, 이 값은 Load(ms)와 동일합니다.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.document_complete_time** <br>(gauge) | 초기 URL 요청이 전송된 시점부터 브라우저에서 “onload” 이벤트가 트리거될 때까지 걸린 시간. 이 이벤트가 발생하기 전에 인라인 요청이나 “document.write”를 통해 삽입된 요청은 모두 로드가 완료되어야 합니다. Document Complete에는 이후 JavaScript 및/또는 DOM 조작으로 생성되는 동적 요청은 포함되지 않습니다. <br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.dom_content_load_time** <br>(gauge) | DOM Content Load Time<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.dom_interactive_time** <br>(gauge) | 페이지가 처음으로 상호작용 가능해진 시점을 나타내는 시간. TTI는 웹페이지가 시각적으로 렌더링되고 사용자 입력에 안정적으로 응답할 수 있게 되는 시점을 의미합니다. <br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.dom_load_time** <br>(gauge) | 웹페이지의 Document Object Model(DOM)을 로드하는 데 걸린 시간.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.first_party_zone_impact** <br>(gauge) | First Party Zone으로 인한 지연 시간으로, 단위는 밀리초.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.third_party_zone_impact** <br>(gauge) | Third Party Zone으로 인해 발생한 지연 시간으로, 단위는 밀리초.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.load_time** <br>(gauge) | 응답 데이터의 첫 번째 패킷부터 마지막 패킷까지 수신하는 데 걸린 시간(일부 도구에서는 이 메트릭을 “Receive” 또는 “Receiving”이라고도 함).<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.total_root_request_redirect_time** <br>(gauge) | 루트 요청의 전체 리디렉션 소요 시간으로 단위는 밀리초.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.render_start_time** <br>(gauge) | 탐색 시작부터 최종 리디렉션 완료 시점까지 소요된 시간.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.total_root_request_time** <br>(gauge) | 총 루트 요청 시간<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.time_to_title** <br>(gauge) | title 태그를 파싱하는 데 소요된 시간.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.webpage_response_time** <br>(gauge) | 모든 페이지 구성 요소를 포함하여 전체 웹페이지를 로드하는 데 걸린 시간.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.wire_time** <br>(gauge) | 테스트(또는 단계) 시작부터 Document Complete까지 네트워크 상에 하나 이상의 요청이 전송되고 있던 전체 시간.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.total_test_time** <br>(gauge) | 모든 테스트 유형에 적용되는 단일 통합 메트릭으로, 테스트 실행의 전체 지속 시간을 나타냅니다. Test Time은 Response, Test Response(Transaction 및 Web 테스트), Ping RTT(Trace Route 테스트)와 동일하며, Apdex 계산에 사용됩니다. Test Time은 Request, Host 또는 Zone 차트에서는 제공되지 않습니다.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.above_the_fold_time** <br>(gauge) | 웹페이지에서 화면 상단(Above the Fold) 콘텐츠를 로드하는 데 걸린 시간.<br>_millisecond로 표시_ |
| **catchpoint.frontend.timing.authentication_time** <br>(gauge) | SMTP 서버를 사용해 인증하는 데 소요된 시간.<br>_millisecond로 표시_ |
| **catchpoint.frontend.score.page_speed_score** <br>(count) | 웹페이지가 다양한 성능 최적화 기법을 얼마나 잘 활용하고 있는지를 나타내는 Google의 PageSpeed 점수.|
| **catchpoint.frontend.score.speed_index_score** <br>(count) | 페이지가 화면 상단(Above the Fold)의 초기 사용자 가시 콘텐츠를 얼마나 빠르게 렌더링했는지를 나타내는 계산된 메트릭. Speed Index 값이 낮을수록 가시 콘텐츠가 더 빠르게 렌더링되었음을 의미합니다.|
| **catchpoint.frontend.counter.total_number_of_connections** <br>(count) | 테스트 수행 중 설정된 TCP 연결의 총 개수|
| **catchpoint.frontend.counter.total_number_of_failed_requests** <br>(count) | 실패한 요청의 총 개수|
| **catchpoint.frontend.counter.total_number_of_filmstrip_images** <br>(count) | Filmstrip 이미지 총 개수|
| **catchpoint.frontend.counter.total_number_of_hosts** <br>(count) | 호스트 총 개수<br>_host로 표시_ |
| **catchpoint.frontend.counter.total_number_of_js_errors** <br>(count) | JS 오류 총 개수|
| **catchpoint.frontend.counter.total_number_of_redirect** <br>(count) | 리디렉션 총 개수|
| **catchpoint.frontend.counter.total_number_of_requests** <br>(count) | 요청 총 개수<br>_request로 표시_ |
| **catchpoint.frontend.bytes.total_downloaded_bytes** <br>(count) | 총 다운로드된 바이트<br>_byte로 표시_ |
| **catchpoint.frontend.bytes.root_request_response_content_bytes** <br>(count) | 루트 요청 응답 콘텐츠 바이트<br>_byte로 표시_ |
| **catchpoint.frontend.bytes.root_request_response_header_bytes** <br>(count) | 루트 요청 응답 헤더 바이트<br>_byte로 표시_ |
| **catchpoint.frontend.bytes.total_self_zone_bytes** <br>(count) | Self-Zone에서 전송된 총 바이트<br>_byte로 표시_ |
| **catchpoint.frontend.bytes.total_response_content_bytes** <br>(count) | 총 응답 콘텐츠 바이트<br>_byte로 표시_ |
| **catchpoint.frontend.bytes.total_response_header_bytes** <br>(count) | 총 응답 헤더 바이트<br>_byte로 표시_ |
| **catchpoint.ftp.bytes.total_download_bytes** <br>(count) | 테스트별 총 FTP 다운로드 바이트<br>_byte로 표시_ |
| **catchpoint.ftp.bytes.total_get_bytes** <br>(count) | 테스트에서 발생한 FTP 및 GET 요청의 총 바이트.<br>_byte로 표시_ |
| **catchpoint.ftp.bytes.uploaded_bytes** <br>(count) | 테스트 수행 중 FTP를 통해 업로드된 총 바이트.<br>_byte로 표시_ |
| **catchpoint.ftp.timing.delete_time** <br>(gauge) | FTP 서버에서 지정된 파일을 삭제하는 데 걸린 시간.<br>_millisecond로 표시_ |
| **catchpoint.ftp.timing.download_time** <br>(gauge) | FTP 서버에서 전체 파일을 다운로드하는 데 걸린 시간.<br>_millisecond로 표시_ |
| **catchpoint.ftp.timing.get_time** <br>(gauge) | FTP 서버에 연결하고 파일 크기를 조회하는 데 걸린 시간.<br>_millisecond로 표시_ |
| **catchpoint.ftp.timing.upload_time** <br>(gauge) | FTP 서버로 지정된 파일을 업로드하는 데 걸린 시간.<br>_millisecond로 표시_ |
| **catchpoint.imap.timing.message_fetch_time** <br>(gauge) | IMAP 서버에서 메시지를 가져오는 데 걸린 시간.<br>_millisecond로 표시_ |
| **catchpoint.imap.timing.message_list_time** <br>(gauge) | 폴더를 목록화하는 데 소요된 시간.<br>_millisecond로 표시_ |
| **catchpoint.imap.timing.logout_time** <br>(gauge) | IMAP 서버에서 로그아웃하는 데 소요된 시간.<br>_millisecond로 표시_ |
| **catchpoint.imap.timing.message_search_time** <br>(gauge) | 메시지 검색에 소요된 시간.<br>_millisecond로 표시_ |
| **catchpoint.ntp.timing.ntp** <br>(gauge) | NTP 총 시간.<br>_millisecond로 표시_ |
| **catchpoint.ntp.timing.root_delay_time** <br>(gauge) | 로컬 시스템 시계와 루트 클록(root clock) 간의 추정 지연 시간.<br>_millisecond로 표시_ |
| **catchpoint.ntp.timing.root_dispersion_time** <br>(gauge) | 상위 클록(upstream clock)과 마지막으로 동기화된 이후 로컬 시스템 클록에서 발생한 추정 오차.<br>_millisecond로 표시_ |
| **catchpoint.ntp.timing.round_trip_delay_time** <br>(gauge) | 노드와 NTP 서버 간에 NTP 요청 패킷과 응답 패킷이 왕복 이동하는 데 걸린 전체 시간.<br>_millisecond로 표시_ |
| **catchpoint.ping.percentage.ping_packet_loss** <br>(gauge) | 전송된 ping 패킷 중 응답을 받지 못한 패킷의 비율. 계산식: (#수신된 패킷 / #전송된 패킷) × 100<br>_percent로 표시_ |
| **catchpoint.ping.timing.ping_round_trip_time** <br>(gauge) | ping 패킷을 전송한 시점부터 응답을 수신할 때까지의 평균 시간.<br>_millisecond로 표시_ |
| **catchpoint.error.boolean.error** <br>(count) | 모든 실패 오류 수(하위 요청 실패 포함).<br>_error로 표시_ |
| **catchpoint.success.rate** <br>(count) | 테스트 실패 오류 개수<br>_error로 표시_ |

### 이벤트

Catchpoint에서 발생한 이벤트는 [Catchpoint 대시보드](https://app.datadoghq.com/dash/integration/32054/catchpoint-dashboard)의 Event Stream 위젯에 표시됩니다.

### 서비스 점검

Catchpoint 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.