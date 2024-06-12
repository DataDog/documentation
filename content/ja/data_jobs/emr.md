---
further_reading:
- link: /data_jobs
  tag: ドキュメント
  text: Data Jobs Monitoring
kind: ドキュメント
title: Amazon EMR で Spark の Data Jobs Monitoring を有効にする
---

{{< callout url="https://forms.gle/PZUoEgtBsH6qM62MA" >}}
Data Jobs Monitoring は非公開ベータ版です。ウェイティングリストに参加するには、このフォームにご記入ください。
{{< /callout >}} 

[Data Jobs Monitoring][9] は、Amazon EMR 上の Apache Spark アプリケーションのパフォーマンスと信頼性を視覚化します。

## 計画と使用

以下の手順に従って、Amazon EMR の Data Jobs Monitoring を有効にしてください。

1. AWS Secrets Manager に [Datadog API キーを保存](#store-your-datadog-api-key-in-aws-secrets-manager)します。
1. [EMR クラスターを作成および構成](#create-and-configure-your-emr-cluster)します。
1. [EMR EC2 インスタンスプロファイルへの API アクセスを許可](#grant-api-access-to-your-emr-ec2-instance-profile)します。
1. [Spark アプリケーションごとにサービスタグ付けを指定](#specify-service-tagging-per-spark-application)します。

### AWS Secrets Manager に Datadog API キーを保存する
1. [Datadog API キー][1]をメモします。
1. [AWS Secrets Manager][2] で、**Store a new secret** を選択します。
   - **Secret type** で、**Other type of secret** を選択します。
   - **Key/value pairs** の下に、Datadog API キーをキーと値のペアとして追加します。ここで、キーは `dd_api_key` です。
      {{< img src="data_jobs/emr/key_value.png" alt="AWS Secrets Manager の「Store a new secret」。'Key/value pairs' というセクション。左側には、'dd_api_key' を含むテキストボックス。右側には、削除された API キーを含むテキストボックス。" style="width:80%;" >}}
   - その後、**Next** をクリックします。
1. **Configure secret** ページで、**Secret name** を入力します。`datadog/dd_api_key`を使用できます。次に、**Next** をクリックします。
1. **Configure rotation** ページでは、オプションで[自動回転][3]をオンにすることができます。次に、**Next** をクリックします。
1. **Review** ページで、シークレットの詳細を確認します。次に、**Store** をクリックします。
1. AWS Secrets Manager で、作成したシークレットを開きます。**Secret ARN** をメモします。

### EMR クラスターの作成と構成

[Amazon EMR コンソール][4]で新しい EMR クラスターを作成する際、**Create Cluster** ページにブートストラップアクションを追加します。

1. [この init スクリプト][6]を EMR クラスターが読み込める S3 バケットに保存します。このスクリプトへのパスをメモします。
1. **Create Cluster** ページで、**Bootstrap actions** セクションを見つけます。**Add** をクリックして、**Add bootstrap action** ダイアログを表示します。
   {{< img src="data_jobs/emr/add_bootstrap_action.png" alt="Amazon EMR コンソール、Create Cluster、Add Bootstrap Action ダイアログ。名前、スクリプトの場所、引数のテキストフィールド。" style="width:80%;" >}}
   - **Name** には、ブートストラップアクションの名前を指定します。`datadog_agent` を使うことができます。
   - **Script location** には、init スクリプトを S3 に保存した場所へのパスを入力します。
   - **Arguments** には、Datadog サイトと、Datadog API キーを保存したシークレットの名前の 2 つの引数をスペースで区切って入力します。
      例:
      ```text
      {{< region-param key="dd_site" code="true" >}} datadog/dd_api_key
      ```
   - **Add bootstrap action** をクリックします。

クラスターが作成されると、このブートストラップアクションによって Datadog Agent がインストールされ、クラスターの各ノードに Java トレーサーがダウンロードされます。

### EMR EC2 インスタンスプロファイルに API アクセスを許可する

1. [Amazon EMR コンソール][4]で、新しく作成したクラスターのサマリーページを開きます。クラスターの **IAM role for instance profile** をメモします。

   また、この値を調べるには、以下を実行します。
   ```shell
   aws emr describe-cluster --cluster-id <YOUR_CLUSTER_ID>
   ```
   出力から `Ec2InstanceAttributes.IamInstanceProfile` を探します。
1. [AWS IAM コンソール][5]で、左のナビゲーションバーにある **Access management** > **Roles** をクリックします。
1. 前のステップで見たインスタンスプロファイルをクリックします。
1. 次のページの **Permissions** タブで、**Permissions policies** セクションを見つけます。**Add permissions** > **Create inline policy** をクリックします。
1. **Specify permissions** ページで、**Select a service** セクションを見つけます。**Service** で、**Secrets Manager** を選択します。
   {{< img src="data_jobs/emr/specify_permissions.png" alt="AWS IAM コンソール、Specify Permissions ページ。" style="width:80%;" >}}
   - 次に、**Actions allowed** で `GetSecretValue` を選択します。これは **Read** アクションです。 

   - **Resources** で、**Specific** を選択します。次に、**Secret** の隣にある、**Add ARNs** をクリックし、このページの最初のステップで作成したシークレットの ARN を追加します。
   - **Next** をクリックします。
1. 次のページで、ポリシーに名前を付けます。次に、**Create policy** をクリックします。


### Spark アプリケーションごとにサービスタグ付けを指定する

タグを付けることで、Datadog でのテレメトリーのフィルタリング、集計、比較が容易になります。Spark ドライバーとエグゼキューターの `extraJavaOptions` プロパティに `-Ddd.service`、`-Ddd.env`、`-Ddd.version`、`-Ddd.tags` オプションを渡すことでタグを構成できます。

Datadog で、各ジョブの名前は `-Ddd.service` に設定した値に対応します。

```shell
spark-submit \
 --conf spark.driver.extraJavaOptions="-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
 --conf spark.executor.extraJavaOptions="-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
 application.jar
```

## 検証

Datadog で [Data Jobs Monitoring][8] ページを表示すると、すべてのデータ処理ジョブのリストが表示されます。

## ランタイムでのタグスパン

{{% djm-runtime-tagging %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/secretsmanager/
[3]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
[4]: https://console.aws.amazon.com/emr
[5]: https://console.aws.amazon.com/iam/
[6]: /resources/sh/data_jobs/datadog_emr_job_monitoring_init_v2.sh
[7]: /ja/getting_started/site/
[8]: https://app.datadoghq.com/data-jobs/
[9]: /ja/data_jobs