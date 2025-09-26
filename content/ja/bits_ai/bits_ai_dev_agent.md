---
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-dev-agent/
  tag: ブログ
  text: Bits AI Dev Agent が問題を自動検出し、修正案を生成
title: Bits AI Dev Agent
---

"{{< callout url="http://datadoghq.com/product-preview/bits-ai-dev-agent" >}}
Bits AI Dev Agent はプレビュー版です。サインアップするには、 <strong>Request Access</strong> をクリックし、フォームに入力してください。
{{< /callout >}}"

{{< img src="bits_ai/dev_agent/error_tracking_assistant.png" alt="Bits AI Dev Agent が Django アプリで発生した IndexError の修正を提案している様子" style="width:100%;">}}

Bits AI Dev Agent は、可観測性データを活用してコードの重大な問題を検出、診断、修正する生成 AI コーディング アシスタントです。重大な問題が検出されると、プロダクション レディのプル リクエストを自動で作成し、開発者からのフィードバックに基づいて修正を繰り返します。

## 主な機能

- 重大な問題が検出されると、プロダクション レディの修正を含む GitHub プル リクエストを自動で作成します。 
- チャット メッセージやレビュー コメントに応じてコードを繰り返し改善します。 
- Bits AI Dev Agent が生成したプル リクエストを一元表示し、ステータス、トリガー元のプロダクト、影響を受けるサービスでフィルターできます。 

## 対応している Datadog プロダクト

Bits AI Dev Agent は次の Datadog プロダクトで利用できます。

| プロダクト                   | 提供状況          | 検出される問題                                                    |
|---------------------------|----------------------|--------------------------------------------------------------------|
| [Error Tracking][1]       | プレビュー              | クラッシュ、パニック、例外、未処理エラー                      |
| [Code Security][2]        | プレビュー              | ファーストパーティ コードおよびオープン ソース 依存関係におけるセキュリティ問題   |
| [Continuous Profiler][3]  | プレビュー              | コード レベルのパフォーマンス問題                                      |

## セットアップ

<div class="alert alert-info">現時点では、Bits AI Dev Agent がサポートするのは GitHub のみです。</div>

### GitHub インテグレーションを有効化する

Bits AI Dev Agent を使用するには、 [GitHub integration][4] をインストールする必要があります。インストールと設定の詳細については、 [GitHub インテグレーション ガイド][5] を参照してください。

<div class="alert alert-info">
  Bits AI Dev Agent の機能を有効にするため、GitHub インテグレーションには次の権限を付与する必要があります:
  <ul style="font-size: inherit; padding-left: 1.25rem; margin-top: 0.5rem;">
    <li style="font-size: inherit;"><strong>Repository contents</strong> (<code>contents: read</code>, <code>contents: write</code>)</li>
    <li style="font-size: inherit;"><strong>Pull requests</strong> (<code>pull_requests: write</code>)</li>
  </ul>
</div> 

### service と version でテレメトリーにタグを付与する

Bits AI Dev Agent は `service` と `version` のテレメトリー タグを使用し、エラーや脆弱性などの問題を、その時点で実行されていたコードのバージョンに関連付けます。テレメトリーへのタグ付け方法については、Datadog Source Code Integration ドキュメントの [Tag your telemetry with Git information][6] セクションを参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/error_tracking
[2]: /ja/security/code_security
[3]: /ja/profiler/
[4]: https://app.datadoghq.com/integrations/github
[5]: /ja/integrations/github/
[6]: /ja/integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information