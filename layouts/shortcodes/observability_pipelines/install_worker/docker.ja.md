1. [**Select API key**] をクリックして、使用する Datadog API キーを選択します。
1. UI に表示されるコマンドを実行して、Worker をインストールします。コマンドには、以前に入力した環境変数が自動的に設定されます。
   ```shell
   docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
       -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
       -e DD_SITE=<DATADOG_SITE> \
       -e <SOURCE_ENV_VARIABLE> \
       -e <DESTINATION_ENV_VARIABLE> \
       -p 8088:8088 \
       datadog/observability-pipelines-worker run
   ```
   
   **注**: デフォルトでは、`docker run` コマンドは Worker がリッスンしているポートを公開します。Worker のコンテナポートを Docker ホストの異なるポートにマッピングする場合は、コマンドの `-p | --publish` オプションを使用します。
   ```
   -p 8282:8088 datadog/observability-pipelines-worker run
   ```
1. Observability Pipelines のインストールページに戻り、[**Deploy**] をクリックします。

パイプラインのンフィギュレーションを変更する場合は、[Update Existing Pipelines][8001]を参照してください。

[8001]: /observability_pipelines/update_existing_pipelines
