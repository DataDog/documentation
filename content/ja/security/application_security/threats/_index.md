---
further_reading:
- link: /security/application_security/how-it-works/add-user-info/
  tag: ドキュメント
  text: ユーザーアクティビティの追跡
- link: /security/application_security/threats/library_configuration/
  tag: ドキュメント
  text: AAP のセットアップを構成する
- link: /security/code_security/software_composition_analysis/
  tag: ドキュメント
  text: Software Composition Analysis
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: AAP の仕組み
title: App and API Protection
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App and API Protection is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Datadog の App and API Protection (AAP) は、Web アプリケーションと API を、以下を含む幅広いセキュリティ脅威から保護します:

- エクスプロイトの試み
- アプリケーションの悪用および詐欺
- API の悪用

Datadog プラットフォームに統合された App and API Protection は、Datadog の広範なオブザーバビリティ データ (ログとトレース) を活用して、単一のプラットフォーム上でフル スタックの可視性とセキュリティを提供します。 

App and API Protection は、チームが脅威を迅速に特定して対処できるようにします。その主な特長は、セキュリティと DevOps の間の隔たりを埋め、開発、セキュリティ、運用の各チームの連携を促進する点です。

## ユースケース

Datadog App and API Protection が一般的なユースケースにどのように役立つかをご覧ください:

| 実現したいこと    | Datadog AAP の活用方法 |
| ----------- | ----------- |
| **Web アプリケーションの保護:** SQL インジェクション、サーバー サイド リクエスト フォージェリー、ローカル ファイル インクルージョンなどの脆弱性悪用を防止します。 | サービス上で [Exploit Prevention][9] を有効にします。App and API Protection はエクスプロイトをリアルタイムでブロックし、さらなる調査のためのシグナルを生成します。|
| **アプリケーションと API の悪用:** クレデンシャル スタッフィングやアカウント 乗っ取り攻撃などの不正利用から、アプリケーションと API を保護します。| [標準提供の検出ルール][10] を活用して、単一の IP からの異常なアカウント作成やパスワード リセット、または分散型のクレデンシャル スタッフィング キャンペーンに関する通知を受け取れます。[標準提供のアカウント 乗っ取り防止機能][11] の利点も確認してください。|
| **API セキュリティ:** 組織の API について学び、優先順位付けされた API エンドポイントのリストを使用して、リスクを軽減するために必要な態勢と対策を理解できます。| App and API Protection:</br> - すべての API エンドポイントのインベントリを作成します。</br> - API の悪用を含め、API トラフィックを可視化します。</br> - API エンドポイント全体のリスクを浮き彫りにします (例: 機密データを処理する脆弱なエンドポイントや認証されていないエンドポイントなど) 。|

## セキュリティシグナル

Threat Monitoring によって生成されたセキュリティ シグナルは要約され、サービスの健全性やパフォーマンスを確認する際に普段参照するビューに表示されます。[Software Catalog][1] と APM の各サービス ページでは、アプリケーションの脅威シグナルに関するインサイトが得られるため、脆弱性を調査し、攻撃者をブロックし、攻撃への露出状況を確認できます。

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="脅威シグナルを表示するサービスを含む Software Catalog" style="width:100%;" >}}

App and API Protection の仕組みについての詳細は、[AAP の仕組み][4]をご覧ください。


## 脅威シグナルを探る

サービスの脅威データが Datadog に取り込まれると、[AAP Overview][7] に発生内容の概要が表示されます。ここでは、脆弱性検出の有効化、攻撃のレビュー、アラートとレポートのカスタマイズ、サービスの AAP の有効化を行うことができます。疑わしいアクティビティのシグナルを調査するには、サービスの **Review** リンクをクリックします。

[シグナルエクスプローラー][2]では、属性やファセットでフィルターをかけて重要な脅威を見つけます。シグナルをクリックすると、ユーザー情報や IP アドレス、トリガーしたルール、攻撃フロー、関連するトレースやその他のセキュリティシグナルなど、シグナルの詳細を確認できます。このページから、クリックしてケースを作成し、インシデントを宣言することもできます。詳しくは[セキュリティシグナルの調査][8]を参照してください。

{{< img src="security/application_security/threats/appsec-threat-overview.png" alt="シグナルエクスプローラーでの脅威の調査の概要">}}


## 攻撃パターンを特定するための In-App WAF ルールの作成

AAP に付属するデフォルト ルールを補完するために、アプリケーションで何を疑わしい動作と見なすかを定義する [In-App WAF ルールを作成][5]できます。続いて、これらのルールで検出された攻撃試行からセキュリティ シグナルを生成するよう [カスタム ルールを指定][6] し、Threat Monitoring ビューで調査できるようにします。

## AAP Protect で攻撃と攻撃者の動きを鈍らせる

{{% asm-protect %}}

## 脅威管理と保護を無効にする

脅威管理と保護を無効化する方法の詳細については、[脅威管理と保護の無効化][12]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /ja/security/application_security/how-it-works/
[5]: /ja/security/application_security/threats/inapp_waf_rules/
[6]: /ja/security/application_security/policies/custom_rules/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /ja/security/workload_protection/security_signals/
[9]: /ja/security/application_security/exploit-prevention/
[10]: /ja/security/default_rules/?category=cat-application-security
[11]: /ja/security/account_takeover_protection/
[12]: /ja/security/application_security/troubleshooting/#disabling-threat-management-and-protection