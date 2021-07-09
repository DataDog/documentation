---
aliases:
  - /ja/3ce-77d-28a
  - /ja/security_monitoring/default_rules/3ce-77d-28a
  - /ja/security_monitoring/default_rules/unrestricted_cifs_access
cloud: AWS
disable_edit: true
integration_id: amazon-ec2
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: ec2
security: コンプライアンス
source: ec2
title: インバウンド CIFS アクセスは制限されています
type: security_rules
---
## 説明

[EC2 セキュリティグループ][1]をチェックして、クライアント/サーバーアプリケーションで一般的に使用される TCP ポート 445 への自由なアクセスを許可し、このポートを必要とする IP アドレスへのアクセスを制限するインバウンドルールを確認して、違反の可能性を減らします。

## 根拠

サービス拒否 (DoS) や中間者攻撃 (MITM) などの悪意のあるアクティビティは、無制限の共通インターネットファイルシステム (CIFS) アクセスを許可すると発生する可能性があります。TCP ポート 445 は、TPC を介したネットワークノード間の通信手段としてクライアント/サーバーアプリケーションで一般的に使用されるポートです。

## 修復

### コンソール

特定のポートを必要とする IP アドレスへのアクセスを制限するセキュリティグループの規則を追加する方法については、[セキュリティグループの規則][4]ドキュメントを参照してください。

### CLI

1. `revoke-security-group-ingress` を実行して、[インバウンドルールを削除][2]し、ポート 445 への無制限のアクセスを許可します。

    {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
        aws ec2 revoke-security-group-ingress
            --group-name group-name
            --protocol tcp
            --port 445
            --cidr 0.0.0.0/0
    {{< /code-block >}}

2. `authorize-security-group-ingress` を実行して、[新しいインバウンドルールを追加][3]し、CIFS アクセスを制限します。

    {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
        aws ec2 authorize-security-group-ingress
            --group-name your-group-name
            --protocol tcp
            --port 445
            --cidr 192.0.2.0/24
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/revoke-security-group-ingress.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/authorize-security-group-ingress.html
[4]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules