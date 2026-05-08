---
algolia:
  tags:
  - etiquetado
aliases:
- /es/getting_started/getting_started_with_tags
- /es/guides/getting_started/tagging/
- /es/developers/getting_started/tagging/
- /es/tagging
- /es/guides/tagging/
- /es/faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
description: Descubre cómo asignar y usar etiquetas en Datadog.
further_reading:
- link: /getting_started/tagging/assigning_tags/
  tag: Documentación
  text: Descubre cómo asignar etiquetas
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Descubre cómo configurar el etiquetado de servicios unificado
- link: /getting_started/tagging/using_tags/
  tag: Documentación
  text: Descubre cómo usar las etiquetas
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva sobre la eficacia del etiquetado con Datadog
title: Empezando con las etiquetas (tags)
---

## Información general

Las etiquetas son una forma de añadir dimensiones a las telemetrías de Datadog para que puedan filtrarse, agregarse y compararse en las visualizaciones de Datadog. [Usar etiquetas][1] te permite observar el rendimiento conjunto en varios hosts y, de manera opcional, reducir ese conjunto en función de ciertos elementos. En resumen, el etiquetado es un método para observar puntos de datos de manera conjunta.

Las etiquetas son pares `key:value` que contienen dos partes:

- La clave de etiqueta es el identificador. La clave de etiqueta sólo puede existir una vez en cada recurso y distingue entre mayúsculas y minúsculas.
- El valor de etiqueta son los datos específicos o la información asociada a la clave. Los valores de etiqueta no son únicos por recurso y pueden utilizarse en muchos recursos en un par `key-value`.

El etiquetado vincula distintos tipos de datos en Datadog, lo que permite la correlación y las llamadas a la acción entre métricas, trazas (traces) y logs. Esto se consigue con claves de etiqueta **reservadas**:

| Clave de etiqueta   | Qué permite                                                            |
| --------- | --------------------------------------------------------------------- |
| `host`    | Correlación entre métricas, trazas, procesos y logs.              |
| `device`  | Segregación de métricas, trazas, procesos y logs por dispositivo o disco. |
| `source`  | Filtrado por tramos y creación automatizada de pipelines para la gestión de logs.     |
| `service` | Control sobre datos específicos de la aplicación en métricas, trazas y logs. |
| `env`     | Control sobre datos específicos de la aplicación en métricas, trazas y logs. |
| `version` | Control sobre datos específicos de la aplicación en métricas, trazas y logs. |
| `team`    | Asignar una propiedad a cualquier recurso                                     |

Datadog recomienda analizar los contenedores, las máquinas virtuales y la infraestructura en la nube de forma conjunta a nivel de `service`. Por ejemplo, puedes observar el uso de la CPU en una serie de hosts que represente un servicio, en lugar del uso de la CPU para el servidor A o B por separado.

Puesto que los contenedores y entornos en la nube se renuevan con frecuencia en los hosts, es importante usar etiquetas para agregar las métricas.

## Definir etiquetas

Estos son los requisitos de etiquetado de Datadog:

1. Las etiquetas deben **empezar por una letra** y pueden incluir lo siguiente:

    - Caracteres alfanuméricos
    - Guiones bajos
    - Signos de resta
    - Dos puntos
    - Puntos
    - Barras

    Los demás caracteres especiales se convertirán en guiones bajos.

2. Las etiquetas pueden tener **hasta 200 caracteres** y admiten letras Unicode (que incluyen la mayoría de conjuntos de caracteres, incluidos idiomas como el japonés).
3. Las etiquetas se cambiarán a minúsculas. Por tanto, no se recomiendan las etiquetas `CamelCase`. Las integraciones basadas en (un rastreador de) autenticación convierten ese tipo de ortografía en guiones bajos. Ejemplo: `TestTag` --> `test_tag`.
4. Una etiqueta puede estar en formato `value` o `<KEY>:<VALUE>`. Las claves de etiquetas más utilizadas son `env`, `instance` y `name`. La clave siempre precede a los primeros dos puntos de la definición de la etiqueta global. Ejemplo:

    | Etiqueta                | Clave           | Valor          |
    | ------------------ | ------------- | -------------- |
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

5. Las etiquetas no deben originarse en fuentes sin enlazar, como marcas de tiempo epoch, ID de usuario o ID de solicitud. De ser así, [la cantidad de métricas podría aumentar][2] infinitamente en tu organización y afectar a tu facturación.
6. Las limitaciones (como el cambio a minúsculas) solo se aplican a las etiquetas de métricas, no a los atributos de logs ni a las etiquetas de tramos.

## Asignación de etiquetas

### Métodos de etiquetado

Las etiquetas se pueden asignar con cualquiera de los siguientes métodos o con todos ellos:

| Método                   | Asignación de etiquetas                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [Archivos de configuración][3] | Manualmente en tu Agent principal o en los archivos de configuración de la integración. |
| [IU][4]                  | En el sitio de Datadog.                                             |
| [API][5]                 | Al usar la API de Datadog.                                        |
| [DogStatsD][6]           | Al enviar métricas con DogStatsD.                          |

Para más información, consulta la sección [Asignar etiquetas][7].

#### Etiquetado de servicios unificado

Datadog recomienda utilizar el etiquetado de servicios unificado al asignar etiquetas. Este sistema asocia toda la telemetría de Datadog mediante el uso de tres etiquetas estándar: `env`, `service` y `version`. Para saber cómo configurar tu entorno con el etiquetado unificado, consulta la sección [Etiquetado de servicios unificado][8].

### Herencia de etiquetas

Todas las métricas, logs, trazas e integraciones pasan por un proceso de herencia de `host-tag` a medida que los datos se introducen en Datadog. Dado que los datos están asociados a un nombre de host determinado, esos componentes heredan todas las etiquetas `host-level` asociadas a ese host. Estas etiquetas son visibles en la [lista de infraestructura][12] de un host determinado, y proceden del proveedor de la nube o del Datadog Agent. Consulta [las etiquetas `host-level` faltantes en nuevos hosts o nodos][25] para más información.

### Precedencia de las etiquetas

El Datadog Agent **no** impone un orden de precedencia para las etiquetas establecidas a partir de diferentes fuentes. En su lugar, el Agent recopila todas las etiquetas de cada fuente disponible, almacena cada valor único para una clave de etiqueta determinada y los emite todos con la telemetría.

Esto significa que una misma clave de etiqueta puede tener varios valores si está configurada de forma diferente en las distintas fuentes. Por ejemplo, si la etiqueta `service` se establece como `payments` en una variable de entorno, `checkout` en el YAML Agent y `orders` en una configuración de cliente de rastreo, la telemetría para ese servicio podría incluir:

```
service:payments
service:checkout
service:orders
```

Los filtros o dashboards descendentes deben filtrar explícitamente el valor deseado si solo se espera uno.

## Utilización

Después de haber [asignado etiquetas][7] a nivel de host e [integración][9], comienza a utilizarlas para filtrar y agrupar tus métricas, trazas y logs. Las etiquetas se utilizan en las siguientes áreas de tu plataforma Datadog.

| Área                 | Uso de las etiquetas para                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [Events (Eventos)][10]         | Filtrar el flujo de eventos.                                                                          |
| [Dashboards][11]     | Filtrar y agrupar métricas en gráficos.                                                               |
| [Infrastructura][12] | Filtrar y agrupar en el mapa del host, la lista de infraestructuras, los Live Containers y las visualizaciones de Live Processes. |
| [Monitores][13]       | Crear y gestionar monitores, o controlar caídas del sistema.                                             |
| [Métricas][14]        | Filtrar y agrupar en el navegador de métricas.                                                        |
| [Integraciones][15]   | Limitar opcionalmente las métricas de AWS, Google Cloud y Azure.                                        |
| [APM][16]            | Filtrar servicios, trazas y perfiles, o navegar a otras áreas con el Mapa de servicios.           |
| [RUM y Session Replay][17] | Filtrar la búsqueda de eventos, análisis, patrones, reproducciones y problemas en el navegador RUM.        |
| [Monitorización Synthetic y tests continuos][18]     | Filtra y agrupa los tests Synthetic o aquellos que se ejecutan en pipelines CI con el Explorador de monitorización Synthetic y de resultados de tests.   |
| [Notebooks][19]      | Filtrar y agrupar métricas en gráficos.                                                               |
| [Logs][20]           | Filtrar la búsqueda de logs, análisis, patrones, Live Tail y pipelines.                                |
| [SLOs][21]           | Buscar SLOs, SLOs basados en métricas agrupadas y SLOs basados en monitores agrupados.                       |
| [Desarrolladores][22]     | Obtener información o configurar distintas áreas en la IU con la API.                                 |
| [Facturación][23]        | Generar informes sobre el uso de Datadog eligiendo hasta tres etiquetas, por ejemplo: `env`, `team` y `account_id`. |
| [CI Visibility][24]  | Filtra y agrupa ejecuciones de pruebas o pipelines con el explorador de visibilidad CI. |

Para obtener más información, consulta la sección [Uso de etiquetas][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/using_tags/
[2]: /es/metrics/
[3]: /es/getting_started/tagging/assigning_tags/#configuration-files
[4]: /es/getting_started/tagging/assigning_tags/#ui
[5]: /es/getting_started/tagging/assigning_tags/#api
[6]: /es/getting_started/tagging/assigning_tags/#dogstatsd
[7]: /es/getting_started/tagging/assigning_tags/
[8]: /es/getting_started/tagging/unified_service_tagging
[9]: /es/integrations/
[10]: /es/getting_started/tagging/using_tags/#events
[11]: /es/getting_started/tagging/using_tags/#dashboards
[12]: /es/getting_started/tagging/using_tags/#infrastructure
[13]: /es/getting_started/tagging/using_tags/#monitors
[14]: /es/getting_started/tagging/using_tags/#metrics
[15]: /es/getting_started/tagging/using_tags/#integrations
[16]: /es/getting_started/tagging/using_tags/#apm
[17]: /es/getting_started/tagging/using_tags/#rum--session-replay
[18]: /es/getting_started/tagging/using_tags/#synthtics
[19]: /es/getting_started/tagging/using_tags/#notebooks
[20]: /es/getting_started/tagging/using_tags/#logs
[21]: /es/getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[22]: /es/getting_started/tagging/using_tags/#developers
[23]: /es/account_management/billing/usage_attribution/
[24]: /es/getting_started/tagging/using_tags/#ci-visibility
[25]: /es/containers/kubernetes/log/?tab=datadogoperator#missing-host-level-tags-on-new-hosts-or-nodes