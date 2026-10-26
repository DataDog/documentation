---
aliases:
- /es/llm_observability/playground/
description: Utilice el Playground de Agent Observability para probar prompts de forma
  interactiva con cualquier proveedor de modelos conectado y ejecutar experimentos
  con evaluadores desde una interfaz basada en navegador.
further_reading:
- link: /llm_observability/improve/experiments
  tag: Documentación
  text: Experimentos de Agent Observability
- link: /llm_observability/improve/datasets
  tag: Documentación
  text: Conjuntos de datos
- link: /llm_observability/improve/experiments/analyzing_results
  tag: Documentación
  text: Análisis de los resultados del experimento
title: Área de pruebas
---
El [Playground][1] es una interfaz basada en navegador para probar y evaluar prompts de LLM. Puede probar un prompt con entrada arbitraria frente a cualquier proveedor de modelos conectado, o cargar un conjunto de datos, adjuntar evaluadores, obtener una vista previa de los resultados y guardar la configuración como un experimento reproducible, todo sin escribir código.

El Playground admite dos flujos:
- **[Probar un prompt con entrada arbitraria](#test-a-prompt-with-arbitrary-input)**: Envíe un solo prompt con valores de entrada personalizados e inspeccione la respuesta del modelo.
- **[Ejecutar un experimento desde el Playground](#run-an-experiment-from-the-playground)**: Ejecute su prompt en un conjunto de datos, califique cada fila con evaluadores y guarde el resultado como un [experimento][2].

## Requisitos previos {#prerequisites}

Conecte al menos una integración de proveedor de modelos en [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][3] antes de usar el Playground.

Proveedores admitidos:
- OpenAI
- Anthropic
- Azure OpenAI
- Amazon Bedrock
- Vertex AI
- Proveedor personalizado

## Probar un prompt con entrada arbitraria {#test-a-prompt-with-arbitrary-input}

{{< img src="llm_observability/playground/playground-arbitrary-input.png" alt="Playground de Agent Observability que muestra un mensaje del usuario con marcadores de posición de variables {{category}} y {{approach}}, y la respuesta del modelo en el panel de salida." style="width:100%;" >}}

Utilice el modo Prompts para iterar en un prompt con un conjunto fijo de entradas.

1. Navegue a [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Playground{{< /ui >}}][1].
1. Escriba sus prompts de sistema y de usuario en el editor de mensajes. Para parametrizar las entradas, use `{{variable_name}}` en cualquier mensaje.
1. Abra el panel {{< ui >}}Model configuration{{< /ui >}} usando la barra superior.
1. En el panel de configuración, seleccione un {{< ui >}}Provider{{< /ui >}}, un {{< ui >}}Account{{< /ui >}} y un {{< ui >}}Model{{< /ui >}}.
1. (Opcional) Haga clic en {{< ui >}}Edit Response Structure{{< /ui >}} para solicitar una salida estructurada del modelo.
1. (Opcional) Haga clic en {{< ui >}}Model Parameters{{< /ui >}} para especificar los parámetros del modelo.
1. (Opcional) Haga clic en {{< ui >}}Add New{{< /ui >}} junto a {{< ui >}}Tools{{< /ui >}} para agregar definiciones de herramientas en formato de esquema de función JSON. Utilice los ejemplos proporcionados (Clima, Búsqueda web, Correo electrónico, Precio de acciones) como puntos de partida.
1. Puede ingresar valores para cada variable en la sección {{< ui >}}Variables{{< /ui >}} para sustituir los parámetros que definió en sus prompts de usuario y de sistema.
1. Haga clic en {{< ui >}}Done{{< /ui >}} para guardar la configuración y cerrar el modal.
1. Haga clic en {{< ui >}}Run{{< /ui >}} para enviar el prompt y ver la respuesta del modelo.

Edite los mensajes, los valores de las variables o la configuración del modelo, luego haga clic en {{< ui >}}Run{{< /ui >}} nuevamente para iterar.

## Ejecute un experimento desde el Playground {#run-an-experiment-from-the-playground}

{{< img src="llm_observability/playground/playground-experiment-preview.png" alt="Agent Observability Playground en modo de experimento con todos los pasos completados y 'Guardar y ejecutar como experimento' activo. La tabla de vista previa del experimento muestra las columnas OUTPUT, EVAL_EXPECTED_OUTPUT, INPUT y EXPECTEDOUTPUT con insignias PASS y FAIL por fila y un banner de resumen que indica que 6 de 20 registros pasaron." style="width:100%;" >}}

Utilice el modo Experimentos para probar su prompt en un conjunto de datos, calificar los resultados con evaluadores y guardar la configuración como un experimento reproducible.

### Configure su prompt {#configure-your-prompt}

Escriba su prompt usando `{{variable_name}}` placeholders where dataset values will be substituted. Use dot notation to reference nested dataset fields—for example, `{{input.question}}` to reference a field named `question` en la sección de entrada de un registro.

### 1. Agregar un conjunto de datos {#1-add-a-dataset}

Seleccione un conjunto de datos de su proyecto. El conjunto de datos proporciona los registros con los que el Playground ejecuta su prompt.

Para crear un conjunto de datos, consulte [Datasets][4].

### 2. Agregar variables {#2-add-variables}

Asigne las columnas del conjunto de datos a las secciones disponibles en su prompt:

| Sección | Descripción |
|---------|-------------|
| {{< ui >}}Input{{< /ui >}} | Columnas de la sección de entrada de cada registro, utilizadas para completar `{{input.*}}` variables. If the input value is a JSON object, its top-level keys are exposed as individual variables (for example, `{{input.question}}` and `{{input.category}}`). If the input value is a plain string or number, the whole field is available as `{{input}}`. |
| {{< ui >}}Expected Output{{< /ui >}} | Valores de referencia utilizados por los evaluadores para calificar la salida del modelo. Si el valor es un objeto JSON, las claves de nivel superior se exponen individualmente (por ejemplo, `{{expected_output.answer}}`). Available as `{{expected_output}}` for plain values. |
| {{< ui >}}Metadata{{< /ui >}} | Columnas de contexto adicionales. Las claves de nivel superior de un objeto JSON están disponibles como `Variables de `{{metadata.*}}`. |

Haga clic en {{< ui >}}Use this dataset{{< /ui >}} para proceder a la etapa de vista previa.

<div class="alert alert-warning">Si una variable hace referencia a una ruta que no existe en el conjunto de datos (por ejemplo, <code>{{question}}</code> en lugar de <code>{{input.question}}</code>—el modelo recibe la cadena de plantilla literal. Regrese a su prompt y corrija las rutas de las variables para que coincidan con las columnas que se muestran en la tabla anterior.</div>

### 3. Agregar evaluadores {#3-add-evaluators}

Los evaluadores califican cada fila después de una ejecución de vista previa. Haga clic en {{< ui >}}Add Evaluators{{< /ui >}} en la barra de herramientas para abrir el modal de configuración del evaluador.

El Playground admite {{< ui >}}String Check{{< /ui >}} evaluadores. Agregue varios evaluadores para calificar diferentes aspectos del resultado en una sola ejecución.

{{% collapse-content title="Opciones del evaluador de verificación de cadenas" level="h4" expanded=false %}}

| Campo | Descripción |
|-------|-------------|
| {{< ui >}}Operator{{< /ui >}} | La comparación que se aplicará: `equals`, `not equals` o `contains`. |
| {{< ui >}}Case sensitive{{< /ui >}} | Cuando está habilitado, la comparación distingue entre mayúsculas y minúsculas. |
| {{< ui >}}Strip whitespace{{< /ui >}} | Cuando está habilitado, los espacios en blanco al principio y al final se eliminan antes de comparar. |
| {{< ui >}}Left operand{{< /ui >}} | El valor a evaluar; el valor predeterminado es el resultado del modelo (`output`). |
| {{< ui >}}Right operand{{< /ui >}} | El valor con el cual comparar; el valor predeterminado es el resultado esperado. Admite notación de puntos para campos anidados. |
| {{< ui >}}Name{{< /ui >}} | Un alias que se muestra como el encabezado de columna en la tabla de resultados. |

{{% /collapse-content %}}

### 4. Ejecutar una vista previa {#4-run-a-preview}

Haga clic en {{< ui >}}Run Preview{{< /ui >}} para ejecutar el prompt en hasta 20 registros del conjunto de datos.

Después de que se complete la vista previa:
- Cada fila muestra una insignia de {{< ui >}}PASS{{< /ui >}} o {{< ui >}}FAIL{{< /ui >}} para cada evaluador.
- El encabezado de la columna muestra los conteos totales de aprobados y reprobados.
- Un banner de resumen muestra el resultado general.

Haga clic en una insignia {{< ui >}}FAIL{{< /ui >}} para expandir un elemento emergente que muestra la salida real, el operador, el valor esperado y una sugerencia contextual. Por ejemplo, cuando una verificación `equals` falla porque la salida contiene el valor esperado como subcadena, el elemento emergente sugiere cambiar a `contains`.

### Itere en la configuración del prompt y del evaluador {#iterate-on-prompt-and-evaluator-configuration}

{{< img src="llm_observability/playground/playground-stale-preview.png" alt="Agent Observability Playground que muestra un estado de vista previa obsoleto después de una edición del prompt. Un banner de advertencia dice 'El prompt o la configuración cambiaron desde la última vista previa. Ejecute la vista previa de nuevo antes de ejecutar el conjunto de datos completo.' con un botón de Volver a ejecutar vista previa. La tabla de resultados muestra insignias de APROBADO y REPROBADO de la ejecución anterior." style="width:100%;" >}}

Después de revisar los resultados, edite la configuración del prompt o del evaluador para mejorar las puntuaciones. Cualquier edición marca los resultados de la vista previa como obsoletos. Haga clic en {{< ui >}}Re-run Preview{{< /ui >}} para ejecutar de nuevo con la configuración actualizada.

Patrones de iteración comunes:
- Si la mayoría de las filas fallan `equals`, verifique si `contains` o la comparación que no distingue entre mayúsculas y minúsculas refleja mejor la tarea.
- Si los valores de las variables aparecen como literales en la salida (por ejemplo, `{{input.question}}`), corrija la ruta de la variable en el prompt.
- Ajuste la redacción del prompt y vuelva a ejecutar para observar el efecto en las tasas de aprobación.

### 5. Guarde el experimento {#5-save-the-experiment}

Cuando los resultados de la vista previa cumplan con sus expectativas, haga clic en {{< ui >}}Save & Run as experiment{{< /ui >}} en la barra de herramientas superior para ejecutar en el conjunto de datos completo.

En el cuadro de diálogo:

1. Ingrese un {{< ui >}}Experiment name{{< /ui >}}.
1. Seleccione {{< ui >}}Project{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

El experimento se ejecuta en todos los registros del conjunto de datos, no solo en la muestra de vista previa de 20 registros. Cuando termine, visualice los resultados en [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}}][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/playground
[2]: https://app.datadoghq.com/llm/testing/experiments
[3]: https://app.datadoghq.com/llm/settings/integrations
[4]: /es/llm_observability/improve/datasets