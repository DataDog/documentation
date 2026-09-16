---
aliases:
- /ja/security/infrastructure_vulnerabilities/
- /ja/security/vulnerabilities/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: ドキュメント
  text: Cloud Security Vulnerabilities における SBOM 収集の有効化
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: ドキュメント
  text: ホストの脆弱性の設定
- link: /infrastructure/containers/container_images
  tag: ドキュメント
  text: コンテナイメージの表示
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: ドキュメント
  text: Cloud Security Vulnerabilities のトラブルシューティング
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: ブログ
  text: Datadog Container Monitoring のコンテナイメージを使用してトラブルシューティングワークフローを強化する
- link: /security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities
  tag: ドキュメント
  text: 本番環境で検出された脆弱性に Dockerfile をリンクする
title: Cloud Security Vulnerabilities
---
## 概要 {#overview}

Cloud Security Vulnerabilities は、CI/CD パイプラインから本番環境まで、コンテナイメージ、ホスト、ホストイメージ、およびサーバーレス関数を継続的にスキャンして脆弱性を検出し、セキュリティ体制を強化し、コンプライアンスを達成するのに役立ちます。ランタイムでの監視可能性を活用し、日々のワークフローの中で悪用可能な脆弱性を優先的に特定および修正できるよう支援します。すべてを単一のビューで把握でき、他の Datadog プロダクトへの依存は必要ありません。

Cloud Security Vulnerabilities を使用すると、クラウドセキュリティ管理戦略を 1 つの場所で管理できます。

- CI/CD パイプラインから本番環境リソースまでを対象とした脆弱性管理プログラムを作成
- SOC2、PCI、HIPAA、CIS、FedRamp などのコンプライアンス監査に合格
- 新たに発生する脆弱性 (ゼロデイ CVE など) を修正

**注**: アプリケーションライブラリにおける脆弱性管理については [Software Composition Analysis][5] を参照してください。アプリケーションコードについては [Code Security][10] を参照してください。

## 主な機能 {#key-capabilities}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Agentless Scanning は、選択したサイト ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

エージェントレスまたは統合 Datadog Agent を使用してデプロイ
: すでに導入済みの統合 Datadog Agent を利用するか、エージェントレスでインフラストラクチャー全体をすばやくスキャンし、脆弱性を検出できます。

クラウドリソースをリアルタイムでインベントリ収集
: コンテナイメージ、ホスト、サーバーレス関数、そしてインフラストラクチャーで稼働しているすべてのパッケージをリアルタイムでインベントリし、SBOM (ソフトウェア部品表) をエクスポートできます。

脆弱性を継続的に検出
: 稼働中のコンテナイメージ、ホスト、ホストイメージ、サーバーレスで発生する新規の変更や新たに公開された CVE をホストおよびレジストリからスキャンし、脆弱なコンテナイメージレイヤーを特定します。

ランタイムの監視可能性を利用して悪用可能な脆弱性を優先順位付け
: CVSS をベースにした Datadog 独自のセキュリティスコアを活用し、CISA KEV、EPSS、公開されているエクスプロイト情報などを組み合わせてリスクを評価します。ランタイムの監視可能性を活用することで、本番稼働状況、攻撃への露出度、機密データの処理状況、特権アクセスの有無などを把握できます。

ガイド付きの修正を活用
: どのレイヤーが影響を受けているかを確認し、各イメージに固有の修正方法を提案します。脆弱性ライフサイクル管理のアクションに繋げられます。

自動化とインテグレーションを実装
: Jira チケット作成の自動化や SLA の導入が可能です。Datadog のパブリック API を活用して脆弱性情報、カバレッジ、SBOM などをエクスポートできます。

レポートを参照
: ダッシュボードで脆弱性情報を可視化およびモニターできます。

## デプロイ方法 {#deployment-methods}

数分以内に Cloud Security Vulnerabilities を導入し、インフラストラクチャーを網羅するには以下を参照してください。
- [エージェントレススキャン][11]
- [統合 Datadog Agent][12]
- [CI/CD コンテナイメージスキャン][21]

複数のデプロイ方法を組み合わせて使用することもできます。すでに統合 Datadog Agent をデプロイしている場所でそれを氏使用し、その他の場所ではエージェントレスを使用し、CI/CD スキャンを行って本番環境前に脆弱性を検出します。

有効化後、Datadog はリソースを継続的にスキャンし、約 1 時間以内に [[{{< ui >}}Cloud Security Vulnerabilities Findings{{< /ui >}}] ( Cloud Security Vulnerabilities の検出結果) ページ][1]上で優先度の高い脆弱性を報告し始めます。

どのソリューションを選択すべきか (比較表):
| 機能                                   | エージェントレス                                     | 統合 Datadog Agent          |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| インフラストラクチャー全体へのデプロイに要する時間 | 数分                                       | 数時間～数週間                 |
| 脆弱性の優先順位付け              | 対応                                           | ランタイム情報を活用して優先度を算定      |
| 脆弱性スキャンの頻度          | 12 時間ごと                                      | リアルタイム                      |

| 脆弱性検出のスコープ | Agentless                                                                                                                                                    | Unified Datadog Agent          |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------|
| ホストとホストイメージ           | OS パッケージおよびアプリケーションパッケージ (イメージにマッピング)                                                                                                                | OS パッケージ                    |
| コンテナイメージ               | OS パッケージおよびアプリケーションパッケージ (イメージにマッピング)                                                                                                                | OS パッケージ                    |
| クラウドプロバイダー                | AWS、Azure、GCP                                                                                                                                              | AWS、Azure、GCP、オンプレミスなど |
| オペレーティングシステム              | Linux、Windows                                                                                                                                               | Linux、Windows                 |
| Serverless                    | AWS Lambda、Amazon ECS Fargate、Azure Container Apps、Azure Container Instances、GCP Cloud Run (コンテナデプロイのみ)                                   | 該当なし                 |
| コンテナレジストリ          | Amazon ECR および Google Artifact Registry (実行中 + 静止中)、Azure Container Registry、Docker Hub、GitHub Container Registry、Microsoft Container Registry、Kubernetes レジストリ (認証済みプルのみ)。詳細は[コンテナイメージレジストリ][24]を参照してください | 該当なし                 |

互換性の詳細については、[Cloud Security Vulnerabilities のホストとコンテナの互換性][13]を参照してください。サポートが必要な場合は、[トラブルシューティングガイド][14]や support@datadoghq.com にお問い合わせください。

## 悪用可能な脆弱性を継続的に検出、優先度付け、修正{#continuously-detect-prioritize-and-remediate-exploitable-vulnerabilities}
[[{{< ui >}}Cloud Security Vulnerabilities Findings{{< /ui >}}] ページ][1]では、コンテナイメージ、ホストイメージ、稼働中のホスト、Serverless 関数に対して検出された脆弱性を、フィルターやグルーピング機能を用いて調査できます。

Datadog Severity Score を用いて、まずは悪用される可能性が高い脆弱性に注目しましょう。このスコアは CVSS の基本スコアに加え、機密データの有無、環境の機微度、攻撃への露出度、エクスプロイトの有無、脅威インテリジェンスソースなど多くのリスク要因を組み合わせて算出されます。

修正可能な脆弱性については、[{{< ui >}}Findings{{< /ui >}}] ページがガイド付きの修正手順を提供し、Dev チームや Ops チームがより迅速かつ効果的に問題を解決できるよう支援します。また、脆弱性のステータス管理 (トリアージ、ミュート、コメント、アサインなど) も行い、ライフサイクルを通じて管理できます。

<div class="alert alert-info">[Vulnerabilities Findings] ページでエクスプローラーの設定を再利用するには、ページ全体の URL をブックマークしてください。検索クエリとファセットの選択内容は URL に保持されます。</div>

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="脆弱性およびユーザーがそれを修正するために取ることができるアクションを示す [Cloud Security Vulnerabilities Findings] ページ" width="100%">}}

[[{{< ui >}}Container Images{{< /ui >}}] (コンテナイメージ)][7] では、イメージ内で見つかった脆弱性を特定のレイヤーにトレースすることで、セキュリティリスクをより迅速に特定および修正できます。

{{< img src="infrastructure/containerimages/image_layer_vulnerabilities.png" alt="イメージの各レイヤーに関連付けられた脆弱性のリスト" width="100%">}}

パブリックベースイメージからビルドされた、フラット化されていないシングルステージのコンテナイメージの場合、Datadog は自動的にベースイメージを特定し、そこから継承された脆弱性と、イメージによって追加されたパッケージの脆弱性を区別します。属性が利用可能な場合、Datadog はベースイメージの名前とダイジェストを表示して、修復でアプリケーションコードの変更ではなくベースイメージの更新が必要な状況を示します。[Datadog でコンテナイメージを表示する][23]。

## 本番環境の脆弱性をソースコードにトレース {#trace-production-vulnerabilities-to-source-code}

Datadog が実行中のコンテナイメージで CVE を検出すると、脆弱性のあるパッケージを導入した Dockerfile とコミットに直接リンクできます。これにより、本番環境アラートとそれを引き起こしたコード変更とのギャップが埋まり、開発者はパッケージバージョンをレジストリ間で追跡するのではなく、ソースで修正するために必要なコンテキストを得ることができます。

このコードからクラウドへのマッピングを有効にするには、ビルド時に OCI イメージアノテーションをコンテナイメージに追加してください。Datadog はこれらのアノテーションを使用して、Container Image Vulnerabilities パネル内に Dockerfile のプレビューを表示し、脆弱性に関連する正確なリポジトリ、コミット、およびファイルパスを表示します。

ソースリンクを設定するには、CI/CD コンテナイメージスキャンガイドの[脆弱性に Dockerfile をリンクする][22]を参照してください。

## 自動化と Jira との連携 {#automation-and-jira-integration}
[{{< ui >}}security notification rules{{< /ui >}} (セキュリティ通知ルール)][17]や[オートメーションパイプライン (プレビュー)][20] を設定して、Cloud Security Vulnerabilities を日々のワークフローに組み込みましょう。
- 自分のスコープにおける悪用可能な脆弱性が検出された場合にアラートを受け取る
- 自動的に Jira チケットを作成する
- 脆弱性を修正するための SLA を構成する

{{< img src="security/vulnerabilities/csm-notifications.png" alt="通知ルール設定画面" width="100%">}}

## トラッキングとレポート {#tracking-and-reporting}
すぐに使える [{{< ui >}}Cloud Security Vulnerabilities{{< /ui >}} ダッシュボード][18]を使用して、進捗状況を追跡し、関係者に報告しましょう。必要に応じて複製し、独自のニーズに合わせて修正します。

{{< img src="security/vulnerabilities/csm-vm-reporting.png" alt="Cloud Security Vulnerabilities ダッシュボード" width="100%">}}

## インフラストラクチャー内パッケージの調査 {#explore-infrastructure-packages}

[{{< ui >}}Infrastructure Packages Catalog{{< /ui >}}][19] では、ホスト、ホストイメージ、コンテナイメージで稼働中のパッケージをリアルタイムにインベントリとして確認できます。脆弱性やランタイム情報が付与された SBOM を一元的に調査できるインターフェイスを提供します。

緊急度の高い新たな脆弱性が発生した場合、該当するパッケージのバージョンを検索し、そのパッケージが使われているすべてのリソースを特定して影響範囲をすばやく評価できます。

{{< img src="security/vulnerabilities/csm_package_explorer_3.png" alt="脆弱性情報付きのパッケージ一覧と、それを使用しているリソースへのピボット機能" width="100%">}}

[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /ja/security/code_security/software_composition_analysis/
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[7]: https://app.datadoghq.com/container-images
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[10]: /ja/security/code_security/iast/
[11]: /ja/security/cloud_security_management/setup/agentless_scanning/
[12]: /ja/security/cloud_security_management/setup/agent
[13]: /ja/security/cloud_security_management/vulnerabilities/hosts_containers_compatibility
[14]: /ja/security/cloud_security_management/troubleshooting/vulnerabilities/
[16]: https://www.datadoghq.com/product-preview/ecr-vulnerability-scanning/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: https://app.datadoghq.com/dash/integration/csm_vulnerabilities?fromUser=true&refresh_mode=sliding&from_ts=1733323465252&to_ts=1733928265252&live=true
[19]: https://app.datadoghq.com/security/catalog/libraries
[20]: https://www.datadoghq.com/product-preview/security-automation-pipelines/
[21]: /ja/security/cloud_security_management/setup/ci_cd
[22]: /ja/security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities
[23]: https://app.datadoghq.com/security/csm/vm?query=-%40risk.is_image_running%3Afalse%20%40status%3Aopen%20%40risk.has_exploit_available%3Atrue%20%40remediation.is_available%3Atrue%20%40severity%3A%28high%20OR%20critical%29%20%40vulnerability.is_inherited_from_base_image%3Atrue&group=none&order=desc&sort=score
[24]: /ja/security/cloud_security_management/setup/agentless_scanning/compatibility/#container-image-registries

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}