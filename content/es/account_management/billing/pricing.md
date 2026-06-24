---
description: Entienda los modelos de precios y cálculos de facturación de Datadog
  para varios productos, incluyendo Infrastructure Monitoring, APM, Logs y pruebas
  Synthetic.
further_reading:
- link: https://www.datadoghq.com/pricing
  tag: Precios
  text: Precios de Datadog
title: Precios
---
Datadog tiene muchos planes de precios para adaptarse a sus necesidades. Para más información, consulte la página de [Precios][1]. A menos que se indique lo contrario en su pedido, Datadog calcula las tarifas basadas en el uso del producto durante cada mes calendario. Aquí están las unidades de precios más comunes:

## Infrastructure monitoring {#infrastructure-monitoring}

* Un **servidor** es una instancia de sistema operativo físico o virtual. Cada hora, Datadog registra el número de hosts únicos que está monitoreando en el servicio de Infrastructure Monitoring.
  * En un plan de alto límite (HWMP), el conteo facturable de servidores se calcula al final del mes utilizando el conteo máximo (límite alto) del 99 por ciento inferior de uso durante esas horas. Datadog excluye el 1 por ciento superior para reducir el impacto de picos en el uso en su factura.
  * En un plan híbrido mensual/hora (MHP), Datadog cobra su compromiso mensual mínimo, y por cualquier hora de servidor por encima de ese compromiso, Datadog cobra una tarifa por hora.
* Un **contenedor** es un entorno operativo autónomo que incluye software de aplicación y bibliotecas y configuraciones limitadas del sistema operativo. Una vez cada cinco minutos, Datadog registra el número de contenedores únicos que está monitoreando en el servicio de Infrastructure Monitoring de Datadog. Datadog cobra mensualmente basado en las horas fraccionarias de contenedores monitoreados.
* Una [**métrica personalizada**][2] es una combinación única de un nombre de métrica, ID de servidor y cualquier etiqueta. Bajo la tarifa de cardinalidad, Datadog cobra según el promedio mensual de métricas personalizadas únicas enviadas al servicio de Infrastructure Monitoring de Datadog por hora. Datadog también ofrece [tarifas por nombre de métrica][12], que factura en función de los nombres de métricas y el volumen de puntos de datos.
* Un **dispositivo** es un sensor físico que comprende una o más computadoras de placa única en un marco. Datadog registra y cobra por el número de dispositivos y servidores que está monitoreando simultáneamente en el servicio de Infrastructure Monitoring de Datadog.
* Una tarea de AWS **Fargate** es una colección de contenedores configurados a través de la plataforma de orquestación de contenedores ECS de AWS. Datadog registra el número de instancias de tareas que está monitoreando en el servicio de Infrastructure Monitoring (o APM) de Datadog en intervalos de cinco minutos. Datadog agrega las mediciones basadas en intervalos al final del mes y le cobra en función del número total de horas que sus aplicaciones se ejecutaron y fueron monitoreadas.

## APM {#apm}

* Si una aplicación que se ejecuta en un servidor (definido en [Infrastructure Monitoring](#infrastructure-monitoring)) genera trazas y las envía a la aplicación SaaS de Datadog, Datadog cuenta ese servidor como un **servidor APM**.
  * En un plan de alta marca de agua (HWMP), Datadog mide la cantidad de servidores por hora. El conteo facturable de servidores se calcula al final del mes utilizando el conteo máximo (marca de agua alta) del 99 por ciento inferior de uso durante esas horas. Datadog excluye el 1 por ciento superior para reducir el impacto de picos en el uso en su factura.
  * En un plan híbrido mensual/hora (MHP), Datadog cobra su compromiso mensual mínimo, y por cualquier hora de servidor por encima de ese compromiso, Datadog cobra una tarifa por hora.
* Un **Tramo Indexado** es una solicitud individual contra un servicio individual en su pila. Datadog cobra en función del número total de tramos indexados por [filtros de retención][3] dentro de Datadog APM.
* Un **Tramo Ingerido** es una solicitud individual contra un servicio individual en su pila. Datadog cobra en función del número total de gigabytes de tramos ingeridos en Datadog APM.

Puede implementar controles tanto para volúmenes de tramos indexados como ingeridos. Para más información, lea la documentación de [Ingesta de Trazas][4] y [Retención][5].

## Database Monitoring {#database-monitoring}

* Datadog registra el número de servidores de bases de datos únicos que está monitoreando con Database Monitoring de Datadog cada hora.
  * En un plan de alta marca de agua (HWMP), el conteo facturable de servidores se calcula al final del mes utilizando el conteo máximo (marca de agua alta) del 99 por ciento inferior de uso durante esas horas. Datadog excluye el 1 por ciento superior para reducir el impacto de picos en el uso en su factura.
  * En un plan híbrido mensual/hora (MHP), Datadog cobra su compromiso mensual mínimo, y por cualquier hora de servidor por encima de ese compromiso, Datadog cobra una tarifa por hora.
* Datadog cobra en función del número total de [consultas normalizadas][6] configuradas que se están rastreando en cualquier momento.

## Gestión de registros {#log-management}

* Un **registro** es un registro de texto de la actividad generada por un sistema operativo, una aplicación o por otras fuentes. Datadog cobra por los registros ingeridos según el número total de gigabytes enviados al servicio de Logs de Datadog.
* Un **evento de registro** es un registro que es indexado por el servicio de Logs de Datadog. Datadog cobra por cada millón de eventos de registro enviados para indexación a la tarifa designada para la política de retención que seleccionó.

## Cloud SIEM {#cloud-siem}

* Un **registro analizado** es un registro basado en texto de la actividad generada por un sistema operativo, una aplicación o por otras fuentes analizadas para detectar posibles amenazas de seguridad. Datadog cobra por los registros analizados según los millones de eventos por mes analizados por el servicio Cloud SIEM de Datadog.

## Synthetic Monitoring {#synthetic-monitoring}

* Una **prueba de API** es una solicitud HTTP o HTTPS contra una única URL. Datadog cobra por cada diez mil ejecuciones de pruebas de API realizadas en el servicio Synthetic Monitoring de Datadog.
* Una **prueba de navegador** es una simulación de una secuencia de acciones de usuario guionadas en una aplicación web utilizando un navegador web virtualizado. Datadog cobra por cada mil pruebas de navegador ejecutadas en el Synthetic Monitoring de Datadog.
 servicio.

## Cloud Network Monitoring {#cloud-network-monitoring}

* Datadog registra el número de **servidores de Cloud Network Monitoring** (CNM) que está monitoreando simultáneamente con el servicio CNM de Datadog una vez por hora.
  * El conteo facturable de servidores se calcula al final del mes utilizando el conteo máximo (marca de agua alta) del 99 por ciento inferior de uso durante esas horas. Datadog excluye el 1 por ciento superior para reducir el impacto de picos en el uso en su factura.
* Además, Datadog mide el número total de flujos utilizados por todos los servidores de CNM por mes. Un **flujo** es un registro del tráfico enviado y recibido entre una fuente (IP:Puerto) y un destino (IP:Puerto), medido durante un período de cinco minutos.

## Real User Monitoring {#real-user-monitoring}

* Una **sesión** es un recorrido del usuario en su aplicación web. Expira después de 15 minutos de inactividad o 4 horas de actividad continua.

* Datadog recopila todas las páginas visitadas por sus usuarios finales junto con la telemetría que importa: carga de recursos (XHRs, imágenes, archivos CSS, scripts JS, etc.), errores en el frontend y tareas largas. Todo esto está incluido en la sesión del usuario. Datadog cobra por mil (1,000) sesiones ingeridas en el servicio Datadog Real User Monitoring (RUM) con la siguiente distinción:

- [RUM Measure][10]: Se le cobra por las sesiones que son rastreadas por el SDK y enviadas a Datadog.
- [RUM without Limits][11]: Se le cobra por separado según el volumen de sesiones que fluyen del SDK a Datadog y el volumen de sesiones que mantiene después de los filtros de retención.

## Continuous Profiler {#continuous-profiler}

* Datadog registra el número de servidores únicos de Continuous Profiler que está monitoreando simultáneamente con el servicio de Continuous Profiler de Datadog una vez por hora.
  * El conteo facturable de servidores se calcula al final del mes utilizando el conteo máximo (marca de agua alta) del 99 por ciento inferior de uso durante esas horas. Datadog excluye el 1 por ciento superior para reducir el impacto de picos en el uso en su factura.
  * Cada servidor puede tener hasta cuatro contenedores perfilados de forma gratuita. Los contenedores que excedan este límite se cobran a $2 por contenedor.
    **Nota**: Esta asignación se agrega a través de todos los servidores, por lo que si tiene un promedio de cuatro contenedores en todos sus servidores, no se le cobra como si tuviera más por cada servidor.
* Datadog mide el número total de contenedores que están siendo perfilados. Un contenedor es un entorno operativo autónomo que incluye software de aplicación y bibliotecas y configuraciones limitadas del sistema operativo. Cada cinco minutos, Datadog registra el número de contenedores únicos que está monitoreando en el servicio de Continuous Profiler de Datadog. Datadog cobra mensualmente basado en las horas fraccionarias de contenedores monitoreados. Para Continuous Profiler, Datadog solo cuenta los contenedores que están ejecutando el servicio de Continuous Profiler para el total de contenedores monitoreados.

## Incident Management {#incident-management}

* Para organizaciones en un plan basado en asientos, Datadog cobra según el compromiso de asientos de su organización. 
* Para organizaciones en el plan basado en uso heredado, Datadog rastrea el número de usuarios activos mensuales de Incident Management.
  * Datadog cuenta a un usuario como un **usuario activo** si ha utilizado las capacidades de Datadog para contribuir de manera sustantiva a la respuesta ante incidentes. Por ejemplo, se convierte en un usuario activo durante el mes cuando:
    * Actualiza el estado, la gravedad u otros campos de un incidente
    * Comente en la línea de tiempo del incidente
    * Envíe notificaciones de incidentes
    * Agregue respondedores o asigne tipos de respondedores
    * Cree, modifique o asigne seguimientos de incidentes
    * Genere un postmortem
  * No se convierte _ en un usuario activo_ cuando:
    * Declare, visualice o busque incidentes
    * Únase a canales, reuniones o llamadas de terceros que estén conectados al incidente
    * Publique mensajes en el canal de Slack del incidente o en el canal de Microsoft Teams (incluso si el mensaje se sincroniza automáticamente con la línea de tiempo del incidente)

## CI Visibility {#ci-visibility}

* Datadog rastrea el número de contribuyentes únicos que envían datos de prueba y de pipeline al servicio CI Visibility.
* Un **contribuyente** significa un contribuyente activo de git, identificado por la dirección de correo electrónico del autor de git. Un contribuyente se cuenta para la facturación si realiza al menos tres confirmaciones en un mes determinado.
  * En el caso de que un pipeline no esté asociado con un repositorio de git, o si los metadatos de git no están disponibles, se utiliza el nombre de usuario de la persona que activa la ejecución del pipeline como el contribuyente facturable.
* Para la Visibilidad de Pipeline, cada canalización, etapa de canalización y trabajo de canalización cuenta como un **span de pipeline**. Para Testing Visibility, cada ejecución de prueba individual cuenta como un **span de prueba**.

## Resolución de problemas {#troubleshooting}

Para preguntas técnicas, contacte a [Datadog support][7].

Contacte a [Sales][8] o a su [Customer Success][9] Manager para discutir la facturación o los precios por hora de su cuenta.

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