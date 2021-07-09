---
aliases:
  - /ja/wnt-129-8hr
  - /ja/security_monitoring/default_rules/wnt-129-8hr
  - /ja/security_monitoring/default_rules/ssl_certificate_tampering
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
title: SSL 証明書の改ざん
type: security_rules
---
## 目標
SSL 証明書改ざんの可能性を検出します。

## 戦略
SSL 証明書や他の形式の信頼性管理によって、システム間の信頼性が構築されます。サイバーアタッカーは、システムやユーザーを騙して、偽のウェブサイトなどアタッカーが所有している資産や、違法に署名されたアプリケーションを信じさせようとするために、SSL 証明書などの信頼性管理に危害を加えようとします。

## トリアージと対応
1. インフラストラクチャーに保管されている SSL 証明書に変更が予定されていたかどうかを確認します。
3. 変更内容に同意できない場合は、問題のホストまたはコンテナを停止し、信頼できるコンフィギュレーションへロールバックします。