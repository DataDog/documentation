---
description: Guide for RUM sampling.
further_reading:
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentation
  text: Learn about RUM Monitors
title: Best Practices for RUM Sampling
---

## 概要

Datadog のリアルユーザーモニタリング製品のサンプリングでは、ユーザートラフィックの一定割合からデータを収集することができます。

このガイドでは、RUM サンプリングのベストプラクティスを説明し、モニタリングのニーズに基づいてセッションをキャプチャし、データを収集できるようにします。RUM の[セッションの定義][9]方法についてはこちらをご覧ください。

## サンプリング構成

### SDK バージョンに対応する変数名の構成

セッションは、[SDK 構成][1]に記載されているパーセンテージに基づいてランダムにサンプリングされます。そのため、使用する SDK のバージョンに適した構成変数名を使用してください。

### サンプリングレートの構成
各新規ユーザーセッションの前に、SDK は 0 と 1 の間のランダムな浮動小数点数を描画し、これが SDK 構成で設定された値と比較されます。この乱数が SDK 構成で設定された値より小さい場合、セッションは保持され、イベントの収集が開始されます。乱数の方が大きい場合、セッションは保持されず、セッションが終了するまでイベントは収集されません。

SDK ([Browser][2]、[Android][3]、[iOS][4]、[React Native][5]、[Flutter][6]、[Roku][7]) でサンプリングレートを設定し、アプリケーションコードにデプロイすることができます。

RUM で利用できるのは、サンプリングされたセッションのみです。例えば、サンプリングレートが 60% に設定されている場合、すべてのセッションとメトリクス (コアウェブバイタルや使用数など) の 60% が RUM で表示されます。

ランダムサンプリングはユーザーごとではなく、セッションごとに行われます。

### RUM で利用可能なデータとメトリクスに対するサンプリングの効果
RUM メトリクス (コアウェブバイタルや使用数など) は、サンプリングされたセッションに基づいて計算されます。例えば、サンプリングレートがセッションの 60% をキャプチャするように設定されている場合、コアウェブバイタルと総セッション数はこれらのセッションの 60% に基づいて計算されます。

### 推奨サンプリングレート
理想的なサンプリングレートの設定に関しては、トラフィック量と求めるデータによって異なります。Datadog では、予算と推定トラフィックに基づいて納得のいくサンプリングレートから始め、必要なデータに基づいて調整することを推奨しています。

### 特定の属性に基づくサンプリング
エラーのあるセッションを 100% サンプリングし、それ以外は 5% サンプリングする、またはチェックアウトフローを通過したセッションのみをサンプリングするなど、特定の属性に基づいてサンプリングを構成することはサポートされていません。この機能がビジネスニーズに欠かせない場合は、[Datadog サポート][8]でチケットを作成してください。

### Datadog RUM UI でのサンプリングレートの変更
Datadog RUM UI でサンプリングレートを変更することはサポートされていません。この機能がビジネスニーズに欠かせない場合は、[Datadogサポート][8]でチケットを作成してください。

### ライブ障害時のサンプリングの調整

バグやインシデントが発生した場合、サンプリングを増やしてブラウザユーザーのトラフィックを 100% 収集し、セッションの見逃しがないようにすることができます。このためには、コード変更をデプロイする必要があります。

**注**: この機能は、リリースサイクルが長いため、モバイルおよび Roku アプリケーションには適用されません。

### モバイルデバイスがオフラインまたはクラッシュしたときの対応

RUM では、ユーザーのデバイスがオフラインのときのデータも確実に利用できます。ネットワークの状態が悪いエリアにいる場合やデバイスのバッテリーが非常に少ないなどの場合でも、すべての RUM イベントは最初にローカルデバイスにバッチで格納されます。ネットワークが利用可能になると、RUM SDK がエンドユーザーのエクスペリエンスに影響を与えない程度にバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/guide/sampling-browser-plans/#overview
[2]: /ja/real_user_monitoring/guide/sampling-browser-plans/#overview
[3]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tab=kotlin#initialization-parameters
[4]: /ja/real_user_monitoring/ios/advanced_configuration/?tab=swift#sample-rum-sessions
[5]: /ja/real_user_monitoring/reactnative/#initialize-the-library-with-application-context
[6]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter/advanced_configuration/#sample-rum-sessions
[7]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/roku/#initialize-the-library
[8]: /ja/help
[9]: /ja/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/#sessions