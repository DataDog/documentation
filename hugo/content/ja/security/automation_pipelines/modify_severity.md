---
further_reading:
- link: /security/automation_pipelines
  tag: ドキュメント
  text: 自動化パイプライン
- link: /security/manual_severity_adjustment/
  tag: ドキュメント
  text: 重大度の調整
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: 重大度変更ルール
---
{{< product-availability >}}

重大度変更ルールを設定して、組織のビジネスコンテキストを反映するように検出結果の重大度を調整します。たとえば、ノイズを減らすために分離された環境での検出結果の重大度を下げたり、PII (個人を特定できる情報) が含まれるデータベースでの検出結果の重大度を上げて、そのような結果にすぐに注意を向けられるようにします。

## 重大度変更ルールを作成する {#create-a-severity-modifier-rule}

1. Datadog で、[[**Security**(セキュリティ)] > [**Settings**(設定)] > [**Findings Automation**(検出の自動化)]][2] に移動します。[**Add a New Rule**](新規ルールの追加) をクリックし、[**Modify Severity Level**](重大度レベルの変更) を選択します。[Create a New Rule](新規ルールの作成) ページが開きます。
1. [**Rule name**](ルール名) に、ルールの内容を表すわかりやすい名前を入力します。たとえば、「PII データベースにアクセスするサービスの重大度を高める」とします。
1. 以下のフィールドにルールの条件を追加します。
    - **[Any of these types]**(次のいずれかのタイプ): ルールでチェックする検出結果のタイプ。利用可能なタイプは次のとおりです。
      - ランタイムコードの脆弱性
      - 静的コードの脆弱性
      - ライブラリの脆弱性
      - シークレット
      - Infrastructure as Code
      - コンテナイメージの脆弱性
      - ホストの脆弱性
      - 設定ミス
      - 攻撃経路
      - アイデンティティリスク
      - API のセキュリティ
      - ワークロードアクティビティ
    - **[Any of these tags or attributes]**(次のいずれかのタグまたは属性): ルールを適用するために一致する必要があるソースのタグまたは属性。
1. 必要に応じて、[**Add Severity**](重大度を追加) をクリックして重大度レベルで検出結果をフィルターします。このルールは、ユーザー定義の調整が行われる前の、Datadog で調整された各検出結果の重大度と照合されます。
1. 重大度変更アクションを定義します。
    [- **Set to a specific level**](特定のレベルに設定する): 照合結果を固定の重大度に設定します。[**Info / None**](情報/なし)、[**Low**](低)、[**Medium**](中)、[**High**](高)、または [**Critical**](重大) の中から選択します。
      [<div class="alert alert-info"><strong>Info / None</strong>](情報/なし) は、特定のタイプの検出結果でのみ使用可能です。「<a href="#severity-floors-by-finding-type">各検出結果タイプの最小重大度</a>」を参照してください。</div>
    - **Shift up or down one level**: Increases or decreases the severity of matching findings by one level. See [Severity floors by finding type](#severity-floors-by-finding-type) for the lowest severity a finding type can shift down to, and [Evaluation order](#evaluation-order) for what happens when a finding is already at that bound.
1. 必要に応じて、[**Description**](説明) にルールが適用される理由に関する説明を入力します。このテキストは、ユーザーが変更された検出結果を表示する際に、重大度の内訳パネルに表示されます。
1. [**Save**](保存) をクリックします。このルールは新しい検出結果には直ちに適用され、既存の検出結果については 1 時間以内にチェックが開始されます。

**注**: ルールクエリで `@severity` および `@severity_details.user_adjusted` を使用することはできません。重大度変更ルールは、検出結果に保存されている `@severity` の値ではなく、Datadog が調整した重大度 (`@severity_details.adjusted.value`) に対して評価されます。

## 評価順序 {#evaluation-order}

重大度変更ルールは自動化パイプラインの最初のステップであり、ミュートルール、期日ルール、受信トレイルール、チケット作成ルールよりも先に実行されます。重大度変更ルールにおいて、Datadog は first-match ポリシーを使用しています。これは、検出結果が各ルールに対して順番に評価され、最初に一致したルールが適用されるというものです。検出結果でルールの一致が見つかると、それ以降の重大度変更ルールは評価されなくなります。

ルールが一致と見なされるのは、そのアクションの適用によって検出結果の重大度が変更される場合のみです。アクションを適用しても重大度が変更されない場合 (たとえば、すでに重大度の上限に達している場合の重大度変更アクションや、検出結果の現在の重大度を設定するアクション)、そのルールは一致とはならず、Datadog はその検出結果に対して後続の重大度変更ルールの評価を続行します。

重大度変更ルールは最初に実行されるため、ミュートルールを含む、後続のすべての自動化ルールでは、評価時に変更された重大度を参照します。

## 変更された検出結果を特定する {#identify-modified-findings}

重大度変更ルールが適用された検出結果には、エクスプローラーのリストビューと検出結果のサイドパネルのヘッダーで、視覚的なインジケーターが示されます。インジケーターにカーソルを合わせると、変更の原因となった自動化ルールが表示されます。

{{< img src="security/automation_pipelines/severity_pill_popover.png" alt="変更インジケーター付きの重大度アイコンが表示されている、検出結果のエクスプローラーアイテム。ポップオーバーには、検出結果の重大度調整の原因となった自動化ルールに関する詳細情報が表示されます。" style="width:65%;" >}}

CVSS スコア (コンテナイメージの脆弱性、ホストの脆弱性、ライブラリの脆弱性、およびランタイムコードの脆弱性) を持つ検出結果については、サイドパネルの重大度セクションに以下の内訳も表示されます。
- 変更前の元の重大度レベル、CVSS スコア、および CVSS ベクトル。
- 変更をトリガーした自動化ルールの名前と、そのルールへの直接リンク。
- 最終的な重大度レベルと調整後の CVSS スコア。

{{< img src="security/automation_pipelines/severity_breakdown.png" alt="元の重大度、CVSS スコア、CVSS ベクトル、変更をトリガーした自動化ルール、および最終的な重大度レベルと調整後の CVSS スコアが表示されている、検出結果のサイドパネル。" style="width:100%;" >}}

## 各検出結果タイプの最小重大度 {#severity-floors-by-finding-type}

すべての検出結果タイプで同じ重大度スケールが使用されるわけではありません。次の表に、各検出結果タイプで利用可能な中で最小の重大度を示します。

| 検出結果タイプ | 最小重大度 |
|---|---|
| API のセキュリティ | 情報 |
| 攻撃経路 | 情報 |
| アイデンティティリスク | 情報 |
| 設定ミス | 情報 |
| ワークロードアクティビティ | 情報 |
| コンテナイメージの脆弱性 | なし |
| ホストの脆弱性 | なし |
| ライブラリの脆弱性 | なし |
| Infrastructure as Code | 低 |
| ランタイムコードの脆弱性 | 低 |
| シークレット | 低 |
| 静的コードの脆弱性 | 低 |

[**Info / None**](情報/なし) は、最小重大度が [**Low**](低) である検出結果タイプでは使用できません。ルールにそのタイプの検出結果を含め、[**Info / None**](情報/なし) を選択すると、検証エラーとなります。

## 重大度が [Unknown](不明) の検出結果 {#findings-with-unknown-severity}

重大度変更ルールでは、重大度が [**Unknown**](不明) の検出結果を以下のように処理します。

- **重大度変更アクション**: ルールは、重大度が [**Unknown**](不明) である検出結果とは一致しません。ルールが一致しないため、その検出結果に対して後続の重大度変更ルールを引き続き評価することができます。
- **重大度の設定アクション**: ルールで選択される重大度に [**Unknown**](不明) が含まれている場合、ルールは一致し、[**Unknown**](不明) を指定された対象の重大度で置き換えます。重大度変更ルールを使用して、検出結果の重大度を [**Unknown**](不明) に設定することはできません。

## 脆弱性の検出結果と CVSS スコア{#vulnerability-findings-and-cvss-scores}

Datadog で調整された CVSS スコアを持つ脆弱性の検出結果では、重大度変更ルールによって、`@severity_details.user_adjusted` に保存されている調整済みスコアも更新されます。更新されたスコアは、対象の重大度の CVSS v3 範囲のほぼ中間に設定されます。

| 対象の重大度 | CVSS v3 範囲 |
|---|---|
| None (なし)| 0.0 |
| Low (低)| 0.1–3.9 |
| Medium (中)| 4.0–6.9 |
| High (高)| 7.0–8.9 |
| Critical | 9.0–10.0 |

元の CVSS ベクトルが変更されることはありません。調整後のスコアに合わせて合成ベクトルが生成されることはありません。ルールが一致するのは、検出結果の重大度を変更する場合のみであるため、スコアは重大度自体が変更された場合にのみ調整されます。「[評価順序](#evaluation-order)」を参照してください。

## 自動クローズおよび合格した検出結果 {#auto-closed-and-passed-findings}

重大度変更ルールは、自動クローズに移行した検出結果や、評価結果が**合格**である検出結果に対しては、クリアまたは更新されません。検出結果を最初に変更したルールが後から編集または削除された場合、それらの検出結果の重大度はクローズ時に設定されたもののままになります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=modify_severity