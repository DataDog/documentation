---
aliases:
- /ja/security/application_security/policies/
- /ja/security/application_security/threats/protection
disable_toc: false
title: ポリシー
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

[Remote Configuration を有効にした Agent とそれをサポートする SDK のバージョン][2] を実行しているサービスであれば、Agent や SDK の追加構成なしに、Datadog UI から攻撃や攻撃者をブロックすることができます。

App and API Protection (AAP) Protect を使用すると、それらを_ブロック_することで攻撃や攻撃者の速度を低下させることができます。セキュリティトレースは、Datadog SDK によってリアルタイムでブロックされます。ブロックは Datadog プラットフォームに保存され、Datadog Agent によって自動的かつ安全にフェッチされ、インフラストラクチャーにデプロイされ、サービスに適用されます。

## 前提条件 {#prerequisites}

サービスで保護機能を使用するには、以下の手順を実行します。

- [Datadog Agent][3] をバージョン 7.41.1 以上に更新します。
- [AAP を有効にします][1]。
- [Remote Configuration を有効にします][2]。
- 保護を有効にするために必要な最小バージョン以上の SDK に更新します。詳細については、ご利用のサービスの言語に対応する [互換性][12] の AAP 機能サポートセクションを参照してください。
- 認証ユーザーブロッキングを使用する場合は、[トレースにユーザー情報を追加][4] します。

## 攻撃者 (IP および認証ユーザー) のブロック {#blocking-attackers-ips-and-authenticated-users}

AAP [Security Signals][5] でフラグが立てられた攻撃者を一時的または恒久的にブロックできます。シグナルエクスプローラーでシグナルをクリックすると、そのシグナルを生成しているユーザーと IP アドレスが表示され、オプションでそれらをブロックすることができます。

そこから、AAP によって保護されているすべてのサービスは、指定された期間、ブロックされた IP またはユーザーによって実行される着信リクエストをブロックします。ブロックされたすべてのトレースには `security_response.block_ip` または `security_response.block_user` というタグが付けられ、[Trace Explorer][6] に表示されます。AAP が無効になっているサービスは保護されません。詳細については、[セキュリティシグナルの調査][20] を参照してください。

## 攻撃者ブロックの自動化により、脅威へのリアルタイムな対応を実現 {#respond-to-threats-in-real-time-by-automating-attacker-blocking}

攻撃者を手動でブロックするだけでなく、自動化ルールを構成して、AAP がセキュリティシグナルでフラグを立てた攻撃者を自動的にブロックするようにすることも可能です。

開始するには、{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}Detection Rules{{< /ui >}}][14] に移動します。ルールを作成したり、既存のルールを編集したりできます。たとえば、Credential Stuffing 攻撃が検出されたときに `Critical` 重大度のシグナルをトリガーし、関連する攻撃者の IP アドレスを 30 分間自動的にブロックするルールを作成できます。

**注**: 認証された攻撃者をブロックできるようにするには、サービスをインスツルメントする必要があります。詳細については、[ユーザーの監視と保護][15] を参照してください。

## 攻撃者を境界でブロックする - AAP を既存の WAF デプロイメントとインテグレーションする {#block-attackers-at-the-perimeter-integrate-aap-with-your-existing-waf-deployments}

Datadog AAP は、Security Signal から直接、攻撃者を境界でブロックすることができます。AAP は [ワークフロー][17] とインテグレーションし、攻撃者の IP アドレスを境界の Web Application Firewall (AWS WAF、Cloudflare、Fastly) にプッシュし、これらの攻撃者からのリクエストが顧客の環境に入る前にエッジでブロックされるようにします。
利用可能な [ブループリント][18] からワークフローを作成し、AAP のシグナルサイドパネルから直接実行します。

## Denylist {#denylist}

恒久的または一時的にブロックされた攻撃者の IP アドレスや認証ユーザーは、_Denylist_ に追加されます。[Denylist ページ][7] でリストを管理します。Denylist は、個別 IP だけでなく IP 範囲 (CIDR ブロック) のブロックもサポートしています。

**注**: デフォルトでは、Denylist には最大 2,500 件のエントリ (IP アドレス、CIDR 範囲、認証ユーザーの合計) を含めることができます。この制限を超えて追加されたエントリは Datadog UI 上では受け入れられますが、適用される Denylist 構成には含まれないため、それらに対するブロックは有効になりません。この制限を超えるエントリをブロックする必要がある場合は、[Datadog Support][21] に連絡して上限の引き上げをリクエストしてください。

## Passlist {#passlist}

_Passlist_ を使用すると、特定の IP アドレスに対してアプリケーションへのアクセスを恒久的に許可することができます。たとえば、内部 IP アドレスや、アプリケーションのセキュリティ監査を定期的に実行する IP アドレスを Passlist に追加することができます。また、特定のパスを追加して、中断のないアクセスを確保することもできます。[Passlist ページ][8] からリストを管理します。

## アプリ内 WAF による攻撃試行のブロック {#blocking-attack-attempts-with-in-app-waf}

AAP アプリ内 WAF (Web アプリケーションファイアウォール) は、境界ベースの WAF の検出技術と Datadog が提供する豊富なコンテキストを組み合わせ、チームが自信を持ってシステムを保護できるようにします。

AAP はアプリケーションのルートを認識しているため、保護は特定のサービスに対してきめ細かく適用でき、必ずしもすべてのアプリケーションとトラフィックに適用する必要はありません。このコンテキストに基づく効率化により、検査の労力が軽減され、境界型 WAF と比較して誤検出率が低下します。ほとんどの Web フレームワークが構造化された経路のマップを提供するため、学習期間はありません。AAP は、脆弱性が公開された後すぐにゼロデイ脆弱性に対する保護を自動的に展開し、脆弱なアプリケーションをターゲットにして、誤検出のリスクを抑えることができるようにします。

### アプリ内 WAF がセキュリティトレースをブロックする方法 {#how-in-app-waf-blocks-security-traces}

130 以上のアプリ内 WAF ルールのそれぞれに提供される `monitoring` および `disabled` モードに加え、ルールには `blocking` モードもあります。各ルールは、ライブラリが疑わしいと判断する条件を受信リクエストに指定します。与えられたルールパターンが進行中の HTTP リクエストと一致すると、そのリクエストはライブラリによってブロックされます。

マネージドポリシーは、アプリ内 WAF ルールの各々がマッチング時に動作するモード (`monitoring`、`blocking`、または `disabled`) を定義します。AAP はアプリケーションの完全なコンテキストを把握しているため、どのルールを適用すれば誤検知の数を抑えながらアプリケーションを保護できるかを把握しています。

きめ細かい制御を行うために、Datadog が管理するポリシーを複製するか、カスタムポリシーを作成し、ニーズに合わせてモードを設定することができます。ポリシーを `auto-updating` に設定すると、Datadog が展開する最新の検出によってアプリケーションが保護されます。また、ポリシーをルールセットの特定のバージョンに固定するオプションもあります。

アプリ内 WAF ルールがモード間で切り替わるため、[Remote Configuration が有効][2] になっているサービスでは、ほぼリアルタイムで変更が反映されます。それ以外のサービスでは、[アプリ内 WAF ページ][9] でポリシーを更新し、[アプリ内 WAF ルールの定期][10] を行うことで、動作の変更が適用されます。

アプリ内 WAF を管理するには、{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9] に移動します。

[Trace Explorer][11] で、ファセット `Blocked:true` でフィルターをかけて、ブロックされたセキュリティトレースを表示します。

<!-- {{< img src="security/application_security/app_sec_blocked.png" alt="ファセット Blocked を true に設定してフィルターされた AAP Trace Explorer" style="width:100%;" >}} -->

### アプリ内 WAF を構成する {#configure-in-app-waf}

1. [**Remote Configuration を有効にする**][2] と、AAP が有効なサービスがアプリ内 WAF の下に表示されるようにします。これは、Datadog バックエンドからインフラストラクチャー内の SDK にアプリ内 WAF の構成を安全にプッシュするために必要です。

2. **AAP/Remote Configuration が有効なサービスをポリシーに関連付けます**。サービスで Remote Configuration が有効になったら、{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9] に移動します。サービスはデフォルトで _Datadog Monitoring-only_ ポリシーの下に表示されます。Datadog Monitoring-only はマネージドポリシーで、読み取り専用です。つまり、個々のルールのステータス (監視、ブロック、または無効) を変更することはできません。

   詳細な制御が必要な場合は、利用可能なポリシーのいずれかを複製して、ルールステータスを変更できるカスタムポリシーを作成します。1 つまたは複数のサービスをこのカスタムポリシーに関連付けます。

   デフォルトでサービスに適用されるポリシーを変更するには、デフォルトポリシーを更新します。アプリ内 WAF から、デフォルトとして設定するポリシーをクリックし、**アクション**>**このポリシーをデフォルトとして設定する**の順にクリックします。

## 保護動作のカスタマイズ {#customize-protection-behavior}

### ブロックされたリクエストへの対応をカスタマイズする {#customize-response-to-blocked-requests}

{{% asm-protection-page-configuration %}}

攻撃者に拒否ページを提供する際のデフォルトの HTTP レスポンスステータスコードは `403 FORBIDDEN` です。このレスポンスをカスタマイズするには、{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App Waf{{< /ui >}} > [{{< ui >}}Custom Responses{{< /ui >}}][16] に移動してください。

拒否ページが提供されるときにレスポンスコードを `200 OK` または `404 NOT FOUND` にオーバーライドすることで、攻撃者が検出されブロックされた事実をオプションで隠すことができます。

また、オプションで攻撃者をカスタム拒否ページにリダイレクトさせ、重要なサービスやインフラストラクチャーから遠ざけることができます。リダイレクト URL とリダイレクトの種類 (例: 永久 (`301` レスポンスコード) または一時 (`302` レスポンスコード)) を指定します。

### すべてのサービスで保護を無効にする (保護モードの無効化) {#disable-protection-across-all-services-disabling-protection-mode}

保護モードはデフォルトで**オン**になっており、これは**すべて**のサービスでブロックを素早く無効にするために使用できるトグルです。リクエストは Datadog の 2 つのセクションからブロックすることができます。つまり、セキュリティシグナルからのすべての攻撃者リクエストと、アプリ内 WAF からのセキュリティトレースです。

保護機能をきめ細かく適用し、正規のユーザーがブロックされる可能性を減らすことは重要ですが、**すべて**のサービスで**すべて**のブロックを素早く停止するためのシンプルなオフスイッチが必要な場合もあります。保護をオフにするには、{{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9] に移動し、**Allow Request Blocking** をオフに切り替えます。

[1]: /ja/security/application_security/setup/
[2]: /ja/tracing/guide/remote_config
[3]: /ja/agent/versions/upgrade_between_agent_minor_versions
[4]: /ja/security/application_security/how-it-works/add-user-info/#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[5]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&view=signal
[6]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[7]: https://app.datadoghq.com/security/appsec/denylist
[8]: https://app.datadoghq.com/security/appsec/passlist
[9]: https://app.datadoghq.com/security/appsec/in-app-waf
[10]: /ja/security/application_security/threat_protection/policies/inapp_waf_rules/
[11]: https://app.datadoghq.com/security/appsec/traces
[12]: /ja/security/application_security/setup/compatibility/
[14]: https://app.datadoghq.com/security/appsec/detection-rules
[15]: /ja/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[16]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-responses
[17]: https://docs.datadoghq.com/ja/actions/workflows/
[18]: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
[20]: /ja/security/application_security/threat_protection/security_signals/
[21]: /ja/help/