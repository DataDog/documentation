---
aliases:
  - /ja/cut-36a-zvo
  - /ja/security_monitoring/default_rules/cut-36a-zvo
  - /ja/security_monitoring/default_rules/aws-es-endpointexposed
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: vpc
security: コンプライアンス
source: vpc
title: VPC エンドポイントは公開されていません
type: security_rules
---
## 説明

信頼できる AWS アカウントのみにアクセスを許可して、VPC エンドポイントのセキュリティを確保しましょう。

## 根拠

VPC エンドポイントを公開すると、データの暴露、データの損失、予期しない AWS への課金などのリスクが生じます。

## 修復

### コンソール

[エンドポイントサービスにアクセス許可を追加または削除する][1] AWS コンソールのドキュメントに従ってください。

### CLI

1. 既存の Amazon VPC エンドポイントのアクセスポリシーを編集し、信頼性の低い AWS 識別子を置換します。新しいポリシードキュメントを作成するには、[AWS Policy Generator][2] を使用してください。

  {{< code-block lang="bash" filename="vpc-access-policy.json" >}}
  {
    "Id": "VPCCrossAccountAccessPolicy",
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "*",
        "Effect": "Allow",
        "Resource": "*",
        "Principal": {
          "AWS": [
            "arn:aws:iam::0123456789012:root"
          ]
        }
      }
    ]
  }
  {{< /code-block >}}

2.  [VPC エンドポイント ID、および更新されたまたは新しいポリシードキュメント][3]で `modify-vpc-endpoint` を実行して既存のポリシーを置換します。

  {{< code-block lang="bash" filename="modify-vpc-endpoint.sh" >}}
  aws ec2 modify-vpc-endpoint
      --vpc-endpoint-id vpce-0a12b345
      --policy-document file://vpc-access-policy.json
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/privatelink/add-endpoint-service-permissions.html
[2]: https://awspolicygen.s3.amazonaws.com/policygen.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/modify-vpc-endpoint.html#synopsis