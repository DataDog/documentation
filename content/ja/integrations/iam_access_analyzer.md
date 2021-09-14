---
categories:
  - cloud
  - aws
  - ログの収集
  - security
ddtype: crawler
description: null
short_description: null
doc_link: 'https://docs.datadoghq.com/integrations/iam_access_analyser/'
git_integration_title: amazon_iam_access_analyser
has_logo: true
integration_title: AWS Identity and Access Management (IAM) Access Analyzer
is_public: true
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/iam_access_analyzer.md'
kind: インテグレーション
manifest_version: 1
name: iam_access_analyzer
public_title: Datadog-AWS Identity and Access Management Access Analyzer
version: 1
integration_id: iam-access-analyzer
---
## 概要

Amazon アカウント全体で AWS Identity and Access Management (IAM) Access Analyzer 使用し、アカウントポリシーで付与された IAM アクセス許可を継続的に分析します。Datadog はログを Datadogに送信する Lambda 関数を使い、Amazon IAM Access Analyzer と統合します。

## セットアップ

### ログの収集

1. [Datadog ログコレクション AWS Lambda 関数][1]をまだセットアップしていない場合は、セットアップします。

2. AWS EventBridge で新しい規則を作成します。

3. 以下を使用し、カスタムイベントパターンを定義します。

    ```json
    {
        "source": ["aws.access-analyzer"]
    }
    ```

4. イベントバスを選択し、Datadog Lambda 関数をターゲットとして定義します。

5. 規則を保存します。

6. [ログエクスプローラー][2]に移動し、ログを確認します。

[1]: /ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[2]: https://app.datadoghq.com/logs