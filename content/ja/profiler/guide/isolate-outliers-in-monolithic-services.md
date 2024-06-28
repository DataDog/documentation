---
further_reading:
- link: /profiler
  tag: ドキュメント
  text: Datadog Continuous Profiler
- link: /profiler/compare_profiles/
  tag: ドキュメント
  text: プロファイルの比較
title: モノリシックサービスで外れ値を隔離する
---

## 概要

単一のサービスが複数の用途を持つモノリシックなアプリケーションのパフォーマンスを調査する場合、通常はコードベースのどの部分が最もリソースを多く使用しているかを突き止める必要があります。まず、APM サービスのページからトップのエンドポイントを表示してみるのが論理的かもしれませんが、そこで表示されるデータはリクエスト数とその継続時間に焦点を当てており、それらのリクエストがバックエンドで利用可能なコンピューティングリソースに与える影響は表示されません。

代わりに、Continuous Profiler を使用して、エンドポイントの利用状況でフレームグラフを絞り込みます。これにより、リソースの消費量の多い上位のエンドポイントを特定し、エンドポイントごとに最もリソース使用量の多い関数を調べることができます。

このガイドでは、Datadog Continuous Profiler を使用して、こうした種類の問題を調べる方法を説明します。

## CPU バースト

パフォーマンス調査の最初のステップは、経時的なリソース使用量における異常値の特定です。サービス `product-recommendation` について、以下の過去 1 時間の CPU 使用率のグラフをご覧ください。

{{< img src="profiler/guide-monolithic-outliers/1-outliers-monolith-cpu-usage.png" alt="" style="width:100%;" >}}

これにより、正確な根本原因まではわかりませんが、CPU 使用率の異常ピークを見ることができます。

**Show - Avg of** ドロップダウン (前の画像でハイライト表示) を選択し、グラフを `CPU Cores for Top Endpoints` に変更します。このグラフでは、アプリケーションの異なる部分が全体の CPU 使用率にどのように寄与しているかが示されています。

{{< img src="profiler/guide-monolithic-outliers/2-outliers-monolith-cpu-top-endpoints.png" alt="" style="width:100%;" >}}


黄色のピークは、`GET /store_history` エンドポイントにおいて、先ほど特定した異常値に対応するいくつかの断続的な使用が見られることを示しています。ただし、これらのピークは、そのエンドポイントへのトラフィックの違いが原因かもしれません。さらなる洞察を得るために、プロファイルがどれだけの情報を提供できるかを理解するため、メトリクスを `CPU - Average Time Per Call for Top Endpoints` に変更します。

{{< img src="profiler/guide-monolithic-outliers/3-outliers-monolith-cpu-avg-time-per-call.png" alt="" style="width:100%;" >}}

更新されたグラフにより、CPU 使用率の急上昇が断続的に見られ、`GET /store_history` に対する呼び出しのたびに、CPU 時間として平均 3 秒を要していることが明らかになります。これは、急上昇がトラフィックの増加ではなく、リクエスト 1 回あたりの CPU 使用率の上昇によるものであることを示唆しています。


## エンドポイントの影響を分離する

`GET /store_history` が呼び出されるたびに CPU 使用率が上昇する原因を特定するため、スパイクが発生している時点での、このエンドポイントのプロファイリングフレームグラフを調べます。`GET /store_history` で CPU 使用率の上昇が見られる時間範囲を選択し、プロファイリングページのスコープをその時間範囲に設定します。次に、Flame Graph 表示に切り替えて、その時点で CPU を利用しているメソッドを確認します。

{{< img src="profiler/guide-monolithic-outliers/4-outliers-monolith-flame-graph.png" alt="画像の説明" style="width:100%;" >}}

`GET /store_history` エンドポイントで CPU をより多く使用する理由をより良く理解するには、前の画像でハイライトされたテーブルを参照してください。該当のエンドポイントが、上から 2 番目に表示されています。その行を選択し、フレームグラフのフォーカスを `GET /store_history` エンドポイントによって引き起こされる CPU 使用率に合わせます。

ここで調査しているのはリクエスト 1 件あたりのリソース使用量なので、表の上にあるドロップダウンの値も `CPU Time per Endpoint Call` に変更します。これにより、1 分あたりの平均リソース使用量ではなく、そのエンドポイントに対する呼び出し 1 回当たりの平均リソース使用量が表示されます。

## フレームグラフの比較

グラフが正しい時間とエンドポイントのデータを表示しているため、CPU 使用率の急上昇を引き起こしている要因を特定するには十分なデータがあります。まだ確信が持てない場合は、急上昇が発生したときのフレームグラフを、使用率がより許容できるレベルだったときのものと比較することができます。

CPU 使用時間が多いメソッドに、急上昇時と通常使用時で違いがあるかどうかを見るためには、**Compare** (検索フィールドの隣) をクリックし、`Previous 15 minutes` を選択します。これで Comparison ビューが開きます。

このビューには **A** 、**B** と書かれた 2 つのグラフが表示され、それぞれ `GET /store_history` 呼び出し 1 回あたりの CPU 使用率の時間範囲を表します。**A** のタイムセレクターを調整して、呼び出し 1 回あたりの CPU 使用率が低い期間に合わせます。

{{< img src="profiler/guide-monolithic-outliers/5-outliers-monolith-compare-flame-graphs.png" alt="画像の説明" style="width:100%;" >}}

この比較により、通常の CPU 使用率の時 (タイムフレーム **A**) には使用されておらず、急上昇発生時 (タイムフレーム **B**) に CPU 使用率に寄与している各種メソッドが明らかになります。前の画像で示されているとおり、`Product.loadAssets(int)` が急上昇を引き起こしています。

問題を修正するために、メソッドを最適化します。メソッドのコードを確認すると、シグネチャは `Product(int id, String name, boolean shouldLoadAssets)` であり、`GET /store_history` エンドポイントへのレスポンスにはアセットをロードする必要はありません。これは、コールスタックの上位に、`Product` コンストラクタに不適切にアセットをロードするよう指示するバグが存在することを示唆しています。

そのバグを修正して、前に見た時系列グラフを使用して、急上昇が解消されたことを確認します。

## オペレーションの影響を分離する (Java)

プロファイラーでは他の属性も利用可能です。たとえば、関数やスレッドではなく、オペレーション名を用いてフレームグラフをフィルタリングしたりグループ化したりできます。モノリシックなアプリケーションにおいて、これによりエンドポイント間でリソースが共有されている場合でも、CPU 集約的なリソースをより明確に特定できます。

APM の `Trace operation` 属性を使えば、選択したエンドポイントのトレースと同じ細かさでフレームグラフの絞り込みとグループ化が可能です。これは、スレッドやメソッドの細かい粒度と、エンドポイント全体の大まかな粒度との間で、適切なバランスとなっています。オペレーションを分離するには、**CPU time by** ドロップダウンから `Trace Operation` を選択します。

{{< img src="profiler/guide-monolithic-outliers/7-outliers-monolith-trace-operation.png" alt="画像の説明" style="width:100%;" >}}

前の画像では、`ModelTraining` オペレーションが `GET /train` エンドポイントでの主要な用途よりも多くの CPU 時間を使用していることが分かりますので、それが他のどこかで使われているはずです。それがどこで使用されているかを特定するため、オペレーション名をクリックしてください。この例では、`ModelTraining` は `POST /update_model` によっても使用されています。

## 独自のビジネスロジックを分離する (Java)

エンドポイントとオペレーションの分離は、デフォルトでプロファイルに利用可能ですが、異なるロジックを分離したい場合もあるでしょう。例えば、もしモノリスが特定の顧客に対して敏感な場合、プロファイルにカスタムフィルターを追加することができます。

{{< code-block lang="java" >}}
try (var scope = Profiling.get().newScope()) {
   scope.setContextValue("customer_name", <the customer name value>);
   <logic goes here>
}
{{< /code-block >}}




## 参考資料

{{< partial name="whats-next/whats-next.html" >}}