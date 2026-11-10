---
aliases:
- /ja/bits_ai/bits_ai_sre/remediate_issues/
- /ja/bits_ai/bits_investigation/remediate_issues/
- /ja/bits_ai/bits_ai_sre/take_action/
- /ja/bits_ai/bits_investigation/take_action/
description: Bits が根本原因の調査において、実行可能な対処の次のステップをどのように提供するかを説明します。
site_support_id: bits_remediation
title: Bits Remediation
---
{{< callout url="https://www.datadoghq.com/product-preview/bits-remediation/" >}}
  Bits Remediation には、プレビュー版の機能が含まれています。<strong>Request Access</strong> をクリックして、プレビュー版プログラムに参加してください。
{{< /callout >}}

## コード修正を自動化する {#automate-code-fixes}

Bits が調査から根本原因を特定した後、可能な限り迅速に対処することも支援します。

Bits Investigation は [Bits Code][2] と統合され、コード修正を生成します。Bits はソースコードプロバイダーに接続し、Datadog によって検出された既存の問題に基づいて、本番環境に対応したプルリクエストを作成、更新、反復します。

デフォルトでは、Bits はコードに関連する根本原因を持つ調査に対して、自動的にコード修正を生成します。手動でコード修正を生成するには、[設定][3]で自動コード修正生成を無効にしてください。

コード修正の使用を開始するには、
1. [Bits Code をセットアップ][1]してください。Bits がコードに関連する根本原因を特定すると、デフォルトで Next Steps に推奨されるコード修正が生成されます。
1. 自動コード修正が無効になっている場合は、Next Steps から手動でコード修正を生成してください。
1. コードセッション内で Bits とチャットして、推奨されるコード修正を更新してください。
1. レビュー用のプルリクエストを作成し、準備ができたらマージしてください。

コード修正を有効にすると、ループを閉じて Bits Investigation から直接問題を解決できます。

{{< img src="bits_ai/bits_remediation/suggested_code_fix.png" alt="推奨されるコード修正とその他の次のステップを含む根本原因の結論を示す Bits Investigation の仮説ツリー" style="width:100%;" >}}

## トリアージアクションを実行する {#run-triage-actions}

チャットから、調査ワークフローを離れることなくトリアージアクションをトリガーできます。

サポートされているアクションは以下のとおりです。
- Slack および Microsoft Teams へのメッセージ送信
- Datadog および PagerDuty でのインシデント作成
- Datadog On-Call を使用したエンジニアへのページング
- Datadog Work Management での作業項目の作成
- Jira チケットのオープン

Bits は、調査および接続されたインテグレーションから関連するコンテキストを抽出し、メッセージ、インシデントの説明、チケットのメタデータを事前入力できます。これにより、手作業が削減され、一貫性が確保され、対応時間が短縮されます。

## インフラストラクチャーに対してアクションを実行する {#take-action-on-your-infrastructure}

{{< callout >}} ワンクリックアクションはプレビュー版です。{{< /callout >}}

インフラストラクチャー関連の問題に対して、Bits はデプロイメントのスケーリング、Pod の再起動、リソースのパッチ適用などの修復アクションを推奨できます。

- **手動での推奨事項**: 推奨されたコマンド (例: `kubectl patch` コマンド) をコピーし、独自の CLI で実行してください。
- **ワンクリックアクション (プレビュー版)**: **Run** をクリックして、Bits に推奨された修復アクションを調査コンテキストから直接実行させてください。

{{< img src="bits_ai/bits_remediation/one_click_action.png" alt="デプロイメントを再起動するための手順と [Run] ボタンが表示された、推奨される修復アクション" style="width:100%;" >}}

Kubernetes アクションはプレビュー版でサポートされています。サポートされているアクションの全リストと Datadog での有効化方法については、[Action Catalog][4] を参照してください。

ワンクリック Kubernetes アクションを実行するには、組織で以下が必要です。
- Kubernetes クラスターへのネットワークアクセス権を持つ [Private Action Runner][5] と、Kubernetes インテグレーションへの[コネクション][6]のペアリング。
- アクションを実行し、Kubernetes コネクションを解決する権限を持つユーザーロール。

## Bits による修復アクションの実行方法を管理する {#govern-how-bits-takes-remediation-action}

{{< callout >}} Bits Guardrails はプレビュー版です。{{< /callout >}}

[Bits Guardrails][8] を使用すると、管理者は Bits が実行できる修復アクション、それらのアクションが適用される場所、および承認が必要なユーザーを定義できます。

Guardrails には `Guardrails Read` および `Guardrails Write` の権限が必要です。これらは [Organizational Settings > Roles][7] で有効にできます。

ガードレールを作成するには、
1. **対象とするアクションを選択**: ガードレールの対象とするインテグレーション (Kubernetes など) で、1 つ以上の利用可能なアクションを選択してください。
1. **ガードレールのスコープを定義**: ガードレールが適用される環境、サービス、およびリソースタグを指定してください。
1. **強制レベルを設定**: 選択したアクションとスコープについて、Bits がいつアクションを実行できるかを決定してください。
    - **確認**: Bits がアクションを実行する前に、ユーザーの承認を必要とします。承認できるチーム、ロール、または個人を選択してください。
    - **拒否**: Bits はアクションを推奨できますが、実行することはできません。

## 問題が解決されたことを検証{#validate-that-issues-are-resolved}

Bits は、修復アクションが正常に適用されたかどうか、および元の問題が解決されたかどうかを確認できます。**Verify Resolution** をクリックして、修復アクションと問題のステータスを確認してください。

[1]: /ja/bits_ai/bits_code/setup/
[2]: /ja/bits_ai/bits_code
[3]: https://app.datadoghq.com/bits-ai/settings/source-code-integration
[4]: /ja/actions/actions_catalog/
[5]: /ja/actions/private_actions/
[6]: /ja/actions/connections/
[7]: https://app.datadoghq.com/organization-settings/roles
[8]: https://app.datadoghq.com/bits-ai/settings/remediation-guardrails