1. **Select API key** をクリックして、使用する Datadog API キーを選択します。
1. Run the one-step command provided in the UI to re-install the Worker.

    **Note**: The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.

1 行のインストールスクリプトを使用しない場合は、以下のステップバイステップの手順に従ってください。
1. パッケージを更新し、最新バージョンのワーカーをインストールします。
    ```shell
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```
1. ワーカーの環境ファイルに、キー、サイト (例えば、US1 の場合は`datadoghq.com`)、ソース、宛先を更新した環境変数を追加します。
    ```shell
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Worker を再起動します。
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. **Navigate Back** をクリックして、Observability Pipelines のパイプライン編集ページに戻ります。
1. **Deploy Changes** をクリックします。