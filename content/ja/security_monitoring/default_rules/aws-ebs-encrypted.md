---
aliases:
  - /ja/146-kl4-mas
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: ebs
security: コンプライアンス
source: ebs
title: EBS ボリュームは暗号化されています
type: security_rules
---
## 説明

Elastic Block Store (EBS) の暗号化を有効にします。

## 根拠

EBS で使用される AES-256 暗号化は、ボリュームに保存されているデータ、ディスク I/O、およびボリュームから作成されたスナップショットを保護して、機密データをエクスプロイトや不正なユーザーから保護します。

## 修復

### コンソール

[EBS 暗号化][1]のドキュメントに従って、AWS コンソールで暗号化を有効にするための要件と方法について確認してください。

### CLI

1. `enable-ebs-encryption-by-default` を実行して[現在のリージョンでアカウントの暗号化を有効にします][2]。

2. `get-ebs-encryption-by-default` を実行して、暗号化が有効になっていることを確認します。

EBS 暗号化に関連する追加のコマンドについては、[API と CLI を使用した暗号化のデフォルトの設定][3]のドキュメントを参照してください。

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#ebs-encryption-requirements
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/enable-ebs-encryption-by-default.html
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-by-default-api