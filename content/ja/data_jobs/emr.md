---
further_reading:
- link: /data_jobs
  tag: ドキュメント
  text: Data Jobs Monitoring
title: Amazon EMR で Spark の Data Jobs Monitoring を有効にする
---

[Data Jobs Monitoring][9] は、Amazon EMR 上の Apache Spark アプリケーションのパフォーマンスと信頼性を視覚化します。

## 要件

[Amazon EMR Release 6.0.1][10] or later is required.

## セットアップ

以下の手順に従って、Amazon EMR の Data Jobs Monitoring を有効にしてください。

1. [Store your Datadog API key](#store-your-datadog-api-key-in-aws-secrets-manager-recommended) in AWS Secrets Manager (Recommended).
1. [Grant permissions to EMR EC2 instance profile](#grant-permissions-to-emr-ec2-instance-profile).
1. [EMR クラスターを作成および構成](#create-and-configure-your-emr-cluster)します。
1. [Spark アプリケーションごとにサービスタグ付けを指定](#specify-service-tagging-per-spark-application)します。

### Store your Datadog API key in AWS Secrets Manager (Recommended)
1. [Datadog API キー][1]をメモします。
1. In [AWS Secrets Manager][2], choose **Store a new secret**.
   - Under **Secret type**, select **Other type of secret**.
   - **Key/value pairs** の下に、Datadog API キーをキーと値のペアとして追加します。ここで、キーは `dd_api_key` です。
      {{< img src="data_jobs/emr/key_value.png" alt="AWS Secrets Manager の「Store a new secret」。'Key/value pairs' というセクション。左側には、'dd_api_key' を含むテキストボックス。右側には、削除された API キーを含むテキストボックス。" style="width:80%;" >}}
   - その後、**Next** をクリックします。
1. **Configure secret** ページで、**Secret name** を入力します。`datadog/dd_api_key`を使用できます。次に、**Next** をクリックします。
1. **Configure rotation** ページでは、オプションで[自動回転][3]をオンにすることができます。次に、**Next** をクリックします。
1. **Review** ページで、シークレットの詳細を確認します。次に、**Store** をクリックします。
1. AWS Secrets Manager で、作成したシークレットを開きます。**Secret ARN** をメモします。

### Grant permissions to EMR EC2 instance profile
EMR EC2 instance profile is a IAM role assigned to every EC2 instance in an Amazon EMR cluster when the instance launches. Follow [the Amazon guide][11] to prepare this role based on your application's need to interact with other AWS services. The following additional permissions may be required for Data Jobs Monitoring.

#### Permissions to get secret value using AWS Secrets Manager

<div class="alert alert-danger">
These permissions are <strong>required</strong> if you are using AWS Secrets Manager.
</div>

1. [AWS IAM コンソール][5]で、左のナビゲーションバーにある **Access management** > **Roles** をクリックします。
1. Click on the IAM role you plan to use as the instance profile for your EMR cluster.
1. 次のページの **Permissions** タブで、**Permissions policies** セクションを見つけます。**Add permissions** > **Create inline policy** をクリックします。
1. **Specify permissions** ページで、**Select a service** セクションを見つけます。**Service** で、**Secrets Manager** を選択します。
   {{< img src="data_jobs/emr/specify_permissions.png" alt="AWS IAM コンソール、Specify Permissions ページ。" style="width:80%;" >}}
   - 次に、**Actions allowed** で `GetSecretValue` を選択します。これは **Read** アクションです。 

   - **Resources** で、**Specific** を選択します。次に、**Secret** の隣にある、**Add ARNs** をクリックし、このページの最初のステップで作成したシークレットの ARN を追加します。
   - **Next** をクリックします。
1. 次のページで、ポリシーに名前を付けます。次に、**Create policy** をクリックします。

#### Permissions to describe cluster

<div class="alert alert-danger">
These permissions are <strong>required</strong> if you are <strong>NOT</strong> using the default role, <code>EMR_EC2_DefaultRole</code>.
</div>

1. In your [AWS IAM console][5], click on **Access management** > **Roles** in the left navigation bar.
1. Click on the IAM role you plan to use as the instance profile for your EMR cluster.
1. 次のページの **Permissions** タブで、**Permissions policies** セクションを見つけます。**Add permissions** > **Create inline policy** をクリックします。
1. On the **Specify permissions** page, toggle on the **JSON** tab.
   - Then, copy and paste the following policy into the **Policy editor**
   ```json
   {
      "Version": "2012-10-17",
      "Statement": [
         {
            "Effect": "Allow",
            "Action": [
               "elasticmapreduce:ListBootstrapActions",
               "elasticmapreduce:ListInstanceFleets",
               "elasticmapreduce:DescribeCluster",
               "elasticmapreduce:ListInstanceGroups"
            ],
            "Resource": [
               "*"
            ]
         }
      ]
   }
   ```
   - **Next** をクリックします。
1. 次のページで、ポリシーに名前を付けます。次に、**Create policy** をクリックします。

Take note of the name of the IAM role you plan to use as the instance profile for your EMR cluster. 

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

   The script above sets the required parameters, and downloads and runs the latest init script for Data Jobs Monitoring in EMR. If you want to pin your script to a specific version, you can replace the file name in the URL with `emr_init_1.4.0.sh` to use the last stable version.

1. **Create Cluster** ページで、**Bootstrap actions** セクションを見つけます。**Add** をクリックして、**Add bootstrap action** ダイアログを表示します。
   {{< img src="data_jobs/emr/add_bootstrap_action_without_arguments.png" alt="Amazon EMR console, Create Cluster, Add Bootstrap Action dialog. Text fields for name, script location, and arguments." style="width:80%;" >}}
   - **Name** には、ブートストラップアクションの名前を指定します。`datadog_agent` を使うことができます。
   - **Script location** には、init スクリプトを S3 に保存した場所へのパスを入力します。
   - **Add bootstrap action** をクリックします。

1. On the **Create Cluster** page, find the **Identity and Access Management (IAM) roles** section. For **instance profile** dropdown, select the IAM role you have granted permissions in [Grant permissions to EMR EC2 instance profile](#grant-permissions-to-emr-ec2-instance-profile).

クラスターが作成されると、このブートストラップアクションによって Datadog Agent がインストールされ、クラスターの各ノードに Java トレーサーがダウンロードされます。

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
[7]: /ja/getting_started/site/
[8]: https://app.datadoghq.com/data-jobs/
[9]: /ja/data_jobs
[10]: https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-601-release.html
[11]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-iam-role-for-ec2.html