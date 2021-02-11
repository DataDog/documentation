---
title: ECS アプリケーションのトレース
kind: Documentation
further_reading:
  - link: /agent/amazon_ecs/logs/
    tag: Documentation
    text: アプリケーションログの収集
  - link: /agent/amazon_ecs/tags/
    tag: Documentation
    text: コンテナから送信された全データにタグを割り当て
---
## セットアップ

[Amazon ECS エージェントのインストール手順][1]でインストールした後、以下の手順に従いトレースの収集を有効にします。

1. `gcr.io/datadoghq/agent` コンテナのタスク定義で次のパラメーターを設定します。`portMappings` ホスト / コンテナポートを `8126`（プロトコルは `tcp`）に設定します。

    {{< code-block lang="json" >}}
    containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "gcr.io/datadoghq/agent:latest",
      "cpu": 10,
      "memory": 256,
      "essential": true,
      "portMappings": [
        {
          "hostPort": 8126,
          "protocol": "tcp",
          "containerPort": 8126
        }
      ],
      ...
    {{< /code-block >}}

    **Agent v7.17 以下**の場合、以下の環境変数を追加します。

    {{< code-block lang="json" >}}
    ...
          "environment": [
            ...
          {
            "name": "DD_APM_ENABLED",
            "value": "true"
          },
          {
            "name": "DD_APM_NON_LOCAL_TRAFFIC",
            "value": "true"
          },
          ...
          ]
    ...
    {{< /code-block >}}

    [Agent トレースの収集に使用できるすべての環境変数を参照してください][1]。

2. アプリケーションコンテナでコンテナが実行されている基底の各インスタンスのプライベート IP アドレスを `DD_AGENT_HOST` 環境変数に割り当てます。これにより、アプリケーショントレースを Agent に送信できます。

{{< tabs >}}
{{% tab "EC2 メタデータエンドポイント" %}}

[Amazon の EC2 メタデータエンドポイント][1]を使用すると、プライベート IP アドレスを検出できます。各ホストのプライベート IP アドレスを取得するには、次の URL をカールします。

{{< code-block lang="curl" >}}
curl http://169.254.169.254/latest/meta-data/local-ipv4
{{< /code-block >}}


[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
{{% /tab %}}
{{% tab "ECS コンテナメタデータファイル" %}}

[Amazon の ECS コンテナメタデータファイル][1]を使用すると、プライベート IP アドレスを検出できます。各ホストのプライベート IP アドレスを取得するには、次のコマンドを実行します。

{{< code-block lang="curl" >}}
cat $ECS_CONTAINER_METADATA_FILE | jq .HostPrivateIPv4Address
{{< /code-block >}}


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html#metadata-file-format
{{% /tab %}}
{{< /tabs >}}

 APM に渡される各アプリケーションコンテナのトレースエージェントのホスト名の環境変数として結果を設定します。

{{< code-block lang="curl" >}}
os.environ['DD_AGENT_HOST'] = <EC2_PRIVATE_IP>
{{< /code-block >}}



## 起動時間の変数

ECS アプリケーションの変数が起動時に設定される場合は、`DD_AGENT_HOST` を使ってホスト名を環境変数として設定する**必要があります**。あるいは、Python、JavaScript、Ruby の場合は対象のホスト名をアプリケーションのソースコード内で設定することも可能です。Java と .NET の場合は、ECS タスクでホスト名を設定できます。たとえば、以下のとおりです。

{{< tabs >}}
{{% tab "Python" %}}

```python
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
```

他の言語で Agent ホスト名を設定するには、[Agent ホスト名の変更方法][1]を参照してください。


[1]: https://docs.datadoghq.com/ja/tracing/setup/python/#change-agent-hostname
{{% /tab %}}

{{% tab "Node.js" %}}

```javascript
const tracer = require('dd-trace').init();
const axios = require('axios');

(async () => {
  const { data: hostname } = await axois.get('http://169.254.169.254/latest/meta-data/local-ipv4');
  tracer.setUrl(`http://${hostname}:8126`);
})();
```

他の言語で Agent ホスト名を設定するには、[Agent ホスト名の変更方法][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/tracing/setup/nodejs/#change-agent-hostname
{{% /tab %}}

{{% tab "Ruby" %}}

```ruby
require 'ddtrace'
require 'net/http'

Datadog.configure do |c|
  c.tracer hostname: Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
```

{{% /tab %}}

{{% tab "Go" %}}

```go
package main

import (
    "net/http"
    "io/ioutil"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

resp, err := http.Get("http://169.254.169.254/latest/meta-data/local-ipv4")
        bodyBytes, err := ioutil.ReadAll(resp.Body)
        host := string(bodyBytes)
  if err == nil {
        //set the output of the curl command to the DD_Agent_host env
        os.Setenv("DD_AGENT_HOST", host)
        // tell the trace agent the host setting
        tracer.Start(tracer.WithAgentAddr(host))
        defer tracer.Stop()
```

{{% /tab %}}

{{% tab "Java" %}}

このスクリプトを ECS タスク定義の `entryPoint` フィールドにコピーし、アプリケーション jar および引数フラグで値を更新します。

```java
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); java -javaagent:/app/dd-java-agent.jar <APPLICATION_ARG_FLAGS> -jar <APPLICATION_JAR_FILE/WAR_FILE>"
]
```

他の言語で Agent ホスト名を設定するには、[Agent ホスト名の変更方法][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/tracing/setup/java/#change-agent-hostname
{{% /tab %}}

{{% tab ".NET" %}}

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); dotnet ${APP_PATH}"
]
```

{{% /tab %}}
{{% tab "PHP" %}}

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); php-fpm -F"  
]
```

#### Apache

VirtualHost またはサーバーコンフィギュレーションファイルの Apache および `mod_php` の場合、`PassEnv` を使用して、`DD_AGENT_HOST` およびその他の環境変数 (次の例のように[統合サービスタグ付け][1]の変数など) を設定します。

```
PassEnv DD_AGENT_HOST
PassEnv DD_SERVICE
PassEnv DD_ENV
PassEnv DD_VERSION
```

#### PHP fpm

ini パラメーターが `clear_env=on` に設定されている場合、プールワーカーファイル `www.conf` で、ホストから読み取られるように環境変数も構成する必要があります。これを使用して、`DD_AGENT_HOST` およびその他の環境変数 (次の例のように[統合サービスタグ付け][1]の変数など) も設定します。

```
env[DD_AGENT_HOST] = $DD_AGENT_HOST
env[DD_SERVICE] = $DD_SERVICE
env[DD_ENV] = $DD_ENV
env[DD_VERSION] = $DD_VERSION
```


[1]: https://docs.datadoghq.com/ja/getting_started/tagging/unified_service_tagging/
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/amazon_ecs/