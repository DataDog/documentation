---
description: Comprenda los modelos de precios y los cálculos de facturación de Datadog
  para diversos productos, incluidos Infrastructure Monitoring, APM, Logs y Synthetic
  Tests.
further_reading:
- link: https://www.datadoghq.com/pricing
  tag: Precios
  text: Precios de Datadog
title: Precios
---
Datadog tiene muchos planes de precios para satisfacer sus necesidades. Para obtener más información, consulte la página de [Precios][1]. A menos que se indique lo contrario en su pedido, Datadog calcula las tarifas según el uso del producto durante cada mes calendario.

## Planes de facturación {#billing-plans}

Datadog ofrece dos planes de facturación para productos basados en servidores, como Infrastructure Monitoring, APM y Database Monitoring:

- **Plan de marca de agua alta (HWMP)**: Datadog mide su cantidad de servidores cada hora. Al final del mes, Datadog le factura según la cantidad máxima (marca de agua alta) del 99% inferior de esas lecturas por hora, excluyendo el 1% superior para reducir el impacto de los picos de uso breve en su factura. Este plan es adecuado para entornos con un uso estable durante todo el mes.
- **Plan híbrido mensual/por hora (MHP)**: Usted se compromete a un mínimo mensual, y cualquier hora de servidor por encima de ese compromiso se factura a una tarifa por hora. Debido a que el uso por encima del compromiso se factura por hora, este plan es adecuado para entornos efímeros, como flotas de escalado automático o cargas de trabajo de corta duración.

Las siguientes secciones describen las unidades de precios más comunes para cada producto.

## Infrastructure Monitoring {#infrastructure-monitoring}

* Un **servidor** es una instancia de sistema operativo física o virtual. Cada hora, Datadog registra la cantidad de servidores únicos que usted está monitoreando en el servicio de infrastructura.
  * En un plan de marca de agua alta (HWMP), la cantidad facturable de servidores se calcula al final del mes utilizando la cantidad máxima (marca de agua alta) del 99 por ciento inferior del uso de esas horas. Datadog excluye el 1 por ciento superior para reducir el impacto de los picos de uso en su factura.
  * En un plan híbrido mensual/por hora (MHP), Datadog cobra su compromiso mensual mínimo y, por cualquier hora de servidor por encima de ese compromiso, Datadog cobra una tarifa por hora.
* Un **contenedor** es un entorno operativo autónomo que incluye software de aplicación y bibliotecas y configuraciones limitadas del sistema operativo. Una vez cada cinco minutos, Datadog registra la cantidad de contenedores únicos que está monitoreando en el servicio Datadog Infrastructure. Datadog cobra mensualmente según las horas fraccionarias de los contenedores monitoreados.
* Una [**métrica personalizada**][2] es una combinación única de un nombre de métrica, ID de servidor y cualquier etiqueta. Bajo la fijación de precios por cardinalidad, Datadog cobra según el promedio mensual de métricas personalizadas únicas enviadas al servicio Datadog Infrastructure por hora. Datadog también ofrece [Metric Name pricing][12], que factura según los nombres de las métricas y el volumen de puntos de datos en su lugar.
* Un **dispositivo** es un sensor físico que comprende una o más computadoras de placa única en un marco. Datadog registra y cobra por la cantidad de dispositivos y servidores que está monitoreando simultáneamente en el servicio Datadog Infrastructure.
* Una **Fargate task** de AWS es una colección de contenedores configurados a través de la plataforma de orquestación de contenedores ECS de AWS. Datadog registra la cantidad de instancias de tareas que está monitoreando en el servicio Datadog Infrastructure (o APM) en intervalos de cinco minutos. Datadog agrega las mediciones basadas en intervalos al final del mes y le cobra según la cantidad total de horas que se ejecutaron y monitorearon sus aplicaciones.

## APM {#apm}

* Si una aplicación que se ejecuta en un servidor (definido en [Infrastructure Monitoring](#infrastructure-monitoring)) genera trazas y las envía a la aplicación SaaS de Datadog, Datadog cuenta ese servidor como un **APM host**.
  * En un plan de marca de agua alta (HWMP), Datadog mide la cantidad de servidores cada hora. La cantidad facturable de servidores se calcula al final del mes utilizando la cantidad máxima (marca de agua alta) del 99 por ciento inferior de uso para esas horas. Datadog excluye el 1 por ciento superior para reducir el impacto de los picos de uso en su factura.
  * En un plan híbrido mensual/por hora (MHP), Datadog cobra su compromiso mensual mínimo y, por cualquier hora de servidor por encima de ese compromiso, Datadog cobra una tarifa por hora.
* Un **tramo indexado** es una solicitud individual contra un servicio individual en su stack. Datadog cobra según la cantidad total de tramos indexados por [retention filters][3] dentro de Datadog APM.
* Un **tramo ingerido** es una solicitud individual contra un servicio individual en su stack. Datadog cobra según la cantidad total de gigabytes de tramos ingeridos en Datadog APM.

Puede implementar controles tanto para los volúmenes de tramos indexados como para los ingeridos. Para obtener más información, lea la documentación de [Trace Ingestion][4] y [Retention][5].

## Database Monitoring {#database-monitoring}

* Datadog registra la cantidad de servidores de base de datos únicos que monitorea con Datadog Database Monitoring cada hora.
  * En un plan de marca de agua alta (HWMP), la cantidad facturable de servidores se calcula al final del mes utilizando la cantidad máxima (marca de agua alta) del 99 por ciento inferior del uso de esas horas. Datadog excluye el 1 por ciento superior para reducir el impacto de los picos de uso en su factura.
  * En un plan híbrido mensual/por hora (MHP), Datadog cobra su compromiso mensual mínimo y, por cualquier hora de servidor por encima de ese compromiso, Datadog cobra una tarifa por hora.
* Datadog cobra según la cantidad total de [consultas normalizadas][6] configuradas que se rastrean en cualquier momento dado.

## Gestión de registros {#log-management}

* Un **registro** es un registro de actividad basado en texto generado por un sistema operativo, una aplicación o por otras fuentes. Datadog cobra por los registros ingeridos según la cantidad total de gigabytes enviados al servicio Datadog Logs.
* Un **evento de registro** es un registro que es indexado por el servicio Datadog Logs. Datadog cobra por cada millón de eventos de registro enviados para indexación a la tarifa designada para la política de retención que seleccionó.

## Cloud SIEM {#cloud-siem}

* Un **registro analizado** es un registro de actividad basado en texto generado por un sistema operativo, una aplicación o por otras fuentes analizadas para detectar posibles amenazas de seguridad. Datadog cobra por los registros analizados según los millones de eventos por mes analizados por el servicio Datadog Cloud SIEM.

## Synthetic Monitoring {#synthetic-monitoring}

* Una **prueba de API** es una solicitud HTTP o HTTPS a una URL única. Datadog cobra por cada diez mil ejecuciones de pruebas de API realizadas en el servicio Datadog Synthetic Monitoring.
* Una **prueba de navegador** es una simulación de una secuencia programada de acciones de usuario en una aplicación web utilizando un navegador web virtualizado. Datadog cobra por cada mil pruebas de navegador ejecutadas en el servicio Datadog Synthetic Monitoring
 servicio.

## Cloud Network Monitoring {#cloud-network-monitoring}

* Datadog registra la cantidad de servidores de **Cloud Network Monitoring** (CNM) que está monitoreando simultáneamente con el servicio Datadog CNM una vez por hora.
  * La cantidad facturable de servidores se calcula al final del mes utilizando la cantidad máxima (marca de agua alta) del 99 por ciento inferior de uso para esas horas. Datadog excluye el 1 por ciento superior para reducir el impacto de los picos de uso en su factura.
* Además, Datadog mide el número total de flujos utilizados por todos los servidores de CNM al mes. Un **flujo** es un registro del tráfico enviado y recibido entre una fuente (IP:Puerto) y un destino (IP:Puerto), medido durante un período de cinco minutos.

## Real User Monitoring {#real-user-monitoring}

* Una **sesión** es el recorrido de un usuario en su aplicación web. Expira después de 15 minutos de inactividad o 4 horas de actividad continua.

* Datadog recopila todas las páginas visitadas por sus usuarios finales junto con la telemetría relevante: carga de recursos (XHR, imágenes, archivos CSS, scripts JS, etc.), errores de frontend y tareas largas. Todo esto se incluye en la sesión de usuario. Datadog cobra por cada mil (1,000) sesiones ingeridas en el servicio de Datadog Real User Monitoring (RUM) con la siguiente distinción:

- [RUM Measure][10]: Se le cobra por las sesiones que son rastreadas por el SDK y enviadas a Datadog.
- [RUM without Limits][11]: Se le cobra por separado según el volumen de sesiones que fluyen desde el SDK hacia Datadog y el volumen de sesiones que usted conserva después de los filtros de retención.

## Continuous Profiler {#continuous-profiler}

* Datadog registra el número de servidores únicos de Continuous Profiler que usted monitorea simultáneamente con el servicio de Datadog Continuous Profiler una vez por hora.
  * La cantidad facturable de servidores se calcula al final del mes utilizando la cantidad máxima (marca de agua alta) del 99 por ciento inferior de uso para esas horas. Datadog excluye el 1 por ciento superior para reducir el impacto de los picos de uso en su factura.
  * Cada servidor tiene permitido hasta cuatro contenedores perfilados de forma gratuita. Los containers que excedan esta cantidad tienen un precio de $2 por contenedor.
    **Nota**: Esta asignación se agrega en todos los servidores, por lo que si tiene cuatro contenedores en promedio en todos sus servidores, no se le cobrará como si tuviera más de forma individual por servidor.
* Datadog mide el número total de contenedores que se están perfilando. Un contenedor es un entorno operativo autónomo que incluye software de aplicación y bibliotecas y configuraciones limitadas del sistema operativo. Una vez cada cinco minutos, Datadog registra el número de contenedores únicos que usted monitorea en el servicio de Datadog Continuous Profiler. Datadog cobra mensualmente según las horas fraccionarias de los contenedores monitoreados. Para Continuous Profiler, Datadog solo cuenta los contenedores que ejecutan el servicio de Continuous Profiler para el recuento total de contenedores monitoreados.

## Incident Management {#incident-management}

* Para las organizaciones con un plan basado en puestos, Datadog cobra según el compromiso de puestos de su organización. 
* Para las organizaciones con el plan heredado basado en el uso, Datadog realiza un seguimiento del número de usuarios activos mensuales de Incident Management.
  * Datadog cuenta a un usuario como un **usuario activo** si ha utilizado las capacidades de Datadog para contribuir sustancialmente a la respuesta ante incidentes. Por ejemplo, usted se convierte en un usuario activo en el mes cuando:
    * Actualice el estado, la gravedad u otros campos de un incidente
    * Comente en la línea de tiempo del incidente
    * Envíe notificaciones de incidentes
    * Agregue respondedores o asigne roles de respondedores
    * Cree, modifique o asigne seguimientos de incidentes
    * Genere un postmortem
  * Usted _no_ se convierte en un usuario activo cuando:
    * Declare, visualice o busque incidentes
    * Únase a canales, reuniones o llamadas de terceros que están conectados al incidente
    * Publique mensajes en el canal de Slack o Microsoft Teams del incidente (incluso si el mensaje se sincroniza automáticamente con la línea de tiempo del incidente)

## CI Visibility {#ci-visibility}

* Datadog realiza un seguimiento del número de autores de confirmación (committers) únicos que envían datos de prueba y de canalización al servicio CI Visibility.
* Un **autor de confirmación** significa un autor de confirmación de git activo, identificado por su dirección de correo electrónico de autor de git. Un autor de confirmación se contabiliza para la facturación si realiza al menos tres confirmaciones en un mes determinado.
  * En caso de que una canalización no esté asociada con un repositorio de git, o los metadatos de git no estén disponibles, el nombre de usuario de la persona que activa la ejecución de la canalización se utiliza como el autor de confirmación facturable.
* Para Pipeline Visibility, cada pipeline, etapa y trabajo cuenta como un **span de pipeline**. Para Testing Visibility, cada ejecución de prueba individual cuenta como un **span de prueba**.

## Solución de problemas {#troubleshooting}

Para preguntas técnicas, comuníquese con el [soporte de Datadog][7].

Comuníquese con [Ventas][8] o con su gerente de [Éxito del cliente][9] para analizar los precios por hora o la facturación de su cuenta.

[1]: https://www.datadoghq.com/pricing
[2]: /es/metrics/custom_metrics/
[3]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /es/tracing/trace_pipeline/ingestion_controls/
[5]: /es/tracing/trace_pipeline/trace_retention/
[6]: /es/database_monitoring/data_collected/#normalized-queries
[7]: /es/help/
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com
[10]: /es/real_user_monitoring/rum_without_limits/
[11]: https://www.datadoghq.com/pricing/?product=real-user-monitoring#products
[12]: /es/account_management/billing/metric_name_pricing/