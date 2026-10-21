---
description: 스키마, 구성 위치, 우선순위를 포함한 Datadog Code Security 구성과 관련된 참조 문서입니다.
disable_toc: false
further_reading:
- link: /security/code_security/static_analysis/configuration/
  tag: 설명서
  text: 정적 코드 분석(SAST) 구성
- link: /security/code_security/software_composition_analysis/configuration/
  tag: 설명서
  text: Software Composition Analysis(SCA) 구성
- link: /security/code_security/iac_security/configuration/
  tag: 설명서
  text: Infrastructure as Code(IaC) Security 구성
- link: /security/code_security/secret_scanning/configuration/
  tag: 설명서
  text: Secret Scanning 구성
title: Code Security 구성 참조
---
Datadog Code Security는 Datadog 내, 리포지토리 루트의 파일, 또는 두 위치에서 모두 구성할 수 있습니다.

## 구성 스키마 {#configuration-schema}

구성 파일은 `schema-version` 키로 시작해야 하며, 그 뒤에는 구성하려는 각 제품의 최상위 키를 입력해야 합니다. 구성하려는 제품과 일치하는 스키마 버전을 사용하세요.

| 스키마 버전 | 지원되는 제품 |
|---|---|
| `v1.0` | SAST |
| `v1.1` | SAST, SCA |
| `v1.2` | SAST, SCA, IaC Security |
| `v1.3` | SAST, SCA, IaC Security |
| `v1.4` | SAST, SCA, IaC Security |
| `v1.5` | SAST, SCA, IaC Security, Secret Scanning |

모든 새 구성에는 `schema-version: v1.5`를 사용하세요. `v1.4`와 동일한 제품을 지원하며 Secret Scanning이 추가됩니다. 버전 `v1.4`에서는 IaC 규칙에 대한 규칙별 `arguments`가 추가되며, `v1.3`의 경우 규칙별 경로 범위 지정, 규칙별 심각도 재정의, 플랫폼 필터 등 IaC 구성 옵션이 추가됩니다. IaC 관련 필드 정보는 [Infrastructure as Code(IaC) Security 구성][3]을, Secret 관련 필드 정보는 [Secret Scanning 구성][4]을 참조하세요.

다음 예시는 최상위 구조를 제시합니다.

```yaml
schema-version: v1.5
sast:
  # Static Code Analysis (SAST) configuration
sca:
  # Software Composition Analysis (SCA) configuration
iac:
  # Infrastructure as Code (IaC) Security configuration
secrets:
  # Secret Scanning configuration
```

`sast`, `sca`, `iac`, `secrets` 섹션은 선택 사항입니다. 조직 수준, 리포지토리 수준, 리포지토리 파일을 비롯한 모든 구성 위치에 하나 이상의 섹션을 포함할 수 있습니다. 또한 `sast` 섹션은 Datadog 호스팅 스캔을 위한 AI 네이티브 SAST 규칙 세트를 제어합니다. `secrets` 섹션은 시크릿을 스캔하려는 파일을 제어하며, 규칙 자체는 Datadog에서 구성합니다. 각 섹션의 전체 스키마는 [정적 코드 분석(SAST) 구성][1], [소프트웨어 구성 요소 분석(SCA) 구성][2], [Infrastructure as Code(IaC) Security 구성][3], [시크릿 스캐닝 구성][4]을 참조하세요. SAST 페이지에는 AI 네이티브 SAST 규칙 세트의 이름이 명시되어 있습니다.

## 구성 정의 위치 {#where-to-define-configurations}

3가지 구성 수준은 다음과 같습니다.

* 조직 수준 구성(Datadog)
* 리포지토리 수준 구성(Datadog)
* 리포지토리 수준 구성(repo file)

세 위치 모두 동일한 YAML 스키마를 사용하며 순서대로 병합됩니다([구성 병합 방법](#how-configurations-merge) 참조).

### 조직 수준 구성 {#org-level-configuration}

{{< img src="/security/code_security/org-level-configuration.png" alt="Datadog Code Security의 조직 수준 구성 편집기입니다." style="width:100%;" >}}

조직 수준 구성은 조직 내 모든 리포지토리에 적용됩니다. 조직 수준 구성을 통해 조직 전체의 규칙을 정의하고 무시할 전역 경로 또는 파일을 지정합니다.

### 리포지토리 수준 구성 {#repository-level-configuration}

{{< img src="/security/code_security/repo-level-configuration.png" alt="Datadog Code Security의 리포지토리 수준 구성 편집기입니다." style="width:100%;" >}}

리포지토리 수준 구성은 선택한 리포지토리에만 적용되며 조직 수준 구성보다 우선합니다. 이 구성은 조직 구성과 병합되며, 리포지토리 설정에서 조직 기본값을 재정의합니다. 리포지토리 수준 구성을 통해 리포지토리별 재정의를 지정하거나, 해당 리포지토리에만 적용되는 규칙을 추가합니다.

### 리포지토리 수준 구성(file) {#repository-level-configuration-file}

`code-security.datadog.yaml` 파일은 리포지토리 루트에 구성을 저장합니다. 이는 Datadog에서 정의한 조직 수준 및 리포지토리 수준 구성보다 우선합니다.

## 구성 병합 방식 {#how-configurations-merge}

구성은 다음과 같이 우선순위가 낮은 순서에서 높은 순서로 병합됩니다.

1. **조직 수준**
1. **리포지토리 수준**
1. **리포지토리 수준 파일** (`code-security.datadog.yaml`)

구성의 필드 각각에 대한 병합 동작은 필드 유형에 따라 다릅니다.

| 필드 유형 | 병합 동작 | 예시 필드 |
|---|---|---|
|  목록 | 연결됨(중복 제거) | `use-rulesets`, `ignore-rulesets`, `ignore-rules`, `ignore-paths`, `only-paths`, `ignore-platforms`, `only-platforms` |
| 스칼라 값(문자열, 숫자, 불리언) |  우선순위가 가장 높은 구성의 값 사용 | `use-default-rulesets`, `use-gitignore`, `max-file-size-kb`, `category` |
| 맵 | 재귀적으로 병합됨 | `ruleset-configs`, `rule-configs`, `arguments` |

전체 필드 목록은 [정적 코드 분석(SAST) 구성][1], [소프트웨어 구성 요소 분석(SCA) 구성][2], [Infrastructure as Code(IaC) Security 구성][3]을 참조하세요.

다음 예시는 구성의 병합 방식을 보여줍니다.

#### 조직 수준 {#org-level}

```yaml
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 10
sca:
  ignore-paths:
    - "vendor/"
iac:
  ignore-rules:
    - A
  global-config:
    ignore-paths:
      - "examples/"
```

#### 리포지토리 수준 {#repo-level}

```yaml
schema-version: v1.4
sast:
  use-rulesets:
    - B
  ignore-rulesets:
    - C
  ruleset-configs:
    A:
      rule-configs:
        foo:
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
sca:
  ignore-paths:
    - "third_party/"
iac:
  ignore-rules:
    - B
  global-config:
    ignore-paths:
      - "generated/"
```

#### 병합 결과 {#merged-result}

```yaml
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
    - B
  ignore-rulesets:
    - C
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
sca:
  ignore-paths:
    - "vendor/"
    - "third_party/"
iac:
  ignore-rules:
    - A
    - B
  global-config:
    ignore-paths:
      - "examples/"
      - "generated/"
```

이 예시는 위 표에 명시된 각 병합 규칙을 보여줍니다.

- **목록 연결**: `use-rulesets`은 `[A, B]`로 병합되고, SCA `ignore-paths`는 `["vendor/", "third_party/"]`로 병합되고, IaC `ignore-rules`는 `[A, B]`로 병합됩니다.
- **스칼라는 우선순위가 가장 높은 값 사용**: `maxCount: 22`(리포지토리 수준)이 `maxCount: 10`(조직 수준)을 재정의합니다.
- **맵의 재귀적 병합**: `foo` 규칙 구성은 `ignore-paths`를 조직 수준에서 유지하면서 `maxCount: 22`를 리포지토리 수준에서 적용합니다. `bar`와 같은 새 항목은 저장소 수준에서 추가됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/code_security/static_analysis/configuration/
[2]: /ko/security/code_security/software_composition_analysis/configuration/
[3]: /ko/security/code_security/iac_security/configuration/
[4]: /ko/security/code_security/secret_scanning/configuration/