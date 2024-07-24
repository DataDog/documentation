---
further_reading:
- link: https://www.datadoghq.com/pricing
  tag: Precios
  text: Precios de Datadog
title: Precios
---

Datadog ofrece varios planes de precios que se adaptan a tus necesidades. Para obtener más información, consulta la página de [precios][1]. Salvo que se indique lo contrario en tu pedido, el precio que cobra Datadog se calcula en función del uso que haces del producto durante cada mes natural. Las unidades de tarificación más comunes son:

## Monitorización de la infraestructura

* Un **host** es una instancia de sistema operativo físico o virtual. Cada hora, Datadog registra el número de hosts únicos que estás monitorizando en el servicio de la infraestructura.
  * En un plan de marca de agua elevada (HWMP), estas mediciones horarias se ordenan de mayor a menor al final del mes, y Datadog cobra en función de la novena medición más alta. El mes de febrero es una excepción y Datadog cobra en función de la octava medición más alta.
  * Con un plan híbrido mensual/hora (MHP), Datadog cobra por el compromiso mensual mínimo que selecciones y aplica una tarifa horaria por cada hora de host que supere ese compromiso.
* Un **contenedor** es un entorno operativo autónomo que incluye software de aplicación, y bibliotecas y configuraciones del sistema operativo limitadas. Cada cinco minutos, Datadog registra el número de contenedores únicos que estás monitorizando en el servicio de la infraestructura de Datadog. Cada mes, Datadog cobra en función del número de horas proporcionales dedicadas a la monitorización de tus contenedores.
* Una [**métrica personalizada**][2] es una combinación única de un nombre de métrica, un ID de host y cualquier etiqueta (tag). Datadog te cobra en función del promedio mensual de métricas personalizadas únicas, enviadas al servicio de la infraestructura de Datadog por hora.
* Un **dispositivo** es un sensor físico que incluye uno o más ordenadores monoplaca en una sola caja. Datadog registra y cobra en función del número de dispositivos y hosts que estás monitorizando de forma simultánea en el servicio de la infraestructura de Datadog.
* Una **tarea de Fargate** de AWS es una recopilación de contenedores configurados a través de la plataforma de orquestación de contenedores ECS de AWS. Datadog registra cada cinco minutos el número de instancias de tareas que estás monitorizando en el servicio Infrastructure (o APM) de Datadog. Datadog suma estas mediciones a final de mes y cobra en función del número total de horas que tus aplicaciones se estuvieron ejecutando y monitorizando.

## APM

* Si una aplicación que se ejecuta en un host (definido en la [monitorización de la infraestructura](#infrastructure-monitoring)) genera trazas (traces) y las envía a la aplicación Datadog SaaS, Datadog contabiliza ese host como un **host de APM**.
  * En un plan de marca de agua elevada (HWMP), las mediciones horarias se ordenan de mayor a menor al final del mes, y Datadog cobra en función de la novena medición más alta. El mes de febrero es una excepción y Datadog cobra en función de la octava medición más alta.
  * Con un plan híbrido mensual/hora (MHP), Datadog cobra por el compromiso mensual mínimo que selecciones y aplica una tarifa horaria por cada hora de host que supere ese compromiso.
* Un **tramo indexado** es una solicitud individual realizada a un servicio individual de tu stack. Datadog cobra en función del número total de tramos indexados con [filtros de retención][3] en el servicio APM de Datadog.
* Un **tramo ingerido** es una solicitud individual realizada a un servicio individual de tu stack. Datadog cobra en función del número total de gigabytes de tramos ingeridos en APM de Datadog.

Puedes establecer sistemas de control tanto para los volúmenes de tramos indexados como para los de ingeridos. Para obtener más información, consulta la documentación sobre [Ingesta de trazas][4] y [Retención][5].

## Monitorización de bases de datos

* Datadog registra cada hora el número de hosts de bases de datos únicos que estás monitorizando con la herramienta de monitorización de bases de datos de Datadog.
  * En un plan de marca de agua elevada (HWMP), estas mediciones horarias se ordenan de mayor a menor al final del mes, y Datadog cobra en función de la novena medición más alta. El mes de febrero es una excepción y Datadog cobra en función de la octava medición más alta.
  * Con un plan híbrido mensual/hora (MHP), Datadog cobra por el compromiso mensual mínimo que selecciones y aplica una tarifa horaria por cada hora de host que supere ese compromiso.
* Datadog cobra en función del número total de [consultas normalizadas][6] configuradas que se rastrean en un momento dado.

## Gestión de logs

* Un **log** es un registro basado en texto de la actividad generada por un sistema operativo, una aplicación u otra fuente. Datadog cobra por los logs ingeridos en función del número total de gigabytes enviados al servicio de logs de Datadog.
* Un **evento de log** es un log indexado por el servicio de logs de Datadog. Datadog cobra por cada millón de eventos de logs enviados para su indexación al precio establecido en la política de retención que hayas elegido.

## Cloud SIEM

* Un **log analizado** es un registro basado en texto de la actividad generada por un sistema operativo, una aplicación o cualquier otra fuente analizada para detectar posibles amenazas a la seguridad. Datadog cobra por los logs analizados en función del número total de gigabytes ingeridos y analizados por el servicio Cloud SIEM de Datadog.

## Monitorización Synthetic

* Un **test de API** es una solicitud HTTP o HTTPS a través de una única URL. Datadog cobra por cada diez mil tests de API ejecutados al servicio de monitorización Synthetic de Datadog.
* Un **test de navegador** permite simular una secuencia de comandos de acciones de usuario en una aplicación web utilizando un navegador web virtualizado. Datadog cobra por cada mil tests de navegador ejecutados al servicio de monitorización Synthetic
 de Datadog.

## Network Performance Monitoring

* Datadog registra una vez por hora el número de hosts **Network Performance Monitoring** (NPM) que estás monitorizando de forma simultánea con el servicio NPM de Datadog.
  * Estas mediciones horarias se ordenan de mayor a menor al final del mes, y Datadog cobra en función de la novena medición más alta. El mes de febrero es una excepción y Datadog cobra en función de la octava medición más alta.
* Además, Datadog mide mensualmente el número total de flujos utilizados por todos los hosts NPM. Un **flujo** es un registro del tráfico enviado y recibido entre un origen (IP:Puerto) y un destino (IP:Puerto), medido en un periodo de tiempo de cinco minutos.

## Real User Monitoring

* Una **sesión** es un recorrido del usuario en tu aplicación web. Expira tras 15 minutos de inactividad o 4 horas de actividad continua.

* Datadog recopila todas las páginas visitadas por tus usuarios finales junto con la telemetría relevante: carga de recursos (XHRs, imágenes, archivos CSS, scripts JS, etc.), errores de frontend, y tareas largas. Todo estos elementos se incluyen en la sesión del usuario. Datadog cobra por cada mil (1000) sesiones ingeridas en el servicio Real User Monitoring (RUM) de Datadog.

## Continuous Profiler

* Datadog registra una vez por hora el número de hosts únicos de Continuous Profiler que estás monitorizando de forma simultánea con el servicio Continuous Profiler de Datadog.
  * Estas mediciones horarias se ordenan de mayor a menor al final del mes, y Datadog cobra en función de la novena medición más alta. El mes de febrero es una excepción y Datadog cobra en función de la octava medición más alta.
  * Cada host incluye hasta cuatro contenedores perfilados de forma gratuita. Cada contenedor adicional cuesta 2 $.
    **Nota**: Esta cuota se acumula para todos los hosts. Si tienes un promedio de cuatro contenedores en todos tus hosts, no se te cobrará si en algún host tienes contenedores adicionales.
* Datadog mide el número total de contenedores que están siendo perfilados. Un contenedor es un entorno operativo autónomo que incluye software de aplicación y bibliotecas y configuraciones del sistema operativo limitadas. Una vez cada cinco minutos, Datadog registra el número de contenedores únicos que estás monitorizando en el servicio Continuous Profiler de Datadog. Cada mes, Datadog factura en función del número de horas que dedica a la monitorización de tus contenedores, calculado de forma proporcional. Para Continuous Profiler, Datadog solo contabiliza aquellos contenedores que ejecutan el servicio Continuous Profiler en el recuento total de contenedores monitorizados.

## Incident Management

* Datadog hace un seguimiento del número de usuarios activos mensuales que participan en la gestión y respuesta de incidencias.
 * Un **usuario activo** solo se contabiliza si aporta comentarios o señales (gráficos, enlaces, etc.) en una incidencia. No se tienen en cuenta los usuarios que solo abren o cierran una incidencia, ni los que solo la visualizan. Además, no se trata de entradas con nombre, por lo que no es necesario determinar qué usuarios concretos tienen acceso.

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