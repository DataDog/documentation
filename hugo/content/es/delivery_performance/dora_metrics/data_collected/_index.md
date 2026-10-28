---
aliases:
- /es/dora_metrics/data_collected/
description: Obtenga información sobre los eventos, campos, etiquetas y etapas del
  tiempo de entrega de cambios de DORA Metrics para la frecuencia de implementación,
  el tiempo de entrega de cambios y el análisis de fallas en los cambios.
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
|Implementación | Una única implementación de código identificada de forma única por etiquetas de entorno, servicio y versión.<br><br>Las implementaciones se pueden [marcar como fallidas][17] y se utilizan para calcular la frecuencia de implementación, la tasa de fallas en los cambios y el tiempo de recuperación de implementaciones fallidas.
|Solicitud de extracción | Una solicitud de extracción incluida en una implementación. Contiene metadatos como el autor, los revisores, las etiquetas y el tiempo dedicado a redactar, revisar y fusionar. Las confirmaciones (commits) están anidadas dentro de su solicitud de extracción asociada.<br><br>Las solicitudes de extracción se utilizan para analizar los flujos de trabajo de revisión de código y el tiempo de ciclo a nivel de PR.
|Confirmación | Un evento generado para cada confirmación individual incluida en una implementación. Contiene metadatos y se vincula automáticamente a la implementación correspondiente. Las confirmaciones (commits) están anidadas dentro de su solicitud de extracción asociada.<br><br>Las confirmaciones se utilizan para calcular el tiempo de entrega de cambios.

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

Los eventos de implementación se pueden enriquecer con etiquetas personalizadas para filtrar DORA Metrics. Existen dos fuentes potenciales para estas etiquetas:

- Catalog: Si un evento de implementación está asociado con servicios en Catalog, se enriquece automáticamente con la etiqueta `language` y las [etiquetas personalizadas definidas en Service Definitions][13].
- API de DORA Metrics: Se pueden agregar hasta 100 etiquetas personalizadas proporcionadas por el usuario a los eventos de implementación en la [API][7].

Para obtener más información sobre el uso de etiquetas personalizadas en DORA Metrics, consulte [Descripción general de DORA Metrics][16].

## Campos específicos del evento {#event-specific-fields}

### Campos de implementación {#deployment-fields}

| Campo                      | Descripción                |
|----------------------------|----------------------------|
| `Duration` | Duración de la implementación. |
| `Avg Change Lead Time`      | La duración promedio del [tiempo de entrega de cambios](#commit-fields) de todas las confirmaciones.  |
| `Avg Time to PR Ready`          | La duración promedio del [tiempo hasta que el PR esté listo](#commit-fields) de todas las confirmaciones. |
| `Avg Review Time`       | La duración promedio del [tiempo de revisión](#commit-fields) de todas las confirmaciones. |
| `Avg Merge Time`       | La duración promedio del [tiempo de fusión](#commit-fields) de todas las confirmaciones. |
| `Avg Time to Deploy`       | La duración promedio del [tiempo hasta la implementación](#commit-fields) de todas las confirmaciones. |
| `Number of Commits`        | Recuento de todas las confirmaciones incluidas en una implementación. |
| `Deployment Type` | Tipo de implementación (`standard`, `rollback` o `rollforward`). |
| `Change Failure` | Booleano que indica si una implementación está marcada como una falla en los cambios. |
| `Recovery Time` | Duración en segundos entre el `finished_at` de una implementación fallida y el `finished_at` de su corrección. Solo disponible para implementaciones marcadas como fallas en los cambios. |
| `Remediation Type` | El tipo de corrección aplicada (`rollback` o `rollforward`). Solo disponible para implementaciones marcadas como fallas en los cambios. |

### Campos de solicitud de extracción {#pull-request-fields}

| Campo  | Descripción                |
|------------|----------------------------|
| `PR Cycle Time`       | Duración total desde la primera confirmación hasta la fusión. |
| `Time to PR Ready`       | Duración desde la primera confirmación hasta que la solicitud de extracción se marca como lista para revisión. |
| `Review Time`       | Duración desde que la solicitud de extracción se marca como lista para revisión hasta su aprobación. |
| `Merge Time`       | Duración desde la aprobación de la solicitud de extracción hasta su fusión. |
| `Time to Deploy`       | Duración desde la fusión hasta el inicio de la implementación. |
| `Deploy Time`       | Duración desde el inicio hasta el final de la implementación. |
| `Number of Commits`       | Cantidad de confirmaciones incluidas en la solicitud de extracción. |
| `Number of Reviewers`       | Cantidad de revisores que revisaron la solicitud de extracción. |
| `Number of Files Changed` | Cantidad de archivos modificados en la solicitud de extracción. Solo disponible para GitHub. |
| `Number of Lines Added` | Cantidad de líneas agregadas en la solicitud de extracción. Solo disponible para GitHub. |
| `Number of Lines Deleted` | Cantidad de líneas eliminadas en la solicitud de extracción. Solo disponible para GitHub. |
| `Total Number of Lines Changed` | Cantidad total de líneas agregadas y eliminadas en la solicitud de extracción. Solo disponible para GitHub. |
| `Time to First Human Review` | Duración hasta que la solicitud de extracción recibe su primera revisión realizada por una persona. Solo disponible para GitHub. |
| `Number of Comments` | Cantidad de comentarios en la solicitud de extracción. Solo disponible para GitHub. |
| `Number of Human Comments` | Cantidad de comentarios en la solicitud de extracción hechos por humanos. Solo disponible para GitHub. |
| `Fully Automated` | Booleano que indica si la solicitud de extracción fue creada y fusionada sin intervención humana. |
| `Creator Bot Type` | Tipo de bot que creó la solicitud de extracción. |
| `Creator Bot Name` | Nombre del bot que creó la solicitud de extracción. |
| `Time CI Failing` | Duración total durante la cual CI permaneció en estado fallido en los commits de la solicitud de extracción. Requiere CI Visibility. |
| `Test Session Duration` | Duración total de las sesiones de prueba para el commit de cabecera o de fusión de la solicitud de extracción. Requiere Test Optimization. |
| `Test Session Duration After Approval` | Duración total de las sesiones de prueba para el commit de cabecera o de fusión de la solicitud de extracción después de que esta fuera aprobada. Requiere Test Optimization. |
| `Time to Pass` | Duración desde el primer intento de CI hasta la primera ejecución exitosa del pipeline para el commit de cabecera o de fusión de la solicitud de extracción. Requiere CI Visibility. |
| `Time to Pass After Approval` | Duración desde el primer intento de CI después de la aprobación de la solicitud de extracción hasta la primera ejecución exitosa del pipeline para el commit de cabecera o de fusión de la solicitud de extracción. Requiere CI Visibility. |
| `Patch Coverage` | Porcentaje de líneas nuevas o modificadas en el commit de cabecera o de fusión de la solicitud de extracción que están cubiertas por pruebas. Requiere Code Coverage. |


### Campos de commit {#commit-fields}

| Campo  | Descripción                |
|------------|----------------------------|
| `Change Lead Time`       | Duración que le toma a un commit llegar a producción. |
| `Time to PR Ready`       | Duración desde la creación del commit hasta que el PR se marca como listo para revisión. |
| `Review Time`       | Duración desde que el PR se marca como listo para revisión hasta su aprobación. |
| `Merge Time`       | Duración desde la aprobación del PR hasta su fusión. |
| `Time to Deploy`       | Duración desde la fusión hasta el inicio de la implementación. |
| `Deploy Time`       | Duración desde el inicio hasta el final de la implementación. |
| `Has Failed Jobs` | Booleano que indica si alguna ejecución de un trabajo de CI falló para el commit, incluidos los casos en que tuvo éxito después de un reintento. Requiere CI Visibility. |
| `Has Failed Tests` | Booleano que indica si alguna ejecución de prueba falló debido a una prueba no inestable en el commit. Requiere Test Optimization. |
| `Has New Flaky Tests` | Booleano que indica si se detectaron nuevas pruebas inestables en las sesiones de prueba del commit. Requiere Test Optimization. |

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