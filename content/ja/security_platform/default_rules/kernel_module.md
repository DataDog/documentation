---
aliases:
  - /ja/4nu-jvj-zxf
  - /ja/security_monitoring/default_rules/4nu-jvj-zxf
  - /ja/security_monitoring/default_rules/kernel_module
disable_edit: true
fim: 'true'
integration_id: ファイル整合性モニタリング
kind: documentation
rule_category:
  - ワークロードセキュリティ
source: ファイル整合性モニタリング
title: カーネルモジュールが /lib/modules/ に追加された場合
type: security_rules
---
## 目標
カーネルモジュールはホストの起動時に自動でコードを実行するために使用できます。攻撃者は時にカーネルモジュールを使って特定のホストの永続性を取得し、システムの再起動後でも攻撃用のコードを実行してくることがあります。また、カーネルモジュールからシステムの管理者特権を取得することもできます。

## 戦略
カーネルモジュールは Linux の `/lib/modules` ディレクトリに読み込まれます。この検知機能は対象のディレクトリに作成されたすべての新規ファイルを監視します。

## トリアージと対応
1. 新規作成されたカーネルモジュール名を確認します。
2. どのユーザーまたはプロセスがモジュールを作成したかを確認します。
3. 新しいカーネルモジュールが期待したものでない場合は、ホストまたはコンテナを停止し、既知の良質なコンフィギュレーションへとロールバックします。