---
aliases:
  - /ja/cfd-f0b-f05
cloud: AWS
disable_edit: true
kind: ドキュメント
rule_category:
  - クラウドコンフィギュレーション
scope: ec2
security: コンプライアンス
source: ec2
title: すべてのポートで無制限のアウトバウンドアクセスを持つセキュリティグループ
type: security_rules
---
## 概要

### 説明
[EC2 セキュリティグループ][1]をチェックして、TCP/UDP ポートへの自由なアクセスを許可し、このポートを必要とする IP アドレスへのアクセスを制限するアウトバウンドルールを確認して、違反の確立を削減します。

### 根拠

サービス拒否 (DoS) や分散型サービス拒否 (DDoS) 攻撃など、悪意のあるアクティビティは、自由なアウトバウンドアクセスを許可すると発生する可能性があります。

### 修復

1. `revoke-security-group-egress` を実行して、選択された EC2 セキュリティグループの IP 許可を削除します。

    {{< code-block lang="bash" filename="revoke-security-group-egress.sh" >}}
    aws ec2 revoke-security-group-egress
        --group-id your-group-id
        --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 22, "ToPort": 22, "IpRanges": [{"CidrIp": "0.0.0.0/0"}]}]'
    {{< /code-block >}}

2. `authorize-security-group-egress` を新しいパラメーターで実行して、特定の送信先へのアウトバウンドアクセスを制限します。

    {{< code-block lang="bash" filename="authorize-security-group-egress.sh" >}}
    aws ec2 authorize-security-group-egress
        --group-id your-group-id
        --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 22, "ToPort": 22, "IpRanges": [{"CidrIp": "0.0.0.0/0"}]}]'
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html