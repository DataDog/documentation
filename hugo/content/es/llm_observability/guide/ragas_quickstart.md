---
further_reading:
- link: /llm_observability/evaluations/ragas_evaluations
  tag: Documentación
  text: Evaluaciones de Ragas
title: Inicio rápido de Ragas
---

Aprende a utilizar la integración de Datadog con el marco [Ragas][1] para evaluar tu aplicación LLM. Para obtener más información sobre la integración de Ragas, incluida una guía de configuración detallada, consulta [Evaluaciones de Ragas][2].

1. Instala las dependencias necesarias:
    ```bash
    pip install ragas==0.1.21 openai ddtrace>=3.0.0
    ```

2. Crea un archivo llamado `quickstart.py` con el siguiente código:
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

3. Ejecuta el script con la evaluación de fidelidad de Ragas activada:
    ```bash
    DD_LLMOBS_EVALUATORS=ragas_faithfulness DD_ENV=dev DD_API_KEY=<YOUR-DD-API-KEY> DD_SITE=datadoghq.com python quickstart.py
    ```

4. Consulta tus resultados en Datadog en `https://<YOUR-DATADOG-SITE-URL>/llm/traces?query=%40ml_app%3Atest-rag-app`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.ragas.io/en/stable/
[2]: /es/llm_observability/evaluations/ragas_evaluations