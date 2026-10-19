---
aliases:
- /ko/sensitive_data_scanner/library_rules/
- /ko/sensitive_data_scanner/scanning_rules/library_rules
description: 로그, APM, RUM 및 클라우드 스토리지 전반에서 이메일 주소, 신용카드 번호, API 키, 자격 증명, IP 주소 및
  기타 민감한 패턴을 탐지하기 위해 Sensitive Data Scanner의 사전 정의된 규칙 라이브러리를 탐색하세요.
further_reading:
- link: /security/sensitive_data_scanner/
  tag: 문서
  text: Sensitive Data Scanner 설정하기
title: Sensitive Data Scanner 라이브러리 규칙
---
## 개요 {#overview}
Scanning Rule Library는 이메일 주소, 신용카드 번호, API 키, 인증 토큰 등과 같은 일반적인 패턴을 탐지하기 위해 미리 정의된 규칙 모음입니다. 라이브러리 규칙을 생성하면 기본적으로 권장 키워드가 사용됩니다.

이러한 규칙은 Datadog에서도 확인할 수 있습니다.

1. [Sensitive Data Scanner][1]로 이동합니다.
1. 페이지 오른쪽 상단에 있는 {{< ui >}}Scanning Rules Library{{< /ui >}}를 클릭합니다.
1. 다음 단계를 따라 라이브러리의 규칙을 스캔 그룹에 추가합니다.<br />
   1. 추가하려는 규칙을 선택합니다.<br />
   1. {{< ui >}}Add Rules to Scanning Group{{< /ui >}}을 클릭합니다.<br />
   1. [Sensitive Data Scanner 설정][2]의 단계에 따라 설정을 완료합니다.

<div class="alert alert-info">대부분의 라이브러리 규칙은 모든 데이터 소스(로그, APM, RUM, Agent Observability, Observability Pipelines, Secret Scanning 및 클라우드 스토리지)에서 사용할 수 있습니다. <b>Available For</b> 열을 검사하여 각 규칙이 지원하는 데이터 소스를 확인하세요.</div>

{{< multifilter-search resource="sds_rules" >}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /ko/security/sensitive_data_scanner/?#add-scanning-rules