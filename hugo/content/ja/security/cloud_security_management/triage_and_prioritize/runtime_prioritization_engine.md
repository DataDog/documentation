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
- link: https://www.datadoghq.com/blog/runtime-prioritization-engine/
  tag: ブログ
  text: Datadog ランタイム優先順位付けエンジンを使用してセキュリティ所見に優先順位を付ける
- link: https://www.datadoghq.com/blog/datadog-security/
  tag: ブログ
  text: 'AI 時代のセキュリティ確保: 統合されたセキュリティとオブザーバビリティで AI を活用した攻撃を凌駕する'
- link: https://www.datadoghq.com/blog/cisa-bod-26-04-vulnerability-prioritization/
  tag: ブログ
  text: CISA の BOD 26-04 により脆弱性の優先順位付けはどう変わるか
title: ランタイム優先順位付けエンジン
---
セキュリティスキャナーは、環境ごとに何千という所見を明らかにします。ほとんどのチームは CVSS 重大度によるランキングをデフォルトにしていますが、静的スコアでは、実際には悪用されることのない多くの所見がクリティカルとフラグされます。実際のリスクは、脆弱なコードは実行されているか、悪用可能か、影響を受けるリソースは機密データやビジネスクリティカルなワークフローに関わっているかなど、実稼働のコンテキストに依存します。

Datadog のランタイム優先順位付けエンジンは、監視可能性およびセキュリティのデータからのランタイム動作、悪用可能性、露出、およびビジネスコンテキストを組み合わせて、実際に悪用可能なリスクをもたらす 5% の所見を特定し、重要なものにのみ集中できるようにします。

## 仕組み {#how-it-works}

ランタイム優先順位付けエンジンは説明可能であるように設計されています。各所見について、Datadog は本番環境の状況を踏まえた 5 つのリスクディメンションを評価し、その所見の優先順位がなぜ高いのかを示します。

| ディメンション| 回答する質問 | シグナルの例 |
|---|---|---|
| **到達可能性** | 脆弱なコンポーネントは実際に実行されていますか。| 影響を受けたイメージが本番ワークロードで実行されているのが観察されました。脆弱なパッケージがランタイムで実行されているのが観察されました。|
| **露出** | 攻撃者はそれに到達できますか。| 静的ネットワーク分析からパブリックにアクセス可能なリソース。アクティブな攻撃への露出があったことのランタイムの証拠。|
| **悪用可能性** | 攻撃者がそれを悪用する可能性はありますか。| 公開されている悪用コードが存在します。所見が実際に悪用されています ([CISA KEV][1] にリストされています)。悪用の可能性が高いです ([EPSS][2])。|
| **ビジネスクリティカル性** | 侵害が発生した場合、影響は大きいですか。| リソースが重要なビジネス機能をサポートしています。([クラウンジュエル](#crown-jewels))昇格権限で実行され、機密データを処理します。|
| **対処可能性** | 適切なチームが修正できますか。| サービスオーナーが特定されました。修正または緩和策が利用可能です。|

これらのシグナルがあなたの環境における実際の悪用可能なリスクを示すときに、ランタイム優先順位付けエンジンは所見に高い優先順位を与えます。優先順位基準を満たさない所見はそのまま表示されますが、アクティブなトリアージキューから除外されます。

## クラウンジュエル{#crown-jewels}

[クラウンジュエル][8] は、最も重要なビジネス機能 (サービス、ホスト、データベース、コンテナなど) をサポートするリソースです。Datadog は、APM トレースフロー、サービス依存関係 (ファンイン)、SLO、トラフィック、インシデントなどの監視可能性データからクラウンジュエルを自動的に推測します。

クラウンジュエルは、環境が変化するにつれて継続的に更新されます。Datadog Cloud Security でクラウンジュエルを手動で追加することもできます。

## 所有権{#ownership}

[所有権][7] は、セキュリティ所見を修正する責任があるチームまたはサービスオーナーを特定します。Datadog は、サービスタグ、チームタグ、デプロイメントメタデータ、オンコール設定、ソースコントロールリンク、サービスカタログエントリなどの監視可能性メタデータから所有権を推測します。

所有権が分かっている場合、エンジンは所見を適切なチームにルーティングでき、セキュリティチームが手動で修正担当者を追跡する必要がなくなります。

## ランタイムシグナルによる所見のフィルタリング{#filter-findings-by-runtime-signals}

Datadog は、観測したランタイムシグナルを脆弱性の所見に追加します。[脆弱性エクスプローラー][11] で、他の条件と組み合わせてこれらのシグナルを使用してください。

### パッケージが実行中{#package-is-running}

[ランタイムパッケージ優先順位付け][4] が有効な場合、Datadog は、オペレーティングシステムのパッケージマネージャーによってインストールされたパッケージについて、コンテナイメージの脆弱性所見にパッケージレベルのランタイムコンテキストを追加します (`apt`、`yum`、または`apk`)。これらのタグで検索、フィルタリング、グループ化を行います。

| ランタイムコンテキスト | タグ |
|---|---|
| パッケージが実行中 | `@risk.is_package_running:true` |
| ルートプロセスによってアクセスされる | `@package.is_running_as_root:true` |
| SUID バイナリが存在 | `@package.has_suid:true` |

Datadog は、ランタイムコンテキストを観測するとタグを追加します。タグがない場合は、Datadog がそのコンテキストを観測しなかったことを意味しますが、パッケージが使用されていないことを意味するわけではありません。タグを使用して、所見を除外するのではなく、まず修正すべき事項の優先順位を決定してください。

たとえば、以下のように、実行中で、修正が利用可能な「高」および「緊急」の脆弱性です。

```
@risk.is_package_running:true @severity:(high OR critical) @remediation.is_available:true
```

ランタイムコンテキストは、イメージバージョンの存続期間中保持されます。パッケージが実行中であることが観測されると、そのイメージの所見にその状態が保持されます。コンテナイメージは不変であるため、そのイメージ内で実行された内容が反映されます。イメージがデプロイされなくなると、その所見は期限切れとなり、クローズされます。

### イメージが実行中{#image-is-running}

Datadog は、追加の Agent 設定なしで、すべてのコンテナの脆弱性所見にコンテナイメージの実行コンテキストを追加します。このタグで検索、フィルタリング、グループ化を行います。

| ランタイムコンテキスト | タグ |
|---|---|
| 過去 12 時間以内に実行が検出されたイメージ | `@risk.is_image_running:true` |

このタグは、コンテナイメージの所見では常に `true` または `false` で、ホスト、ホストイメージ、サーバーレスの所見には存在しません。すべての資産タイプで実行中のイメージを優先するには、以下のように実行が検出されなかったコンテナイメージの所見を除外します。

```
-@risk.is_image_running:false
```

12 時間以外の期間については、最後に検出された時刻である `@risk_details.is_image_running.evidence.detected_at` をクエリします。

#### 実行コンテキストの決定方法 {#how-the-running-context-is-determined}

Datadog は、Datadog Agent または Agentless Scanning を使用して実行中のイメージを検出しますが、コンテキストの取得元と更新頻度が異なります。

| | Agent | Agentless |
|---|---|---|
| **必須要件** | Agent で [Cloud Security の脆弱性スキャン][14] と [コンテナ監視][12] が有効になっていること。| クラウドアカウントでの [Agentless Scanning][13]。|
| **コンテキストのソース** |  [コンテナ監視][12] のデータ: Agent で監視するホスト上で実行中であることを Datadog が観察するコンテナ。| Agentless Scanning。スキャン実行時にリソース上で実行されているイメージを記録します。|
| **更新頻度** |  1 時間ごと (Datadog がイメージの所見を再評価するタイミング)。| リソースの Agentless スキャンごとに 1 回 (12 時間ごと)。|
| **コンテナレベルの詳細** |  [脆弱性エクスプローラー][11] の所見のサイドパネルに、そのイメージを最近実行したコンテナが一覧表示されます。| 利用できません。|

## 始める {#get-started}

1. Agent でランタイムパッケージの優先順位付けを有効にして、脆弱性所見において*パッケージが実行中*シグナルを表示します。[Kubernetes][4]、[Docker][9]、または [Linux][10] デプロイメントでこれを行うための手順を参照してください。[Cloud Security のセットアップ][3] をご覧ください。
2. Datadog で [[{{< ui >}}Cloud Security Summary{{< /ui >}}][5]] (Cloud Security サマリー) を開きます。優先される所見は、各ファネルの上部および [[{{< ui >}}Security Inbox{{< /ui >}}][6]] (セキュリティ受信トレイ) に表示されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[2]: https://www.first.org/epss/
[3]: /ja/security/cloud_security_management/setup/
[4]: /ja/security/cloud_security_management/setup/agent/kubernetes/#runtime-package-prioritization
[5]: https://app.datadoghq.com/security/csm
[6]: /ja/security/security_inbox/
[7]: /ja/security/cloud_security_management/review_remediate/ownership_agent/
[8]: /ja/security/cloud_security_management/crown_jewels/
[9]: /ja/security/cloud_security_management/setup/agent/docker/#runtime-package-prioritization
[10]: /ja/security/cloud_security_management/setup/agent/linux/#runtime-package-prioritization
[11]: https://app.datadoghq.com/security/csm/vm
[12]: /ja/containers/
[13]: /ja/security/cloud_security_management/setup/agentless_scanning/
[14]: /ja/security/cloud_security_management/vulnerabilities/