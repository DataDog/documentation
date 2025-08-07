---
further_reading:
- link: /sheets/
  tag: ドキュメント
  text: Datadog Sheets について詳しく見る
- link: /integrations/guide/reference-tables/?tab=manualupload
  tag: ドキュメント
  text: リファレンステーブルでカスタムメタデータを追加する
title: Sheets を使用して RUM セッションを分析する
---

## 概要

Datadog Sheets は、Datadog のデータを取り込み、技術的な専門知識なしで分析できるスプレッドシートツールです。このガイドでは、Real User Monitoring (RUM) のセッションを Sheets で分析する方法を順を追って説明します。本ガイドでは、以下の内容を説明します。

- Sheets 内でテーブルを作成および操作する方法
- リファレンステーブルを使用して RUM セッションデータを追加のメタデータで拡張する方法
- エラーの多いセッションを特定して、プレミアムユーザーへの影響を詳しく理解するための詳細分析方法

## Sheets でのテーブル作成

分析を始めるには、Datadog Sheets で RUM セッションのテーブルを作成します。

1. まず RUM Sessions Explorer を開きます。
1. 特定の条件を満たすセッションをフィルタリングするクエリを作成します。たとえば、2 回以上エラーに遭遇したユーザーセッションに注目したい場合は、次のクエリを使用します。
     ```
     @session.error.count:>=2 @session.type:user
     ```
     {{< img src="/sheets/guide/rum_analysis/rum_explorer_open_in_sheets.png" alt="RUM Sessions Explorer showing a query filtering for sessions with 2 or more errors and user session type" style="width:100%;" >}}
1. **Open in Sheets** をクリックすると、フィルタリングされた RUM セッションデータを含む新しいテーブルが作成されます。

## リファレンステーブルへのデータアップロード

RUM セッションデータをさらに充実させるために、たとえばプレミアムユーザーの識別や特定のチームとの関連づけなど、追加のメタデータをリファレンステーブルを使って取り込むことができます。アップロード手順は次のとおりです。

1. 追加のメタデータが含まれる CSV ファイルを用意します。たとえば、ユーザーID、プレミアムステータス、チーム情報などの列を含めます。
1. [Reference Tables][1] に移動し、**New Reference Table +** をクリックします。
1. CSV ファイルをアップロードし、テーブルのプライマリキーを指定します。

詳細については、[Reference Tables][2] のドキュメントを参照してください。

## Lookup を使った RUM データの拡張

1. Sheets のインターフェースで、ページ上部の **Add Lookup** をクリックします。
1. アップロードしたリファレンステーブルを選択し、照合に使う共通列 (User ID など) を選択します。 
1. Lookup 関数は、リファレンステーブルから関連メタデータを RUM セッションテーブルに追加します。

## ピボットテーブルを使った分析

ピボットテーブルは、大規模なデータセットを要約・整理し、パターンや傾向を見出すのに役立ちます。

1. すでにテーブルデータがあるスプレッドシートから、**Add Pivot Table** をクリックします。
2. **Rows** セクションでは、User Name など分析対象の指標を選択します。
3. **Calculations** セクションでは、sum、average、count、min、max などの計算に使う指標を指定します。

## 使用例: プレミアムユーザーのエラー分析

Web アプリケーションを運用しており、エラーがアプリケーションのプレミアムユーザーに与える影響を理解したいとします。以下の手順に従い、RUM セッションを分析し、追加のユーザー情報でデータを拡張し、プレミアムユーザーがエラーによってどのような影響を受けているかを把握します。Sheets を活用し、データに基づいた意思決定を行ってユーザー体験の向上や問題解消に役立てましょう。


### RUM セッションのフィルタリング
1. [RUM Sessions Explorer][3] から開始し、2 回以上のエラーが発生しているセッションをフィルタリングするクエリを作成します。例:

     ```
     @session.error.count:>=2 @session.type:user
     ```
1. **Open in Sheets** をクリックして、フィルタリングされたセッションのテーブルを作成します。

### データの拡張
1. [リファレンステーブルに CSV ファイルをアップロード](#uploading-data-to-reference-tables)し、プレミアムステータスやチームなどの追加ユーザーメタデータを取り込みます。
1. Sheets の `Lookup` 関数を使用して、RUM セッションテーブルにプレミアムステータスなどのユーザーメタデータを追加します。
   {{< img src="/sheets/guide/rum_analysis/lookup_function.png" alt="外部データセットと、そこから取得する追加メタデータを指定して Lookup を設定する" style="width:100%;" >}}

### ピボットテーブルでの分析
1. ピボットテーブルを作成し、プレミアムユーザーごとのエラー数を集計します。
1. データを要約して、プレミアムユーザーと非プレミアムユーザー間のエラー分布を把握します。
   {{< img src="/sheets/guide/rum_analysis/add_lookup_pivot_table.mp4" alt="Sheets で Lookup を追加し、ピボットテーブルを作成する手順を示すウォークスルー" video=true >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/reference-tables?order=desc&p=1&sort=updated_at
[2]: https://docs.datadoghq.com/ja/integrations/guide/reference-tables/?tab=manualupload
[3]: https://app.datadoghq.com/rum/sessions