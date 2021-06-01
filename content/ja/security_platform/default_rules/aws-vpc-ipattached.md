---
aliases:
  - /ja/9mb-dam-hg0
  - /ja/security_monitoring/default_rules/9mb-dam-hg0
  - /ja/security_monitoring/default_rules/aws-vpc-ipattached
cloud: AWS
disable_edit: true
integration_id: amazon-vpc
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: vpc
security: コンプライアンス
source: vpc
title: IP アドレスはホストまたは ENI にアタッチされています
type: security_rules
---
## 説明

Amazon Elastic IP (EIP) アドレスを、AWS アカウントの EC2 インスタンスにアタッチします。

## 根拠

実行中の EC2 インスタンスまたは Elastic Network Interface (ENI) に関連付けられていない EIP は、[時間単位で AWS の請求が発生します][1]。

## 修復

### コンソール

[Elastic IP アドレスの割り当て][2]コンソールのドキュメントに従います。

### CLI

[Elastic IP アドレスの割り当て][2] AWS CLI のドキュメントに従います。

[1]: https://aws.amazon.com/premiumsupport/knowledge-center/elastic-ip-charges/
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#working-with-eips