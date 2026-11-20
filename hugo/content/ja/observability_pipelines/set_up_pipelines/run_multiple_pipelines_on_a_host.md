---
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines/
  tag: ドキュメント
  text: パイプラインをセットアップする
- link: /observability_pipelines/environment_variables/
  tag: ドキュメント
  text: ソース、プロセッサー、コンポーネント向けの環境変数
title: 1 台のホストで複数のパイプラインを実行する
---

## 概要

1 台のホストで複数のパイプラインを動かして、異なるソースからログを送信したい場合は、追加の Worker 向けに Worker ファイルを手動で追加する必要があります。このドキュメントでは、それらの Worker を実行するために追加・修正が必要なファイルを説明します。

## 前提条件

[最初のパイプラインをセットアップする][1] を実施し、ホストに Worker をインストールしてください。

## 追加のパイプラインを作成する

同じホストで動かしたい追加の Worker 用に、[別のパイプラインをセットアップする][1] を実行します。Install ページまで進んだら、以下の手順に従ってこのパイプライン用の Worker を実行してください。

## 追加のパイプライン用の Worker を実行する

最初の Worker をインストールすると、デフォルトで次のものが用意されます。

- サービス バイナリは `/usr/bin/observability-pipelines-worker` です。
- 次のようなサービス定義ファイルが作成されます。
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
- 次のような環境ファイルが作成されます。
    {{< code-block lang="bash" filename="/etc/default/observability-pipelines-worker" >}}
    DD_API_KEY=<datadog_api_key>
    DD_SITE=<dd_site>
    DD_OP_PIPELINE_ID=<pipeline_id>
    {{< /code-block >}}
- データ ディレクトリは `/var/lib/observability-pipelines-worker` です。

### 追加の Worker を設定する

この例では、Fluent ソースを使う別のパイプラインを作成しています。このパイプライン用の Worker を設定するには、次の手順を行います。

1. `op-fluent` を用途に合ったディレクトリ名に置き換えたうえで、次のコマンドを実行して新しいデータ ディレクトリを作成します。
    ```shell
    sudo mkdir /var/lib/op-fluent
    ```
1. 次のコマンドを実行して、データ ディレクトリの所有者を `observability-pipelines-worker:observability-pipelines-worker` に変更します。あわせて `op-fluent` は自分のデータ ディレクトリ名に更新してください。
    ```
    sudo chown -R observability-pipelines-worker:observability-pipelines-worker /var/lib/op-fluent/
    ```
1. 新しい systemd サービス用の環境ファイルを作成します。たとえば `/etc/default/op-fluent` のようにし、`op-fluent` は任意のファイル名に置き換えてください。ファイル内容の例は次のとおりです。
    {{< code-block lang="bash" filename="/etc/default/op-fluent" >}}
    DD_API_KEY=<datadog_api_key>
    DD_OP_PIPELINE_ID=<pipeline_id>
    DD_SITE=<dd_site>
    <destintation_environment_variables>
    DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091
    DD_OP_DATA_DIR=/var/lib/op-fluent
    {{< /code-block >}}
    この例では次の点に注意してください。
    -  `DD_OP_DATA_DIR` は `/var/lib/op-fluent` に設定されています。`/var/lib/op-fluent` は自分のデータ ディレクトリのパスに置き換えてください。
    - `DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091` は、この例で使っている Fluent ソースに必要な環境変数です。自分のソースに対応する [環境変数][2] に置き換えてください。

    また、以下のプレースホルダーも忘れずに置き換えてください。
    - `<datadog_api_key>` は自分の [Datadog API キー][3] に置き換えます。
    - `<pipeline_id>` は、この Worker に対応する [パイプライン][1] の ID に置き換えます。
    - `<dd_site>` は自分の [Datadog サイト][4] に置き換えます。
    - `<destination_environment_variables>` は宛先に必要な [環境変数][2] に置き換えます。
1. 新しい systemd サービス エントリを作成します。たとえば `/lib/systemd/system/op-fluent.service` です。エントリ内容の例は次のとおりです。
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
    この例では次のとおりです。
    - パイプラインが Fluent ソースを使っているため、サービス名は `op-fluent` になっています。`op-fluent.service` は用途に合ったサービス名に置き換えてください。
    - `Description` は `OPW for Fluent Pipeline` です。`OPW for Fluent Pipeline` は用途に合わせた説明文に置き換えてください。
    - `EnvironmentFile` は `-/etc/default/op-fluent` に設定されています。`-/etc/default/op-fluent` は、Worker 用に作成した systemd サービスの環境変数ファイルに置き換えてください。
1. 次のコマンドを実行して systemd を再読み込みします。
    ```shell
    sudo systemctl daemon-reload
    ```
1. 次のコマンドを実行して新しいサービスを起動します。
    ```shell
    sudo systemctl enable --now op-fluent
    ```
1. 次のコマンドを実行してサービスが動作していることを確認します。
    ```shell
    sudo systemctl status op-fluent
    ```

さらに、コマンド `sudo journalctl -u op-fluent.service` を使うと、問題の切り分けに役立ちます。

## パイプラインをデプロイする

1.  追加したパイプラインの Install ページを開きます。
1.  **Deploy your pipeline** セクションに追加の Worker が検出されているはずです。**Deploy** をクリックします。

[1]: https://docs.datadoghq.com/ja/observability_pipelines/set_up_pipelines/?tab=pipelineui
[2]: https://docs.datadoghq.com/ja/observability_pipelines/environment_variables/?tab=sources
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.datadoghq.com/ja/getting_started/site/

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}