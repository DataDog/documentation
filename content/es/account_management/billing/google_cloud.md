---
kind: documentación
title: Integración de la facturación de Google Cloud
---

## Información general

Datadog cobra por los hosts que ejecutan el Agent y por todas las instancias GCE recogidas por la integración de Google Cloud. No se te cobrará dos veces si estás ejecutando el Agent en una instancia GCE recogida por la integración de Google Cloud.

Otros recursos de Google Cloud (CloudSQL, Google App Engine, Pub/Sub, etc.) no se incluyen en la facturación mensual.

## Exclusión de métricas de Google Cloud

Utiliza el [cuadro de integración de Google Cloud][1] para controlar tu recopilación de métricas. Ve a la pestaña **Configuración** y selecciona un proyecto o añade uno nuevo. Cada proyecto se controla desde **Optionally Limit Metrics Collection to hosts with tag** (Opcionalmente limitar la recopilación de métricas a hosts con etiqueta). Limita las métricas por [etiqueta de host][2]:

{{< img src="account_management/billing/google-cloud01.png" alt="Google Cloud" >}}

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