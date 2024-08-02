---
aliases:
- /ko/logs/log_configuration/sensitive_data_detection
- /ko/account_management/org_settings/sensitive_data_detection
further_reading:
- link: /data_security/
  tag: 설명서
  text: 데이터 관련 위험 감소
- link: /sensitive_data_scanner/regular_expression_syntax
  tag: 설명서
  text: 커스텀 스캔 규칙용 정규식 구문
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: 블로그
  text: 민감한 데이터 스캐너를 사용하여 규모에 따라 민감한 데이터 문제를 식별, 분류 및 해결하세요.
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: 블로그
  text: Datadog의 Sensitive Data Scanner로 최신 데이터 규정 준수 전략 구축
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: 블로그
  text: 민감 데이터 관리 모범 사례
title: 민감한 데이터 스캐너
---

## 개요

신용 카드 번호, 은행 라우팅 번호 및 API 키와 같은 민감 데이터는 종종 애플리케이션 로그, APM 스팬 및 RUM 이벤트에 의도치 않게 노출되어 조직을 재무 및 프라이버시 위험에 노출시킬 수 있습니다.

민감한 데이터 스캐너는 민감한 데이터를 식별, 태깅, 삭제 또는 해시 처리하는 데 활용되는 스트림 기반 패턴 매칭 서비스입니다. 보안 및 규정 준수 팀은 민감한 데이터 스캐너를 새로운 방어선으로 구현하여 민감한 데이터 유출을 방지하고 규정 위반 위험을 경감합니다.

민감한 데이터 스캐너를 사용하려면 스캔 그룹을 설정하여 스캔할 데이터를 정의한 후, 스캔 규칙을 설정하여 데이터 내에서  매칭시킬 민감한 정보를 결정합니다.

본 문서에서는 다음 사항을 안내합니다.

- [민감한 데이터 스캐너를 설정 및 확인하는 데 필요한 권한](#permissions).
- [민감한 데이터 스캔 설정](#set-up-scanning-for-sensitive-data).
- [기본 제공 대시보드 활용](#out-of-the-box-dashboard).

**참고**: PCI 준수 Datadog 조직을 설정하는 방법에 대한 자세한 내용을 확인하려면 [PCI DSS 준수][1]를 참조하세요.

{{< img src="sensitive_data_scanner/sds_main_12_01_24.png" alt="The Sensitive Data Scanner page showing six out of the 12개 활성 스캔 그룹 중 6개가 표시된 민감한 데이터 스캐너 페이지" style="width:90%;">}}

## 권한

기본적으로 Datadog 관리자 역할이 있는 사용자는 스캔 규칙을 살펴보고 설정할 수 있는 접근 권한이 있습니다. 다른 사용자의 접근을 허용하려면 [규정 준수(Compliance)[2]에서 `data_scanner_read` 또는 `data_scanner_write` 권한을 허가하여 역할을 사용자 지정합니다. 역할 및 권한을 설정하는 방법에 대한 자세한 내용을 확인하려면 [접근 제어][3]를 참조하세요.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="데이터 스캐너 읽기 및 쓰기 권한이 표시된 규정 준수 권한 섹션" style="width:55%;">}}


## 민감한 데이터 스캐너 설정

본 섹션에서는 민감한 데이터 스캐너를 설정하는 방법을 알아봅니다.

- [스캔 그룹 추가](#add-a-scanning-group)
- [스캔 규칙 추가](#add-scanning-rules)
- [민감한 데이터가 있는 이벤트 접근 관리](#control-access-to-events-with-sensitive-data)

[태그의 민감한 데이터를 삭제]할 수도 있습니다(#redact-sensitive-data-in-tags).

### 스캔 그룹 추가

스캐닝 그룹은 스캔할 데이터를 결정합니다. 이는 쿼리 필터와 로그, APM, RUM 및 이벤트 스캔을 활성화하는 토글 세트로 구성됩니다. 쿼리 필터에 대한 자세한 내용을 확인하려면 [로그 검색 구문][4] 문서를 참조하세요.

Terraform의 경우 [Datadog 민감한 데이터 스캐너 그룹][5] 리소스를 참조하세요.

스캔 그룹을 설정하려면:

1. [민감한 데이터 스캐너][6] 설정 페이지로 이동합니다. 또는 **조직 설정** > **민감한 데이터 스캐너**로 이동하여 **설정**를 클릭하세요.
1. **스캔 그룹 추가**를 클릭합니다. 또는 페이지 우상단의 드롭다운 메뉴의 **추가**를 클릭하고 **스캔 그룹 추가**를 선택합니다.
1. 스캔하려는 데이터에 쿼리 필터를 입력합니다. 상단의 **애플리케이션 성능 모니터링(APM) 스팬(span)**을 클릭하여 필터링한 스팬(span)을 미리 볼 수 있습니다. 필터링한 로그를 확인하려면 **로그**를 클릭합니다.
1. 그룹의 이름과 설명을 입력합니다.
1. 토글 버튼을 클릭하여 원하는 프로덕트에 대한 민감한 데이터 스캐너를 활성화합니다(예: 로그, 애플리케이션 성능 모니터링(APM) 스팬(span), RUM 이벤트, Datadog 이벤트).
1. **생성**을 클릭합니다.

### 스캔 규칙 추가

스캔 규칙은 스캔 그룹이 정의한 데이터 내에서 매칭시킬 민감한 정보를 결정합니다. Datadog의 스캔 규칙 라이브러리에서 사전 정의된 스캔 규칙을 추가하거나 정규식 패턴을 사용하여 고유 스캔 규칙을 생성하세요. 해당 데이터는 처리 중 수집 시에 스캔됩니다. 로그의 경우, 인덱싱 및 기타 라우팅 결정 전 스캔 작업이 진행됩니다.

Terraform의 경우 [Datadog 민감한 데이터 스캐너 규칙][7] 리소스를 참조하세요.

스캔 규칙을 추가하려면:

1. [민감한 데이터 스캐너][6] 설정 페이지로 이동합니다.
1. 스캔 규칙을 추가할 스캔 그룹을 클릭합니다.
1. **스캔 규칙 추가**를 클릭합니다. 또는 페이지 우상단의 드롭다운 메뉴의 **추가**를 클릭하고 **스캔 규칙 추가**를 선택합니다.
1. 라이브러리 규칙 추가 또는 커스텀 검색 규칙 생성을 선택합니다.

{{< tabs >}}
{{% tab "라이브러리 규칙에서 스캔 규칙 추가" %}}

스캔 규칙 라이브러리에는 이메일 주소, 신용카드 번호, API 키, 인증 토큰 등의 일반적인 패턴을 감지할 목적으로 사전 정의된 규칙이 포함되어 있습니다.

1. **스캔 그룹에 라이브러리 규칙 추가** 섹션에서 사용하려는 라이브러리 규칙을 선택합니다.
1. **규칙 적용 대상 및 작업 정의** 섹션에서 **전체 이벤트** 또는 **특정 속성**을 스캔할지 선택합니다.
    - 전체 이벤트를 스캔하는 경우 특정 속성을 스캔 대상에서 선택적으로 제외할 수 있습니다.
    - 특정 속성을 스캔하는 경우 스캔할 속성을 지정합니다.
{{% sds-scanning-rule %}}
1. **규칙 추가**를 클릭합니다.

{{% /tab %}}
{{% tab "커스텀 스캔 규칙 추가" %}}

정규식 패턴을 사용하여 커스텀 스캔 규칙을 생성하여 민감한 데이터를 스캔할 수 있습니다.

1. **매칭 조건 정의** 섹션의 **정규식 정의** 필드에서 이벤트에 매칭시키는 데 사용할 정규식 패턴을 지정합니다. **정규식 테스터** 필드에 샘플 데이터를 입력하여 정규식 패턴이 유효한지 확인합니다.   
    민감한 데이터 스캐너는 Perl 호환 정규식(PCRE)을 지원하나 다음 패턴은 지원하지 않습니다.
    - 역참조 및 하위 표현식 캡처(lookaround)
    - 임의의 너비 0 어서션
    - 하위 루틴 참조 및 재귀 패턴
    - 조건부 패턴
    - 역추적 컨트롤 동사
    - `\C` "single-byte" 지시문 (UTF-8 시퀀스 중단)
    - `\R` 새로운 행 일치
    - `\K` 매칭 초기화 시작 지시문
    - 콜아웃 및 내장 코드
    - 원자 그룹화 및 소유 한정사
{{% sds-scanning-rule %}}
1. **규칙 추가**를 클릭합니다.

{{% /tab %}}
{{< /tabs >}}

**참고**:

- 추가하거나 업데이트하는 규칙은 해당 규칙이 정의된 후 Datadog에 입력되는 데이터에만 영향을 미칩니다.
- 민감한 데이터 스캐너는 Datadog 에이전트에서 직접 정의하는 규칙에 영향을 미치지 않습니다.
- 민감한 데이터 스캐너를 완전히 끄려면 각 스캐닝 그룹 및 스캐닝 규칙의 토글을 **off**로 설정하여 비활성화합니다.

[요약][9] 페이지를 사용하여 민감한 데이터 문제를 분류하는 방법에 대해 자세히 알아보려면 [민감한 데이터 문제 조사][8] 항목을 참조하세요.

### 민감한 데이터가 있는 로그 접근 제어

민감한 데이터가 포함된 로그에 접근할 수 있는 사용자를 제어하려면, 민감한 데이터 스캐너가 추가한 태그를 사용하여 역할 기반 접근 제어(RBAC)로 쿼리를 구축합니다. 해당 작업으로 데이터의 보존 기간이 경과할 때까지 특정 개인 또는 팀의 접근을 제한할 수 있습니다. 자세한 내용을 확인하려면 [로그용 RBAC 설정 방법][10]을 참고하세요.

### 태그의 민감한 데이터 삭제

태그에 포함된 민감한 데이터를 삭제하려면 태그를 속성으로  [리매핑][11]한 후 해당 속성을 삭제해야 합니다. 리매퍼 프로세서에서 `Preserve source attribute`을 선택 해제하면 리매핑 도중 해당 태그가 보존되지 않습니다.

태그를 속성에 다시 매핑하려면:

1. [로그 파이프라인][12]으로 이동합니다.
2. **프로세서 추가**를 클릭합니다.
3. 프로세서 유형 드롭다운 메뉴에서 **리매퍼(Remapper)**를 선택합니다.
4. 프로세서 이름을 지정합니다.
5. **태그 키**를 선택합니다.
6. 태그 키를 입력합니다.
7. 태그 키가 리매핑되는 속성의 이름을 입력합니다.
8. **소스 속성 보존** 항목을 비활성화합니다.
9. **생성**을 클릭합니다.

속성을 삭제하려면:

1. [스캔 그룹][6]으로 이동합니다.
2. **스캔 규칙 추가**를 클릭합니다.
3. 사용하려는 라이브러리 규칙을 점검합니다.
4. **전체 이벤트 또는 일부 스캔**에 대해 **특정 속성**을 선택합니다.
5. 이전에 생성한 속성의 이름을 입력하여 스캔할 항목을 지정합니다.
6. 매칭되는 항목이 있을 시 원하는 작업을 선택합니다.
7. 옵션으로 태그를 추가합니다.
8. **규칙 추가**를 클릭합니다.

## 기본 제공 대시보드

민감한 데이터 스캐너를 활성화하면 계정에 민감한 데이터 검색 결과를 요약하는 [기본 제공 대시보드][13]가 자동 설치됩니다. 해당 대시보드에 접근하려면  **대시보드 > 대시보드 목록**으로 이동하여 `Sensitive Data Scanner Overview`를 검색합니다.

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:70%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_security/pci_compliance/
[2]: /ko/account_management/rbac/permissions/#compliance
[3]: /ko/account_management/rbac/
[4]: /ko/logs/explorer/search_syntax/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[6]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[8]: /ko/sensitive_data_scanner/investigate_sensitive_data_issues/
[9]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[10]: /ko/logs/guide/logs-rbac/
[11]: /ko/logs/log_configuration/processors/?tab=ui#remapper
[12]: https://app.datadoghq.com/logs/pipelines
[13]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner