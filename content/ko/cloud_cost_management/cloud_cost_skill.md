---
algolia:
  rank: 75
  tags:
  - cloud cost
  - cloud cost management
  - ccm
  - finops
  - cloud cost skill
  - bits ai assistant
  - bits assistant
  - mcp
description: Bits Chat에서 Cloud Cost 스킬을 사용하여 Cloud Cost 결과를 조사하고, 설명하고, 공유하세요.
further_reading:
- link: /bits_ai/bits_chat/
  tag: 설명서
  text: Bits Chat
- link: /mcp_server/
  tag: 설명서
  text: Datadog MCP 서버
- link: /cloud_cost_management/reporting/explorer/
  tag: 설명서
  text: Cost Explorer
- link: /cloud_cost_management/planning/budgets/
  tag: 설명서
  text: 예산
title: Bits Chat의 Cloud Cost 스킬
---
## 개요 {#overview}

Cloud Cost 스킬은 [Bits Chat][1]의 Cloud Cost Management 분석 워크플로입니다. 이 스킬은 근본 원인 분석, 예산 추적 및 일반 비용 질문에 대한 답변과 같은 FinOps 작업을 위해 설계되었습니다. 예를 들어 Bits Chat에 다음과 같은 요청을 보낼 수 있습니다.

- [비용 모니터 경보][2], [비용 이상 징후][3] 및 [비용 변화][4] 조사하기
- 지출을 발생시키는 팀, 서비스, 계정, 지역 또는 리소스 식별하기
- 클라우드, SaaS, 맞춤형 또는 Datadog 비용에 대한 질문에 답하기
- 실제 지출과 예상 지출을 [예산][5]과 비교하기
- CPU, 메모리, 요청량 또는 스토리지 크기와 같은 관측 가능한 메트릭과 비용 변화를 연관 지어 분석하기
- 조사를 기록하여 인계하거나 나중에 참조할 수 있도록 [Notebooks][15] 생성하기

## 전제 조건 {#prerequisites}

Bits Chat에서 Cloud Cost 스킬을 사용하려면 다음을 수행해야 합니다.

- 분석할 비용 출처에서 [Cloud Cost Management를 설정][6]합니다.
- 다음 권한이 있어야 합니다.
  - [Bits Chat 액세스][7] 권한
  - 문의하는 데이터에 대한 [Cloud Cost Management 권한][8]
  - (선택 사항) 조사 [Notebooks][15]을 생성하거나 편집하려면 [Notebook 권한][9]이 필요합니다.

## Cloud Cost 스킬 {#start-an-investigation-with-the-cloud-cost-skill}로 조사를 시작하세요.

{{< img src="cloud_cost/cc_skill_anomalies.png" alt="그래프마다 Investigate with Bits AI 버튼이 표시된 비용 이상 징후 그래프." style="width:80%;" >}}

[비용 이상 징후][3]에 대한 조사를 시작하려면 {{< ui >}}Investigate{{< /ui >}}을 클릭하거나 {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (반짝이는 별 아이콘)을 클릭하여 Cloud Cost 스킬을 엽니다.

또는 Datadog 페이지의 내비게이션 바 오른쪽 상단에 있는 {{< ui >}}Ask Bits{{< /ui >}}를 클릭하여 Bits Chat을 열고 비용에 관한 질문을 할 수 있습니다.

프롬프트 예:

- `Investigate why EC2 costs increased last week for team:payments.`
- `Which teams are responsible for the highest S3 storage costs this month?`
- `Why is the infrastructure budget projected to go over this month?`
- `Show total cloud cost by provider for the last 30 complete days.`
- `Find optimization opportunities for idle or over-provisioned cloud infrastructure.`

### 비용 변화 조사 {#cost-change-investigations}

Cloud Cost 스킬로 비용 변화를 조사하면 Bits Chat은 간결한 요약을 제공한 후 다음에 무엇을 탐색하고 싶은지 질문합니다. 초기 분석에는 일반적으로 다음이 포함됩니다.

- 기준 및 조사 기간에 대한 일일 비용 차트
- 기준 기간, 조사 기간, 총 금액 및 백분율 변화, 해당되는 경우 예상 연간 영향
- 소비 변화와 가격 변화를 구별하는 데 도움이 되는 요금 대비 사용 맥락
- 비용 태그에 따라 비용 발생 출처로 파악한 소유자 또는 팀

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="초기 분석 결과를 보여주는 Bits Chat의 조사 요약." style="width:60%;" >}}

초기 요약 후, Bits Chat은 다음을 수행할 수 있습니다.

- 변화를 주도하는 주요 서비스, 계정, 지역, 리소스 또는 태그 찾기
- CPU 요청, 메모리 요청, 요청 수, 버킷 크기 또는 데이터베이스 사용량과 같은 메트릭과 비용 변화의 상관관계 분석
- 관련 예산을 찾아 실제 또는 예측된 지출을 예산 목표와 비교
- 서비스를 소유한 팀을 위한 Datadog Notebook을 생성하여 탐지 결과를 확인하고 조치 취하기
- 조사를 기록으로 남기기 위해 [Notebooks]에 캡처

### 예산 및 예측 {#budgets-and-forecasting}

[예산][5]을 설정한 후, Bits Chat의 Cloud Cost 스킬을 사용하여 예산 상태와 지출을 설명하세요. Bits Chat은 다음을 요약하는 데 도움을 줄 수 있습니다.

- 실제 지출과 예산 금액의 차이
- 예상 지출과 예산 금액의 차이
- 예산의 필터에 따라 예산이 포함하는 비용 범위
- 초과 지출에 기여하는 예산 항목, 팀, 서비스 또는 공급자

초기 요약 후, Bits Chat은 다음을 수행할 수 있습니다.

- 지출을 발생시키는 주요 서비스, 계정, 지역, 리소스 또는 태그 찾기
- 비용 변화에 기여하는 리소스를 소유한 팀 식별
- 예산 업데이트
- 조사를 기록으로 남기기 위해 [Notebooks]에 캡처

## 비용 분석을 위해 Datadog MCP 서버 사용하기 {#use-the-datadog-mcp-server-for-cost-analysis}

[Datadog MCP 서버][10]는 외부 AI 에이전트가 Datadog 데이터를 쿼리할 수 있도록 지원합니다. 이는 IDE, 터미널 기반의 어시스턴트 또는 사용자 지정 AI 워크플로에서 비용 질문을 하고 싶을 때 유용합니다.

외부 AI 에이전트를 사용하려면 [Datadog MCP 서버를 설정][11]하세요. MCP 클라이언트가 도구 세트를 필터링하는 경우, Cloud Cost Management 데이터를 쿼리할 수 있는 메트릭 도구를 사용하려면 `core` 도구 세트를 포함하세요.

Cloud Cost Management 데이터는 다음과 같은 핵심 메트릭 도구에서 지원됩니다.

| MCP 도구                          | 사용량                                 |
| --------------------------------- | ------------------------------------- |
| [`get_datadog_metric`][12]         | 비용 메트릭을 쿼리하고, 기간을 비교하며, 공급자, 서비스, 팀, 계정, 리소스 또는 태그별로 비용을 그룹화합니다. |
| [`get_datadog_metric_context`][13] | 비용 메트릭을 쿼리하기 전에 메타데이터, 사용 가능한 태그 키 및 태그 값을 발견합니다.               |

에이전트에게 Cloud Cost Management 메트릭(예: `all.cost`, `aws.cost.*`, `azure.cost.*`, `gcp.cost.*`, `oci.cost.*`, `custom.cost.*` 또는 `datadog.cost.*`)에 대해 `use_cloud_cost`을 `true`로 설정하도록 요청하세요. 비용 변화를 설명하는 관측 메트릭(예: Kubernetes CPU 또는 S3 버킷 크기)에는 표준 메트릭 쿼리 동작을 사용하세요.

MCP에 연결된 에이전트의 프롬프트 예:

- `Use Datadog MCP to query cloud cost data. Set use_cloud_cost=true and show daily all.cost grouped by provider for the last 30 complete days.`
- `Use get_datadog_metric_context with use_cloud_cost=true to find available tags for aws.cost.net.amortized.shared.resources.allocated, then group EC2 costs by team.`
- `Compare this week's complete EC2 cost to the previous week and explain which teams or accounts changed the most.`

연결 지침, 지원되는 클라이언트 및 도구 세트 구성은 [Datadog MCP 서버 설정][11]을 참조하세요. 전체 MCP 도구에 관한 자세한 정보는 [Datadog MCP 서버 도구][14]를 참조하세요.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/bits_chat/
[2]: https://app.datadoghq.com/cost/monitor/monitors
[3]: https://app.datadoghq.com/cost/monitor/anomalies
[4]: https://app.datadoghq.com/cost/summarize/overview
[5]: https://app.datadoghq.com/cost/plan/budgets
[6]: /ko/cloud_cost_management/setup/
[7]: /ko/account_management/rbac/permissions/#bits-assistant
[8]: /ko/cloud_cost_management/setup/permissions/
[9]: /ko/account_management/rbac/permissions/#notebooks
[10]: /ko/mcp_server/
[11]: /ko/mcp_server/setup/
[12]: /ko/mcp_server/tools/#get_datadog_metric
[13]: /ko/mcp_server/tools/#get_datadog_metric_context
[14]: /ko/mcp_server/tools/
[15]: /ko/notebooks/