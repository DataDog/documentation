---
aliases:
- /ko/security/cloud_security_management/setup/iac_scanning/iac_scanning_exclusions/
- /ko/security/code_security/iac_security/exclusions/
further_reading:
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: 블로그
  text: Datadog IaC Security를 사용하여 클라우드의 구성 오류가 프로덕션 환경에 도달하지 못하도록 방지하기
- link: /security/code_security/iac_security
  tag: 문서
  text: IaC Security
- link: /security/code_security/iac_security/setup
  tag: 문서
  text: Code Security용 IaC Security 설정하기
- link: /security/code_security/iac_security/iac_rules/
  tag: 문서
  text: IaC Security 규칙
title: 코드형 인프라(IaC) Security 구성
---
코드형 인프라(IaC) Security는 IaC 구성 오류를 탐지합니다. 기본적으로 IaC Security는 [지원되는 모든 규칙][3]을 사용하여 리포지토리를 스캔합니다. 실행할 규칙과 해당 규칙이 실행될 경로뿐만 아니라 중증도와 규칙 유형도 사용자 지정할 수 있습니다. 이러한 설정은 Datadog 또는 `code-security.datadog.yaml` 파일의 Code Security 구성에 있는 `iac` 키 아래에서 구성하세요.

구성 위치, 우선순위 및 병합에 대한 자세한 내용은 [Code Security 구성 참조][1]를 참조하세요.

## 구성 방법 {#configuration-methods}

IaC Security는 다음 방법으로 구성할 수 있습니다.

- 리포지토리 전체의 규칙, 중증도, 규칙 유형 및 경로 설정을 위한 Datadog 또는 `code-security.datadog.yaml` 파일 동일한 구성을 리포지토리나 조직 전체에 적용하려는 경우 이 방법을 사용하세요.
- IaC 파일에 유지해야 하는 로컬 파일별 제외를 위한 인라인 주석 특정 라인, 블록 또는 파일에 예외가 적용될 때 이 방법을 사용하세요.

## 구성 형식 {#configuration-format}

다음 구성 형식은 모든 구성 위치(조직 수준, 리포지토리 수준 및 리포지토리 수준(파일))에 적용됩니다.

구성 파일은 `schema-version: v1.4`로 시작해야 하며, 그 뒤에 분석 구성이 포함된 `iac` 키가 와야 합니다.

전체 구조는 다음과 같습니다.

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  # Do not run these rules.
  ignore-rules:
    - A
    - B
  # Run only these rules. If this field is set, all other rules are ignored.
  use-rules:
    - A
  global-config:
    # Only analyze the following paths/files.
    only-paths:
      - "path/example"
      - "**/*.file"
    # Do not analyze the following paths/files.
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
    # Do not report findings with these severities.
    ignore-severities:
      - low
      - info
    # Report only findings with these severities.
    only-severities:
      - high
      - critical
    # Do not report findings with these rule types.
    ignore-categories:
      - "Best Practices"
    # Report only findings with these rule types.
    only-categories:
      - "Encryption"
    # Do not run rules from these platforms.
    ignore-platforms:
      - Dockerfile
    # Only run rules from these platforms.
    only-platforms:
      - Terraform
      - Kubernetes
      - CICD
  # Per-rule configurations.
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      ignore-paths:
        - "test/"
      severity: low
    kubernetes-deployment-without-resource-limits:
      only-paths:
        - "k8s/production/"
    cicd-github-unpinned-actions-full-length-commit-sha:
      arguments:
        allow:
          - libbpf/ci/run-qemu
{{< /code-block >}}

`iac` 키에서 지원되는 필드는 다음과 같습니다.

| **속성** | **유형** | **설명** |
| --- | --- | --- |
| `ignore-rules` | 배열 | 무시할 규칙 ID의 목록입니다. |
| `use-rules` | 배열 | 실행할 규칙 ID의 목록입니다. 지정된 경우 _이 규칙만_ 실행됩니다. `ignore-rules`가 `use-rules`보다 우선하므로 두 배열에 모두 포함된 규칙은 무시됩니다. |
| `global-config` | 객체 | IaC 스캐너의 전역 설정입니다. |
| `rule-configs` | 객체 | 규칙별 구성입니다. 키는 규칙 ID입니다. |

## 규칙 구성 {#rule-configuration}

실행할 규칙을 변경하려면 다음 단계를 따르세요.

- **특정 규칙만 실행**: `use-rules` 아래에 나열합니다.
- **특정 규칙 비활성화**: `ignore-rules` 아래에 나열합니다.

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  ignore-rules:
    - A
    - B
{{< /code-block >}}

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  use-rules:
    - A
{{< /code-block >}}

`A` 및 `B`와 같은 자리 표시자를 Code Security 규칙 ID로 바꿉니다. 레거시 규칙 ID도 하위 호환성을 위해 지원됩니다.

## 전역 구성 {#global-configuration}

`global-config` 객체는 리포지토리 전체의 설정을 제어합니다.

| **속성** | **유형** | **설명** |
| --- | --- | --- |
| `only-paths` | 배열 | 파일 경로 또는 glob 패턴입니다. 일치하는 파일만 분석됩니다. |
| `ignore-paths` | 배열 | 제외할 파일 경로 또는 glob 패턴입니다. 일치하는 파일은 분석되지 않습니다. |
| `only-severities` | 배열 | 보고할 중증도 수준입니다. 다른 중증도의 발견 결과는 보고되지 않습니다. |
| `ignore-severities` | 배열 | 무시할 중증도 수준입니다. |
| `only-categories` | 배열 | 보고할 규칙 유형입니다. 다른 규칙 유형의 발견 결과는 보고되지 않습니다. |
| `ignore-categories` | 배열 | 무시할 규칙 유형입니다. |
| `ignore-platforms` | 배열 | 제외할 플랫폼입니다. 이러한 플랫폼의 규칙은 적용되지 않습니다. |
| `only-platforms` | 배열 | 스캔할 플랫폼입니다. 다른 플랫폼의 규칙은 적용되지 않습니다. |

### 중증도 {#severities}

`ignore-severities`를 사용하여 중증도 수준에 따라 발견 결과를 무시하세요. `only-severities`를 사용하여 특정 중증도 수준만 보고하세요.

**가능한 값은 다음과 같습니다.**

- `critical`
- `high`
- `medium`
- `low`
- `info`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-severities:
      - info
      - low
{{< /code-block >}}

### 경로 {#paths}

`ignore-paths`를 사용하여 특정 파일 또는 디렉터리를 스캔에서 제외하세요. `only-paths`를 사용하여 특정 파일 또는 디렉터리만 스캔하세요. 이 옵션은 glob 패턴을 지원합니다.

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
{{< /code-block >}}

### 규칙 유형 {#rule-types}

`ignore-categories`를 사용하여 특정 규칙 유형의 발견 결과를 무시하세요. `only-categories`를 사용하여 특정 규칙 유형만 보고하세요.

**가능한 값은 다음과 같습니다.**

- `Access Control`
- `Availability`
- `Backup`
- `Best Practices`
- `Bill Of Materials`
- `Build Process`
- `Encryption`
- `Insecure Configurations`
- `Insecure Defaults`
- `Least Privilege`
- `Networking and Firewall`
- `Observability`
- `Resource Management`
- `Secret Management`
- `Structure and Semantics`
- `Supply-Chain`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-categories:
      - "Access Control"
      - "Best Practices"
{{< /code-block >}}

### 플랫폼 {#platforms}

`ignore-platforms`를 사용하여 특정 플랫폼을 제외하세요. `only-platforms`를 사용하여 특정 플랫폼만 스캔하도록 제한하세요.

**가능한 값은 다음과 같습니다.**

- `Ansible`
- `CICD`
- `CloudFormation`
- `Dockerfile`
- `Kubernetes`
- `Terraform`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    only-platforms:
      - Terraform
      - Kubernetes
{{< /code-block >}}

## 규칙별 구성 {#per-rule-configuration}

`rule-configs`를 사용하여 개별 규칙을 구성하세요.

`rule-configs` 아래의 각 키는 규칙 ID입니다. 규칙별로 다음 속성이 지원됩니다.

| **속성** | **유형** | **설명** |
| --- | --- | --- |
| `only-paths` | 배열 | 파일 경로 또는 glob 패턴입니다. 이 규칙은 이러한 패턴과 일치하는 파일에만 적용됩니다. |
| `ignore-paths` | 배열 | 제외할 파일 경로 또는 glob 패턴입니다. 이 규칙은 이러한 패턴과 일치하는 파일에는 적용되지 않습니다. |
| `arguments` | 객체 | 규칙 동작을 조정하는 규칙별 파라미터입니다. 지원되는 인수 이름과 값 유형은 규칙에 따라 다릅니다. |
| `severity` | 문자열 | 이 규칙에서 생성된 발견 결과의 중증도를 재정의합니다. 허용되는 값은 `critical`, `high`, `medium`, `low`, `info`입니다. |

### 규칙별 경로 범위 지정{#per-rule-path-scoping}

규칙을 특정 경로에서 제외하거나 특정 경로에만 적용하세요.

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      # Do not apply this rule in test directories.
      ignore-paths:
        - "test/"
        - "**/testdata/"
    kubernetes-deployment-without-resource-limits:
      # Apply this rule only in production manifests.
      only-paths:
        - "k8s/production/"
{{< /code-block >}}

경로 패턴은 glob 구문(`*`, `**`, `?`)을 지원합니다. 경로는 리포지토리 루트를 기준으로 합니다.

### 규칙별 중증도 재정의 {#per-rule-severity-override}

특정 규칙에서 생성된 발견 결과의 중증도를 변경하세요.

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      severity: low
{{< /code-block >}}

이 중증도는 해당 규칙에서 생성된 모든 발견 결과에 적용됩니다.

### 규칙별 인수{#per-rule-arguments}

`arguments`를 사용하여 특정 규칙의 파라미터를 설정하세요. 지원되는 인수 이름과 값 유형은 규칙에 따라 다릅니다. `rule-configs`의 규칙 ID 아래에 인수를 정의하세요.

다음 예시는 `cicd-github-unpinned-actions-full-length-commit-sha` 규칙을 구성하고 `libbpf/ci/run-qemu` 액션을 허용합니다.

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    cicd-github-unpinned-actions-full-length-commit-sha:
      arguments:
        allow:
          - libbpf/ci/run-qemu
{{< /code-block >}}

## 레거시 구성 {#legacy-configuration}

IaC Security는 이전에 다른 구성 파일(`dd-iac-scan.config`)과 스키마를 사용했습니다. 이 스키마는 지원이 중단되어 더 이상 업데이트되지 않지만 `datadog-iac-scanner` 리포지토리에 [문서화][2]되어 있습니다.

`iac` 섹션이 있는 `code-security.datadog.yaml` 파일은 두 파일이 모두 있는 경우 `dd-iac-scan.config`보다 우선합니다.

## 인라인 주석을 사용한 제외 구성 {#configure-exclusions-with-an-inline-comment}

파일에서 스캔할 부분을 제어하려면 `dd-iac-scan`을 포함한 주석을 추가하고 그 뒤에 명령과 필요한 값을 입력하세요. `dd-iac-scan` 앞에 해당 파일 형식의 주석 구문을 추가하세요. 인라인 제외는 사용된 파일 내에서만 적용됩니다.

### 지원되는 명령어 {#supported-commands}

| **주석**                      | **설명**                 |
|----------------------------------|---------------------------------|
| `dd-iac-scan ignore`             | 파일 전체를 무시합니다.        |
| `dd-iac-scan disable=<rule_id>`  | 특정 규칙을 무시합니다.         |
| `dd-iac-scan enable=<rule_id>`   | 특정 규칙만 포함합니다.   |
| `dd-iac-scan ignore-line`        | 단일 줄을 무시합니다.          |
| `dd-iac-scan ignore-block`       | 전체 블록을 무시합니다.        |

#### dd-iac-scan ignore {#dd-iac-scan-ignore}

파일 전체를 스캔에서 제외합니다. 이 주석을 적용하려면 파일 시작 부분에 배치해야 합니다.

{{< code-block lang="yaml" >}}
# dd-iac-scan ignore

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

#### dd-iac-scan disable=rule_id {#dd-iac-scan-disablerule-id}

이 파일에서 지정된 규칙에 대한 스캔 결과를 제외합니다. 이 주석을 적용하려면 파일 시작 부분에 배치해야 합니다.

{{< code-block lang="yaml" >}}
# dd-iac-scan disable=A,B

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

지정된 규칙의 발견 결과는 이 파일에서 무시됩니다. 레거시 규칙 ID도 하위 호환성을 위해 지원됩니다.

#### dd-iac-scan enable=rule_id {#dd-iac-scan-enablerule-id}

이 파일의 스캔 결과를 지정된 규칙으로만 제한합니다. 이 주석을 적용하려면 파일 시작 부분에 배치해야 합니다.

{{< code-block lang="yaml" >}}
# dd-iac-scan enable=A

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

이 파일의 스캔 결과에는 지정된 규칙의 발견 결과만 포함됩니다. 레거시 규칙 ID도 하위 호환성을 위해 지원됩니다.

#### dd-iac-scan ignore-line {#dd-iac-scan-ignore-line}

스캔 결과에서 이 주석 바로 다음 줄에 플래그가 지정되지 않도록 합니다. 이 주석은 파일 내 어디에나 배치할 수 있습니다.

{{< highlight yaml "hl_lines=3" >}}
resource "google_storage_bucket" "example" {
  # dd-iac-scan ignore-line
  name          = "image-store.com"
  location      = "EU"
  force_destroy = true
}
{{< / highlight >}}

이전 예시에서는 강조 표시된 줄의 발견 결과가 무시됩니다.

#### dd-iac-scan ignore-block {#dd-iac-scan-ignore-block}

스캔 결과에서 전체 리소스 블록과 해당 블록의 모든 키-값 쌍에 플래그가 지정되지 않도록 합니다. 이 주석은 파일 내 어디에나 배치할 수 있습니다.

{{< highlight yaml "hl_lines=2-6" >}}
# dd-iac-scan ignore-block
resource "google_storage_bucket" "example" {
  name          = "image-store.com"
  location      = "EU"
  force_destroy = true
}
{{< / highlight >}}

이전 예시에서는 강조 표시된 블록의 발견 결과가 무시됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/code_security/guides/configuration/
[2]: https://github.com/DataDog/datadog-iac-scanner/blob/main/legacy_config.md
[3]: /ko/security/code_security/iac_security/iac_rules/