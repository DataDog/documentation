---
aliases:
- /ja/security_platform/findings
- /ja/security_platform/cspm/findings
further_reading:
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトの Posture Management クラウド構成検出ルールを調べる
- link: security/cspm/frameworks_and_benchmarks
  tag: ドキュメント
  text: フレームワークおよび業界のベンチマークの詳細
kind: documentation
title: Security Findings Explorer
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
このサイトでは、クラウドセキュリティポスチャ管理は利用できません。
</div>
{{< /site-region >}}

## 概要

[Findings Explorer][1] により、以下のことが可能になります。　

- リソースのコンフィギュレーションの詳細を確認
- CSPM によりリソースに適用される検出ルールを確認
- タグにより、リソースの所有者や環境内での所在地などの詳細を確認
- 誤って構成されたリソースを修復するため、業界のリソースに基づいた説明やガイドラインにアクセス
- “タイムセレクター”を使い、過去のセキュリティコンフィギュレーション態勢を調査 

診断結果の確認と対応に加えて、失敗した診断結果の通知を設定し、[Cloud SIEM][2] と [Cloud Workload Security][3] によって生成されたリアルタイムの脅威と同じビューで構成ミスを関連付けてトリアージするようにシグナルを構成できます。これにより、今日のクラウド侵害の多くの根本原因は、構成ミスのあるサービスの悪用であるため、ユーザーは調査を加速できます。

{{< img src="security/cspm/findings/findings-time-window.png" alt="ドロップダウンを使い、診断結果のタイムウィンドウを設定します" style="width:65%;">}}

## 診断結果

診断結果はリソースに対するルール評価の主要な構成要素です。リソースがルールに対して評価されるたびに、**Pass** または **Fail** のステータスが付いた診断結果が生成されます。リソースの評価は15分〜4時間の間で行われます（タイプにより異なる）。Datadog は新しいスキャンが終了するとすぐに新しい診断結果を生成し、過去15か月の完全な履歴を保存するため、調査や監査の際に利用できます。

{{< img src="security/cspm/findings/posture-management-overview.png" alt="ポスチャ管理の診断結果ページの概要" style="width:100%;">}}

## 診断結果を使用してクラウドの構成ミスを調査する

**failed** と印された診断結果をクリックすると、誤って構成されたリソース、ルールの説明、フレームワークまたは業界ベンチマークマッピング、推奨される修復手順が確認できます。

{{< img src="security/cspm/findings/signal-overview.png" alt="サイドパネルでの失敗のシグナル" style="width:65%;">}}

検索クエリバーを使い、診断結果をルールごとに集約します。このビューでは、Datadog がスキャンする全ての検出ルールのチェックリストを確認できます。`evaluation:fail` ステータスでフィルタリングすると、対処の必要のある問題を含む検出ルールのみにリストを絞り込むことができます。サイドパネルには、ルールにより評価されたリソースの詳細が表示されます。

{{< img src="security/cspm/findings/evaluation-fail.png" alt="評価失敗によるフィルタリング" style="width:100%;">}}

サイドパネルには、ルールにより評価されたリソースの詳細が表示されます。

{{< img src="security/cspm/findings/no-security-group-ingress.png" alt="サイドパネルにあるランク付けされたリソース" style="width:65%;">}}

また、診断結果をリソースごとに集約し、ルール評価で失敗したリソースをランク付けできるため、優先順位をつけた上で修復に取り掛かることができます。

{{< img src="security/cspm/findings/eval-fail-group-by-resource.png" alt="検索でリソースごとにグループ化および集約" style="width:100%;">}}

サイドパネルには、リソースに対して評価された検出ルールの一覧が表示されます。その中には、セキュリティコンフィギュレーション態勢を改善するための対処をするか選択できるものもあります。

{{< img src="security/cspm/findings/passed-rules.png" alt="検索でリソースごとにグループ化および集約" style="width:60%;">}}

## 発見のミュート

{{< callout url="" btn_hidden="true" >}}
  発見のミュートは、すべての CSPM のお客様が利用できるベータ版機能です。フィードバックやご質問は、<a href="/help">Datadog サポート</a>までご連絡ください。
{{< /callout >}} 

発見がビジネスのユースケースと一致しない場合や、既知のリスクとして受け入れることを選択する場合があります。このような発見を無視するには、影響を受けるリソースの発見をミュートし、重大度の高い発見や重要な発見に集中できるようにします。

例えば、['Block Public Access' feature is enabled for S3 bucket][4] ルールは、S3 バケットが一般にアクセス可能かどうかを評価します。一般に共有されることを意図した静的アセットを持つ S3 バケットがある場合、その S3 バケットに対する発見をミュートすることができます。

合格・不合格の発見は、いつでもミュートすることができます。発見をミュートすると、その発見はポスチャスコアの計算から除外されます。

{{< img src="security/cspm/findings/muted-findings.png" alt="Mute findings ダイアログボックスには、ミュートの理由と期間を指定するためのフィールドがあります" style="width:100%;">}}

1. [発見サイドパネル](#explore-your-cloud-misconfigurations-with-findings)で、リソースを選択します。
2. **Mute** をクリックします。
3. ミュートの理由を選択します。例えば、修正待ち、誤検出、受容されたリスクなどです。
4. オプションで **Description** を入力します。
5. ミュートの継続時間を選択します。
6. **Mute** をクリックします。

### 発見のミュート解除

ミュートされた発見は、指定されたミュート時間が経過すると自動的にミュートが解除されます。また、手動でミュートを解除することもできます。

1. [発見サイドパネル](#explore-your-cloud-misconfigurations-with-findings)で、ミュートされた発見のあるリソースを選択します。
2. **Unmute** をクリックします。
3. ミュート解除の理由を選択します。例えば、未解決の修正がない、ヒューマンエラーである、または受け入れ可能なリスクでなくなった、などです。
4. オプションで **Description** を入力します。
5. **Unmute** をクリックします。

### ミュートされた発見を監査する

組織のミュートされた発見を表示し、ミュートされた発見が現在合格または不合格の状態にあるかを確認し、リソースの履歴を監査して、発見がいつ、誰によってミュートされたかを確認することができます。

組織のミュートされた発見を表示するには

- Security Findings Explorer の **Muted** 列でソートします。
- Security Findings Explorer で **Muted** ファセットを使用してフィルターをかけます。

リソースの履歴を監査するには

1. [発見サイドパネル](#explore-your-cloud-misconfigurations-with-findings)を開きます。
2. ミュートされた発見のあるリソースを選択します。
3. 発見ステータスが変更された場合は、**See Latest State** をクリックします。
4. **View Finding** をクリックします。

{{< img src="security/cspm/findings/muted-findings-timeline-graph.png" alt="時間経過によるリソース評価のタイムラインは、ミュートされた期間を含む発見の履歴を表示します" style="width:100%;">}}

**Message** タブで、**Resource evaluation over time** のタイムラインを使用して、指定した期間 (最大 6 か月) にミュートまたはミュート解除された発見を表示します。

{{< img src="security/cspm/findings/muted-findings-timeline.png" alt="Timeline タブには、発見がいつミュートされたかの詳細を含む、発見の時系列履歴が表示されます" style="width:100%;">}}

**Timeline** タブをクリックすると、発見の履歴が時系列で表示されます。ミュートまたはミュート解除のアクションにカーソルを合わせると、ミュートの理由、ミュートの時間、ミュートした人など、詳細が表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance?time=now
[2]: /ja/security/cloud_siem/
[3]: /ja/security/cloud_workload_security/
[4]: /ja/security/default_rules/cis-aws-1.5.0-2.1.5/