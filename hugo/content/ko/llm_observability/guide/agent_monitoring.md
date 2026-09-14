---
aliases:
- /ko/llm_observability/agent_monitoring
- /ko/llm_observability/monitoring/agent_monitoring/
description: Agent Observability를 사용하여 OpenAI Agents SDK, LangGraph 또는 CrewAI로 구축된
  에이전트 애플리케이션을 모니터링하고, 문제를 해결하며, 개선하십시오.
further_reading:
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: 학습 센터
  text: LLM Observability로 조사
- link: https://www.datadoghq.com/blog/openai-agents-llm-observability/
  tag: 블로그
  text: Datadog LLM Observability로 OpenAI 에이전트를 모니터링하십시오.
- link: https://www.datadoghq.com/blog/monitor-ai-agents/
  tag: 블로그
  text: Datadog으로 AI 에이전트를 모니터링하고, 문제를 해결하며, 개선하십시오.
- link: https://www.datadoghq.com/blog/llm-observability-bedrock-agents/
  tag: 블로그
  text: Datadog LLM Observability로 Amazon Bedrock 기반 에이전트 모니터링
- link: https://www.datadoghq.com/blog/langgraph-agent-monitoring/
  tag: 블로그
  text: 'Datadog을 사용한 LangGraph 에이전트 모니터링: 실용적인 가이드'
title: Agent Monitoring
---
## 개요 {#overview}

Agent Observability를 사용하면 에이전트 애플리케이션을 모니터링하고, 문제를 해결하며, 개선할 수 있습니다. Python용 Agent Observability SDK를 사용하면 [OpenAI Agents SDK][1], [LangGraph][2] 또는 [CrewAI][3]로 구축된 단일 또는 다중 에이전트 시스템의 상태와 품질을 모니터링할 수 있습니다.

에이전트 애플리케이션의 경우, Agent Observability를 통해 다음을 수행할 수 있습니다.

- 오류율, 지연 시간 증가 또는 비용을 모니터링하십시오. 
- 사용된 도구나 작업이 전달된 에이전트를 포함한 에이전트 결정을 시각화하십시오.
- 에이전트 실행의 엔드투엔드 요청을 추적하고 문제를 해결하십시오.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/setup/auto_instrumentation?tab=python#openai-agents
[2]: /ko/llm_observability/setup/auto_instrumentation?tab=python#langgraph
[3]: /ko/llm_observability/setup/auto_instrumentation?tab=python#crew-ai