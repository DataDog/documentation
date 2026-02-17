<div class="alert alert-danger">For RHEL and CentOS, the Observability Pipelines Worker supports versions 8.0 or later.</div>

1. **Select API key** をクリックして、使用する Datadog API キーを選択します。
1. UI で提供されるワンステップコマンドを実行して、Worker をインストールします。

    **Note**: The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.

1 行のインストールスクリプトを使用しない場合は、以下のステップバイステップの手順に従ってください。
1. 下記のコマンドを実行して、システム上に Datadog `rpm` リポジトリをセットアップします。**注**: RHEL 8.1 または CentOS 8.1 を使用している場合は、下記の構成で `repo_gpgcheck=1` の代わりに `repo_gpgcheck=0` を使用してください。
    ```shell
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-2/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
        https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
    EOF
    ```
1. パッケージを更新し、Worker をインストールします。
    ```shell
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```
1. Worker の環境ファイルに、キー、サイト (例えば、US1 の場合は `datadoghq.com`)、ソース、宛先の環境変数を追加します。
    ```shell
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Worker を起動します。
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. Observability Pipelines のインストールページに戻り、**Deploy** をクリックします。

パイプラインの構成を変更したい場合は、[既存のパイプラインの更新][9001]を参照してください。

[9001]: /ja/observability_pipelines/update_existing_pipelines