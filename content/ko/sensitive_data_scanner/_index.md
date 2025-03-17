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
- link: /sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
  tag: 설명서
  text: 커스텀 규칙 생성을 위한 모범 사례
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: 블로그
  text: 민감 데이터 스캐너를 사용하여 규모에 따라 민감 데이터 문제를 식별, 분류 및 해결하세요.
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: 블로그
  text: Datadog의 Sensitive Data Scanner로 최신 데이터 규정 준수 전략 구축
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: 블로그
  text: 민감 데이터 관리 모범 사례
- link: https://www.datadoghq.com/blog/data-security/
  tag: 블로그
  text: Data Security으로 내 클라우드 데이터에 있는 민감 데이터 찾기
- link: https://www.datadoghq.com/blog/hipaa-compliance-sensitive-data-scanner/
  tag: 블로그
  text: Datadog를 사용해 HIPAA 요건의 적용을 받는 기업들이 민감한 데이터를 관리하는 방법
- link: https://www.datadoghq.com/blog/sds-for-insurance-companies/
  tag: 블로그
  text: 보험 회사가 Datadog을 사용하여 민감한 데이터 리스크를 발견, 분류 및 조치하는 방법
title: 민감 데이터 스캐너
---

## 개요

신용 카드 번호, 은행 라우팅 번호 및 API 키와 같은 민감 데이터는 종종 애플리케이션 로그, APM 스팬 및 RUM 이벤트에 의도치 않게 노출되어 조직을 재무 및 프라이버시 위험에 노출시킬 수 있습니다.

민감 데이터 스캐너는 민감 데이터를 식별, 태깅, 삭제 또는 해시 처리하는 데 활용되는 스트림 기반 패턴 매칭 서비스입니다. 보안 및 규정 준수 팀은 민감 데이터 스캐너를 새로운 방어선으로 구현하여 민감 데이터 유출을 방지하고 규정 위반 위험을 경감합니다.

민감 데이터 스캐너를 사용하려면 스캔 그룹을 설정하여 스캔할 데이터를 정의한 후, 스캔 규칙을 설정하여 데이터 내에서  매칭시킬 민감한 정보를 결정합니다.

본 문서에서는 다음 사항을 안내합니다.

- 민감 데이터 스캐너를 설정하고 확인하는 데 필요한 권한
- 민감 데이터의 스캐닝 설정
- 기본 대시보드 사용

**참고**: PCI 준수 Datadog 조직을 설정하는 방법에 대한 자세한 내용을 확인하려면 [PCI DSS 준수][1]를 참조하세요.

{{< img src="sensitive_data_scanner/sds_main_12_01_24.png" alt="The Sensitive Data Scanner page showing six out of the 12개 활성 스캔 그룹 중 6개가 표시된 민감 데이터 스캐너 페이지" style="width:90%;">}}

## 민감 데이터 스캐너 설정


민감 데이터를 수정할 수 있는 위치가 두 개 있습니다.

**클라우드:**

**Sensitive Data Scanner in the Cloud**를 사용하면 애플리케이션 로그, APM 이벤트 및 RUM 이벤트를 Datadog 백엔드에 제출하기 때문에 이벤트가 수정되기 전에 구역을 떠납니다. Sensitive Data Scanner를 사용하려면 스캔 그룹을 설정하여 검색할 데이터를 정의한 다음 검색 규칙을 설정하여 데이터 내에서 일치시킬 민감한 정보를 결정합니다. 검색 규칙의 경우 다음을 수행할 수 있습니다.
- Datadog의 Scanning Rule Library에서 미리 정의된 [검색 규칙][19]을 추가합니다. 이러한 규칙은 이메일 주소, 신용 카드 번호, API 키, 인증 토큰, 네트워크 및 장치 정보 등과 같은 일반적인 패턴을 감지합니다.
- [정규식 패턴을 사용하여 사용자 정의 규칙을 만듭니다][22].

**환경:**

**Observability Pipelines**를 사용하면 환경 내에서 데이터를 수집하고 처리한 다음 해당 데이터를 다운스트림 통합으로 라우팅할 수 있습니다. Observability Pipelines에서 [파이프라인을 설정][2]할 때 [Sensitive Data Scanner 프로세서][3]를 추가하여 로그의 민감한 데이터가 구역을 떠나기 전에 수정합니다. Rule Library에서 이메일 주소, 신용 카드 번호, API 키, 인증 토큰, IP 주소 등과 같은 사전 정의된 검색 규칙을 추가할 수 있습니다. 또한 정규식 패턴을 사용하여 사용자 정의 규칙을 만들 수도 있습니다. 자세한 내용은 [Observability Pipelines][4]을 참조하세요.

### 사전 필수 조건

기본적으로 Datadog Admin 역할이 있는 사용자는 검색 규칙을 보고 설정할 수 있는 액세스 권한을 갖습니다. 다른 사용자의 액세스를 허용하려면 [Compliance][5]에서 `data_scanner_read` 또는 `data_scanner_write` 권한을 사용자 지정 역할에 부여합니다. 역할 및 권한을 설정하는 방법에 대한 자세한 내용은 [액세스 제어][6]를 참조하세요.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="데이터 스캐너 읽기 및 쓰기 권한이 표시된 규정 준수 권한 섹션" style="width:80%;">}}

### 스캔 그룹 추가

스캔 그룹은 검색할 데이터를 결정합니다. 이는 로그, APM, RUM 및 이벤트 검색을 활성화하는 쿼리 필터와 토글 세트로 구성됩니다. 쿼리 필터에 대한 자세한 내용은 [로그 검색 구문][7] 문서를 참조하세요.

Terraform의 경우 [Datadog Sensitive Data Scanner 그룹][8] 리소스를 참조하세요.

스캔 그룹을 설정하려면 다음 단계를 따르세요.

1.  [Sensitive Data Scanner][9] 설정 페이지로 이동합니다.
1. **스캔 그룹 추가**를 클릭합니다. 또는 페이지 우상단의 드롭다운 메뉴의 **추가**를 클릭하고 **스캔 그룹 추가**를 선택합니다.
1. 스캔하려는 데이터에 쿼리 필터를 입력합니다. 상단의 **애플리케이션 성능 모니터링(APM) 스팬(span)**을 클릭하여 필터링한 스팬(span)을 미리 볼 수 있습니다. 필터링한 로그를 확인하려면 **로그**를 클릭합니다.
1. 그룹의 이름과 설명을 입력합니다.
1. 토글 버튼을 클릭하여 원하는 프로덕트에 대한 민감 데이터 스캐너를 활성화합니다(예: 로그, 애플리케이션 성능 모니터링(APM) 스팬(span), RUM 이벤트, Datadog 이벤트).
1. **생성**을 클릭합니다.

기본적으로 새로 생성된 스캐닝 그룹은 비활성화되어 있습니다. 스캐닝 그룹을 활성화하려면 우측에 있는 해당 토글을 클릭하세요.

### 스캔 규칙 추가

스캔 규칙은 스캔 그룹이 정의한 데이터 내에서 매칭시킬 민감한 정보를 결정합니다. Datadog의 스캔 규칙 라이브러리에서 사전 정의된 스캔 규칙을 추가하거나 정규식 패턴을 사용하여 고유 스캔 규칙을 생성하세요. 해당 데이터는 처리 중 수집 시에 스캔됩니다. 로그의 경우, 인덱싱 및 기타 라우팅 결정 전 스캔 작업이 진행됩니다.

Terraform의 경우 [Datadog Sensitive Data Scanner 규칙][10] 리소스를 참조하세요.

스캐닝 규칙을 추가하려면 다음 단계를 따르세요.

1.  [Sensitive Data Scanner][9] 설정 페이지로 이동합니다.
1. 스캔 규칙을 추가할 스캔 그룹을 클릭합니다.
1. **스캔 규칙 추가**를 클릭합니다. 또는 페이지 우상단의 드롭다운 메뉴의 **추가**를 클릭하고 **스캔 규칙 추가**를 선택합니다.
1. 라이브러리 규칙 추가 또는 커스텀 검색 규칙 생성을 선택합니다.

{{% collapse-content title="라이브러리 규칙에서 검색 규칙 추가" level="p" %}}

스캔 규칙 라이브러리에는 이메일 주소, 신용카드 번호, API 키, 인증 토큰 등의 일반적인 패턴을 감지할 목적으로 사전 정의된 규칙이 포함되어 있습니다.

1. 검사 그룹 내에서 이 규칙을 생성하지 않은 경우 검사 그룹을 선택합니다.
1. **스캔 그룹에 라이브러리 규칙 추가** 섹션에서 사용하려는 라이브러리 규칙을 선택합니다.
{{% sds-scanning-rule %}}
1. **규칙 추가**를 클릭합니다.

#### 또 다른 키워드 추가

OOTB 검색 규칙을 추가한 후 각 규칙을 개별적으로 편집하고 키워드 사전에 키워드를 추가할 수 있습니다.

1.  [Sensitive Data Scanner][9] 설정 페이지로 이동합니다.
1. 편집하려는 규칙이 있는 검사 그룹을 클릭합니다.
1. 규칙 위로 마우스를 가져간 다음 연필 아이콘을 클릭합니다.
1. 기본적으로 추천 키워드가 사용됩니다. 키워드를 추가하려면 ** 권장 키워드 사용**을 토글한 다음 목록에 키워드를 추가합니다. 이러한 키워드가 지정된 글자 수 내에 있도록 할 수도 있습니다. 기본적으로 키워드는 일치하는 값 앞까지 30자 이내여야 합니다.
1. **Update**를 클릭합니다.

{{% /collapse-content %}}
{{% collapse-content title="사용자 정의 검색 규칙 추가" level="p" %}}
정규식 패턴을 사용하여 사용자 정의 검색 규칙을 생성하면 민감한 데이터를 검색할 수 있습니다.

1. 검사 그룹 내에서 이 규칙을 생성하지 않은 경우 검사 그룹을 선택합니다.
1. **Define match conditions** 섹션의 **Define the regex** 필드에 이벤트에 일치시키는 데 사용하려는 정규식 패턴을 정의합니다. **Add sample data** 필드에서 샘플 데이터를 입력하여 정규식 패턴이 유효한지 확인합니다.
    민감 데이터 스캐너는 Perl 호환 정규식(PCRE)을 지원하나 다음 패턴은 지원하지 않습니다.
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
1. **키워드 사전 생성**의 경우, 키워드를 추가하여 정규식 조건과 일치할 때 검색 정확도를 개선할 수 있습니다. 예를 들어 16자리 Visa 신용카드 번호를 검색하는 경우 `visa`, `credit`, `card`와 같은 키워드를 추가할 수 있습니다. 이러한 키워드가 지정된 글자 수 이내가 되도록 설정할 수도 있습니다. 기본적으로 키워드는 일치하는 값 앞에서 30자 이내여야 합니다.
{{% sds-scanning-rule %}}
1. **규칙 추가**를 클릭합니다.
{{% /collapse-content %}}

**참고**:

- 추가하거나 업데이트하는 규칙은 해당 규칙이 정의된 후 Datadog에 입력되는 데이터에만 영향을 미칩니다.
- 민감 데이터 스캐너는 Datadog 에이전트에서 직접 정의하는 규칙에 영향을 미치지 않습니다.
- 규칙을 추가한 후 스캐닝 그룹 토글이 활성화되어 있는지 다시 확인하세요.

[Summary][12] 페이지를 사용하여 민감한 데이터 이슈를 분류하려면 [민감한 데이터 이슈 조사][11]를 참조하세요.

#### 제외된 네임스페이스

Datadog 플랫폼 기능에 필요한 예약 키워드가 있습니다. 스캔하는 로그에 이와 같은 단어가 포함되어 있으면 일치하는 단어 후부터 30자가 무시되고, 수정되지 않습니다. 예를 들어, 로그에서 `date` 이후에는 보통 이벤트 타임스탬프가 있습니다. 만약 사고로 타임스탬프가 수정되면 로그 처리에 문제가 생기고 나중에 쿼리가 불가능할 수 있습니다. 따라서 제외 네임스페이스 작업으로 제품 작동에 중요한 정보를 실수로 수정하는 것을 방지할 수 있습니다.

예외 네임스페이스 목록:

- `host`
- `hostname`
- `syslog.hostname`
- `service`
- `status`
- `env`
- `dd.trace_id`
- `trace_id`
- `trace id`
- `dd.span_id`
- `span_id`
- `span id`
- `@timestamp`
- `timestamp`
- `_timestamp`
- `Timestamp`
- `date`
- `published_date`
- `syslog.timestamp`
- `error.fingerprint`
- `x-datadog-parent-id`

### 스캐닝 규칙 편집

1.  [Sensitive Data Scanner][9] 설정 페이지로 이동합니다.
1. 편집하고자 하는 스캐닝 규칙 위에 마우스 커서를 올리고 **Edit**(연필) 아이콘을 클릭합니다.

   **Define match conditions** 섹션에는 커스텀 규칙용으로 쓴 정규식이나 선택한 라이브러리 스캐닝 규칙의 설명이 일치하는 민감 정보 예시와 함께 나타납니다.
1. 데이터가 규칙에 일치하도록 **Add sample data** 섹션에서 샘플을 추가할 수 있습니다. 샘플 데이터에서 규칙과 일치하는 것을 찾으면 초록색 **Match** 레이블이 입력 필드에 나타납니다.
1. **Create keyword dictionary** 아래에서 키워드를 추가해 탐지 정확성을 조정할 수 있습니다. 예를 들어, 16자리 비자 신용 카드를 스캐닝하려면 `visa`, `credit`, `card`와 같은 키워드를 추가할 수 있습니다.
1. 매칭 결과 앞에 키워드가 표시되어야 하는 글자 수를 선택합니다. 기본적으로 매칭 결과 앞 키워드는 30자 이내여야 합니다.
1. 또는 **Define rule target and action**에서 값이 규칙과 일치하는 이벤트와 연결하려는 태그를 추가합니다. Datadog에서는 `sensitive_data` 및 `sensitive_data_category` 태그를 사용할 것을 권장합니다. 이러한 태그는 검색, 대시보드 및 모니터에서 사용할 수 있습니다. 민감 데이터가 있는 로그 에 대한 액세스 제어](#control-access-to-로그-with-sensitive-data)를 사용하여 민감 데이터가 포함된 로그에 액세스할 수 있는 사용자를 결정하는 방법에 대한 자세한 내용은 태그를 참고하세요.
1. **Set priority level**의 경우 내 비즈니스에 맞는 값을 선택하세요.
1. **Update**를 클릭합니다.

### 민감 데이터가 있는 로그 접근 제어

민감한 데이터가 포함된 로그에 액세스할 수 있는 사람을 제한하려면 Sensitive Data Scanner에서 추가한 태그를 사용하여 역할 기반 액세스 제어(RBAC)로 쿼리를 작성하세요. 보존 기간 이후 데이터가 만료될 때까지 특정 개인이나 팀에 대한 액세스를 제한할 수 있습니다. 자세한 내용은 [로그에 대한 RBAC 설정 방법][13]을 참조하세요.

### 태그의 민감 데이터 삭제

태그에 포함된 민감한 데이터를 수정하려면 태그를 속성에 [다시 매핑][14]한 해당 속성을 수정해야 합니다. 리매핑 중에 태그가 유지되지 않도록 리매퍼 프로세서에서 `Preserve source attribute` 선택을 취소하세요.

태그를 속성에 다시 매핑하려면:

1. [로그 파이프라인][15]으로 이동합니다.
2. **프로세서 추가**를 클릭합니다.
3. 프로세서 유형 드롭다운 메뉴에서 **리매퍼(Remapper)**를 선택합니다.
4. 프로세서 이름을 지정합니다.
5. **태그 키**를 선택합니다.
6. 태그 키를 입력합니다.
7. 태그 키가 리매핑되는 속성의 이름을 입력합니다.
8. **소스 속성 보존** 항목을 비활성화합니다.
9. **생성**을 클릭합니다.

속성을 삭제하려면:

1. [스캔 그룹][9]으로 이동합니다.
2. **Add Scanning Rule**을 클릭합니다.
3. 사용하려는 라이브러리 규칙을 점검합니다.
4. **전체 이벤트 또는 일부 스캔**에 대해 **특정 속성**을 선택합니다.
5. 이전에 생성한 속성의 이름을 입력하여 스캔할 항목을 지정합니다.
6. 매칭되는 항목이 있을 시 원하는 작업을 선택합니다.
7. 옵션으로 태그를 추가합니다.
8. **규칙 추가**를 클릭합니다.

## Cloud Storage 검사

{{< callout header="Limited Availability" url="https://www.datadoghq.com/private-beta/data-security" >}}
  Amazon S3 버킷 및 RDS 인스턴스에 검사는 서비스 지원이 제한되어 있습니다. 서비스 사용을 신청하려면 <strong>액세스 요청</strong>을 클릭하세요.
{{< /callout >}}

 [Sensitive Data Scanner][16]를 활성화한 경우 Amazon S3 버킷 및 RDS 인스턴스의 민감한 데이터를 분류할 수 있습니다.

Sensitive Data Scanner는 클라우드 환경에 [Agentless 스캐너][17]를 배포하여 민감한 데이터를 검색합니다. 이러한 검색 인스턴스는 [원격 구성][18]을 통해 모든 S3 버킷 및 RDS 인스턴스 목록을 검색하고 시간이 지남에 따라 모든 데이터 저장소의 텍스트 파일(예: CSV 및 JSON)과 테이블을 검색합니다. Sensitive Data Scanner는 [전체 규칙 라이브러리][19]를 활용하여 일치하는 항목을 찾습니다. 일치하는 항목이 발견되면 검색 인스턴스가 일치 항목의 위치를 ​​Datadog으로 전송합니다. 데이터 저장소와 해당 파일은 사용자 환경에서만 읽혀지며 민감한 데이터는 Datadog으로 다시 전송되지 않습니다.

Cloud Storage는 민감한 데이터 일치를 표시하는 것과 함께 민감한 데이터 저장소에 영향을 미치는 [Cloud Security Management][20]에서 감지한 모든 보안 이슈를 표시합니다. 이슈를 클릭하여 Cloud Security Management 내에서 분류하고 해결할 수 있습니다.

## 기본 제공 대시보드

Sensitive Data Scanner가 활성화되면 민감한 데이터 결과를 요약하는 [기본 대시보드][21]가 계정에 자동으로 설치됩니다. 이 대시보드에 액세스하려면 **Dashboards > Dashboards List**로 이동하여 "Sensitive Data Scanner Overview"를 검색하세요.

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

## 민감 데이터 스캐너 비활성화

민감 데이터 스캐너를 완전히 끄려면 각 스캐닝 그룹 토글을 **off**로 설정하여 비활성화합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_security/pci_compliance/
[2]: /ko/observability_pipelines/set_up_pipelines/
[3]: /ko/observability_pipelines/processors/sensitive_data_scanner/
[4]: /ko/observability_pipelines/
[5]: /ko/account_management/rbac/permissions/#compliance
[6]: /ko/account_management/rbac/
[7]: /ko/logs/explorer/search_syntax/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[9]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[11]: /ko/sensitive_data_scanner/investigate_sensitive_data_issues/
[12]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[13]: /ko/logs/guide/logs-rbac/
[14]: /ko/logs/log_configuration/processors/?tab=ui#remapper
[15]: https://app.datadoghq.com/logs/pipelines
[16]: /ko/sensitive_data_scanner/
[17]: /ko/security/cloud_security_management/setup/agentless_scanning
[18]: /ko/agent/remote_config
[19]: /ko/sensitive_data_scanner/library_rules/
[20]: /ko/security/cloud_security_management
[21]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[22]: /ko/sensitive_data_scanner/regular_expression_syntax