---
aliases:
- /ko/llm_observability/guide/claude_code_skills/
description: Datadog의 Claude Code 기술을 사용하여 세션을 분류하고, 실패를 진단하고, 실험을 비교하고, Python 실험
  코드를 생성하고, 실시간 프로덕션 데이터를 바탕으로 평가자 부트스트랩을 실행하세요.
further_reading:
- link: /llm_observability/investigate/evaluations/
  tag: 설명서
  text: Agent Observability 평가
- link: /llm_observability/improve/experiments/
  tag: 설명서
  text: LLM 실험
- link: /llm_observability/investigate/evaluations/evaluation_developer_guide
  tag: 가이드
  text: '평가 개발자 가이드: 사용자 지정 평가자 빌드'
- link: https://www.datadoghq.com/blog/bits-evals/
  tag: 블로그
  text: Bits Evals로 AI 에이전트 품질 개선하기
- link: https://github.com/datadog-labs/agent-skills
  tag: GitHub
  text: datadog-labs/agent-skills
title: Claude Code 기술로 LLM 애플리케이션 분석하기
---
## 개요 {#overview}

Datadog은 Agent Observability 분석을 개발 워크플로에 직접 도입하는 [Claude Code][1] 스킬 세트를 제공합니다. 대시보드를 수동으로 탐색하는 대신, Claude Code 세션에서 해당 스킬을 호출하여 세션을 분류하고, 실패를 진단하고, 실험을 비교하고, Python 실험 코드를 생성하고, 평가자 부트스트랩을 실행할 수 있습니다. 이 모든 작업은 실시간 프로덕션 데이터를 바탕으로 수행됩니다.

| 기술 | 기능 |
|-------|-------------|
| `/agent-observability-session-classify` | 세션, 트레이스, 세션 배치에서 사용자 의도가 충족되었는지 분류 |
| `/agent-observability-trace-rca` | 실패한 프로덕션 LLM 트레이스에 대한 근본 원인 분석 |
| `/agent-observability-experiment-analyzer` | LLM 실험 결과 분석 및 비교 |
| `/agent-observability-experiment-py-bootstrap` | `ddtrace.llmobs`SDK를 사용하여 Python 실험 코드를 생성합니다. 애플리케이션을 내부적으로 검사하여 실제 `task_fn`을 연결하고(자리 표시자 없음), `.env`에서 자격 증명을 자동 검색하며, 평가자 선택을 지시하는 자유 형식의 `--purpose`를 허용합니다.|
| `/agent-observability-eval-bootstrap` | 트레이스를 통해 평가자 코드 생성, 온라인 LLM 판정 평가자 게시 또는 실험에 사용할 데이터셋으로 트레이스 샘플링|
| `/agent-observability-eval-pipeline` | 프로덕션 트레이스부터 평가자, 데이터셋, 실험, 분석에 이르는 6단계 가이드 파이프라인입니다. `--stop-after`를 사용하여 조기 중단하고, `--start-at`를 사용하여 중간부터 재개합니다. |

이러한 스킬은 체계적이고 실행 가능한 출력(수정 전/후 제안 내용이 포함된 RCA 보고서, 생성된 평가자 코드, 실험 비교 등)을 생성하며, 이를 코딩 에이전트에 직접 전달해 애플리케이션에 수정 사항을 적용할 수 있습니다. Claude Code가 코드베이스에 액세스할 수 있는 경우, 세션을 떠나지 않고 관련 시스템 프롬프트, 도구 정의 또는 라우팅 로직을 검색하고 특정 diff를 제안할 수 있습니다.

## 설정 {#setup}

### 전제 조건 {#prerequisites}

- [Claude Code][1] 설치 및 인증 완료
- 최소 1개의 LLM 애플리케이션이 [Agent Observability로 계측][2]되어 트레이스를 생성합니다.
- 데이터 백엔드: Datadog MCP 서버 **또는** `pup` CLI

### 스킬 설치 {#install-the-skills}

스킬은 [agent-skills][6] 리포지토리에 게시되어 있습니다. 다음 명령어로 설치하세요.

```shell
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
```

설치 후 모든 Claude Code 세션에서 스킬을 사용할 수 있습니다.

### Datadog MCP 서버 {#datadog-mcp-server}

Datadog MCP 서버 옵션을 사용하려면 Agent Observability MCP 서버를 Claude Code 세션에 연결하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>claude mcp add --scope user --transport http datadog-llmo-mcp \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 제품은 선택한 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

모든 스킬은 시작 시 MCP 서버를 자동으로 감지하고 계속해서 사용합니다.

### 옵션 B: pup CLI {#option-b-pup-cli}

MCP 서버를 사용하지 않으려면 Datadog의 내부 CLI인 [`pup`][5]를 통해 스킬을 실행할 수 있습니다. `pup`를 설치하고 인증하세요.

```shell
pup auth login
```

각 스킬은 시작 시 MCP 서버의 사용 가능 여부를 감지하며, 사용할 수 없는 경우 `pup`을 확인하고 pup 모드로 자동 전환합니다. 또한 스킬 호출 시 `--backend pup`을 전달하여 pup 모드를 명시적으로 강제할 수 있습니다.

pup 모드에서 모든 Datadog API 호출은 MCP 도구 대신 `pup llm-obs` 하위 명령을 통해 이루어집니다. 출력과 워크플로는 동일합니다.

## 스킬 {#skills}

### 세션 및 트레이스 분류 {#classify-sessions-and-traces}

`/agent-observability-session-classify`는 주어진 상호 작용에서 사용자 의도가 충족되었는지 평가합니다. 제공하는 사항에 따라 세 가지 모드로 작동합니다.

| 모드 | 호출 방법 | 사용 시점 |
|------|-------------|----------|
| 세션 | `session_id` | 특정 세션 평가 |
| 트레이스 | `trace_id` | 단일 Agent Observability 트레이스 평가 |
| 앱 | `ml_app` | 최근 세션 또는 트레이스 배치 샘플링 및 분류 |

이 스킬은 최대 3개의 신호 소스에서 데이터를 가져오며, 액세스할 수 있는 데이터의 양이 많을수록 정확도가 향상됩니다.

- **Agent Observability 트레이스** — 전체 스팬 트리, 대화 내용, 도구 호출 결과, 평가 판정 결과 항상 사용 가능합니다.
- **RUM 행동 신호** — 페이지 뷰, 사용자 지정 작업, 체류 시간, 트레이스에 표시되는 내용을 확인하거나 반박하는 명시적 피드백 이벤트 앱에 RUM이 계측된 경우 사용 가능합니다.
- **Audit Trail** — 서버에서 확인된 쓰기 이벤트(대시보드 생성, 모니터 수정, 노트북 삭제)로, 어시스턴트 작업이 실제로 수행되었는지를 입증합니다. 세션에 자산 생성/편집이 포함된 경우 가장 신뢰할 수 있는 신호입니다.

이 스킬은 기본적으로 한 문장으로 작성된 이유를 명시하는 간결한 `yes / partial / no` 판정 결과를 반환합니다. 전체 마크다운 보고서를 보려면 `verbose: true`를 추가합니다.

**예시:**

```
/agent-observability-session-classify session_id=abc-123
/agent-observability-session-classify trace_id=def-456
/agent-observability-session-classify ml_app=my-chatbot --timeframe now-7d
```

### 근본 원인 분석을 통한 실패 진단 {#diagnose-failures-with-root-cause-analysis}

`/agent-observability-trace-rca`는 실패한 트레이스의 스팬 트리를 탐색하면서 LLM 애플리케이션이 잘못된 결과를 생성하는 원인을 파악합니다. 사용 가능한 신호 즉, LLM 판정 결과(가장 강력한 신호), 런타임 오류, 지연 시간 이상치 및 에이전트 루프 결정 등 구조적 이상을 기반으로 최적의 분석 모드를 선택합니다.

이 스킬은 실패한 스팬을 샘플링하고 실패 분류 체계로 그룹화하며 근본 원인 범주, 이를 뒷받침하는 증거, 구체적인 수정 제안이 명시된 체계적인 RCA 보고서를 작성합니다. 각 수정 사항에는 트레이스의 실제 텍스트 또는 코드(시스템 프롬프트 발췌문, 도구 인수 형태, 라우팅 로직)이 포함되며 변경 내용을 정확히 보여주는 `BEFORE`/`AFTER`를 제시합니다.

Claude Code가 코드베이스에 액세스할 수 있는 경우, 이 스킬은 관련 소스 파일을 검색하고 즉시 적용 가능한 diff를 제안합니다. 시스템 프롬프트 결함, 도구 오용, 라우팅 오류 발생 시 세션을 떠나지 않고 진단부터 풀 리퀘스트까지 진행할 수 있습니다.

**예시:**

```
/agent-observability-trace-rca ml_app=my-chatbot
/agent-observability-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

### 실험 분석 및 비교 {#analyze-and-compare-experiments}

`/agent-observability-experiment-analyzer`은 실험 결과를 검색하고 후보와 기준선 간에 변경된 사항을 보여줍니다. 단일 실험(탐색적 분석) 또는 두 가지 실험(비교 분석)을 지원합니다.

이 스킬은 개선/퇴보한 메트릭, 변경된 이벤트 범주, 후보가 어디에서 성능이 저조했는지 보여주므로 확신을 가지고 승격 결정을 내릴 수 있습니다.

**예시**

```
/agent-observability-experiment-analyzer experiment_id=exp-123
/agent-observability-experiment-analyzer experiment_id=exp-456 baseline_id=exp-123
```

### Python SDK로 실험 코드 생성 {#generate-experiment-code-with-the-python-sdk}

`/agent-observability-experiment-py-bootstrap`은 `ddtrace.llmobs`SDK를 사용하고 표준 [참조 노트북][7] 스타일과 일치하는 독립형 `.py` 스크립트 또는 Jupyter `.ipynb` 노트북을 생성합니다.

데이터셋은 로컬 `DatasetRecordRaw[]` JSON(파일에 인라인됨), CSV(`LLMObs.create_dataset_from_csv`를 통해 런타임에 로드됨), 이름별 기존 Datadog 데이터셋(`LLMObs.pull_dataset`) 또는 기본적으로 작은 인라인 3개 레코드 샘플일 수 있습니다.

**아래 플래그는 모두 선택 사항입니다.** 인수가 없는 상태에서 `/agent-observability-experiment-py-bootstrap`을 호출하면 이 스킬은 필요한 항목을 질문하는 메시지를 표시하고, 기본 3가지 레코드 샘플에 대해 실행 가능한 파일을 생성합니다.

| 옵션| (필수) | 기본값 | 설명 |
|--------|----------|---------|-------------|
| <span class="text-nowrap">`--purpose`</span> | 설정되지 않았거나 추론이 불가능한 경우에는 | 프롬프트가 표시되지 않습니다. | 실험을 통해 검증하는 내용을 설명하는 자유 형식 문자열입니다. 내부 검사 우선순위, 래퍼 반환 형식, 평가자 시맨틱에 편향 적용|
| <span class="text-nowrap">`--format`</span> | 아니요 | `py` | `py` 또는 `ipynb` |
| <span class="text-nowrap">`--dataset`</span> | 아니요 | 인라인 3개 레코드 샘플 | 로컬 `DatasetRecordRaw[]` JSON 또는 CSV `--dataset-name` |와 상호 배타적입니다.
| <span class="text-nowrap">`--dataset-name`</span> | 아니요 | 없음 |  런타임에 `LLMObs.pull_dataset`를 통해 가져오려는 기존 Datadog 데이터셋입니다. `--dataset` |와 상호 배타적입니다.
| <span class="text-nowrap">`--dataset-version`</span> | 아니요 | 최신 |  `--dataset-name` | 사용 시 특정 버전을 고정함
| <span class="text-nowrap">`--project-name`</span> | 아니요 | `experiment-<service-name>` 코드베이스에서 추론됨 | 실험 UI에 표시되는 Datadog 프로젝트 이름 |
| <span class="text-nowrap">`--evaluator-style`</span> | 아니요 | `function` | `function` / `class` / `remote` 표면을 선택하고, `--purpose`은 시맨틱을 선택합니다.|
| <span class="text-nowrap">`--task-source`</span> | 아니요 | 내부 검사를 통해 자동 실행 | 명시적으로 `<module.path>:<function>` 지정해 `task_fn` |로 래핑
| <span class="text-nowrap">`--placeholder-task`</span> | 아니요 | 비활성화 | 내부 검사를 건너뛰고 일반 `# TODO(user)` 자리 표시자 생성 |
| <span class="text-nowrap">`--app-root`</span> | 아니요 | 추론됨 | 내부 검사 스캔을 이 디렉터리로 제한함 |
| <span class="text-nowrap">`--env-file`</span> | 아니요 | 없음 | 명시적 `.env` 경로 `ENV_FILE_OVERRIDE` | 형식으로 생성된 파일에 포함됩니다.
| <span class="text-nowrap">`--jobs`</span> | 아니요 | `10` | 동시성을 `experiment.run(jobs=N)` |에 전달함
| <span class="text-nowrap">`--output`</span> | 아니요 | `./experiments/experiment.<ext>` | 출력 파일 경로 |

**예시**

```
/agent-observability-experiment-py-bootstrap --purpose "validate output accuracy"
/agent-observability-experiment-py-bootstrap --purpose "test tool selection on ambiguous queries" --dataset ./data/qa.json
/agent-observability-experiment-py-bootstrap --dataset-name qa_v3 --project-name customer-qa
/agent-observability-experiment-py-bootstrap --task-source mymodule.handlers:respond --evaluator-style remote
/agent-observability-experiment-py-bootstrap --placeholder-task --format ipynb
```

### 트레이스 데이터 기반 평가자 부트스트랩 {#bootstrap-evaluators-from-trace-data}

`/agent-observability-eval-bootstrap`은 ml_app(또는 이미 컨텍스트에 포함된 RCA 보고서)의 프로덕션 트레이스를 분석하고, 관찰된 실패 모드를 포착하는 평가자 스위트를 제안합니다. 다음 4가지 아티팩트 중 하나를 출력합니다.

| 모드 | 플래그 | 출력 |
|------|------|--------|
| SDK 코드(기본값) | — | Python `BaseEvaluator` / `LLMJudge` [LLM 실험][3]에 바로 사용 가능한 클래스 |
| JSON 사양 | `--data-only` | 검토 또는 수동 구현에 적합한 프레임워크에 구애받지 않는 평가자 사양 |
| 온라인 판정 | `--publish` | Datadog에 직접 게시되고 ml_app에서 활성화되는 LLM 판정 평가자 |
| 데이터셋 배포 | `--emit-dataset <path>` | 프로덕션 트레이스에서 샘플링된 `DatasetRecordRaw[]` JSON 파일을 `LLMObs.create_dataset(records=...)`에 맞게 구성합니다. 평가자 워크플로를 완전히 건너뜁니다. 이 모드에서는 평가자가 아닌 데이터셋을 생성합니다 |

처음 세 가지 모드는 동일한 평가자 제안 워크플로를 공유하며 스위트 구체화 방식만 다릅니다. 네 번째 모드(`--emit-dataset`)는 독립적으로 기능합니다. `ml_app`의 루트 스팬을 샘플링하고(`@status:ok`로 필터링), 레코드당 `input_data` 및 `expected_output`를 추출하고, 문자열 값에서 PII를 제거하고, Datadog에 데이터셋으로 게시한 다음 실험을 실행할 수 있는 JSON 파일을 작성합니다. 레코드당 `tags`는 자동으로 정규화되므로(단순 문자열은 `tag:<value>`로 래핑됨) `Dataset.append()`에서 레코드를 거부하지 않습니다. `expected_output` 필드는 **프로덕션 동작 기준**으로 문서화되어 있으며 정답(ground truth)이 아닙니다. 이는 회귀형 실험 과정에서 유용합니다(리팩터링이 관찰된 출력값을 변경하는가?). 레이블이 지정된 골드 세트로 승격되기 이전

**예시**

```
/agent-observability-eval-bootstrap ml_app=my-chatbot
/agent-observability-eval-bootstrap ml_app=my-chatbot --publish
/agent-observability-eval-bootstrap ml_app=my-chatbot --data-only
/agent-observability-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json --trace-limit 25
```

### 엔드투엔드 파이프라인 실행 {#run-the-end-to-end-pipeline}

`/agent-observability-eval-pipeline`은 에이전트 관찰 가능성 하위 기술을 단일 감독형 내러티브 워크플로로 연결하여 프로덕션 트레이스에서 평가자, 데이터셋, 실험, 분석에 이르는 과정을 안내합니다. 모든 단계는 동일한 구조를 갖추고 있습니다. 생성되는 엔터티의 이름을 명시하는 배너, 목적을 설명하는 학습 블록, 작업(하위 스킬 호출 또는 간단한 실행 단계), 사용자 확인을 기다리는 체크포인트로 이루어져 있습니다. 기존 평가자나 실험이 존재하지 않고 결정론적 워크스루를 원할 때 권장되는 시작점입니다.

```
Phase 1: Classify ml_app traces      → agent-observability-session-classify (ml_app mode)
Phase 2: Root cause analysis         → agent-observability-trace-rca
Phase 3: Bootstrap evaluators        → agent-observability-eval-bootstrap
Phase 4: Create + publish dataset    → agent-observability-eval-bootstrap --emit-dataset + LLMObs.create_dataset(records=...)
Phase 5: Generate + run experiment   → agent-observability-experiment-py-bootstrap + python <generated_file>
                                       (with an in-phase review beat between codegen and run)
Phase 6: Analyze experiment          → agent-observability-experiment-analyzer
```

각 단계에는 표준 약칭이 있으며, `--start-at` 및 `--stop-after`에서도 동일한 값을 허용합니다. 단일 단계를 명확하게 지칭해야 할 때(예: 스크립트, 팀원과의 채팅, 지원 티켓 등) 다음과 같은 이름을 사용합니다.

| # | 단계 타이틀 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">스테이지 이름</span> | 호출된 하위 기술 | 요약 | 출력 아티팩트 |
|---|-------------|----------------------------------------------------------------------------------------|-------------------|---------|-----------------|
| 1 | ml_app 트레이스 분류 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `/agent-observability-session-classify` (ml_app 모드) | MCP `search_llmobs_spans`는 `ml_app`의 최근 루트 스팬을 샘플링합니다. 각 스팬은 성공/부분 성공/실패로 분류되며 공통 패턴으로 그룹화됩니다. | 분류 요약 + 단위별 블록 |
| 2 | 근본 원인 분석 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `/agent-observability-trace-rca` | MCP `search_llmobs_spans`는 1단계에서 실패한 스팬에 대한 전체 트레이스를 가져옵니다. 트레이스 트리를 탐색하여 각 실패를 루트 스팬 및 실패 모드에 귀속시킵니다. | 실패 모드 분류 체계와 근본 원인이 명시된 RCA 보고서 |
| 3 | 평가자 부트스트랩 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | `/agent-observability-eval-bootstrap` | 2단계 RCA 대상 로컬 추론 — MCP 호출 없음 Python 평가자 코드(`sdk_code`), 프레임워크에 구애받지 않는 JSON 사양(`data_only`)을 내보내거나, 공용 API(`publish`)를 통해 Datadog에 온라인 LLM 판정 평가자를 직접 게시합니다. | 평가자 스위트(`sdk_code` / `data_only` / `publish` 모드) |
| 4 | 데이터셋 생성 및 게시 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `/agent-observability-eval-bootstrap --emit-dataset` + `LLMObs.create_dataset(records=...)` | MCP `search_llmobs_spans`는 루트 스팬을 샘플링하고, `(input_data, expected_output)` 쌍을 추출하고, PII를 제거하고, 로컬 JSON 파일을 작성합니다. 게시 하위 단계에서는 ddtrace SDK(MCP 아님)를 통해 `LLMObs.create_dataset()`를 호출하여 데이터셋을 Datadog으로 푸시합니다. | 로컬 `DatasetRecordRaw[]` JSON + 게시된 Datadog 데이터셋(이름, 버전, URL) |
| 5 | 실험 생성 및 실행 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `/agent-observability-experiment-py-bootstrap` + `python <generated_file>` (코드 생성과 실행 사이에 `run` / `edit` / `stop` 검토 단계 포함) | 대부분 로컬에서 수행: 이 스킬은 LLM 호출 지점(OpenAI/Anthropic/LangChain/LiteLLM/LlamaIndex/Bedrock/Gemini 데코레이터)에 대해 앱을 내부적으로 검사하고 실제 진입점에 `task_fn`를 연결하는 독립형 Python 파일을 생성합니다. 단일 MCP `list_llmobs_evals` 호출은 연결성 및 텔레메트리 비콘으로 시작할 때 실행됩니다. 생성된 파일은 런타임에 ddtrace SDK를 사용하며, 실행 중에는 MCP 호출이 발생하지 않습니다. | 생성된 `.py` 또는 `.ipynb` + `experiment.url` |를 통한 실험 실행
| 6 | 실험 분석 | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `/agent-observability-experiment-analyzer` | MCP 헤비 유저: 상위 메트릭은 `get_llmobs_experiment_summary`, 레코드당 점수는 `get_llmobs_experiment_metric_values`, 개별 행을 자세히 살펴보려면 `list_llmobs_experiment_events` + `get_llmobs_experiment_event`, 세그먼트 분석 시에는 `get_llmobs_experiment_dimension_values`을 사용합니다. 결과를 종합해 체계적인 보고서로 작성합니다. | 메트릭 분석 결과, 세그먼트 성과, 다음으로 권장되는 실험이 명시된 분석 보고서 |

4단계와 5단계만이 로컬 머신에서 코드를 실행하고 나머지는 읽기 전용이거나 생성된 파일을 `--output-dir`에 저장합니다. 기존 3단계 평가 파이프라인 동작(분류 → RCA → 평가자만 부트스트랩)은 `--stop-after eval-bootstrap`을 전달하는 방식으로 유지합니다. 5단계는 코드 생성과 실행 사이에서 일시 중지되므로, 공급자 토큰이 사용되기 전에 생성된 실험 파일을 검토할 수 있습니다. `run`를 입력하여 실행하거나, `edit`을 입력하여 일시 중지 및 조정하거나, `stop`를 입력하여 정상적으로 종료합니다.

**어느 단계에서든 진입하거나 종료할 수 있습니다.** 파이프라인은 각 체크포인트가 렌더링되기 전에 각 단계의 주요 출력(분류 요약, RCA 보고서, 평가자 스위트, 데이터셋, 게시된 데이터셋 이름, 실험 파일, 실험 실행, 분석기 보고서)을 `<output-dir>/state/0N-<name>.{md, json}`에 저장합니다. 즉,

- **`stop`** 체크포인트에서(또는 `--stop-after <phase>` 맨 처음부터) 실행을 완전히 종료하면 디스크에 재진입 가능한 아티팩트를 남기고 정상적으로 종료됩니다.
- **`--start-at <phase>`** 모든 이전 단계의 상태 파일을 로드하고(또는 재정의 플래그가 지정된 경우 이를 적용) 지정된 단계로 바로 건너뜁니다. 몇 시간 또는 며칠이 지나고 재개하거나, 이전 단계를 다시 실행하지 않고 "이 실험만 다시 분석" 단계로 바로 건너뛸 수 있습니다.

모든 단계에서 사용하는 체크포인트 용어: `continue`는 진행, `stop`는 정상적으로 종료, `redo`는 현재 단계 재실행(필요에 따라 조정 메모 추가), `back`는 한 단계 뒤로 이동합니다. 기타 모든 입력은 조정으로 간주됩니다.

**단, `<ml_app>`는 필수입니다.** 아래 플래그는 모두 선택 사항이며, 스킬은 각각 합리적인 기본값을 선택합니다. 최소 호출은 `/agent-observability-eval-pipeline <ml_app>` 형태로 이루어집니다. 표의 나머지 항목은 기본값을 재정의하거나, 중간부터 재개하거나, 특정 출력 위치를 고정하려는 경우에 사용합니다.

| 옵션| (필수) | 기본값 | 설명 |
|--------|----------|---------|-------------|
| `<ml_app>` | **예** | — (필수) | 온보딩/평가 대상에 해당하는 계측된 LLM 애플리케이션 |
| `--project-name` | 아니요 | `pyproject.toml` / `setup.cfg` / `setup.py` / `package.json` / cwd에서 파생됨 | 파이프라인을 통해 데이터셋과 실험을 기록하는 Datadog 프로젝트입니다. Precheck에 표시되며 4단계의 `LLMObs.enable(project_name=...)`에 의해 지연 생성됩니다.|
| `--timeframe` | 아니요 | `now-7d` | 1단계 분류 및 4단계 데이터셋 샘플링 조회 기간|
| `--trace-limit` | 아니요 | `20` | 4단계의 샘플링 상한입니다. 1단계는 내부적으로 분류 샘플에 `min(20, --trace-limit)`을 사용합니다.|
| `--format` | 아니요 | `py` | 5단계에서 `agent-observability-experiment-py-bootstrap`로 전달됨`py`(스크립트) 또는 `ipynb`(Jupyter 노트북) |
| `--evaluator-style` | 아니요 | `function` | 3단계 및 5단계로 전달됨: `function`, `class` 또는 `remote` |
| `--data-only` | 아니요 | 비활성화 | 3단계 패스스루: Python SDK 코드 대신 프레임워크에 구애받지 않는 JSON 평가자 사양을 내보냅니다. |
| `--publish` | 아니요 | off | 3단계 패스스루: 온라인 LLM 판정 평가자를 Datadog에 게시|
| `--stop-after` | 아니요 | `analyze` (모두 실행) | 지정된 단계가 완료되면 중지 허용: `classify`, `rca`, `eval-bootstrap` *(기존 3단계 동작과 일치)*, `dataset`, `experiment`, `analyze` |
| `--start-at` | 아니요 | `classify` (처음부터 시작) | 이전 단계를 건너뛰고 지정된 단계부터 시작합니다. `--stop-after`와 동일한 어휘를 사용합니다. `<output-dir>/state/` |에서 이전 단계의 아티팩트를 자동으로 로드합니다.
| `--classification-summary` | 아니요 | 에서 자동 로드됨 `state/01-classification.md` | 2단계에서 사용하는 1단계 출력 재정의(`--start-at rca` 이상과 함께 사용) |
| `--rca-report` | 아니요 | 에서 자동 로드됨 `state/02-rca-report.md` | 3단계에서 사용하는 2단계 출력 재정의 |
| `--dataset-file` | 아니요 | `state/04-published-dataset.json`의 `dataset_file` 필드에서 자동 로드됨 | 로컬 `DatasetRecordRaw[]` JSON 샘플링을 다시 수행하지 않고 재게시할 때 4단계의 게시 하위 단계에서 사용됨 |
| `--dataset-name` | 아니요 |  `state/04-published-dataset.json` | 에서 자동 로드됨 5단계에서 실험을 |에 연결하는 게시된 Datadog 데이터셋의 이름
| `--experiment-file` | 아니요 |  `state/05-experiment-run.json` | 에서 자동 로드됨 생성된 실험 파일 5단계(설정한 경우)에서는 코드 생성을 건너뛰고 바로 검토 단계 → 실행으로 이동합니다.|
| `--experiment-id` / `--experiment-url` | 아니요 | `state/05-experiment-run.json` | 에서 자동 로드됨. 6단계에서 분석하는 Datadog 실험(상호 배타적)|
| `--app-root` | 아니요 | cwd / `pyproject.toml` 등에서 확인되지 않음 | 5단계의 작업 함수 내부 검사 범위를 이 디렉토리 트리로 제한함 |
| `--env-file` | 아니요 | 없음(자동 검색으로 표준 위치 탐색) | 자격 증명 로드를 위한 명시적 `.env` 경로; Precheck에 표시됨 |
| `--output-dir` | 아니요 | `./experiments` | 데이터셋 JSON, 게시 스크립트, 생성된 실험 파일, `state/` 디렉터리가 저장되는 위치 |

**예시**

```
# Full six-phase walkthrough for a brand new ml_app
/agent-observability-eval-pipeline my-chatbot --project-name my-chatbot

# Organize the dataset and experiment under a specific Datadog project
# (the project is created lazily — no need to pre-create it in the UI)
/agent-observability-eval-pipeline my-chatbot --project-name customer-qa-eval

# Classic three-phase eval-pipeline behavior — preserves backward compatibility
/agent-observability-eval-pipeline my-chatbot --stop-after eval-bootstrap

# Resume from where a previous run stopped
/agent-observability-eval-pipeline my-chatbot --start-at experiment

# Re-analyze a previous experiment run without re-running it
/agent-observability-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>

# Run a single phase in isolation
/agent-observability-eval-pipeline my-chatbot --start-at dataset --stop-after dataset
```

> **프로젝트 이름** — `--project-name`이 생략되면 스킬이 코드베이스에서 자동으로 추출하고(순서: `pyproject.toml` → `setup.cfg` → `setup.py` → `package.json` → cwd 기본 이름), `experiment-sdk-default`를 기본값으로 사용합니다. 확인된 이름은 모든 단계가 실행되기 전 Precheck 출력에 표시되므로, 다시 호출할 필요 없이 확인하거나 재정의할 수 있습니다. Datadog 프로젝트 자체는 4단계에서 데이터셋을 게시할 때 `LLMObs.enable(project_name=...)`에 의해 지연 생성되므로 UI에서 미리 생성할 필요가 없습니다.

## 일반 워크플로 {#typical-workflow}

LLM 애플리케이션 평가를 처음 수행하는 경우 권장하는 흐름은 다음과 같습니다.

1. **파이프라인 실행**을 통해 프로덕션 트레이스부터 평가자, 시드 데이터셋, 실험, 분석에 이르는 전체 과정을 진행합니다.
   ```
   /agent-observability-eval-pipeline <ml_app> --project-name <project>
   ```
   기존 평가자 전용 출력에서 중단하려면(데이터셋 또는 실험 없음), `--stop-after eval-bootstrap`을 전달합니다. 이전 실행을 재개하려면 `--start-at <phase>`을 전달합니다. — 파이프라인은 `<output-dir>/state/`에서 이전 상태를 다시 로드하고 중단 지점부터 계속 진행합니다.

2. **수정 사항을 적용합니다.** 2단계에서 생성된 RCA 보고서에는 트레이스 증거 기반의 구체적인 수정 전/후 제안 내용이 포함되어 있습니다. 보고서를 코딩 에이전트에 전달(또는 직접 처리)하여 코드베이스의 시스템 프롬프트, 도구 정의, 라우팅 로직을 수정합니다.

3. **오프라인 실험 실행**을 통해 생성된 평가자를 사용하여 레이블이 지정된 데이터셋을 바탕으로 품질을 검증한 후 프로덕션에서 활성화합니다. [평가 개발자 가이드][4]를 참조하세요.

4. ****평가자 검증을 완료한 후 온라인 평가자를 게시합니다. `/agent-observability-eval-bootstrap`을 `--publish`로 실행하면 Datadog에서 프로덕션 트레이스에 대해 실시간으로 자동 실행되는 온라인 LLM 판정 평가자가 생성됩니다(코드를 변경할 필요 없음).
   ```
   /agent-observability-eval-bootstrap <ml_app> --publish
   ```

5. **모니터링하고 반복해서 개선합니다.** 앱의 진화에 맞춰 `/agent-observability-trace-rca` 및 `/agent-observability-eval-bootstrap`을 다시 실행하여 새로운 실패 모드를 탐지하고 평가자 스위트를 최신 상태로 유지하세요.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://claude.ai/code
[2]: /ko/llm_observability/setup/
[3]: /ko/llm_observability/improve/experiments/
[4]: /ko/llm_observability/investigate/evaluations/evaluation_developer_guide
[5]: https://datadoghq.atlassian.net/wiki/spaces/BITSAI/pages/5226692942/pup+CLI
[6]: https://github.com/datadog-labs/agent-skills
[7]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks