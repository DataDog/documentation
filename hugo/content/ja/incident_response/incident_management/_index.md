---
aliases:
- /ja/monitors/incident_management/
- /ja/service_management/incident_management/
description: インシデントの作成と管理
further_reading:
- link: dashboards/querying/#incident-management-analytics
  tag: ドキュメント
  text: Incident Management 分析
- link: https://learn.datadoghq.com/courses/getting-started-incident-management
  tag: ラーニングセンター
  text: Incident Management の概要
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インシデントマネジメントを向上させるためのインタラクティブなセッションに参加する
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: ブログ
  text: Datadog モバイルアプリを使って、外出先でインシデントを管理および解決する
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: ブログ
  text: インシデントの事後分析を作成するためのベストプラクティス
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: ブログ
  text: Datadog での Incident Management
- link: https://www.datadoghq.com/blog/datadog-service-management/
  tag: ブログ
  text: Datadog Service Management で高いサービス可用性を確保する
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: ブログ
  text: Datadog でのインシデント管理方法
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: ブログ
  text: Datadog Incident Response で修復と通信を統一する
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: ブログ
  text: ServiceNow ITSM と Datadog を統合して、Incident Response を迅速化する
- link: https://app.datadoghq.com/release-notes?category=Incident%20Management
  tag: リリースノート
  text: Incident Management の最新リリースをチェックしてください。(アプリログインが必要です)。
title: Incident Management
---
{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Incidents">}}
  Foundation Enablement セッションを調べて登録しましょう。Datadog Incident Management が、DevOps チームや SRE による Incident Response ワークフローの効率的な管理を最初から最後までどのように支援し、重要な場面での時間短縮とストレス軽減を実現するかをご覧ください。
{{< /learning-center-callout >}}

Datadog Incident Management は、チームメンバーが組織のサービスに対する障害や脅威を特定、軽減、分析する上で役立ちます。Incident Management により、チームが共通のフレームワークとツールキットを中心に集結できるよう支援する、自動化が強化された対応プロセスを設計できます。また、インシデント分析を使用して、インシデント応答プロセスの有効性を評価することもできます。

インシデントは、メトリクス、トレース、ログと並んで Datadog 内に存在します。チームは、モニターアラート、セキュリティシグナル、イベント、ケースなどからインシデントを宣言できます。モニターを構成して [インシデントを自動的に宣言][30] することも可能です。

## 使い始める {#get-started}

Incident Management はインストール不要です。ラーニングセンターのコースを受講する、ガイド付きウォークスルーを読む、またはインシデントを宣言して、使い始めましょう。

{{< whatsnext desc="Incident Management について:">}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-to-incident-management" >}}ハンズオンの例を通して Datadog Incident Management について学ぶ{{< /nextlink >}}
    {{< nextlink href="https://docs.datadoghq.com/getting_started/incident_management/" >}}インシデントワークフローのガイド付きウォークスルー{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/investigate/declare" >}}インシデントを宣言する{{< /nextlink >}}
{{< /whatsnext >}}

## 請求 {#billing}

Incident Management はシートベースの SKU です。Incident Management の請求方法や Datadog 内でのシート管理方法について詳しく知りたい方は、[料金ページ][31] や [Incident Response の請求に関するドキュメント][32] をご覧ください。

## インシデントを表示および検索する {#view-and-search-for-incidents}

インシデントを表示するには、[インシデント][1] ページに移動して、進行中のすべてのインシデントのフィードを確認します。左側に表示されているプロパティを使用してインシデントをフィルタリングしたり、検索結果をエクスポートしたり、[インシデント設定][2] ですべてのインシデントに表示される追加フィールドを設定したりできます。

### 検索例 {#search-examples}

インシデント検索では、ログや Event Management と同じイベントベースの [検索構文][33] を使用します。`key:value` ペアをブール演算子 (`AND`、`OR`、`-`) と組み合わせて、インシデントをフィルタリングします。

| クエリ | 説明 |
|-------|-------------|
| `severity:SEV-1` | すべての SEV-1 インシデントを表示する |
| `severity:(SEV-1 OR SEV-2) state:active` | すべてのアクティブな SEV-1 または SEV-2 インシデントを表示する |
| `services:checkout AND -state:resolved` | チェックアウトサービスに影響を与える未解決のインシデントを表示する |
| `teams:platform` | プラットフォームチームに割り当てられたインシデントを表示する |
| `services:web*` | 「web」で始まるサービスに影響を与えるインシデントを表示する |
| `Root\ Cause\ Category:Bug ` | 特定の根本原因属性を持つインシデントを表示する |
| `responder:john.smith@datadoghq.com ` | John Smith が対応者であるインシデントを表示する |

### フィルタリングとエクスポート {#filter-and-export}

- **プロパティによるフィルタリング**: 左側のファセットパネルを使用して、ステータス、重大度、復旧時間 (時間単位)、およびその他の構成済みプロパティでフィルタリングします。
- **検索結果のエクスポート**: インシデントリストの上部にある [エクスポート] ボタンを使用して、検索結果をエクスポートします。
- **ビューの保存**: 頻繁に使用する検索クエリとフィルタを保存して、すぐにアクセスできるようにします。

### モバイルアクセス {#mobile-access}

また、[Apple App Store][4] および [Google Play Store][5] で利用可能な [Datadog モバイルアプリ][3] をダウンロードして、モバイルデバイスのホーム画面からインシデントリストを表示し、インシデントを管理/作成することもできます。

{{< img src="incident_response/incident_management/iOS_Incident_V2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Datadog モバイルアプリの 2 つのビュー: 各インシデントに関する詳細情報を示すインシデントリストと、単一のインシデントの詳細パネルを表示するビュー">}}

## インシデントの説明 {#describing-the-incident}

インシデントを宣言する際は、何が起こったのか、なぜ発生したのか、および関連する属性を詳細に記述した包括的な説明を提供することが、インシデント管理プロセスのすべての関係者に十分な情報を提供するために不可欠です。インシデントの宣言の必須要素には、タイトル、重大度レベル、インシデントコマンダーが含まれます。効果的なインシデント管理ドキュメントには、以下が含まれます。
- インシデントのステータス、影響、根本原因、検出方法、サービスへの影響などの詳細の更新。
- レスポンスチームの編成と管理、カスタムレスポンダーロールの使用、詳細なインシデント評価のためのメタデータ属性の活用。
- インシデント解決プロセス全体を通じてすべての関係者に情報を提供するための通知設定。

詳細については、[インシデントの記述][20] ドキュメントを参照してください。

## インシデントデータの評価 {#evaluate-incident-data}

インシデント分析では、過去のインシデントから統計を集計および分析できるため、インシデント対応プロセスの効率とパフォーマンスに関するインサイトが得られます。解決までの時間やお客様への影響などの主要なメトリクスを経時的に追跡できます。これらの分析は、ダッシュボードやノートブックのグラフウィジェットを使用してクエリできます。Datadog では、Incident Management 概要ダッシュボードやノートブックインシデントレポートなど、すぐに利用できるカスタマイズ可能なテンプレートを提供しています。

収集されるメトリクスや、データを可視化するためのグラフ設定のステップバイステップの手順については、[Incident Management 分析][10] を参照してください。

## Integrations {#integrations}

Incident Management は、他の Datadog 製品と密接に統合されます。以下はその例です。

- [Datadog Status Pages][26]: 公開または非公開のステータスページを作成し、インシデントに接続します。
- [Datadog On-Call][27]: ページをインシデントにエスカレーションし、インシデントから手動または自動でチームを呼び出します。
- [Datadog Notebooks][28]: [事後分析][34] のドラフト作成とレビューを行います。
- [Datadog Workflow Automation][29]: 自動化の構築と実行を行います。

### サードパーティインテグレーション {#third-party-integrations}

Incident Management は、サードパーティアプリケーションと統合されます。以下はその例です。

- [Atlassian Statuspage][25]: Statuspage のインシデントを作成および更新します。
- [Confluence][22]: インシデントの [事後分析][34] を生成します。
- [CoTerm][21]: ターミナルベースのインシデント修復アクティビティをリアルタイムで追跡します。
- [Jira][15]: インシデントの Jira チケットを作成します。
- [Microsoft Teams][23]: インシデント用のチャネルとビデオ会議を作成します。
- [PagerDuty][12] および [OpsGenie][13]: オンコールエンジニアを呼び出し、インシデント解決時にページを自動解決します。
- [ServiceNow][19]: インシデントの ServiceNow チケットを作成します。
- [Slack][11]: インシデント用のチャネルを作成します。
- [Webhooks][16]: Webhooks を使用してインシデント通知を送信します (たとえば、[SMS を Twilio に送信][17])。
- [Zoom][24]: インシデント用のビデオ通話を開始します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /ja/mobile
[4]: https://apps.apple.com/app/datadog/id1391380318
[5]: https://play.google.com/store/apps/details?id=com.datadog.app
[6]: /ja/incident_response/incident_management/investigate/declare
[7]: /ja/account_management/teams/
[8]: /ja/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[9]: /ja/tracing/#2-instrument-your-application
[10]: /ja/incident_response/incident_management/analytics_and_reporting/
[11]: /ja/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[12]: /ja/integrations/pagerduty/
[13]: /ja/integrations/opsgenie/
[15]: /ja/integrations/jira/
[16]: /ja/integrations/webhooks/
[17]: /ja/integrations/webhooks/#sending-sms-through-twilio
[18]: /ja/integrations/statuspage/
[19]: /ja/integrations/servicenow/
[20]: /ja/incident_response/incident_management/investigate/describe
[21]: /ja/coterm
[22]: /ja/integrations/confluence/
[23]: /ja/integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[24]: /ja/integrations/zoom-incident-management/
[25]: /ja/integrations/statuspage/
[26]: /ja/incident_response/status_pages/
[27]: /ja/incident_response/on-call/
[28]: /ja/notebooks/
[29]: /ja/actions/workflows/
[30]: /ja/incident_response/incident_management/investigate/declare#from-a-monitor
[31]: https://www.datadoghq.com/pricing/?product=incident-response#products
[32]: /ja/account_management/billing/incident_response/
[33]: /ja/getting_started/search/#event-based-queries
[34]: /ja/incident_response/incident_management/post_incident/postmortems