---
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Datadog の App and API Protection
is_beta: true
title: 保護
---

## 概要

[リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン][2]を実行しているサービスであれば、Agent やトレーシングライブラリの追加構成なしに、Datadog UI から攻撃やアタッカーをブロックすることができます。

App and API Protection (AAP) の Protect は、攻撃や攻撃者を _ブロック_ することで、攻撃の継続や被害の拡大を抑える機能です。セキュリティ トレースは Datadog のトレーシング ライブラリによってリアル タイムでブロックされます。ブロック ルールは Datadog プラットフォームに保存され、Datadog Agent が自動的かつ安全に取得してインフラへデプロイし、サービスへ適用します。

## 前提条件

サービスで保護機能を利用するには、次を行います。

- [Datadog Agent][3] をバージョン 7.41.1 以上に更新します。
- [AAP を有効にします][1]。
- [リモート構成を有効にします][2]。
- トレーシング ライブラリを、保護機能を有効化できる最小バージョン以上へ更新します。詳細は、対象言語の [互換性][12] にある「AAP capabilities support」セクションを参照してください。
- 認証ユーザーブロッキングを使用する場合は、[トレースにユーザー情報を追加][4]します。

## 攻撃者 (IP および認証ユーザー) のブロック

AAP の [Security Signals][5] でフラグが立った攻撃者は、一時的または恒久的にブロックできます。Signals Explorer でシグナルを開くと、そのシグナルを発生させているユーザーと IP アドレスを確認でき、必要に応じてブロックできます。

以降、AAP で保護されているすべてのサービスが、指定した期間、ブロック対象の IP またはユーザーからの受信リクエストを遮断します。ブロックされたトレースには `security_response.block_ip` または `security_response.block_user` がタグ付けされ、[Trace Explorer][6] に表示されます。AAP を無効にしているサービスは保護されません。詳細は [Security Signals を調査する][20] を参照してください。

## 攻撃者ブロックの自動化により、脅威へのリアルタイムな対応を実現

手動ブロックに加えて、自動化ルールを設定し、Security Signals でフラグが立った攻撃者を AAP が自動的にブロックするようにできます。

開始するには、**Security > App and API Protection > Protection > [Detection Rules][14]** に移動します。タイプが _App and API Protection_ の新しいルールを作成するか、既存ルールを編集します。たとえば、クレデンシャル スタッフィング (Credential Stuffing) 攻撃を検知した際に重大度 `Critical` のシグナルを発火させ、関連する攻撃者の IP アドレスを 30 分間自動的にブロックする、といったルールを作成できます。

**注**: 認証された攻撃者をブロックできるようにするには、サービスをインスツルメンテーションする必要があります。詳しくは、[ユーザーの監視と保護][15]をご覧ください。

## 境界で攻撃者をブロックする - 既存の WAF デプロイに AAP を統合

Datadog AAP は、Security Signal から直接、境界で攻撃者をブロックできるようにします。AAP は [Workflows][17] と統合し、攻撃者の IP アドレスを境界の Web アプリケーション ファイアウォール (AWS WAF, Cloudflare, Fastly) へ連携します。これにより、攻撃者からのリクエストを、顧客環境に入る前のエッジで遮断できます。
利用可能な [blueprints][18] からワーク フローを作成し、AAP の Signal サイド パネルから直接実行できます。

## Denylist

永久的または一時的にブロックされた攻撃者の IP アドレスや認証ユーザーは、_Denylist_ に追加されます。[Denylist ページ][7]でリストを管理します。Denylist は、個別 IP だけではなく IP 範囲 (CIDR ブロック) のブロックもサポートしています。

## Passlist

_Passlist_ を使用すると、特定の IP アドレスに対して、アプリケーションへのアクセスを恒久的に許可することができます。例えば、内部 IP アドレスや、アプリケーションのセキュリティ監査を定期的に実行する IP アドレスを Passlist に追加することができます。また、特定のパスを追加して、中断のないアクセスを確保することもできます。[Passlist ページ][8]からリストを管理します。

## アプリ内 WAF による攻撃試行のブロック

AAP の In-App WAF (Web アプリケーション ファイアウォール) は、境界型 WAF の検知手法と Datadog が提供する豊富なコンテキストを組み合わせ、チームが自信を持ってシステムを保護できるよう支援します。

AAP はアプリケーションのルートを把握しているため、保護を特定のサービスにきめ細かく適用でき、すべてのアプリケーションやトラフィックに一律適用する必要はありません。この効率性により検査の負荷を抑えつつ、境界 WAF と比べて誤検知も減らせます。多くの Web フレームワークはルートが構造化されているため、学習期間は不要です。脆弱性が公表された直後から、AAP はゼロ デイ脆弱性への保護を自動展開できます。対象を脆弱なアプリケーションに絞れるため、誤検知のリスクも抑えられます。

### In-App WAF がセキュリティ トレースをブロックする仕組み

130 以上のアプリ内 WAF ルールのそれぞれに提供される `monitoring` および `disabled` モードに加え、ルールには `blocking` モードもあります。各ルールは、ライブラリが疑わしいと判断する条件を受信リクエストに指定します。与えられたルールパターンが進行中の HTTP リクエストにマッチすると、そのリクエストはライブラリによってブロックされます。

マネージド ポリシーでは、In-App WAF の各ルールが一致したときの動作モードを定義します。利用できるモードは `monitoring`、`blocking`、`disabled` です。アプリケーション全体のコンテキストを把握できるため、AAP は誤検知を抑えながら、保護に必要なルールを選んで適用します。

きめ細かい制御を行うには、Datadog が管理するポリシーを複製するか、カスタムポリシーを作成し、ニーズに合わせてモードを設定することができます。ポリシーを `auto-updating` に設定すると、Datadog が展開する最新の検出によってアプリケーションが保護されます。また、ポリシーをルールセットの特定のバージョンに固定するオプションもあります。

アプリ内 WAF ルールがモード間で切り替わるため、[リモート構成が有効][2]のサービスでは、ほぼリアルタイムで変更が反映されます。それ以外のサービスでは、[アプリ内 WAF ページ][9]でポリシーを更新し、[アプリ内 WAF ルールの定義][10]を行うことで、動作の変更が適用されます。

In-App WAF の管理は、Security --> App and API Protection --> Configuration --> [In-App WAF][9] から行えます。

[トレースエクスプローラー][11]で、ファセット `Blocked:true` でフィルターをかけて、ブロックされたセキュリティトレースを表示します。

{{< img src="security/application_security/app_sec_blocked.png" alt="ファセット Blocked を true に設定してフィルタリングした AAP Trace Explorer。" style="width:100%;" >}}

### アプリ内 WAF の構成

1. [**Enable Remote Configuration**][2] を有効にして、AAP を有効化したサービスが In-App WAF に表示されるようにします。これは、Datadog バックエンドからインフラ内のトレーシング ライブラリへ In-App WAF の設定を安全にプッシュするために必須です。

2. **AAP/Remote Configuration を有効化したサービスをポリシーに関連付ける**。サービスで Remote Configuration を有効にしたら、**Security > App and API Protection > Protection > [In-App WAF][9]** に移動します。サービスは既定で _Datadog Monitoring-only_ ポリシー配下に表示されます。Datadog Monitoring-only はマネージド ポリシーで読み取り専用のため、個々のルールのステータス (monitoring, blocking, disabled) は変更できません。

   より細かな制御が必要な場合は、利用可能なポリシーのいずれかをクローンして、ルール ステータスを変更できるカスタム ポリシーを作成します。そのカスタム ポリシーに 1 つ以上のサービスを関連付けてください。

   既定で適用されるポリシーを変更したい場合は、デフォルト ポリシーを更新できます。In-App-WAF で既定にしたいポリシーをクリックし、**Actions** > **Set this policy as default** をクリックします。

## 保護動作のカスタマイズ

### ブロックされたリクエストへの対応をカスタマイズする

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="ブロックされた IP からのリクエストを AAP が遮断した場合に表示されるページ" width="75%" >}}

攻撃者に拒否ページを返す際の既定の HTTP レスポンス ステータス コードは `403 FORBIDDEN` です。レスポンスをカスタマイズするには、**Security > App and API Protection > Protection > In-App Waf > [Custom Responses][16]** に移動します。

拒否ページが提供されるときにレスポンスコードを `200 OK` または `404 NOT FOUND` にオーバーライドすることで、攻撃者が検出されブロックされた事実をオプションで隠すことができます。

また、オプションで攻撃者をカスタム拒否ページにリダイレクトさせ、重要なサービスやインフラストラクチャーから遠ざけることができます。リダイレクト URL とリダイレクトの種類 (例: 永久 (`301` レスポンスコード) または一時 (`302` レスポンスコード)) を指定します。

### すべてのサービスで保護を無効にする (保護モードの無効化)

Protection mode は既定で **on** になっており、**すべて** のサービスに対するブロックを一括で素早く無効化できるトグルです。ブロックは Datadog の次の 2 つの場所から実行できます。
Security Signals: 攻撃者からのリクエスト (すべて)
In-App WAF: セキュリティ トレース

保護をきめ細かく適用して正当なユーザーがブロックされる可能性を下げることは重要ですが、状況によっては、**すべて** のサービスでの **すべて** のブロックをすぐ止められるシンプルなオフ スイッチが必要になります。保護をオフにするには、**Security > App and API Protection > Protection > [In-App WAF][9]** に移動し、**Allow Request Blocking** を off に切り替えます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/
[2]: /ja/agent/remote_config/#enabling-remote-configuration
[3]: /ja/agent/versions/upgrade_between_agent_minor_versions
[4]: /ja/security/application_security/how-it-works/add-user-info/#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[5]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal
[6]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[7]: https://app.datadoghq.com/security/appsec/denylist
[8]: https://app.datadoghq.com/security/appsec/passlist
[9]: https://app.datadoghq.com/security/appsec/in-app-waf
[10]: /ja/security/application_security/threats/inapp_waf_rules/
[11]: https://app.datadoghq.com/security/appsec/traces
[12]: /ja/security/application_security/setup/compatibility/
[14]: https://app.datadoghq.com/security/appsec/detection-rules
[15]: /ja/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[16]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-responses
[17]: https://docs.datadoghq.com/ja/service_management/workflows/
[18]: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
[20]: /ja/security/application_security/threats/security_signals/