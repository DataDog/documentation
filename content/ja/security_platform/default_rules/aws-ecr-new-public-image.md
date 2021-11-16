---
aliases:
  - /ja/bdv-1hj-qoq
  - /ja/security_monitoring/default_rules/bdv-1hj-qoq
  - /ja/security_monitoring/default_rules/aws-ecr-new-public-image
disable_edit: true
integration_id: ecr
kind: documentation
rule_category:
  - ログの検出
scope: ecr
security: attack
source: cloudtrail
tactic: TA0010-exfiltration
technique: T1567-exfiltration-over-web-service
title: AWS ECR でパブリックリポジトリの新しいコンテナイメージを検出
type: security_rules
---
## 目標

パブリック ECR に新しいイメージがアップロードされると検知します。これは、クラウドからのデータ流出ルートになり得ます。また、会社が消費者用のコンテナをここでホストする場合、サプライチェーン効果となる可能性もあります。

注: Amazon ECR では、ユーザーがレジストリを検証し Amazon ECR リポジトリにイメージをプッシュする前に、IAM ポリシーにより `ecr-public:GetAuthorizationToken` および `sts:GetServiceBearerToken` を呼び出す権限を所有している必要があります。

## 戦略

`@evt.name:PutImage` が `ecr-public.amazonaws.com` API に対して使用されると検知します。

## トリアージと対応
1. AWS アカウント `{{@usr.account_id}}` で、`{{@responseElements.image.imageId.imageDigest}}` が `{{@responseElements.image.repositoryName}}` リポジトリの `{{@responseElements.image.imageId.imageTag}}` タグを持つ有効な sha256 ハッシュであることを確認します。
2. そのコンテナイメージでハッシュが有効でない場合、コンテナイメージが不正な目的でそこに配置されたのかどうかを確認します。