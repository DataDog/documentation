---
title: Account Takeover Protection
kind: documentation
disable_toc: false
further_reading:
- link: security/application_security/terms/
  tag: Documentation
  text: ASM Terms and Concepts
- link: security/application_security/threats/add-user-info/?tab=set_user
  tag: Documentation
  text: User Monitoring and Protection
- link: security/application_security/guide/
  tag: Documentation
  text: Application Security Management Guides
---

ASM provides account takeover (ATO) protection to detect and mitigate account takeover attacks.

ATO protection has the following benefits:

* Block attackers and disable users.
* Identify targeted and compromised users.
* Differentiate existing users from non-existing users.
* Cluster attackers into logical groups for mitigation.

## Account takeover protection overview

Account takeover occurs when an attacker gains access to a user's account credentials and assumes control of the account.

The following tables lists the *attacker motivation by business*:

| Monetary Theft                           | Reselling Accounts              |
|------------------------------------------|---------------------------------|
| Consumer banking apps                    | SaaS Platforms                  |
| Financial service apps that issue credit cards | Consumer platforms with stored gift cards |

## Attacker strategies

Attacks use publicly available automated tools to compromise a user's account credentials. The sophistication and scale of these tools have varying capabilities.

Here are some common strategies:

Credential stuffing
: An automated cyberattack where stolen account credentials (usernames, email addresses, passwords, and so on) are used to gain unauthorized access to user accounts. Access is gained through large scale automated login requests directed against a web application.
: Credential stuffing relies on credential dumps.

Credential dumps
: Credential dumps occur when stolen credentials from a security breach are posted publicly or sold on dark web markets. This often results in the release of a large number of usernames, passwords, and other account details.

Credential cracking
: Credential cracking involves attempting to decipher a user's password by systematically trying different combinations of passwords until the correct one is found. This method often uses software tools that apply various password guessing techniques.

Brute force
: Brute force is a trial-and-error method used to obtain information such as a user password or personal identification number (PIN). In this attack, automation is used to generate consecutive guesses and gain unauthorized access to a system.

## Setting up ATO detection and prevention

ASM provides managed detections of ATO attacks.

Effective ATO detection and prevention requires the following:

1. Instrumenting your production login endpoints. This enables detection with ASM-managed rules.
2. Remote configuration. This enables blocking attacks and pushing remote instrumentation from the Datadog user interface.
3. Notifications. Ensures you are notified of compromised accounts.
4. Reviewing your first detection. Understand how automated protection fits in with your attacks and escalation requirements.


## Instrumenting your production login endpoints

The following user activity events are used for ATO tracking.

| Enrichment              | Auto-instrumented | Use case                                     |
|-------------------------|-------------------|----------------------------------------------|
| `users.login.success`     | True              | Account takeover detection rule requirement       |
| `users.login.failure`     | True              | Account takeover detection rule requirement       |
| `users.password_reset`     | False             | パスワードリセットによるユーザー列挙を識別する検出ルール要件 |

Those enrichment need to hold a user identifier (unique to a user, numeric or otherwise) as `usr.id`. In the case of login failures, it also needs to know whether the user existed in the database or not (`usr.exists`). This helps identifying malicious activity that will regularly target missing accounts.

自動的にインスツルメンテーションされないイベントの追跡を有効にする手順については、[ユーザーの監視と保護][1]を参照してください。

関連する検出とインスツルメンテーション要件の最新リストについては、[検出ルール][2]ページを参照してください。

[Automatic instrumentation][3] is a Datadog capability that automatically identifies user login success and failure for many authentication implementations.

Datadog がこれらのエンリッチメントを定義する方法に制限はありません。多くのプラットフォーム製品では、顧客組織やユーザーロールの識別など、他のエンリッチメントを追加できます。

## リモート構成

[Remote Configuration][4] enables ASM users to instrument apps with custom [business logic][5] data in near real time.

## 通知

[通知][6]は、攻撃を適切なチームメンバーに確実に通知するための柔軟な方法です。一般的なコミュニケーション方法とのコラボレーション[インテグレーション][7]はすぐに使えます。


## 最初の検出をレビュー

ASM は、検出タイプに基づいて最も関連性の高い情報をハイライトし、取るべきアクションを提案します。また、どのようなアクションが実行されたかも表示されます。

{{<img src="security/ato/review_first_detection2.png" alt="関心のあるさまざまな領域をハイライト表示したアカウント乗っ取りシグナル" style="width:100%;">}}

**Compromised Users**

**Signals** と **Traces** では、侵害されたユーザーと標的とされたユーザーを確認し、ブロックすることができます。

**Signals**

個々のユーザーは、**Targeted Users** を使用して **Signals** でブロックできます。

{{<img src="security/ato/compromised_users_signals2.png" alt="セキュリティシグナルに表示される侵害されたユーザー" style="width:100%;">}}

**Traces**

個々のユーザーは、**User** の **Traces** でブロックできます。このオプションを表示するには、任意のユーザーをクリックしてください。

{{<img src="security/ato/traces_block_user.png" alt="セキュリティトレースエクスプローラーに表示される侵害されたユーザー" style="width:100%;">}}

## シグナルの確認と保護のベストプラクティス

アカウント乗っ取り攻撃を検出および軽減するために、以下のベストプラクティスを確認してください。

### インシデント対応計画の策定

インシデント対応計画を策定するために、次のセクションを確認してください。

#### 認証済みスキャナーを使用していますか？

信頼できる IP を特定し、自動的にブロックされないようにします。この手順は、次の場合に役立ちます:

- ログインを試みる承認されたスキャンソース。
- 単一の IP アドレスの背後に多数のユーザーを持つ企業サイト。

信頼済み IP を構成するには、[Passlist][12] を使用して、`Monitored` エントリを追加します。監視対象エントリは自動ブロックから除外されます。

{{<img src="security/ato/passlist2.png" alt="監視パスリスト" style="width:100%;">}}

#### 顧客の認証プロファイルを把握

以下のような、顧客が認証するネットワークを確認します。

- モバイル ISP
- 企業 VPN
- 住宅用 IP
- データセンター

認証ソースを理解することは、ブロッキング戦略に役立ちます。

例えば、あなたは顧客がデータセンターからコンシューマーアプリケーションで認証を行うことを想定*していない*かもしれません。その場合、そのデータセンターに関連する IP をブロックする自由度が高まります。

それにもかかわらず、顧客がモバイル ISP から全てを発信している場合、それらの ISP をブロックすると、正当なトラフィックに影響を与える可能性があります。

あなたの顧客がどのような人たちなのか、そして彼らのアカウント名の構造を考えてみてください。

あなたの顧客はこれらの属性に一致していますか？

- 整数、企業ドメイン、数字とテキストの組み合わせなど、予想される ID 形式を持つ従業員。
- 顧客企業に関連するドメイン名を使用している SaaS の顧客。
- Gmail や Proton Mail などの無料プロバイダーを使用しているコンシューマー。

顧客のアカウント名の構造を理解することで、攻撃が標的型なのか、それとも大量の資格情報を無差別に試すような攻撃なのかを判断することができます。


### 分散攻撃

攻撃は可用性、ユーザーの資金、および正規ユーザーに影響を与える可能性があるため、高度な分散攻撃については、多くの場合、ビジネス上の意思決定の上ブロックすることになります。

このような攻撃を軽減するための 3 つの重要なコンポーネントを紹介します。

1. 適切なオンボーディング: ASM によるブロックの構成はできていますか？
2. 適切な構成: クライアント IP と X-Forwarded-For (XFF) HTTP ヘッダーを正しく設定していますか？
3. 内部コミュニケーション計画: セキュリティチーム、サービスオーナー、製品リードとのコミュニケーションは、大規模攻撃の軽減による影響を理解する上で非常に重要です。

<div class="alert alert-info">対応者は、すべての ASM シグナルに含まれるタグを使用して、サービスオーナーを特定することができます。</div>

### 傾向を知る

[Threats Overview][11] を使用して、サービスに対するログイン失敗の急増など、ビジネスロジックの傾向を監視します。

{{<img src="security/ato/threats_overview2.png" alt="Threats Overview" style="width:100%;">}}


### シグナルの確認

シグナルに関する以下のベストプラクティスを確認してください。

#### IP アドレス

攻撃者のブロックには短い時間を使用します。15 分以内を推奨します。攻撃者が分散型のアカウント乗っ取りで IP アドレスを再利用することは稀です。

#### データセンター

安価な仮想プライベートサーバー (VPS) やホスティングプロバイダーを利用した攻撃もあります。攻撃者の動機は、低コストで自動化されているため、データセンターで新しい IP アドレスにアクセスできることにあります。

多くのコンシューマーアプリケーションでは、データセンター、特に低コストのデータセンターや VPS プロバイダーからのユーザー認証の発生率は低いです。ネットワーク範囲が小さく、想定されるユーザー認証動作の範囲内にない場合は、データセンターまたは ASN 全体をブロックすることを検討してください。

<div class="alert alert-info">Datadog は、IPinfo や Spur などのサードパーティのデータソースを使用して、IP がホスティングプロバイダーであるかどうかを判断します。Datadog はこのデータを Datadog インフラストラクチャー内で処理します。</div>

#### プロキシ

Datadog は [Spur][8] を使用して、IP がプロキシであるかどうかを判断します。Datadog は、ASM が管理するアカウント乗っ取りルールでより迅速に検出するために、侵害の指標 (IOC) とアカウント乗っ取り攻撃を相関させます。

Datadog は、IP アドレスの脅威インテリジェンス IOC のみに基づいて IP アドレスをブロックしないことを推奨します。詳しくは、脅威インテリジェンスの[ベストプラクティス][9]を参照してください。

所有権や脅威インテリジェンスを含む IP の詳細は、IP アドレスの詳細で確認できます。これらの詳細を表示するには、IP アドレスをクリックしてください。

分散型アカウント乗っ取りでは、2 種類のプロキシが頻繁に見られます。

- ホスティングプロキシ: データセンターに存在するプロキシで、多くの場合、データセンターのホストが侵害された結果です。ホスティングプロキシとやりとりするためのガイダンスはデータセンターと同様です。

- レジデンシャルプロキシ: 住宅用 IP の背後に存在するプロキシ。レジデンシャルプロキシは、モバイルアプリケーション SDK またはブラウザのプラグインによって有効化されることがよくあります。SDK またはプラグインのユーザーは通常、プロキシを実行していることに気づきません。レジデンシャルプロキシとして識別された IP アドレスから良性のトラフィックが発生することはよくあります。

#### モバイル ISP

Datadog は、IPinfo や Spur などのサードパーティを使用して、IP がモバイル ISP であるかどうかを判断します。

モバイル ISP をブロックする場合は注意してください。モバイル ISP は [CGNAT][10] を使用し、頻繁に各 IP アドレスの背後に多数の電話を持っています。

#### 攻撃者の属性

攻撃者の属性を使用して、レスポンスアクションの目標を設定します。

Datadog は、攻撃者の属性の類似性によって攻撃者をクラスター化します。対応者はカスタムルールを使用して、しつこい攻撃者の属性をブロックすることができます。


### 保護

保護に関する以下のベストプラクティスを確認してください。

#### 自動化された保護

管理されたルールセットを評価し、どのルールが社内の自動ブロックポリシーに適合するかを判断します。

ポリシーがない場合は、既存の検出を確認し、**Signals** で推奨される対応から始めます。長期間にわたって実行された最も関連性の高いアクションに基づいてポリシーを構築します。

#### ユーザー

**Signals** では、**What Happened** および **Targeted Users** セクションに、試行されたユーザー名の例が示されています。

**Traces** セクションでは、ユーザーが存在するかどうかを識別します。ユーザーが存在するかどうかを理解することは、インシデント対応の決定に影響します。

以下の侵害後の手順を使用して、インシデント対応計画を策定します。

1. 侵害されたユーザーアカウントの監視
2. 資格情報の無効化を計画し、資格情報を更新するようユーザーに連絡します。
3. ASM を使用してユーザーをブロックすることを検討します。

攻撃の動機は、侵害後のアクティビティに影響を与えます。アカウントの転売を目的とする攻撃者は、侵害直後にアカウントを使用する可能性は低いでしょう。
貯蓄された資金にアクセスしようとする攻撃者は、侵害後すぐにアカウントを使用します。

攻撃者のブロックに加え、侵害されたユーザーのブロックを検討してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/security/application_security/threats/add-user-info/
[2]: https://app.datadoghq.com/security/configuration/asm/rules?query=type%3Aapplication_security%20defaultRule%3Atrue%20dependency%3A%28business_logic.users.%2A%29%20&deprecated=hide&groupBy=none&sort=rule_name
[3]: https://app.datadoghq.com/security/configuration/asm/rules?query=type%3Aapplication_security%20defaultRule%3Atrue%20dependency%3A%28business_logic.users.%2A%29%20&deprecated=hide&groupBy=none&sort=rule_name
[4]: https://docs.datadoghq.com/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: https://app.datadoghq.com/security/appsec/business-logic
[6]: https://docs.datadoghq.com/security/notifications/rules/
[7]: https://app.datadoghq.com/integrations?category=Collaboration
[8]: https://docs.datadoghq.com/security/threat_intelligence#threat-intelligence-sources
[9]: https://docs.datadoghq.com/security/threat_intelligence#best-practices-in-threat-intelligence
[10]: https://en.wikipedia.org/wiki/Carrier-grade_NAT
[11]: https://app.datadoghq.com/security/appsec/threat
[12]: https://app.datadoghq.com/security/appsec/passlist