---
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: 설명서
  text: Audit Trail에 대해 자세히 알아보기
title: 감사 이벤트를 커스텀 대상으로 전송
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
US1-FED 사이트에서는 감사 이벤트 전송을 이용할 수 없습니다.
</div>
{{% /site-region %}}

{{% site-region region="US,US3,US5,EU,AP1" %}}
<div class="alert alert-danger">Audit Event Forwarding은 베타 서비스 중입니다. </div>
{{% /site-region %}}

## 개요

Audit Event Forwarding을 이용하면 감사 이벤트를 Datadog에서 Splunk, Elasticsearch, HTTP 엔드포인트와 같은 커스텀 대상으로 전송할 수 있습니다. 감사 이벤트는 JSON 형식으로 전송됩니다. 각 Datdog 조직당 최대 3개 대상까지 추가할 수 있습니다.

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="진행 중인 Login-Event-to-SIEM 대상을 보여주는 Custom Destinations 섹션. 지난 24시간 예상 감사 볼륨은 10.4 MB이고, @action:login 쿼리를 사용해 필터링함." >}}

**Note**: `audit_trail_write` 권한이 있는 사용자만 감사 이벤트 전송용 커스텀 대상을 생성, 편집, 또는 삭제할 수 있습니다.

## 커스텀 대상에 감사 이벤트 전송 설정

1. 필요할 경우 [IP 범위 목록][1]에서 웹훅 IP를 허용 목록에 추가하세요.
2. [Audit Trail Settings][2]으로 이동합니다.
3. **Audit Event Forwarding** 섹션에서 **Add Destination**을 클릭합니다.
4. 쿼리를 입력하고 전송하고 싶은 감사 이벤트를 필터링합니다. 예를 들어, SIEM 또는 커스텀 대상으로 로그인 이벤트만 전송하고 싶을 경우 필터링 쿼리로 `@action:login`을 입력합니다. 자세한 정보는 [구문 검색][3]을 참고하세요.
5. **목적지 유형**을 선택합니다.

{{< tabs >}}
{{% tab "HTTP" %}}

6. 대상의 이름을 입력합니다.
7. **엔드포인트 정의** 필드에 로그를 전송할 엔드포인트를 입력합니다. 엔드포인트는 `https://`로 시작해야 합니다.
    - 예를 들어, 로그를 Sumo Logic에 보내려면 [로그 및 메트릭용 HTTP 소스 설정 문서][1]에 따라 컬렉터(Collector)로 데이터를 전송하기 위한 HTTP 소스 주소 URL을 불러옵니다. 그런 다음 **엔드포인트 정의** 필드에 HTTP 소스 주소 URL을 입력합니다.
8. **인증 설정** 섹션에서 다음 인증 유형 중 하나를 선택하고 관련 세부 정보를 입력합니다.
    - 기본 인증: 로그를 전송할 계정의 사용자 이름과 비밀번호를 입력합니다.
    - 요청 헤더: 헤더 이름과 값을 입력합니다. 예를 들어 다음은 인증 헤더를 사용하고 로그를 전송하려는 계정의 사용자 아이디가 `myaccount`, 비밀번호가 `mypassword`인 경우입니다. 
        - **Header Name**에 `Authorization`을 입력합니다.
        - 헤더 값은 `Basic username:password` 형식이며, 여기서 `username:password`은 base64로 인코딩됩니다. 해당 예시의 경우 헤더 값은 `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=`입니다. 
  9. **저장**을 클릭합니다.

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. 대상의 이름을 입력합니다.
7. **Configure Destination** 섹션에는 로그를 전송하고 싶은 엔드포인트를 입력합니다. 엔드포인트는 `https://`로 시작해야 합니다(예: `https://<your_account>.splunkcloud.com:8088`). **참고**: 엔드포인트에 `/services/collector/event`가 자동으로 추가됩니다.
8. **Configure Authentication** 섹션에 Splunk HEC 토큰을 입력하세요. Splunk HEC 토큰에 관한 자세한 내용은 [HTTP Event Collector 설정][1]을 참고하세요.
9. **저장**을 클릭합니다.

**참고**: [인덱서 승인][2]은 비활성화해야 합니다.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. 대상의 이름을 입력합니다.
7. **Configure Destination** 섹션에서 다음 내용을 입력합니다.

   a. 로그를 전송하려는 엔드포인트. `https://`로 시작해야 합니다(Elasticsearch의 엔드포인트 예시: `https://<your_account>.us-central1.gcp.cloud.es.io`).

   b. 로그를 전송하고자 하는 대상 인덱스 이름

   c. (선택) 새 인덱스를 생성할 인덱스 회전 주기를 선택하세요. `No Rotation`, `Every Hour`, `Every Day`, `Every Week`, 또는 `Every Month` 중에서 선택할 수 있습니다. 기본값은 `No Rotation`입니다.

8. **인증 설정** 섹션에서 Elasticsearch 계정의 사용자 이름과 비밀번호를 입력합니다.
9. **저장**을 클릭합니다.

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /ko/logs/explorer/search_syntax/