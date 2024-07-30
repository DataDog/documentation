---
disable_toc: false
further_reading:
- link: /monitors/downtimes
  tag: Documentation
  text: ダウンタイムの概要
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: ガイド
  text: Downtimes API と UI によるアラートの抑制
title: ダウンタイムスケジュールのスコープ
---

## 概要

グループスコープを使用して、ダウンタイムスケジュールに追加のフィルターを適用し、どのモニターをミュートするかをよりコントロールすることができます。

このガイドの例では、`Group scope` を複数のアラートモニターに適用する方法を示します。

## モニター名で

### 特定のサービスの通知をミュートする

1. 1 つのグループ (この場合は `service:web-store`) のみでダウンタイムをスケジュールするには、そのグループを `Group scope` フィールドに入力します。
2. **Preview affected monitors** は、選択したモニターがまだスコープ内にあることを示しているため、グループ `service:web-store` のアラートはスケジュールされたダウンタイム中にミュートされます。

{{< img src="monitors/downtimes/downtime_examplebyname1_downtime.jpg" alt="'By Monitor Name' のダウンタイム例 (影響を受けるモニターのプレビュー付き)" style="width:80%;">}}

3. スケジュールされたダウンタイムが始まり、このモニターではグループ `service:web-store` のアラートのみがミュートされます。

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.png" alt="グループ service:web-store のダウンタイムを示す評価グラフ" style="width:80%;">}}

4. 複数のグループ (たとえば、`service:synthesizer` や `service:consul` など) でダウンタイムをスケジュールするには、グループごとに追加のダウンタイムを作成できます。

### `env` と `service` でグループ化されたモニターの特定の環境の通知をミュートする

1. グループの 1 つ (この場合は `env:dev`) でダウンタイムをスケジュールするには、そのグループを `Group scope` フィールドに入力します。
2. **Preview affected monitors** は、選択したモニターがまだスコープ内にあることを示しているため、グループ `env:dev` のアラートはスケジュールされたダウンタイム中にミュートされます。

{{< img src="monitors/downtimes/downtime_examplebyname2_downtime.jpg" alt="スコープ内の開発環境でのモニター名によるダウンタイム" style="width:80%;">}}

3. スケジュールされたダウンタイムが始まり、グループ `env:dev` **および** `dev` 環境に関連するすべてのサービスのアラートがミュートされます。

{{< img src="monitors/downtimes/downtime_examplebyname2_monitor.jpg" alt="グループステータスは、ダウンタイム中にミュートされた開発環境と関連サービスを示します" style="width:80%;">}}

4. 1 つ以上の "group by" (例: `env:dev` AND `service:web-store`) でダウンタイムをスケジュールするには、ダウンタイムに追加スコープを追加します。

## モニタータグで

スケジュールされたダウンタイムが共通のモニタータグに基づいており、スコープ内のモニターが 1 つの group by スコープを持つマルチアラートモニターである場合、`Group scope` フィールドを使用して、スコープ内のモニターが共通に持つグループをサイレントにできます。

### それぞれが 1 つの "group by" スコープを持つ 2 つのマルチアラートモニターには、共通の `downtime:true` モニタータグがあります。

1. *モニター A* は、複数の `service` グループにわたって平均されたメトリクスを報告するホスト用のマルチアラートモニターです。
2. *モニター B* は、`service:web-store` に対して同じメトリクスを報告するホスト用のマルチアラートモニターです。
3. ダウンタイムは、`downtime:true` モニタータグを持つすべてのモニターに対してスケジュールされます。
4. このダウンタイムは、グループ  `service:web-store` に制限されています。
5. 影響を受けるモニターをプレビューすると、両方のモニターのスコープにグループ `service:web-store` が含まれていることがわかります。

{{< img src="monitors/downtimes/downtime_examplebytag1_downtime.png" alt="'By Monitor Tags' のダウンタイム例 (影響を受けるモニターのプレビュー付き)" style="width:80%;">}}

6. *モニター A* は、ダウンタイムが開始されたことを示していますが、スコープ内のグループのみです: `service:web-store`

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor.png" alt="グループ service:web-store のダウンタイムを示す評価グラフ" style="width:80%;">}}

7. *モニター B* は、`service:web-store` のダウンタイムが開始されたことを示しています。すべてのモニターのグループ (`host` ごと) は `service:web-store` に属しているため、このモニターのダウンタイム中にすべてのホストがミュートされます。

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor2.png" alt="グループ service:web-store と影響を受ける両ホストのダウンタイムを示す評価グラフ" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
