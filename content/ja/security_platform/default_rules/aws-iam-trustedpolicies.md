---
aliases:
  - /ja/7hk-tff-0fv
  - /ja/security_monitoring/default_rules/7hk-tff-0fv
  - /ja/security_monitoring/default_rules/aws-iam-trustedpolicies
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: iam
security: コンプライアンス
source: iam
title: IAM ロールは信頼できるプリンシパルを使用しています
type: security_rules
---
## 説明

Amazon IAM ポリシー内にプリンシパルを設定します。

## 根拠

信頼ポリシーは権限のエスカレーションに関連するリスクを低減するのに役立ちます。ポリシー内にプリンシパルを設定し、リソースへの不正アクセスのリスクを減らすことができます。

## 修復

### コンソール

[IAM ポリシーの編集][1]ドキュメントに従って、特定の IAM ユーザーまたはアカウントに権限を付与する方法を確認してください。

### CLI

[管理型ポリシーの編集 (AWS CLI)][2]ドキュメントに従って、CLI を使用して特定の IAM またはアカウントに権限を付与する方法を確認してください。

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-edit.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-edit.html#edit-policies-cli-api