---
aliases:
- /ja/llm_observability/trace_proxy_services/
description: Agent Observabilityを使用して、完全なエンドツーエンドトレースの一部として、プロキシまたはゲートウェイサービスを介したLLM呼び出しをトレースする方法を学びます。
title: プロキシサービスのトレース
---
## 概要{#overview}

従来のアプリケーションと同様に、LLMアプリケーションも複数のマイクロサービスにまたがることができます。Agent Observabilityを使用すると、これらのサービスの一つがLLMプロキシまたはゲートウェイである場合、完全なエンドツーエンドトレース内でLLM呼び出しをトレースし、サービス全体の完全なリクエストパスをキャプチャできます。

## プロキシまたはゲートウェイサービスでAgent Observabilityを有効にする{#enabling-agent-observability-for-a-proxy-or-gateway-service}

複数のMLアプリケーションで使用されるプロキシまたはゲートウェイサービスでAgent Observabilityを有効にするには、MLアプリケーション名を指定せずに構成できます。代わりに、サービス名を設定します。これにより、[Agent Observability内でそのプロキシまたはゲートウェイサービスに固有のスパンをフィルタリング](#observing-llm-gateway-and-proxy-services)できます。

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


LLMプロキシまたはゲートウェイにリクエストを送信するMLアプリケーションをオーケストレーションするサービスがある場合は、MLアプリケーション名を指定してAgent Observabilityを有効にします。

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

LLMアプリケーションがプロキシまたはゲートウェイサービスにリクエストを行うと、Agent Observability SDKは元のLLMアプリケーションからMLアプリケーション名を自動的に伝播します。伝播されたMLアプリケーション名は、プロキシまたはゲートウェイサービスで指定されたMLアプリケーション名よりも優先されます。

## LLMゲートウェイおよびプロキシサービスの監視{#observing-llm-gateway-and-proxy-services}

### プロキシまたはゲートウェイサービスへのすべてのリクエスト{#all-requests-to-the-proxy-or-gateway-service}

プロキシサービスへのすべてのリクエストをトップレベルのスパンとして表示するには、プロキシサービスエンドポイントのエントリポイントを`workflow`スパンでラップします。

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

その後、プロキシサービスへのすべてのリクエストを、LLMトレースビュー内でトップレベルのスパンとして表示できます。

1. [LLMトレース][1]ページで、左上のドロップダウンから{{< ui >}}All Applications{{< /ui >}}を選択します。
2. 右上のドロップダウンで{{< ui >}}All Spans{{< /ui >}}表示に切り替えます。
3. リストを`service`タグとワークフロー名でフィルタリングします。

{{< img src="llm_observability/all-spans-with-service-and-span-name.png" alt="サービスタグとワークフロー名タグを使って、すべてのMLアプリケーションのすべてのスパンを表示します。" style="width:100%;" >}}

トレースビューの左側にあるファセットを使って、ワークフロー{{< ui >}}Span Name{{< /ui >}}をフィルタリングすることもできます。

{{< img src="llm_observability/span-name-facet-for-proxy-service-monitoring.png" alt="トレースビューの左側にあるファセットからワークフローのスパン名を選択します。" style="width:50%;" >}}

### プロキシまたはゲートウェイサービス内で行われたすべてのLLM呼び出し{#all-llm-calls-made-within-the-proxy-or-gateway-service}

プロキシまたはゲートウェイサービス内で行われたLLM呼び出しのみを監視するには、トレースビューで`llm`スパンでフィルタリングします。

{{< img src="llm_observability/all-spans-with-service-and-span-kind.png" alt="サービスタグとLLMスパンの種類を使用して、すべてのMLアプリケーションのすべてのスパンを表示します。" style="width:100%;" >}}

トレースビューの左側にある{{< ui >}}Span Kind{{< /ui >}}ファセットをフィルタリングすることもできます。

{{< img src="llm_observability/span-kind-facet-for-proxy-service-monitoring.png" alt="トレースビューの左側からLLMスパンの種類のファセットを選択します。" style="width:50%;" >}}

### 特定のMLアプリケーションでフィルタリングし、パターンと傾向を観察する{#filtering-by-a-specific-ml-application-and-observing-patterns-and-trends}

[プロキシサービスへのトップレベルの呼び出し](#all-requests-to-the-proxy-or-gateway-service)と[プロキシまたはゲートウェイサービス内で行われたLLM呼び出し](#all-llm-calls-made-within-the-proxy-or-gateway-service)の両方のフィルタリングプロセスを特定のMLアプリケーションに適用して、プロキシまたはゲートウェイサービスとのやり取りを表示できます。

1. 左上のドロップダウンで、対象のMLアプリケーションを選択します。
2. MLアプリケーションのすべてのトレースを表示するには、右上のドロップダウンで{{< ui >}}All Spans{{< /ui >}}ビューから{{< ui >}}Traces{{< /ui >}}ビューに切り替えます。
3. MLアプリケーションのトレースの時系列を表示するには、右上のドロップダウンで{{< ui >}}All Spans{{< /ui >}}フィルタに戻し、「Visualize as」の横で{{< ui >}}Timeseries{{< /ui >}}を選択します。

{{< img src="llm_observability/timeseries-view-for-proxy-services.png" alt="「All Span」フィルタを維持したまま、トレースビューでリストビューから時系列ビューに切り替えます。" style="width:100%;" >}}

## プロキシまたはゲートウェイサービスを呼び出すLLMアプリケーションのエンドツーエンドの使用状況を監視する{#observing-end-to-end-usage-of-llm-applications-making-calls-to-a-proxy-or-gateway-service}

プロキシまたはゲートウェイサービスを呼び出すLLMアプリケーションの完全なエンドツーエンドの使用状況を監視するには、そのMLアプリケーション名でトレースをフィルタリングできます。

1. LLMトレースビューで、左上のドロップダウンから対象のMLアプリケーション名を選択します。
2. 右上のドロップダウンで{{< ui >}}Traces{{< /ui >}}表示に切り替えます。


[1]: https://app.datadoghq.com/llm/traces