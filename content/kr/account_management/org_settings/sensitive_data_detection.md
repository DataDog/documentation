---
aliases:
- /kr/logs/log_configuration/sensitive_data_detection
further_reading:
- link: /data_security/logs/
  tag: 설명서
  text: 보안
- link: /logs/explorer/
  tag: 설명서
  text: 로그 익스플로러
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: 블로그
  text: Datadog의 민감 데이터 스캐너로 최신 데이터 규정 준수 전략 구축
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: 블로그
  text: 민감 데이터 관리 모범 사례
kind: 설명서
title: 민감 데이터 스캐너
---

## 개요

신용 카드 번호, 은행 라우팅 번호 및 API 키와 같은 민감 데이터는 종종 애플리케이션 로그, APM 스팬 및 RUM 이벤트에 의도치 않게 노출되어 조직을 재무 및 프라이버시 위험에 노출시킬 수 있습니다.

종종 비즈니스는 조직 정책, 규정 준수 요구 사항, 산업 규정 및 프라이버시 문제로 인해 로그 내에서 이러한 민감 데이터의 노출을 식별, 수정 및 방지해야 합니다. 이는 특히 은행, 금융 서비스, 의료 및 보험과 같은 산업에서 실제로 이루어지고 있습니다.

## 민감 데이터 스캐너

민감 데이터 스캐너는 민감 데이터를 식별하고, 태그를 지정하고, 선별적으로 교정하거나 해시하는 데 사용할 수 있는 스트림 기반 패턴 일치 서비스입니다. 보안 및 규정 준수 팀은 민감 데이터 스캐너를 새로운 방어선으로 구현하여, 중요 데이터 유출을 방지하고 규정 위반 위험을 경감할 수 있습니다.

민감 데이터 스캐너는 [Organization Settings][1]에서 찾을 수 있습니다.

{{< img src="logs/sensitive_data_scanner/sds_main_apr_22.png" alt="조직 설정 내 민감 데이터 스캐너" style="width:90%;">}}

### 구성

- **스캐닝 그룹 정의:** 스캐닝 그룹은 스캔할 데이터를 결정합니다. 이는 쿼리 필터와 로그, APM, RUM 및/또는 이벤트 스캐닝을 활성화하는 토글 세트로 구성됩니다. 쿼리 필터에 대한 자세한 내용은 [로그 검색 구문][2] 가이드를 참조하세요.
- **스캐닝 규칙 정의:** 스캐닝 규칙은 데이터 내에서 일치시킬 민감 정보를 결정합니다. 스캐닝 그룹 내에서 Datadog의 스캐닝 규칙 라이브러리에서 사전 정의된 스캐닝 규칙을 추가하거나, 커스텀 정규식 패턴을 사용하여 스캔할 규칙을 처음부터 새로 만드세요.

민감 데이터 스캐너는 PCRE(Perl Compatible RegEx)를 지원하지만, 다음 패턴은 지원되지 않습니다.
  - 역참조 및 하위 표현식 캡처(lookaround)
  - 임의의 너비 0 어서션
  - 하위 루틴 참조 및 재귀 패턴
  - 조건부 패턴
  - 역추적 컨트롤 동사
  - \C "single-byte" 지시문(UTF-8 시퀀스 중단)
  - \R 새로운 행 매칭
  - \K 매칭 시작 재설정 지시문
  - 콜아웃 및 내장 코드
  - 원자 그룹화 및 소유 한정사

**참고:**
- 추가하거나 업데이트하는 규칙은 해당 규칙이 정의된 후 Datadog에 입력되는 데이터에만 영향을 미칩니다.
- 민감 데이터 스캐너는 Datadog 에이전트에서 직접 정의하는 규칙에 영향을 미치지 않습니다.
- 민감 데이터 스캐너를 완전히 끄려면 각 스캐닝 그룹 및 스캐닝 규칙의 토글을 **off**로 설정하여 비활성화합니다.

### 커스텀 스캐닝 규칙

- **패턴 정의:** 이벤트 매칭에 사용할 정규식 패턴을 지정합니다. 샘플 데이터로 테스트하여 정규식 패턴이 유효한지 확인하세요.
- **범위 정의:** 전체 이벤트를 스캔할지, 특정 속성만 스캔할지 지정합니다. 스캔에서 특정 속성을 제외하도록 선택할 수도 있습니다.
- **태그 추가:** 지정된 정규식 패턴과 해당 값이 매칭되는 이벤트와 연결할 태그를 지정합니다. Datadog은 `sensitive_data` 및 `sensitive_data_category` 태그를 사용할 것을 권장합니다. 이들 태그는 검색, 대시보드 및 모니터에서 사용할 수 있습니다.
- **매칭 값 처리:** 필요에 따라, 매칭 값을 수정할지, 부분적으로 수정할지 또는 해시할지 지정합니다. 수정할 때에는 매칭 값을 대체할 자리 플레이스홀더를 지정하세요. 부분적으로 수정하는 경우에는 매칭 값 내에서 수정할 포지션(시작/끝) 및 길이(문자 수)를 지정하세요. 수정, 부분 수정 및 해시는 모두 취소 불가능한 작업에 해당합니다.
- **규칙 이름 지정:** 사람이 읽을 수 있는 규칙의 이름을 입력합니다.

{{< img src="logs/sensitive_data_scanner/sds_rule_apr_22.png" alt="민감 데이터 스캐너 커스텀 규칙" style="width:90%;">}}

### 즉시 사용 가능한 스캐닝 규칙

스캐닝 규칙 라이브러리에는 이메일 주소, 신용 카드 번호, API 키, 인증 토큰 등과 같은 일반적인 패턴을 감지하기 위해 Datadog에서 유지 관리하는 사전 정의된 규칙의 모음이 포함되어 있습니다.
{{< img src="logs/sensitive_data_scanner/sds_library_apr_22.png" alt="Scanning Rule Library" style="width:90%;">}}

### 권한 허용

기본적으로 Datadog 관리자 역할이 있는 사용자는 스캐닝 규칙을 보고 정의할 수 있는 액세스 권한이 있습니다. 다른 사용자의 액세스를 허용하려면 **Compliance**에서 데이터 스캐너에 대한 읽기 또는 쓰기 권한을 부여하세요. 역할 및 권한 허용에 대한 자세한 내용은 [커스텀 RBAC 가이드][3]를 참조하세요.

{{< img src="logs/sensitive_data_scanner/scanner_permission.png" alt="민감 데이터 스캐너에 대한 권한 허용" style="width:90%;">}}

### 쿼리 기반 RBAC를 통한 태그 사용

민감 데이터가 포함된 이벤트에 액세스할 수 있는 사람을 컨트롤합니다. 민감 데이터 스캐너에서 추가한 태그를 사용하여 RBAC로 쿼리를 구축하고, 데이터가 리텐션 기간 이후 만료될 때까지 특정 개인 또는 팀에 대한 액세스를 제한합니다.

### 즉시 사용 가능한 대시보드

민감 데이터 스캐너가 활성화되면 민감 데이터 결과를 요약하는 즉시 사용 가능한 [대시보드][4]가 계정에 자동으로 설치됩니다.

{{<img src="account_management/sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:70%;">}}

이 대시보드에 액세스하려면 **Dashboards > Dashboards List**로 이동하여 `Sensitive Data Scanner Overview`을(를) 검색하세요.

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[2]: /kr/logs/explorer/search_syntax/
[3]: /kr/logs/guide/logs-rbac-permissions/?tab=ui#overview
[4]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner