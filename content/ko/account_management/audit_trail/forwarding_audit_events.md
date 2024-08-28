---
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: 설명서
  text: Audit Trail에 대해 자세히 알아보기
title: 감사 이벤트를 커스텀 대상으로 전달
---

<div class="alert alert-warning">감사 이벤트 전달은 베타 버전입니다.</div>

## 개요

감사 이벤트 전달을 사용하면 감사 이벤트를 Datadog에서 Splunk, Elasticsearch, HTTP 엔드포인트와 같은 커스텀 대상으로 보낼 수 있습니다. 감사 이벤트는 JSON 형식으로 전달됩니다. 각 Datadog 그룹에 최대 3개의 대상을 추가할 수 있습니다.

{{< img src="/account_management/audit_logs/audit_events_forwarding.png" alt="활성 Login-Event-to-SIEM 대상을 보여주는 커스텀 대상 섹션, 최근 24시간 @action:login을 쿼리 필터를 지정했을 때 감사 이벤트 볼륨 추정 사용치 10.4 MB를 나타냄." >}}

**참고**: `audit_trail_write` 권한이 있는 Datadog 사용자만 감사 이벤트 전달을 위해 커스텀 대상을 생성, 편집, 또는 삭제할 수 있습니다.

## 커스텀 대상으로 감사 이벤트 전달 설정

1. 필요한 경우 [IP 범위 목록][1]에서 허용 목록에 웹훅 IP를 추가합니다.
2. [Audit Trail Settings][2]로 이동합니다.
3. **Audit Event Forwarding** 섹션에서 **Add Destination**을 클릭합니다.
4. 전달을 위해 감사 이벤트를 필터링할 쿼리를 입력합니다. 예를 들어 로그인 이벤트를 보안 정보와 이벤트 관리(SIEM) 또는 커스텀 대상에만 전달하려는 경우 필터링할 쿼리로 `@action:login`를 추가합니다. 자세한 내용은 [구문 검색][3]을 참고하세요.
5. **Destination Type**을 선택합니다.

{{< tabs >}}
{{% tab "HTTP" %}}

6. 대상 이름을 입력합니다.
7. **Define endpoint** 필드에 로그를 보낼 엔드포인트를 입력합니다. 엔드포인트는 반드시 `https://`로 시작해야 합니다.
    - 예를 들어 Sumo Logic에 로그를 보내려면 [로그 및 메트릭용 HTTP 소스 설정 문서][1]에 따라 해당 수집기에 데이터를 보낼 HTTP 소스 주소 URL을 가져옵니다. **Define endpoint** 필드에 HTTP 소스 주소 URL을 입력합니다.
8. **Configure Authentication** 섹션에서 다음 인증 유형 중 하나를 선택하고 관련 세부 정보를 제공합니다.
    - 기본 인증: 로그를 보낼 계정의 사용자 이름과 비밀번호를 입력합니다.
    - 헤더 요청: 헤더 이름과 값을 제공합니다. 예를 들어 인증 헤더와 로그를 보낼 계정의 사용자 이름은 `myaccount`이고 비밀번호는 `mypassword`입니다.
        - **Header Name**에 `Authorization`을 입력합니다.
        - 헤더 값은 `Basic username:password` 형식입니다. 여기서 `username:password`는 base64로 인코딩됩니다. 이 예에서 헤더 값은 `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=`입니다.
  9. **Save**를 클릭합니다.

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

6. 대상 이름을 입력합니다.
7. **ConfigureDestination** 섹션에서 로그를 보낼 엔드포인트를 입력합니다. 엔드포인트는 `https://`에서 시작해야 합니다. 예를 들어`https://<your_account>.splunkcloud.com:8088`를 입력할 수 있습니다. **참조**: `/services/collector/event`는 자동으로 엔드포인트에 추가됩니다.
8. **Configure Authentication** 섹션에서 Splunk HEC 토큰을 입력합니다. Splunk HEC 토큰에 대한 자세한 내용은 [HTTP 이벤트 수집기 설정 및 사용][1]을 참고하세요.
9. **Save**를 클릭합니다.

**참고**: [인덱서 승인][2]을 비활성화해야 합니다.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
{{% /tab %}}

{{% tab "Elasticsearch" %}}

6. 대상 이름을 입력합니다.
7. **ConfigureDestination** 섹션에 다음 세부 정보를 입력합니다.

   a. 로그를 보낼 엔드포인트입니다. 엔드포인트는 `https://` 로 시작해야 합니다. 예를 들어 Elasticsearch의 엔드포인트는 `https://<your_account>.us-central1.gcp.cloud.es.io`입니다.

   b. 로그를 보낼 대상 인덱스의 이름입니다.

   c. 또는 새 인덱스를 만들 인덱스 회전 값을 선택합니다. `No Rotation`, `Every Hour`, `Every Day`, `Every Week`, 또는 `Every Month` 중에 선택합니다. 기본값은 `No Rotation`입니다.

8. **Configure Authentication** 섹션에서 Elastic 검색 계정의 사용자 이름과 비밀번호를 입력합니다.
9. **Save**를 클릭합니다.

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/audit-trail-settings
[3]: /ko/logs/explorer/search_syntax/