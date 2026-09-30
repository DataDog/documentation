---
aliases:
- /ja/bits_ai/bits_ai_sre/help_bits_learn/
- /ja/bits_ai/bits_investigation/help_bits_learn/
- /ja/bits_ai/bits_ai_sre/knowledge_sources/
title: ナレッジソース
---
Bits Investigation は、3 つの異なるナレッジソースを組み合わせることで、時間の経過とともに改善されます。
- [**Runbooks:**](#runbooks) ステップごとのトラブルシューティングガイダンス
- [**bits.md:**](#bitsmd) 環境に関するコンテキスト
- [**Feedback and memories:**](#feedback-and-memories) 過去の調査から得られた知見

## Runbooks{#runbooks}
Bits のオンボーディングは、新しいチームメイトを迎えるのと同じように考えてください。提供するコンテキストが多いほど、Bits はより適切に調査を行えるようになります。

モニターメッセージに直接ステップバイステップのトラブルシューティング手順を追加するか、それらの手順が含まれている Confluence ページにリンクすることができます。

- **Datadog のテレメトリへのリンクを含める**: モニターメッセージに手順を追加する際は、最も関連性の高いテレメトリへのリンクを含めてください。モニターがトリガーされた際に Datadog で最初に確認する場所 (ダッシュボード、ログ、トレース、主要なウィジェットを含むノートブックなど) へのリンクから始めることができます。リンクに特別なフォーマットは不要で、通常の URL で問題ありません。

これらのリンクはユーザーが定義できるため、Bits がどのデータを検証するかを制御でき、人間が確認するのと同じデータに焦点を当てさせたり、チームのワークフローに合わせて調査内容を柔軟に調整したりすることが可能です。

- **Notebooks**: モニターから、そのモニターや関連サービスのトラブルシューティング手順を記載したノートブックへのリンクを貼ることができます。Notebooks は Markdown と Datadog クエリをサポートしており、根本原因分析を最適に行うための手順をエージェントに指示できます。

- **Confluence とのインテグレーション**: Runbook を Confluence で管理している場合は、関連ページへのリンクをモニターのメッセージに含めてください。調査中、Bits はそのページを読み取り、テレメトリへのリンクを抽出して、可能な限り記載されたトラブルシューティング手順に従い、修復ガイダンスを推奨事項に組み込みます。

このインテグレーション機能を最大限に活用するには、関連するサービス、依存関係、システムを詳細に文書化し、問題を解決するための明確なステップごとの手順を提供します。適切に構成された具体的な Runbook があれば、Bits はより正確かつ効果的な調査を行うことができます。

{{< img src="bits_ai/optimization_example.png" alt="最適化ステップを適用したモニターの例" style="width:100%;" >}}

## Bits.md{#bitsmd}

[{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits.md{{< /ui >}}][2] に `bits.md` ファイルを作成することで、Bits による環境の調査方法を能動的にガイドできます。

`bits.md`は、環境に関する構造化されたコンテキストを Bits に提供する Markdown ファイルです。これは、調査の精度向上、クエリの構築、用語の統一を図るための簡易的なガイドとして機能します。タグ付けの規則、アーキテクチャパターン、用語集、調査のベストプラクティスなど、チーム固有の知識を追加してください。

### bits.md のサンプル{#sample-bitsmd}

{{< code-block lang="markdown" filename="bits.md" collapsible="true" >}}

## Scope rules
- Always carry forward explicit scope from the user (env, service, team, region, namespace).
- Treat mentioned values as hard filters in all queries.
- Do not broaden scope unless explicitly asked.

---

## Tag and naming conventions

### Environment normalization
Environment values may differ across telemetry sources (monitors, APM, logs, tickets).

Example:
- Alerts/APM: `env:blue-prod`
- Logs: `env:prod`

Rule: When switching data sources, normalize to the correct env value for that source before querying.

---

### Service name normalization
Service/application names may appear in different formats across systems (alerts, logs, tickets, asset systems).

Example:
- Alert tag: `checkout_prd`
- Ticketing system: `CHECKOUT`
- Logs: `checkout-service`

Rule:
- Derive a canonical service name.
- Use case-insensitive or wildcard matching when correlating across systems.
- Do not assume naming is identical across tools.

---

## Kubernetes quick checks
For pod issues, check Kubernetes events first:
`source:kubernetes pod_name:<pod> kube_namespace:<namespace>`

Common causes:
- `FailedMount` → missing Secret/ConfigMap
- `ImagePullBackOff` → image/registry issue
- `OOMKilled` → memory pressure

---

## Known noise and false positives
Document recurring patterns that look like incidents but are expected behavior.

Examples:
- Nightly batch jobs trigger CPU spikes between 02:00–02:30 UTC.
- Synthetic monitoring tests intentionally generate short-lived 5xx errors.
- Canary deployments temporarily increase error rates during rollout.
- Autoscaling events may cause brief latency spikes.

Rule:
- Check whether the signal matches a documented noise pattern.
- If behavior matches a known pattern, classify as expected unless additional impact is observed.

{{< /code-block >}}

## フィードバックとメモリ{#feedback-and-memories}

調査の最後に、Bits が行った結論が正しかったかどうかを Bits に伝えます。

{{< img src="bits_ai/help_bits_ai_learn_2.png" alt="調査後の根本原因フィードバックフロー" style="width:100%;" >}}

結論が不正確だった場合は、Bits に正しい根本原因を伝え、見落としていた点を指摘し、次回はどのように対応すべきかを説明します。フィードバックには以下の内容を含めてください。
- 実際の根本原因を特定する (観察された影響や症状だけでなく)
- 関連するサービス、コンポーネント、またはメトリクスを明記する
- 根本原因を示すテレメトリへのリンクを含める

**高品質な根本原因フィードバックの例**:「セッションキャッシュのメモリリークにより auth-service Pod のメモリ使用量が高騰し、2025 年 11 月 15 日 14:30 UTC から 2 時間ごとに OOM kill が発生しています。これは `https://app.datadoghq.com/logs?<rest_of_link>` で確認できます」

すべての肯定的なフィードバック、および Bits チャットで提供された詳細情報を含む否定的なフィードバックは、**メモリ**として記録されます。Bits は、パフォーマンス向上のため、今後の調査で使用するメモリを動的に選択します。過去の修正を類似のコンテキストに適用し、効果的なクエリを再利用し、調査ステップの優先順位付けの方法を洗練させます。これにより時間の経過とともに、Bits は環境に適応し、調査を重ねるごとに精度と効率が向上します。

メモリの表示や削除を含む管理を行うには、[モニター管理][1]ページの [{{< ui >}}Memories{{< /ui >}}] 列に移動してください。

[1]: https://app.datadoghq.com/bits-ai/monitors/supported
[2]: https://app.datadoghq.com/bits-ai/settings/bits-md