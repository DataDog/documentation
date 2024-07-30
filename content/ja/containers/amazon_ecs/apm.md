---
aliases:
- /ja/agent/amazon_ecs/apm
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/amazon_ecs/tags/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当て
title: ECS アプリケーションのトレース
---

## 概要

ECS コンテナからトレースを収集するには、以下の説明に従って、Agent とアプリケーションコンテナの両方のタスク定義を更新してください。

そのためには、以前使用していた[タスク定義ファイル][4]を修正し、[更新したタスク定義を登録する][5]という方法があります。また、Amazon Web UI から直接タスク定義を編集することも可能です。

Datadog Agent コンテナを有効にすると、自身と同じホスト上の他のアプリケーションコンテナから発せられるトレースを収集することができます。

## トレースを受け取るように Datadog Agent を構成する
1. 実行中の ECS コンテナからすべてのトレースを収集するには、[オリジナルの ECS セットアップ][6]の Agent のタスク定義を以下の構成に更新してください。

   &nbsp;必要な基本構成は、[datadog-agent-ecs-apm.json][3] を参照します。Datadog Agent コンテナのタスク定義で、ホストの `portMappings` をコンテナのポート `8126` に設定し、プロトコル `tcp` を設定します。

    ```json
    {
      "containerDefinitions": [
        {
          "name": "datadog-agent",
          "image": "public.ecr.aws/datadog/agent:latest",
          "cpu": 100,
          "memory": 256,
          "essential": true,
          "portMappings": [
            {
              "hostPort": 8126,
              "protocol": "tcp",
              "containerPort": 8126
            }
          ],
          (...)
        }
      ]
    }
    ```

2. **Agent v7.17 以下**の場合、以下の環境変数を追加します。
    ```json
    "environment": [
      (...)
      {
        "name": "DD_APM_ENABLED",
        "value": "true"
      },
      {
        "name": "DD_APM_NON_LOCAL_TRAFFIC",
        "value": "true"
      }
    ]
    ```

3. Agent のタスク定義のローカルファイルを更新する場合、[更新したタスク定義の登録][5]を行います。これにより、新しいリビジョンが作成されます。Datadog Agent のデーモンサービスで、この更新されたリビジョンを参照することができます。

## Datadog Agent にトレースを送信するためのアプリケーションコンテナの構成

### トレーシングライブラリをインストールする
アプリケーションの言語に合わせて、[Datadog トレーシングライブラリのインストール方法][2]に従ってください。ECS の場合、トレーサーをアプリケーションのコンテナイメージにインストールします。

### EC2 インスタンスのプライベート IP アドレスを提供する
アプリケーションコンテナが稼働している EC2 インスタンスのプライベート IP アドレスをトレーサーに提供します。このアドレスは、トレーサーエンドポイントのホスト名となります。同じホスト上の Datadog Agent コンテナ (ホストポートが有効になっている) は、これらのトレースを受信します。

以下のいずれかの方法で、プライベート IP アドレスを動的に取得します。

{{< tabs >}}
{{% tab "EC2 メタデータエンドポイント" %}}

[Amazon の EC2 メタデータエンドポイント (IMDSv1)][1] を使用すると、プライベート IP アドレスを検出できます。各ホストのプライベート IP アドレスを取得するには、次の URL をカールします。

{{< code-block lang="curl" >}}
curl http://169.254.169.254/latest/meta-data/local-ipv4
{{< /code-block >}}

[Instance Metadata Service (IMDSv2)] の Version 2 を使用している場合[2]

{{< code-block lang="curl" >}}
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
curl http://169.254.169.254/latest/meta-data/local-ipv4 -H "X-aws-ec2-metadata-token: $TOKEN"
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
{{% /tab %}}
{{% tab "ECS コンテナメタデータファイル" %}}

[Amazon の ECS コンテナメタデータファイル][1]を使用すると、プライベート IP アドレスを検出できます。各ホストのプライベート IP アドレスを取得するには、次のコマンドを実行します。

{{< code-block lang="curl" >}}
cat $ECS_CONTAINER_METADATA_FILE | jq -r .HostPrivateIPv4Address
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html#metadata-file-format
{{% /tab %}}
{{< /tabs >}}

トレースを送信するアプリケーションコンテナごとに `DD_AGENT_HOST` 環境変数を設定し、このリクエストの結果をトレーサーに提供します。

### トレース Agent のエンドポイントを構成する

ECS アプリケーションの変数が起動時に設定される場合 (Java、.NET、PHP)、上記のいずれかの方法でトレーサーエンドポイントのホスト名を環境変数として `DD_AGENT_HOST` で設定する**必要があります**。以下の例では、IMDSv1 メタデータエンドポイントを使用していますが、必要に応じて構成を変更することができます。エントリーポイントとしてスタートアップスクリプトを使用している場合は、スクリプトの一部としてこの呼び出しを含めます。そうでない場合は、ECS タスク定義の `entryPoint` に追加します。

その他の言語 (Python、JavaScript、Ruby、Go) については、アプリケーションのソースコードでホスト名を設定することもできます。

{{< programming-lang-wrapper langs="python,nodeJS,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}

#### 起動時間の変数
タスク定義の `entryPoint` を、`<Python Startup Command>` に置き換えて、以下のように更新してください。

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Python Startup Command>"
]
```
Python の場合、起動コマンドは一般的に `ddtrace-run python my_app.py` ですが、例えば [uWSGI][1] を使用したり、 [`patch_all` でコードを手動でインスツルメントする][2]など、使用するフレームワークに よって異なる場合があります。

#### コード
トレーサーがホスト名を明示的に設定するように、コードを更新することもできます。

```python
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
```

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#uwsgi
[2]: https://ddtrace.readthedocs.io/en/stable/basic_usage.html#patch-all
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

#### 起動時間の変数
タスク定義の `entryPoint` を、`<Node.js Startup Command>` に置き換えて、以下のように更新してください。
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Node.js Startup Command>"
]
```

#### コード
トレーサーがホスト名を明示的に設定するように、コードを更新することもできます。

```javascript
const tracer = require('dd-trace').init();
const axios = require('axios');

(async () => {
  const { data: hostname } = await axios.get('http://169.254.169.254/latest/meta-data/local-ipv4');
  tracer.setUrl(`http://${hostname}:8126`);
})();
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

#### 起動時間の変数
タスク定義の `entryPoint` を、`<Ruby Startup Command>` に置き換えて、以下のように更新してください。
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Ruby Startup Command>"
]
```

#### コード
トレーサーがホスト名を明示的に設定するように、コードを更新することもできます。

```ruby
require 'ddtrace'
require 'net/http'

Datadog.configure do |c|
  c.agent.host = Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

#### 起動時間の変数
タスク定義の `entryPoint` を、`<Go Startup Command>` に置き換えて、以下のように更新してください。

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Go Startup Command>"
]
```

#### コード
トレーサーがホスト名を明示的に設定するように、コードを更新することもできます。

```go
package main

import (
    "net/http"
    "io/ioutil"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    resp, err := http.Get("http://169.254.169.254/latest/meta-data/local-ipv4")
    bodyBytes, err := ioutil.ReadAll(resp.Body)
    host := string(bodyBytes)
    if err == nil {
        // curl コマンドの出力を DD_AGENT_HOST 環境に設定します
        os.Setenv("DD_AGENT_HOST", host)
        // トレース Agent にホスト設定を伝えます
        tracer.Start(tracer.WithAgentAddr(host))
        defer tracer.Stop()
    }
    //...
}
```


{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

#### 起動時間の変数
タスク定義の `entryPoint` を、`<Java Startup Command>` に置き換えて、以下のように更新してください。

```java
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Java Startup Command>"
]
```
Java 起動コマンドには、`-javaagent:/path/to/dd-java-agent.jar` を含める必要があります。さらなる例は、[JVM にトレーサーを追加するための Java トレースに関するドキュメント][1]を参照してください。

[1]: /ja/tracing/trace_collection/dd_libraries/java/?tab=containers#add-the-java-tracer-to-the-jvm
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

#### 起動時間の変数
タスク定義の `entryPoint` を次のように更新します。設定されていない場合は、`APP_PATH` を置き換えます。

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); dotnet ${APP_PATH}"
]
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

#### 起動時間の変数
タスク定義の `entryPoint` を以下のように更新します。

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
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

#### IMDSv2
IMDSv2 を使用する場合、同等の `entryPoint` の構成は以下のようになります。上記の例のように、`<Startup Command>` をお使いの言語に基づいた適切なコマンドに置き換えてください。

```json
"entryPoint": [
  "sh",
  "-c",
  "export TOKEN=$(curl -X PUT \"http://169.254.169.254/latest/api/token\" -H \"X-aws-ec2-metadata-token-ttl-seconds: 21600\"); export DD_AGENT_HOST=$(curl -H \"X-aws-ec2-metadata-token: $TOKEN\" http://169.254.169.254/latest/meta-data/local-ipv4); <Startup Command>"
]
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/container/amazon_ecs/
[2]: /ja/tracing/trace_collection/
[3]: /resources/json/datadog-agent-ecs-apm.json
[4]: /ja/containers/amazon_ecs/?tab=awscli#managing-the-task-definition-file
[5]: /ja/containers/amazon_ecs/?tab=awscli#registering-the-task-definition
[6]: /ja/containers/amazon_ecs/?tab=awscli#setup