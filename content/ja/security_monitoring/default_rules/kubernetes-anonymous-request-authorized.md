---
aliases:
  - /ja/37f-a98-5cd
disable_edit: true
kind: documentation
rule_category:
  - ログの検出
source: kubernetes
title: 匿名リクエストの承認
type: security_rules
---
## 概要

### 目標
認証されていないリクエストユーザーが Kubernetes で許可されていることを検出します。

### 戦略
このルールは、認証されていないユーザー (`@user.username:\"system:anonymous\"`) に対してアクションが許可されるタイミング (`@http.status_code:[100 TO 299]`) を監視します。
`/healthz` エンドポイントは通常、認証されずにアクセスされ、クエリフィルターから除外されます。

### トリアージと対応
1. アクセスされたすべての HTTP パスを調べて、認証されていないユーザーがパスのいずれかを許可する必要があるかどうかを判断します。
2. 機密データが含まれている可能性のある Kubernetes エンドポイントにアクセスした IP アドレスを特定します。