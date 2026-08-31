---
description: Conoce los distintos activos que deben incluirse al preparar una integración
  de Datadog.
further_reading:
- link: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md
  tag: Código fuente
  text: Directrices para contribuir al sitio de documentación
- link: /developers/integrations/
  tag: Documentación
  text: Más información sobre la creación de una integración basada en el Agent o
    la API
- link: /developers/integrations/oauth_for_integrations/
  tag: Documentación
  text: Más información sobre el uso de OAuth para integraciones
title: Referencia de activos de integración
---
## Información general

Esta página te guiará a través de los archivos que debes rellenar para crear una oferta en la página [**Integraciones**][12] o en la página [**Marketplace**][9]. 

## Archivo de configuración

Al preparar una nueva integración, debes incluir una configuración de ejemplo que contenga las opciones necesarias y unos valores predeterminados razonables. El archivo de configuración de ejemplo, que en este caso se encuentra en `<CHECK_NAME>/datadog_checks/<CHECK_NAME>/data/conf.yaml.example`, tiene dos elementos de nivel superior: `init_config` y `instances`.

La configuración en `init_config` se aplica a la integración globalmente, y se utiliza en cada instanciación de la integración, mientras que cualquier cosa dentro de `instances` es específica a una instanciación dada.

Los bloques de configuración de cualquiera de las secciones tienen la siguiente forma:

```yaml
## @<COMMAND> [- <ARGS>]
## <DESCRIPTION LINE 1>
## <DESCRIPTION LINE 2>
#
<KEY>: <VALUE>
```

Los bloques de configuración siguen algunas directrices:

- Las descripciones no deben estar vacías.
- Sigue siempre este formato: `<THIS_IS_A_PLACEHOLDER>` para los parámetros. Para más información, consulta las [directrices de contribución del sitio de documentación][1].
- Todos los parámetros requeridos **no** están comentados por defecto.
- Todos los parámetros opcionales se comentan por defecto.
- Si un parámetro tiene un valor predeterminado para una integración (como el endpoint de estado de una integración), se puede utilizar en lugar de un parámetro genérico.

### Especificación de `@param`

Puedes utilizar el comando `@param` para describir bloques de configuración y proporcionar documentación para tu configuración.

`@param` se implementa utilizando una de las siguientes formas:

```text
@param <name> - <type> - required
@param <name> - <type> - optional
@param <name> - <type> - optional - default: <defval>
```

**Argumentos**:

- `name`: el nombre del parámetro, como `search_string` (obligatorio).
- `type`: el tipo de datos para el valor del parámetro (obligatorio).
          Entre los valores posibles se incluyen los siguientes: _booleano_, _cadena_, _entero_, _doble_, _flotante_, _diccionario_, _lista\*_ y _objecto\*_.
- `defval`: valor por defecto del parámetro; puede estar vacío (opcional).

Las variables `list` y `object` se desplegan en varias líneas y tienen reglas especiales.

- En `list`, los elementos individuales no se documentan con la especificación `@param`.
- En `object`, puedes elegir entre documentar los elementos individualmente con la especificación `@param` o tener una descripción general común siguiendo la especificación del propio objeto.

### Parámetros opcionales

Un parámetro opcional debe ser comentado por defecto. Antes de cada línea en la que se despliegue el parámetro, añade `#` con la misma sangría que la especificación `@param`.

### Comentarios de bloque

Puedes añadir un comentario de bloque en cualquier parte del archivo de configuración con las siguientes reglas:

- Los comentarios empiezan por `##`.
- Los comentarios deben tener sangría como cualquier variable (el guion no cuenta).

Para más información sobre la sintaxis de YAML, consulta el [artículo de Wikipedia sobre YAML][2]. También puedes explorar el [Analizador en línea de YAML][3].

## Archivo de manifiesto

Cada oferta de la página [**Integraciones**][4] o de la página [**Marketplace**][11] contiene un archivo `manifest.json` que define los parámetros de funcionamiento, el posicionamiento en el ecosistema de integración de Datadog y otros metadatos.

{{% integration-assets-reference %}}

### Etiquetas de clasificador

Puede establecer varias categorías y definir tipos de datos enviados o consultados para integración utilizando el parámetro `classifier_tags`.

A continuación, encontrarás la lista completa de las etiquetas de clasificador para el archivo `manifest.json`:

{{% integration_categories %}}

## Archivo de check de servicio

El archivo `service_check.json` describe los checks de servicio hechos por la integración.

A continuación, encontrarás la lista completa de atributos obligatorios del archivo `service_checks.json`:

| Atributo       | Descripción                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `agent_version` | Versión mínima compatible del Agent.                                                                                           |
| `integration`   | El nombre de la integración que emite este check de servicio. Debe ser el `tile.title` no normalizado de `manifest.json`.   |
| `check`         | Nombre del check de servicio. Debe ser único.                                                                              |
| `statuses`      | Lista de diferentes estados del check, para elegir entre `ok`, `warning` y `critical`. `unknown` también es una posibilidad.   |
| `groups`        | [Etiquetas][8] enviadas con el check de servicio.                                                                                     |
| `name`          | Nombre mostrado del check de servicio. El nombre mostrado debe ser autoexplicativo y único en todas las integraciones.       |
| `description`   | Descripción del check de servicio.                                                                                           |


## Archivo de metadatos de métricas

El archivo `metadata.csv` describe todas las métricas que puede recopilar la integración.

Más abajo encontrará la lista completa de atributos obligatorios y opcionales para el archivo `metadata.csv`:

| Nombre de columna     | Obligatorio o opcional | Descripción                                                                                                                                                                                                                                                                                                                             |
| --------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metric_name`   | Obligatorio          | Nombre de la métrica.                                                                                                                                                                                                                                                                                                                     |
| `metric_type`   | Obligatorio          | Tipo de métrica. Para una lista de los tipos de envío de métrica disponibles, consulta [Tipos de métricas][6].                                                                                                                                                                                                                                                                                                                |
| `interval`      | Opcional           | Intervalo de recopilación de la métrica en segundos.                                                                                                                                                                                                                                                                                            |
| `unit_name`     | Opcional           | Unidad de la métrica. Para consultar la lista completa de las unidades admitidas, consulta [Unidades de métricas][7].                                                                                                                                                                                                                                                                              |
| `per_unit_name` | Opcional           | Si hay una subdivisión de unidades, como `request per second`.                                                                                                                                                                                                                                                                               |
| `description`   | Opcional           | Descripción de la métrica.                                                                                                                                                                                                                                                                                                              |
| `orientation`   | Obligatorio          | Establece `1` si la métrica debe subir, tal como `myapp.turnover`. Establece en `0` si las variaciones de métrica son irrelevantes. Establece en `-1` if the metric should go down, such as `myapp.latency`.                                                                                                                                                         |
| `integration`   | Obligatorio          | El nombre de la integración que emite la métrica. Debe ser la versión normalizada del `tile.title` del archivo `manifest.json`. Todos los caracteres que no sean letras, guiones bajos, guiones y números se convierten en guiones bajos. Por ejemplo: `Openstack Controller` -> `openstack_controller`, `ASP.NET` -> `asp_net`, y `CRI-o` -> `cri-o`. |
| `short_name`    | Obligatorio          | Una versión abreviada y legible del nombre de métrica. No repitas el nombre de la integración. Por ejemplo, `postgresql.index_blocks_hit` debe abreviarse a `idx blks hit`.                                                                                                                                                                                                                                                                                                     |
| `curated_metric`| Opcional           | Marca qué métricas son notables para una integración de un tipo dado (`cpu` y `memory` son ambos aceptados). Éstos aparecen en la interfaz de usuario por encima de las demás métricas de integración. |
| `sample_tags` | Opcional           | Lista de etiquetas de ejemplo asociadas a la métrica, separadas por comas sin espacios. Por ejemplo, `host,region,deployment`. |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md#code-substitution
[2]: https://en.wikipedia.org/wiki/YAML
[3]: http://yaml-online-parser.appspot.com/
[4]: https://docs.datadoghq.com/es/integrations/
[5]: https://www.uuidgenerator.net
[6]: https://docs.datadoghq.com/es/metrics/types/#metric-types
[7]: https://docs.datadoghq.com/es/metrics/units/#unit-list
[8]: https://docs.datadoghq.com/es/getting_started/tagging/
[9]: https://app.datadoghq.com/marketplace/
[10]: https://docs.datadoghq.com/es/developers/datadog_apps/
[11]: https://docs.datadoghq.com/es/developers/integrations/marketplace_offering
[12]: https://app.datadoghq.com/integrations