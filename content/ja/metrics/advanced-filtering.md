---
title: 高度なフィルタリング
kind: documentation
description: データをフィルタリングして、返されるメトリクスのスコープを絞り込みます。
further_reading:
  - link: /metrics/explorer/
    tag: Documentation
    text: メトリクスエクスプローラー
  - link: /metrics/summary/
    tag: Documentation
    text: メトリクスの概要
  - link: /metrics/distributions/
    tag: Documentation
    text: ディストリビューションメトリクス
---

## 概要

メトリクスエクスプローラー、モニター、ダッシュボード、またはノートブックを使用してメトリクスデータをクエリするかどうかに関係なく、データをフィルタリングして、返される時系列のスコープを絞り込むことができます。メトリクスの右側にある **from ドロップダウン**を使用して、任意のメトリクスをタグでフィルタリングできます。

{{< img src="metrics/advanced-filtering/tags.png" alt="タグでフィルタリングする"  style="width:80%;" >}}

ブールまたはワイルドカードタグ値フィルターを使用して高度なフィルタリングを実行することもできます。

### ブールでフィルタリングされたクエリ

次の構文は、ブールでフィルタリングされたメトリクスクエリでサポートされています。

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

#### ブールでフィルタリングされたクエリの例

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/ex1.png" alt="例 1"  style="width:80%;" >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/ex2.gif" alt="例 2"  style="width:80%;" >}}


### ワイルドカードでフィルタリングされたクエリ

タグ値のプレフィックスとサフィックスのワイルドカードマッチングがサポートされています。
-  `pod_name: web-*` 
-  `cluster:*-trace`.

#### ワイルドカードでフィルタリングされたクエリの例

```
avg:system.disk.in_use{!device:/dev/loop*} by {device}
```

{{< img src="metrics/advanced-filtering/wildcards1.gif" alt="例 1"  style="width:80%;" >}}

```
sum:kubernetes.pods.running{service:*-canary} by {service}
```

{{< img src="metrics/advanced-filtering/wildcards2.png" alt="例 2"  style="width:80%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
