---
aliases:
  - /ja/ecb-6e7-738
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
scope: ec2
security: attack
source: guardduty
tactic: TA0040-impact
technique: T1496-resource-hijacking
title: 暗号通貨サーバーと通信する AWS EC2 インスタンス
type: security_rules
---
### 目標
EC2 インスタンスが暗号通貨サーバーと通信していることを検出します

### 戦略
このルールを使用すると、GuardDuty を利用して、EC2 インスタンスが DNS リクエストを行ったこと、または暗号通貨操作に関連付けられている IP と通信していることを検出できます。次の GuardDuty Findings がこのシグナルをトリガーします。

* [CryptoCurrency:EC2/BitcoinTool.B!DNS][1]
* [CryptoCurrency:EC2/BitcoinTool.B][2]


### トリアージと対応
1. シグナルをトリガーしたドメイン名または IP アドレスを特定します。これはサンプルにあります。
2. ドメインまたは IP アドレスがリクエストされるべきでなかった場合は、セキュリティ調査を開き、ドメイン名または IP アドレスをリクエストしたプロセスを特定します。

[1]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_crypto.html#crypto3
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_crypto.html#crypto4