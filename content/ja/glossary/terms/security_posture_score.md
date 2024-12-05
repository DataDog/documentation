---
core_product:
- security
- csm
synonyms:
- ポスチャスコア
- コンプライアンススコア
title: セキュリティポスチャスコア
---

{{< jqmath-vanilla >}}

[Cloud Security Management Misconfigurations][3] で利用可能なセキュリティポスチャスコアとは、環境の何パーセントが、Datadog ですぐに使える[クラウド][1]および[インフラストラクチャー][2]関連のアクティブなコンプライアンスルールをすべて満たしているかを表します。

**計算式**:

$${{({\text"Pcrictical"/\text"Pcritical + Fcritical"})^2 *8}+{(\text"Phigh"/\text"Phigh + Fhigh") *6}+{(\text"Pmedium"/\text"Pmedium + Fmedium") *3}+{(\text"Plow"/\text"Plow + Flow") *2}+{(\text"Pinfo"/\text"Pinfo + Finfo") *1}}/{8+6+3+2+1}$$

- P は合格と評価される誤構成の数。
- F は不合格と評価される誤構成の数。

計算式では、誤構成の重大度と、重大度ごとの誤構成の合格/不合格数を考慮して重み付けられた比率が使用されます。`scored:true` のタグが設定されたルールと誤構成のみが、計算に含まれます。

ある重大度の誤構成がない場合、その重大度は計算に含まれません。例えば、重大度「クリティカル」の誤構成がない場合、分母は 6+3+2+1 (クリティカルの 8 を除く) になります。

根本的な問題を解決するか、影響を受けるリソースに関して誤構成を無効にして、誤構成を修正することで、組織のスコアを改善することができます。ポスチャスコアは 1 時間ごとに更新されます。

[1]: /ja/security/default_rules/#cat-posture-management-cloud
[2]: /ja/security/default_rules/#cat-posture-management-infra
[3]: /ja/security/cloud_security_management/misconfigurations/