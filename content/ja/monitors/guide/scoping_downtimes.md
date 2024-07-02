---
title: Scoping Downtime
disable_toc: false
further_reading:
- link: /monitors/downtimes
  tag: Documentation
  text: Downtimes Overview
- link: /monitors/manage/search
  tag: Documentation
  text: Query syntax to search monitors
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: Guide
  text: Suppress Alerts through the Downtimes API and UI
---

## 概要

ダウンタイムは、システムのシャットダウン、オフラインのメンテナンス、またはアップグレードのために、モニターをトリガーせずにスケジュールされます。ダウンタイムは、すべてのモニターのアラートと通知をサイレントにしますが、モニターの状態遷移を妨げません。

ほとんどの場合、スケジュールされたメンテナンスとは関係のない重要なアラートを見逃す危険性があるため、**すべての**モニター通知を完全にミュートにはしたくありません。

このガイドでは、UI を通じてダウンタイムの適切なスコープを設定する方法を説明します。
1. [ダウンタイムを適用するモニターを選択します。](#choose-which-monitors-to-silence)
2. [クエリをスコープして、各モニターのミュートする_正確な_通知をフィルターします。](#granularly-scope-downtimes)

## サイレントにするモニターを選択する

ダウンタイムの対象とするモニターを定義します。特定のモニター、複数のモニター、全モニターの 3 つのオプションがあります。

### 特定のモニターを対象にする

特定のモニターを一時的にミュートすることができます。例えば、そのモニターが現在多くのアラートを送信している場合、またはそのモニターだけが今後のメンテナンスの影響を受ける場合などです。

ダウンタイム構成で、**By Monitor Name** を選択し、問題のモニターを検索します。

### モニタータグに基づいて複数のモニターを対象にする

<div class="alert alert-info">モニタータグは、Agent やインテグレーションから送信されるタグや、クエリするデータに割り当てられたタグとは独立しています。</div>

ダウンタイムは、モニタータグに基づいてモニターにスケジュールすることができ、さらにモニタークエリでグループ化されたタグによってスコープダウンすることができます。`By Monitor Tags` を選択し、対象とするモニタータグを入力します。

**Note**: Tags are additive, meaning that an input of `env:dev team:automations` will target monitors that are tagged with **both**, `env:dev` AND `team:automations`.

### すべてのモニターを対象にする

`By Monitor Name` または `By Monitor Tags` のどちらのオプションでも、ドロップダウンメニューの最初の項目 `All Monitors` を選択することで、すべてのモニターを対象にすることができます。

## きめ細かなダウンタイムのスコープ

グループスコープを使用して、ダウンタイムに追加のフィルターを適用し、どのモニターをミュートにするかを細かくコントロールすることができます。ダウンタイムのグループスコープは、モニター固有の対象の**後に**マッチします。モニタータグを使用して複数のモニターを対象にする場合、グループスコープに一致させる前に、まず、それに応じてタグ付けされたモニターを見つける必要があります。

このガイドの例では、[マルチアラートグループ化][2]が構成されているモニターに `Group scope` を適用する方法を示します

### 特定のタグのモニターをミュートする

1. 1 つのグループ (この場合は `service:web-store`) のみでダウンタイムをスケジュールするには、そのグループを `Group scope` フィールドに入力します。
2. **Preview affected monitors** をクリックして、選択したモニターがまだスコープ内にあることを確認します。これにより、グループ `service:web-store` のアラートはスケジュールされたダウンタイム中にミュートされます。

{{< img src="monitors/downtimes/downtime_example_byname.png" alt="'By Monitor Name' のダウンタイム例 (影響を受けるモニターのプレビュー付き)" style="width:90%;">}}

スケジュールされたダウンタイムが始まると、このモニターではグループ `service:web-store` のアラートのみがミュートされます。

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.png" alt="グループ service:web-store のダウンタイムを示す評価グラフ" style="width:90%;">}}

これは、`service:web-store` タグを含むアラートをミュートします。例:

| モニターグループ                | ミュート |
| ---------------------------  | --- |
| `host:A`、`service:web-store`| はい |
| `host:A`、`host:B`、`service:synthesizer`、`service:demo`、`service:web-store`| はい |
| `host:A`、`host:B`、`service:synthesizer`| いいえ (`service:web-store` がない) |


### 複数のタグにスコープされたモニターをミュートする

1. 複数のグループ (例えば、`service:web-store` と `env:prod`) にダウンタイムをスケジュールするには、`Group scope` フィールドにそのグループを入力します。
2. **Preview affected monitors** をクリックして、スコープ内のモニターを確認します。
3. スケジュールされたダウンタイムが開始すると、そのグループのアラートはミュートされます。
`env:prod` **AND** `service:web-store`

| モニターグループ                                                                    | ミュート |
| -----------                                                                      | ----  |
| `env:prod`、`service:web-store`                                                  | はい |
| `env:prod`、`env:dev`、`service:synthesizer`、`service:demo`、`service:web-store`| はい |
| `env:dev`、`env:demo`、`service:web-store`                                       | いいえ (`env:prod` がない) |
| `env:prod`、`env:demo`、`service:synthesizer`                                    | いいえ (`service:web-store` がない) |


### タグの結合でモニターをミュートする

複数のタグ値を組み合わせてより複雑なスコープにするには、`OR` 結合を 1 つのダウンタイムで使用します。例えば、開発環境かステージング環境のどちらかに関連するすべての通知をミュートしたいとします。スコープクエリには `env:(dev OR staging)` を使います。

**注**: 異なるタグの結合はサポートされていません (例えば、`env:dev OR service:web-store`)。このような場合は、タグごとに個別のダウンタイムを作成する必要があります。

クエリ `env:(dev OR staging)`
| モニターグループ                                                                    | ミュート |
| -----------                                                                      | ----  |
| `env:staging`、`service:web-store`                                               | はい |
| `env:dev`、`env:prod`、`service:web-store`                                       | はい |
| `env:demo`、`env:staging`、`service:web-store`                                   | はい |
| `env:demo`、`env:prod`、`service:web-store  `                                    | いいえ (`env:dev` と `env:staging` の両方がない) |

### ワイルドカードスコープでモニターをミュートする

インフラストラクチャー内で大規模なアップグレードを実行することは珍しくありません。ダウンタイムは、スクリプトを追加することなく、影響を受けるすべてのエンティティをミュートするのに役立ちます。例えば、あるサービスのすべてのホストをアップグレードするとします。これらのホストは、関連するアプリケーションのプレフィックスを付けるなど、組織内の特定の命名規則に従っている可能性があります。その結果、`host:mydemoapplication-host-1` や `host:mydemoapplication-host-2`のような名前のホストが何百と存在することになります。

`host:mydemoapplication-*` でスコープしたダウンタイムを作成します。これはプレフィックスを持つすべてのホストにマッチし、ミュートされます。その逆で、`host:*-mydemoapplication` でスコープしたダウンタイムを作成することもできます。これは `mydemoapplication` で終わる全てのホストにマッチし、そのホストをミュートします。

### ミュートからグループを除外

アプリケーションとインフラストラクチャーを複数の環境で運用している場合、おそらく 1 つの本番環境と複数の非本番環境 (例えば、テスト、回帰チェック、デモ) があるでしょう。非本番環境のアラートを受け取らないようにするには、`env:* -env:prod` でスコープしたダウンタイムを設定します。このスコープは `env` タグが設定されているすべてのアラートを対象とし、二次的なステップとして本番環境を除外します。

### 同じタグでスコープされた複数のモニター

1. *モニター A* は、複数の `service` グループにわたって平均されたメトリクスを報告するホスト用のマルチアラートモニターです。
2. *モニター B* は、`service:web-store` に対して同じメトリクスを報告するホスト用のマルチアラートモニターです。
3. ダウンタイムは、`downtime:true` モニタータグを持つすべてのモニターに対してスケジュールされます。
4. このダウンタイムは、グループ  `service:web-store` に制限されています。
5. **Preview affected monitors** をクリックして、スコープ内のモニターを確認します。この例では、両方のモニターで `service:web-store` グループがスコープに含まれています。

{{< img src="monitors/downtimes/downtime_examplebytag1_downtime.png" alt="'By Monitor Tags' のダウンタイム例 (影響を受けるモニターのプレビュー付き)" style="width:80%;">}}

6. *モニター A* は、ダウンタイムが開始されたことを示していますが、スコープ内のグループのみです: `service:web-store`

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor.png" alt="グループ service:web-store のダウンタイムを示す評価グラフ" style="width:80%;">}}

7. *モニター B* は、`service:web-store` のダウンタイムが開始されたことを示しています。すべてのモニターのグループ (`host` ごと) は `service:web-store` に属しているため、このモニターのダウンタイム中にすべてのホストがミュートされます。

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor2.png" alt="グループ service:web-store と影響を受ける両ホストのダウンタイムを示す評価グラフ" style="width:80%;">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/#monitor-tags
[2]: /monitors/configuration/#multi-alert
[3]: /monitors/manage/search/
