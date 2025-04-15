---
description: Configurar un check personalizado con Datadog
title: Checks personalizados
---

## Información general

Los checks personalizados, también conocidos como checks de Agent personalizados, te permiten recopilar métricas y otros datos de tus sistemas o aplicaciones personalizadas y enviarlos a Datadog. Al crear y configurar un nuevo archivo de check en tu directorio `conf.d`, puedes configurar el Datadog Agent para recopilar datos emitidos desde tu aplicación. Los checks personalizados se consideran de bajo esfuerzo en comparación con escribir una integración de Datadog. Tienen un impacto en tu facturación, porque las métricas emitidas a través de checks personalizados se consideran métricas personalizadas, que tienen un coste asociado dependiendo de tu plan de suscripción.

**Nota**: Un check personalizado es diferente de un check de servicio. Los checks de servicio monitorizan el estado de subida o bajada de un servicio. Para más información, consulta [Checks de servicio][1].

### ¿Debes escribir un check de Agent personalizado o una integración?

Utiliza checks personalizados para recopilar métricas de aplicaciones personalizadas o sistemas únicos. Sin embargo, si estás intentando recopilar métricas de una aplicación disponible de forma general, un servicio público, o de un proyecto de código abierto, Datadog te recomienda que [crees una integración de Agent completa][2]. Para más información sobre cómo enviar tus datos, consulta [Desarrolladores][3]. Para aprender a escribir una integración, consulta [Creación de integraciones nuevas][2].

## Empezando

{{< whatsnext >}}
    {{< nextlink href="/developers/custom_checks/write_agent_check/" >}}Para comenzar rápidamente, consulta los documentos Escribir un check de Agent. {{< /nextlink >}}
    {{< nextlink href="/developers/custom_checks/prometheus/" >}}Si necesitas opciones más avanzadas que un check genérico (por ejemplo, procesamiento previo de métricas), consulta los documentos Escribir un check de métricas abiertas personalizadas.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/developers/service_checks/
[2]: /es/developers/integrations/agent_integration/
[3]: /es/developers/