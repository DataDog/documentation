---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/product/platform/bits-ai/
  tag: Página del producto
  text: Bits AI
- link: https://www.datadoghq.com/blog/datadog-bits-generative-ai/
  tag: Blog
  text: Presentamos Bits AI, tu nuevo copiloto DevOps
- link: https://www.datadoghq.com/blog/bits-ai-for-incident-management/
  tag: Blog
  text: Mantenerse al día de los últimos incidentes con Bits AI
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-bits-an-ai-assistant-to-help-engineers-quickly-resolve-application-issues/
  tag: Comunicado de prensa
  text: Anuncio de Bits AI
- link: https://www.datadoghq.com/blog/bits-ai-autonomous-investigations/
  tag: Blog
  text: Reimaginar la manera de dirigir las operaciones con investigaciones autónomas
is_beta: true
private: false
title: Bits AI
---

{{< site-region region="gov" >}}
Bits AI no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).
{{< /site-region >}}

Bits AI es un copiloto para toda la plataforma que te ayuda a identificar y solucionar problemas en tu infraestructura y aplicaciones. Puedes consultar Bits AI en la aplicación web Datadog, en la aplicación móvil Datadog y en Slack.

Para obtener instrucciones detalladas de configuración y uso, consulta la documentación [Empezando][1].

## Funciones

### Consulta de datos en lenguaje natural

{{< beta-callout url="https://docs.google.com/forms/d/e/1FAIpQLSfBuPfdyhgqjjduDYpOM5twJdkdDnTTxJdCCWonauaBxWTCnQ/viewform" >}}
La consulta en lenguaje natural está en Vista previa. Rellena este formulario para unirte a la lista de espera.
{{< /beta-callout >}} 

Bits AI admite consultas en lenguaje natural de logs, trazas (traces) APM, datos de infraestructura, coste de la nube y RUM. También puedes preguntar a Bits AI sobre el estado y la propiedad de tus servicios y recuperar recursos de Datadog relacionados con esos servicios.

Puedes hacer preguntas a Bits AI como:
- `Who is on call for example-service?`
- `Find me the example-service dashboard.`
- `What is going on with example-service?`
- `Are there any issues with example-service's dependencies?`

Cuando es relevante para tu consulta, Bits AI muestra despliegues defectuosos, anomalías Watchdog, incidentes, alertas y mucho más. También amplía los problemas con dependencias ascendentes y descendentes. Se recomienda esta función si tus servicios APM están etiquetados por **equipo** y **servicio**.

Para ver más ejemplos de sintaxis de consulta, consulta la guía [Ejemplo de consultas en lenguaje natural][2].

### Agilizar la gestión de incidentes

En [Gestión de Incidentes de Datadog][3], Bits AI puede ayudarte a: 

- **Mantenerte al día:** Obtén un resumen actualizado del incidente cuando te unas a un canal de incidentes Slack.
- **Involucrar a los intervinientes:** Llama a los equipos de guardia con PagerDuty con consultas de Slack como "`@DataDog`". Llama al equipo propietario de ejemplo-servicio.
- **Actualizar incidentes:** Actualiza el nivel de gravedad y el estado de un incidente.
- **Encontrar incidentes relacionados:** Busca en todo tu historial de incidentes y encuentra incidentes similares al que estás examinando actualmente.
- **Generar un análisis retrospectivo:** Adelántate con un primer borrador, que luego podrás repasar y revisar.

Para ver más detalles, consulta [Gestión de incidentes][4].

## Comentarios

Bits AI está en desarrollo activo y tus comentarios son valiosos. Para notificar problemas o solicitar funciones, ponte en contacto con tu asesor de clientes.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/getting_started/
[2]: /es/bits_ai/query_examples
[3]: /es/service_management/incident_management
[4]: /es/bits_ai/managing_incidents/