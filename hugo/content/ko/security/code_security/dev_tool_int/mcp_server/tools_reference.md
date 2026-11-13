---
description: Datadog Code Security MCP Server에서 사용할 수 있는 모든 도구에 대한 상세 참고 자료(파라미터,
  필수 바이너리 및 출력 형식 포함)
further_reading:
- link: /security/code_security/dev_tool_int/mcp_server/
  tag: 설명서
  text: Code Security MCP Server 개요 및 설정
- link: /security/code_security/dev_tool_int/mcp_server/troubleshooting/
  tag: 설명서
  text: Code Security MCP Server 문제 해결
is_beta: true
title: 도구 참조
---
[Datadog Code Security MCP Server][1]는 AI 코딩 어시스턴트와 CLI에서 사용할 수 있도록 다음 도구를 제공합니다. 스캔 도구는 하나 이상의 Datadog 보안 바이너리를 래핑하고 스캔할 파일 경로나 디렉터리를 입력받습니다. `datadog_library_vulnerability_scan`은 패키지 URL을 사용하여 Datadog에 쿼리하며 로컬 디렉터리 트리는 스캔하지 않습니다.

<div class="alert alert-info">이 MCP 서버는 클라우드 기반 Datadog 기능 및 데이터 액세스를 제공하는 <a href="/mcp_server">Datadog MCP Server</a>와는 별개입니다. Code Security MCP Server는 로컬에서 실행되며 코드 수준 보안 스캔에 중점을 둡니다. Datadog에 이미 저장된 발견 결과를 쿼리하려면 <a href="/security/code_security/dev_tool_int/mcp_server/#query-findings-already-in-datadog">Datadog에 이미 있는 발견 결과 쿼리</a>를 참조하세요.</div>

## `datadog_code_security_scan` {#datadog-code-security-scan}

SAST, 시크릿 탐지, SCA 및 IaC 스캔을 병렬로 실행합니다.

`min_sast_severity` 스캔의 SAST 부분에만 적용됩니다. 기본값은 `LOW`입니다. 소스 코드에서 억제된 발견 결과는 제외됩니다. 일부 스캐너가 설치되지 않은 경우, 도구는 성공적으로 실행된 스캐너의 결과와 실패한 각 스캐너의 오류를 반환합니다.

### 파라미터 {#parameters}

| 파라미터            | 유형            | 필수 | 설명                                                                                          |
| -------------------- | --------------- | :------: | ---------------------------------------------------------------------------------------------------- |
| `file_paths`         | `array[string]` |   예    | 스캔할 파일 경로 또는 디렉터리                                                                    |
| `working_dir`        | `string`        |    아니요    | 상대 경로를 해석하기 위한 기준 디렉터리(기본값은 현재 디렉터리)                      |
| `min_sast_severity`  | `string`        |    아니요    | 반환할 최소 SAST 중증도: `LOW`, `MEDIUM`, `HIGH` 또는 `CRITICAL` 기본값: `LOW` SAST 전용 |

### 필수 바이너리 {#required-binaries}

`datadog-static-analyzer`, `datadog-sbom-generator`, `datadog-security-cli`, `datadog-iac-scanner`

## `datadog_sast_scan` {#datadog-sast-scan}

SAST(Static Application Security Testing)를 실행하여 퍼스트 파티 코드의 보안 취약성을 탐지합니다.

`min_sast_severity` 기본값은 `LOW`입니다. 소스 코드에서 억제된 발견 결과는 제외됩니다.

### 파라미터 {#parameters-1}

| 파라미터            | 유형            | 필수 | 설명                                                                                          |
| -------------------- | --------------- | :------: | ---------------------------------------------------------------------------------------------------- |
| `file_paths`         | `array[string]` |   예    | 스캔할 파일 경로 또는 디렉터리                                                                    |
| `working_dir`        | `string`        |    아니요    | 상대 경로를 해석하기 위한 기준 디렉터리                                                          |
| `min_sast_severity`  | `string`        |    아니요    | 반환할 최소 SAST 중증도: `LOW`, `MEDIUM`, `HIGH` 또는 `CRITICAL` 기본값: `LOW`             |

### 필수 바이너리 {#required-binary}

`datadog-static-analyzer`

## `datadog_secrets_scan` {#datadog-secrets-scan}

소스 코드 및 구성 파일에서 하드코딩된 자격 증명, API 키, 비밀번호 및 토큰을 탐지합니다.

### 파라미터 {#parameters-2}

| 파라미터     | 유형            | 필수 | 설명                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   예    | 스캔할 파일 경로 또는 디렉터리           |
| `working_dir` | `string`        |    아니요    | 상대 경로를 해석하기 위한 기준 디렉터리 |

### 필수 바이너리 {#required-binary-1}

`datadog-static-analyzer`

## `datadog_sca_scan` {#datadog-sca-scan}

SCA를 실행하여 프로젝트 종속성에 존재하는 알려진 취약성(CVE)을 탐지합니다. 이 도구는 다음 두 단계를 수행합니다.

1. 지정된 디렉토리에서 소프트웨어 자재 명세서(SBOM)를 생성합니다.
2. Datadog의 취약성 데이터베이스를 사용하여 SBOM에서 알려진 취약성을 스캔합니다.

### 파라미터 {#parameters-3}

| 파라미터     | 유형            | 필수 | 설명                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   예    | 종속성을 스캔할 디렉터리        |
| `working_dir` | `string`        |    아니요    | 상대 경로를 해석하기 위한 기준 디렉터리 |

### 출력 {#output}

CVE ID, 중증도, 영향을 받는 구성 요소, 버전 및 설명이 포함된 취약성

### 필수 바이너리 {#required-binaries-1}

`datadog-sbom-generator`, `datadog-security-cli`

## `datadog_iac_scan` {#datadog-iac-scan}

IaC 파일에서 잘못된 구성, 규정 준수 문제 및 보안 취약성을 탐지합니다.

### 파라미터 {#parameters-4}

| 파라미터     | 유형            | 필수 | 설명                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   예    | 스캔할 IaC 파일이 포함된 디렉터리    |
| `working_dir` | `string`        |    아니요    | 상대 경로를 해석하기 위한 기준 디렉터리 |

### 출력 {#output-1}

중증도, 규칙, 파일 위치 및 수정 지침이 포함된 보안 발견 결과

### 필수 바이너리 {#required-binary-2}

`datadog-iac-scanner`

### 지원되는 IaC 형식 {#supported-iac-formats}

- Terraform
- CloudFormation
- Kubernetes 매니페스트
- Dockerfiles
- GitHub Actions

## `datadog_generate_sbom` {#datadog-generate-sbom}

리포지토리에 있는 모든 소프트웨어 구성 요소, 종속성, 버전 및 라이선스를 나열하는 포괄적인 SBOM을 생성합니다.

### 파라미터 {#parameters-5}

| 파라미터     | 유형     | 필수 | 설명                                                                |
| ------------- | -------- | :------: | -------------------------------------------------------------------------- |
| `path`        | `string` |    아니요    | 분석할 리포지토리 또는 디렉터리 경로(기본값은 현재 디렉터리) |
| `working_dir` | `string` |    아니요    | 스캔 기준 디렉터리(기본값은 현재 디렉터리)                |

### 출력 {#output-2}

요약 정보(전체 구성 요소 수, 언어/패키지 관리자별 분류, 라이선스 통계)와 상세 구성 요소 목록(이름, 버전, 유형, 라이선스, 패키지 URL)을 포함하는 JSON

### 지원되는 패키지 관리자 {#supported-package-managers}

| 언어   | 패키지 관리자                          |
| ---------- | ----------------------------------------- |
| .NET       | NuGet                                     |
| C++        | Conan                                     |
| Go         | Go 모듈                                |
| Java       | Gradle, Maven                             |
| JavaScript | npm, pnpm, Yarn                            |
| PHP        | Composer                                  |
| Python     | pdm, pipenv, poetry, requirements.txt, uv |
| Ruby       | Bundler                                   |
| Rust       | Cargo                                     |

<div class="alert alert-info">리포지토리가 위에 나열되지 않은 패키지 관리자를 사용하거나 도구가 구성 요소를 하나도 반환하지 않는 경우, AI 어시스턴트는 잠금 파일(<code>package.json</code>, <code>requirements.txt</code>, <code>go.mod</code>, <code>pom.xml</code>, <code>Gemfile.lock</code>, <code>Cargo.lock</code>, <code>composer.lock</code>및 유사 파일)을 읽고 종속성을 직접 추출하여 SBOM을 생성할 수 있습니다.</div>

## `datadog_library_vulnerability_scan` {#datadog-library-vulnerability-scan}

패키지 URL(PURL)을 사용하여 특정 라이브러리의 알려진 취약성을 검색합니다. 이 도구는 Datadog API를 호출하며 로컬 코드베이스를 스캔하지 않습니다. 프로젝트 트리를 스캔하려면 [`datadog_sca_scan`](#datadog_sca_scan)을 사용합니다.

`DD_API_KEY` 및 `DD_APP_KEY`가 필요합니다.

### 파라미터 {#parameters-6}

| 파라미터     | 유형            | 필수 | 설명                                                                 |
| ------------- | --------------- | :------: | --------------------------------------------------------------------------- |
| `libraries`   | `array[object]` |   예    | 스캔할 라이브러리 각 객체에는 아래 표의 필드가 사용됩니다.         |
| `working_dir` | `string`        |    아니요    | Git 컨텍스트 탐지를 위한 작업 디렉터리(기본값은 현재 디렉터리) |

`libraries`의 각 항목:

| 필드             | 유형      | 필수 | 설명                                                      |
| ----------------- | --------- | :------: | ---------------------------------------------------------------- |
| `purl`            | `string`  |   예    | 패키지 URL(예: `pkg:maven/com.cronutils/cron-utils@9.1.2` |)
| `is_direct`       | `boolean` |    아니요    | 직접 종속성 여부                              |
| `is_dev`          | `boolean` |    아니요    | 개발 전용 종속성 여부                    |
| `package_manager` | `string`  |    아니요    | 패키지 관리자(예: `MAVEN`, `NPM` 또는 `GOLANG`         |)

### 출력 {#output-3}

CVE ID, GHSA ID, 중증도, CVSS 점수, 영향을 받는 라이브러리, 수정 조치, 수정된 버전 및 익스플로잇 사용 가능 여부가 포함된 취약성

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/code_security/dev_tool_int/mcp_server/