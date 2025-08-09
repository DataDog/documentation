---
description: Quality Gate 규칙 범위를 설정하는 방법을 알아봅니다.
further_reading:
- link: /quality_gates/setup
  tag: 설명서
  text: Quality Gate 게이트 설정 방법 알아보기
title: Quality Gate에서 규칙 범위 작동 방식 이해하기
---

## 개요

Quality Gate로 Datadog에서 신호에 기반하여 워크플로의 통과를 제어할 수 있습니다. 규칙을 만들 때 규칙을 평가해야 하는 시점를 명시하는 규칙 범위를 정의할 수 있습니다.

특정 CI 파이프라인에 관해 평가되는 규칙을 필터링하려면, 규칙을 생성할 때 커스텀 범위를 추가합니다. 이 프로세스에서는 빌드 설정에서 [`datadog-ci gate evaluate` 명령][1]과 함께 `--scope` 옵션을 사용해야 합니다.

예시:

```shell
datadog-ci gate evaluate --scope team:backend --scope team:frontend
```

## 규칙 범위 정의하기

`datadog-ci gate evaluate` 명령이 호출되면 명령 컨텍스트와 매칭되는 범위의 규칙이 평가됩니다. `backend` 또는 `frontend` 팀 태그가 지정된 규칙을 기준으로 필터링할 수 있습니다.

{{< img src="ci/rule_scope_always_evaluate.png" alt="항상 평가되는 규칙에 관한 규칙 범위" style="width:80%;">}}

각 범위(예: `branch`)에 대하여 포함 또는 제외되는 값을 선택할 수 있습니다.

- 포함된 값을 선택한 경우, 포함된 값 중 하나 이상이 명령 컨텍스트에 포함되어 있으면 규칙이 평가됩니다.
- 제외된 값을 선택한 경우, 제외된 값이 명령 컨텍스트의 일부라면 해당 규칙은 평가되지 않습니다.

`example-repository` 리포지토리의 `main`를 제외한 모든 브랜치에서 평가되는 규칙을 생성하려면, 다음 범위로 규칙을 생성할 수 있습니다.

1. `Select when to evaluate`를 클릭합니다. 
1. **Repository** 필드에 `example-repository`를 입력하고 **Include**를 클릭합니다. 
1. **Add Filter**를 클릭하고 **Branch**를 선택합니다. 
1. **Branch** 필드에 `main`을 입력하고 **Exclude**를 클릭합니다.

{{< img src="ci/scope_not_main_example_repository.png" alt="예시 리포지토리 및 비메인 브랜치에 대한 규칙 범위" style="width:90%;">}}

규칙에 범위에 포함되지 않는 경우, 해당 범위의 모든 값을 평가합니다.
예를 들어, 규칙에 `repository` 범위가 포함되지 않으면 모든 리포지토리를 평가합니다.

## 커스텀 범위 추가하기

브랜치 및 리포지토리외에도 커스텀 범위를 정의하여 특정 CI 파이프라인을 평가하는 규칙을 필터링할 수 있습니다.

{{< img src="quality_gates/setup/custom_scope.png" alt="Quality Gate의 규칙 범위에 커스텀 범위 추가하기" style="width:80%;">}}

규칙 생성 시 커스텀 범위를 추가하려면 다음을 따릅니다.

1. **+필터 추가**를 클릭하고 **커스텀 범위 **를 선택합니다.
2. 범위 이름을 정의합니다(예: `team`).
3. 범위에 포함 또는 제외되는 값을 정의합니다.

`branch` 및 `repository` 범위와는 다르게 커스텀 범위는 반드시 `--scope` 옵션으로 [`datadog-ci gate evaluate` 명령][1]에 전달해야 합니다.

예를 들어 `example-repository` 리포지토리를 평가하는 규칙을 만들 수 있지만, 팀이 `backend`인 경우에만 만들 수 있습니다.

1. `Select when to evaluate`를 클릭합니다. 
1. **Repository** 필드에 `example-repository`를 입력하고 **Include**를 클릭합니다. 
1. **Add Filter**를 클릭하고 **Custom scope**를 선택합니다.
1. 태그 이름을 입력하고 **Add Custom Scope**를 클릭합니다.

   {{< img src="quality_gates/setup/add_tag.png" alt="예시 리포지토리 및 팀 백엔드의 규칙 범위" style="width:50%;">}}

1. **team** 필드에 `backend`를 입력하고 **Include**를 클릭합니다.

{{< img src="ci/rule_scope_example_repository_team_backend.png" alt="예시 리포지토리 및 팀 백엔드의 규칙 범위" style="width:80%;">}}

해당 규칙은 `example-repository` 리포지토리의 CI 파이프라인에서 다음 명령이 호출될 시 평가됩니다.
- `datadog-ci gate evaluate --scope team:backend`

다음 명령이 대신 호출되면 규칙이 평가되지 **않습니다.**
- 팀을 지정하지 않을 경우 `datadog-ci gate evaluate`입니다.
- `backend` 이외의 특정 팀을 지정하는 경우 `datadog-ci gate evaluate --scope team:api --scope team:frontend`입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci