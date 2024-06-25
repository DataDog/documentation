---
description: Convierte partes de nombres de métricas statsd a etiquetas (tags) utilizando
  reglas de mapeo en DogStatsD.
further_reading:
- link: developers/dogstatsd
  tag: Documentación
  text: Introducción a DogStatsD
- link: developers/libraries
  tag: Documentación
  text: API oficiales y creadas por la comunidad, y bibliotecas cliente de DogStatsD
kind: Documentación
title: Mapeador DogStatsD
---

Con el Agent v7.17 y posteriores, la función de mapeo de DogStatsD te permite convertir partes de un nombre de métrica enviados a etiquetas de DogStatsD utilizando reglas de mapeo con patrones comodín y regex. Por ejemplo, te permite transformar la métrica:

- `airflow.job.duration.<JOB_TYPE>.<JOB_NAME>`

en la métrica `airflow.job.duration` con dos etiquetas asociadas:

- `job_type:<JOB_TYPE>`
- `job_name:<JOB_NAME>`.

Para crear una regla de mapeo:

1. [Abre tu archivo `datadog.yaml` ][1].
2. Añade un [bloque de configuración de reglas de mapeo](#mapping-rule-configuration) bajo el parámetro `dogstatsd_mapper_profiles`.

## Configuración de reglas de mapeo

Un bloque de reglas de mapeo tiene el siguiente diseño:

```yaml
dogstatsd_mapper_profiles:
    - name: '<PROFILE_NAME>'
      prefix: '<PROFILE_PREFIX>'
      mappings:
          - match: '<METRIC_TO_MATCH>'
            match_type: '<MATCH_TYPE>'
            name: '<MAPPED_METRIC_NAME>'
            tags:
                '<TAG_KEY>': '<TAG_VALUE_TO_EXPAND>'
```

Con los siguientes parámetros:

| Parámetro             |  Definición                                                                                                                               | Obligatorio                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
|  `<PROFILE_NAME>`       | Nombre para dar al perfil de tu regla de mapeo.                                                                                              | Sí                     |
| `<PROFILE_PREFIX>`      | Prefijo del nombre de métrica asociado a este perfil.                                                                                        | Sí                     |
| `<METRIC_TO_MATCH>`     | Nombre de métrica del que se extraerán grupos con el la lógica de coincidencia de [comodín](#wildcard-match-pattern) o [regex](#regex-match-pattern).         | Sí                     |
| `<MATCH_TYPE>`          | Tipo de coincidencia que se aplicará a `<METRIC_TO_MATCH>`. Puede ser [`wildcard`](#wildcard-match-pattern) o [`regex`](#regex-match-pattern)    | no, por defecto: `wildcard` |
| `<MAPPED_METRIC_NAME>`  | Nuevo nombre de métrica para enviar a Datadog con las etiquetas definidas en el mismo grupo.                                                           | Sí                     |
| `<TAG_KEY>`             | Clave de etiqueta para asociar a las etiquetas recopiladas.                                                                                           | No                      |
| `<TAG_VALUE_TO_EXPAND>` | Etiquetas recopiladas del `<MATCH_TYPE>` en línea.                                                                                     | No                      |

## Patrón de coincidencia con comodín

El patrón de coincidencia con comodín empareja nombres de métricas separados por puntos utilizando `*` como comodín. El nombre de la métrica debe estar compuesto únicamente por caracteres alfanuméricos, `.` y `_` para que este patrón funcione. Los grupos extraídos pueden expandirse con una de las siguientes opciones:

- Formato `$n`: `$1`, `$2`, `$3`, etc.
- Formato `${n}`: `${1}`, `${2}`, `${3}`, etc.

Por ejemplo, si tienes la métrica `custom_metric.process.value_1.value_2` con la siguiente configuración de grupos de mapeo:

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric.process.*.*'
            match_type: wildcard
            name: custom_metric.process
            tags:
                tag_key_1: '$1'
                tag_key_2: '$2'
```

Enviaría la métrica `custom_metric.process` a Datadog con las etiquetas `tag_key_1:value_1` y `tag_key_2:value_2`.

## Patrón de coincidencia regex

El patrón de coincidencia regex empareja nombres de métricas utilizando patrones regex. En comparación con el patrón de coincidencia con comodín, permite definir grupos obtenidos que contienen `.`. A continuación, los grupos extraídos pueden ampliarse con una de las siguientes opciones:

- Formato `$n`: `$1`, `$2`, `$3`, etc.
- Formato `${n}`: `${1}`, `${2}`, `${3}`, etc.

Por ejemplo, si tienes la métrica `custom_metric.process.value_1.value.with.dots._2` con la siguiente configuración de grupos de mapeo:

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric\.process\.([\w_]+)\.(.+)'
            match_type: regex
            name: custom_metric.process
            tags:
                tag_key_1: '$1'
                tag_key_2: '$2'
```

Enviaría la métrica `custom_metric.process` a Datadog con las etiquetas `tag_key_1:value_1` y `tag_key_2:value.with.dots._2`.

## Ampliar grupo en nombre de métrica

Para el tipo de coincidencia `regex` y `wildcard`, el grupo recopilado puede expandirse como valor de etiqueta con una clave de etiqueta asociada, como se ha visto anteriormente, pero también puede utilizarse en el parámetro de `name` de la métrica. Por ejemplo, si tienes la métrica `custom_metric.process.value_1.value_2` con la siguiente configuración de grupo de mapeo:

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric.process.*.*'
            match_type: wildcard
            name: 'custom_metric.process.prod.$1.live'
            tags:
                tag_key_2: '$2'
```

Enviaría la métrica `custom_metric.process.prod.value_1.live` a Datadog con la etiqueta `tag_key_2:value_2`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file