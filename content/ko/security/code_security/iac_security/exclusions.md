---
aliases:
- /ko/security/cloud_security_management/setup/iac_scanning/iac_scanning_exclusions/
further_reading:
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: 블로그
  text: Datadog IaC Security를 통해 잘못된 클라우드 구성이 프로덕션 환경에 영향을 미치는 것을 방지하세요.
- link: /security/code_security/iac_security
  tag: 설명서
  text: IaC Security
- link: /security/code_security/iac_security/setup
  tag: 설명서
  text: Code Security을 위한 IaC Security 설정
- link: /security/code_security/iac_security/iac_rules/
  tag: 설명서
  text: IaC Security 규칙
title: IaC Security 예외 구성
---

IaC(Infrastructure as Code) Security는 Terraform 파일에서 보안 설정 오류를 탐지합니다. 제외 기능을 사용하면 특정 규칙, 파일, 또는 이슈 범주를 무시하도록 설정하여 스캔 결과에 표시되는 탐지 항목을 제어할 수 있습니다.

## 제외 방법

다음을 사용해 제외를 구성할 수 있습니다.

- 심각도 수준, 파일 경로, 쿼리 ID, 카테고리에 대한 제외를 정의할 수 있는 구성 파일
- Terraform 파일 내 특정 발견을 무시할 수 있는 인라인 코멘트

<div class="alert alert-info">제외가 구성 파일과 인라인 코멘트 모두에 정의되어 있는 경우 구성 파일이 우선 순위로 적용됩니다.</div>

## 구성 파일을 사용한 제외 구성

1. 프로젝트 리포지토리의 루트 디렉터리에서 파일 이름이 `dd-iac-scan.config`인 파일을 생성합니다.
1. YAML, JSON, TOML, 또는 HCL 형식으로 필요한 제외를 추가합니다.
1. `dd-iac-scan.config` 파일을 리포지토리에 커밋합니다.

### 지원되는 제외

#### 심각도 제외

`exclude-severities`를 사용하여 심각도 수준 기준 발견을 제외합니다. 이 옵션에 여러 값을 제공하려면 옵션을 여러 번 설정하거나 목록으로 전달할 수 있습니다.

**가능한 값:**
- `critical`
- `high`
- `medium`
- `low`
- `info`  

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-severities:
  - "info"
  - "low"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-severities": [
     "info",
     "low"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-severities = [ "info", "low" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-severities" = ["info", "low"]
```

{{% /tab %}}
{{< /tabs >}}

#### 경로 제외

`exclude-paths`를 사용하여 검사에서 특정 파일이나 디렉터리를 제외합니다. 이 옵션은 glob 패턴을 지원합니다. 이 옵션에 여러 값을 제공하려면, 옵션을 여러 번 설정하거나 목록으로 전달합니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-paths:
  - "./shouldNotScan/*"
  - "dir/somefile.txt"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-paths": [
     "./shouldNotScan/*",
     "dir/somefile.txt"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-paths = [ "./shouldNotScan/*", "dir/somefile.txt" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-paths" = ["./shouldNotScan/*", "dir/somefile.txt"]
```

{{% /tab %}}
{{< /tabs >}}

#### 쿼리 제외

`exclude-queries`를 사용해 쿼리 ID별로 특정 쿼리를 제외합니다. 이 옵션에 여러 값을 제공하려면 옵션을 여러 번 옵션을 설정하거나 목록으로 전달합니다.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-queries:
  - "e69890e6-fce5-461d-98ad-cb98318dfc96"
  - "4728cd65-a20c-49da-8b31-9c08b423e4db"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-queries": [
     "e69890e6-fce5-461d-98ad-cb98318dfc96",
     "4728cd65-a20c-49da-8b31-9c08b423e4db"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-queries = [ "e69890e6-fce5-461d-98ad-cb98318dfc96", "4728cd65-a20c-49da-8b31-9c08b423e4db" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-queries" = ["e69890e6-fce5-461d-98ad-cb98318dfc96", "4728cd65-a20c-49da-8b31-9c08b423e4db"]
```

{{% /tab %}}
{{< /tabs >}}

#### 카테고리 제외

`exclude-categories`를 사용하여 특정 카테고리를 제외합니다. 이 옵션은 여러 번 사용하거나 문자열 표현의 목록으로 전달할 수 있습니다.

**가능한 값**:
- `Access Control`  
- `Availability`  
- `Backup`  
- `Best Practices`  
- `Build Process`  
- `Encryption`  
- `Insecure Configurations`  
- `Insecure Defaults`  
- `Networking and Firewall`  
- `Observability`  
- `Resource Management`  
- `Secret Management`  
- `Supply-Chain`  
- `Structure and Semantics`  
- `Bill Of Materials`  

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-categories:
  - "Access Control"
  - "Best Practices"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-categories": [
     "Access Control",
     "Best Practices"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-categories = [ "Access Control", "Best Practices" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-categories" = ["Access Control", "Best Practices"]
```

{{% /tab %}}
{{< /tabs >}}

## 인라인 코멘트로 제외 구성

파일의 어떤 부분을 검사할지 제어하려면, `# dd-iac-scan`으로 시작하는 주석을 추가하고 그 뒤에 명령어와 필요한 값을 작성하세요. 인라인 제외는 해당 주석이 사용된 파일 내에서만 적용됩니다.

<div class="alert alert-info">제외가 구성 파일과 인라인 코멘트 모두에 정의되어 있는 경우 구성 파일이 우선 순위로 적용됩니다.</div>

### 지원되는 명령

| **코멘트**                      | **설명**                 |
|----------------------------------|---------------------------------|
| `dd-iac-scan ignore`             | 전체 파일을 무시합니다.        |
| `dd-iac-scan disable=<query_id>` | 특정 쿼리를 무시합니다.       |
| `dd-iac-scan enable=<query_id>`  | 특정 쿼리만 포함합니다. |
| `dd-iac-scan ignore-line`        | 단일 라인만 무시합니다.          |
| `dd-iac-scan ignore-block`       | 전체 차단을 무시합니다.        |

#### dd-iac-scan ignore

전체 파일을 검사에서 제외합니다. 이 코멘트가 적용되려면 파일의 시작 부분에 위치해야 합니다.

```
# dd-iac-scan ignore

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

#### dd-iac-scan disable=query_id

이 파일에서 지정된 쿼리에 대한 검사 결과를 제외합니다. 적용되려면 이 코멘트가 파일의 시작 부분에 위치해야 합니다.

```
# dd-iac-scan disable=e592a0c5-5bdb-414c-9066-5dba7cdea370,e69890e6-fce5-461d-98ad-cb98318dfc96

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

이 파일에서는 지정된 쿼리에서 발생한 탐지 결과가 무시됩니다.

#### dd-iac-scan enable=query_id

이 파일의 검사 결과를 지정된 쿼리로만 제한합니다. 이 코멘트가 적용되려면 파일의 시작 부분에 위치해야 합니다.


```
# dd-iac-scan enable=e592a0c5-5bdb-414c-9066-5dba7cdea370

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

이 파일의 검사 결과에는 지정된 쿼리에서 발생한 탐지 결과만 포함됩니다.

#### dd-iac-scan ignore-line

이 코멘트는 검사 결과가 바로 다음 라인을 플래그 지정하는 것을 방지합니다. 이 코멘트는 파일 내 어느 위치에나 사용할 수 있습니다.

```
1: resource "google_storage_bucket" "example" {
2:  # dd-iac-scan ignore-line
3:  name          = "image-store.com"
4:  location      = "EU"
5:  force_destroy = true
6: }
```

라인 3의 발견은 무시됩니다.

#### dd-iac-scan ignore-block

검사 결과가 전체 리소스 블록과 모든 키-값 쌍을 플래그 지정하지 않도록 합니다. 이 코멘트는 파일 내 어느 위치에나 사용할 수 있습니다.

```
1: # dd-iac-scan ignore-block
2: resource "google_storage_bucket" "example" {
3:  name          = "image-store.com"
4:  location      = "EU"
5:  force_destroy = true
6: }
```

전체 블록과 관련된 발견(이 예에서 라인 2~6)이 무시됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}