---
aliases:
  - /ja/hsh-y5w-hxe
  - /ja/security_monitoring/default_rules/hsh-y5w-hxe
  - /ja/security_monitoring/default_rules/cis-aws-1.3.0-1.10
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: iam
security: コンプライアンス
source: iam
title: コンソールパスワードを使用するすべての IAM ユーザーに多要素認証が有効化されています。
type: security_rules
---
## 説明

多要素認証 (MFA) により、ユーザー名とパスワードに加えてさらに強固な保護が追加されます。MFA が有効の場合、ユーザーが AWS ウェブサイトにサインインする際、ユーザー名とパスワードと同時に AWS MFA デバイスからの認証コードの入力が求められます。コンソールのパスワードがあるすべてのアカウントに MFA を有効にすることを推奨します。

## 根拠

MFA を有効にすると、時間が重要となるキーを生成し資格情報の知識を持つデバイスの所有に認証原則を要求するため、コンソールへのアクセスにさらなるセキュリティを提供できます。

## 修復

コンソールの修復手順については、[CIS AWS Foundations ベンチマークコントロールのドキュメント][1]を参照してください。

## 影響

なし

## デフォルト値

なし

## リファレンス

1. [http://tools.ietf.org/html/rfc6238][2]
2. [http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html][3]
3. [https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#enable-mfa-for-privileged-users][4]
4. [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html][5]
5. CCE-78901-6

## CIS Controls

4.5 すべての管理者アクセスに多要素認証を使用 - すえての管理者アカウントへのアクセスには多要素認証および暗号化チャネルを使用します。

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: http://tools.ietf.org/html/rfc6238
[3]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#enable-mfa-for-privileged-users
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html