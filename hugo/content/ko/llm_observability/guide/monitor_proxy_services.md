---
aliases:
- /ko/llm_observability/trace_proxy_services/
description: Agent Observability를 사용하여 프록시 또는 게이트웨이 서비스를 거치는 LLM 호출을 전체 엔드투엔드 추적의
  일부로서 추적하는 방법을 알아보세요.
title: 프록시 서비스 추적
---
## 개요 {#overview}

전통적인 애플리케이션과 마찬가지로, LLM 애플리케이션은 여러 마이크로서비스에 걸쳐 있을 수 있습니다. Agent Observability를 사용하면 이러한 서비스 중 하나가 LLM 프록시 또는 게이트웨이인 경우, 전체 엔드투엔드 추적 내에서 LLM 호출을 추적하여 서비스 전반의 전체 요청 경로를 캡처할 수 있습니다.

## 프록시 또는 게이트웨이 서비스에 대해 Agent Observability 활성화{#enabling-agent-observability-for-a-proxy-or-gateway-service}

여러 ML 애플리케이션이 사용하는 프록시 또는 게이트웨이 서비스에 Agent Observability를 활성화하려면 ML 애플리케이션 이름을 지정하지 않고 구성할 수 있습니다. 대신 서비스 이름을 설정하세요. 이를 통해 [Agent Observability 내에서 해당 프록시 또는 게이트웨이 서비스에 특정한 스팬을 필터링](#observing-llm-gateway-and-proxy-services)할 수 있습니다.

{{< tabs >}}
{{% tab "Python" %}}

```python
# proxy.py
from ddtrace.llmobs import LLMObs

LLMObs.enable(service="chat-proxy")

# proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
// proxy.js
const tracer = require('dd-trace').init({
  llmobs: true,
  service: "chat-proxy"
});
const llmobs = tracer.llmobs;

// proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
```

{{% /tab %}}
{{< /tabs >}}


LLM 프록시 또는 게이트웨이로 요청을 보내는 ML 애플리케이션을 오케스트레이션하는 서비스가 있는 경우, ML 애플리케이션 이름으로 Agent Observability를 활성화하세요.

{{< tabs >}}
{{% tab "Python" %}}

```python
# application.py
from ddtrace.llmobs import LLMObs
LLMObs.enable(ml_app="my-ml-app")

import requests

if __name__ == "__main__":
    with LLMObs.workflow(name="run-chat"):
      # other application-specific logic - (such as RAG steps and parsing)

      response = requests.post("http://localhost:8080/chat", json={
        # data to pass to the proxy service
      })


      # other application-specific logic handling the response
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
// application.js
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: 'my-ml-app'
  }
});
const llmobs = tracer.llmobs;

const axios = require('axios');

async function main () {
  llmobs.trace({ name: 'run-chat', kind: 'workflow' }, async () => {
    // other application-specific logic - (such as RAG steps and parsing)

    // wrap the proxy call in a task span
    const response = await axios.post('http://localhost:8080/chat', {
      // data to pass to the proxy service
    });

    // other application-specific logic handling the response
  });
}

main();
```

{{% /tab %}}
{{< /tabs >}}

LLM 애플리케이션이 프록시 또는 게이트웨이 서비스에 요청을 보내면, Agent Observability SDK가 원래 LLM 애플리케이션의 ML 애플리케이션 이름을 자동으로 전파합니다. 프록시 또는 게이트웨이 서비스에 지정된 ML 애플리케이션 이름보다 전파된 ML 애플리케이션 이름이 우선합니다.

## LLM 게이트웨이 및 프록시 서비스 관찰{#observing-llm-gateway-and-proxy-services}

### 프록시 또는 게이트웨이 서비스에 대한 모든 요청{#all-requests-to-the-proxy-or-gateway-service}

프록시 서비스에 대한 모든 요청을 최상위 스팬으로 보려면 프록시 서비스 엔드포인트의 진입점을 `workflow` 스팬으로 래핑하세요.

{{< tabs >}}
{{% tab "Python" %}}

```python
# proxy.py
from ddtrace.llmobs import LLMObs

LLMObs.enable(service="chat-proxy")

@app.route('/chat')
def chat():
    with LLMObs.workflow(name="chat-proxy-entrypoint"):
        # proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
// proxy.js
const tracer = require('dd-trace').init({
  llmobs: true,
  service: "chat-proxy"
});
const llmobs = tracer.llmobs;

app.post('/chat', async (req, res) => {
  await llmobs.trace({ name: 'chat-proxy-entrypoint', kind: 'workflow' }, async () => {
    // proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
    res.send("Hello, world!");
  });
});
```

{{% /tab %}}
{{< /tabs >}}

그러면 프록시 서비스에 대한 모든 요청을 LLM 트레이스 보기 내에서 최상위 스팬으로 볼 수 있습니다.

1. [LLM 트레이스][1] 페이지에서 왼쪽 상단 드롭다운에서 {{< ui >}}All Applications{{< /ui >}}를 선택하세요.
2. 오른쪽 상단 드롭다운에서 {{< ui >}}All Spans{{< /ui >}} 보기로 전환하세요.
3. `service` 태그와 워크플로 이름으로 목록을 필터링하세요.

{{< img src="llm_observability/all-spans-with-service-and-span-name.png" alt="서비스 및 워크플로 이름 태그가 있는 모든 ML 애플리케이션의 모든 스팬 조회하기" style="width:100%;" >}}

트레이스 보기 왼쪽의 패싯을 사용하여 워크플로 {{< ui >}}Span Name{{< /ui >}}을 필터링할 수도 있습니다.

{{< img src="llm_observability/span-name-facet-for-proxy-service-monitoring.png" alt="트레이스 보기 왼쪽의 패싯에서 워크플로 스팬 이름 선택하기" style="width:50%;" >}}

### 프록시 또는 게이트웨이 서비스 내에서 이루어진 모든 LLM 호출 {#all-llm-calls-made-within-the-proxy-or-gateway-service}

프록시 또는 게이트웨이 서비스 내에서 이루어진 LLM 호출만 모니터링하려면 추적 보기에서 `llm` 스팬으로 필터링하세요.

{{< img src="llm_observability/all-spans-with-service-and-span-kind.png" alt="서비스 태그와 LLM 스팬 종류를 사용하여 모든 ML 애플리케이션의 모든 스팬 조회하기" style="width:100%;" >}}

트레이스 보기 왼쪽의 {{< ui >}}Span Kind{{< /ui >}} 패싯으로도 필터링할 수 있습니다.

{{< img src="llm_observability/span-kind-facet-for-proxy-service-monitoring.png" alt="트레이스 보기 왼쪽에서 LLM 스팬 종류 패싯 선택하기" style="width:50%;" >}}

### 특정 ML 애플리케이션별 필터링 및 패턴과 추세 관찰 {#filtering-by-a-specific-ml-application-and-observing-patterns-and-trends}

두 가지 필터링 프로세스([프록시 서비스에 대한 최상위 호출](#all-requests-to-the-proxy-or-gateway-service) 및 [프록시 또는 게이트웨이 서비스 내에서 이루어진 LLM 호출](#all-llm-calls-made-within-the-proxy-or-gateway-service))를 모두 특정 ML 애플리케이션에 적용하여 프록시 또는 게이트웨이 서비스와의 상호 작용을 조회할 수 있습니다.

1. 왼쪽 상단 드롭다운에서 관심 있는 ML 애플리케이션을 선택하세요.
2. ML 애플리케이션에 대한 모든 추적을 보려면 오른쪽 상단 드롭다운에서 {{< ui >}}All Spans{{< /ui >}} 보기에서 {{< ui >}}Traces{{< /ui >}} 보기로 전환하세요.
3. ML 애플리케이션에 대한 추적 시계열을 보려면 오른쪽 상단의 드롭다운에서 {{< ui >}}All Spans{{< /ui >}} 필터로 다시 전환한 다음 'Visualize as' 옆에서 {{< ui >}}Timeseries{{< /ui >}}을 선택하세요.

{{< img src="llm_observability/timeseries-view-for-proxy-services.png" alt="All Span 필터를 유지하면서 트레이스 보기 옵션 중 목록 보기에서 시계열 보기로 전환하기" style="width:100%;" >}}

## 프록시 또는 게이트웨이 서비스에 호출을 수행하는 LLM 애플리케이션의 엔드투엔드 사용량 관찰 {#observing-end-to-end-usage-of-llm-applications-making-calls-to-a-proxy-or-gateway-service}

프록시 또는 게이트웨이 서비스에 호출을 수행하는 LLM 애플리케이션의 전체 엔드투엔드 사용량을 관찰하려면 해당 ML 애플리케이션 이름으로 추적을 필터링할 수 있습니다.

1. LLM 추적 보기의 왼쪽 상단 드롭다운에서 관심 있는 ML 애플리케이션 이름을 선택하세요.
2. 오른쪽 상단 드롭다운에서 {{< ui >}}Traces{{< /ui >}} 보기로 전환하세요.


[1]: https://app.datadoghq.com/llm/traces