---
aliases:
  - /ja/5p8-ior-12f
  - /ja/security_monitoring/default_rules/5p8-ior-12f
  - /ja/security_monitoring/default_rules/aws-iam-roleprivilege
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: iam
security: コンプライアンス
source: iam
title: IAM ロールポリシーに最小特権の原則を適用します
type: security_rules
---
## 説明

IAM ロールを最小特権の原則に従って更新します。

## 根拠

IAM ロールに最小権限オプションを使用することで、AWS リソースとサービスへの不正アクセスのリスクを低減することができます。

## 修復

### コンソール

[IAM ポリシーを作成する (コンソール) ][1]ドキュメントに従って、AWS コンソールで IAM JSON ポリシーにアクセスする方法を確認します。これらの方法のそれぞれでアクションを設定し、[最小特権を付与][2]するか、タスクを実行するためにユーザーに必要なアクセス許可のみを付与することができます。詳しくは [IAM JSON ポリシーの要素: アクション][3]を参照してください。

### CLI

1. 既存のポリシーをお持ちの場合は、許可したいサービスのみを含む `Action` ブロックのある既存のポリシードキュメントを更新してください。ポリシーが存在しない場合は、[AWS Policy Generator][4] を使用するか、独自の IAM ポリシーを作成して JSON ファイル形式で保存します。

  {{< code-block lang="json" filename="your-iam-policy.json" >}}
  {
    ...
    "Statement": [
      {
        "Action": [
          "sqs:ReceiveMessage"
        ],
        "Effect": "Allow",
        "Resource": "*"
      }
    ]
  }
  {{< /code-block >}}

2. `create-policy-version` を[ポリシーの ARN、ポリシーの JSON ファイルで実行し、 `default` ポリシーとして保存します][5]。

  {{< code-block lang="bash" filename="create-policy-version.sh" >}}
  aws iam create-policy-version
      --policy-arn arn:aws:iam::012345678901:policy/sqs-policy
      --policy-document file://your-iam-policy.json
      --set-as-default
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html#access_policies_create-start
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-validation.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_action.html
[4]: https://awspolicygen.s3.amazonaws.com/policygen.html
[5]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/create-policy-version.html#synopsis