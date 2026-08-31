---
aliases:
- /ja/guides/dogstatsd/
- /ja/guides/DogStatsD/
- /ja/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
- /ja/integrations/faq/dogstatsd-and-docker
- /ja/agent/kubernetes/dogstatsd
- /ja/developers/dogstatsd/
description: データタイプ、タグ付けなど、DogStatsD の機能の概要
further_reading:
- link: integrations/node
  tag: ドキュメント
  text: Node.js インテグレーションを利用して Node.js 用の DogStatsD を有効にします
- link: extend/dogstatsd
  tag: ドキュメント
  text: DogStatsD 入門
- link: extend/libraries
  tag: ドキュメント
  text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: ブログ
  text: Datadog で Azure App Service 上の Linux Web アプリを監視する
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: ブログ
  text: Datadog の CSI ドライバーにより、高パフォーマンスの監視可能性を提供して Kubernetes 環境のセキュリティを確保する
- link: https://learn.datadoghq.com/courses/create-custom-metrics-dogstatsd
  tag: ラーニングセンター
  text: DogStatsD を使用して Custom Metrics を作成する
title: DogStatsD
---
DogStatsD は、Datadog Agent に付属するメトリクス集計サービスです。カスタムアプリケーションメトリクスを最も簡単に Datadog に取り込むには、メトリクスを DogStatsD に送信します。DogStatsD は [StatsD][1] プロトコルを実装すると共に、Datadog 固有の以下の拡張機能を提供します。

- ヒストグラムメトリクスタイプ
- サービスチェック
- イベント
- タグ付け

準拠する StatsD クライアントは、DogStatsD および Agent で動作しますが、その場合、[Datadog 固有の拡張機能](#dive-into-dogstatsd)は含まれません。

**注**: DogStatsD は、StatsD のタイマーをネイティブメトリクスタイプとして実装しません (ただし、[ヒストグラム経由でサポートします][2])。

DogStatsD は Datadog コンテナレジストリ、GAR、ECR、Azure ACR、および Docker Hub で利用可能です。

| レジストリ                   | イメージ                                   |
| -------------------------- | --------------------------------------- |
| Datadog Container Registry | [registry.datadoghq.com/dogstatsd][33]  |
| Google Artifact Registry   | [gcr.io/datadoghq/dogstatsd][4]         |
| Amazon ECR                 | [public.ecr.aws/datadog/dogstatsd][34]  |
| Azure ACR                  | datadoghq.azurecr.io/dogstatsd          |
| Docker Hub                 | [hub.docker.com/r/datadog/dogstatsd][3] |

<div class="alert alert-warning">Docker Hub はイメージプルレート制限の対象です。Docker Hub のカスタマーでない場合、Datadog では、Datadog コンテナレジストリまたはクラウドプロバイダーのレジストリを使用することが推奨されています。その手順については、<a href="/agent/guide/changing_container_registry">コンテナのレジストリを変更する</a>を参照してください。</div>

## 仕組み {#how-it-works}

DogStatsD は、UDP 経由で[カスタムメトリクス][5]、[イベント][6]、および[サービスチェック][7]を受け入れ、それらを定期的に集計して Datadog に転送します。

UDP を使用することによりアプリケーションは、DogStatsD にメトリクスを送信し、応答を待たずに作業を再開できます。DogStatsD が利用できなくなった場合でも、アプリケーションは中断されません。

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="DogStatsD" >}}

DogStatsD は、データを受け取ると共に、_フラッシュ間隔_と呼ばれる時間間隔 (デフォルトで 10 秒) でメトリクスごとに複数のデータポイントを 1 つのデータポイントに集計します。DogStatsD では、フラッシュインターバルとして 10 秒が使用されています。

## セットアップ {#setup}

DogStatsD は、Datadog Agent にバンドルされたサーバーと、複数の言語で利用可能なクライアントライブラリとで構成されています。DogStatsD サーバーは、Agent v6+ の UDP ポート `8125` を通じて、デフォルトで有効になっています。必要に応じて、サーバーのカスタムポートを設定できます。Datadog Agent DogStatsD サーバーのアドレスとポートに合わせて、クライアントを設定してください。

### Datadog Agent DogStatsD サーバー {#datadog-agent-dogstatsd-server}

{{< tabs >}}
{{% tab "ホスト Agent" %}}

ポートを変更する必要がある場合は、メインの [Agent 構成ファイル][1] で `dogstatsd_port` オプションを構成してから、Agent を再起動してください。DogStatsD を [UNIX ドメインソケット][2] で使用するように設定することもできます。

独自の Agent DogStatsD サーバーの UDP ポートを有効にするには、次のようにします。

1. `dogstatsd_port` パラメータを設定します。

    ```yaml
    ## @param dogstatsd_port - integer - optional - default: 8125
    ## Override the Agent DogStatsD port.
    ## Note: Make sure your client is sending to the same UDP port.
    #
    dogstatsd_port: 8125
    ```

2. [Agent を再起動します][3]。

[1]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[2]: /ja/extend/dogstatsd/unix_socket/
[3]: /ja/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "コンテナ Agent" %}}

デフォルトの場合、DogStatsD は、UDP ポート **8125** をリッスンしているため、コンテナ内で Agent を実行する際にはこのポートをホストポートにバインドする必要があります。StatsD メトリクスが `localhost` の外部からの場合は、メトリクス収集を許可するために `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` を `true` に設定する必要があります。DogStatsD サーバーを起動した状態で Agent を実行するには、次のコマンドを実行します:

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC="true" \
              -p 8125:8125/udp \
              registry.datadoghq.com/agent:latest
```

StatsD メトリクスの収集に使用するポートを変更する必要がある場合は、`DD_DOGSTATSD_PORT="<NEW_DOGSTATSD_PORT>` 環境変数を使用してください。DogStatsD を [UNIX ドメインソケット][1] で使用するように設定することもできます。

[1]: /ja/extend/dogstatsd/unix_socket/
{{% /tab %}}
{{% tab "Datadog Operator" %}}

StatsD メトリクスの収集は、[UNIX ドメインソケット][1]において、デフォルトで有効になっています。UDP 経由で StatsD メトリクスの収集を開始するには、Operator 設定で DogStatsD 機能を有効にする必要があります。

1. `features.dogstatsd.hostPortConfig.enabled` を `datadog-agent.yaml` マニフェストに追加します。

    ```yaml
    features:
        dogstatsd:
            hostPortConfig:
                enabled: true
    ```

    This is an example `datadog-agent.yaml` manifest:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        credentials:
          apiSecret:
            secretName: datadog-secret
            keyName: api-key
      features:
        dogstatsd:
          hostPortConfig:
            enabled: true
    ```

    This enables the Agent to collect StatsD metrics over UDP on port `8125`.

2. 変更を適用します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

**警告**: `features.dogstatsd.hostPortConfig.hostPort` パラメーターはホスト上のポートを開きます。ファイアウォールが、アプリケーションまたは信頼できるソースからのアクセスのみ許可することを確認してください。ネットワークプラグインで `hostPorts` がサポートされていない場合は、Agent Pod の仕様に `hostNetwork: true` を追加してください。これにより、ホストのネットワークネームスペースが Datadog Agent と共有されます。これは、コンテナ上で開かれるすべてのポートがホスト上でも開かれることを意味します。ホストとコンテナの両方でポートが使用されている場合、それらは競合することにより (同じネットワークネームスペースを共有しているため)、Pod は起動しません。一部の Kubernetes インストールでは、これが許可されません。

### StatsD メトリクスを Agent に送信する {#send-statsd-metrics-to-the-agent}

アプリケーションには、ホストの IP アドレスを特定するための信頼できる手段が必要です。Kubernetes 1.7 ではそれが簡単に実現されています。これにより、Pod に環境変数として渡すことができる属性のセットが拡張されます。バージョン 1.7 以降では、PodSpec に環境変数を追加することで、ホスト IP を任意の Pod に渡すことができます。たとえば、アプリケーションのマニフェストは次のようになります。

```yaml
env:
    - name: DD_AGENT_HOST
      valueFrom:
          fieldRef:
              fieldPath: status.hostIP
```

これにより、アプリケーションを実行している Pod は、`$DD_AGENT_HOST` のポート `8125` で DogStatsD メトリクスを送信できるようになります。

**注**: ベストプラクティスとして、Datadog では属性を割り当てる際に統合サービスタグ付けを使用することが推奨されています。unified service tagging は、`env`、`service`、および `version` の 3 つの標準タグを使用して Datadog テレメトリを結び付けます。環境を統一する方法については、[unified service tagging][4]を参照してください。

[1]: /ja/extend/dogstatsd/unix_socket/
[2]: https://github.com/containernetworking/cni
[3]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[4]: /ja/getting_started/tagging/unified_service_tagging
{{% /tab %}}
{{% tab "Helm" %}}

[DogStatsD][1] で helm を使用してカスタムメトリクスを収集するには:

1. [datadog-values.yaml][2] ファイルを更新して DogStatsD を有効にします。

    ```yaml
      dogstatsd:
        port: 8125
        useHostPort: true
        nonLocalTraffic: true
    ```

     **Note**: `hostPort` functionality requires a networking provider that adheres to the [CNI specification][3], such as Calico, Canal, or Flannel. For more information, including a workaround for non-CNI network providers, see the Kubernetes documentation: [HostPort services do not work][4].

     **Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. If your network plugin doesn't support `hostPorts`, so add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod does not start. Some Kubernetes installations do not allow this.

2. Agent コンフィギュレーションをアップグレードします。

    ``` shell
    helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
    ```

3. アプリケーション Pod を更新する: アプリケーションには、ホストの IP アドレスを特定するための信頼できる手段が必要です。Kubernetes 1.7 ではそれが簡単に実現されています。これにより、Pod に環境変数として渡すことができる属性のセットが拡張されます。バージョン 1.7 以降では、PodSpec に環境変数を追加することで、ホスト IP を任意の Pod に渡すことができます。たとえば、アプリケーションのマニフェストは次のようになります。

    ```yaml
    env:
        - name: DD_AGENT_HOST
          valueFrom:
              fieldRef:
                  fieldPath: status.hostIP
    ```

     With this, any pod running your application is able to send DogStatsD metrics through port `8125` on `$DD_AGENT_HOST`.

[1]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://github.com/containernetworking/cni
[4]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
{{% /tab %}}
{{< /tabs >}}

### 発信点検出 {#origin-detection}

Datadog Agent v6.10.0 では、_発信点検出_の機能がサポートされています。これにより、DogStatsD はコンテナメトリクスの発信元を検出し、自動的にメトリクスにタグを付けることができます。発信点検出が有効になっている場合、UDP 経由で受信したすべてのメトリクスには同一の Pod タグが付与されます。 
Autodiscovery メトリクスとしてのタグ。

#### DogStatsD クライアント{#in-a-dogstatsd-client}

すべての DogStatsD クライアントにおいて、発信点検出はデフォルトで有効になっています。 

クライアントで**発信点検出を無効にする**には、次のいずれかの操作を実行します。
- 環境変数 `DD_ORIGIN_DETECTION_ENABLED=false`  を設定します。
- 発信点検出を無効にするよう、DogStatsD ライブラリを構成します。その手順については、[特定の DogStatsD ライブラリのドキュメント][10]を参照してください。

#### Datadog Agent{#in-the-datadog-agent}
Datadog Agent において、発信点検出はデフォルトでは有効になっていません。Datadog Agent で**発信点検出を有効にする**には、`DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT` 環境変数を `true` に設定します。

Agent による EKS Fargate での発信点検出を支援するように、[Pod 仕様で `shareProcessNamespace:true`][12] を設定します。

#### 発信点検出方法 {#how-origins-are-detected}

発信点検出はさまざまな方法で実現できます。デフォルトでは、cgroups を通じた発信点検出が有効になっています。UDP 経由の発信点検出または `DD_EXTERNAL_ENV` については、構成が必要です。

{{< tabs >}}
{{% tab "cgroups" %}}
Linux の場合、コンテナ ID は `procfs` に関連するエントリから `cgroups` を抽出することで取得できます。クライアントは `/proc/self/cgroup` または `/proc/self/mountinfo` から読み取って、コンテナ ID の解析を試みます。

cgroup v2 では、`/proc/self/cgroup` から cgroup パスを解決し、`/proc/self/mountinfo` からの cgroup マウントポイントと組み合わせることによりコンテナ ID を推測できます。結果として得られるディレクトリの inode が Datadog Agent に送信されます。Datadog Agent がクライアントと同じノードにある場合、この情報を使用して Pod の UID を特定できます。
{{% /tab %}}

{{% tab "UDP" %}}
UDP 経由の発信点検出を有効にするには、アプリケーションマニフェストに次の行を追加します。

```yaml
env:
- name: DD_ENTITY_ID
    valueFrom:
      fieldRef:
        fieldPath: metadata.uid
```

DogStatsD クライアントが内部タグ `entity_id` を追加します。このタグの値は `DD_ENTITY_ID` 環境変数の内容であり、それは Pod の UID です。

<div class="alert alert-info">UDP の場合、<code>pod_name</code> タグは、デフォルトでは追加されません。<a href="/metrics/custom_metrics/">カスタムメトリクス</a>が多くなりすぎないようにするためです。</div>
{{% /tab %}}

{{% tab "DD_EXTERNAL_ENV" %}}
自分の Pod に以下のラベルを追加します。

```
admission.datadoghq.com/enabled: "true"
```

Pod にこのラベルがある場合、[Admissions Controller][1] により環境変数 `DD_EXTERNAL_ENV` が注入されます。この変数の値がメトリクスと共にフィールドに入れられて送信されます。Datadog Agent は、これを使用してメトリクスの発信点を特定できます。

[1]: /ja/containers/cluster_agent/admission_controller
{{% /tab %}}
{{< /tabs >}}

#### タグのカーディナリティ {#tag-cardinality}

タグのカーディナリティについて詳しくは、[タグの付け方: タグのカーディナリティ][11]をお読みください。

##### グローバルに {#globally}

`DD_CARDINALITY` 環境変数を設定するか、またはコンストラクタに `'cardinality'` フィールドを渡すことにより、タグのカーディナリティをグローバルに指定できます。

##### メトリクスごとに {#per-metric}

`cardinality` パラメーターに値を渡すことにより、メトリクスごとにタグのカーディナリティを指定できます。このパラメーターの有効な値は `"none"`、`"low"`、`"orchestrator"` または `"high"` です。

### DogStatsD クライアント {#dogstatsd-client}

使用するプログラミング言語向けの DogStatsD クライアントライブラリをインストールし、Datadog Agent DogStatsD サーバーのアドレスとポートに合わせて構成してください。

#### DogStatsD クライアントをインストールする {#install-the-dogstatsd-client}

公式の Datadog-DogStatsD クライアントライブラリは、以下の言語で利用可能です。準拠する StatsD クライアントは、DogStatsD および Agent で動作しますが、前述の Datadog 固有の拡張機能は含まれません。
{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}

{{< programming-lang lang="python" >}}

```shell
pip install datadog
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```shell
gem install dogstatsd-ruby
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```shell
go get github.com/DataDog/datadog-go/v5/statsd
```

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Java DataDog StatsD Client は maven central とともに配布され、[Maven からダウンロード][1]できます。まず、`pom.xml` に次の構成を追加します。

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>java-dogstatsd-client</artifactId>
    <version>4.2.1</version>
</dependency>
```

[1]: https://search.maven.org/search?q=g:com.datadoghq%20a:java-dogstatsd-client
{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

`composer.json` に次の内容を追加します。

```text
"datadog/php-datadogstatsd": "1.6.*"
```

**注**: Composer に付属している最初のバージョンは _0.0.3_ です。

または、[github.com/DataDog/php-datadogstatsd][1] でリポジトリのクローンを手動で作成し、`require './src/DogStatsd.php'` でそれをセットアップします。



[1]: https://github.com/DataDog/php-datadogstatsd#php-datadog-statsd-client
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Nuget CLI を使用してパッケージを直接インストールするか、[NuGet から PackageReference][1] を取得します。

```shell
dotnet add package DogStatsD-CSharp-Client
```

[1]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}


#### DogStatsD クライアントをインスタンス化する {#instantiate-the-dogstatsd-client}

DogStatsD クライアントをインストールしたら、コードでインスタンス化します。
{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}

{{< programming-lang lang="python" >}}

```python
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)
```

<div class="alert alert-danger">
  デフォルトの場合、Python DogStatsD クライアントインスタンス ( <code>statsd</code> グローバルインスタンスを含む)をプロセス間で共有することはできませんが、それらはスレッドセーフです。このため、親プロセスと各子プロセスは、クライアントの独自インスタンスを作成するか、 <code>disable_buffering</code> を <code>True</code>に設定して、バッファリングを明示的に無効にする必要があります。詳細については、<a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a> のドキュメントを参照してください。
</div>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
# Import the library
require 'datadog/statsd'

# Create a DogStatsD client instance.
statsd = Datadog::Statsd.new('localhost', 8125)
```

<div class="alert alert-info">
  DogStatsD をコンテナ Agent と共に、または Kubernetes で使用する場合、UNIX ドメインソケットを使用しているなら <code>$DD_DOGSTATSD_SOCKET</code> 環境変数を、あるいはホストポートバインディング方式を使用している場合は <code>$DD_AGENT_HOST</code> 環境変数を使用して、StatsD メトリクスの転送先のホストをインスタンス化する必要があります。
</div>

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
dogstatsd_client, err := statsd.New("127.0.0.1:8125")
if err != nil {
    log.Fatal(err)
}
```

その他のオプションについては、[Datadog の GoDoc][1] を参照してください。



[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd")
            .hostname("localhost")
            .port(8125)
            .build();


        // alternatively
        StatsDClient statsdAlt = new NonBlockingStatsDClient(
            new NonBlockingStatsDClientBuilder(
                .prefix("statsd")
                .hostname("localhost")
                .port(8125)
                .resolve()));

    }
}
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

composer を使用して、新しい DogStatsd オブジェクトをインスタンス化します。

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

DogStatsd クラスを構成します。

```csharp
// The code is located under the StatsdClient namespace
using StatsdClient;

// ...

var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

using (var dogStatsdService = new DogStatsdService())
{
    if (!dogStatsdService.Configure(dogstatsdConfig))
        throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
    // ...
} // Flush metrics not yet sent
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### クライアントのインスタンス化パラメーター {#client-instantiation-parameters}

**注**: ベストプラクティスとして、Datadog はタグを割り当てるときに統合サービスタグ付けを使用することをお勧めします。unified service tagging は、`env`、`service`、および `version` の 3 つの標準タグを使用して Datadog テレメトリを結び付けます。環境を統一する方法については、[unified service tagging][8]を参照してください。

必須の DogStatsD 構成 (`url` と `port`) に加えて、DogStatsD クライアントでは次のオプションのパラメーターを使用できます。

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}
| パラメーター              | 型            | デフォルト     | 説明                                                                                                    |
| ---------------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `statsd_host`          | 文字列          | `localhost` | DogStatsD サーバーのホスト。                                                                            |
| `statsd_port`          | 整数         | `8125`      | DogStatsD サーバーのポート。                                                                            |
| `statsd_socket_path`   | 文字列          | `null`      | DogStatsD UNIX ドメインソケットのパス (`host` と `port` をオーバーライド。Agent v6 以上でのみサポート)。|
| `statsd_constant_tags` | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するタグ。                                                     |
| `statsd_namespace`     | 文字列          | `null`      | すべてのメトリクス、イベント、サービスチェックの前に付けるネームスペース。                                                  |

`datadog.initialize()` で使用できるオプションのパラメーターと、`datadog.dogstatsd.DogStatsd` インスタンスを明示的にインスタンス化する場合にのみ使用できるパラメーターの完全なリストについては、[Datadog Python ライブラリ][1]を参照してください。


[1]: https://datadogpy.readthedocs.io/en/latest
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

| パラメーター       | 型            | デフォルト     | 説明                                                                                                    |
| --------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `host`          | 文字列          | `localhost` | DogStatsD サーバーのホスト。                                                                            |
| `port`          | 整数         | `8125`      | DogStatsD サーバーのポート。                                                                            |
| `socket_path`   | 文字列          | `null`      | DogStatsD UNIX ドメインソケットのパス (`host` と `port` をオーバーライド。Agent v6 以上でのみサポート)。|
| `tags`          | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するタグ。                                                     |
| `namespace`     | 文字列          | `null`      | すべてのメトリクス、イベント、サービスチェックの前に付けるネームスペース。                                               |
| `single_thread` | ブール値         | `false`     | コンパニオンスレッドではなく、有効になっている場合、クライアントがメインスレッドでメトリクスを送信するようにします。          |

オプションのパラメーターの完全なリストについては、GitHub の [dogstatsd-ruby リポジトリ][1]を参照してください。


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Go クライアントには、クライアントの動作を設定するための複数のオプションがあります。

| パラメーター         | 型            | 説明                                                                 |
| ----------------- | --------------- | --------------------------------------------------------------------------- |
| `WithNamespace()` | 文字列          | すべてのメトリクス、イベント、サービスチェックの前に付けるネームスペースを構成します。|
| `WithTags()`      | 文字列のリスト | すべてのメトリクス、イベント、サービスチェックに適用されるグローバルタグ。             |

利用可能なすべてのオプションについては、[Datadog の GoDoc][1] を参照してください。


[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd#Option
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

v2.10.0 以降では、NonBlockingStatsDClientBuilder を使ってクライアントをインスタンス化することを推奨します。以下の
ビルダーメソッドを使用して、クライアントのパラメータを定義することができます。次のビルダーメソッドを使用してクライアントパラメーターを定義できます。

| ビルダーメソッド                               | 型           | デフォルト   | 説明                                                                        |
| -------------------------------------------- | -------------- | --------- | ---------------------------------------------------------------------------------- |
| `prefix(String val)`                         | 文字列         | null      | すべてのメトリクス、イベント、サービスチェックに適用するプレフィックス。                   |
| `hostname(String val)`                       | 文字列         | localhost | ターゲット StatsD サーバーのホスト名。                                      |
| `port(int val)`                              | 整数        | 8125      | ターゲット StatsD サーバーのポート。                                           |
| `constantTags(String... val)`                | 文字列 varargs | null      | すべてのメトリクス、イベント、サービスチェックに適用されるグローバルタグ。              |
| `blocking(boolean val)`                      | ブール値        | false     | インスタンス化するクライアントのタイプ: ブロッキングか非ブロッキングか。                      |
| `socketBufferSize(int val)`                  | 整数I        | -1        | 基礎となるソケットバッファのサイズ。                                         |
| `enableTelemetry(boolean val)`               | ブール値        | false     | クライアントテレメトリーレポート。                                                       |
| `entityID(String val)`                       | 文字列         | null      | 発信点検出のためのエンティティ ID。                                                   |
| `errorHandler(StatsDClientErrorHandler val)` | 整数        | null      | クライアント内部でエラーが発生した場合のエラーハンドラー。                                |
| `maxPacketSizeBytes(int val)`                | 整数        | 8192/1432 | 最大パケットサイズ、UDS で 8192、UDP で 1432。                             |
| `processorWorkers(int val)`                  | 整数        | 1         | 送信のためにバッファを組み立てているプロセッサーワーカスレッドの数。         |
| `senderWorkers(int val)`                     | 整数        | 1         | ソケットにバッファを送信している送信側ワーカスレッドの数。             |
| `poolSize(int val)`                          | 整数        | 512       | ネットワークパケットバッファプールのサイズ。                                                  |
| `queueSize(int val)`                         | 整数        | 4096      | キュー内の未処理メッセージの最大数。                              |
| `timeout(int val)`                           | 整数        | 100       | ブロック操作のタイムアウト (ミリ秒単位)。unix ソケットにのみ適用されます。|

詳細は、Java DogStatsD [パッケージ][1]の NonBlockingStatsDClient Class と NonBlockingStatsDClientBuilder Class を検索してください。ご利用のクライアントリリースに対応したバージョンであることを確認してください。


[1]: https://javadoc.io/doc/com.datadoghq/java-dogstatsd-client/latest/index.html
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

| パラメーター          | 型            | デフォルト     | 説明                                                                                                                                                                                            |
| ------------------ | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `host`             | 文字列          | `localhost` | DogStatsD サーバーのホスト。これが設定されていない場合、Agent は環境変数 `DD_AGENT_HOST` または `DD_DOGSTATSD_URL` を参照します。                                                              |
| `port`             | 整数         | `8125`      | DogStatsD サーバーのポート。これが設定されていない場合、Agent は環境変数 `DD_DOGSTATSD_PORT` または `DD_DOGSTATSD_URL` を参照します。                                                         |
| `socket_path`      | 文字列          | `null`      | DogStatsD UNIX ドメインソケットのパス (`host` と `port` をオーバーライド)。Agent v6 以上でのみサポート。これが設定されていない場合、Agent は環境変数 `DD_DOGSTATSD_URL` を参照します。|
| `global_tags`      | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するタグ。`@dd.internal.entity_id` タグは、`DD_ENTITY_ID` 環境変数の global_tags に追加されます。                                   |
| `origin_detection` | ブール値         | true        | 各メトリクスに発信点検出フィールドを追加するかどうか                                                                                                                                               |
| `container_id`     | 文字列          | `null`      | 発信点検出のためにすべてのメトリクスにタグ付けするコンテナ ID。                                                                                                                                           |

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

| パラメーター          | 型            | デフォルト     | 説明                                                          |
| ------------------ | --------------- | ----------- | -------------------------------------------------------------------- |
| `StatsdServerName` | 文字列          | `localhost` | ターゲット StatsD サーバーのホスト名。                        |
| `StatsdPort`       | 整数         | `8125`      | ターゲット StatsD サーバーのポート。                             |
| `Prefix`           | 文字列          | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するプレフィックス。          |
| `ConstantTags`     | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用されるグローバルタグ。|
| `OriginDetection`  | ブール値         | true        | 各メトリクスに発信点検出フィールドを追加するかどうか             |
| `ContainerID`      | 文字列          | `null`      | 発信点検出のためにすべてのメトリクスにタグ付けするコンテナ ID。         |

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## DogStatsD の詳細 {#dive-into-dogstatsd}

DogStatsD と StatsD はほぼ同じですが、DogStatsD には、使用可能なデータ型、イベント、サービスチェック、タグなど、Datadog に固有の高度な機能が含まれています。

{{< whatsnext desc="">}}
{{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission/" >}}DogStatsD により Datadogにメトリクスを送信します。{{< /nextlink >}}
{{< nextlink href="/events/guides/dogstatsd/" >}}DogStatsD により Datadogにイベントを送信します。{{< /nextlink >}}
{{< nextlink href="/extend/service_checks/dogstatsd_service_checks_submission/" >}}DogStatsD により Datadogにサービスチェックを送信します。{{< /nextlink >}}
{{< /whatsnext >}}

DogStatsD が使用するデータグラム形式についてさらに理解を深めたい場合、または独自の Datadog ライブラリを開発したい場合は、[データグラムとシェルの使用状況][9]を参照してください。ここでは、メトリクスとイベントをコマンドラインから直接送信する方法についても説明しています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/statsd/statsd
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://hub.docker.com/r/datadog/dogstatsd
[4]: https://gcr.io/datadoghq/dogstatsd
[5]: /ja/metrics/custom_metrics/
[6]: /ja/events/guides/dogstatsd/
[7]: /ja/extend/service_checks/dogstatsd_service_checks_submission/
[8]: /ja/getting_started/tagging/unified_service_tagging
[9]: /ja/extend/dogstatsd/datagram_shell/
[10]: /ja/extend/community/libraries/
[11]: /ja/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[12]: https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/
[33]: https://registry.datadoghq.com/v2/dogstatsd/tags/list
[34]: https://gallery.ecr.aws/datadog/dogstatsd