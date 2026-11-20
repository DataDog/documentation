---
aliases:
- /ja/security/threat_intel
description: Datadog の Threat Intelligence
further_reading:
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: ドキュメント
  text: AAP 脅威インテリジェンス
- link: /security/cloud_siem/threat_intelligence/
  tag: ドキュメント
  text: Cloud SIEM 脅威インテリジェンス
- link: https://www.datadoghq.com/blog/cloud-security-investigation-ai/
  tag: ブログ
  text: Bits Security Analyst を使用してクラウド認証情報の侵害を調査する方法
- link: https://www.datadoghq.com/blog/bits-threat-hunting/
  tag: ブログ
  text: Datadog Cloud SIEM で脅威ハンティングを自動化します。
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: 脅威インテリジェンス
---
{{< product-availability >}}

## 概要 {#overview}

Threat Intelligence は、対応者が攻撃や侵害について情報に基づいた判断を下すのに役立つ評判情報です。

Datadog は、商用、オープンソース、および社内の脅威インテリジェンスの侵害指標を、カテゴリとインテントに分類して管理しています。脅威インテリジェンスは、ソースごとに少なくとも 1 日 1 回更新されます。このデータは、関連するレピュテーション情報を使用してログやトレースをエンリッチするために使用されます。

## 独自の脅威インテリジェンスの持ち込み{#bring-your-own-threat-intelligence}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">独自の脅威インテリジェンスの持ち込みは、 {{< region-param key="dd_site_name" >}}.</div>
{{< /site-region >}}

Datadog Security は、Datadog リファレンステーブルに保存された脅威インテリジェンスの侵害指標を使用して、トレースのエンリッチメントや検索を行う機能をサポートしています。[リファレンステーブル][2]を使用すると、メタデータを Datadog 内の既存情報と組み合わせることができます。

エンリッチメントとして利用可能な脅威インテリジェンスの保持期間は、ソースによって異なります。
- OEM および統合ベースのフィード: 24 時間
  - Datadog は、これらのプロバイダーから少なくとも 1 日 1 回脅威インテリジェンスを再取得しますが、脅威インテリジェンス情報の保持はプロバイダーに依存します
- 独自の脅威インテリジェンスの持ち込み: インテリジェンスを利用可能にする期間は、ご設定により異なります。

詳細については、「[独自の脅威インテリジェンスの持ち込み][3]」ガイドを参照してください。

## 脅威インテリジェンスのライフサイクル {#threat-intelligence-lifecycle}

Datadog は、以下のエンティティタイプ全体で脅威インテリジェンスを収集します。各エンティティタイプには、固有の特性と有効な期間があります。この期間、つまりライフサイクルは、データに対する脅威インテリジェンスの一致の重要性を評価する際に考慮する必要があります。

### ファイルハッシュ: 一意のデジタルフィンガープリント {#file-hashes-unique-digital-fingerprints}

ファイルハッシュは、特定のファイルに対する一意のデジタルフィンガープリントとして機能します。ファイルハッシュがマルウェアとしてマークされている場合、そのファイルの内容が正確に有害であることを示します。ファイルの内容に結びついているハッシュの不変性により、一貫した識別が保証されます。その結果、マルウェアとしてタグ付けされたファイルハッシュは、その識別が真陽性であった場合に限り、その識別を保持します。

### アプリケーションパッケージ: 配布におけるマルウェアのリスク {#application-packages-malware-risk-in-distribution}

不変のファイルハッシュとは異なり、アプリケーションパッケージは、同じバージョン番号であっても内容やセキュリティが異なることがあります。悪意のある攻撃者は、正規のパッケージを模倣した有害なパッケージをアップロードしたり、マルウェアを導入して既存のパッケージを侵害したりする可能性があります。悪意のあるパッケージのライフサイクルは長期間にわたることが多いですが、不変ではありません。

### ドメイン: 一時的な署名 {#domains-temporary-signatures}

ファイルハッシュとは異なり、悪意があると識別されたドメインは変更される可能性があります。それらは、さまざまなエンティティによる修復、再割り当て、または再利用といったプロセスを経る可能性があります。悪意のある、または疑わしいドメインのライフサイクルは、IP アドレスと比較すると多少長くなりますが、依然として一時的であり、変動しやすいものです。

### IP アドレス: 動的および一時的 {#ip-addresses-dynamic-and-transient}

IP アドレスは脅威インテリジェンスにおいて最も変動しやすい要素であり、多くの場合、24 時間ごとに評価が変化します。その動的な性質、特に複数のホストが関与する可能性のある住宅用ネットワークやモバイルネットワークにおいては、そのステータスを定期的に再評価することが不可欠です。評価の低い IP アドレスに接続されているすべてのホストが本質的に悪意のあるものとは限らないため、相関分析の必要性が強調されます。

## 脅威インテリジェンスのベストプラクティス {#best-practices-in-threat-intelligence}

脅威インテリジェンスにおいて評価は重要ですが、他の証拠と併せて検討する必要があります。いくつかの例外を除き、トラフィックのブロックを IP やドメインのインテリジェンスのみに頼ることは推奨されません。バランスの取れた、証拠に基づくアプローチが不可欠です。

[検出ルール][1]内で使用される脅威インテリジェンスは、カテゴリー (`@threat_intel.results.category`) や意図 (`@threat_intel.results.intention`) といった Datadog のキー項目を参照すべきです。その他のキーは使用しないでください。

## 脅威インテリジェンスの透明性 {#transparency-in-threat-intelligence}

Datadog は、検知に関連する外部の脅威インテリジェンスソースへの外部リンクを提供することで、透明性を確保しています。Datadog がキュレーションした脅威インテリジェンスは、エンリッチメントおよび検知のために Datadog プラットフォームに取り込まれます。Datadogは、顧客データを脅威インテリジェンスソースに送信しません。

検出とリッチ化は、UI とイベント JSON でアクセスできます。

## 脅威インテリジェンスファセット {#threat-intelligence-facets}

ソース、カテゴリー、意図は、関連する製品エクスプローラーのファセットやフィルターとして利用できます。

### 脅威インテリジェンスソース {#threat-intelligence-sources}

| ソース | カテゴリー | ソースのユースケース | 主要製品 |
|--------|------------|-----------|------------------|
| Datadog Threat Research| スキャナー、Redisエクスプロイト、Dockerエクスプロイト、マルウェア、ブルートフォーサー | ソフトウェア固有の脅威に焦点を当てたハニーポット | AAP、CWS、およびCloud SIEM |
| [Datadog AAP](https://docs.datadoghq.com/ja/security/application_security/) | スキャナー | 複数のAAP顧客を攻撃していることが観測されたIPのリスト | AAP |
| [Spur](https://spur.us/) | residential_proxy | クレデンシャルスタッフィングおよび不正行為に関連するプロキシ | AAPおよびCloud SIEM |
| [Spur](https://spur.us/) | malware_proxy | マルウェアのコマンド＆コントロールに関連するプロキシ | Cloud SIEMおよびWorkload Protection |
| [Abuse.ch](https://abuse.ch/) Malware Bazaar| マルウェア | ホスト上のマルウェア | CWS |
| [Minerstat](https://minerstat.com/mining-pool-whitelist.txt) | クリプトマイニング | 既知のマイニングプールによるコインマイナーのアクティビティ| Workload ProtectionおよびCloud SIEM |
| Tor | tor | ユーザーアクティビティに関するポリシー違反 | App and API Protection、Cloud SIEM、およびWorkload Protection |
| [Threatfox](https://threatfox.abuse.ch/) | マルウェア | 既知のマルウェアインフラストラクチャと通信しているホストの特定 | Cloud SIEMおよびWorkload Protection |


### 脅威インテリジェンスカテゴリー {#threat-intelligence-categories}

| カテゴリー | 意図 | エンティティタイプ | 製品のユースケース | 主要製品 |
|----------|----------|--------------|----------|------------------|
| residential_proxy | 不審 | IPアドレス | クレデンシャルスタッフィングおよび不正行為のレピュテーション | AAPおよびCloud SIEM |
| botnet_proxy | 不審 | IPアドレス | ボットネットの一部であり、分散型攻撃に加担しているというレピュテーション | AAPおよびCloud SIEM |
| マルウェア | 悪意のある | アプリケーションライブラリのバージョン、ファイルハッシュ | 悪意のあるパッケージおよびマイニングプールとの通信| CWS |
| スキャナー | 不審 | IPアドレス | スキャナーのレピュテーション | App and API Protection、Workload Protection、およびCloud SIEM |
| hosting_proxy | 不審な | IPアドレス | 分散型クレデンシャルスタッフィング攻撃など、悪用の評価があるデータセンターIP | AAPおよびCloud SIEM |
| tor | 不審な | IPアドレス  | ユーザーアクティビティに関する企業ポリシー違反 | App and API Protection、Workload Protection、およびCloud SIEM |
| disposable_email | 不審な | ドメイン  | 使い捨てメールアドレスからの製品使用の検出 | AAP |
| corp_vpn | 良性 | IPアドレス | 企業VPNに関連付けられたIP | AAPおよびCloud SIEM |
| cryptomining | 悪意のある | IP アドレス | 暗号資産マイニングアクティビティに関連する IP アドレス | AAP、CWS、および Cloud SIEM |

### 脅威インテリジェンスの意図 {#threat-intelligence-intents}

| 意図     | ケース                                     |
|------------|----------------------------------------------|
| 良性     | 企業VPNと情報の充実 |
| 不審な | 低いレピュテーション |
| 悪意のある  | 悪意のあるレピュテーション |


## エンティティタイプ {#entity-types}
| エンティティタイプ | 例 | ケース |
|-------------|---------|-----------------------------|
| IP アドレス | 128.66.0.1 | 攻撃、コマンドとコントロール、スキャンアクティビティに関連する IP アドレスの特定 |
| ドメイン | example.com, subdomain.example.com | 悪意のある使用に関連するドメイン。コマンドとコントロールとしてマルウェアで頻繁に使用されます |
| アプリケーションパッケージバージョン | (example_package, 1.0.0) | PyPi からダウンロードされた悪意のあるパッケージの特定 |
| ファイルハッシュ [SHA1, SHA256, ssdeep (Workload Protection のみ)] | 5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8 | マルウェアや侵害に関連する特定のファイルの特定 |

<div class="alert alert-info">脅威インテリジェンスのソースとカテゴリは現在、構成を変更することができません。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/detection_rules/
[2]: /ja/integrations/guide/reference-tables
[3]: /ja/security/guide/byoti_guide