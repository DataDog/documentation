---
title: Skill callout
draft: true
private: true
---

{% skill-callout
  title="Set up RUM with an agent"
  text="Copy this prompt into your AI coding agent to use the `dd-orchestrator` skill for guided RUM setup."
  action_name="copy_dd_orchestrator_rum_setup_prompt"
  lang="text"
%}
Using the skill at https://github.com/datadog-labs/agent-skills/blob/main/dd-orchestrator/SKILL.md, set up Datadog RUM in my project.
{% /skill-callout %}

### Body only with default language

{% skill-callout %}
echo "Install Datadog"
{% /skill-callout %}

### Title only

{% skill-callout title="Review the migration" %}
datadog-ci migration review
{% /skill-callout %}

### Supporting text only

{% skill-callout text="Run this with the `dd-orchestrator` skill." %}
datadog-ci setup
{% /skill-callout %}

### Action name only with multiline body

{% skill-callout action_name="copy_multiline_agent_prompt" %}
echo "first step"
echo "second step"
{% /skill-callout %}