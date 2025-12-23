---
app_id: apollo
categories:
- almacenamiento en caché
custom_kind: integración
description: Monitorización del rendimiento de tu infraestructura GraphQL
integration_version: 1.2.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Apollo
---
## Información general

La integración Apollo en Datadog te permite reenviar métricas de rendimiento de Studio a tu cuenta Datadog. Datadog es compatible con una API de función avanzada, lo que te permite crear gráficos y alertas de métricas de GraphQL.

![Métricas](https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/metrics.png)

Studio reenvía las siguientes métricas a Datadog:

- `apollo.operations.count` - El número de operaciones GraphQL que se ejecutaron. Esto incluye consultas, mutaciones y operaciones que dieron lugar a un error.

- `apollo.operations.error_count` - El número de operaciones GraphQL que dieron lugar a un error. Esto incluye errores de ejecución de GraphQL y errores HTTP si Studio no pudo conectarse a tu servidor.

- `apollo.operations.cache_hit_count` - Número de consultas GraphQL cuyo resultado se ha obtenido de la caché de consultas completas del servidor Apollo.

- Un histograma de los tiempos de respuesta de las operaciones GraphQL medidos en milisegundos. Debido al método de agregación de Studio (binning logarítmico), estos valores tienen una precisión de +/- 5%:

  - `apollo.operations.latency.min`
  - `apollo.operations.latency.median`
  - `apollo.operations.latency.95percentile`
  - `apollo.operations.latency.99percentile`
  - `apollo.operations.latency.max`
  - `apollo.operations.latency.avg`

Estas métricas se agregan en intervalos de 60 segundos y se etiquetan con el nombre de la operación GraphQL como `operation:<query-name>`. Las firmas de consulta única con el mismo nombre de operación se fusionan y las consultas sin nombre de operación se ignoran.

Estas métricas también se etiquetan con el ID del gráfico de Studio asociado (como `graph:<graph-id>`) y el nombre de la variante asociada (como `variant:<variant-name>`), por lo que varios gráficos de Studio pueden enviar datos a la misma cuenta Datadog. Si no has definido un nombre de variante, se utiliza `current`.

(Las integraciones configuradas antes de octubre de 2020 tienen nombres de métrica que empiezan por `apollo.engine.operations` en lugar de `apollo.operations` y utilizan una etiqueta (tag) `service` en lugar de `graph`. Puedes migrar a los nuevos nombres de métricas en la página Integraciones de tu gráfico en Apollo Studio).

## Configuración

### Configuración

La configuración con la integración Apollo en Datadog es tan simple como proporcionar una clave de API y una región de Datadog a Studio. No es necesaria ninguna otra configuración.

1. Ve a tu [página de integraciones Datadog](https://app.datadoghq.com/account/settings#integrations) y haz clic en el cuadro Apollo. A continuación, ve a la pestaña **Configuration** (Configuración) y haz clic en **Install Integration** (Instalar integración) en la parte inferior.

1. Ve a la [página de tu API Datadog](https://app.datadoghq.com/organization-settings/api-keys) y crea una clave de API.

1. Determina la región de tu API de Datadog observando la barra de direcciones de tu navegador:

- Si el nombre de dominio es `app.datadoghq.com`, la región de tu API es `US`.
- Si el nombre de dominio es `app.datadoghq.eu`, la región de tu API es `EU`.

4. En [Studio](https://www.apollographql.com/docs/studio/org/graphs/#viewing-graph-information), ve a la página de integraciones de tu gráfico:

   ![Página Integraciones](https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-link.png)

1. En la sección de reenvío de Datadog, haz clic en **Configure** (Configurar). Indica tu clave y tu región de API y luego haz clic en **Enable** (Habilitar). Dado que todas las métricas reenviadas se etiquetan con el ID del gráfico correspondiente (`graph:<graph-id>`), puedes utilizar la misma clave de API para todos tus gráficos.

   ![Conmutador de integraciones](https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-toggle.png)

1. Ve al Explorador de métricas de Datadog para ver tus métricas. Las métricas pueden tardar hasta cinco minutos para ser visibles.

### Utilización

Consulta los [documentos sobre las integraciones Apollo](https://www.apollographql.com/docs/studio/datadog-integration/) para obtener información de uso más detallada.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **apollo.operations.count** <br>(gauge) | Número de operaciones GraphQL (consultas y mutaciones) procesadas.<br>_Se muestra como operación_ |
| **apollo.operations.latency.avg** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, promedio.<br>_Se muestra como milisegundos_ |
| **apollo.operations.latency.median** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, mediana/percentil 50.<br>_Se muestra como milisegundos_ |
| **apollo.operations.latency.95percentile** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, percentil 95.<br>_Se muestra como milisegundos_ |
| **apollo.operations.latency.99percentile** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, percentil 99.<br>_Se muestra como milisegundos_ |
| **apollo.operations.latency.max** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, máxima/percentil 100.<br>_Se muestra como milisegundos_ |
| **apollo.operations.latency.min** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, mínima/percentil 0.<br>_Se muestra como milisegundos_ |
| **apollo.operations.error_count** <br>(gauge) | Número de operaciones GraphQL que han dado lugar a un error GraphQL, incluidos los errores HTTP de los orígenes.<br>_Se muestra como error_ |
| **apollo.operations.cache_hit_count** <br>(gauge) | Número de consultas GraphQL que se han proporcionado desde la caché de respuestas completas.<br>_Se muestra como acierto_ |
| **apollo.engine.operations.count** <br>(gauge) | Número de operaciones GraphQL (consultas y mutaciones) procesadas. (Métrica legacy, las nuevas integraciones utilizan apollo.operations.count.)<br>_Se muestra como operación_ |
| **apollo.engine.operations.latency.avg** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, promedio. (Métrica legacy, las nuevas integraciones utilizan apollo.operations.latency.avg.)<br>_Se muestra como milisegundos_ |
| **apollo.engine.operations.latency.median** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, mediana/percentil 50. (Métrica legacy, las nuevas integraciones utilizan apollo.operations.latency.median.)<br>_Se muestra como milisegundos_ |
| **apollo.engine.operations.latency.95percentile** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, percentil 95. (Métrica legacy, las nuevas integraciones utilizan apollo.operations.latency.95percentile)<br>_Se muestra como milisegundos_ |
| **apollo.engine.operations.latency.99percentile** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, percentil 99. (Métrica legacy, las nuevas integraciones utilizan apollo.operations.latency.99percentile.)<br>_Se muestra como milisegundos_ |
| **apollo.engine.operations.latency.max** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, máxima/percentil 100. (Métrica legacy, las nuevas integraciones utilizan apollo.operations.latency.max)<br>_Se muestra como milisegundos_ |
| **apollo.engine.operations.latency.min** <br>(gauge) | Duración total de la solicitud de una operación GraphQL, mínima/percentil o. (Métrica legacy, las nuevas integraciones utilizan apollo.operations.latency.min.)<br>_Se muestra como milisegundos_ |
| **apollo.engine.operations.error_count** <br>(gauge) | Número de operaciones GraphQL que han dado lugar a un error GraphQL, incluidos los errores HTTP de los orígenes. (Métrica legacy, las nuevas integraciones utilizan apollo.operations.error_count.)<br>_Se muestra como error_ |
| **apollo.engine.operations.cache_hit_count** <br>(gauge) | Número de consultas GraphQL que se han proporcionado desde la caché de respuestas completas. (Métrica legacy, las nuevas integraciones utilizan apollo.operations.cache_hit_count.)<br>_Se muestra como acierto_ |

### Eventos

La integración Apollo no incluye eventos en este momento.

### Checks de servicio

La integración Apollo no incluye checks de servicios en este momento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).