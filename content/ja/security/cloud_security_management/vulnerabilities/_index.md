---
aliases:
- /ja/security/infrastructure_vulnerabilities/
- /ja/security/vulnerabilities/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: ドキュメント
  text: CSM Vulnerabilities で SBOM 収集を有効化する
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: ドキュメント
  text: ホストの脆弱性のセットアップ
- link: /infrastructure/containers/container_images
  tag: ドキュメント
  text: コンテナイメージの表示
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: ドキュメント
  text: CSM Vulnerabilities のトラブルシューティング
- link: https://www.datadoghq.com/blog/csm-vulnerability-management/
  tag: ブログ
  text: Datadog Cloud Security Management でインフラストラクチャーの脆弱性を軽減
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: ブログ
  text: Datadog Container Monitoring のコンテナイメージによるトラブルシューティングワークフローの強化
title: Cloud Security Management Vulnerabilities
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">選択している <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、Cloud Security Management Vulnerabilities がプレビュー段階です。
<a href="https://www.datadoghq.com/product-preview/csm-vulnerability-management-govcloud/">こちらのフォーム</a>に入力し、アクセスをリクエストしてください。 </div>
{{< /site-region >}} 

## 概要

Cloud Security Management Vulnerabilities (CSM Vulnerabilities) は、CI/CD パイプラインから本番環境まで、コンテナイメージ、ホスト、ホストイメージ、およびサーバーレス関数を継続的にスキャンして脆弱性を検出し、セキュリティ体制を強化し、コンプライアンスを達成するのに役立ちます。ランタイムでの可観測性を活用し、日々のワークフローの中で悪用可能な脆弱性を優先的に特定・修正できるよう支援します。すべてを単一のビューで把握でき、他の Datadog 製品への依存は必要ありません。

CSM Vulnerabilities を使用すると、クラウドセキュリティ管理戦略を 1 つの場所で管理できます。

- CI/CD パイプラインから本番環境リソースまでを対象とした脆弱性管理プログラムを作成
- SOC2、PCI、HIPAA、CIS、FedRamp などのコンプライアンス監査に合格
- 新たに発生する脆弱性 (ゼロデイ CVE など) を修正

**注**: アプリケーションライブラリにおける脆弱性管理については [Software Composition Analysis][5] を、アプリケーションコードについては [Code Security][10] を参照してください。

## 主な機能

エージェントレスまたは統合 Datadog Agent を使用してデプロイ
: すでに導入済みの統合 Datadog Agent を利用するか、エージェントレスでインフラストラクチャー全体をすばやくスキャンし、脆弱性を検出できます。

クラウドリソースをリアルタイムでインベントリ収集
: コンテナイメージ、ホスト、サーバーレス関数、そしてインフラストラクチャーで稼働しているすべてのパッケージをリアルタイムでインベントリし、SBOM をエクスポートできます。

脆弱性を継続的に検出
: 稼働中のコンテナイメージ、ホスト、ホストイメージ、サーバーレスで発生する新規の変更や新たに公開された CVE をスキャンし、脆弱なコンテナイメージレイヤーを特定します。

ランタイムの可観測性を利用して悪用可能な脆弱性を優先順位付け
: CVSS をベースにした Datadog 独自のセキュリティスコアを活用し、CISA KEV、EPSS、公開されているエクスプロイト情報などを組み合わせてリスクを評価します。ランタイムの可観測性を活用することで、本番稼働状況、攻撃への露出度、機密データの処理状況、特権アクセスの有無などを把握できます。

ガイド付きの修正を活用
: どのレイヤーが影響を受けているかを確認し、各イメージに固有の修正方法を提案。脆弱性ライフサイクル管理のアクションに繋げられます。

自動化とインテグレーションを実装
: Jira チケット作成の自動化や SLA の導入が可能です。Datadog のパブリック API を活用して脆弱性情報、カバレッジ、SBOM などをエクスポートできます。

レポートを参照
: ダッシュボードで脆弱性情報を可視化・監視できます。

## デプロイ方法

数分以内に CSM Vulnerabilities を導入し、インフラストラクチャーを網羅するには以下を参照してください。
- [Agentless Scanning][11][Agentless Scanning][11]
- [Unified Datadog Agent][12]

両方を併用することも可能です。既に統合 Datadog Agent を導入している場所で Agent を使い、その他の場所ではエージェントレスを利用できます。

有効化後、Datadog はリソースを継続的にスキャンし、約 1 時間以内に [CSM Vulnerability Explorer][1] 上で優先度の高い脆弱性を報告し始めます。

どのソリューションを選択すべきか (比較表)
| 機能                                   | エージェントレス                                     | 統合 Datadog Agent          |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| インフラストラクチャー全体への導入に要する時間 | 数分                                       | 数時間～数週間                 |
| 脆弱性の優先順位付け              | 対応                                           | ランタイム情報を活用して優先度を算定      |
| 脆弱性スキャンの頻度          | 12 時間ごと                                      | リアルタイム                      |

| 脆弱性検出の対象範囲             | エージェントレス                                     | 統合 Datadog Agent          |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| ホストやホストイメージ                       | OS パッケージおよびアプリケーションパッケージ (イメージにマッピング) | OS パッケージ                    |
| コンテナイメージ                           | OS パッケージおよびアプリケーションパッケージ (イメージにマッピング) | OS パッケージ                    |
| クラウドプロバイダー                            | AWS、[Azure (プレビュー)][15]                    | AWS、Azure、GCP、オンプレミスなど |
| オペレーティングシステム                          | Linux                                         | Linux、Windows                 |
| サーバーレス                                | AWS Lambda                                    | 該当なし                 |
| コンテナレジストリ                      | [Amazon ECR (プレビュー)][16]                    | 該当なし                 |

互換性の詳細は [CSM Vulnerabilities Hosts and Containers Compatibility][13] を参照してください。サポートが必要な場合は、[トラブルシューティングガイド][14]や support@datadoghq.com にお問い合わせください。

## 悪用可能な脆弱性を継続的に検出、優先度付け、修正
[CSM Vulnerabilities Explorer][1] では、コンテナイメージ、ホストイメージ、稼働中のホスト、サーバーレス関数に対して検出された脆弱性を、フィルタやグルーピング機能を用いて調査できます。

Datadog Severity Score を用いて、まずは悪用される可能性が高い脆弱性に注目しましょう。このスコアは CVSS の基本スコアに加え、機密データの有無、環境の機微度、攻撃への露出度、エクスプロイトの有無、脅威インテリジェンスソースなど多くのリスク要因を組み合わせて算出されます。

修正可能な脆弱性については、Explorer がガイド付きの修正手順を提供し、Dev や Ops チームがより迅速かつ効果的に問題を解決できるよう支援します。また、脆弱性のステータス管理 (トリアージ、ミュート、コメント、アサインなど) も行い、ライフサイクルを通じて管理できます。

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability.png" alt="CSM Vulnerability Explorer で脆弱性を表示し、ユーザーが対処アクションを取れる様子" width="100%">}}

## 自動化と Jira との連携
[セキュリティ通知ルール][17]や[ オートメーションパイプライン (プレビュー) ][20] を設定して、CSM Vulnerabilities を日々のワークフローに組み込みましょう。
- 自分のスコープにおける悪用可能な脆弱性が検出された場合にアラートを受け取る
- 自動的に Jira チケットを作成する
- 脆弱性を修正するための SLA を設定する

{{< img src="security/vulnerabilities/csm-notifications.png" alt="通知ルール設定画面" width="100%">}}

## トラッキングとレポート
標準で用意されている [CSM Vulnerabilities ダッシュボード][18]を活用して進捗を追跡し、ステークホルダーにレポートできます。必要に応じてクローンしてカスタマイズも可能です。

{{< img src="security/vulnerabilities/csm-vm-reporting.png" alt="CSM Vulnerabilities ダッシュボード" width="100%">}}

## インフラストラクチャー内パッケージの調査

[Infrastructure Packages Catalog][19] では、ホスト、ホストイメージ、コンテナイメージで稼働中のパッケージをリアルタイムにインベントリとして確認できます。脆弱性やランタイム情報が付与された SBOM を一元的に調査できるインターフェイスを提供します。

緊急度の高い新たな脆弱性が発生した場合、該当するパッケージのバージョンを検索し、そのパッケージが使われているすべてのリソースを特定して影響範囲をすばやく評価できます。

{{< img src="security/vulnerabilities/csm_package_explorer.png" alt="脆弱性情報付きのパッケージ一覧と、それを使用しているリソースへのピボット機能" width="100%">}}

## ビデオウォークスルー

次のビデオでは、CSM Vulnerabilities を有効にして使用する方法の概要を説明しています。

{{< img src="security/csm/how-to-use-csm-vulnerabilities.mp4" alt="CSM Vulnerabilities のインストールと使用方法の概要を説明するビデオ" video=true >}}

[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /ja/security/code_security/software_composition_analysis/
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[10]: /ja/security/code_security/iast/
[11]: /ja/security/cloud_security_management/setup/agentless_scanning/
[12]: /ja/security/cloud_security_management/setup/agent
[13]: /ja/security/cloud_security_management/vulnerabilities/hosts_containers_compatibility
[14]: /ja/security/cloud_security_management/troubleshooting/vulnerabilities/
[15]: https://www.datadoghq.com/product-preview/agentless-vulnerability-scanning-for-azure/
[16]: https://www.datadoghq.com/product-preview/ecr-vulnerability-scanning/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: https://app.datadoghq.com/dash/integration/csm_vulnerabilities?fromUser=true&refresh_mode=sliding&from_ts=1733323465252&to_ts=1733928265252&live=true
[19]: https://app.datadoghq.com/security/catalog/libraries
[20]: https://www.datadoghq.com/product-preview/security-automation-pipelines/

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}