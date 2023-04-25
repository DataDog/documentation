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

Cloud Security Posture Management (CSPM) [Security Findings Explorer][1] を使用すると、以下のことが可能になります。

- リソースのコンフィギュレーションの詳細を確認する。
- CSPM によりリソースに適用される検出ルールを確認する。
- タグにより、リソースの所有者や環境内での所在地などの詳細を確認する。
- 誤って構成されたリソースを修復するため、業界のリソースに基づいた説明やガイドラインにアクセスする。
- タイムセレクターを使い、過去のセキュリティコンフィギュレーション態勢を調査する。

発見の確認と対応に加えて、失敗した発見の通知を設定し、[Cloud SIEM][2] と [Cloud Workload Security][3] によって生成されたリアルタイムの脅威と同じビューで構成ミスを関連付けてトリアージするようにシグナルを構成できます。これにより、今日のクラウド侵害の多くの根本原因は、攻撃者による構成ミスのあるサービスの悪用であるため、調査を加速できます。

## 診断結果

発見はリソースに対するルール評価の主要な構成要素です。リソースがルールに対して評価されるたびに、**Pass** または **Fail** のステータスが付いた発見が生成されます。リソースの評価は 15 分〜4 時間の間で行われます（タイプにより異なる）。Datadog はスキャンが終了するとすぐに新しい発見を生成し、過去 15 か月の完全な履歴を保存するため、調査や監査の際に利用できます。

## クラウドの構成ミスを調査する

発見は、[Security Findings Explorer][1] に表示されます。**Group by** フィルターとクエリ検索バーを使用して、発見をルールごとに集計します。例えば、`evaluation:fail` でフィルターをかけると、対処が必要な問題があるすべての検出ルールにリストが絞られます。また、発見をリソース別に集計し、失敗した発見が多いリソースをランク付けし、改善の優先順位をつけることもできます。

{{< img src="security/cspm/findings/posture-management-overview-2.png" alt="ポスチャ管理の発見ページの概要" style="width:100%;">}}

発見を選択すると、そのルールで評価されたリソース、ルールの説明、フレームワークまたは業界ベンチマークへのマッピング、および推奨される改善手順が表示されます。誤構成されたリソースの詳細を表示するには、**View Finding** をクリックします。

{{< img src="security/cspm/findings/finding-side-panel.png" alt="サイドパネルにあるランク付けされたリソース" style="width:65%;">}}

Security Findings Explorer で **Resources** でグループ化し、リソースを選択すると、そのリソースに対して評価された検出ルールの全リストとそのステータスが表示されます。

{{< img src="security/cspm/findings/resource-rules-evaluated.png" alt="検索でリソースごとにグループ化および集計" style="width:65%;">}}

## 発見のミュート

{{< callout url="" btn_hidden="true" >}}
  発見のミュートは、すべての CSPM のお客様が利用できるベータ版機能です。フィードバックやご質問は、<a href="/help">Datadog サポート</a>までご連絡ください。
{{< /callout >}} 

発見がビジネスのユースケースと一致しない場合や、既知のリスクとして受け入れることを選択する場合があります。このような発見を無視するには、影響を受けるリソースの発見をミュートし、重大度の高い発見や重要な発見に集中できるようにします。

例えば、['Block Public Access' feature is enabled for S3 bucket][4] ルールは、S3 バケットが一般にアクセス可能かどうかを評価します。一般に共有されることを意図した静的アセットを持つ S3 バケットがある場合、その S3 バケットに対する発見をミュートすることができます。

合格・不合格の発見は、いつでもミュートすることができます。発見をミュートすると、その発見はポスチャスコアの計算から除外されます。

{{< img src="security/cspm/findings/muted-findings.png" alt="Mute findings ダイアログボックスには、ミュートの理由と期間を指定するためのフィールドがあります" style="width:100%;">}}

1. [発見サイドパネル](#explore-your-cloud-misconfigurations)で、リソースを選択します。
2. **Mute** をクリックします。
3. ミュートの理由を選択します。例えば、修正待ち、誤検出、受容されたリスクなどです。
4. オプションで **Description** を入力します。
5. ミュートの継続時間を選択します。
6. **Mute** をクリックします。

### 発見のミュート解除

ミュートされた発見は、指定されたミュート時間が経過すると自動的にミュートが解除されます。また、手動でミュートを解除することもできます。

1. [発見サイドパネル](#explore-your-cloud-misconfigurations)で、ミュートされた発見のあるリソースを選択します。
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