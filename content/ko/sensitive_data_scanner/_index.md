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

- **클라우드에 있는 민감 데이터 스캐너**를 사용하면 Datadog 백엔드에 로그를 전송합니다. 이 방법을 사용하면 로그가 수정되기 전에 프레미스에서 벗어납니다. 조직별로 여러 스캐닝 그룹이 있을 수 있고 커스텀 스캐닝 규칙 또한 생성할 수 있습니다. 태그에 있는 민감 데이터를 수정할 수도 있습니다.

**환경:**

{{< callout url="https://www.datadoghq.com/private-beta/sensitive-data-scanner-using-agent-in-your-premises/" >}}
  Datadog 에이전트에 대한 Sensitive Data Scanner 지원은 베타 버전입니다. 등록하려면 <strong>액세스 요청</strong>을 클릭하세요.
{{< /callout >}}

- **에이전트를 사용한 민감 데이터 스캐너**를 사용하면 Datadog 백엔드에 전송되기 전에 Datadog가 로그를 수정하고, 수정된 로그가 프레미스를 벗어날 필요가 없습니다. 이 방법을 사용하면 조직당 스캐닝 그룹 하나만 할당할 수 있고,  사전 정의된 라이브러리 규칙을 하나만 사용할 수 있습니다.

**관측성 파이프라인:**

관측성 파이프라인에서 [파이프라인][2]을 설정할 때 내 환경을 벗어나기 전에 로그에 있는 민감 데이터를 수정하도록 [민감 데이터 스캐너 프로세서][3]를 추가합니다. 자세한 정보는 [관측성 파이프라인][4]을 참고하세요.

### 사전 필수 조건

{{< tabs >}}
{{% tab "클라우드" %}}
기본적으로 Datadog 관리자 역할이 있는 사용자는 스캔 규칙을 살펴보고 설정할 수 있는 접근 권한이 있습니다. 다른 사용자의 접근을 허용하려면 [규정 준수(Compliance)[2]에서 `data_scanner_read` 또는 `data_scanner_write` 권한을 허가하여 역할을 사용자 지정합니다. 역할 및 권한을 설정하는 방법에 관한 자세한 내용을 확인하려면 [접근 제어][3]를 참고하세요.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="데이터 스캐너 읽기 및 쓰기 권한이 표시된 규정 준수 권한 섹션" style="width:80%;">}}

[1]: /ko/account_management/rbac/permissions/#compliance
[2]: /ko/account_management/rbac/
{{% /tab %}}
{{% tab "에이전트 이용" %}}

1. 필요한 권한을 부여하세요. 기본적으로 Datadog 관리자 역할이 있는 사용자는 스캔 규칙을 살펴보고 설정할 수 있는 접근 권한이 있습니다. 다른 사용자의 접근을 허용하려면 [규정 준수(Compliance)[1]에서 `data_scanner_read` 또는 `data_scanner_write` 권한을 허가하여 역할을 사용자 지정합니다. 역할 및 권한을 설정하는 방법에 대한 자세한 내용을 확인하려면 [접근 제어][2]를 참조하세요.

    {{< img src="sensitive_data_scanner/read_write_permissions.png" alt="데이터 스캐너 읽기 및 쓰기 권한이 표시된 규정 준수 권한 섹션" style="width:80%;">}}
2. 다음 단계에 따라 [원격 구성을 활성화][3]하세요.
3. Datadog 에이전트 v7.54 이상 버전을 설치하세요.

[1]: /ko/account_management/rbac/permissions/#compliance
[2]: /ko/account_management/rbac/
[3]: /ko/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
{{% /tab %}}
{{< /tabs >}}

### 스캔 그룹 추가

{{< tabs >}}
{{% tab "클라우드" %}}
스캐닝 그룹은 스캔할 데이터를 결정합니다. 이는 쿼리 필터와 로그, APM, RUM, 이벤트 스캐닝을 활성화하는 토글 세트로 구성됩니다. 쿼리 필터에 관한 자세한 내용은 [로그 검색 구문][1] 설명서를 참고하세요.

Terraform의 경우 [Datadog 민감 데이터 스캐너 그룹][2] 리소스를 참고하세요.

스캐닝 그룹을 설정하려면 다음 단계를 따르세요.

1. [민감 데이터 스캐닝][3] 구성 페이지로 이동합니다.
1. **스캔 그룹 추가**를 클릭합니다. 또는 페이지 우상단의 드롭다운 메뉴의 **추가**를 클릭하고 **스캔 그룹 추가**를 선택합니다.
1. 스캔하려는 데이터에 쿼리 필터를 입력합니다. 상단의 **애플리케이션 성능 모니터링(APM) 스팬(span)**을 클릭하여 필터링한 스팬(span)을 미리 볼 수 있습니다. 필터링한 로그를 확인하려면 **로그**를 클릭합니다.
1. 그룹의 이름과 설명을 입력합니다.
1. 토글 버튼을 클릭하여 원하는 프로덕트에 대한 민감 데이터 스캐너를 활성화합니다(예: 로그, 애플리케이션 성능 모니터링(APM) 스팬(span), RUM 이벤트, Datadog 이벤트).
1. **생성**을 클릭합니다.

[1]: /ko/logs/explorer/search_syntax/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{% /tab %}}
{{% tab "에이전트 이용" %}}
<div class="alert alert-warning"><strong>참고</strong>: 에이전트를 이용하여 민감 데이터 스캐너를 사용하는 것은 조직당 한 그룹만 가능합니다.</div>

스캐닝 그룹은 스캔할 로그를 결정합니다. 이는 호스트 태그를 기반으로 자격을 충족하는 에이전트를 매칭하는 쿼리 필터로 구성되어 있습니다.

스캐닝 그룹을 설정하려면 다음 단계를 따르세요.

1. [에이전트를 이용해 민감 데이터 스캐너 사용][1] 구성 페이지로 이동합니다.
1. **스캔 그룹 추가**를 클릭합니다. 또는 페이지 우상단의 드롭다운 메뉴의 **추가**를 클릭하고 **스캔 그룹 추가**를 선택합니다.
1. 스캔하고자하는 데이터의 쿼리 필터를 입력하세요. 매칭하는 에이전트에는 호스트 수준 태그만 사용할 수 있습니다. 하단에 매칭하고 자격 조건을 충족하는 에이전트 개수가 표시되며, 총 에이전트 개수와 태그와 매칭하는 에이전트 총 개수가 함께 표시됩니다.
1. 그룹의 이름과 설명을 입력합니다.
1. **Save**을 클릭합니다.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}

기본적으로 새로 생성된 스캐닝 그룹은 비활성화되어 있습니다. 스캐닝 그룹을 활성화하려면 우측에 있는 해당 토글을 클릭하세요.

### 스캔 규칙 추가

{{< tabs >}}
{{% tab "클라우드" %}}
스캔 규칙은 스캔 그룹이 정의한 데이터 내에서 매칭시킬 민감한 정보를 결정합니다. Datadog의 스캔 규칙 라이브러리에서 사전 정의된 스캔 규칙을 추가하거나 정규식 패턴을 사용하여 고유 스캔 규칙을 생성하세요. 해당 데이터는 처리 중 수집 시에 스캔됩니다. 로그의 경우, 인덱싱 및 기타 라우팅 결정 전 스캔 작업이 진행됩니다.

Terraform의 경우 [Datadog 민감 데이터 스캐너 규칙][1] 리소스를 참고하세요.

스캐닝 규칙을 추가하려면 다음 단계를 따르세요.

1. [민감 데이터 스캐너][2] 구성 페이지로 이동합니다.
1. 스캔 규칙을 추가할 스캔 그룹을 클릭합니다.
1. **스캔 규칙 추가**를 클릭합니다. 또는 페이지 우상단의 드롭다운 메뉴의 **추가**를 클릭하고 **스캔 규칙 추가**를 선택합니다.
1. 라이브러리 규칙 추가 또는 커스텀 검색 규칙 생성을 선택합니다.

{{< collapse-content title="라이브러리 규칙에서 스캐닝 규칙 추가" level="p" >}}

스캔 규칙 라이브러리에는 이메일 주소, 신용카드 번호, API 키, 인증 토큰 등의 일반적인 패턴을 감지할 목적으로 사전 정의된 규칙이 포함되어 있습니다.

1. 검사 그룹 내에서 이 규칙을 생성하지 않은 경우 검사 그룹을 선택하세요.
1. **스캔 그룹에 라이브러리 규칙 추가** 섹션에서 사용하려는 라이브러리 규칙을 선택합니다.
{{% sds-scanning-rule %}}
1. **규칙 추가**를 클릭합니다.

#### 또 다른 키워드 추가

OOTB 검색 규칙을 추가한 후 각 규칙을 개별적으로 편집하고 키워드 사전에 키워드를 추가할 수 있습니다.

1. [민감 데이터 스캐너][2] 구성 페이지로 이동합니다.
1. 편집하려는 규칙이 있는 검사 그룹을 클릭합니다.
1. 규칙 위로 마우스를 가져간 다음 연필 아이콘을 클릭합니다.
1. 기본적으로 추천 키워드가 사용됩니다. 키워드를 추가하려면 ** 권장 키워드 사용**을 토글한 다음 목록에 키워드를 추가합니다. 이러한 키워드가 지정된 글자 수 내에 있도록 할 수도 있습니다. 기본적으로 키워드는 일치하는 값 앞까지 30자 이내여야 합니다.
1. **Update**를 클릭합니다.

{{< /collapse-content >}}
{{< collapse-content title="커스텀 검사 규칙 추가" level="p" >}}
민감한 데이터에 대한 정규식 패턴을 사용해 커스텀 검사 규칙을 생성할 수 있습니다.

1. 검사 그룹 내에서 이 규칙을 생성하지 않은 경우 검사 그룹을 선택합니다.
1. **일치 조건 정의** 섹션의 **정규식 정의** 필드에 이벤트에 일치시키는 데 사용하려는 정규식 패턴을 정의합니다. **샘플 데이터 추가** 필드에서 샘플 데이터를 입력하여 정규식 패턴이 유효한지 확인합니다.
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
{{< /collapse-content >}} 

**참고**:

- 추가하거나 업데이트하는 규칙은 해당 규칙이 정의된 후 Datadog에 입력되는 데이터에만 영향을 미칩니다.
- 민감 데이터 스캐너는 Datadog 에이전트에서 직접 정의하는 규칙에 영향을 미치지 않습니다.
- 규칙을 추가한 후 스캐닝 그룹 토글이 활성화되어 있는지 다시 확인하세요.

[요약][4] 페이지를 사용하여 민감 데이터 문제를 분류하는 방법에 관해 자세히 알아보려면 [민감 데이터 문제 조사][3] 항목을 참고하세요.


[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[2]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[3]: /ko/sensitive_data_scanner/investigate_sensitive_data_issues/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
{{% /tab %}}
{{% tab "에이전트 이용" %}}

스캐닝 규칙은 스캐닝 그룹에서 정의한 데이터 내에서 민감한 정보가 무엇인지 결정하는 규칙입니다. Datadog 에이전트가 로그를 수집하고 Datadog 플랫폼으로 전송하기 전에 로컬 환경에서 데이터를 스캔합니다.

<div class="alert alert-warning"><strong>참고</strong>: 에이전트를 사용한 민감 데이터 스캐너는 Datadog의 스캐닝 규칙 라이브러리에서 사전 정의된 스캐닝 규칙만 지원합니다. 스캐닝 규칙 총 개수는 20개로 제한됩니다.</div>

스캐닝 규칙을 추가하려면 다음 단계를 따르세요.

1. [에이전트를 이용해 민감 데이터 스캐너 사용][1] 구성 페이지로 이동합니다.
1. **스캔 규칙 추가**를 클릭합니다. 또는 페이지 우상단의 드롭다운 메뉴의 **추가**를 클릭하고 **스캔 규칙 추가**를 선택합니다.
1.  **Add library rules to the scanning group** 섹션에서 사용하고자하는 라이브러리 규칙을 선택하세요. **Filter library rules** 입력을 사용해 기존 라이브러리 규칙을 검색할 수 있습니다. 규칙 이름 옆에 각 규칙의 사전 정의된 태그 목록을 볼 수 있습니다.
1. **Define rule target and action** 섹션에서 일치하는 민감 정보에 하고 싶은 작업을 선택하세요. **참고**: 수정, 일부 수정, 해싱은 모두 되돌릴 수 없는 작업입니다.
    - **수정**: 일치하는 모든 값을 **대체 텍스트** 필드에 지정한 텍스트로 바꿉니다.
    - **부분적으로 수정**: 일치하는 모든 데이터의 지정된 부분을 대체합니다. 삭제** 섹션에서 삭제할 문자 수와 일치하는 데이터의 어느 부분을 삭제할지 지정합니다.
    - **해시**: 일치하는 모든 데이터를 고유 식별자로 바꿉니다. 일치하는 UTF-8 바이트는 FarmHash의 64비트 지문으로 해시됩니다.
1. (선택 사항) 값이 지정된 regex 패턴과 일치하는 이벤트와 연결하려는 추가 태그를 더할 수 있습니다. Datadog에서는 기본적으로 `sensitive_data` 및 `sensitive_data_category` 태그를 추가합니다. 이러한 태그는 검색, 대시보드, 모니터에서 사용할 수 있습니다. 민감 정보를 포함한 로그에 접근 가능한 권한을 결정할 때 태그를 사용하는 방법을 알아보려면 [민감 정보 로그 액세스 제어]#control-access-to-logs-with-sensitive-data)를 참고하세요.
1. **Save**을 클릭합니다.

**참고**:

- 추가하거나 업데이트하는 규칙은 해당 규칙이 정의된 후 Datadog에 입력되는 데이터에만 영향을 미칩니다.
- 규칙을 추가한 후 스캐닝 그룹 토글이 활성화되어 있는지 다시 확인하세요.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}

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

{{< tabs >}}
{{% tab "클라우드" %}}

1. [민감 데이터 스캐너][1] 구성 페이지로 이동합니다.
1. 편집하고자 하는 스캐닝 규칙 위에 마우스 커서를 올리고 **Edit**(연필) 아이콘을 클릭합니다.

   **Define match conditions** 섹션에는 커스텀 규칙용으로 쓴 정규식이나 선택한 라이브러리 스캐닝 규칙의 설명이 일치하는 민감 정보 예시와 함께 나타납니다.
1. 데이터가 규칙에 일치하도록 **Add sample data** 섹션에서 샘플을 추가할 수 있습니다. 샘플 데이터에서 규칙과 일치하는 것을 찾으면 초록색 **Match** 레이블이 입력 필드에 나타납니다.
1. **Create keyword dictionary** 아래에서 키워드를 추가해 탐지 정확성을 조정할 수 있습니다. 예를 들어, 16자리 비자 신용 카드를 스캐닝하려면 `visa`, `credit`, `card`와 같은 키워드를 추가할 수 있습니다.
1. 매칭 결과 앞에 키워드가 표시되어야 하는 글자 수를 선택합니다. 기본적으로 매칭 결과 앞 키워드는 30자 이내여야 합니다.
1. 또는 **Define rule target and action**에서 값이 규칙과 일치하는 이벤트와 연결하려는 태그를 추가합니다. Datadog에서는 `sensitive_data` 및 `sensitive_data_category` 태그를 사용할 것을 권장합니다. 이러한 태그는 검색, 대시보드 및 모니터에서 사용할 수 있습니다. 민감 데이터가 있는 로그 에 대한 액세스 제어](#control-access-to-로그-with-sensitive-data)를 사용하여 민감 데이터가 포함된 로그에 액세스할 수 있는 사용자를 결정하는 방법에 대한 자세한 내용은 태그를 참고하세요.
1. **Set priority level**의 경우 내 비즈니스에 맞는 값을 선택하세요.
1. **Update**를 클릭합니다.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{% /tab %}}
{{% tab "에이전트 이용" %}}

1. [에이전트를 이용해 민감 데이터 스캐너 사용][1] 구성 페이지로 이동합니다.
1. 편집하고자 하는 스캐닝 규칙 위에 마우스 커서를 올리고 **Edit**(연필) 아이콘을 클릭합니다.

   **Define match conditions** 섹션에는 선택한 라이브러리 스캐닝 규칙의 설명이 일치하는 민감 정보 예시와 함께 나타납니다.
1. **Create keyword dictionary** 아래에서 키워드를 추가해 탐지 정확성을 조정할 수 있습니다. 예를 들어, 16자리 비자 신용 카드를 스캐닝하려면 `visa`, `credit`, `card`와 같은 키워드를 추가할 수 있습니다.
1. 매칭 결과 앞에 키워드가 표시되어야 하는 글자 수를 선택합니다. 기본적으로 매칭 결과 앞 키워드는 30자 이내여야 합니다.
1. **Save**을 클릭합니다.

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration/agent
{{% /tab %}}
{{< /tabs >}}


### 민감 데이터가 있는 로그 접근 제어

민감 데이터가 포함된 로그에 접근할 수 있는 사용자를 제어하려면, 민감 데이터 스캐너가 추가한 태그를 사용하여 역할 기반 접근 제어(RBAC)로 쿼리를 구축합니다. 해당 작업으로 데이터의 보존 기간이 경과할 때까지 특정 개인 또는 팀의 접근을 제한할 수 있습니다. 자세한 내용을 확인하려면 [로그용 RBAC 설정 방법][5]을 참고하세요.

### 태그의 민감 데이터 삭제

{{< tabs >}}
{{% tab "클라우드" %}}
태그에 포함된 민감 데이터를 삭제하려면 태그를 속성으로  [리매핑][1]한 후 해당 속성을 삭제해야 합니다. 리매퍼 프로세서에서 `Preserve source attribute`을 선택 해제하면 리매핑 도중 해당 태그가 보존되지 않습니다.

태그를 속성에 다시 매핑하려면:

1. [로그 파이프라인][2]으로 이동합니다.
2. **프로세서 추가**를 클릭합니다.
3. 프로세서 유형 드롭다운 메뉴에서 **리매퍼(Remapper)**를 선택합니다.
4. 프로세서 이름을 지정합니다.
5. **태그 키**를 선택합니다.
6. 태그 키를 입력합니다.
7. 태그 키가 리매핑되는 속성의 이름을 입력합니다.
8. **소스 속성 보존** 항목을 비활성화합니다.
9. **생성**을 클릭합니다.

속성을 삭제하려면:

1. [스캐닝 그룹][3]으로 이동합니다.
2. **Add Scanning Rule**을 클릭합니다.
3. 사용하려는 라이브러리 규칙을 점검합니다.
4. **전체 이벤트 또는 일부 스캔**에 대해 **특정 속성**을 선택합니다.
5. 이전에 생성한 속성의 이름을 입력하여 스캔할 항목을 지정합니다.
6. 매칭되는 항목이 있을 시 원하는 작업을 선택합니다.
7. 옵션으로 태그를 추가합니다.
8. **규칙 추가**를 클릭합니다.

[1]: /ko/logs/log_configuration/processors/?tab=ui#remapper
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
{{% /tab %}}
{{% tab "에이전트 사용" %}}
에이전트를 사용해 민감 데이터 스캐너를 사용할 경우에는 이 기능을 이용할 수 없습니다.
{{% /tab %}}
{{< /tabs >}}

## Cloud Storage 검사

{{< callout header="Join the Preview!" url="https://www.datadoghq.com/private-beta/data-security" >}}
  미리 보기에서 Amazon S3 버킷 및 RDS 인스턴스에 대해 검사를 지원합니다. 등록하려면 <strong>액세스 요청</strong>을 클릭하세요.
{{< /callout >}}

[Sensitive Data Scanner][6]를 활성화하면, Amazon S3 버킷 및 RDS 인스턴스에서 민감한 데이터를 분류하고 구분할 수 있습니다.

Sensitive Data Scanner는 클라우드 환경에 [에이전트리스 스캐너][8]를 배포하여 민감한 데이터를 검사합니다. 이러한 검사 인스턴스는 [원격 설정][9]을 통해 모든 S3 버킷 및 RDS 인스턴스 목록을 검색하고 명령을 설정해 CSV 및 JSON 등 텍스트 파일을 검사할 수 있습니다. 또한, 시간 변화에 따라 모든 데이터 자장소의 표를 검색하도록 할 수 있습니다. Sensitive Data Scanner는 [전체 규칙 라이브러리][11]를 사용해 일치 항목을 찾습니다. 일치 항목을 발견하면 해당 위치가 검사 인스턴스로 Datadog에 전송됩니다. 데이터가 저장되고 파일은 환경에서 읽기만 가능합니다. 민감한 데이터가 Datadog로 다시 전송되지 않습니다.

클라우드 스토리지는 민감한 데이터 일치 항목 표시와 함께 [클라우드 보안 관리][7]에서 탐지한 민감한 데이터 저장소에 영향을 미치는 모든 보안 문제를 표시합니다. 문제를 클릭하면 클라우드 보안 관리 내에서 분류 및 해결을 계속할 수 있습니다.

## 기본 제공 대시보드

민감 데이터 스캐너를 활성화하면 계정에 민감 데이터 검색 결과를 요약하는 [기본 제공 대시보드][10]가 자동 설치됩니다. 해당 대시보드에 접근하려면  **Dashboards > Dashboards List**으로 이동하여 "Sensitive Data Scanner Overview"를 검색합니다.

{{<img src="sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:80%;">}}

## 민감 데이터 스캐너 비활성화

민감 데이터 스캐너를 완전히 끄려면 각 스캐닝 그룹 토글을 **off**로 설정하여 비활성화합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_security/pci_compliance/
[2]: /ko/observability_pipelines/set_up_pipelines/
[3]: /ko/observability_pipelines/processors/#sensitive-data-scanner
[4]: /ko/observability_pipelines/
[5]: /ko/logs/guide/logs-rbac/
[6]: /ko/sensitive_data_scanner/
[7]: /ko/security/cloud_security_management
[8]: /ko/security/cloud_security_management/setup/agentless_scanning
[9]: /ko/agent/remote_config
[10]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner
[11]: /ko/sensitive_data_scanner/library_rules/