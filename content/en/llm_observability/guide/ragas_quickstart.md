---
title: Ragas Quickstart
further_reading:
    - link: '/llm_observability/evaluations/ragas_evaluations'
      tag: 'Documentation'
      text: 'Ragas Evaluations'
---

Learn how to use Datadog's integration with the [Ragas][1] framework to evaluate your LLM application. For more information about the Ragas integration, including a detailed setup guide, see [Ragas Evaluations][2].

1. Install required dependencies:
    ```bash
    pip install ragas==0.1.21 openai ddtrace>=3.0.0
    ```

2. Create a file named `quickstart.py` with the following code:
    ```python
    import os
    from ddtrace.llmobs import LLMObs
    from ddtrace.llmobs.utils import Prompt
    from openai import OpenAI

    LLMObs.enable(
        ml_app="test-rag-app",
        agentless_enabled=True,
    )

    oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    rag_context = "The First AFL–NFL World Championship Game was an American football game played on January 15, 1967, at the Los Angeles Memorial Coliseum in Los Angeles"

    with LLMObs.annotation_context(
        prompt=Prompt(variables={"context": rag_context}),
    ):
        completion = oai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Answer the user's question given the following context information {}".format(rag_context)},
                {"role": "user", "content": "When was the first superbowl?"},
            ],
        )
    ```

3. Run the script with the Ragas Faithfulness evaluation enabled:
    ```bash
    DD_LLMOBS_EVALUATORS=ragas_faithfulness DD_ENV=dev DD_API_KEY=<YOUR-DD-API-KEY> DD_SITE=datadoghq.com python quickstart.py
    ```

4. View your results in Datadog at `https://<YOUR-DATADOG-SITE-URL>/llm/traces?query=%40ml_app%3Atest-rag-app`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.ragas.io/en/stable/
[2]: /llm_observability/evaluations/ragas_evaluations