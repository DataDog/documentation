---
aliases:
- /ko/sensitive_data_scanner/setup/telemetry_data
- /ko/security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /ko/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /ko/security/sensitive_data_scanner/guide/redact_uuids_in_logs/
- /ko/security/sensitive_data_scanner/guide/redact_all_emails_except_from_specific_domain_logs/
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: 설명서
  text: 기본 제공 라이브러리 규칙에 대해 자세히 알아보기
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: 설명서
  text: 사용자 지정 규칙 만들기에 대해 자세히 알아보기
title: 텔레메트리 데이터
---
## 개요 {#overview}

Cloud의 Sensitive Data Scanner는 애플리케이션 로그, APM 이벤트, RUM 이벤트 및 Event Management의 이벤트와 같은 텔레메트리 데이터를 스캔합니다. 스캔하여 삭제할 수 있는 데이터는 다음과 같습니다.

- **로그**: 로그 메시지 및 특성 값을 포함한 모든 구조화된 로그 콘텐츠 및 구조화되지 않은 로그 콘텐츠
- **APM**: 스팬 특성 값에 한함
- **RUM**: 이벤트 특성 값 전용
- **이벤트**: 이벤트 특성 값만

필요 시, 각 제품에 대해 샘플링 비율을 10%에서 99% 사이로 설정할 수 있습니다. 이는 민감한 정보를 스캔하는 데이터 양을 줄여 처음 시작할 때 비용을 관리하는 데 도움이 됩니다.

각 스캔 규칙에 대해, 일치하는 민감한 데이터에 다음 중 하나의 액션을 적용할 수 있습니다.

- **비식별화**: 선택한 단일 토큰으로 일치하는 전체 데이터를 교체합니다. 예를 들어 `[sensitive_data]`.
- **부분 비식별화**: 모든 일치하는 값의 특정 부분을 교체합니다.
- **해시**: 일치하는 전체 데이터를 비가역적인 고유 식별자로 교체합니다.
- **마스킹**(로그에만 사용 가능): 일치하는 모든 값을 마스킹합니다. `Data Scanner Unmask`권한이 있는 사용자는 Datadog에서 이 데이터를 난독화 해제(마스킹 해제)하고 조회할 수 있습니다. 자세한 내용은 [마스킹 액션](#mask-action)을 참조하세요.

**참고**:
- 샘플링된 데이터를 스캔할 때는 데이터를 난독화하는 액션을 선택할 수 없습니다.
- Sensitive Data Scanner는 integer, float 및 double 값은 스캔하지 않습니다. 숫자가 문자열 형식인 경우 문자열이 스캔됩니다.

로그와 이벤트를 Datadog 백엔드에 제출하므로 데이터가 제거되기 전에 사용자의 환경을 거쳐 전송됩니다. 로그와 이벤트는 처리 중에 Datadog 백엔드에서 스캔되고 비식별화되므로 민감한 데이터는 이벤트가 인덱싱되고 Datadog UI에 표시되기 전에 비식별화됩니다.

데이터가 마스킹되기 전에 사용자 환경을 벗어나지 않도록 하려면 [Observability Pipelines][12]와 [Sensitive Data Scanner 프로세서][13]를 사용하여 민감한 데이터를 스캔하고 마스킹 처리합니다. 파이프라인과 해당 구성 요소를 설정하는 방법은 [파이프라인 설정][14]을 참조하세요.

Cloud에서 Sensitive Data Scanner를 사용하려면 먼저 스캔 그룹을 설정하여 스캔할 데이터를 정의한 다음, 스캔 규칙을 추가하여 데이터에서 일치시킬 민감한 정보를 지정합니다.

이 문서에서는 다음 내용을 설명합니다.

- Sensitive Data Scanner를 확인하고 설정하는 데 필요한 [권한](#permissions).
- [스캔 그룹 추가](#add-a-scanning-group)
- [스캔 규칙 추가](#add-scanning-rules)
- [민감 데이터가 있는 로그 접근 제어 방법](#control-access-to-logs-with-sensitive-data)
- [태그 내 민감 데이터 제거 방법](#redact-sensitive-data-in-tags)

## 설정 {#setup}

### 권한 {#permissions}

기본적으로 Datadog Admin 역할이 있는 사용자는 스캔 규칙을 확인하고 설정할 수 있습니다. 다른 사용자에게도 권한을 부여하려면 [Compliance][1] 아래의 `data_scanner_read` 또는 `data_scanner_write` 권한을 사용자 지정 역할에 부여합니다. 역할 및 권한 설정 방법에 대한 자세한 내용은 [Access Control][2]을 참조하세요.

스캔 규칙이 일치하는 민감한 데이터에 대해 **마스킹** 액션(로그에서만 사용 가능)을 사용하는 경우 `data_scanner_unmask` 권한이 있는 사용자는 Datadog에서 해당 데이터를 난독화 해제(마스킹 해제)하여 조회할 수 있습니다. **참고**: Datadog은 유출된 모든 자격 증명에 대응하고 교체할 계획이 없는 한 자격 증명에는 **마스킹** 액션을 사용하는 것을 권장하지 않습니다. 자세한 내용은 [마스킹 액션](#mask-action)을 참조하세요.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="데이터 스캐너 읽기 및 쓰기 권한을 보여주는 Compliance 권한 섹션" style="width:80%;">}}

### 스캔 그룹 추가 {#add-a-scanning-group}

스캔 그룹은 어떤 데이터를 스캔할지 결정합니다. 스캔 그룹은 쿼리 필터, 로그/APM/RUM/이벤트에 대한 스캔 활성화 버튼 세트, 그리고 각 제품별로 10%~99%의 샘플링 레이트를 설정하는 옵션으로 구성됩니다. 쿼리 필터에 대한 자세한 내용은 [로그 검색 구문][3] 설명서를 참조하세요.

Terraform을 사용하는 경우 [Datadog Sensitive Data Scanner 그룹][4] 리소스를 참조하세요.

스캔 그룹을 설정하려면 다음 단계를 따르세요.

1. [Sensitive Data Scanner][5] 설정 페이지로 이동합니다.
1. **Add scanning group**을 클릭합니다. 또는 페이지 오른쪽 상단의 **Add** 드롭다운 메뉴를 클릭한 다음 **Add Scanning Group**을 선택합니다.
1. 스캔할 데이터에 대한 쿼리 필터를 입력합니다. 상단에서 **APM Spans**를 클릭하여 필터링된 스팬을 미리 봅니다. **Logs**를 클릭하여 필터링된 로그를 확인합니다.
1. 그룹의 이름과 설명을 입력합니다.
1. 원하는 제품(예: 로그, APM 스팬, RUM 이벤트, Datadog 이벤트)에 대해 Sensitive Data Scanner를 활성화하려면 옵션 버튼을 클릭합니다.
1. 필요한 경우 원하는 제품에 대해 10~99%의 샘플링 레이트를 설정합니다. 샘플링이 활성화된 그룹에 스캔 규칙을 추가하는 경우 스캔된 데이터를 난독화하는 액션은 선택할 수 없습니다. 일치하는 데이터를 난독화하려면 그룹의 쿼리 필터와 일치하는 모든 데이터를 스캔하도록 선택해야 합니다.
1. **Create**를 클릭합니다.

기본적으로 새로 생성된 스캔 그룹은 비활성화되어 있습니다. 스캔 그룹을 활성화하려면 오른쪽에 있는 해당 토글을 클릭합니다.

### 스캔 규칙 추가 {#add-scanning-rules}

스캔 규칙은 스캔 그룹에서 정의한 데이터 내에서 어떤 민감한 정보를 탐지할지 결정합니다. Datadog의 Scanning Rule Library에서 미리 정의된 스캔 규칙을 추가하거나 정규식(regex) 패턴을 사용하여 사용자 지정 규칙을 만들 수 있습니다. 데이터는 수집 시 처리 과정에서 스캔됩니다. 로그의 경우 인덱싱 및 기타 라우팅 결정이 수행되기 전에 스캔이 이루어집니다.

가능한 경우 Datadog의 기본 제공 라이브러리 규칙을 사용하세요. 이러한 규칙은 이메일 주소, 신용카드 번호, API 키, 인증 토큰, 네트워크 및 장치 정보 등 일반적인 패턴을 탐지하기 위해 미리 정의된 규칙입니다. 각 규칙에는 탐지 정확도를 높이기 위한 키워드 사전에 사용할 권장 키워드가 포함되어 있습니다. 필요에 따라 [사용자 지정 키워드 추가](#add-custom-keywords)도 가능합니다.

Terraform을 사용하는 경우 [Datadog Sensitive Data Scanner 규칙][6] 리소스를 참조하세요.


스캐닝 규칙을 추가하려면 다음 단계를 따르세요.

1. [Sensitive Data Scanner][5] 설정 페이지로 이동합니다.
1. 스캔 규칙을 추가하려는 스캔 그룹을 클릭합니다.
1. **Add Scanning Rule**을 클릭합니다. 또는 페이지 오른쪽 상단의 **Add** 드롭다운 메뉴를 클릭한 다음 **Add Scanning Rule**을 선택합니다.
1. 라이브러리 규칙을 추가할지, 사용자 지정 스캔 규칙을 만들지 선택합니다.

{{% collapse-content title="라이브러리 규칙 추가" level="p" id="add-library-rules" %}}

Scanning Rule Library에는 이메일 주소, 신용카드 번호, API 키, 인증 토큰 등 일반적인 패턴을 탐지하기 위한 미리 정의된 규칙이 포함되어 있습니다.

1. 이 규칙을 스캔 그룹 내에서 생성하지 않은 경우 스캔 그룹을 선택합니다.
1. **Priority** 드롭다운 메뉴에서 비즈니스 요구 사항에 맞는 규칙의 우선순위를 선택합니다.
1. **Add Library Rules** 섹션에서 사용할 라이브러리 규칙을 선택합니다.
{{% sds-scanning-rule %}}
1. **Add Rules**를 클릭합니다.

#### 사용자 지정 키워드 추가 {#add-custom-keywords}

라이브러리 규칙을 추가하면 기본적으로 [권장 키워드][15]가 사용됩니다. 라이브러리 규칙을 추가한 후에는 각 규칙을 개별적으로 편집하여 키워드 사전에 키워드를 추가하거나 제거할 수 있습니다. 예를 들어 16자리 Visa 신용카드 번호를 스캔하는 경우 `visa`, `credit`, `card`와 같은 키워드를 추가할 수 있습니다.

1. [Sensitive Data Scanner][5] 설정 페이지로 이동합니다.
1. 편집하려는 규칙이 포함된 스캔 그룹을 클릭합니다.
1. 규칙 위로 마우스를 가져간 다음 연필 아이콘을 클릭합니다.
1. **Match Conditions** 섹션에서 **Custom Keywords**를 클릭합니다.
    - 키워드를 추가하려면 키워드를 입력한 후 더하기 아이콘을 클릭하여 목록에 추가합니다.
    - 키워드를 제거하려면 제거하려는 키워드 옆의 **X**를 클릭합니다.
    - 또한 이러한 키워드가 일치 항목으로부터 지정된 문자 수 이내에 있도록 설정할 수 있습니다. 기본적으로 키워드는 일치한 값의 앞쪽 30자 이내에 있어야 합니다.
    - 구조화된 이벤트의 경우 키워드는 이벤트 경로의 속성 이름과도 비교됩니다. 속성 이름의 `-`, `_`, `.`와 같은 구분자는 단어 경계로 간주되므로 `card` 키워드는 `card_number` 또는 `card-type`이라는 속성 이름과 일치합니다. 속성 이름 일치에는 문자 수 제한이 적용되지 않습니다.
    - **참고**: 하나의 규칙에는 최대 20개의 키워드만 추가할 수 있습니다.
1. **Type or paste event data to test the rule** 섹션에 이벤트 데이터를 추가하여 규칙을 평가하고, 키워드를 추가하여 일치 조건을 세부 조정합니다.
1. **Update**를 클릭합니다.

#### 억제 추가 {#add-suppressions}

{{% sds-suppressions %}}

{{% /collapse-content %}}
{{% collapse-content title="사용자 지정 규칙 추가" level="p" id="add-custom-rule"%}}
정규식 패턴을 사용하여 사용자 지정 스캔 규칙을 생성하여 민감한 데이터를 스캔할 수 있습니다.

1. 이 규칙을 스캔 그룹 내에서 생성하지 않은 경우 스캔 그룹을 선택합니다.
1. 규칙의 이름을 입력합니다.
1. **Priority** 드롭다운 메뉴에서 비즈니스 요구 사항에 맞는 규칙의 우선순위를 선택합니다.
1. (선택 사항) 규칙에 대한 설명을 입력합니다.
1. **Match conditions** 섹션의 **Regex pattern** 필드에 이벤트와 비교할 정규식 패턴을 지정합니다. 오탐을 줄이기 위해 가능한 한 구체적인 정규식 패턴을 정의하는 것이 좋습니다. 일반적인 패턴은 거짓 양성을 더 많이 발생시킵니다.<br>
    Sensitive Data Scanner는 Perl Compatible Regular Expressions(PCRE)를 지원하지만 다음 패턴은 지원하지 않습니다.
    - 역참조 및 캡처 하위 표현식(룩어라운드)
    - 임의의 제로폭 어설션
    - 서브루틴 참조 및 재귀 패턴
    - 조건부 패턴
    - 백트래킹 제어 동사
    - `\C` "single-byte" 지시문(UTF-8 시퀀스를 손상시키는 지시문)
    - `\R` 줄바꿈 일치
    - `\K` 일치 시작 재설정 지시문
    - 콜아웃 및 임베드 코드
    - 원자적 그룹화 및 소유형 수량자
1. **Check surrounding match context for keywords to reduce noise**의 경우 키워드를 추가하여 정규식 조건과 일치할 때 탐지 정확도를 높일 수 있습니다. 예를 들어 16자리 Visa 신용카드 번호를 스캔하는 경우 `visa`, `credit`, `card`와 같은 키워드를 추가할 수 있습니다.
    - 키워드를 추가하려면 키워드를 입력한 후 더하기 아이콘을 클릭하여 목록에 추가합니다.
    - 키워드를 제거하려면 제거하려는 키워드 옆의 **X**를 클릭합니다.
    - 또한 이러한 키워드가 일치 항목으로부터 지정된 문자 수 이내에 있도록 설정할 수 있습니다. 기본적으로 키워드는 일치한 값의 앞쪽 30자 이내에 있어야 합니다.
    - 구조화된 이벤트의 경우 키워드는 이벤트 경로의 속성 이름과도 비교됩니다. 속성 이름의 `-`, `_`, `.`와 같은 구분자는 단어 경계로 간주되므로 `card` 키워드는 `card_number` 또는 `card-type`이라는 속성 이름과 일치합니다. 속성 이름 일치에는 문자 수 제한이 적용되지 않습니다.
      **참고**: 하나의 규칙에는 최대 20개의 키워드만 추가할 수 있습니다.
{{% sds-suppressions %}}
1. **Type or paste event data to test the rule** 섹션에 이벤트 데이터를 추가하여 규칙을 평가하고, 키워드를 추가하여 일치 조건을 세부 조정합니다.
{{% sds-scanning-rule %}}
1. **Add Rule**을 클릭합니다.

{{% /collapse-content %}}

**참고**:

- 추가하거나 업데이트한 모든 규칙은 해당 규칙이 정의된 이후 Datadog으로 유입되는 데이터에만 적용됩니다.
- Sensitive Data Scanner는 Datadog Agent에서 직접 정의한 규칙에는 영향을 주지 않습니다.
- 규칙을 추가한 후에는 스캔을 시작할 수 있도록 스캔 그룹의 토글이 활성화되어 있는지 확인합니다.
- 샘플링이 활성화된 스캔 그룹에 규칙을 추가하는 경우 **Redact**, **부분 Redact** 또는 **Hash** 액션은 선택할 수 없습니다. 데이터를 완전히 난독화하려면 스캔 그룹 설정에서 샘플링을 비활성화합니다.

[Findings][8] 페이지를 사용하여 민감한 데이터를 분류하는 방법에 대한 자세한 내용은 [민감한 데이터 발견 사항 조사][7]를 참조하세요.

#### 제외되는 네임스페이스 {#excluded-namespaces}

Datadog 플랫폼의 기능을 수행하기 위해 예약된 키워드들이 있습니다. 스캔 중인 로그에 예약어가 포함되어 있는 경우 일치하는 단어 이후의 30자는 스캔 대상에서 제외되며 제거되지 않습니다. 예를 들어, 로그에서 `date`라는 단어 뒤에 오는 내용은 주로 이벤트 타임스탬프입니다. 타임스탬프가 실수로 제거되면 로그를 처리하고 추후에 쿼리하는 과정에서 문제가 발생합니다. 따라서 제외되는 네임스페이스는 제품의 기능 작동에 필수적인 중요 정보가 의도치 않게 제거되는 것을 방지합니다.

제외되는 네임스페이스 목록은 다음과 같습니다.

{{% tabs %}}
{{% tab "로그" %}}

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

{{% /tab %}}
{{% tab "스팬" %}}

- `metrics._dd.`
- `metrics.dd.`
- `metrics._dd1.`
- `metrics.otel.trace_id`
- `metrics.otlp.`
- `metrics._sampling_priority_v1`
- `metrics._sample_rate`
- `meta._dd.`
- `meta.api.endpoint.`
- `meta.dd.`
- `meta_struct.dd.`
- `meta_struct._dd.`
- `meta_struct.api.endpoint.`
- `meta_struct.appsec.`
- `meta_struct.threat_intel.results.`
- `meta.otel.trace_id`
- `meta.otel.library.`
- `meta.otlp.`
- `trace_id`
- `span_id`
- `start`
- `timestamp`
- `end`
- `duration`
- `parent_id`
- `type`
- `resource`
- `resource_hash`
- `ingest_size_in_bytes`
- `ingestion_reason`
- `error`
- `flags`
- `status`
- `chunk_id`
- `host`
- `host_id`
- `hostname`
- `env`
- `service`
- `operation_name`
- `name`
- `version`
- `meta._dd.error_tracking`
- `meta.error.fingerprint`
- `meta.issue`

{{% /tab %}}
{{% tab "RUM" %}}

- `application.id`
- `session.id`
- `session.initial_view.id`
- `session.last_view.id`
- `view.id`
- `action.id`
- `resource.id`
- `geo`
- `error.fingerprint`
- `error.binary_images.uuid`
- `issue`
- `_dd.trace_id`
- `_dd.span_id`
- `_dd.usage_attribution_tag_names`
- `_dd.error.unminified_frames`
- `_dd.error.threads`

{{% /tab %}}
{{% /tabs %}}

#### 위험이 허용된 데이터를 무시하기 위한 특정 일치 항목 억제 {#suppress-specific-matches-to-ignore-risk-accepted-data}

억제를 사용하여 운영상 안전하다고 판단되는 민감한 데이터 일치 항목(예: 내부 이메일 도메인 또는 사설 IP 범위)을 무시할 수 있습니다.

**참고**:
- 억제된 일치 항목에는 Redact, Mask 또는 Hash 작업이 적용되지 않습니다.
- 억제된 일치 항목은 Findings 페이지, 대시보드, 경고 및 기타 보고 워크플로에서 제외됩니다.
- 억제는 스캔 그룹 내의 각 규칙별로 정의됩니다.

#### 특정 속성 스캔 또는 제외 {#scan-or-exclude-specific-attributes}

일치 결과의 정확도를 높이기 위해 다음 중 하나를 수행할 수 있습니다.

- 전체 이벤트를 스캔하되 특정 속성은 스캔되지 않도록 제외합니다. 예를 들어 물리적 주소와 같은 개인 식별 정보(PII)를 스캔하는 경우 `ip_address`와 같은 속성을 제외하고 싶을 때 사용할 수 있습니다.
- 스캔 범위를 좁히기 위해 특정 속성만 스캔합니다. 예를 들어 실제 주소를 스캔하는 경우 `street` 및 `city`와 같은 특정 속성만 선택할 수 있습니다.

**참고**: 속성 이름을 지정할 때는 속성 경로에 `@` 접두사를 사용하지 마세요. 예를 들어 `@function.request.body.password` 대신 `function.request.body.password`를 사용합니다. 검색 쿼리 및 Datadog의 다른 부분에서 사용되는 `@` 접두사는 이 필드에서는 지원되지 않습니다.

### 스캔 규칙 편집 {#edit-scanning-rules}

스캔 규칙을 편집하려면 다음을 수행합니다.

1. [Sensitive Data Scanner][5] 설정 페이지로 이동합니다.
1. 편집하려는 스캔 규칙 위에 마우스를 올리고 **Edit**(연필) 아이콘을 클릭합니다.
1. 규칙에 원하는 변경 사항을 적용합니다. 편집하는 규칙 유형에 따라 각 설정 섹션에 대한 자세한 내용은 [라이브러리 규칙 추가](#add-library-rules) 또는 [사용자 지정 규칙 추가](#add-custom-rule)를 참조하세요.
1. **Update**를 클릭합니다.

## 민감한 데이터가 포함된 로그에 대한 액세스 제어 {#control-access-to-logs-with-sensitive-data}

민감한 데이터가 포함된 로그에 대한 액세스 권한을 제어하려면 Sensitive Data Scanner가 추가한 태그를 사용하여 역할 기반 액세스 제어(RBAC) 쿼리를 구성합니다. 데이터의 보존 기간이 만료될 때까지 특정 사용자 또는 팀의 액세스를 제한할 수 있습니다. 자세한 내용은 [로그에 대한 RBAC 설정 방법][9]을 참조하세요.

### 마스킹 액션 {#mask-action}

{{% sds-mask-action %}}

## 태그의 민감 데이터 삭제 {#redact-sensitive-data-in-tags}

태그에 포함된 민감한 데이터를 삭제하려면 먼저 태그를 속성으로 [재매핑][10]한 다음 해당 속성에 Redact를 적용해야 합니다. 태그를 재매핑하는 동안 태그가 유지되지 않도록 리매퍼 프로세서에서 `Preserve source attribute`를 선택 해제합니다.

태그를 속성으로 재매핑하려면 다음 단계를 수행합니다.

1. [로그 파이프라인][11]으로 이동합니다.
2. **Add Processor**를 클릭합니다.
3. 프로세서 유형 드롭다운 메뉴에서 **Remapper**를 선택합니다.
4. 프로세서 이름을 입력합니다.
5. **Tag key(s)**를 선택합니다.
6. 태그 키를 입력합니다.
7. 태그 키를 재매핑할 속성 이름을 입력합니다.
8. **Preserve source attribute**를 비활성화합니다.
9. **Create**를 클릭합니다.

속성을 삭제하려면 다음 단계를 수행합니다.

1. [스캔 그룹][5]으로 이동합니다.
2. **Add Scanning Rule**을 클릭합니다.
3. 사용할 라이브러리 규칙을 선택합니다.
4. **Scan entire event or portion of it**에서 **Specific Attributes**를 선택합니다.
5. 앞에서 생성한 속성 이름을 입력하여 해당 속성을 스캔 대상으로 지정합니다. **참고**: 속성 경로에는 `@` 접두사를 사용하지 마세요. 예를 들어 `@function.request.body.password` 대신 `function.request.body.password`를 사용합니다. 
6. 일치하는 항목이 발견되었을 때 취할 액션을 선택합니다.
7. 필요에 따라 태그를 추가합니다.
8. **Add Rules**를 클릭합니다.

## 로그 리하이드레이션 {#log-rehydration}

아카이브에서 로그를 리하이드레이션할 때 Sensitive Data Scanner는 해당 로그를 다시 스캔하지 않습니다. 대신 Datadog은 로그를 아카이브에 기록된 그대로 복원합니다.

아카이브가 [Datadog 태그][16]를 포함하도록 구성되어 있고, Sensitive Data Scanner가 로그를 처음 수집 및 처리할 때 스캔 규칙에서 태그를 추가했다면, 이러한 태그를 사용하여 이전에 민감한 데이터가 포함되어 있었던 리하이드레이션된 로그를 식별할 수 있습니다. 이를 통해 `sensitive_data:<rule_tag_name>`과 같은 쿼리를 사용하여 리하이드레이션된 로그를 필터링할 수 있습니다.

일치한 민감한 데이터의 메타데이터는 아카이브된 로그에 저장되지 않으므로, 리하이드레이션된 로그에서는 민감한 데이터 일치 항목이 강조 표시되지 않습니다. 아카이브 형식에는 원본 로그 페이로드와 유지된 태그만 포함됩니다. Sensitive Data Scanner가 Datadog UI에서 탐지된 값을 시각적으로 강조 표시하는 데 사용하는 위치 정보는 포함되지 않습니다.

리하이드레이션된 로그에서 가능한 작업은 다음과 같습니다.

- 아카이브에 태그가 포함된 경우 이전에 스캔 규칙과 일치했던 로그를 필터링할 수 있습니다.
- 민감한 데이터가 포함된 과거 이벤트를 조사할 수 있습니다.

리하이드레이션된 로그에서 **불가능한** 작업은 다음과 같습니다.

- UI에서 민감한 데이터 일치 항목을 인라인으로 강조 표시하여 확인할 수 없습니다. 일치 시 액션으로 Mask, Redact, 부분 Redact 또는 Hash를 선택했더라도 일치 항목은 계속 난독화된 상태로 유지됩니다.
- 소급 스캔을 실행할 수 없습니다. Sensitive Data Scanner는 리하이드레이션된 로그를 다시 스캔하지 않습니다.

## Sensitive Data Scanner 비활성화 {#disable-sensitive-data-scanner}

Sensitive Data Scanner를 완전히 끄려면 각 스캔 그룹의 토글을 **off**로 설정합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/#compliance
[2]: /ko/account_management/rbac/
[3]: /ko/logs/explorer/search_syntax/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[5]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[7]: /ko/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
[8]: https://app.datadoghq.com/sensitive-data-scanner/telemetry
[9]: /ko/logs/guide/logs-rbac/
[10]: /ko/logs/log_configuration/processors/remapper/
[11]: https://app.datadoghq.com/logs/pipelines
[12]: /ko/observability_pipelines/
[13]: /ko/observability_pipelines/processors/sensitive_data_scanner/
[14]: /ko/observability_pipelines/configuration/set_up_pipelines/
[15]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/
[16]: /ko/logs/log_configuration/archives/?tab=awss3#datadog-tags