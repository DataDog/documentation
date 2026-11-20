1. Azure AKS 用の [Helm チャートの values ファイル][701]をダウンロードします。
1. **Select API key** をクリックして、使用する Datadog API キーを選択します。
1. Datadog チャートリポジトリを Helm に追加します。
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
   すでに Datadog チャートリポジトリをお持ちの場合は、以下のコマンドを実行し、リポジトリが最新であることを確認してください。
    ```shell
    helm repo update
    ```
 1. UI で提供されるコマンドを実行して Worker をインストールします。コマンドには、先ほど入力した環境変数が自動的に入力されます。
    ```shell
    helm upgrade --install opw \
    -f azure_aks.yaml \
    --set datadog.apiKey=<DATADOG_API_KEY> \
    --set datadog.pipelineId=<PIPELINE_ID> \
    --set <SOURCE_ENV_VARIABLES> \
    --set <DESTINATION_ENV_VARIABLES> \
    --set service.ports[0].protocol=TCP,service.ports[0].port=<SERVICE_PORT>,service.ports[0].targetPort=<TARGET_PORT> \
    datadog/observability-pipelines-worker
    ```
    **注**: デフォルトでは、Kubernetes サービスは、受信ポート`<SERVICE_PORT>` を Worker がリッスンしているポート (`<TARGET_PORT>`) にマッピングします。Worker のポッドポートを Kubernetes サービスの別の受信ポートにマッピングしたい場合は、コマンドで以下の `service.ports[0].port` および `service.ports[0].targetPort` の値を使用します。
    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```
1. Observability Pipelines のインストールページに戻り、**Deploy** をクリックします。

パイプラインの構成を変更したい場合は、[既存のパイプラインの更新][702]を参照してください。

[701]: /resources/yaml/observability_pipelines/v2/setup/azure_aks.yaml
[702]: /ja/observability_pipelines/configuration/update_existing_pipelines