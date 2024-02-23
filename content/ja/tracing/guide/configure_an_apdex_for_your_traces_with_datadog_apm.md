---
aliases:
- /ja/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm
- /ja/tracing/getting_further/configure_an_apdex_for_your_traces_with_datadog_apm
kind: documentation
title: サービスごとに Apdex スコアを構成する
---
{{< jqmath-vanilla >}}

[Apdex][1]（アプリケーションパフォーマンスインデックス）は、企業のアライアンスによって開発されたオープンスタンダードであり、アプリケーションパフォーマンスのレポート、ベンチマーク、および追跡の標準化された方法を定義します。ウェブアプリケーションとサービスの応答時間を測定することによるユーザーエクスペリエンスの満足度に基づいており、その役割は、応答時間の平均と、極端なデータポイントがある場合に誤解を招く可能性のあるパーセンタイルを相殺することです。

## 定義

Apdex は、エンタープライズ Web アプリケーションのパフォーマンスに対するユーザー満足度の数値的尺度です。[0;1] 間隔の均一なスケールで多くの測定値を 1 つの数値に変換します。

* 0 = 満足しているユーザーはいない
* 1 = すべてのユーザーが満足

Apdex を定義するには、Datadog アカウントの管理者である必要があります。最初に時間のしきい値（**T**）を定義します。これは、Web アプリケーションまたはサービスの満足できる応答時間を、満足できない応答時間から分離します。1 つのしきい値で、次の 3 つのカテゴリを定義できます。

* 満足できるリクエストは、応答時間が **T** 未満。
* 許容できるリクエストは、応答時間が **T** 以上、**4T**以下。
* ストレスを感じるリクエストは、応答時間が **4T** を超えるか、エラーを返す。

しきい値が定義され、リクエストが分類されると、Apdex は次のように定義されます。

$$\bo\text"Apdex"=({\bo\text"Satisfied"\text" requests" + {{\bo\text"Tolerated"\text" requests"}
 / 2}})/{\bo\text"Total"\text" requests"} $$

ストレスを感じるリクエストは「通常」よりも 4 倍遅いため、正しいしきい値を選択することが重要です。T=3 の場合、ユーザーはページがロードされるまで 3 秒待ちますが、12 秒待つことは許容できないことになります。

Apdex しきい値は、Apdex スコアが計算される前に管理者により設定される必要があります。

## トレース用に Apdex を設定する

Web アプリケーションやサービスの Apdex を可視化するには

1. [サービスカタログ][3] で、Web サービスをクリックします。右上のグラフで、Latency の代わりに Apdex を選択します。このオプションが表示されない場合は、Web サービスをクリックしたことを確認してください。

   {{< img src="tracing/faq/apdex_selection.png" alt="Apdex の選択" >}}

2. ウィジェットの左上にある鉛筆アイコンを使用して、Apdex を構成します (このアイコンを表示するには、管理者である必要があります)。

   {{< img src="tracing/faq/apdex_edit.png" alt="Apdex の編集" >}}

3. しきい値を直接入力して、リクエストの分布を視覚化します。

   {{< img src="tracing/faq/apdex_update.png" alt="Apdex の更新" >}}

4. ウィジェットを保存して、Apdex の経時的な動きを追跡します。

   {{< img src="tracing/faq/apm_save.png" alt="Apdex の保存" >}}

## サービスカタログに Apdex を表示する

[サービスカタログ][2]に Apdex スコアを表示するには、ページの右上隅の構成メニューで Apdex を選択します。

{{< img src="tracing/faq/apdex_service_list.png" alt="Apdex サービスカタログ" >}}

[1]: https://www.apdex.org/
[2]: https://app.datadoghq.com/services
[3]: https://app.datadoghq.com/services?query=type%3Aweb