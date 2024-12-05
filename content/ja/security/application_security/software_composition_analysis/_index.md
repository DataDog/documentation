---
algolia:
  tags:
  - Software Composition Analysis
  - 収集データ
  - SCA
  - AVM
  - GuardDog
aliases:
- /ja/security/application_security/risk_management/
- /ja/security/application_security/vulnerability_management/
further_reading:
- link: /getting_started/application_security/software_composition_analysis
  tag: ガイド
  text: Software Composition Analysis を始める
- link: /security/application_security/code_security
  tag: ドキュメント
  text: サービスのコードセキュリティ脆弱性検出を有効にする
- link: /code_analysis/software_composition_analysis/
  tag: ドキュメント
  text: CI パイプラインで Software Composition Analysis をセットアップする
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: ブログ
  text: Datadog Software Composition Analysis でサードパーティライブラリの脆弱性を軽減する
- link: https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/
  tag: ブログ
  text: Application Vulnerability Management で本番環境のアプリケーションセキュリティを強化する
- link: https://securitylabs.datadoghq.com/articles/guarddog-identify-malicious-pypi-packages/
  tag: ブログ
  text: '静的コード分析によって悪意のある PyPI パッケージを発見する: GuardDog の紹介'
- link: https://www.datadoghq.com/blog/sca-prioritize-vulnerabilities/
  tag: ブログ
  text: Datadog SCA を使用した脆弱性修正の優先順位付け
title: Software Composition Analysis
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、Application Security Management はサポートされていません。</div>
{{< /site-region >}}

## 概要

Datadog Software Composition Analysis (SCA) は、オープンソースの利用を安心して進めるための支援を行います。SCA の機能には、脆弱性の検出、ビジネスリスク (ライブラリインベントリとライセンス情報)、サービス内のオープンソースライブラリの品質評価が含まれます。

Datadog SCA がユニークなのは、開発者がコミットするコードから、Datadog 上で実行中の本番アプリケーションに至るまで、ソフトウェア開発ライフサイクル全体をエンドツーエンドでカバーする点です。

Datadog SCA は、Open Source Vulnerabilities (OSV)、National Vulnerability Database (NVD)、GitHub アドバイザリ、その他の言語エコシステムアドバイザリなどから情報を収集した独自のデータベースを使用しています。さらに、Datadog のセキュリティリサーチチームが脆弱性やマルウェアの発見を評価しています。詳細については、[GuardDog][13] GitHub プロジェクトを参照してください。


各 ASM 製品の ASM 互換性を確認して、サービスがサポートされているかどうかをご確認ください。


## ライブラリインベントリ

Datadog SCA Library Inventory は、アプリケーションを構成するライブラリとそのバージョンを把握するために役立ちます。Library Explorer にアクセスするには、[**Security** > **Application Security** > **Catalog** > **Libraries**][8] に移動してください。

Datadog SCA はソフトウェア開発ライフサイクル全体をカバーしているため、ライブラリはアプリケーションのライフサイクルを通じて検出されます。ライブラリインベントリには、ライブラリ名やバージョン、その他のリスク面 (ライセンス、品質) など、ライブラリに関するすべての情報が含まれています。

{{< img src="/security/application_security/software_composition_analysis/asm_library_explorer.png" alt="ライブラリごとにグループ化されたライブラリの脆弱性を表示する Software Composition Analysis (SCA) Library Explorer ページ" style="width:100%;" >}}

## SCA 脆弱性の調査と管理

<div class="alert alert-info">Datadog Software Composition Analysis は、ソフトウェア開発ライフサイクル (SDLC) 全体にわたって脆弱なライブラリを検出できます。Application Security は、リポジトリのデフォルトブランチおよび実行中のサービスで検出された結果を要約します。異なるブランチやコミットで見つかった脆弱性については、<a href="/code_analysis/software_composition_analysis" target="_blank">Code Analysis</a> を参照してください。</div>

[Vulnerability Explorer][3] は、Datadog SCA によって検出されたオープンソースライブラリの完全なリストを表示し、それらに関連するセキュリティ脆弱性を報告します。

Datadog SCA は、サービスを分析するために 2 つの手法を活用します。

- リポジトリ内の静的コード分析 (静的視点)
- デプロイされたサービスのランタイム分析 (ランタイム視点)

これら 2 つの手法を組み合わせることで、コードリポジトリのコミット (静的視点) から本番環境で稼働するアプリケーション (ランタイム視点) まで、オープンソースライブラリをエンドツーエンドで監視します。

コードリポジトリのコミット視点に切り替えるには、**Static** を選択します。静的ビューでは、リポジトリ内の_ソースコード_の脆弱性が表示されます。

実行中のアプリケーションの_リアルタイム_視点に切り替えるには、**Runtime** を選択します。ランタイムビューは、Datadog が監視するサービスのライブビューです。

{{< img src="/security/application_security/software_composition_analysis/asm_sca_vulnerabilities.png" alt="脆弱性を静的またはランタイムでソートして表示している Software Composition Analysis (SCA) エクスプローラーページ。" style="width:100%;" >}}

特定の脆弱性を選択すると、影響を受けるサービス、重大度の内訳スコア、推奨される修復ステップなどの詳細が表示されます。

脆弱性の Details Explorer では、影響を受けるインフラストラクチャーを表示できます。このビューにより、全体的な攻撃リスクをより明確に把握することができます。

ASM 内では、脆弱性の重大度ベーススコアは、既存の攻撃と脆弱性が検出された環境のビジネス上の機密性に基づいて修正されます。例えば、本番環境が検出されない場合、重大度は低減されます。

調整後の脆弱性スコアは、各サービスの完全なコンテキストを含んでいます。

- 元の脆弱性の重大度
- 不審なリクエストの証拠
- 機密性の高い環境、インターネットに接続された環境

{{< img src="security/application_security/vulnerability-score-modified_3.png" alt="変更された重大度スコアを表示する脆弱性詳細ページ" style="width:100%;" >}}

調整後の脆弱性スコアの詳細については、[Software Composition Analysis を始める][7]を参照してください。

## 修復

Vulnerability Explorer では検出された脆弱性に対する改善勧告が提供されます。これらの勧告を使用して、脆弱性のステータスを変更したり、チームメンバーにレビューを依頼したり、追跡のために Jira 課題を作成したりすることができます。また、各脆弱性の背景を理解するのに役立つ Web サイトや情報源へのリンクや参考資料も含まれています。

**注**: SCA の脆弱性の Jira 課題を作成するには、Jira インテグレーションを構成し、 `manage_integrations` 権限を持っている必要があります。詳細な手順については、[Jira インテグレーション][11]のドキュメント、および[ロールベースのアクセス制御][10]のドキュメントを参照してください。

{{< img src="getting_started/appsec/appsec-vuln-remediation_3.png" alt="Application Vulnerability Management の脆弱性の詳細ページでは、影響を受けるサービス、インフラストラクチャーへのリンク、推奨される改善策、および詳細情報へのリンクが表示されます。" style="width:100%;" >}}

## Software Composition Analysis を構成する

Software Composition Analysis (SCA) には、[Code Analysis][9] を使って CI パイプラインの脆弱性をスキャンできる機能が追加されています。SCA for Code Analysis を使えば、コードベースにインポートされた脆弱なオープンソースライブラリを特定することができます。

CI パイプラインで脆弱性を構成するには、[Security -> Application Security -> Settings][12] に移動します。

**Software Composition Analysis (SCA)** で、**Get Started** をクリックして Software Composition Analysis を有効にし、リポジトリとサービスを選択します。

より詳細な手順については、[Software Composition Analysis を始める][7]を参照してください。

## APM ビューにおけるリスク情報

Software Composition Analysis は、APM がすでに収集している情報をリッチ化し、現在の脆弱性勧告と一致するライブラリにフラグを立てます。潜在的に脆弱なサービスは、[APM サービスカタログ][2]に組み込まれた **Security** ビューで直接ハイライト表示されます。

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="APM サービスカタログに表示される脆弱性情報" style="width:100%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: https://app.datadoghq.com/services?lens=Security
[3]: https://app.datadoghq.com/security/appsec/vm
[4]: https://app.datadoghq.com/security/appsec
[5]: https://app.datadoghq.com/security/appsec/landing
[7]: /ja/getting_started/application_security/software_composition_analysis
[8]: https://app.datadoghq.com/security/appsec/inventory/libraries
[9]: /ja/code_analysis/software_composition_analysis/setup/?tab=githubactions
[10]: /ja/account_management/rbac/permissions/#integrations
[11]: /ja/integrations/jira/
[12]: https://app.datadoghq.com/security/configuration/asm/setup
[13]: https://github.com/DataDog/guarddog
