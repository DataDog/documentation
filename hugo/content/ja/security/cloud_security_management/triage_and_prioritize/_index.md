---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
  tag: ドキュメント
  text: ランタイム優先順位付けエンジン
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: ドキュメント
  text: 重大度スコアリング
- link: /security/security_inbox/
  tag: ドキュメント
  text: セキュリティ受信トレイで優先順位付けされた所見をレビューする
title: トリアージと優先順位付け
---
Cloud Security は、脆弱性、誤設定、アイデンティティリスクに関する所見を生成します。トリアージと優先順位付けは 2 つの関連機能をカバーしています。ビジネスクリティカルなリソースを明らかにする所見を特定するエンジンと、その判断を所見ごとに重大度スコア (これに基づいてソート、フィルター、ルーティングが可能) に変換するスコアリングフレームワークです。

## ランタイム優先順位付けエンジン{#runtime-prioritization-engine}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">ランタイム優先順位付けエンジンは、選択したサイト ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="プレビューに参加しましょう">}}
ランタイム優先順位付けエンジンは、Cloud Security の脆弱性に対してプレビュー中です。このフォームを使用してアクセスをリクエストしてください。
{{< /callout >}}

[ランタイム優先順位付けエンジン][1]は、ランタイム監視可能性とセキュリティデータを組み合わせて、ビジネスクリティカルなリソースを本当に明らかにする約 5% の所見を特定します。各所見は到達可能性、露出、悪用可能性、ビジネスクリティカル性、および対処可能性の 5 つのディメンションで評価されます。

## 重大度スコアリング{#severity-scoring}

[重大度スコアリング][2]は、ランタイム優先順位付けエンジンの出力を Datadog の各所見に対する重大度スコアに変換します。脆弱性の場合、[CVSS 4.0][3] アルゴリズムに従い、基本スコアを時間的要因 (例えば、アクティブな悪用や悪用の可能性) および環境要因 (例えば、ランタイムコンテキスト、露出、または影響を受けるリソースの重要性) で強化します。誤設定やアイデンティティリスクの場合、重大度の計算は、攻撃者がその所見を悪用する可能性と、その悪用が引き起こす損害を考慮した可能性×影響マトリックスを使用して行われます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[2]: /ja/security/cloud_security_management/triage_and_prioritize/severity_scoring/
[3]: https://www.first.org/cvss/v4-0/