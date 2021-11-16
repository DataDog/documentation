---
aliases:
  - /ja/it2-cj4-gy6
  - /ja/security_monitoring/default_rules/it2-cj4-gy6
  - /ja/security_monitoring/default_rules/permissions_changed
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
title: 機密扱いの Linux ファイル権限が変更された場合
type: security_rules
---
## 目標
保護されたファイルやディレクトリにアクセスするために、攻撃者は対象のファイルおよびディレクトリ権限の変更を試みることがあります。

## 戦略
この検知機能は機密ファイルおよび `/etc/` and `/sbin/` などのディレクトリの権限変更を監視します。

## トリアージと対応
1. ファイルまたはディレクトリ権限が緩められていないかを確認します。
2. どのユーザーまたはプロセスが変更を行ったかを確認します。
3. これらの変更に覚えがない場合は、ホストまたはコンテナを停止し、既知かつ最新の良質なコンフィギュレーションへとロールバックします。