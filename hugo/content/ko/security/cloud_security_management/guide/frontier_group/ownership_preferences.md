---
further_reading:
- link: /security/cloud_security_management/guide/frontier_group/
  tag: 설명서
  text: Cloud Security 프런티어 그룹
- link: /integrations/guide/reference-tables/
  tag: 설명서
  text: Reference Tables
title: 소유권 기본 설정
---
## 개요 {#overview}

Ownership Agent는 보안 관련 탐지 결과가 있는 클라우드 리소스의 하위 집합을 선택하고 각 리소스의 소유자를 추론합니다. 기본적으로 클라우드 리소스 태그, 서비스 카탈로그 데이터 및 기타 데이터 소스를 사용하여 소유권을 추론합니다.

**소유권 기본 설정**을 사용하면 사용자의 자체 규칙을 제공하여 이 프로세스를 맞춤 설정할 수 있습니다. 이러한 규칙은 Datadog [참조 표][1]에 저장되며, Ownership Agent는 이를 자동으로 읽고 탐지 결과를 향상시킵니다.

## 소유권 기본 설정 파일 생성 {#create-an-ownership-preference-file}

1. 아래 설명된 형식에 따라 CSV 파일을 생성합니다. 필요시, AI 코딩 어시스턴트와 함께 [Ownership Agent AI 기술][5]을 사용하여 CSV를 대화식으로 생성할 수 있습니다.
2. [](#upload-your-ownership-preferences)을 업로드하여 `k9_ownership_preferences`라는 이름의 참조 표로 만듭니다. 기본 설정은 24시간 이내에 적용됩니다.

### 기본 설정 유형 {#preference-types}

참조 표의 각 행이 하나의 기본 설정을 구성합니다. `preference_type`열은 해당 행의 기능을 결정합니다.

| 유형          | 기능                                                   |
|---------------|----------------------------------------------------------------|
| `tag_mapping` | 리소스에 일치하는 태그가 있을 때, 지정된 소유자를 할당합니다 |
| `exclusion`   | 특정 핸들이 소유자로 할당되지 않도록 방지합니다    |
| `prompt_text` | AI 추론 엔진에 대한 사용자 정의 지침을 제공합니다             |

### 태그 매핑 {#tag-mappings}

태그 매핑은 다음과 같은 규칙을 정의합니다. _"리소스에 `X:Y` 태그가 있으면 해당 태그는 이 소유자에게 속합니다."_

Ownership Agent는 클라우드 리소스 태그를 사용자의 매핑과 비교합니다. 일치하는 항목을 찾으면 지정된 소유자를 후보로 추가합니다. 하나의 리소스가 여러 태그 매핑과 일치할 수 있으며, 이 경우 여러 후보가 생성됩니다. Ownership Agent는 이러한 후보와 다른 데이터 소스의 순위를 매깁니다.

태그 매핑은 기존 소유권 데이터 소스를 보완합니다. 이미 리소스에 존재하는 직접 소유권 태그(예: `dd-team`)는 재정의하지 않습니다.

#### 열 {#columns}

| 열                 | 설명                                                                |
|------------------------|----------------------------------------------------------------------------|
| `preference_type`      | `tag_mapping`                                                      |이어야 합니다
| `tag_key`              | 일치 여부를 확인할 태그 키(예: `cost-center`, `project`)                   |
| `tag_value`(선택 사항) | 일치 여부를 확인할 태그입니다. 비워 두면 해당 태그 키의 모든 값과 일치하는 것으로 처리됩니다(와일드카드) |
| `owner`                | 할당할 소유자(예: `team-platform`, `alice@example.com`)        |
| `owner_type`           | 소유자 유형: `team`, `user` 또는 `service`                                |
| `confidence`           | 이 태그 매핑이 나타내는 소유권 신뢰 수준: `high`, `medium` 또는 `low`  |

#### 소유자 유형 {#owner-type}

`owner_type` 필드는 소유자가 어떤 종류의 엔터티인지 Ownership Agent에게 알려줍니다. 이는 AI 엔진이 후보의 순위를 매길 때 더 나은 결정을 내리는 데 도움이 됩니다.

| 값 | 사용 시점 |
| --- | --- |
| `team` | 소유자가 팀 핸들인 경우(예: `team-platform`, `sre-team`) |
| `user` | 소유자가 개인인 경우(예: `alice@example.com`) |
| `service` | 소유자가 서비스 또는 자동화 계정인 경우(예: `payment-svc`) |

#### 일치 동작 {#matching-behavior}

- 태그 키와 값은 **대소문자를 구분하지 않고** 일치 여부를 확인합니다. 예를 들어 `Cost-Center`는 `cost-center`와 일치합니다.
- `tag_value`를 비워 두면 해당 태그 키의 **모든 값**과 일치하는 것으로 처리됩니다(와일드카드).
- 여러 매핑이 일치하는 경우 모두 후보를 생성합니다. Ownership Agent는 신뢰 수준에 따라 순위를 매깁니다.

#### 신뢰도 수준 {#confidence-levels}

| 수준 | 사용 시점|
| --- | --- |
| `high` | 담당자를 신뢰성 있게 식별할 수 있는 태그입니다. 예: 팀에 1:1로 매핑되는 `cost-center` 태그 |
| `medium` | 유용한 지표이지만 항상 정확한 것은 아닌 태그입니다. 예: 여러 팀에서 공유하는 `project` 태그|
| `low` | 힌트를 제공하지만 추가적인 근거가 필요한 태그입니다. 예: 팀과 느슨한 상관관계가 있는 `env` 태그 |

#### 예: 비용 센터를 팀에 매핑{#example-map-cost-centers-to-teams}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
2,tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
3,tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
```

#### 예: 프로젝트를 소유자에 매핑{#example-map-projects-to-owners}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,project,atlas,team-atlas,team,medium,,,,,
2,tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
3,tag_mapping,project,payments,team-fintech,team,high,,,,,
```

#### 예: `managed-by` 태그가 있는 모든 리소스와 와일드카드 일치{#example-wildcard-match-any-resource-with-a-managed-by-tag}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,managed-by,,team-infra,team,low,,,,,
```

이 태그 매핑은 `managed-by` 태그의 모든 값과 일치하며, 낮은 신뢰도로 `team-infra`에 할당됩니다. 신뢰도가 낮기 때문에 더 강력한 데이터 소스가 우선합니다.

### 제외 {#exclusions}

제외 규칙은 Ownership Agent에게 다음과 같은 규칙을 정의합니다. "이 핸들은 절대 리소스 소유자로 할당하지 않는다."

봇 계정, CI 러너 및 공유된 서비스 계정은 종종 클라우드 리소스 메타데이터(예: 생성자 또는 마지막 수정자로)에 나타납니다. 제외는 이러한 항목을 소유권 결과에서 제거하여 실제 소유자만 표시되도록 합니다.

#### 열 {#columns-1}

| 열                               | 설명                                                                                                                  |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `preference_type`                    | `exclusion`                                                                                                          |이어야 합니다
| `handle`                             | 제외할 소유자 핸들(예: `deploy-bot`, `ci-runner`)                                                             |
| `exclusion_type`(선택 사항)          | 특정 소유자 유형(`team`, `user` 또는 `service`)에만 제외를 적용합니다. 비워 두면 모든 유형에 적용됩니다       |
| `exclusion_resource_type`(선택 사항) | 특정 리소스 유형(예: `aws_ec2_instance`)에만 제외를 적용합니다. 비워 두면 모든 리소스 유형에 적용됩니다 |

#### 일치 동작 {#matching-behavior-1}

-  `handle`은 **대소문자를 구분하지 않고** 일치 여부를 확인합니다.
- 선택적 필터는 **AND** 논리를 사용합니다. 제외 규칙이 적용되려면 비어 있지 않은 모든 필터가 일치해야 합니다.
-  `exclusion_type` 및 `exclusion_resource_type`을 비워 두면 해당 핸들이 모든 결과에서 제외됩니다(가장 일반적인 사용 방식).

#### 예: 모든 결과에서 일반 봇 계정 제외 {#example-exclude-common-bot-accounts-from-all-results}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,deploy-bot,,,,
2,exclusion,,,,,,ci-runner,,,,
3,exclusion,,,,,,github-actions,,,,
4,exclusion,,,,,,terraform-automation,,,,
```

#### 예: 특정 리소스 유형에 대해서만 서비스 계정 제외 {#example-exclude-a-service-account-only-for-specific-resource-types}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,k8s-node-controller,service,aws_ec2_instance,,
2,exclusion,,,,,,autoscaler-svc,service,aws_ec2_instance,,
```

이 제외는 EC2 인스턴스에만 적용됩니다. 따라서 다른 리소스 유형에서는 동일한 핸들을 소유자로 사용할 수 있습니다.

#### 예: 특정 리소스 유형에 대한 팀 핸들 제외 {#example-exclude-a-team-handle-for-a-specific-resource-type}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
```

이 규칙은 `legacy-ops`가 EC2 인스턴스의 팀 후보로 나타나는 경우에만 제외합니다. S3 버킷이나 다른 리소스 유형에서는 여전히 후보로 고려됩니다.

### 사용자 정의 프롬프트 텍스트 {#custom-prompt-text}

사용자 정의 프롬프트 텍스트는 AI 추론 엔진에 대한 자유 형식의 지침을 제공합니다. AI가 더 나은 소유권 결정을 내리는 데 도움이 되는 조직적 맥락을 공유하는 데 사용할 수 있습니다. 예를 들어 명명 규칙, 팀 구조 또는 우선순위를 두어야 할 데이터 소스 등이 있습니다.

최대 **3**개의 프롬프트 텍스트 항목을 각 우선순위 수준(`high`, `medium`, `low`)마다 하나씩 제공할 수 있습니다. 우선순위 수준이 같은 항목은 연결됩니다. 우선순위를 사용하여 AI 엔진이 먼저 고려할 지침을 제어하세요.

#### 열 {#columns-2}

| 열                | 설명                                                                                       |
|-----------------------|---------------------------------------------------------------------------------------------------|
| `preference_type`     | `prompt_text`                                                                             |여야 합니다
| `prompt_text`         | 지침 텍스트(항목당 최대 4,096바이트)                                                  |
| `priority`(선택 사항) | 순서 제어: `high`, `medium`, `low` 순으로 고려됩니다. 기본값: `low` |

#### 효과적인 지침 작성을 위한 팁 {#tips-for-writing-effective-guidance}

- 구체적이고 실행 가능해야 합니다. "`cost-center` 태그는 가장 신뢰할 수 있는 소유권 신호입니다"가 "태그를 사용하세요"보다 효과적입니다.
- 팀 명명 규칙, 특정 태그 해석 방법 등 조직의 규칙을 설명하세요.
- 소유자로 지정되어서는 안 되는 계정을 명시하세요. 또한 이러한 계정이 제외되도록 제외 행에 추가하세요.
- 우선순위 수준당 하나의 항목을 사용하여 중요도에 따라 지침을 정리하세요.

#### 예: 우선순위에 따라 구성된 조직별 컨텍스트 {#example-organization-specific-context-split-by-priority}

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
2,prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions terraform-automation) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
3,prompt_text,,,,,,,,For container images the repository owner in our GitHub organization is a reliable secondary signal when cost-center tags are missing.,low
```

### 참조 표 형식 {#reference-table-format}

#### 열 스키마 {#column-schema}

참조 표는 `k9_ownership_preferences`라는 이름을 가져야 하며 다음 12개의 열을 포함해야 합니다.

| 열                    | 유형   | 설명                                                                         |
|---------------------------|--------|-------------------------------------------------------------------------------------|
| `id`                      | 문자열 | **모든 행에 필요합니다.** 행의 고유 식별자입니다. 기본 키로 사용됩니다   |
| `preference_type`         | 문자열 | **모든 행에 필요합니다.** 행 유형: `tag_mapping`, `exclusion` 또는 `prompt_text`   |
| `tag_key`                 | 문자열 | 일치 여부를 확인할 태그 키(태그 매핑 전용)                                                |
| `tag_value`               | 문자열 | 일치 여부를 확인할 태그 값. 와일드카드로 비워 두세요(태그 매핑 전용)                   |
| `owner`                   | 문자열 | 할당할 소유자 핸들(태그 매핑 전용)                                          |
| `owner_type`              | 문자열 | 소유자 유형: `team`, `user` 또는 `service`(태그 매핑 전용)                        |
| `confidence`              | 문자열 | 신뢰 수준: `high`, `medium` 또는 `low`(태그 매핑 전용)                    |
| `handle`                  | 문자열 | 제외할 소유자 핸들(제외 전용)                                           |
| `exclusion_type`          | 문자열 | 제외할 소유자 유형 필터. 모든 유형을 제외하려면 비워 두세요(제외 전용) |
| `exclusion_resource_type` | 문자열 | 제외할 리소스 유형 필터. 모두 제외하려면 비워 두세요(제외 전용)    |
| `prompt_text`             | 문자열 | 안내 텍스트(프롬프트 텍스트 전용)                                                    |
| `priority`                | 문자열 | 우선순위 지정: `high`, `medium` 또는 `low`(프롬프트 텍스트 전용)                    |

각 행은 `preference_type`에 따라 열의 하위 집합을 사용합니다. 사용하지 않는 열은 비워 두세요.

#### 기본 설정 유형별 열 사용 여부 {#column-usage-by-preference-type}

| 열 | `tag_mapping` | `exclusion` | `prompt_text` |
| --- | --- | --- | --- |
| `id` | 필수 | 필수 | 필수 |
| `preference_type` | `"tag_mapping"` | `"exclusion"` | `"prompt_text"` |
| `tag_key` | 필수 | — | — |
| `tag_value` | 선택 사항(비어 있으면 와일드카드를 의미함) | — | — |
| `owner` | 필수 | — | — |
| `owner_type` | 필수 | — | — |
| `confidence` | 필수 | — | — |
| `handle` | — | 필수 | — |
| `exclusion_type` | — | 선택 사항 | — |
| `exclusion_resource_type` | — | 선택 사항 | — |
| `prompt_text` | — | — | 필수 |
| `priority` | — | — | 선택 사항 |

### 완전한 예 {#complete-example}

3가지 기본 설정이 모두 포함되어 바로 사용 가능한 CSV:

```text
id,preference_type,tag_key,tag_value,owner,owner_type,confidence,handle,exclusion_type,exclusion_resource_type,prompt_text,priority
1,tag_mapping,cost-center,CC-100,team-platform,team,high,,,,,
2,tag_mapping,cost-center,CC-200,team-data-eng,team,high,,,,,
3,tag_mapping,cost-center,CC-300,team-security,team,high,,,,,
4,tag_mapping,project,atlas,team-atlas,team,medium,,,,,
5,tag_mapping,project,hermes,alice@example.com,user,medium,,,,,
6,tag_mapping,env,production,sre-team,team,low,,,,,
7,tag_mapping,managed-by,,team-infra,team,low,,,,,
8,exclusion,,,,,,deploy-bot,,,,
9,exclusion,,,,,,ci-runner,service,,,
10,exclusion,,,,,,github-actions,service,,,
11,exclusion,,,,,,legacy-ops,team,aws_ec2_instance,,
12,prompt_text,,,,,,,,Our organization assigns ownership by cost center. The cost-center tag is the primary ownership signal for all cloud resources. Team identifiers always use the team- prefix followed by the team name (e.g. team-platform team-data-eng).,high
13,prompt_text,,,,,,,,Shared infrastructure accounts (deploy-bot ci-runner github-actions) are automation accounts and should never be assigned as resource owners. Look for the human or team that configured the automation instead.,medium
14,prompt_text,,,,,,,,For container images the repository owner in GitHub is a reliable secondary signal when cost-center tags are missing.,low
```

## 유효성 검사 규칙 {#validation-rules}

Ownership Agent는 참조 표를 읽을 때 모든 기본 설정 데이터를 검증합니다. **유효성 검사는 전부 또는 전무(all-or-nothing) 방식으로 수행됩니다.** 하나의 행이라도 유효성 검사를 통과하지 못하면 Ownership Agent는 해당 동기화 주기의 **전체** 기본 설정 세트를 거부합니다. 이 경우 유효한 기본 설정 세트가 업로드될 때까지 기본 설정이 비어 있는 상태로 유지됩니다.

이처럼 엄격한 접근 방식을 사용하면 일관되고 완전히 유효한 기본 설정 세트만 사용할 수 있습니다.

### 허용된 문자 {#allowed-characters}

필드마다 허용되는 문자 집합이 다릅니다.

| 필드 유형 | 허용된 문자 | 적용 대상 |
| --- | --- | --- |
| 구조화된 필드 | 문자, 숫자, `-` `_` `.` `:` `/` `@` | `tag_key`, `owner`, `handle`, `exclusion_type`, `exclusion_resource_type`, `owner_type`, `confidence`, `priority` |
| 태그 값 | 구조화된 필드와 동일하지만 공백이 추가되어 있습니다 | `tag_value` |
| 프롬프트 텍스트 | 문자, 숫자, `-` `_` `.` `:` `/` `@` `#` `,` `;` `!` `?` `(` `)` `'` `"` `` ` `` 공백, 탭, 줄 바꿈 | `prompt_text` |

#### 주요 제한 사항 {#notable-restrictions}

- **꺾쇠괄호**(`<`, `>`)는 프롬프트 텍스트를 포함한 모든 필드에서 **허용되지 않습니다**.
- **중괄호**(`{`, `}`)는 어떤 필드에서도 **허용되지 않습니다**.
- **수직선**(`|`)은 어떤 필드에서도 **허용되지 않습니다**.

이러한 제한 사항은 서식 관련 아티팩트를 방지하고 AI 엔진이 데이터를 깔끔하게 처리할 수 있도록 합니다.

### 크기 제한 {#size-limits}

| 제한                               | 값                                                                              |
|-------------------------------------|------------------------------------------------------------------------------------|
| 최대 태그 매핑 수                | 50행                                                                            |
| 최대 제외 규칙 수                  | 20행                                                                            |
| 최대 프롬프트 텍스트 항목 수         | 3행(우선순위 수준당 1개)                                                |
| 필드당 최대 바이트 수             | 1,024바이트(태그 키, 태그 값, 소유자, 핸들 및 유사한 필드에 적용됨) |
| 프롬프트 텍스트 항목당 최대 바이트 수 | 4,096바이트 |

### 중복 탐지 {#duplicate-detection}

Ownership Agent는 충돌하거나 중복된 항목이 포함된 전체 기본 설정 세트를 거부합니다.

- **태그 매핑**: `tag_key`와 `tag_value`는 같지만 `owner`가 다른 두 행은 충돌로 간주됩니다. `tag_key`, `tag_value`, `owner`가 같지만 `confidence` 수준이 다른 두 행도 충돌로 간주됩니다. 모든 필드가 동일한 완전한 중복은 허용됩니다.
- **제외 규칙**: `handle`, `exclusion_type`, `exclusion_resource_type`이 같은 두 행은 중복으로 간주됩니다. 비교 시 대소문자는 구분하지 않습니다.

Ownership Agent는 충돌이나 중복을 하나라도 탐지하면 전체 기본 설정을 거부합니다.

### 프롬프트 텍스트 작성 가이드라인 {#content-guidelines-for-prompt-text}

AI 엔진은 프롬프트 텍스트를 조직별 컨텍스트로 처리합니다. 효과적인 가이드라인을 제공하려면 다음 사항을 따르세요.

- **평이한 서술문 사용하기**: 조직에 대한 사실을 설명하는 문장을 작성하세요.
- **특수한 서식을 사용하지 않기**: Markdown 제목, HTML 태그 및 XML 유사 태그는 처리 과정에서 제거됩니다.
- **소유권 데이터 소스에 집중하기**: 소유권을 나타내는 태그, 명명 규칙 또는 팀 구조를 설명하세요.

#### 예 {#examples}

- "비용 센터 태그는 모든 클라우드 리소스의 소유권을 식별하는 가장 신뢰할 수 있는 신호입니다."
- "팀 식별자는 항상 team- 접두사를 사용합니다(예: team-platform, team-data-eng)."
- "us-east-1/prod 계정의 리소스는 team-sre에 의해 관리됩니다."

## 소유권 기본 설정 업로드 {#upload-your-ownership-preferences}

Datadog은 기본 설정을 [참조 표][1]로 저장합니다. 이 표 이름은 `k9_ownership_preferences`여야 하며, 12개의 열 헤더를 모두 포함해야 합니다. 일부 행은 비어 있더라도 무관합니다.

표를 생성하고 업데이트하는 방법은 여러 가지가 있습니다.

### 옵션 1: 수동 CSV 업로드(Datadog UI) {#option-1-manual-csv-upload-datadog-ui}

이 방법은 업로드가 처음이거나 가끔씩 업데이트하는 경우에 가장 적합합니다.

1. CSV 파일을 준비하세요(자세한 내용은 [완전한 예](#complete-example)를 참조하세요).
2. Datadog에서 **Integrations** > [**Reference Tables**][6]로 이동합니다.
3. New Reference Table**을 클릭합니다.**
4. CSV 파일을 업로드합니다.
5. 표 이름을 `k9_ownership_preferences`로 설정하세요.
6. 기본 키로 `id`를 선택하세요.
7. **Save**를 클릭합니다.

참조 표를 업데이트할 때 내용을 완전히 교체하려면 동일한 표에 새 CSV를 업로드하세요.

수동 업로드는 최대 4MB의 파일을 지원합니다.

### 옵션 2: 클라우드 스토리지 동기화(S3, Azure Blob, GCS) {#option-2-cloud-storage-sync-s3-azure-blob-gcs}

이 방법은 정기적인 자동 업데이트에 가장 적합합니다. Datadog이 CSV를 주기적으로 가져올 수 있도록 클라우드 스토리지 버킷에 CSV 파일을 저장하세요.

1. CSV를 **Amazon S3 버킷**, **Azure Blob Storage 컨테이너** 또는 **Google Cloud Storage 버킷**에 업로드하세요.
2. Datadog에서 **Integrations** > [**Reference Tables**][6]로 이동합니다.
3. **New Reference Table**을 클릭하고 **Cloud Storage**를 소스로 선택합니다.
4. 저장 경로와 자격 증명(IAM 역할은 S3, 연결 문자열은 Azure, 서비스 계정은 GCS)을 제공하세요.
5. 표 이름을 `k9_ownership_preferences`로 설정하세요.
6. 기본 키로 `id`를 선택하세요.
7. **Save**를 클릭합니다.

Datadog이 파일을 주기적으로 다시 가져오므로, 버킷에 있는 CSV는 변경 사항이 자동으로 반영됩니다.

클라우드 스토리지 업로드는 최대 200MB의 파일을 지원합니다.

각 클라우드 공급자에 대한 자세한 설정 지침은 [Reference Tables 문서][1]를 참조하세요.

### 옵션 3: Terraform {#option-3-terraform}

이 방법은 다른 Datadog 리소스와 함께 기본 설정을 IaC 방식으로 관리하는 데 가장 적합합니다.

[Datadog Terraform 공급자][2]는 참조 표를 지원합니다. 이를 사용하여 표를 선언형 방식으로 생성하고 업데이트할 수 있습니다.

자세한 내용은 Datadog Terraform 공급자 문서의 [datadog_reference_table(리소스)][7]를 참조하세요.

### API {#api}

참조 표는 [Reference Tables API][3]를 통해 프로그래밍 방식으로 관리할 수도 있습니다. 사용 가능한 엔드포인트에 대한 API 문서를 참조하세요.

해당되는 경우 `api.datadoghq.com`을 [Datadog 사이트 URL][4]로 교체하세요(예: `api.datadoghq.eu`, `api.us3.datadoghq.com`).

## 기본 설정이 적용되는 과정 {#when-preferences-take-effect}

1. 참조 표를 업로드하거나 업데이트합니다.
2. Ownership Agent가 표를 주기적으로 읽습니다 (조직당 하루에 약 한 번).
3. Ownership Agent가 표의 기본 설정을 검증합니다. 검증이 통과하면 새로운 기본 설정이 이전 세트를 대체합니다.
4. 각 리소스에 대한 소유권 추론이 실행될 때 다음 작업이 수행됩니다.
   - **태그 매핑**은 태그 규칙에 따라 소유권 후보를 추가합니다.
   - **제외 규칙**은 결과에서 원하지 않는 핸들을 제거합니다.
   - **사용자 정의 프롬프트 텍스트**는 AI 추론 엔진을 안내합니다.
5. 업데이트된 결과는 Cloud Security Posture Management UI에 나타납니다.

참조 표에 대한 변경 사항은 **24시간** 이내에 적용됩니다.

<div class="alert alert-info">표에서 모든 행을 삭제하여 비워두면 Ownership Agent가 이전의 기본 설정을 적극적으로 삭제합니다. 참조 표를 완전히 삭제하는 것도 동일한 효과가 있습니다. 캐시된 기본 설정이 만료되어 빈 상태가 됩니다.</div>

## 문제 해결 {#troubleshooting}

유효성 검사는 전부 또는 전무(all-or-nothing) 방식으로 수행됩니다. 하나의 행이라도 문제가 있으면 Ownership Agent가 전체 기본 설정을 거부하고 유효한 세트를 업로드할 때까지 기본 설정을 빈 상태로 유지합니다.

| 문제                                  | 예상 원인                      | 해결 방법                                                                                                                                                                                                                     |
|------------------------------------------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 기본 설정이 24시간 후에 적용되지 않음 | 표 이름이 잘못됨               | 정확히 `k9_ownership_preferences`                                                                                                                                                                              |여야 합니다.
| 기본 설정이 24시간 후에 적용되지 않음 | 열 헤더가 누락됨            | 12개 열 모두가 CSV 헤더에 포함되어 있어야 합니다. 일부 행은 비어 있더라도 무관합니다.                                                                                                                                                 |
| 기본 설정이 24시간 후에 적용되지 않음 | 조직에 이 기능이 활성화되어 있지 않음  | 소유권 기본 설정을 활성화하려면 [Datadog 지원팀][8]에 문의하세요.                                                                                                                                                            |
| 모든 기본 설정이 거부됨                 | 잘못된 문자가 포함된 필드가 있음   | [허용된 문자](#allowed-characters)를 참조하세요. 꺾쇠괄호, 중괄호 및 수직선은 허용되지 않습니다.                                                                                                      |
| 모든 기본 설정이 거부됨                 | 필수 필드가 누락된 행이 있음 | 태그 매핑에는 `tag_key`, `owner`, `owner_type`, `confidence`, 제외에는 `handle`; 프롬프트 텍스트 항목에는 `prompt_text`가 입력되어 있는지 확인하세요.                                                            |
| 모든 기본 설정이 거부됨                 | 중복되거나 충돌하는 행이 있음     | `tag_key`와 `tag_value`가 같지만 `owner` 또는 `confidence` 값이 다른 두 태그 매핑은 거부를 초래합니다. 제외 규칙이 완전히 중복되어도 거부를 초래합니다. [중복 탐지](#duplicate-detection) |를 참조하세요.
| 모든 기본 설정이 거부됨                 | 유효하지 않은 `confidence` 값        | 정확히 `high`, `medium` 또는 `low`                                                                                                                                                                              |여야 합니다.
| 모든 기본 설정이 거부됨                 | 유효하지 않은 `owner_type` 값        | 반드시 `team`, `user` 또는 `service`여야 합니다(대소문자 구분 없음). |
| 모든 기본 설정이 거부됨                 | 크기 제한을 초과함               | 행의 개수(태그 매핑 수 50개, 제외 규칙 수 20개, 프롬프트 텍스트 항목 3개) 및 필드 길이(필드당 1,024바이트, 프롬프트 항목당 4,096 바이트)를 확인하세요. |
| 모든 기본 설정이 거부됨                 | 프롬프트 텍스트 서식            | Markdown 제목 및 HTML/XML 태그는 처리 중에 제거됩니다. 일반 텍스트만 사용하세요.                                                                                                                                 |
| 태그 매핑이 리소스와 일치하지 않음      | 철자 불일치                 | 일치는 대소문자를 구분하지 않지만, 리소스에서 정확한 태그 키와 값을 확인하세요.                                                                                                                                   |
| 제외 규칙이 적용되지 않음                    | 범위 지정 필터가 너무 제한적임        | 값이 입력된 모든 필드가 일치해야 합니다(AND 논리). 더 광범위하게 제외하려면 `exclusion_type` 및 `exclusion_resource_type`을 비워 두세요.                                                                                            |
| 기본 설정이 예상치 않게 삭제됨         | 표가 비워졌거나 삭제됨      | 참조 표를 비우거나 삭제하면 캐시된 기본 설정이 만료됩니다. 기본 설정을 복원하려면 유효한 CSV를 업로드하세요. |

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/guide/reference-tables/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[3]: /ko/api/latest/reference-tables/
[4]: /ko/getting_started/site/
[5]: https://github.com/datadog-labs/agent-skills/tree/main/dd-security/csm/ownership-agent
[6]: https://app.datadoghq.com/reference-tables
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/reference_table
[8]: /ko/help