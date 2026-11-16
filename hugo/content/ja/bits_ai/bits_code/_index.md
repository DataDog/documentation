---
aliases:
- /ja/bits_ai/bits_ai_dev_agent/
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-dev-agent/
  tag: ブログ
  text: Bits Code が問題を自動検出して修正案を生成
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: ブログ
  text: Code Security 向け Bits Code のご紹介
- link: /account_management/billing/ai_credits/
  tag: ドキュメント
  text: AI クレジット
title: Bits Code
---
## 概要 {#overview}

Bits Code は、Datadog の監視可能性データを活用してコードの問題を自動的に診断および修正する生成 AI コーディングアシスタントです。[ソースコードプロバイダー](#supported-source-code-providers)とインテグレーションして実稼働準備が整ったプルリクエストまたはマージリクエストを作成し、CI ログや開発者からのフィードバックを使用して変更を繰り返します。

{{< img src="bits_ai/dev_agent/sessions_overview.png" alt="下に提案が表示されるテキストフィールドを示す「セッション」というタブ" style="width:100%;" >}}

Bits Code が問題を調査したり修正案を生成したりするたびに[セッション](#sessions)が作成され、エージェントの分析、アクション、および対応している Datadog プロダクトにおけるコード変更がキャプチャされます。Bits Code がスケジュールに従ってセッションを実行したり、新しい APM 推奨事項や不安定なテストなど他の Datadog プロダクトからのシグナルに応じて実行したりするように [自動化][28] を設定します。

Bits Code を始めるには、[ソースコードインテグレーションをセットアップ][6] し、追加の構成を完了してください。その後、[最初のセッションを開始](#start-a-session)します。

[AI クレジット][27] で Bits Code の使用が請求される方法を学びます。

## セッション {#sessions}
セッションは、分析やコード変更を含む、Bits Code を使用した作業の一部をキャプチャします。{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][7] でセッションを開始し、表示し、管理します。

{{< img src="bits_ai/dev_agent/code_fix.png" alt="左側に Bits AI の概要とタスクリスト、右側にコードの差分が表示されているセッション" style="width:100%;" >}}

### セッションを開始する {#start-a-session}
[セットアップの完了][6] 後、次のいずれかを実行して Bits Code セッションを開始します。
- [{{< ui >}}Sessions{{< /ui >}}][7] に自由形式のプロンプトを入力する: カスタムプロンプトを入力するか、提案されたプロンプトカードをクリックして生成してください。
- [対応している Datadog プロダクト](#supported-datadog-products)の Bits Code を呼び出す
- Bits Code の [自動化][28] を設定する

別の Bits AI エージェント ([Bits Chat][16] または [Bits Investigation][17] など) が Bits Code にコーディングタスクを引き継ぐ場合にもセッションが作成されます。

### セッションの可視性 {#session-visibility}

Bits Code セッションは、デフォルトで Datadog 組織全体で共有されます。組織内の全員がセッションを開いて、その分析、アクション、コードの変更を確認したり、そのセッションで Bits Code を使用して作業を継続したりできます。これにより、コンテキストを簡単に共有し、チームメイトの進行中の作業を引き継ぐことができます。

### セッションを表示および管理する {#view-and-manage-sessions}
[{{< ui >}}Sessions{{< /ui >}}][7] では、{{< ui >}}My Sessions{{< /ui >}} パネルに関与しているセッションが表示されます。セッションを開始した場合や、会話に参加したり関連する PR または MR を作成したりするなどなんらかの形で関与した場合、セッションがここに表示されます。{{< ui >}}My Sessions{{< /ui >}} はパーソナライズされたビューであり、プライバシーの境界ではありません。つまり、組織の他のメンバーもこれらのセッションにアクセスできます。

セッションをクリックして詳細を表示し、Bits Code で作業を続けます。{{< ui >}}My Sessions{{< /ui >}} リストからセッションを削除するには、以下のいずれかをクリックしてください。
- <i class="icon-eye-slashed-wui"></i> ({{< ui >}}Unwatch session{{< /ui >}}): 自分自身の {{< ui >}}My Sessions{{< /ui >}} リストからのみセッションを削除します。他のユーザーには影響しません。
- <i class="icon-archive-wui"></i> ({{< ui >}}Archive for everyone{{< /ui >}}): 組織内のすべてのユーザーに対してセッションをアーカイブします。

## サポートされているソースプロバイダー {#supported-source-code-providers}
Bits Code は、以下のソースコードプロバイダーをサポートしています。
- **GitHub**: GitHub.com、[GitHub Enterprise Cloud][30]、[GitHub Enterprise Cloud with data residency][31]、および [GitHub Enterprise Server][38]。
- **GitLab**: GitLab.com および GitLab Self-Managed。
- **Azure DevOps Cloud**: [dev.azure.com and *.visualstudio.com][39]。

以下のプランはサポートされていません。
- **Azure DevOps Server**: オンプレミスのインスタンスは、Bits Code または Datadog [Source Code Integration][37] ではサポートされていません。
- **Bitbucket**: Bitbucket.org、Bitbucket Data Center、および Bitbucket Data Server (オンプレミス) は、Bits Code ではサポートされていません。Datadog [Source Code Integration][37] は、オンプレミスの Bitbucket デプロイメントをサポートしていません。

## 対応している Datadog プロダクト {#supported-datadog-products}

Bits Code は、以下を含む複数の Datadog プロダクト内でコードの改善を提案できます。

| 製品                   | 機能                                                       |
|---------------------------|--------------------------------------------------------------------|
| [APM][20]                 | 関連する [APM Recommendations][21] のコード変更を提案する |
| [Bits Investigation][17]         | Bits Investigation に基づいてコード修正を生成する |
| [Bits Chat][16]   | Bits Chat の会話から発生するコード変更を提案する |
| [Cloud Cost][22]          | [Cloud Cost Recommendations][23] のコード変更を生成する |
| [Cloud Security][34]      | 影響を受けるリソースを定義する IaC 内の [誤構成による検出結果][35] を修正する |
| [Error Tracking][1]       | 問題を診断し、オンデマンドまたは自律的にコード修正を生成する |
| [Code Security][2]        | [SAST の脆弱性][15]、[IaC の脆弱性][25]、および [SCA の脆弱性][26] を修正する (個別または一括)  |
| [Test Optimization][4]    | [不安定なテスト][24] のコード修正を提供し、テストが安定していることを確認する  |
| [Continuous Profiler][3]  | [自動分析][10] インサイトのコード変更を提供する   |
| [Containers][12]          | [Kubernetes Remediations][13] のコード変更を提供する  |
| [Sensitive Data Scanner][36] | 機密データの漏洩を引き起こしているログのコード修正を生成する |

## 主な機能 {#key-capabilities}

### Datadog プロダクトで検出されるコード修正と最適化 {#code-fixes-and-optimizations-surfaced-by-datadog-products}

[対応している Datadog プロダクト](#supported-datadog-products)全体で、Bits Code を使用して最適化や修正を実装できます。たとえば、[Cloud Cost Recommendations][23]、[Error Tracking][1] の問題、[SAST の脆弱性][15] などです。特定のプロダクトでは、[Bits Chat][16] が問題を調査し、その結果を Bits Code に渡してコード変更を実装します。

{{< img src="bits_ai/dev_agent/fix_with_bits.png" alt="「Bits で修正」と表示されたボタン。" style="width:25%" >}}

特定の診断結果に対して、Bits Code に変更を手動で促すことも、[自動化][28] を設定して自律的に行わせることもできます。

### 一般的なコーディングタスク {#general-coding-tasks}

[{{< ui >}}Sessions{{< /ui >}}][7] の自由形式のプロンプトフィールドを使用して、Bits Code で一般的なコーディングタスクを実行します。

### 自動化 {#automations}

[自動化][28] は、スケジュールに従って、または Error Tracking、APM、Code Security などの Datadog プロダクトからのシグナルに応じて、Bits Code セッションを自動的に実行します。セッションが完了すると、Bits Code は、プルリクエスト、マージリクエスト (オプションでドラフトモード)、または Slack 通知として結果を提供します。

トリガー (製品の発見、カスタムプロンプト、スケジュール、またはその組み合わせ) から自動化を構築し、1 つ以上の出力を構成できます。Datadog が提供するテンプレートも利用可能で、開始に役立ちます。{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Automations{{< /ui >}}][29] で自動化を作成および管理します。

### カスタムエージェントのスキルと手順 {#custom-agent-skills-and-instructions}

Bits Code は、リポジトリで定義されたカスタムスキルを使用できます。`<skill-name>/SKILL.md` のようにフォーマットされたスキルを、`.claude/skills/`、`.codex/skills/`、および `.gemini/skills/` ディレクトリ内で検出します。スキルには、YAML の `name` および `description` フロントマターキーを含める必要があります。

Bits Code は、その `name` および `description` の値に基づいて適切なスキルを自動的に呼び出します。また、[カスタム手順ファイル][33] でスキルに言及することで使用を促すことができます。Bits Code に特定のスキルを直接使用するように指示することもできます。

Bits Code は、リポジトリおよび Bits Code 設定で定義された [カスタム指示を取り込む][33] こともします。

### プルリクエストまたはマージリクエストのコラボレーション {#pull-or-merge-request-collaboration}

Bits Code は[ソースコードプロバイダー](#supported-source-code-providers)と統合して以下を実行します。
- プルリクエストまたはマージリクエストを作成し、リポジトリのプルリクエストまたはマージリクエストテンプレートに基づいてタイトルと説明を生成する
- コメントに応じてプルリクエストを繰り返す (GitHub のみ)。コメントで `@Datadog` に言及して Bits に更新を促す
- CI ログとプルリクエストまたはマージリクエストの状態を監視し、失敗やマージのブロック要因を修正します。

Bits Code が PR や MR を自動的にマージすることはありません。Bits Code が実行しているすべての PR または MR は、{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][7] で確認できます。

## 制限事項 {#limitations}

- Bits Code は AI 製品であり、間違いをする可能性があります。エージェントが生成したコードをレビューおよびテストする際は、ベストプラクティスを使用してください。 
- Bits Code はマルチリポジトリ調査をサポートしていません。
- GitLab を使用している場合、コメントで `@Datadog` に言及して Bits に更新を促す機能はサポートされていません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/error_tracking
[2]: /ja/security/code_security
[3]: /ja/profiler/
[4]: /ja/tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /ja/bits_ai/bits_code/setup/
[7]: https://app.datadoghq.com/code
[8]: /ja/bits_ai/bits_investigation/
[10]: /ja/profiler/automated_analysis/
[12]: /ja/containers/
[13]: /ja/containers/bits_ai_kubernetes_remediation
[15]: /ja/security/code_security/static_analysis/ai_enhanced_sast/#remediation
[16]: /ja/bits_ai/bits_chat/
[17]: /ja/bits_ai/bits_investigation/
[20]: /ja/tracing/
[21]: /ja/tracing/recommendations/
[22]: /ja/cloud_cost_management/
[23]: /ja/cloud_cost_management/recommendations
[24]: /ja/tests/flaky_management#bits-ai-powered-flaky-test-fixes
[25]: /ja/security/code_security/iac_security/
[26]: /ja/security/code_security/software_composition_analysis/
[27]: /ja/account_management/billing/ai_credits/
[28]: /ja/bits_ai/bits_code/automations/
[29]: https://app.datadoghq.com/code/automations
[34]: /ja/security/cloud_security_management/
[35]: /ja/security/cloud_security_management/review_remediate/remediate_with_ai/
[36]: /ja/security/sensitive_data_scanner/
[30]: https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud
[31]: https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud#about-data-residency
[32]: https://docs.gitlab.com/subscriptions/gitlab_dedicated/
[33]: /ja/bits_ai/bits_code/setup/#configure-custom-instructions
[37]: /ja/source_code/source-code-management#source-code-management-providers
[38]: https://docs.github.com/en/enterprise-server@3.17/admin/overview/about-github-enterprise-server
[39]: https://learn.microsoft.com/en-us/azure/devops/?view=azure-devops