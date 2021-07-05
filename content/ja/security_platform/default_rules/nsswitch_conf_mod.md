---
aliases:
  - /ja/pzv-32s-1sa
  - /ja/security_monitoring/default_rules/pzv-32s-1sa
  - /ja/security_monitoring/default_rules/nsswitch_conf_mod
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
title: Nsswitch コンフィギュレーションの変更
type: security_rules
---
## 目標
nsswitch.conf の修正を検出します。

## 戦略
Name Service Switch (nsswitch) コンフィギュレーションファイルは、システムサービスやその他のアプリケーションをネームサービス情報のソースへ向ける際に使用します。このネームサービス情報には、パスワードファイルが保管されている場所やパブリックキー情報などが含まれています。サイバーアタッカーは、自分が持っている情報を認証プロセスに送り込むために、nsswitch.conf を修正しようとする場合があります。例えば、悪意のあるパスワードファイルを使って、保護されたユーザーアカウントにログインできます。

## トリアージと対応
1. nsswitch.conf への変更を確認します。
2. 重要なネームサービスソースが変更されたか、その変更は既知のシステム設定やメンテナンスの一環として行われたかを確認します。
3. 変更が未承認である場合は、問題のホストを既知の安全な nsswitch.conf へロールバックするか、システムを既知の安全なシステムイメージと置き換えます。