---
title: Enable Data Jobs Monitoring for Spark on Amazon EMR
further_reading:
    - link: /data_jobs
      tag: Documentation
      text: Data Jobs Monitoring
---

[Data Jobs Monitoring][9] は、Amazon EMR 上の Apache Spark アプリケーションのパフォーマンスと信頼性を視覚化します。

## 要件

[Amazon EMR Release 6.6.0][10] or later is required.

## セットアップ

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

1. Save the following script to an S3 bucket that your EMR cluster can read. Take note of the path to this script. 

   ```shell
   #!/bin/bash

   # Set required parameter DD_SITE
   DD_SITE={{< region-param key="dd_site" code="true" >}}

   # Set required parameter DD_API_KEY with Datadog API key. 
   # The commands below assumes the API key is stored in AWS Secrets Manager, with the secret name as datadog/dd_api_key and the key as dd_api_key.
   # IMPORTANT: Modify if you choose to manage and retrieve your secret differently.
   SECRET_NAME=datadog/dd_api_key
   DD_API_KEY=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME | jq -r .SecretString | jq -r '.["dd_api_key"]')

   # Optional parameters
   # Uncomment the following line to allow adding init script logs when reporting a failure back to Datadog. A failure is reported when the init script fails to start the Datadog Agent successfully.
   # export DD_DJM_ADD_LOGS_TO_FAILURE_REPORT=true

   # Download and run the latest init script
   DD_SITE=$DD_SITE DD_API_KEY=$DD_API_KEY bash -c "$(curl -L https://dd-data-jobs-monitoring-setup.s3.amazonaws.com/scripts/emr/emr_init_latest.sh)" || true

   ```

   The script above sets the required parameters, downloads and runs the latest init script for Data Jobs Monitoring in EMR. If you want to pin your script to a specific version, you can replace the file name in the URL with `emr_init_1.2.0.sh` to use the last stable version.

1. **Create Cluster** ページで、**Bootstrap actions** セクションを見つけます。**Add** をクリックして、**Add bootstrap action** ダイアログを表示します。
   {{< img src="data_jobs/emr/add_bootstrap_action_without_arguments.png" alt="Amazon EMR console, Create Cluster, Add Bootstrap Action dialog. Text fields for name, script location, and arguments." style="width:80%;" >}}
   - **Name** には、ブートストラップアクションの名前を指定します。`datadog_agent` を使うことができます。
   - **Script location** には、init スクリプトを S3 に保存した場所へのパスを入力します。
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

## 高度な構成

### ランタイムでのタグスパン

{{% djm-runtime-tagging %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/secretsmanager/
[3]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
[4]: https://console.aws.amazon.com/emr
[5]: https://console.aws.amazon.com/iam/
[7]: /getting_started/site/
[8]: https://app.datadoghq.com/data-jobs/
[9]: /data_jobs
[10]: https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-660-release.html