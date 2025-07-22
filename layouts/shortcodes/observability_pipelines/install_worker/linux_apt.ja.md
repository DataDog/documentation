1. [**Select API key**] をクリックして、使用する Datadog API キーを選択します。
1. UI に表示されるワンステップコマンドを実行して、Worker をインストールします。

    **注**: `/etc/default/observability-pipelines-worker` で Worker が使用する環境変数は、インストールスクリプトの後続の実行では更新されません。変更が必要な場合は、ファイルを手動で更新し、Worker を再起動してください。

1 行のインストールスクリプトを使用しない場合は、次の手順に従います。
1. HTTPS を使用してダウンロードするための APT トランスポートを設定します。
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. 以下のコマンドを実行して、システムに Datadog `deb` リポジトリをセットアップし、Datadog のアーカイブキーリングを作成します。
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-2' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
1. 以下のコマンドを実行して、ローカルの `apt` リポジトリを更新し、Worker をインストールします。
   ```shell
   sudo apt-get update
   sudo apt-get install observability-pipelines-worker datadog-signing-keys
   ```
1. Worker の環境ファイルに、キー、サイト (例: US1 の場合は `datadoghq.com`)、ソース、宛先の環境変数を追加します。
   ```shell
   sudo cat <<EOF > /etc/default/observability-pipelines-worker
   DD_API_KEY=<DATADOG_API_KEY>
   DD_OP_PIPELINE_ID=<PIPELINE_ID>
   DD_SITE=<DATADOG_SITE>
   <SOURCE_ENV_VARIABLES>
   <DESTINATION_ENV_VARIABLES>
   EOF
   ```
1. Worker を開始します。
   ```
   sudo systemctl restart observability-pipelines-worker
   ```

パイプラインのコンフィギュレーションを変更する場合は、[Update Existing Pipelines][9001]を参照してください。

[9001]: /observability_pipelines/update_existing_pipelines
