---
title: ユーザーの作成
type: apicontent
order: 36.1
external_redirect: /api/#create-user
---

## ユーザーの作成

オーガニゼーションのユーザーを作成します。

**引数**:

ユーザーは `"type":"users"` の JSON オブジェクトで、以下の要素を取ります。

* **`roles`** [*任意*]: ユーザーに割り当てられるロールの配列。各ロールは `"type": "roles"` とユーザーに割り当てるロール ID である `id` を持つオブジェクトです。
* **`attributes.email`** [*必須*]: 新しいユーザーのメールアドレス。
* **`attributes.name`** [*任意*]: 新しいユーザーの名前。
* **`attributes.title`** [*任意*]: 新しいユーザーのタイトル。