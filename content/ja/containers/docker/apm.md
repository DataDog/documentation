---
title: Tracing Docker Applications
aliases:
    - /tracing/docker/
    - /tracing/setup/docker/
    - /agent/apm/docker
    - /agent/docker/apm
further_reading:
    - link: "https://github.com/DataDog/datadog-agent/tree/main/pkg/trace"
      tag: ソースコード
      text: Source code
    - link: "/integrations/amazon_ecs/#trace-collection"
      tag: Documentation
      text: Trace your ECS applications
    - link: /agent/docker/log/
      tag: Documentation
      text: Collect your application logs
    - link: /agent/docker/integrations/
      tag: Documentation
      text: Collect automatically your applications metrics and logs
    - link: /agent/guide/autodiscovery-management/
      tag: Documentation
      text: Limit data collection to a subset of containers only
    - link: /agent/docker/tag/
      tag: Documentation
      text: Assign tags to all data emitted by a container
---

Agent 6.0.0 では、Trace Agent はデフォルトで有効になっています。オフにした場合は、`gcr.io/datadoghq/agent` コンテナで環境変数として `DD_APM_ENABLED=true` を渡すことで再び有効にすることができます。

このページの CLI コマンドは Docker ランタイム用です。containerd ランタイムは `docker` を `nerdctl` に、Podman ランタイムは `podman` に置き換えてください。

<div class="alert alert-info">コンテナ化されたアプリ (Agent とアプリが別々のコンテナで動作している) からトレースを収集する場合、以下の説明の代わりに、トレーシングライブラリをアプリケーションに自動的に挿入することができます。手順については、<a href="/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers">ライブラリの挿入</a>をお読みください。</div>

## ホストからのトレース

`docker run` コマンドにオプション `-p 127.0.0.1:8126:8126/tcp` を追加すると、ポート `8126/tcp` で _自分のホストからのみ_ トレースを利用できます。

_任意のホスト_ からトレースを利用するには、`-p 8126:8126/tcp` を使用します。

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
              gcr.io/datadoghq/agent:latest
```
`<DATADOG_SITE>` が {{< region-param key="dd_site" code="true" >}} である場合 (デフォルトは `datadoghq.com`)。

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              gcr.io/datadoghq/agent:latest
```
`<DATADOG_SITE>` が {{< region-param key="dd_site" code="true" >}} である場合 (デフォルトは `datadoghq.com`)。

{{% /tab %}}
{{< /tabs >}}

## Docker APM Agent の環境変数

Use the following environment variables to configure tracing for the Docker Agent. See the [sample `config_template.yaml` file][8] for more details.

`DD_API_KEY`                      
: required - _string_
<br/>Your [Datadog API key][1].

`DD_SITE`
: optional - _string_
<br/>Your [Datadog site][7]. Set this to `{{< region-param key="dd_site" >}}`.
<br/>**Default**: `datadoghq.com`

`DD_APM_ENABLED`                   
: optional - _Boolean_ - **default**: `true`
<br/>When set to `true` (default), the Datadog Agent accepts traces and trace metrics.

`DD_APM_RECEIVER_PORT`             
: optional - _integer_ - **default**: `8126` 
<br/>Sets the port on which the Datadog Agent's trace receiver listens. Set to `0` to disable the HTTP receiver.

`DD_APM_RECEIVER_SOCKET`           
: optional - _string_
<br/>To collect your traces through UNIX Domain Sockets, provide the path to the UNIX socket. If set, this takes priority over hostname and port configuration, and must point to a valid socket file. 

`DD_APM_NON_LOCAL_TRAFFIC`         
: optional - _Boolean_ - **default**: `false`
<br/>When set to `true`, the Datadog Agent listens to non-local traffic. If you are [tracing from other containers](#tracing-from-other-containers), set this environment variable to `true`. 

`DD_APM_DD_URL`                    
: optional - _string_
<br/>To use a proxy for APM, provide the endpoint and port as `<ENDPOINT>:<PORT>`. The proxy must be able to handle TCP connections.

`DD_APM_CONNECTION_LIMIT`          
: required - _integer_ - **default**: `2000`
<br/>Sets the maximum APM connections for a 30 second time window. See [Agent Rate Limits][6] for more details.

`DD_APM_IGNORE_RESOURCES`          
: optional - _[string]_ 
<br/>Provides an exclusion list of resources for the Datadog Agent to ignore. If a trace's resource name matches one or more of the regular expressions on this list, the trace is not sent to Datadog. 
<br/>Example: `"GET /ignore-me","(GET\|POST) and-also-me"`.                                                                                                                                                                                                                                                                                   

`DD_APM_FILTER_TAGS_REQUIRE`       
: optional - _object_
<br/>Defines rules for tag-based trace filtering. To be sent to Datadog, traces must have these tags. See [Ignoring Unwanted Resources in APM][5]. 

`DD_APM_FILTER_TAGS_REGEX_REQUIRE` 
: optional - _object_
<br/>Supported in Agent 7.49+. Defines rules for tag-based trace filtering with regular expressions. To be sent to Datadog, traces must have tags that match these regex patterns. 

`DD_APM_FILTER_TAGS_REJECT`        
: optional - _object_ 
<br/>Defines rules for tag-based trace filtering. If a trace has these tags, it is not sent to Datadog. See [Ignoring Unwanted Resources in APM][5] for more details. 

`DD_APM_FILTER_TAGS_REGEX_REJECT`  
: optional - _object_ 
<br/>Supported in Agent 7.49+. Defines rules for tag-based trace filtering with regular expressions. If a trace has tags that match these regex patterns, the trace is not sent to Datadog. 

`DD_APM_REPLACE_TAGS`              
: optional - _[object]_ 
<br/>Defines a set of rules to [replace or remove tags that contain potentially sensitive information][2].

`DD_HOSTNAME`                      
: optional - _string_ - **default**: automatically detected 
<br/>Sets the hostname to use for metrics if automatic hostname detection fails, or when running the Datadog Cluster Agent.

`DD_DOGSTATSD_PORT`                
: optional - _integer_ - **default**: `8125` 
<br/>Sets the DogStatsD port.

`DD_PROXY_HTTPS`                   
: optional - _string_
<br/>To use a [proxy][4] to connect to the internet, provide the URL. 

`DD_BIND_HOST`                     
: optional - _string_ - **default**: `localhost` 
<br/>Sets the host to listen on for DogStatsD and traces.

`DD_LOG_LEVEL`                     
: optional - _string_ - **default**: `info` 
<br/>Sets the minimum logging level. Valid options: `trace`, `debug`, `info`, `warn`, `error`, `critical`, and `off`.

## 他のコンテナからのトレース

DogStatsD と同様に、[Docker ネットワーク](#docker-network)または [Docker ホスト IP](#docker-host-ip) を使用して、他のコンテナから Agent にトレースを送信できます。

### Docker ネットワーク

最初に、ユーザー定義のブリッジネットワークを作成します。

```bash
docker network create <NETWORK_NAME>
```

このページの CLI コマンドは Docker ランタイム用です。containerd ランタイムは `docker` を `nerdctl` に、Podman ランタイムは `podman` に置き換えてください。

次に、先ほど作成したネットワークに接続されている Agent とアプリケーションコンテナを起動します。

{{< tabs >}}
{{% tab "標準" %}}

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
              gcr.io/datadoghq/agent:latest
# アプリケーション
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
              gcr.io/datadoghq/agent:latest
# アプリケーション
docker run -d --name app \
              --network "<NETWORK_NAME>" \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```
`<DATADOG_SITE>` が {{< region-param key="dd_site" code="true" >}} である場合 (デフォルトは `datadoghq.com`)。

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
  c.agent.host = 'datadog-agent'
  c.agent.port = 8126
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
export CORECLR_PROFILER_PATH=<SYSTEM_DEPENDENT_PATH>
export DD_DOTNET_TRACER_HOME=/opt/datadog

# コンテナ
export DD_AGENT_HOST=datadog-agent
export DD_TRACE_AGENT_PORT=8126

# アプリケーションの開始
dotnet example.dll
```

環境変数 `CORECLR_PROFILER_PATH` の値は、アプリケーションが動作しているシステムに応じて変化します。

   オペレーティングシステムとプロセスアーキテクチャ | CORECLR_PROFILER_PATH 値
   ------------------------------------------|----------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux x64        | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux ARM64      | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   Windows x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

上の表で、`<APP_DIRECTORY>` は、アプリケーションの `.dll` ファイルを含むディレクトリを指します。

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

### Unix Domain Socket (UDS)
To submit traces via socket, the socket should be mounted to the Agent container and your application container.

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
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -v /var/run/datadog/:/var/run/datadog/ \
              -e DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket \
              company/app:latest
```

Refer to the [language-specific APM instrumentation docs][3] for tracer settings.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /tracing/configure_data_security/#replace-tags
[3]: /tracing/setup/
[4]: /agent/proxy
[5]: /tracing/guide/ignoring_apm_resources/
[6]: /tracing/troubleshooting/agent_rate_limits
[7]: /getting_started/site/
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
