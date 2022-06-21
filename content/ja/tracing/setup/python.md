---
title: Python アプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/python/
  - /ja/tracing/languages/python/
  - /ja/agent/apm/python/
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-py'
    tag: GitHub
    text: ソースコード
  - link: 'http://pypi.datadoghq.com/trace/docs/'
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
- セットアップ中に Continuous Profiler、App Analytics、およびトレース ID 挿入を有効にします。

または、Python で記述されたアプリケーションのトレースを始めるには、まず [Datadog Agent をインストールして構成し][3]、[Docker アプリケーションのトレース][4]または [Kubernetes アプリケーション][5]に関する追加ドキュメントを確認します。

次に、以下の pip を使用して Datadog Tracing ライブラリ `ddtrace` をインストールします。

```python
pip install ddtrace
```

Python アプリケーションをインスツルメントするには、記載されている `ddtrace-run` コマンドを使用します。これを使用するには、Python エントリーポイントコマンドを `ddtrace-run` でプレフィックスします。

たとえば、アプリケーションが `python app.py` で始まる場合、次のようになります。

```shell
ddtrace-run python app.py
```

より高度な使用方法、コンフィギュレーション、細かい制御については、Datadog の [API ドキュメント][6]を参照してください。

## コンフィギュレーション

**ddtrace-run** を使用する場合、次の[環境変数 (オプション)][7] を利用できます。

| 環境変数               | デフォルト     | 説明                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_TRACE_DEBUG`              | `false`     | トレーサーでデバッグロギングを有効化します。                                                                                                                                                                                                                                         |
| `DD_PATCH_MODULES`            |             | このアプリケーションの実行のためにパッチされたモジュールをオーバーライドします。次のような形式になります。`DD_PATCH_MODULES=module:patch,module:patch...`                                                                                                                            |

サービスに `env`、`service`、`version` を設定するには、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用することをおすすめします。このような環境変数の構成におすすめの方法については、[統合サービスタグ付け][8]のドキュメントをご参照ください。

| 環境変数               | デフォルト     | 説明                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_ENV`                           |             | アプリケーションの環境 (例: `prod`、`pre-prod`、`staging`) を設定します。詳細については、[環境の設定方法][9]を参照してください。バージョン 0.38 以降で利用可能。                                                                                                             |
| `DD_SERVICE`                       |             | このアプリケーションで使用するサービス名。値は、Web フレームワークのインテグレーション (例: Pylons、Flask、Django) 用のミドルウェアを設定する際にパススルーされます。Web インテグレーションを行わずにトレースする場合は、[コード内でサービス名を設定する](#インテグレーション)ことをお勧めします。バージョン 0.38 以降で利用可能。 |
| `DD_VERSION`                       |             | アプリケーションのバージョン（例: `1.2.3`, `6c44da20`, `2020.02.13`）を設定します。バージョン 0.38 以降で利用可能。                                                                                                                                                                  |
| `DD_TAGS`                          |             | すべてのスパン、プロファイル、ランタイムメトリクスに追加されるデフォルトタグのリスト（例:  `layer:api,team:intake`）。バージョン 0.38 以降で利用可能。                                                                                                                            |
| `DD_TRACE_ENABLED`            | `true`      | Web フレームワークとライブラリインスツルメンテーションを有効にします。`false` の場合、アプリケーションコードはトレースを生成しません。                                                                                                                                                           |
| `DD_AGENT_HOST`                    | `localhost` | デフォルトのトレーサーがトレースの送信を試みるトレースエージェントホストの宛先アドレスをオーバーライドします。                                                                                                                                                                          |
| `DD_TRACE_AGENT_PORT`         | `8126`      | デフォルトのトレーサーがトレースを送信する宛先ポートをオーバーライドします。                                                                                                                                                                                                                 |
| `DD_TRACE_AGENT_URL`               |             | トレーサーが送信するトレース Agent の URL。設定した場合、ホスト名およびポートより優先されます。`datadog.yaml` ファイルの `apm_config.receiver_socket` または `DD_APM_RECEIVER_SOCKET` 環境変数と組み合わせて、Unix ドメインソケットをサポートします。  |
| `DD_PRIORITY_SAMPLING`        | `true`      | [優先度付きサンプリング][10]を有効にします。                                                                                                                                                                                                                                              |
| `DD_LOGS_INJECTION`                | `false`     | [ログとトレースの挿入を接続する][11]を有効にします。                                                                                                                                                                                                                           |
| `DD_TRACE_ANALYTICS_ENABLED`       | `false`     | [Web インテグレーション][12]用 App Analytics をグローバルに有効にします。                                                                                                                                                                                                                   |
| `DD_INTEGRATION_ANALYTICS_ENABLED` | `false`     | 特定のインテグレーション用の App Analytics を有効化します。例:  ``DD_BOTO_ANALYTICS_ENABLED=true` 。                                                                                                                                                                                |

## Agent ホスト名の変更

アプリケーションレベルのトレーサーを構成し、トレースをカスタムのエージェントホスト名に送信します。Python トレーシングモジュールが自動的に検索し、環境変数の `DD_AGENT_HOST` や `DD_TRACE_AGENT_PORT` で初期化します。

ただし、コードでホスト名およびポートを設定することもできます。

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname="custom-hostname",
    port="1234",
)
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/docs
[3]: /ja/tracing/send_traces/
[4]: /ja/tracing/setup/docker/
[5]: /ja/agent/kubernetes/apm/
[6]: http://pypi.datadoghq.com/trace/docs
[7]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtracerun
[8]: /ja/getting_started/tagging/unified_service_tagging
[9]: /ja/tracing/guide/setting_primary_tags_to_scope/
[10]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#priority-sampling
[11]: /ja/tracing/connect_logs_and_traces/python/
[12]: /ja/tracing/app_analytics/?tab=python#automatic-configuration
