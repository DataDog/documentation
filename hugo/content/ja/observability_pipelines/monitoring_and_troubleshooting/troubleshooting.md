---
disable_toc: false
title: トラブルシューティング
---
## 概要 {#overview}

Datadog Observability Pipelines (OP) で想定外の動作が発生した場合、このガイドでよくある問題を確認すると迅速に解決できる可能性があります。引き続き問題が解決しない場合は、[Datadog サポート][1]へお問い合わせください。

## Observability Pipelines Worker の統計とログを表示 {#view-observability-pipelines-worker-stats-and-logs}

アクティブなパイプラインで実行されている Observability Pipelines Workers に関する情報を表示するには

1. [Observability Pipelines][2] に移動します。
1. パイプラインを選択します。
1. **ワーカー**タブをクリックして、ワーカーのメモリと CPU の利用率、トラフィックの統計、およびエラーを確認します。
1. ワーカーのステータスとバージョンを表示するには、**最新のデプロイメントとセットアップ**タブをクリックします。
1. ワーカーのログを表示するには、ページの右上にある歯車アイコンをクリックし、**OPW ログを表示**を選択します。ログをフィルタリングする方法の詳細については、[ログ検索構文][3]を参照してください。特定のワーカーのログを表示するには、検索クエリに `@op_worker.id:<worker_id>` を追加します。<br>**注**: Observability Pipelines Worker のログが表示されない場合は、Log Management に[ワーカーログをインデックス化している][10]ことを確認します。

## パイプラインを通じて送信されたイベントを確認してセットアップの問題を特定する {#inspect-events-sent-through-your-pipeline-to-identify-setup-issues}

 Observability Pipelines Workers にローカルアクセスできる場合は、`tap` コマンドを使用して、パイプラインのソースとプロセッサーを通じて送信された生データを表示します。

### Observability Pipelines Worker API を有効にする {#enable-the-observability-pipelines-worker-api}

 Observability Pipelines Worker API を使用すると、`tap` および `top` コマンドを使用してワーカーのプロセスとやり取りできます。[パイプラインを設定する][4]際に提供される Helm チャートを使用している場合、API はすでに有効になっています。そうでない場合は、環境変数 `DD_OP_API_ENABLED` が `/etc/observability-pipelines-worker/bootstrap.yaml` で`true` に設定されていることを確認します。詳細については、[ブートストラップオプション][5]を参照してください。これにより、API が `localhost` とポート `8686` でリッスンするように設定されます。これは `tap` の CLI で想定されているものです。

 **注**: `/health` エンドポイントを公開する方法の手順については、[ライブネスプローブとレディネスプローブを有効にする][15]を参照してください。エンドポイントが公開された後、ロードバランサーを構成して `/health` API エンドポイントを使用し、ワーカーが起動および実行していることを確認します。

### `top` を使用してコンポーネント ID を見つける {#use-top-to-find-the-component-id}

それに `tap` するには、ソースまたはプロセッサーのコンポーネント ID が必要です。`top` コマンドを使用して、`tap` したいコンポーネントの ID を見つけます。

```
observability-pipelines-worker top
```

コマンドとオプションのリストについては、[ワーカーコマンド][13]を参照してください。

### `tap` を使用してデータを表示する {#use-tap-to-see-your-data}

ワーカーと同じホスト上にいる場合、次のコマンドを実行してコンポーネントの出力を `tap` します。

```
observability-pipelines-worker tap <component_ID>
```

コンテナ化環境を使用している場合、`docker exec` または `kubectl exec` コマンドを使用してコンテナ内でシェルを起動し、上記の `tap` コマンドを実行します。

コマンドとオプションのリストについては、[ワーカーコマンド][13]を参照してください。

## デバッグログを有効にする {#enable-debug-logs}

デバッグログを表示するには、`VECTOR_LOG` 環境変数を `debug` に設定してワーカーを再起動します。例えば、Docker でワーカーを実行している場合は、`-e VECTOR_LOG=debug` を `docker run` コマンドに追加します。

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=debug \
   datadog/observability-pipelines-worker run
```

## Pod とクラスター名を使用して Kubernetes 環境でワーカーを特定する {#identify-workers-in-a-kubernetes-environment-using-pod-and-cluster-names}

{{% observability_pipelines/install_worker/pod_cluster_name_worker %}}

## ワーカーログの問題 {#worker-logs-issues}

### ログエクスプローラーにワーカーログがない {#no-worker-logs-in-log-explorer}

[ログエクスプローラー][12]にワーカーログが表示されない場合は、ログパイプラインで除外されていないことを確認します。ワーカーログは、最適な機能のために Log Management にインデックスされる必要があります。ログは、ワーカーのステータス、バージョン、エラーなどのデプロイ情報を提供し、Observability Pipelines UI に表示されます。ログは、ワーカーまたはパイプラインの問題をトラブルシューティングする上でも役立ちます。すべてのワーカーログには `source:op_worker` タグがあります。

### Observability Pipelines ログの重複 {#duplicate-observability-pipelines-logs}

[ログエクスプローラー][7]に重複した Observability Pipelines ログが表示され、Agentが Docker コンテナで実行されている場合は、`DD_CONTAINER_EXCLUDE_LOGS` 環境変数を使用して Observability Pipelines ログを除外する必要があります。Helm については、`datadog.containerExcludeLogs` を使用します。これにより、ワーカーが独自のログを Datadog に直接送信するため、重複ログが防止されます。詳細については、[Docker Log の収集][8]または [Helm の環境変数を設定する][9]を参照してください。

## ワーカーの問題とエラー {#worker-issues-and-errors}

### ワーカーの新しいバージョンをインストールする際のエラー発生 {#getting-an-error-when-installing-a-new-version-of-the-worker}

古いバージョンのワーカーが実行されているインスタンスに新しいバージョンのワーカーをインストールしようとすると、エラーが発生します。新しいバージョンのワーカーをインストールする前に、古いバージョンを[アンインストール][11]する必要があります。

### ワーカーが起動しない {#worker-is-not-starting}

ワーカーが起動しない場合、ワーカーログは Datadog に送信されておらず、トラブルシューティングのためにログエクスプローラーに表示されていません。ローカルでログを表示するには、次のコマンドを使用します。

- VM ベース環境の場合:
    ```
    sudo journalctl -u observability-pipelines-worker.service -b
    ```

- Kubernetes の場合:
    ```
    kubectl logs <pod-name>
    ```
    An example of `<pod-name>` is `opw-observability-pipelines-worker-0`.

### 証明書の検証に失敗 {#certificate-verify-failed}

`certificate verify failed` と `self-signed certificate in certificate chain` に関するエラーが表示された場合は、[TLS 証明書][16]を参照してください。Observability Pipelines は、安全でないため自己署名証明書を受け入れません。

### 組織が RC に対して有効になっていることを確認する {#ensure-your-organization-is-enabled-for-rc}

エラー `Please ensure you organization is enabled for RC` が表示された場合は、ワーカー API キーで [Remote Configuration が有効になっている][17]ことを確認します。Remote Configuration のために実装された安全対策に関する情報は、[セキュリティへの配慮][19]を参照してください。

### ワーカーがソースからログを受信していない {#the-worker-is-not-receiving-logs-from-the-source}

ソースがワーカーにログを送信するように設定されている場合、ワーカーがリッスンしているポートとソースがログを送信しているポートが同じであることを確認します。

RHEL を使用していて、1 つのポート (例: UDP/514) からワーカーがリッスンしているポート (例: UDP/1514、特権のないポート) にログを転送する必要がある場合、[`firewalld`][14] を使用してポート 514 からポート 1514 にログを転送できます。

### 接続失敗エラー {#failed-to-connect-error}

次のようなエラーが表示された場合:

```
Failed to connect to 34.44.228.240 port 80 after 56 ms: Couldn't connect to server
```

```
connect to 35.82.252.23 port 80  failed: Operation timed out
```

```
Failed to connect to ab52a1d16fxxxxxxxabd90c7526a1-1xxxx.us-west-2.elb.amazonaws.com port 80 after 225027 ms: Couldn't connect to server
```

行うべきこと:

- ソースとワーカーの間にファイアウォールがある場合、ソースとワーカーの間で選択されたポートを介してトラフィックが許可されていることを確認します。
- ワーカーと送信先の間にファイアウォールがある場合、定義されたポートを介してワーカーから送信先へのトラフィックが許可されていることを確認します。

ソースの場所から `curl` コマンドを使用して、Observability Pipelines Worker エンドポイントへの接続性をテストできます。ただし、ソースマシンへのシェルアクセスが必要です。例えば、Datadog Agent ソースがある場合、curl コマンドは次のようになります。

```
curl --location 'http://ab52a1d102c6f4a3c823axxx-xxxxx.us-west-2.elb.amazonaws.com:80/api/v2/logs' -d '{"ddsource": "my_datadog","ddtags": "env:test","hostname": "i-02a4fxxxxx","message": "hello","service": "test"}' -v
```

使用する curl コマンドは、使用しているポート、パス、およびソースからの想定されるペイロードに基づいています。

**注**: ファイアウォールを使用している場合、許可リストに追加する必要があるドメインのリストについては、[ファイアウォール許可リストにドメインを追加する][21]を参照してください。

### ファイルが多すぎるエラー {#too-many-files-error}

`Too many files` エラーが表示され、ワーカープロセスが繰り返し再起動する場合、ホストのファイル記述子制限が低いためかもしれません。Linux 環境でこの問題を解決するには、systemd サービス構成で `LimitNOFILE` を `65,536` に設定してファイル記述子制限を増やします。

## 一般的なパイプラインの問題 {#general-pipeline-issues}

### 環境変数の欠落 {#missing-environment-variable}

`Configuration is invalid. Missing environment variable $<env_var>` エラーが表示された場合、ワーカーをインストールする際に、ソース、プロセッサー、および送信先の環境変数を追加することを確認します。ソース、プロセッサー、および送信先の環境変数のリストについては、[環境変数][18]を参照してください。

## ログパイプラインの問題 {#logs-pipeline-issues}

### ログが送信先に転送されていない {#logs-are-not-getting-forwarded-to-the-destination}

`netstat -anp | find "<port_number>"` コマンドを実行して、送信先がリッスンしているポートが他のサービスによって使用されていないことを確認します。

### 送信先での遅延ログの確認 {#seeing-delayed-logs-at-the-destination}

Observability Pipelines の送信先は、下流のインテグレーションに送信する前にイベントをバッチ処理します。例えば、Amazon S3、Google Cloud Storage、Azure Storage の送信先には、900 秒のバッチタイムアウトがあります。他のバッチパラメーター (最大イベント数と最大バイト数) が 900 秒のタイムアウト内に満たされない場合、バッチは 900 秒でフラッシュされます。これは、送信先コンポーネントが下流のインテグレーションにイベントのバッチ送信に最大 15 分かかる可能性があることを意味します。

各送信先のバッチパラメーターは次のとおりです。

{{% observability_pipelines/destination_batching %}}

詳細については、[イベントバッチ処理][6]を参照してください。

## コンポーネントの問題 {#component-issues}

### クォータ状態の同期失敗エラー {#failed-to-sync-quota-state-error}

クォータプロセッサーは、Datadog 組織内のすべてのワーカーで同期されています。同期には、組織ごとに 50 ワーカーのデフォルトのレート制限があります。組織のワーカーが 50 を超える場合:
- プロセッサーは実行を続けますが、他のワーカーと正しく同期しないため、クォータ制限を超えた後にログが送信されることがあります。
- ワーカーは `Failed to sync quota state errors` を出力します。
- 組織ごとのデフォルトのワーカー数を増やしたい場合は、[サポートにお問い合わせ][20]ください。

###  タイムスタンプフィールドの変換エラー {#error-converting-timestamp-field}

Databricks (Zerobus) 送信先を使用していて、以下のようなワーカーエラーが表示された場合は、ログのタイムスタンプが文字列形式になっているかどうかを確認します。

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

ログのタイムスタンプが文字列形式で、Databricks テーブルに `TIMESTAMP` タイプとして宣言されたタイムスタンプ列がある場合、文字列タイムスタンプをタイムスタンプ形式に変換する必要があります。詳細については、[文字列タイムスタンプをタイムスタンプ形式に変換][22]を参照してください。

[1]: /ja/help/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ja/logs/explorer/search_syntax/
[4]: /ja/observability_pipelines/configuration/set_up_pipelines/#set-up-a-pipeline
[5]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[6]: /ja/observability_pipelines/destinations/#event-batching-intro
[7]: https://app.datadoghq.com/logs/
[8]: /ja/containers/docker/log/?tab=containerinstallation#linux
[9]: /ja/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables
[10]: /ja/observability_pipelines/configuration/install_the_worker/#index-your-worker-logs
[11]: /ja/observability_pipelines/install_the_worker#uninstall-the-worker
[12]: https://app.datadoghq.com/logs
[13]: /ja/observability_pipelines/configuration/install_the_worker/worker_commands/
[14]: https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/security_guide/sec-port_forwarding#sec-Adding_a_Port_to_Redirect
[15]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes
[16]: /ja/observability_pipelines/sources/#tls-certificates
[17]: https://app.datadoghq.com/organization-settings/remote-config/setup
[18]: /ja/observability_pipelines/guide/environment_variables/
[19]: /ja/remote_configuration/#security-considerations
[20]: /ja/help/
[21]: /ja/observability_pipelines/configuration/install_the_worker/#add-domains-to-firewall-allowlist
[22]: /ja/observability_pipelines/destinations/databricks#convert-string-timestamps-to-timestamp-format