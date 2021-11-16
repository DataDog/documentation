---
aliases:
  - /ja/8dl-66d-taa
  - /ja/security_monitoring/default_rules/8dl-66d-taa
  - /ja/security_monitoring/default_rules/m365-teams-app-installed
disable_edit: true
integration_id: microsoft-365
kind: documentation
rule_category:
  - ログの検出
source: microsoft-365
title: Microsoft 365 Teams アプリのインストール
type: security_rules
---
### 目標
ユーザーが Microsoft 365 Teams にアプリをインストールしたことを検出します。

### 戦略
このルールは、Microsoft 365 ログでイベント名 `AppInstalled` を監視します。

### トリアージと対応
1. このアプリを Microsoft 365 Teams にインストールする必要があるかどうかを判断します。