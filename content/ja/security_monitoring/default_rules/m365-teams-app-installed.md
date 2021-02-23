---
aliases:
  - /ja/8dl-66d-taa
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
source: microsoft-365
title: Microsoft 365 Teams アプリのインストール
type: security_rules
---
## 概要

### 目標
ユーザーが Microsoft 365 Teams にアプリをインストールしたことを検出します。

### 戦略
このルールは、Microsoft 365 ログでイベント名 `AppInstalled` を監視します。

### トリアージと対応
1. このアプリを Microsoft 365 Teams にインストールする必要があるかどうかを判断します。