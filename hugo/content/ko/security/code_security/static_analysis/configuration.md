---
description: Datadog 정적 코드 분석(SAST) 구성에 대한 참조 문서로, 규칙 세트 선택, 규칙 사용자 지정, 심각도 및 경로를
  다룹니다.
title: 정적 코드 분석(SAST) 구성
---
기본적으로 Datadog Static Code Analysis(SAST)는 각 프로그래밍 언어에 대하여 [Datadog의 기본 규칙 세트][6]를 사용해 리포지토리를 스캔합니다. 심각도, 경로 및 기타 파라미터와 함께 실행할 규칙 세트와 규칙을 사용자 지정할 수 있습니다. 이러한 설정은 Datadog 또는 `code-security.datadog.yaml` 파일의 Code Security 구성에서 `sast` 키 아래에 구성하세요.

구성 위치, 우선순위 및 병합에 대한 자세한 내용은 [Code Security 구성 참조][26]를 참조하세요.

## 기본 규칙 세트 {#default-rulesets}

기본적으로 Datadog은 리포지토리의 프로그래밍 언어에 대한 기본 규칙 세트를 활성화합니다(`use-default-rulesets: true`). 활성화된 규칙 세트를 수정하려면:

- **규칙 세트 추가**: `use-rulesets` 아래에 나열하세요.
- **특정 규칙 세트 비활성화**: `ignore-rulesets` 아래에 나열하세요.
- **모든 기본 규칙 세트 비활성화**: `use-default-rulesets: false`를 설정한 다음, `use-rulesets` 아래에 원하는 규칙 세트를 나열하세요.

전체 기본 규칙 세트 목록은 [정적 코드 분석(SAST) 규칙][6]을 참조하세요.

## AI 네이티브 SAST 구성{#configure-ai-native-sast}

AI 네이티브 SAST는 다른 정적 코드 분석 규칙과 동일한 `sast` 구성을 사용하며 Datadog 호스팅 스캔에서만 사용할 수 있습니다. `sast` 구성은 실행할 AI 네이티브 SAST 규칙 세트를 제어하지만, Datadog 호스팅 스캔을 활성화하거나 AI 네이티브 SAST에 대한 액세스 권한을 부여하지는 않습니다.

AI 네이티브 SAST가 활성화되면 리포지토리에서 감지된 지원 언어에 대해 기본 규칙 세트가 실행됩니다. AI 네이티브 SAST 규칙 세트 이름은 `<language>-ai_sast` 형식을 사용합니다.

| 언어 | 규칙 세트 |
| --- | --- |
| C# | `csharp-ai_sast` |
| Dart | `dart-ai_sast` |
| Elixir | `elixir-ai_sast` |
| Go | `go-ai_sast` |
| Java | `java-ai_sast` |
| JavaScript | `javascript-ai_sast` |
| Kotlin | `kotlin-ai_sast` |
| PHP | `php-ai_sast` |
| Python | `python-ai_sast` |
| Ruby | `ruby-ai_sast` |
| Rust | `rust-ai_sast` |
| Swift | `swift-ai_sast` |
| TypeScript | `typescript-ai_sast` |

`use-default-rulesets` 설정은 기존 SAST 및 AI 네이티브 SAST 규칙 세트 모두에 적용됩니다. `use-default-rulesets: false`를 설정하는 경우, 실행하려는 모든 기존 및 AI 네이티브 SAST 규칙 세트를 포함하세요. 예를 들어, 다음 구성은 Ruby Security 및 AI 네이티브 SAST 규칙 세트를 실행합니다.

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - ruby-security
    - ruby-ai_sast
{{< /code-block >}}

다른 기본 규칙 세트는 유지하면서 특정 AI 네이티브 SAST 규칙 세트를 비활성화하려면 `ignore-rulesets`에 추가하세요.

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: true
  ignore-rulesets:
    - ruby-ai_sast
{{< /code-block >}}

## 구성 형식 {#configuration-format}

다음 구성 형식은 모든 구성 위치(조직 수준, 리포지토리 수준 및 리포지토리 수준(파일))에 적용됩니다.

구성 파일은 지원되는 `schema-version`(`v1.0`, `v1.1`, `v1.2`, `v1.3` 또는 `v1.4`)로 시작해야 하며, 그 뒤에 분석 구성이 포함된 `sast` 키가 와야 합니다. 모든 새 구성에는 `v1.4`를 사용하세요. 구성은 구조는 아래와 같습니다.

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: true
  use-rulesets:
    - ruleset-name
  ignore-rulesets:
    # Always ignore these rulesets (even if it is a default ruleset or listed in `use-rulesets`)
    - ignored-ruleset-name
  ruleset-configs:
    ruleset-name:
      # Only apply this ruleset to the following paths/files
      only-paths:
        - "path/example"
        - "**/*.file"
      # Do not apply this ruleset in the following paths/files
      ignore-paths:
        - "path/example/directory"
        - "**/config.file"
      rule-configs:
        rule-name:
          # Only apply this rule to the following paths/files
          only-paths:
            - "path/example"
            - "**/*.file"
          # Do not apply this rule to the following paths/files
          ignore-paths:
            - "path/example/directory"
            - "**/config.file"
          arguments:
            # Set the rule's argument to value.
            argument-name: value
          severity: ERROR
          category: CODE_STYLE
        rule-name:
          arguments:
            # Set different argument values in different subtrees
            argument-name:
              # Set the rule's argument to value_1 by default (root path of the repo)
              /: value_1
              # Set the rule's argument to value_2 for specific paths
              path/example: value_2
  global-config:
    # Only analyze the following paths/files
    only-paths:
      - "path/example"
      - "**/*.file"
    # Do not analyze the following paths/files
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
    use-gitignore: true
    ignore-generated-files: true
    max-file-size-kb: 200
{{< /code-block >}}

`sast` 키는 다음 필드를 지원합니다.

| **속성** | **유형** | **설명** | **기본값** |
| --- | --- | --- | --- |
| `use-default-rulesets` | 부울 | Datadog 기본 규칙 세트를 활성화할지 여부입니다. | `true` |
| `use-rulesets` | 배열 | 활성화할 규칙 세트 이름의 목록입니다. | 없음 |
| `ignore-rulesets` | 배열 | 비활성화할 규칙 세트 이름의 목록입니다. `use-rulesets` 및 `use-default-rulesets`보다 우선합니다. | 없음 |
| `ruleset-configs` | 객체 | 규칙 세트 이름에서 해당 구성으로의 맵입니다. | 없음 |
| `global-config` | 객체 | 리포지토리에 대한 전역 설정입니다. | 없음 |

## 규칙 세트 구성 {#ruleset-configuration}

`ruleset-configs` 맵의 각 항목은 특정 규칙 세트를 구성합니다. 규칙 세트의 구성이 적용되기 위해 `use-rulesets` 목록에 있을 필요는 없습니다. 구성은 `use-default-rulesets`를 포함하여 규칙 세트가 활성화될 때마다 적용됩니다.

| **속성** | **유형** | **설명** | **기본값** |
| --- | --- | --- | --- |
| `only-paths` | 배열 | 파일 경로 또는 glob 패턴입니다. 이 패턴과 일치하는 파일만 이 규칙 세트에서 처리됩니다. | 없음 |
| `ignore-paths` | 배열 | 이 규칙 세트의 분석에서 제외할 파일 경로 또는 glob 패턴입니다. | 없음 |
| `rule-configs` | 객체 | 규칙 이름에서 해당 구성으로의 맵입니다. | 없음 |

## 규칙 구성 {#rule-configuration}

규칙 세트의 `rule-configs` 맵에 있는 각 항목은 특정 규칙을 구성합니다.

| **속성** | **유형** | **설명** | **기본값** |
| --- | --- | --- | --- |
| `only-paths` | 배열 | 파일 경로 또는 glob 패턴입니다. 이 규칙은 이러한 패턴과 일치하는 파일에만 적용됩니다. | 없음 |
| `ignore-paths` | 배열 | 제외할 파일 경로 또는 glob 패턴입니다. 이 규칙은 이러한 패턴과 일치하는 파일에는 적용되지 않습니다. | 없음 |
| `arguments` | 객체 | 규칙에 대한 파라미터 및 값입니다. 값은 스칼라일 수도 있고 경로별로 정의할 수도 있습니다. | 없음 |
| `severity` | 문자열 또는 객체 | 규칙 심각도입니다. 유효한 값은 `ERROR`, `WARNING`, `NOTICE`, `NONE`입니다. 단일 값일 수도 있고 경로별로 정의할 수도 있습니다. | 없음 |
| `category` | 문자열 | 규칙 카테고리입니다. 유효한 값은 `BEST_PRACTICES`, `CODE_STYLE`, `ERROR_PRONE`, `PERFORMANCE`, `SECURITY`입니다. | 없음 |

## 인수 및 심각도 구성 {#argument-and-severity-configuration}

인수와 심각도는 다음 두 가지 형식 중 하나로 정의할 수 있습니다.

1. **단일 값:** 전체 리포지토리에 적용됩니다.

   {{< code-block lang="yaml" >}}
   arguments:
     argument-name: value
   severity: ERROR
   {{< /code-block >}}

2. **경로별 매핑:** 서로 다른 하위 트리에 다른 값을 지정합니다. 일치하는 경로 접두사 중 가장 긴 것이 적용됩니다. `/`를 포괄적인 기본값으로 사용하세요.

   {{< code-block lang="yaml" >}}
   arguments:
     argument-name:
       /: value_default
       path/example: value_specific
   severity:
     /: WARNING
     path/example: ERROR
   {{< /code-block >}}

   | **키** | **유형** | **설명** | **기본값** |
   | --- | --- | --- | --- |
   | `/` | 임의 | 특정 경로가 일치하지 않을 때의 기본값입니다. | 없음 |
   | `specific path` | 임의 | 지정된 경로 또는 glob 패턴과 일치하는 파일에 대한 값입니다. | 없음 |

`category` 필드는 전체 리포지토리에 대해 하나의 문자열 값을 취합니다.

## 전역 구성 {#global-configuration}

`global-config` 객체는 리포지토리 전체의 설정을 제어합니다.

| **속성** | **유형** | **설명** | **기본값** |
| --- | --- | --- | --- |
| `only-paths` | 배열 | 파일 경로 또는 glob 패턴입니다. 일치하는 파일만 분석됩니다. | 없음 |
| `ignore-paths` | 배열 | 제외할 파일 경로 또는 glob 패턴입니다. 일치하는 파일은 분석되지 않습니다. | 없음 |
| `use-gitignore` | 부울 | `ignore-paths`에 `.gitignore` 파일의 항목을 포함할지 여부입니다. | `true` |
| `ignore-generated-files` | 부울 | `ignore-paths`에 일반적인 생성 파일 패턴을 포함할지 여부입니다. | `true` |
| `max-file-size-kb` | 숫자 | 분석할 최대 파일 크기(kB)입니다. 이보다 더 큰 파일은 무시됩니다. | `200` |

구성 예시:

이 예시는 기본 규칙 세트를 비활성화하므로, Python용 AI 네이티브 SAST를 유지하기 위해 `python-ai_sast`를 명시적으로 포함합니다.

{{< code-block lang="yaml" >}}
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - python-best-practices
    - python-security
    - python-code-style
    - python-inclusive
    - python-django
    - python-ai_sast
    - custom-python-ruleset
  ruleset-configs:
    python-code-style:
      rule-configs:
        max-function-lines:
          # Do not apply the rule max-function-lines to the following files
          ignore-paths:
            - "src/main/util/process.py"
            - "src/main/util/datetime.py"
          arguments:
            # Set the max-function-lines rule's threshold to 150 lines
            max-lines: 150
          # Override this rule's severity
          severity: NOTICE
        max-class-lines:
          arguments:
            # Set different thresholds for the max-class-lines rule in different subtrees
            max-lines:
              # Set the rule's threshold to 200 lines by default (root path of the repo)
              /: 200
              # Set the rule's threshold to 100 lines in src/main/backend
              src/main/backend: 100
          # Override this rule's severity with different values in different subtrees
          severity:
            # Set the rule's severity to NOTICE by default
            /: NOTICE
            # Set the rule's severity to NONE in tests/
            tests: NONE
    python-django:
      # Only apply the python-django ruleset to the following paths
      only-paths:
        - "src/main/backend"
        - "src/main/django"
      # Do not apply the python-django ruleset in files matching the following pattern
      ignore-paths:
        - "src/main/backend/util/*.py"
  global-config:
    # Only analyze source files
    only-paths:
      - "src/main"
      - "src/tests"
      - "**/*.py"
    # Do not analyze third-party files
    ignore-paths:
      - "lib/third_party"
{{< /code-block >}}

## 레거시 구성 {#legacy-configuration}

Datadog 정적 코드 분석(SAST)은 이전에 다른 구성 파일(`static-analysis.datadog.yml`) 및 스키마를 사용했습니다. 이 스키마는 더 이상 사용되지 않으며 새로 업데이트되지 않지만, `datadog-static-analyzer` 리포지토리에 [문서화][25]되어 있습니다.

두 파일이 모두 존재하는 경우 `code-security.datadog.yaml`이 `static-analysis.datadog.yml`보다 우선합니다.

### 위반 사항 무시 {#ignoring-violations}

#### 리포지토리에서 무시 {#ignore-for-a-repository}

`code-security.datadog.yaml` 파일에 규칙 구성을 추가하세요. 다음 예시는 모든 디렉터리에 대해 규칙 `javascript-express/reduce-server-fingerprinting`을 무시합니다.

{{< code-block lang="yaml" >}}
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "**"
{{< /code-block >}}

#### 파일 또는 디렉터리에서 무시{#ignore-for-a-file-or-directory}

`code-security.datadog.yaml` 파일에 규칙 구성을 추가하세요. 다음 예시는 특정 파일에 대해 규칙 `javascript-express/reduce-server-fingerprinting`을 무시합니다. 경로별로 무시하는 방법에 대한 자세한 내용은 [구성 사용자 지정](#customize-your-configuration)을 참조하세요.

{{< code-block lang="yaml" >}}
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "ad-server/src/app.js"
{{< /code-block >}}

#### 특정 인스턴스 무시 {#ignore-for-a-specific-instance}

특정 위반 인스턴스를 무시하려면 코드 줄 위에 `no-dd-sa` 주석을 추가하세요. `no-dd-sa`로 억제된 위반 사항은 완전히 제외되는 대신 **억제됨**으로 표시되므로 검색 및 감사를 수행할 수 있습니다.

[리포지토리 페이지][1]에서 억제된 위반 사항은 `is_suppressed: true`로 표시됩니다. [취약점 탐색기][2]에서는 `status: muted` 및 `workflow.mute.reason: muted_in_code`로 표시됩니다.

예를 들어, 다음 Python 코드 스니펫에서 `foo = 1` 줄은 정적 코드 분석 스캔에서 억제됩니다.

{{< code-block lang="python" >}}
#no-dd-sa
foo = 1
bar = 2
{{< /code-block >}}

또한 `no-dd-sa`를 사용하여 모든 규칙을 억제하는 대신 특정 규칙만 억제할 수 있습니다. 그렇게 하려면 다음 템플릿을 사용하여 `<rule-name>` 대신 억제하려는 규칙의 이름을 지정하세요.

`no-dd-sa:<rule-name>`

예를 들어, 다음 JavaScript 코드 스니펫에서 `my_foo = 1` 줄은 `javascript-code-style/assignment-name` 규칙에 대해서만 억제되지만, 다른 모든 규칙은 여전히 해당 줄을 분석합니다.

{{< code-block lang="javascript" >}}
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
{{< /code-block >}}

[1]: https://app.datadoghq.com/security/code-security/repositories
[2]: https://app.datadoghq.com/security/code-security/sca
[6]: /ko/security/code_security/static_analysis/static_analysis_rules
[25]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
[26]: /ko/security/code_security/guides/configuration/