---
aliases:
  - /ja/522-190-266
disable_edit: true
kind: ドキュメント
rule_category:
  - ログの検出
scope: gcp.gce.firewall.rule
security: コンプライアンス
source: gcp
title: GCP GCE ファイアーウォール規則の変更
type: security_rules
---
### 目標
ファイアーウォール規則の作成、変更、削除を検出します。

### 戦略
GCP GCE アクティビティ監査ログをモニターし、以下のメソッドがいつ呼び出されたかを判断します。

* `v1.compute.firewalls.delete`
* `v1.compute.firewalls.insert`
* `v1.compute.firewalls.patch` 

### トリアージと対応
1. ログとロールをチェックし、アクセス許可の範囲が正しいことを確認します。
2. ロールに関連付けられたユーザーをチェックし、ロールにアタッチしたアクセス許可を持っていることを確認します。