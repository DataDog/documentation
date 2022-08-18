---
aliases:
- /ja/tracing/python/
- /ja/tracing/languages/python/
- /ja/agent/apm/python/
- /ja/tracing/setup/python
- /ja/tracing/setup_overview/python
- /ja/tracing/setup_overview/setup/python
code_lang: python
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: GitHub
  text: ソースコード
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: Pypi
  text: API ドキュメント
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
- link: tracing/
  tag: 高度な使用方法
  text: 高度な使用方法
kind: documentation
title: Python アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件
最新の Python トレーサーは、CPython バージョン 2.7 と 3.5-3.10 に対応しています。

Datadog の Python バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]ページをご覧ください。

## インストールと利用開始

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][2]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中に Continuous Profiler、トレースの 100% の取り込み、およびトレース ID 挿入を有効にします。

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
   DD_DOGSTATSD_URL=udp://custom-hostname:1234
   DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket
   ```
   統計用の接続は、コードで構成することも可能です。

   ```python
   from ddtrace import tracer

   # Network socket
   tracer.configure(
     dogstatsd_url="udp://localhost:8125",
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

### アプリケーションのインスツルメンテーション

Agent をインストールしたら、Python で記述されたアプリケーションのトレースを開始するには、Datadog トレーシングライブラリ `ddtrace` を、pip を使用してインストールします。

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

セットアップが完了し、アプリケーションでトレーサーを実行したら、`ddtrace-run --info` を実行して、構成が期待通りに動作しているかどうかを確認することができます。このコマンドの出力は、実行中にコード内で行われた構成の変更を反映しないことに注意してください。

## コンフィギュレーション

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][5]を参照してください。

### v1 へのアップグレード

ddtrace v1 にアップグレードする場合は、ライブラリドキュメントの[アップグレードガイド][3]と[リリースノート][4]で詳細を確認してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/docs
[3]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[4]: https://ddtrace.readthedocs.io/en/stable/release_notes.html#v1-0-0
[5]: /ja/tracing/trace_collection/library_config/python/