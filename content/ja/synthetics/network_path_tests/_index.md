---
aliases: null
description: Managed Locations を使ってグローバルな Network Paths を分析します。
further_reading:
- link: /network_monitoring/network_path/
  tag: ドキュメント
  text: Network Path について
- link: https://www.datadoghq.com/blog/network-path/
  tag: ブログ
  text: Datadog Network Path でネットワーク全体の遅延箇所を特定
title: Network Path テスト
---

## 概要

Synthetic Monitoring における Network Path Testing は、Synthetic テストがたどる経路に対する完全な可視性を提供します。アプリケーション、オンプレミス ネットワーク、ISP のいずれで障害が発生しているかを正確に特定できます。これにより、根本原因の特定が加速され、プロアクティブな問題検知が可能になり、テスト失敗時に対応可能なアラートをトリガーできます。また、稼働時間データも提供され、ネットワークの信頼性への投資価値を測定し、共有するのに役立ちます。

Managed Locations から Network Path テストを実行すると、アプリケーションに対して TCP、UDP、ICMP チェックを実施できます。世界各地のロケーションからクエリを実行する際に、パケットがたどる Network Path を可視化します。

<div class="alert alert-info">Synthetic Monitoring における Network Path テストの課金については、<a href="https://www.datadoghq.com/pricing/?product=network-monitoring#products">料金ページ</a>を参照してください。</div>

## テストの作成

1. Datadog で、左側メニューの **Digital Experience** にマウス オーバーし、**Tests** (under **Synthetic Monitoring & Testing**) を選択します。
2. **New Test > Network Path Test** をクリックします。

{{< img src="synthetics/network_tests/network_path_test.png" alt="New Synthetics Test から Network Path テストを作成" style="width:60%;">}}

## テストの設定

1. **request type** (TCP、UDP、ICMP) を選択し、クエリ先のホスト または URL を指定します。ポート情報は任意です。
2. テストに名前を付けます。
3. 任意: 詳細オプションを設定します:
   1. **Source service**: Network Path の可視化で、送信元ホストに表示するラベル。
   2. **Destination service**: Network Path の可視化で、宛先ホストに表示するラベル。
   3. **Max TTL**: 送信プローブ パケットの最大 TTL (最大ホップ数)。既定値は 30 ホップ。
   4. **E2E Queries**: パケット ロス、レイテンシ、ジッタを測定するために宛先へ送信するパケット数。既定値は 50。
   5. **Traceroute Queries**: 実行する traceroute の回数。結果は各テスト実行の詳細パネルで集約されます。既定値は 3。
   6. **TCP traceroute strategy** (TCP テストのみ): SACK と SYN の traceroute 戦略から選択します。SACK と Force SACK は、最新のアプリケーション トラフィックにより近い挙動を模倣します。
4. 任意: テストに **Tags** を追加します (環境タグなど)。タグを使うと、[Synthetic Monitoring & Continuous Testing ページ][1] で Synthetic テストをフィルタリングできます。

  {{< img src="synthetics/network_tests/new_network_path_test.png" alt="Advanced options を表示した Network Path テスト作成フォーム。" style="width:80%;">}}

5. 期待する結果を定義するために **assertions** を設定します。少なくとも 1 つの assertion が必要です。

   {{< img src="synthetics/network_tests/network_path_assertions.png" alt="assertions ドロップ ダウンのある Network Path テスト作成フォーム。" style="width:80%;">}}

   | タイプ | 演算子 1 | 演算子 2 | 値の型 |
   | :---- | :---- | :---- | :---- |
   | latency | avg, max, min | `is`, `<`, `<=`, `>`, `>=` | int |
   | packet loss | | `is`, `<`, `<=`, `>`, `>=` | int (0 から 100) |
   | jitter |  | `is`, `<`, `<=`, `>`, `>=` | float |
   | network hops  | avg, max, min | `is`, `<`, `<=`, `>`, `>=` | int |

6. テストを実行する **locations** を選択します。Network Path テストは Managed Locations から実行でき、グローバルなロケーションからエンド ポイントを検証できます。

   {{% managed-locations %}}

7. **test frequency** を設定して、Datadog が Network Path テストを実行する頻度を決定します。スケジュール済みのテストにより、最重要のエンド ポイントがユーザーに引き続き利用可能であることを保証します。

8. Network Path テストに対して、[アラート条件を定義][4] し、[テスト モニターを設定][5] します。

{{% synthetics-alerting-monitoring-network-path %}}

## テスト結果を表示

[Synthetic Tests ページ][1] の Network Path テストをクリックすると、Test Details ページが開き、テストに関する包括的な情報が表示されます:

- テストのプロパティと設定
- テスト履歴
- 個々のテスト実行
- すべてのテスト実行にわたる Network Path の集計可視化

Network Path の可視化は、各テスト実行中にクエリを完了するためにパケットが通る経路を表示します。[ヘルス バー][3] のハンドルをドラッグして時間範囲を調整し、特定の時間間隔におけるエンド ツー エンドのレイテンシとパケット ロスのスナップショットを確認できます。Network Path の可視化の構成方法の詳細は、[Network Path ドキュメント][2] を参照してください。

  <div class="alert alert-info">ヘルス バーを変更しても、ページ上部のグローバルな時間範囲には影響しません。</div>

  {{< img src="synthetics/network_tests/network_path_section.png" alt="Network Path の可視化セクション" style="width:100%;">}}

特定のテスト実行の詳細を表示するには、ページ下部のテーブルで該当するテスト実行をクリックします。サイド パネルが開き、実行情報、Network Path の可視化、assertion 結果が表示されます。

  {{< img src="synthetics/network_tests/test_run_side_panel.png" alt="ネットワーク テストの単一のテスト実行を表示するサイド パネル" style="width:100%;">}}

## 保持期間

<div class="alert alert-info">Network Path Testing のデータは 30 日間保持されます。</div>

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /ja/network_monitoring/network_path/path_view/
[3]: /ja/network_monitoring/network_path/path_view/#health-bar
[4]: /ja/synthetics/network_path_tests/#define-alert-conditions
[5]: /ja/synthetics/network_path_tests/#configure-the-test-monitor