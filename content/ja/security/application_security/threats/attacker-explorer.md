---
disable_toc: false
further_reading:
- link: /security/application_security/threats/protection
  tag: ドキュメント
  text: Protection
title: アタッカーエクスプローラー
---

このトピックでは、**アタッカーエクスプローラー**を使用して Flagged Attackers を調査し、ブロックする方法について説明します。

## 概要

Datadog Application Security Management (ASM) は、攻撃者を suspicious (疑わしい) または flagged (フラグ付き) で識別します。[アタッカーエクスプローラー][1]を使用すると、攻撃者を調査して対策を講じることができます。


### 定義

- **Suspicious Attackers:** 過去 24 時間で最大しきい値まで攻撃トラフィックを送信した IP アドレス。

- **Flagged Attackers:** 過去 24 時間で Suspicious Attackers のしきい値を超える攻撃トラフィックを送信した IP アドレス。Flagged Attackers は確認して、ブロックする必要があります。

<div class="alert alert-info"><strong>Flagged Attackers</strong> と <strong>Suspicious Attackers</strong> は相互に排他的です。1 つの IP が同時に両方の状態になることはありません。</a></div>

### アタッカーエクスプローラーとシグナルエクスプローラーおよびトレースエクスプローラーとの違い

各エクスプローラーの違いを理解するために、以下のアプローチをご確認ください。

- **保護:** ASM Protection の構成を使用した自動ブロック。お客様は、最初の自動ブロックアクションとして攻撃ツールをブロックする必要があります。攻撃ツールをブロックすることで、SQLi、コマンドインジェクション、SSRF などの OWASP 脅威に対する一般的な脆弱性の検出を減らすことができます。
- **リアクティブ:** 観察された脅威に対して、シグナルエクスプローラーまたはアタッカーエクスプローラーを使用してブロックします。

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_nav.png" alt="ASM アタッカーエクスプローラーのナビゲーションのスクリーンショット"  >}}

各エクスプローラーは固有のユースケースに焦点を当てています。

- **シグナルエクスプローラー**: クレデンシャルスタッフィング攻撃やコマンドインジェクションなどの実用的なアラートのリスト。シグナルでは、ワークフロー機能、説明、重大度、相関付けられたトレースが利用できます。インタラクションには、ユーザー割り当てのワークフロー、保護の自動化、分析、検索、およびトレースへのピボットが含まれます。
- **トレースエクスプローラー**: ログインや攻撃ペイロードなどのビジネスロジックイベントの証拠のリスト。インタラクションには、分析と検索が含まれます。
- **アタッカーエクスプローラー**: Flagged Attackers および Suspicious Attackers のリスト。インタラクションには以下が含まれます。
  - 攻撃者の分析とブロックのための一括アクション
  - 攻撃者の履歴の掘り下げ
  - 検索
  - 他のエクスプローラーへのピボット  


### 攻撃者の確認とフィルタリング

攻撃者の確認を始めるには、[アタッカーエクスプローラー][1]に移動します。

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_default_view2.png" alt="ASM アタッカーエクスプローラー"  >}}

アタッカーエクスプローラーには 2 つのセクションがあります。

1. ファセットと検索。これにより、サービスまたは攻撃者の属性によってトラフィックをフィルタリングできます。 
2. 攻撃者のリストとセキュリティメトリクス。


### IP の調査

任意の行をクリックして、IP の履歴と属性を確認します。

{{< img src="security/application_security/threats/attacker-explorer/ip_drawer.png" alt="ASM アタッカーエクスプローラーを使用した IP アドレスの調査"  >}}

IP は IP ドロワーからブロックしたり、パスリストに追加したりすることができます。

### アタッカーエクスプローラーでのブロッキングのベストプラクティス

1. アカウント乗っ取り攻撃: IP アドレスのブロックには短期間のブロックを使用する。
2. 認可されたスキャナーを監視対象パスリストに追加して、アクティビティを監視しつつブロックを防ぐ。
3. モバイル ISP のブロックは慎重に行う。これらのネットワークでは、単一の IP アドレスの背後に多数のユーザーやモバイルデバイスが存在する可能性があります。

## 個別 IP のブロック

個別の IP を一時的または恒久的にブロックするには、次の作業を行います。

{{< img src="security/application_security/threats/attacker-explorer/block_ip_address.png" alt="ASM アタッカーエクスプローラーを使用した IP アドレスのブロック"  >}}

1. 対象となる行の `Block` をクリックします。
2. ブロックする期間を選択します。

## IP の一括ブロック

アタッカーエクスプローラーの **Compare and Block** オプションを使用して、複数の IP を選択し、一時的または恒久的にブロックすることができます。 

**Compare and Block** は、ブロックを安全かつ確実に行えるよう、IP に関するメトリクスを提供します。このトピックで後述する **Similarity Overview** や **Activity** などがその一例です。

IP を一括で比較しブロックするには、次の作業を行います。
1. 検索またはファセットで攻撃者のリストをフィルタリングします。
2. 複数の IP を選択します。
3. **Compare and Block** オプションを選択します。

   次の例では、選択された IP は同じ場所からのもので、関連しているように見えます。**Compare and Block** オプションを選択すると、**Block selected attackers** ビューが開き、選択した IP アドレスのメトリクスと属性が表示されます。

    {{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="ASM アタッカーエクスプローラーのグループブロッキングのスクリーンショット"  >}}

4. 攻撃者をブロックするには、**Block** をクリックします。

## 選択した攻撃者のブロックに関するメトリクス

**Compare and Block** オプションを選択すると、**Block selected attackers** ビューが開き、選択した IP アドレスのメトリクスと属性が表示されます。

{{< img src="security/application_security/threats/attacker-explorer/attacker_explorer_review_groups2.png" alt="ASM アタッカーエクスプローラーのグループブロッキングのスクリーンショット"  >}}

<div class="alert alert-info">メトリクス <strong>Similarity Overview</strong> と <strong>Activity</strong> の対象期間は、過去 30 日間に設定されています。</a></div>

**Block selected attackers** ビューのメトリクスについては、以下のセクションで説明します。

### Selected IPs

エクスプローラーから選択された IP が含まれます。IP の選択を解除すると、メトリクスのセクションと **Block** アクションから除外されます。

### Similarity overview

各列は、安全で確実なブロックをサポートするために存在します。提供された属性は、ASM の攻撃者類似性機能でも使用されます。

ASN
: 自律システム番号。大量の IP アドレスを使った攻撃は、特にデータセンターやクラウドの IP から発信される場合、同じ ASN が発信元になっている可能性があります。

User Agents
: 攻撃者、商用スキャナー、およびお客様独自のソフトウェアは予測可能なユーザーエージェントを使用している場合があり、何をブロッキングの対象とし、何を除外すべきかを判断するのに役立つ可能性があります。

Location
: 企業には、どの国からのトラフィックを許可するかを決めるポリシーやサービス提供可能な市場が定められている場合があります。

Domain
: ASN の所有者。組織が複数の ASN を所有している場合に役立ちます。

Users per IPs
: 同じ IP から認証したユーザーの数。同じ IP からのログイン数が多い場合、ロードバランサーの存在や、企業の拠点など同じ場所から多数のユーザーが来ていることを示す可能性があります。

### Activity

アクティビティのタイムスコープは 30 日間です。

#### シグナル

選択した期間における IP アドレスに関連するシグナル。

#### トレース

選択した期間における IP アドレスに関連するトレース。

Benign traffic とは、サンプリングされた APM トラフィックで、ビジネスロジックや攻撃トラフィックが検出されていないトレースのことです。

Attack traffic は、ビジネスロジックを含むすべての ASM トレースです。

### Block

これにより、指定された期間、IP アドレスが[拒否リスト][2]に追加されます。


[1]: https://app.datadoghq.com/security/appsec/attackers
[2]: https://app.datadoghq.com/security/appsec/denylist
[3]: https://app.datadoghq.com/security/appsec/passlist