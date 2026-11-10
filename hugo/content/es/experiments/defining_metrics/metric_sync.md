---
description: Defina las métricas de experimento en YAML, previsualice los cambios
  y sincronícelos con Datadog desde CI.
further_reading:
- link: /experiments/defining_metrics/
  tag: Documentación
  text: Crear métricas de experimento
- link: /experiments/guide/connecting_a_data_warehouse/
  tag: Documentación
  text: Conecte un almacén de datos
- link: /account_management/api-app-keys/
  tag: Documentación
  text: Claves de API y de aplicación
title: Sincronice las métricas de experimento desde YAML
---
## Descripción general {#overview}

Las métricas de experimento definen los resultados que utiliza para evaluar un experimento, como ingresos, tasa de conversión o páginas vistas. Cree estas métricas manualmente en Datadog o defina métricas de almacén en YAML. Utilice la CLI de Datadog Experiments Metric Sync para sincronizar las definiciones de YAML con Datadog.

Utilice Metric Sync cuando desee:

- Revisar los cambios de métricas en solicitudes de extracción (pull requests).
- Mantener las definiciones de métricas en el control de versiones.
- Aplicar los cambios de métricas desde CI una vez que se aprueben.
- Marcar las métricas sincronizadas como certificadas de forma predeterminada para la toma de decisiones sobre experimentos.

Metric Sync admite un flujo de trabajo de planificar y aplicar. El comando `plan` valida su YAML y previsualiza los cambios que Datadog realizaría. El comando `execute` valida el YAML, envía una operación de escritura y espera a que se complete. Los resultados incluyen conteos de cambios, IDs de objetos, cambios en campos, motivos de bloqueo, advertencias y detalles de errores disponibles. Los planes muestran los cambios propuestos; una operación fallida no confirma que esos cambios se hayan aplicado.

## Requisitos previos {#prerequisites}

Antes de usar Metric Sync, necesita:

- Una cuenta de Datadog con Product Analytics y Experiments habilitados.
- Un almacén de datos conectado. Consulte [Conectar un almacén de datos][1].
- Un tipo de sujeto existente, como `User`, para asignarlo a una columna de la consulta de la fuente.
- Los permisos de Product Analytics necesarios para crear y actualizar métricas de experimentos. Las métricas sincronizadas están certificadas de forma predeterminada, por lo que los roles personalizados también necesitan el permiso Product Analytics Certified Metrics Write. Consulte [Permisos de Product Analytics][2].
- Una clave de Datadog API y una clave de aplicación de para la autenticación de CI. Consulte [Claves de API y de aplicación][3].

## Instale la CLI {#install-the-cli}

Instale la versión más reciente de la CLI de Metric Sync:

```shell
curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
```

El script de instalación detecta macOS o Linux, descarga el archivo de versión de GitHub correspondiente, verifica la suma de comprobación SHA-256 e instala el binario `metric-sync` en `/usr/local/bin`. Dependiendo de sus permisos de sistema, la instalación en `/usr/local/bin` puede requerir `sudo`. Para instalar sin permisos elevados, establezca `INSTALL_DIR` en un directorio de su propiedad.

Para instalar una versión específica o instalar en un directorio diferente:

```shell
curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | env VERSION=<VERSION> INSTALL_DIR="$HOME/.local/bin" sh
export PATH="$HOME/.local/bin:$PATH"
```

Establezca las credenciales de Datadog con variables de entorno:

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_APP_KEY=<DATADOG_APPLICATION_KEY>
```

De forma predeterminada, la CLI envía solicitudes a `datadoghq.com`. Establezca `DD_SITE` si su organización utiliza un sitio de Datadog diferente:

```shell
export DD_SITE={{< region-param key="dd_site" >}}
```

## Crear una definición de métrica {#create-a-metric-definition}

Cree uno o más archivos YAML en un directorio dedicado en su repositorio. La CLI acepta un archivo, varios archivos, un directorio o varios directorios. Cuando pasa un directorio, la CLI descubre de forma recursiva archivos `.yaml` y `.yml`, excepto en subdirectorios ocultos. Utilice un documento YAML por archivo. La CLI rechaza documentos adicionales en el mismo archivo, incluido un documento vacío después de un separador `---`. Coloque las definiciones adicionales en archivos separados y envíe el directorio completo.

El siguiente ejemplo define una fuente de métricas de almacén y una métrica con `metric_type: simple`. La métrica incluye eventos de US y CA. Antes de usar el ejemplo:

- Reemplace la consulta SQL con una consulta para su almacén. Devuelva cada columna utilizada por una marca de tiempo, mapeo de sujeto, medida o propiedad.
- Haga coincidir los nombres de las columnas YAML con los nombres devueltos por la consulta, incluyendo mayúsculas y minúsculas.
- Reemplace `User` con un nombre de tipo de sujeto de Datadog existente. Metric Sync no crea el tipo de sujeto.
- Elija un `sync_tag` estable para este conjunto de definiciones y reemplace `reference_url` con la URL de su repositorio.
- Si la organización tiene múltiples conexiones de almacén, establezca `warehouse_connection_id` en el nivel superior o en cada fuente. Un valor a nivel de fuente anula el valor de nivel superior. Si la organización tiene exactamente una conexión, la CLI la selecciona cuando se omite el ID.

```yaml
schema_version: 1
sync_tag: example-checkout
reference_url: https://github.com/example-org/example-repo

warehouse_metric_sources:
  - sync_id: checkout_events
    name: Checkout events
    sql: |
      SELECT user_id, event_timestamp, transaction_timestamp, revenue, country, platform
      FROM analytics.checkout_events
    timestamp_column: event_timestamp
    additional_timestamp_columns:
      - transaction_timestamp
    subject_types:
      - name: User
        column_name: user_id
    measures:
      - sync_id: revenue
        name: Revenue
        column_name: revenue
        column_type: FLOAT
    properties:
      - sync_id: country
        property_name: Country
        property_column: country
        property_type: STRING
      - sync_id: platform
        property_name: Platform
        property_column: platform
        property_type: STRING

metrics:
  - sync_id: checkout_revenue
    name: Checkout revenue
    metric_type: simple
    desired_change: METRIC_INCREASES
    simple_metric_aggregation:
      operation: sum
      measure:
        warehouse_metric_source_sync_id: checkout_events
        measure_sync_id: revenue
      timeframe_start_value: 0
      winsor_upper_percentile: 0.99
      winsorization_strategy: nonzero
      property_filters:
        property:
          warehouse_metric_source_sync_id: checkout_events
          property_sync_id: country
        operation: IS
        values: [US, CA]
```

## Obtenga una vista previa y sincronice los cambios {#preview-and-sync-changes}

Cada envío define el conjunto completo de fuentes y métricas administradas por su `sync_tag`. Los objetos ya administrados por esa etiqueta pero ausentes en los archivos enviados son candidatos para su eliminación. Envíe todos los archivos para la etiqueta juntos, incluidas las definiciones sin cambios.

| Comando | Lo que verifica o hace | ¿Cambia las definiciones? |
| ------- | ---------------------- | -------------------- |
| `validate` | Verifica la sintaxis YAML y las reglas locales admitidas. No llama a Datadog. | No |
| `plan` | Ejecuta verificaciones locales, luego solicita una vista previa del servidor de los cambios propuestos. | No |
| `execute` | Ejecuta verificaciones locales, luego envía una operación para aplicar las definiciones. Espera a que finalice a menos que utilice `--no-poll`. | Sí, si la operación tiene éxito |

Un plan exitoso no confirma que exista una fuente externa o una medida seleccionada. Datadog resuelve referencias externas durante `execute`.

Para previsualizar los cambios antes de aplicarlos, ejecute `plan`:

```shell
metric-sync plan ./metrics
```

La salida del plan muestra el ID de la operación, la etiqueta de sincronización, el estado, los cambios de campo propuestos y los motivos de bloqueo. Revise estos detalles antes de ejecutar. Los comandos `plan`, `execute` y `result` terminan con un estado distinto de cero si una operación falla o su resultado contiene objetos bloqueados o errores. Para guardar la respuesta de la API para la resolución de problemas, agregue `--log-file ./metric-sync-plan.log`.

Después de revisar el plan, ejecute `execute` para aplicar los cambios:

```shell
metric-sync execute ./metrics
```

`execute` realiza una validación local, envía una operación de escritura de Metric Sync a Datadog, sondea la operación hasta que alcanza un estado terminal e imprime el resumen del resultado.

`execute` lee el YAML nuevamente y crea una nueva operación. No aplica un plan guardado por ID. Utilice los mismos archivos y opciones revisados para ambos comandos.

También puede ejecutar:

```shell
metric-sync validate ./metrics
metric-sync status <METRIC_SYNC_ID>
metric-sync result <METRIC_SYNC_ID>
metric-sync version
```

Los comandos realizan lo siguiente:

- `status`: Verifica una operación por ID.
- `result`: Obtiene el resultado final del plan o de la ejecución.
- `version`: Imprime los metadatos de compilación.

Utilice `--timeout 20m` para cambiar el tiempo de espera predeterminado de 10 minutos del comando. Si un comando agota el tiempo de espera después del envío, verifique el ID de operación impreso con `status` antes de volver a enviarlo. Para enviar sin esperar, utilice `--no-poll`, luego verifique `status` y `result`. Un comando `--no-poll` exitoso solo confirma el envío.

## Ejemplo de GitHub Actions {#github-actions-example}

El siguiente flujo de trabajo ejecuta `plan` en solicitudes de extracción y `execute` después de que los cambios se fusionan en `main`:

```yaml
name: Sync Datadog experiment metrics

on:
  pull_request:
    paths:
      - "metrics/**/*.yaml"
      - "metrics/**/*.yml"
      - ".github/workflows/datadog-metric-sync.yml"
  push:
    branches:
      - main
    paths:
      - "metrics/**/*.yaml"
      - "metrics/**/*.yml"

jobs:
  plan:
    if: github.event_name == 'pull_request' && github.event.pull_request.head.repo.full_name == github.repository
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Metric Sync CLI
        run: curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
      - name: Plan metric changes
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        run: metric-sync plan ./metrics

  execute:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    concurrency:
      group: metric-sync-example-checkout
      cancel-in-progress: false
    steps:
      - uses: actions/checkout@v4
      - name: Install Metric Sync CLI
        run: curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
      - name: Apply metric changes
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        run: metric-sync execute ./metrics
```

Almacene su clave de Datadog API y su clave de aplicación como secretos de GitHub Actions. Si su organización utiliza un sitio de Datadog distinto a `datadoghq.com`, agregue `DD_SITE` al entorno del flujo de trabajo.

Utilice un grupo de concurrencia para cada etiqueta de sincronización para evitar ejecuciones superpuestas de este flujo de trabajo. El trabajo de plan se ejecuta solo para solicitudes de extracción del mismo repositorio. Las solicitudes de extracción de bifurcaciones no reciben estos secretos; ejecute `validate` sin credenciales para esas contribuciones, luego ejecute `plan` en un flujo de trabajo confiable.

## Referencia de definición {#yaml-reference}

### Etiquetas de sincronización e identificadores {#sync-tags-and-ids}

Un `sync_tag` identifica el conjunto de definiciones de métricas que se administran juntas. Utilice un `sync_tag` estable para cada repositorio, equipo o dominio de métricas que desee administrar de forma independiente. Por ejemplo, un equipo de crecimiento y un equipo de finalización de compra pueden sincronizar métricas de diferentes repositorios utilizando diferentes valores de `sync_tag`, como `growth-metrics` y `checkout-metrics`.

Dentro de un `sync_tag`, cada fuente de métricas del almacén de datos y cada métrica tienen un `sync_id` estable. Cada propiedad y medida declarada también requiere un `sync_id`, único dentro de su propia lista en esa fuente. Elija identificadores estables; no necesitan ser UUID. Las agregaciones de métricas usan `warehouse_metric_source_sync_id` para seleccionar una fuente de métricas del almacén de datos. Cada agregación también selecciona una medida declarada, cada fila o una asignación de sujeto. Consulte la sección [Referencias de medidas][4].

Cambiar un `sync_id` puede eliminar el objeto con el ID anterior y crear otro en su lugar. Para cambiar el nombre de un objeto, cambie su `name` y mantenga el mismo `sync_tag` y `sync_id`.

Elimine una fuente y sus métricas dependientes en dos envíos. Primero elimine las definiciones de métricas, mantenga la fuente y todas las definiciones no relacionadas, y ejecute `plan` y `execute`. Luego elimine la fuente y envíe las definiciones restantes. Un plan que elimina tanto la fuente como sus métricas en una sola operación puede pasar la validación, pero fallar durante la ejecución. Las referencias de otras etiquetas de sincronización también deben eliminarse antes de borrar la fuente.

Todos los archivos en una operación deben usar el mismo `schema_version` y `sync_tag`. Sus `options` deben coincidir después de que se apliquen los valores predeterminados. Por ejemplo, omitir `is_certified` es equivalente a establecerlo en `true`. Los valores de `reference_url` y `warehouse_connection_id` de nivel superior que no estén vacíos también deben coincidir entre archivos.

### Administre las métricas y fuentes existentes con YAML {#manage-existing-metrics-with-yaml}

La CLI no exporta las métricas existentes a YAML. Cree el YAML a partir de las definiciones de fuente y métrica, luego guárdelo en el control de versiones. Para las migraciones, `existing_id` se refiere a un objeto que ya está presente en la organización de Datadog de destino.

Para administrar una fuente o métrica manual existente con YAML:

1. Incluya su definición completa y asigne un `sync_id` estable.
2. Establezca `existing_id` en esa fuente o métrica con el UUID de su objeto de Datadog. Esto difiere del `sync_id` que elija para YAML.
3. Establezca `options.upgrade_mode: by_id` en cada archivo enviado, luego ejecute `plan` y revise los cambios antes de `execute`.

La adopción aplica la definición de YAML y asigna la propiedad de sincronización al objeto existente. Las sincronizaciones posteriores lo identifican mediante el mismo `sync_tag` y `sync_id`. Incluya la configuración y las asignaciones de fuente que desee conservar; los campos omitidos pueden usar valores predeterminados o eliminar asignaciones.

### Campos de nivel superior {#top-level-fields}

| Campo | Requerido | Descripción |
| ----- | -------- | ----------- |
| `schema_version` | Sí | Debe ser `1`. |
| `sync_tag` | Sí | Clave de propiedad estable para este grupo de definiciones de métricas. Todos los archivos en una sola operación deben usar el mismo `sync_tag`.<br>Debe comenzar con un carácter alfanumérico y puede contener caracteres alfanuméricos, guiones bajos, puntos, dos puntos y guiones. |
| `reference_url` | No | URL del repositorio de origen, manual de ejecución u otra referencia para las métricas sincronizadas. |
| `warehouse_connection_id` | No | UUID de la conexión predeterminada al almacén para las fuentes de este envío. Si una fuente necesita una conexión y no se ha establecido ningún ID, la CLI selecciona la única conexión de la organización o informa un error si la elección no es única. |
| `warehouse_metric_sources` | No | Modelos SQL y medidas del almacén que utilizan las métricas. Incluya todas las fuentes administradas por esta etiqueta que desee conservar. |
| `metrics` | No | Métricas de experimento para crear o actualizar. Incluya todas las métricas gestionadas por esta etiqueta que desee conservar. |
| `options` | No | Opciones de sincronización como el comportamiento de certificación y actualización. |

### Opciones {#options}

| Campo | Predeterminado | Descripción |
| ----- | ------- | ----------- |
| `is_certified` | `true` | Marca las métricas sincronizadas como certificadas. Como el valor predeterminado de esta opción es `true`, para sincronizar métricas se requiere el permiso Product Analytics Certified Metrics Write, a menos que la establezca en `false`. |
| `upgrade_mode` | `none` | Use `by_id` con el `existing_id` de un objeto para adoptarlo en la propiedad de sincronización. La CLI no admite la adopción por nombre. |
| `force_delete` | `false` | Permite la eliminación a pesar de las referencias de experimentos activos o en curso. Las fuentes a las que hacen referencia métricas fuera de esta etiqueta de sincronización permanecen bloqueadas. Las eliminaciones ordinarias de objetos sin referencia no requieren esta opción. |

### Fuentes de métricas de almacén {#warehouse-metric-sources}

| Campo | Requerido | Descripción |
| ----- | -------- | ----------- |
| `sync_id` | Sí | Identificador estable para la fuente dentro de este `sync_tag`.<br>Debe comenzar con un carácter alfanumérico y puede contener caracteres alfanuméricos, guiones bajos, puntos, dos puntos y guiones. |
| `existing_id` | No | UUID de la fuente de métricas de almacén de Datadog para adoptar con `options.upgrade_mode: by_id`. |
| `name` | Sí | Nombre para mostrar en Datadog. |
| `description` | No | Descripción de la fuente. |
| `sql` | Sí | Consulta SQL que devuelve la marca de tiempo, las columnas de asunto y las medidas utilizadas por las métricas. |
| `timestamp_column` | Sí | Columna que contiene la marca de tiempo del evento o la métrica. |
| `additional_timestamp_columns` | No | Hasta cuatro columnas de marca de tiempo adicionales devueltas por `sql`. Cada nombre debe contener al menos un carácter que no sea un espacio en blanco y no más de 255 caracteres. Los nombres deben ser únicos después de eliminar los espacios en blanco y no deben incluir `timestamp_column`. Si se omite, la fuente no tiene columnas de marca de tiempo adicionales. |
| `warehouse_connection_id` | No | UUID de conexión de almacén para esta fuente. Anula el valor de nivel superior. |
| `reference_url` | No | URL de referencia específica de la fuente. |
| `subject_types` | Sí | Al menos una asignación de sujeto para la fuente. |
| `measures` | No | Columnas que agregan las métricas. |
| `properties` | No | Columnas utilizadas para filtrar eventos de métricas. Incluya estas columnas en el SQL de origen. |

### Tipos de sujetos {#subject-types}

| Campo | Requerido | Descripción |
| ----- | -------- | ----------- |
| `name` | Sí | Nombre del tipo de sujeto de Datadog, como `User` o `Account`. |
| `column_name` | Sí | Columna de resultado SQL que contiene el identificador del sujeto. |

### Medidas {#measures}

| Campo | Requerido | Descripción |
| ----- | -------- | ----------- |
| `sync_id` | Sí | Identificador estable dentro de la fuente de métricas del almacén. |
| `name` | Sí | Nombre para mostrar en Datadog. |
| `column_name` | Sí | Nombre de la columna de resultado SQL. |
| `column_type` | Sí | Requerido para que Datadog pueda validar la columna y mostrar las opciones de configuración de métricas correctas. Los valores admitidos son `STRING`, `INTEGER`, `FLOAT`, `BOOLEAN`, `DATE` y `TIMESTAMP`. |
| `description` | No | Descripción de la medida. |

### Propiedades {#properties}

Use `properties` en una fuente de métricas de almacén para declarar columnas para filtros.

| Campo | Requerido | Descripción |
| ----- | -------- | ----------- |
| `sync_id` | Sí | Identificador estable dentro de la lista de propiedades de la fuente. Los filtros hacen referencia a él con `property_sync_id`. |
| `property_name` | Sí | Nombre para mostrar en Datadog. |
| `property_column` | Sí | Nombre de la columna de resultados SQL. |
| `property_type` | Sí | Tipo de columna, como `STRING`. |
| `description` | No | Descripción de la propiedad. |

Estos nombres de campo de propiedad coinciden con la API. Reemplace los campos de propiedad anteriores `name`, `column_name` y `column_type` con `property_name`, `property_column` y `property_type`. La CLI rechaza los nombres de propiedad anteriores. Las definiciones de medidas siguen usando `name`, `column_name` y `column_type`.

El formato YAML de Datadog difiere del formato de Eppo. Al migrar, reemplace `fact_sources` y `facts` con `warehouse_metric_sources` y `measures`, luego actualice las definiciones de propiedad y las referencias para usar los campos de esta guía.

### Métricas {#metrics}

| Campo | Requerido | Descripción |
| ----- | -------- | ----------- |
| `sync_id` | Sí | Identificador estable para la métrica dentro de este `sync_tag`. |
| `existing_id` | No | UUID de métrica de Datadog para adoptar con `options.upgrade_mode: by_id`. |
| `name` | Sí | Nombre para mostrar en Datadog. |
| `description` | No | Descripción de la métrica. |
| `metric_type` | Sí | Los valores admitidos son `simple`, `ratio` y `percentile`. |
| `desired_change` | No | Dirección utilizada para la interpretación del experimento. Los valores admitidos son `METRIC_INCREASES` y `METRIC_DECREASES`. |
| `format_as_percent` | No | Muestra la métrica como un porcentaje. |
| `reference_url` | No | URL de referencia específica de la métrica. |
| `guardrail_cutoff_threshold` | No | Umbral de corte opcional para la medida de protección. |

Agregue el campo de agregación que coincida con el tipo de métrica:

- Para `metric_type: simple`, agregue `simple_metric_aggregation`.
- Para `metric_type: ratio`, agregue `ratio_metric_aggregation`.
- Para `metric_type: percentile`, agregue `percentile_metric_aggregation`.

<a id="simple-metric-aggregation"></a>

### Agregación para métricas de `simple` {#aggregation-for-simple-metrics}

Los percentiles de winsorización y las métricas de percentiles utilizan fracciones decimales. Por ejemplo, `0.95` significa el percentil 95 en ambos casos.

| Campo | Requerido | Descripción |
| ----- | -------- | ----------- |
| `operation` | Sí | Operación de agregación, como `sum`, `average`, `count` o `countDistinctValue`. |
| `measure` | Sí | Referencia de medida. |
| `property_filters` | No | Filtros aplicados a los eventos incluidos en la agregación. Consulte la sección [Filtros][5]. |
| `timeframe_start_value` | No | Desplazamiento inicial para el marco de tiempo de la métrica. |
| `timeframe_end_value` | No | Desplazamiento final para el marco de tiempo de la métrica. |
| `timeframe_unit` | No | Unidad del marco de tiempo. |
| `winsor_lower_percentile` | No | Percentil de winsorización inferior, de cero a uno, incluidos ambos extremos. Debe ser menor que `winsor_upper_percentile` cuando ambos están configurados. |
| `winsor_upper_percentile` | No | Percentil de winsorización superior, de cero a uno, incluidos ambos extremos. |
| `winsor_lower_fixed_value` | No | Valor de winsorización fijo inferior. |
| `winsor_upper_fixed_value` | No | Valor de winsorización fijo superior. |
| `winsorization_strategy` | No | Los valores admitidos son `all_assigned_subjects` (predeterminado) y `nonzero`. Para `operation: threshold`, omita este campo o use `all_assigned_subjects`. |

Omitir `additional_timestamp_columns` o `winsorization_strategy` aplica los valores predeterminados anteriores, incluso cuando actualiza o adopta un objeto existente. Incluya estos campos en YAML para establecer sus valores.

### Agregación de métrica de proporción {#ratio-metric-aggregation}

Use `ratio_metric_aggregation` para definir una métrica como un numerador dividido por un denominador. Tanto `numerator_aggregation` como `denominator_aggregation` usan los mismos campos que `simple_metric_aggregation`, pero ninguno de los componentes admite `operation: average`.

Establezca `winsorization_strategy` por separado en cada agregación. Si se omite, cada agregación usa `all_assigned_subjects`.

| Campo | Requerido | Descripción |
| ----- | -------- | ----------- |
| `numerator_aggregation` | Sí | Agregación utilizada como numerador. |
| `denominator_aggregation` | Sí | Agregación utilizada como denominador. |

Ejemplo de agregación de métrica de proporción:

```yaml
ratio_metric_aggregation:
  numerator_aggregation:
    operation: sum
    measure:
      warehouse_metric_source_sync_id: checkout_events
      measure_sync_id: revenue
    winsor_upper_percentile: 0.99
    winsorization_strategy: nonzero
  denominator_aggregation:
    operation: count
    measure:
      warehouse_metric_source_sync_id: checkout_events
      kind: each_record
    winsorization_strategy: all_assigned_subjects
```

### Agregación de métrica de percentil {#percentile-metric-aggregation}

| Campo | Requerido | Descripción |
| ----- | -------- | ----------- |
| `measure` | Sí | Referencia de medida. |
| `property_filters` | No | Filtros aplicados a los eventos incluidos en la agregación. Consulte la sección [Filtros][5]. |
| `percentile` | Sí | Decimal mayor que cero y menor que uno. Utilice `0.95` para el percentil 95. |

Los campos de marco de tiempo no configuran métricas de percentil.

Ejemplo de agregación de métrica de percentil:

```yaml
percentile_metric_aggregation:
  percentile: 0.95
  measure:
    warehouse_metric_source_sync_id: checkout_events
    measure_sync_id: revenue
```

### Filtros {#filters}

Establezca `property_filters` en `simple_metric_aggregation`, en cualquiera de los componentes de la proporción o en `percentile_metric_aggregation`. Cada filtro debe hacer referencia a la misma fuente y etiqueta de sincronización que la medida de la agregación.

Para una condición, utilice un único objeto de filtro:

```yaml
property_filters:
  property:
    warehouse_metric_source_sync_id: checkout_events
    property_sync_id: country
  operation: IS
  values: [US, CA]
```

Utilice `IS` para incluir cualquier valor de la lista o `IS_NOT` para excluir los valores de la lista. Ambas operaciones requieren al menos un valor. El `property_sync_id` debe coincidir con una propiedad declarada en la fuente. Para filtrar una fuente con otra etiqueta de sincronización, incluya `warehouse_metric_source_sync_tag` tanto en la referencia de la propiedad como en la referencia de la medida de la agregación.

Para múltiples condiciones que deben coincidir todas (AND), utilice una lista plana:

```yaml
property_filters:
  - property:
      warehouse_metric_source_sync_id: checkout_events
      property_sync_id: country
    operation: IS
    values: [US]
  - property:
      warehouse_metric_source_sync_id: checkout_events
      property_sync_id: platform
    operation: IS
    values: [web]
```

Este ejemplo incluye eventos donde el país es US y la plataforma es web. Utiliza las propiedades `country` y `platform` declaradas en el ejemplo completo de la fuente. Un solo filtro o una lista plana se convierte en un grupo de filtros en la solicitud de la API.

Para alternativas (OR), utilice grupos anidados. Las condiciones dentro de cada grupo usan AND; los grupos separados usan OR:

```yaml
property_filters:
  -
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: country
      operation: IS
      values: [US]
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: platform
      operation: IS
      values: [web]
  -
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: country
      operation: IS
      values: [CA]
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: platform
      operation: IS
      values: [mobile]
```

Este ejemplo incluye eventos donde el país es US y la plataforma es web, o el país es CA y la plataforma es móvil. Cada grupo debe contener al menos una condición. No mezcle filtros individuales y grupos en la misma lista.

Utilice `operation` en el nuevo YAML. El campo `operator` anterior sigue siendo un alias, pero la CLI rechaza un filtro que establezca ambos. Las solicitudes siempre usan `operation`. Los valores de filtro conservan su texto, incluidos los valores que parecen numéricos, como `001`. Ponga los valores entre comillas cuando necesite que otras herramientas de YAML los conserven como cadenas. Los anclajes y alias de YAML son opcionales y funcionan dentro de un mismo documento.

Las métricas de percentiles solo admiten filtros de propiedad con `IS` o `IS_NOT`. No admiten filtros de medida ni comprobaciones de nulos.

### Referencias de medida {#measure-references}

Cada agregación debe seleccionar una fuente con `warehouse_metric_source_sync_id` y exactamente uno de estos selectores de medida:

| Selector | Lo que selecciona |
| -------- | --------------- |
| `measure_sync_id` | Una medida declarada en la lista `measures` de la fuente. |
| `kind: each_record` | Cada fila devuelta por la fuente. No se requiere ninguna declaración de medida. |
| `subject_type_name` | La columna asignada a un nombre en la lista `subject_types` de la fuente. No se requiere ninguna declaración de medida. |

Use este formato de referencia en `simple_metric_aggregation`, en ambos componentes de la proporción y en `percentile_metric_aggregation`. La operación de agregación determina qué selector usar:

- `count` requiere `kind: each_record`.
- `sum` y `average` requieren `measure_sync_id`.
- `countDistinctValue` acepta `measure_sync_id` o `subject_type_name`. No puede usar `each_record`.
- `uniqueSubjects` requiere `subject_type_name`. Use `countDistinctValue` para nuevas definiciones.

Para seleccionar una medida declarada, use su `sync_id`:

```yaml
measure:
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

Para contar las filas devueltas por la fuente:

```yaml
simple_metric_aggregation:
  operation: count
  measure:
    warehouse_metric_source_sync_id: checkout_events
    kind: each_record
  timeframe_start_value: 0
```

Para contar usuarios distintos, primero asigne el tipo de sujeto `User` a una columna en la fuente `checkout_events`:

```yaml
subject_types:
  - name: User
    column_name: user_id
```

Luego seleccione esa asignación de sujeto en la métrica:

```yaml
simple_metric_aggregation:
  operation: countDistinctValue
  measure:
    warehouse_metric_source_sync_id: checkout_events
    subject_type_name: User
  timeframe_start_value: 0
```

`User` debe existir como un tipo de sujeto en la organización. El nombre seleccionado debe coincidir con una entrada `subject_types[].name` en la fuente referenciada.

Para hacer referencia a una fuente desde otra etiqueta de sincronización, incluya `warehouse_metric_source_sync_tag` con cualquiera de los tres selectores:

```yaml
measure:
  warehouse_metric_source_sync_tag: shared-sources
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

Ejecute `validate` para realizar verificaciones locales y luego ejecute `plan` para obtener una vista previa de los cambios. La validación local verifica las asignaciones de fuentes en los archivos enviados. Una etiqueta explícita igual al `sync_tag` del archivo aún verifica las asignaciones locales cuando esa fuente está en los archivos enviados. Las referencias externas se resuelven durante `execute`; un plan exitoso no confirma que exista una fuente externa o una medida seleccionada.

La API de sincronización no admite `warehouse_metric_measure_id`. Reemplace los ID de medida sin procesar con una fuente y uno de los selectores anteriores.

## Limitaciones de la CLI {#cli-limitations}

Cambiar solo `options.is_certified` no actualiza la certificación de una fuente o métrica existente que no haya cambiado de otro modo. Verifique la certificación en Datadog después de administrar definiciones existentes con YAML; una sincronización exitosa por sí sola no confirma un cambio de certificación.

La CLI no exporta definiciones existentes ni convierte YAML de Eppo automáticamente. Cree y revise las definiciones completas antes de administrar métricas existentes con YAML.

Para la adopción, use `existing_id` con `options.upgrade_mode: by_id`. Configurar `upgrade_mode: by_name` por sí solo no adopta objetos con nombres coincidentes.

## Solución de problemas {#troubleshooting}

| Error | Qué verificar |
| ----- | ------------- |
| La API devuelve `403`. | Confirme que la clave de API o la clave de aplicación tenga los permisos de Product Analytics necesarios para escribir métricas. Si `is_certified` está habilitado, confirme que el rol también tenga Product Analytics Certified Metrics Write. |
| No se encontró una conexión de almacén. | Confirme que la organización de Datadog de destino tenga una conexión de almacén configurada. Si configura `warehouse_connection_id`, confirme que pertenece a la organización de destino. |
| No se encontró un tipo de sujeto. | Confirme que el valor `subject_types[].name` coincide con un tipo de sujeto de Datadog existente. |
| Un resultado exitoso no muestra cambios. | El servicio no detectó cambios que aplicar. Si cambió solo `options.is_certified`, verifique la certificación en Datadog; una sincronización exitosa no confirma que esta configuración haya cambiado. Una operación fallida no establece que el YAML coincida con Datadog. |
| Una sincronización está bloqueada. | Lea los detalles del objeto y los motivos del bloqueo en la salida de la consola. Para guardar la respuesta de la API, ejecute `metric-sync result <METRIC_SYNC_ID> --log-file ./metric-sync.log`. Las posibles causas incluyen referencias de experimentos, métricas fuera de la etiqueta de sincronización que hacen referencia a una fuente y conflictos de adopción. Un resultado bloqueado finaliza con un estado distinto de cero. |
| Una operación falla. | Ejecute `metric-sync result <METRIC_SYNC_ID> --log-file ./metric-sync-result.log` para recuperar los errores disponibles e inspeccionar la respuesta de la API. No se ha confirmado que se hayan aplicado los cambios mostrados para una operación fallida. Algunas fallas del servidor no devuelven detalles del error; conserve el ID de la operación para soporte. |
| La validación local es correcta, pero `plan` rechaza el YAML. | Las verificaciones locales no verifican las consultas del almacén. Lea los detalles del error en la salida de la consola. Para guardar la respuesta de la API, ejecute `metric-sync plan ./metrics --log-file ./metric-sync.log`. Utilice esos detalles para corregir la definición. |

[1]: /es/experiments/guide/connecting_a_data_warehouse/
[2]: /es/account_management/rbac/permissions/#product-analytics
[3]: /es/account_management/api-app-keys/
[4]: #measure-references
[5]: #filters