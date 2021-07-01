---
aliases:
  - /ja/rx6-2a3-fac
  - /ja/security_monitoring/default_rules/rx6-2a3-fac
  - /ja/security_monitoring/default_rules/hidden_file
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
title: 隠しファイルが作成されました
type: security_rules
---
## 目標
ホストおよびコンテナで検出メカニズムから逃れるため、サイバー犯罪者が隠しファイルを使用して攻撃することがあります。この機能は、新規作成されたあらゆる隠しファイルを検出することを目的としています。

## 戦略
Linux では、ユーザが作成した隠しファイルの名前の先頭には `.` が追加されます（例: `.some.file`）。この検出機能では、`.` で始まるファイル名のファイルの作成を監視します。

## トリアージと対応
1. どのユーザーまたはプロセスが隠しファイルを新規作成したかを確認します。
3. この新規ファイルが期待したものでない場合、ホストまたはコンテナを停止し、既知の良質なコンフィギュレーションへとロールバックします。