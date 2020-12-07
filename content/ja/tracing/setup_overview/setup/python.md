---
title: Python アプリケーションのトレース
kind: documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /ja/tracing/python/
  - /ja/tracing/languages/python/
  - /ja/agent/apm/python/
  - /ja/tracing/setup/python
  - /ja/tracing/setup_overview/python
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-py'
    tag: GitHub
    text: ソースコード
  - link: 'https://ddtrace.readthedocs.io/en/stable/'
    tag: Pypi
    text: API ドキュメント
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースを調査する
  - link: tracing/
    tag: 高度な使用方法
    text: 高度な使用方法
---
## 互換性要件

Python のバージョン `2.7+` および `3.5+` 以降がサポートされています。サポート対象のライブラリの一覧については、[互換性要件][1]ページをご覧ください。

## インストールと利用開始

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][2]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中に Continuous Profiler、トレースの 100% の取り込み、およびトレース ID 挿入を有効にします。

それ以外の場合、Python で記述されたアプリケーションのトレースを開始するには、Datadog トレーシングライブラリ `ddtrace` を、pip を使用してインストールします。

```python
pip install ddtrace
```

Python アプリケーションをインスツルメントするには、記載されている `ddtrace-run` コマンドを使用します。これを使用するには、Python エントリーポイントコマンドを `ddtrace-run` でプレフィックスします。

たとえば、アプリケーションが `python app.py` で始まる場合、次のようになります。

```shell
ddtrace-run python app.py
```

### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `datadog.yaml` ファイルの `apm_enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{% tab "コンテナ" %}}

1. メインの [`datadog.yaml` コンフィギュレーションファイル][1]で `apm_non_local_traffic: true` を設定します

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションをインスツルメント化した後、トレースクライアントはデフォルトでトレースを `localhost:8126` に送信します。これが正しいホストとポートでない場合は、以下の環境変数を設定して変更します。

`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT`

ホスト名やポートをコードで設定することもできます。

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname="custom-hostname",
    port="1234",
)
```


[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]ドキュメントを参照してください。


[1]: /ja/tracing/serverless_functions/
{{% /tab %}}
{{% tab "その他の環境" %}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3]、[Azure App Services Extension][4] など、他の多くの環境で利用できます。

その他の環境については、その環境の[インテグレーション][5]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][6]ください。

[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/infrastructure/serverless/azure_app_services/#overview
[5]: /ja/integrations/
[6]: /ja/help/
{{% /tab %}}
{{< /tabs >}}

より高度な使用方法、コンフィギュレーション、細かい制御については、Datadog の [API ドキュメント][3]を参照してください。

## コンフィギュレーション

**ddtrace-run** を使用する場合、次の[環境変数 (オプション)][4] を利用できます。

| 環境変数               | デフォルト     | 説明                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_DEBUG`              | `false`     | トレーサーでデバッグロギングを有効化します。                                                                                                                                                                                                                                         |
| `DATADOG_PATCH_MODULES`            |             | このアプリケーションの実行のためにパッチされたモジュールをオーバーライドします。次のような形式になります。`DATADOG_PATCH_MODULES=module:patch,module:patch...`                                                                                                                            |

サービスに `env`、`service`、`version` を設定するには、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用することをおすすめします。このような環境変数の構成におすすめの方法については、[統合サービスタグ付け][5]のドキュメントをご参照ください。

| 環境変数               | デフォルト     | 説明                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_ENV`                           |             | アプリケーションの環境 (例: `prod`、`pre-prod`、`staging`) を設定します。詳細については、[環境の設定方法][6]を参照してください。バージョン 0.38 以降で利用可能。                                                                                                             |
| `DD_SERVICE`                       |             | このアプリケーションで使用するサービス名。値は、Web フレームワークのインテグレーション (例: Pylons、Flask、Django) 用のミドルウェアを設定する際にパススルーされます。Web インテグレーションを行わずにトレースする場合は、[コード内でサービス名を設定する](#インテグレーション)ことをお勧めします。バージョン 0.38 以降で利用可能。 |
| `DD_VERSION`                       |             | アプリケーションのバージョン（例: `1.2.3`, `6c44da20`, `2020.02.13`）を設定します。バージョン 0.38 以降で利用可能。                                                                                                                                                                  |
| `DD_TAGS`                          |             | すべてのスパン、プロファイル、ランタイムメトリクスに追加されるデフォルトタグのリスト（例:  `layer:api,team:intake`）。バージョン 0.38 以降で利用可能。                                                                                                                            |
| `DD_TRACE_ENABLED`            | `true`      | Web フレームワークとライブラリインスツルメンテーションを有効にします。`false` の場合、アプリケーションコードはトレースを生成しません。                                                                                                                                                           |
| `DD_AGENT_HOST`                    | `localhost` | デフォルトのトレーサーがトレースの送信を試みるトレースエージェントホストの宛先アドレスをオーバーライドします。                                                                                                                                                                          |
| `DATADOG_TRACE_AGENT_PORT`         | `8126`      | デフォルトのトレーサーがトレースを送信する宛先ポートをオーバーライドします。                                                                                                                                                                                                                 |
| `DD_TRACE_AGENT_URL`               |             | トレーサーが送信するトレース Agent の URL。設定した場合、ホスト名およびポートより優先されます。`datadog.yaml` ファイルの `apm_config.receiver_socket` または `DD_APM_RECEIVER_SOCKET` 環境変数と組み合わせて、Unix ドメインソケットをサポートします。  |
| `DATADOG_PRIORITY_SAMPLING`        | `true`      | [優先度付きサンプリング][7]を有効にします。                                                                                                                                                                                                                                              |
| `DD_LOGS_INJECTION`                | `false`     | [ログとトレースの挿入を接続する][8] を有効にします。                                                                                                                                                                                                                           |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/docs
[3]: https://ddtrace.readthedocs.io/en/stable/
[4]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/tracing/guide/setting_primary_tags_to_scope/
[7]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#priority-sampling
[8]: /ja/tracing/connect_logs_and_traces/python/