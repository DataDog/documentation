---
aliases:
  - /ja/g1t-jj4-k8k
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: ebs
security: コンプライアンス
source: ebs
title: EBS ボリュームスナップショットは他の AWS アカウントに公開されません
type: security_rules
---
## 説明

Amazon Elastic Block Store (EBS) スナップショットを保護します。

## 根拠

公開されている Amazon EBS ボリュームスナップショットには、閲覧、複製、悪用される可能性のある機密性の高いアプリケーションデータが含まれます。

## 修復

### コンソール

EBS 暗号化を実装する方法については、[EBS 暗号化][1]ドキュメントを参照してください。デフォルトで暗号化されているパブリックスナップショットはサポートされていません。

    **注**: 暗号化されたスナップショットを特定のアカウントと共有できます。

### CLI

1. `enable-ebs-encryption-by-default` を実行して[現在のリージョンでアカウントの暗号化を有効にします][2]。

2. `get-ebs-encryption-by-default` を実行して、暗号化が有効になっていることを確認します。

EBS 暗号化に関連する追加のコマンドについては、[API と CLI を使用した暗号化のデフォルトの設定][3]のドキュメントを参照してください。

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#how-ebs-encryption-works
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-by-default-api
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/enable-ebs-encryption-by-default.html