---
description: Datadog에서 품질 게이트 규칙을 설정하는 방법을 알아보세요.
further_reading:
- link: /quality_gates
  tag: 설명서
  text: 품질 게이트에 대해 알아보기
title: 품질 게이트 규칙 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">현재 선택한 ({{< region-param key="dd_site_name" >}}) 사이트에서 품질 게이트를 사용할 수 없습니다.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
품질 게이트는 퍼블릭 베타 서비스입니다.
{{< /callout >}}

## 개요

일반적으로 품질 게이트를 설정하려면:
1. Datadog 사이트에서 하나 이상의 규칙을 생성합니다.
2. 파이프라인의 `datadog-ci gate evaluate` 명령어로 품질 게이트를 불러옵니다.

## 규칙 생성하기

기관용 품질 게이트를 생성하려면 사용자 계정에 `quality_gate_rules_write` [권한][1]이 있어야 합니다.

1. Datadog에서 [**CI** > **품질 게이트 규칙**][2]으로 이동하여 **+새 규칙**을 클릭합니다.
2. 규칙 범위를 정의합니다. 해당 규칙 범위는 규칙을 평가하는 시기를 정의합니다. 예를 들어, 특정 리포지토리 및 분기에서만 평가되는 규칙을 생성할 수 있습니다. 규칙의 범위를 정의하려면 `select when to evaluate`로 전환하여 해당 범위에 포함되거나 포함되지 않는 규칙을 추가합니다. 자세한 내용을 확인하려면 [규칙 범위](#rule-scope)를 참조하세요.
3. 규칙 유형을 선택합니다. `Static Analysis` 및 `Test`를 선택할 수 있습니다.
4. 규칙 조건을 정의합니다. 규칙 조건은 해당 규칙이 실패하여 관련 파이프라인이 실패하는 시나리오를 의미합니다(규칙이 차단하는 경우). 선택한 규칙 유형에 대한 기존 규칙 조건 중에서 하나를 선택할 수 있습니다.

다음 예시는 특정 커밋에 "오류" 상태 및 "보안" 카테고리가 도입된 하나 이상의 정적 분석 위반이 발생한 경우 실패하는 정적 분석 규칙을 생성하는 방법을 설명합니다.

   {{< img src="ci/qg_rule_condition_sa_errors_security_2.png" alt="정적 분석 보안 오류 규칙" style="width:80%;">}}

5. 파이프라인이 실패한 경우 규칙이 해당 파이프라인을 차단할지 여부를 선택합니다.
   비차단 규칙은 새로운 규칙을 도입하고 차단 전 해당 규칙의 동작을 식별하고 싶을 경우 유용합니다.
6. 쿼리 평가 기간을 선택합니다.
7. 생성 중인 규칙을 설명하는 규칙 이름을 지정합니다.
8. **규칙 저장**을 클릭합니다.


## 품질 게이트 불러오기

품질 게이트를 사용하려면 [`datadog-ci`][7] `2.27.0` 이상 버전이 필요합니다.

[`datadog-ci gate evaluate`][4] 명령을 호출하여 품질 게이트를 불러옵니다.

해당 명령:

1. 현재 파이프라인 컨텍스트(명령에 전달된 리포지토리, 브랜치 또는 사용자 지정 범위)와 매칭되는 [규칙 범위](#rule-scope) 및 [사용자 지정 범위](#custom-scope)가 있는 모든 규칙을 불러옵니다.
2. 매칭되는 모든 규칙을 평가합니다.
3. 하나 이상의 차단 규칙이 실패하면 실패로 간주되며, 해당 파이프라인이 차단됩니다.

<div class="alert alert-danger">명령이 정확하게 동작하려면 해당 이벤트(테스트, 정적 분석 위반)가
<strong>datadog-ci 게이트 평가</strong> 명령이 실행되기 <code>전</code>에 Datadog에 전송되어야 합니다.
그렇지 않으면 해당 규칙은 이벤트의 부재로 인해 잘못된 동작으로 간주될 수도 있습니다.
</div>

| 환경 변수 | 설명 |
|---|---|
| `DD_API_KEY` | [Datadog API 키][5]를 포인팅합니다. |
| `DD_APP_KEY` | [Datadog 애플리케이션 키][6]를 포인팅합니다. |
| `DD_SITE` | (옵션) 특정 [Datadog 사이트][12]를 포인팅합니다(기본값: `datadoghq.com`). |

예시:

```shell
DD_SITE={{< region-param key="dd_site" >}} DD_API_KEY=API_KEY DD_APP_KEY=APP_KEY datadog-ci gate evaluate
```

다음 플래그를 사용하여 `datadog-ci gate evaluate` 명령의 동작을 설정할 수 있습니다.

- `--fail-on-empty`: 매칭되는 규칙을 찾지 못하면 명령이 실패합니다.
현재 파이프라인 콘텍스트에 기반합니다. 기본적으로 해당 명령은 성공합니다.
- `--fail-if-unavailable`: 내부 문제로 인해 하나 이상의 규칙을 평가할 수 없는 경우 명령은 실패합니다.
기본적으로 해당 명령은 성공합니다.
- `--timeout`: 본 명령은 지정한 시간(초)이 지나면 명령 실행을 중지합니다. 시간 제한 기본값은 10분입니다.
명령 수행은 대개 몇 분 내에 완료되지만 더 오래 걸릴 수도 있습니다.
- `--no-wait`: Skips the default time that the command waits for the events (for example, tests, static analysis violations) to arrive to Datadog. The default wait time makes sure that the events are queryable in Datadog before the rules are executed, avoiding incorrect evaluations. If, in your pipeline, the job containing the `datadog-ci gate evaluate` command is called several minutes after the related events are sent to Datadog, you can opt to skip this waiting time by specifying the `--no-wait` 플래그. 그러나 본 플래그를 잘못 사용할 경우 규칙 평가 결과가 부정확할 수도 있습니다.

[커스텀 범위](#custom-scope)를 다음 `--scope` 옵션을 한 번 이상 사용하여 명령에 추가합니다.

```shell
datadog-ci gate evaluate --scope team:backend --scope team:frontend
```

로그 명령을 점검하여 전체 게이트 평가 상태와 평가한 규칙에 대한 정보를 확인할 수 있습니다.

{{< img src="ci/datadog_ci_gate_evaluate_logs.png" alt="Datadog-ci 게이트 평가 로그" style="width:90%;">}}

## 규칙 범위
품질 게이트 기능을 사용하면 Datadog에서 신호에 기반하여 워크플로우를 게이트할 수 있습니다. 정적 분석과 테스트라는 두 가지 규칙을 생성할 수 있습니다. 예를 들어, 신규 [취약 테스트][1], 코드 보안 위반 또는 CI/CD 파이프라인이 실패하지 않고 프로덕션에 배포되는 기타 문제가 발생한 경우 코드가 병합되는 것을 차단할 수 있습니다.

규칙 생성 시 해당 규칙을 평가해야 하는 시기를 명시하는 범위를 정의할 수 있습니다. 규칙 범위를
`always evaluate`로 설정하면 해당 규칙은 모든 리포지토리와 브랜치에서 평가됩니다.
품질 게이트를 사용하면 기본 브랜치에 병합되는 항목과 최종 배포되는 항목을 제어할 수 있습니다. 이를 통해 프로덕션에서 실행되는 코드가 높은 품질 기준을 충족할 수 있게 하고 인시던트를 줄여 원치 않는 동작을 최소화할 수 있습니다.

{{< img src="ci/rule_scope_always_evaluate.png" alt="항상 평가되는 규칙에 대한 규칙 범위" style="width:90%;">}}


`datadog-ci gate evaluate` 명령이 호출되면 명령 컨텍스트와 매칭되는 범위의 규칙이 평가됩니다.

각 범위(예: `branch`)에 대해 포함 또는 제외되는 값을 선택할 수 있습니다.
포함되는 값을 선택하면, 포함되는 값 하나 이상이 명령 컨텍스트의 일부인 경우 해당 규칙이 평가됩니다.

제외된 값을 선택한 경우, 제외된 값이 명령 컨텍스트의 일부라면 해당 규칙은 평가되지 않습니다.

## 규칙 생성

예를 들어, `example-repository` 리포지토리의 `main`를 제외하고 모든 브랜치에서 평가되는 규칙을 생성하려면 다음과 같이 범위를 정의합니다.

{{< img src="ci/scope_not_main_example_repository.png" alt="예시 리포지토리 및 비메인 브랜치에 대한 규칙 범위" style="width:90%;">}}

규칙에 범위에 포함되지 않는 경우, 해당 범위의 모든 값을 평가합니다.
예를 들어, 규칙에 `repository` 범위가 포함되지 않으면 모든 리포지토리를 평가합니다.

### 커스텀 범위

브랜치 및 리포지토리외에도 커스텀 범위를 정의하여 특정 CI 파이프라인을 평가하는 규칙을 필터링할 수 있습니다.

규칙 생성 시 커스텀 범위를 추가하려면 다음을 따릅니다.

1. **+필터 추가**를 클릭하고 **커스텀 범위 **를 선택합니다.
2. 범위 이름을 정의합니다(예: `team`).
3. 범위에 포함 또는 제외되는 값을 정의합니다.

`branch` 및 `repository` 범위와는 다르게, 커스텀 범위를  '--scope' 옵션을 사용하여 `datadog-ci gate evaluate` 명령에 전달해야 합니다.
예를 들어, `example-repository` 리포지토리를 평가하는 규칙을 생성할 수 있지만 팀이 `backend`인 경우에만 해당 규칙을 만들 수 있습니다.

{{< img src="ci/rule_scope_example_repository_team_backend.png" alt="예시 리포지토리 및 팀 백엔드에 대한 규칙 범위" style="width:90%;">}}

해당 규칙은 `example-repository` 리포지토리의 CI 파이프라인에서 다음 명령이 호출될 시 평가됩니다.
- `datadog-ci gate evaluate --scope team:backend`

다음 명령이 대신 호출되면 규칙이 평가되지 **않습니다.**
- 팀을 지정하지 않을 경우 `datadog-ci gate evaluate`입니다.
- `backend` 이외의 특정 팀을 지정하는 경우 `datadog-ci gate evaluate --scope team:api --scope team:frontend`입니다.

## 규칙 관리

품질 게이트 규칙을 수정하려면 [품질 게이트 규칙 페이지][2]에서 **크리에이터** 아바타 오른쪽의 **편집** 아이콘을 클릭합니다.

{{< img src="ci/edit_quality_gate_rule.png" alt="품질 게이트 규칙 편집" style="width:90%;">}}

품질 게이트 규칙을 삭제하려면 [품질 게이트 규칙 페이지][2]에서 **편집** 버튼 옆의 **삭제** 아이콘을 클릭합니다. 또는 규칙을 편집하고 **규칙 삭제**를 클릭하여 삭제할 수도 있습니다.

{{< img src="ci/delete_quality_gate_rule.png" alt="품질 게이트 규칙 삭제" style="width:90%;">}}

## GitHub 점검 생성 활성화

평가한 각 규칙에 대해 [GitHub 점검][9]을 자동으로 생성할 수 있습니다. 본 기능을 사용 설정하면 평가 결과가 GitHub에 직접 표시됩니다.
본 점검에는 실패 사유 및 Datadog의 매칭 이벤트 등, 규칙 평가에 대한 추가 정보가 포함되어 있습니다.

GitHub 점검을 활성화하려면:
1. [GitHub 통합 타일][10]로 이동합니다. 해당 통합이 설정되어 있지 않거나 통합 내에 GitHub 앱이 없다면 [GitHub 통합 설명서][11] 지침에 따라 설정하세요.
2. `Checks: Write`에 GitHub 애플리케이션 접근 권한을 부여합니다.

권한을 얻게 되면 GitHub에서 해당 점검을 확인할 수 있습니다.

**참고**: 점검을 재실행해도 해당 품질 게이트 규칙은 재실행되지 않습니다.

## 권한

`quality_gate_rules_write` 권한이 있는 사용자만 품질 게이트 규칙을 생성 및 편집할 수 있습니다. `quality_gate_rules_read` 권한이 있는 사용자는 품질 게이트 규칙을 열람할 수 있습니다.

자세한 정보를 확인하려면 [RBAC 허가 설명서][1]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions
[2]: https://app.datadoghq.com/ci/quality-gates
[3]: /ko/account_management/audit_trail/events/#ci-visibility-events
[4]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/gate/README.md
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://github.com/DataDog/datadog-ci/blob/master/README.md
[8]: /ko/continuous_integration/guides/flaky_test_management/
[9]: https://docs.github.com/en/rest/checks
[10]: https://app.datadoghq.com/integrations/github
[11]: https://docs.datadoghq.com/ko/integrations/github/
[12]: /ko/getting_started/site/