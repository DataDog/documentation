---
aliases:
- /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/prompt_templating/
description: 'Referencia para la creación de plantillas utilizada en prompts de evaluación
  personalizados de LLM-como-juez: variables, operadores de matriz, filtros de tramo
  y traza, rutas de sesión y reglas de resolución.'
further_reading:
- link: /llm_observability/configure/evaluations/llm_as_a_judge_evaluations
  tag: Documentación
  text: Evaluaciones personalizadas de LLM-as-a-judge
- link: /llm_observability/configure/evaluations/llm_as_a_judge_evaluations/session_level_evaluations
  tag: Documentación
  text: Evaluaciones a nivel de sesión
- link: /llm_observability/configure/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
  tag: Documentación
  text: Evaluaciones a nivel de traza
title: Creación de plantillas de prompt
---
Los prompts personalizados de LLM-como-juez inyectan datos de sesión, traza o tramo en el mensaje {{< ui >}}User{{< /ui >}} envolviendo una ruta de campo en `{{ ... }}`. El System Prompt contiene las instrucciones estáticas para el juez LLM y no resuelve marcadores de posición. La misma sintaxis funciona tanto en el panel de prueba como en el momento de la evaluación. Las rutas disponibles dependen del contexto de la evaluación: sesión, traza o tramo.

## De un vistazo {#at-a-glance}

| Patrón | Descripción |
|---|---|
| `{{trazas}}` | Every trace in the session as JSON |
| `{{trazas[0].tramos[0].meta.input.value}}` | First span of the first trace |
| `{{trazas[*].tramos[*].name}}` | Fan-out across traces and spans |
| `{{trazas[*].tramos[meta.span.kind:llm].meta.output.value}}` | Filter spans by attribute across a session |
| `{{tramos}}` | Every span in the trace as JSON (trace scope) |
| `{{tramos[0].name}}` | Pick one span from a trace (trace scope) |
| `{{tramos[name:my-span].meta.input.value}}` | Filter spans by attribute (trace scope) |
| `{{name}}` | Direct field (span scope) |
| `{{meta.input.value}}` | Dot notation for nested fields (span scope) |
| `{{meta.input.messages[0].content}}` | Array index (0-based) (span scope) |
| `{{meta.input.messages[1,3].content}}` | Inclusive array range (span scope) |
| `{{meta.input.messages[*].content}}` | Array wildcard (fan-out) (span scope) |
| `{{meta.input.messages.content}}` | Implicit fan-out (same as `[*]`) (span scope) |
| `{{tramo_input}}`, `{{tramo_output}}` | Aliases for span input and output fields (span scope) |
| `{{*}}` | Carga útil completa como JSON (contexto de sesión, traza o tramo) |

El menú desplegable de autocompletado se abre después de escribir `{{` y enumera los campos disponibles en la muestra seleccionada.

## Sintaxis de contexto de sesión {#session-scope-syntax}

Las evaluaciones de contexto de sesión exponen cada traza en la [sesión de usuario][1] bajo la matriz `traces`. Cada traza incluye su propia matriz `spans`, por lo que puede leer a través de trazas y tramos en un solo prompt. Use `{{trazas[...]}}` paths (and nested `{{trazas[...].tramos[...]}}` paths) to build session-level judges. The `{{tramo_input}}` and `Los alias de {{tramo_output}}` no están disponibles en el contexto de sesión.

Las evaluaciones a nivel de sesión requieren que los tramos estén etiquetados con un `session_id`. Consulte [Seguimiento de sesiones de usuario][1] para instrumentar su aplicación, y [Evaluaciones a nivel de sesión][2] para obtener información sobre configuración, ejemplos de prompts y orientación sobre cuándo elegir el contexto de sesión.

### Referenciar toda la sesión {#reference-the-whole-session}

```
{{traces}}    # JSON of every trace in the session (each trace includes its spans)
{{*}}         # Entire session payload as JSON, including top-level metadata
```

### Elegir una traza o un tramo por índice {#pick-a-trace-or-span-by-index}

```
{{traces[0].spans[0].meta.input.value}}    # First span of the first trace
{{traces[*].spans[*].name}}                # Newline-joined names of every span in the session
{{traces[1].spans}}                        # JSON of every span in the second trace
```

### Filtrar tramos por atributo {#filter-spans-by-attribute}

`[field.path:value]` en `spans` mantiene solo los tramos cuyo campo en `field.path` es igual a `value`. Combine con rutas más profundas para extraer entradas o salidas a través de la sesión. Los filtros vuelven a una cadena vacía cuando nada coincide.

```
{{traces[0].spans[name:my-span].meta.input.value}}
{{traces[*].spans[meta.span.kind:llm].meta.output.value}}
{{traces[*].spans[meta.span.kind:tool].meta.input.parameters}}
```

### Fan-out a través de trazas {#fan-out-across-traces}

Use `[*]` en `traces` o `spans` para hacer fan-out: los valores de cada elemento coincidente se unen con saltos de línea (`\n`), o se serializan como JSON cuando los valores resueltos son objetos.

```
{{traces[*].spans[meta.span.kind:llm].meta.input.messages[*].content}}
{{traces[*].spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

## Sintaxis de contexto de traza {#trace-scope-syntax}

Las evaluaciones de contexto de traza exponen cada tramo en la traza bajo la matriz `spans`. Use `{{tramos...}}` paths to read across spans. The `{{tramo_input}}` and `Los alias `{{tramo_output}}` no están disponibles en el contexto de traza. Consulte [Evaluaciones a nivel de traza][3] para obtener información sobre configuración, ejemplos de prompts y orientación sobre cuándo elegir el contexto de traza.

### Referenciar toda la traza {#reference-the-whole-trace}

```
{{spans}}    # JSON of every span in the trace
{{*}}        # Entire trace payload as JSON, including top-level metadata
```

### Elegir un tramo por índice {#pick-a-span-by-index}

```
{{spans[0].meta.input.value}}    # First span
{{spans[*].name}}                # Newline-joined names of every span
```

### Filtrar tramos por atributo {#filter-spans-by-attribute-1}

`[field.path:value]` mantiene solo los tramos cuyo campo en `field.path` es igual a `value`. Combine con rutas más profundas para extraer las entradas o salidas de los tramos coincidentes. El filtro vuelve a una cadena vacía si ningún tramo coincide.

```
{{spans[name:my-span].meta.input.value}}
{{spans[meta.span.kind:llm].meta.output.value}}
{{spans[meta.span.kind:tool].meta.input.parameters}}
```

## Sintaxis de contexto de tramo {#span-scope-syntax}

Las evaluaciones de contexto de tramo exponen un solo tramo por evaluación. Haga referencia a los campos por su ruta JSON en el tramo.

### Alias integrados {#built-in-aliases}

| Alias | Se resuelve en |
|---|---|
| `{{tramo_input}}` | `meta.input.messages[*].content` for LLM spans, `meta.input.value` otherwise |
| `{{tramo_output}}` | `meta.output.messages[*].content` for LLM spans, `meta.output.value` de lo contrario |

Los alias se adaptan al tipo de tramo que se está evaluando, por lo que no tiene que ramificar si el tramo es una llamada a LLM o un paso de agente.

### Rutas de campo directas {#direct-field-paths}

Haga referencia a cualquier campo de tramo mediante su ruta JSON.

```
{{name}}
{{meta.input.value}}
{{meta.output.value}}
{{metrics.input_tokens}}
```

### Acceso a arreglos {#array-access}

Utilice la notación de corchetes para indexar, segmentar o distribuir sobre campos de arreglo.

```
{{meta.input.messages[0].content}}     # First message only
{{meta.input.messages[*].content}}     # All messages, joined with newlines
{{meta.input.messages[0,2].content}}   # Inclusive range; out-of-bounds ends are clamped
{{meta.input.messages.content}}        # Implicit fan-out, equivalent to [*]
```

## Reglas de resolución {#resolution-rules}

| Resultado | Comportamiento |
|---|---|
| Ruta faltante | Se resuelve en una cadena vacía |
| Índice fuera de límites | Se resuelve en una cadena vacía |
| Cadena única | Se inserta tal cual |
| Arreglo de cadenas | Se une con saltos de línea (`\n`) |
| Objeto o arreglo de valores que no son cadenas | Se serializa como JSON compacto |
| Arreglo mixto (cadenas + objetos) | Se serializa como JSON compacto |
| Arreglo vacío único | Se resuelve en una cadena vacía |

Por ejemplo, dado un tramo donde `meta.input.messages` es:

```json
[
  { "role": "user", "content": "hello" },
  { "role": "user", "content": "help please" }
]
```

| Plantilla | Valor resuelto |
|---|---|
| `{{meta.input.messages[0].content}}` | `hola` |
| `{{meta.input.messages[*].content}}` | `hola`<br>`ayuda por favor` |
| `{{meta.input.messages}}` | `[{\"role\":\"user\",\"content\":\"hola\"},{\"role\":\"user\",\"content\":\"ayuda por favor\"}]` |

## Consejos {#tips}

- Escriba `{{` en el editor de prompts para abrir el menú desplegable de autocompletado. La lista se adapta al contexto (sesión, traza o tramo) y a la muestra seleccionada.
- Elija una muestra en el panel de la derecha ({{< ui >}}Sample Session{{< /ui >}} para el contexto de sesión, {{< ui >}}Spans in Selected Trace{{< /ui >}} para el contexto de traza o {{< ui >}}Filtered Spans{{< /ui >}} para el contexto de tramo), luego haga clic en {{< ui >}}Test Evaluation{{< /ui >}} para previsualizar cómo se resuelve cada marcador de posición con datos reales antes de guardar.
- Utilice el menú de tres puntos en la vista JSON de una muestra y seleccione {{< ui >}}Add variable to message{{< /ui >}} para insertar una ruta de campo en el prompt sin tener que escribirla.
- Pase `{{*}}` cuando desee que el juez LLM vea la carga útil completa; es útil para prompts de formato libre que deciden por sí mismos qué campos son importantes.
- Utilice `{{trazas}}` or targeted `{{trazas[...].tramos[...]}}` paths for session judges when you need cross-turn context; use `{{tramos}}` cuando una sola traza sea suficiente. Consulte [Evaluaciones a nivel de sesión][2] para obtener orientación sobre el contexto y ejemplos de prompts.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/instrument/sdk/#tracking-user-sessions
[2]: /es/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/session_level_evaluations
[3]: /es/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations