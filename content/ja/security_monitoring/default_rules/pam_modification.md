---
aliases:
  - /ja/tz1-6vg-1yz
control: ''
disable_edit: true
framework: ''
kind: documentation
rule_category:
  - ランタイムエージェント
scope: ''
security: コンプライアンス
source: ファイル整合性モニタリング
title: PAM コンフィギュレーションファイルの変更
type: security_rules
---
## 目標
`pam.d` ディレクトリへの変更を検出します。

## 戦略
Linux の Pluggable Authentication Modules (PAM) は、アプリケーションやサービスの認証を提供しています。PAM システム内での認証モジュールは、`/etc/pam.d/` ディレクトリの下で設定、構成されています。サイバーアタッカーは、認証プロセスをくぐり抜け、システムの証明書を見破る目的で、PAM 内の認証モジュールを変更、追加しようとすることがあります。

## トリアージと対応
1. `/etc/pam.d/` への変更を確認します。
2. 変更が既知のシステム設定やメンテナンスの一環として行われたのかを確認します。
3. 変更が未承認である場合は、問題のホストを既知の安全な PAM コンフィギュレーションへロールバックするか、システムを既知の安全なシステムイメージと置き換えます。