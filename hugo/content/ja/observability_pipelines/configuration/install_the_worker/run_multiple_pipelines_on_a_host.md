---
aliases:
- /ja/observability_pipelines/set_up_pipelines/run_multiple_pipelines_on_a_host/
description: 単一のホスト上で異なるパイプライン向けに複数の Observability Pipelines Workers を実行するために追加および変更が必要な
  Worker ファイルについて説明します。
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: ドキュメント
  text: パイプラインをセットアップする
- link: /observability_pipelines/guide/environment_variables/
  tag: ドキュメント
  text: ソース、プロセッサー、およびコンポーネントの環境変数
title: ホストで複数のパイプラインを実行する
---
## 概要 {#overview}

単一のホスト上で複数のパイプラインを実行して異なるソースからログやメトリクスを送信したい場合は、追加の Worker ごとに Worker ファイルを手動で追加する必要があります。このドキュメントでは、それらの Worker を実行するために追加および変更が必要なファイルについて説明します。

## 前提条件 {#prerequisites}

[最初のパイプラインをセットアップ][1] し、ホストに Worker をインストールします。

## 追加のパイプラインを作成する {#create-an-additional-pipeline}

同じホスト上で実行する追加の Worker 向けに、[別のパイプラインをセットアップ][1] します。インストールページに到達したら、以下の手順に従ってこのパイプラインの Worker を実行します。

## 追加のパイプラインの Worker を実行する {#run-the-worker-for-the-additional-pipeline}

最初の Worker をインストールした際、デフォルトで以下が作成されています。

- サービスバイナリ: `/usr/bin/observability-pipelines-worker`
- 次のようなサービス定義ファイル:
    {{< code-block lang="bash" filename="/lib/systemd/system/observability-pipelines-worker.service" >}}
    [Unit]
    Description="Observability Pipelines Worker"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Service]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/observability-pipelines-worker

    [Install]
    WantedBy=multi-user.target
    {{< /code-block >}}
- 次のような環境ファイル:
    {{< code-block lang="bash" filename="/etc/default/observability-pipelines-worker" >}}
    DD_API_KEY=<datadog_api_key>
    DD_SITE=<dd_site>
    DD_OP_PIPELINE_ID=<pipeline_id>
    {{< /code-block >}}
- データディレクトリ: `/var/lib/observability-pipelines-worker`

### 追加の Worker を構成する {#configure-the-additional-worker}

この例では、Fluent ソースを使用して別のパイプラインが作成されました。このパイプラインの Worker を構成するには、以下の手順を実行します。

1. 以下のコマンドを実行して新しいデータディレクトリを作成します。その際、使用するユースケースに適したディレクトリ名に `op-fluent` を置き換えてください。
    ```shell
    sudo mkdir /var/lib/op-fluent
    ```
1. 以下のコマンドを実行して、データディレクトリの所有者を `observability-pipelines-worker:observability-pipelines-worker` に変更します。`op-fluent` をデータディレクトリ名に更新してください。
    ```
    sudo chown -R observability-pipelines-worker:observability-pipelines-worker /var/lib/op-fluent/
    ```
1. 新しい systemd サービス用の環境ファイルを作成します (例: `/etc/default/op-fluent`)。`op-fluent` は特定のファイル名に置き換えてください。ファイルの内容の例:
    {{< code-block lang="bash" filename="/etc/default/op-fluent" >}}
    DD_API_KEY=<datadog_api_key>
    DD_OP_PIPELINE_ID=<pipeline_id>
    DD_SITE=<dd_site>
    <destintation_environment_variables>
    DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091
    DD_OP_DATA_DIR=/var/lib/op-fluent
    {{< /code-block >}}
    この例では、
    -  `DD_OP_DATA_DIR` は `/var/lib/op-fluent` に設定されています。`/var/lib/op-fluent` をデータディレクトリへのパスに置き換えます。
    - `DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091` は、この例の Fluent ソースに必要な環境変数です。これをソースの [環境変数][2] に置き換えます。
    
    また、以下を必ず置き換えてください。
    - `<datadog_api_key>` をユーザーの [Datadog API キー][3] に置き換えます。
    - `<pipeline_id>` をこの Worker の [パイプライン][1] の ID に置き換えます。
    - `<dd_site>` をユーザーの [Datadog サイト][4] に置き換えます。
    - `<destination_environment_variables>` を送信先の [環境変数][2] に置き換えます。
1. 新しい systemd サービスエントリーを作成します (例: `/lib/systemd/system/op-fluent.service`)。エントリーの内容の例:
    {{< code-block lang="bash" filename="/lib/systemd/system/op-fluent.service" >}}
    [Unit]
    Description="OPW for Fluent Pipeline"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Service]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/op-fluent

    [Install]
    WantedBy=multi-user.target
    {{< /code-block >}}
    この例では、
    - パイプラインで Fluent ソースを使用しているため、サービス名は `op-fluent` となります。`op-fluent.service` をユースケースに適したサービス名に置き換えます。
    - `Description` は `OPW for Fluent Pipeline` です。`OPW for Fluent Pipeline` をユースケースに適した説明に置き換えます。
    - `EnvironmentFile` は `-/etc/default/op-fluent` に設定されています。`-/etc/default/op-fluent` を Worker 用に作成した systemd サービス環境変数ファイルに置き換えます。
1. このコマンドを実行して systemd をリロードします。
    ```shell
    sudo systemctl daemon-reload
    ```
1. このコマンドを実行して新しいサービスを開始します。
    ```shell
    sudo systemctl enable --now op-fluent
    ```
1. このコマンドを実行してサービスが実行されていることを確認します。
    ```shell
    sudo systemctl status op-fluent
    ```

さらに、コマンド `sudo journalctl -u op-fluent.service` を使用して問題をデバッグすることもできます。

## パイプラインをデプロイする {#deploy-the-pipeline}

1.  追加のパイプラインのインストールページに移動します。
1.  {{< ui >}}Deploy your pipeline{{< /ui >}} セクションで、追加の Worker が検出されていることを確認できるはずです。{{< ui >}}Deploy{{< /ui >}} をクリックします。

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/?tab=pipelineui
[2]: /ja/observability_pipelines/guide/environment_variables/?tab=sources
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ja/getting_started/site/

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}