---
description: Workload Protection が Agent イベントを分析するために使用するバックエンドの検知ルールと検索ルールを比較します。
disable_toc: false
title: 検知ルールと検索ルール
---
Agent が [Agent イベント][1]を Datadog に転送した後、バックエンドルールがそのテレメトリを分析してセキュリティ結果を生成します。Workload Protection は、2 種類のバックエンドルールを提供します。

- **[検知ルール][2]**は、不審なアクティビティが条件に一致した場合に脅威を検知し、[セキュリティシグナル][3]を生成します。これらは、リバースシェルや認証情報へのアクセス試行など、実際のランタイムセキュリティ脅威を明らかにします。
- **[検出ルール][4]**は、ランタイムセキュリティポスチャを評価し、[検出結果][5]とポリシーに違反するリソースに対する推奨事項を生成します。これらは、本番環境のコンテナ内でのパッケージマネージャーの使用など、ホストまたはコンテナ上で行われている悪い習慣や設定ミスを追跡します。

どちらのルールタイプも、同じ**バックエンドイベントスキーマ**をクエリします。各イベントには、Agent によって収集されたすべてのフィールドに加え、インフラストラクチャーのコンテキストや脅威インテリジェンスなどの追加のエンリッチメントが含まれます。検知ルールまたは検出ルールの検索クエリを作成する際、このスキーマ内の任意のフィールドでフィルタリングできます。すべての利用可能なフィールドについては、「[Linux バックエンド構文][6]」および「[Windows バックエンド構文][7]」を参照してください。

## 検知ルールと検出ルールの比較 {#detection-rules-versus-finding-rules}

| | 検知ルール | 検出ルール |
|---|---|---|
| **出力** | セキュリティシグナル | 検出結果 |
| **表すもの** | 実際のランタイムセキュリティ脅威 | ポスチャの問題とセキュリティの推奨事項 |
| **ユースケース** | 脅威検知とインシデント対応 | ランタイムポスチャとハードニング |

たとえば、`Sudoers Policy File Modification Detection` は、`/etc/sudoers` への変更および`/etc/sudoers.d/` 内のファイルへの変更にフラグを設定します。これらのファイの変更は悪い慣習ですが、正当なプロセスの一部である場合もあります。それを検知ルールとして扱うと、過剰なノイズが生成されます。検出ルールとして扱った場合、すべてのファイル書き込みに対するシグナルをトリガーすることなく、どのリソースにこの構成があるかを追跡します。

## 次のステップ{#next-steps}

- 「[検知ルール][2]」を読んで、OOTB (すぐに使える) 脅威検知ルールを確認し、カスタム検知ルールを作成します。
- 「[検出ルール][4]」を読んで、OOTB ポスチャルールを確認し、カスタム検出ルールを作成します。
- 「[Linux バックエンド構文][6]」および「[Windows バックエンド構文][7]」を参照して、ルールクエリで使用できるすべてのフィールドを確認します。

[1]: /ja/security/workload_protection/investigate_and_triage/agent_events
[2]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[3]: /ja/security/workload_protection/investigate_and_triage/security_signals
[4]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[5]: /ja/security/workload_protection/investigate_and_triage/security_findings
[6]: /ja/security/workload_protection/backend_linux
[7]: /ja/security/workload_protection/backend_windows