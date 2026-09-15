---
aliases:
- /ja/llm_observability/agent_monitoring
- /ja/llm_observability/monitoring/agent_monitoring/
description: Agent Observabilityを使用して、OpenAI Agents SDK、LangGraph、またはCrewAIで構築されたエージェントアプリケーションを監視、トラブルシューティング、および改善します。
further_reading:
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: ラーニングセンター
  text: LLM Observabilityで調査します
- link: https://www.datadoghq.com/blog/openai-agents-llm-observability/
  tag: ブログ
  text: Datadog LLM ObservabilityでOpenAI Agentsを監視します
- link: https://www.datadoghq.com/blog/monitor-ai-agents/
  tag: ブログ
  text: DatadogでAIエージェントを監視、トラブルシューティング、および改善します
- link: https://www.datadoghq.com/blog/llm-observability-bedrock-agents/
  tag: ブログ
  text: Datadog LLM ObservabilityでAmazon Bedrock上に構築されたエージェントを監視します
- link: https://www.datadoghq.com/blog/langgraph-agent-monitoring/
  tag: ブログ
  text: DatadogによるLangGraphエージェントの監視：実践ガイド
title: エージェント監視
---
## 概要 {#overview}

Agent Observabilityを使用すると、エージェントアプリケーションを監視、トラブルシューティング、および改善できます。Agent Observability SDK for Pythonを使用すると、[OpenAI Agents SDK][1]、[LangGraph][2]、または[CrewAI][3]で構築されたシングルエージェントシステムやマルチエージェントシステムの健全性と品質を監視できます。

Agent Observabilityを使用すると、エージェントアプリケーションに対して次のことが可能になります。

- エラー率、レイテンシーの蓄積、またはコストを監視します 
- 使用されたツールやタスクが引き継がれたエージェントなど、エージェントの決定を可視化します
- エージェント実行のエンドツーエンドのリクエストをトレースおよびトラブルシューティングします

## 詳細はこちら {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/setup/auto_instrumentation?tab=python#openai-agents
[2]: /ja/llm_observability/setup/auto_instrumentation?tab=python#langgraph
[3]: /ja/llm_observability/setup/auto_instrumentation?tab=python#crew-ai