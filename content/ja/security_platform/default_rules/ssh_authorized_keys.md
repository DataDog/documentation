---
aliases:
  - /ja/e59-lrj-bki
  - /ja/security_monitoring/default_rules/e59-lrj-bki
  - /ja/security_monitoring/default_rules/ssh_authorized_keys
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
title: 修正された SSH 認証キーの変更
type: security_rules
---
## 目標
認証済みの SSH キーへの変更を検出します。

## 戦略
SSH は広く用いられているキーベースの認証メカニズムです。このシステムでは、authorized_keys のファイルが、システム上で指定されたユーザーとして認証する際に使用できる SSH キーを指定します。サイバーアタッカーは、所有する SSH キーを認証するため authorized_keys ファイルを変更することがあります。指定されたユーザーとしてアタッカーがシステムに入り込んだ状態を維持できるようにするのです。

## トリアージと対応
1. authorized_keys への変更内容と、対象ユーザーを確認します。
2. キーが追加されたかどうかを確認します。追加されていた場合は、そのキーが既知の信頼できるユーザーのものであるかどうかを特定します。
3. 問題のキーが許容できない場合は、問題のホストまたはコンテナを、既知の信頼できる SSH コンフィギュレーションへロールバックします。