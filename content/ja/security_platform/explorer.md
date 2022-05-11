---
aliases:
- /ja/security_monitoring/explorer/
- /ja/cloud_siem/explorer/
description: すべてのセキュリティシグナルを検索し、セキュリティ分析を実施
further_reading:
- link: https://www.datadoghq.com/blog/announcing-security-monitoring/
  tag: ブログ
  text: Cloud SIEM の詳細
- link: /cloud_siem/detection_rules/
  tag: Documentation
  text: 検出ルールの条件ロジックについて学ぶ
kind: documentation
title: セキュリティシグナルエクスプローラー
---

## 概要

[セキュリティシグナルエクスプローラー][1]から、セキュリティシグナルを相互に関連付けて優先順位を付けます。このページから [Cloud SIEM][2]、[Posture Management][3]、[Workload Security][4]、[Application Security Monitoring][5] ダッシュボードにアクセスすることもできます。

このビューで、以下を行うことができます。

- [セキュリティシグナルについて](#explore-your-security-signals)
- [セキュリティシグナルの調査](#inspect-a-security-signal)
  - [脅威インテリジェンス](#threat-intelligence)
  - [異常検出](#anomaly-detection)
- [セキュリティシグナル分析の可視化](#visualize-your-security-signals-analytics)
- [参考文献](#further-reading)

## セキュリティシグナルの探索

セキュリティシグナルの検索結果が、セキュリティシグナルテーブルに表示されます。

{{< img src="security_platform/security_monitoring/explorer/signals_table.png" alt="2 つのアカウント乗っ取りシグナルを示す Security Signals テーブル" >}}

テーブルのコンテンツを、使用可能なファセットのリストで絞り込むことができます。右上に表示される **Options** ボタンを使用して、セキュリティシグナルテーブルのコンテンツを要件や好みに応じて構成できます。

## セキュリティシグナルの検査

セキュリティシグナルをクリックすると、セキュリティシグナルパネルが開いて詳細が表示されます。

{{< img src="security_platform/security_monitoring/explorer/signal_panel.png" alt="AWS S3 Public アクセスブロック削除のクリティカルシグナルを示す Security Signal パネル" style="width:80%;" >}}

問題を選別する際に最初に必要になる情報とアクションが、セキュリティシグナルパネルの最上部に表示されます。これらの情報から、シグナルの重要度や生成日時を判断したり、規則の設定にアクセスしたり、シグナルの状態を変更したり、シグナルをチームメイトとすばやく共有したり割り当てたりできます。

過去の新しいデータが利用可能になった場合、または攻撃が継続している場合、最初に見た日付と最後に見た日付が更新されます。Cloud SIEM と Cloud Workload Security のシグナルの場合、Overview タブに "What Happened" セクションが表示され、検出ルールに関連する構成済みのグループ化やルールカスタマイズも表示されます。この検出ルールの例では、グループ化が `usr.name` で構成されています。最後に、検出ルールに設定されたタグは、CSPM の調査結果ではヘッダーのグループ化の下に、Cloud SIEM および Cloud Workload Security のシグナルでは Context セクションに表示されます。

アクティビティをよりよく理解するために、セキュリティシグナルパネルは、シグナルをトリガーするすべてのログのタグと属性を要約するため、ログエクスプローラーにピボットすることなくトラブルシューティングを行うことができます。たとえば、Context セクションで、ユーザーアカウントにログインしようとしている IP のリスト、または認証サービスを実行している AWS アカウントとアベイラビリティーゾーンを一目で判断できます。

Cloud SIEM と Cloud Workload Security シグナルのヘッダーの下には、シグナルに関連する詳細情報を表示するタブがあります。

- `Overview` では、タグによるグループ化、ルールタイプに基づくカスタマイズなど、What Happened セクションにルールがセキュリティシグナルを生成した理由が表示されます。さらに、シグナルに関連するコンテキスト情報と JSON が表示されます。
- `Rule Details` では、検出ルールに構成されたテキストなどのルール詳細が表示され、シグナルを確認する人がシグナルの目的や対応策を理解するのに役立ちます。また、ユーザーは、ルールの抑制クエリの修正など、ルールの修正に移ることもできます。
- `Logs` には、シグナルがトリガーされた理由に関するコンテキストを提供するログサンプルの視覚化とリストが含まれています。完全なログを表示するには、表のサンプルのいずれかをクリックしてください。
- `Related Signals` は、シグナルのトリアージを支援するために同じグループ化値を含む他のシグナルのタイムラインとして表示されます。
- `Suggested Actions (beta)` は、セキュリティシグナルの特性に基づいて、調査クエリ、関連ダッシュボード、クラウドプロバイダーコンソールへのリンクを提供し、調査を誘導して解決への洞察を提供するものです。

Cloud Security Posture Management シグナルのヘッダーの下には、シグナルに関連する詳細情報を表示するタブがあります。
- `Message` は、シグナルをレビューする人がシグナルの目的と応答方法を理解するのに役立つように、検出ルールで構成されたテキストを表示します。
- `Findings` には、ルールによって評価された各リソースのリストが含まれます。
- `Related Issues` には、シグナルのトリアージを支援するために同じグループ化値を含む他のシグナルのリストが含まれています。

### 脅威インテリジェンス

Datadog Cloud SIEM では、脅威インテリジェンスパートナーがキュレーションした脅威情報フィードを提供しています。これらのフィードは、既知の不審なアクティビティ (例: IOC (Indicator Of Compromise) など) に関するデータを含むよう常に更新されているため、どの潜在的な脅威に対処すべきかを迅速に特定することができます。

{{< img src="security_platform/security_monitoring/explorer/threat_intel.png" alt="セキュリティシグナルエクスプローラーの脅威インテリジェンス" style="width:85%;" >}}

Datadog は、関連する属性を持つすべての取り込みログを分析することで、脅威インテリジェンスを自動的に実装します。ログに危険な兆候 (VPN、プロキシ、または Tor の出口ノードに匿名化された IP が関連付けられているなど) が含まれている場合、`threat_intel` 属性がログイベントに追加され、利用可能なインテリジェンスに基づいて追加のインサイトを提供します。

セキュリティシグナルエクスプローラーで一致するすべての脅威インテリジェンスを見るためのクエリは `@threat_intel.indicators_matched:*` です。脅威インテリジェンスを照会するためのその他の属性は次の通りです。

* `@threat_intel.results.category “anonymizer”, “scanner”`
* `@threat_intel.results.intention “malicious”, “unknown”`
* `@threat_intel.results.subcategory options "proxy", "tor", "vpn"`
    **注**: プロキシ、Tor、VPN のサブカテゴリの属性は、脅威インテリジェンスパートナーの IPinfo のみが提供しています。

### ネットワーク IP 属性で検索

Datadog Cloud SIEM がログから疑わしい活動を検出した場合、そのネットワーク IP を検索することで、疑わしいアクターがシステムと相互作用したかどうかを判断します。ログエクスプローラーで IP 属性で検索するには、クエリ `@network.ip.list:<IP address>` を使用します。このクエリは、タグ、属性、エラー、およびメッセージフィールドを含むログ内の任意の場所で IP を検索します。

{{< img src="security_platform/security_monitoring/explorer/network_ip_list.png" alt="network.ip.list 属性で検索した結果を表示したログエクスプローラー" style="width:80%;" >}}

### 異常検知

レビューしているセキュリティシグナルが異常検知メソッドにより生成されている場合、異常はグラフで可視化されます。グラフ右側の境界ボックスには、異常が検知された場所が表示されます。

  {{< img src="security_platform/security_monitoring/explorer/anomaly-detection.png" alt="異常検知のグラフ" >}}

## セキュリティシグナル分析を視覚化する

ページの左上隅にある _Signal Mode_ ボタンをクリックすると、セキュリティシグナルテーブルとセキュリティシグナル分析の間でモードが切り替わります。

{{< img src="security_platform/security_monitoring/explorer/analytics.png" alt="シグナルを技法ごとに棒グラフで示したシグナルエクスプローラーのページ" style="width:85%;" >}}

セキュリティ規則エンジンによってセキュリティシグナルが生成されたら、セキュリティシグナルのクエリをグラフ化して、最大値、最小値、パーセンタイル、ユニーク数などを確認できます。

すべてのグラフ作成オプションについては、[ログのグラフ作成ガイド][6]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Log%20Detection%22
[3]: https://app.datadoghq.com/security/compliance
[4]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Workload%20Security%22
[5]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22
[6]: /ja/logs/explorer/analytics/?tab=timeseries