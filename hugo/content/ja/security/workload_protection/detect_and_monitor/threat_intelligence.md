---
description: Datadog がキュレーションした脅威インテリジェンスで Workload Protection Agent のイベントを強化するか、独自のデータベースをインポートします。
disable_toc: false
further_reading:
- link: /security/threat_intelligence/
  tag: ドキュメント
  text: Datadog の脅威インテリジェンス
- link: /security/detection_rules/
  tag: ドキュメント
  text: 検出ルール
title: 脅威インテリジェンス
---
Workload Protection は、Datadog がキュレーションした[脅威インテリジェンス][2]で [Agent イベント][1]を強化します。この強化により、ホストやコンテナで観測された IP アドレスやファイルハッシュなどのエンティティにレピュテーションコンテキストが追加され、イベントが既知の悪意のあるキャンペーンの一部であるかどうかを評価するのに役立ちます。

Datadog のすべてのセキュリティ製品に適用される一般的な概念、ソース、カテゴリ、インテント、ライフサイクル情報については、[脅威インテリジェンス][2]を参照してください。このページでは、Workload Protection 固有の詳細について説明します。

## Workload Protection のエンティティタイプ{#entity-types-for-workload-protection}

Workload Protection は、次の[エンティティタイプ][3]をサポートしています。

- IP アドレス
- ドメイン
- ファイルハッシュ: `SHA1`、`SHA256`、`ssdeep`

`ssdeep` ハッシュはファジーマッチングをサポートしており、既知の悪意のあるファイルと同一ではないものの類似しているファイルの特定に役立ちます。

## Workload Protection でサポートされているカテゴリ{#supported-categories-for-workload-protection}

Workload Protection は、次の脅威インテリジェンスカテゴリをサポートしています。

- `malware`
- `exploitation`
- `cryptomining`
- `supply_chain_attack_infrastructure`
- `custom`

Datadog のすべてのセキュリティ製品に適用されるカテゴリの定義とインテントについては、[脅威インテリジェンスカテゴリ][5]を参照してください。

## 検出ルールでの脅威インテリジェンスの使用{#using-threat-intelligence-in-detection-rules}

Workload Protection の[検出ルール][4]では、検索クエリやルール条件でカテゴリ (`@threat_intel.results.category`) やインテント (`@threat_intel.results.intention`) などの脅威インテリジェンスキーを参照できます。たとえば、ワークロード上で実行されたファイルが、`malware` に分類され、インテントが `malicious` である既知のマルウェアサンプルのハッシュと一致した場合に、ルールをトリガーできます。

<div class="alert alert-info">脅威インテリジェンスのソースとカテゴリは設定できません。</div>

## 脅威インテリジェンスのファセット {#threat-intelligence-facets}

脅威インテリジェンスの[ソース、カテゴリ、およびインテント][6]は、ファセットおよびフィルターとして利用できます。[Agent イベントエクスプローラー][1]の一致するイベント、および結果の[セキュリティシグナル][7]に関する脅威インテリジェンスのエンリッチメントを確認できます。

## セキュリティシグナルに関する脅威インテリジェンス {#threat-intelligence-on-security-signals}

Agent イベントが脅威インテリジェンスのインジケーターと一致すると、Workload Protection はセキュリティシグナルを生成し、一致したエンティティをそのソース、カテゴリ、およびインテントと共に表示します。

{{< img src="security/workload_protection/detect_and_monitor/threat_intelligence_signal.png" alt="Workload Protection のセキュリティシグナルで脅威インテリジェンスのエンリッチメントの詳細を表示" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/workload_protection/investigate_and_triage/agent_events
[2]: /ja/security/threat_intelligence/
[3]: /ja/security/threat_intelligence/#entity-types
[4]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[5]: /ja/security/threat_intelligence/#threat-intelligence-categories
[6]: /ja/security/threat_intelligence/#threat-intelligence-facets
[7]: /ja/security/workload_protection/investigate_and_triage/security_signals
[8]: /ja/security/workload_protection/investigate_and_triage/security_signals/investigate#correlated-events