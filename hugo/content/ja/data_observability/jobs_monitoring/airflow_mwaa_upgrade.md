---
description: Amazon MWAA Airflow 2.7.2、2.8.1、または 2.9.2 で apache-airflow-providers-openlineage
  をインストールする際の依存関係の競合を解決します。
further_reading:
- link: /data_observability/jobs_monitoring/airflow/?tab=amazonmwaa
  tag: ドキュメント
  text: 'Apache Airflow の Data Observability: Jobs Monitoring を有効にする'
title: Amazon MWAA の OpenLineage プロバイダーを Airflow 2.7.2、2.8.1、または 2.9.2 向けにアップグレードする
---
## 概要{#overview}

お使いの Amazon MWAA 環境で Airflow `2.7.2`、`2.8.1`、または `2.9.2` が実行されている場合に、このガイドを使用してください。

これらの Airflow バージョンでは、MWAA のデフォルトの制約により、古い `apache-airflow-providers-openlineage` および OpenLineage パッケージのバージョンが固定されています。これらのバージョンは、既知の信頼性および互換性の問題を引き起こす可能性があり、Data Observability のエクスペリエンスを低下させるおそれがあります。

これらの修正を含むプロバイダーバージョンを使用するには、制約と要件を一緒に更新してください。Amazon MWAA は各 Airflow および Python バージョンに対してパッケージの制約を適用するため、カスタム制約を提供しない場合、OpenLineage パッケージのアップグレードが MWAA のデフォルト設定と競合する可能性があります。

MWAA の依存関係と制約の動作の詳細については、[Python の依存関係][3]に関する AWS ドキュメントを参照してください。プロバイダーの互換性と要件を確認するには、[OpenLineage プロバイダーのドキュメント][4]を参照してください。

基本的なセットアップ手順については、「[Apache Airflow の Data Observability: Jobs Monitoring を有効にする][1]」を参照してください。

## その他の MWAA バージョンの場合 {#for-other-mwaa-versions}

お使いの MWAA 環境で実行されている Airflow バージョンがこのガイドに記載されていない場合、Datadog では、お使いの Airflow バージョンと互換性のある最新の `apache-airflow-providers-openlineage` リリースを使用することを推奨しています。[Airflow OpenLineage プロバイダーの互換性テーブル][8]を使用してそのリリースを選択し、同じ制約パターンに従ってください。

1. お使いの Airflow および Python バージョンに対応する MWAA 制約ファイルをダウンロードします。
2. OpenLineage プロバイダーの固定と、必要な OpenLineage 依存関係の固定を `constraints.txt` で更新します。
3. 同じバージョンを `requirements.txt` で固定します。
4. 両方のファイルを MWAA S3 バケットにアップロードし、MWAA 環境を更新します。

Datadog では、お使いの Airflow バージョンで利用可能な最新の互換性のあるプロバイダーリリースを使用することを推奨しています。プロバイダーのリリースによって、サポートされる最小 Airflow バージョンや必要な依存関係のバージョンが変更される可能性があるため、更新前に [OpenLineage プロバイダーの変更履歴][9]を確認してください。

## 要件 {#requirements}

- MWAA 環境用に構成された Amazon S3 バケットへのアクセス権
- `requirements.txt` および MWAA 環境構成の更新権限

## 推奨バージョン {#recommended-versions}

次の表に、MWAA 制約によって固定されたデフォルトバージョンと、各 Airflow バージョンの推奨アップグレードバージョンを示します。

| パッケージ | Airflow 2.7.2 | Airflow 2.8.1 | Airflow 2.9.2 |
|---|---|---|---|
| `apache-airflow-providers-openlineage` | デフォルト: 1.1.0 <br/> アップグレード: **1.14.0** - [Datadog パッチ適用済みホイール][6] | デフォルト: 1.4.0 <br/> アップグレード: **1.14.0** | デフォルト: 1.8.0  <br/> アップグレード:**2.2.0** |
| `apache-airflow-providers-common-sql` | デフォルト: 1.7.2 <br/> アップグレード: 変更なし | デフォルト: 1.10.0 <br/> アップグレード: **1.20.0** | デフォルト: 1.14.0 <br/> アップグレード: **1.21.0** |
| `apache-airflow-providers-common-compat` | デフォルト: なし <br/> アップグレード: **1.2.2** - [Datadog パッチ適用済みホイール][7] | デフォルト: なし <br/> アップグレード: **1.2.1** | デフォルト: なし <br/> アップグレード: **1.4.0** |
| `openlineage-integration-common` | デフォルト: 1.3.1 <br/> アップグレード: **1.24.2** | デフォルト: 1.7.0 <br/> アップグレード: **1.24.2** | デフォルト: 1.16.0 <br/> アップグレード: **1.31.0** |
| `openlineage-python` | デフォルト: 1.3.1 <br/> アップグレード: **1.24.2** | デフォルト: 1.7.0 <br/> アップグレード: **1.24.2** | デフォルト: 1.16.0 <br/> アップグレード: **1.31.0** |
| `openlineage-sql` | デフォルト: 1.3.1 <br/> アップグレード: **1.24.2** | デフォルト: 1.7.0 <br/> アップグレード: **1.24.2** | デフォルト: 1.16.0 <br/> アップグレード: **1.31.0** |

## 制約と要件を更新する {#update-constraints-and-requirements}

{{< tabs >}}
{{% tab "Airflow 2.7.2" %}}

Airflow 2.7.2 には、アップストリームの `apache-airflow-providers-openlineage` 1.14.0 パッケージとの互換性がありません。Datadog は、MWAA 2.7.2 で使用するために、Airflow のバージョン制約を緩和したプロバイダーおよび `common-compat` パッケージのパッチ適用済みバージョンを提供しています。

1. パッチ適用済みのホイールファイルをダウンロードし、MWAA S3 バケットにアップロードします。

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   curl -Lo apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl \
     "https://docs.datadoghq.com/resources/whl/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl"
   curl -Lo apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl \
     "https://docs.datadoghq.com/resources/whl/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl"
   aws s3 cp apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl "s3://${MWAA_BUCKET}/dags/"
   aws s3 cp apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl "s3://${MWAA_BUCKET}/dags/"
   ```

2. Airflow 制約ファイルをダウンロードします。

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.7.2/constraints-3.11.txt"
   ```

   **注**: お使いの MWAA 環境の Python バージョンを確認してください。お使いの環境で使用している Python バージョンが異なる場合は、URL の `3.11` を置き換えてください。

3. `constraints.txt` を編集し、これらのパッケージの固定を更新します。

   ```text
   apache-airflow-providers-openlineage==1.14.0
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   また、デフォルトの制約ファイルには存在しない次の行を追加してください。

   ```text
   apache-airflow-providers-common-compat==1.2.2
   ```

   `apache-airflow-providers-common-sql` を変更する必要はありません (デフォルトの `1.7.2` に互換性があります)。

4. 更新された制約ファイルを MWAA S3 バケットにアップロードします。

   ```shell
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

5. パッチ適用済みのホイールと制約を参照するように `requirements.txt` を更新します。

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   /usr/local/airflow/dags/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl
   /usr/local/airflow/dags/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

6. 更新された `requirements.txt` ファイルをアップロードします。

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.8.1" %}}

1. Airflow 制約ファイルをダウンロードします。

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.8.1/constraints-3.11.txt"
   ```

   **注**: お使いの MWAA 環境の Python バージョンを確認してください。お使いの環境で使用している Python バージョンが異なる場合は、URL の `3.11` を置き換えてください。

2. `constraints.txt` を編集し、これらのパッケージの固定を更新します。

   ```text
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   また、デフォルトの制約ファイルには存在しない次の行を追加してください。

   ```text
   apache-airflow-providers-common-compat==1.2.1
   ```

3. 更新された制約ファイルを MWAA S3 バケットにアップロードします。

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

4. 制約ファイルを参照し、アップグレードされたパッケージバージョンを固定するように `requirements.txt` を更新します。

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   apache-airflow-providers-common-compat==1.2.1
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

5. 更新された `requirements.txt` ファイルをアップロードします。

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.9.2" %}}

1. Airflow 制約ファイルをダウンロードします。

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.9.2/constraints-3.11.txt"
   ```

   **注**: お使いの MWAA 環境の Python バージョンを確認してください。お使いの環境で使用している Python バージョンが異なる場合は、URL の `3.11` を置き換えてください。

2. `constraints.txt` を編集し、これらのパッケージの固定を更新します。

   ```text
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

   また、デフォルトの制約ファイルには存在しない次の行を追加してください。

   ```text
   apache-airflow-providers-common-compat==1.4.0
   ```

3. 更新された制約ファイルを MWAA S3 バケットにアップロードします。

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

4. 制約ファイルを参照し、アップグレードされたパッケージバージョンを固定するように `requirements.txt` を更新します。

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   apache-airflow-providers-common-compat==1.4.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

5. 更新された `requirements.txt` ファイルをアップロードします。

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{< /tabs >}}

## デプロイして検証する {#deploy-and-validate}

1. MWAA コンソールで、新しい `requirements.txt` が反映されるように環境を更新します。
2. 環境の更新が完了するまで待ちます。
3. MWAA のインストールログと起動ログを確認します。依存関係リゾルバーのエラーがないことを確認します。
4. OpenLineage イベントを出力する DAG 実行をトリガーします。
5. Datadog で、[[Data Observability: Jobs Monitoring]][2] ページに実行が表示されることを確認します。

## トラブルシューティング{#troubleshooting}

- それでも依存関係が解決されない場合は、`constraints.txt` と `requirements.txt` の両方で同じパッケージバージョンが固定されていることを確認します。
- MWAA が古いバージョンをインストールする場合は、`requirements.txt` が `--constraint /usr/local/airflow/dags/constraints.txt` を指していること、およびそのファイルが S3 `dags/` パスに存在することを確認します。
- アップロードまたは読み取りが失敗する場合は、MWAA 実行ロールが必要な S3 オブジェクトにアクセスできることを確認します。詳細については、「[Amazon MWAA 実行ロール][5]」を参照してください。

## カスタムイメージを管理している場合 {#if-you-manage-a-custom-image}

チームがカスタム Airflow イメージを使用してパッケージバージョンを管理している場合は、まずイメージ定義内のパッケージバージョンを更新してから、ビルドされたイメージから `requirements.txt` を再生成し、制約と要件が一致するようにします。

[1]: /ja/data_observability/jobs_monitoring/airflow/?tab=amazonmwaa
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/connections-packages.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[5]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[6]: /ja/resources/whl/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl
[7]: /ja/resources/whl/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl
[8]: /ja/data_observability/jobs_monitoring/airflow/#openlineage-provider-compatibility
[9]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html