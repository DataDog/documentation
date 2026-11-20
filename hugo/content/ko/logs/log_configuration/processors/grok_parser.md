---
description: Grok 프로세서를 사용하여 로그 구문 분석
further_reading:
- link: /logs/log_configuration/pipelines
  tag: 설명서
  text: Datadog Pipelines 살펴보기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 구문 분석에 대해 알아보기
- link: https://www.datadoghq.com/blog/detect-http2-abuse-apache-web-server-logs/
  tag: 블로그
  text: Apache 웹 서버 로그에서 HTTP/2 악용 탐지 방법
processor_type: grok-parser
title: Grok 파서
---
## 개요 {#overview}

원시 이벤트의 전체 메시지 또는 특정 속성을 구문 분석할 사용자 지정 grok 규칙을 생성합니다. grok 파서의 구문 분석 규칙은 10개로 제한하는 것이 모범 사례입니다. Grok 구문 및 구문 분석 규칙에 관한 자세한 정보는 [구문 분석][1]을 참조하세요.

{{< img src="/logs/processing/processors/ai-grok-rules.png" alt="Grok 파서 구성" style="width:90%;" >}}

## 사용 사례 {#use-cases}

Grok 파서는 주로 로그 메시지에서 속성을 구문 분석하는 데 사용됩니다. 예를 들어, NGINX 로그의 메시지에는 추출하려는 여러 정보가 포함될 수 있습니다.

Grok 규칙을 생성하면 파서는 IP 주소, 사용자, 요청 타임스탬프, 요청 메서드, URL, 버전, 상태 코드 및 바이트를 기록할 수 있습니다.


## 설정 {#setup}

[{{< ui >}}Pipelines{{< /ui >}} 페이지][2]에서 Grok 프로세서를 정의하세요. Grok 구문 분석 규칙을 구성하려면 다음 단계를 따르세요.

1. {{< ui >}}Add Grok Parser{{< /ui >}}를 클릭하여 새 파서 구성을 엽니다.
1. {{< ui >}}Log Samples{{< /ui >}}: 로그 샘플이 로그 샘플 섹션에 자동으로 표시됩니다. 더 많은 로그 샘플을 추가할 수도 있습니다(총 최대 10개, 각각 최대 5,000자).
   **참고**: 샘플 로그는 파이프라인 필터와 일치하는 로그 패턴 중 볼륨이 가장 높은 5개 패턴에서 가져옵니다.
1. {{< ui >}}Log Samples{{< /ui >}}: 최대 5개의 샘플 로그(각각 최대 5,000자)를 추가해 구문 분석 규칙을 테스트하세요.
1. {{< ui >}}Define parsing rules{{< /ui >}}: {{< ui >}}Auto parsing{{< /ui >}}을 클릭하여 샘플과 일치하는 규칙을 생성합니다.
   {{< site-region region="gov,gov2" >}}
   <div class="alert alert-info">선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 자동 구문 분석을 사용할 수 없습니다({{< region-param key="dd_site_name" >}}).</div>
   {{< /site-region >}}
1. {{< ui >}}Test your rules{{< /ui >}}: 샘플을 클릭하면 구문 분석 규칙에 대한 평가가 실행되고, 결과가 화면 오른쪽에 표시됩니다. 모든 샘플에 상태가 표시되며(`match` 또는 `no match`), 이를 통해 Grok 파서의 구문 분석 규칙 중 하나가 샘플과 일치하는지 확인할 수 있습니다.


## 로그의 구문 분석 전후 상태 {#before-and-after-state-of-logs}

{{% collapse-content title="예: nginx 액세스 로그 구문 분석" level="h3" %}}

**이전(원시 로그):**

```text
192.168.1.1 - john [10/Oct/2023:13:55:36 +0000] "GET /api/users HTTP/1.1" 200 1234
```

**Grok 구문 분석 규칙:**

```text
access.common %{ipOrHost:network.client.ip} %{notSpace:http.ident} %{notSpace:http.auth} \[%{httpdate:date}\] "(?>%{word:http.method} |)%{notSpace:http.url}(?: HTTP/%{number:http.version}|)" %{number:http.status_code} (?>%{number:network.bytes_written}|-)
```

**처리 후:**

```json
{
 "network": {
   "client": {
     "ip": "192.168.1.1"
   },
   "bytes_written": 1234
 },
 "http": {
   "ident": "-",
   "auth": "john",
   "method": "GET",
   "url": "/api/users",
   "version": "1.1",
   "status_code": 200
 },
 "date": 1696945536000
}
```

Grok 파서는 비정형 로그 메시지를 로그 탐색기에서 쿼리, 필터링 및 분석할 수 있는 구조화된 JSON 속성으로 변환합니다.

{{% /collapse-content %}}

## API {#api}

다음 Grok 파서 JSON 페이로드와 함께 [Datadog 로그 파이프라인 API 엔드포인트][3]를 사용하세요.

```json
{
  "type": "grok-parser",
  "name": "Parsing Log message",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<SUPPORT_RULES>", "match_rules": "<MATCH_RULES>"}
}
```

| 매개변수            | 유형             | 필수 | 설명                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | 문자열           | 예      | 프로세서의 유형입니다.                                  |
| `name`               | 문자열           | 아니요       | 프로세서의 이름입니다.                                  |
| `is_enabled`         | 부울          | 아니요       | 프로세서의 활성화 여부입니다. 기본값: `false`.  |
| `source`             | 문자열           | 예      | 구문 분석할 로그 속성의 이름입니다. 기본값: `message`. |
| `samples`            | 문자열 배열 | 아니요       | 이 Grok 파서에 사용할 샘플 로그(최대 5개) 목록입니다.     |
| `grok.support_rules` | 문자열           | 예      | Grok 파서에서 지원되는 규칙 목록입니다.             |
| `grok.match_rules`   | 문자열           | 예      | Grok 파서의 일치 규칙 목록입니다.               |



## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/parsing/?tab=matchers
[2]: https://app.datadoghq.com/logs/pipelines
[3]: /ko/api/v1/logs-pipelines/