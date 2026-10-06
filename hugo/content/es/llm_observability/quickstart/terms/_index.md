---
aliases:
- /es/tracing/llm_observability/core_concepts
- /es/llm_observability/core_concepts
- /es/tracing/llm_observability/span_kinds
- /es/llm_observability/span_kinds
- /es/llm_observability/terms/
description: Guía de referencia para los términos y conceptos clave de Agent Observability,
  incluidos tramos, trazas y evaluaciones.
further_reading:
- link: /llm_observability/setup
  tag: Documentación
  text: Aprenda a configurar Agent Observability
- link: /llm_observability/investigate/evaluations
  tag: Guía
  text: Opciones de evaluación para Agent Observability
title: Términos y conceptos de Agent Observability
---
## Descripción general {#overview}

La interfaz de usuario de Agent Observability proporciona muchas herramientas para solucionar problemas de rendimiento de las conversaciones y correlacionar datos en todo el producto, lo que le permite encontrar y resolver problemas en modelos de lenguaje grandes (LLM).

| Concepto | Descripción |
|---|---|
| [Tramos](#spans) | Un tramo es una unidad de trabajo que representa una operación en su aplicación de LLM y es el componente básico de una traza. |
| [Trazas](#traces) | Una traza representa el trabajo involucrado en el procesamiento de una solicitud en su aplicación de LLM y consta de uno o más tramos anidados. Un tramo raíz es el primer tramo de una traza y marca el inicio y el final de la misma. |
| [Evaluaciones](#evaluations) | Las evaluaciones son un método para medir el rendimiento de su aplicación de LLM. Por ejemplo, las comprobaciones de calidad como la falta de respuesta o la relevancia del tema son diferentes tipos de evaluaciones que puede realizar un seguimiento para su aplicación de LLM. |

## Tramos {#spans}

Un tramo consta de los siguientes atributos:

- Nombre
- Hora de inicio y duración
- Tipo de error, mensaje y rastreo de errores
- Entradas y salidas, como prompts y finalizaciones de LLM
- Metadatos (por ejemplo, parámetros de LLM como `temperature`, `max_tokens`)
- Métricas, como `input_tokens` y `output_tokens`
- Etiquetas

### Tipos de span {#span-kinds}

Agent Observability clasifica los tramos por su *span kind*, el cual define el tipo de trabajo que el tramo está realizando. Esto puede brindarle información más detallada sobre qué operaciones está realizando su aplicación de LLM.

Agent Observability admite los siguientes tipos de span:

| Tipo      | Representa   | ¿Es un span raíz válido?   | Ejemplos |
|-----------|--------------|--------------|-------------|
| [LLM](#llm-span)      | Una llamada a un LLM. | Sí | Una llamada a un modelo, como OpenAI GPT-4. |
| [Flujo de trabajo](#workflow-span)  | Cualquier secuencia predeterminada de operaciones que incluya llamadas a LLM y cualquier operación contextual circundante. | Sí | Un servicio que toma una URL y devuelve un resumen de la página, lo cual requiere una llamada a una herramienta para obtener la página, algunas tareas de procesamiento de texto y un resumen mediante LLM. |
| [Agent](#agent-span)     | Una serie de decisiones y operaciones realizadas por un Agent autónomo, que generalmente consisten en flujos de trabajo anidados, LLMs, herramientas y llamadas a tareas. | Sí | Un chatbot que responde preguntas de los clientes.
| [Herramienta](#tool-span)      | Una llamada a un programa o servicio donde los argumentos de la llamada son generados por un LLM. | No | Una llamada a una API de búsqueda web o a una calculadora. |
| [Tarea](#task-span)      | Un paso independiente que no implica una llamada a un servicio externo. | No | Un paso de preprocesamiento de datos. |
| [Incrustación](#embedding-span) | Una llamada a un modelo o función que devuelve una incrustación. | No | Una llamada a text-embedding-ada-002. |
| [Recuperación](#retrieval-span) | Una operación de recuperación de datos desde una base de conocimientos externa. | No | Una llamada a una base de datos vectorial que devuelve una matriz de documentos clasificados. |

Para obtener instrucciones sobre cómo crear tramos desde su aplicación, incluidos ejemplos de código, consulte [Tracing spans][2] en la documentación del Agent Observability SDK para Python.

#### Tramo de LLM {#llm-span}

Los tramos de LLM representan una llamada a un LLM donde las entradas y salidas se representan como texto.

Una traza puede contener un solo tramo de LLM, en cuyo caso la traza representa una operación de inferencia de LLM.

Los tramos de LLM normalmente no tienen tramos hijos, ya que son operaciones independientes que representan una llamada directa a un LLM.

#### Tramo de flujo de trabajo {#workflow-span}

Los tramos de flujo de trabajo representan cualquier secuencia *estática* de operaciones. Utilice flujos de trabajo para agrupar una llamada de LLM con sus operaciones contextuales de apoyo, como llamadas a herramientas, recuperación de datos y otras tareas.

Los tramos de flujo de trabajo son frecuentemente el tramo raíz de una traza que consiste en una secuencia estándar. Por ejemplo, una función podría tomar un enlace a un artículo de arXiv y devolver un resumen. Este proceso podría implicar una llamada a una herramienta para obtener el artículo, algunas tareas de procesamiento de texto y un resumen de LLM.

Los tramos de flujo de trabajo pueden tener cualquier tramo como hijo, los cuales representan pasos secundarios en la secuencia del flujo de trabajo.

#### Tramo de Agent {#agent-span}

Los tramos de Agent representan una secuencia dinámica de operaciones donde un modelo de lenguaje grande determina y ejecuta operaciones basadas en las entradas. Por ejemplo, un tramo de Agent podría representar una serie de pasos de razonamiento controlados por un [ReAct agent][1].

Los tramos de Agent son frecuentemente el tramo raíz para trazas que representan Agent autónomos o de razonamiento.

Los tramos de Agent pueden tener cualquier tramo como hijo, los cuales representan pasos secundarios orquestados por un motor de razonamiento.

#### Tramo de herramienta {#tool-span}

Los tramos de herramienta representan un paso independiente en un flujo de trabajo o agente que implica una llamada a un programa o servicio externo, como una API web o una base de datos.

Los tramos de herramienta normalmente no tienen tramos hijos, ya que son operaciones independientes que representan la ejecución de una herramienta.

#### Tramo de tarea {#task-span}

Los tramos de tarea representan un paso independiente en un flujo de trabajo o Agent que no implica una llamada a un servicio externo, como un paso de saneamiento de datos antes de que se envíe una solicitud a un LLM.

Los tramos de tarea normalmente no tienen hijos, ya que son pasos independientes en el flujo de trabajo o Agent.

#### Tramo de incrustación {#embedding-span}

Los tramos de incrustación son una subcategoría de los tramos de herramienta y representan una llamada independiente a un modelo o función de incrustación para crear una incrustación. Por ejemplo, un tramo de incrustación podría usarse para rastrear una llamada al punto de conexión de incrustación de OpenAI.

Los tramos de incrustación pueden tener tramos de tarea como hijos, pero normalmente no tienen hijos.

#### Tramo de recuperación {#retrieval-span}

Los tramos de recuperación son una subcategoría de los tramos de herramienta y representan una operación de búsqueda vectorial que involucra una lista de documentos devueltos desde una base de conocimientos externa. Por ejemplo, un tramo de recuperación podría usarse para trazar una búsqueda de similitud en un almacén vectorial para recopilar documentos relevantes con el fin de aumentar un prompt de usuario para un tema determinado.

Cuando se usan junto con tramos de incrustación, los tramos de recuperación pueden proporcionar visibilidad sobre las operaciones de generación aumentada por recuperación (RAG).

Los tramos de recuperación normalmente no tienen hijos, ya que representan un paso de recuperación independiente.

## Trazas {#traces}

Agent Observability admite la observabilidad para aplicaciones de LLM con complejidad variable. Según la estructura y la complejidad de sus trazas, puede utilizar las siguientes funciones de Agent Observability:

### Monitoreo de inferencia de LLM {#llm-inference-monitoring}

Las trazas de inferencia de LLM se componen de un único tramo de LLM.

{{< img src="llm_observability/llm-observability-llm-span.png" alt="Un único tramo de LLM" style="width:100%;" >}}

El trazar de inferencias individuales de LLM desbloquea funciones básicas de Agent Observability, lo que le permite:

1. Rastrear las entradas y salidas de sus llamadas a LLM.
2. Realice un seguimiento del uso de tokens, las tasas de error y las latencias de sus llamadas a LLM.
3. Desglose de métricas importantes por modelo y proveedor de modelos.


Para obtener un ejemplo detallado, consulte el [notebook de Jupyter de monitoreo de LLM][7], que demuestra cómo crear y rastrear una llamada a un LLM.

El SDK proporciona integraciones para capturar automáticamente las llamadas a LLM de proveedores específicos. Consulte [Instrumentación automática][3] para obtener más información. Si está utilizando un proveedor de LLM que no es compatible, debe [instrumentar manualmente su aplicación][4].

### Monitoreo de flujo de trabajo de LLM {#llm-workflow-monitoring}

Una traza de flujo de trabajo se compone de un tramo de flujo de trabajo raíz con tramos anidados de LLM, de tarea, de herramienta, de incrustación y de recuperación.

{{< img src="llm_observability/llm-observability-workflow-trace.png" alt="Una traza que visualiza un flujo de trabajo de LLM más complejo" style="width:100%;" >}}

La mayoría de las aplicaciones de LLM incluyen operaciones que rodean las llamadas a LLM y desempeñan un papel importante en el rendimiento general de su aplicación; por ejemplo, llamadas a herramientas a API externas o pasos de tareas de preprocesamiento.

Al rastrear las llamadas a LLM y las operaciones contextuales de tareas o herramientas juntas bajo tramos de flujo de trabajo, puede desbloquear información más detallada y una visión más holística de su aplicación de LLM.

Para obtener ejemplos detallados, consulte el [LLM Monitoring Jupyter notebook][8] que demuestra cómo crear y rastrear una serie compleja y estática de pasos que involucran una llamada a una herramienta y una llamada a un LLM, o el [LLM Monitoring Jupyter notebook][10] que demuestra cómo crear, rastrear y evaluar un flujo de trabajo RAG.

### LLM Agent Monitoring {#llm-agent-monitoring}

Una traza de Agent monitoring se compone de un Agent root span con tramos anidados de LLM, task, tool, embedding, retrieval y flujo de trabajo.

{{< img src="llm_observability/llm-observability-agent-trace.png" alt="Una traza que visualiza un LLM Agent" style="width:100%;" >}}

Si su aplicación de LLM tiene una lógica autónoma compleja, como la toma de decisiones que no puede ser capturada por un flujo de trabajo estático, es probable que esté utilizando un LLM Agent. Los Agents pueden ejecutar múltiples flujos de trabajo diferentes según la entrada del usuario.

Puede instrumentar su aplicación de LLM para rastrear y agrupar todos los flujos de trabajo y operaciones contextuales ejecutadas por un solo LLM Agent como una traza de Agent.

Para obtener un ejemplo detallado, consulte el [LLM Monitoring Jupyter notebook][9] que demuestra cómo crear y rastrear un LLM-powered Agent que llama a herramientas y toma decisiones basadas en los datos.

## Evaluaciones {#evaluations}

Agent Observability ofrece evaluaciones administradas y controles de calidad para evaluar la calidad, seguridad y eficacia de sus conversaciones de LLM. Con [evaluations][11], puede comprender el rendimiento de las conversaciones y mejorar las respuestas de su aplicación de LLM. Esto mejora la experiencia del usuario y garantiza resultados valiosos y precisos.

Datadog ofrece una variedad de opciones para sus evaluaciones:
- Utilice [managed evaluations][12] para sus trazas
- [Envíe evaluaciones personalizadas][6] a Agent Observability
- Intégrese con marcos de trabajo como [NeMo][13]

Además, el [Sensitive Data Scanner][5] de Datadog está integrado de forma nativa con Agent Observability, por lo que puede asegurarse de que cualquier dato confidencial en su entrada y salida sea escaneado y redactado.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://react-lm.github.io/
[2]: /es/llm_observability/setup/sdk/?tab=model#tracing-spans
[3]: /es/llm_observability/setup/auto_instrumentation/
[4]: /es/llm_observability/setup/?tab=decorators#instrument-your-llm-application
[5]: /es/security/sensitive_data_scanner/
[6]: /es/llm_observability/investigate/evaluations/external_evaluations
[7]: https://github.com/DataDog/llm-observability/blob/main/1-llm-span.ipynb
[8]: https://github.com/DataDog/llm-observability/blob/main/2-workflow-span.ipynb
[9]: https://github.com/DataDog/llm-observability/blob/main/3-agent-span.ipynb
[10]: https://github.com/DataDog/llm-observability/blob/main/4-custom-evaluations.ipynb
[11]: /es/llm_observability/investigate/evaluations/
[12]: /es/llm_observability/investigate/evaluations/managed_evaluations
[13]: /es/llm_observability/investigate/evaluations/external_evaluations/nemo