---
title: Protection
is_beta: true
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Application Security Management with Datadog
---

## 概要

[リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン][2]を実行しているサービスであれば、Agent やトレーシングライブラリの追加構成なしに、Datadog UI から攻撃やアタッカーをブロックすることができます。

Application Security Management (ASM) Protect enables you to slow down attacks and attackers by _blocking_ them. Security traces are blocked in real-time by the Datadog tracing libraries. Blocks are saved in the Datadog platform, automatically and securely fetched by the Datadog Agent, deployed in your infrastructure, and applied to your services.

## 前提条件

To use protection capabilities with your service:

- [Datadog Agent][3] をバージョン 7.41.1 以上に更新します。
- [ASM を有効にします][1]。
- [リモート構成を有効にします][2]。
- トレーシングライブラリを、保護を有効にするために必要な最小バージョン以上に更新してください。詳細は、お使いのサービスの言語の[互換性][12]の ASM 機能のサポートセクションを参照してください。
- 認証ユーザーブロッキングを使用する場合は、[トレースにユーザー情報を追加][4]します。

## 攻撃者 (IP および認証ユーザー) のブロック

ASM [セキュリティシグナル][5]でフラグが立てられた攻撃者を一時的または恒久的にブロックすることができます。シグナルエクスプローラでシグナルをクリックすると、そのシグナルを生成しているユーザーと IP アドレスが表示され、オプションでそれらをブロックすることができます。

From there, all ASM-protected services block incoming requests performed by the blocked IP or user, for the specified duration. All blocked traces are tagged with `security_response.block_ip` or `security_response.block_user` and displayed in the [Trace Explorer][6]. Services where ASM is disabled aren't protected. See [Investigate Security Signals][20] for more information.

## 攻撃者ブロックの自動化により、脅威へのリアルタイムな対応を実現

攻撃者を手動でブロックするだけでなく、自動化ルールを構成して、ASM がセキュリティシグナルでフラグを立てた攻撃者を自動的にブロックするようにすることも可能です。

To get started, navigate to **Security > Application Security > Protection > [Detection Rules][14]**. You can create a new rule or edit an existing rule with type _Application security_. For example, you can create a rule to trigger `Critical` severity signals when Credential Stuffing attacks are detected, and automatically block the associated attackers' IP addresses for 30 minutes.

**注**: 認証された攻撃者をブロックできるようにするには、サービスをインスツルメンテーションする必要があります。詳しくは、[ユーザーの監視と保護][15]をご覧ください。

## 攻撃者を境界でブロック - ASM を既存の WAF デプロイとインテグレーション

Datadog ASM は、Security Signal から直接、攻撃者を境界でブロックすることができます。ASM は[ワークフロー][17]とインテグレーションし、攻撃者の IP アドレスを境界の Web アプリケーションファイアウォール (AWS WAF、Cloudflare、Fastly) にプッシュし、これらの攻撃者からのリクエストが顧客の環境に入る前にエッジでブロックされるようにします。
利用可能な[ブループリント][18]からワークフローを作成し、ASM のシグナルサイドパネルから直接実行します。

## Denylist

永久的または一時的にブロックされた攻撃者の IP アドレスや認証ユーザーは、_Denylist_ に追加されます。[Denylist ページ][7]でリストを管理します。Denylist は、個別 IP だけではなく IP 範囲 (CIDR ブロック) のブロックもサポートしています。

## Passlist

_Passlist_ を使用すると、特定の IP アドレスに対して、アプリケーションへのアクセスを恒久的に許可することができます。例えば、内部 IP アドレスや、アプリケーションのセキュリティ監査を定期的に実行する IP アドレスを Passlist に追加することができます。また、特定のパスを追加して、中断のないアクセスを確保することもできます。[Passlist ページ][8]からリストを管理します。

## アプリ内 WAF による攻撃試行のブロック

ASM アプリ内 WAF (Web アプリケーションファイアウォール) は、境界ベースの WAF の検出技術と Datadog が提供する豊富なコンテキストを組み合わせ、チームが自信を持ってシステムを保護できるようにします。

ASM はアプリケーションのルートを認識しているため、保護は特定のサービスに対してきめ細かく適用でき、必ずしもすべてのアプリケーションとトラフィックに適用する必要はありません。このコンテキストに基づく効率化により、検査の労力が軽減され、境界型 WAF と比較して誤検出率が低下します。ほとんどの Web フレームワークが構造化された経路のマップを提供するため、学習期間はありません。ASM は、脆弱性が公開された後すぐにゼロデイ脆弱性に対する保護を自動的に展開し、脆弱なアプリケーションをターゲットにして、誤検出のリスクを抑えることができるようにします。

### How In-App WAF blocks security traces

130 以上のアプリ内 WAF ルールのそれぞれに提供される `monitoring` および `disabled` モードに加え、ルールには `blocking` モードもあります。各ルールは、ライブラリが疑わしいと判断する条件を受信リクエストに指定します。与えられたルールパターンが進行中の HTTP リクエストにマッチすると、そのリクエストはライブラリによってブロックされます。

マネージドポリシーは、アプリ内 WAF ルールの各々がマッチング時に動作するモードを定義します。`monitoring`、`blocking`、`disabled` のいずれかです。ASM はアプリケーションの完全なコンテキストを把握しているため、どのルールを適用すれば誤検知の数を抑えながらアプリケーションを保護できるかを把握しています。

きめ細かい制御を行うには、Datadog が管理するポリシーを複製するか、カスタムポリシーを作成し、ニーズに合わせてモードを設定することができます。ポリシーを `auto-updating` に設定すると、Datadog が展開する最新の検出によってアプリケーションが保護されます。また、ポリシーをルールセットの特定のバージョンに固定するオプションもあります。

アプリ内 WAF ルールがモード間で切り替わるため、[リモート構成が有効][2]のサービスでは、ほぼリアルタイムで変更が反映されます。それ以外のサービスでは、[アプリ内 WAF ページ][9]でポリシーを更新し、[アプリ内 WAF ルールの定義][10]を行うことで、動作の変更が適用されます。

Security --> Application Security --> Configuration --> [In-App WAF][9] と進み、アプリ内 WAF を管理します。

[トレースエクスプローラー][11]で、ファセット `Blocked:true` でフィルターをかけて、ブロックされたセキュリティトレースを表示します。

{{< img src="security/application_security/app_sec_blocked.png" alt="ASM Trace Explorer filtered using facet Blocked set to true." style="width:100%;" >}}

### アプリ内 WAF の構成

1. [**リモート構成を有効にする**][2]と、ASM が有効なサービスがアプリ内 WAF の下に表示されるようになります。これは、Datadog バックエンドからインフラストラクチャー内のトレーシングライブラリにアプリ内 WAF の構成を安全にプッシュするために必要です。

2. **Associate your ASM/Remote Configuration-enabled services with a policy**. After Remote Configuration is enabled on a service, navigate to **Security > Application Security > Protection > [In-App WAF][9]**. The service appears under the _Datadog Monitoring-only_ policy by default. Datadog Monitoring-only is a managed policy and is read-only, meaning you cannot modify the status (monitoring, blocking, or disabled) for individual rules.

   If you need granular control, clone one of the available policies to create a custom policy where rule statuses can be modified. Associate one or more of your services with this custom policy.

   To change the policy applied by default to your services, you can update your default policy. From the In-App-WAF, click the policy you would like to set as default, then click **Actions** > **Set this policy as default**.

## 保護動作のカスタマイズ

### ブロックされたリクエストへの対応をカスタマイズする

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="ASM がブロックされた IP からのリクエストをブロックする際に表示されるページ" width="75%" >}}

The default HTTP response status code while serving the deny page to attackers is `403 FORBIDDEN`. To customize the response, navigate to **Security > Application Security > Protection > [Protection Settings][16]**.

拒否ページが提供されるときにレスポンスコードを `200 OK` または `404 NOT FOUND` にオーバーライドすることで、攻撃者が検出されブロックされた事実をオプションで隠すことができます。

また、オプションで攻撃者をカスタム拒否ページにリダイレクトさせ、重要なサービスやインフラストラクチャーから遠ざけることができます。リダイレクト URL とリダイレクトの種類 (例: 永久 (`301` レスポンスコード) または一時 (`302` レスポンスコード)) を指定します。

### すべてのサービスで保護を無効にする (保護モードの無効化)

Protection mode is **on** by default and is a toggle available to quickly disable blocking across **all** your services. Requests can be blocked from two sections in Datadog: all attacker requests from Security Signals, and security traces from In-App WAF.

As important as it is for you to be able to apply protection granularly and reduce the likelihood of legitimate users getting blocked, you sometimes need a simple off switch to quickly stop **all** blocking across **all** services. To turn off protection, navigate to **Security > Application Security > Protection > [Protection Settings][16]** and toggle **Allow Request Blocking** to off.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/enabling/
[2]: /agent/remote_config/#enabling-remote-configuration
[3]: /agent/versions/upgrade_between_agent_minor_versions
[4]: /security/application_security/threats/add-user-info/#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[5]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal
[6]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[7]: https://app.datadoghq.com/security/appsec/denylist
[8]: https://app.datadoghq.com/security/appsec/passlist
[9]: https://app.datadoghq.com/security/appsec/in-app-waf
[10]: /security/application_security/threats/inapp_waf_rules/
[11]: https://app.datadoghq.com/security/appsec/traces
[12]: /security/application_security/enabling/compatibility/
[14]: https://app.datadoghq.com/security/appsec/detection-rules
[15]: /security/application_security/threats/add-user-info/?tab=set_user#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[16]: https://app.datadoghq.com/security/appsec/protection-settings
[17]: https://docs.datadoghq.com/service_management/workflows/
[18]: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
[20]: /security/application_security/threats/security_signals/
