---
aliases:
- /ja/data_streams/java_manual_instrumentation
further_reading:
- link: /integrations/kafka/
  tag: ドキュメント
  text: Kafka インテグレーション
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: サービスカタログ
private: true
title: 手動インスツルメンテーションを通して Data Streams Monitoring を設定する
---

<div class="alert alert-info">手動インスツルメンテーションは Java、Node.js、Python で利用可能です。<br /><br />他の言語での手動インスツルメンテーションにご興味がある場合は、 support@datadoghq.com までお問い合わせください。</div>

Data Streams Monitoring (DSM) はメッセージヘッダーを通じてコンテキストを伝播します。以下の場合、手動インスツルメンテーションを使用して DSM を設定してください。
- DSM がサポートしていないメッセージキューテクノロジーを使用している場合
- Kinesis などのヘッダーがないメッセージキューテクノロジーを使用している場合、または
- Lambdas を使用している場合

### 手動インスツルメンテーションのインストール

1. [Datadog Agent v7.34.0 以降][1]を使用していることを確認してください。

2. メッセージを送信または受信するサービスで、サポートされているタイプを宣言します。例:
{{< code-block lang="text" >}}
kinesis、kafka、rabbitmq、sqs、sns
{{< /code-block >}}

3. 以下のサンプルコードのように、メッセージが生成されたときと消費されたときに Data Streams Monitoring のチェックポイントを呼び出します。
{{< tabs >}}
{{% tab "Java" %}}
{{< code-block lang="java" >}}
import datadog.trace.api.experimental.*;
​​
Carrier headersAdapter = new Carrier(headers);
​
// データベース PUT を呼び出す前
DataStreamsCheckpointer.get().setProduceCheckpoint("<database-type>", "<topic-name>", headersAdapter);
​
// データベース GET を呼び出した後
DataStreamsCheckpointer.get().setConsumeCheckpoint("<database-type>", "<topic-name>", headersAdapter);

// ヘッダーを、コンテキストを渡すために使用しているものに置き換えてください
private class Carrier implements DataStreamsContextCarrier {
    private Headers headers;


    public Carrier(Headers headers) {
        this.headers = headers;
    }
​
    public Set<Entry<String, Object>> entries() {
        return this.headers.entrySet();
    }
​
    public void set(String key, String value){
        this.headers.put(key, value);
    }
}
{{< /code-block >}}
{{% /tab %}}
{{% tab "Node.js" %}}
{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({})

// produce を呼び出す前
const headers = {}
tracer.dataStreamsCheckpointer.setProduceCheckpoint(
"<datastream-type>", "<queue-name>", headers
)

// consume を呼び出した後
tracer.dataStreamsCheckpointer.setConsumeCheckpoint(
"<datastream-type>", "<queue-name>", headers
)

{{< /code-block >}}
{{% /tab %}}
{{% tab "Python" %}}
{{< code-block lang="python" >}}
from ddtrace.data_streams import set_consume_checkpoint
from ddtrace.data_streams import set_produce_checkpoint

# before calling produce
headers = {}
set_produce_checkpoint(
"<datastream-type>", "<datastream-name>", headers.setdefault
)

# after calling consume
set_consume_checkpoint(
"<datastream-type>", "<datastream-name>", headers.get
)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent
[2]: /ja/tracing/trace_collection/dd_libraries/java/
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: /ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration