---
title: Integración de la facturación de Google Cloud
---

## Información general

Datadog factura por los hosts que ejecute el Agent y todas las instancias de GCE recogidas por la integración de Google Cloud. Los servicios externos a GCE, como [Dataflow][6], pueden crear hosts de GCE que se facturan en Datadog. No se te cobrará dos veces si ejecutas el Agent en una instancia de GCE recogida por la integración de Google Cloud.

Otros recursos de Google Cloud (CloudSQL, Google App Engine, Pub/Sub y otros) no forman parte de la facturación mensual. Para ver qué hosts se facturan, navega a la página de GCE en la consola de Google Cloud y consulta la lista de hosts en ejecución. A menos que se excluyan a través de etiquetas (tags) con [la exclusión de métrica de Google Cloud](#google-cloud-metric-exclusion), los hosts enumerados en esta página están enviando datos a Datadog y se facturan como hosts.

## Exclusión de métricas de Google Cloud

Utiliza el [cuadro de integración de Google Cloud][1] para controlar tu recopilación de métricas. Ve a la pestaña **Configuración** y selecciona un proyecto o añade uno nuevo. Cada proyecto se controla desde **Optionally Limit Metrics Collection to hosts with tag** (Opcionalmente limitar la recopilación de métricas a hosts con etiqueta). Limita las métricas por [etiqueta de host][2]:

{{< img src="account_management/billing/google_cloud_metric_filter.png" alt="La página de Google Cloud en Datadog, en la pestaña General, con la opción de limitar el conjunto de métricas resaltada" >}}

Al añadir límites a proyectos de Google Cloud existentes en el cuadro de integración, las instancias previamente detectadas podrían permanecer en la [lista de infraestructuras][3] hasta dos horas. Durante el periodo de transición, las instancias de CME muestran un estado de `???`. Esto no cuenta a efectos de facturación.

Los hosts con un Agent en ejecución siguen mostrándose y se incluyen en la facturación. El uso de la opción de límite solo es aplicable a las de GCE sin ningún Agent en ejecución.

## Solucionar problemas

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][4].

Si tienes alguna pregunta sobre facturación, ponte en contacto con tu [asesor de clientes][5].

[1]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[2]: /es/getting_started/tagging/using_tags/#integrations
[3]: /es/infrastructure/
[4]: /es/help/
[5]: mailto:success@datadoghq.com
[6]: https://cloud.google.com/dataflow