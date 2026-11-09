---
aliases:
- /ja/data_jobs/airflow
description: 'Kubernetes、Amazon MWAA、およびその他のプラットフォームで OpenLineage プロバイダーを使用して、Data
  Observability: Jobs Monitoring で Apache Airflow DAG ワークフローを監視します。'
further_reading:
- link: https://www.datadoghq.com/blog/data-jobs-monitoring/
  tag: ブログ
  text: Data Jobs Monitoring を使用したデータ処理ワークロードのトラブルシューティングと最適化
- link: https://www.datadoghq.com/blog/data-observability-monitoring
  tag: ブログ
  text: Datadog を使用したデータライフサイクルの監視
- link: /data_jobs
  tag: ドキュメント
  text: 'Data Observability: Jobs Monitoring'
title: 'Apache Airflow の Data Observability: Jobs Monitoring を有効にする'
---
[Data Observability: Jobs Monitoring][1] は、Apache Airflow DAG によって実行されるワークフローのパフォーマンスと信頼性を可視化します。

## セットアップ{#setup}

Airflow プラットフォームを選択し、セットアップ手順に従ってください。

{{< tabs >}}
{{% tab "Kubernetes" %}}
### 要件 {#requirements}

* [Apache Airflow 2.7][1] 以降 (Airflow 3 を含む)
* [apache-airflow-providers-openlineage][2]

### セットアップ {#setup-1}

始めるには、以下の手順に従ってください。

1. デプロイメントで使用されている Airflow のバージョンを確認します。たとえば、Airflow イメージタグ、Helm 値、デプロイメントマニフェスト、または Airflow UI に表示されるバージョンを確認します。

2. [OpenLineage プロバイダーのバージョンリファレンス](#openlineage-provider-version-reference)と [OpenLineage プロバイダーの変更履歴](https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html)を使用して、ご使用の Airflow バージョンに対応している最新のプロバイダーリリースを確認します。

3. **Airflow スケジューラーと Airflow ワーカーの両方**向けの `openlineage` プロバイダーをインストールするには、`requirements.txt` ファイル、または Airflow の依存関係が管理されている場所でプロバイダーのバージョンを固定します。

    ```text
    apache-airflow-providers-openlineage==<PROVIDER_VERSION>
    ```

   デプロイメントで制約を使用している場合は、Airflow 制約ファイルの `apache-airflow-providers-openlineage` を同じバージョンに設定します。また、そのプロバイダーリリースで必要なすべての OpenLineage 依存関係を、[OpenLineage プロバイダーのバージョンリファレンス](#openlineage-provider-version-reference)に記載されている最小バージョンに更新します。

4. `openlineage` プロバイダーを構成します。以下の構成オプションのいずれか 1 つを選択し、環境変数を設定して、Airflow スケジューラーと Airflow ワーカーを実行する Pod でこれらを使用できるようにします。

   **オプション 1: Datadog トランスポート (推奨)**

   **要件**: `apache-airflow-providers-openlineage` バージョン 2.7.3 以降、および `openlineage-python` バージョン 1.37.0 以降が必要です。

   ```shell
   export DD_API_KEY=<DD_API_KEY>
   export DD_SITE=<DD_SITE>
   export OPENLINEAGE__TRANSPORT__TYPE=datadog
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * `<DD_API_KEY>` を有効な [Datadog API キー][4] に置き換えてください。
   * `<DD_SITE>` は、自分の Datadog サイト (例:{{< region-param key="dd_site" code="true" >}}) に置き換えてください。

   **オプション 2: Composite トランスポート**

   **要件**: `apache-airflow-providers-openlineage` バージョン 1.11.0 以降および `openlineage-python` バージョン 1.37.0 以降が必要です。

   すでに別のシステムで OpenLineage を使用しており、Datadog を送信先として追加する場合は、このオプションを使用してください。Composite トランスポートは、構成されているすべてのトランスポートにイベントを送信します。

   たとえば、HTTP トランスポートを使用して別のシステムにイベントを送信している場合は次のようになります。

   ```shell
   # Your existing HTTP transport configuration
   export OPENLINEAGE__TRANSPORT__TYPE=composite
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__TYPE=http
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__URL=<YOUR_EXISTING_URL>
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__AUTH__TYPE=api_key
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__AUTH__API_KEY=<YOUR_EXISTING_API_KEY>

   # Add Datadog as an additional transport
   export DD_API_KEY=<DD_API_KEY>
   export DD_SITE=<DD_SITE>
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__TYPE=datadog
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * `<DD_API_KEY>` を有効な [Datadog API キー][4] に置き換えてください。
   * `<DD_SITE>` は、自分の Datadog サイト (例:{{< region-param key="dd_site" code="true" >}}) に置き換えてください。
   * `<YOUR_EXISTING_URL>` と `<YOUR_EXISTING_API_KEY>` を、既存の OpenLineage トランスポート構成に置き換えてください。

   この例では、OpenLineage イベントは既存のシステムと Datadog の両方に送信されます。各トランスポートに一意の名前を付けることで (上記の例の `EXISTING` や `DATADOG` など)、複数のトランスポートを構成できます。

   **オプション 3: シンプルな構成**

   このオプションは URL ベースの構成を使用し、OpenLineage プロバイダーのすべてのバージョンで動作します。

   ```shell
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * `<DD_DATA_OBSERVABILITY_INTAKE>` を `https://data-obs-intake.` に置き換えてください{{< region-param key="dd_site" code="true" >}}。
   * `<DD_API_KEY>` を有効な [Datadog API キー][4] に置き換えてください。

   * **Airflow v2.7 または v2.8** を使用している場合は、前述の環境変数に加えて、これらの 2 つの環境変数も追加してください。これにより、`apache-airflow-providers-openlineage` v1.7 で修正された OpenLineage 構成の問題が修正されます。Airflow v2.7 および v2.8 は以前のバージョンを使用します。
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   `openlineage` プロバイダーでサポートされているその他の構成については、公式ドキュメントの [configuration-openlineage][3] を確認してください。

5. Airflow Pod の更新をトリガーし、完了するまで待ちます。

6. 必要に応じて、Data Observability: Jobs Monitoring でタスクログと DAG 実行を相関付けるためのログ収集をセットアップします。相関付けを行うには、ログディレクトリが [デフォルトのログファイル名形式][5] に従っている必要があります。

   **注:** ログの相関付けが機能できるようにするため、Airflow タスクコンテキスト属性 (DAG ID、実行 ID、タスク ID、試行回数) を構造化ファセットとして Datadog のタスクログに挿入してください。[Airflow タスクコンテキストをログに挿入する][11] を参照してください。

   `PATH_TO_AIRFLOW_LOGS` 値は標準的なデプロイメントでは `$AIRFLOW_HOME/logs` ですが、カスタマイズされているデプロイメントでは異なる可能性があります。Pod に次のアノテーションを追加します。
   ```yaml
   ad.datadoghq.com/base.logs: '[{"type": "file", "path": "PATH_TO_AIRFLOW_LOGS/*/*/*/*.log", "source": "airflow"}]'
   ```

   `"source": "airflow"` を追加すると、[Airflow インテグレーション][7]ログパイプラインによる相関付けに必要な属性を抽出できるようになります。

   これらのファイルパスは、Agent コンテナを基準とした相対パスです。ログファイルを含むディレクトリをアプリケーションコンテナと Agent コンテナの両方にマウントし、Agent がアクセスできるようにします。詳細については、[コンテナのローカルログファイルからのログ収集][9]を参照してください。

   **注**: ログ収集を使用するには、Datadog Agent が Kubernetes クラスターにすでにインストールされている必要があります。まだインストールしていない場合は、[Kubernetes のインストールドキュメント][8]を参照してください。

   Kubernetes でログ収集をセットアップするその他の方法については、[Kubernetes と Integrations の構成セクション][6]を参照してください。


[1]: https://github.com/apache/airflow/releases/tag/2.7.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[5]: https://airflow.apache.org/docs/apache-airflow/2.9.3/configurations-ref.html#log-filename-template
[6]: /ja/containers/kubernetes/integrations/?tab=annotations#configuration
[7]: /ja/integrations/airflow/?tab=containerized
[8]: /ja/containers/kubernetes/installation/?tab=datadogoperator#installation
[9]: /ja/containers/kubernetes/log/?tab=datadogoperator#from-a-container-local-log-file
[11]: /ja/data_observability/jobs_monitoring/airflow_log_context/

### 検証 {#validation}

Datadog で [[Data Observability: Jobs Monitoring][2]] ページを表示し、セットアップ後の Airflow ジョブ実行リストを確認します。

### トラブルシューティング {#troubleshooting}

OpenLineage クライアントとその子モジュールに対して以前に設定した他の環境変数とともに、`OPENLINEAGE_CLIENT_LOGGING` を `DEBUG` に設定します。これは、`openlineage` プロバイダーの構成中にトラブルシューティングを行う場合に役立ちます。

OpenLineage のセットアップの自動チェックを実行するには、[OpenLineage 検証 DAG による Airflow セットアップのトラブルシューティング][10]を参照してください。

[10]: /ja/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}

{{% tab "Amazon MWAA" %}}
### 要件 {#requirements-1}

* [Apache Airflow 2.7.0][1] 以降 (Airflow 3 を含む)
* [apache-airflow-providers-openlineage][2]

### セットアップ{#setup-2}

<div class="alert alert-info"><strong>Airflow 2.7.2、2.8.1、または 2.9.2 を使用している場合</strong>: MWAA のデフォルトの制約は、古い <code>apache-airflow-providers-openlineage</code> バージョンに固定されます。これらのバージョンには、Data Observability のエクスペリエンスを低下させる可能性のある既知の問題が含まれています。修正を含むプロバイダーバージョンにアップグレードするには、<a href="/data_observability/jobs_monitoring/airflow_mwaa_upgrade/">Amazon MWAA の OpenLineage プロバイダーを Airflow 2.7.2、2.8.1、または 2.9.2 向けにアップグレードする</a>を参照してください。</div>

始めるには、以下の手順に従ってください。

1. Amazon MWAA Airflow のバージョンを確認し、そのバージョンと互換性のある最新の OpenLineage プロバイダーリリースを選択します。

   ご使用の環境で Airflow 2.7.2、2.8.1、または 2.9.2 を実行している場合は、[MWAA アップグレードガイド][11]に従って、トランスポートを構成する前に OpenLineage プロバイダーと関連する依存関係の制約を更新します。その他の Amazon MWAA バージョンについては、[OpenLineage プロバイダーのバージョンリファレンス](#openlineage-provider-version-reference)を使用してください。

1. `requirements.txt` ファイルにプロバイダーを追加します。

    ```text
    apache-airflow-providers-openlineage
    ```

1. `openlineage` プロバイダーを構成します。最も簡単な方法は、[Amazon MWAA スタートアップスクリプト][3]で以下の環境変数を設定することです。

   ```shell
   #!/bin/sh
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   # AIRFLOW__OPENLINEAGE__NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export AIRFLOW__OPENLINEAGE__NAMESPACE=${AIRFLOW_ENV_NAME}
   ```

   * `<DD_DATA_OBSERVABILITY_INTAKE>` を `https://data-obs-intake.` に完全に置き換えてください{{< region-param key="dd_site" code="true" >}}。
   * `<DD_API_KEY>` を有効な [Datadog API キー][5] に完全に置き換えてください。
   * **Airflow v2.7 または v2.8** を使用している場合は、これらの 2 つの環境変数もスタートアップスクリプトに追加してください。これにより、`apache-airflow-providers-openlineage` v1.7 で修正された OpenLineage 構成の問題が修正されます。Airflow v2.7 および v2.8 は以前のバージョンを使用します。
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   `openlineage` プロバイダーでサポートされるその他の構成については、公式ドキュメントの [configuration-openlineage][4] を確認してください。

   Amazon MWAA の依存関係の解決は、MWAA 制約によって制御されます。互換性のある最新のプロバイダーが MWAA のデフォルトと競合する場合は、[MWAA アップグレードガイド][11]のカスタム制約パターンに従ってください。

1. 更新した `requirements.txt` と [Amazon MWAA スタートアップスクリプト][3]を、Amazon MWAA 環境用に構成された Amazon S3 フォルダーにデプロイします。

1. 必要に応じて、Jobs Monitoring でタスクログを DAG 実行に相関付けるために Log Collection をセットアップします。
   1. Amazon MWAA を構成して、[CloudWatch にログを送信][9]するように設定します。
   2. [Datadog にログを送信します][10]。

[1]: https://github.com/apache/airflow/releases/tag/2.7.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[6]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[7]: https://app.datadoghq.com/data-jobs/
[8]: https://openlineage.io/docs/integrations/airflow/
[9]: https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable
[10]: /ja/integrations/amazon_web_services/?tab=roledelegation#log-collection
[11]: /ja/data_observability/jobs_monitoring/airflow_mwaa_upgrade/

### 検証 {#validation-1}

Datadog で [[Data Observability: Jobs Monitoring][7]] ページを表示し、セットアップ後の Airflow ジョブ実行リストを確認します。

### トラブルシューティング {#troubleshooting-1}

Amazon MWAA 環境用に構成されている実行ロールに、`requirements.txt` および [Amazon MWAA スタートアップスクリプト][3]に対する適切な権限があることを確認してください。これは、自分自身の実行ロールを管理しており、それらのサポートファイルを初めて追加する場合に必要です。必要に応じて、公式ガイドの [Amazon MWAA 実行ロール][6]を参照してください。

OpenLineage クライアントとその子モジュールについては、[Amazon MWAA スタートアップスクリプト][3]で `OPENLINEAGE_CLIENT_LOGGING` を `DEBUG` に設定します。これは、`openlineage` プロバイダーの構成中にトラブルシューティングを行う場合に役立ちます。

OpenLineage のセットアップの自動チェックを実行するには、[OpenLineage 検証 DAG による Airflow セットアップのトラブルシューティング][12] を参照してください。

[12]: /ja/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}

{{% tab "Astronomer" %}}

<div class="alert alert-danger">
Astro を利用している Astronomer のお客様の場合、<a href=https://www.astronomer.io/docs/learn/airflow-openlineage#lineage-on-astro>Astro は Airflow OpenLineage プロバイダーを利用するリネージ機能を提供しています</a>。Data Observability: Jobs Monitoring は同じ OpenLineage プロバイダーを利用しており、<a href=https://openlineage.io/docs/client/python#composite>Composite</a> トランスポートを使用してトランスポートを追加します。
</div>

### 要件 {#requirements-2}

* [Astro Runtime 12.1.0+][1]
* [`apache-airflow-providers-openlineage` 1.11.0+][2]
* [`openlineage-python` 1.23.0+][8]

### セットアップ {#setup-3}

1. Astro Runtime に `apache-airflow-providers-openlineage` 1.11.0 以降および `openlineage-python` 1.23.0 以降が含まれていることを確認します。デプロイメントイメージで Airflow の依存関係を管理している場合は、トランスポートを構成する前に Dockerfile で互換性のあるバージョンを固定してください。

2. OpenLineage プロバイダーをセットアップするには、以下の環境変数を定義します。

    ```shell
    OPENLINEAGE__TRANSPORT__TYPE=composite
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__TYPE=http
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__URL=<DD_DATA_OBSERVABILITY_INTAKE>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__TYPE=api_key
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__API_KEY=<DD_API_KEY>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__COMPRESSION=gzip
    ```

    * Replace `<DD_DATA_OBSERVABILITY_INTAKE>` with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}。
    * `<DD_API_KEY>` を有効な [Datadog API キー][7] に置き換えてください。

    **Optional:**
    * Set `AIRFLOW__OPENLINEAGE__NAMESPACE` with a unique name for the `env` tag on all DAGs in the Airflow deployment. This allows Datadog to logically separate this deployment's jobs from those of other Airflow deployments.
    * Set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` for the OpenLineage client and its child modules to log at a `DEBUG` logging level. This can be useful for troubleshooting during the configuration of an OpenLineage provider.

    You can configure these variables in your Astronomer deployment using either of the following methods:

    - [From the Astro UI][5]: Navigate to your deployment settings and add the environment variables directly.
    - [In the Dockerfile][11]: Define the environment variables in your `Dockerfile` to ensure they are included during the build process.

    See the [Astronomer official guide][10] for managing environment variables for a deployment. See Apache Airflow's [OpenLineage Configuration Reference][6] for other supported configurations of the OpenLineage provider.

3. デプロイメントの更新をトリガーし、完了するまで待ちます。

[1]: https://www.astronomer.io/docs/astro/runtime-release-notes#astro-runtime-1210
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://www.astronomer.io/docs/astro/runtime-provider-reference
[4]: https://www.astronomer.io/docs/astro/cli/develop-project
[5]: https://www.astronomer.io/docs/astro/manage-env-vars#using-the-astro-ui
[6]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[8]: https://github.com/OpenLineage/OpenLineage/releases/tag/1.23.0
[9]: https://www.astronomer.io/docs/astro/runtime-provider-reference#astro-runtime-1210
[10]: https://www.astronomer.io/docs/astro/environment-variables/#management-options
[11]: https://www.astronomer.io/docs/astro/manage-env-vars#using-your-dockerfile

### 検証 {#validation-2}

Datadog で [[Data Observability: Jobs Monitoring][2]] ページを表示し、セットアップ後の Airflow ジョブ実行リストを確認します。


### トラブルシューティング {#troubleshooting-2}
OpenLineage の環境変数が Astronomer デプロイメントで正しく設定されていることを確認します。

**注**: `.env` ファイルを使用して環境変数を追加しても、変数はローカルの Airflow 環境にのみ適用されるため機能しません。

OpenLineage のセットアップの自動チェックを実行するには、[OpenLineage 検証 DAG による Airflow セットアップのトラブルシューティング][12] を参照してください。

[12]: /ja/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}
{{% tab "Google Cloud Composer" %}}
<div class="alert alert-danger">
Data Observability: Jobs Monitoring for Airflow は、現時点では <a href=https://cloud.google.com/composer/docs/composer-2/lineage-integration>Dataplex</a> データリネージとの互換性がありません。Data Observability: Jobs Monitoring 用に OpenLineage をセットアップすると、既存の Dataplex トランスポート構成がオーバーライドされます。
</div>

### 要件 {#requirements-3}

* [Cloud Composer 2][1] 以降
* [apache-airflow-providers-openlineage][2]

### セットアップ {#setup-4}

始めるには、以下の手順に従ってください。

1. Cloud Composer 環境の Airflow バージョンと OpenLineage プロバイダーのバージョンを確認します。プロバイダーのバージョンを変更する必要がある場合は、環境パッケージを変更する前に、Google Cloud Composer のパッケージ管理ガイダンスと [OpenLineage プロバイダーのバージョンリファレンス](#openlineage-provider-version-reference)を確認してください。

2. [{{< ui >}}Advanced Configuration{{< /ui >}}] タブの [{{< ui >}}Airflow configuration override{{< /ui >}}] で [{{< ui >}}Add Airflow configuration override{{< /ui >}}] をクリックし、以下の設定を行います。

   - [Section 1] に `openlineage` と入力します。
   - [Key 1] に `disabled` と入力します。
   - [Value 1] に `False` と入力して、OpenLineage が有効になっていることを確認します。

   - [Section 2] に `openlineage` と入力します。
   - [Key 2] に `transport` と入力します。
   - [Value 2] に以下を入力します。

     ```text
     {
      "type": "http",
      "url": "<DD_DATA_OBSERVABILITY_INTAKE>",
      "auth": {
         "type": "api_key",
         "api_key": "<DD_API_KEY>"
      }
     }
     ```

   * `<DD_DATA_OBSERVABILITY_INTAKE>` を `https://data-obs-intake.` に完全に置き換えてください{{< region-param key="dd_site" code="true" >}}。
   * `<DD_API_KEY>` を有効な [Datadog API キー][5] に完全に置き換えてください。

**オプション:** OpenLineage ネームスペースを構成して、Datadog の `env` タグ値を設定します。
   - [Section 3] に `openlineage` と入力します。
   - [Key 3] に `namespace` と入力します。
   - [Value 3] に Composer 環境の値 (例: prod、dev、staging、test) を入力します。
   
**注:** [Dataplex][6] が有効な場合、ネームスペースはデフォルトで Composer 環境名に設定されています。ここで OpenLineage ネームスペースを手動で設定すると、必要に応じてこのデフォルト値をオーバーライドできます。

Google Cloud Composer での `openlineage` プロバイダーのサポートされているその他の設定については、[Airflow][4] および [Composer][3] の公式ドキュメントページを確認してください。

[1]: https://cloud.google.com/composer/docs/composer-versioning-overview
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://cloud.google.com/composer/docs/airflow-configurations
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[6]: https://cloud.google.com/composer/docs/composer-2/lineage-integration
[7]: https://app.datadoghq.com/data-jobs/

### 検証 {#validation-3}

Datadog で [[Data Observability: Jobs Monitoring][7]] ページを表示し、セットアップ後の Airflow ジョブ実行リストを確認します。

### トラブルシューティング {#troubleshooting-3}

OpenLineage クライアントとその子モジュールについては、[Composer] ページの [{{< ui >}}Environment variables{{< /ui >}}] タブで `OPENLINEAGE_CLIENT_LOGGING` を `DEBUG` に設定します。これは、`openlineage` プロバイダーの構成中にトラブルシューティングを行う場合に役立ちます。

OpenLineage のセットアップの自動チェックを実行するには、[OpenLineage 検証 DAG による Airflow セットアップのトラブルシューティング][8]を参照してください。

[8]: /ja/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}
{{< /tabs >}}

## 既知の問題 {#known-issues}

Airflow 2.x では、DAG 実行やタスクを手動で失敗としてマークしても、Data Observability: Jobs Monitoring に表示されるそれらのステータスは更新されません。影響を受ける実行では、スパンの所要時間と所要時間メトリクスが不正確になる可能性があります。

## OpenLineage プロバイダーのバージョンリファレンス {#openlineage-provider-version-reference}

Data Observability: Jobs Monitoring は、Apache Airflow OpenLineage プロバイダーを使用して Airflow DAG およびタスクイベントを出力します。最適なエクスペリエンスのために、Datadog ではお使いの Airflow バージョンと互換性のある最新の OpenLineage プロバイダーバージョンを使用することを推奨しています。

**Airflow 2.11 以降 (Airflow 3 を含む)**
: **推奨されるプロバイダーバージョン**: `2.20.3`
: **依存関係の必須最小バージョン**:
: - `apache-airflow-providers-common-sql>=1.32.0`
: - `apache-airflow-providers-common-compat>=1.15.0`
: - `openlineage-integration-common>=1.47.0`
: - `openlineage-python>=1.47.0`
: - `openlineage-integration-common>=1.52.0`
: - `openlineage-python>=1.52.0`
: **注**: これは最新のプロバイダーリリースです。プロバイダー `2.20.3` には Python 3.11 以降が必要です。プロバイダー `2.9.0` 以降には Airflow 2.11 以降が必要です。

**Airflow 2.10.x**
: **推奨されるプロバイダーバージョン**: `2.8.0`
: **依存関係の必須最小バージョン**:
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.8.0`
: - `openlineage-integration-common>=1.38.0`
: - `openlineage-python>=1.38.0`
: **注**: これは Airflow 2.10 と互換性のある最新のプロバイダーリリースです。プロバイダー `2.9.0` 以降には Airflow 2.11 以降が必要です。

**Airflow 2.9.x**
: **推奨されるプロバイダーバージョン**: `2.2.0`
: **依存関係の必須最小バージョン**:
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.4.0`
: - `openlineage-integration-common>=1.31.0`
: - `openlineage-python>=1.31.0`
: **注**: これは Airflow 2.9 と互換性のある最新のプロバイダーリリースです。プロバイダー `2.3.0` 以降には Airflow 2.10 以降が必要です。

**Airflow 2.8.x**
: **推奨されるプロバイダーバージョン**: `1.14.0`
: **依存関係の必須最小バージョン**:
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.2.1`
: - `openlineage-integration-common>=1.24.2`
: - `openlineage-python>=1.24.2`
: **注**これは Airflow 2.8 と互換性のある最新のプロバイダーリリースです。プロバイダー `2.0.0` 以降には Airflow 2.9 以降が必要です。

**Airflow 2.7.x**
: **推奨されるプロバイダーバージョン**: `1.10.0`
: **依存関係の必須最小バージョン**:
: - `apache-airflow-providers-common-sql>=1.6.0`
: - `openlineage-integration-common>=1.16.0`
: - `openlineage-python>=1.16.0`
: **注**: これは Airflow 2.7 と互換性のある最新のプロバイダーリリースです。プロバイダー `1.11.0` 以降には、Airflow 2.8 以降が必要です。Airflow 2.7 および 2.8 の場合は、セットアップ手順に示されている追加の構成変数を追加してください。Amazon MWAA 2.7.2 を使用している場合は、Datadog によりパッチが適用されたホイールについて MWAA アップグレードガイドを参照してください。

プロバイダーのリリースによって、サポートされる最小 Airflow バージョンが変更されるか、必要な依存関係の制約が追加される可能性があるため、更新前に [OpenLineage プロバイダーの変更履歴](https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html)を確認してください。

## 高度な構成 {#advanced-configuration}

### dbt ジョブを Airflow タスクにリンクする {#link-your-dbt-jobs-with-airflow-tasks}

<div class="alert alert-info">以下で使用する <code>lineage_root_*</code> マクロには <code>apache-airflow-providers-openlineage</code> 2.3.0 以降が必要です。古いプロバイダーバージョン (例: Airflow 2.9.2 とプロバイダー 2.2.0) については、<a href="#backport-openlineage-lineage-macros-for-older-provider-versions">古いプロバイダーバージョン向けの OpenLineage リネージマクロのバックポート</a>を参照してください。</div>

[OpenLineage dbt インテグレーション][6]を使用して dbt テレメトリを対応する Airflow タスクに接続することで、Airflow で実行されている dbt ジョブを監視できます。

Airflow タスクと dbt ジョブ間のリンクを確認するには、以下の手順に従います。

1. `openlineage-dbt` をインストールします。仮想環境で dbt をセットアップするには、[Amazon MWAA での dbt の使用][7]を参照してください。

```shell
pip3 install openlineage-dbt>=1.39.0
```

2. dbt 呼び出しを `dbt-ol` (dbt 用の OpenLineage ラッパー) に変更します。

また、コマンドの実行中に dbt ジョブを表示するには、--consume-structured-logs フラグを追加します。

```bash
dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR
```

3. DAG ファイルで、dbt プロセスを実行する Airflow タスクに OpenLineage の親およびルート親の環境変数を設定し、dbt ジョブが Datadog 内の直近の親タスクと最外層の DAG 実行の両方にリンクされるようにします。

```python
dbt_run = BashOperator(
    task_id="dbt_run",
    dag=dag,
    bash_command=f"dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR",
    append_env=True,
    env={
        "OPENLINEAGE_PARENT_JOB_NAMESPACE": "{{ lineage_job_namespace() }}",
        "OPENLINEAGE_PARENT_JOB_NAME": "{{ lineage_job_name(task_instance) }}",
        "OPENLINEAGE_PARENT_RUN_ID": "{{ lineage_run_id(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_JOB_NAMESPACE": "{{ lineage_root_job_namespace(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_JOB_NAME": "{{ lineage_root_job_name(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_RUN_ID": "{{ lineage_root_run_id(task_instance) }}",
    },
)
```

### Spark ジョブを Airflow タスクにリンクする {#link-your-spark-jobs-with-airflow-tasks}

<div class="alert alert-info"> <code>lineage_root_*</code> マクロには <code>apache-airflow-providers-openlineage</code> 2.3.0 以降が必要です。古いプロバイダーバージョン (例: Airflow 2.9.2 とプロバイダー 2.2.0) については、<a href="#backport-openlineage-lineage-macros-for-older-provider-versions">古いプロバイダーバージョン向けの OpenLineage リネージマクロのバックポート</a>を参照してください。</div>

OpenLineage インテグレーションにより、Airflow の親ジョブ情報 (ネームスペース、ジョブ名、実行 ID) を Spark アプリケーションプロパティに自動的に注入できます。これにより、Airflow タスクと Spark ジョブの間に親子関係が作成され、両方のシステムのトラブルシューティングを 1 か所で行えるようになります。

**注**: この機能を使用するには `apache-airflow-providers-openlineage` バージョン 2.1.0 以降が必要です (Airflow 2.9 以降でサポート)。

1. **オペレーターの互換性を確認する**: [Apache Airflow OpenLineage のドキュメント][8]で、使用している Spark オペレーターがサポートされていることを確認してください。この機能は、SparkSubmitOperatorやLivyOperator などの特定のオペレーターでのみ動作します。

2. Spark ジョブが [Data Observability: Jobs Monitoring][2] からアクティブに監視されていることを確認します。

3. 以下の構成を行い、親ジョブ情報の自動注入を有効にします。

```shell
AIRFLOW__OPENLINEAGE__SPARK_INJECT_PARENT_JOB_INFO=true
```

これにより、サポートされているすべての Spark オペレーターに対して、親ジョブのプロパティが自動的に注入されます。特定のオペレーターで無効にするには、そのオペレーターに `openlineage_inject_parent_job_info=False` を設定してください。

#### サポートされていないオペレーターの親ジョブ情報を手動で注入する {#manually-inject-parent-job-information-for-unsupported-operators}

自動注入をサポートしていないオペレーター (例: AWS CLI を実行して Amazon EMR Serverless ジョブを開始する`BashOperator`) の場合は、[OpenLineage Airflow リネージマクロ][4]を使用して、親およびルート親の識別子を Spark 構成プロパティとして渡してください。

```python
from datetime import datetime

from airflow import DAG
from airflow.operators.bash import BashOperator

with DAG(
    dag_id="emr_serverless_with_openlineage_parent",
    start_date=datetime(2026, 1, 1),
    schedule_interval=None,
    catchup=False,
) as dag:

    submit = BashOperator(
        task_id="start_emr_serverless_job",
        bash_command=r"""
set -euo pipefail

aws emr-serverless start-job-run \
  --application-id <APPLICATION_ID> \
  --execution-role-arn <EXECUTION_ROLE_ARN> \
  --name <JOB_NAME> \
  --region <AWS_REGION> \
  --mode STREAMING \
  --job-driver '{"sparkSubmit": {
    "entryPoint": "<JAR_URL>",
    "entryPointArguments": ["--config-key", "<CONFIG_KEY>", "--stage", "<STAGE>"],
    "sparkSubmitParameters": "\
--conf spark.app.name=<APP_NAME> \
--conf spark.openlineage.parentJobNamespace={{ lineage_job_namespace() }} \
--conf spark.openlineage.parentJobName={{ lineage_job_name(task_instance) }} \
--conf spark.openlineage.parentRunId={{ lineage_run_id(task_instance) }} \
--conf spark.openlineage.rootParentJobNamespace={{ lineage_root_job_namespace(task_instance) }} \
--conf spark.openlineage.rootParentJobName={{ lineage_root_job_name(task_instance) }} \
--conf spark.openlineage.rootParentRunId={{ lineage_root_run_id(task_instance) }}\
"
  }}'
""",
    )
```

### 古いプロバイダーバージョン向けの OpenLineage リネージマクロのバックポート{#backport-openlineage-lineage-macros-for-older-provider-versions}

ルート親リンク用の最外層の DAG 識別子を出力する `lineage_root_job_namespace`、`lineage_root_job_name`、および `lineage_root_run_id` マクロが、`apache-airflow-providers-openlineage` 2.3.0 で追加されました。プロバイダーをアップグレードできない場合 (例: Airflow 2.9.2 上の Amazon MWAA でプロバイダー 2.2.0 が固定されている場合) は、不足しているマクロを DAG で `user_defined_macros` として定義します。

```python
from __future__ import annotations

from datetime import datetime

from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.providers.openlineage import conf as ol_conf
from airflow.providers.openlineage.plugins.adapter import OpenLineageAdapter


def _logical_date(ti):
    return getattr(ti, "logical_date", None) or ti.execution_date


def _clear_number(ti) -> int:
    return ti.get_dagrun().clear_number


def _root_from_conf(ti, key):
    ol = (ti.get_dagrun().conf or {}).get("openlineage") or {}
    return ol.get(key) or None


def lineage_job_namespace():
    return ol_conf.namespace()


def lineage_job_name(ti):
    return f"{ti.dag_id}.{ti.task_id}"


def lineage_run_id(ti):
    return OpenLineageAdapter.build_task_instance_run_id(
        dag_id=ti.dag_id,
        task_id=ti.task_id,
        try_number=ti.try_number,
        logical_date=_logical_date(ti),
        map_index=ti.map_index,
    )


def lineage_root_job_namespace(ti):
    return _root_from_conf(ti, "rootParentJobNamespace") or ol_conf.namespace()


def lineage_root_job_name(ti):
    return _root_from_conf(ti, "rootParentJobName") or ti.dag_id


def lineage_root_run_id(ti):
    forwarded = _root_from_conf(ti, "rootParentRunId")
    if forwarded:
        return forwarded
    return OpenLineageAdapter.build_dag_run_id(
        dag_id=ti.dag_id,
        logical_date=_logical_date(ti),
        clear_number=_clear_number(ti),
    )


OL_MACROS = {
    "lineage_job_namespace": lineage_job_namespace,
    "lineage_job_name": lineage_job_name,
    "lineage_run_id": lineage_run_id,
    "lineage_root_job_namespace": lineage_root_job_namespace,
    "lineage_root_job_name": lineage_root_job_name,
    "lineage_root_run_id": lineage_root_run_id,
}


with DAG(
    dag_id="<YOUR_DAG_ID>",
    start_date=datetime(2026, 1, 1),
    schedule_interval=None,
    catchup=False,
    user_defined_macros=OL_MACROS,
) as dag:
    submit = BashOperator(
        task_id="<YOUR_TASK_ID>",
        bash_command="...",
    )
```

DAG で `user_defined_macros` が設定されている場合、タスクテンプレート内の `{{ lineage_*() }}` and `{{ lineage_root_*() }}`呼び出しが、プロバイダー 2.3.0 以降に付属する組み込みマクロと一致する値に解決されるため、ダウンストリームの Spark ジョブや dbt ジョブは Datadog で Airflow のルート親にリンクできます。

### 特定の DAG を Jobs Monitoring から除外する {#exclude-specific-dags-from-jobs-monitoring}

<div class="alert alert-info"> <code>emission_policy</code> 構成には <code>apache-airflow-providers-openlineage</code> 2.19.0 以降 (Airflow 2.11 以降を必要とする) が必要です。</div>

特定の DAG が Datadog に OpenLineage イベントを送信しないようにするには、各 DAG の `emission_policy` ルールを Airflow 構成の `[openlineage]` セクションに追加します。

```ini
[openlineage]
emission_policy = [{"scope": {"dag_id": "<YOUR_DAG_ID>"}, "controls": {"emit": false}}]
```

`<YOUR_DAG_ID>`を、除外する DAG の ID に置き換えてください。

命名パターンを共有する複数の DAG を除外するには、`match_mode` を `regex` に設定します。

```ini
[openlineage]
emission_policy = [{"scope": {"dag_id": "^staging_.*"}, "match_mode": "regex", "controls": {"emit": false}}]
```

`emission_policy` は、Airflow 構成のオーバーライドや `AIRFLOW__OPENLINEAGE__EMISSION_POLICY` 環境変数など、プラットフォームの他の OpenLineage プロバイダーオプションの設定と同じ方法で設定してください。変更を適用するには、Airflow スケジューラーとワーカーを再起動します。

追加のスコープと制御については、[OpenLineage の送信ポリシーに関するドキュメント][9]を参照してください。


## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_jobs
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[5]: https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/_api/airflow/providers/apache/spark/operators/spark_submit/index.html#airflow.providers.apache.spark.operators.spark_submit.SparkSubmitOperator
[6]: https://openlineage.io/docs/integrations/dbt/
[7]: https://docs.aws.amazon.com/mwaa/latest/userguide/samples-dbt.html
[8]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/spark.html#automatic-injection
[9]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/emission_policy.html