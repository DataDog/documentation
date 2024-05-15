---
further_reading:
- link: /data_jobs
  tag: ドキュメント
  text: Data Jobs Monitoring
kind: ドキュメント
title: Databricks の Data Jobs Monitoring を有効にする
---

{{< callout url="https://forms.gle/PZUoEgtBsH6qM62MA" >}}
Data Jobs Monitoring は非公開ベータ版です。ウェイティングリストに参加するには、このフォームにご記入ください。
{{< /callout >}} 

[Data Jobs Monitoring][7] は、Apache Spark と Databricks のジョブのパフォーマンスと信頼性を視覚化します。

## 計画と使用

以下の手順に従って、Databricks の Data Jobs Monitoring を有効にしてください。

1. Databricks API トークンを使って [Datadog-Databricks インテグレーションを構成](#configure-the-datadog-databricks-integration)します。
1. Databricks クラスターに [Datadog Agent をインストール](#install-the-datadog-agent-on-your-databricks-clusters)します。
1. Databricks において [Datadog API キーを追加](#add-your-datadog-api-key-in-databricks)します。

### Datadog-Databricks インテグレーションの構成

1. Databricks ワークスペースで、**Settings** > **Developer** に移動します。**Access tokens** の横にある **Manage** をクリックします。
1. **Generate new token** をクリックし、コメントを入力して **Generate** をクリックします。トークンをメモしてください。
1. Datadog で、Databricks インテグレーションタイルを開きます。
1. **Configure** タブで、**Add New** をクリックします。
1. ワークスペース名、Databricks ワークスペース URL、生成した Databricks トークンを入力します。
   {{< img src="data_jobs/databricks/configure-token.png" alt="Datadog-Databricks インテグレーションタイルに、Databricks ワークスペースが表示されます。このワークスペースには、名前、URL、API トークンがあります。" style="width:100%;" >}}


### Datadog Agent を Databricks クラスターにインストールします。

以下の init スクリプトのいずれかを使用します。
- [Datadog Agent をインストールする][8]
- [ログなしで Datadog Agent をインストールする][2]

Agent を全体的にインストールするか、特定の Databricks クラスターにインストールするかを選択できます。

{{< tabs >}}
{{% tab "グローバル init (推奨)" %}}
1. Databricks で、**Settings** > **Compute** に進みます。**All purpose clusters** セクションの **Global init scripts** の横にある **Manage** をクリックします。
1. **Add** をクリックします。スクリプトに名前を付けます。次に、init スクリプトをコピーして **Script** フィールドに貼り付けます。
1. すべての新しいクラスターと再起動したクラスターでスクリプトを有効にするには、**Enabled** に切り替えます。
   {{< img src="data_jobs/databricks/toggle.png" alt="Databricks UI、管理者設定、グローバル init スクリプト。'install-datadog-Agent' というスクリプトが有効化トグルのあるリストにあります。" style="width:100%;" >}}
1. **Add** をクリックします。

{{% /tab %}}
{{% tab "特定のクラスターで" %}}
1. init スクリプトをダウンロードします。
1. Databricks のクラスター構成ページで、**Advanced options** トグルをクリックします。
1. ページ下部の **Init Scripts** タブに移動します。
   {{< img src="data_jobs/databricks/init_scripts.png" alt="Databricks UI、クラスター構成の高度なオプション、Init Scripts タブ。'Destination' ドロップダウンと 'Init script path' ファイルセレクタ。" style="width:80%;" >}}
   - **Destination** ドロップダウンで、`Workspace` を選択します。
   - **Init script path** に、init スクリプトのパスを入力します。
   - **Add** をクリックします。

{{% /tab %}}

{{< /tabs >}}

### Databricks に Datadog API キーを追加する
1. [Datadog API キー][3]を見つけます。
1. Databricks のクラスター構成ページで、**Advanced options** トグルをクリックします。
1. ページ下部の **Spark** タブに移動します。
   {{< img src="data_jobs/databricks/configure-databricks-spark-envvars-updated.png" alt="Databricks UI、クラスター構成の高度なオプション、Spark タブ。'Environment variables' というテキストボックスに、DD_API_KEYとDD_SITE の値があります。" style="width:100%;" >}}

   **Environment variables** テキストボックスで、以下の値を設定します。
    - `DD_API_KEY`: あなたの Datadog API キーです。(API キーを保存するために、Databricks の[シークレット管理][4]機能を使用することも可能です。)
    - `DD_SITE`: あなたの [Datadog サイト][5]です。

   例えば、Datadog サイトが {{< region-param key="dd_site" code="true" >}} の場合、ボックスに以下を貼り付けます。

   ```text
   DD_API_KEY=<YOUR API KEY>
   DD_SITE={{< region-param key="dd_site" code="true" >}}
   ```

   オプションとして、ここで `DD_ENV` や `DD_SERVICE` などの Datadog 環境変数を設定することもできます。
1. **Confirm** をクリックします。

## 検証

Datadog で [Data Jobs Monitoring][6] ページを表示すると、Databricks の全ジョブのリストが表示されます。

## ランタイムでのタグスパン

{{% djm-runtime-tagging %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/databricks?search=databricks
[2]: /resources/sh/data_jobs/datadog_databricks_job_monitoring_init_without_logs.sh
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.databricks.com/en/security/secrets/index.html
[5]: /ja/getting_started/site/
[6]: https://app.datadoghq.com/data-jobs/
[7]: /ja/data_jobs
[8]: /resources/sh/data_jobs/datadog_databricks_job_monitoring_init.sh