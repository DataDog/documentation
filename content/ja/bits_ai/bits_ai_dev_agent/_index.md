---
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

Bits Code は、Datadog の監視可能性データを活用してコードの問題を自動的に診断および修正する生成 AI コーディングアシスタントです。GitHub とインテグレーションして実稼働準備が整ったプルリクエストを作成し、CI ログや開発者からのフィードバックを使用して変更を繰り返します。

{{< img src="bits_ai/dev_agent/sessions_overview.png" alt="下に提案が表示されるテキストフィールドを示す「セッション」というタブ" style="width:100%;" >}}

Bits Code が問題を調査したり修正案を生成したりするたびに、[セッション](#sessions)が作成され、エージェントの分析、アクション、および対応している Datadog プロダクトにおけるコード変更がキャプチャされます。Bits Code がスケジュールに従ってセッションを実行したり、新しい APM 推奨事項や不安定なテストなど、他の Datadog プロダクトからのシグナルに応じて実行したりするように[自動化][28]を設定します。

Bits Code を始めるには、[GitHub インテグレーションをセットアップ][6]し、追加の構成を完了してください。その後、[最初のセッションを開始](#start-a-session)します。

[AI クレジット][27]で Bits Code の使用が請求される方法を確認してください。

## セッション {#sessions}
セッションは、分析やコード変更を含む、Bits Code を使用した作業の一部をキャプチャします。**Bits AI** > **Bits Code** > [**セッション**][7]でセッションを開始、表示、管理します。

{{< img src="bits_ai/dev_agent/code_fix.png" alt="左側に Bits AI の概要とタスクリスト、右側にコードの差分が表示されているセッション" style="width:100%;" >}}

### セッションの開始 {#start-a-session}
[セットアップの完了][6]後、次のいずれかを実行して Bits Code セッションを開始します。
- [**セッション**][7]に自由形式のプロンプトを入力する: カスタムプロンプトを入力するか、提案されたプロンプトカードをクリックして生成する
- [対応している Datadog プロダクト](#supported-datadog-products)の Bits Code を呼び出す
- Bits Code の[自動化][28]を設定する

別の Bits AI エージェント ([Bits Chat][16] または [Bits Investigation][17] など) が Bits Code にコーディングタスクを引き継ぐ場合にもセッションが作成されます。

### セッションの表示と管理 {#view-and-manage-sessions}
**[セッション][7]**の **My Sessions** パネルで過去のセッションを表示します。セッションを開始した場合や、会話に参加したり関連する PR を作成したりするなど何らかの形で関与した場合、セッションがここに表示されます。

セッションをクリックして詳細を表示し、Bits Codeで作業を続けます。**My Sessions** リストからセッションを削除するには、<i class="icon-archive-wui"></i>(**Archive for everyone**) または <i class="icon-eye-slashed-wui"></i>(**Unwatch session**) をクリックします。

## 対応している Datadog プロダクト {#supported-datadog-products}

Bits Code は、以下を含む複数の Datadog プロダクト内でコードの改善を提案できます。

| 製品                   | 機能                                                       |
|---------------------------|--------------------------------------------------------------------|
| [APM][20]                 | 関連する [APM Recommendations][21] のコード変更を提案する |
| [Bits Investigation][17]         | Bits Investigation に基づいてコード修正を生成する |
| [Bits Chat][16]   | Bits Chat の会話から発生するコード変更を提案する |
| [Cloud Cost][22]          | [Cloud Cost Recommendations][23] のコード変更を生成する |
| [Error Tracking][1]       | 問題を診断し、オンデマンドまたは自律的にコード修正を生成する |
| [Code Security][2]        | [SAST の脆弱性][15]、[IaC の脆弱性][25]、および [SCA の脆弱性][26]を修正する(個別または一括)  |
| [Test Optimization][4]    | [不安定なテスト][24]のコード修正を提供し、テストが安定していることを確認する  |
| [Continuous Profiler][3]  | [自動分析][10]インサイトのコード変更を提供する |
| [Containers][12]          | [Kubernetes Remediations][13] のコード変更を提供する |

## 主な機能 {#key-capabilities}

### Datadog プロダクトで検出されるコード修正と最適化 {#code-fixes-and-optimizations-surfaced-by-datadog-products}

[対応している Datadog プロダクト](#supported-datadog-products)全体で、Bits Code を使用して最適化や修正を実装できます。例えば、[Cloud Cost Recommendations][23]、[Error Tracking][1] の問題、[SAST の脆弱性][15]などです。特定のプロダクトでは、[Bits Chat][16] が問題を調査し、その結果を Bits Code に渡してコード変更を実装します。

{{< img src="bits_ai/dev_agent/fix_with_bits.png" alt="「Bits で修正」と表示されたボタン。" style="width:25%" >}}

特定の診断結果に対して、Bits Code に変更を手動で促すことも、[自動化][28]を設定して自律的に行わせることもできます。

### 一般的なコーディングタスク {#general-coding-tasks}

[**セッション**][7]の自由形式のプロンプトフィールドを使用して、Bits Code で一般的なコーディングタスクを実行します。

### 自動化 {#automations}

[自動化][28]は、スケジュールに従って、または Error Tracking、APM、Code Security などの Datadog プロダクトからのシグナルに応じて、Bits Code セッションを自動的に実行します。セッションが完了すると、Bits Code は、プルリクエスト、ドラフト PR、または Slack 通知として結果を提供します。

トリガー (製品の発見、カスタムプロンプト、スケジュール、またはその組み合わせ) から自動化を構築し、1 つ以上の出力を構成できます。Datadog が提供するテンプレートも利用可能で、開始に役立ちます。**Bits AI** > **Bits Code** > [**自動化**][29]で、自動化を作成および管理します。

### プルリクエストコラボレーション {#pull-request-collaboration}

Bits Code は GitHub と統合して、以下のことを行います。
- プルリクエストを作成し、リポジトリのプルリクエストテンプレートに基づいてタイトルと説明を生成する
- コメントに応じてプルリクエストを繰り返す。コメントに `@Datadog` を言及して Bits に更新を促す
- CI ログをモニターし、障害を修正する

Bits Code が PR を自動的にマージすることはありません。**Bits AI** > **Bits Code** > **[セッション][7]**で、Bits Code が実行しているすべての PR を確認できます。

## 制限事項 {#limitations}

- Bits Code は AI 製品であり、間違いをする可能性があります。エージェントが生成したコードをレビューおよびテストする際は、ベストプラクティスを使用してください。 
- Bits Code はマルチリポジトリ調査をサポートしていません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/error_tracking
[2]: /ja/security/code_security
[3]: /ja/profiler/
[4]: /ja/tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /ja/bits_ai/bits_ai_dev_agent/setup/
[7]: https://app.datadoghq.com/code
[8]: /ja/bits_ai/bits_ai_sre/
[10]: /ja/profiler/automated_analysis/
[12]: /ja/containers/
[13]: /ja/containers/bits_ai_kubernetes_remediation
[14]: https://app.datadoghq.com/code/settings
[15]: /ja/security/code_security/static_analysis/ai_enhanced_sast/#remediation
[16]: /ja/bits_ai/bits_chat/
[17]: /ja/bits_ai/bits_ai_sre/
[20]: /ja/tracing/
[21]: /ja/tracing/recommendations/
[22]: /ja/cloud_cost_management/
[23]: /ja/cloud_cost_management/recommendations
[24]: /ja/tests/flaky_management#bits-ai-powered-flaky-test-fixes
[25]: /ja/security/code_security/iac_security/
[26]: /ja/security/code_security/software_composition_analysis/
[27]: /ja/account_management/billing/ai_credits/
[28]: /ja/bits_ai/bits_ai_dev_agent/automations/
[29]: https://app.datadoghq.com/code/automations