---
aliases:
  - /ja/fby-542-vkr
  - /ja/security_monitoring/default_rules/fby-542-vkr
  - /ja/security_monitoring/default_rules/aws-elbv2-accesslogs
cloud: AWS
disable_edit: true
integration_id: amazon-elbv2
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elbv2
security: コンプライアンス
source: elbv2
title: ELBv2 はアクセスログを生成しています
type: security_rules
---
## 説明

Amazon Application Load Balancer (ALB) のアクセスログを有効にします。

## 根拠

ログには、リクエストが受信された時刻、クライアントの IP アドレス、レイテンシー、リクエストパス、サーバーの応答が含まれます。この情報を使用して、トラフィックパターンを分析し、問題のトラブルシューティングを行うことができます。

## 修復

### コンソール

AWS の [アクセスログの有効化][1]ドキュメントに従って、コンソールを使用してアクセスログを有効にします。

### CLI

AWS の [アクセスログの有効化][1]ドキュメントに従って、AWS CLI を使用してアクセスログを有効にします。

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging