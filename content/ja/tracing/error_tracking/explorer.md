---
description: エラー追跡エクスプローラーについて説明します。
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentation
  text: エラー追跡モニターについて
- link: /tracing/error_tracking
  tag: Documentation
  text: バックエンドサービスのエラー追跡について
kind: documentation
title: Error Tracking Explorer
---

## 概要

エラー追跡エクスプローラーには、進行中の問題のリストが表示されます。_問題_は、同じ_フィンガープリント_を持つ類似のエラーのグループであり、問題の重大度によっては修正が必要になる場合があります。

{{< img src="tracing/error_tracking/error_tracking_explore_inspect.png" alt="エラー追跡エクスプローラー" style="width:100%" >}}

## 問題を探索

[エラー追跡エクスプローラー][3]に表示される各項目には、以下のような問題に関する概要情報が表示されます。

-   エラータイプやエラーメッセージ。
-   基になるエラーが発生したファイルへのパス。
-  問題の存続期間に関する情報:
    -   確認された最初と最後の時期。
    -   指定期間内のエラー発生回数。
    -   指定期間内の時間経過に伴うエラー発生のグラフ。

### タイムレンジ

時間範囲セレクターを調整し、選択した期間内にエラーが発生した問題を表示します。

{{< img src="tracing/error_tracking/time_range.png" alt="エラー追跡時間範囲" style="width:60%;" >}}

特定の範囲を指定することも、ドロップダウンメニューからあらかじめ設定された範囲を選択することもできます。

### ファセット

エラー追跡は、発生したエラーからあらかじめ定義された属性のリストを自動的にインデックス化し、その属性に対応するファセットを作成します。ファセットを使用して、問題のピボットやフィルターを行います。ファセットリストは、選択した期間の属性のメンバーを表示し、対応する問題の数などの基本的な分析を提供します。

{{< img src="tracing/error_tracking/facet.png" alt="エラー追跡ファセット" style="width:100%;" >}}

エラー追跡エクスプローラーは、選択した期間に少なくとも 1 つのエラー発生があり、選択したファセットのセットに一致するすべての問題を返します。

## 問題の調査

問題リストの問題をクリックすると、問題パネルが表示され、バックエンドサービスに関する追加のエラー情報にアクセスできます。

### 概要を取得する

問題パネルには、問題のトラブルシューティングを行う際に必要な概要情報が含まれています。

{{< img src="tracing/error_tracking/issue_panel_upper_part.png" alt="エラー追跡問題パネルの上部" style="width:80%;" >}}

問題の最初と最後の発生日、関連するコードバージョン、発生以降のエラーの合計発生日など、問題のライフサイクルについて知ることができます。エラー発生のグラフには、過去 14 日までが表示され、問題の傾向の概要が示されます。

### 個々のエラー発生を参照する

以下などの問題にまとめられたエラーサンプルを探します。

-   過去 [15 分間のライブ検索][1]で取り込まれたすべてのエラースパン。
-   [カスタム保持フィルター][2]によってインデックス付けされた過去 15 日間のエラースパン。

{{< img src="tracing/error_tracking/issue_panel_lower_part.png" alt="エラー追跡問題パネルの下部" style="width:80%;" >}}

各エラーサンプルは、エラーが発生した理由とその解決方法を理解するために必要な情報を表示します。次に例を示します。

- エラースタックトレース。ソースコードのどこでエラーが発生したかを示します。
- リソースや操作名など、関連するトレースまたはそれにリンクされているログに直接アクセスできるすべてのエラースパンタグ。
- この特定のエラーが発生したときの、基盤となるホストまたはコンテナの状態に関するインサイト。

## リポジトリに接続してコードスニペットを有効にする

[GitHub インテグレーション][4]を設定し、スタックトレースでコードスニペットを確認できるようにします。

{{< img src="tracing/error_tracking/inline_code_snippet.png" alt="スタックトレース内のインラインコードスニペット" style="width:100%;" >}}

リポジトリの構成を始めるには、[ソースコードインテグレーションドキュメント][5]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_explorer/#live-search-for-15-minutes
[2]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[3]: https://app.datadoghq.com/apm/error-tracking
[4]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[5]: /ja/integrations/guide/source-code-integration