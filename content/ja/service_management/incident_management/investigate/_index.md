---
aliases:
- /ja/monitors/incident_management/incident_details
- /ja/service_management/incident_management/incident_details
description: インシデントのコンテキストと作業を管理する
further_reading:
- link: /service_management/incident_management/declare
  tag: ドキュメント
  text: Declare an Incident
- link: /service_management/incident_management/describe
  tag: ドキュメント
  text: Describe an Incident
title: インシデントを調査する
---

## 概要

{{< img src="/service_management/incidents/investigate/incidents_overview_tab.png" alt="Overview タブから見たインシデント詳細の例" style="width:100%;" >}}

効果的なインシデント調査は、まずインシデントを特定・分類し、次に包括的なデータ収集によって詳細なタイムラインを構築することから始まります。Datadog のインシデント詳細ページは、リアルタイムのモニタリング、調査、修復、コラボレーション、分析を行うための集中プラットフォームを提供し、インシデント調査を支援します。動的なダッシュボードや対話的なタイムラインにより、対応者はインシデントデータやパターンを視覚的に把握できます。インシデント詳細を使用して、以下を実行できます。

- リアルタイムでデータを集約・表示し、チームが根本原因を特定し、影響範囲を効率的に評価するのを支援します。
- チームコラボレーション機能を用いて、コミュニケーション、進捗追跡、修復作業の調整を行います。
- 影響を受けたサービスや依存関係をさまざまなビューで切り替えながら検証し、徹底的な調査と解決を行います。

## インシデント詳細

Datadog 上のすべてのインシデントには独自のインシデント詳細ページがあり、そこではプロパティフィールド、シグナル、タスク、ドキュメント、対応者、通知を管理できます。インシデント詳細ページには、重要なアクションへのクイックアクセスを可能にするグローバルヘッダーが含まれており、ページの残りの部分は関連するインシデントデータをまとめたタブセクションに分割されています。

### グローバルヘッダー

グローバルヘッダーには、[ステータスと重大度][1]セレクタや[インシデントインテグレーション][2]へのリンクが含まれています。新しいインシデントごとに Slack および Microsoft Teams のリンクを自動的に構成する方法については、[インシデント設定][3]ドキュメントを参照してください。

インシデントが解決された後、ヘッダーには[ポストモーテムテンプレート][4]を使用してポストモーテムノートブックを生成するオプションが表示されます。アプリ内でポストモーテムテンプレートを構成するには、[インシデント設定][5]ページに移動し、ポストモーテムの構成や内容を定義してください。

### Overview タブ

Overview タブは、インシデントのプロパティを閲覧し、顧客への影響を定義するためのメインページとして機能します。デフォルトでは、Root Cause (根本原因)、Services (サービス)、Teams (チーム)、Detection Method (検出方法)、Summary (サマリ) といったプロパティが含まれており、これらは「What Happened (何が起こったか)」、「Why it Happened (なぜ起こったか)」、「Attributes (属性)」というセクションに分類されています。

`<KEY>:<VALUE>` ペアを Datadog メトリクスタグから追加したり、[インシデント設定][6]でカスタムフィールドを作成したりして、さらなるプロパティフィールドを追加できます。これらのプロパティに値を割り当てることで、インシデントホームページやインシデント管理アナリティクスでの検索やクエリを向上させることができます。また、重要な情報を優先するために、プロパティフィールドの並び順を変更し、さまざまな見出しの下に移動させることも可能です。

顧客向けのインシデントの場合、**Impacts** セクションに影響の詳細を追加して明示します。

{{< img src="/service_management/incidents/investigate/incident_details_impacts.png" alt="あなたの画像の説明" style="width:90%;" >}}

1. **Add** をクリックします。
2. 影響が始まった日時を指定します。
3. 影響が継続中の場合は終了日時を空欄のままにし、終了している場合は日時を指定します。
4. `Scope of impact` に顧客への影響の性質を記述します。
5. **Save** をクリックします。

Overview タブにはプロパティフィールドに加え、一目で状況を把握できる以下のサマリーモジュールが提供されます。

| サマリーモジュール | 説明 |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| 要約タイムライン (Condensed Timeline) | インシデントステータスが変更された時刻や、影響開始・終了時刻を表示し、インシデントのライフサイクルを高い視点で把握します。 |
| 最新の通知 (Latest Notifications)| 直近で送信された通知を表示し、[Notification タブ][7]で全通知リストへ素早くアクセスできます。|
| 保留中のタスク (Pending Tasks) | 未完了のタスクのうち最も最近のものを表示し、Remediation タブでタスク一覧へ即座にアクセスできます。 |
| 対応者 (Responders) | 現在のインシデントコマンダーおよび、インシデントに割り当てられた他の対応者のアバターを表示します。 |
| 最近のタイムラインエントリ (Recent Timeline Entries) | タイムライン上で最新の 5 件のエントリを表示し、タイムラインタブ全体へ素早くアクセスできます。詳細は[タイムライン][8]ドキュメントを参照してください。 |

## 追加の調査ツール

インシデントを宣言した後、対応者はインシデント詳細ページを利用して得られる情報を最大限活用し、インシデントを詳細に記述・分析できます。

{{< whatsnext desc="他の調査ツールについて詳しく知るには、以下のページを参照してください。" >}}
{{< nextlink href="/service_management/incident_management/investigate/timeline" >}}<strong>タイムライン</strong>: インシデント前後のイベントを時系列で追跡し、視覚化や時系列データを用いて、イベントの流れとその影響を理解します。
{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/incident_management/describe/#incident-details
[2]: /ja/service_management/incident_management/#integrations
[3]: /ja/service_management/incident_management/incident_settings#integrations
[4]: /ja/service_management/incident_management/incident_settings/templates#postmortems
[5]: https://app.datadoghq.com/incidents/settings#Postmortems
[6]: /ja/service_management/incident_management/incident_settings/property_fields
[7]: /ja/service_management/incident_management/notification/
[8]: /ja/service_management/incident_management/investigate/timeline