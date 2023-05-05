---
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Datadog による Application Security Management
is_beta: true
kind: documentation
title: 保護
---

<div class="alert alert-info"><strong>ベータ版: IP ブロッキング、ユーザーブロッキング、不審リクエストブロッキング (アプリ内 WAF)</strong><br>
サービスが<a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン</a>を実行している場合、Agent やトレーシングライブラリの追加構成なしで Datadog UI から攻撃と攻撃者をブロックすることができます。</div>

## 概要

Application Security Management (ASM) Protect は、攻撃や攻撃者を_ブロック_することでその速度を落とすことを可能にします。不審リクエストは、Datadog のトレーシングライブラリによってリアルタイムでブロックされます。ブロックは Datadog プラットフォームに保存され、Datadog Agent によって自動的かつ安全にフェッチされ、インフラストラクチャーにデプロイされ、サービスに適用されます。


## 前提条件

サービスに保護機能を活用するには

- [Datadog Agent][3] をバージョン 7.41.1 以上に更新します。
- [ASM を有効にします][1]。
- [リモート構成を有効にします][2]。
- トレーシングライブラリを、保護とサポートされる機能を有効にするために必要な適切な最小バージョンに更新します。

  |                        | Java      | .NET      | NodeJS    | Go        | Python    | PHP       |
  | ---------------------- | --------- | --------- | --------- | --------- | --------- | --------- |
  | トレーサーの最小バージョン | 1.9.0     | 2.26.0    | 3.15.0    | 1.48.0    | 1.10.0     | 0.86.0    |
  | IP ブロッキング対応    | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
  | ユーザーブロッキング対応  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
  | 不審リクエストブロッキング (アプリ内 WAF) |  {{< X >}} |  {{< X >}} |       |       | {{< X >}} | {{< X >}} |

- 認証ユーザーブロッキングを使用する場合は、[トレースにユーザー情報を追加][4]します。

## IP とユーザーをブロックする

ASM [セキュリティシグナル][5]でフラグが立てられた攻撃者を一時的または恒久的にブロックすることができます。シグナルエクスプローラでシグナルをクリックすると、そのシグナルを生成しているユーザーと IP アドレスが表示され、オプションでそれらをブロックすることができます。

{{< img src="/security/application_security/appsec-block-user-ip.png" alt="Datadog ASM のセキュリティシグナルパネルで、攻撃者の IP をブロックすることができます" width="75%">}}


そこから、ASM によって保護されているすべてのサービスは、指定された期間、ブロックされた IP またはユーザーによって実行される着信リクエストをブロックします。ブロックされたすべてのトレースには `security_response.block_ip` または `security_response.block_user` というタグが付けられ、[トレースエクスプローラー][6]に表示されます。ASM が無効になっているサービスは保護されません。

## Denylist

永久的または一時的にブロックされた攻撃者の IP アドレスや認証ユーザーは、_Denylist_ に追加されます。[Denylist ページ][7]でリストを管理します。

## Passlist

_Passlist_ を使用すると、ある IP アドレスまたはアドレスの範囲に対して、アプリケーションへのアクセスを恒久的に許可することができます。例えば、内部 IP アドレスや、アプリケーションのセキュリティ監査を定期的に実行する IP アドレスを Passlist に追加することができます。また、特定のパスを追加して、中断のないアクセスを確保することもできます。[Passlist ページ][8]からリストを管理します。

## アプリ内 WAF で不審リクエストをブロックする

ASM アプリ内 WAF (Web アプリケーションファイアウォール) は、境界ベースの WAF の検出技術と Datadog が提供する豊富なコンテキストを組み合わせ、チームが自信を持ってシステムを保護できるようにします。

ASM はアプリケーションのルートを認識しているため、保護は特定のサービスに対してきめ細かく適用でき、必ずしもすべてのアプリケーションとトラフィックに適用する必要はありません。このコンテキストに基づく効率化により、検査の労力が軽減され、境界型 WAF と比較して誤検出率が低下します。ほとんどの Web フレームワークが構造化された経路のマップを提供するため、学習期間はありません。ASM は、脆弱性が公開された後すぐにゼロデイ脆弱性に対する保護を自動的に展開し、脆弱なアプリケーションをターゲットにして、誤検出のリスクを抑えることができるようにします。

### アプリ内 WAF が不審リクエストをブロックする仕組み

130 以上のアプリ内 WAF ルールのそれぞれに提供される `monitoring` および `disabled` モードに加え、ルールには `blocking` モードもあります。各ルールは、ライブラリが疑わしいと判断する条件を受信リクエストに指定します。与えられたルールパターンが進行中の HTTP リクエストにマッチすると、そのリクエストはライブラリによってブロックされます。

マネージドポリシーは、アプリ内 WAF ルールの各々がマッチング時に動作するモードを定義します。`monitoring`、`blocking`、`disabled` のいずれかです。ASM はアプリケーションの完全なコンテキストを把握しているため、どのルールを適用すれば誤検知の数を抑えながらアプリケーションを保護できるかを把握しています。

きめ細かい制御を行うには、Datadog が管理するポリシーを複製するか、カスタムポリシーを作成し、ニーズに合わせてモードを設定することができます。ポリシーを `auto-updating` に設定すると、Datadog が展開する最新の検出によってアプリケーションが保護されます。また、ポリシーをルールセットの特定のバージョンに固定するオプションもあります。

アプリ内 WAF ルールがモード間で切り替わるため、[リモート構成が有効][2]のサービスでは、ほぼリアルタイムで変更が反映されます。それ以外のサービスでは、[アプリ内 WAF ページ][9]でポリシーを更新し、[アプリ内 WAF ルールの定義][10]を行うことで、動作の変更が適用されます。

Security --> Application Security --> Configuration --> [In-App WAF][9] と進み、アプリ内 WAF を管理します。

[トレースエクスプローラー][11]で、ファセット `Blocked:true` でフィルターをかけて、ブロックされた不審リクエストを表示します。

{{< img src="security/application_security/blocked-true.png" alt="ファセット Blocked を true に設定してフィルターされた ASM トレースエクスプローラー。" style="width:100%;" >}}

## 保護動作のカスタマイズ

### ブロックされたリクエストへの対応をカスタマイズする

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="ASM がブロックされた IP からのリクエストをブロックする際に表示されるページ" width="75%" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/enabling/
[2]: /ja/agent/guide/how_remote_config_works/
[3]: /ja/agent/versions/upgrade_between_agent_minor_versions
[4]: /ja/security/application_security/threats/add-user-info/#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[5]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal
[6]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[7]: https://app.datadoghq.com/security/appsec/denylist
[8]: https://app.datadoghq.com/security/appsec/passlist
[9]: https://app.datadoghq.com/security/appsec/in-app-waf
[10]: /ja/security/application_security/threats/inapp_waf_rules/
[11]: https://app.datadoghq.com/security/appsec/traces