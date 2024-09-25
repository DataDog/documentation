---
disable_toc: false
further_reading:
- link: observability_pipelines/
  tag: ドキュメント
  text: Observability Pipelines
- link: observability_pipelines/update_existing_pipelines/
  tag: ドキュメント
  text: 既存のパイプラインを更新する
- link: observability_pipelines/advanced_configurations/
  tag: ドキュメント
  text: Observability Pipelines の高度な構成
- link: observability_pipelines/troubleshooting/
  tag: ドキュメント
  text: Observability Pipelines のトラブルシューティング
title: パイプラインをセットアップ
---

## 概要

Observability Pipelines では、パイプラインはソース、プロセッサ、宛先の 3 種類のコンポーネントで構成される順序的な経路です。Observability Pipeline の[ソース][1]は、ログソース (例: Datadog Agent) からログを受信します。[プロセッサ][2]はデータを拡充および変換し、[宛先][3]は処理済みのログが送信される場所です。テンプレートによっては、ログが複数の宛先に送信されることがあります。例えば、Archive Logs テンプレートを使用すると、ログはクラウドストレージプロバイダーと他の指定された宛先に送信されます。

## パイプラインをセットアップする

Observability Pipelines UI で、パイプラインおよびその[ソース][1]、[プロセッサ][2]、[宛先][3]をセットアップします。一般的なセットアップ手順は以下の通りです。

1. [Observability Pipelines][4] に移動します。
1. テンプレートを選択します。
    - [ログボリュームコントロール][4]
    - [ログのデュアルシッピング][5]
    - [ログの分割][6]
    - [Datadog アーカイブにログをアーカイブ][7]
    - [機密データのマスキング][8]
    - [ログエンリッチメント][9]
1. ソースを選択してセットアップします。
1. 宛先を選択してセットアップします。
1. プロセッサをセットアップします。
1. Observability Pipelines Worker をインストールします。
1. パイプラインのモニターを有効にします。

ブートストラップオプションや Kubernetes での Worker のセットアップの詳細については、[高度な構成][10]を参照してください。

パイプラインをセットアップした後、変更を加える場合は、[既存のパイプラインの更新][11]を参照してください。

## パイプラインを複製する

1. [Observability Pipelines][4] に移動します。
1. 複製するパイプラインを選択します。
1. ページの右上にある歯車アイコンをクリックし、**Clone** を選択します。

## パイプラインを削除

1. [Observability Pipelines][4] に移動します。
1. 削除するパイプラインを選択します。
1. ページの右上にある歯車アイコンをクリックし、**Delete** を選択します。

**注**: アクティブなパイプラインは削除できません。削除する前に、そのパイプラインのすべての Worker を停止する必要があります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/sources/
[2]: /ja/observability_pipelines/processors/
[3]: /ja/observability_pipelines/destinations/
[4]: /ja/observability_pipelines/log_volume_control/
[5]: /ja/observability_pipelines/dual_ship_logs/
[6]: /ja/observability_pipelines/split_logs/
[7]: /ja/observability_pipelines/archive_logs/
[8]: /ja/observability_pipelines/sensitive_data_redaction/
[9]: /ja/observability_pipelines/log_enrichment/
[10]: /ja/observability_pipelines/advanced_configurations/
[11]: /ja/observability_pipelines/update_existing_pipelines/