---
aliases:
  - /ja/cf4-844-4a0
control: cis-3.5
disable_edit: true
framework: cis-aws
kind: ドキュメント
rule_category:
  - ログの検出
scope: cloudtrail
security: コンプライアンス
source: cloudtrail
title: AWS CloudTrail コンフィギュレーションの変更
type: security_rules
---
### 目標
CloudTrail を無効化または変更することにより、攻撃者が防御を回避しようとしていることを検出します。

### 戦略
このルールにより、次の CloudTrail API 呼び出しを監視して、攻撃者が CloudTrail を変更または無効化しているかどうかを検出できます。

* [DeleteTrail][1]
* [UpdateTrail][2]
* [StopLogging][3]

### トリアージと対応
1. この API 呼び出しを行った API キーを所有している組織内のユーザーを特定します。
2. ユーザーに連絡して、この API 呼び出しを行うつもりであったかどうかを確認します。
3. ユーザーが API 呼び出しを行わなかった場合
 * 資格情報をローテーションします。
 * 同じ資格情報が他の不正な API 呼び出しを行ったかどうかを調べます。

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_DeleteTrail.html
[2]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_UpdateTrail.html
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_StopLogging.html