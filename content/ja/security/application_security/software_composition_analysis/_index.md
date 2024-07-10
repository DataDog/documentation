---
algolia:
  tags:
  - Software Composition Analysis
  - 収集データ
  - SCA
  - AVM
aliases:
- /ja/security/application_security/risk_management/
- /ja/security/application_security/vulnerability_management/
further_reading:
- link: /getting_started/application_security/software_composition_analysis
  tag: ガイド
  text: Software Composition Analysis を始める
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: ブログ
  text: Datadog Software Composition Analysis でサードパーティライブラリの脆弱性を軽減する
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: ブログ
  text: Application Vulnerability Management で本番環境のアプリケーションセキュリティを強化する
- link: /security/application_security/code_security
  tag: ドキュメント
  text: サービスのコードセキュリティ脆弱性検出を有効にする
- link: /code_analysis/software_composition_analysis/
  tag: ドキュメント
  text: CI パイプラインで Software Composition Analysis をセットアップする
title: Software Composition Analysis
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Application Security Management はサポートされていません。</div>
{{< /site-region >}}

## 概要

Datadog Software Composition Analysis (SCA) は、オープンソースを自信を持って活用できるようにサポートします。SCA の機能には、脆弱性の検出、ビジネスリスク (ライブラリのインベントリとライセンス情報)、サービス内のオープンソースライブラリの品質評価などがあります。Datadog SCA を特徴付ける主要な差別化要因は、開発者がコミットするコードから、既に Datadog デプロイメントで実行中の本番アプリケーションに至るまで、ソフトウェア開発ライフサイクル全体をエンドツーエンドでカバーすることです。

[ASM の互換性][6]を確認し、ご利用のサービスが対応しているかどうかをご確認ください。

## ライブラリインベントリ

Datadog SCA ライブラリインベントリは、アプリケーションを構成するライブラリとそのバージョンのリストを把握するのに役立ちます。ライブラリエクスプローラー にアクセスするには、[**Security** > **Application Security** > **Catalog** > **Library Explorer**][8] に移動します。

Datadog SCA がソフトウェア開発ライフサイクルを始めから終わりまでカバーしているため、アプリケーションのライフサイクル全体にわたってライブラリが検出されます。ライブラリインベントリには、ライブラリの名前やバージョン、さらにライセンスや品質といったリスク要因に関する必要なすべての情報が含まれています。

{{< img src="/security/application_security/software_composition_analysis/asm_library_explorer.png" alt="ライブラリの脆弱性をライブラリごとに分類して表示している Software Composition Analysis (SCA) のライブラリエクスプローラーページ。" style="width:100%;" >}}

## SCA の脆弱性の調査と管理

[Vulnerability Explorer][3] は、Datadog SCA が検出したオープンソースライブラリの完全なリストを表示し、それらに関連するセキュリティ脆弱性をレポートします。Datadog SCA は、サービスを分析するために、リポジトリの静的コード分析 (静的視点) と、デプロイされたサービスのランタイム分析 (ランタイム視点) という 2 つの手法を活用します。この 2 つの技術を組み合わせることで、オープンソースライブラリは、リポジトリへのコードコミット (静的視点) から本番環境で実行されるアプリケーション (ランタイム視点) まで、エンドツーエンドで監視されます。

コードリポジトリのコミット視点に切り替えるには、**Static** ボタンをクリックします。静的ビューでは、リポジトリ内の_ソースコード_からの脆弱性が表示されます。すでに実行中のアプリケーションの_リアルタイム_視点に切り替えるには、**Runtime** ボタンをクリックします。ランタイムビューは、Datadog によって監視されているサービスのライブビューです。

{{< img src="/security/application_security/software_composition_analysis/asm_sca_vulnerabilities_2.png" alt="脆弱性を静的またはランタイムでソートして表示している Software Composition Analysis (SCA) エクスプローラーページ。" style="width:100%;" >}}

特定の脆弱性を選択すると、影響を受けるサービス、重大度の内訳スコア、推奨される修復ステップなどの詳細を確認できます。Details Explorer では、影響を受けるインフラストラクチャーを表示し、全体的な攻撃エクスポー ジャーをより深く理解することもできます。

ASM 内では、脆弱性の重大度は、攻撃の有無や脆弱性が検出された環境のビジネス上の機密性を考慮し、基本スコアから修正されます。例えば、本番環境が検出されない場合は、重大度が軽減されます。

調整後の脆弱性スコアは、各サービスの完全なコンテキストを含んでいます。

- 元の脆弱性の重大度
- 不審なリクエストの証拠
- 機密性の高い環境、インターネットに接続された環境

{{< img src="security/application_security/vulnerability-score-modified_3.png" alt="変更された重大度スコアを表示する脆弱性詳細ページ" style="width:100%;" >}}

調整後の脆弱性スコアの詳細については、[Software Composition Analysis を始める][7]を参照してください。

## 修復

Vulnerability Explorerでは検出された脆弱性に対する改善勧告が表示され、脆弱性のステータスを変更したり、チームメンバーに割り当てて検討させたり、追跡のために Jira 課題を作成したりすることができます。また、各脆弱性の背景を理解するのに役立つ Web サイトや情報源へのリンクやリファレンスのコレクションも含まれています。

**注**: SCA の脆弱性の Jira 課題を作成するには、Jira インテグレーションを構成し、 `manage_integrations` 権限を持っている必要があります。詳細な手順については、[Jira インテグレーション][11]のドキュメント、および[ロールベースのアクセス制御][10]のドキュメントを参照してください。

{{< img src="getting_started/appsec/appsec-vuln-remediation_3.png" alt="Application Vulnerability Management の脆弱性の詳細ページでは、影響を受けるサービス、インフラストラクチャーへのリンク、推奨される改善策、および詳細情報へのリンクが表示されます。" style="width:100%;" >}}

## Code Analysis の構成

{{< callout url="#" btn_hidden="true" header="ベータ版をお試しください！" >}}
Code Analysis は公開ベータ版です。
{{< /callout >}}

Software Composition Analysis には、[Code Analysis][9] を使って CI パイプラインの脆弱性をスキャンできる機能が追加されています。SCA for Code Analysis を使えば、コードベースにインポートされた脆弱なオープンソースライブラリを特定することができます。

CI パイプラインで脆弱性を構成するには、[Security -> Configuration -> Application Security -> Setup][12] に移動します。
**Get Started** をクリックして、ソースコードの Static Analysis のための Software Composition Analysis を有効にし、CI/CD プロバイダを選択して構成します。

より詳細な手順については、[Software Composition Analysis を始める][7]を参照してください。

{{< img src="getting_started/appsec/asm_sca_ci_setup.png" alt="CI セットアップを示す Software Composition Analysis のセットアップページ。" style="width:100%;" >}}

## APM ビューにおけるリスク情報

Software Composition Analysis は、APM がすでに収集している情報をリッチ化し、現在の脆弱性勧告と一致するライブラリにフラグを立てます。潜在的に脆弱なサービスは、[APM サービスカタログ][2]に組み込まれた **Security** ビューで直接ハイライト表示されます。

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="APM サービスカタログに表示される脆弱性情報" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: https://app.datadoghq.com/services?lens=Security
[3]: https://app.datadoghq.com/security/appsec/vm
[4]: https://app.datadoghq.com/security/appsec
[5]: https://app.datadoghq.com/security/appsec/landing
[6]: /ja/security/application_security/enabling/compatibility
[7]: /ja/getting_started/application_security/software_composition_analysis
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /ja/code_analysis/software_composition_analysis/setup/?tab=githubactions
[10]: /ja/account_management/rbac/permissions/#integrations
[11]: /ja/integrations/jira/
[12]: https://app.datadoghq.com/security/configuration/asm/setup