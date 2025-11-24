---
aliases:
- /es/llm_observability/evaluations/agent_evaluations
description: Aprende a configurar evaluaciones gestionadas para tus aplicaciones LLM.
further_reading:
- link: /llm_observability/terms/
  tag: Documentación
  text: Conoce los términos y conceptos de LLM Observability
- link: /llm_observability/setup
  tag: Documentación
  text: Aprende a configurar la observabilidad de LLM
- link: https://www.datadoghq.com/blog/llm-observability-hallucination-detection/
  tag: Blog
  text: Detecta alucinaciones en tus aplicaciones RAG LLM con Datadog LLM Observability
title: Evaluaciones del Agent
---

El Agent ayudan a garantizar que las aplicaciones basadas en LLM realizan las llamadas a las herramientas adecuadas y resuelven correctamente las solicitudes de los usuarios. Estos checks están diseñados para detectar modos de fallo habituales cuando los agents interactúan con herramientas, API o flujos de trabajo externos.


## Selección de herramientas

Esta evaluación comprueba si el agent ha seleccionado correctamente las herramientas adecuadas para atender la solicitud del usuario. La elección incorrecta o irrelevante de herramientas provoca llamadas desperdiciadas, mayor latencia y tareas fallidas.

### Resumen de la evaluación

| **Tipo de tramo** | **Método** | **Definición** | 
|---|---|---|
| Evaluado en **tramos LLM**| Evaluado mediante un LLM | Verifica que las herramientas elegidas por el LLM se ajustan a la solicitud del usuario y al conjunto de herramientas disponibles. Marca las llamadas a herramientas irrelevantes o incorrectas. |

### Ejemplo

{{< img src="llm_observability/evaluations/tool_selection_1.png" alt="Un error de selección de herramienta detectada por la evaluación en LLM Observability" style="width:100%;" >}}

### Cómo utilizarlo
<div class="alert alert-info">La selección de herramientas solo está disponible para OpenAI y Azure OpenAI.</div>

1. Asegúrate de que estás ejecutando `dd-trace` v3.12+.
1. Instrumenta tu agent con las herramientas disponibles. El siguiente ejemplo utiliza el SDK de Agents de OpenAI para ilustrar cómo las herramientas se ponen a disposición del agent y de la evaluación:
1. Activa la evaluación `ToolSelection` en la interfaz de usuario de Datadog [creando una nueva evaluación][1] o [editando una evaluación existente][2].

Esta evaluación está admitida en `dd-trace` versión 3.12+. El siguiente ejemplo utiliza el SDK de Agents de OpenAI para ilustrar cómo las herramientas se ponen a disposición del agent y de la evaluación. Consulta el **[código completo y paquetes necesarios][3]** para ejecutar esta evaluación.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from agents import Agent, ModelSettings, function_tool

@function_tool
def add_numbers(a: int, b: int) -> int:
    """
    Adds two numbers together.
    """
    return a + b

@function_tool
def subtract_numbers(a: int, b: int) -> int:
    """
    Subtracts two numbers.
    """
    return a - b


# Lista de herramientas disponibles para el Agent
math_tutor_agent = Agent(
    name="Math Tutor",
    handoff_description="Specialist agent for math questions",
    instructions="You provide help with math problems. Please use the tools to find the answer.",
    model="o3-mini",
    tools=[
        add_numbers, subtract_numbers
    ],
)

history_tutor_agent = Agent(
    name="History Tutor",
    handoff_description="Specialist agent for history questions",
    instructions="You provide help with history problems.",
    model="o3-mini",
)

# El agent de triaje decide a qué agent especializado entregar la tarea, otro tipo de selección de herramientas cubierto por esta evaluación.
triage_agent = Agent(  
    'openai:gpt-4o',
    model_settings=ModelSettings(temperature=0),
    instructions='What is the sum of 1 to 10?',  
    handoffs=[math_tutor_agent, history_tutor_agent],
)
{{< /code-block >}}

### Solucionar problemas

- Si ves con frecuencia llamadas a herramientas irrelevantes, revisa las descripciones de tus herramientas: pueden ser demasiado vagas para que el LLM las distinga.
- Asegúrate de incluir descripciones de las herramientas (es decir, las comillas que contienen la descripción de la herramienta bajo el nombre de la función, el sdk autoparsea esto como la descripción)

## Corrección de los argumentos de la herramienta

Aunque se seleccione la herramienta adecuada, los argumentos que se le pasen deben ser válidos y relevantes desde el punto de vista contextual. Los formatos de argumento incorrectos (por ejemplo, una cadena en lugar de un número entero) o los valores irrelevantes provocan fallos en la ejecución posterior.

### Resumen de la evaluación

| **Tipo de tramo** | **Método** | **Definición** | 
|---|---|---|
| Evaluado en **tramos LLM** | Evaluado mediante un LLM | Verifica que los argumentos proporcionados a una herramienta son correctos y pertinentes según el esquema de la herramienta. Identifica argumentos no válidos o irrelevantes. |

### Ejemplo

{{< img src="llm_observability/evaluations/tool_argument_correctness_1.png" alt="Un error de argumento incorrecto de la herramienta detectado por la evaluación en LLM Observability" style="width:100%;" >}}

##### Instrumentación

Esta evaluación es compatible con `dd-trace` v3.12+. El siguiente ejemplo utiliza el SDK de Agents de OpenAI para ilustrar cómo las herramientas se ponen a disposición del agent y de la evaluación. Consulta el **[código completo y paquetes necesarios][4]** para ejecutar esta evaluación.

### Cómo utilizarlo
<div class="alert alert-info">Los argumentos correctos de la herramienta solo están disponible para OpenAI y Azure OpenAI.</div>

1. Instala `dd-trace` v3.12+.
1. Instrumenta tu agent con herramientas disponibles que requieran argumentos. El siguiente ejemplo utiliza SDK de Agents de Pydantic AI para ilustrar cómo las herramientas se ponen a disposición del agent y de la evaluación:

Activa la evaluación ToolArgumentCorrectness en la interfaz de usuario de Datadog [creando una nueva evaluación][1] o [editando una evaluación existente][2].

{{< code-block lang="python" >}}
import os

from ddtrace.llmobs import LLMObs
from pydantic_ai import Agent


# Definir herramientas como funciones regulares con sugerencias de tipo
def add_numbers(a: int, b: int) -> int:
    """
    Adds two numbers together.
    """
    return a + b


def subtract_numbers(a: int, b: int) -> int:
    """
    Subtracts two numbers.
    """
    return a - b


def multiply_numbers(a: int, b: int) -> int:
    """
    Multiplies two numbers.
    """
    return a * b


def divide_numbers(a: int, b: int) -> float:
    """
    Divides two numbers.
    """
    return a / b


# Activar LLMObs
LLMObs.enable(
    ml_app="jenn_test",
    api_key=os.environ["DD_API_KEY"],
    site=os.environ["DD_SITE"],
    agentless_enabled=True,
)


# Crear el agent Math Tutor con herramientas
math_tutor_agent = Agent(
    'openai:gpt-5-nano',
    instructions="You provide help with math problems. Please use the tools to find the answer.",
    tools=[add_numbers, subtract_numbers, multiply_numbers, divide_numbers],
)

# Crea el agent History Tutor (nota: gpt-5-nano no existe, utiliza gpt-4o-mini)
history_tutor_agent = Agent(
    'openai:gpt-5-nano',
    instructions="You provide help with history problems.",
)

# Crear el agent de triaje
# Nota: pydantic_ai gestiona los traspasos de forma diferente; normalmente se utiliza result_type 
# o lógica personalizada para enrutar entre agents
triage_agent = Agent(
    'openai:gpt-5-nano',
    instructions=(
        'DO NOT RELY ON YOUR OWN MATHEMATICAL KNOWLEDGE, '
        'MAKE SURE TO CALL AVAILABLE TOOLS TO SOLVE EVERY SUBPROBLEM.'
    ),
    tools=[add_numbers, subtract_numbers, multiply_numbers, divide_numbers],
)


# Ejecutar el agent de forma sincrónica
result = triage_agent.run_sync(
    '''
    Help me solve the following problem:
    What is the sum of the numbers between 1 and 100?
    Make sure you list out all the mathematical operations (addition, subtraction, multiplication, division) in order before you start calling tools in that order.
    '''
)
{{< /code-block >}}

### Solucionar problemas
- Asegúrate de que tus herramientas utilizan sugerencias de tipos: la evaluación se basa en definiciones de esquemas.
- Asegúrate de incluir una descripción de la herramienta (por ejemplo, la descripción entre comillas bajo el nombre de la función), ya que se utiliza en el proceso de autoinstrumentación para analizar el esquema de la herramienta.
- Valida que tu prompt de LLM incluye suficiente contexto para la correcta construcción de argumentos.


## Cumplimiento de objetivos

Un agent puede llamar a las herramientas correctamente y aun así no lograr el objetivo previsto por el usuario. Esta evaluación comprueba si tu chatbot de LLM puede llevar a cabo con éxito una sesión completa satisfaciendo eficazmente las necesidades del usuario de principio a fin. Esta medida de cumplimiento sirve como indicador de la satisfacción del usuario a lo largo de una interacción de varios turnos y es especialmente valiosa para las aplicaciones de chatbot de LLM.

### Resumen de la evaluación
| **Tipo de tramo** | **Método** | **Definición** | 
|---|---|---|
| Evaluado en tramos LLM | Evaluado mediante un LLM | Comprueba si el agent ha resuelto la intención del usuario analizando períodos de sesión completos. Solo se ejecuta en sesiones marcadas como completadas. |

### Ejemplo
{{< img src="llm_observability/evaluations/goal_completeness_1.png" alt="Una evaluación de Cumplimiento de objetivos detectada por un LLM en LLM Observability" style="width:100%;" >}}


##### Cómo utilizarlo
<div class="alert alert-info">El cumplimiento de objetivos solo está disponible para OpenAI y Azure OpenAI.</div>

Para habilitar la evaluación de cumplimiento de objetivos, debes instrumentar tu aplicación para realizar un seguimiento de las sesiones y su estado de finalización. Esta evaluación analiza las sesiones completas para determinar si se han cumplido todas las intenciones del usuario.

La evaluación requiere el envío de un tramo con una etiqueta específica cuando finaliza la sesión. Esta señal permite a la evaluación identificar los límites de la sesión y activar la evaluación de integridad:

Para una precisión óptima de la evaluación y el control de costes, es preferible enviar una etiqueta cuando la sesión haya terminado y configurar la evaluación para que se ejecute solo en la sesión con esta etiqueta. La evaluación devuelve un desglose detallado que incluye las intenciones resueltas, las intenciones no resueltas y el razonamiento de la evaluación. Una sesión se considera incompleta si más del 50% de las intenciones identificadas siguen sin resolverse.


{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

# Llama a esta función cuando tu sesión haya terminado
@llm(model_name="model_name", model_provider="model_provider")
def send_session_ended_span(input_data, output_data) -> None:
    """Send a span to indicate the chat session has ended."""
    LLMObs.annotate(
        input_data=input_data,
        output_data=output_data,
        tags={"session_status": "completed"}
    )
{{< /code-block >}}

Sustituye `session_status` y `completed` por la clave y el valor de etiqueta que prefieras.

El tramo debe contener `input_data` y `output_data` significativos que representen el estado final de la sesión. Esto ayuda a la evaluación a comprender el contexto y los resultados de la sesión cuando se evalúa la integridad.

##### Configuración del cumplimiento de los objetivos

Después de instrumentar tu aplicación para enviar intervalos de fin de sesión, configura la evaluación para que se ejecute solo en sesiones con tu etiqueta específica. Este enfoque específico garantiza que la evaluación analice sesiones completas en lugar de interacciones parciales.

1. Ve a la configuración de **Goal Completeness** (Cumplimiento de objetivos).
2. Configura los datos de evaluación:
   - Selecciona **tramos** como tipo de datos, ya que Cumplimiento de objetivos se ejecuta en tramos LLM, que contiene el historial completo de la sesión.
   - Elige el nombre de etiqueta asociado al tramo que corresponda a tu función de fin de sesión (por ejemplo, `send_session_ended_span`).
   - En la sección **tags** (etiquetas), especifica la etiqueta que configuraste en tu instrumentación (por ejemplo, `session_status:completed`).

Esta configuración garantiza que las evaluaciones se ejecuten solo en sesiones completas. Esto proporciona evaluaciones precisas de la resolución de la intención del usuario.

### Solucionar problemas
- Si se omiten evaluaciones, comprueba que estás etiquetando correctamente los tramos de fin de sesión.
- Asegúrate de que tu agent está configurado para señalar el final del ciclo de solicitud de un usuario.


[1]: /es/llm_observability/evaluations/managed_evaluations/#create-new-evaluations
[2]: /es/llm_observability/evaluations/managed_evaluations/#edit-existing-evaluations
[3]: https://github.com/DataDog/llm-observability/blob/main/evaluation_examples/1-tool-selection-demo.py
[4]: https://github.com/DataDog/llm-observability/blob/main/evaluation_examples/2-tool-argument-correctness-demo.py