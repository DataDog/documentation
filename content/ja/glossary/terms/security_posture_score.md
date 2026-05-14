---
id: security_posture_score
core_product:
- security
- cloud security
synonyms:
- ポスチャスコア
- コンプライアンススコア
title: セキュリティポスチャスコア
---

{{< jqmath-vanilla >}}

[Cloud Security Misconfigurations][3] で利用できるセキュリティ ポスチャ スコアは、Datadog が標準で提供する [Cloud][1] および [Infrastructure][2] のコンプライアンス ルールのうち、有効になっているすべてのルールに環境がどの程度準拠しているかを百分率で表したものです。

**計算式**:

$${{({\text"Pcritical"/\text"Pcritical + Fcritical"})^2 *8}+{(\text"Phigh"/\text"Phigh + Fhigh") *6}+{(\text"Pmedium"/\text"Pmedium + Fmedium") *3}+{(\text"Plow"/\text"Plow + Flow") *2}+{(\text"Pinfo"/\text"Pinfo + Finfo") *1}}/{8+6+3+2+1}$$

- P は合格と評価される誤構成の所見の数。
- F は不合格と評価される誤構成の所見の数。

計算式では、誤構成の重大度と、重大度ごとの所見の合格/不合格数を考慮して重み付けられた比率が使用されます。`scored:true` のタグが設定されたルールと所見のみが、計算に含まれます。

ある重大度の所見がない場合、その重大度は計算に含まれません。例えば、重大度「クリティカル」の所見がない場合、分母は 6+3+2+1 (クリティカルの 8 を除く) になります。

根本的な問題を修正するか、影響を受けるリソースについてルールをミュートすることで、誤構成に対処し、スコアを改善できます。ポスチャ スコアは 1 時間ごとに更新されます。

[1]: /ja/security/default_rules/#cat-posture-management-cloud
[2]: /ja/security/default_rules/#cat-posture-management-infra
[3]: /ja/security/cloud_security_management/misconfigurations/