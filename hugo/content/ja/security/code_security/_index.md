---
aliases:
- /ja/code_analysis/
disable_toc: false
further_reading:
- link: https://learn.datadoghq.com/courses/code-security-SAST
  tag: ラーニングセンター
  text: Datadog Code Security でセキュアなコードを記述する
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: ブログ
  text: 'CI/CD Security: GitHub エコシステムを保護する方法'
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: ブログ
  text: Code Security 向け Bits Code のご紹介
- link: https://www.datadoghq.com/blog/remediate-faster-code-security
  tag: ブログ
  text: Datadog Software Composition Analysis を使用して、推移的脆弱性をより迅速に修正する
- link: https://www.datadoghq.com/blog/audit-reports-datadog-sheets
  tag: ブログ
  text: Datadog Sheets を使用して、監査に対応した脆弱性およびコンプライアンスレポートを生成する
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: ブログ
  text: Datadog で GitLab ソースコード統合を使用して迅速にトラブルシューティングを実行する
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: ブログ
  text: Datadog Secret Scanning を使用して、公開された認証情報を検出およびブロックする
- link: https://www.datadoghq.com/blog/code-security-ai-capabilities
  tag: ブログ
  text: AI 主導の脆弱性管理によって、コードを大規模に保護する
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: ブログ
  text: MCP サーバーで一般的なセキュリティリスクを特定する
- link: https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives/
  tag: ブログ
  text: LLM を使用して静的コード分析から誤検知を除外する
title: Code Security
---
Code Security は、リポジトリと実行中のサービスの両方で使用されるファーストパーティコードおよびオープンソースライブラリをスキャンし、開発から本番環境までのエンドツーエンドの可視性を提供します。以下の機能が含まれます。

- [Static Code Analysis (SAST)][1]: ファーストパーティコードのセキュリティおよび品質に関する問題を特定する
- [Software Composition Analysis (SCA)][2]: リポジトリとサービスの両方でオープンソースの依存関係を特定する
- [Runtime Code Analysis (IAST)][3]: サービス内のファーストパーティコードに存在する脆弱性を特定する
- [Secret Scanning][8]: 漏洩したシークレットを特定して検証する
- [Infrastructure as Code (IaC) Security][10]: リポジトリに保存されている IaC のセキュリティ誤構成を特定する
- [サプライチェーンセキュリティ](#supply-chain-security-preview): 悪意のあるパッケージが開発環境やコードリポジトリに侵入するのを防ぐ

Code Security は、組織全体で DevSecOps を実装するチームをサポートします。
- **Developers:** 開発者にとっては、早期の脆弱性検出、コード品質の向上、デバッグやパッチ適用に費やす時間の短縮による、開発の迅速化を実現します。
- **Security Administrators:** セキュリティ管理者にとっては、セキュリティ体制の強化、早期の脆弱性アラートに対応したパッチ管理の改善、コンプライアンスの監視を実現します。
- **Site Reliability Engineers (SREs):** CI/CD ワークフロー全体における自動セキュリティチェック、セキュリティコンプライアンス、システムのレジリエンスを実現します。SAST は SRE の手作業による負担を軽減し、各リリースについて脆弱性の有無を徹底的にテストすることを保証します。

Code Security 全体で、以下の脆弱性管理機能を利用できます。
- [開発者向けツールインテグレーション][16]: IDE やプルリクエストのコメントで脆弱性にフラグを立て、脆弱性が本番環境のコードベースにマージされるのを防ぐ
- [チケットインテグレーション][13]: Jira および Datadog Case Management との双方向同期による統合
- [通知][14]
- [自動化パイプライン][15]: 脆弱性を自動的にミュートし、重大度に応じて期限を割り当てる
- [MCP サーバー][17]: AI コーディングアシスタントから直接 Code Security スキャンを実行する (プレビュー版)

## [Static Code Analysis (SAST)] {#static-code-analysis-sast}
Static Code Analysis (SAST) は、本番環境前のコードを解析して、セキュリティおよび品質に関する問題を特定します。ソフトウェア開発ライフサイクル全体に、以下の方法で最適なセキュリティおよび開発プラクティスを組み込むことができます。
- 決定論的な修正案をリアルタイムで提示して違反にフラグを立てるための IDE インテグレーション
- 決定論的な修正案とインクリメンタル/差分認識スキャンを備えたインラインプルリクエストコメント
- Datadog から直接プルリクエストを開いて違反を修正する機能 

スキャンは、CI/CD パイプライン経由で実行することも、Datadog のホスト型スキャンを使用して直接実行することもできます。 
開始するには、[Static Code Analysis のセットアップ][6]を参照してください。

Static Code Analysis は、プルリクエストを大規模にスキャンして、悪意のあるコードの変更を検出および防止することもできます。これにより、Datadog は既知のコード脆弱性をチェックするだけでなく、リポジトリのデフォルトブランチに送信された PR 内の潜在的な悪意のある意図を検出することも可能になります。[プレビューへのアクセスをリクエスト][12]します。

## Software Composition Analysis {#software-composition-analysis}
Software Composition Analysis (SCA) は、リポジトリと実行中のサービスの両方でオープンソースライブラリを分析します。ソフトウェア開発ライフサイクルにおいて以下の方法で依存関係を追跡および管理できます。
- サービスで実行中のライブラリに影響を与える脆弱性にフラグを立てるための IDE インテグレーション
- Datadog から直接プルリクエストを開いてライブラリの脆弱性を修正する機能
- Datadog 重大度スコアによるランタイム情報を反映した優先順位付け

SCA は、静的およびランタイムの両方の依存関係検出をサポートしています。 
静的スキャンについては、CI/CD パイプライン経由で実行することも、ホスト型スキャンを使用して Datadog から直接スキャンすることもできます。開始するには、[静的セットアップ][4]を参照してください。 
ランタイム脆弱性検出については、Datadog APM でインスツルメントされたサービスで SCA を簡単に有効にできます。開始するには、[ランタイムセットアップ][5]を参照してください。

## Runtime Code Analysis (IAST) {#runtime-code-analysis-iast}
Runtime Code Analysis (IAST) は、実行中のサービスにおけるコードレベルの脆弱性を特定します。これは、追加の構成や定期的なスケジュール設定が必要になることが多い外部テストとは対照的に、正当なアプリケーショントラフィックの検査に依存しています。IAST は以下を行うことで攻撃対象領域を最新の状態で提供します。
- ライブラリやインフラストラクチャーなど、スタックの他のコンポーネントによるコードの相互作用の監視
- OWASP Top 10 の 100% カバレッジの提供
- Datadog 重大度スコアによるランタイム情報を反映した優先順位付け

Datadog APM でインスツルメントされたサービスで IAST を有効にできます。開始するには、[IAST セットアップ][3]を参照してください。

## Secret Scanning {#secret-scanning}
Secret Scanning は、コードベース内の公開された認証情報、API キー、その他の機密シークレットを特定および検証します。以下を使用して、ソフトウェア開発ライフサイクル全体でシークレットの漏洩を防ぐことができます。
- シークレットがリポジトリに到達する前にローカルでコミットされるのを防ぐための Pre-commit フック
- 漏洩したシークレットがデフォルトブランチに到達するのを防ぐためのプルリクエストゲート
- 検出されたシークレットがアクティブで悪用可能かどうかを確認し、ローテーション済みまたは無効な認証情報によるノイズを低減するためのサードパーティ検証
- [Git history scanning][22]: コードから削除されたものの以前のコミットから復元可能なシークレットを検出する

スキャンは、CI/CD パイプライン経由で実行することも、Datadog のホスト型スキャンを使用して直接実行することもできます。開始するには、[Secret Scanning セットアップ][9]を参照してください。

## Infrastructure as Code Security (IaC Security) {#infrastructure-as-code-security-iac-security}
IaC Security は、infrastructure-as-code を分析し、クラウド環境にプロビジョニングされる前に誤構成を検出します。以下を使用して、インフラストラクチャーと CI/CD を保護できます。
- 決定論的な修正案とインクリメンタル/差分認識スキャンを備えたインラインプルリクエストコメント
- 重大な誤構成が本番環境に到達するのを防ぐためのプルリクエストゲート
- Terraform、CloudFormation、Kubernetes、GitHub Actions などの数百もの検出機能

[Cloud Security Management (CSM)][18]を使用すると、IaC Security の誤構成をランタイムの検出結果から直接確認できます。開始するには、[IaC Security セットアップ][17]を参照してください。

## Supply Chain Security (プレビュー版) {#supply-chain-security-preview}

{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="プレビューに参加しましょう。">}}
このフォームを使用して、Supply Chain Security (プレビュー版) への参加リクエストを送信してください。
{{< /callout >}}

Supply Chain Security は、悪意のあるオープンソースパッケージがインストール時に開発環境に侵入するのを防ぎ、リポジトリや CI/CD パイプラインに到達する前に阻止します。

コードベースにすでに存在する依存関係をスキャンする SCA とは異なり、Datadog Supply Chain Firewall (SCFW) はパッケージマネージャーのコマンド (`npm`、`pip`、`poetry`) をリアルタイムで傍受し、悪意のあるパッケージや最近公開されたパッケージがインストールされる前にブロックします。

Supply Chain Security は、Datadog の悪意のあるパッケージフィード ([GuardDog][21] が提供)、既知の脆弱性アドバイザリー、および設定可能な最新性しきい値に基づいて、すべてのパッケージインストールを評価します。パッケージがいずれかのチェックに該当した場合、SCFW は直ちにインストールをブロックし、開発者のラップトップおよび [CI ランナー][20]に明確かつ実行可能なメッセージを表示します。

個々の開発者マシンや CI パイプラインの保護に加え、SCFW はイベントの監視可能性を提供し、開発者マシンや CI システム全体にわたる ALLOW、WARN、BLOCK イベントを統合イベントフィードで検索、フィルタリング、監査できるようにします。

## Code Security MCP サーバー (プレビュー版) {#code-security-mcp-server-preview}
[Code Security MCP サーバー][19]は、SAST、シークレット検出、SCA、IaC スキャン、SBOM 生成を、Cursor、Claude Desktop、VS Code などの AI コーディングアシスタントに直接統合するローカルの Model Context Protocol (MCP) サーバーです。開始するには、[MCP サーバーに関するドキュメント][17]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/static_analysis/
[2]: /ja/security/code_security/software_composition_analysis/
[3]: /ja/security/code_security/iast/
[4]: /ja/security/code_security/software_composition_analysis/setup_static/
[5]: /ja/security/code_security/software_composition_analysis/setup_runtime/
[6]: /ja/security/code_security/static_analysis/setup/
[7]: /ja/security/code_security/iast/setup/
[8]: /ja/security/code_security/secret_scanning/
[9]: /ja/security/code_security/secret_scanning/#set-up-secret-scanning
[10]: /ja/security/code_security/iac_security
[12]: https://www.datadoghq.com/product-preview/malicious-pr-protection/
[13]: /ja/security/ticketing_integrations
[14]: /ja/security/notifications/
[15]: /ja/security/automation_pipelines/
[16]: /ja/security/code_security/dev_tool_int/
[17]: /ja/security/code_security/iac_security/setup/?tab=github
[18]: /ja/security/cloud_security_management/
[19]: /ja/security/code_security/dev_tool_int/mcp_server/
[20]: /ja/security/code_security/dev_tool_int/scfw_github_action/
[21]: https://github.com/DataDog/guarddog
[22]: /ja/security/code_security/secret_scanning/#detect-secrets-in-git-history