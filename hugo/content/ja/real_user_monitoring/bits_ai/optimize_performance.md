---
aliases:
- /ja/real_user_monitoring/ai_investigations/multi_view_ai_investigation/
- /ja/real_user_monitoring/ai_investigations/operation_ai_investigation/
description: RUM の推奨カードから Bits Investigation を開始し、Core Web Vitals と重要なユーザージャーニーの健全性を向上させます。
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: ドキュメント
  text: RUM における Bits
- link: /real_user_monitoring/application_monitoring/browser/optimizing_performance/
  tag: ドキュメント
  text: パフォーマンスの最適化
- link: /real_user_monitoring/operations_monitoring/
  tag: ドキュメント
  text: オペレーションモニタリング
title: Bits AI によるパフォーマンスの最適化
---
## 概要 {#overview}

RUM はセッションを分析し、各ページや重要なユーザージャーニー全体における、改善効果の高い箇所を示す推奨カードを提示します。どのカードからでも [Bits Investigation][1] を開始できます。Source Code Integration が設定されている場合は、原因となっているコードも含めて問題を分析します。

調査は次の 2 か所から開始できます。

- [最適化ページ](#optimization-page)、特定のページの Core Web Vitals を改善する場合
- [オペレーションモニタリング](#operations-monitoring)、オペレーションの成功率とレイテンシーを改善する場合

## 最適化ページ {#optimization-page}

[**最適化**ページ][2]では、アプリケーションの各ページについて、指定したバイタルのパフォーマンスを確認できます。RUM は、ページとバイタルの組み合わせごとに、影響度順に並べた推奨カードを表示します。各カードには、レンダリングをブロックするスクリプト、メインスレッドでの長時間タスク、Largest Contentful Paint を遅延させる低速なリソースなど、パフォーマンス低下の原因と考えられる要因が記載されています。

次のバイタルの推奨カードから Bits Investigation を開始できます。

| プラットフォーム | バイタル |
|---|---|
| ブラウザ | Largest Contentful Paint (LCP)、Interaction to Next Paint (INP) |
| モバイル | Time to Initial Display (TTID) |

### 調査を開始する {#start-an-investigation}

1. [**最適化**ページ][2]に移動し、アプリケーションを選択します。
2.  ページと対応するバイタルを選択します。
3.  推奨カードの **Investigate** をクリックします。

Bits Investigation が新しいタブで開き、カードに対応するページ、バイタル、時間範囲に絞り込まれた調査が表示されます。

{{< img src="real_user_monitoring/bits_ai/optimization-recommendation-cards.png" alt="ページの Largest Contentful Paint に関する最適化ページ。影響度順に並んだ推奨カードが表示され、各カードに [Investigate] ボタンがあります。" style="width:100%;" >}}

### Bits が調査する内容{#what-bits-investigates}

Bits は、読み込みの遅いページと速いページを比較し、バイタルの計測に至るまでに何が起きたかを再構築します。具体的には、読み込まれたリソース、実行されたスクリプト、メインスレッドをブロックした長時間タスクを特定します。ページのリクエストが [APM トレースと相関付けられている][3]場合、Bits は低速なリクエストを追跡し、バックエンドサービスまで調査します。[ソースコードインテグレーション][4]が設定されている場合、Bits は問題の原因となったファイルや関数を特定します。

{{< img src="real_user_monitoring/bits_ai/optimization-bits-investigation.png" alt="最適化の推奨カードから開始した Bits Investigation。ヒーロー画像の検出が遅れたことで、ホームページの Largest Contentful Paint が悪化したと結論付けています。影響、タイムライン、および推奨される次のステップも表示されます。" style="width:100%;" >}}

## オペレーションモニタリング{#operations-monitoring}

[オペレーションモニタリング][5]は、サインアップ、検索、チェックアウトなど、アプリケーション内のユーザージャーニーの成功率とレイテンシーを追跡します。オペレーションを開くと、RUM は重要度順に並べた推奨カードを表示します。各カードでは、1 種類の問題を取り上げます。

### 調査を開始する{#start-an-investigation-1}

1. [オペレーションモニタリング][5]に移動し、オペレーションを選択します。
2. 推奨カードの **Investigate** をクリックします。オペレーションのテーブルで **Investigate with Bits** をクリックすることもできます。

Bits Investigation が新しいタブで開き、推奨カードに対応するオペレーション、問題の種類、および時間枠に絞って調査します。

{{< img src="real_user_monitoring/bits_ai/operations-recommendation-cards.png" alt="オペレーションモニタリングのオペレーションページ。重要度順に並んだエラーとタイムアウトの推奨カードが表示され、それぞれに [Investigate] ボタンがあります。" style="width:100%;" >}}

### Bits が調査する内容{#what-bits-investigates-1}

Bits は、推奨カードに記載された問題の種類に応じて分析内容を調整します。

| 問題の種類| Bits が調査する内容|
|---|---|
| エラー| オペレーションの失敗の内訳と傾向、失敗が多いエンドポイント、失敗した実行で特に多く見られる属性、および関連するバックエンドトレース|
| 離脱 | ユーザーが離脱するまでに待機した時間、離脱時に読み込み中だったリソース、次に移動した先、および離脱が特定のブラウザ、デバイス、国、アプリケーションバージョンに集中しているかどうか。|
| クラッシュ | 影響を受けたセッションのスタックトレース、およびクラッシュが特定のアプリケーションバージョン、デバイス、オペレーティングシステムに集中しているかどうか。|
| 低速化 | 低速な実行と高速な実行を比較し、バックエンド、フロントエンド、リソースの読み込みのどこに時間がかかっているかを特定した上で、原因となっているバックエンドトレースや長時間タスクまで追跡します。|
| タイムアウト | 名前が変更されたルートや再グループ化されたパスに操作定義が一致しなくなった場合など、インスツルメンテーションの欠落がタイムアウトの原因になっているかどうか。Bits はパフォーマンスの調査前に、この点を確認します。|

{{< img src="real_user_monitoring/bits_ai/operations-bits-investigation.png" alt="オペレーションモニタリングの推奨カードから開始した Bits Investigation。サードパーティの決済 API のレート制限超過によってチェックアウトが失敗したことを特定し、その影響、タイムライン、推奨される次のステップを提示します。" style="width:100%;" >}}

## 調査後 {#after-the-investigation}

RUM から開始した調査は、標準的な Bits Investigation です。以下が可能です。

- 後で [Bits Investigations リスト][6]から調査を見つけ、チームと共有できます。
- [フィードバックを送信][7]すると、Bits は今後の調査でその内容を考慮します。
- 調査結果を [Bits Code][8] に送信して、コード変更案を生成したり、プルリクエストを作成したりできます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/bits_investigation/
[2]: https://app.datadoghq.com/rum/optimization
[3]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/
[4]: /ja/source_code/
[5]: /ja/real_user_monitoring/operations_monitoring/
[6]: https://app.datadoghq.com/bits-ai/investigations
[7]: /ja/bits_ai/bits_investigation/improve_accuracy/
[8]: /ja/bits_ai/bits_code/