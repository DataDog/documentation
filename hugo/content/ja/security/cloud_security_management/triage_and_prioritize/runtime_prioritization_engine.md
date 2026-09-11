---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: ドキュメント
  text: Cloud Security の重大度スコアリングを理解する
- link: /security/cloud_security_management/vulnerabilities/
  tag: ドキュメント
  text: Cloud Security による脆弱性の検出と修正
- link: /security/security_inbox/
  tag: ドキュメント
  text: セキュリティ受信トレイで優先順位付けされた所見をレビューする
title: ランタイム優先順位付けエンジン
---
{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="プレビューに参加しましょう">}}
ランタイム優先順位付けエンジンは、Cloud Security の脆弱性に対してプレビュー中です。このフォームを使用してアクセスをリクエストしてください。
{{< /callout >}}

セキュリティスキャナーは、環境ごとに何千という所見を明らかにします。ほとんどのチームは CVSS 重大度によるランキングをデフォルトにしていますが、静的スコアでは、実際には悪用されることのない多くの所見がクリティカルとフラグされます。実際のリスクは、脆弱なコードは実行されているか、悪用可能か、影響を受けるリソースは機密データやビジネスクリティカルなワークフローに関わっているかなど、実稼働のコンテキストに依存します。

Datadog のランタイム優先順位付けエンジンは、監視可能性およびセキュリティのデータからのランタイム動作、悪用可能性、露出、およびビジネスコンテキストを組み合わせて、実際に悪用可能なリスクをもたらす 5% の所見を特定し、重要なものにのみ集中できるようにします。

## 仕組み {#how-it-works}

ランタイム優先順位付けエンジンは説明可能であるように設計されています。各所見について、Datadog は本番環境の状況を踏まえた 5 つのリスクディメンションを評価し、その所見の優先順位がな高いのかを示します。

| ディメンション| 回答する質問 | シグナルの例 |
|---|---|---|
| **到達可能性** | 脆弱なコンポーネントは実際に実行されていますか。| 影響を受けたイメージが本番ワークロードで実行されているのが観察されました。脆弱なパッケージがランタイムで実行されているのが観察されました。|
| **露出** | 攻撃者はそれに到達できますか。| 静的ネットワーク分析からパブリックにアクセス可能なリソース。アクティブな攻撃への露出があったことのランタイムの証拠。|
| **悪用可能性** | 攻撃者がそれを悪用する可能性はありますか。| 公開されている悪用コードが存在します。所見が実際に悪用されています ([CISA KEV][1] にリストされています)。悪用の可能性が高いです ([EPSS][2])。|
| **ビジネスクリティカル性** | 侵害が発生した場合、影響は大きいですか。| リソースが重要なビジネス機能 ([Crown Jewels](#crown-jewels)) をサポートしています。昇格権限で実行され、機密データを処理します。|
| **対処可能性** | 適切なチームが修正できますか。| サービスオーナーが特定されました。修正または緩和策が利用可能です。|

これらのシグナルがあなたの環境における実際の悪用可能なリスクを示すときに、ランタイム優先順位付けエンジンは所見に高い優先順位を与えます。優先順位基準を満たさない所見はそのまま表示されますが、アクティブなトリアージキューから除外されます。

## Crown Jewels {#crown-jewels}

[Crown Jewels][8] は、最も重要なビジネス機能 (サービス、ホスト、データベース、コンテナなど) をサポートするリソースです。Datadog は、APM トレースフロー、サービス依存関係 (ファンイン)、SLO、トラフィック、インシデントなどの監視可能性データから Crown Jewels を自動的に推測します。

Crown Jewels は、環境が変化するにつれて継続的に更新されます。Datadog Cloud Security で Crown Jewels を手動で追加することもできます。

## 所有権{#ownership}

[所有権][7]は、セキュリティ所見を修正する責任があるチームまたはサービスオーナーを特定します。Datadog は、サービスタグ、チームタグ、デプロイメントメタデータ、オンコール設定、ソースコントロールリンク、サービスカタログエントリなどの監視可能性メタデータから所有権を推測します。

所有権が分かっている場合、エンジンは所見を適切なチームにルーティングでき、セキュリティチームが手動で修正担当者を追跡する必要がなくなります。


## 始める {#get-started}

1. Cloud Security を有効にして、Datadog Agent バージョン 7.79 以上をデプロイしてください。[Cloud Security のセットアップ][3]をご覧ください。
2. エージェントで[ランタイムパッケージ追跡][4]を有効にして、脆弱性所見で*使用中パッケージ*シグナルを表示します。
3. Datadog で[Cloud Security サマリー][5]を開いてください。優先される所見は、各ファネルの上部と[セキュリティ受信箱][6]に表示されます。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[2]: https://www.first.org/epss/
[3]: /ja/security/cloud_security_management/setup/
[4]: /ja/security/cloud_security_management/setup/agent/
[5]: https://app.datadoghq.com/security/csm
[6]: /ja/security/security_inbox/
[7]: /ja/security/cloud_security_management/guide/frontier_group/ownership_agent/
[8]: /ja/security/cloud_security_management/crown_jewels/