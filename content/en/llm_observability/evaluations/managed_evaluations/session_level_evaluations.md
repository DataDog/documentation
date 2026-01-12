---
title: Session Level Evaluations
description: Learn how to configure managed evaluations for your LLM applications.
further_reading:
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up LLM Observability"
aliases:
    - /llm_observability/evaluations/session_level_evaluations
---

Session level evaluations help ensure your LLM-powered applications successfully achieve intended user outcomes across entire interactions. These managed evaluations analyze multi-turn sessions to assess higher-level goals and behaviors that span beyond individual spans, giving insight into overall effectiveness and user satisfaction.


#### Goal Completeness

An agent can call tools correctly but still fail to achieve the user’s intended goal. This evaluation checks whether your LLM chatbot can successfully carry out a full session by effectively meeting the user’s needs from start to finish. This completeness measure serves as a proxy for gauging user satisfaction over the course of a multi-turn interaction and is especially valuable for LLM chatbot applications.

{{< img src="llm_observability/evaluations/goal_completeness_1.png" alt="A Goal Completeness evaluation detected by an LLM in LLM Observability" style="width:100%;" >}}

| Evaluation Stage | Evaluation Method | Evaluation Definition |
|---|---|---|
| Evaluated on LLM spans | Evaluated using LLM | Checks whether the agent resolved the user’s intent by analyzing full session spans. Runs only on sessions marked as completed. |

##### How to Use
<div class="alert alert-info">Goal completeness is only available for OpenAI and Azure OpenAI.</div>

To enable Goal Completeness evaluation, you need to instrument your application to track sessions and their completion status. This evaluation works by analyzing complete sessions to determine if all user intentions were successfully addressed.

The evaluation requires sending a span with a specific tag when the session ends. This signal allows the evaluation to identify session boundaries and trigger the completeness assessment:

For optimal evaluation accuracy and cost control, it is preferable to send a tag when the session is finished and configure the evaluation to run only on session with this tag. The evaluation returns a detailed breakdown including resolved intentions, unresolved intentions, and reasoning for the assessment. A session is considered incomplete if more than 50% of identified intentions remain unresolved.


{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

# Call this function whenever your session has ended
@llm(model_name="model_name", model_provider="model_provider")
def send_session_ended_span(input_data, output_data) -> None:
    """Send a span to indicate the chat session has ended."""
    LLMObs.annotate(
        input_data=input_data,
        output_data=output_data,
        tags={"session_status": "completed"}
    )
{{< /code-block >}}

Replace `session_status` and `completed` with your preferred tag key and value.

The span should contain meaningful `input_data` and `output_data` that represent the final state of the session. This helps the evaluation understand the session's context and outcomes when assessing completeness.

##### Goal completeness configuration

After instrumenting your application to send session-end spans, configure the evaluation to run only on sessions with your specific tag. This targeted approach ensures the evaluation analyzes complete sessions rather than partial interactions.

1. Go to the **Goal Completeness** settings
2. Configure the evaluation data:
   - Select **spans** as the data type since Goal Completeness runs on LLM spans which contains the full session history.
   - Choose the tag name associated with the span that corresponds to your session-end function (for example, `send_session_ended_span`).
   - In the **tags** section, specify the tag you configured in your instrumentation (for example, `session_status:completed`).

This configuration ensures evaluations run only on complete sessions. This provides accurate assessments of user intention resolution.

##### Troubleshooting
- If evaluations are skipped, check that you are tagging session-end spans correctly.
- Ensure your agent is configured to signal the end of a user request cycle.
