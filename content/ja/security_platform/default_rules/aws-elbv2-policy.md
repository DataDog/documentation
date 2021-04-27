---
aliases:
  - /ja/vn4-vpi-u7q
  - /ja/security_monitoring/default_rules/vn4-vpi-u7q
  - /ja/security_monitoring/default_rules/aws-elbv2-policy
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elbv2
security: コンプライアンス
source: elbv2
title: ELBv2 ロードバランサーは最新のセキュリティポリシーを使用しています
type: security_rules
---
## 説明

事前定義された最新の AWS セキュリティポリシーで Amazon Application Load Balancer (ALB) の安全性を確保。

## 根拠

安全でない非推奨のセキュリティポリシーでは、クライアントやロードバランサーをさまざまな SSL/TLS 脆弱性にさらす危険性があります。

## 修復

### コンソール

[セキュリティポリシーの更新][1]ドキュメントで、最新のセキュリティポリシーにより HTTPS リスナーを更新する方法をご確認ください。

### CLI

[リスナーおよび推奨される SSL ポリシーの ARN][2] を使用して `modify-listener` を実行します。

    {{< code-block lang="bash" filename="create-listener.sh" >}}
    aws elbv2 create-listener
        --load-balancer-arn arn:aws:elasticloadbalancing:region:123456789012:loadbalancer/app/my-load-balancer/12ab3c456d7e8912
        --ssl-policy ELBSecurityPolicy-2016-08 --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:region:123456789012:targetgroup/my-targets/12ab3c456d7e8912
    {{< /code-block >}}

[セキュリティポリシー][3]ドキュメントで、Amazon が推奨するセキュリティポリシーを確認します。

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-certificates.html#update-security-policy
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elbv2/modify-listener.html
[3]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies