---
title: Integración Datadog-CrewAI para LLM Observability
---

Esta guía muestra cómo integrar LLM Observability con [CrewAI][1] utilizando la [instrumentación automática][2]. También muestra cómo enviar trazas (traces) de LLM Observability a Datadog y ver las ejecuciones del Agent de CrewAI en la [vista de ejecución de Agents][3] de Datadog.

## Empezando

### Instalar dependencias

Ejecuta este comando para instalar las dependencias necesarias:

```shell 
pip install ddtrace crewai crewai-tools
```

### Configurar variables de entorno

Si no dispones de una clave de API Datadog, crea una cuenta y [obtén tu clave de API][4].

También es necesario especificar un _nombre de aplicación ML_ en las siguientes variables de entorno. Una aplicación ML es una agrupación de trazas de LLM Observability asociadas a una aplicación específica basada en LLM. Consulta la [directrices de nomenclatura de aplicaciones][5] para obtener más información sobre las limitaciones de los nombres de las aplicaciones ML.

```shell 
export DD_API_KEY=<YOUR_DD_API_KEY>
export DD_SITE=<YOUR_DD_SITE>
export DD_LLMOBS_ENABLED=true
export DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
export DD_LLMOBS_AGENTLESS_ENABLED=true
export DD_APM_TRACING_ENABLED=false
```

Además, configura cualquier clave de API del proveedor LLM:

```shell 
export OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
export ANTHROPIC_API_KEY=<YOUR_ANTHROPIC_API_KEY>
export GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
...
```

### Crear una aplicación de Agent de CrewAI

El siguiente ejemplo crea un Agent de CrewAI para resolver un problema sencillo:


```python 
# crewai_agent.py
from crewai import Agent, Task, Crew

from crewai_tools import (
    WebsiteSearchTool
)

web_rag_tool = WebsiteSearchTool()

writer = Agent(
    role="Writer",
    goal="You make math engaging and understandable for young children through poetry",
    backstory="You're an expert in writing haikus but you know nothing of math.",
    tools=[web_rag_tool],
)

task = Task(
    description=("What is {multiplication}?"),
    expected_output=("Compose a haiku that includes the answer."),
    agent=writer
)

crew = Crew(
    agents=[writer],
    tasks=[task],
    share_crew=False
)

output = crew.kickoff(dict(multiplication="2 * 2"))
```

### Ejecutar la aplicación con la instrumentación automática de Datadog

Una vez configuradas las [variables de entorno](#set-environment-variables), puedes ejecutar la aplicación con la instrumentación automática Datadog.

```shell 
ddtrace-run python crewai_agent.py
```

### Ver trazas en Datadog

Después de ejecutar la aplicación, puedes ver las trazas en [Vista de trazas de Datadog LLM Observability][6], seleccionando el nombre de la aplicación ML que has elegido en el desplegable superior izquierdo.

Al hacer clic en una traza se muestra su información, incluido el total de tokens utilizados, el número de llamadas LLM, los modelos utilizados y el coste estimado. Al hacer clic en un tramo (span) específico se reduce esta información y se muestran los datos de entradas, salidas y metadatos relacionados.

{{< img src="llm_observability/guides/crewai/trace_view.png" alt="Una traza en LLM Observability, en que el usuario ha hecho clic en un tramo del flujo de trabajo de CrewAI, con la vista de 'Información del tramo' activada. A la izquierda, una vista de árbol de las llamadas de herramientas y de LLM. Se muestran entradas, salidas y metadatos." style="width:100%;" >}}

Además, puedes ver la vista del gráfico de ejecución de la traza, que muestra su flujo de control y de datos. Esto se amplía con agentes más grandes para mostrar los traspasos y las relaciones entre las llamadas LLM, las llamadas a herramientas y las interacciones de los Agents.

{{< img src="llm_observability/guides/crewai/execution_graph.png" alt="La misma traza en LLM Observability con la vista del 'Gráfico de ejecución' activada. Se muestra el flujo de control y de datos de la traza." style="width:100%;" >}}

[1]: https://docs.crewai.com/en/introduction
[2]: /es/llm_observability/instrumentation/auto_instrumentation
[3]: /es/llm_observability/monitoring/agent_monitoring
[4]: /es/account_management/api-app-keys/#api-keys
[5]: /es/llm_observability/instrumentation/sdk?tab=python#application-naming-guidelines
[6]: https://app.datadoghq.com/llm/traces