---
aliases:
  - /ja/g5g-xiy-sbf
  - /ja/security_monitoring/default_rules/g5g-xiy-sbf
  - /ja/security_monitoring/default_rules/logs_removed
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
title: /var/log/ 内のログファイルが削除された場合
type: security_rules
---
## 目標
多くの攻撃者はホストやコンテナに自身の痕跡を残さないよう、検知を回避しようとします。一般的な方法としては、攻撃についてのログが残ってしまう重要なシステムログを削除または修正するなどがあります。この検知機能では、攻撃者が自身の足跡を消そうとログデータを改ざんする隠滅行為を検知することを目指しています。

## 戦略
この検知機能は `/var/log` 階層下におけるログファイルの削除を監視します。ここには Linux の重要なログファイルが多く保存されています。

## トリアージと対応
1. 削除されたログファイル名を確認します。
2. どのユーザーまたはプロセスがログを削除したかを確認します。
3. この行為が期待したものでない場合は、ホストまたはコンテナを停止し、既知の良質なコンフィギュレーションへとロールバックします。