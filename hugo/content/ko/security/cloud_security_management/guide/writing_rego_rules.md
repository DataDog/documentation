---
aliases:
- /ko/security_platform/cloud_security_management/guide/writing_rego_rules/
further_reading:
- link: /security/default_rules
  tag: 설명서
  text: 기본 보안 태세 관리 클라우드 설정 탐지 규칙 살펴보기
- link: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
  tag: 지침
  text: 프레임워크와 업계 벤치마크 알아보기
is_beta: true
title: Rego로 커스텀 규칙 작성
---

## 개요

오픈 정책 에이전트(OPA)는 클라우드 보안 태세를 결정하기 위한 다양한 리소스 검사 기능을 갖춘 오픈 소스 정책 언어인 [Rego][1]를 제공해 드립니다. Datadog에서 Rego로 커스텀 규칙을 작성하여 인프라스트럭처의 보안을 제어합니다. 

## 템플릿 모듈

Rego [정책][2]에서 규칙을 정의할 수 있고, 이 정책은 [모듈][3] 내에 정의되어 있습니다. Cloud Security Misconfigurations은 아래와 같은 모듈 템플릿을 사용해 작성 규칙을 간소화합니다.

```python
package datadog

import data.datadog.output as dd_output

import future.keywords.contains
import future.keywords.if
import future.keywords.in

eval(resource_type) = "skip" if {
    # 리소스를 건너 뛰는 경우 true로 평가하는 로직
} else = "pass" {
    # 리소스가 규칙을 준수하는 경우  true로 평가하는 로직
} else = "fail" {
    # 리소스가 규칙을 준수하지 않는 경우 true로 평가하는 로직
}

# 이 부분은 모든 규칙에서 변경되지 않습니다.
results contains result if {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}

```

이 모듈의 각 부분을 자세히 살펴보고 작동 방식을 이해합니다.

### 불러오기 구문

첫 번째 줄에는 `package datadog` 선언이 있습니다. [패키지][4]는 Rego 모듈을 하나의 네임스페이스로 그룹화하여 모듈을 안전하게 불러올 수 있도록 합니다. 현재 사용자 모듈 불러오기는 커스텀 규칙의 기능이 아닙니다. 모든 보안 태세 관리 규칙은 `datadog` 네임스페이스로 그룹화됩니다. 결과가 제대로 반환되도록 규칙을 `package datadog` 네임스페이스로 그룹화합니다. 

```python
import future.keywords.contains
import future.keywords.if
import future.keywords.in
```

다음 세 구문은 OPA 제공 키워드 [`contains`][5], [`if`][6], [`in`][7]을 불러옵니다. 해당 키워드를 사용하면 정규식 구문으로 규칙을 정의하여 가독성을 높일 수 있습니다. **참고:**[ `import future.keywords`]로 모든 키워드를 가져오는 것을 [권장][8]하지 않습니다.

```python
import data.datadog.output as dd_output
```

다음 줄은 Datadog 보안 태세 관리 시스템의 사양에 따라 결과를 포맷하는 Datadog 헬퍼(helper) 메서드를 가져옵니다. `datadog.output`는 리소스를 첫 번째 인수로, 리소스 검사 결과를 설명하는 문자열 `pass`, `fail` 또는 `skip`을 두 번째 인수로 지정하는 포맷 메서드가 있는 Rego 모듈입니다.

### 규칙

불러온 구문 다음에 다음과 같은 템플릿 모듈의 첫 번째 규칙이 옵니다.

```python
eval(resource) = "skip" if {
    resource.skip_me
} else = "pass" {
    resource.should_pass
} else = "fail" {
    true
}
```

본 규칙은 리소스를 평가하고 리소스 상태에 따라 결과를 문자열로 제공합니다. 필요에 따라 `pass`, `fail`, `skip`의 순서를 변경할 수 있습니다. 위의 규칙은 `skip_me`과 `should_pass`이 리소스에서 false거나 존재하지 않는 경우 `fail`을 기본값으로 사용합니다. 또는 다음과 같이 `pass`을 기본값으로 설정할 수 있습니다.

```python
eval(resource) = "skip" if {
    resource.skip_me
} else = "fail" {
    resource.should_fail
} else = "pass" {
    true
}
```

### 결과

템플릿 모듈의 마지막 섹션에서는 결과 세트를 빌드합니다.

```python
# 이 부분은 모든 규칙에서 변경되지 않습니다.
results contains result if {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}
```

본 섹션에서는 메인 리소스 유형에서 모든 리소스를 거치며 평가합니다. 보안 태세 관리 시스템이 처리할 결과 어레이를 생성합니다. [일부][9] 키워드는 메인 리소스 어레이에서 가져온 로컬 변수 `resource`를 선언합니다. `eval` 규칙은 모든 리소스에서 실행되어 `pass`, `fail` 또는 `skip`을 반환합니다. `dd_output.format` 규칙은 클라우드 보안에서 처리할 수 있도록 리소스 및 평가의 형식을 올바르게 지정합니다.

정책의 본 섹션은 수정할 필요가 없습니다. 대신 규칙을 복제할 때 **메인 리소스 유형 선택** 드롭다운에서 메인 리소스 유형을 선택하면 정책의 본 섹션에 삽입됩니다. `input.resources.some_resource_type`을 통해 리소스 어레이에 액세스할 수도 있으며 `some_resource_type`을 선택한 메인 리소스 유형(예: `gcp_iam_policy`)으로 대체할 수 있습니다.

## 규칙을 작성하는 다른 방법

본 템플릿은 커스텀 규칙 작성을 시작하도록 도와드립니다. 반드시 이 템플릿을 따를 필요는 없습니다. 대신 기존 기본 규칙을 복제하거나 자신만의 규칙을 처음부터 작성할 수 있습니다. 하지만 보안 태세 관리 시스템에서 결과를 해석하려면 반드시 Rego 모듈에서 `results`를 호출해야 하며 다음과 같은 형식을 사용해야 합니다.

```json
[
    {
        "result": "pass" OR "fail" OR "skip",
        "resource_id": "some_resource_id",
        "resource_type": "some_resource_type"
    }
]
```

## 더 복잡한 규칙 

위의 규칙 예는 리소스에서 `should_pass` 같은 기본 True 또는 False 플래그를 평가합니다. 예를 들어 다음과 같이 로지컬 `OR`을 표현하는 규칙을 생각해 보세요.

```python
bad_port_range(resource) {
    resource.port >= 100
    resource.port <= 200
} else {
    resource.port >= 300
    resource.port <= 400
}
```

이 규칙은 `port`가 `100` 과 `200` 사이 또는 `300`과 `400` 사이인 경우 true로 평가합니다. 이를 위해 `eval` 규칙을 다음과 같이 정의할 수 있습니다.

```python
eval(resource) = "skip" if {
    not resource.port
} else = "fail" {
    bad_port_range(resource)
} else = "pass" {
    true
}
```

리소스에 `port` 속성이 없는 경우 건너뛰고, 두 가지 '나쁨(bad)' 범위 중 하나에 속하는 경우 실패합니다.

규칙에서 하나 이상의 리소스 유형을 검토하고 싶을 때가 있습니다. 그럴 때는 **고급 규칙 옵션**의 드롭다운 메뉴에서 몇 가지 관련 리소스 유형을 선택합니다. 그런 다음 `related_resource_type`를 액세스하려는 관련 리소스로 대체하여 `input.resources.related_resource_type`을 통해 관련 리소스 어레이에 액세스합니다.

하나 이상의 리소스 유형에 대해 정책을 작성하는 경우, 각 메인 리소스에 대해 관련 리소스 유형의 모든 인스턴스를 반복하는 데 시간이 많이 소요될 수 있습니다. 다음 예시를 확인하세요.

```python
eval(iam_service_account) = "fail" if {
    some key in input.resources.gcp_iam_service_account_key
    key.parent == iam_service_account.resource_name
    key.key_type == "USER_MANAGED"
} else = "pass" {
    true
}

# 이 부분은 모든 규칙에서 변경되지 않습니다.
results contains result if {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}
```

이 규칙은 사용자가 관리하고 `gcp_iam_service_account`(메인 리소스 유형으로 선택한 리소스)와 일치하는 `gcp_iam_service_account_key` 인스턴스가 있는지 확인합니다. 서비스 계정에 사용자가 관리하는 키가 있는 경우 `fail` 결과를 생성합니다. `eval` 규칙은 모든 서비스 계정에 대해 실행되며, 모든 서비스 계정 키를 반복하여 계정과 일치하는 키를 찾으므로 `O(MxN)`의 복잡도를 가집니다. 여기서 M은 서비스 계정의 수이고 N은 서비스 계정 키의 수입니다. 

시간 복잡성을 크게 개선하려면 [세트 컴프리헨션(set comprehension)][11]으로 사용자가 관리하는 주요 부모 [세트][10]를 구축하세요.

```python
user_managed_keys_parents := {key_parent |
    some key in input.resources.gcp_iam_service_account_key
    key.key_type == "USER_MANAGED"
    key_parent = key.parent
}
```

서비스 계정에 사용자 관리 키가 있는지 확인하려면 `O(1)` 시간으로 세트를 쿼리합니다.

```python
eval(iam_service_account) = "fail" if {
    user_managed_keys_parents[iam_service_account.resource_name]
} else = "pass" {
    true
}
```

새로운 시간 복잡도는 `O(M+N)`입니다. Rego는 세트, 오브젝트, 어레이 [컴프리헨션(comprehensions)][12]을 제공하여 [컴포짓(composite) 값][13]을 빌드하여 쿼리하도록 도와드립니다.

## 자세히 알아보기

규칙, 모듈, 패키지, 컴프리헨션(comprehensions)에 대한 자세한 내용과 커스텀 규칙 작성에 대한 구체적인 지침은 [Rego 문서][2]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.openpolicyagent.org/docs/latest/#rego
[2]: https://www.openpolicyagent.org/docs/latest/policy-language/
[3]: https://www.openpolicyagent.org/docs/latest/policy-language/#modules
[4]: https://www.openpolicyagent.org/docs/latest/policy-language/#packages
[5]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordscontains
[6]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordsif
[7]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordsin
[8]: https://www.openpolicyagent.org/docs/latest/policy-language/#future-keywords
[9]: https://www.openpolicyagent.org/docs/latest/policy-language/#some-keyword
[10]: https://www.openpolicyagent.org/docs/latest/policy-language/#sets
[11]: https://www.openpolicyagent.org/docs/latest/policy-language/#set-comprehensions
[12]: https://www.openpolicyagent.org/docs/latest/policy-language/#comprehensions
[13]: https://www.openpolicyagent.org/docs/latest/policy-language/#composite-values