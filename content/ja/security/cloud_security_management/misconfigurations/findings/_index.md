---
aliases:
- /ja/security_platform/findings
- /ja/security_platform/cspm/findings
- /ja/security/cspm/findings
- /ja/continuous_testing/cicd_integrations/azure_devops_extension
further_reading:
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトの CSM Misconfigurations クラウド構成コンプライアンスルールを調べる
- link: security/cspm/frameworks_and_benchmarks
  tag: ドキュメント
  text: フレームワークおよび業界のベンチマークの詳細
title: 誤構成を探索する
---

Cloud Security Management Misconfigurations (CSM Misconfigurations) [Explorer][1] では、以下のことができます。

- リソースのコンフィギュレーションの詳細を確認する。
- CSM Misconfigurations によりリソースに適用されるコンプライアンスルールを確認する。
- タグにより、リソースの所有者や環境内での所在地などの詳細を確認する。
- 誤って構成されたリソースを修復するため、業界のリソースに基づいた説明やガイドラインにアクセスする。
- タイムセレクターを使い、過去のセキュリティコンフィギュレーション態勢を調査する。

誤構成の確認と対応に加えて、失敗した誤構成の通知を設定し、[Cloud SIEM][2] と [CSM Threats][3] によって生成されたリアルタイムの脅威と同じビューで誤構成を関連付けてトリアージするようにシグナルを構成できます。これにより、今日のクラウド侵害の多くの根本原因は、攻撃者による誤構成のあるサービスの悪用であるため、調査を加速できます。

## ガイド

誤構成はリソースに対するルール評価の主要な構成要素です。リソースがルールに対して評価されるたびに、**Pass** または **Fail** のステータスが付いた誤構成が生成されます。リソースの評価は 15 分〜4 時間の間で行われます (タイプにより異なる)。Datadog はスキャンが終了するとすぐに新しい誤構成を生成し、過去 15 か月の完全な履歴を保存するため、調査や監査の際に利用できます。

## クラウドの構成ミスを調査する

誤構成は、[Misconfigurations Explorer][1] に表示されます。**Group by** フィルターとクエリ検索バーを使用して、誤構成をルールごとに集計します。例えば、`evaluation:fail` でフィルターをかけると、対処が必要な問題があるすべてのコンプライアンスルールにリストが絞られます。また、誤構成をリソース別に集計し、失敗した誤構成が多いリソースをランク付けし、改善の優先順位をつけることもできます。

{{< img src="security/csm/explorers_page.png" alt="CSM Misconfigurations Explorer ページ" style="width:100%;">}}

誤構成を選択すると、そのルールで評価されたリソース、ルールの説明、フレームワークまたは業界ベンチマークへのマッピング、および推奨される改善手順が表示されます。

{{< img src="security/cspm/findings/finding-side-panel3.png" alt="サイドパネルにある影響を受けたリソースのリスト" style="width:65%;">}}

Security Findings Explorer で **Resources** でグループ化し、リソースを選択すると、そのリソースに対して評価されたコンプライアンスルールの全リストとそのステータスが表示されます。

{{< img src="security/cspm/findings/resource-rules-evaluated2.png" alt="検索でリソースごとにグループ化および集計" style="width:65%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance?time=now
[2]: /ja/security/cloud_siem/
[3]: /ja/security/threats/
[4]: /ja/security/default_rules/cis-aws-1.5.0-2.1.5/