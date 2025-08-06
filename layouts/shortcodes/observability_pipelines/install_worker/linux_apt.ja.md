1. **Select API key** をクリックして、使用する Datadog API キーを選択します。
1. UI で提供されるワンステップコマンドを実行して、Worker をインストールします。

    **Note**: The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.

1 行のインストールスクリプトを使用しない場合は、以下のステップバイステップの手順に従ってください。
1. HTTPS を使用してダウンロードするための APT トランスポートを設定します。
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```
1. 以下のコマンドを実行して、システム上に Datadog の `deb` リポジトリをセットアップし、Datadog のアーカイブキーリングを作成します。
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
1. Worker の環境ファイルに、キー、サイト (例えば、US1 の場合は `datadoghq.com`)、ソース、宛先の環境変数を追加します。
    ```shell
    sudo cat <<EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<DATADOG_API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<DATADOG_SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Worker を起動します。
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

パイプラインの構成を変更したい場合は、[既存のパイプラインの更新][9001]を参照してください。

[9001]: /ja/observability_pipelines/update_existing_pipelines
