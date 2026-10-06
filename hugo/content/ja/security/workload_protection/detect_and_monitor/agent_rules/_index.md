---
description: Agentルールが、Datadog Agentが収集し、AgentイベントとしてDatadogに送信するランタイムアクティビティをどのように決定するかを学びます。
disable_toc: false
title: Agentルール
---
Agentルールは、Datadog Agentが収集し、AgentイベントとしてDatadogに送信するランタイムアクティビティを決定します。これらのイベントは、Workload Protectionが脅威検知およびランタイムセキュリティ態勢評価に使用するテレメトリを提供します。Datadogバックエンドの検知ルールとファインディングルールは、それらのイベントを分析してセキュリティシグナルとファインディングを生成します。Agentイベントは、ワークロードからの低レベルのランタイムアクティビティをキャプチャし、静的な構成や定期的なスキャンのみに頼るのではなく、システムで実際に何が起こっているかを理解するために必要な、生の忠実度の高いデータを提供します。

ノイズ、データ量、およびパフォーマンスへの影響を軽減するために、AgentはイベントをDatadogに送信する前に、良性または低リスクのアクティビティをフィルタリングします。Agentルールは、Datadog Security Language（SECL）を使用してこのフィルタリングを定義します。ポリシーは、Remote Configuration、Agent構成ファイル、またはTerraformを通じてAgentルールをデプロイします。

## すぐに使えるAgentルール {#ootb-rules}

Workload Protectionには、Datadogが管理するデフォルトルールと呼ばれる、すぐに使える（OOTB）Agentルールが含まれています。これらを表示するには、Datadogの[Agent Rules][1]を参照してください。Datadogのセキュリティエンジニアがこれらのルールを保守しています。彼らは、新たなマルウェアの動作、進化する攻撃手法、およびその他のセキュリティ関連のアクティビティに対するルールを追加します。

デフォルトルールを選択的に環境やワークロードにデプロイしたり、クローンを作成して式をカスタマイズしたり、フィルタリングロジックを調整したり、アクションを追加したりできます。デプロイメントオプションについては、[Policy Management][2]を参照してください。

Agentルールは、コンテキストに応じたテレメトリを収集したり、確度の高いアクティビティを照合してAgentアクションを実行したりできます。バックエンドの検知ルールは、Agentイベントを分析し、セキュリティシグナルを生成します。

## SECLでカスタムAgentルールを作成する {#write-custom-agent-rules-in-secl}

Workload Protection Agentルールは、SecLと呼ばれるカスタム式言語を使用して、ランタイムコンテキストに基づいて監視、照合、およびDatadogに送信するイベントを指定します。詳細については、[SecLガイド][5]を参照してください。

Agentルールと脅威検出ルールを一緒に作成するには、支援付きルール作成ツールまたは手動フローを使用します。[検出ルール][4]ドキュメントの[カスタムAgentルールと検出ルールを一緒に作成する][3]を参照してください。


## ポリシーを使用してAgentルールをデプロイする {#deploy-agent-rules-with-policies}

Agentルールはパッケージ化され、ポリシー内でデプロイされます。ポリシーはDatadogで一元管理するか、Terraformを使用して管理し、Remote Configurationを使用して、またはAgent構成ファイルを手動で変更してAgentにデプロイします。詳細については、[Policy Management][2]を参照してください。
## 変数とアクションを使用する {#use-variables-and-actions}

変数とアクションにより、Agentルールはイベントマッチングを超えて拡張されます。アクションは、ファイルハッシュなどの追加のテレメトリの収集、脅威への対応、またはSECL変数の操作を行うことができます。SECL変数を使用すると、ステートマシンに基づいた高度なステートフルな検出ロジックを構築できます。詳細については、[Variables and actions][6]を参照してください。

[1]: https://app.datadoghq.com/security/workload-protection/agent-rules?ruleQuery=defaultRule%3Atrue
[2]: /ja/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[3]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together
[4]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[5]: /ja/security/workload_protection/detect_and_monitor/agent_rules/secl_guide
[6]: /ja/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions