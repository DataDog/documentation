---
aliases:
- /ja/guides/dogstatsd/
- /ja/guides/DogStatsD/
- /ja/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
- /ja/integrations/faq/dogstatsd-and-docker
- /ja/agent/kubernetes/dogstatsd
description: データタイプ、タグ付けなど、DogStatsD の機能の概要
further_reading:
- link: developers/dogstatsd
  tag: ドキュメント
  text: DogStatsD 入門
- link: developers/libraries
  tag: ドキュメント
  text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
- link: https://github.com/DataDog/datadog-agent/tree/main/pkg/dogstatsd
  tag: GitHub
  text: DogStatsD ソースコード
kind: documentation
title: DogStatsD
---

DogStatsD は、Datadog Agent に付属するメトリクス集計サービスです。カスタムアプリケーションメトリクスを最も簡単に Datadog に取り込むには、メトリクスを DogStatsD に送信します。DogStatsD は [StatsD][1] プロトコルを実装すると共に、Datadog 固有の以下の拡張機能を提供します。

- ヒストグラムメトリクスタイプ
- サービスチェック
- イベント
- タグ付け

準拠する StatsD クライアントは、DogStatsD および Agent で動作しますが、その場合、[Datadog 固有の拡張機能](#dive-into-dogstatsd)は含まれません。

**注**: DogStatsD は、StatsD のタイマーをネイティブメトリクスタイプとして実装しません（ただし、[ヒストグラム経由でサポートします][2]）。

DogStatsD は、Docker Hub と GCR で利用できます。

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/dogstatsd][3]          | [gcr.io/datadoghq/dogstatsd][4]                           |

## UDS の仕組み

DogStatsD は、UDP 経由で[カスタムメトリクス][5]、[イベント][6]、および[サービスチェック][7]を受け入れ、それらを定期的に集計して Datadog に転送します。

UDP を使用するため、アプリケーションはメトリクスを DogStatsD に送信した後、応答を待たずに自身の作業を再開できます。DogStatsD を利用できなくなった場合でも、アプリケーションは中断しません。

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd" >}}

DogStatsD は、データを受け取ると共に、_フラッシュ間隔_と呼ばれる時間間隔でメトリクスごとに複数のデータポイントを 1 つのデータポイントに集計します。DogStatsD はフラッシュ間隔を 10 秒としています。

## セットアップ

DogStatsD は、Agent v6 以上の UDP ポート `8125` でデフォルトで有効になっています。このポートを変更する必要がない場合は、[コードで DogStatsD をセットアップする](#code)方法を直接参照してください。

### エージェント

{{< tabs >}}
{{% tab "Host Agent" %}}

デフォルトでは、DogStatsD は UDP ポート **8125** をリスニングします。これを変更する必要がある場合は、[Agent のメイン構成ファイル][1]で `dogstatsd_port` オプションを構成し、Agent を再起動します。[Unix ドメインソケット][2]を使用するように DogStatsD を構成することもできます。カスタム Agent DogStatsD サーバーの UDP ポートを有効にするには:

1. `datadog.yaml` ファイルを編集して、`use_dogstatsd` および  `dogstatsd_port` パラメーターのコメントを解除します。

    ```yaml
    ## @param use_dogstatsd - boolean - optional - default: true
    ## Set this option to false to disable the Agent DogStatsD server.
    #
    use_dogstatsd: true

    ## @param dogstatsd_port - integer - optional - default: 8125
    ## Override the Agent DogStatsD port.
    ## Note: Make sure your client is sending to the same UDP port.
    #
    dogstatsd_port: 8125
    ```

2. [Agent を再起動します][3]。


[1]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[2]: /ja/developers/dogstatsd/unix_socket/
[3]: /ja/agent/guide/agent-commands/
{{% /tab %}}
{{% tab "コンテナ Agent" %}}

デフォルトでは、DogStatsD は UDP ポート **8125** でリッスンするため、コンテナで Agent を実行する場合、このポートをホストポートにバインドする必要があります。StatsD メトリクスが `localhost` の外部から取得される場合、メトリクスの収集を許可するには、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` を `true` に設定する必要があります。DogStatsd サーバーを起動した状態で Agent を実行するには、次のコマンドを実行します。

```shell
docker run -d --cgroupns host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC="true" \
              -p 8125:8125/udp \
              gcr.io/datadoghq/agent:latest
```

StatsD メトリクスの収集に使用するポートを変更する必要がある場合は、`DD_DOGSTATSD_PORT="<新しい_DOGSTATSD_ポート>` 環境変数を使用します。[Unix ドメインソケット][1]を使用するように DogStatsD を構成することもできます。

[1]: /ja/developers/dogstatsd/unix_socket/
{{% /tab %}}
{{% tab "Kubernetes" %}}

StatsD メトリクスの収集を開始するには、DogStatsD ポートをホストポートにバインドする必要があります。[Unix ドメインソケット][1]を使用するように DogStatsD を構成することもできます。

1. `hostPort` を `datadog-agent.yaml` マニフェストに追加します。

    ```yaml
    ports:
        - containerPort: 8125
          hostPort: 8125
          name: dogstatsdport
          protocol: UDP
    ```

   これによりアプリケーションは、実行中のノードのポート `8125` で DogStatsD でメトリクスを送信できるようになります。

   **注**: `hostPort` 機能には、Calico、Canal、Flannel などの [CNI 仕様][2]に準拠したネットワークプロバイダーが必要です。非 CNI ネットワークプロバイダーの回避策を含む詳細については、Kubernetes のドキュメントを参照してください: [HostPort サービスが機能しない][3]。

2. DogStatsD 非ローカルトラフィックを有効にして StatsD データ収集を許可し、`datadog-agent.yaml` マニフェストで `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` を `true` に設定します。

    ```yaml
    - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
      value: 'true'
    ```

   これにより、Agent を実行しているコンテナ以外のコンテナから StatsD データを収集できます。

3. 変更を適用します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

**警告**: `hostPort` パラメーターを指定すると、ホストのポートが開かれます。アプリケーションまたは信頼できるソースからのみアクセスを許可するように、ファイアウォールを設定してください。ネットワークプラグインが `hostPorts` をサポートしていない場合は、`hostNetwork: true` を Agent ポッド仕様に追加してください。ホストのネットワークネームスペースが Datadog Agent と共有されます。つまり、コンテナで開かれたすべてのポートはホストで開きます。ポートがホストとコンテナの両方で使用されると、競合し (同じネットワークネームスペースを共有するので)、ポッドが開始しません。これを許可しない Kubernetes インストールもあります。

### StatsD メトリクスを Agent に送信する

アプリケーションには、ホストの IP アドレスを判断するための信頼できる方法を必要です。これは、Kubernetes 1.7 では簡単です。環境変数としてポッドに渡すことができる属性のセットを拡張します。バージョン 1.7 以上では、環境変数を PodSpec に追加することで、ホスト IP を任意のポッドに渡すことができます。たとえば、アプリケーション マニフェストは次のようになります。

```yaml
env:
    - name: DD_AGENT_HOST
      valueFrom:
          fieldRef:
              fieldPath: status.hostIP
```

これにより、アプリケーションを実行しているポッドは、`$DD_AGENT_HOST` のポート `8125` で DogStatsD メトリクスを送信できるようになります。

**注**: Datadog では、属性を割り当てる際のベストプラクティスとして、統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。環境を統合する方法については、[統合サービスタグ付け][8]をご参照ください。

#### UDP 発信点検出

発信点検出は Agent 6.10.0+ でサポートされており、これにより、DogStatsD はコンテナメトリクスとタグメトリクスがどこから発信されたかを自動的に検出します。このモードが有効な場合は、UDP で受信されたすべてのメトリクスがオートディスカバリーメトリクスと同じポッドタグに基づいてタグ付けされます。

**注**: 

* UDP による発信点検出では、ポッド ID をエンティティ ID として使用するため、コンテナレベルのタグは発行されません。
* UDP 以外には [Unix ドメインソケット][4]があります。

UDP 経由の発信点検出を有効にするには、アプリケーションマニフェストに次の行を追加します。

```yaml
env:
    - name: DD_ENTITY_ID
      valueFrom:
          fieldRef:
              fieldPath: metadata.uid
```

発信点検出を使用して収集されたメトリクスに[タグカーディナリティ][5]を設定するには、環境変数 `DD_DOGSTATSD_TAG_CARDINALITY` に `low` (デフォルト) または `orchestrator` を使用します。

**注:** UDP の場合、`pod_name` タグは、[カスタムメトリクス][6]が多くなりすぎないように、デフォルトで追加されていません。

[1]: /ja/developers/dogstatsd/unix_socket/
[2]: https://github.com/containernetworking/cni
[3]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[4]: /ja/developers/dogstatsd/unix_socket/#using-origin-detection-for-container-tagging
[5]: /ja/getting_started/tagging/assigning_tags/#environment-variables
[6]: /ja/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Helm" %}}

[DogStatsD][1] で、helm を使用してカスタムメトリクスを収集するには:

1. [datadog-values.yaml][2] ファイルを更新して DogStatsD を有効にします。

    ```yaml
      dogstatsd:
        port: 8125
        useHostPort: true
        nonLocalTraffic: true
    ```

   **注**: `hostPort` 機能には、Calico、Canal、Flannel などの [CNI 仕様][3]に準拠したネットワークプロバイダーが必要です。非 CNI ネットワークプロバイダーの回避策を含む詳細については、Kubernetes のドキュメントを参照してください: [HostPort サービスが機能しない][4]。

   **警告**: `hostPort` パラメーターを指定すると、ホストのポートが開かれます。アプリケーションまたは信頼できるソースからのみアクセスを許可するように、ファイアウォールを設定してください。ネットワークプラグインが `hostPorts` をサポートしていない場合は、`hostNetwork: true` を Agent ポッド仕様に追加してください。ホストのネットワークネームスペースが Datadog Agent と共有されます。つまり、コンテナで開かれたすべてのポートはホストで開きます。ポートがホストとコンテナの両方で使用されると、競合し (同じネットワークネームスペースを共有するので)、ポッドが開始しません。これを許可しない Kubernetes インストールもあります。

2. Agent コンフィギュレーションをアップグレードする:

    ``` shell
    helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
    ```

3. アプリケーションポッドの更新: アプリケーションには、ホストの IP アドレスを判断するための信頼できる方法が必要です。これは、Kubernetes 1.7 では簡単です。環境変数としてポッドに渡すことができる属性のセットを拡張します。バージョン 1.7 以上では、環境変数を PodSpec に追加することで、ホスト IP を任意のポッドに渡すことができます。たとえば、アプリケーションマニフェストは次のようになります。

    ```yaml
    env:
        - name: DD_AGENT_HOST
          valueFrom:
              fieldRef:
                  fieldPath: status.hostIP
    ```

     これにより、アプリケーションを実行しているポッドは、`$DD_AGENT_HOST` のポート `8125` から DogStatsD メトリクスを送信できるようになります。

[1]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://github.com/containernetworking/cni
[4]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
{{% /tab %}}
{{< /tabs >}}

### コード

#### DogStatsD クライアントをインストールする

公式の Datadog-DogStatsD クライアントライブラリは、次の言語で使用できます。準拠する StatsD クライアントは DogStatsD および Agent で動作しますが、上記の Datadog 固有の機能は含まれていません。
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

Java DataDog StatsD Client は maven central とともに配布され、[Maven からダウンロード][1]できます。まず、`pom.xml` に以下の構成を追加します。

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>java-dogstatsd-client</artifactId>
    <version>3.0.0</version>
</dependency>
```



[1]: https://search.maven.org/search?q=g:com.datadoghq%20a:java-dogstatsd-client
{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

`composer.json` に以下を追加します。

```text
"datadog/php-datadogstatsd": "1.4.*"
```

**注**: Composer に付属している最初のバージョンは _0.0.3_ です。

または、[github.com/DataDog/php-datadogstatsd][1] でリポジトリを手動でクローンし、`require './src/DogStatsd.php'` でセットアップします。



[1]: https://github.com/DataDog/php-datadogstatsd#php-datadog-statsd-client
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

- [NuGet からパッケージ][1]を取得してインストールします。


[1]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}


#### DogStatsD クライアントをインスタンス化する

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

<div class="alert alert-warning">
  デフォルトでは、Python DogStatsD クライアントインスタンス (<code>statsd</code> グローバルインスタンスを含む) はプロセス間で共有できませんが、スレッドセーフです。このため、親プロセスと各子プロセスは、クライアントの独自のインスタンスを作成するか、<code>disable_buffering</code> を <code>True</code> に設定してバッファリングを明示的に無効にする必要があります。詳細については、<a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a> のドキュメントを参照してください。
</div>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
# ライブラリをインポートします
require 'datadog/statsd'

# DogStatsD クライアントインスタンスを作成します。
statsd = Datadog::Statsd.new('localhost', 8125)
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
dogstatsd_client, err := statsd.New("127.0.0.1:8125")
if err != nil {
    log.Fatal(err)
}
```

その他のオプションについては、[Datadog の GoDoc][1] を参照してください。



[1]: https://godoc.org/github.com/DataDog/datadog-go/v5/statsd
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


        // または
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
// コードは StatsdClient ネームスペースの下にあります
using StatsdClient;

// ...

var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

using (var dogStatsdService = new DogStatsdService())
{
    dogStatsdService.Configure(dogstatsdConfig);
    // ...
} // 未送信のメトリクスをフラッシュします
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

<div class="alert alert-info">
  コンテナ Agent または Kubernetes で DogStatsD を使用する場合、Unix ドメインソケットを使用している場合は <code>$DD_DOGSTATSD_SOCKET</code> 環境変数を、ホストポートバインディング方式を使用している場合は <code>$DD_AGENT_HOST</code> 環境変数を使用して、StatsD メトリクスの転送先のホストをインスタンス化する必要があります。
</div>

### クライアントのインスタンス化パラメーター

**注**: Datadog では、タグを割り当てる際のベストプラクティスとして、統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。環境を統合する方法については、[統合サービスタグ付け][8]をご参照ください。

必須の DogStatsD 構成（`url` と `port`）に加えて、DogStatsD クライアントでは次のオプションのパラメーターを使用できます。

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}
| パラメーター              | タイプ            | デフォルト     | 説明                                                                                                    |
| ---------------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `statsd_host`          | 文字列          | `localhost` | DogStatsD サーバーのホスト。                                                                             |
| `statsd_port`          | 整数         | `8125`      | DogStatsD サーバーのポート。                                                                             |
| `statsd_socket_path`   | 文字列          | `null`      | DogStatsD Unix ドメインソケットへのパス (`host` および `port` を上書き。Agent v6 以降のみに対応)。 |
| `statsd_constant_tags` | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するタグ。                                                      |
| `statsd_namespace`     | 文字列          | `null`      | すべてのメトリクス、イベント、サービスチェックのプレフィックスになるネームスペース。                                                   |

`datadog.initialize()` で使用できるオプションのパラメーターと、`datadog.dogstatsd.DogStatsd` インスタンスを明示的にインスタンス化する場合にのみ使用できるパラメーターの完全なリストについては、[Datadog Python ライブラリ][1]を参照してください。


[1]: https://datadogpy.readthedocs.io/en/latest
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

| パラメーター       | タイプ            | デフォルト     | 説明                                                                                                    |
| --------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `host`          | 文字列          | `localhost` | DogStatsD サーバーのホスト。                                                                             |
| `port`          | 整数         | `8125`      | DogStatsD サーバーのポート。                                                                             |
| `socket_path`   | 文字列          | `null`      | DogStatsD Unix ドメインソケットへのパス（`host` と `port` をオーバーライドします。Agent v6 以上でのみサポートされます）。 |
| `tags`          | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するタグ。                                                      |
| `namespace`     | 文字列          | `null`      | すべてのメトリクス、イベント、サービスチェックの前に付けるネームスペース。                                                |
| `single_thread` | Boolean         | `false`     | コンパニオンスレッドではなく、有効になっている場合、クライアントがメインスレッドでメトリクスを送信するようにします。           |

オプションのパラメーターの完全なリストについては、GitHub の [dogstatsd-ruby リポジトリ][1]を参照してください。


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Go クライアントには、クライアントの動作を設定するための複数のオプションがあります。

| パラメーター                     | タイプ            | 説明                                                                  |
| ----------------------------- | --------------- | ---------------------------------------------------------------------------- |
| `WithNamespace()`             | 文字列          | すべてのメトリクス、イベント、サービスチェックの前に付けるネームスペースを構成します。  |
| `WithTags()`                  | 文字列のリスト | すべてのメトリクス、イベント、サービスチェックに適用されるグローバルタグ。               |

利用可能なすべてのオプションについては、[Datadog の GoDoc][1] を参照してください。


[1]: https://godoc.org/github.com/DataDog/datadog-go/v5/statsd#Option
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

v2.10.0 以降では、NonBlockingStatsDClientBuilder を使ってクライアントをインスタンス化することを推奨します。以下のビルダーメソッドを使用して、クライアントのパラメータを定義することができます。

| ビルダーメソッド                               | タイプ           | デフォルト   | 説明                                                                         |
| -------------------------------------------- | -------------- | --------- | ----------------------------------------------------------------------------------- |
| `prefix(String val)`                         | 文字列         | null      | すべてのメトリクス、イベント、サービスチェックに適用するプレフィックス。                     |
| `hostname(String val)`                       | 文字列         | localhost | ターゲット StatsD サーバーのホスト名。                                        |
| `port(int val)`                              | 整数        | 8125      | ターゲット StatsD サーバーのポート。                                             |
| `constantTags(String... val)`                | String varargs | null      | すべてのメトリクス、イベント、サービスチェックに適用されるグローバルタグ。                |
| `blocking(boolean val)`                      | Boolean        | false     | インスタンス化するクライアントのタイプ: ブロッキングか非ブロッキングか。                        |
| `socketBufferSize(int val)`                  | 整数        | -1        | 基礎となるソケットバッファのサイズ。                                           |
| `enableTelemetry(boolean val)`               | Boolean        | false     | クライアントテレメトリーレポート。                                                         |
| `entityID(String val)`                       | 文字列         | null      | 発信点検出のためのエンティティ ID。                                                   |
| `errorHandler(StatsDClientErrorHandler val)` | 整数        | null      | クライアント内部でエラーが発生した場合のエラーハンドラー。                                  |
| `maxPacketSizeBytes(int val)`                | 整数        | 8192/1432 | 最大パケットサイズ、UDS で 8192、UDP で 1432。                               |
| `processorWorkers(int val)`                  | 整数        | 1         | 送信のためにバッファを組み立てているプロセッサーワーカスレッドの数。           |
| `senderWorkers(int val)`                     | 整数        | 1         | ソケットにバッファを送信している送信側ワーカスレッドの数。               |
| `poolSize(int val)`                          | 整数        | 512       | ネットワークパケットバッファプールのサイズ。                                                    |
| `queueSize(int val)`                         | 整数        | 4096      | キュー内の未処理メッセージの最大数。                                |
| `timeout(int val)`                           | 整数        | 100       | ブロック操作のタイムアウト (ミリ秒単位)。unix ソケットにのみ適用されます。  |

詳細は、Java DogStatsD [パッケージ][1]の NonBlockingStatsDClient Class と NonBlockingStatsDClientBuilder Class を検索してください。クライアントのリリースと一致するバージョンを表示するようにしてください。


[1]: https://javadoc.io/doc/com.datadoghq/java-dogstatsd-client/latest/index.html
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

| パラメーター     | タイプ            | デフォルト     | 説明                                                                                                                                                         |
| ------------- | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `host`        | 文字列          | `localhost` | DogStatsD サーバーのホスト。これが設定されていない場合、Agent は `DD_AGENT_HOST` 環境変数を調べます。                                                  |
| `port`        | 整数         | `8125`      | DogStatsD サーバーのポート。これが設定されていない場合、Agent は `DD_DOGSTATSD_PORT` 環境変数を調べます。                                             |
| `socket_path` | 文字列          | `null`      | DogStatsD Unix ドメインソケットへのパス（`host` と `port` をオーバーライドします）。Agent v6 以上でのみサポートされます。                                                  |
| `global_tags` | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するタグ。`@dd.internal.entity_id` タグは、`DD_ENTITY_ID` 環境変数から global_tags に追加されます。 |

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

| パラメーター          | タイプ            | デフォルト     | 説明                                                          |
| ------------------ | --------------- | ----------- | -------------------------------------------------------------------- |
| `StatsdServerName` | 文字列          | `localhost` | ターゲット StatsD サーバーのホスト名。                         |
| `StatsdPort`       | 整数         | `8125`      | ターゲット StatsD サーバーのポート。                              |
| `Prefix`           | 文字列          | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するプレフィックス。           |
| `ConstantTags`     | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用されるグローバルタグ。 |

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## DogStatsD の理解

DogStatsD と StatsD はほぼ同じですが、DogStatsD には、使用可能なデータ型、イベント、サービスチェック、タグなど、Datadog に固有の高度な機能が含まれています。

{{< whatsnext desc="">}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission/" >}}DogStatsD でメトリクスを Datadog に送信します。{{< /nextlink >}}
    {{< nextlink href="/events/guides/dogstatsd/" >}}DogStatsD でイベントを Datadog に送信します。{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}DogStatsD でサービスチェックを Datadog に送信します。{{< /nextlink >}}
{{< /whatsnext >}}

DogStatsD が使用するデータグラム形式についてさらに理解を深めたい場合、または独自の Datadog ライブラリを開発したい場合は、[データグラムとシェルの使用][9]を参照してください。ここでは、メトリクスとイベントをコマンドラインから直接送信する方法についても説明しています。

[1]: https://github.com/etsy/statsd
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://hub.docker.com/r/datadog/dogstatsd
[4]: https://gcr.io/datadoghq/dogstatsd
[5]: /ja/metrics/custom_metrics/
[6]: /ja/events/guides/dogstatsd/
[7]: /ja/developers/service_checks/dogstatsd_service_checks_submission/
[8]: /ja/getting_started/tagging/unified_service_tagging
[9]: /ja/metrics/