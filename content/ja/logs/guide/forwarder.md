---
aliases:
- /ja/serverless/troubleshooting/installing_the_forwarder/
- /ja/serverless/forwarder/
- /ja/serverless/libraries_integrations/forwarder/
dependencies:
- https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/README.md
kind: documentation
title: Datadog Forwarder
---

## 概要

Datadog Forwarder は、AWS から Datadog にログを送信する AWS Lambda 関数で、具体的には次のようなものです。

- CloudWatch、ELB、S3、CloudTrail、VPC、SNS、CloudFront ログを Datadog に転送します。
- S3 イベントを Datadog に転送します。
- Kinesis データストリームイベントを Datadog に転送します (CloudWatch ログのみがサポートされています)。
- AWS Lambda 関数から Datadog にメトリクス、トレース、ログを転送します。Datadog は、Lambda 関数を監視するために [Datadog Lambda 拡張機能][1]を使用することを推奨しています。

Forwarder を使用して AWS Lambda のログから Datadog にメトリクス、トレース、ログを転送しているサーバーレスのお客様は、Lambda の実行環境から直接テレメトリーを収集する [Datadog Lambda 拡張機能へ移行][3]するべきです。Forwarder は引き続きサーバーレスモニタリングで使用可能ですが、最新機能のサポートに伴うアップデートは行われません。

Datadog Forwarder による AWS サービスのログ送信については、[Datadog Lambda 関数で AWS Services のログを送信するガイド][2]をお読みください。

## インストール

Datadog では、[CloudFormation](#cloudformation) を使用して Forwarder を自動インストールすることを推奨しています。また、[Terraform](#terraform) を使用するか[手動で](#manual)設定プロセスを完了することもできます。インストールが完了したら、[トリガーの設定][4]により、S3 バケットや CloudWatch ロググループなどのログソースに Forwarder をサブスクライブすることができます。

{{< tabs >}}
{{% tab "CloudFormation" %}}

### CloudFormation

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml)

1. 管理者 AWS アカウントまたはロールにログインし、上のボタンで CloudFormation Stack をデプロイします。
2. `DdApiKey` を入力し、適切な `DdSite` を選択します。他のすべてのパラメーターはオプションです。
3. **Create stack** をクリックし、作成が完了するまで待ちます。
4. スタックの "Resources" タブで、論理 ID が `Forwarder` のインストール済みの Forwarder Lambda 関数を見つけます。
5. [インストールした Forwarder にトリガーを設定します][101]。
6. 複数の AWS リージョンで運用している場合は、別のリージョンで上記の手順を繰り返します。

以前に Datadog の AWS インテグレーションページから[以下の CloudFormation テンプレート][102]を使用して AWS インテグレーションを有効にした場合、それを含めることにした場合、アカウントにはすでに Datadog Lambda Forwarder 関数がプロビジョニングされている場合があります。その場合、ログをエクスポートしたいアカウント内の追加の AWS リージョンに Datadog Lambda をインストールするだけで済みます。

**注:** Datadog Lambda Forwarder 関数コードブロックは、Lambda レイヤーを通してロジックが実装されているため、空であることが期待されます。

[101]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#set-up-triggers
[102]: https://github.com/DataDog/cloudformation-template/tree/master/aws

{{% /tab %}}
{{% tab "Terraform" %}}

### Terraform

Terraform リソース [`aws_cloudformation_stack`][101] を、指定されている CloudFormation テンプレートのラッパーとして使用して、Forwarder をインストールします。

Datadog は、個別の Terraform コンフィギュレーションを作成することをお勧めします。

- 最初のものを使用して [Datadog API キー][102]を AWS Secrets Manager に保存し、出力から適用するシークレット ARN を書き留めます。
- 次に、Forwarder のコンフィギュレーションを作成し、`DdApiKeySecretArn` パラメーターを介してシークレット ARN を指定します。
- 最後に、[Forwarder にトリガーを設定する][103]ための構成を作成します。

API キーと Forwarder の構成を分離することで、Forwarder のアップデート時に Datadog API キーを提供する必要がありません。将来的に Forwarder を更新またはアップグレードするには、Forwarder の構成を再度適用します。

#### コンフィギュレーション例

```tf
# AWS Secrets Manager に Datadog API キーを保存します
variable "dd_api_key" {
  type        = string
  description = "Datadog API key"
}

resource "aws_secretsmanager_secret" "dd_api_key" {
  name        = "datadog_api_key"
  description = "Encrypted Datadog API Key"
}

resource "aws_secretsmanager_secret_version" "dd_api_key" {
  secret_id     = aws_secretsmanager_secret.dd_api_key.id
  secret_string = var.dd_api_key
}

output "dd_api_key" {
  value = aws_secretsmanager_secret.dd_api_key.arn
}
```

```tf
# Datadog Forwarder を使用して S3 と CloudWatch からのログ、および Lambda 関数からの可観測性データを Datadog へ送信します。詳しくは https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring を参照してください
resource "aws_cloudformation_stack" "datadog_forwarder" {
  name         = "datadog-forwarder"
  capabilities = ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
  parameters   = {
    DdApiKeySecretArn  = "REPLACE ME WITH THE SECRETS ARN",
    DdSite             = "<SITE>",
    FunctionName       = "datadog-forwarder"
  }
  template_url = "https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml"
}
```

**注**: [Datadog サイト][104]と `DdSite` パラメーターが一致していることを確認してください。このページの右側でサイトを選択してください。上記のサンプル構成の `<SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えてください。

[101]: https://www.terraform.io/docs/providers/aws/r/cloudformation_stack
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#set-up-triggers
[104]: https://docs.datadoghq.com/ja/getting_started/site/#access-the-datadog-site

class SampleRegistry
{
    public function put($key, $value)
    {
        \App\some_utility_function('some argument');
        // 挿入されたアイテムの ID を返す
        return 456;
    }

### 手動

指定されている CloudFormation テンプレートを使用して Forwarder をインストールできない場合は、以下の手順に従って Forwarder を手動でインストールできます。テンプレートの機能について改善できる点がございましたら、お気軽に問題やプルリクエストを開いてお知らせください。

1. 最新の[リリース][101]から、 `aws-dd-forwarder-<VERSION>.zip` を使用して Python 3.10 Lambda 関数を作成します。
2. [Datadog API キー][102]を AWS Secrets Manager に保存し、環境変数 `DD_API_KEY_SECRET_ARN` に Lambda 関数のシークレット ARN を設定し、Lambda 実行ロールに `secretsmanager:GetSecretValue` アクセス許可を追加します。
3. S3 バケットからログを転送する必要がある場合は、`s3:GetObject` アクセス許可を Lambda 実行ロールに追加します。
4. Forwarder で環境変数 `DD_ENHANCED_METRICS` を `false` に設定します。これにより、Forwarder は拡張メトリクス自体を生成しなくなりますが、他の Lambda からカスタムメトリクスを転送します。
5. 一部の AWS アカウントは、トリガーが Cloudwatch ロググループが Forwarder を呼び出すことを許可するリソースベースのポリシーを自動的に作成しないように構成されています。Cloudwatch Log Events によって Forwarder が呼び出されるために必要な権限を確認するには、[CloudWatchLogPermissions][103] を参照してください。
6. [トリガーを構成します][104]。
7. S3 バケットを作成し、環境変数 `DD_S3_BUCKET_NAME` をバケット名に設定します。また、このバケットに `s3:GetObject`、`s3:PutObject`、`s3:ListBucket`、`s3:DeleteObject` 権限を Lambda 実行ロールに提供します。このバケットは、異なるタグキャッシュ (Lambda、S3、Step Function、Log Group) の保存に使用されます。さらに、このバケットは、転送の例外が発生した場合に、未転送のイベントを保存するために使用されます。
8. 環境変数 `DD_STORE_FAILED_EVENTS` を `true` に設定して、フォワーダーがイベントデータも S3 バケットに保存するようにします。ログ、メトリクス、またはトレースをインテークに送信する際に例外が発生した場合、フォワーダーは関連データを S3 バケットに保存します。カスタム呼び出し、つまり `retry` キーワードが空でない文字列に設定されたイベントを受信した場合 (手動でトリガー可能 - 下記参照)、フォワーダーは保存されたイベントの送信を再度試みます。成功した場合、バケット内のストレージをクリアします。

```bash
aws lambda invoke --function-name <function-name> --payload '{"retry":"true"}' out
```

[101]: https://github.com/DataDog/datadog-serverless-functions/releases
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: https://github.com/DataDog/datadog-serverless-functions/blob/029bd46e5c6d4e8b1ae647ed3b4d1917ac3cd793/aws/logs_monitoring/template.yaml#L680
[104]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers

{{% /tab %}}
{{< /tabs >}}

### 新しいバージョンにアップグレードする

1. [datadog-forwarder (名前を変更しなかった場合)][5] CloudFormation スタックを見つけます。[Datadog AWS インテグレーションスタック][6]の一部として Forwarder をインストールした場合は、ルートスタックではなく、ネストされた Forwarder スタックを更新してください。
2. CloudFormation スタックの "Resources" タブから実際の Forwarder Lambda 関数を見つけ、その構成ページに移動します。新しいバージョンで問題が発生しロールバックする必要がある場合に備えて、`dd_forwarder_version` タグの値 (例: `3.73.0`) をメモしておきます。
3. テンプレート `https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml` を使用してスタックを更新します。必要に応じて、`latest` を `3.73.0.yaml` などの特定のバージョンに置き換えることもできます。アップデートを適用する前に、必ず変更セットを確認してください。

最新バージョンへのアップグレードで問題が発生した場合は、トラブルシューティングのセクションを確認してください。

### 古いバージョンを 3.107.0 以降にアップグレードする

バージョン 3.107.0 から、インテークポイントで例外が発生した場合に未転送のイベントを Lambda 関数が保存できる新機能が追加されました。`DD_STORE_FAILED_EVENTS` 環境変数を使用してこの機能を有効にすると、失敗したイベントはタグキャッシュを保存するために使用されるのと同じ S3 バケット内の定義済みディレクトリに保存されます。同じバケットを使用して、複数の Lambda 関数のログをユニークなサブディレクトリに保存できます。

### 古いバージョンを 3.106.0 以降にアップグレードする

バージョン 3.106.0 から、Lambda 関数は `DD_S3_BUCKET_NAME` で構成された S3 バケットに保存されるキャッシュファイル名にプレフィックスを追加するよう更新されました。これにより、複数の関数のキャッシュファイルを同じバケットに保存できるようになります。 
また、このバージョンから、フォワーダーは S3 にエクスポートされるすべてのログに、デフォルトでカスタム S3 バケットタグをアタッチするようになります。たとえば、サービスが宛先の S3 バケットにログを送信するよう構成された場合、フォワーダーはログを取得・転送する際にそのバケットのタグをログに追加します。

### 古いバージョンを 3.99.0 以降にアップグレードする

バージョン 3.99.0 以降、Lambda 関数は **Python 3.11** を必要とするように更新されました。古いフォワーダーのインストールを 3.99.0 以上にアップグレードする場合は、AWS Lambda 関数が Python 3.11 を使用するように構成されていることを確認してください。

### 古いバージョンを 3.98.0 以降にアップグレードする

バージョン 3.98.0 以降、Lambda 関数は **Python 3.10** を必要とするように更新されました。古いフォワーダーのインストールを 3.98.0 以上にアップグレードする場合は、AWS Lambda 関数が Python 3.10 を使用するように構成されていることを確認してください。

### 古いバージョンを 3.74.0 以降にアップグレードする

バージョン 3.74.0 以降、Lambda 関数は **Python 3.9** を必要とするように更新されました。古いフォワーダーのインストールを 3.74.0 以上にアップグレードする場合は、AWS Lambda 関数が Python 3.9 を使用するように構成されていることを確認してください。

### 古いバージョンを 3.49.0 以降にアップグレードする

バージョン 3.49.0 以降、Lambda 関数は **Python 3.8** を必要とするように更新されました。古い Forwarder を 3.49.0 以上にアップグレードする場合、AWS Lambda 関数が Python 3.8 を使用するように構成されていることを確認してください。

### 古いバージョンを 3.0.0 以降にアップグレードする

バージョン 3.0.0 以降、Forwarder Lambda 関数は CloudFormation によって管理されます。古い Forwarder のインストールを 3.0.0 以降にアップグレードするには、以下の手順に従います。

1. [インストール](#installation)の手順に従って、新しい Forwarder をインストールします。
2. スタックの "Resources" タブで、論理 ID が `Forwarder` のインストール済みの Forwarder Lambda 関数を見つけます。
3. 古い Forwarder のいくつかのトリガー (CloudWatch ロググループサブスクリプションフィルターと S3 バケットイベント通知) を新しいものに手動で移行します。
4. 新しい Forwarder が期待どおりに機能していること、たとえばエラーなしで定期的に呼び出されることを確認します。
5. 移行されたトリガー (ソース) からのログが Datadog ログエクスプローラーに表示されていることと、正しく表示されていることを確認します。
6. すべてのトリガーを新しい Forwarder に移行します。
   - Datadog にトリガー管理を[自動][6]で任せている場合は、AWS インテグレーションページ **Log Collection** タブで Forwarder の Lambda ARN を更新します。
   - トリガーを[手動][7]で管理していた場合は、手動で (またはスクリプトで) 移行する必要があります。
7. 古い Forwarder Lambda 関数の呼び出しカウントがゼロになっていることを確認します。
8. 安心したら、古い Forwarder Lambda 関数を削除します。
9. 古い Forwarder Lambda 関数が複数の AWS アカウントとリージョンにインストールされている場合は、アカウントとリージョンのすべての組み合わせで上記の手順を繰り返します。

### 削除

Forwarder および、Forwarder CloudFormation スタックによって作成された他の AWS リソースを安全に削除するには、以下の手順に従います。

1. [datadog-forwarder (名前を変更しなかった場合)][5] CloudFormation スタックを見つけます。または、"This function belongs to an application. Click here to manage it." (この関数はアプリケーションに属しています。ここをクリックして管理します。) というメッセージからリンクをクリックし、アプリケーションページの "Deployments" タブをクリックして、Forwarder Lambda 関数の管理コンソールからスタックを見つけることができます。
2. CloudFormation スタックを「削除」します。

### Forwarder 設定の調整

1. [datadog-forwarder (名前を変更しなかった場合)][5] CloudFormation スタックを見つけます。
2. 現在のテンプレートを使用してスタックを更新します。
3. パラメーター値を調整します。

Datadog は、Lambda 関数を直接編集するのではなく、CloudFormation を介して Forwarder 設定を調整することをお勧めします。スタックを起動するときに、[`template.yaml` ファイル][8] と CloudFormation スタック作成ユーザーインターフェイスで設定の説明を確認してください。追加の設定をテンプレートで調整できるように、お気軽にプルリクエストを送信してください。

## トラブルシューティング

最近の[リリース][9]で問題がすでに修正されているかどうかも、忘れずに確認してください。

### ロギング

Forwarder Lambda 関数で環境変数 `DD_LOG_LEVEL` を `debug` に設定して、詳細なログ記録を一時的に有効にします (削除することを忘れないでください)。デバッグログには、Lambda 関数が受信する正確なイベントペイロードと、Datadog に送信されるデータ (ログ、メトリクス、またはトレース) ペイロードを表示できる必要があります。

さらに詳細な調査のために、ログやコードを追加することもできます。[寄稿](#contributing)セクションから、ローカルの変更を使用して Forwarder コードを構築する手順を見つけてください。

### フォワーダーの更新に関する問題

フォワーダーの `.zip` コードを手動で更新すると、コードが Lambda レイヤーにパッケージされているフォワーダーインストールの CloudFormation アップデートと競合し、呼び出しエラーを引き起こす可能性があります (バージョン `3.33.0` からのデフォルトのインストール選択)。この場合、CloudFormation を介してスタックを最新のものに 2 回連続で更新する (最初に `InstallAsLayer` を `false` に設定し、次に `true` に設定する) ことで、問題が解決するはずです。これにより、`.zip` の残りが削除され、利用可能な最新のレイヤーがインストールされます。

それでもわからない場合は、デバッグログのコピーを使用して [Datadog サポート][10]のチケットを作成してください。

### JSON 形式のログが Datadog に表示されていない

ログに Datadog がタイムスタンプとしてパースする属性が含まれている場合、タイムスタンプが現在で正しい形式であることを確認する必要があります。どの属性がタイムスタンプとしてパースされ、タイムスタンプが有効であることを確認する方法については、[ログ日付リマッパー][24]を参照してください。

### S3 トリガーの作成に関する問題

S3 トリガーを作成する際に次のようなエラーが発生した場合、[この記事](https://aws.amazon.com/blogs/compute/fanout-s3-event-notifications-to-multiple-endpoints/)で AWS が提案するファンアウトアーキテクチャに従うことを検討してください。

```
An error occurred when creating the trigger: Configuration is ambiguously defined. Cannot have overlapping suffixes in two rules if the prefixes are overlapping for the same event type.
```

## 寄稿

プルリクエストは大歓迎です。こちらがクイックガイドです。

1. 実装する前に機能やバグ修正について話し合いたい場合は、[Datadog Slack コミュニティ][11]の `#serverless` チャンネルで私たちを見つけてください。
1. ブランチをフォーク、複製、作成します。
   ```bash
   git clone git@github.com:<your-username>/datadog-serverless-functions.git
   git checkout -b <my-branch>
   ```
1. コードを変更します。
1. ローカルの変更で構築します。
   ```bash
   cd aws/logs_monitoring
   ./tools/build_bundle.sh <SEMANTIC_VERSION> # any unique version is fine
   ```
1. 変更したコードでテスト Forwarder を更新し、テストします。
   ```bash
   # Upload in the AWS Lambda console if you don't have AWS CLI
   aws lambda update-function-code \
       --region <AWS_REGION> \
       --function-name <FORWARDER_NAME> \
       --zip-file fileb://.forwarder/aws-dd-forwarder-<SEMANTIC_VERSION>.zip
   ```
1. 単体テストを実行します。
   ```
   python -m unittest discover . # for code in Python
   ./trace_forwarder/scripts/run_tests.sh # for code in Go
   ```
1. インテグレーションテストを実行します。

   ```bash
   ./tools/integration_tests/integration_tests.sh

   # to update the snapshots if changes are expected
   ./tools/integration_tests/integration_tests.sh --update
   ```

1. 変更が CloudFormation テンプレートに影響する場合は、自身の AWS アカウントに対してインストールテストを実行してください。
   ```bash
   ./tools/installation_test.sh
   ```
1. フォークにプッシュして、[プルリクエストを送信][12]します。

## 高度な検索

### 複数の宛先へのログ送信

複数の Datadog オーガニゼーションまたはその他の送信先にログを送信する必要がある場合は、`AdditionalTargetLambdaArns` Cloudformation パラメーターを構成し、Datadog Forwarder で受信ログを指定の Lambda 関数にコピーします。これらの追加された Lambda 関数は、Datadog Forwarder が受信するものとまったく同じ `event` で非同期的に呼び出されます。

### AWS PrivateLink サポート

VPC プライベートサブネットで Forwarder を実行し、AWS PrivateLink で Datadog にデータを送信できます。AWS PrivateLink は、AWS でホストされている [Datadog サイト][13]でのみ (たとえば `datadoghq.eu` ではなく `datadoghq.com`)、構成が可能です。

1. [こちらの手順][14]に従って、Datadog の `api`、`http-logs.intake`、`trace.agent` エンドポイントを VPC に追加します。
2. [説明][15]に従って、AWS Secrets Manager と S3 エンドポイントを VPC に追加します。
3. Forwarder を CloudFormation テンプレートでインストールする場合
   1. `UseVPC` を `true` に設定します。
   2. VPC 設定に基づき `VPCSecurityGroupIds` および `VPCSubnetIds` を設定します。
   3. AWS Resource Groups Tagging API では PrivateLink がサポートされないため、`DdFetchLambdaTags` を `false` に設定します。

#### DdUsePrivateLink は非推奨です

`DdUsePrivateLink` オプションは [v3.41.0][16] から非推奨になりました。このオプションは以前、データのインテークに PrivateLink エンドポイントの特別なセットを使用するよう Forwarder に指示するために使用されていました: `pvtlink.api.{{< region-param key="dd_site" code="true" >}}`、`api-pvtlink.logs.{{< region-param key="dd_site" code="true" >}}`、`trace-pvtlink.agent.{{< region-param key="dd_site" code="true" >}}`。v3.41.0 以降、Forwarder はインテークエンドポイントの通常の DNS 名を使用して PrivateLink 経由で Datadog にデータを送信することができます: `api.{{< region-param key="dd_site" code="true" >}}`、`http-intake.logs.{{< region-param key="dd_site" code="true" >}}`、`trace.agent.{{< region-param key="dd_site" code="true" >}}`。したがって、`DdUsePrivateLink` オプションは不要になりました。

`DdUsePrivateLink` が `true` に設定された、Forwarder の旧デプロイメントをご使用の場合は、構成済みの PrivateLink エンドポイントと [Datadog のドキュメントに記載されたもの][14]が異なることがありますが、これは想定内です。古い PrivateLink エンドポイントは、ドキュメントから削除されていますが、依然として機能します。Forwarder をアップグレードする際は、変更の必要はなく、`DdUsePrivateLink` を有効にしたまま、旧エンドポイントを引き続き使用できます。

ただし、新しいエンドポイントへの切り替えをご希望の場合は、上記の新しい手順に従い、以下を実行する必要があります。

1. 新しいエンドポイントを `api.{{< region-param key="dd_site" code="true" >}}`、`http-intake.logs.{{< region-param key="dd_site" code="true" >}}`、`trace.agent.{{< region-param key="dd_site" code="true" >}}` に設定します。
2. `DdUseVPC` を `true` に設定します。
3. `DdUsePrivateLink` を `false` に設定します。

### AWS VPC およびプロキシのサポート

公共のインターネットに直接アクセスできない VPC に Forwarder をデプロイする必要があり、AWS PrivateLink を使用して Datadog に接続できない場合 (例えば、組織が Datadog EU サイト: `datadoghq.eu` にホストされている場合)、プロキシ経由でデータを送信することができます。

1. Forwarder がパブリックサブネットにデプロイされている場合以外は、こちらの[手順][15]に従い Secrets Manager および S3 のエンドポイントを VPC に追加し、Forwarder がこれらのサービスにアクセスできるようにします。
2. プロキシを以下の構成 ([HAProxy][17] または [NGINX][18]) で更新します。他のプロキシや Web プロキシを使用している場合は、Datadog のドメインを許可リストとして指定します (例: `.{{< region-param key="dd_site" code="true" >}}`)。
3. CloudFormation テンプレートで Forwarder をインストールする際は、`DdUseVPC`、`VPCSecurityGroupIds`、`VPCSubnetIds` を設定します。
4. AWS VPC はまだ Resource Group Tagging API にエンドポイントを提供しないため、`DdFetchLambdaTags` オプションが無効になっていることを確認してください。
5. HAProxy または NGINX を使用している場合

- `DdApiUrl` を `http://<proxy_host>:3834` または `https://<proxy_host>:3834` に設定します。
- `DdTraceIntakeUrl` を `http://<proxy_host>:3835` または `https://<proxy_host>:3835` に設定します。
- `DdUrl` を `<proxy_host>` に、`DdPort` を `3837` に設定します。

それ以外、Web プロキシを使用している場合

- `DdHttpProxyURL` をプロキシエンドポイントに設定します。例: `http://<proxy_host>:<port>` またはプロキシにユーザー名とパスワードがある場合は、`http://<username>:<password>@<proxy_host>:<port>`

7. `http` を使用したプロキシに接続する場合は、`DdNoSsl` を `true` に設定します。
8. 自己署名証明書のある `https` を使用したプロキシに接続する場合は `DdSkipSslValidation` を `true` に設定します。

### コード署名

Datadog Forwarder は Datadog によって署名されています。Forwarder の整合性を確認するには、手動インストール方法を使用します。Forwarder ZIP ファイルをアップロードする前に、Datadog の署名プロファイル ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を含む[コード署名コンフィギュレーションを作成][19]し、それを Forwarder Lambda 関数に関連付けます。

## CloudFormation パラメーター

### 必須

`DdApiKey`
: [Datadog API キー][20]。**Organization Settings** > **API Keys** で確認することができます。API キーは AWS Secrets Manager に保存されます。すでに Secrets Manager に Datadog API Keyが保存されている場合は、代わりに `DdApiKeySecretArn` を使用します。

`DdApiKeySecretArn`
: Datadog API キーを格納しているシークレットの ARN (すでに Secrets Manager に格納されている場合)。シークレットは、キーと値のペアではなく、プレーンテキストとして保存する必要があります。

`DdSite`
: メトリクスやログが送信される [Datadog サイト][13]。Datadog サイトは {{< region-param key="dd_site" code="true" >}} です。

### Lambda 関数 (オプション)

`FunctionName`
: Datadog Forwarder Lambda 関数の名前。既存の CloudFormation スタックを更新するときはこれを変更しないでください。変更すると、現在の Forwarder 関数が置き換えられすべてのトリガーが失われることになります。

`MemorySize`
: Datadog Forwarder Lambda 関数のメモリサイズ

`Timeout`
: Datadog Forwarder Lambda 関数のタイムアウト

`ReservedConcurrency`
: Datadog Forwarder Lambda 関数の予約済み同時実行数。空の場合、予約されていないアカウントの同時実行を使用します。
Datadog は、最低でも 10 個の予約済み同時実行を使用することをお勧めしますが、制限を増やす必要があるかもしれないので、デフォルトは 0 です。予約されていないアカウントの同時実行を使用する場合、環境内の他の Lambda 関数を制限することができます。

`LogRetentionInDays`
: Datadog Forwarder Lambda 関数により生成されたログの CloudWatch ログ保存期間

### ログ転送 (オプション)

`DdTags`
: 転送されたログにカスタムタグを追加します。カンマ区切りの文字列で、末尾にカンマはありません。例:`env:prod,stack:classic`

`DdMultilineLogRegexPattern`
: 指定された正規表現を使用して、S3 からの複数行ログの新しいログ行を検出します。たとえば、パターン "11/10/2014" で始まる複数行ログの場合は  `\d{2}\/\d{2}\/\d{4}` です。

`DdUseTcp`
: デフォルトでは、Forwarder はポート 443 を介して HTTPS を使用してログを送信します。SSL 暗号化 TCP 接続を介してログを送信するには、このパラメーターを true に設定します。

`DdNoSsl`
: ログの転送時に SSL を無効にし、プロキシを介してログを転送する場合は true に設定します。

`DdUrl`
: ログを転送するエンドポイント URL。プロキシを介してログを転送するのに役立ちます。

`DdPort`
: ログを転送するエンドポイントポート。プロキシを介してログを転送するのに役立ちます。

`DdSkipSslValidation`
: エンドポイントから指定された証明書を検証せずに、HTTPS 経由でログを送信します。これにより、Forwarder とログインテークエンドポイント間のトラフィックは暗号化されますが、宛先 SSL 証明書が有効かどうかは検証されません。

`DdUseCompression`
: ログ圧縮を無効にするには、false に設定します。HTTP 経由でログを送信する場合にのみ有効です。

`DdCompressionLevel`
: 圧縮レベルを 0 (圧縮なし) から 9 (最高の圧縮) に設定します。デフォルトの圧縮レベルは 6 です。圧縮レベルを上げると、Forwarder の実行時間が長くなる代わりに、送信ネットワークトラフィックが減少するという利点を得られる場合があります。

`DdForwardLog`
: ログ転送を無効にするには、false に設定しますが、Lambda 関数からのメトリクスやトレースなど、他の可観測性データの転送は続行します。

`DdFetchLambdaTags`
: Forwarder が GetResources API 呼び出しを使用して Lambda タグをフェッチし、それらをログ、メトリクス、トレースに適用できるようにします。true に設定すると、アクセス許可 `tag:GetResources` が Lambda 実行 IAM ロールに自動的に追加されます。

`DdFetchLogGroupTags`
: Forwarder が ListTagsLogGroup を使用して Log Group タグをフェッチし、それらをログ、メトリクス、トレースに適用できるようにします。true に設定すると、アクセス許可 `logs:ListTagsLogGroup` が Lambda 実行 IAM ロールに自動的に追加されます。

### ログスクラビング (オプション)

`RedactIp`
:  `\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}` に一致するテキストを `xxx.xxx.xxx.xxx` に置き換えます。

`RedactEmail`
:  `[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+` に一致するテキストを `xxxxx@xxxxx.com` に置き換えます。

`DdScrubbingRule`
:  指定された正規表現に一致するテキストを `xxxxx` (デフォルト) または `DdScrubbingRuleReplacement` (指定されている場合) に置き換えます。ログスクラビング規則は、完全な JSON 形式のログに適用されます。これには、Lambda 関数によって自動的に追加されたメタデータも含まれます。各ログで、パターンマッチが見つからなくなるまですべての一致が置換されます。`.*` など、非効率な正規表現を使用すると、Lambda 関数の遅延につながります。

`DdScrubbingRuleReplacement`に一致するテキストを、指定されたテキストで置き換えます。

### ログのフィルタリング (オプション)

`ExcludeAtMatch`
: 指定された正規表現に一致するログを送信しません。ログが `ExcludeAtMatch` と `IncludeAtMatch` の両方に一致する場合、そのログは除外されます。

`IncludeAtMatch`
: 指定された正規表現に一致するログのみを送信し、`ExcludeAtMatch` によって除外されません。

フィルタリング規則は、完全な JSON 形式のログに適用されます。これには、Forwarder によって自動的に追加されたメタデータも含まれます。ただし、[ログパイプライン][21]による変換はログが Datadog に送信された後に行われるため、Forwarder でログをフィルタリングする際には使用できません。`.*` など、非効率な正規表現を使用すると、Forwarder の遅延につながります。

ログのフィルタリングに使用できる正規表現の例：

- Lambda プラットフォームログの包含 (または除外): `"(START|END) RequestId:\s`。先行する `"` は、 JSON blob (`{"message": "START RequestId...."}`) 内にあるログメッセージの先頭文字と一致させるために必要です。Datadog では、`REPORT` ログを残すことを推奨しています。これは、サーバーレス関数のビューで呼び出しリストを生成するために使用されるからです。
- CloudTrail エラーメッセージのみ含める: `errorMessage`
- HTTP 4XX または 5XX のエラーコードを含むログのみを含める: `\b[4|5][0-9][0-9]\b`
- `message` フィールドに特定の JSON キー/値ペアを含む CloudWatch ログのみを含める: `\"awsRegion\":\"us-east-1\"`
  - CloudWatch のログイベントのメッセージフィールドは、文字列としてエンコードされています。例えば、`{"awsRegion": "us-east-1"}` は `{\"awsRegion\":\"us-east-1\"}` としてエンコードされます。したがって、提供するパターンには、`\"awsRegion\":\"us-east-1\"` のように `\` エスケープ文字を含める必要があります。

ログに対してさまざまなパターンをテストするには、[デバッグログ](#troubleshooting)をオンにします。

### 高度 (オプション)

`SourceZipUrl`
: 実行内容を理解できない場合は、変更しないでください。関数のソースコードのデフォルトの場所を上書きします。

`PermissionsBoundaryArn`
: Permissions Boundary Policy の ARN。

`DdUsePrivateLink` (非推奨)
: AWS PrivateLink を介したログとメトリクスの送信を有効にするには、true に設定します。[AWS PrivateLink で Datadog に接続する][2]を参照してください。

`DdHttpProxyURL`
: 標準の Web プロキシ環境変数 HTTP_PROXY および HTTPS_PROXY を設定します。これらは、プロキシサーバーが公開する URL エンドポイントです。これを AWS Private Link と組み合わせて使用しないでください。`DdSkipSslValidation` も true に設定してください。

`DdNoProxy`
: 標準の Web プロキシ環境変数 `NO_PROXY` を設定します。これは、Web プロキシから除外する必要があるドメイン名のコンマ区切りのリストです。

`VPCSecurityGroupIds`
: VPC セキュリティグループ ID のカンマ区切りリスト。AWS PrivateLink が有効な場合に使用されます。

`VPCSubnetIds`
: VPC サブネット ID のカンマ区切りリスト。AWS PrivateLink が有効な場合に使用されます。

`AdditionalTargetLambdaArns`
: Datadog Forwarder が受信するのと同一の  `event` と非同期で呼び出される Lambda ARN のコンマ区切りリスト。

`InstallAsLayer`
: レイヤーベースのインストールフローを使用するかどうか。フォワーダーコードを GitHub から S3 バケットにコピーする 2 番目の関数をインストールするレガシーインストールフローを使用するには、false に設定します。デフォルトは true です。

`LayerARN`
: フォワーダーコードを含むレイヤーの ARN。空の場合、スクリプトはフォワーダーが公開されたレイヤーのバージョンを使用します。デフォルトは空です。

## 権限

CloudFormation Stack をデフォルトのオプションでデプロイするには、Datadog API キーをシークレットとして保存し、Forwarder のコード (ZIP ファイル) を格納する S3 バケットを作成し、Lambda 関数 (実行ロールとロググループを含む) を作成します。

**IAM ステートメント**:

```json
{
  "Effect": "Allow",
  "Action": [
    "cloudformation:*",
    "secretsmanager:CreateSecret",
    "secretsmanager:TagResource",
    "s3:CreateBucket",
    "s3:GetObject",
    "s3:PutEncryptionConfiguration",
    "s3:PutBucketPublicAccessBlock",
    "iam:CreateRole",
    "iam:GetRole",
    "iam:PassRole",
    "iam:PutRolePolicy",
    "iam:AttachRolePolicy",
    "lambda:CreateFunction",
    "lambda:GetFunction",
    "lambda:GetFunctionConfiguration",
    "lambda:GetLayerVersion",
    "lambda:InvokeFunction",
    "lambda:PutFunctionConcurrency",
    "lambda:AddPermission",
    "lambda:TagResource",
    "logs:CreateLogGroup",
    "logs:DescribeLogGroups",
    "logs:PutRetentionPolicy"
  ],
  "Resource": "*"
}
```

CloudFormation スタックを作成するには、次の機能が必要です。

- CAPABILITY_AUTO_EXPAND、Forwarder テンプレートが [AWS SAM マクロ][23]などのマクロを使用するためです。
- CAPABILTY_IAM/NAMED_IAM、Forwarder は IAM ロールを作成するためです。

CloudFormation Stack は、次の IAM ロールを作成します。

- ForwarderRole: Forwarder Lambda 関数が S3 からログを読み取り、Secrets Manager から Datadog API キーをフェッチし、独自のログを書き込むための実行ロール。

**IAM ステートメント**

```json
[
  {
    "Effect": "Allow",
    "Action": [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ],
    "Resource": "*"
  },
  {
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::*",
    "Effect": "Allow"
  },
  {
    "Action": ["secretsmanager:GetSecretValue"],
    "Resource": "<ARN of DdApiKeySecret>",
    "Effect": "Allow"
  }
]
```

- `ForwarderZipCopierRole`: ForwarderZipCopier Lambda 関数が S3 バケットに Forwarder デプロイの ZIP ファイルをダウンロードするための実行ロール。

**IAM ステートメント**:

```json
[
  {
    "Effect": "Allow",
    "Action": [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ],
    "Resource": "*"
  },
  {
    "Action": ["s3:PutObject", "s3:DeleteObject"],
    "Resource": "<S3Bucket to Store the Forwarder Zip>",
    "Effect": "Allow"
  },
  {
    "Action": ["s3:ListBucket"],
    "Resource": "<S3Bucket to Store the Forwarder Zip>",
    "Effect": "Allow"
  }
]
```

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog の Lambda 関数で AWS サービスのログを送信する][2]

[1]: https://github.com/DataDog/datadog-lambda-extension
[2]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[3]: https://docs.datadoghq.com/ja/serverless/guide/extension_motivation/
[4]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[5]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/template.yaml
[9]: https://github.com/DataDog/datadog-serverless-functions/releases
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://chat.datadoghq.com/
[12]: https://github.com/your-username/datadog-serverless-functions/compare/datadog:master...master
[13]: https://docs.datadoghq.com/ja/getting_started/site/
[14]: https://docs.datadoghq.com/ja/agent/guide/private-link/?tab=logs#create-your-vpc-endpoint
[15]: https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint
[16]: https://github.com/DataDog/datadog-serverless-functions/releases/tag/aws-dd-forwarder-3.41.0
[17]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/haproxy.txt
[18]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/nginx.txt
[19]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-console
[20]: https://app.datadoghq.com/organization-settings/api-keys
[21]: https://docs.datadoghq.com/ja/logs/processing/pipelines/
[22]: https://docs.datadoghq.com/ja/agent/guide/private-link/
[23]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-aws-serverless.html
[24]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#log-date-remapper