---
aliases:
  - /ja/sc8-pjc-tut
  - /ja/security_monitoring/default_rules/sc8-pjc-tut
  - /ja/security_monitoring/default_rules/passwd_execution
control: ''
disable_edit: true
framework: ''
integration_id: ランタイムセキュリティ
kind: documentation
rule_category:
  - ワークロードセキュリティ
scope: ''
security: コンプライアンス
source: ランタイムセキュリティ
title: 実行済みの Passwd ユーティリティ
type: security_rules
---
## 目標
`passwd` コマンドの実行を検出します。

## 戦略
`passwd` のオペレーティングシステムコマンドは、ユーザーアカウントのパスワードを変更するために使用されます。これが予期しない動作である場合は、攻撃者がホストマシンを危険にさらし永続的に攻撃しようとしていることを示している可能性があります。この検出は、`passwd` コマンドの実行が検出されるとトリガーされます。

## トリアージと対応
1. どのユーザーが `passwd` コマンドを実行したか、そしてこれが許可または期待されている動作であるかを判断します。
2. 動作が予期しないものである場合は、侵害の封じ込めを試み（攻撃の段階によっては、ワークロードを終了することで実現できる場合があります）、最初の侵害の兆候を探します。組織の内部プロセスに従い、侵害されたシステムを調査および修正します。
3. イベントの前後に発生するセキュリティシグナル (存在する場合) を調査して、攻撃パスを確立します。
4. エクスプロイトの根本原因を見つけて修復します。