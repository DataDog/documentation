---
description: CI Visibility Explorer でパイプライン実行を検索する際に使用できるデフォルトのファセットについて学びます。
further_reading:
- link: continuous_integration/search/
  tag: ドキュメント
  text: パイプラインの検索方法について
- link: continuous_integration/explorer/
  tag: ドキュメント
  text: CI Visibility Explorer について
title: パイプライン実行ファセット
---

## 概要

ファセットとは、パイプラインからユーザーが定義したタグや属性のことです。これらは、[定性的](#qualitative-facets)および[定量的](#quantitative-measures)なデータ分析に役立ちます。ファセットによって、[CI パイプラインモニター][1]や[ダッシュボード][2]、[ノートブック][3]に表示される検索クエリでパイプラインを操作することができるようになります。

[ファセットの作成](#creating-facets)は、[パイプライン実行の検索][5]には**必須**ではありません。オートコンプリート機能は既存のファセットを使用しますが、入力されたパイプライン実行にマッチする入力も適用されます。

## 一般的なファセット

[**Software Delivery** &gt; **CI Visibility** &gt; **Executions**][7] に移動して、パイプライン実行リストの左側に表示されるファセットの一覧にアクセスします。

{{< img src="/continuous_integration/facets-pipelines.png" text="CI Visibility Explorer の Pipeline Executions ページの Facets リスト" style="width:100%" >}}

[CI Visibility Explorer][4] には、すぐに使える以下のファセットが含まれています。

| ファセット | 説明 |
|---|---|
| CI Provider | CI プロバイダーの名前 (GitHub、GitLab など)。 |
| Pipeline Name | CI パイプラインの名前。 |
| Node Name | パイプライン、ステージ、またはジョブを実行した CI ノードの名前。 |
| Node Labels | パイプライン、ステージ、またはジョブを実行した CI ノードに関連付けられたラベル。 |
| Pipeline URL | パイプライン実行のプロバイダー URL。 |
| Pipeline ID | パイプラインの ID。 |
| Pipeline Number | CI プロバイダーが提供する CI パイプラインの実行番号。この値はパイプラインを部分的に再試行すると増加します。 |
| Job URL | ジョブ実行のプロバイダー URL。 |
| Stage Name | CI ステージの名前。 |
| Job Name | CI ジョブの名前。 |
| Kubernetes Namespace | Kubernetes ポッドが実行されているネームスペース。 |
| Kubernetes Pod Name | Kubernetes ポッドの名前。 |
| Image Tag | Kubernetes コンテナイメージのタグ。 |
| Container Name | Kubernetes コンテナ名のタグ。 |
| Image Name | Kubernetes コンテナイメージ名のタグ。 |
| コンテナ ID | Kubernetes コンテナ ID。 |
| Kubernetes Container Name | Kubernetes コンテナの名前。 |
| Kubernetes Deployment | ポッドが属する Kubernetes デプロイメント。 |
| Kubernetes Stateful Set | ポッドが属する Kubernetes の StatefulSet。 |
| Repository URL | Git リポジトリの URL。 |
| Repository ID | Git リポジトリを一意に識別する ID。 |
| Commit SHA | Git コミット SHA。 |
| Branch | Git ブランチ。 |
| Tag | Git タグ。 |
| Author Email | Git 作成者メールアドレス。 |
| Committer Email | Git コミッターメールアドレス。 |
| Committer Date | Git コミッター日付。 |
| Author Date | Git 作成者日付。 |
| Env | CI パイプラインが実行されている環境。 |
| Resource | CI パイプラインで使用されているリソース。 |
| Operation Name | CI パイプライン内で実行された操作。 |
| エラーの種類 | CI 実行中に発生したエラーの種類。 |
| タイプ | CI 実行またはエンティティの種類。 |
| Complete Trace | CI パイプライン実行の完全なトレース。 |
| Duration | 実行時間 (秒)。 |
| バージョン | 使用された CI パイプラインまたはツールのバージョン。 |
| Is Default Branch | Git リポジトリのデフォルトブランチで実行されたかどうかを示します。 |

CI Visibility Explorer でファセットを使用して、以下の操作を行うことができます。

- [パイプライン実行を検索およびフィルターする][5]
- パイプライン分析を実行する
- パイプラインが完了したら、トラブルシューティングを開始する


### 定性的ファセット

次が必要な場合は、定性的ファセットを使用します。

- 値に関する**相対的な洞察を取得する**。
- **一意な値**を数える**。
- 特定の値に対してパイプライン実行を頻繁に**フィルタリング**する。たとえば、環境タグのファセットを作成して、トラブルシューティングを開発、ステージング、または本番環境にまで絞り込みます。<br>

**注:** タグのフィルタリングにファセットは必須ではありませんが、調査中に頻繁に使用するタグのファセットを定義すると、解決までの時間を短縮するのに役立ちます。

### 定量的メジャー

次が必要な場合は、定量的メジャーを使用します。

- 複数のパイプライン実行から値を**集計**する。
- パイプライン実行を**範囲フィルター**する。
- パイプライン実行をその値に対して**ソート**する。

#### 種類

メジャーには、同等の機能のために、長整数またはダブル値があります。

#### 単位

メジャーは、クエリ時および表示時の桁数を処理するための単位 (**time** (秒) または **size** (バイト)) をサポートしています。単位は、メジャー自体のプロパティであり、フィールドのプロパティではありません。

例えば、`duration` というメジャーをナノ秒単位で考えてみましょう。例えば、`service:A` からのパイプライン実行が `duration:10000000` で、`10 milliseconds` を意味するとします。`service:B` からのスパンは `duration:5000000` で、`5 milliseconds` を意味すると仮定します。`duration:>2ms` を使用すると、一度に両方のサービスのパイプライン実行タグを一貫してクエリすることができます。検索クエリの詳細については、[検索構文][6]を参照してください。

## ファセットパネル

検索バーを使うと、包括的かつインタラクティブにデータをフィルタリングしグループ化することができます。ただし、多くの場合は、ファセットパネルを使った方がよりわかりやすくデータに移動できます。ファセットを開くと、現在のクエリのスコープのコンテンツのサマリーが表示されます

検索バーと URL には、ファセットパネルで選択した内容が自動的に反映されます。

- **ファセット (定性的)** には、一意の値の上位リストと、それぞれに一致するパイプライン実行の数が用意されています。
- **メジャー (定量的)** には、最小値と最大値を示すスライダーが付いています。スライダーを使用するか、数値を入力して、検索クエリを別の範囲に絞り込みます。


### ファセットのグループ化

ファセットは、ファセットリスト内で意味のあるテーマにグループ化されます。ファセットグループの割り当てや再割り当てはファセットリストにしか影響せず、検索や分析には影響しません。

### ファセットのフィルタリング

ファセットパネルのファセットの検索ボックスを使用して、ファセットリスト全体を絞り込み、操作する必要があるファセットに移動することができます。ファセット検索では、ファセット表示名とフィールド名を使用して、結果の範囲を絞り込みます。

## ファセットの作成

パイプライン実行の属性やタグにファセットを作成することは、パ イプライン実行を検索するために必須のステップではありません。ファセットは、特定のパイプライン実行属性に意味のある説明を追加したい場合や、属性値を Facets リストに表示したい場合に便利です。

### Pipeline Executions サイドパネルからのファセットの作成 

ファセットを作成する最も簡単な方法は、ファセットの詳細の大部分が事前に入力されるように、Pipeline Executions サイドパネルから追加することです。

{{< img src="continuous_integration/create_facet.png" alt="CI Pipeline Execution サイドパネルからファセットを作成する" style="width:100%;">}}

1. [CI Visibility Explorer][4] で、ファセットを作成するフィールドを含む対象のパイプライン実行に移動します。
2. リストからパイプライン実行を選択して、Pipeline Executions サイドパネルを開きます。
3. 必要なフィールド (パイプライン実行のスパンの場合は **Info** タブ) をクリックし、そこからファセットを作成します。

   - フィールドに数値がある場合、ファセットまたはメジャーのいずれかを作成できます。
   - フィールドに文字列値がある場合、ファセットの作成のみが可能です。

### ファセットリストからのファセット作成

目的のフィールドを持つパイプライン実行を見つけることができない場合は、**+ Add** をクリックして、ファセットパネルから直接ファセットを作成します。

{{< img src="continuous_integration/add_facet.png" alt="ファセットサイドパネルからファセットを追加" style="width:30%;">}}

このファセットの基底のフィールド（キー）名を定義します。

- インフラストラクチャータグにタグキー名を使用します。
- プレフィックス `@` がある、パイプライン実行属性の属性パスを使用します。

現在のビューのパイプライン実行の内容に基づいてオートコンプリート機能が働くためは、適切なフィールド名を定義しやすくなっています。ただしここでは、特に Datadog が受信したパイプライン実行に一致するものがない場合は、実際はどんな値でも使用できます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/ci
[2]: /ja/dashboards/
[3]: /ja/notebooks/
[4]: /ja/continuous_integration/explorer
[5]: /ja/continuous_integration/search
[6]: /ja/continuous_integration/explorer/search_syntax/
[7]: https://app.datadoghq.com/ci/pipeline-executions