1. **Select API key** をクリックして、使用する Datadog API キーを選択します。
1. UI で提供されるコマンドを実行して Worker をインストールします。コマンドには、先ほど入力した環境変数が自動的に入力されます。
    ```shell
    docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
        -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
        -e DD_SITE=<DATADOG_SITE> \
        -e <SOURCE_ENV_VARIABLE> \
        -e <DESTINATION_ENV_VARIABLE> \
        -p 8088:8088 \
        datadog/observability-pipelines-worker run
    ```   
   **注**: デフォルトでは、`docker run` コマンドは Worker がリッスンしているのと同じポートを公開します。ワーカーのコンテナポートを Docker ホストの別のポートにマッピングしたい場合は、コマンドで `-p | --publish` オプションを使用します。
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
1. Observability Pipelines のインストールページに戻り、**Deploy** をクリックします。

パイプラインの構成を変更したい場合は、[既存のパイプラインの更新][8001]を参照してください。

[8001]: /ja/observability_pipelines/update_existing_pipelines