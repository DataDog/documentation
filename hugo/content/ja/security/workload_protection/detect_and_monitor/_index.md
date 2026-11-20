---
aliases:
- /ja/security/workload_protection/workload_security_rules
- /ja/security/threats/workload_security_rules
- /ja/security/cloud_workload_security/workload_security_rules
- /ja/security_platform/cloud_workload_security/workload_security_rules
description: Workload Protection が脅威を検出するために使用する Agent ルール、検出ルール、検索ルール、脅威インテリジェンス、およびコンテンツパックについて説明します。
disable_toc: false
title: 検出とモニター
---
Workload Protection は、さまざまなルールに基づいてワークロードのアクティビティを評価します。それらを組み合わせることで脅威を検出し、ランタイムのセキュリティポスチャを評価し、詳細な監査機能を提供します。Agent ルールは、どのアクティビティが Datadog に送られるかを選択します。検出ルールと検索ルールは、そのアクティビティを分析します。それは、脅威インテリジェンスにより評判に関するコンテキストで強化されます。コンテンツパックは、特定のソフトウェアスタックや脅威ベクトルのためのルールをオプションとしてバンドルします。

これらのルールが検出パイプラインでどのように組み合わされるかについては、[Workload Protection の仕組み][19] を参照してください。

## Agent ルール {#agent-rules}

[Agent ルール][1] は、どのアクティビティを Datadog バックエンドに送信して詳細分析するかを定義します。
- [SECL ガイド][15] (SECL 式言語を使用してカスタム Agent ルールを作成する)
- [ポリシー管理][9] (カスタムおよびデフォルトの Agent ルールをデプロイする)
- [変数とアクション][16] (ステートフルな検出および追加のテレメトリ収集を実施する)
- [Linux 式][17] および [Windows 式][18] (クエリ可能な SECL フィールドの全セット)

## 検出ルールと検索ルール {#detection-and-finding-rules}

[検出ルールと検索ルール][3] は、[Agent イベント][2] を分析したり、[シグナル][5] または [検索結果][6] を生成したりするために使用されるバックエンドロジックを記述します。
- [検出ルール][11] (脅威検出とインシデント対応)
- [検索ルール][12] (ランタイムポスチャと強化)
- [Linux バックエンド構文][13] および [Windows バックエンド構文][14] (クエリ可能なイベントフィールドの全セット)

## 脅威インテリジェンス {#threat-intelligence}

Workload Protection は、脅威インテリジェンスデータベースを使用することにより、[Agent イベント][2] を強化し、マルウェアや既知の悪意のあるエンティティを検出します。[脅威インテリジェンス][7] ページを利用すれば、次のことができます。
- Workload Protection に標準で付属している (OOTB) 脅威インテリジェンスデータベースの内容を調べる
- 独自の脅威インテリジェンスデータベースをインポートし、Workload Protection で動作するようにそれを構成する

## コンテンツパック {#content-packs}

Workload Protection は、特定のソフトウェアスタック、脅威ベクトル、および新たに出現する脆弱性に対応するために Datadog で作成構築した、特定ターゲット向けの [コンテンツパック][10] を提供します。[コンテンツパック][10] のページを利用すれば、次のことができます。
- ワークロードセキュリティの主な用途のための [コンテンツパック] の内容を調べて有効化する
- オプションの検出機能を、その適用対象となるワークロードにのみデプロイする
- Datadog が管理するルール更新を通じて、新たな脅威に関する情報を常に最新のものに保つ

[1]: /ja/security/workload_protection/detect_and_monitor/agent_rules
[2]: /ja/security/workload_protection/investigate_and_triage/agent_events
[3]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules
[5]: /ja/security/workload_protection/investigate_and_triage/security_signals
[6]: /ja/security/workload_protection/investigate_and_triage/security_findings
[7]: /ja/security/workload_protection/detect_and_monitor/threat_intelligence
[9]: /ja/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[10]: /ja/security/workload_protection/detect_and_monitor/content_packs
[11]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[12]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[13]: /ja/security/workload_protection/backend_linux
[14]: /ja/security/workload_protection/backend_windows
[15]: /ja/security/workload_protection/detect_and_monitor/agent_rules/secl_guide
[16]: /ja/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[17]: /ja/security/workload_protection/linux_expressions
[18]: /ja/security/workload_protection/windows_expressions
[19]: /ja/security/workload_protection/#evaluating-activity