---
description: Datadog MCP Server를 사용하여 AI 에이전트를 CI Visibility, Test Optimization 및
  Deployment Gates 데이터에 연결할 수 있습니다.
further_reading:
- link: mcp_server/setup
  tag: 설명서
  text: Datadog MCP Server 설정
- link: continuous_integration/
  tag: 설명서
  text: CI Visibility
- link: tests/
  tag: 설명서
  text: Test Optimization
- link: deployment_gates/
  tag: 설명서
  text: Deployment Gates
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: 블로그
  text: Datadog MCP Server를 사용하여 AI 에이전트를 Datadog 도구 및 컨텍스트에 연결
title: Software Delivery MCP 도구 시작하기
---
## 개요 {#overview}

[Datadog MCP Server][1]를 사용하면 AI 에이전트가 [Model Context Protocol(MCP)][2]을 통해 Software Delivery 데이터에 액세스할 수 있습니다. `software-delivery` 도구 세트는 Cursor, Claude Code 또는 OpenAI Codex와 같은 AI 기반 클라이언트에서 [CI Visibility][3], [Test Optimization][4], [Code Coverage][8], [DORA Metrics][9] 및 [Deployment Gates][10]와 직접 상호 작용하기 위한 도구를 제공합니다.

## 사용 사례 {#use-cases}

Software Delivery MCP 도구는 다음 작업을 위한 AI 지원 워크플로우를 제공합니다.

- **파이프라인 실패 디버깅**: AI 에이전트에게 최근 파이프라인 실패를 찾고 오류 로그를 분석하며 수정 사항을 제안하도록 요청합니다.
- **불안정한 테스트 식별**: 리포지토리에서 불안정한 테스트를 쿼리하고 가장 먼저 수정할 항목에 대한 권장 사항을 우선순위별로 받을 수 있습니다.
- **CI 성능 분석**: 파이프라인 기간, 실패율 및 시간 경과에 따른 추세에 대한 집계 통계를 제공합니다.
- **테스트 실패 분류**: 실패하는 테스트, 해당 테스트의 담당자, 과거 패턴을 파악할 수 있습니다.
- **코드 커버리지 검토**: 브랜치 또는 커밋에 대한 커버리지 요약을 제공합니다(패치 커버리지 및 서비스 또는 코드 소유자별 분석 포함).
- **DORA 메트릭 측정**: 서비스 또는 팀별로 배포 빈도, 변경 리드 타임, 변경 실패율 및 복구 시간을 쿼리합니다.
- **테스트 최적화 설정 확인**: Test Impact Analysis, Early Flake Detection, Auto Test Retries를 포함하여 서비스에 대해 활성화된 Test Optimization 기능을 표시합니다.
- **실패한 CI 작업 재시도**: 에이전트 세션을 종료하지 않고 실패한 GitHub Actions 또는 GitLab 작업에 대한 재시도를 대기열에 추가합니다.
- **PR 상태 확인**: 풀 리퀘스트에 대한 CI 실패, 코드 커버리지, 품질 또는 보안 위반 사항의 통합 보기를 제공합니다.
- **Deployment Gate 실패 조사**: 게이트 실패를 일으킨 규칙과 해당 실패로 인해 배포가 차단되었는지 확인합니다.
- **Deployment Gate 구성 검토**: 서비스 및 환경에 적용되는 게이트와 규칙을 확인합니다.

## 사용 가능한 도구 {#available-tools}

`software-delivery` 도구 세트에는 다음 도구가 포함되어 있습니다.

`search_datadog_ci_pipeline_events`
: 필터를 사용하여 CI 파이프라인 이벤트를 검색하고 실패, 기간 및 상태에 대한 세부 정보를 가져옵니다.

`aggregate_datadog_ci_pipeline_events`
: 평균 기간, 실패 횟수 및 백분위수 분석과 같은 통계를 위해 CI 파이프라인 이벤트를 집계합니다.

`get_datadog_flaky_tests`
: 실패율, 카테고리, 소유자 및 CI 영향 등 분류 세부 정보가 포함된 불안정한 테스트를 찾습니다.

`update_datadog_flaky_test_states`
: 하나 이상의 불안정한 테스트 상태를 `quarantined`(실패 억제), `disabled`(테스트 건너뛰기), `fixed`(해결됨으로 표시) 또는 `active`(복원)로 설정합니다. 이 작업은 쓰기 작업이며 `TestOptimizationWrite` 권한 및 명시적인 사용자 승인이 필요합니다. 모든 상태 변경은 되돌릴 수 있습니다.

`aggregate_datadog_test_events`
: 테스트 이벤트를 집계하여 안정성 및 성능 추세를 분석합니다.

`search_datadog_test_events`
: 필터를 사용하여 테스트 이벤트를 검색하고 관련 세부 정보를 가져옵니다.

`get_datadog_code_coverage_branch_summary`
: 리포지토리 브랜치의 집계된 코드 커버리지 요약 메트릭을 가져옵니다. 여기에는 총 커버리지, 패치 커버리지 및 서비스/코드 소유자 분석이 포함됩니다.

`get_datadog_code_coverage_commit_summary`
: 리포지토리 커밋의 집계된 코드 커버리지 요약 메트릭을 가져옵니다. 여기에는 총 커버리지, 패치 커버리지 및 서비스/코드 소유자 분석이 포함됩니다.

`get_datadog_test_optimization_settings`
: 서비스에 대해 활성화된 Test Optimization 기능을 검색합니다. 여기에는 Test Impact Analysis(ITR), Early Flake Detection(EFD), Auto Test Retries(ATR), Failed Test Replay, Code Coverage 수집 및 PR 코멘트가 포함됩니다.

`get_datadog_flaky_tests_management_policies`
: 리포지토리에 대해 구성된 Flaky Tests Management 정책을 검색합니다. 여기에는 자동 격리 기간, 브랜치 규칙, 실패율 임계값, 비활성화 정책 및 재시도 설정이 포함됩니다.

`search_dora_deployments`
: 필터를 사용하여 DORA 배포 이벤트를 검색하거나 ID별로 단일 배포에 대한 전체 세부 정보를 가져옵니다. 집계된 추세(배포 빈도, 변경 리드 타임, 실패율)를 살펴보려면 대신 `aggregate_dora_deployments`를 사용하세요.

`aggregate_dora_deployments`
: DORA 메트릭(배포 빈도, 변경 리드 타임, 변경 실패율 및 복구 시간)을 스칼라 값 또는 시계열 형태로 집계합니다. 완전한 DORA 요약을 살펴보려면 이 도구를 각 메트릭마다 한 번씩, 병렬로 4회 호출하세요.

`retry_datadog_ci_job`
: GitHub Actions 또는 GitLab에서 실패한 CI 작업에 대한 재시도를 대기열에 추가합니다. CI 상태를 수정하는 쓰기 작업으로, `CiVisibilityWrite` 권한이 필요합니다. 서버 측 제한에 따라 7일 동안 작업당 최대 2회까지 재시도가 제한됩니다. 다른 CI 공급자의 경우 해당 공급자의 UI를 사용하여 다시 실행하세요.

`search_datadog_deployment_gates`
: 서비스 또는 환경별로 구성된 Deployment Gates를 검색합니다. 평가 결과가 아닌 게이트 구성을 반환합니다.

`get_datadog_deployment_gate`
: 게이트 ID별로 구성된 Deployment Gate 하나를 가져옵니다(해당 규칙 및 설정 포함).

`search_datadog_deployment_gate_evaluations`
: 서비스, 환경 또는 상태(`in_progress`, `pass` 또는 `fail`)별로 Deployment Gate 평가를 검색합니다. 기본적으로 지난 24시간을 검색하며 최대 30일까지 검색할 수 있습니다.

`get_datadog_deployment_gate_evaluation`
: 각 규칙의 결과와 함께 Deployment Gate 평가를 가져옵니다. 게이트가 실패한 이유를 설명하는 데 사용하세요.

`search_datadog_deployment_gate_rule_evaluations`
: Deployment Gate 평가 전반에서 개별 규칙 결과를 검색합니다. 결과에는 모니터링 트리거 또는 Watchdog 인사이트와 같은 실패 증거가 포함됩니다. 서비스에 대해 가장 자주 실패하는 규칙을 찾을 때 사용하세요.

Deployment Gates 도구는 읽기 전용이며 `DeploymentGatesRead` 권한이 필요합니다. 드라이 런 상태의 게이트와 규칙은 평가되더라도 배포를 차단하지 않으므로, `dry_run: true`인 `fail` 상태는 배포가 진행되었음을 의미합니다.

## 프롬프트 예시 {#example-prompts}

연결 후 다음과 같은 프롬프트를 시도해 보세요.

- 내 커밋 `58b1488`에 대한 모든 파이프라인을 보여 줘.
- 내 브랜치에서 `integration-test` 작업이 실패한 원인이 뭐야?
- 체크아웃 서비스의 활성 불안정한 테스트를 실패율 순으로 정렬하여 보여 줘.
- 지난 2주 동안 실패한 파이프라인은 몇 개였지?
- 파이프라인 이름별로 그룹화한 파이프라인 실행 시간의 95백분위수를 보여 줘.
- `github.com/my-org/my-repo`의 `main` 브랜치 코드 커버리지는 뭐야?
- 커밋 `abc123abc123abc123abc123abc123abc123abcd`에 대한 커버리지 메트릭을 보여 줘.
- 지난 30일 동안 `checkout` 서비스의 배포 빈도와 변경 실패율은 뭐야?
- `auth-service`에 어떤 Test Optimization 기능이 활성화되어 있지?
- `checkout-service` 리포지토리에서 활성인 모든 불안정한 테스트를 격리해 줘.
- 마지막 배포에서 `prod`의 `checkout`에 대한 Deployment Gate가 실패한 이유가 뭐야?
- `prod`의 `checkout` 서비스에 대한 Deployment Gate 규칙 중 드라이 런 상태인 것은 뭐야?
- 지난 7일 동안 `payments` 서비스에 대해 가장 자주 실패한 Deployment Gate 규칙은 뭐야?

## 설정 {#setup}

Software Delivery 도구를 사용하려면 `software-delivery` 도구 세트가 활성화된 상태로 Datadog MCP Server에 연결합니다. [Datadog 사이트][5]의 엔드포인트 URL에 `toolsets` 쿼리 파라미터를 추가합니다.

```text
https://mcp.{{< region-param key="dd_site" >}}/v1/mcp?toolsets=core,software-delivery
```

Cursor, Claude Code, VS Code 및 기타 AI 클라이언트에 대한 클라이언트 구성을 포함한 전체 설정 지침은 [Datadog MCP Server 설정][1]을 참조하세요.

## Agent 스킬 {#agent-skills}

Agent 스킬은 일반적인 Software Delivery 워크플로를 자동화하는 AI 코딩 에이전트용으로 사전 구축된 지침 세트입니다. `dd-software-delivery` 스킬 세트는 [Datadog agent-skills][6] 리포지토리에서 사용할 수 있습니다. 실시간 CI 및 Test Optimization 데이터를 사용하여 불안정한 테스트를 분류하고 실패한 PR 파이프라인의 차단을 해제하는 2가지 스킬을 제공합니다.

`software-delivery` MCP 도구 세트를 연결하면 사용자의 프롬프트가 도구 세트의 용도에 부합할 때 AI 어시스턴트가 스킬을 자동으로 로드합니다. 예를 들어, "TestCheckoutServiceIntegration이 CI에서 계속 실패하는데, 조사해줘"라고 입력하면 별도의 설치 없이 `/triage-flaky-test`가 로드됩니다.

슬래시 명령을 사용하여 스킬을 명시적으로 호출하려면 로컬에 설치하세요.

### 설치 {#install}

```shell
npx skills add datadog-labs/agent-skills \
  --skill unblock-pr \
  --skill triage-flaky-test \
  --full-depth -y
```

설치 후 Claude Code를 다시 시작하면 슬래시 명령이 나타납니다.

Datadog MCP 서버에 연결되면 각 스킬은 해당 서버를 자동으로 사용하고 그렇지 않은 경우 [pup][7] CLI로 폴백합니다. pup 폴백을 사용하려면 pup을 설치하고 인증하세요.

```shell
brew install datadog-labs/pack/pup
pup auth login
```

### 사용 가능한 스킬 {#available-skills}

| 스킬 | 호출 방법 | 기능 |
|-------|-------------|-------------|
| 불안정한 테스트 분류 | `/triage-flaky-test` | 특정 불안정한 테스트에 대한 이력, 실패 패턴 및 AI 카테고리를 가져온 다음 수정, 격리 또는 에스컬레이션을 권장합니다. |
| PR 차단 해제 | `/unblock-pr` | PR에 대한 각 CI 실패를 불안정, 인프라 또는 성능 저하로 분류하고, 코드 커버리지와 품질 또는 보안 위반 사항을 표면화하며, 목표 조치를 제안합니다 |

### 불안정한 테스트 분류 {#triage-flaky-test}

`/triage-flaky-test`는 특정 불안정한 테스트를 조사합니다. 30일간의 실패 이력을 가져오고 주요 오류 메시지와 스택 트레이스를 추출하며 해당 테스트가 영향을 미친 파이프라인 수를 확인합니다. 불안정한 카테고리와 스택 트레이스를 기반으로 타겟팅된 수정 사항을 제안하거나 근본 원인이 불분명할 경우 격리를 권장합니다. 수정, 격리 또는 담당 팀으로 에스컬레이션 권장 사항이 포함된 구조화된 분류 요약 보고서를 생성합니다.

스킬이 격리를 권장하는 경우 제안된 조치를 제시하며 작성 전에 사용자의 명시적인 승인을 요구합니다. 모든 상태 변경은 되돌릴 수 있습니다.

```
/triage-flaky-test TestCheckoutServiceIntegration
/triage-flaky-test TestCheckoutServiceIntegration github.com/my-org/my-service
```

### PR 차단 해제 {#unblock-pr}

`/unblock-pr`은 실패하는 PR CI 파이프라인을 조사합니다. 각 실패 작업에 대해 해당 실패가 기본 브랜치나 다른 브랜치에 이미 존재했는지 확인합니다. 이 스킬은 실패를 **불안정**, **인프라** 또는 **성능 저하**로 분류합니다. 동시에 브랜치의 코드 커버리지 및 코드 품질을 가져오거나 PR 인사이트에서 보안 위반 사항을 가져옵니다. 작업별 분류, 증거, 권장 조치와 커버리지 및 위반 사항을 요약하는 PR 상태 섹션이 포함된 분류 요약 보고서를 생성합니다.

불안정한 실패의 경우 더 심층적인 조사를 위해 `triage-flaky-test`로 스킬이 연계됩니다. GitHub Actions 또는 GitLab에서의 일시적인 인프라 실패에 대해서는 `retry_datadog_ci_job`(MCP) 또는 `gh run rerun`(pup 폴백, GitHub Actions만 해당)을 사용하여 실패한 작업을 재시도하며, 다른 CI 공급자의 경우에는 해당 공급자의 UI로 연결되는 링크를 제공합니다. 성능 저하의 경우 코드 변경 사항을 조사하라는 메시지가 표시됩니다.

**참고**: PR 상태 섹션의 코드 품질 및 보안 위반 데이터는 MCP 도구 세트가 필요하며 이러한 데이터는 pup 모드에서는 사용할 수 없습니다.

```
/unblock-pr
/unblock-pr feat/add-retry-logic
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /ko/continuous_integration/
[4]: /ko/tests/
[5]: /ko/getting_started/site/
[6]: https://github.com/datadog-labs/agent-skills
[7]: https://github.com/DataDog/pup
[8]: /ko/code_coverage/
[9]: /ko/delivery_performance/dora_metrics/
[10]: /ko/deployment_gates/