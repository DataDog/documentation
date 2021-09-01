---
title: タグの概要
kind: ドキュメント
description: 'Datadog でのタグの使用方法'
aliases:
    - /ja/getting_started/getting_started_with_tags
    - /ja/guides/getting_started/tagging/
    - /ja/developers/getting_started/tagging/
    - /ja/tagging
    - /ja/guides/tagging/
    - /ja/faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
further_reading:
    - link: /getting_started/tagging/assigning_tags/
      tag: Documentation
      text: タグの割り当て方法
    - link: /getting_started/tagging/unified_service_tagging/
      tag: Documentation
      text: 統合サービスタグ付けを構成
    - link: /getting_started/tagging/using_tags/
      tag: Documentation
      text: Datadog アプリでタグを使用する方法
---

## はじめに

タグは、Datadog テレメトリーにディメンションを追加する方法のひとつで、Datadog の可視化機能によって絞り込み、集計、比較できます。[タグを使用][1]すると、多数のホストの集計パフォーマンスを観察でき、必要に応じて、特定の要素に基づいて設定をさらに絞り込むこともできます。つまり、タグ付けは集計データポイントを観察する手段です。

タグ付けにより、Datadog のさまざまなデータ タイプをバインドし、メトリクス、トレース、ログの間でアクションを関連付け、呼び出すことができます。この操作は、**専用**タグ キーで実行できます。以下に例を示します。

| タグ キー   | 可能な操作                                                            |
| --------- | --------------------------------------------------------------------- |
| `host`    | メトリクス、トレース、プロセス、ログの間の関連付け              |
| `device`  | デバイスまたはディスクごとのメトリクス、トレース、プロセス、ログの分離 |
| `source`  | ログ管理のためのスパンの絞り込みと自動パイプライン     |
| `service` | メトリクス、トレース、ログにおけるアプリケーション固有データのスコーピング |
| `env`     | メトリクス、トレース、ログにおけるアプリケーション固有データのスコーピング |
| `version` | メトリクス、トレース、ログにおけるアプリケーション固有データのスコーピング |

## 重要である理由

これは通常、集計の `サービス` レベルでコンテナー、VM、クラウドインフラストラクチャーに注目する際に役立ちます。たとえば、サーバー A とサーバー B で個別に CPU 使用率を確認するよりも、サービスを表すホストのコレクション全体で CPU 使用率を見る方が便利です。

コンテナとクラウド環境は常にホストの間を移動しているので、取得するメトリクスを集計できるようにタグ付けすることが重要です。

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

    **注**: `tag:` のようにタグの末尾にコロンを使用することはできません。

2. タグの長さは**最大 200 文字**で、Unicode (日本語などの言語を含むほとんどの文字セットを含む) をサポートします。
3. タグは小文字に変換されます。そのため、`CamelCase (キャメル ケース)` 形式のタグは推奨されません。認証 (クローラー) ベースのインテグレーションでは、タグのキャメル ケース部分はアンダースコアに変換されます。たとえば、`TestTag` は `test_tag` となります。**注**: `host` タグと `device` タグはこの変換から除外されます。
4. タグは `value` または `<KEY>:<VALUE>` の形式にすることができます。機能を最大限に活用するために、タグを** `<KEY>:<VALUE>` 形式に構成することをお勧めします** 。よく使用されるタグ キーは、`env`、`instance`、`name` です。キーの後ろには常に、グローバルタグ定義の最初のコロンが付きます。例:


   | タグ                | キー           | 値          |
    | ------------------ | ------------- | -------------- |
   | `env:staging:east` | `env`         | `staging:east` |
   | `env_staging:east` | `env_staging` | `east`         |

5. タグは、EPOCH タイムスタンプ、ユーザー ID、リクエスト ID などのバインドされていないソースをベースにすることはできません。実行すると、組織の[メトリクス数が無限に増加][2]し、請求に問題が発生します。
6. 制限 (ダウンケースなど) はメトリクスタグにのみ適用され、ログ属性やスパンタグには適用されません。

## タグの付け方

### タグ付けの方法

タグ付けは、次のいずれか (またはすべて) の方法を使用して実行できます。[タグの割り当て][3]については別途ドキュメントをご用意しておりますので、詳細はそちらをご参照ください。

| メソッド                   | タグ付けの方法                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [構成ファイル][4] | メインの Agent またはインテグレーションのコンフィギュレーションファイルで手動で行います。 |
| [UI][5]                  | Datadog アプリ                                              |
| [API][6]                 | Datadog の API を使用するとき                                        |
| [DogStatsD][7]           | DogStatsD 経由でメトリクスを送信するときに行います                           |

#### 統合サービスタグ付け

Datadog では、タグを付ける際のベストプラクティスとして、統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][8]ドキュメントをご参照ください。

## タグの使用方法

ホストと[インテグレーション][9] レベルで[タグを割り当てた][3]後、メトリクス、トレース、ログを絞り込みグループ化するためにタグの使用を開始します。タグは、Datadog プラットフォームの次の領域で使用されます。詳細は、[タグの使用方法][1]に関するドキュメントをご参照ください。

| 領域                 | タグを使用して実行すること                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [イベント][10]         | イベントストリームの絞り込み                                                                          |
| [ダッシュボード][11]     | グラフでのメトリクスの絞り込みおよびグループ化                                                               |
| [インフラストラクチャー][12] | ホストマップ、インフラストラクチャー リスト、ライブ コンテナ、ライブプロセス ビューの絞り込みとグループ化 |
| [モニター][13]       | モニターの管理、モニターの作成、ダウンタイムの管理                                             |
| [メトリクス][14]        | Metric Explorer での絞り込みとグループ化                                                        |
| [インテグレーション][15]   | AWS、Google Cloud、Azure のメトリクスをオプションで制限                                        |
| [APM][16]            | Analytics の絞り込み、サービス マップでの他の領域へのジャンプ                                 |
| [ノートブック][17]      | グラフでのメトリクスの絞り込みおよびグループ化                                                               |
| [ログ][18]           | ログ検索、分析、パターン、Live Tail、パイプラインの絞り込み                                |
| [SLO][19]           | SLO、グループ化されたメトリクスベース SLO、グループ化されたモニターベース SLO の検索                           |
| [開発者][20]     | API を使用して情報を取得、または UI のさまざまな領域をセットアップ                                 |
| [課金][21]        | 3 つのタグを選択することで Datadog の使用量を報告します。たとえば、`env`、`team`、`account_id` のように選択できます。 |

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/using_tags/
[2]: /developers/metrics/
[3]: /getting_started/tagging/assigning_tags/
[4]: /getting_started/tagging/assigning_tags/#configuration-files
[5]: /getting_started/tagging/assigning_tags/#ui
[6]: /getting_started/tagging/assigning_tags/#api
[7]: /getting_started/tagging/assigning_tags/#dogstatsd
[8]: /getting_started/tagging/unified_service_tagging
[9]: /integrations/
[10]: /getting_started/tagging/using_tags/#events
[11]: /getting_started/tagging/using_tags/#dashboards
[12]: /getting_started/tagging/using_tags/#infrastructure
[13]: /getting_started/tagging/using_tags/#monitors
[14]: /getting_started/tagging/using_tags/#metrics
[15]: /getting_started/tagging/using_tags/#integrations
[16]: /getting_started/tagging/using_tags/#apm
[17]: /getting_started/tagging/using_tags/#notebooks
[18]: /getting_started/tagging/using_tags/#logs
[19]: /getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[20]: /getting_started/tagging/using_tags/#developers
[21]: /account_management/billing/usage_attribution/
