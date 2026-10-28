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
title: 重大度修飾子ルール
---
{{< product-availability >}}

組織のビジネスコンテキストを反映して検出結果の重大度を調整するための、重大度モディファイアルールを構成します。たとえば、分離された環境での検出結果の重大度を下げてノイズを減らしたり、個人識別情報 (PII) を含むデータベースの検出結果の重大度を上げて即座に対応できるようにしたりします。

## 重大度修飾子ルールの作成 {#create-a-severity-modifier-rule}

1. Datadog で、**Security** > **Settings** > [**Findings Automation**][2] に移動します。**Add a New Rule** をクリックし、**Modify Severity Level** を選択します。[Create a New Rule] ページが開きます。
1. **Rule name** にルールの説明的な名前を入力します (例: 「PII データベースにアクセスするサービスの重大度を上げる」)。
1. 以下のフィールドにルール条件を追加します。
    - **Any of these types**: ルールがチェックする検知結果のタイプ。利用可能なタイプは以下のとおりです。
      - Runtime Code Vulnerability
      - Static Code Vulnerability
      - Library Vulnerability
      - Secret
      - Infrastructure as Code
      - コンテナイメージの脆弱性
      - ホストの脆弱性
      - 誤構成
      - 攻撃パス
      - アイデンティティリスク
      - API セキュリティ
      - ワークロードアクティビティ
    - **これらのタグまたは属性のいずれか**: ルールを適用するために一致する必要があるリソースタグまたは属性。
1. 必要に応じて、**Add Severity** をクリックして、重大度レベルで検出結果をフィルターします。このルールは、ユーザー定義の調整が行われる前の、Datadog によって調整された各検出結果の重大度に対して照合されます。
1. 重大度修飾アクションを定義します。
    - **Set to a specific level**: 一致する検出結果を固定の重大度に設定します。**Info / None**、**Low**、**Medium**、**High**、または **Critical** から選択します。
      <div class="alert alert-info"><strong>Info / None</strong> は一部の検出結果タイプでのみ有効です。<a href="#severity-floors-by-finding-type">検出結果タイプ別の重大度の下限</a>を参照してください。</div>
    - **Shift up or down one level**: Increases or decreases the severity of matching findings by one level. See [Severity floors by finding type](#severity-floors-by-finding-type) for the lowest severity a finding type can shift down to, and [Evaluation order](#evaluation-order) for what happens when a finding is already at that bound.
1. 必要に応じて、**Description** にルールが適用される理由の説明を入力します。このテキストは、ユーザーが変更された検出結果を表示する際に、重大度の内訳パネルに表示されます。
1. **Save** をクリックします。このルールは新しい検知結果に直ちに適用され、既存の検知結果に対しては 1 時間以内にチェックを開始します。

**注**: ルールクエリ内で `@severity` または `@severity_details.user_adjusted` を使用することはできません。重大度修飾子ルールは、検出結果に保存されている `@severity` の値ではなく、Datadog で調整された重大度 (`@severity_details.adjusted.value`) に対して評価されます。

[API][3] または [`datadog_security_findings_severity_modifier_rule`][4] Terraform リソースを使用して重大度修飾子ルールを作成することもできます。

## 評価順序 {#evaluation-order}

重大度修飾子ルールは自動化パイプラインの最初のステップであり、ミュート、期限、インボックス、およびチケット作成ルールよりも先に実行されます。重大度修飾子ルールにおいて、Datadog はファーストマッチポリシーを使用します。検出結果はルールに対して順番に評価され、最初に一致したルールが適用されます。その検出結果に対して、それ以降の重大度修飾子ルールは評価されません。

ルールのアクションを適用することで検出結果の重大度が変わる場合にのみ、そのルールは一致とみなされます。アクションを適用しても重大度が変わらない場合 (例: すでに重大度の境界に達しているシフトアクションや、検出結果の現在の重大度を対象とする設定アクションなど)、そのルールは一致せず、Datadog はその検出結果に対して後続の重大度修飾子ルールの評価を継続します。

重大度修飾子ルールが最初に実行されるため、ミュートルールを含むすべての後続の自動化ルールは、評価時に変更後の重大度を参照します。

## 変更された検出結果の特定 {#identify-modified-findings}

重大度修飾子ルールの影響を受けた検出結果には、エクスプローラーのリストビューおよび検出結果のサイドパネルヘッダーに視覚的なインジケーターが表示されます。インジケーターにカーソルを合わせると、変更の原因となった自動化ルールが表示されます。

{{< img src="security/automation_pipelines/severity_pill_popover.png" alt="修飾インジケーター付きの重大度ピルを表示する検出結果エクスプローラーの項目。ポップオーバーには、検出結果の重大度を調整した自動化ルールに関する詳細情報が表示されます。" style="width:65%;" >}}

CVSS スコアを持つ検出結果 (コンテナイメージの脆弱性、ホストの脆弱性、ライブラリの脆弱性、およびランタイムコードの脆弱性) については、サイドパネルの重大度セクションに以下の内訳も表示されます。
- 変更前の元の重大度レベル、CVSS スコア、および CVSS ベクター。
- トリガーされた自動化ルールの名前 (ルールへの直接リンク付き)。
- 変更後の重大度レベル、および調整済み CVSS スコア。

{{< img src="security/automation_pipelines/severity_breakdown.png" alt="重大度の内訳を示す検出結果のサイドパネル。元の重大度、CVSS スコア、CVSS ベクター、変更をトリガーした自動化ルール、および変更後の重大度レベルおよび調整済み CVSS スコアが表示されています" style="width:100%;" >}}

## 検出結果タイプ別の重大度の下限 {#severity-floors-by-finding-type}

すべての検出結果タイプが同じ重大度スケールを使用するわけではありません。次のテーブルは、各検出結果タイプで利用可能な最低の重大度を示しています。

| 検出結果タイプ | 最低の重大度 |
|---|---|
| API Security | Info |
| Attack Path | Info |
| Identity Risk | Info |
| Misconfiguration | Info |
| Workload Activity | Info |
| Container Image Vulnerability | None |
| Host Vulnerability | None |
| Library Vulnerability | None |
| Infrastructure as Code | Low |
| Runtime Code Vulnerability | Low |
| Secret | Low |
| Static Code Vulnerability | Low |

**Info / None** は、**Low** を最低の重大度とする検出結果タイプでは利用できません。ルールにそのような検出結果タイプを含め、**Info / None** を選択すると、検証エラーが発生します。

## 重大度が Unknown の検出結果 {#findings-with-unknown-severity}

重大度修飾子ルールは、重大度が **Unknown** の検出結果を次のように処理します。

- **Shift action**: ルールは、重大度が **Unknown** の検出結果には一致しません。ルールが一致しないため、その検出結果に対して後続の重大度修飾子ルールが引き続き評価されます。
- **Set action**: ルールの重大度セレクターに **Unknown** の重大度が含まれている場合、ルールは一致し、**Unknown** を指定されたターゲット重大度に置き換えます。重大度修飾子ルールを使用して、検出結果の重大度を **Unknown** に設定することはできません。

## 脆弱性の検出結果と CVSS スコア {#vulnerability-findings-and-cvss-scores}

Datadog で調整された CVSS スコアを持つ脆弱性の検出結果については、重大度修飾子によって `@severity_details.user_adjusted` に保存されている調整済みスコアも更新されます。更新されたスコアは、ターゲット重大度の CVSS v3 範囲の中間点付近に設定されます。

| ターゲット重大度 | CVSS v3 範囲 |
|---|---|
| None | 0.0 |
| Low | 0.1–3.9 |
| Medium | 4.0–6.9 |
| High | 7.0–8.9 |
| Critical | 9.0–10.0 |

元の CVSS ベクターが変更されることはありません。調整済みスコアに一致する合成ベクターは生成されません。ルールは検出結果の重大度を変更する場合にのみ一致するため、スコアは重大度自体が変更された場合にのみ調整されます。[評価順序](#evaluation-order)を参照してください。

## 自動クローズおよび合格した検出結果 {#auto-closed-and-passed-findings}

重大度修飾子は、自動クローズに移行した検出結果や、評価結果が **pass** である検出結果については、クリアまたは更新されません。検出結果を最初に変更したルールが後で編集または削除された場合、それらの検出結果はクローズ時に設定された重大度を保持します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=modify_severity
[3]: /ja/api/latest/security-monitoring/create-a-severity-modifier-rule/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/security_findings_severity_modifier_rule