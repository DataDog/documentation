---
description: プライベートアクションランナーの構成設定、サポートされているアクションとインテグレーション、および資格情報ファイル形式のリファレンステーブル。
further_reading:
- link: actions/private_actions/
  tag: ドキュメント
  text: Private Actions の概要
- link: actions/private_actions/set_up_agent_based/
  tag: ドキュメント
  text: プライベートアクションランナーのセットアップ
- link: actions/private_actions/execution_policies/
  tag: ドキュメント
  text: 実行ポリシー
- link: actions/connections/private_action_credentials/
  tag: ドキュメント
  text: プライベートアクション資格情報の処理
title: Private Actions ランナーリファレンス
---
## 概要 {#overview}

このページはプライベートアクションランナーのリファレンスであり、構成設定、各ランナーがサポートするアクションとインテグレーション、および資格情報ファイル形式について説明しています。Private Actions のコンセプトとセットアップの詳細については、[Private Actions の概要][1] を参照してください。

## ランナー構成 {#runner-configuration}

ランナーは、その [構成][2] の `private_action_runner` セクションから設定を読み取ります。

登録設定 (`self_enroll` および `api_key_only_enrollment`) がランナーの登録にどのように適合するかについては、[登録と所有権][3] を参照してください。

ランナーのインストール方法によって、同じ設定の名前が異なります。ホストインストールでは環境変数を使用し、Helm では `privateActionRunner` の下で camelCase キーを使用し、Datadog Operator では `private_action_runner` の下で snake_case キーを使用します。このテーブルを使用して、インストール方法間で共通の設定を変換します。

| 設定 | ホスト (環境変数) | Helm (`privateActionRunner.*`) | Operator (`private_action_runner.*`) |
|---|---|---|---|
| 有効化 | `DD_PRIVATE_ACTION_RUNNER_ENABLED` | `enabled` | `enabled` |
| 自動登録 | `DD_PRIVATE_ACTION_RUNNER_SELF_ENROLL` | `selfEnroll` | `self_enroll` |
| アクション許可リスト | `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` (カンマ区切り) | `actionsAllowlist` (リスト) | `actions_allowlist` (リスト) |

## サポートされているアクションとインテグレーション {#supported-actions-and-integrations}

このマトリックスは、各インテグレーションについて、各ランナータイプでの可用性と、[実行ポリシー][4] を通じて承認可能かどうかを示しています。

<div class="alert alert-info">Agent での可用性と実行ポリシーによる承認は独立しています。インテグレーションは、実行ポリシーを通じて承認可能でなくても、Agent 内で実行できます。</div>

| 統合 | Agent 内のランナー | <br>実行ポリシーを通じて認可可能 | スタンドアロンランナー |
|---|:---:|:---:|:---:|
| Kubernetes | {{< X >}} | {{< X >}} | {{< X >}} |
| Remote Action (例: rshell) | {{< X >}} | {{< X >}} | {{< X >}} |
| Script | {{< X >}} | {{< X >}} | {{< X >}} |
| HTTP | {{< X >}} |  | {{< X >}} |
| GitLab | {{< X >}} |  | {{< X >}} |
| Jenkins | {{< X >}} |  | {{< X >}} |
| MongoDB | {{< X >}} |  | {{< X >}} |
| PostgreSQL |  |  | {{< X >}} |
| Temporal | {{< X >}} |  | {{< X >}} |

- **Remote Action** は、`com.datadoghq.remoteaction` プレフィックスの下にあるインテグレーションファミリーです。これには rshell バンドルが含まれており、その `runCommand` アクションは制限付きシェルを通じてシェルコマンドを実行します。[Agent Restricted Shell (rshell)][8] を参照
- **スクリプト**アクションは、ランナーの `script-config.yaml` で宣言された *事前定義済み* スクリプトに限定されます。スクリプトアクション (Linux 用の `runPredefinedScript` または Windows 用の `runPredefinedPowershellScript`) の構成については、[プライベートアクションランナーでスクリプトを実行する][5] を参照してください。

{{% collapse-content title="ランナータイプ別の利用可能なアクション" level="h3" %}}

{{< partial name="actions/private_actions_allowlist.html" >}}

{{% /collapse-content %}}

## 資格情報ファイル形式 {#credential-file-formats}

HTTP、Jenkins、PostgreSQL、MongoDB、Temporal などの一部のインテグレーションでは、実行に資格情報が必要です。資格情報は、[コネクション][6] から参照する JSON ファイルとしてランナーに提供されます。各インテグレーションには、独自の資格情報ファイル構造とサポートされている認証方法があります。

資格情報ファイル形式の全セットと例については、[プライベートアクション資格情報の処理][7] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/private_actions/
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/private_action_runner.yaml
[3]: /ja/actions/private_actions/enroll_runner/
[4]: /ja/actions/private_actions/execution_policies/
[5]: /ja/actions/private_actions/run_script/
[6]: /ja/actions/connections/
[7]: /ja/actions/connections/private_action_credentials/
[8]: /ja/agent/guide/rshell/