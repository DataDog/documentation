---
description: 규정 준수 및 보안 모니터링을 위해 Datadog에서 Splunk, Elasticsearch, HTTP 엔드포인트와 같은 커스텀
  대상으로 감사 이벤트를 전달합니다.
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: 문서
  text: Audit Trail에 대해 자세히 알아보기
title: 감사 이벤트를 커스텀 대상으로 전송
---
## 개요 {#overview}

Audit Event Forwarding을 사용하면 Datadog에서 Splunk, Elasticsearch, HTTP 엔드포인트와 같은 커스텀 대상으로 감사 이벤트를 전송할 수 있습니다. 감사 이벤트는 JSON 형식으로 전달됩니다. Datadog 조직당 최대 3개의 대상을 추가할 수 있습니다.

Audit Trail에는 조직당 매월 최대 5억 개의 감사 이벤트 전달이 포함됩니다. 이 한도를 초과하는 사용량에는 추가 요금이 부과될 수 있습니다.

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="Custom Destinations 섹션에는 지난 24시간 동안의 예상 감사 이벤트 데이터량이 10.4MB이며 필터링 쿼리가 @action:login으로 설정된 활성 Login-Event-to-SIEM 대상이 표시됩니다." >}}

**참고**: `audit_trail_write` 권한이 있는 Datadog 사용자만 감사 이벤트 전달용 커스텀 대상을 생성, 편집 또는 삭제할 수 있습니다.

## 커스텀 대상으로 감사 이벤트 전달 설정 {#set-up-audit-event-forwarding-to-custom-destinations}

1. 필요시 [IP 범위 목록][1]에서 웹훅 IP를 허용 목록에 추가합니다.
2. [Audit Trail Settings][2]로 이동합니다.
3. {{< ui >}}Audit Event Forwarding{{< /ui >}} 섹션에서 {{< ui >}}Add Destination{{< /ui >}}을 클릭합니다.
4. 전달할 감사 이벤트를 필터링하는 쿼리를 입력합니다. 예를 들어 로그인 이벤트만 SIEM 또는 사용자 지정 목적지로 전달하려면 `@action:login`을 필터링 쿼리로 추가합니다. 자세한 내용은 [Search Syntax][3]를 참조하세요.
5. {{< ui >}}Destination Type{{< /ui >}}을 선택합니다.

{{< tabs >}}
{{% tab "HTTP" %}}

6. 목적지 이름을 입력합니다.
7. {{< ui >}}Define endpoint{{< /ui >}} 필드에 로그를 전송할 엔드포인트를 입력합니다. 엔드포인트는 `https://`로 시작해야 합니다.
    - 예를 들어, 로그를 Sumo Logic에 보내려면 [로그 및 메트릭용 HTTP 소스 설정 문서][1]에 따라 컬렉터(Collector)로 데이터를 전송하기 위한 HTTP 소스 주소 URL을 불러옵니다. {{< ui >}}Define endpoint{{< /ui >}} 필드에 HTTP 소스 주소 URL을 입력합니다.
8. {{< ui >}}Configure Authentication{{< /ui >}} 섹션에서 다음 인증 유형 중 하나를 선택하고 관련 세부 정보를 입력합니다.
    - Basic Authentication: 로그를 전송할 계정의 사용자 이름과 비밀번호를 입력합니다.
    - Request Header: 헤더 이름과 값을 입력합니다. 예를 들어, Authorization 헤더를 사용하고 로그를 전송할 계정의 사용자 이름이 `myaccount`이고 비밀번호가 `mypassword`인 경우는 다음과 같습니다.
        - {{< ui >}}Header Name{{< /ui >}}에 `Authorization`을 입력합니다.
        - 헤더 값은 `Basic username:password` 형식이며, 여기서 `username:password`는 base64로 인코딩되어 있습니다. 이 예시에서 헤더 값은 `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=`입니다. 
  9. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. 목적지 이름을 입력합니다.
7. {{< ui >}}Configure Destination{{< /ui >}} 섹션에서 로그를 전송할 엔드포인트를 입력합니다. 엔드포인트는 `https://`로 시작해야 합니다. 예를 들어, `https://<your_account>.splunkcloud.com:8088`을 입력합니다. **참고**: `/services/collector/event`는 자동으로 엔드포인트에 추가됩니다.
8. {{< ui >}}Configure Authentication{{< /ui >}} 섹션에서 Splunk HEC 토큰을 입력합니다. Splunk HEC 토큰에 대한 자세한 내용은 [Splunk HTTP Event Collector 설정 및 사용][1]을 참조하세요.
9. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

**참고**: [인덱서 승인][2]을 비활성화해야 합니다.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. 목적지 이름을 입력합니다.
7. {{< ui >}}Configure Destination{{< /ui >}} 섹션에 다음 세부 정보를 입력합니다.
   1. 로그를 전송할 엔드포인트입니다. 엔드포인트는 `https://`로 시작해야 합니다. Elasticsearch의 예시 엔드포인트: `https://<your_account>.us-central1.gcp.cloud.es.io`
   1. 로그를 전송할 대상 인덱스의 이름입니다.   
   1. 필요시 새 인덱스 생성 주기에 따라 인덱스 로테이션을 `No Rotation`, `Every Hour`, `Every Day`, `Every Week` 또는 `Every Month` 중에서 선택합니다. 기본값은 `No Rotation`입니다.
8. {{< ui >}}Configure Authentication{{< /ui >}} 섹션에서 Elasticsearch 계정의 사용자 이름과 비밀번호를 입력합니다.
9. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{% /tab %}}
{{% tab "Microsoft Sentinel" %}}

<div class="alert alert-info">Microsoft Sentinel로의 로그 포워딩 기능은 미리 보기로 제공되고 있습니다.</div>

6. 목적지 이름을 입력합니다.
7. Microsoft Sentinel Forwarder를 인증하려면 Datadog Azure Integration을 통해 App Registration을 구성해야 합니다.
8. {{< ui >}}Configure Destination{{< /ui >}} 섹션에 다음 세부 정보를 입력합니다.
  | 설정                   | 설명                                                                                                          | 예시                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Logs Ingestion Endpoint{{< /ui >}} | 로그가 전송되는 데이터 수집 엔드포인트(DCE)의 엔드포인트를 입력합니다. 이는 DCE 개요 페이지에서 'Logs Ingestion'으로 표시됩니다. | `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com`   |
| {{< ui >}}Immutable ID{{< /ui >}}           | 로그 라우팅 경로가 정의된 데이터 수집 규칙(DCR)의 변경 불가능한 ID를 지정합니다. 이 ID는 DCR 개요 페이지에서 'Immutable Id'로 표시됩니다.  **참고**: DCR IAM 설정에서 Monitoring Metrics Publisher 역할이 할당되었는지 확인합니다. | `dcr-000a00a000a00000a000000aa000a0aa`                     |
| {{< ui >}}Stream Declaration Name{{< /ui >}}| DCR의 리소스 JSON에서 `streamDeclarations` 아래에 있는 대상 스트림 선언의 이름을 입력합니다. | `Custom-MyTable`                                          |

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /ko/logs/explorer/search_syntax/