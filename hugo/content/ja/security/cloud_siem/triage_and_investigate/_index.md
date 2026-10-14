---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/risky-behavior-cloud-environments/
  tag: ブログ
  text: クラウド環境におけるリスクのある行動を特定します
- link: https://learn.datadoghq.com/courses/cloud-siem-detect-investigate-threats
  tag: ラーニングセンター
  text: Cloud SIEM で脅威を検出および調査する
title: トリアージと調査
---
## 概要{#overview}

Cloud SIEM は、Security シグナルが生成された後の Security 調査を効率化するための統合ツールを提供します。これらのツールは、Security シグナルがトリガーされた際に、以下の調査ワークフローを案内します。

- 脅威の評価
- スコープの把握
- 影響の特定

[Investigate Security Signals][1]から開始して、シグナルエクスプローラーを使用してシグナルのトリアージと調査を行います。重大度、エンティティ、または期間でフィルタリングして、何が検出をトリガーしたかを迅速に評価し、どのシグナルが即時の対応を必要とするかを決定します。

よりエンティティ中心のアプローチとして、[Entity Risks][2]は、SIEMシグナル、Cloud Securityの検出結果、およびIDリスクを、ユーザーや資産を表す統合エンティティプロファイルにまとめ、独自のリスクスコアモデルと組み合わせます。

アクターがエコシステム全体でどのように移動するかを広く理解するために、[Investigator][3]グラフィカルインターフェースは、エンティティとアクティビティ間の接続を時間の経過とともにマッピングします。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/investigate_security_signals/
[2]: /ja/security/cloud_siem/entities_and_risk_scoring
[3]: /ja/security/cloud_siem/investigator