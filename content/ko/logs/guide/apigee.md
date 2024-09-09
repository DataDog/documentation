---
aliases:
- /ko/logs/log_collection/apigee
- /ko/integrations/apigee
description: Apigee 프록시 로그를 수집하여 오류, 요청 응답 시간, 기간, 레이턴시를 추적하고 성능과 프록시 문제를 한 곳에 모아
  모니터링합니다.
further_reading:
- link: logs/
  tag: 설명서
  text: 로그 관리
integration_id: apigee
name: apigee
short_description: Apigee 로그 수집
title: Apigee
---

## 개요

Apigee 프록시 로그를 수집하여 오류, 응답 시간, 기간, 레이턴시, 모니터링 성능, 프록시 문제를 추적합니다.

## 설정

### 로그 수집

{{% site-region region="us,eu" %}}
Apigee 로그를 수집하는 두 가지 방법입니다.

1. Apigee [자바스크립트(Javascript) 정책][1]을 사용하여 로그를 Datadog으로 전송합니다.
2. syslog 서버가 있는 경우 Apigee [MessageLogging 정책][2] 유형을 활용하여 syslog 계정으로 로깅합니다.

#### Syslog 파라미터

MessageLogging 정책 유형을 사용하여 API의 syslog 파라미터로 syslog에 커스텀 메시지를 로깅합니다. 다음 예제에서 `<site_intake_endpoint>`를  {{< region-param key="web_integrations_endpoint" code="true" >}} 로, `<site_port>`를 {{< region-param key="web_integrations_port" code="true" >}}로 변경합니다.

```json
<MessageLogging name="LogToSyslog">
    <DisplayName>datadog-logging</DisplayName>
    <Syslog>
        <Message><YOUR API KEY> test</Message>
        <Host><site_intake_endpoint></Host>
        <Port><site_port></Port>
        <Protocol>TCP</Protocol>
    </Syslog>
</MessageLogging>
```

[1]: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
[2]: https://docs.apigee.com/api-platform/reference/policies/message-logging-policy#samples

{{% /site-region %}}
#### 자바스크립트(Javascript) 정책

Apigee의 [자바스크립트(Javascript) 정책][1]을 사용하여 Apigee 프록시 로그를 Datadog으로 전송합니다.

자바스크립트(Javascript)는 필수 플로우 변수를  Datadog의 로그 속성으로 캡처하도록 설정되어 있습니다. 해당 속성은 [표준 속성 목록][2]에 따라 명명됩니다.

1. Datadog으로 로그를 전송하려는 Apigee 프록시를 선택합니다.
2. 선택한 프록시 개요 페이지에서 오른쪽 상단에 있는 **개발** 탭을 클릭합니다.

{{< img src="static/images/logs/guide/apigee/apigee_develop.png" alt="개발" style="width:75%;">}}

3. **네비게이터**에서 신규 자바스크립트(Javascript) 정책 을 추가하고 **리소스 --> jsc** 드롭다운 메뉴에서 생성한 자바스크립트(Javascript) 파일을 편집합니다.
4. 다음 자바스크립트(Javascript) 코드 스니펫을 추가합니다. `dd_api_url` 변수의 `<DATADOG_API_KEY>`를 고객님의 [Datadog API KEY][3]로 변경합니다.

```
// 여기에서 Datadog API URL을 설정합니다.
var dd_api_url = "https://http-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=apigee";

// 디버그(Debug)
// print(dd_api_url);
// print('Name of the flow: ' + context.flow);

// 클라이언트, 타겟, 총 응답 시간을 산출합니다.
var request_start_time = context.getVariable('client.received.start.timestamp');
var request_end_time = context.getVariable('client.received.end.timestamp');
var system_timestamp = context.getVariable('system.timestamp');
var target_start_time = context.getVariable('target.sent.start.timestamp');
var target_end_time = context.getVariable('target.received.end.timestamp');
var total_request_time = system_timestamp - request_start_time;
var total_target_time = target_end_time - target_start_time;
var total_client_time = total_request_time - total_target_time;

var timestamp = crypto.dateFormat('YYYY-MM-dd HH:mm:ss.SSS');
var organization = context.getVariable("organization.name");
var networkClientIP = context.getVariable("client.ip");
var httpPort = context.getVariable("client.port");
var environment = context.getVariable("environment.name");
var apiProduct = context.getVariable("apiproduct.name");
var apigeeProxyName = context.getVariable("apiproxy.name");
var apigeeProxyRevision = context.getVariable("apiproxy.revision");
var appName = context.getVariable("developer.app.name");
var httpMethod = context.getVariable("request.verb");
var httpUrl = '' + context.getVariable("client.scheme") + '://' + context.getVariable("request.header.host") + context.getVariable("request.uri");
var httpStatusCode = context.getVariable("message.status.code");
var statusResponse = context.getVariable("message.reason.phrase");
var clientLatency = total_client_time;
var targetLatency = total_target_time;
var totalLatency = total_request_time;
var userAgent = context.getVariable('request.header.User-Agent');
var messageContent = context.getVariable('message.content');


// Datadog 로그 속성
var logObject = {
    "timestamp": timestamp,
    "organization": organization,
    "network.client.ip": networkClientIP,
    "env": environment,
    "apiProduct": apiProduct,
    "apigee_proxy.name": apigeeProxyName,
    "apigee_proxy.revision": apigeeProxyRevision,
    "service": appName,
    "http.method": httpMethod,
    "http.url": httpUrl,
    "http.status_code": httpStatusCode,
    "http.port": httpPort,
    "status": statusResponse,
    "clientLatency": clientLatency,
    "targetLatency": targetLatency,
    "totalLatency": totalLatency,
    "http.client.start_time_ms": request_start_time,
    "http.client.end_time_ms": request_end_time,
    "http.useragent": userAgent,
    "message": messageContent,
};


var headers = {
    'Content-Type': 'application/json'
};


// 디버그(Debug)
// print('LOGGING OBJECT' + JSON.stringify(logObject));

var myLoggingRequest = new Request(dd_api_url, "POST", headers, JSON.stringify(logObject));

// Datadog으로 로그 전송
httpClient.send(myLoggingRequest);
```

**참고**: 공식 [Apigee 플로우 변수 참조][4]에서 자바스크립트(Javascript)에 플로우 변수를 더 추가하세요.

## 문제 해결

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
[2]: /ko/logs/log_configuration/attributes_naming_convention/#standard-attributes
[4]: https://docs.apigee.com/api-platform/reference/variables-reference
[5]: /ko/help/
[3]: https://app.datadoghq.com/organization-settings/api-keys