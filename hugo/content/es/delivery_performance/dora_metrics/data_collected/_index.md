---
aliases:
- /es/dora_metrics/data_collected/
description: Obtenga información sobre los eventos, campos, etiquetas y etapas del
  tiempo de entrega de cambios de DORA Metrics para la frecuencia de despliegue, el
  tiempo de entrega de cambios y el análisis de fallas en los cambios.
further_reading:
- link: /delivery_performance/dora_metrics/
  tag: Documentación
  text: Obtenga información sobre DORA Metrics
- link: /delivery_performance/dora_metrics/setup/
  tag: Documentación
  text: Configure fuentes de datos para DORA Metrics
- link: /metrics/
  tag: Documentación
  text: Obtenga información sobre las métricas
- link: /getting_started/tagging/
  tag: Documentación
  text: Primeros pasos con las etiquetas
title: Datos recopilados de DORA Metrics
---
## Descripción general {#overview}

DORA Metrics genera eventos que tienen campos y etiquetas asociados.

| Tipo de evento | Descripción |
| :--- | :--- |
|Despliegue | Un despliegue de código identificado de forma única por las etiquetas env, service y version.<br><br>Los despliegues pueden [marcarse como fallidos][17] y se utilizan para calcular la frecuencia de despliegue, la tasa de fallas en los cambios y el tiempo de recuperación de despliegues fallidos.
|Solicitud de extracción | Una solicitud de extracción incluida en un despliegue. Contiene metadatos como el autor, los revisores, las etiquetas y el tiempo dedicado a redactar, revisar y fusionar. Los commits están anidados dentro de su solicitud de extracción asociada.<br><br>Las solicitudes de extracción se utilizan para analizar los flujos de trabajo de revisión de código y el tiempo de ciclo a nivel de PR.
|Commit | Un evento generado por cada commit incluido en un despliegue. Contiene metadatos y se vincula automáticamente al despliegue correspondiente. Los commits están anidados dentro de su solicitud de extracción asociada.<br><br>Los commits se utilizan para calcular el tiempo de entrega de cambios.

**Nota**: Los eventos de DORA Metrics tienen un período de retención de 2 años.

### Etiquetas predeterminadas {#default-tags}

Todos los eventos contienen las siguientes etiquetas si hay alguna disponible:

- `service`
- `team`
- `env`
- `version`
- `source`
- `repository_id`

Para obtener más información sobre el uso de etiquetas, consulte [Primeros pasos con las etiquetas][6].

### Etiquetas personalizadas {#custom-tags}

Los eventos de despliegue se pueden enriquecer con etiquetas personalizadas para filtrar DORA Metrics. Existen dos fuentes potenciales para estas etiquetas:

- Catalog: Si un evento de despliegue está asociado con servicios en Catalog, se enriquece automáticamente con la etiqueta `language` y las [etiquetas personalizadas definidas en Service Definitions][13].
- DORA Metrics API: Se pueden agregar hasta 100 etiquetas personalizadas proporcionadas por el usuario a los eventos de despliegue en la [API][7].

Para obtener más información sobre el uso de etiquetas personalizadas en DORA Metrics, consulte [Descripción general de DORA Metrics][16].

## Campos específicos del evento {#event-specific-fields}

### Campos de despliegue {#deployment-fields}

| Campo                      | Descripción                |
|----------------------------|----------------------------|
| `Duration` | Duración del despliegue. |
| `Avg Change Lead Time`      | La duración promedio del [tiempo de entrega de cambios](#commit-fields) de todos los commits.  |
| `Avg Time to PR Ready`          | La duración promedio del [tiempo hasta que el PR esté listo](#commit-fields) de todos los commits. |
| `Avg Review Time`       | La duración promedio del [tiempo de revisión](#commit-fields) de todos los commits. |
| `Avg Merge Time`       | La duración promedio del [tiempo de fusión](#commit-fields) de todos los commits. |
| `Avg Time to Deploy`       | La duración promedio del [tiempo hasta el despliegue](#commit-fields) de todos los commits. |
| `Number of Commits`        | Recuento de todos los commits incluidos en un despliegue. |
| `Deployment Type` | Tipo de despliegue (`standard`, `rollback` o `rollforward`). |
| `Change Failure` | Booleano que indica si un despliegue está marcado como una falla de cambio. |
| `Recovery Time` | Duración en segundos entre el `finished_at` de un despliegue fallido y el `finished_at` de su corrección. Solo disponible para despliegues marcados como fallas de cambio. |
| `Remediation Type` | El tipo de corrección aplicada (`rollback` o `rollforward`). Solo disponible para despliegues marcados como fallas de cambio. |

### Campos de solicitud de extracción {#pull-request-fields}

| Campo  | Descripción                |
|------------|----------------------------|
| `PR Cycle Time`       | Duración total desde el primer commit hasta la fusión. |
| `Time to PR Ready`       | Duración desde el primer commit o la creación de la solicitud de extracción, lo que ocurra primero, hasta que el PR se marca como listo para revisión. |
| `Review Time`       | Duración desde que el PR se marca como listo para revisión hasta su aprobación. |
| `Merge Time`       | Duración desde la aprobación del PR hasta su fusión. |
| `Time to Deploy`       | Duración desde la fusión hasta el inicio del despliegue. |
| `Deploy Time`       | Duración desde el inicio del despliegue hasta el final del despliegue. |
| `Number of Commits`       | Número de commits incluidos en la solicitud de extracción. |
| `Number of Reviewers`       | Número de revisores que revisaron la solicitud de extracción. |
| `Number of Files Changed` | Número de archivos cambiados en la solicitud de extracción. Solo disponible para GitHub. |
| `Number of Lines Added` | Número de líneas añadidas en la solicitud de extracción. Solo disponible para GitHub. |
| `Number of Lines Deleted` | Número de líneas eliminadas en la solicitud de extracción. Solo disponible para GitHub. |
| `Total Number of Lines Changed` | Recuento total de líneas añadidas y eliminadas en la solicitud de extracción. Solo disponible para GitHub. |
| `Time to First Human Review` | Duración hasta que la solicitud de extracción recibe su primera revisión de un humano. Solo disponible para GitHub. |
| `Number of Comments` | Recuento de comentarios en la solicitud de extracción. Solo disponible para GitHub. |
| `Number of Human Comments` | Recuento de comentarios en la solicitud de extracción por parte de humanos. Solo disponible para GitHub. |
| `Fully Automated` | Booleano que indica si la solicitud de extracción fue creada y fusionada sin intervención humana. |
| `Creator Bot Type` | Tipo de bot que creó la solicitud de extracción. |
| `Creator Bot Name` | Nombre del bot que creó la solicitud de extracción. |
| `Time CI Failing` | Duración total durante la cual la CI permaneció en estado fallido en los distintos commits de la solicitud de extracción. Requiere CI Visibility. |
| `Test Session Duration` | Duración total de las sesiones de prueba para el commit de cabecera o de fusión de la solicitud de extracción. Requiere Test Optimization. |
| `Test Session Duration After Approval` | Duración total de las sesiones de prueba para el commit de cabecera o de fusión de la solicitud de extracción después de que esta fuera aprobada. Requiere Test Optimization. |
| `Time to Pass` | Duración desde el primer intento de CI hasta la primera ejecución exitosa del pipeline para el commit de cabecera o de fusión de la solicitud de extracción. Requiere CI Visibility. |
| `Time to Pass After Approval` | Duración desde el primer intento de CI después de la aprobación de la solicitud de extracción hasta la primera ejecución exitosa del pipeline para el commit de cabecera o de fusión de la solicitud de extracción. Requiere CI Visibility. |
| `Patch Coverage` | Porcentaje de líneas nuevas o modificadas en el commit de cabecera o de fusión de la solicitud de extracción que están cubiertas por pruebas. Requiere Code Coverage. |


### Campos del commit {#commit-fields}

| Campo  | Descripción                |
|------------|----------------------------|
| `Change Lead Time`       | Tiempo que tarda un commit en llegar a producción. |
| `Time to PR Ready`       | Duración desde la creación del commit hasta que el PR se marca como listo para revisión. |
| `Review Time`       | Duración desde que el PR se marca como listo para revisión hasta su aprobación. |
| `Merge Time`       | Duración desde la aprobación del PR hasta su fusión. |
| `Time to Deploy`       | Duración desde la fusión hasta el inicio del despliegue. |
| `Deploy Time`       | Duración desde el inicio del despliegue hasta el final del despliegue. |
| `Has Failed Jobs` | Booleano que indica si falló alguna ejecución de un trabajo de CI para el commit, incluidas las ejecuciones que se completaron correctamente tras un reintento. Requiere CI Visibility. |
| `Has Failed Tests` | Booleano que indica si alguna ejecución de prueba falló debido a una prueba no inestable en el commit. Requiere Test Optimization. |
| `Has New Flaky Tests` | Booleano que indica si se detectaron pruebas inestables nuevas en las sesiones de prueba del commit. Requiere Test Optimization. |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/events/explorer/
[2]: /es/api/latest/metrics/#query-timeseries-points
[3]: /es/api/latest/metrics/#query-timeseries-data-across-multiple-products
[5]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[6]: /es/getting_started/tagging/
[7]: /es/api/latest/delivery-performance/
[8]: https://app.datadoghq.com/ci/dora
[9]: https://docs.datadoghq.com/es/metrics/
[10]: /es/delivery_performance/dora_metrics/setup/
[11]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights%20&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&from_ts=1714391730343&to_ts=1714392630343&live=true
[12]: /es/delivery_performance/dora_metrics/setup/#limitations
[13]: https://www.datadoghq.com/blog/service-catalog-setup/
[16]: /es/delivery_performance/dora_metrics/
[17]: /es/delivery_performance/dora_metrics/change_failure_detection/