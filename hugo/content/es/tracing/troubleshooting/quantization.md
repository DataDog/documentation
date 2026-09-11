---
further_reading:
- link: /tracing/trace_collection/custom_instrumentation/
  tag: Documentación
  text: Instrumentación personalizada
- link: /tracing/configure_data_security/#scrub-sensitive-data-from-your-spans
  tag: Documentación
  text: Sustituir etiquetas en tramos
- link: /tracing/trace_collection/library_config/
  tag: Documentación
  text: Configuración de la librería de rastreo
title: Cuantificación de datos de APM
---

## Información general

Durante la ingesta, Datadog aplica _cuantificación_ a los datos de APM, como los IDs únicos globales (GUID) aleatorios, los IDs numéricos y los valores de los parámetros de consulta en los nombres de [tramo][1] o [recurso][2]. La normalización resultante reduce la contaminación de nombres que resulta de estos patrones aleatorios al agrupar esos tramos y recursos porque son, a efectos de análisis, los mismos.

Determinados patrones en los nombres de recurso o tramo se sustituyen por las siguientes cadenas estáticas:
- GUIDs: `{guid}`
- ID numéricos (números de más de 6 cifras rodeados de caracteres no alfanuméricos o que se encuentran al final de una cadena): `{num}`
- Valores de los parámetros de consulta: `{val}`

Estos reemplazos afectan:
- nombres de métrica de traza
- etiqueta de nombre del recurso en esas métricas
- nombres de recurso y tramo para todos los tramos ingeridos.

### Ejemplos de cuantificación

Por ejemplo, si un _nombre de tramo_ es `find_user_2461685a_80c9_4d9e_85e9_a3b0e9e3ea84`, se renombra a `find_user_{guid}` y las métricas de traza resultantes son:
- `trace.find_user_guid`
- `trace.find_user_guid.hits`
- `trace.find_user_guid.errors`
- `trace.find_user_guid.duration`
- `trace.find_user_guid.apdex` (si Apdex está configurado para el servicio)

Para buscar estos tramos en la búsqueda de traza, la consulta es `operation_name:"find_user_{guid}"`.

Si un _nombre de recurso_ es `SELECT ? FROM TABLE temp_128390123`, se renombra a `SELECT ? FROM TABLE temp_{num}` y su etiqueta normalizada para métrica es `resource_name:select_from_table_temp_num`.

Para buscar estos tramos en la búsqueda de traza, la consulta es `resource_name:"SELECT ? FROM TABLE temp_{num}"`.

## Cambio de Instrumentación para evitar la cuantificación por defecto

**Nota**: Cualquier cambio en los nombres de recurso y tramo anteriores en la instrumentación o el Agent produce nuevas métricas y etiquetas. Si utilizas consultas sobre datos cuantificados, dichas consultas deben actualizarse para que funcionen con los nuevos nombres.

### Instrumentación en el código

Si tu aplicación se ejecuta en una configuración sin agentes o si prefieres realizar cambios en la instrumentación más directamente en tu código, consulta [la documentación del rastreador del tiempo de ejecución de tu aplicación][3] para obtener información sobre cómo crear una configuración personalizada para nombres de tramo y nombres de recurso.

### Configuración del Agent

Puedes utilizar la opción de configuración YAML `replace_tags` para configurar tus propias cadenas de sustitución mediante expresiones regulares compatibles con Go:

```yaml
apm_config:
  replace_tags:
    # Reemplaza los IDs de cola numérica en nombres de tramo con "x":
    - name: "span.name"
      pattern: "get_id_[0-9]+"
      repl: "get_id_x"
    # Reemplaza los IDs numéricos en rutas de recurso:
    - name: "resource.name"
      pattern: "/users/[0-9]+/"
      repl: "/users/{user_id}/"
```

Como alternativa, puedes utilizar la variable de entorno `DD_APM_REPLACE_TAGS` con una cadena JSON como valor:

```bash
export DD_APM_REPLACE_TAGS = '[{"name": "span.name", "pattern": "get_id_[0-9]+", "repl": "get_id_x"}, {...}, ...]'
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#spans
[2]: /es/tracing/glossary/#resources
[3]: /es/tracing/trace_collection/custom_instrumentation/
