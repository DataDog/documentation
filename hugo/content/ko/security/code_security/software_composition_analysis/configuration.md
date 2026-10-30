---
description: Datadog Software Composition Analysis(SCA) 구성(경로, 에코시스템, 패키지 제외 등)에 관한
  참조 문서입니다.
further_reading:
- link: /security/code_security/software_composition_analysis/
  tag: 설명서
  text: Software Composition Analysis
- link: /security/code_security/guides/configuration/
  tag: 설명서
  text: Code Security 구성 참조
title: Software Composition Analysis(SCA) 구성
---
Datadog Software Composition Analysis(SCA)는 코드 내의 오픈 소스 라이브러리와 해당 라이브러리의 취약성을 탐지합니다. 정적 SCA 분석 대상에서 특정 경로, 에코시스템, 패키지를 제외할 수 있습니다. 이러한 설정은 Datadog 또는 `code-security.datadog.yaml` 파일의 Code Security 구성에서 `sca` 키 아래에 구성하세요.

`sca` 키는 `schema-version: v1.1`에서 도입되었으며 다음 필드를 지원합니다. 각 필드에는 최소 `schema-version`가 지정되어 있으므로, 구성하는 필드에서 요구하는 가장 높은 버전을 사용하세요.

| **속성** | **유형** | **설명** | **기본값** | **최소 `schema-version`** |
| --- | --- | --- | --- | --- |
| `ignore-paths` | 배열 | 정적 SCA 분석 대상에서 제외할 파일 경로 또는 glob 패턴입니다. | 없음 | `v1.1` |
| `ignore-ecosystems` | 배열 | 정적 SCA 분석 대상에서 제외할 에코시스템입니다(예: `npm`, `Go`, `PyPI`). | 없음 | `v1.7` |
| `ignore-packages` | 배열 | 버전에 관계없이 정적 SCA 분석 대상에서 제외할 패키지입니다. 각 항목은 `<ecosystem>:<name>` 형식을 사용합니다(예: `npm:lodash`). | 없음 | `v1.7` |

예:

{{< code-block lang="yaml" >}}
schema-version: v1.7
sca:
  ignore-paths:
    - "vendor/"
    - "**/node_modules/**"
    - "third_party/"
  ignore-ecosystems:
    - "npm"
  ignore-packages:
    - "Go:golang.org/x/text"
{{< /code-block >}}

<div class="alert alert-warning">의 에코시스템 및 패키지 이름 <code>ignore-ecosystems</code> 은 <code>ignore-packages</code> 대소문자를 구분하여 일치 여부를 확인합니다. 예를 들어, <code>go:golang.org/x/text</code> 은 에코시스템과 <code>Go</code> 일치하지 않으며 <code>npm:Lodash</code> 은 패키지와 <code>lodash</code> 일치하지 않습니다.</div>

CLI에서 직접 SCA 스캐너를 실행하는 경우, 동일한 `--exclude`, `--exclude-ecosystem` 및 `--exclude-package` 플래그가 위에서 구성한 제외 항목과 결합됩니다.

구성 위치, 우선순위 및 병합에 대한 자세한 내용은 [Code Security Configuration Reference][1]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/code_security/guides/configuration/