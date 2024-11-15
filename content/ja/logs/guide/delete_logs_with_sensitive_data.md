---
disable_toc: false
further_reading:
- link: logs/guide/control-sensitive-logs-data/
  tag: ドキュメント
  text: 機密ログデータの管理
- link: /sensitive_data_scanner/
  tag: ドキュメント
  text: センシティブ データ スキャナー
title: 機密データを含むログを削除する
---

## 概要

データのセキュリティを確保するためには、機密データを含むログを削除することが重要です。このガイドでは、以下の内容について説明します。

- 機密データを含むログが保存期間内であるために削除が必要かどうかを確認する方法。
- 機密データを含むログをクエリ不可にする方法。
- 機密データスキャナーで機密データを秘匿化する方法。
- Datadog サポートにログの削除を依頼する方法。

## ログの保存期間を確認する

Datadog は、組織で定められた最長保存期間を超えたログを自動的に削除します。

ログの保存期間を確認または変更するには:

1. [Log Indexes][1] ページに移動します。
1. **Retention** 列で各インデックスについてログの保存期間を確認します。
1. ログをより早く期限切れにしたい場合は、インデックスの右側にある**編集**アイコンをクリックします。
1. **Set Index Retention** ドロップダウンメニューを更新して、新しい保存期間にします。

## 機密データを含むログをクエリ不可にする

機密データを含むログが保存期間内にある場合、ログが期限切れになるまで、Datadog のログエクスプローラー、ダッシュボード 、および Live Tail でクエリ不可にすることができます。クエリ不可となったログは、クエリまたは閲覧ができません。Datadog で機密データを含むログをクエリ不可にするには、こちらの[手順][2]に従ってください。

## インデックス全体を削除する

インデックス全体を削除するには:

1. [Log Indexes][1] ページに移動します。
1. 削除したいインデックスの右側にある**削除**アイコンをクリックします。
1. **Confirm** をクリックしてインデックスを削除します。

**注**: インデックスは、ログが期限切れになるまで削除待ちとして表示されます。その後、インデックスは完全に削除され、UI から削除されます。

## 機密データスキャナーで機密データを秘匿化する

Datadog に機密データを保存するリスクを抑えるには、[機密データスキャナー][5]を使用します。機密データスキャナーは、ストリームベースのパターンマッチングサービスで、機密データの特定、タグ付け、オプションで秘匿化やハッシュ化に使用されます。セキュリティおよびコンプライアンスチームは、機密データスキャナーを導入することで、機密データの漏洩を防ぎ、コンプライアンス違反のリスクを抑えることができます。

## ログの削除リクエストを送信する

<div class="alert alert-warning">
ログの削除を依頼できるのは、Datadog 管理者のみです。管理者でない場合は、管理者が削除リクエストを確認できるように、必ずリクエストに管理者を含めるようにしてください。
</div>

保存期間の変更、クエリ対象からのログの除外、機密データスキャナーを使った機密データの秘匿化、といったオプションだけではデータのセキュリティを確保できない場合は、[Datadog サポート][3]にリクエストを送信して、機密データを含むインデックス付きログの削除を依頼してください。リクエストには以下の情報が必要です。

1. 機密データを含むログが現在、Datadog に送信されていないことの確認。
1. 時間枠を限定した削除なのか、[インデックス全体の削除](#delete-an-entire-index)依頼なのかの確認。
1. 機密データが送信された正確な組織名と[サイト][4] (例: US1)。
1. 時間枠を限定した削除依頼の場合、機密データを含むログの正確な時間範囲 (エポック または UTC 形式)。
1. 機密データがあるインデックスの名前。
1. 以下の条件を理解していることの確認:
   <div class="alert alert-danger">
   Datadog deletes logs by time buckets, not by query scope or precise time frame. Therefore, Datadog might have to delete a larger amount of data than your exposed logs. For example. if you need to delete all error logs from <code>service:x</code> that came in between 10:00 a.m. to 12:00 p.m. from <code>index:main</code>, Datadog might have to delete all logs in that index from 1:00 a.m. to 5:00 p.m. Datadog support will work with you to ensure that only the necessary data is deleted.
   </div>

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /ja/logs/guide/control-sensitive-logs-data/#make-sensitive-logs-un-queryable-in-datadog-until-they-age-out
[3]: /ja/help/
[4]: /ja/getting_started/site/
[5]: https://www.datadoghq.com/product/sensitive-data-scanner/