---
title: Findings Explorer
kind: documentation
aliases:
  - /ja/security_platform/findings
further_reading:
  - link: security_platform/default_rules
    tag: ドキュメント
    text: デフォルトのクラウドコンフィギュレーションルールについて
  - link: security_platform/cspm/frameworks_and_benchmarks
    tag: ドキュメント
    text: フレームワークおよび業界のベンチマークの詳細
---
{{< site-region region="us3,us5,gov" >}}
<div class="alert alert-warning">
このサイトでは、クラウドセキュリティポスチャ管理は利用できません。
</div>
{{< /site-region >}}

## 概要

[Findings Explorer][1] により、以下のことが可能になります。　

- リソースのコンフィギュレーションの詳細を確認
- CSPM によりリソースに適用されるルールを確認
- タグにより、リソースの所有者や環境内での所在地などの詳細を確認
- 誤って構成されたリソースを修復するため、業界のリソースに基づいた説明やガイドラインにアクセス
- “タイムセレクター”を使い、過去のセキュリティコンフィギュレーション態勢を調査 

診断結果の確認と対応に加えて、失敗した診断結果の通知を設定し、[Cloud SIEM][2] と [Cloud Workload Security][3] によって生成されたリアルタイムの脅威と同じ管理画面で構成ミスを関連付けてトリアージするようにシグナルを構成できます。これにより、今日のクラウド侵害の多くの根本原因は、構成ミスのあるサービスの悪用であるため、ユーザーは調査を加速できます。

{{< img src="security_platform/cspm/findings/findings-time-window.png" alt="ドロップダウンを使い、診断結果のタイムウィンドウを設定します" style="width:65%;">}}

## 診断結果

診断結果はリソースに対するルール評価の主要な構成要素です。リソースがルールに対して評価されるたびに、**Pass** または **Fail** のステータスが付いた診断結果が生成されます。リソースの評価は15分〜4時間の間で行われます（タイプにより異なる）。Datadog は新しいスキャンが終了するとすぐに新しい診断結果を生成し、過去15か月の完全な履歴を保存するため、調査や監査の際に利用できます。

{{< img src="security_platform/cspm/findings/posture-management-overview.png" alt="ポスチャ管理の診断結果ページの概要" style="width:100%;">}}

## 診断結果を使用してクラウドの構成ミスを調査する

**failed** と印された診断結果をクリックすると、誤って構成されたリソース、ルールの説明、フレームワークまたは業界ベンチマークマッピング、推奨される修復手順が確認できます。

{{< img src="security_platform/cspm/findings/signal-overview.png" alt="サイドパネルでの失敗のシグナル" style="width:65%;">}}

検索クエリバーを使い、診断結果をルールごとに集約します。このビューでは、Datadog がスキャンする全てのルールのチェックリストを確認できます。`evaluation:fail`ステータスでフィルタリングすると、対処の必要のある問題を含むルールのみにリストを絞り込むことができます。サイドパネルには、ルールにより評価されたリソースの詳細が表示されます。

{{< img src="security_platform/cspm/findings/evaluation-fail.png" alt="評価失敗によるフィルタリング" style="width:100%;">}}

サイドパネルには、ルールにより評価されたリソースの詳細が表示されます。

{{< img src="security_platform/cspm/findings/no-security-group-ingress.png" alt="サイドパネルにあるランク付けされたリソース" style="width:65%;">}}

また、診断結果をリソースごとに集約し、ルール評価で失敗したリソースをランク付けできるため、優先順位をつけた上で修復に取り掛かることができます。

{{< img src="security_platform/cspm/findings/eval-fail-group-by-resource.png" alt="検索でリソースごとにグループ化および集約" style="width:100%;">}}

サイドパネルには、リソースに対して評価されたルールの一覧が表示されます。その中には、セキュリティコンフィギュレーション態勢を改善するための対処をするか選択できるものもあります。

{{< img src="security_platform/cspm/findings/passed-rules.png" alt="検索でリソースごとにグループ化および集約" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance?time=now
[2]: /ja/security_platform/security_monitoring/
[3]: /ja/security_platform/cloud_workload_security/