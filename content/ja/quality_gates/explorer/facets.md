---
description: Quality Gates Explorer のファセットについて説明します。
further_reading:
- link: quality_gates/explorer/
  tag: ドキュメント
  text: Quality Gates Explorer について
- link: quality_gates/search/
  tag: ドキュメント
  text: ルールと実行の検索方法
kind: ドキュメント
title: Quality Gates またはルール実行ファセット
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 Quality Gates は利用できません。</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates は公開ベータ版です。
{{< /callout >}}

## 概要

ファセットは、ルールまたは実行からユーザーが定義するタグや属性で、[定性的](#qualitative-facets)なデータ分析および[定量的](#quantitative-measures)なデータ分析の両方に役立ちます。ファセットによって、[ダッシュボード][2]や[ノートブック][3]に表示される検索クエリでルールまたは実行を操作することができるようになります。

[ファセットの作成](#creating-facets)は、[Quality Gates の検索][5]には**必須**ではありません。オートコンプリート機能は既存のファセットを使用しますが、新たに来る Quality Gates に一致するどんな入力も適用されます。

[Quality Gates Explorer][4] には、すぐに使えるファセットとして `Status` や `Gate ID` などがあります。[Quality Gates Explorer][5] のファセットを使用して、[Quality Gates の検索とフィルタリング][5]を行うことができます。

{{< tabs >}}
{{% tab "Gates" %}}

Navigate to [**Software Delivery** > **Quality Gates** > **Quality Gate Executions**][101] and select **Gates** to access the list of [Quality Gates facets][102].

{{< img src="quality_gates/explorer/facets_gates.png" text="Quality Gates Explorer のゲートのファセットリスト" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: /ja/quality_gates/explorer/?tab=gates

{{% /tab %}}
{{% tab "ルール" %}}

Navigate to [**Software Delivery** > **Quality Gates** > **Quality Gate Executions**][101] and select **Rules** to access the list of [Quality Gates facets][102].

{{< img src="quality_gates/explorer/facets_rules.png" text="Quality Gates Explorer のルールのファセットリスト" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: /ja/quality_gates/explorer/?tab=rules

{{% /tab %}}
{{< /tabs >}}

### 定性的ファセット

定性的ファセットの使用例

- 値に関する**相対的な洞察を取得する**。
- **一意な値**を数える**。
- 特定の値に対して Quality Gates を頻繁に**フィルタリング**する。例えば、環境タグのファセットを作成して、トラブルシューティングを開発、ステージング、または本番環境にまで絞り込みます。<br>

**注:** タグのフィルタリングにファセットは必須ではありませんが、調査中に頻繁に使用するタグのファセットを定義すると、解決までの時間を短縮するのに役立ちます。

### 定量的メジャー

定量的メジャーの使用例

- 複数の Quality Gates から値を**集計**する。
- Quality Gates を**範囲フィルター**する。
- 値に対して Quality Gates を**ソート**する。

#### 種類

メジャーは、長整数およびダブル値をサポートします。


## ファセットパネル

検索バーには、データをフィルタリングしグループ化するための包括的なインタラクションセットが提供されています。ただし、多くの場合は、ファセットパネルを使った方がよりわかりやすくデータに移動できます。ファセットを開くと、現在のクエリのスコープのコンテンツのサマリーが表示されます。

検索バーと URL には、ファセットパネルで選択した内容が自動的に反映されます。

- **ファセット (定性的)** には、一意の値のリストと、各ファセットに一致する Quality Gates のカウントが表示されます。
- **メジャー (定量的)** には、最小値から最大値までのスライダーがあります。スライダーを使用するか、数値を入力して、検索クエリを別の範囲に絞り込みます。

### ファセットのグループ化

ファセットは、ファセットリスト内で意味のあるテーマにグループ化されます。ファセットグループの割り当てや再割り当てはファセットリストにしか影響せず、検索や分析には影響しません。

### ファセットのフィルタリング

ファセットパネルの検索ファセットフィールドを使用して、ファセットリストをフィルタリングし、特定のファセットに移動します。検索は、ファセットの表示名とフィールド名を使用して結果の範囲を絞り込みます。

## ファセットの作成

ルール実行の属性にファセットを作成することは、Quality Gates を検索するために必須のステップではありません。ファセットは、特定のルール実行属性に意味深い説明を加えたい場合や、属性値をファセットリストに表示させたい場合に有用です。

### ファセットリストからのファセット作成

**+ Add** をクリックすると、ファセットパネルから直接ファセットを作成できます。

{{< img src="quality_gates/explorer/facets.png" alt="ファセットサイドパネルからファセットを追加" style="width:30%;">}}

このファセットの基底のフィールド（キー）名を定義します。

- プレフィックス `@` がある、Quality Gates 属性の属性パスを使用します。

現在のビューの Quality Gates のコンテンツに基づくオートコンプリートは、適切なフィールド名を定義するのに役立ちますが、ここでは事実上どのような値でも使用できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/ci
[2]: /ja/dashboards/
[3]: /ja/notebooks/
[4]: /ja/quality_gates/explorer
[5]: /ja/quality_gates/search
[6]: /ja/quality_gates/explorer/search_syntax/