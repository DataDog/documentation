---
title: Docker アプリケーションのトレース
kind: Documentation
aliases:
  - /ja/tracing/docker/
  - /ja/tracing/setup/docker/
  - /ja/agent/apm/docker
further_reading:
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/trace'
    tag: Github
    text: ソースコード
  - link: 'https://docs.datadoghq.com/integrations/amazon_ecs/#trace-collection'
    tag: Documentation
    text: ECS アプリケーションをトレースする
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースを調査する
---
環境変数として `DD_APM_ENABLED=true` を渡すことで、`datadog/agent` コンテナで Trace Agent を有効にします。

## ホストからのトレース

ポート `8126/tcp` で**自分のホスト**からのトレースを利用するには、`docker run` コマンドにオプション `-p 127.0.0.1:8126:8126/tcp` を追加します。

**任意のホスト**からのトレースを利用するには、代わりに `-p 8126:8126/tcp` を使用します。

たとえば、次のコマンドを使用すると、Agent はユーザーのホストからのみトレースを受信します。

≪```
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<YOUR_API_KEY> \
              -e DD_APM_ENABLED=true \
              datadog/agent:latest
```≫
## Docker APM Agent の環境変数

Docker Agent 内のトレースに利用可能なすべての環境変数をリストします。

| 環境変数       | 説明                                                                                                               |
| ------                     | ------                                                                                                                    |
| `DD_API_KEY`               | [Datadog API キー][1]                                                                                                      |
| `DD_PROXY_HTTPS`           | 使用するプロキシの URL をセットアップします。                                                                                      |
| `DD_HOSTNAME`              | 自動検出が失敗した場合、または Datadog Cluster Agent を実行する場合に、メトリクスに使用するホスト名を手動で設定します。                                    |
| `DD_DOGSTATSD_PORT`        | DogStatsD ポートを設定します。                                                                                                   |
| `DD_BIND_HOST`             | StatsD とレシーバーのホスト名を設定します。                                                                                       |
| `DD_LOG_LEVEL`             | ログレベルを設定します。(`trace`/`debug`/`info`/`warn`/`error`/`critical`/`off`)                                           |
| `DD_APM_ENABLED`           | `true` に設定すると、Datadog Agent はトレースメトリクスを受け付けます。                                                              |
| `DD_APM_CONNECTION_LIMIT`  | 30 秒のタイムウィンドウに対する最大接続制限を設定します。                                                            |
| `DD_APM_DD_URL`            | トレースが送信される Datadog API エンドポイント。Datadog EU サイトの場合は、`DD_APM_DD_URL` を `https://trace.agent.datadoghq.eu` に設定します |
| `DD_APM_RECEIVER_PORT`     | Datadog Agent のトレースレシーバーがリスニングするポート。デフォルト値は `8126` です。                                          |
| `DD_APM_NON_LOCAL_TRAFFIC` | [他のコンテナからのトレース](#tracing-from-other-containers)時に、非ローカルトラフィックを許可します。                             |
| `DD_APM_IGNORE_RESOURCES`  | Agent が無視するリソースを構成します。書式はカンマ区切りの正規表現です。たとえば、<code>"GET /ignore-me,(GET&#124;POST) /and-also-me"</code> のようになります。 |
| `DD_APM_ANALYZED_SPANS`    | トランザクションを分析するスパンを構成します。書式はカンマ区切りの <code>\<SERVICE_NAME>&#124;\<OPERATION_NAME>=1</code> 形式です。たとえば、<code>my-express-app&#124;express.request=1,my-dotnet-app&#124;aspnet_core_mvc.request=1</code> のようになります。Tracing Client の構成パラメーターを使用して、[自動で有効にする][2]こともできます。|
| `DD_APM_ENV`               | デフォルトのトレース[環境][3]を設定します。                                                                        |
| `DD_APM_MAX_EPS`           | 1 秒あたりの最大 APM イベント数を設定します。                                                                                   |
| `DD_APM_MAX_TPS`           | 1 秒あたりの最大トレース数を設定します。                                                                                       |

## 他のコンテナからのトレース

DogStatsD と同様に、[Docker ネットワーク](#docker-network)または [Docker ホスト IP](#docker-host-ip) を使用して、他のコンテナから Agent にトレースを送信できます。

### Docker ネットワーク

最初に、ユーザー定義のブリッジネットワークを作成します。

≪```bash
docker network create <NETWORK_NAME>
```≫

次に、先ほど作成したネットワークに接続されている Agent とアプリケーションコンテナを起動します。

≪```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --network <NETWORK_NAME> \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<YOUR_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              datadog/agent:latest

# アプリケーション
docker run -d --name app \
              --network <NETWORK_NAME> \
              company/app:latest
```≫

これで `app` コンテナ内のホスト名 `datadog-agent` が公開されます。
`docker-compose` を使用している場合、`<NETWORK_NAME>` パラメーターは、`docker-compose.yml` の `networks` セクションに定義されている名前になります。

このアドレスにトレースを送信するには、アプリケーショントレーサーを構成する必要があります。アプリケーションコンテナで、Agent コンテナ名として `DD_AGENT_HOST`、Agent Trace ポートとして `DD_TRACE_AGENT_PORT` を使用して、環境変数を設定します。(この例では、それぞれ `datadog-agent` と `8126` です。)

または、サポートされている言語ごとに、以下の例を参照して Agent ホストを手動で設定します。

{{< tabs >}}
{{% tab "Java" %}}
環境変数を使用して Java Agent 構成を更新します。

≪```bash
DD_AGENT_HOST=datadog-agent \
DD_TRACE_AGENT_PORT=8126 \
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```≫

または、システムプロパティを使用して更新します。

≪```bash
java -javaagent:/path/to/the/dd-java-agent.jar \
     -Ddd.agent.host=datadog-agent \
     -Ddd.agent.port=8126 \
     -jar /your/app.jar
```≫
{{% /tab %}}
{{% tab "Python" %}}
≪```python
from ddtrace import tracer

tracer.configure(
    hostname='datadog-agent',
    port=8126,
)
```≫
{{% /tab %}}
{{% tab "Ruby" %}}
≪```ruby
Datadog.configure do |c|
  c.tracer hostname: 'datadog-agent',
           port: 8126
end
```≫
{{% /tab %}}
{{% tab "Go" %}}
≪```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithAgentAddr("datadog-agent:8126"))
    defer tracer.Stop()
}
```≫
{{% /tab %}}
{{% tab "Node.js" %}}
≪```javascript
const tracer = require('dd-trace').init({
  hostname: 'datadog-agent',
  port: 8126
})
```≫
{{% /tab %}}
{{< /tabs >}}

### Docker ホスト IP

Agent コンテナポート `8126` は、直接ホストにリンクしている必要があります。
このコンテナのデフォルトのルートにレポートを送信するようにアプリケーショントレーサーを構成します (デフォルトのルートは `ip route` コマンドを使用して決定)。

次の Python Tracer の例では、デフォルトのルートを `172.17.0.1` と仮定しています。

≪```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```≫

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#api
[2]: /ja/tracing/trace_search_and_analytics/#automatic-configuration
[3]: /ja/tracing/send_traces