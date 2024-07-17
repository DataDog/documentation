---
disable_toc: false
further_reading:
- link: security/application_security/terms/
  tag: ドキュメント
  text: ASM の用語と概念
- link: security/application_security/threats/add-user-info/?tab=set_user
  tag: ドキュメント
  text: ユーザーの監視と保護
- link: security/application_security/guide/
  tag: ドキュメント
  text: Application Security Management ガイド
kind: ドキュメント
title: Account Takeover Protection
---

ASM はアカウント乗っ取り攻撃を検出および軽減するために、アカウント乗っ取り (ATO) 保護を提供します。

ATO 保護には次のような利点があります。

* 攻撃者をブロックし、ユーザーを無効にします。
* 標的とされたユーザーや侵害されたユーザーを識別します。
* 既存のユーザーとそうでないユーザーを区別します。
* 攻撃者を論理的なグループにまとめて軽減策を講じます。

## アカウント乗っ取り保護の概要

アカウントの乗っ取りは、攻撃者がユーザーのアカウント資格情報にアクセスしてアカウントの制御権を奪うことで発生します。

以下の表は、*ビジネス別の攻撃者の動機*の一覧です。

| 金銭的窃盗                           | アカウントの転売              |
|------------------------------------------|---------------------------------|
| コンシューマーバンキングアプリ                    | SaaS プラットフォーム                  |
| クレジットカードを発行する金融サービスアプリ | ギフトカードを保管するコンシューマー向けプラットフォーム |

## 攻撃者の戦略

攻撃者は一般に公開されている自動化ツールを使用してユーザーのアカウント資格情報を侵害します。これらのツールの洗練度や規模はさまざまです。

一般的な戦略をいくつか紹介します。

資格情報スタッフィング
: 盗まれたアカウント資格情報 (ユーザー名、電子メールアドレス、パスワードなど) を使用してユーザーアカウントに不正アクセスする自動化されたサイバー攻撃です。アクセスは Web アプリケーションに対する大規模な自動ログインリクエストを通じて行われます。
: 資格情報スタッフィングは資格情報ダンプに依存しています。

資格情報ダンプ
: 資格情報ダンプは、セキュリティ侵害で盗まれた資格情報が公開されたり、ダーク Web 市場で販売されたりすることで発生します。この結果、大量のユーザー名、パスワード、その他のアカウント詳細が公開されることがよくあります。

資格情報クラッキング
: 資格情報クラッキングでは、正しいパスワードが見つかるまでさまざまなパスワードの組み合わせを系統的に試すことでユーザーのパスワードの解読を試みます。この方法では、さまざまなパスワード推測技術を用いたソフトウェアツールがよく使用されます。

ブルートフォース
: ブルートフォースは、ユーザーのパスワードや個人識別番号 (PIN) などの情報を取得するために試行錯誤する手法です。この攻撃では、自動化を利用して連続的な推測を生成し、システムに不正アクセスを試みます。

## ATO の検出と防止のセットアップ

ASM は ATO 攻撃の検出を管理します。

ATO の効果的な検出と防止には以下が必要です。

1. 本番ログインエンドポイントのインスツルメンテーション。これにより、ASM 管理のルールによる検出が可能になります。
2. リモート構成。これにより、Datadog ユーザーインターフェイスから攻撃をブロックし、リモートインスツルメンテーションをプッシュできます。
3. 通知。侵害されたアカウントを通知することができます。
4. 最初の検出を確認します。自動化された保護が攻撃やエスカレーションの要件にどのように適合するかを理解します。


## 本番ログインエンドポイントのインスツルメンテーション

ATO の追跡には以下のユーザーアクティビティイベントが使用されます。

| リッチ化              | 自動インスツルメンテーション | 使用例                                     |
|-------------------------|-------------------|----------------------------------------------|
| `users.login.success`     | 真              | アカウント乗っ取り検出ルール要件       |
| `users.login.failure`     | 真              | アカウント乗っ取り検出ルール要件       |
| `users.password_reset`     | 偽             | Detection rule requirement to identify user enumeration through password reset |

Those enrichment need to hold a user identifier (unique to a user, numeric or otherwise) as `usr.id`. In the case of login failures, it also needs to know whether the user existed in the database or not (`usr.exists`). This helps identifying malicious activity that will regularly target missing accounts.

For steps on enabling tracking for events that are not automatically instrumented, go to [User Monitoring and Protection][1].

For the latest list of relevant detections and instrumentation requirements, go to [Detection Rules][2] page.

[Automatic instrumentation][3] is a Datadog capability that automatically identifies user login success and failure for many authentication implementations.

You are not limited to how Datadog defines these enrichments. Many platform products opt to add additional enrichments, such as identifying the customer organization or user role.

## Remote Configuration

[Remote Configuration][4] enables ASM users to instrument apps with custom [business logic][5] data in near real time.

## Notifications

[Notifications][6] are a flexible method to ensure the correct team members are informed of an attack. Collaboration [Integrations][7] with common communication methods are available out of the box.


## Review your first detection

ASM highlights the most relevant information and suggests actions to take based on the detection type. It also indicates what actions have been taken.

{{<img src="security/ato/review_first_detection2.png" alt="An Account Takeover signal showing different highlighted areas of interest" style="width:100%;">}}

**Compromised Users**

Compromised and targeted users can be reviewed and blocked within **Signals** and **Traces**.

**Signals**

Individual users can be blocked in **Signals** using **Targeted Users**.

{{<img src="security/ato/compromised_users_signals2.png" alt="Compromised users shown on a security signal" style="width:100%;">}}

**Traces**

Individual users can be blocked on **Traces**, in **User**. Click on any user to show this option.

{{<img src="security/ato/traces_block_user.png" alt="Compromised users shown in the security trace explorer" style="width:100%;">}}

## Best practices for signal review and protection

Review the following best practices to help you detect and mitigate account takeover attacks.

### Develop an incident response plan

Review the following sections to help you develop an incident response plan.

#### Do you use authenticated scanners?

Identify trusted IPs, preventing them from being automatically blocked. This step is useful for the following: 

- Approved scanning sources that attempt to log in.
- Corporate sites with large numbers of users behind single IP addresses.

To configure trusted IPs, use [Passlist][12] and add a `Monitored` entry. Monitored entries are excluded from automated blocking.

{{<img src="security/ato/passlist2.png" alt="Monitored passlist" style="width:100%;">}}

#### Know your customer authentication profile

Review the networks your customers authenticate from, such as:

- Mobile ISPs
- Corporate VPNs
- Residential IPs
- Data centers

Understanding authentication sources can inform your blocking strategy. 

For example, you might *not* expect customers to authenticate with your consumer application from data centers. Consequently, you might have more freedom to block the IPs associated with that data center. 

Nevertheless, if your customers source entirely from Mobile ISPs, you might have an impact to legitimate traffic if you block those ISPs.

Consider who your customers are, and their account name structure.

Do your customers match these attributes?

- Employees with an expected ID format such as integers, corporate domains, or combinations of numbers and text.
- SaaS customers using domain names associated with the customer company.
- Consumers using free providers such as Gmail or Proton Mail.

Understanding your customers' account name structure helps you determine if attacks are targeted or blind attempts at credential stuffing.


### Distributed attacks

Blocking advanced distributed attacks is often a business decision because attacks can impact availability, user funds, and legitimate users. 

Here are three critical components for success in mitigating these attacks:

1. Proper onboarding: Are you configured for blocking with ASM?
2. Proper configuration: Ensure you have correctly set client IPs and X-Forwarded-For (XFF) HTTP headers.
3. Internal communication plans: Communication with security teams, service owners, and product leads is critical to understanding the impact of mitigating large scale attacks.

<div class="alert alert-info">Responders can identify service owners using the tags in all ASM signals.</div>

### Know your trends

Use the [Threats Overview][11] to monitor business logic trends, such as spikes in failed logins against your services.

{{<img src="security/ato/threats_overview2.png" alt="Threats Overview" style="width:100%;">}}


### Signal review

Review the following best practices for signals.

#### IP addresses

Use short durations for blocking attackers. 15 minutes or less is recommended. It is uncommon for attackers to reuse IP addresses in distributed account takeovers.

#### Data centers

Some attacks are launched using inexpensive virtual private servers (VPS) and hosting providers. Attackers are motivated by how their low cost and automation enables access to new IP addresses at the data center.

Many consumer applications have low occurrences of user authentication from data centers, especially low cost data centers and VPS providers. Consider blocking the entire data center or ASN when the network range is small, and not within your expected user authentication behavior.

<div class="alert alert-info">Datadog uses third party data sources such as IPinfo and Spur to determine if an IP is a hosting provider. Datadog processes this data within Datadog infrastructure.</div>

#### Proxies

Datadog uses [Spur][8] to determine if an IP is a proxy. Datadog correlates indicators of compromise (IOCs) with account takeover attacks for faster detection with the ASM-managed account takeover rules.

Datadog recommends never blocking IP addresses solely based on threat intelligence IOCs for IP addresses. See our threat intelligence [best practices][9] for details.

Details on IPs, including ownership and threat intelligence, are available in the IP address details. Click on an IP addresses to view these details.

Two types of proxies are frequently seen in distributed account takeovers:

- Hosting proxies: Proxies that exist at data centers, and are often the result of a compromised host at that data center. Guidance for interacting with hosting proxies is similar to data centers.

- Residential proxies: Proxies that exist behind residential IPs. Residential proxies are frequently enabled by mobile application SDKs or browser plugins. The user of the SDK or plugin is typically unaware that they are running a proxy. It is common to see benign traffic from IP addresses identified as residential proxies.

#### Mobile ISPs

Datadog uses third parties such as IPinfo and Spur to determine if an IP is a Mobile ISP.

Exercise caution when blocking Mobile ISPs. Mobile ISPs use [CGNAT][10] and frequently have large numbers of phones behind each IP address. 

#### Attacker attributes

Use attacker attributes to target response actions.

Datadog clusters attackers by the similarity of their attributes. Responders can use custom rules to block the attributes of persistent attackers.


### Protection

Review the following best practices for protection.

#### Automated protection

Evaluate the managed ruleset to determine which rules fit your internal automated blocking policies. 

If you do not have a policy, review your existing detections and start with the suggested responses in **Signals**. Build your policy based on the most relevant actions taken over time.

#### Users

In **Signals**, the **What Happened** and **Targeted Users** sections provide examples of the attempted usernames.

The **Traces** section identifies if the users exist. Understanding if users exist can influence your incident response decisions.

Develop an incident response plan using the following post compromise steps:

1. Monitoring compromised user accounts.
2. Plan to invalidate credentials and contact users to update credentials.
3. Consider blocking users using ASM.

Attack motivation can influence post-compromise activity. Attackers wanting to resell accounts are unlikely to use accounts immediately after a compromise.
Attackers attempting to access stored funds will use accounts immediately after compromise.

Consider blocking compromised users in addition to blocking the attacker.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/security/application_security/threats/add-user-info/
[2]: https://app.datadoghq.com/security/configuration/asm/rules?query=type%3Aapplication_security%20defaultRule%3Atrue%20dependency%3A%28business_logic.users.%2A%29%20&deprecated=hide&groupBy=none&sort=rule_name
[3]: https://app.datadoghq.com/security/configuration/asm/rules?query=type%3Aapplication_security%20defaultRule%3Atrue%20dependency%3A%28business_logic.users.%2A%29%20&deprecated=hide&groupBy=none&sort=rule_name
[4]: https://docs.datadoghq.com/ja/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: https://app.datadoghq.com/security/appsec/business-logic
[6]: https://docs.datadoghq.com/ja/security/notifications/rules/
[7]: https://app.datadoghq.com/integrations?category=Collaboration
[8]: https://docs.datadoghq.com/ja/security/threat_intelligence#threat-intelligence-sources
[9]: https://docs.datadoghq.com/ja/security/threat_intelligence#best-practices-in-threat-intelligence
[10]: https://en.wikipedia.org/wiki/Carrier-grade_NAT
[11]: https://app.datadoghq.com/security/appsec/threat
[12]: https://app.datadoghq.com/security/appsec/passlist