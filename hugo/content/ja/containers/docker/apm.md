---
aliases:
- /ja/tracing/docker/
- /ja/tracing/setup/docker/
- /ja/agent/apm/docker
- /ja/agent/docker/apm
description: Datadog Agent を使用して、Docker コンテナで実行されているアプリケーションからの APM トレース収集を構成する
further_reading:
- link: https://github.com/DataDog/datadog-agent/tree/main/pkg/trace
  tag: ソースコード
  text: ソースコード
- link: /integrations/amazon_ecs/#trace-collection
  tag: ドキュメント
  text: ECS アプリケーションをトレースする
- link: /agent/docker/log/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/docker/integrations/
  tag: ドキュメント
  text: アプリケーションのメトリクスとログを自動で収集
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/docker/tag/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当てる
title: Docker アプリケーションのトレース
---
Agent 6.0.0 では、Trace Agent はデフォルトで有効になっています。オフにした場合は、`registry.datadoghq.com/agent` コンテナで環境変数として `DD_APM_ENABLED=true` を渡すことで再び有効にすることができます。

このページの CLI コマンドは Docker ランタイム用です。containerd ランタイムは `docker` を `nerdctl` に、Podman ランタイムは `podman` に置き換えてください。

<div class="alert alert-info">コンテナ化されたアプリ (Agent とアプリが別々のコンテナで動作している) からトレースを収集する場合、以下の説明の代わりに、SDK をアプリケーションに自動的に挿入することができます。手順については、<a href="/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers"> ライブラリの挿入</a>をお読みください。</div>

## ホストからのトレース {#tracing-from-the-host}

`docker run` コマンドにオプション `-p 127.0.0.1:8126:8126/tcp` を追加すると、ポート `8126/tcp` で_自分のホストからのみ_トレースを利用できます。

_任意のホスト_からトレースを利用するには、代わりに `-p 8126:8126/tcp` を使用します。

たとえば、次のコマンドを使用すると、Agent はユーザーのホストからのみトレースを受信します。

{{< tabs >}}
{{% tab "Linux" %}}

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              registry.datadoghq.com/agent:latest
```
`<DATADOG_SITE>` が {{< region-param key="dd_site" code="true" >}} である場合 (デフォルトは `datadoghq.com`)。

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              registry.datadoghq.com/agent:latest
```
`<DATADOG_SITE>` が {{< region-param key="dd_site" code="true" >}} である場合 (デフォルトは `datadoghq.com`)。

{{% /tab %}}
{{< /tabs >}}

## Docker APM Agent の環境変数 {#docker-apm-agent-environment-variables}

以下の環境変数を使用して、Datadog Agent を構成します。詳細については、[サンプル `config_template.yaml` ファイル][8]を参照してください。

`DD_API_KEY`                     
: 必須 - _文字列_
<br/>[Datadog API キー][1]。

`DD_SITE`
: オプション - _文字列_
<br/>[Datadog サイト][7]。これを次に設定します。`{{< region-param key="dd_site" >}}`.
<br/>**Default**: `datadoghq.com`

`DD_APM_ENABLED`                  
: オプション - _Boolean_ - **デフォルト**: `true`
<br/>`true` に設定すると (デフォルト)、Datadog Agent はトレースとトレースメトリクスを受け付けます。

`DD_APM_RECEIVER_PORT`            
: オプション - _整数_ - **デフォルト**: `8126`
<br/>Datadog Agent のトレースレシーバーがリスニングするポートを設定します。`0` を設定すると、HTTP レシーバーが無効になります。

`DD_APM_RECEIVER_SOCKET`          
: オプション - _文字列_
<br/>UNIX Domain Sockets からトレースを収集するには、UNIX ソケットのパスを指定します。設定した場合、これはホスト名およびポート構成よりも優先され、有効なソケットファイルを指定する必要があります。

`DD_APM_NON_LOCAL_TRAFFIC`        
: オプション - _Boolean_ - **デフォルト**: `false`
<br/>`true` に設定されている場合、Datadog Agent は非ローカルトラフィックをリスニングします。[他のコンテナからのトレース](#tracing-from-other-containers)を行っている場合は、この環境変数を `true` に設定します。

`DD_APM_DD_URL`                   
: オプション - _文字列_
<br/>APM のプロキシを使用するには、エンドポイントおよびポートを `<ENDPOINT>:<PORT>` として指定します。プロキシは TCP 接続を扱える必要があります。

`DD_APM_CONNECTION_LIMIT`         
: 必須 - _整数_ - **デフォルト**: `2000`
<br/>30 秒のタイムウィンドウに対する最大 APM 接続を設定します。詳細については、[Agent 率制限][6]を参照してください。

`DD_APM_IGNORE_RESOURCES`         
: オプション - _[文字列]_
<br/>Datadog Agent が無視するリソースの除外リストを提供します。トレースのリソース名がこのリストの 1 つ以上の正規表現に一致する場合、そのトレースは Datadog に送信されません。
<br/>例: `"GET /ignore-me","(GET\|POST) and-also-me"`。                                                                                                                                                                                                                                                                                  

`DD_APM_FILTER_TAGS_REQUIRE`      
: オプション - _オブジェクト_
<br/>タグベースのトレースフィルタリングのルールを定義します。Datadog に送信されるようにするには、トレースがこれらのタグを持っている必要があります。[APM で不要なリソースを無視する][5]を参照してください。

`DD_APM_FILTER_TAGS_REGEX_REQUIRE`
: オプション - _オブジェクト_
<br/>エージェント 7.49+ でサポートされています。正規表現を使用したタグベースのトレースフィルタリングのルールを定義します。Datadog に送信されるようにするには、トレースがこれらの正規表現パターンに一致するタグを持っている必要があります。

`DD_APM_FILTER_TAGS_REJECT`       
: オプション - _オブジェクト_
<br/>タグベースのトレースフィルタリングのルールを定義します。トレースがこれらのタグを持っている場合、Datadog に送信されません。詳細については、[APM で不要なリソースを無視する][5]を参照してください。

`DD_APM_FILTER_TAGS_REGEX_REJECT` 
: オプション - _オブジェクト_
<br/>エージェント 7.49+ でサポートされています。正規表現を使用したタグベースのトレースフィルタリングのルールを定義します。トレースがこれらの正規表現パターンに一致するタグを持っている場合、そのトレースは Datadog に送信されません。

`DD_APM_REPLACE_TAGS`             
: オプション - _[オブジェクト]_
<br/>[潜在的な機密情報を含むタグを置換または削除する][2]ための一連のルールを定義します。

`DD_HOSTNAME`                     
: オプション - _文字列_ - **デフォルト**: 自動検出 
<br/>自動ホスト名検出が失敗した場合、または Datadog Cluster Agent を実行する場合に、メトリクスに使用するホスト名を設定します。

`DD_DOGSTATSD_PORT`               
: オプション - _整数_ - **デフォルト**: `8125`
<br/>DogStatsD ポートを設定します。

`DD_PROXY_HTTPS`                  
: オプション - _文字列_
<br/>インターネットに接続するために[プロキシ][4]を使用するには、URL を提供します。

`DD_BIND_HOST`                    
: オプション - _文字列_ - **デフォルト**: `localhost`
<br/>DogStatsD とトレースをリスニングするホストを設定します。

`DD_LOG_LEVEL`                    
: オプション - _文字列_ - **デフォルト**: `info`
<br/>最小ログレベルを設定します。有効なオプション: `trace`、`debug`、`info`、`warn`、`error`、`critical`、および `off`。

## 他のコンテナからのトレース {#tracing-from-other-containers}

DogStatsD と同様に、[Docker ネットワーク](#docker-network)または [Docker ホスト IP](#docker-host-ip) を使用して、他のコンテナから Agent にトレースを送信できます。

### Docker ネットワーク {#docker-network}

最初に、ユーザー定義のブリッジネットワークを作成します。

```bash
docker network create <NETWORK_NAME>
```

このページの CLI コマンドは Docker ランタイム用です。containerd ランタイムは `docker` を `nerdctl` に、Podman ランタイムは `podman` に置き換えてください。

次に、先ほど作成したネットワークに接続されている Agent とアプリケーションコンテナを起動します。

{{< tabs >}}
{{% tab "標準的な方法" %}}

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --network <NETWORK_NAME> \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```

`<DATADOG_SITE>` が {{< region-param key="dd_site" code="true" >}} である場合 (デフォルトは `datadoghq.com`)。

{{% /tab %}}
{{% tab "Windows" %}}

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --cgroupns host \
              --pid host \
              --network "<NETWORK_NAME>" \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network "<NETWORK_NAME>" \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```
`<DATADOG_SITE>` が {{< region-param key="dd_site" code="true" >}} である場合 (デフォルトは `datadoghq.com`)。

{{% /tab %}}
{{< /tabs >}}

これで、`app` コンテナ内のホスト名 `datadog-agent` が公開されます。
`docker-compose` を使用している場合、`<NETWORK_NAME>` パラメーターは `docker-compose.yml` の `networks` セクションに定義されている名前になります。

このアドレスにトレースを送信するには、アプリケーション SDK を構成する必要があります。アプリケーションコンテナで、Agent コンテナ名として `DD_AGENT_HOST`、Agent Trace ポートとして `DD_TRACE_AGENT_PORT` を使用し、環境変数を設定します。上の例では、ホストに `datadog-agent`、ポートに `8126` を使用しています (デフォルト値なので設定する必要はありません)。

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
  c.agent.host = 'datadog-agent'
  c.agent.port = 8126
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

```go
package main

import (
  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

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
# Environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=<SYSTEM_DEPENDENT_PATH>
export DD_DOTNET_TRACER_HOME=/opt/datadog

# For containers
export DD_AGENT_HOST=datadog-agent
export DD_TRACE_AGENT_PORT=8126

# Start your application
dotnet example.dll
```

環境変数 `CORECLR_PROFILER_PATH` の値は、アプリケーションが動作しているシステムに応じて変化します。

   オペレーティングシステムとプロセスアーキテクチャ |  CORECLR_PROFILER_PATH の値
   ------------------------------------------|----------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux x64        | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux ARM64      | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   Windows x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

上の表で、`<APP_DIRECTORY>` は、アプリケーションの `.dll` ファイルを含むディレクトリを指します。

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Docker ホスト IP {#docker-host-ip}

Agent コンテナポート `8126` は、ホストに直接リンクしている必要があります。
このコンテナのデフォルトのルートにレポートを送信するようにアプリケーショントレーサーを構成します (デフォルトのルートは `ip route` コマンドを使用して決定)。

次の Python Tracer の例では、デフォルトのルートを `172.17.0.1` と仮定しています。

```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```

### Unix ドメインソケット (UDS) {#unix-domain-socket-uds}
ソケットを介してトレースを送信するには、ソケットを Agent コンテナおよびアプリケーションコンテナにマウントする必要があります。

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --network <NETWORK_NAME> \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -v /var/run/datadog/:/var/run/datadog/ \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -v /var/run/datadog/:/var/run/datadog/ \
              -e DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket \
              company/app:latest
```

トレーサー設定については、[言語ごとの APM インスツルメンテーションドキュメント][3]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/tracing/configure_data_security/#replace-tags
[3]: /ja/tracing/setup/
[4]: /ja/agent/proxy
[5]: /ja/tracing/guide/ignoring_apm_resources/
[6]: /ja/tracing/troubleshooting/agent_rate_limits
[7]: /ja/getting_started/site/
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml