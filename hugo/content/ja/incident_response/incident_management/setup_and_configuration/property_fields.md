---
aliases:
- /ja/service_management/incident_management/incident_settings/property_fields/
- /ja/incident_response/incident_management/incident_settings/property_fields
title: プロパティフィールド
---
## 概要 {#overview}

カスタムプロパティフィールドを使用すると、自動車業界における特定の製品モデルやソフトウェアデプロイメントにおける固有のコードなど、組織固有の重要な属性をキャプチャできます。これらの属性は、インシデントを効率的に分類するのに役立ちます。

カスタムフィールドを使用して、[[Incident Management][2]] ページおよび [Incident Management 分析][3]で特定のインシデントのサブセットをフィルタリングできます。また、[インシデント通知ルール][9]でカスタムフィールドに関する条件を作成することもできます。

## フィールドセクション {#field-sections}

プロパティフィールドは、[Incident Details] (インシデント詳細) ページの [[Overview] (概要) タブ][1]に表示されるフィールドに対応する 3 つのテーブルに整理されています。

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

ドラッグハンドルアイコンを使用してドラッグして、プロパティフィールドを移動または並べ替えることができます。

## デフォルトフィールド {#default-fields}

デフォルトフィールドは 5 つあります。

| フィールド                   | 説明 |
| ----------------------   | ----------- |
|**Detection&nbsp;Method (検出方法)** | このインシデントがどのように宣言されたかに関するコンテキストを追加します。||
|**Summary (概要)**               | このインシデントの原因となった出来事の詳細を示します。||
|**Root&nbsp;Cause (根本原因)**       | 考えられる根本原因や調査対象領域を一覧表示します。||
|**Services (サービス)**              | [Datadog APM][4] が設定されている場合、[`Services`] プロパティフィールドは APM サービス名を自動的に使用します。|
|**Teams**                 |  [`Teams`] プロパティフィールドは、組織で定義された [Teams][5] から自動的に入力されます。|

**メモ**: デフォルトフィールドは削除できません。

### フィールドタイプ {#field-types}

以下のいずれかのフィールドタイプで新しいフィールドを定義できます。

**単一選択**
: 1 つの値を受け入れるドロップダウンです。フィールドを定義する際に、利用可能な値を設定します。

**複数選択**
: 複数の値を受け入れるドロップダウンです。フィールドを定義する際に、利用可能な値を設定します。

**テキスト配列**
: 複数の値を受け入れる自由形式のフィールドです。インシデント対応者は、インシデントでフィールドを設定する際に任意の値を設定します。

**テキストエリア**
: 単一の値を受け入れる自由形式のテキストボックスです。インシデント対応者は、インシデントでフィールドを設定する際に任意の値を設定します。

**メトリクスタグ**
: 複数の値を受け入れるドロップダウンです。インシデント対応者は、フィールドを定義する際に選択したメトリクスタグの取り込まれた値を選択するように求められます。

**数値**
: 任意の整数または小数の数値を受け入れます。

**日時**
: 任意の日時を受け入れます。値は UTC で保存され、ユーザーのローカルタイムゾーンを使用して解析およびフォーマットされます。

### フィールド名 {#field-names}

フィールドの名前は、[検索および分析クエリ][12]、[ワークフローの自動化][13]、および API で使用されるスネークケースの識別子です。表示名は、[インシデントの概要ページ][1]、[インシデントのタイムライン][10]、および[インシデント宣言モーダル][11]でのフィールドの表示方法を決定する使いやすいラベルです。

### Required at declaration (宣言時に必須) {#required-at-declaration}

フィールドを「Required at Declaration」としてマークした場合、ユーザーはインシデントを宣言する際に値を入力する必要があります。このオプションは、Datadog ワークフローの自動化や API リクエストには影響しません。

### Prompt user (ユーザーに設定を要求) {#prompt-user}

Incident Management を構成して、インシデントの状態を変更する際に特定のフィールドを設定するよう対応者に要求することができます。

**宣言時**: 宣言時にフィールドの値を入力するよう対応者に要求するには、フィールドの [Prompt user] オプションを編集します。

**インシデントが [Stable] (安定)/[Resolved] (解決済み)/[Completed] (完了) に移行したとき**: インシデントが特定のステータスに移行したときにフィールドの入力をユーザーに要求するには、[トランジションフォーム][14]を使用します。

### 検索および分析におけるカスタムフィールド {#custom-fields-in-search-and-analytics}

単一選択、複数選択、テキスト配列、数値、および日時の各フィールドは、[インシデントホームページ][2]および [Incident Management 分析][3]で検索可能なファセットです。

Incident Management 分析では、数値フィールドは[ダッシュボード][7] や [Notebooks][8] でグラフ化および視覚化できるメジャーとして表示されます。

[1]: /ja/incident_response/incident_management/investigate#overview-tab
[2]: https://app.datadoghq.com/incidents
[3]: /ja/incident_response/incident_management/analytics
[4]: /ja/tracing/
[5]: /ja/account_management/teams/
[6]: /ja/getting_started/tagging/using_tags/?tab=assignment#metrics
[7]: /ja/dashboards/
[8]: /ja/notebooks/
[9]: /ja/incident_response/incident_management/setup_and_configuration/notification_rules
[10]: /ja/incident_response/incident_management/investigate/timeline
[11]: /ja/incident_response/incident_management/investigate/declare
[12]: /ja/incident_response/incident_management/setup_and_configuration/property_fields/#custom-fields-in-search-and-analytics
[13]: /ja/actions/workflows/
[14]: /ja/incident_response/incident_management/setup_and_configuration/transition_forms