---
aliases:
- /es/partners/delivering-value/
description: Pasos recomendados después de que los datos fluyan hacia Datadog.
title: Aportar valor
---

Una vez configurada la ingesta de datos, puedes tomar varias medidas adicionales para maximizar el valor para tus clientes. He aquí algunas áreas clave en las que centrarse.

## Configuración de monitores y caída del sistema

Los monitores y las alertas llaman la atención de las personas sobre determinados sistemas y servicios que requieren inspección e intervención. Para generar alertas, Datadog ofrece:
- Monitores: definiciones de las condiciones de alerta
- Caída del sistema - periodos de tiempo en los que deben activarse o suprimirse las alertas

Para familiarizarte con el concepto de monitores en general, consulta los siguientes recursos:
- [Alertar][1]
- [Monitorización 101 - Alertar sobre qué asuntos][2] (blog).
- [Introducción a la Monitorización][3] (Entrenamiento).

### Migraciones de monitores

A menudo, los proveedores de servicios necesitan migrar un cliente desde una plataforma de monitorización o de observabilidad diferente a Datadog. En tales casos, podría parecer lógico replicar cualquier monitor de la solución anterior en Datadog. Este enfoque a menudo hace que muchas de las características más útiles de Datadog queden sin utilizar. En particular, no querrás perderte funciones que mejoran los tiempos de detección y de resolución de problemas o reducen la fatiga por alertas.

Antes de iniciar un proyecto de migración, revisa las definiciones de alerta y umbral existentes para responder a las siguientes preguntas:
- ¿Tiene la métrica una variación basada en el tiempo? Un [monitor de anomalías][4] podría ser un mejor enfoque.
- ¿Tiene la métrica una variación basada en la carga? Un [monitor aritmético][5] podría ser el mejor enfoque mediante la combinación de una métrica con una métrica que indique la carga. Por ejemplo, la carga de los sistemas podría ser mayor si hay más usuarios utilizando un servicio.
- ¿Es el valor absoluto de la métrica menos importante que la tasa de cambio? Un [cambio de monitor][6] o un [monitor de predicción][7] podría ser el mejor enfoque.
- ¿Es el valor de la propia métrica menos importante que si es diferente del valor para otros hosts o entidades? Por ejemplo, ¿experimenta un nodo de clúster una latencia alta mientras que otros nodos no? El [monitor outlier][8] es el mejor enfoque en este escenario.
- ¿Sólo una combinación de varias métricas presenta una situación procesable? Los [monitores compuestos][9] ofrecen una solución que no requiere la provisión de scripts.

### Gestión de monitores mediante programación

Como proveedor de servicios, la gestión de monitores para ti y tus clientes se realiza mejor mediante programación a través de una de las siguientes vías:
- [API de monitores Datadog][10]
- Terraform
  - [Cómo gestionar los recursos de Datadog con Terraform][11] (vídeo)
  - [Automatizar la monitorización con el proveedor Terraform Datadog][12] (Tutorial de HashiCorp)

Asegúrate de [etiquetar monitores][13] para facilitar la gestión de un gran número de monitores.

### Monitores recomendados

Es posible que tus clientes utilicen tecnologías con las que tú no tengas mucha experiencia. Datadog ofrece [Monitores recomendados][14] que te ayudarán a incorporar nuevas tecnologías con rapidez y confianza.

Para saber más sobre monitores, consulta:
- [Gestionar monitores][15]
- [Monitores][16]
- [Crear alertas dinámicas mediante valores de etiquetas (tags)][17] (vídeo)
- [Los cambios de configuración de monitores no surten efecto][18]

### Caída del sistema

Un problema habitual de los monitores y las alertas es la fatiga por alertas, en la que una sobreabundancia de alarmas o notificaciones provoca la insensibilización a las alarmas. Una forma de combatir la fatiga por alertas es limitar el número de alarmas falsas positivas. Esto es especialmente pertinente en situaciones controladas como paradas planificadas del sistema, mantenimiento o ventanas de actualización.

Las caídas del sistema de Datadog te ofrecen a ti y a tus clientes una forma de silenciar monitores durante los periodos de mantenimiento planificado (o ad hoc).

Para saber más sobre la gestión de las caídas del sistema, especialmente mediante programación, consulta:
- [Caída del sistema][19]
- [Silenciar alertas de Datadog para caídas del sistema programadas][20] (Blog)
- [Gestión de Datadog con Terraform][21] (Blog)
- [API de caída del sistema][22]
- [Evitar alertas de monitores que estaban en caída del sistema][23]

### Notificaciones

Algunas directrices generales para notificaciones:
- Alertar liberalmente; avisar juiciosamente
- Página sobre los síntomas, más que sobre las causas

Datadog ofrece varios canales a través de los cuales tú o tus clientes pueden notificar a los usuarios alertas importantes:

- Notificaciones por correo electrónico
- integraciones, como:
  - [Slack][24]
  - [PagerDuty][25]
  - [Flowdock][26]
  - [ServiceNow][27]
  - [Google Chat][28]
  - [Microsoft Teams][29]
  - Y [muchas más][19]

También puedes invocar cualquier API REST con la [integración de Webhooks][30] genérica. Puedes utilizar una integración de Webhooks no sólo para notificar a los usuarios, sino también para activar flujos de trabajo de corrección automáticos.

Para saber más sobre notificaciones, consulta:
- [Notificaciones][31]
- [Enviar alertas por SMS con Webhooks y Twilio][32] (Blog)

## Configuración de visualizaciones con dashboards

Las visualizaciones son una excelente manera de ofrecer a tus clientes una imagen clara de los complejos stacks tecnológicos y de la abundancia de métricas y eventos que se están recopilando. Los dashboards son un punto de partida natural para investigar un posible problema que te hayan notificado a ti o a tu cliente a través de un monitor.

### Dashboards predefinidos

En el momento en que se configura una integración del Agent o Cloud, Datadog activa automáticamente dashboards listos para usar para la nueva tecnología o servicio integrado, lo que proporciona información inmediata. También puedes clonar un dashboard listo para usar, lo que te proporciona un excelente punto de partida para un dashboard personalizado.

### Crear dashboards personalizados

Puedes aportar un valor añadido y distinguirte de tus competidores ofreciendo una perspectiva centrada en la empresa, adaptada a diferentes personas.

Estas son algunas de las mejores prácticas de dashboards que debes tener en cuenta a la hora de crear tus dashboards:
- Céntrate en las métricas del trabajo y no en demasiadas métricas de recursos. Para entender la diferencia, consulta [Monitorización 101: Recopilar los datos adecuados][33] (blog).
- Aprovecha [superposiciones de eventos][34] para correlacionar métricas y eventos.
- Anota los dashboards con [información de texto libre][35] sobre qué datos se muestran y qué hacer en caso de que el dashboard indique un problema.

Para saber más sobre dashboards, consulta:
- [Crear mejores dashboards][36] (Entrenamiento)
- Utiliza la función [Datadog Notebooks ][37] para recopilar datos de forma exploratoria y redactar dashboards.
- [Centros de datos y redes de monitores con Datadog][38] (Blog)
- [Utilizar variables de plantillas asociadas][39] (Blog)
- [La API Datadog Dashboard ][40]
- [Configurar Observability como un código con Terraform y Datadog][41] (webinar de HashiCorp)

### Visualizaciones para usuarios sin acceso a Datadog 

En función de tu modelo de negocio, es posible que tus clientes no necesiten acceder a Datadog. Sin embargo, podrías desear proporcionar visualizaciones de Datadog a tus clientes. Dispones de las siguientes opciones para proporcionar visualizaciones de Datadog:
- [Compartir dashboards][42]: Proporciona una página de estado a tus clientes compartiendo una URL pública a un dashboard de sólo lectura o comparte el dashboard de forma privada utilizando una dirección de correo electrónico individual.
  - Como proveedor de servicios, tu empresa necesita poder escalar. [Gestionar los dashboards compartidos con las API de Datadog][40] es el enfoque más eficiente.
- Gráficos insertables: Si tienes un portal de clientes en el que deseas presentar información de Datadog, los gráficos insertables son la solución. Mediante parámetros, puedes filtrar los datos según tus necesidades. Para obtener más información, consulta:
  - [API de gráficos insertables][43]
  - [Gráficos insertables con variables de plantillas][44]

### Configurar objetivos de nivel de servicio

Es una buena idea presentar continuamente la calidad y el nivel de tus servicios a tus clientes de forma transparente. Los objetivos de nivel de servicio (SLOs) son una excelente manera de monitorizar y visualizar la calidad de los servicios en nombre de tus clientes y también contribuyen a que tus clientes implementen informes basados en el nivel de los servicios de manera interna.

El siguiente material puede serte útil a la hora de configurar y gestionar los SLOs:
- Para empezar, consulta [Objetivos de nivel de servicio (SLOs) 101: Establecer SLOs eficaces][45] (Blog).
- [Lista de verificación de SLOs][46]
- [Mejores prácticas para gestionar tus SLOs con Datadog][47] (Blog)
- [Rastrea el estado de todos tus SLOs en Datadog][48] (Blog)
- [La API de SLOs de Datadog][49]

## Utilizar Watchdog

Watchdog es una función algorítmica que detecta automáticamente posibles problemas de la aplicación y la infraestructura.

Configura un monitor de Watchdog para tu propio personal o tu cliente con una notificación cada vez que Watchdog haya detectado una nueva irregularidad.

Para obtener más información, consulta [Watchdog][50].

## ¿Qué toca hacer ahora?

Descubre cómo monitorizar el uso de clientes individuales y agregado de la plataforma Datadog en configuraciones de cuentas de varias organizaciones con [Informe de facturación y uso][51].

[1]: /es/monitors
[2]: https://www.datadoghq.com/blog/monitoring-101-alerting/
[3]: https://learn.datadoghq.com/courses/introduction-to-observability
[4]: /es/monitors/types/anomaly/
[5]: /es/monitors/guide/monitor-arithmetic-and-sparse-metrics/
[6]: /es/monitors/types/metric/?tab=change
[7]: /es/monitors/types/forecasts/?tab=linear
[8]: /es/monitors/types/outlier/?tab=dbscan
[9]: /es/monitors/types/composite/
[10]: /es/api/latest/monitors/
[11]: https://www.youtube.com/watch?v=Ell_kU4gEGI
[12]: https://learn.hashicorp.com/tutorials/terraform/datadog-provider
[13]: https://www.datadoghq.com/blog/tagging-best-practices-monitors/
[14]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[15]: /es/monitors/manage/
[16]: /es/monitors/
[17]: https://www.youtube.com/watch?v=Ma5pr-u9bjk
[18]: /es/monitors/guide/why-did-my-monitor-settings-change-not-take-effect/
[19]: /es/monitors/downtimes/
[20]: https://www.datadoghq.com/blog/mute-datadog-alerts-planned-downtime/
[21]: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
[22]: /es/api/latest/downtimes/
[23]: /es/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/
[24]: /es/integrations/slack/?tab=slackapplication
[25]: /es/integrations/pagerduty/
[26]: /es/integrations/flowdock/
[27]: /es/integrations/servicenow/
[28]: /es/integrations/google_hangouts_chat/
[29]: /es/integrations/microsoft_teams/
[30]: /es/integrations/webhooks/
[31]: /es/monitors/notify/
[32]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio/
[33]: https://www.datadoghq.com/blog/monitoring-101-collecting-data/
[34]: /es/dashboards/widgets/timeseries/
[35]: /es/dashboards/widgets/free_text/
[36]: https://learn.datadoghq.com/courses/building-better-dashboards
[37]: /es/notebooks/
[38]: https://www.datadoghq.com/blog/network-device-monitoring/
[39]: https://www.datadoghq.com/blog/template-variable-associated-values/
[40]: /es/api/latest/dashboards/
[41]: https://www.hashicorp.com/resources/configure-observability-as-code-with-terraform-and-datadog
[42]: /es/dashboards/sharing/
[43]: /es/api/latest/embeddable-graphs/
[44]: /es/dashboards/guide/embeddable-graphs-with-template-variables/
[45]: https://www.datadoghq.com/blog/establishing-service-level-objectives/
[46]: /es/service_management/service_level_objectives/guide/slo-checklist
[47]: https://www.datadoghq.com/blog/define-and-manage-slos/
[48]: https://www.datadoghq.com/blog/slo-monitoring-tracking/
[49]: /es/api/latest/service-level-objectives/
[50]: /es/monitors/types/watchdog/
[51]: /es/partners/billing-and-usage-reporting/