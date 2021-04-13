---
aliases:
  - /ja/chz-onk-sn5
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: elb
security: コンプライアンス
source: elb
title: ELB セキュリティポリシーには安全な暗号が含まれます
type: security_rules
---
## 説明

Elastic Load Balancer (ELB) の SSL を安全な暗号で更新します。

## 根拠

安全ではない暗号や古い暗号を使用する SSL 接続は、脆弱性を悪用される危険があります。

## 修復

### コンソール

安全な SSL 暗号を構成する方法については、[SSL ネゴシエーションの構成(クラシックロードバランサー)][1] のドキュメントを参照してください。

### CLI

1. `describe-load-balancer-policies` を実行し、[定義済みのセキュリティポリシーを一覧表示します][2]。

    {{< code-block lang="bash" filename="describe-load-balancer-policy.sh" >}}
    aws elb describe-load-balancer-policies
    --output table
    {{< /code-block >}}

2. 前のステップにある SSL 構成のいずれかを使用して、`create-load-balancer-policy` を実行し、[安全な暗号を使いセキュリティポリシーを作成します][3]。

    {{< code-block lang="bash" filename="create-load-balancer-policy.sh" >}}
    aws elb create-load-balancer-policy
        --load-balancer-name YourLoadBalancerName
        --policy-name YourCustomSecurityPolicy
        --policy-type-name YourPolicyTypeName
        --policy-attributes AttributeName=Protocol-TLSv1.2,AttributeValue=true AttributeName=Protocol-TLSv1.1,AttributeValue=true AttributeName=ECDHE-RSA-AES128-SHA,AttributeValue=true AttributeName=Server-Defined-Cipher-Order,AttributeValue=true
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-ssl-security-policy.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elb/describe-load-balancer-policies.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elb/create-load-balancer-policy.html