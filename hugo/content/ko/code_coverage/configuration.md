---
description: 리포지토리 내 구성 파일로 코드 커버리지 동작을 구성합니다.
further_reading:
- link: /code_coverage
  tag: 설명서
  text: Code Coverage
- link: /code_coverage/setup
  tag: 설명서
  text: Code Coverage 설정
- link: /code_coverage/flags
  tag: 설명서
  text: 플래그로 커버리지 데이터 구성
- link: /code_coverage/carryforward
  tag: 설명서
  text: 이월을 통한 정확한 전체 커버리지 유지
title: Code Coverage 구성
---
## 개요 {#overview}

리포지토리 루트에 `code-coverage.datadog.yml` 또는 `code-coverage.datadog.yaml`이라는 이름의 구성 파일을 생성하여 Code Coverage 동작을 구성할 수 있습니다.

구성 파일 예시:

```yaml
schema-version: v1
services:
  - id: frontend
    paths:
      - frontend/
      - shared/ui/**
  - id: backend-api
    paths:
      - backend/api/**
      - backend/.*\.go
ignore:
  - "test/**/*"
  - "**/*.pb.go"
gates:
  - type: total_coverage_percentage
    config:
      threshold: 85
  - type: patch_coverage_percentage
    config:
      threshold: 95
comments:
  enabled: true
  file_breakdown: true
```

## 서비스 구성 {#services-configuration}

<div class="alert alert-info"><a href="/code_coverage/monorepo_support#software-catalog-integration">Catalog 통합</a> 사용은 서비스 정의를 위한 권장 방법입니다. Catalog에 구성된 코드 위치는 여러 Datadog 제품에서 사용할 수 있습니다. Catalog 통합이 불가능할 때만 수동 구성을 사용하세요.</div>

구성 파일에서 서비스를 정의하여 모노레포에서 서비스별로 커버리지 데이터를 분할할 수 있습니다. 여러 프로젝트나 팀이 하나의 리포지토리를 공유하고 각 서비스별로 커버리지 메트릭을 독립적으로 조회하고 싶을 때 유용합니다.

```yaml
schema-version: v1
services:
  - id: frontend
    paths:
      - frontend/**
      - shared/ui/**
  - id: backend-api
    paths:
      - backend/api/**
```

- `schema-version` (필수): `v1`이어야 합니다.
- `services`: 서비스 정의 목록
  - `id` (필수): 서비스의 고유 식별자
  - `paths` (필수): 이 서비스에 속하는 경로 패턴 목록(자세한 내용은 [패턴 구문](#pattern-syntax) 참조)

Catalog 통합 및 코드 소유자 기반 분할을 포함한 모노레포 지원에 대한 자세한 내용은 [모노레포 지원][1]을 참조하세요.

### 예시 {#examples}

{{% collapse-content title="JavaScript/TypeScript 모노레포" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: web-app
    paths:
      - packages/web/**
      - packages/shared/ui/**
  - id: mobile-app
    paths:
      - packages/mobile/**
      - packages/shared/core/**
  - id: admin-dashboard
    paths:
      - packages/admin/**
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="다국어 모노레포" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: backend-service
    paths:
      - services/backend/**
      - services/backend/.*\.go
  - id: frontend-web
    paths:
      - services/frontend/**
      - services/frontend/.*\.(ts|tsx)
  - id: data-processing
    paths:
      - services/data/**
      - scripts/.*\.py
{{< /code-block >}}
{{% /collapse-content %}}

## 경로 무시 {#ignoring-paths}

`ignore` 필드를 사용하여 코드 커버리지 보고에서 특정 파일이나 디렉터리를 제외할 수 있습니다. 테스트 파일, 생성된 코드, 벤더 의존성, 커버리지 메트릭에 포함되지 않아야 하는 기타 파일을 제외할 때 유용합니다. 경로 패턴은 glob, 정규식 및 접두사 일치를 지원합니다(자세한 내용은 [패턴 구문](#pattern-syntax) 참조).

```yaml
ignore:
  - "test/**/*"           # Exclude all files in test directory
  - "*.pb.go"             # Exclude all protobuf generated files
  - "vendor/"             # Exclude vendor directory
```

### 예외 {#exceptions}

패턴 앞에 `!`를 추가하여 ignore 규칙의 예외를 만들 수 있습니다. 이를 통해 원래 제외될 파일이나 폴더를 포함할 수 있습니다.

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
```

**중요**: 부정 패턴이 긍정 패턴보다 우선합니다. 부정 패턴과 일치하는 파일 경로는 무시되지 _않습니다_.

### 예시 {#examples-1}

{{% collapse-content title="테스트 파일 및 생성 코드 제외" level="h4" %}}

```yaml
ignore:
  - "**/*_test.go"        # Exclude Go test files
  - "**/*.pb.go"          # Exclude protobuf files
  - "vendor/"             # Exclude vendor directory
  - "mocks/"              # Exclude mock files
```
{{% /collapse-content %}}

{{% collapse-content title="예외를 포함하여 제외" level="h4" %}}

```yaml
ignore:
  - "generated/"          # Ignore all generated code
  - "!generated/core/"    # Except core generated files
  - "test/"               # Ignore test directory
  - "!test/integration/"  # Except integration tests
```
{{% /collapse-content %}}

{{% collapse-content title="혼합 패턴 유형" level="h4" %}}

```yaml
ignore:
  - "^vendor/.*"          # Regex: exclude vendor (anchored)
  - "**/*.min.js"         # Glob: exclude minified JS files
  - "dist/"               # Prefix: exclude dist directory
  - ".*\\.pb\\.go$"       # Regex: exclude protobuf files
```
{{% /collapse-content %}}

## PR Gate {#pr-gates}

구성 파일에서 [PR Gate][2]를 정의하여 풀 요청에 대한 코드 커버리지 임계값을 적용할 수 있습니다. 게이트가 [Datadog UI][2]에서도 구성된 경우, PR이 생성되거나 업데이트될 때 Datadog은 구성 파일 규칙과 UI 규칙 모두 평가합니다.

<div class="alert alert-info">구성 파일과 Datadog UI 모두 동일한 범위에 대한 게이트를 정의하는 경우, 풀 요청은 정의된 모든 임계값을 충족해야 합니다.</div>

```yaml
gates:
  - type: total_coverage_percentage
    config:
      threshold: 85

  - type: patch_coverage_percentage
    config:
      threshold: 95
```

각 게이트에는 다음 필드가 있습니다.

- `type` (필수): 커버리지 게이트의 유형입니다. 지원되는 값:
  - `total_coverage_percentage`: 리포지토리 전체(또는 범위가 지정된 서비스/코드 소유자)에 대한 최소 전체 커버리지 비율입니다.
  - `patch_coverage_percentage`: 풀 요청에서 변경된 코드에 대한 최소 커버리지 비율입니다.
- `config` (필수): 게이트 구성 옵션입니다. 지원되는 값:
  - `threshold` (필수): 최소 커버리지 비율(0-100)입니다.
  - `services`: (선택 사항) 게이트의 범위를 지정할 서비스 이름 패턴 목록입니다. `*`를 와일드카드로 사용하세요. 값 앞에 `!`를 붙여서 일치하는 서비스를 제외하세요. 설정되면, 일치하는 각 서비스별로 커버리지를 평가합니다.
  - `codeowners`: (선택 사항) 게이트의 범위를 지정할 코드 소유자 패턴 목록입니다. `*`를 와일드카드로 사용하세요. 값 앞에 `!`를 붙여서 일치하는 코드 소유자를 제외하세요. 설정되면, 일치하는 각 코드 소유자별로 커버리지를 평가합니다.
  - `flags`: (선택 사항) 게이트의 범위를 지정할 [플래그][3] 이름 패턴 목록입니다. `*`를 와일드카드로 사용하세요. 값 앞에 `!`를 붙여서 일치하는 플래그를 제외하세요. 설정되면, 일치하는 각 플래그별로 커버리지를 평가합니다.

### 예시 {#examples-2}

{{% collapse-content title="범위가 지정되지 않은 전체 및 패치 커버리지 게이트" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80

  - type: patch_coverage_percentage
    config:
      threshold: 90
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="서비스에 범위가 지정된 게이트" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
services:
  - id: backend-api
    paths:
      - backend/api/**
  - id: frontend-web
    paths:
      - frontend/**
gates:
  - type: patch_coverage_percentage
    config:
      threshold: 90
      services:
        - "*"

  - type: total_coverage_percentage
    config:
      threshold: 85
      services:
        - "backend-api"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="코드 소유자에 범위가 지정된 게이트" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: patch_coverage_percentage
    config:
      threshold: 95
      codeowners:
        - "@DataDog/backend-team"
        - "@DataDog/api-*"

  - type: total_coverage_percentage
    config:
      threshold: 80
      codeowners:
        - "@DataDog/frontend-team"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="플래그에 범위가 지정된 게이트" level="h4" %}}
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80
      flags:
        - "unit-tests"

  - type: patch_coverage_percentage
    config:
      threshold: 90
      flags:
        - "integration-tests"
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="부정으로 제외" level="h4" %}}
특정 서비스, 코드 소유자 또는 플래그를 게이트에서 제외하려면 `!` 접두사를 사용하세요. 예를 들어, 실험적인 서비스를 제외한 모든 서비스와 야간 테스트를 제외한 모든 플래그에 대해 커버리지를 적용하려면 다음을 실행합니다.
{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
gates:
  - type: total_coverage_percentage
    config:
      threshold: 80
      services:
        - "*"
        - "!experimental-*"

  - type: patch_coverage_percentage
    config:
      threshold: 90
      flags:
        - "*"
        - "!nightly-*"
{{< /code-block >}}
{{% /collapse-content %}}

## PR 코멘트 {#pr-comments}

기본적으로 Datadog은 모든 풀 요청에 코드 커버리지 요약 코멘트를 게시합니다. 이 요약은 풀 요청의 전체 및 패치 커버리지를 보고하고 Datadog의 Code Coverage 페이지로 연결됩니다.

`comments` 블록은 다음 필드를 허용합니다.

| 필드 | 유형 | 기본값 | 설명 |
|---|---|---|---|
| `enabled` | 불리언 | `true` | Datadog이 풀 요청에 코드 커버리지 코멘트를 게시하는지 여부입니다. |
| `file_breakdown` | 불리언 | `false` | 코멘트에 전체 커버리지 및 패치 커버리지에 대한 파일별 표가 포함되는지 여부입니다. |

PR Gate 검사는 이러한 설정의 영향을 받지 않습니다.

### PR 코멘트 비활성화 {#disabling-pr-comments}

`comments.enabled` 필드를 사용하여 리포지토리별로 코멘트를 차단할 수 있습니다.

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
comments:
  enabled: false
{{< /code-block >}}

### 파일별 분석 {#per-file-breakdown}

`comments.file_breakdown`을 `true`로 설정하여 풀 요청에서 변경된 파일과 해당 파일의 총 커버리지 및 패치 커버리지를 나열하는 표를 코멘트에 추가합니다.

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
comments:
  enabled: true
  file_breakdown: true
{{< /code-block >}}

`comments.enabled`가 `false`인 경우 분석은 아무런 영향을 미치지 않습니다.

## 이월 {#carryforward}

{{< callout url="#" btn_hidden="true" header="미리 보기에 참여하세요!">}}이월은 미리 보기로 제공되고 있으며, 변경될 수 있습니다.{{< /callout >}}

구성 파일에서 [이월][4]을(를) 활성화하여 커밋에 대해 모든 CI 작업이 실행되지 않을 때 상위 커밋의 커버리지 데이터를 재사용할 수 있습니다. 이월은 [플래그][3]에서 작동하므로 관련된 모든 보고서에 `--flags` 태그가 지정되어야 합니다.

리포지토리의 모든 플래그에 대해 이월을 활성화하려면 다음을 실행합니다.

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
carryforward: true
{{< /code-block >}}

특정 플래그에 대해서만 이월을 활성화하려면 다음을 실행합니다.

{{< code-block lang="yaml" filename="code-coverage.datadog.yml" >}}
schema-version: v1
flags:
  unit-tests:
    carryforward: true
  integration-tests:
    carryforward: true
{{< /code-block >}}

최상위 `carryforward` 필드는 다음 값을 허용합니다.

- `true`: 플래그가 `flags` 맵에서 `carryforward: false`로 재정의하지 않는 한 모든 플래그에 대해 이월이 활성화됩니다.
- `false` (기본값): 플래그가 `flags` 맵에서 `carryforward: true`로 선택하지 않는 한 이월이 비활성화됩니다.

`flags` 맵은 플래그별 구성 블록을 허용합니다. 지원되는 필드는 다음과 같습니다.

- `carryforward`: 명명된 플래그에 대해 이월을 활성화하거나 비활성화하는 불리언입니다. 최상위 `carryforward` 값을 재정의합니다.

자세한 내용은 [Code Coverage 이월][4]을 참조하세요.

## 패턴 구문 {#pattern-syntax}

파일 경로를 허용하는 구성 옵션은 세 가지 유형의 패턴을 지원합니다.

- `regex`
- `glob`
- `path_prefix`

패턴 유형은 사용한 구문에 따라 자동으로 탐지됩니다.

### 정규식 패턴 {#regex-patterns}

정규식에 사용되는 문자(`+`, `{`, `}`, `|`, `(`, `)`, `^`, `$`, `\`)가 포함된 패턴은 정규 표현식으로 처리됩니다.

- `".*\\.pb\\.go$"` - `.pb.go`로 끝나는 파일과 일치
- `"^generated/.*"` - 생성된 디렉터리의 파일과 일치
- `".*_test\\.go$"` - 테스트 파일과 일치

**참고**: 정규식 패턴은 전체 경로 일치를 위해 자동으로 `^...$`로 고정됩니다. 정규식 패턴에서 경로 구분자는 슬래시(`/`)를 사용하세요.

### Glob 패턴 {#glob-patterns}

Glob 관련 문자(`*`, `?`, `[`, `]`)를 포함하는 패턴은 Glob 패턴으로 처리됩니다.

- `"**/*.java"` - 모든 Java 파일과 일치
- `"src/test/**/*"` - src/test 아래의 모든 파일과 일치
- `"*.pb.go"` - 모든 디렉터리의 protobuf 파일과 일치

**참고**: 디렉터리를 재귀적으로 일치시키려면 `**`를 사용하세요. 패턴 `folder/*`는 직접 하위 파일만 일치시키고, `folder/**/*`는 모든 하위 항목을 일치시킵니다.

### 접두사 패턴 {#prefix-patterns}

특수 문자가 없는 간단한 경로 접두사는 접두사 일치로 처리됩니다.

- `"vendor/"` - vendor 디렉터리 아래의 모든 파일과 일치
- `"third_party/"` - 타사 코드와 일치
- `"generated/"` - 생성된 코드와 일치

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/code_coverage/monorepo_support
[2]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=code_coverage
[3]: /ko/code_coverage/flags
[4]: /ko/code_coverage/carryforward