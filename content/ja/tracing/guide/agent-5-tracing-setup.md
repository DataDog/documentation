---
title: Agent v5 を使用した APM と分散型トレーシング
kind: ガイド
private: true
aliases:
  - /ja/tracing/faq/agent-5-tracing-setup
---
## はじめに

APM は、Linux および Docker の Agent 用のワンラインインストーラーの一環として Datadog Agent バージョン 5.11 以降でご利用可能です。[Mac][1] ユーザーおよび [Windows][2] ユーザーは、別のインストールプロセスにより APM Agent (トレース Agent) を手動でインストールする必要があります。

Agent は、[Datadog Agent コンフィギュレーションファイル][3]に次のパラメーターを記述することで有効化できます。

```conf
apm_enabled: true
```

<div class="alert alert-info">
APM は、Datadog Agent 5.13 以降 (Linux および Docker の場合) ではデフォルトで有効化されていますが、Datadog Agent コンフィギュレーションファイルにパラメーター <code>apm_enabled: no</code> を追加することで無効化できます。
</div>

### Agent のインストール

[トレーシングメトリクス][4]は、Datadog Agent を通して Datadog に送信されます。トレーシングを有効化するには

最新の [Datadog Agent][5]をインストールします (バージョン 5.11.0 以降が必要です) 。

### Docker で Agent を実行する

Docker コンテナでアプリケーションをトレースするには、[docker-dd-agent][6] イメージ (バージョン 11.0.5110 以降でタグ付け) を使用し、`DD_APM_ENABLED=true` を環境変数として渡してトレーシングを有効化します。

詳細情報については、[Docker ページ][7]を参照してください。

### アプリケーションをインスツルメントする

{{< whatsnext desc="下記のサポート言語を 1 つ選択してください">}}
    {{< nextlink href="tracing/setup/java" tag="Java" >}}Java 言語のインスツルメンテーション。{{< /nextlink >}}
    {{< nextlink href="tracing/setup/cpp" tag="C++" >}}C++ 言語のインスツルメンテーション。{{< /nextlink >}}
    {{< nextlink href="tracing/setup/python" tag="Python" >}}Python 言語のインスツルメンテーション。{{< /nextlink >}}
    {{< nextlink href="tracing/setup/ruby" tag="Ruby" >}}Ruby 言語のインスツルメンテーション。{{< /nextlink >}}
    {{< nextlink href="tracing/setup/go" tag="Go" >}}Go 言語のインスツルメンテーション。{{< /nextlink >}}
    {{< nextlink href="tracing/setup/nodejs" tag="Nodejs" >}}Node.js 言語のインスツルメンテーション。{{< /nextlink >}}
    {{< nextlink href="tracing/setup/dotnet" tag=".NET" >}}.NET 言語のインスツルメンテーション。{{< /nextlink >}}
    {{< nextlink href="tracing/setup/php" tag="PHP" >}}PHP 言語のインスツルメンテーション。{{< /nextlink >}}
{{< /whatsnext >}}

公式ライブラリでまだサポートされていない言語で記述されたアプリケーションをインスツルメントする場合は、[トレーシング API][8] を参照してください。

## コンフィグレーション

Datadog Agent では、インフラストラクチャーの監視と APM コンフィギュレーションのオプションの双方にコンフィギュレーションファイルを使用します。

また、コンフィギュレーションオプションの中には環境変数として設定されているものがあります。環境変数として設定されているオプションは、コンフィギュレーションファイルで定義された設定をオーバーライドすることに注意してください。

| ファイル設定            | 環境変数       | 説明                                                                                                                                                      |
|-------------------------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apm_enabled`           | `DD_APM_ENABLED`           | 値を `true`. に設定すると、Datadog Agent はトレースメトリクスを受け付けます。デフォルトの値は `true` です。                                                            |
| `receiver_port`         | `DD_RECEIVER_PORT`         | Datadog Agent のトレースレシーバーがリスニングするポート。デフォルト値は `8126` です。                                                                  |
| `connection_limit`      | `DD_CONNECTION_LIMIT`      | 1 回 30 秒のリース期間で許可するクライアント接続のユニーク数。デフォルト値は `2000` です。                                                 |
| `resource`              | `DD_IGNORE_RESOURCE`       | トレースをリソース名でフィルタリングするための正規表現ブラックリスト。                                                                                  |

Datadog Agent の詳細については、[専用ドキュメントページ][9]または [`datadog.conf.example` ファイル][10]を参照してください。

### トレース検索

トレース検索は Agent 5.25.0 以降でご利用になれます。詳細については主な [APM ドキュメント][11]のセットアップ手順を確認してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://github.com/DataDog/datadog-agent/tree/master/docs/trace-agent#run-on-macos
[2]: https://github.com/DataDog/datadog-agent/tree/master/docs/trace-agent#run-on-windows
[3]: /ja/agent/faq/where-is-the-configuration-file-for-the-agent/
[4]: /ja/tracing/visualization/#trace-metrics
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://gcr.io/datadoghq/docker-dd-agent
[7]: /ja/tracing/docker/
[8]: /ja/api/v1/tracing/
[9]: /ja/agent/
[10]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[11]: /ja/tracing/setup/?tab=agent5250#trace-search
[12]: /ja/help/