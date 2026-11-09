---
aliases:
- /ko/llm_observability/cluster_map
- /ko/llm_observability/monitoring/cluster_map
- /ko/llm_observability/investigate/cluster_map
- /ko/llm_observability/monitoring/patterns/
description: 자동화된 주제 클러스터링을 사용하여 에이전트의 프로덕션 트래픽 패턴을 검색하고 분석하세요.
further_reading:
- link: /llm_observability/
  tag: 문서
  text: Agent Observability에 대해 알아보기
- link: /llm_observability/quickstart/terms/
  tag: 문서
  text: Agent Observability 주요 용어 및 개념에 대해 알아보기
- link: /llm_observability/improve/datasets
  tag: 문서
  text: 데이터세트에 대해 알아보기
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: 학습 센터
  text: LLM Observability로 조사하기
- link: https://learn.datadoghq.com/courses/llm-obs-tracing-llm-applications
  tag: 학습 센터
  text: LLM 애플리케이션 추적
- link: https://www.datadoghq.com/blog/patterns-agent-observability/
  tag: 블로그
  text: Agent Observability의 패턴을 통한 프로덕션 LLM 동작 이해
title: 패턴
---
## 개요 {#overview}

패턴은 LLM 애플리케이션의 프로덕션 트래픽을 의미 있는 주제로 자동 클러스터링하여 사용자가 질문하는 내용을 파악하고, 커버리지 격차를 식별하며, 실패 모드를 진단하도록 돕습니다.

각기 다른 애플리케이션, 스팬 유형 또는 사용 사례로 범위가 지정된 여러 개의 명명된 패턴을 생성할 수 있습니다.

## 작동 방식 {#how-it-works}

패턴은 [연결된 LLM 공급자 계정][1]에 대한 호출과 텍스트 임베딩의 결합을 사용하여 수동으로 태그하지 않고도 프로덕션 동작에 대한 해석 가능한 보기를 제공합니다.

패턴을 실행하면 다음 작업이 수행됩니다.

1. 필터 및 샘플링 구성에 따라 프로덕션 트래픽에서 LLM 상호작용을 가져옵니다.
2. AI 생성 텍스트로 각 상호작용을 요약합니다.
3. 자체 호스팅 오픈 소스 모델을 사용하여 이러한 요약의 텍스트 임베딩을 계산합니다.
4. 머신러닝(UMAP 및 HDBSCAN)을 사용하여 클러스터를 형성합니다.
5. 각 클러스터를 검토하고 AI 생성 텍스트로 의미 있는 주제를 생성합니다.
6. 각 상호작용을 단일 주제에 귀속시킵니다.
7. 유사한 주제를 그룹화하여 AI를 사용해 계층 구조를 구축합니다.

각 주제는 상호작용 볼륨과 전체 트래픽 점유율을 보여줍니다. 어떠한 클러스터에도 맞지 않는 상호작용은 이상치 그룹으로 수집됩니다.

## 패턴 설정 {#set-up-a-pattern}

1. Datadog에서 **AI Observability** > **Agent Observability** > [**Patterns**][4]로 이동합니다.
1. **+ New Pattern**을 클릭합니다.
1. **이름**을 입력합니다.
1. **Application** 다중 선택기를 사용하여 스팬을 포함할 LLM 애플리케이션을 하나 이상 선택합니다. 애플리케이션을 선택하면 기본 스팬 필터 쿼리가 자동으로 업데이트되며, 쿼리를 편집하면 선택된 애플리케이션이 업데이트됩니다.
1. **Setup**에서 다음을 수행합니다.
  1. 패턴으로 **분석**할 대상이 개별 **스팬**인지 **트레이스**인지 선택합니다.
  1. (선택 사항) 짧은 **클러스터링 지침**을 작성하여 패턴이 사용자 의도, 에이전트 작업 또는 사용된 제품과 같은 상호작용을 그룹화하고 주제를 생성하는 방법에 대한 자유 형식의 지침을 제공합니다. 예를 들어, 사용자 의도를 기준으로 클러스터링하려면 '사용자 의도를 기준으로 클러스터링'이라고 작성할 수 있습니다. 첫 번째 실행이 성공적으로 완료된 후 이 필드를 변경하면 이전 패턴 실행에서 **발견하고 유지한 주제가 삭제**됩니다. 각 상호작용의 주요 목표별로 상호작용을 그룹화하려면 이 필드를 비워 두세요.
  1. 패턴이 **클러스터링할** 상호작용의 변수를 선택합니다. `{{variable}}` syntax to reference any span field; for example, `{{meta.input.value}}` to analyze patterns by user input, or `{{meta.span.kind}}`를 사용하여 스팬 종류별로 분석합니다.
  1. 패턴으로 클러스터링할 상호작용을 더 잘 선택하려면 정확한 **필터**를 추가합니다.
  1. **Time window**를 설정하여 분석할 상호작용의 시간 범위를 정의합니다.
  1. **일치하는 상호작용의 샘플링**은 **Change** 버튼을 클릭하여 액세스할 수 있습니다. 최대 10,000개의 스팬과 5,000개의 트레이스로 제한됩니다. 필터가 그보다 많은 항목과 일치하는 경우, Agent Observability는 해당 수에 도달할 때까지 상호작용을 무작위로 샘플링합니다. 
  1. **Select a model**을 클릭합니다. 모델 구성 창이 열리면 Agent Observability가 주제 이름, 요약, 주제 계층 구조를 생성하고 각 상호작용을 주제에 귀속시키는 데 사용하는 세부 정보를 추가할 수 있습니다.
    - **LLM 공급자**: 지원되는 공급자는 OpenAI, Anthropic, Amazon Bedrock, Azure OpenAI 및 Vertex AI입니다.
    - **계정**
    - **모델**: 성능 및 비용 요구 사항을 위해 태그가 지정된 권장 모델을 사용하는 것이 좋습니다.
    **Confirm**을 클릭하여 변경 사항을 저장하고 창을 닫습니다.
1. (선택 사항) **Datasets**에서 다음을 수행합니다.
  1. 라디오 버튼을 켜서 프로덕션 트래픽을 오프라인 평가 데이터 세트와 비교합니다.
  1. **Datasets** 선택기를 사용하여 AI 에이전트를 오프라인으로 평가하는 데 사용하는 데이터 세트를 선택합니다.
  1. (선택 사항) **Automatic curation** 라디오 버튼을 활성화하여 패턴이 탐지한 커버리지 격차를 자동으로 채웁니다. 활성화되면 Datadog은 관리형 프로젝트(`Patterns-coverage`)와 패턴별 데이터세트(`{pattern-name}-pattern-curated`)를 생성하여 각 실행 후 제안된 상호작용을 수신합니다. 이 토글은 새 패턴에 대해 기본적으로 **켜짐** 상태입니다. 
1. **Schedule**에서 패턴 실행 빈도를 선택합니다. 예약된 시간은 Datadog 시간대 기본 설정을 사용합니다. 예약된 실행은 수동 실행과 동일한 파이프라인을 사용하므로 결과가 같은 위치에 나타나며, Patterns 페이지에는 언제나 가장 최근 실행이 표시됩니다.
   - **Daily**, **Weekdays** 또는 **Weekly(Default)**: 선택한 시간(매주의 경우 요일 포함)에 자동으로 실행합니다.
   - **On demand**: 패턴을 수동으로 실행합니다.
   - **Custom**: 1~7일마다 자동으로 실행합니다.
1. **Notifications**에 Datadog에서 활성화한 메일 및/또는 외부 메시징 통합을 입력하여(Datadog에서 외부 통합을 활성화하려면 [**Integrations**][5] 참조) 패턴 결과를 사용할 수 있을 때 알림을 받습니다.
1. **Create and Run Pattern**을 클릭하여 패턴을 생성하고 실행하거나, **Create Pattern**을 클릭하여 실행하지 않고 생성합니다.

## 패턴 탐색 {#explore-your-patterns}

헤더의 드롭다운을 사용하여 명명된 패턴 간에 전환하세요. 각 패턴은 가장 최근 실행의 결과를 보여줍니다.

### 요약 메트릭 읽기 {#read-the-summary-metrics}

Patterns 페이지 상단에는 가장 최근 실행을 통한 3가지 메트릭이 표시됩니다.
- {{< ui >}}Total interactions{{< /ui >}}: 분석된 상호작용의 수
- {{< ui >}}Identified topics{{< /ui >}}: 상위 및 하위 주제를 포함하여 발견된 총 고유 주제의 수
- {{< ui >}}Classified{{< /ui >}}: 명명된 주제에 할당한 분석된 상호작용의 비율로, 이상치의 상호작용은 분류되지 않은 것으로 간주됨

### 차원별 패턴 시각화 {#visualize-patterns-by-dimension}

주제 표 위에는 패턴을 서로 비교하는 산점도가 있습니다. 각 버블은 하나의 주제를 나타내며 Y축은 상호작용 수를, X축은 Dimension 드롭다운에서 선택한 메트릭(예: 총 오류 수)을 보여줍니다. 이 차트를 사용하여 이상치 즉, 볼륨에 비해 오류율이나 지연 시간이 예상보다 높게 나타나는 주제를 파악하세요.

{{< img src="llm_observability/patterns_landing_page.png" alt="주제당 하나의 버블이 있는 버블 차트를 보여주는 Patterns 페이지입니다. Y축은 상호작용 수를, X축은 선택된 메트릭 차원을 보여줍니다." style="width:100%;" >}}

### 주제 목록 탐색 {#navigate-the-topic-list}

주제 표는 발견된 모든 주제의 계층 구조 보기를 제공합니다. 각 주제는 다음을 보여줍니다.

- {{< ui >}}Pattern{{< /ui >}} - 클러스터 내 상호작용을 기반으로 자동 생성된 이름 및 설명
- {{< ui >}}Interactions{{< /ui >}} - 전체 트래픽의 수 및 비율
- {{< ui >}}Cost{{< /ui >}} - 해당 주제 내 상호작용의 예상 LLM 비용
- {{< ui >}}Tokens{{< /ui >}} - 해당 주제 내 상호작용의 토큰 사용량
- {{< ui >}}Errors{{< /ui >}} - 오류 수 및 비율
- {{< ui >}}Latency{{< /ui >}} - 해당 주제 내 상호작용의 지연 시간 중앙값
- {{< ui >}}Evaluations{{< /ui >}} - 온라인 평가자가 구성된 경우의 평가 결과
 

상위 주제를 확장하여 하위 주제를 확인하고 애플리케이션 트래픽의 특정 영역을 검토하세요.

### 주제 자세히 보기 {#drill-into-a-topic}

주제 이름을 클릭하면 상세 뷰가 열립니다. 이동 경로를 사용하거나 {{< ui >}}Topic Map{{< /ui >}}의 노드를 클릭하여 주제 계층 구조를 탐색합니다. 맵은 선택한 브랜치를 강조 표시하고 각 주제의 상호 작용 수와 사용 가능한 경우 이전 실행 이후의 트래픽 변화를 보여줍니다.

{{< img src="llm_observability/patterns_topic_details.png" alt="패턴 요약과 상호 작용 수 및 트래픽 변화가 포함된 대화형 주제 맵을 보여주는 주제 상세 뷰입니다." style="width:100%;" >}}

상세 뷰에는 다음이 포함됩니다.

- {{< ui >}}Pattern Summary{{< /ui >}}: 트래픽 추세, 온라인 평가 상태, 운영 이상치, 데이터 세트 커버리지 격차 및 권장 다음 단계를 중점적으로 보여줍니다.
- {{< ui >}}Scorecard{{< /ui >}}: 트래픽 볼륨 및 점유율, 비용, 오류율, 지연 시간 중앙값 및 데이터 세트 커버리지를 요약합니다.
- {{< ui >}}Dataset Coverage Detail{{< /ui >}}: 데이터 세트별 커버리지 상태 및 속성을 보여줍니다. 권장 사례를 검토하여 커버리지 격차를 해소하거나, 자동 데이터 세트 큐레이션이 활성화된 경우 관리형 데이터 세트를 엽니다.
- {{< ui >}}Evaluations{{< /ui >}}: 각 온라인 평가자의 주요 결과와 시간 경과에 따른 차트를 요약합니다. 일치하는 스팬을 열어 특정 결과를 조사합니다.
- {{< ui >}}Interactions{{< /ui >}}: 주제에 할당된 입력 및 출력과 해당 하위 주제, 타임스탬프, 권장 사항 상태 및 평가 결과를 나열합니다. 전체 텍스트 또는 패싯 쿼리로 필터링하거나, 평가 열을 구성하거나, 행을 클릭하여 트레이스 세부 정보를 엽니다.

{{< img src="llm_observability/patterns_topic_details_scorecard.png" alt="스코어카드, 데이터 세트 커버리지 세부 정보 및 상호 작용 표를 보여주는 주제 상세 뷰입니다." style="width:100%;" >}}

### 상호작용 내보내기 및 조치 {#export-and-act-on-interactions}
상호 작용 표에서 하나 이상의 행을 선택하여 해당 상호 작용에 대한 작업을 수행합니다.

- **Download as CSV:** 상호작용을 CSV 파일로 내보냅니다.
- **Add to Dataset:** 상호작용을 [데이터세트][2]로 전송하여 실제 프로덕션 트래픽에서 평가 테스트 케이스를 구축합니다.
- **Add to Queue:** 사람의 검토 및 레이블 지정을 위해 상호작용을 [주석 대기열][3]로 전송합니다.

## 새로운 실행 트리거 {#trigger-a-new-run}

프로덕션 트래픽을 분석하려면 패턴 헤더에서 {{< ui >}}Run analysis{{< /ui >}}를 클릭하세요. 파이프라인은 백그라운드에서 실행되며 완료, 실행 중 및 대기 중 단계를 표시합니다. 실행에는 약 5~10분이 소요됩니다. 파이프라인이 완료되었을 때 메일로 알림을 받으려면 **Notify me**를 클릭하세요. 페이지를 닫고 나중에 돌아와도 됩니다. 실행이 완료되면 헤더에 마지막 실행 날짜와 조회 기간이 표시됩니다.

실행에 실패하면 모달 창에 원인과 취해야 할 조치의 설명이 표시됩니다. 실패한 실행이 헤더에 표시되는 동안 페이지에는 가장 최근의 성공적인 실행 결과가 계속 표시됩니다.

## 주제를 사용하여 애플리케이션 개선 {#use-topics-to-improve-your-application}

### 프로덕션 트래픽 이해하기 {#understand-your-production-traffic}

주제 목록을 사용하여 사용자가 애플리케이션으로 실제로 어떤 작업을 하고 있는지 확인하세요.

트래픽 비율을 사용하여 가장 일반적인 사용 사례를 파악할 수 있습니다. 상위-하위 계층 구조를 통해 상위 수준 패턴에서 아래에 있는 특정 하위 패턴으로 이동할 수 있습니다.

### 평가 커버리지 격차 찾기 {#find-evaluation-coverage-gaps}

주제 분포를 핵심 데이터세트가 실제로 다루는 내용과 비교할 수 있습니다. 높은 프로덕션 볼륨을 나타내지만 해당하는 평가 케이스가 없는 주제를 살펴보세요. 해당 주제는 테스트 커버리지에 격차가 있는 부분이며, 모델 회귀가 사용자에게 도달하기 전에 발견될 가능성이 가장 낮습니다.

### 평가 데이터세트 자동 선별 {#automatically-curate-evaluation-datasets}

자동 데이터세트 선별이 활성화되면 각 패턴 실행 시 커버리지가 부족한 주제에 대해 제안된 상호작용이 관리형 데이터세트에 직접 추가됩니다(`Patterns-coverage` 프로젝트 내 `{pattern-name}-pattern-curated`). 실행이 완료되면 주제의 상세 보기를 열고 **Access dataset**를 클릭하여 선별된 레코드를 검토하고 이를 평가 테스트 케이스로 사용하세요.

### 실패 패턴 진단 {#diagnose-failure-patterns}

패턴의 필터를 품질 점수가 낮거나 실패한 평가로 지정한 다음 분석을 실행하세요. 결과로 생성된 주제 분류는 어떤 유형의 요청이 가장 많이 실패하는지 보여주어 트레이스를 일일이 디버깅하는 대신 구조화된 방식으로 수정 우선순위를 정할 수 있습니다.

### 트래픽의 변화 추적 {#track-how-traffic-evolves}

주기적으로 패턴을 다시 실행하고 {{< ui >}}Compare to{{< /ui >}} 드롭다운을 사용하여 실행 간의 주제 분포를 비교하세요. {{< ui >}}NEW{{< /ui >}} 표시가 있는 주제가 상단 근처에 나타나면 사용자가 새로운 사용 사례나 새로운 실패 모드를 발견한 것입니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/connect_to_account/
[2]: /ko/llm_observability/improve/datasets/
[3]: /ko/llm_observability/investigate/annotation_queues/
[4]: https://app.datadoghq.com/llm/patterns
[5]: /ko/integrations/#cat-notifications