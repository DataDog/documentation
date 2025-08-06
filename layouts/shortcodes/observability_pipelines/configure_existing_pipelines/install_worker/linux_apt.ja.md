
1. **Select API key** をクリックして、使用する Datadog API キーを選択します。
1. Run the one-step command provided in the UI to re-install the Worker.

    **注**: `/etc/default/observability-pipelines-worker` で Worker が使用する環境変数は、インストール スクリプトを再実行しても更新されません。変更が必要な場合は、ファイルを手動で更新し、Worker を再起動してください。

1 行のインストールスクリプトを使用しない場合は、以下のステップバイステップの手順に従ってください。
1. 以下のコマンドを実行して、ローカルの `apt` リポジトリを更新し、最新の Worker バージョンをインストールします。
    ```shell
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```
1. Worker の環境ファイルに、キー、サイト (例えば、US1 の場合は`datadoghq.com`)、ソース、宛先の環境変数を追加します。
    ```shell
    sudo cat <<EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<DATADOG_API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<DATADOG_SITE>
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