<div class="alert alert-warning">RHEL および CentOS の場合、Observability Pipelines Worker はバージョン8.0 以降をサポートしています。</div>

1. [**Select API key**] をクリックして、使用する Datadog API キーを選択します。
1. UI に表示されるワンステップコマンドを実行して、Worker をインストールします。

    **注**: `/etc/default/observability-pipelines-worker` で Worker が使用する環境変数は、インストールスクリプトの後続の実行では更新されません。変更が必要な場合は、ファイルを手動で更新し、Worker を再起動してください。

1 行のインストールスクリプトを使用しない場合は、次の手順に従います。
1. 以下のコマンドを使用して、システムに Datadog `rpm` リポジトリをセットアップします。**注**: RHEL 8.1 または CentOS 8.1 を使用している場合は、以下のコンフィギュレーションの `repo_gpgcheck=1` の代わりに `repo_gpgcheck=0` を使用してください。
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
1. パッケージを更新して Workerをインストールします。
   ```shell
   sudo yum makecache
   sudo yum install observability-pipelines-worker
   ```
1. Worker の環境ファイルに、キー、サイト (例: US1 の場合は `datadoghq.com`)、ソース、宛先の環境変数を追加します。
   ```shell
   sudo cat <<-EOF > /etc/default/observability-pipelines-worker
   DD_API_KEY=<API_KEY>
   DD_OP_PIPELINE_ID=<PIPELINE_ID>
   DD_SITE=<SITE>
   <SOURCE_ENV_VARIABLES>
   <DESTINATION_ENV_VARIABLES>
   EOF
   ```
1. Worker を開始します。
   ```shell
   sudo systemctl restart observability-pipelines-worker
   ```
1. Observability Pipelines のインストールページに戻り、[**Deploy**] をクリックします。

パイプラインのコンフィギュレーションを変更する場合は、[Update Existing Pipelines][9001]を参照してください。

[9001]: /observability_pipelines/update_existing_pipelines
