---
aliases:
- /ja/tracing/python/
- /ja/tracing/languages/python/
- /ja/agent/apm/python/
- /ja/tracing/setup/python
- /ja/tracing/setup_overview/python
code_lang: python
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: GitHub
  text: ソースコード
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: Pypi
  text: API ドキュメント
- link: tracing/visualization/
  tag: Documentation
  text: サービス、リソース、トレースを調査する
- link: tracing/
  tag: 高度な使用方法
  text: 高度な使用方法
kind: documentation
title: Python アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件

Python ライブラリは、Linux、MacOS、Windows の CPython バージョン 2.7 および 3.5-3.10 をサポートしています。Datadog の Python バージョンサポートの詳細については、[互換性要件][1]のページを参照してください。

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

**注:** このコマンドは pip バージョン `18.0.0` 以上が必要です。Ubuntu、Debian、またはその他のパッケージマネージャーをお使いの場合は、以下のコマンドで pip バージョンを更新してください。

```python
pip install --upgrade pip
```

Python アプリケーションをインスツルメントするには、記載されている `ddtrace-run` コマンドを使用します。これを使用するには、Python エントリーポイントコマンドを `ddtrace-run` でプレフィックスします。

たとえば、アプリケーションが `python app.py` で始まる場合、次のようになります。

```shell
ddtrace-run python app.py
```

### v1 へのアップグレード

ddtrace v1 にアップグレードする場合は、ライブラリドキュメントの[アップグレードガイド][3]と[リリースノート][4]で詳細を確認してください。

### APM に Datadog Agent を構成する

今インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `apm_config` 下にある  `datadog.yaml` ファイルの `enabled: true` で有効になっており、デフォルトで `http://localhost:8126` でトレースデータをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{% tab "コンテナ" %}}

1. メイン [`datadog.yaml` コンフィギュレーションファイル][1]の `apm_config` セクションで `apm_non_local_traffic: true` を設定します。

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションがインスツルメントされた後、トレースクライアントはデフォルトで Unix ドメインソケット `/var/run/datadog/apm.socket` にトレースを送信しようとします。ソケットが存在しない場合、トレースは `http://localhost:8126` に送信されます。

   別のソケット、ホスト、またはポートが必要な場合は、環境変数 `DD_TRACE_AGENT_URL` を使用します。以下にいくつかの例を示します。

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket
   ```

   トレース用の接続は、コードで構成することも可能です。

   ```python
   from ddtrace import tracer

   # Network sockets
   tracer.configure(
       https=False,
       hostname="custom-hostname",
       port="1234",
   )

   # Unix domain socket configuration
   tracer.configure(
       uds_path="/var/run/datadog/apm.socket",
   )
   ```

   同様に、トレースクライアントは Unix ドメインソケット `/var/run/datadog/dsd.socket` に統計情報を送信しようと試みます。ソケットが存在しない場合、統計情報は `http://localhost:8125` に送信されます。

   別の構成が必要な場合は、環境変数 `DD_DOGSTATSD_URL` を使用することができます。以下にいくつかの例を示します。
   ```
   DD_DOGSTATSD_URL=http://custom-hostname:1234
   DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket
   ```
   統計用の接続は、コードで構成することも可能です。

   ```python
   from ddtrace import tracer

   # Network socket
   tracer.configure(
     dogstatsd_url="http://localhost:8125",
   )

   # Unix domain socket configuration
   tracer.configure(
     dogstatsd_url="unix:///var/run/datadog/dsd.socket",
   )
   ```
{{< site-region region="us3,us5,eu,gov" >}}

4. Datadog Agent の `DD_SITE` を {{< region-param key="dd_site" code="true" >}} に設定して、Agent が正しい Datadog の場所にデータを送信するようにします。

{{< /site-region >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]ドキュメントを参照してください。


[1]: /ja/tracing/serverless_functions/
{{% /tab %}}
{{% tab "その他の環境" %}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3]、[Azure App Service][4] など、他の多くの環境で利用できます。

その他の環境については、その環境の[インテグレーション][5]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][6]ください。

[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/infrastructure/serverless/azure_app_services/#overview
[5]: /ja/integrations/
[6]: /ja/help/
{{% /tab %}}
{{< /tabs >}}

セットアップが完了し、アプリケーションでトレーサーを実行したら、`ddtrace-run --info` を実行して、構成が期待通りに動作しているかどうかを確認することができます。このコマンドの出力は、実行中にコード内で行われた構成の変更を反映しないことに注意してください。

より高度な使用方法、コンフィギュレーション、細かい制御については、Datadog の [API ドキュメント][2]を参照してください。

## コンフィギュレーション

**ddtrace-run** を使用する場合、次の[環境変数 (オプション)][5] を利用できます。

`DD_TRACE_DEBUG`
: **デフォルト**: `false`<br>
トレーサーでデバッグロギングを有効化します。

`DD_PATCH_MODULES`
: このアプリケーションの実行のためにパッチされたモジュールをオーバーライドします。次のような形式になります。 `DD_PATCH_MODULES=module:patch,module:patch...`

サービスに `env`、`service`、`version` を設定するには、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用することをおすすめします。このような環境変数の構成におすすめの方法については、[統合サービスタグ付け][6]のドキュメントをご参照ください。

`DD_ENV`
: アプリケーションの環境 (例: `prod`、`pre-prod`、`staging`) を設定します。詳細については、[環境の設定方法][7]を参照してください。バージョン 0.38 以降で利用可能。

`DD_SERVICE`
: このアプリケーションで使用するサービス名。値は、Web フレームワークのインテグレーション (例: Pylons、Flask、Django) 用のミドルウェアを設定する際にパススルーされます。Web インテグレーションを行わずにトレースする場合は、コード内でサービス名を設定する ([Django ドキュメントで例をご確認ください][8]) ことをお勧めします。バージョン 0.38 以降で利用可能。

`DD_SERVICE_MAPPING`
: サービス名のマッピングを定義し、トレース内におけるサービスの名前変更を許可します (例: `postgres:postgresql,defaultdb:postgresql`)。バージョン 0.47 以降で利用可能。

`DD_VERSION`
: アプリケーションのバージョン (例: `1.2.3`、`6c44da20`、 `2020.02.13`) を設定します。バージョン 0.38 以降で利用可能。

`DD_TRACE_SAMPLE_RATE`
: トレースボリュームコントロールを有効にします

`DD_TRACE_RATE_LIMIT`
: 1 秒あたり、Python プロセスごとにサンプリングするスパンの最大数。`DD_TRACE_SAMPLE_RATE` が設定されている場合、デフォルトは `100` です。それ以外の場合は、Datadog Agent にレート制限を委ねます。

`DD_TAGS`
: すべてのスパンとプロファイルに追加されるデフォルトタグのリスト (例: `layer:api,team:intake`)。バージョン 0.38 以降で利用可能。

`DD_TRACE_ENABLED`
: **デフォルト**: `true`<br>
Web フレームワークとライブラリインスツルメンテーションを有効にします。`false` の場合、アプリケーションコードはトレースを生成しません。

`DD_AGENT_HOST`
: **デフォルト**: `localhost`<br>
デフォルトのトレーサーがトレースの送信を試みるトレースエージェントホストの宛先アドレスをオーバーライドします。

`DD_AGENT_PORT`
: **デフォルト**: `8126`<br>
デフォルトのトレーサーがトレースを送信する宛先ポートをオーバーライドします。

`DD_TRACE_AGENT_URL`
: トレーサが送信する Trace Agent の URL です。設定された場合、これはホスト名とポートよりも優先されます。`datadog.yaml` ファイル内の `apm_config.receiver_socket` 構成、または Datadog Agent に設定された `DD_APM_RECEIVER_SOCKET` 環境変数との組み合わせで Unix Domain Sockets (UDS) をサポートします。例えば、HTTP の URL には `DD_TRACE_AGENT_URL=http://localhost:8126`、UDS の URL には `DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket` を指定します。

`DD_DOGSTATSD_URL`
: Datadog Agent for DogStatsD メトリクスへの接続に使用する URL。設定した場合、これはホスト名とポートよりも優先されます。`datadog.yaml` ファイル内の `dogstatsd_socket` 構成、または Datadog Agent に設定された `DD_DOGSTATSD_SOCKET` 環境変数との組み合わせで Unix Domain Sockets (UDS) をサポートします。例えば、UDP の URL には `DD_DOGSTATSD_URL=udp://localhost:8126`、UDS の URL には `DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket` を指定します。

`DD_DOGSTATSD_HOST`
: **デフォルト**: `localhost`<br>
デフォルトのトレーサーが DogStatsD のメトリクスを送信しようとするトレース Agent ホストのアドレスをオーバーライドします。`DD_DOGSTATSD_HOST` をオーバーライドするには、 `DD_AGENT_HOST` を使用します。

`DD_DOGSTATSD_PORT`
: **デフォルト**: `8126`<br>
デフォルトのトレーサーが DogStatsD のメトリクスを送信するポートをオーバーライドします。

`DD_LOGS_INJECTION`
: **デフォルト**: `false`<br>
[ログとトレースの挿入を接続する][9]を有効にします。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/docs
[3]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[4]: https://ddtrace.readthedocs.io/en/stable/release_notes.html#v1-0-0
[5]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[6]: /ja/getting_started/tagging/unified_service_tagging
[7]: /ja/tracing/guide/setting_primary_tags_to_scope/
[8]: https://ddtrace.readthedocs.io/en/stable/integrations.html#django
[9]: /ja/tracing/connect_logs_and_traces/python/