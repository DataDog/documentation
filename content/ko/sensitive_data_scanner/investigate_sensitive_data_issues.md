---
further_reading:
- link: /sensitive_data_scanner/
  tag: 설명서
  text: 민감한 데이터 스캐너 설정
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: 블로그
  text: 민감 데이터 스캐너를 사용하여 규모에 따라 민감한 데이터 문제를 식별, 분류 및 해결하세요.
kind: documentation
title: 민감한 데이터 문제 조사
---

## 개요

민감한 데이터 스캐너는 스트림-기반, 패턴 일치 서비스를 사용하여 민감한 데이터를 식별, 태깅, 선택적으로 수정하거나 해싱합니다. 민감한 데이터 문제가 발견되면 다음과 같은 질문을 생길 수 있습니다.

- 어떤 민감한 데이터가 노출되었나요?
- 민감한 데이터 노출의 우선 순위는 무엇인가요?
- 확산 및 볼륨 측면에서 문제가 얼마나 심각한가요?
- 민감한 데이터의 출처는 어디인가요?

민감한 데이터 스캐너의 [요약][1] 페이지에서는 민감한 데이터 문제를 분류하고 우선순위를 지정하여 조사, 협업, 문서화하여 결과에 대한 답을 찾을 수 있도록 도와줍니다.

{{<img src="sensitive_data_scanner/sds_summary_12_01_24.png" alt="The Sensitive Data Scanner summary page showing the number of sensitive data issues, the number of scanning rules enabled, and a list of issues" style="width:80%;">}}

## 민감한 데이터 문제 분류

[요약][1] 페이지를 사용하여 선택한 기간 내의 모든 민감한 데이터 문제를 확인하고 문제 조사를 시작하세요.

**민감한 데이터 이슈** 섹션에서 우선 순위 수준으로 필터링하여 **이슈 개요** 섹션에서 해당 우선 순위 수준의 이슈만 볼 수 있습니다. **사례** 섹션에서 사례 상태를 기준으로 필터링하여 **이슈 개요** 섹션에서 해당 상태의 사례와 관련된 이슈를 볼 수 있습니다.

문제를 조사하려면,

1. **이슈 개요**에서 해당 이슈를 클릭합니다.
2. 이슈 패널에서 **최근 변경 사항 보기**를 클릭하여 [감사 추적][4]으로 이동하고 민감한 데이터 문제를 일으킨 최근 설정 변경 사항이 있는지 확인합니다.
3. **모든 로그 보기**를 클릭하여 쿼리와 일치하는 모든 로그를 로그 탐색기에서 봅니다.
**애플리케이션 성능 모니터링(APM) 스팬(span) 보기**를 클릭하여 트레이스 탐색기에서 쿼리와 일치하는 모든 트레이스를 봅니다.
**모든 RUM 보기 이벤트**를 클릭하면 RUM 탐색기에서 쿼리와 일치하는 모든 RUM 이벤트를 볼 수 있습니다.  
**모든 이벤트 보기**를 클릭하여 이벤트 탐색기에서 쿼리와 일치하는 모든 이벤트를 확인합니다.
{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/issues_panel_02_01_2024.png" alt="중요한 비자 카드 스캐너 문제를 보여주는 문제 패널" style="width:50%;">}}
4. **Blast 반경** 섹션에서,
    a. 이 민감한 데이터 문제로 인해 영향을 받은 상위 10개 서비스, 호스트, 환경을 확인하세요.  
    b. **서비스 카탈로그**에서 서비스에 대한 자세한 정보를 보려면 서비스를 클릭합니다.  
    c. 인프라스트럭처 목록 페이지에서 호스트에 대한 자세한 정보를 보려면 호스트를 클릭합니다.
{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="영향을 받은 상위 10개  서비스를 보여주는 이슈 패널" style="width:50%;">}}
민감한 데이터 문제를 감지하는 데 사용된 검색 규칙을 수정하려면 패널 상단의 **규칙 수정**을 클릭합니다.

또한 다음과 같이 할 수도 있습니다:
- [케이스 관리][2]를 사용하여 문제를 추적, 분류 및 조사하려면 패널 상단의 **케이스 만들기**를 클릭합니다. 관련 사례가 요약 페이지에 표시됩니다.
- [인시던트 관리][3]를 사용하여 인시던트를 신고하려면 기존 인시던트에 이슈를 추가하거나 새 인시던트를 신고할 수 있습니다. 기존 인시던트에 이슈를 추가하려면 **인시던트 신고** 드롭다운 메뉴를 클릭합니다. 새 인시던트를 신고하려면 **인시던트 신고**를 클릭합니다.
- [감사 추적][4]을 사용하여 Datadog의 **이 이벤트에 액세스한 사용자** 섹션에서 이 민감한 데이터에 액세스할 수 있는 대상을 확인하세요. 

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="보안 문제, 사례의 양수인 및 작성자, 이벤트의 타임라인에 대한 정보를 보여주는 사례 페이지" style="width:60%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[2]: /ko/service_management/case_management/
[3]: /ko/service_management/incident_management/
[4]: /ko/account_management/audit_trail