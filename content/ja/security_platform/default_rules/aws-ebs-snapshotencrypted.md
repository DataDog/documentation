---
aliases:
  - /ja/n68-nzh-pl8
  - /ja/security_monitoring/default_rules/n68-nzh-pl8
  - /ja/security_monitoring/default_rules/aws-ebs-snapshotencrypted
cloud: AWS
disable_edit: true
integration_id: amazon-ebs
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: ebs
security: コンプライアンス
source: ebs
title: EBS スナップショットは暗号化されています
type: security_rules
---
## 説明

ボリュームスナップショット暗号化キーを使い、Amazon Elastic Block Store (EBS) スナップショットを暗号化します。

## 根拠

Amazon EBS スナップショットは機密性の高いデータを含み、一般にアクセス可能なスナップショットはコピーされる可能性があります。AWS Key Managementを使用して、悪用や不正なユーザーからデータを保護します。

## 修復

### コンソール

[EBS 暗号化のデフォルトキー][1] ドキュメントに従い、AWS コンソールでスナップショットを暗号化する方法を確認します。

### CLI

1. `get-ebs-default-kms-key-id` を実行し、[デフォルトの CMK][2] を記述します。

2. 新しいキーを作成するには、[キーの作成][3] AWS コンソールドキュメントや  [create-key][4] AWS CLI ドキュメントを参照します。

3. `--kms-key-id` で `modify-ebs-default-kms-key-id` を実行し、[EBS ボリュームを暗号化するのに使用するデフォルトの CMK を変更します][3]。

詳細は、[API と CLI を使用した暗号化のデフォルトの設定][6]のドキュメントを参照してください。

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#EBSEncryption_key_mgmt
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/get-ebs-default-kms-key-id.html
[3]: https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kms/create-key.html
[5]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/modify-ebs-default-kms-key-id.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-by-default-api