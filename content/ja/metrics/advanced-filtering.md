---
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
- link: /logs/explorer/search_syntax/
  tag: ドキュメント
  text: ログクエリーフィルターと検索構文
- link: /dashboards/functions/exclusion/
  tag: Documentation
  text: 除外関数
kind: documentation
title: 高度なフィルタリング
---

## 概要

メトリクスエクスプローラー、モニター、またはダッシュボードを使用してメトリクスデータをクエリする場合、データをフィルタリングして、返される時系列のスコープを絞り込むことができます。メトリクスの右側にある **from** フィールドを使用して、任意のメトリクスをタグでフィルタリングできます。

また、ブール値またはワイルドカードのタグ値フィルターを使用して、高度なフィルタリングを実行することもできます。ログ、トレース、ネットワーク・モニタリング、リアルユーザーモニタリング、Synthetics、セキュリティなど、メトリクスデータ以外のクエリについては、[ログ検索構文][1]ドキュメントを参照して、構成してください。

## ブールでフィルタリングされたクエリ

次の構文は、ブールでフィルタリングされたメトリクスクエリでサポートされています。

- `!`
- `,`
- `NOT`, `not`
- `AND`, `and`
- `OR`, `or`
- `IN`, `in`
- `NOT IN`, `not in`

複数のタグを含めたり除外したりする場合:
* 含めるには `AND` ロジックを使用します
* 除外するには `OR` ロジックを使用します

タグの詳細については、[タグの使い方の概要][2]をご覧ください。

**注:** 記号のブール構文 (`!`、`,`) は、機能的な構文演算子 (`NOT`、`AND`、`OR`、`IN`、`NOT IN`) と一緒に使用できません。以下のクエリは _無効_ とみなされます。
`avg:mymetric{env:prod AND !region:us-east}`

### ブールでフィルタリングされたクエリの例

以下の例を使用するには、コードアイコン `</>` をクリックして UI にクエリエディターを表示し、クエリ例をコピーしてクエリエディターに貼り付けてください。

```
avg:system.cpu.user{env:staging AND (availability-zone:us-east-1a OR availability-zone:us-east-1c)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/graph_editor_code_option.mp4" alt="コードアイコンをクリックすると、生のクエリが表示されます" video=true >}}

```
avg:system.cpu.user{env:shop.ist AND availability-zone IN (us-east-1a, us-east-1b, us-east4-b)} by {availability-zone}
```

{{< img src="metrics/advanced-filtering/boolean_and_in.png" alt="ブール値の例 AND IN" style="width:100%;" >}}
```
avg:system.cpu.user{env:prod AND location NOT IN (atlanta,seattle,las-vegas)}
```

{{< img src="metrics/advanced-filtering/boolean_not_in.png" alt="ブール値の例 NOT IN" style="width:100%;" >}}

## ワイルドカードでフィルタリングされたクエリ

タグ値のプレフィックスとサフィックスのワイルドカードマッチングがサポートされています。
-  `pod_name: web-*` 
-  `cluster:*-trace`

**注**: 同じフィルターでのプレフィックスとサフィックスのワイルドカードマッチングはサポートされていません。

### ワイルドカードでフィルタリングされたクエリの例

```
avg:system.disk.in_use{!device:/dev/loop*} by {device}
```

{{< img src="metrics/advanced-filtering/wildcard_suffix.png" alt="サフィックスとして使用されるワイルドカード" style="width:100%;" >}}
```
sum:kubernetes.pods.running{service:*-canary} by {service}
```

{{< img src="metrics/advanced-filtering/wildcard_prefix.png" alt="プレフィックスとして使用されるワイルドカード" style="width:100%;" >}}

## 除外関数

クエリに[除外関数][3]を追加することで、
- N/A 値を除外します。
- しきい値を満たしたメトリクスに、最小値または最大値を適用します。
- しきい値以上または以下の値を除外します。

関数は Datadog からデータポイントを削除しませんが、可視化からデータポイントを削除します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search_syntax/
[2]: /ja/getting_started/tagging/using_tags/
[3]: /ja/dashboards/functions/exclusion/