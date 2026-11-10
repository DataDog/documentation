---
description: Datadog MCP Server를 사용하여 AI 에이전트를 Agent Observability 트레이스 및 실험에 연결하세요.
further_reading:
- link: mcp_server
  tag: 설명서
  text: Datadog MCP Server
- link: /llm_observability/experiments
  tag: 설명서
  text: Agent Observability 실험 설정 및 사용
- link: /llm_observability/monitoring
  tag: 설명서
  text: Agent Observability로 애플리케이션 모니터링하기
- link: /llm_observability/guide/claude_code_skills
  tag: 가이드
  text: Claude Code 기술로 LLM 애플리케이션 분석하기
title: Agent Observability MCP 및 기술
---
## 개요 {#overview}

[Datadog MCP Server][1]를 사용하면 AI 에이전트가 Model Context Protocol(MCP)을 통해 [Agent Observability][2] 데이터에 액세스할 수 있습니다. `llmobs` 툴셋은 Cursor, Claude Code 또는 OpenAI Codex와 같은 AI 기반 클라이언트에서 직접 트레이스를 검색 및 분석하고, 스팬 세부 정보와 콘텐츠를 검사하며, 실험 결과를 평가하기 위한 도구를 제공합니다.

## 설정 {#setup}

`llmobs` 툴셋이 활성화된 상태에서 MCP 호환 클라이언트를 Datadog MCP Server에 연결하세요.

<div class="alert alert-info">Cursor 및 VS Code 확장 구성 등 전체 설정 지침은 <a href="/mcp_server/setup/">Datadog MCP Server 설정</a>을 참조하세요.</div>

### 전제 조건 {#prerequisites}

- Agent Observability 데이터에 액세스할 수 있는 권한이 있는 Datadog 계정.
- MCP 호환 클라이언트(예: Claude Code, Codex CLI, Cursor, Gemini CLI, Kiro CLI).

### 엔드포인트 {#endpoint}

MCP 서버 엔드포인트는 [Datadog 사이트][5]에 따라 다릅니다. {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 사이트의 엔드포인트를 표시하세요. Agent Observability 및 핵심 툴셋을 활성화하려면 `?toolsets=llmobs,core`를 추가하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
선택한 사이트({{< region-param key="dd_site_name" >}})에 대한 엔드포인트:
<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 제품은 선택한 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

### 연결 {#connect}

가능한 경우 원격 인증을 선택하십시오. 환경에서 원격 OAuth 흐름을 차단하는 경우 로컬 바이너리 인증을 사용하세요.

{{< tabs >}}
{{% tab "원격 인증" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
원격 인증은 MCP 사양의 [스트림 가능한 HTTP][1] 전송을 사용합니다.

**Claude Code**(명령줄):

<pre><code>claude mcp add --transport http datadog-mcp "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core"</code></pre>

**Codex CLI**(`~/.codex/config.toml`):

<pre><code>[mcp_servers.datadog]
url = "{{< region-param key="mcp_server_endpoint" >}}"
http_headers = { "X-Datadog-MCP-Toolsets" = "llmobs,core" }
</code></pre>

구성을 추가한 후 `codex mcp login datadog`을 실행하여 OAuth 흐름을 완료하세요.

**Gemini CLI, Kiro CLI 및 기타 MCP 호환 클라이언트**:

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core"
    }
  }
}
</code></pre>

[1]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 제품은 선택한 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "로컬 바이너리 인증" %}}

로컬 바이너리 인증은 MCP 사양의 [stdio][2] 전송을 사용합니다. 원격 인증을 사용할 수 없는 경우 이 방법을 사용하세요.

1. Datadog MCP Server 바이너리를 설치합니다.

    ```bash
    curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
    ```

    The binary installs to `~/.local/bin/datadog_mcp_cli`.

2. OAuth 로그인 흐름을 완료합니다.

    ```bash
    datadog_mcp_cli login
    ```

3. AI 클라이언트를 구성합니다. Claude Code의 경우, 다음을 `~/.claude.json`에 추가하고 명령 경로에서 `<USERNAME>`을 바꿉니다

    ```json
    {
      "mcpServers": {
        "datadog": {
          "type": "stdio",
          "command": "/Users/<USERNAME>/.local/bin/datadog_mcp_cli",
          "args": [],
          "env": {}
        }
      }
    }
    ```

    Alternatively, add the server with the Claude Code CLI:

    ```bash
    claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli
    ```

[2]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#stdio
{{% /tab %}}
{{< /tabs >}}

### API 키로 인증 {#authenticate-with-api-keys}

MCP 서버는 기본적으로 OAuth 2.0을 사용합니다. OAuth를 사용할 수 없는 경우, Datadog [API 키 및 애플리케이션 키][6]를 `DD_API_KEY` 및 `DD_APPLICATION_KEY` HTTP 헤더로 보내세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core",
      "headers": {
          "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
          "DD_APPLICATION_KEY": "&lt;YOUR_APPLICATION_KEY&gt;"
      }
    }
  }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 제품은 선택한 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

보안을 위해 API 키와 애플리케이션 키의 범위를 필수 권한만 있는 [서비스 계정][7]으로 제한하세요.

## Agent 스킬 {#agent-skills}

Agent 스킬은 일반적인 Agent Observability 워크플로를 자동화하는 AI 코딩 에이전트용으로 사전 빌드된 지침 세트입니다. `agent-observability` 스킬 세트는 [Datadog agent-skills][8] 저장소에서 사용할 수 있습니다. 세션 분류, 장애 진단, 실험 분석, `ddtrace.llmobs` SDK를 사용한 실험 코드 생성, 실시간 운영 데이터에 대한 평가자 부트스트래핑을 위한 6가지 기술을 제공합니다.

### 설치 {#install}

다음 명령어로 `agent-observability` 스킬을 설치하세요.

```shell
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
```

이 스킬을 사용하려면 `llmobs` MCP 툴셋이 연결되어 있어야 합니다. 아직 연결하지 않았다면 다음을 실행하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>claude mcp add --scope user --transport http "datadog-llmo-mcp" \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 제품은 선택한 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

두 명령어를 모두 실행한 후 Claude Code를 다시 시작하세요.

### 사용 가능한 스킬 {#available-skills}

| 스킬 | 호출 방법 | 기능 |
|-------|-------------|-------------|
| Session classify | `/agent-observability-session-classify` | 세션, 트레이스 또는 배치에서 사용자 의도가 충족되었는지 분류 |
| Trace RCA | `/agent-observability-trace-rca` | 실패한 운영 트레이스에 대한 근본 원인 분석 |
| Experiment analyzer | `/agent-observability-experiment-analyzer` | LLM 실험 결과 분석 및 비교 |
| Experiment Python codegen | `/agent-observability-experiment-py-bootstrap` |  SDK를 사용하여 Python 실험 코드 생성`ddtrace.llmobs` 앱을 내부적으로 검사하여 실제 `task_fn`을 연결하고, `.env` 자격 증명을 자동 검색하며, 평가자 선택을 지시하는 자유 형식의 `--purpose`를 허용|
| Eval bootstrap | `/agent-observability-eval-bootstrap` | 평가자 코드 생성, 온라인 LLM-judge 평가자 게시 또는 실험에 사용할 데이터 세트로 트레이스 샘플링 |
| Eval pipeline | `/agent-observability-eval-pipeline` | 운영 트레이스부터 평가자, 데이터 세트, 실험 및 분석까지 이어지는 6단계 가이드 파이프라인입니다. `--stop-after`를 사용하여 조기 중단하고, `--start-at` |을 사용하여 중간부터 재개하세요.

#### 세션 분류 {#session-classification}

`/agent-observability-session-classify`는 주어진 상호 작용에서 사용자 의도가 충족되었는지 분류합니다. 최대 3개의 신호 소스:  Agent Observability 트레이스, RUM 행동 데이터, Audit Trail 이벤트를 활용합니다. 이 스킬은 `yes / partial / no` 판정을 뒷받침하는 근거와 함께 반환합니다. 추가적인 신호 소스가 늘어날 때마다 신뢰도가 향상됩니다.

```
/agent-observability-session-classify session_id=<SESSION_ID>
/agent-observability-session-classify trace_id=<TRACE_ID>
/agent-observability-session-classify ml_app=my-chatbot --timeframe now-7d
```

#### 트레이스 근본 원인 분석 {#trace-root-cause-analysis}

`/agent-observability-trace-rca`는 LLM 애플리케이션이 왜 좋지 않은 결과를 생성하는지 진단합니다. 가장 강력한 가용 신호(LLM-judge 평가 판정, 런타임 오류 또는 구조적 이상)를 기반으로 분석 모드를 선택하고 구조화된 RCA 보고서를 컴파일합니다. 보고서에는 실패 분류와 트레이스 증거에 기반한 구체적인 `BEFORE` / `AFTER` 수정 제안이 포함됩니다.

Claude Code가 코드베이스에 액세스할 수 있으면 이 기술은 관련 소스 파일을 검색하고 인라인으로 diff를 제안할 수 있습니다.

```
/agent-observability-trace-rca ml_app=my-chatbot
/agent-observability-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

#### 평가자 부트스트랩 {#evaluator-bootstrap}

`/agent-observability-eval-bootstrap`은 운영 트레이스를 분석하고 관찰된 실패 모드를 대상으로 하는 평가자 제품군을 제안합니다. 오프라인 실험을 위한 : Python `BaseEvaluator` / `LLMJudge` 클래스, 프레임워크에 구애받지 않는 JSON 사양, Datadog에 직접 게시되는 온라인 LLM-judge 평가자, 또는 `--emit-dataset <path>`를 통해 운영 트레이스에서 샘플링되고 `DatasetRecordRaw[]`를 위해 형성된 `LLMObs.create_dataset(records=...)` JSON의 네 가지 아티팩트 중 하나를 출력합니다. dataset-emit 모드는 평가자 워크플로를 완전히 건너뛰며, 실험 입력으로 사용하기에 적합한 데이터셋을 생성합니다.

```
/agent-observability-eval-bootstrap ml_app=my-chatbot
/agent-observability-eval-bootstrap ml_app=my-chatbot --publish
/agent-observability-eval-bootstrap ml_app=my-chatbot --data-only
/agent-observability-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json
```

#### Experiment analyzer {#experiment-analyzer}

`/agent-observability-experiment-analyzer`는 실험 결과를 검색하고 후보와 기준 간에 무엇이 변경되었는지:  어떤 메트릭이 개선되었고 어떤 메트릭이 퇴보했으며 후보가 어디에서 성능이 저조했는지 알려줍니다.

```
/agent-observability-experiment-analyzer experiment_id=<EXPERIMENT_ID>
/agent-observability-experiment-analyzer experiment_id=<CANDIDATE_ID> baseline_id=<BASELINE_ID>
```

#### Python SDK로 실험 코드 생성 {#generate-experiment-code-with-the-python-sdk}

`/agent-observability-experiment-py-bootstrap`은 `ddtrace.llmobs` SDK를 사용하고 표준 참조 노트북 스타일과 일치하는 독립형 `.py` 스크립트 또는 Jupyter `.ipynb` 노트북을 생성합니다.

데이터셋은 로컬 `DatasetRecordRaw[]` JSON(파일에 인라인됨), CSV(`LLMObs.create_dataset_from_csv`를 통해 런타임에 로드됨), 이름별 기존 Datadog 데이터셋(`LLMObs.pull_dataset`) 또는 기본적으로 작은 인라인 3개 레코드 샘플일 수 있습니다. 생성된 모든 실험에는 `generated_by=claude-code` 및 `config`와 `tags` 모두에서 확인된 `--purpose`가 태그로 지정됩니다.

```
/agent-observability-experiment-py-bootstrap --purpose "validate output accuracy"
/agent-observability-experiment-py-bootstrap --purpose "test tool selection" --dataset ./data/qa.json
/agent-observability-experiment-py-bootstrap --dataset-name <DATASET_NAME> --project-name <PROJECT_NAME>
/agent-observability-experiment-py-bootstrap --task-source mymodule.handlers:respond
```

#### End-to-end eval pipeline {#end-to-end-eval-pipeline}

`/agent-observability-eval-pipeline`은 운영 트레이스부터 평가자, 데이터셋, 실험, 분석까지 설명이 포함된 6단계의 과정을 거치며, 다음 각 단계 사이에 사용자 체크포인트가 있습니다.

1. **ml_app 트레이스 분류**: `ml_app`에서 최근 트레이스를 샘플링하고 분류합니다.
2. **근본 원인 분석**: 실패한 트레이스가 왜 실패하는지 진단합니다.
3. **부트스트랩 평가자**: 관찰된 실패 모드를 대상으로 하는 평가자 제품군을 제안합니다.
4. **데이터셋 생성 + 게시**: input/expected_output 쌍을 `DatasetRecordRaw[]` JSON으로 추출하고 프로젝트(필요 시 생성) 아래의 Datadog에 게시합니다.
5. **실험 생성 + 실행**: 데이터셋을 가져와 앱의 작업 함수를 연결하는 실행 가능한 `.py` 또는 `.ipynb`를 내보낸 다음, 이를 엔드투엔드로 실행하고 `experiment.url`을 캡처합니다. codegen과 실행 사이에 인페이스 검토 비트(`run` / `edit` / `stop`)가 있어 실행 전에 생성된 파일을 검사할 수 있습니다.
6. **실험 분석**: 메트릭 분석 및 권장 사항이 포함된 분석 보고서를 생성합니다.

각 단계에는 표준 약칭이 있으며, `--start-at` 및 `--stop-after`에서도 동일한 값을 허용합니다. 아래 표에는 파이프라인이 호출할 수 있는 MCP 도구와 각 단계별 논리에 대한 한 줄 설명이 나열되어 있습니다.

| # | 단계 제목 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">스테이지 이름</span> | 호출된 MCP 도구 | 요약 |
|---|-------------|----------------------------------------------------------------------------------------|------------------|---------|
| 1 | ml_app 트레이스 분류 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `search_llmobs_spans` | `ml_app`에 대한 최근 루트 스팬을 샘플링하고, 각각을 성공/부분/실패로 분류하며, 공통 패턴을 표시합니다. |
| 2 | 근본 원인 분석 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `search_llmobs_spans` | 1단계에서 실패한 스팬에 대한 전체 트레이스를 가져오고 트레이스 트리를 탐색하여 각 실패를 루트 스팬 및 실패 모드에 귀속시킵니다. |
| 3 | 부트스트랩 평가자 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | 없음(2단계 보고서에 대한 로컬 추론); `--publish`가 설정된 경우 온라인 LLM-판정 평가자를 게시하기 위한 선택적 Datadog API 호출 | Python 평가자 제품군(`sdk_code`), 프레임워크 독립적 JSON 사양(`data_only`)을 내보내거나 온라인 평가자를 게시(`publish`)합니다. |
| 4 | 데이터셋 생성 및 게시 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `search_llmobs_spans`(샘플링용) 및 ddtrace SDK(MCP 아님)를 통한 게시용 `LLMObs.create_dataset()` | 루트 스팬을 샘플링하고, input/expected_output 쌍을 추출하고, PII를 삭제하고, 로컬 JSON을 작성한 다음 Datadog에 게시합니다. |
| 5 | 실험 생성 및 실행 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `list_llmobs_evals`(원샷 시작 비콘 — 연결성 + 텔레메트리). 런타임은 ddtrace SDK를 사용합니다. | 앱을 검사하여 LLM 호출 지점을 찾고, 독립형 `.py` 또는 `.ipynb`를 생성하여 실제 진입점에 `task_fn`을 연결한 후 실행합니다. |
| 6 | 실험 분석 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `get_llmobs_experiment_summary`, `get_llmobs_experiment_metric_values`, `list_llmobs_experiment_events`, `get_llmobs_experiment_event`, `get_llmobs_experiment_dimension_values` | 최상위 메트릭, 레코드별 점수, 세그먼트 차원 및 드릴다운 이벤트를 가져와 구조화된 분석 보고서를 종합합니다. |

`stop`에서 언제든지 깔끔하게 중단하고, `--start-at <stage-name>`으로 나중에 재개할 수 있어 다시 실행할 필요가 없습니다. 기존의 3단계 평가 전용 동작을 유지하려면 `--stop-after eval-bootstrap`을 전달하세요.

```
/agent-observability-eval-pipeline my-chatbot --project-name my-chatbot
/agent-observability-eval-pipeline my-chatbot --stop-after eval-bootstrap          # classic 3-phase
/agent-observability-eval-pipeline my-chatbot --start-at experiment                # resume mid-flow
/agent-observability-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>
```

이러한 기술에 대한 전체 가이드와 권장되는 엔드투엔드 워크플로는 [Claude Code 기술로 LLM 애플리케이션 분석하기][9]를 참조하세요.

## 사용 사례 {#use-cases}

Agent Observability MCP 도구는 다음을 위한 AI 지원 워크플로를 활성화합니다.

- **에이전트 실행 디버깅**: ML 앱, 오류 상태 또는 사용자 지정 태그별로 트레이스를 검색한 다음 스팬 계층 구조와 콘텐츠를 검사하여 실패를 식별합니다.
- **트레이스 구조 분석**: 트레이스의 전체 스팬 트리를 시각화하여 에이전트, LLM, 도구 및 검색이 어떻게 상호 작용하는지 이해합니다.
- **에이전트 루프 조사**: 에이전트의 단계별 실행 루프를 검토하여 의사 결정 및 도구 호출 패턴을 파악합니다.
- **실험 평가**: 실험 메트릭에 대한 요약 통계를 가져오고, 디멘션 세그먼트 전반의 결과를 비교하며, 개별 이벤트를 검사합니다.
- **실험 생성**: 모델 추론을 실행하지 않고 실험 메타데이터(프로젝트, 데이터셋, 설명, 구성)를 기록하기 위해 `create_llmobs_experiment`로 새 실험 객체를 등록합니다. `submit_llmobs_experiment_events`로 이후 평가 메트릭을 첨부합니다.
- **실험 패턴 발견**: 메트릭 성능별로 실험 이벤트를 필터링하고 정렬하여 성능이 가장 우수한 케이스와 가장 저조한 케이스를 찾습니다.
- **평가자 관리**: ML 애플리케이션 또는 전체 조직 전반의 평가자 구성을 나열, 검사, 생성, 업데이트 및 삭제합니다.
- **패턴 탐색**: 패턴 구성을 나열하고, 실행 상태를 검사하며, 발견된 주제 계층 구조를 탐색하여 사용자가 무엇을 묻고 트래픽이 어떻게 분산되는지 파악합니다.
- **데이터셋 관리**: 프로젝트와 데이터셋 목록을 확인하고, 데이터셋 레코드를 탐색 및 검사하며, 실험에 사용할 데이터셋에 새 레코드를 추가합니다.

## 사용 가능한 도구 {#available-tools}

`llmobs` 도구 세트에는 다음 도구가 포함되어 있습니다.

### 트레이스 및 스팬 도구 {#trace-and-span-tools}

`search_llmobs_spans`
: 필터 또는 원시 쿼리와 일치하는 스팬을 검색합니다.

`get_llmobs_trace`
: 스팬 종류별 스팬 수, 오류 지표, 총 지속 시간을 포함하여 트레이스의 전체 구조를 스팬 계층 트리로 가져옵니다.

`get_llmobs_span_details`
: 타이밍, 오류 정보, LLM 세부 정보(모델, 토큰 수), 메트릭 및 평가를 포함하여 하나 이상의 스팬에 대한 상세 메타데이터를 가져옵니다.

`get_llmobs_span_content`
: 선택적 JSONPath 추출을 사용하여 스팬 필드(입력, 출력, 메시지, 문서 또는 메타데이터)의 실제 내용을 검색합니다.

`find_llmobs_error_spans`
: 전파 컨텍스트가 있는 트레이스에서 모든 오류 스팬을 찾아 스팬 종류별로 그룹화하고 오류 메시지 및 스택 트레이스를 확인합니다.

`expand_llmobs_spans`
: `get_llmobs_trace`가 축소된 노드를 반환할 때 점진적인 트리 탐색을 위해 특정 스팬의 하위 항목을 로드합니다.

`get_llmobs_agent_loop`
: 에이전트의 실행 루프를 시간순으로 조회하여 각 단계(LLM 호출, 도구 호출, 결정)를 순서대로 표시합니다.

### 실험 도구 {#experiment-tools}

`create_llmobs_experiment`
: 프로젝트에 새로운 LLM Observability 실험 객체를 생성합니다. 모델 추론을 실행하지 않고 이벤트와 메트릭을 보고할 수 있도록 실험을 기록합니다. `project_id` 및 `experiment_name`이 필요합니다. 생성된 `experiment_id` 및 확인된 이름을 반환합니다. `submit_llmobs_experiment_events`를 사용하여 평가 메트릭을 첨부하거나 `update_llmobs_experiment`를 사용하여 속성을 변경하세요.

`get_llmobs_experiment_summary`
:  모든 평가 메트릭에 대해 미리 계산된 통계가 포함된 상위 수준의 실험 요약을 가져옵니다. 다른 실험 도구를 사용하기 전에 여기서 시작하세요.

`list_llmobs_experiment_events`
:  디멘션 또는 메트릭별로 필터링하고 메트릭 값별로 정렬하여 실험 이벤트를 나열합니다.

`get_llmobs_experiment_event`
:  입력, 출력, 예상 출력, 모든 메트릭 및 디멘션을 포함하여 단일 실험 이벤트에 대한 전체 세부 정보를 가져옵니다.

`get_llmobs_experiment_metric_values`
:  특정 평가 메트릭에 대한 통계 분석을 가져오며, 비교를 위해 디멘션별로 선택적으로 세분화할 수 있습니다.

`get_llmobs_experiment_dimension_values`
:  유효한 필터 및 세그먼트 값을 찾는 데 유용한 개수가 포함된 디멘션의 고유 값을 가져옵니다.

###  평가자 도구 {#evaluator-tools}

`list_llmobs_evals`
:  모든 ML 애플리케이션에 구성된 모든 LLM-judge 평가자를 나열합니다. 각 평가자의 이름, ml_app 및 활성화 상태를 반환합니다.

`list_llmobs_evals_by_ml_app`
:  특정 ML 애플리케이션에 대해 구성된 모든 LLM-judge 평가자를 나열합니다.

`get_llmobs_evaluator`
:  이름으로 LLM-judge 평가자 구성을 검색하며, 대상(ml_app, 샘플링, 필터), LLM 공급자 및 평가자 프롬프트 템플릿을 포함합니다.

`create_or_update_llmobs_evaluator`
:  LLM-judge 평가자 구성을 생성하거나 업데이트합니다. 특정 ML 애플리케이션 및 필요에 따라 필터 또는 샘플링 비율을 대상으로 하며, 평가자의 모델 및 프롬프트 템플릿이 각 스팬의 점수를 매기는 방법을 정의합니다.

`delete_llmobs_evaluator`
:  이름으로 LLM-judge 평가자 구성을 삭제합니다.

###  프로젝트 및 데이터세트 도구 {#project-and-dataset-tools}

`list_llmobs_projects`
:  조직의 모든 LLM Observability 실험 프로젝트를 생성 날짜순(최신순)으로 나열합니다. 각 프로젝트의 `id`, `name` 및 타임스탬프와 페이지 지정 필드(`next_cursor`, `truncated`)를 반환합니다. 프로젝트 이름과 ID를 미리 알지 못할 때 이를 사용하여 찾으세요.

`get_llmobs_project`
: ID 또는 이름으로 LLM Observability 실험 프로젝트를 조회합니다. 데이터셋 도구를 호출하기 전에 `project_id` UUID를 확인하려면 이를 사용하세요.

`list_llmobs_datasets`
: ID 또는 이름 필터를 필요에 따라 사용하여 프로젝트 내의 데이터셋을 나열합니다. 데이터셋 메타데이터 및 페이지 지정 필드를 반환합니다. `get_llmobs_dataset_records` 또는 `add_llmobs_dataset_records` 전에 이를 사용하세요. 해당 도구는 데이터셋 UUID가 필요합니다.

`get_llmobs_dataset_records`
: 구조화된 미리보기와 스키마 요약으로 데이터셋 레코드를 읽습니다. 임의의 JSON 필드(`input`, `expected_output`, `metadata`)를 읽을 수 있는 미리보기 형태로 구성합니다. 새 레코드를 구성하기 전에 `compute_schema=true`을 사용하여 레코드 구조의 유형 인식 스케치를 가져오세요.

`get_llmobs_full_dataset_records`
: 최대 3개의 특정 레코드를 전체 내용이 잘리지 않은 상태로 가져옵니다. `get_llmobs_dataset_records`로 레코드 ID를 찾은 후 이를 사용하여 개별 레코드를 자세히 검사하세요.

`add_llmobs_dataset_records`
: 미리보기 후 확인하는 2단계 흐름을 사용하여 데이터셋에 레코드를 생성합니다. `confirmed=false`를 호출하여 계획된 쓰기 작업을 미리 본 다음, 사용자 승인 후 `confirmed=true`를 호출하여 커밋하세요.

### 패턴 도구 {#patterns-tools}

`list_llmobs_pattern_configs`
: 조직의 모든 패턴 구성을 나열합니다. 각 구성의 `id`, `name`, `evp_query`, 샘플링 설정 및 타임스탬프를 반환합니다. `config_id`를 찾으려면 여기서 시작하세요.

`get_llmobs_pattern_config`
: 조직에서 가장 최근에 수정된 패턴 구성을 가져옵니다.

`get_llmobs_pattern_run_status`
: 구성에 대한 가장 최근 패턴 실행의 상태 및 활동별 진행 상황을 가져옵니다. 토픽을 읽기 전에 클러스터가 실행 중인지, 완료되었는지, 또는 실패했는지 검사하세요.

`list_llmobs_pattern_runs`
: 구성에 대해 완료된 모든 패턴 실행을 최신순으로 나열합니다. 각 실행의 `id`, `status`, 타임스탬프 및 사용된 `config_snapshot`을 반환합니다.

`get_llmobs_patterns`
: 패턴 실행으로 발견된 토픽 계층 구조를 가져옵니다. 토픽은 계층으로 구성되며, 각 계층에는 `name`, `description` 및 `point_count`가 있습니다. 가장 최근에 완료된 실행을 읽으려면 `run_id`를 생략하세요.

`get_llmobs_patterns_with_points`
: 각 리프 토픽에 스팬 ID가 인라인으로 포함된 실행의 토픽 계층 구조를 가져옵니다. 스팬별 지속 시간, 비용, 토큰 수 및 평가도 포함하려면 `include_metrics=true`를 설정하세요.

`get_llmobs_pattern_points`
: 단일 토픽에 할당된 클러스터 포인트(개별 스팬)를 커서 기반으로 페이지 지정하여 가져옵니다. 각 포인트에는 `span_id`, `session_id` 및 스팬 입력 미리보기가 포함됩니다. 페이징을 계속하려면 `next_page_token`을 `page_token`으로 전달하세요.

## 권장 워크플로 {#recommended-workflows}

### 트레이스 분석 {#trace-analysis}

1. **검색**: `search_llmobs_spans`를 사용하여 ML 앱, 상태, 스팬 종류 또는 사용자 지정 태그별로 트레이스를 조회합니다.
2. **시각화**: `get_llmobs_trace`를 사용하여 전체 스팬 계층 구조를 확인합니다.
3. **검사**: `get_llmobs_span_details`를 사용하여 특정 스팬에 대한 메타데이터, 타이밍 및 평가를 확인합니다.
4. **콘텐츠 읽기**: `get_llmobs_span_content`를 사용하여 실제 I/O, 메시지 또는 문서를 검색합니다.
5. **오류 디버깅**: `find_llmobs_error_spans`를 사용하여 전파 컨텍스트가 포함된 트레이스의 모든 오류를 확인합니다.
6. **확장**: `expand_llmobs_spans`를 사용하여 더 깊이 탐색하기 위해 축소된 스팬의 하위 스팬을 로드합니다.
7. **Agent 검토**: `get_llmobs_agent_loop`를 사용하여 Agent 스팬의 단계별 실행 흐름을 확인합니다.

### 실험 분석 {#experiment-analysis}

1. **요약**: `get_llmobs_experiment_summary`를 사용하여 전체 통계를 확인하고 사용 가능한 메트릭 및 디멘션을 확인합니다.
2. **이벤트 탐색**: `list_llmobs_experiment_events`를 사용하여 디멘션별로 필터링하거나 메트릭별로 정렬하여 관심 있는 이벤트를 찾습니다.
3. **이벤트 검사**: `get_llmobs_experiment_event`를 사용하여 특정 이벤트에 대한 전체 세부정보를 확인합니다.
4. **메트릭 분석**: `get_llmobs_experiment_metric_values`를 사용하여 백분위수 분포, 참/거짓 비율을 확인하거나 디멘션 세그먼트 간에 비교합니다.
5. **차원 발견**: `get_llmobs_experiment_dimension_values`를 사용하여 유효한 필터 및 세그먼트 값을 찾습니다.

### 데이터세트 관리 {#dataset-management}

1. **프로젝트 찾기**: `list_llmobs_projects`를 사용하여 프로젝트를 탐색합니다. 각 결과에는 후속 호출에 필요한 `id` UUID가 포함되어 있습니다. 프로젝트 이름은 알지만 UUID를 모르는 경우 `get_llmobs_project`를 사용하여 직접 확인합니다.
2. **데이터세트 찾기**: `list_llmobs_datasets`를 `project_id`와 함께 사용하여 데이터세트를 나열하고 해당 UUID를 가져옵니다.
3. **데이터 이해**: `get_llmobs_dataset_records`를 `compute_schema=true`와 함께 사용하여 레코드를 탐색하고, 읽거나 쓰기 전에 필드의 유형 스케치를 확인합니다.
4. **특정 레코드 읽기**: `get_llmobs_full_dataset_records`를 사용하여 ID별로 최대 3개의 레코드에 대한 전체 콘텐츠를 검색합니다.
5. **레코드 추가**: `add_llmobs_dataset_records`를 `confirmed=false`와 함께 사용하여 쓰기를 미리 본 다음, 사용자 승인 후 `confirmed=true`를 사용합니다.

### 패턴 분석 {#patterns-analysis}

1. **구성 나열**: `list_llmobs_pattern_configs`를 사용하여 사용 가능한 패턴 구성과 해당 `config_id` 값을 찾습니다.
2. **실행 상태 확인**: `get_llmobs_pattern_run_status`를 사용하여 가장 최근 실행이 완료되었는지 확인합니다.
3. **토픽 읽기**: `get_llmobs_patterns`를 사용하여 이름, 설명, 일관성 점수가 포함된 전체 토픽 계층 구조를 가져옵니다.
4. **스팬 검사**: `get_llmobs_patterns_with_points`를 사용하여 스팬 ID가 인라인된 토픽을 가져오거나, `get_llmobs_pattern_points`를 사용하여 특정 토픽의 스팬을 페이지별로 확인합니다.
5. **스팬 콘텐츠 분석**: 이전 단계의 `span_id` 값을 `get_llmobs_span_details` 또는 `get_llmobs_span_content`와 함께 사용하여 토픽 내 개별 스팬의 실제 입력, 출력 및 메타데이터를 검사합니다.
6. **과거 실행 탐색**: `list_llmobs_pattern_runs`를 사용하여 과거 실행을 확인하고 특정 `run_id`를 전달하여 시간 경과에 따른 토픽 분포를 비교합니다.

## 프롬프트 예시 {#example-prompts}

연결 후 다음과 같은 프롬프트를 시도해 보세요.

- 지난주 내 `customer-support-bot` 앱에 대한 오류 추적을 검토해 줘. 가장 일반적인 실패 패턴을 요약하고, 발생 빈도를 알려주고, 무엇을 먼저 수정할지 추천해 줘.
- 평가에서 품질이 낮다고 표시된 내 Agent의 응답 추적을 찾아 줘. 내 앱의 최근 Agent 추적을 살펴보고 Agent가 필요 이상으로 루프를 돌았던 케이스를 찾아 줘.
- 내 앱의 최근 에이전트 추적을 살펴보고 에이전트가 필요 이상으로 루프를 돌았던 사례를 찾아 줘. 각 단계에서의 의사결정을 분석하고 불필요한 도구 호출을 줄이기 위해 도구 설명을 개선하는 방법을 제안해 줘.
- 사용자가 잘못된 응답을 보고했어. 트레이스 ID는 `trace-123`이야. 무슨 일이 있었는지 정확히 설명해 줘. 사용자가 무엇을 물어보았는지, Agent가 각 단계에서 무엇을 했는지, 그리고 어디에서 문제가 발생하였는지 알려 줘. 코드 수정안을 제안해 줘.
- 실험 `exp-456`을 분석하고 평가 점수별로 가장 성능이 낮은 디멘션의 마크다운 표를 생성해 줘. 성능이 어디서 왜 저하되는지 이해하는 데 도움이 되는 다른 관련 열을 포함해.
- 실험 `exp-123`(기준)과 실험 `exp-456`을 비교해 줘. 무엇이 개선되었고, 무엇이 퇴보하였는지, 그리고 그 정도가 어느 정도인지를 요약해 줘. 변경 사항을 배포할 가치가 있는지 말해 줘.
- 실험 `exp-456`을 요약하고 점수가 가장 낮은 이벤트 상위 5개를 식별해 줘. 각 이벤트에 대해 입력, 출력, 그리고 실패한 평가 항목을 보여 줘.
- 내 프로젝트 `my-chatbot-project`에 'prompt-v2-test'라는 새 실험을 만들고, 메트릭을 첨부할 수 있도록 실험 ID를 반환해 줘.
- 내 `my-project` 프로젝트의 데이터셋을 나열하고, `qa-golden-set`이라는 데이터셋의 레코드 샘플을 스키마와 함께 보여 줘.
- 새로운 테스트 케이스가 포함된 CSV 파일이 있어. 이 케이스들을 `qa-golden-set` 데이터셋에 `my-project`의 새 버전으로 추가해 줘. 먼저 미리보기를 보여 줘.

## 다른 Datadog 도구와 결합하기 {#combine-with-other-datadog-tools}

설정 URL에 포함된 `core` 도구 세트를 통해 AI 에이전트가 Agent Observability 분석과 자연스럽게 연동되는 추가 Datadog 도구에 액세스할 수 있습니다.

### 분석을 Datadog Notebooks로 내보내기 {#export-analysis-to-datadog-notebooks}

`core` 도구 세트에는 `create_datadog_notebook` 및 `edit_datadog_notebook`이 포함되어 있어 AI 에이전트가 분석 결과에서 직접 [Datadog Notebooks][3]를 생성할 수 있습니다. 에이전트 채팅에서 얻은 분석 결과를 트레이스 및 실험과 함께 Datadog에 저장되는 협업 및 공유 가능한 노트북으로 내보낼 수 있습니다.

다음과 같은 프롬프트를 시도해 보세요.

- 실험 `exp-456`을 분석하고, 성능이 가장 낮은 차원을 식별한 다음, 평가 점수별로 분류된 요약 보고서를 Datadog 노트북으로 내보내 줘.
- 지난 일주일 동안의 `customer-support-bot`에 대한 오류 트레이스를 검토하고, 일반적인 실패 패턴과 권장 수정 사항을 포함하여 분석 결과가 담긴 Datadog 노트북을 생성해 줘.

Notebooks는 비교 차트나 사분면 플롯과 같이 표준 Datadog 위젯 이외의 맞춤형 시각화를 위해 기본적으로 [Mermaid 다이어그램][4]도 렌더링합니다. 다음과 같은 프롬프트를 시도해 보세요.

- 실험 `exp-456`을 분석하고, 각 프롬프트 버전 간의 `accuracy` 점수를 비교한 다음, 각 버전의 평균 점수를 나타내는 Mermaid 막대 차트가 포함된 Datadog 노트북으로 결과를 내보내 줘.
- 실험 `exp-456`을 분석하고, 한 축에는 `relevance`, 다른 축에는 `accuracy`를 사용하여 각 프롬프트 버전을 Mermaid 사분면 차트에 표시하는 Datadog 노트북을 내보내 줘. 두 디멘션 모두에서 성능이 저조한 버전을 식별해 줘.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/mcp_server/setup/
[2]: /ko/llm_observability/
[3]: /ko/notebooks/
[4]: /ko/notebooks/guide/build_diagrams_with_mermaidjs/
[5]: /ko/getting_started/site/
[6]: /ko/account_management/api-app-keys/
[7]: /ko/account_management/org_settings/service_accounts/
[8]: https://github.com/datadog-labs/agent-skills
[9]: /ko/llm_observability/guide/claude_code_skills