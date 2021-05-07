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
  - link: '/integrations/amazon_ecs/#トレースの収集'
    tag: Documentation
    text: ECS アプリケーションをトレースする
  - link: /agent/docker/log/
    tag: Documentation
    text: アプリケーションログの収集
  - link: /agent/docker/integrations/
    tag: ドキュメント
    text: アプリケーションのメトリクスとログを自動で収集
  - link: /agent/guide/autodiscovery-management/
    tag: ドキュメント
    text: データ収集をコンテナのサブセットのみに制限
  - link: /agent/docker/tag/
    tag: ドキュメント
    text: コンテナから送信された全データにタグを割り当て
---
環境変数として `DD_APM_ENABLED=true` を渡すことで、`datadog/agent` コンテナで Trace Agent を有効にします。

## ホストからのトレース

`docker run` コマンドにオプション `-p 127.0.0.1:8126:8126/tcp` を追加すると、ポート `8126/tcp` で _自分のホストからのみ_ トレースを利用できます。

_任意のホスト_ からトレースを利用するには、`-p 8126:8126/tcp` を使用します。

たとえば、次のコマンドを使用すると、Agent はユーザーのホストからのみトレースを受信します。

{{< tabs >}}
{{% tab "Linux" %}}

```shell
DOCKER_CONTENT_TRUST=1 docker run -d \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              datadog/agent
```

{{% /tab %}}
{{% tab "Windows" %}}

```shell
DOCKER_CONTENT_TRUST=1 docker run -d \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              datadog/agent
```

{{% /tab %}}
{{< /tabs >}}

## Docker APM Agent の環境変数

Docker Agent 内のトレースに利用可能なすべての環境変数をリストします。

| 環境変数       | 説明                                                                                                                                                                                                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | [Datadog API キー][1]                                                                                                                                                                                                                                                                                                                                 |
| `DD_PROXY_HTTPS`           | 使用するプロキシの URL をセットアップします。                                                                                                                                                                                                                                                                                                                 |
| `DD_APM_REPLACE_TAGS`      | [スパンのタグから機密データをスクラブします][2]。                                                                                                                                                                                                                                                                                                     |
| `DD_APM_FILTER_TAGS_REQUIRE`      | Datadog に送信されるためにトレースになくてはならない必須タグを定義します。                                                                                                                                                                                                                                                                                                     |
| `DD_APM_FILTER_TAGS_REJECT`      | 拒否タグを定義します。Agent はこれらのタグを持つトレースを削除します。       |
| `DD_HOSTNAME`              | 自動検出が失敗した場合、または Datadog Cluster Agent を実行する場合に、メトリクスに使用するホスト名を手動で設定します。                                                                                                                                                                                                                                        |
| `DD_DOGSTATSD_PORT`        | DogStatsD ポートを設定します。                                                                                                                                                                                                                                                                                                                              |
| `DD_APM_RECEIVER_SOCKET`   | 設定した場合、Unix Domain Sockets からトレースを収集し、ホスト名とポートコンフィギュレーションよりも優先します。デフォルトでは設定されていません。設定する場合は、有効な sock ファイルを指定する必要があります。                                                                                                                                                                       |
| `DD_BIND_HOST`             | StatsD とレシーバーのホスト名を設定します。                                                                                                                                                                                                                                                                                                                  |
| `DD_LOG_LEVEL`             | ログレベルを設定します。(`trace`/`debug`/`info`/`warn`/`error`/`critical`/`off`)                                                                                                                                                                                                                                                                      |
| `DD_APM_ENABLED`           | `true` に設定すると、Datadog Agent はトレースメトリクスを受け付けます。                                                                                                                                                                                                                                                                                         |
| `DD_APM_CONNECTION_LIMIT`  | 30 秒のタイムウィンドウに対する最大接続数の上限を設定します。デフォルトの上限は 2000 です。                                                                                                                                                                                                                                                    |
| `DD_APM_DD_URL`            | トレースが送信される Datadog API エンドポイントを設定します: `https://trace.agent.{{< region-param key="dd_site" >}}`。デフォルトは `https://trace.agent.datadoghq.com` 。                                                                                                                                                                                                                            |
| `DD_APM_RECEIVER_PORT`     | Datadog Agent のトレースレシーバーがリスニングするポート。デフォルト値は `8126` です。                                                                                                                                                                                                                                                                    |
| `DD_APM_NON_LOCAL_TRAFFIC` | [他のコンテナからのトレース](#tracing-from-other-containers)時に、非ローカルトラフィックを許可します。                                                                                                                                                                                                                                                        |
| `DD_APM_IGNORE_RESOURCES`  | Agent が無視するリソースを構成します。書式はカンマ区切りの正規表現です。例: <code>GET /ignore-me,(GET\|POST) /and-also-me</code> となります。                                                                                                                                                                                       |
| `DD_APM_ANALYZED_SPANS`    | トランザクションを分析するスパンを構成します。書式はカンマ区切りのインスタンス <code>\<サービス名>\|;\<オペレーション名>=1</code>、たとえば、<code>my-express-app\|;express.request=1,my-dotnet-app\|;aspnet_core_mvc.request=1</code> となります。トレーシングクライアントでコンフィギュレーションパラメーターを使用して[自動的に有効化][3]することもできます。 |
| `DD_APM_MAX_EPS`           | 1 秒あたりの最大 Indexed Span 数を設定します。デフォルトは 1 秒あたり 200 イベントです。                                                                                                                                                                                                                                                                        |

## 他のコンテナからのトレース

DogStatsD と同様に、[Docker ネットワーク](#docker-network)または [Docker ホスト IP](#docker-host-ip) を使用して、他のコンテナから Agent にトレースを送信できます。

### Docker ネットワーク

最初に、ユーザー定義のブリッジネットワークを作成します。

```bash
docker network create <NETWORK_NAME>
```

次に、先ほど作成したネットワークに接続されている Agent とアプリケーションコンテナを起動します。

{{< tabs >}}
{{% tab "標準" %}}

```bash
# Datadog Agent
DOCKER_CONTENT_TRUST=1 docker run -d \
              --name datadog-agent \
              --network <NETWORK_NAME> \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              datadog/agent

# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```

{{% /tab %}}
{{% tab "Windows" %}}

```bash
# Datadog Agent
DOCKER_CONTENT_TRUST=1 docker run -d \
              --name datadog-agent \
              --network "<NETWORK_NAME>" \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              datadog/agent

# Application
docker run -d --name app \
              --network "<NETWORK_NAME>" \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```

{{% /tab %}}
{{< /tabs >}}

これで `app` コンテナ内のホスト名 `datadog-agent` が公開されます。
`docker-compose` を使用している場合、`<NETWORK_NAME>` パラメーターは、`docker-compose.yml` の `networks` セクションに定義されている名前になります。

このアドレスにトレースを送信するには、アプリケーショントレーサーを構成する必要があります。アプリケーションコンテナで、Agent コンテナ名として `DD_AGENT_HOST`、Agent Trace ポートとして `DD_TRACE_AGENT_PORT` を使用して、環境変数を設定します。上の例では、ホストに `datadog-agent`、ポートに `8126` を使用しています。（デフォルト値なので設定する必要はありません。）

または、サポートされている言語ごとに、以下の例を参照して Agent ホストを手動で設定します。

{{< programming-lang-wrapper langs="java,python,ruby,go,nodeJS,.NET" >}}

{{< programming-lang lang="java" >}}

環境変数を使用して Java Agent 構成を更新します。

```bash
DD_AGENT_HOST=datadog-agent \
DD_TRACE_AGENT_PORT=8126 \
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```

または、システムプロパティを使用して更新します。

```bash
java -javaagent:/path/to/the/dd-java-agent.jar \
     -Ddd.agent.host=datadog-agent \
     -Ddd.agent.port=8126 \
     -jar /your/app.jar
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
from ddtrace import tracer

tracer.configure(
    hostname='datadog-agent',
    port=8126,
)
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
Datadog.configure do |c|
  c.tracer hostname: 'datadog-agent',
           port: 8126
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithAgentAddr("datadog-agent:8126"))
    defer tracer.Stop()
}
```

{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

```javascript
const tracer = require('dd-trace').init({
    hostname: 'datadog-agent',
    port: 8126
});
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

インスツルメンテーションされたアプリを起動する前に変数を設定します。

```bash
# 環境変数
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_INTEGRATIONS=/opt/datadog/integrations.json
export DD_DOTNET_TRACER_HOME=/opt/datadog

# コンテナ
export DD_AGENT_HOST=datadog-agent
export DD_TRACE_AGENT_PORT=8126

# アプリケーションの開始
dotnet example.dll
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Docker ホスト IP

Agent コンテナポート `8126` は、直接ホストにリンクしている必要があります。
このコンテナのデフォルトのルートにレポートを送信するようにアプリケーショントレーサーを構成します (デフォルトのルートは `ip route` コマンドを使用して決定)。

次の Python Tracer の例では、デフォルトのルートを `172.17.0.1` と仮定しています。

```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#api
[2]: /ja/tracing/guide/security/#replace-rules
[3]: /ja/tracing/app_analytics/#automatic-configuration