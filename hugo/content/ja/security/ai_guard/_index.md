---
further_reading:
- link: /security/ai_guard/onboarding/
  tag: ドキュメント
  text: AI Guard を使い始める
- link: /security/ai_guard/signals/
  tag: ドキュメント
  text: AI Guard Security Signals
- link: https://www.datadoghq.com/blog/ai-guard/
  tag: ブログ
  text: Datadog AI Guard でエージェンティック AI アプリケーションを保護する
- link: https://www.datadoghq.com/blog/llm-guardrails-best-practices/
  tag: ブログ
  text: 'LLM ガードレール: LLM アプリを安全にデプロイするためのベストプラクティス'
- link: https://www.datadoghq.com/blog/securing-ai-agents-guardrail-placement/
  tag: ブログ
  text: 'AI エージェントの保護: ガードレールの配置が重要な設計上の決定となる理由'
title: AI Guard
---
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger"> {{< region-param key="dd_site_name" >}} サイトでは AI Guard を利用できません。</div>
{{< /site-region >}}

{{< callout url="" btn_hidden="true" header="AI Guard へのアクセスを取得する">}}
AI Guard 機能へのアクセスをリクエストするには、以下のいずれかのフォームを使用します。
- <a href="https://www.datadoghq.com/product-preview/ai-security/">Custom Agent Runtime Protection</a> (Limited Access): Custom AI エージェントをランタイム攻撃から保護します。
- <a href="https://www.datadoghq.com/product-preview/coding-agent-security-guardrails/">Coding Agent Runtime Protection</a> (プレビュー): コーディングエージェントを開発者ワークフロー内で保護し、AI が生成したコードを安全にリリースできるようにします。
{{< /callout >}}

Datadog AI Guard は、AI の動作をリアルタイムで**検査**、**ブロック**、**管理**するように設計された多層防御製品です。AI Guard は、既存の Datadog トレーシングおよびオブザーバビリティワークフローと直接連携し、本番環境のエージェンティック AI システムを保護するように構築されています。**AI アプリ/エージェントとインライン**で動作し、既存のプロンプトテンプレート、ガードレール、ポリシーチェックの上にレイヤーを追加することで、**クリティカルパスの LLM ワークフローを保護**します。

AI Guard は、プロンプト保護、ツール保護、機密データ保護により、プロンプトインジェクション、ジェイルブレイク、機密データの流出攻撃から保護します。これらの機能を組み合わせることで、[エージェンティックリーサルトライフェクタ][3]から保護します。
- 特権システムアクセス
- 信頼できないデータへの露出
- アウトバウンド通信

AI Guard は、LLM の入力および出力に含まれる個人識別情報 (PII) やシークレットなどの機密データも検出します。これらの保護機能は、OpenAI、Anthropic、Bedrock、VertexAI、Azure を含む、あらゆるターゲット AI モデルで機能します。AI エージェントとサービスがどのようにマッピングされているか、それらが相互にどのようにやり取りしているか、また AI Guard がどれを保護しているかを確認するには、[{{< ui >}}Discover{{< /ui >}}][5] ページにアクセスします。

コードや設定なしで会話をすばやく評価するには、[{{< ui >}}AI Guard Playground{{< /ui >}}][4] を使用してユーザー入力、アシスタント出力、ツール呼び出しを送信し、評価結果をリアルタイムで確認します。

AI Guard の設定方法については、[AI Guard を使い始める][1] を参照してください。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/ai_guard/onboarding/
[2]: https://genai.owasp.org/llm-top-10/
[3]: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
[4]: /ja/security/ai_guard/onboarding/#playground
[5]: https://app.datadoghq.com/security/ai-guard/discover