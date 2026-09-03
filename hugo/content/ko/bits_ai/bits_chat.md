---
aliases:
- /ko/bits_ai/getting_started/
- /ko/bits_ai/chat_with_bits_ai
- /ko/bits_ai/bits_assistant/
- /ko/tracing/guide/latency_investigator/
description: Datadog에서 Bits Chat을 사용하여 자연어로 관측 가능성 데이터를 탐색하고 조치를 취하세요.
further_reading:
- link: bits_ai/
  tag: 설명서
  text: Bits AI 개요
- link: /incident_response/incident_management/investigate/incident_ai
  tag: 설명서
  text: Incident AI를 활용한 인시던트 조정
- link: /cloud_cost_management/cloud_cost_skill/
  tag: 설명서
  text: Bits Chat의 Cloud Cost Skill
- link: /account_management/billing/ai_credits/
  tag: 설명서
  text: AI 크레딧
title: Bits Chat
---
## 개요 {#overview}
Bits Chat은 자연어를 사용하여 Datadog 전반에서 검색하고 필요한 조치를 취할 수 있도록 지원합니다. Bits Chat은 웹 애플리케이션, 모바일 앱, Slack에서 사용할 수 있습니다.

Bits Chat에 다음과 같은 카테고리의 질문을 할 수 있습니다.

### 문제 조사 및 수정 {#investigate-issues-and-remediate}
- `Summarize high severity incidents that have occurred in the last day`
- `What's causing 400 errors on the checkout endpoint in the last hour?`
- `Why is the error rate spiking on the web-store service?`
- `What is the root cause of this error? How did it propagate and what is the impact on users?`
- `What could cause 500 errors on this API endpoint?`

### 텔레메트리 탐색 및 분석 {#explore-and-analyze-telemetry}
- `Which services have the most errors right now?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `What's the success rate for my top API endpoints over the past week?`
- `Show me error rates for the checkout service over the last 24 hours`
- `Are there any incidents related to Kafka lag?`

### Datadog 개념 및 사용 방법 학습 {#learn-datadog-concepts-and-how-to}
- `How do I configure log collection for the Datadog Agent?`
- `What is the difference between a metric monitor and an anomaly monitor?`
- `What permission do I need to create a new connection?`
- `Can I set the timepicker on a notebook to read-only?`

### 관측 가능성 설정 및 최적화 {#set-up-and-optimize-observability}
- `Do we already have monitors for high latency on the payments service?`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `How can I put a team tag on this monitor?`
- `Add a timeseries widget for request count over time to this notebook`

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="제안 작업이 포함된 전체 페이지 형태의 Bits Chat 인터페이스" style="width:100%;">}}

### 권한 {#permissions}

#### Bits Chat 액세스 {#access-to-bits-chat}

Bits Chat을 사용하려면 역할에 **Bits Chat 액세스** 권한이 있어야 합니다. 이 권한은 Datadog의 세 가지 표준 역할인 Datadog Admin, Datadog Standard, Datadog Read Only에 기본적으로 활성화되어 있습니다.

사용자 지정 역할에 대한 권한을 관리하려면 **Organization Settings** > **Roles**로 이동하여 역할을 선택하고 **General Permissions** 아래의 **Bits Chat Access** 토글을 전환합니다.

#### Bits Chat을 통한 데이터 액세스 {#data-access-through-bits-chat}

Bits Chat은 사용자의 Datadog 역할을 사용하여 데이터를 가져오므로 사용자가 조회할 수 있거나 수정할 수 있는 리소스에만 액세스할 수 있습니다. 예를 들어 사용자의 역할이 특정 로그 인덱스 집합에 대한 액세스를 제한하는 경우 Bits Chat은 해당 인덱스의 로그만 쿼리할 수 있습니다. 마찬가지로 대시보드를 편집할 권한이 없는 경우 Bits Chat이 사용자를 대신하여 대시보드를 편집할 수 없습니다.

### 스킬 {#skills}
Bits Chat은 Datadog 전반의 작업을 수행하기 위한 다양한 전문 기술을 갖추고 있습니다. 가장 일반적으로 사용되는 기술은 아래에 설명되어 있습니다.

#### Dashboards {#dashboards}
자연어 설명에서 [대시보드][5]와 위젯을 빌드합니다.

프롬프트 예시:
- `Show me a dashboard of high-impact alerts from the past week and which services they affected`
- `Add a widget about CPU usage in the payments service`

#### Notebooks {#notebooks}
조사 [노트북][6]을 만들고 요약 및 분석으로 기존 노트북을 보완합니다.

프롬프트 예시:
- `Create an investigation for the recent spike of errors in the checkout service`
- `Add an executive summary for this cost spike report`

#### APM {#apm}

##### 트레이스 분석 {#trace-analysis}
개별 [트레이스][3]를 조사하여 무엇이 실패했는지, 어디서 실패했는지, 이유가 무엇인지를 진단합니다.

프롬프트 예시:
- `Why did this request fail?`
- `Summarize this trace and identify the root cause of the error`

##### 지연 시간 조사 {#latency-investigations}
서비스의 지연 시간을 조사하여 병목 현상이 발생하는 리소스를 파악하고 느린 트레이스에서 변경된 사항을 식별합니다.

프롬프트 예시:
- `What caused the latency spike for this service?`
- `What's the latency bottleneck for this service?`

#### Cloud Cost Management {#cloud-cost-management}
[클라우드 비용][4] 변화를 조사하고 이를 유발한 팀이나 리소스를 식별합니다. [Bits Chat의 Cloud Cost Skill][9]을 참조하세요.

프롬프트 예시:
- `Investigate why EC2 costs changed between January and February`
- `Which teams are responsible for the highest S3 storage costs this month?`

#### DDSQL {#ddsql}
자연어를 사용하여 Datadog [텔레메트리 데이터][8]에 대해 [DDSQL][7] 쿼리를 생성하고 실행합니다.

프롬프트 예시:
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Query average request latency for the payments service broken down by status code`
- `Show me a DDSQL query for the number of RUM sessions by country over the past day`

### 보고서 {#reports}

Bits Chat 보고서 페이지에서 조직이 Bits Chat을 어떻게 사용하는지 확인할 수 있습니다. [**Bits AI** > **Chat** > **Reports**][10]로 이동하여 조회합니다.

- **상위 사용자**: 대화 수에 따라 Bits Chat을 가장 많이 사용하는 팀원을 볼 수 있습니다.
- **사용 추세**: 시간에 따른 대화량을 추적하여 도입 현황을 파악하고 사용 패턴을 식별할 수 있습니다.
- **대화 인텐트 분포**: 문제 조사, 텔레메트리 탐색, Datadog 개념 학습, 관측 가능성 구성 등 인텐트 카테고리별 대화 비중을 확인할 수 있습니다.

이 인사이트를 사용하여 도입 패턴을 파악하고 모범 사례를 공유할만한 핵심 사용자를 식별하며 어떤 사용 사례가 조직에 가장 큰 가치를 제공하는지 평가할 수 있습니다.

### 웹 애플리케이션 {#web-application}
Datadog 웹 애플리케이션에서 Bits Chat을 여는 방법은 여러 가지가 있습니다.
- 탐색 바 오른쪽 상단에서 {{< ui >}}Ask Bits{{< /ui >}}를 클릭합니다.
- Bits Chat이 통합된 Datadog 제품에서 {{< ui >}}Ask Bits{{< /ui >}}를 클릭하거나 {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (반짝이는 별 아이콘)
-  <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>를 누릅니다.
- 왼쪽 탐색 패널에서 {{< ui >}}Bits AI{{< /ui >}}를 클릭합니다.

{{< img src="bits_ai/getting_started/bits_assistant_side_panel.png" alt="대시보드 목록 옆에 열려 있는 Bits Chat 패널" style="width:40%;">}}

### 모바일 애플리케이션 {#mobile-application}

Bits에 시스템이나 활성 인시던트에 대해 질문할 수 있습니다. Bits는 Datadog 공개 설명서, 텔레메트리, 소유권에 대한 컨텍스트를 가지고 있습니다.

1. [모바일 앱을 다운로드하고 로그인합니다][2].
2. 홈 화면에서 {{< ui >}}Bits Assistant{{< /ui >}}를 탭합니다.
3. 음성 또는 텍스트로 Bits Chat과 대화를 시작합니다.
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="Bits AI가 있는 모바일 앱 홈 대시보드 화면" style="width:40%;" >}}

### Slack {#slack}
1. [Datadog 계정을 Slack 워크스페이스에 연결합니다][1].
1. Slack에서 `/dd connect` 명령어를 사용하여 연결할 계정 목록을 표시합니다.
1. 드롭다운에서 Datadog 계정 이름을 선택합니다.
1. Bits AI에 필요한 추가 권한을 승인합니다.

설정이 완료된 후 자연어로 `@Datadog`에 쿼리를 보낼 수 있습니다: `@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Slack에서 수행한 서비스-의존성 쿼리 예시 출력 화면" style="width:60%;">}}

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/slack/?tab=applicationforslack
[2]: /ko/mobile/#installing
[3]: /ko/tracing/trace_explorer/
[4]: /ko/cloud_cost_management/
[5]: /ko/dashboards/
[6]: /ko/notebooks/
[7]: /ko/ddsql_editor/
[8]: /ko/ddsql_reference/data_directory/
[9]: /ko/cloud_cost_management/cloud_cost_skill/
[10]: https://app.datadoghq.com/ask/usage