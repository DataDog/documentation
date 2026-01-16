---
description: Comprender los modelos de precios de Datadog y los cálculos de facturación
  de varios productos, incluidos Infrastructure Monitoring, APM, Logs y Synthetic
  Monitoring Tests.
further_reading:
- link: https://www.datadoghq.com/pricing
  tag: Precios
  text: Precios de Datadog
title: Precios
---

Datadog ofrece varios planes de precios que se adaptan a tus necesidades. Para obtener más información, consulta la página de [precios][1]. Salvo que indiques lo contrario en tu pedido, el precio que te cobra Datadog se calcula en función del uso que haces del producto durante cada mes calendario. Las unidades de tarificación más comunes son:

## Monitorización de la infraestructura

* Un **host** es una instancia de sistema operativo físico o virtual. Cada hora, Datadog registra el número de hosts únicos que estás monitorizando en el servicio de la infraestructura.
  * En un plan de marca de agua alta (HWMP), el recuento facturable de hosts se calcula al final del mes utilizando el recuento máximo (marca de agua alta) del 99% inferior del consumo de esas horas. Datadog excluye el 1% superior para reducir el impacto de los picos de consumo en tu factura.
  * Con un plan híbrido mensual/hora (MHP), Datadog cobra por el compromiso mensual mínimo que seleccionas y aplica una tarifa horaria por cada hora de host que supera ese compromiso.
* Un **contenedor** es un entorno operativo autónomo que incluye software de aplicación, además de bibliotecas y configuraciones del sistema operativo limitadas. Cada cinco minutos, Datadog registra el número de contenedores únicos que estás monitorizando en el servicio de la infraestructura de Datadog. Cada mes, Datadog te cobra en función del número de horas proporcionales dedicadas a la monitorización de tus contenedores.
* Una [**métrica personalizada**][2] es una combinación única de un nombre de métrica, un ID de host y cualquier etiqueta (tag). Datadog te cobra en función del promedio mensual de métricas personalizadas únicas, enviadas al servicio de la infraestructura de Datadog por hora.
* Un **dispositivo** es un sensor físico que incluye uno o más ordenadores monoplaca en un solo gabinete. Datadog registra y cobra en función del número de dispositivos y hosts que estás monitorizando de forma simultánea en el servicio de la infraestructura de Datadog.
* Una **tarea de Fargate** de AWS es una recopilación de contenedores configurados a través de la plataforma de orquestación de contenedores ECS de AWS. Datadog registra cada cinco minutos el número de instancias de tareas que estás monitorizando en el servicio Infrastructure (o APM) de Datadog. Datadog suma estas mediciones a final de mes y cobra en función del número total de horas que tus aplicaciones se estuvieron ejecutando y monitorizando.

## APM

* Si una aplicación que se ejecuta en un host (definido en la [monitorización de la infraestructura](#infrastructure-monitoring)) genera trazas (traces) y las envía a la aplicación Datadog SaaS, Datadog contabiliza ese host como un **host de APM**.
  * En un plan de marca de agua alta (HWMP), Datadog mide el recuento de hosts cada hora. El recuento facturable de hosts se calcula al final del mes utilizando el recuento máximo (marca de agua alta) del 99% inferior del uso durante esas horas. Datadog excluye el 1% superior para reducir el impacto de los picos de consumo en tu factura.
  * Con un plan híbrido mensual/hora (MHP), Datadog cobra por el compromiso mensual mínimo que seleccionas y aplica una tarifa horaria por cada hora de host que supera ese compromiso.
* Un **tramo indexado** es una solicitud individual realizada a un servicio individual de tu stack. Datadog cobra en función del número total de tramos indexados con [filtros de retención][3] en el servicio APM de Datadog.
* Un **tramo ingerido** es una solicitud individual realizada a un servicio individual de tu stack. Datadog cobra en función del número total de gigabytes de tramos ingeridos en APM de Datadog.

Puedes establecer sistemas de control tanto para los volúmenes de tramos indexados como para los de ingeridos. Para obtener más información, consulta la documentación sobre [Ingesta de trazas][4] y [Retención][5].

## Database Monitoring

* Datadog registra cada hora el número de hosts de bases de datos únicos que estás monitorizando con la herramienta de monitorización de bases de datos de Datadog.
  * En un plan de marca de agua alta (HWMP), el recuento facturable de hosts se calcula al final del mes utilizando el recuento máximo (marca de agua alta) del 99% inferior del consumo de esas horas. Datadog excluye el 1% superior para reducir el impacto de los picos de consumo en tu factura.
  * Con un plan híbrido mensual/hora (MHP), Datadog cobra por el compromiso mensual mínimo que seleccionas y aplica una tarifa horaria por cada hora de host que supera ese compromiso.
* Datadog cobra en función del número total de [consultas normalizadas][6] configuradas que se rastrean en un momento dado.

## Gestión de logs

* Un **log** es un registro basado en texto de la actividad generada por un sistema operativo, una aplicación u otra fuente. Datadog cobra por los logs ingeridos en función del número total de gigabytes enviados al servicio de logs de Datadog.
* Un **evento de log** es un log indexado por el servicio de logs de Datadog. Datadog cobra por cada millón de eventos de logs enviados para su indexación al precio establecido en la política de retención que hayas elegido.

## Cloud SIEM

* Un **log analizado** es un registro basado en texto de la actividad generada por un sistema operativo, una aplicación o por otras fuentes analizadas para detectar posibles amenazas a la seguridad. Datadog cobra por los logs analizados en función de los millones de eventos al mes analizados por el servicio Datadog Cloud SIEM.

## Monitorización Synthetic

* Un **test de API** es una solicitud HTTP o HTTPS a través de una única URL. Datadog cobra por cada diez mil tests de API ejecutados al servicio de monitorización Synthetic de Datadog.
* Un **test de navegador** permite simular una secuencia de comandos de acciones de usuario en una aplicación web utilizando un navegador web virtualizado. Datadog cobra por cada mil tests de navegador ejecutados al servicio de monitorización Synthetic
 de Datadog.

## Monitorización de redes en la nube

* Datadog registra el número de hosts de **Monitorización de red en la nube** (CNM) que estás monitorizando simultáneamente con el servicio de CNM de Datadog una vez por hora.
  * El recuento facturable de hosts se calcula al final del mes utilizando el recuento máximo (marca de agua alta) del 99% inferior del consumo de esas horas. Datadog excluye el 1% superior para reducir el impacto de los picos de consumo en tu factura.
* Además, Datadog mide el número total de flujos utilizados por todos los hosts de CNM al mes. Un **flujo** es un registro del tráfico enviado y recibido entre un origen (IP:Puerto) y un destino (IP:Puerto), medido en un periodo de tiempo de cinco minutos.

## Real User Monitoring

* Una **sesión** es un recorrido del usuario en tu aplicación web. Expira tras 15 minutos de inactividad o 4 horas de actividad continua.

* Datadog recopila todas las páginas visitadas por tus usuarios finales junto con la telemetría que importa: carga de recursos (XHRs, imágenes, archivos CSS, scripts JS, etc), errores de frontend y tareas largas. Todo ello se incluye en la sesión de usuario. Datadog cobra por cada mil (1000) sesiones ingestadas en el servicio Datadog Real User Monitoring (RUM) con la siguiente distinción:

- [Medida RUM][10]: se te cobran las sesiones rastreadas por kit de desarrollo de software (SDK) y enviadas a Datadog.
- [RUM without Limits][11]: se te cobra por separado en función del volumen de sesiones que fluyen desde el kit de desarrollo de software (SDK) a Datadog, y del volumen de sesiones que mantienes después de los filtros de retención.

## Continuous Profiler

* Datadog registra una vez por hora el número de hosts únicos de Continuous Profiler que estás monitorizando de forma simultánea con el servicio Continuous Profiler de Datadog.
  * El recuento facturable de hosts se calcula al final del mes utilizando el recuento máximo (marca de agua alta) del 99% inferior del consumo de esas horas. Datadog excluye el 1% superior para reducir el impacto de los picos de consumo en tu factura.
  * Cada host incluye hasta cuatro contenedores perfilados de forma gratuita. Cada contenedor adicional cuesta 2 $.
    **Nota**: Esta cuota se acumula para todos los hosts. Si tienes un promedio de cuatro contenedores en todos tus hosts, no se te cobrará si en algún host tienes contenedores adicionales.
* Datadog mide el número total de contenedores que están siendo perfilados. Un contenedor es un entorno operativo autónomo que incluye software de aplicación y bibliotecas y configuraciones del sistema operativo limitadas. Una vez cada cinco minutos, Datadog registra el número de contenedores únicos que estás monitorizando en el servicio Continuous Profiler de Datadog. Cada mes, Datadog cobra en función del número de horas que dedica a la monitorización de tus contenedores, calculado de forma proporcional. Para Continuous Profiler, Datadog solo contabiliza aquellos contenedores que ejecutan el servicio Continuous Profiler en el recuento total de contenedores monitorizados.

## Gestión de incidencias

* Para las organizaciones con un plan basado en el número de plazas, Datadog cobra en función del número de plazas comprometidas por la organización. 
* En el caso de las organizaciones con el antiguo plan basado en el uso, Datadog realiza un seguimiento del número de usuarios activos mensuales de Incident Management.
  * Datadog cuenta a un usuario como **usuario activo** si ha utilizado las funciones de Datadog para contribuir sustancialmente a la respuesta ante incidentes. Por ejemplo, te conviertes en un usuario activo para el mes al:
    * Actualizar el estado, la gravedad u otros campos del incidente
    * Comentar la cronología del incidente
    * Enviar notificaciones del incidente
    * Añadir respondedores o asignar tipos de respondedores
    * Crear, modificar o asignar seguimientos del incidente)
    * Generar un informe retrospectivo
  * _No_ te conviertes en usuario activo cuando:
    * Declarar, visualizar o buscar incidentes
    * Unirse a canales, reuniones o llamadas de terceros que estén conectados al incidente
    * Publicar mensajes en el canal de Slack del incidente o en el canal de Microsoft Teams (incluso si el mensaje se sincroniza automáticamente con la cronología del incidente).

## CI Visibility

* Datadog rastrea el número de responsables de commit únicos que envían datos de tests y pipelines al servicio CI Visibility.
* Un **responsable de commit** es un desarrollador git activo, identificado por su dirección de correo electrónico git. Un responsable de commit se contabiliza a efectos de facturación si realiza al menos tres commits en un mes determinado.
  * Si un pipeline no está asociado a un repositorio git, o los metadatos git no están disponibles, se utilizará como responsable de commit facturable el nombre de usuario de la persona que activó la ejecución del pipeline.
* Con respecto a la visibilidad del pipeline, cada pipeline, cada fase del pipeline y cada tarea del pipeline se contabiliza como un **tramo de pipeline**. En lo que respecta a la visibilidad de los tests, cada ejecución de test se contabiliza como un **tramo de test**.

## Solucionar problemas

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][7].

Contacta con [ventas][8] o con tu gestor de [satisfacción al cliente][9] para informarte sobre los precios por hora o la facturación de tu cuenta.

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