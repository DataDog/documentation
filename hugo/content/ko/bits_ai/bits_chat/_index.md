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
  text: 인시던트 AI를 활용한 인시던트 조정
- link: /cloud_cost_management/cloud_cost_skill/
  tag: 설명서
  text: Bits Chat의 Cloud Cost 스킬
- link: /account_management/billing/ai_credits/
  tag: 설명서
  text: AI 크레딧
- link: https://www.datadoghq.com/blog/datadog-mcp-apps/
  tag: 블로그
  text: 'Datadog MCP 앱: AI 워크플로 내에서의 대화형 경험'
- link: https://www.datadoghq.com/blog/introducing-bits-chat/
  tag: 블로그
  text: Bits Chat을 사용하여 Datadog 전반에서 검색하고 조치를 취하여 문제를 더 빠르게 해결하기
- link: https://www.datadoghq.com/blog/cloud-cost-skill-bits-chat/
  tag: 블로그
  text: Bits Chat의 Cloud Cost 스킬을 사용하여 비용 관련 질문을 더 빠르게 해결하기
- link: https://www.datadoghq.com/blog/bits-chat-slack-incident-response/
  tag: 블로그
  text: '경고에서 해결까지: Slack의 Bits Chat을 통한 인시던트 관리'
title: Bits Chat
---
## 개요 {#overview}

Bits Chat은 자연어를 사용하여 Datadog 전반에서 검색하고 필요한 조치를 취할 수 있도록 지원합니다. 인시던트 조사, 텔레메트리 탐색, 대시보드 구축 또는 DDSQL을 사용한 데이터 쿼리를 요청하면 사용자가 직접 쿼리를 작성할 필요 없이 대화형 채팅으로 답변을 제공합니다.

Bits Chat은 Datadog 웹 애플리케이션, 모바일 앱 및 Slack에서 사용할 수 있습니다. 각 인터페이스에서 Bits Chat을 여는 방법은 [Bits Chat 사용][1]을 참조하세요.

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="제안 작업이 포함된 전체 페이지 형태의 Bits Chat 인터페이스" style="width:100%;">}}

Bits Chat에 다음과 같이 질문해 보세요.
- `Why is the error rate spiking on the web-store service?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Investigate why EC2 costs changed between January and February`

## 권한 {#permissions}

### Bits Chat 액세스{#access-to-bits-chat}

Bits Chat을 사용하려면 역할에 **Bits Chat 액세스** 권한이 있어야 합니다. 이 권한은 Datadog의 세 가지 표준 역할인 Datadog Admin, Datadog Standard, Datadog Read Only에 기본적으로 활성화되어 있습니다.

사용자 지정 역할에 대해 이 권한을 관리하려면 [역할을 업데이트][2]하여 **Bits Chat 액세스**를 활성화할 수 있습니다. 

### Bits Chat을 통한 데이터 액세스{#data-access-through-bits-chat}

Bits Chat은 사용자의 Datadog 역할을 사용하여 데이터를 가져오므로 사용자가 조회할 수 있거나 수정할 수 있는 리소스에만 액세스할 수 있습니다. 예를 들어 사용자의 역할이 특정 로그 인덱스 집합에 대한 액세스를 제한하는 경우 Bits Chat은 해당 인덱스의 로그만 쿼리할 수 있습니다. 마찬가지로 대시보드를 편집할 권한이 없는 경우 Bits Chat이 사용자를 대신하여 대시보드를 편집할 수 없습니다.

## 대화 기록{#chat-history}

Bits Chat은 대화를 저장합니다. 지난 대화를 보려면 [Bits Chat][3]에서 {{< ui >}}History{{< /ui >}}를 열거나 Bits Chat 패널에서 {{< img src="bits_ai/icons/clock_historical.svg" inline="true" style="width:16px;" alt="기록 아이콘" >}} 을 클릭하세요.

### 대화 관리 및 공유{#manage-and-share-chats}

{{< ui >}}History{{< /ui >}}의 대화 옆이나 열려 있는 대화의 헤더에서 {{< ui >}}...{{< /ui >}}을 클릭하여 {{< ui >}}Rename{{< /ui >}}, {{< ui >}}Share{{< /ui >}}, 또는 {{< ui >}}Delete{{< /ui >}}를 수행하세요. 대화를 삭제하면 되돌릴 수 없습니다.

대화는 기본적으로 비공개입니다. 대화를 공유하려면 {{< ui >}}...{{< /ui >}} > {{< ui >}}Share{{< /ui >}} > {{< ui >}}Shared Chat{{< /ui >}}을 클릭한 다음 {{< ui >}}Copy Link{{< /ui >}}를 클릭하세요. 링크가 있는 사람은 누구나 새 메시지를 포함한 대화를 볼 수 있지만, 답장은 본인만 할 수 있습니다.

<div class="alert alert-warning">공유된 대화는 사용자의 권한으로 검색된 데이터를 보여줍니다. 공유하기 전에 대화 내용을 확인하세요.</div>

공유된 링크는 자동으로 만료됩니다({{< ui >}}Share Chat{{< /ui >}} 대화 상자에서 만료일을 확인하세요). 공유를 중지하려면 {{< ui >}}Share Chat{{< /ui >}}을 열고 {{< ui >}}Private Chat{{< /ui >}}을 선택하세요.

## 보고서 {#reports}

Bits Chat 보고서 페이지에서 조직이 Bits Chat을 어떻게 사용하는지 확인할 수 있습니다. [**Bits AI** > **Chat** > **Reports**][4]로 이동하여 조회합니다.

- **상위 사용자**: 대화 수에 따라 Bits Chat을 가장 많이 사용하는 팀원을 볼 수 있습니다.
- **사용 추세**: 시간에 따른 대화량을 추적하여 도입 현황을 파악하고 사용 패턴을 식별할 수 있습니다.
- **대화 인텐트 분포**: 문제 조사, 텔레메트리 탐색, Datadog 개념 학습, 관측 가능성 구성 등 인텐트 카테고리별 대화 비중을 확인할 수 있습니다.

이 인사이트를 사용하여 도입 패턴을 파악하고 모범 사례를 공유할만한 핵심 사용자를 식별하며 어떤 사용 사례가 조직에 가장 큰 가치를 제공하는지 평가할 수 있습니다.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/bits_chat/usage/
[2]: /ko/account_management/rbac/?tab=datadogapplication#update-a-role
[3]: https://app.datadoghq.com/ask
[4]: https://app.datadoghq.com/ask/usage