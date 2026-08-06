---
aliases:
- /es/serverless/serverless_tagging/
- /es/serverless/troubleshooting/serverless_tagging/
further_reading:
- link: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
  tag: Documentación
  text: Etiquetado de servicios unificado
title: Etiquetado serverless
---

{{< img src="serverless/serverless_tagging.mp4" vídeo="true" alt="Etiquetado serverless unificado" >}}

## Información general

Cualquier etiqueta (tag) aplicada a tu función de AWS Lambda se convierte automáticamente en una nueva dimensión a partir de la cual puedes filtrar y agrupar métricas, trazas (traces) y logs.

Las etiquetas son especialmente útiles cuando son coherentes en toda la plataforma de Datadog. Se ofrece compatibilidad de primera clase para las siguientes etiquetas: `env`, `service` y `version`.

Con estas etiquetas, puedes hacer lo siguiente:

- navegar sin problemas por métricas, trazas y logs con etiquetas coherentes,
- filtrar tus funciones en la página de inicio de Serverless,
- visualizar los datos de servicios en función del entorno o la versión de forma unificada dentro de la aplicación de Datadog,
- organizar tu mapa de servicios por servicio y entorno.

Para etiquetar tu aplicación serverless con `env`, `service` y `version`, consulta la [documentación del etiquetado de servicios unificado][1].

**Notas**:

- Los nombres de las funciones de Lambda deben respetar la [convención de etiquetado de Datadog][2]. De este modo, todas las trazas, logs y métricas de tus funciones se unifican sin problemas.
- Las [Métricas de Lambda mejoradas][5] no recopilan las etiquetas aplicadas a tu función de AWS Lambda. Utiliza en su lugar la variable de entorno `DD_TAGS`.

### La etiqueta "env" (entorno)

Utiliza `env` para separar tus entornos de staging, desarrollo y producción. Esto funciona para cualquier tipo de infraestructura, no solo para tus funciones serverless. Por ejemplo, puedes etiquetar tus funciones de Lambda de producción en la UE con `env:prod-eu`.

Por defecto, las funciones de AWS Lambda se etiquetan con `env:none` en Datadog. Añade tu propia etiqueta para sobrescribir esta opción.

### La etiqueta "service" (servicio)

Añade la etiqueta `service` para agrupar funciones de Lambda relacionadas por servicio. 

El comportamiento predeterminado para los nuevos clientes de Datadog es que todas las funciones de Lambda se agrupen en el servicio `aws.lambda` y se representen como un solo nodo en el mapa de servicios. Etiqueta tus funciones por servicio para sobrescribir esto.

**Nota:** En algunos clientes de Datadog, cada función de Lambda se trata como el servicio al que pertenece. Añade tu propia etiqueta para sobrescribir esto o ponte en contacto con el servicio de asistencia de Datadog si quieres que tu cuenta adopte el nuevo comportamiento.

### La etiqueta "version" (versión)

Añade la etiqueta `version` para habilitar el [Seguimiento del despliegue][3].

## Organizar el mapa de servicios

El [Mapa de servicios][4] agrupa servicios en mapas según la etiqueta `env` y utiliza la etiqueta `service` para mostrar las relaciones entre los servicios y el estado de sus monitores. Los servicios se representan como nodos individuales en el mapa de servicios. El color de los nodos representa el estado de los monitores asociados. Etiqueta cualquier monitor con la misma etiqueta `service` para crear una asociación.

{{< img src="serverless/serverless_service_map.png" alt="Mapa de servicios" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[2]: /es/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags
[3]: /es/tracing/services/deployment_tracking/
[4]: /es/tracing/services/services_map/
[5]: /es/serverless/aws_lambda/metrics#enhanced-lambda-metrics