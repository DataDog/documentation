---
algolia:
  tags:
  - iac security
  - infrastructure as code
  - custom rule
  - rego
description: Rego를 사용하여 사용자 지정 코드형 인프라(IaC) 보안 규칙을 생성, 테스트 및 게시합니다.
further_reading:
- link: https://www.datadoghq.com/blog/custom-iac-security-rules/
  tag: 블로그
  text: Datadog IaC Security 스캔에서 사용자 지정 규칙 적용
- link: /security/mcp_server/
  tag: 설명서
  text: Datadog MCP Server 보안 도구
title: IaC 사용자 지정 규칙
---
조직에만 국한한 요구 사항을 적용할 수 있도록 사용자 지정 보안 규칙을 생성합니다.

사용자 지정 규칙은 Open Policy Agent(OPA)의 정책 언어인 [Rego][1]를 사용하며, IaC 스캔 중에 기본 Datadog 규칙과 함께 실행됩니다. *규칙*은 저장된 객체(메타데이터, 샘플, 설명)이고, *정책*은 편집기에서 평가되는 Rego 블록입니다.

사용자 지정 규칙은 다음 플랫폼에서 사용할 수 있습니다.

- Ansible
- CI/CD(GitHub Actions)
- AWS CloudFormation
- Dockerfile
- Kubernetes
- Terraform

사용자 지정 규칙을 생성, 편집 또는 게시하려면 `appsec_vm_write` 권한이 필요합니다. 자세한 내용은 [역할 기반 액세스 제어][6]를 참조하세요. 규칙 계약, 구문 분석된 입력 및 플랫폼별 패턴에 대한 자세한 내용은 [IaC 사용자 지정 규칙 참조][2]를 참조하세요.

사용자 지정 규칙을 생성하는 방법에는 기존 규칙을 복제하거나 처음부터 새 규칙을 생성하는 두 가지가 있습니다. Datadog MCP Server에 연결된 AI 에이전트를 사용할 수도 있습니다. [MCP로 규칙 생성 및 관리](#create-and-manage-rules-with-mcp)를 참조하세요.

## 기존 규칙 복제 {#clone-an-existing-rule}

기존 검사를 수정하거나, 기존 규칙과 동일한 리소스 유형을 평가하거나, 플랫폼별 구문 분석, 리소스 명명 또는 소스 코드 위치에 공유 Datadog Rego 라이브러리를 사용하려는 경우 기본 규칙을 복제합니다.

1. IaC Rules 페이지에서 동일한 플랫폼 및 리소스 유형에 해당하는 기본 규칙이나 사용자 지정 규칙을 찾은 다음, 규칙의 액션 메뉴에서 {{< ui >}}Clone{{< /ui >}}을 선택합니다.
1. 복사된 메타데이터, 정책, 샘플 파일 및 설명을 업데이트합니다.
1. 규칙을 게시하지 않고 저장하려면 {{< ui >}}Save as draft{{< /ui >}}를 클릭하고, 즉시 게시하려면 {{< ui >}}Save and publish{{< /ui >}}를 클릭합니다.

   초안 규칙은 스캔에서 실행되지 않습니다. 초안을 나중에 게시하려면 IaC Rules 페이지에서 초안을 열고 게시합니다.

기본적으로 게시된 규칙은 지정된 플랫폼이 적용되는 후속 IaC 스캔에서 실행됩니다. 규칙 적용 방식을 세부 조정하려면 [IaC Security Configuration][5]을 참조하세요.

## 처음부터 규칙 생성 {#create-a-rule-from-scratch}

특정 항목에 초점을 맞춘 검사가 필요하고 해당 플랫폼의 구문 분석된 구조를 이해하고 있다면 규칙을 처음부터 생성합니다. 편집기에는 초기 정책과 샘플 파일이 제공됩니다.

이 예시는 상태가 `Suspended`로 명시적으로 설정된 `aws_s3_bucket_versioning` 리소스를 탐지하는 Terraform 규칙을 만듭니다. 이 규칙은 안전하지 않은 속성을 보고하고 권장 수정 방법을 제공합니다.

이 단계는 모든 플랫폼에 적용됩니다. 샘플 파일과 Rego 정책만 변경됩니다.

### 규칙 이름 지정 및 구성 {#name-and-configure-the-rule}

1. IaC Rules 페이지에서 {{< ui >}}Create rule{{< /ui >}}을 클릭합니다.
1. 규칙 이름을 입력한 다음 플랫폼, 범주 및 심각도를 선택합니다.

   필요시 **AWS**를 공급자로 설정하고 공통 취약성 목록(CWE) 식별자를 지정할 수 있습니다.

### 샘플 파일 추가 {#add-a-sample-file}

샘플 파일은 정책이 실행되는 대상 입력이므로 탐지하려는 잘못된 구성을 포함해야 합니다. 이 규칙의 경우 {{< ui >}}Test your policy{{< /ui >}} 아래의 초기 샘플을 다음 내용으로 바꿉니다.

```hcl
resource "aws_s3_bucket" "reports" {
  bucket = "example-reports-bucket"
}

resource "aws_s3_bucket_versioning" "reports" {
  bucket = aws_s3_bucket.reports.id

  versioning_configuration {
    status = "Suspended"
  }
}
```

Datadog은 `input.document[i].resource` 아래의 Terraform 리소스를 리소스 유형 및 리소스 레이블별로 그룹화하여 구문 분석합니다. 이 규칙에서는 다음을 사용하여 버전 관리 리소스를 선택할 수 있습니다.

```rego
some i, name
versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
```

이 표현식에서 `i`는 구문 분석된 문서를 식별하고 `name`은 Terraform 리소스 레이블인 `reports`입니다.

### 탐지 조건 작성 {#write-the-detection-condition}

탐지 조건은 규칙이 발견 결과를 보고하기 위해 참이어야 하는 표현식입니다. 이 규칙은 버전 관리 상태가 `Suspended`일 때 발견 결과를 생성합니다.

```rego
versioning.versioning_configuration.status == "Suspended"
```

상태 필드가 없으면 규칙은 발견 결과를 보고하지 않습니다. 자세한 내용은 [구문 분석된 입력][3]을 참조하세요.

### 발견 결과 생성 {#build-the-finding}

발견 결과는 탐지 조건이 일치할 때 Datadog이 보고하는 내용입니다. 영향을 받는 리소스와 소스 내 해당 리소스의 위치 및 수정 방법을 식별합니다. 각 요소를 결합하여 완전한 정책을 구성합니다.

이 예시 정책은 네 부분으로 구성됩니다.

- 탐지 조건을 `DatadogPolicy` 규칙으로 래핑합니다.
- 각 `aws_s3_bucket_versioning` 리소스를 선택합니다.
- 상태가 `Suspended`인 경우에만 발견 결과를 보고합니다.
- 권장 수정 방법을 포함한 네 개의 필수 필드로 구성된 `result` 객체를 추가합니다.

이 정책은 리소스 이름에 공유 라이브러리 사용, 정확한 `searchKey` 지정, `replacement` 수정이라는 세 가지 일반적인 관행도 따릅니다.

{{< ui >}}Rego policy{{< /ui >}} 아래에서 초기 정책을 다음 내용으로 바꿉니다.

```rego
package datadog

import data.generic.terraform as tf_lib

DatadogPolicy contains result if {
	some i, name
	versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
	versioning.versioning_configuration.status == "Suspended"

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_s3_bucket_versioning",
		"resourceName": tf_lib.resolve_s3_bucket_name(versioning, name),
		"searchKey": sprintf("aws_s3_bucket_versioning[%s].versioning_configuration.status", [name]),
		"remediation": json.marshal({
			"before": "Suspended",
			"after": "Enabled",
		}),
		"remediationType": "replacement",
	}
}
```

### 규칙 테스트 {#test-the-rule}

1. {{< ui >}}Run{{< /ui >}}을 클릭합니다.
1. 편집기에서 `status` 속성에 대한 발견 결과가 하나 보고되는지 확인합니다.
1. 샘플에서 `status`를 `Suspended`에서 `Enabled`로 변경합니다.
1. {{< ui >}}Run{{< /ui >}}을 클릭하고 정책에서 발견 결과가 보고되지 않는지 확인합니다.
1. `status`를 `Suspended`로 복원하고 예시를 저장하기 전에 정책을 다시 실행합니다.

편집기에서 평가 결과 대신 오류가 보고되면 [유효성 검사][4]를 참조하세요.

### 규칙 설명 {#describe-the-rule}

{{< ui >}}Say what's happening{{< /ui >}} 필드에 설명과 수정 권장 사항을 입력합니다. 예를 들면 다음과 같습니다.

```markdown
## Description

Suspending S3 bucket versioning prevents new object versions from being created and reduces protection against accidental deletion or overwrite.

## Remediation

Set `versioning_configuration.status` to `Enabled`.
```

### 규칙 저장 {#save-the-rule}

- {{< ui >}}Save as draft{{< /ui >}}를 클릭하여 규칙을 게시하지 않고 저장합니다. 초안 규칙은 스캔에서 실행되지 않습니다. 초안을 나중에 게시하려면 IaC Rules 페이지에서 초안을 열고 게시합니다.
- {{< ui >}}Save and publish{{< /ui >}}를 클릭하여 규칙을 즉시 게시합니다.

기본적으로 게시된 규칙은 지정된 플랫폼이 적용되는 후속 IaC 스캔에서 실행됩니다. 규칙 적용 방식을 세부 조정하려면 [IaC Security Configuration][5]을 참조하세요.

## MCP로 규칙 생성 및 관리 {#create-and-manage-rules-with-mcp}

AI 에이전트를 [Datadog MCP Server][7]에 연결하여 자연어 설명이나 직접 작성한 Rego를 기반으로 IaC 사용자 지정 규칙을 생성, 검증, 작성, 업데이트, 게시 및 삭제할 수 있습니다. [MCP Server에 연결][8]할 때 `security` 도구 세트를 활성화합니다. 사용 가능한 도구와 각 도구에 필요한 권한은 Datadog MCP Server 보안 도구 참조의 [코드형 인프라 사용자 지정 규칙][9]을 참조하세요.

## 규칙 수정 버전 {#rule-revisions}

규칙을 편집하면 새 수정 버전이 생성됩니다. 규칙 세부 정보 패널에서 다음을 수행할 수 있습니다.

- 규칙의 수정 버전 이력을 검토합니다.
- 두 수정 버전을 비교하여 변경된 내용을 확인합니다.
- 이전 수정 버전을 복원하여 규칙의 현재 상태로 적용합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.openpolicyagent.org/docs/policy-language
[2]: /ko/security/code_security/iac_security/custom_rules/guide/
[3]: /ko/security/code_security/iac_security/custom_rules/guide/#parsed-input
[4]: /ko/security/code_security/iac_security/custom_rules/guide/#validation
[5]: /ko/security/code_security/iac_security/configuration/#rule-configuration
[6]: /ko/account_management/rbac/permissions/#cloud-security-platform
[7]: /ko/mcp_server/
[8]: /ko/security/mcp_server/#quickstart
[9]: /ko/security/mcp_server/#infrastructure-as-code-custom-rules