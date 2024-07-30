---
aliases:
- /ja/getting_started/getting_started_with_tags
- /ja/guides/getting_started/tagging/
- /ja/developers/getting_started/tagging/
- /ja/tagging
- /ja/guides/tagging/
- /ja/faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
description: Datadog でタグを割り当て、使用する方法について説明します。
further_reading:
- link: /getting_started/tagging/assigning_tags/
  tag: Documentation
  text: タグの割り当て方法
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: 統合サービスタグ付けの構成方法を学ぶ
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: タグの使用方法について
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Datadog を使った効果的なタグ付けに関するインタラクティブなセッションに参加できます
title: タグの使用を開始する
---

## 概要

タグは、Datadog テレメトリーにディメンションを追加する方法のひとつで、Datadog の可視化機能によって絞り込み、集計、比較できます。[タグを使用][1]すると、複数のホストの集計パフォーマンスを観察でき、必要に応じて、特定の要素に基づいて設定をさらに絞り込むこともできます。つまり、タグ付けは集計データポイントを観察する手段です。

タグ付けにより、Datadog のさまざまなデータ タイプをバインドし、メトリクス、トレース、ログの間でアクションを関連付け、呼び出すことができます。この操作は、**専用**タグ キーで実行できます。

| タグ キー   | 可能な操作                                                            |
| --------- | --------------------------------------------------------------------- |
| `host`    | メトリクス、トレース、プロセス、ログの間の関連付け。              |
| `device`  | デバイスまたはディスクごとのメトリクス、トレース、プロセス、ログの分離。 |
| `source`  | ログ管理のためのスパンの絞り込みと自動パイプライン。     |
| `service` | メトリクス、トレース、ログにおけるアプリケーション固有データのスコーピング。 |
| `env`     | メトリクス、トレース、ログにおけるアプリケーション固有データのスコーピング。 |
| `version` | メトリクス、トレース、ログにおけるアプリケーション固有データのスコーピング。 |

Datadog は、集計の `サービス` レベルでコンテナー、VM、クラウドインフラストラクチャーに注目することを推奨しています。たとえば、サーバー A とサーバー B で個別に CPU 使用率を確認するよりも、サービスを表すホストのコレクション全体で CPU 使用率を見ます。

コンテナやクラウド環境では、定期的にホストが入れ替わるため、タグを使用してメトリクスを集計することが重要です。

## タグの定義

以下は、Datadog のタグ付け要件です。

1. タグの**先頭は文字にする**必要があり、その後は以下の文字を使用できます。

    - 英数字
    - アンダースコア
    - マイナス
    - コロン
    - ピリオド
    - スラッシュ

    その他の特殊文字は、アンダースコアに変換されます。

2. タグの長さは**最大 200 文字**で、Unicode 文字 (日本語などの言語を含むほとんどの文字セットを含む) をサポートします。
3. タグは小文字に変換されます。そのため、`CamelCase (キャメル ケース)` 形式のタグは推奨されません。認証 (クローラー) ベースのインテグレーションでは、タグのキャメル ケース部分はアンダースコアに変換されます。たとえば、`TestTag` は `test_tag` となります。
4. タグは `value` または `<KEY>:<VALUE>` の形式にすることができます。よく使用されるタグ キーは、`env`、`instance`、`name` です。キーの後ろには常に、グローバルタグ定義の最初のコロンが付きます。例:

   | タグ                | キー           | 値          |
    | ------------------ | ------------- | -------------- |
   | `env:staging:east` | `env`         | `staging:east` |
   | `env_staging:east` | `env_staging` | `east`         |

5. タグは、EPOCH タイムスタンプ、ユーザー ID、リクエスト ID などのバインドされていないソースをベースにすることはできません。実行すると、組織の[メトリクス数が無限に増加][2]し、請求に問題が発生します。
6. 制限 (ダウンケースなど) はメトリクスタグにのみ適用され、ログ属性やスパンタグには適用されません。

## タグ付けの方法

### タグ付けの方法

タグ付けは、次のいずれか (またはすべて) の方法を使用して実行できます。

| メソッド                   | タグ付けの方法                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [コンフィギュレーションファイル][3] | メインの Agent またはインテグレーションのコンフィギュレーションファイルで手動で行います。 |
| [UI][4]                  | Datadog サイトで。                                             |
| [API][5]                 | Datadog の API を使用するとき。                                        |
| [DogStatsD][6]           | DogStatsD でメトリクスを送信するとき。                          |

詳しくは、[タグの付け方][7]をご覧ください。
#### 統合サービスタグ付け

Datadog では、タグを付ける際のベストプラクティスとして、統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][8]をご参照ください。

## 使用方法

ホストと[インテグレーション][9] レベルで[タグを割り当てた][7]後、メトリクス、トレース、ログを絞り込みグループ化するためにタグの使用を開始します。タグは、Datadog プラットフォームの次の領域で使用されます。

| 領域                 | タグを使用して実行すること                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [イベント][10]         | イベントストリームの絞り込み。                                                                          |
| [ダッシュボード][11]     | グラフでのメトリクスの絞り込みおよびグループ化。                                                               |
| [インフラストラクチャー][12] | ホストマップ、インフラストラクチャー リスト、ライブ コンテナ、ライブプロセス ビューの絞り込みとグループ化。 |
| [モニター][13]       | モニターの管理、モニターの作成、ダウンタイムの管理。                                             |
| [メトリクス][14]        | メトリクスエクスプローラーでの絞り込みとグループ化。                                                        |
| [インテグレーション][15]   | AWS、Google Cloud、Azure のメトリクスをオプションで制限。                                        |
| [APM][16]            | サービス、トレース、プロファイルをフィルターにかける。サービスマップを使って他のエリアに移動する。           |
| [RUM & セッションリプレイ][17] | RUM エクスプローラーで、イベント検索、分析、パターン、リプレイ、問題をフィルターにかける。        |
| [Synthetic Monitoring & Continuous Testing][18]     | Synthetic Monitoring & Testing Results Explorer を使用して、Synthetic テストや CI パイプラインで実行中のテストをフィルタリングおよびグループ化します。   |
| [ノートブック][19]      | グラフでのメトリクスの絞り込みおよびグループ化。                                                               |
| [ログ][20]           | ログ検索、分析、パターン、Live Tail、パイプラインの絞り込み。                                |
| [SLO][21]           | SLO、グループ化されたメトリクスベース SLO、グループ化されたモニターベース SLO の検索。                       |
| [開発者][22]     | API を使用して情報を取得、または UI のさまざまな領域をセットアップ。                                 |
| [請求][23]        | 3 つのタグを選択することで Datadog の使用量を報告します。たとえば、`env`、`team`、`account_id` のように選択できます。 |
| [CI Visibility][24]  | CI Visibility Explorer を使用して、テスト実行またはパイプライン実行をフィルタリングおよびグループ化します。 |

詳しくは、[タグの使用方法][1]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/using_tags/
[2]: /ja/metrics/
[3]: /ja/getting_started/tagging/assigning_tags/#configuration-files
[4]: /ja/getting_started/tagging/assigning_tags/#ui
[5]: /ja/getting_started/tagging/assigning_tags/#api
[6]: /ja/getting_started/tagging/assigning_tags/#dogstatsd
[7]: /ja/getting_started/tagging/assigning_tags/
[8]: /ja/getting_started/tagging/unified_service_tagging
[9]: /ja/integrations/
[10]: /ja/getting_started/tagging/using_tags/#events
[11]: /ja/getting_started/tagging/using_tags/#dashboards
[12]: /ja/getting_started/tagging/using_tags/#infrastructure
[13]: /ja/getting_started/tagging/using_tags/#monitors
[14]: /ja/getting_started/tagging/using_tags/#metrics
[15]: /ja/getting_started/tagging/using_tags/#integrations
[16]: /ja/getting_started/tagging/using_tags/#apm
[17]: /ja/getting_started/tagging/using_tags/#rum--session-replay
[18]: /ja/getting_started/tagging/using_tags/#synthtics
[19]: /ja/getting_started/tagging/using_tags/#notebooks
[20]: /ja/getting_started/tagging/using_tags/#logs
[21]: /ja/getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[22]: /ja/getting_started/tagging/using_tags/#developers
[23]: /ja/account_management/billing/usage_attribution/
[24]: /ja/getting_started/tagging/using_tags/#ci-visibility