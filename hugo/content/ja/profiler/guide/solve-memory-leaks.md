---
further_reading:
- link: /profiler
  tag: ドキュメント
  text: Datadog Continuous Profiler
- link: /profiler/compare_profiles/
  tag: ドキュメント
  text: プロファイルの比較
title: メモリリークをプロファイリングで解決する
---

## 概要

プロファイリングには、Live Heap プロファイルタイプなど、メモリリークを解決するためのいくつかのデータセットがあります。これは[複数の言語で利用可能][1]です。

開始をサポートするために、Datadog は Go または Java サービス向けのエンドツーエンドのガイド付きウォークスルーを提供しています。

{{< img src="profiler/guide-memory-leak/service-page-memory-leak.png" alt="サービスページでのメモリリークウォークスルーのエントリポイント" style="width:100%;" >}}

## 期待できること

このウォークスルーをフォローするには事前の知識は一切必要なく、初めての調査でもアクセスできます。

ウォークスルーでは、次のいくつかのステップを通じて案内します。
1. 関連するデータに範囲を選択します。
2. 調査に役立つ Datadog のインテグレーションとアップグレードを推奨します。
3. ランタイムでのメモリ管理の仕組みを説明します。
4. [プロファイル比較][2]を通じて潜在的な根本原因を提案します。

## 要件

このウォークスルーを使用するには、以下が必要です。
* Datadog Kubernetes インテグレーションがインストールされた Kubernetes 上で実行されている Go または Java サービス。
* [Continuous Profiler が有効][3]になっていること。

## 開始する

ガイド付きウォークスルーを使用してメモリリークを調査するには

1. **[APM > Service Catalog][4]** に移動します。
1. 調査したいサービスにカーソルを合わせて、**Service Page** をクリックします。
1. **Memory Leaks** タブをクリックします。
1. ガイド付きの手順に従って調査を完了します。


[1]: /ja/profiler/enabling/supported_versions/#profile-types
[2]: /ja/profiler/compare_profiles
[3]: /ja/profiler/enabling
[4]: https://app.datadoghq.com/services

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}