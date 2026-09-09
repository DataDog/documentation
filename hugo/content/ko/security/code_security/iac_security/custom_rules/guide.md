---
description: Rego 계약, 구문 분석된 입력, 공유 라이브러리, 결과 필드 및 테스트 관행을 참조하세요.
title: IaC 사용자 지정 규칙 참조
---
이 IaC 사용자 지정 규칙 참조는 규칙 계약, 구문 분석된 입력 및 플랫폼별 패턴을 설명합니다.

사용자 지정 규칙 생성에 대한 지침과 처음부터 규칙을 만드는 예제는 [IaC 사용자 지정 규칙][2]을 참조하세요.

## 규칙 계약 {#rule-contract}

Datadog은 사용자 지정 규칙을 [Rego][1] v1으로 평가합니다. 모든 사용자 지정 규칙은 다음을 수행해야 합니다.

- `package datadog`을 선언합니다.
- 이름이 `DatadogPolicy`인 부분 집합 규칙을 하나 이상 정의합니다.

   동일한 정책 내에 여러 `DatadogPolicy` 규칙을 정의할 수 있습니다. 각 성공적인 평가는 별도의 결과를 생성합니다.

- 각 위반에 대해 `result` 객체를 `DatadogPolicy`에 추가하세요.
- 모든 [필수 결과 필드](#result-fields)를 설정하세요.

이 Terraform 규칙은 계약을 충족합니다.

```rego
package datadog

import data.generic.terraform as tf_lib

DatadogPolicy contains result if {
	some i, name
	resource := input.document[i].resource.aws_s3_bucket[name]
	resource.acl == "public-read"

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_s3_bucket",
		"resourceName": tf_lib.resolve_s3_bucket_name(resource, name),
		"searchKey": sprintf("aws_s3_bucket[%s].acl", [name]),
	}
}
```

## 구문 분석된 입력 {#parsed-input}

Datadog은 샘플 파일을 구문 분석하고 `input.document` 하에서 Rego에 노출합니다. 각 항목에는 `id` 및 플랫폼별 필드가 포함되어 있습니다. 예:

```rego
some i, document in input.document
```

모든 플랫폼에 대해 `documentId`를 결과를 생성한 구문 분석된 문서의 `id`로 설정하세요. 플랫폼은 문서의 나머지 부분을 탐색하는 방법을 결정하며, `documentId`를 도출하는 방법을 결정하지 않습니다.

Rego는 누락된 필드에 대한 참조를 정의되지 않은 것으로 처리합니다. 정의되지 않은 필드에 대한 등식 표현식은 결과를 생성하지 않습니다. 규칙이 누락된 속성과 명시적 값을 구분해야 할 때는 `object.get`, `not` 또는 `data.generic.common.valid_key`와 같은 도우미를 사용하세요.

## 결과 필드 {#result-fields}

| 필드 | 필수 | 설명 |
| ----- | -------- | ----------- |
| `documentId` | 예 | 위반 사항이 포함된 구문 분석된 문서의 `id`입니다. |
| `resourceType` | 예 | 보고되는 리소스의 실제 유형으로, `aws_s3_bucket`, `Pod` 또는 `AWS::S3::Bucket` 등이 있습니다. |
| `resourceName` | 예 | Terraform 리소스 레이블, Kubernetes 메타데이터 이름 또는 CloudFormation 논리 ID와 같이 리소스에 유용한 이름입니다. |
| `searchKey` | 예 | 강조 표시할 소스 콘텐츠에 대한 플랫폼별 로케이터입니다. |
| `remediation` | 아니요 | 기계 적용 가능한 소스 변경입니다. `remediationType`과 함께 설정하세요. |
| `remediationType` | 아니요 | 수정 작업에 의해 적용된 작업입니다. `remediation`과 함께 설정하세요. |

규칙 설명의 `## Remediation` 섹션은 사람이 읽을 수 있는 지침입니다. 선택적 결과 필드인 `remediation` 및 `remediationType`은 자동화된 소스 변경을 설명합니다.

### 수정 형식 {#remediation-formats}

누락된 속성이나 블록을 삽입하려면 `addition`을 사용하세요. 삽입할 소스 텍스트로 `remediation`을 설정하세요.

```rego
"remediation": "versioning {\n\tenabled = true\n}",
"remediationType": "addition",
```

기존 값을 변경하려면 `replacement`를 사용하세요. 허용된 현재 값과 그 대체 값을 인코딩하세요.

```rego
"remediation": json.marshal({
	"before": "Suspended",
	"after": "Enabled",
}),
"remediationType": "replacement",
```

탐지 위치에서 식별된 콘텐츠를 삭제하려면 `removal`을 사용하세요. 제거되는 항목에 대한 간단한 설명으로 `remediation`을 설정하세요.

```rego
"remediation": "Remove the insecure resource.",
"remediationType": "removal",
```

규칙이 신뢰할 수 있는 자동 편집을 제공할 수 없는 경우, 두 수정 필드를 모두 생략하고 규칙 설명에 수동 수정 방법을 설명하세요.

### 탐지 결과 위치 {#finding-locations}

`searchKey`는 Rego 경로가 아니라 스캐너별 소스 로케이터입니다. 형식은 플랫폼에 따라 다릅니다.

여러 플랫폼에서 기본 규칙은 형식 문자열 내의 이중 중괄호로 삽입된 값을 래핑합니다. 예를 들어 <code>sprintf("run=&#123;&#123;%s&#125;&#125;", [run])</code>. 이는 `run={{checkout}}`. The platform input patterns include equivalent `concat` or nested `sprintf`와 같은 로케이터를 생성하며, 이를 편집기에 붙여넣을 수 있습니다.

사용 가능한 가장 정확하고 안정적인 위치를 사용하세요.

- 존재하는 경우 정확한 보안되지 않은 속성을 가리키세요.
- 누락된 속성의 경우, 포함하는 리소스나 속성 블록을 가리키세요.
- 파일에 반복되는 키가 포함될 수 있는 경우 식별 값을 `={{...}}` 항목과 함께 포함하세요.
- 중첩된 객체를 보고할 때 워크로드, 태스크, 스테이지, 작업 또는 컨테이너 식별 정보를 포함하세요.

`"tasks"` 또는 `"metadata.name"`과 같은 부정확한 로케이터는 파일에 여러 리소스나 컨테이너가 포함되어 있을 때 잘못된 줄을 강조 표시할 수 있습니다. 편집기의 마커를 사용하여 대표 샘플을 기준으로 위치를 확인하세요.

## 공유 라이브러리 {#shared-libraries}

사용자 지정 규칙은 공통 및 플랫폼 Datadog 라이브러리를 가져올 수 있습니다.

```rego
import data.generic.common as common_lib
import data.generic.terraform as tf_lib
```

다음 플랫폼 패키지를 사용할 수 있습니다.

- `data.generic.ansible`
- `data.generic.cicd`
- `data.generic.cloudformation`
- `data.generic.dockerfile`
- `data.generic.k8s`
- `data.generic.terraform`

공유 라이브러리는 직접 필드 액세스로 재현하기 어려운 동작을 처리합니다. 예로는 Ansible 모듈 별칭, GitHub Actions 트리거 형식, Kubernetes 워크로드 포드 사양, Terraform 리소스 이름 및 CloudFormation 참조가 있습니다.

## 플랫폼 입력 패턴 {#platform-input-patterns}

이 섹션의 예제는 기본 규칙에서 파생된 프로덕션 지향 패턴을 보여줍니다. 편집기의 시작 정책은 의도적으로 더 작게 구성되어 있으며 제공된 샘플만 처리할 수 있습니다. 기본 규칙이 유사한 리소스를 평가할 때, 플랫폼 도우미, 소스 위치 및 리소스 상관관계 제약 조건을 보존하기 위해 해당 리소스를 복제하세요.

### Ansible {#ansible}

Ansible 모듈은 짧은 이름, 정규화된 컬렉션 이름 및 기타 별칭으로 나타날 수 있습니다. Ansible 라이브러리를 사용하여 task 및 모듈 변형을 반복하세요.

```rego
import data.generic.ansible as ans_lib

canonical := "uri"

some id, task_index
task := ans_lib.tasks[id][task_index]
some variant in ans_lib.variants_for(canonical)
module := task[variant]
ans_lib.checkState(module)
```

정식 모듈 이름을 `resourceType`으로, 리소스 이름을 `ans_lib.resource_name`으로 사용하고 `searchKey`에 task 및 모듈 변형을 포함하세요. 기본 규칙은 종종 다음과 같은 단일 형식 문자열을 사용합니다: <code>sprintf("name=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;.url", [task.name, variant])</code>. 이에 상응하는 구성은 다음과 같습니다.

```rego
"searchKey": sprintf("name=%s.%s.url", [
	concat("", ["{{", task.name, "}}"]),
	concat("", ["{{", variant, "}}"]),
])
```

### CI/CD {#cicd}

CI/CD 사용자 지정 규칙은 GitHub Actions 워크플로를 평가합니다. 워크플로 트리거는 문자열, 배열 또는 객체일 수 있으므로 하나의 YAML 형태를 가정하기보다는 CI/CD 라이브러리를 사용하세요.

```rego
import data.generic.cicd as cicd_lib

some document in input.document
cicd_lib.check_provider(document) == "github"
cicd_lib.has_dangerous_trigger(document)
```

기본 규칙은 `github_action`, `github_workflow`, `github_job`, `github_step`과 같은 리소스 유형을 사용합니다. 단계 값의 경우 <code>sprintf("uses=&#123;&#123;%s&#125;&#125;", [uses])</code> 항목과 같은 리터럴 로케이터가 정확한 소스 라인을 식별합니다.

### AWS CloudFormation {#aws-cloudformation}

CloudFormation 리소스는 `Resources` 아래의 논리적 ID로 키가 지정됩니다.

```rego
import data.generic.cloudformation as cf_lib

some document in input.document
some logical_id, resource in document.Resources
resource.Type == "AWS::S3::Bucket"
```

리소스 유형으로 `resource.Type`을 사용하고 이름으로 `cf_lib.resource_name(resource, logical_id)`을 사용하세요. 누락된 속성은 해당 속성을 포함하는 블록에 고정할 수 있습니다.

```rego
"searchKey": sprintf("Resources.%s.Properties", [logical_id])
```

### Dockerfile {#dockerfile}

Dockerfile 지침은 빌드 단계별로 `document.command` 아래에 그룹화됩니다.

```rego
import data.generic.dockerfile as dockerfile_lib

some i, stage
instruction := input.document[i].command[stage][_]
instruction.Cmd == "add"
not dockerfile_lib.arrayContains(instruction.Value, {".tar", ".tar."})
```

로케이터에 빌드 단계와 원본 명령을 포함하세요. 기본 규칙은 종종 다음을 사용합니다. <code>sprintf("FROM=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;", [stage, instruction.Original])</code>:

```rego
"searchKey": sprintf("FROM=%s.%s", [
	concat("", ["{{", stage, "}}"]),
	concat("", ["{{", instruction.Original, "}}"]),
])
```

### Kubernetes {#kubernetes}

Kubernetes 검사는 종종 포드와 배포와 같은 워크로드에 중첩된 포드 사양에 적용됩니다. `spec_info`를 사용하여 유효한 포드 사양을 찾으세요.

```rego
import data.generic.k8s as k8s_lib

some document in input.document
spec_info := k8s_lib.spec_info(document)
some container in spec_info.spec.containers
container.securityContext.privileged == true
```

`searchKey`에 워크로드 이름, 포드 사양 경로, 컨테이너 이름 및 보안되지 않은 필드를 포함하세요. 기본 규칙은 종종 다음을 사용합니다. <code>sprintf("metadata.name=&#123;&#123;%s&#125;&#125;.%s.containers.name=&#123;&#123;%s&#125;&#125;.securityContext.privileged", [document.metadata.name, spec_info.path, container.name])</code>:

```rego
"searchKey": sprintf(
	"metadata.name=%s.%s.containers.name=%s.securityContext.privileged",
	[
		concat("", ["{{", document.metadata.name, "}}"]),
		spec_info.path,
		concat("", ["{{", container.name, "}}"]),
	],
)
```

동일한 요구 사항이 초기화 컨테이너에 적용될 때 `initContainers`를 별도로 검사하세요.

### Terraform {#terraform}

Terraform 리소스는 리소스 유형 및 레이블별로 그룹화됩니다.

```rego
some i, name
resource := input.document[i].resource.aws_s3_bucket[name]
```

공급자 리소스 유형을 `resourceType`으로 사용하세요. 플랫폼 도우미는 `bucket`, `cluster_id` 또는 `name`과 같은 필드를 사용하는 리소스의 이름을 확인할 수 있습니다.

```rego
import data.generic.terraform as tf_lib

"resourceName": tf_lib.resolve_s3_bucket_name(resource, name)
```

Terraform `searchKey` 값은 일반적으로 리소스 유형 및 레이블로 시작합니다.

```rego
"searchKey": sprintf("aws_s3_bucket[%s].acl", [name])
```

공급자 버전은 구성을 별도의 리소스로 이동할 수 있습니다. 여러 공급자 버전, 모듈, 관련 리소스 또는 Terraform plan JSON을 검사해야 할 때 시작점으로 동등한 기본 규칙을 사용하세요. `Suspended` 버전 관리 상태와 같이 명시적인 속성 값만 검사하는 규칙은 누락된 리소스를 감지하지 못합니다.

## 리소스 상관관계 {#resource-correlation}

일부 검사는 여러 리소스, 모듈, 작업 또는 워크로드를 비교합니다. `input.document` 전체에서 제약 없는 조인을 피하세요. 관련 없는 리소스를 연결하여 중복된 결과를 생성할 수 있습니다.

기존 규칙을 조정할 때 문서, 네임스페이스, 워크플로, 빌드 스테이지 및 리소스 참조 제약 조건을 유지하세요.

## 테스트 커버리지 {#test-coverage}

최소한 다음 사항을 테스트하세요.

- 결과를 생성해야 하는 구성입니다.
- 탐지 결과를 생성해서는 안 되는 규정 준수 구성입니다.
- 기본값이 중요한 경우 누락된 값과 명시적 값입니다.
- 한 파일 내의 여러 리소스입니다.
- Ansible 모듈 별칭이나 GitHub Actions 트리거 형식과 같이 플랫폼에서 지원하는 대체 구문입니다.
- 규칙이 상관관계를 수행할 때 별도의 범위에 있는 관련 리소스입니다.

## 검증 {#validation}

편집기는 Rego 구문 이상을 확인합니다. 샘플을 평가하기 전에 Datadog은 정책이 [규칙 계약](#rule-contract) 섹션의 요구 사항을 충족하는지 확인하며, 추가로 다음 사항을 확인합니다.

- `sprintf` 호출에서 올바른 개수의 인수를 사용합니다.
- 공통 및 선택된 플랫폼 라이브러리로 컴파일됩니다.
- `http.send` 또는 `opa.runtime`와 같은 제한된 내장 함수를 호출하지 않습니다.

탐지 결과가 없는 평가를 해석하기 전에 보고된 모든 오류를 수정합니다. 유효성 검사 오류는 정책이 성공적으로 실행되지 않았음을 의미합니다.

[1]: https://www.openpolicyagent.org/docs/policy-language
[2]: /ko/security/code_security/iac_security/custom_rules/