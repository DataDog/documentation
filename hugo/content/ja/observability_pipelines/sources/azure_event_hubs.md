---
description: Kafka ソースを使用して Azure Event Hubs ログを Observability Pipelines に送信する方法を学びます。
disable_toc: false
title: Azure Event Hubs ログを Observability Pipelines に送信する
---
## 概要 {#overview}

このドキュメントでは、Kafka ソースを使用して Azure Event Hubs ログを Observability Pipelines に送信する方法について説明します。セットアップ手順には、Kafka ソース用の Azure Event Hubs のセットアップが含まれます。

- [Event Hubs 名前空間を作成する](#create-an-azure-event-hubs-namespace)
- [イベントハブ (Kafka トピック) を作成する](#create-an-event-hub-kafka-topic)
- [共有アクセスポリシーを構成する](#configure-shared-access-policy)
- [診断設定をセットアップする](#set-up-diagnostic-settings)
- [イベントハブの Kafka 互換コネクションを構成する](#configure-kafka-compatible-connection-for-the-event-hub)

Azure Event Hubs のセットアップが完了したら、[Kafka ソースを使用してパイプラインをセットアップ](#set-up-a-pipeline-with-the-kafka-source)し、Azure Event Hubs ログを Observability Pipelines に送信します。

## Kafka ソース用に Azure Event Hubs をセットアップする {#set-up-azure-event-hubs-for-the-kafka-source}

### Azure Event Hubs 名前空間を作成する {#create-an-azure-event-hubs-namespace}

1. Azure ポータルで、[[Event Hubs](https://portal.azure.com/#browse/Microsoft.EventHub%2Fnamespaces)] に移動します。
1. [**作成**] をクリックします。
1. **プロジェクトの詳細** (サブスクリプション、リソースグループ) および**インスタンスの詳細** (名前空間名、リージョン、Standard/Premium/Dedicated のティアの選択) を入力します。
1. リージョンが Azure リソースと一致していることを確認します (例: `westus`)。
1. [**確認と作成**] をクリックします。

**注**: Kafka エンドポイントは、Standard 以上のティアで自動的に有効になります。

### イベントハブ (Kafka トピック) を作成する {#create-an-event-hub-kafka-topic}

1. 作成した名前空間で [**Event Hubs**] を選択し、[**+ イベントハブ**] をクリックします。
1. 名前を入力し (例: `datadog-topic`)、設定を構成します (例: 4 つのパーティション、7 日間の保持期間)。
1. [**確認と作成**] をクリックします。このイベントハブは Kafka トピックとして機能します。

### 共有アクセスポリシーを構成する {#configure-shared-access-policy}

1. 作成したイベントハブで、[**設定**] > [**共有アクセスポリシー**] に移動します。
1. [**+ 追加**] をクリックします。
1. ポリシー名を入力します (例: `DatadogKafkaPolicy`)。
1. [**管理**] チェックボックスを選択します。これにより、[**送信**] および [**リッスン**] のチェックボックスが自動的に選択されます。
1. [**作成**] をクリックします。
1. Observability Pipelines の Kafka ソースをセットアップする際に、Kafka 認証のために**主キー**と**プライマリ接続文字列**が必要になります。

### 診断設定をセットアップする {#set-up-diagnostic-settings}

1. Azure リソース (例: VM、App Services) またはサブスクリプションレベルのアクティビティログを構成して、ログをイベントハブにストリーミングします。
1. リソースの場合:
    1. リソースに移動し、[**監視**] > [**診断設定**] の順に選択します。
    1. [**+ 診断設定を追加する**] をクリックします。
    1. 必要なログカテゴリ (例: Microsoft Entra ID の AuditLogs、SignInLogs) を選択します。
    1. [**宛先の詳細**] で:
        1. [**イベントハブへのストリーム**] ボックスにチェックを入れます。
        1. 名前空間とイベントハブ (`datadog-topic`) を選択します。
    1. [**保存**] をクリックします。
1. アクティビティログの場合:
    1. [**Microsoft Entra ID**] > [**監視**] > [**監査ログ**] > [**データ設定のエクスポート**] に移動します。
    1. [**イベントハブへのストリーム**] ボックスにチェックを入れます。
1. 各リージョンに対して繰り返します。ログは、同じリージョン内のイベントハブにストリーミングする必要があります。

### イベントハブの Kafka 互換コネクションを構成する{#configure-kafka-compatible-connection-for-the-event-hub}

Azure Event Hubs は、`NAMESPACE.servicebus.windows.net:9093` で Kafka エンドポイントを公開します。Observability Pipelines は、これを Kafka ソースとして使用します。

#### Kafka エンドポイントを取得する {#get-the-kafka-endpoint}

1. Azure ポータルで、Event Hubs 名前空間 (例: `myeventhubns`) に移動します。
1. [**概要**] ページの [**基本**] セクションで、[**ホスト名**] または [**完全修飾ドメイン名 (FQDN)**] を探します。形式は `<NAMESPACE>.servicebus.windows.net` です (例: `myeventhubns.servicebus.windows.net`)。
1. Kafka ポート `:9093` を付加して、ブートストラップサーバーの値 `<NAMESPACE>.servicebus.windows.net:9093` を作成します。
    - たとえば、名前空間が `myeventhubns` の場合、ブートストラップサーバーは `myeventhubns.servicebus.windows.net:9093` になります。
    - Observability Pipelines の Kafka ソースをセットアップする際に、この情報が必要になります。

#### 認証を設定する{#set-up-authentication}

1. Azure Event Hubs は、Kafka 認証に PLAIN メカニズムを使用した SASL_SSL を使用します。
1. 接続文字列は、Observability Pipelines 用に次のようにフォーマットされます。
    ```
    Username: $$ConnectionString
    Password: Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>
    ```

## Kafka ソースを使用してパイプラインをセットアップする{#set-up-a-pipeline-with-the-kafka-source}

プラットフォームを選択してください。

{{< tabs >}}
{{% tab "Kubernetes" %}}
1. [Observability Pipelines](https://app.datadoghq.com/observability-pipelines) に移動します。
1. Kafka ソースを選択します。
    1.  [{{< ui >}}Group ID{{< /ui >}}] (グループ ID) フィールドに、一意のコンシューマーグループを指定または作成します (例: `datadog-consumer-group`)。
    1.  [{{< ui >}}Topics{{< /ui >}}] (トピック) フィールドに、`datadog-topic`、または以前にイベントハブ用に構成したトピックを入力します。
    1.  スイッチを切り替えて SASL 認証を有効にします。
    1.  [{{< ui >}}Mechanism{{< /ui >}}] (メカニズム) ドロップダウンメニューから、[{{< ui >}}PLAIN{{< /ui >}}] を選択します。
    1.  TLS を有効にします。
        1. コンテナイメージの一部として機能する証明書を使用するように、`values.yaml` ファイルを構成します。
            ```
            initContainers:
            - name: copy-config
            image: gcr.io/datadoghq/observability-pipelines-worker:latest
            imagePullPolicy: IfNotPresent
            command: ['/bin/sh', '-c', 'mkdir -p /config-volume/observability-pipelines-worker/config/ && cp /etc/ssl/certs/ca-certificates.crt /config-volume/observability-pipelines-worker/config/ca-certificates.crt']
            volumeMounts:
            - name: config-volume
                mountPath: /config-volume
            extraVolumes:
            - name: config-volume
            emptyDir: {}
            extraVolumeMounts:
            - name: config-volume
            mountPath: /config-volume
            ```
            **Note**: When install the Worker with the install command you need to add:
            ```
            --set env[0].name=DD_OP_DATA_DIR,env[0].value='/config-volume/observability-pipelines-worker/'
            ```
        [1. In the {{< ui >}}Certificate path{{< /ui >}}] (証明書パス) フィールドに、上記の例を使用した場合は“/ca-certificates.crt”と入力します。それ以外の場合は、証明書の名前を入力します。
    {{< img src="observability_pipelines/sources/kafka_settings.png" alt="例の値を使用した Kafka ソースの設定" style="width:45%;" >}}
1. [{{< ui >}}Next: Select Destination{{< /ui >}}] (次へ: 送信先を選択) をクリックします。
1. 送信先とプロセッサを設定した後、[{{< ui >}}Next: Install{{< /ui >}}] (次へ: インストール) をクリックします。
1. [{{< ui >}}Choose your installation platform{{< /ui >}}] (インストールプラットフォームを選択) ドロップダウンメニューからプラットフォームを選択します。
1. Kafka ソースの環境変数を入力します。
    1.  [{{< ui >}}Kafka Bootstrap Servers{{< /ui >}}] (Kafka ブートストラップサーバー) には、`<NAMESPACE>.servicebus.windows.net:9093` を入力します (例: `myeventhubns.servicebus.windows.net:9093`)。
    1.  [{{< ui >}}Kafka SASL Username{{< /ui >}}] (Kafka SASL ユーザー名) には、`$$$$ConnectionString` を入力します。**注**: `$$$$` は環境に転送されると `$$` になるため、`ConnectionString` の前に `$$$$` を付ける必要があります。
    1.  [{{< ui >}}Kafka SASL Password{{< /ui >}}] (Kafka SASL パスワード) には、完全な接続文字列を入力します。(例: `Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>`)。
        - これは、イベントハブインスタンスの[共有アクセスポリシー](#configure-shared-access-policy)にある**プライマリ接続文字列**です。
    1. Kafka TLS パスフレーズを入力します。
        - これは、イベントハブインスタンスの[共有アクセスポリシー](#configure-shared-access-policy)にある**主キー**です。
    {{< img src="observability_pipelines/sources/kafka_env_vars.png" alt="Kafka 環境変数の設定例が記載されたインストールページ" style="width:60%;" >}}
1. 該当する場合は、送信先の環境変数を入力します。
1. ページに記載されている残りの手順に従い、プラットフォームに基づいて Worker をインストールします。
{{% /tab %}}
{{% tab "仮想マシン (VM)" %}}

1. [Observability Pipelines](https://app.datadoghq.com/observability-pipelines) に移動します。
1. Kafka ソースを選択します。
    1.  [{{< ui >}}Group ID{{< /ui >}}] (グループ ID) フィールドに、一意のコンシューマーグループを指定または作成します (例: `datadog-consumer-group`)。
    1.  [`datadog-topic`] (トピック) フィールドに {{< ui >}}Topics{{< /ui >}} を入力します。
    1.  スイッチを切り替えて SASL 認証を有効にします。
    1.  [{{< ui >}}Mechanism{{< /ui >}}] (メカニズム) ドロップダウンメニューから、[{{< ui >}}PLAIN{{< /ui >}}] を選択します。
    1.  TLS を有効にします。証明書については、元の場所からデフォルトの Observability Pipelines データ構成ディレクトリにコピーします。
        1. Observability Pipelines Worker はまだインストールされていないため、次のコマンドを実行して証明書用のディレクトリを作成してください。
            ```
            sudo mkdir -p /var/lib/observability-pipelines-worker/config
            ```
        1. Run this command to copy the certificate to the directory you created:
            ```
            sudo cp /etc/ssl/certs/ca-certificates.crt /var/lib/observability-pipelines-worker/config/
            ```
        [1. In the {{< ui >}}Certificate path{{< /ui >}}] (証明書パス) フィールドに、“/ca-certificates.crt”と入力します。
    {{< img src="observability_pipelines/sources/kafka_settings_vm.png" alt="例の値を使用した Kafka ソースの設定" style="width:45%;" >}}
1. [{{< ui >}}Next: Select Destination{{< /ui >}}] (次へ: 送信先を選択) をクリックします。
1. 送信先とプロセッサを設定した後、[{{< ui >}}Next: Install{{< /ui >}}] (次へ: インストール) をクリックします。
1. [{{< ui >}}Choose your installation platform{{< /ui >}}] (インストールプラットフォームを選択) ドロップダウンメニューからプラットフォームを選択します。
1. Kafka ソースの環境変数を入力します。
    1.  [{{< ui >}}Kafka Bootstrap Servers{{< /ui >}}] (Kafka ブートストラップサーバー) には、`<NAMESPACE>.servicebus.windows.net:9093` を入力します (例: `myeventhubns.servicebus.windows.net:9093`)。
    1.  [{{< ui >}}Kafka SASL Username{{< /ui >}}] (Kafka SASL ユーザー名) には、`\$\$ConnectionString` を入力します。**注**: `ConnectionString` の前の `$` をエスケープする必要があります。そうしないと、環境変数が読み込まれません。
    1.  [{{< ui >}}Kafka SASL Password{{< /ui >}}] (Kafka SASL パスワード) には、引用符 (`"`) で囲んだ完全な接続文字列を入力します。(例: `"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`)。
        - これは、イベントハブインスタンスの[共有アクセスポリシー](#configure-shared-access-policy)にある**プライマリ接続文字列**です。
    1. Kafka TLS パスフレーズを入力します。
        - これは、イベントハブインスタンスの[共有アクセスポリシー](#configure-shared-access-policy)にある**主キー**です。
    {{< img src="observability_pipelines/sources/kafka_env_vars_vm.png" alt="Kafka 環境変数の設定例が記載されたインストールページ" style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## トラブルシューティング{#troubleshooting}

Worker のインストール後に問題が発生した場合は、Observability Pipelines 環境ファイル (`/etc/default/observability-pipelines-worker`) で環境変数が正しく設定されていることを確認してください。

- `DD_OP_SOURCE_KAFKA_SASL_USERNAME="$$ConnectionString"`
- `DD_OP_SOURCE_KAFKA_BOOTSTRAP_SERVERS=<NAMESPACE>.servicebus.windows.net:9093`
- `DD_OP_SOURCE_KAFKA_SASL_PASSWORD=<Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>>`
- `DD_OP_SOURCE_KAFKA_KEY_PASS=password`

### 環境変数が見つかりません {#missing-environment-variable}

エラー `Missing environment variable DD_OP_SOURCE_KAFKA_SASL_PASSWORD` が表示され、VM で Worker を実行している場合は、Worker インストールスクリプトの実行時に変数が引用符 (`"`) で囲まれていることを確認してください。以下に例を示します。

```
DD_OP_SOURCE_KAFKA_SASL_PASSWORD=`"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`
```

## ヘルスメトリクス {#health-metrics}

すべてのソースから出力される[コンポーネントメトリクス][1]および[ソースバッファメトリクス][2]については、[パイプライン使用状況メトリクス][3]のドキュメントを参照してください。ここでは Azure Event Hubs から Observability Pipelines にログを送信するために Kafka ソースを使用しているため、`component_type:kafka` タグを使用して関連するメトリクスをフィルタリングしてください。

[1]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[2]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[3]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/