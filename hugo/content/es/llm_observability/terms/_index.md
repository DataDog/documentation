---
aliases:
- /es/tracing/llm_observability/core_concepts
- /es/llm_observability/core_concepts
- /es/tracing/llm_observability/span_kinds
- /es/llm_observability/span_kinds
further_reading:
- link: /llm_observability/setup
  tag: Documentación
  text: Aprende a configurar LLM Observability
- link: /llm_observability/submit_evaluations
  tag: Guía
  text: Enviar evaluaciones a LLM Observability
title: Términos y conceptos de LLM Observability
---

## Información general

La interfaz de usuario de LLM Observability proporciona muchas herramientas para solucionar problemas de rendimiento de conversaciones y correlacionar datos en todo el producto, lo que te permite encontrar y resolver problemas en modelos de lenguaje de gran tamaño (LLM).

| Concepto | Descripción |
|---|---|
| [Tramos](#spans) | Un tramo (span) es una unidad de trabajo que representa una operación en tu aplicación de LLM, y es el componente básico de una traza (trace). |
| [Trazas](#traces) | Una traza representa el trabajo que implica procesar una solicitud en tu aplicación de LLM y consta de uno o más tramos anidados. Un tramo raíz es el primer tramo de una traza, y marca el comienzo y el final de la traza. |
| [Evaluaciones](#evaluations) | Las evaluaciones son un método para medir el desempeño de tu aplicación de LLM. Por ejemplo, los checks de calidad, como la falta de respuesta o la relevancia del tema, son diferentes tipos de evaluaciones que puedes controlar para tu aplicación de LLM. |

## Tramos

Un tramo consta de los siguientes atributos:

- Nombre
- Hora de inicio y duración
- Tipo de error, mensaje y traceback
- Entradas y salidas, como las instrucciones y finalizaciones del LLM
- Metadatos (por ejemplo, parámetros de LLM como `temperature`, `max_tokens`)
- Métricas, como `input_tokens` y `output_tokens`
- Etiquetas

### Tipos de tramos

LLM Observability categoriza los tramos por su *tipo de tramo*, que define el tipo de trabajo que realiza el tramo. Esto puede brindarte información más granular sobre las operaciones que realiza tu aplicación de LLM.

LLM Observability admite los siguientes tipos de tramo:

| Tipo      | Representa   | ¿Tramo raíz válido?   | Ejemplos |
|-----------|--------------|--------------|-------------|
| [LLM](#llm-span)      | Una llamada a un LLM. | Sí | Una llamada a un modelo, como OpenAI GPT-4. |
| [Flujo de trabajo](#workflow-span)  | Cualquier secuencia predeterminada de operaciones que incluya llamadas a LLM y cualquier operación contextual circundante. | Sí | Un servicio que toma una URL y devuelve un resumen de la página, lo que requiere una llamada a una herramienta para obtener la página, algunas tareas de procesamiento de texto y un resumen de LLM. |
| [Agent](#agent-span)     | Una serie de decisiones y operaciones realizadas por un Agent autónomo, que suelen consistir en flujos de trabajo anidados, LLM, herramientas y llamadas a tareas. | Sí | Un chatbot que responde a las preguntas de los clientes.
| [Herramienta](#tool-span)      | Una llamada a un programa o servicio cuyos argumentos de llamada son generados por un LLM. | No | Una llamada a una API de búsqueda web o una calculadora. |
| [Tarea](#task-span)      | Un paso autónomo que no implica una llamada a un servicio externo. | No | Un paso de preprocesamiento de datos. |
| [Inserción](#embedding-tramo (span)) | Una llamada a un modelo o una función que devuelve una inserción. | No | Una llamada a text-embedding-ada-002. |
| [Recuperación](#retrieval-span) | Una operación de recuperación de datos de una base de conocimientos externa. | No | Una llamada a una base de datos vectorial que devuelve una matriz de documentos clasificados. |

Para obtener instrucciones sobre cómo crear tramos desde tu aplicación, incluidos los ejemplos de código, consulta [Rastreo de tramos][2] en la documentación de LLM Observability SDK para Python.

#### Tramo de LLM

Los tramos de LLM representan una llamada a un LLM donde las entradas y las salidas se representan como texto.

Una traza puede contener un único tramo de LLM, en cuyo caso la traza representa una operación de inferencia de LLM.

Los tramos de LLM normalmente no tienen tramos secundarios, ya que son operaciones independientes que representan una llamada directa a un LLM.

#### Tramo de flujo de trabajo

Los tramos de flujo de trabajo representan cualquier secuencia *estática* de operaciones. Utiliza flujos de trabajo para agrupar una llamada a LLM con sus operaciones contextuales de apoyo, como llamadas a herramientas, recuperaciones de datos y otras tareas.

Los tramos de flujo de trabajo son frecuentemente el tramo raíz de una traza que consiste en una secuencia estándar. Por ejemplo, una función podría tomar un enlace de un artículo de arXiv y devolver un resumen. Este proceso podría implicar una llamada a una herramienta para obtener el artículo, algunas tareas de procesamiento de texto y un resumen del LLM.

Los tramos de flujo de trabajo pueden tener cualquier tramo como secundario, que representa pasos secundarios en la secuencia del flujo de trabajo.

#### Tramo de Agent

Los tramos de Agent representan una secuencia dinámica de operaciones en las que un modelo de lenguaje de gran tamaño determina y ejecuta operaciones en función de las entradas. Por ejemplo, un tramo de Agent podría representar una serie de pasos de razonamiento controlados por un [Agent ReAct][1].

Los tramos de Agent son con frecuencia el tramo raíz de las trazas que representan Agents autónomos o Agents de razonamiento.

Los tramos de Agent pueden tener cualquier tramo como secundario, que representa pasos secundarios orquestados por un motor de razonamiento.

#### Tramo de herramienta

Los tramos de herramienta representan un paso independiente en un flujo de trabajo o Agent que implica una llamada a un programa o servicio externo, como una API web o una base de datos.

Los tramos de herramienta normalmente no tienen tramos secundarios, ya que son operaciones independientes que representan la ejecución de una herramienta.

#### Tramo de tarea

Los tramos de tarea representan un paso independiente en un flujo de trabajo o Agent que no implica una llamada a un servicio externo, como un paso de limpieza de datos antes de que se envíe una instrucción a un LLM.

Los tramos de tarea generalmente no tienen tramos secundarios, ya que son pasos independientes en el flujo de trabajo o Agent.

#### Tramo de inserción

Los tramos de inserción son una subcategoría de tramos de herramienta y representan una llamada independiente a un modelo o una función de inserción para crear una inserción. Por ejemplo, un tramo de inserción se podría utilizar para rastrear una llamada al endpoint de inserción de OpenAI.

Los tramos de inserción pueden tener tramos de tarea secundarios, pero normalmente no los tienen.

#### Tramo de recuperación

Los tramos de recuperación son una subcategoría de los tramos de herramienta y representan una operación de búsqueda vectorial que implica una lista de documentos que se devuelven desde una base de conocimientos externa. Por ejemplo, un tramo de recuperación se podría utilizar para rastrear una búsqueda de similitud hasta un almacén vectorial para recopilar documentos relevantes para complementar una solicitud de usuario para un tema determinado.

Cuando se utilizan junto con tramos de inserción, los tramos de recuperación pueden proporcionar visibilidad en las operaciones de generación aumentada de recuperación (RAG).

Los tramos de recuperación generalmente no tienen tramos secundarios, ya que representan un paso de recuperación independiente.

## Trazas

LLM Observability admite la observabilidad de aplicaciones de LLM con diferentes niveles de complejidad. Según la estructura y la complejidad de tus trazas, puedes utilizar las siguientes funciones de LLM Observability:

### LLM Inference Monitoring

Las trazas de inferencia de LLM se componen de un único tramo de LLM.

{{< img src="llm_observability/llm-observability-llm-span.png" alt="Un único tramo de LLM" style="width:100%;" >}}

El rastreo de inferencias de LLM individuales desbloquea funciones básicas de LLM Observability, lo que te permite:

1. Rastrear las entradas y salidas de tus llamadas de LLM.
2. Rastrear el uso de tokens, las tasas de error y las latencias de tus llamadas de LLM.
3. Desglosar métricas importantes por modelo y proveedor del modelo.


Para ver un ejemplo detallado, consulta el [notebook Jupyter de monitorización de LLM][7] que demuestra cómo crear y rastrear una llamada de LLM.

El SDK proporciona integraciones para capturar automáticamente llamadas de LLM a proveedores específicos. Consulta la [Instrumentación automática][3] para obtener más información. Si estás utilizando un proveedor de LLM que no es compatible, debes [instrumentar manualmente la aplicación][4].

### Monitorización de flujo de trabajo de LLM

Una traza de flujo de trabajo se compone de un tramo de flujo de trabajo raíz con tramos anidados de LLM, tarea, herramienta, inserción y recuperación.

{{< img src="llm_observability/llm-observability-workflow-trace.png" alt="Una traza que visualiza un flujo de trabajo de LLM más complejo" style="width:100%;" >}}

La mayoría de las aplicaciones de LLM incluyen operaciones que rodean las llamadas de LLM y juegan un papel importante en el rendimiento general de la aplicación, por ejemplo, llamadas de herramientas a API externas o pasos de tareas de preprocesamiento.

Al rastrear las llamadas de LLM y las operaciones de herramientas o tareas contextuales juntas bajo tramos de flujo de trabajo, puedes desbloquear información más granular y una vista más integral de tu aplicación de LLM.

Para ver ejemplos detallados, consulta el [notebook Jupyter de monitorización de LLM][8] que demuestra cómo crear y rastrear una serie compleja y estática de pasos que involucran una llamada a una herramienta y una llamada a un LLM o el [notebook Jupyter de monitorización de LLM][10] que demuestra cómo crear, rastrear y evaluar un flujo de trabajo de RAG.

### Monitorización de Agent de LLM

Una traza de monitorización de Agent se compone de un tramo de Agent raíz con tramos anidados de LLM, tarea, herramienta, inserción, recuperación y flujo de trabajo.

{{< img src="llm_observability/llm-observability-agent-trace.png" alt="Una traza que visualiza un Agent de LLM" style="width:100%;" >}}

Si tu aplicación de LLM tiene una lógica autónoma compleja, como la toma de decisiones que no se puede capturar mediante un flujo de trabajo estático, es probable que estés utilizando un Agent de LLM. Los Agents pueden ejecutar varios flujos de trabajo diferentes según la entrada del usuario.

Puedes instrumentar tu aplicación de LLM para rastrear y agrupar todos los flujos de trabajo y operaciones contextuales ejecutadas por un solo Agent de LLM como una traza de Agent.

Para ver un ejemplo detallado, consulta el [notebook Jupyter de monitorización de LLM][9] que demuestra cómo crear y rastrear un Agent impulsado por LLM que llama a herramientas y toma decisiones basadas en los datos.

## Evaluaciones

LLM Observability ofrece checks de calidad y métricas listas para usar para evaluar la calidad y la eficacia de tus conversaciones de LLM, incluidas evaluaciones de sentimientos, relevancia de temas y satisfacción del usuario. Con las evaluaciones, puedes comprender el rendimiento de las conversaciones y mejorar las respuestas de tu aplicación de LLM. Esto mejora la experiencia del usuario y garantiza resultados valiosos y precisos.

Además de evaluar conversaciones, LLM Observability se integra con [Sensitive Data Scanner][5], que ayuda a prevenir la fuga de datos al identificar y marcar cualquier información confidencial (como datos personales, información financiera o información confidencial) que pueda estar presente en las conversaciones.

Al escanear de forma proactiva los datos confidenciales, LLM Observability garantiza que las conversaciones permanezcan seguras y cumplan con las normas de protección de datos. Esta capa adicional de seguridad refuerza el compromiso de Datadog de mantener la confidencialidad y la integración de las interacciones de los usuarios con LLM.

LLM Observability asocia las evaluaciones con tramos individuales para que puedas ver las entradas y salidas que llevaron a una evaluación específica. Si bien Datadog proporciona evaluaciones listas para usar para tus trazas, también puedes [enviar tus propias evaluaciones][6] a LLM Observability.

### Evaluaciones de calidad

#### Relevancia del tema

Este check identifica y marca las entradas del usuario que se desvían de los temas de entrada aceptables configurados. Esto garantiza que las interacciones sigan siendo pertinentes al propósito y contexto designados del LLM.

| Fase de evaluación | Método de evaluación | Definición de la evaluación | 
|---|---|---|
| Evaluado en función de la entrada | Evaluado mediante un LLM | La relevancia del tema evalúa si cada par instrucción-respuesta se mantiene alineado con el tema previsto de la aplicación del modelo de lenguaje de gran tamaño (LLM). Por ejemplo, un chatbot de comercio electrónico que reciba una pregunta sobre una receta de pizza se marcaría como irrelevante.  |

#### Falta de respuesta

Este check identifica instancias en las que el LLM no entrega una respuesta apropiada, lo que puede ocurrir debido a limitaciones en el conocimiento o la comprensión del LLM, ambigüedad en la consulta del usuario o la complejidad del tema.

{{< img src="llm_observability/evaluations/failure_to_answer_1.png" alt="Una evaluación de Falta de respuesta detectada por un LLM en LLM Observability" style="width:100%;" >}}

| Fase de evaluación | Método de evaluación | Definición de la evaluación | 
|---|---|---|
| Evaluado en función de la entrada | Evaluado mediante un LLM | Falta de respuesta indica si cada par instrucción-respuesta demuestra que la aplicación de LLM ha proporcionado una respuesta relevante y satisfactoria a la pregunta del usuario.  |

#### Desajuste lingüístico

Este check identifica los casos en los que el LLM genera respuestas en un idioma o dialecto diferente al que utiliza el usuario, lo que puede generar confusión o problemas de comunicación. Este check garantiza que las respuestas del LLM sean claras, pertinentes y adecuadas según las preferencias y necesidades lingüísticas del usuario.

{{< img src="llm_observability/evaluations/language_mismatch_1.png" alt="Una evaluación de Desajuste lingüístico detectada por un modelo de código abierto en LLM Observability" style="width:100%;" >}}

| Fase de evaluación | Método de evaluación | Definición de la evaluación | 
|---|---|---|
| Evaluación de entradas y salidas | Evaluado mediante el modelo de código abierto | Desajuste lingüístico indica si cada par instrucción-respuesta demuestra que la aplicación de LLM respondió la pregunta del usuario en el mismo idioma que utilizó el usuario.  |

#### Sentimiento

Este check ayuda a comprender el estado de ánimo general de la conversación, medir la satisfacción del usuario, identificar tendencias de sentimientos e interpretar las respuestas emocionales. Este check clasifica con precisión el sentimiento del texto, lo que proporciona información para mejorar las experiencias del usuario y adaptar las respuestas para satisfacer mejor sus necesidades.

{{< img src="llm_observability/evaluations/sentiment_1.png" alt="Una evaluación de Sentimiento detectada por un LLM en LLM Observability" style="width:100%;" >}}

| Fase de evaluación | Método de evaluación | Definición de la evaluación | 
|---|---|---|
| Evaluación de entradas y salidas | Evaluado mediante un LLM | Sentimiento indica el tono emocional o la actitud expresada en el texto, categorizándola como positiva, negativa o neutral.   |

### Evaluaciones de Seguridad y protección

#### Toxicidad

Este check evalúa cada instrucción de entrada del usuario y la respuesta de la aplicación de LLM en busca de contenido tóxico. Este check identifica y marca el contenido tóxico para garantizar que las interacciones sigan siendo respetuosas y seguras.

{{< img src="llm_observability/evaluations/toxicity_1.png" alt="Una evaluación de Toxicidad detectada por un LLM en LLM Observability" style="width:100%;" >}}

| Fase de evaluación | Método de evaluación | Definición de la evaluación | 
|---|---|---|
| Evaluación de entradas y salidas | Evaluado mediante un LLM | Toxicidad indica cualquier lenguaje o comportamiento que sea dañino, ofensivo o inapropiado, incluidos, entre otros, discursos de odio, acoso, amenazas y otras formas de comunicación dañina. |

#### Inyección de instrucción

Este check identifica intentos de autores malintencionados o no autorizados de manipular las respuestas del LLM o redirigir la conversación de formas no previstas por el autor original. Este check mantiene la integridad y autenticidad de las interacciones entre los usuarios y el LLM.

{{< img src="llm_observability/evaluations/prompt_injection_1.png" alt="Una evaluación de Inyección de instrucción detectada por un LLM en LLM Observability" style="width:100%;" >}}

| Fase de evaluación | Método de evaluación | Definición de la evaluación | 
|---|---|---|
| Evaluado en función de la entrada | Evaluado mediante un LLM | Inyección de instrucción indica cualquier inserción no autorizada o maliciosa de avisos o pistas en la conversación por parte de un usuario o una parte externa. |

#### Escaneo de datos confidenciales

Este check garantiza que la información confidencial se maneje de forma adecuada y segura, reduciendo el riesgo de violaciones de datos o acceso no autorizado.

{{< img src="llm_observability/evaluations/sensitive_data_scanning_1.png" alt="Una evaluación de Seguridad y protección detectada por Sensitive Data Scanner en LLM Observability" style="width:100%;" >}}

| Fase de evaluación | Método de evaluación | Definición de la evaluación | 
|---|---|---|
| Evaluación de entradas y salidas | Sensitive Data Scanner | Con la tecnología de [Sensitive Data Scanner][5], LLM Observability escanea, identifica y redacta información confidencial dentro de los pares instrucción-respuesta de la aplicación de LLM. Esto incluye información personal, información financiera, registros médicos o cualquier otro dato que requiera protección debido a problemas de privacidad o seguridad. |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://react-lm.github.io/
[2]: /es/llm_observability/setup/sdk/?tab=model#tracing-spans
[3]: /es/llm_observability/setup/auto_instrumentation/
[4]: /es/llm_observability/setup/?tab=decorators#instrument-your-llm-application
[5]: /es/sensitive_data_scanner/
[6]: /es/llm_observability/submit_evaluations
[7]: https://github.com/DataDog/llm-observability/blob/main/1-llm-span.ipynb
[8]: https://github.com/DataDog/llm-observability/blob/main/2-workflow-span.ipynb
[9]: https://github.com/DataDog/llm-observability/blob/main/3-agent-span.ipynb
[10]: https://github.com/DataDog/llm-observability/blob/main/4-custom-evaluations.ipynb