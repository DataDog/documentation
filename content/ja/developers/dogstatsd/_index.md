---
title: DogStatsD
kind: documentation
description: データタイプ、タグ付けなど、DogStatsD の機能の概要
aliases:
  - /ja/guides/dogstatsd/
  - /ja/guides/DogStatsD/
  - /ja/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: DogStatsD 入門
  - link: developers/libraries
    tag: Documentation
    text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: DogStatsD ソースコード
---
DogStatsD は、Datadog Agent に付属するメトリクス集計サービスです。カスタムアプリケーションメトリクスを最も簡単に Datadog に取り込むには、メトリクスを DogStatsD に送信します。DogStatsD は [StatsD][1] プロトコルを実装すると共に、Datadog 固有の以下の拡張機能を提供します。

* ヒストグラムメトリクスタイプ
* サービスチェック
* イベント
* タグ付け

準拠する StatsD クライアントは、DogStatsD および Agent で動作しますが、その場合、[Datadog 固有の拡張機能](#dive-into-dogstatsd)は使用できません。

**注**: DogStatsD は、StatsD のタイマーをネイティブメトリクスタイプとして実装しません（ただし、[ヒストグラム経由でサポートします][2]）。

## UDS の仕組み

DogStatsD は、UDP 経由で[カスタムメトリクス][3]、[イベント][4]、および[サービスチェック][5]を受け入れ、それらを定期的に集計して Datadog に転送します。

UDP を使用するため、アプリケーションはメトリクスを DogStatsD に送信した後、応答を待たずに自身の作業を再開できます。DogStatsD を利用できなくなった場合でも、アプリケーションは中断しません。

{{< img src="developers/metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd"   >}}

DogStatsD は、データを受け取ると共に、*フラッシュ間隔*と呼ばれる時間間隔（デフォルトで 10 秒）でメトリクスごとに複数のデータポイントを 1 つのデータポイントに集計します。

## セットアップ

DogStatsD は、Agent v6 以上の UDP ポート `8125` でデフォルトで有効になっています。このポートを変更する必要がない場合は、[コードで DogStatsD をセットアップする](#code)方法を直接参照してください。また、[Docker][6] および [Kubernetes][7] の関連する DogStatsD セットアップドキュメントも参照してください。

### Agent

デフォルトでは、DogStatsD は UDP ポート **8125** をリスニングします。これを変更する必要がある場合は、[Agent のメイン構成ファイル][8]で `dogstatsd_port` オプションを構成し、Agent を再起動します。[Unix ドメインソケット][9]を使用するように DogStatsD を構成することもできます。カスタム Agent DogStatsD サーバーの UDP ポートを有効にするには:

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

2. [Agent を再起動します][10]。

### コード
#### DogStatsD クライアントをインストールする

公式の Datadog-DogStatsD クライアントライブラリは、次の言語で使用できます。[汎用 StatsD クライアント][11]を使用してメトリクスを DogStatsD に送信_できます_が、上記の Datadog 固有の機能を使用することはできません。

{{< tabs >}}
{{% tab "Python" %}}

```shell
$ pip install datadog
```

{{% /tab %}}
{{% tab "Ruby" %}}

```shell
$ gem install dogstatsd-ruby
```

{{% /tab %}}
{{% tab "Go" %}}

```shell
$ go get github.com/DataDog/datadog-go/statsd
```

{{% /tab %}}
{{% tab "Java" %}}

Java DataDog StatsD Client は maven central とともに配布され、[Maven からダウンロード][1]できます。まず、`pom.xml` に以下の構成を追加します。

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>java-dogstatsd-client</artifactId>
    <version>2.8</version>
</dependency>
```

[1]: https://search.maven.org/search?q=g:com.datadoghq%20a:java-dogstatsd-client
{{% /tab %}}
{{% tab "PHP" %}}

`composer.json` に以下を追加します。

```text
"datadog/php-datadogstatsd": "1.4.*"
```

**注**: Composer に付属している最初のバージョンは *0.0.3* です。

または、[github.com/DataDog/php-datadogstatsd][1] でリポジトリを手動でクローンし、`require './src/DogStatsd.php'` でセットアップします。

[1]: https://github.com/DataDog/php-datadogstatsd#php-datadog-statsd-client
{{% /tab %}}
{{% tab ".NET" %}}

[NuGet からパッケージを取得][1]してインストールします。

[1]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
{{% /tab %}}
{{< /tabs >}}

#### DogStatsD クライアントをインスタンス化する

DogStatsD クライアントをインストールしたら、コードでインスタンス化します。

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
# ライブラリをインポートします
require 'datadog/statsd'

# DogStatsD クライアントインスタンスを作成します。
statsd = Datadog::Statsd.new('localhost', 8125)
```

{{% /tab %}}
{{% tab "Go" %}}

```go
dogstatsd_client, err := statsd.New("127.0.0.1:8125")
if err != nil {
    log.Fatal(err)
}
```

その他のオプションについては、[Datadog の GoDoc][1] を参照してください。

[1]: https://godoc.org/github.com/DataDog/datadog-go/statsd
{{% /tab %}}
{{% tab "Java" %}}

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);

    }
}
```

{{% /tab %}}
{{% tab "PHP" %}}

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

{{% /tab %}}
{{% tab ".NET" %}}

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

StatsdClient.DogStatsd.Configure(dogstatsdConfig);
```

{{% /tab %}}
{{< /tabs >}}

### クライアントのインスタンス化パラメーター

必須の DogStatsD 構成（`url` と `port`）に加えて、DogStatsD クライアントでは次のオプションのパラメーターを使用できます。

{{< tabs >}}
{{% tab "Python" %}}

| パラメーター              | 種類            | デフォルト     | 説明                                                                                                    |
|------------------------|-----------------|-------------|----------------------------------------------------------------------------------------------------------------|
| `statsd_host`          | 文字列          | `localhost` | DogStatsD サーバーのホスト。                                                                             |
| `statsd_port`          | 整数         | `8125`      | DogStatsD サーバーのポート。                                                                             |
| `statsd_socket_path`   | 文字列          | `null`      | DogStatsD Unix ドメインソケットへのパス（`host` と `port` をオーバーライドします。Agent v6 以上でのみサポートされます）。 |
| `statsd_constant_tags` | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するタグ。                                                      |
| `statsd_namespace`     | 文字列          | `null`      | すべてのメトリクス、イベント、サービスチェックの前に付けるネームスペース。                                                   |

詳細については、[DogStatsD モジュール][1]のドキュメントを参照してください。
[1]: https://datadogpy.readthedocs.io/en/latest
{{% /tab %}}
{{% tab "Ruby" %}}

| パラメーター     | 種類            | デフォルト     | 説明                                                                                                    |
|---------------|-----------------|-------------|----------------------------------------------------------------------------------------------------------------|
| `host`        | 文字列          | `localhost` | DogStatsD サーバーのホスト。                                                                             |
| `port`        | 整数         | `8125`      | DogStatsD サーバーのポート。                                                                             |
| `socket_path` | 文字列          | `null`      | DogStatsD Unix ドメインソケットへのパス（`host` と `port` をオーバーライドします。Agent v6 以上でのみサポートされます）。 |
| `tags`        | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するタグ。                                                      |
| `namespace`   | 文字列          | `null`      | すべてのメトリクス、イベント、サービスチェックの前に付けるネームスペース。                                                |

{{% /tab %}}
{{% tab "Go" %}}

| パラメーター               | 種類            | 説明                                                                                                                                                                                                         |
|-------------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Namespace`             | 文字列          | すべてのメトリクス、イベント、サービスチェックの前に付けるネームスペース。                                                                                                                                                     |
| `Tags`                  | 文字列のリスト | すべてのメトリクス、イベント、サービスチェックに適用されるグローバルタグ。                                                                                                                                                      |
| `Buffered`              | Boolean         | 1 つのペイロードに複数の DogStatsD メッセージをパックするために使用されます。`true` に設定すると、ペイロードの合計サイズが `MaxMessagesPerPayload` またはペイロードの構築開始から 100ms を超えるまでメッセージがバッファリングされます。 |
| `MaxMessagesPerPayload` | 整数         | 単一のペイロードに含めることができるメトリクス、イベント、サービスチェックの最大数。このオプションは、クライアントがバッファリングされている場合にのみ有効です。                                                               |
| `AsyncUDS`              | Boolean         | UDS の非同期モードとブロッキングモードを切り替えるために使用されます。ブロッキングモードはエラーチェックを可能にしますが、呼び出しが実行をブロックしないことを保証しません。                                                        |
| `WriteTimeoutUDS`       | 整数         | UDS パケットがドロップされるまでのタイムアウト。                                                                                                                                                                    |

その他のオプションについては、[Datadog の GoDoc][1] を参照してください。

[1]: https://godoc.org/github.com/DataDog/datadog-go/statsd#Option
{{% /tab %}}
{{% tab "Java" %}}

| パラメーター      | 種類            | 説明                                                          |
|----------------|-----------------|----------------------------------------------------------------------|
| `prefix`       | 文字列          | すべてのメトリクス、イベント、サービスチェックに適用するプレフィックス。      |
| `hostname`     | 文字列          | ターゲット StatsD サーバーのホスト名。                         |
| `port`         | 整数         | ターゲット StatsD サーバーのポート。                              |
| `constantTags` | 文字列のリスト | すべてのメトリクス、イベント、サービスチェックに適用されるグローバルタグ。 |

詳細については、[NonBlockingStatsDClient クラス][1]のドキュメントを参照してください。

[1]: https://jar-download.com/artifacts/com.datadoghq/java-dogstatsd-client/2.1.1/documentation
{{% /tab %}}
{{% tab "PHP" %}}

| パラメーター     | 種類            | デフォルト     | 説明                                                                                                                                                         |
|---------------|-----------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`        | 文字列          | `localhost` | DogStatsD サーバーのホスト。これが設定されていない場合、Agent は `DD_AGENT_HOST` 環境変数を調べます。                                                  |
| `port`        | 整数         | `8125`      | DogStatsD サーバーのポート。これが設定されていない場合、Agent は `DD_DOGSTATSD_PORT` 環境変数を調べます。                                             |
| `socket_path` | 文字列          | `null`      | DogStatsD Unix ドメインソケットへのパス（`host` と `port` をオーバーライドします）。Agent v6 以上でのみサポートされます。                                                  |
| `global_tags` | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するタグ。`@dd.internal.entity_id` タグは、`DD_ENTITY_ID` 環境変数から global_tags に追加されます。 |

{{% /tab %}}
{{% tab ".NET" %}}

| パラメーター          | 種類            | デフォルト     | 説明                                                          |
|--------------------|-----------------|-------------|----------------------------------------------------------------------|
| `StatsdServerName` | 文字列          | `localhost` | ターゲット StatsD サーバーのホスト名。                         |
| `StatsdPort`       | 整数         | `8125`      | ターゲット StatsD サーバーのポート。                              |
| `Prefix`           | 文字列          | `null`      | すべてのメトリクス、イベント、サービスチェックに適用するプレフィックス。           |
| `ConstantTags`     | 文字列のリスト | `null`      | すべてのメトリクス、イベント、サービスチェックに適用されるグローバルタグ。 |

{{% /tab %}}
{{< /tabs >}}

## DogStatsD の理解

DogStatsD と StatsD はほぼ同じですが、DogStatsD には、使用可能なデータ型、イベント、サービスチェック、タグなど、Datadog に固有の高度な機能が含まれています。

{{< whatsnext desc="">}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission/" >}}DogStatsD でメトリクスを Datadog に送信します。{{< /nextlink >}}
    {{< nextlink href="/developers/events/dogstatsd/" >}}DogStatsD でイベントを Datadog に送信します。{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}DogStatsD でサービスチェックを Datadog に送信します。{{< /nextlink >}}
{{< /whatsnext >}}

DogStatsD が使用するデータグラム形式についてさらに理解を深めたい場合、または独自の Datadog ライブラリを開発したい場合は、[データグラムとシェルの使用][12]を参照してください。ここでは、メトリクスとイベントをコマンドラインから直接送信する方法についても説明しています。

[1]: https://github.com/etsy/statsd
[2]: /ja/developers/metrics/dogstatsd_metrics_submission
[3]: /ja/developers/metrics/custom_metrics
[4]: /ja/developers/events/dogstatsd
[5]: /ja/developers/service_checks/dogstatsd_service_checks_submission
[6]: /ja/agent/docker/?tab=standard#dogstatsd-custom-metrics
[7]: /ja/agent/kubernetes/dogstatsd/
[8]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[9]: /ja/developers/dogstatsd/unix_socket
[10]: /ja/agent/guide/agent-commands
[11]: /ja/developers/libraries/#api-and-dogstatsd-client-libraries
[12]: /ja/developers/metrics