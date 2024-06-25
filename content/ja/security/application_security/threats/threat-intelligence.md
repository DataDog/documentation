---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-threat-intelligence/
  tag: ブログ
  text: Datadog Threat Intelligence によるセキュリティ調査の迅速化
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog Application Security Management で脅威から守る
title: Threat Intelligence
---

## 概要

Datadog は、ASM (Application Security Management) や Cloud SIEM (Security Information and Event Management) などの一部のサービスに対して、組み込みの[脅威インテリジェンス][1]データセットを提供しています。これにより、セキュリティアクティビティが観察された際に、アクションを起こすための追加のエビデンスが提供されます。

Datadog は、脅威インテリジェンスを取りまとめ、カテゴリーと目的を標準化したリストを作成します。目的には、_benign_、_suspicious_、_malicious_が含まれます。脅威インテリジェンスのカテゴリーには、_corp\_vpn_などの良性の検知や、_malware_などの悪質なカテゴリーが含まれます。アップストリームの脅威インテリジェンス情報は、すべての脅威インテリジェンスソースについて渡され、脅威インテリジェンスのペイロードサイズに基づく制限がかかります。

Datadog では、以下の方法で脅威インテリジェンスを消費することを推奨しています。
1. クレデンシャルスタッフィングなどのビジネスロジック脅威の検知ルールのしきい値を下げる。ユーザーは、デフォルトの[クレデンシャルスタッフィング](https://app.datadoghq.com/security/configuration/asm/rules/view/wnp-zlu-woa)ルールを複製して、自分のニーズに合うように変更することができます。
2. セキュリティアクティビティのレピュテーション指標として脅威インテリジェンスを使用する。

Datadog は、以下を_行わない_ことを推奨しています。
1. 対応するセキュリティアクティビティのない脅威インテリジェンストレースをブロックすること。IP アドレスの背後には多数のホストが存在する可能性があります。マルウェアやレジデンシャルプロキシが検知されたということは、その IP の背後にあるホストにより関連するアクティビティが観察されたことを意味します。マルウェアやプロキシを実行しているホストが、サービスと通信している同じホストであるという保証はありません。
2. すべての脅威インテリジェンスカテゴリーをブロックすること。そこには企業の VPN からの良性のトラフィックが含まれ、悪質でないトラフィックをブロックすることになるためです。

## どのソースが ASM に表示されるか

- [abuse.ch](https://threatfox-api.abuse.ch)
- [FireHOL](https://iplists.firehol.org/)
- [spur](https://spur.us/) (`malware` カテゴリーのみ)
- [Tor の出口ノード](https://www.dan.me.uk/torlist/?exit)

特定のソースによってフラグ付けされたすべてのトレースを検索するには、ソース名を指定して次のクエリを使用します。

    @threat_intel.results.source.name:<SOURCE_NAME> 

任意のソースからの脅威インテリジェンスを含むすべてのトレースのクエリを検索するには、次のクエリを使用します。

    @appsec.threat_intel:true 

<div class="alert alert-info">
ASM Traces タブのクエリ <code>@appsec.threat_intel:true</code> は、<code>@threat_intel.indicators_matched:*</code> と同じではありません。<code>@threat_intel.indicators_matched:*</code> クエリには、脅威インテリジェンスに一致するすべての値が含まれますが、攻撃が存在せず、ソースが<strong>どのソースが ASM に表示されるか</strong>セクションで説明したソースのいずれかに一致しない場合、トレース全体が ASM に再表示されないことがあります。
</div>

## Cloud SIEM、APM、ASM での利用可否

以下の表は、Datadog サービスでの脅威インテリジェンス情報の利用可否を示しています。

|サービス|使用中のその他のサービス|説明|
|---|---|---|
|APM| *なし*または Cloud SIEM |脅威インテリジェンスは存在しません。|
|APM| ASM |脅威インテリジェンスは ASM と同じように存在します。|
|Cloud SIEM| *すべて* |脅威インテリジェンスは一致するログに存在します。|
|ASM| *すべて* |攻撃または `@appsec.threat_intel:true` があるトレースのみが存在します。脅威インテリジェンスソースに一致するすべてのトレースには、`@threat_intel` 属性が含まれます。|

上の表にあるように、APM が脅威インテリジェンスを表示するには ASM が必要です。また、Cloud SIEM は、同じ IP アドレスの ASM では表示されない脅威インテリジェンスデータを含むログを表示することがあります。

## ユーザーインターフェイスの脅威インテリジェンス

ASM Traces Explorer でトレースを表示すると、`@appsec` 属性の下に脅威インテリジェンスデータが表示されます。`category` 属性と `security_activity` 属性の両方が設定されています。

{{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="脅威インテリジェンスデータを含む appsec 属性の例">}}

`@threat_intel.results` の下で、どのソースから何が一致したかの詳細を常に確認することができます。

 {{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="脅威インテリジェンスデータを含む threat_intel 属性の例">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/datadog-threat-intelligence/