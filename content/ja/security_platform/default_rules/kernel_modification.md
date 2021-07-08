---
aliases:
  - /ja/mzz-4y1-zai
  - /ja/security_monitoring/default_rules/mzz-4y1-zai
  - /ja/security_monitoring/default_rules/kernel_modification
control: ''
disable_edit: true
framework: ''
integration_id: ファイル整合性モニタリング
kind: documentation
rule_category:
  - ワークロードセキュリティ
scope: ''
security: コンプライアンス
source: ファイル整合性モニタリング
title: カーネルの変更
type: security_rules
---
## 目標
`/boot/` ディレクトリへの変更を検出します。

## 戦略
Linux の /boot/ ディレクトリには、システムの起動に必要なすべてが含まれています。これには、カーネルおよびその他の重要なブートファイルとデータもあります。攻撃者は、悪意のあるコードやコンフィギュレーションを挿入するため /boot/ ディレクトリの変更を試みることがあります。これにより、悪意のあるコードまたはコンフィギュレーションをブート時に実行することで、攻撃者が継続的に攻撃をしたり、昇格したシステム権限で悪意のあるコードを実行したりできるようになります。

## トリアージと対応
1. `/boot/` ディレクトリへの変更を確認します。
2. 起動スクリプトや保守など、既知のシステムアクティビティと変更をクロスチェックします。
3. 変更内容に同意できない場合は、問題のホストまたはコンテナを停止し、既知の `/boot/` コンフィギュレーションへロールバックします。