---
aliases:
- /es/developers/faq/how-can-i-submit-a-custom-status-check
- /es/developers/service_checks/visualize-your-service-check-in-the-datadog-ui
- /es/guides/services_checks/
- /es/monitors/guide/visualize-your-service-check-in-the-datadog-ui
kind: Documentación
title: Check de servicio
---

## Información general

Los checks de servicios permiten caracterizar el estado de un servicio para monitorizarlo en Datadog. Los checks de servicios monitorizan el estado ascendente o descendente de un servicio específico. Recibes una alerta cada vez que el Agent de monitorización no consigue conectarse a ese servicio una cantidad especificada de checks consecutivos. Por ejemplo, puedes recibir una alerta cada vez que el Agent de monitorización de un host Redis notifica sobre tres intentos fallidos consecutivos de conexión a Redis y recopila métricas.

Los checks de servicios en el nivel de clúster ofrecen otra forma eficaz de monitorizar sistemas distribuidos o redundantes que pueden soportar algunos fallos. Utiliza estas alertas para las arquitecturas en las que hosts individuales ejecutan múltiples servicios, ya que pueden poner de manifiesto la degradación del servicio, incluso si los hosts que ejecutan ese servicio siguen estando disponibles (y aprobarían un check de estado en el nivel del host).

Puedes configurar la monitorización y una alerta para cuando se pierde un servicio crítico no redundante o para cuando un clúster está a punto de fallar debido a la pérdida generalizada de nodos. Otras alertas críticas podrían ser las caídas en el rendimiento de las solicitudes o un aumento en la latencia de las solicitudes.

Es posible que tengas que configurar un check de servicio si una integración no tiene uno de forma nativa o para un servicio interno del que quieres monitorizar los estados ascendente y descendente.

Para utilizar checks de servicios, primero tienes que configurar el check:

{{< whatsnext >}}
    {{< nextlink href="/developers/service_checks/agent_service_checks_submission" >}}Envía un check personalizado del Agent.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission" >}}Envía un check de servicio utilizando DogStatsD.{{< /nextlink >}}
    {{< nextlink href="/api/v1/service-checks/" >}}Envía un check de servicio a través de la API de Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

Una vez que el check de servicio esté enviando datos, consulta tu resumen de checks y configura dashboards, monitores y alertas:

## Visualizar tu check de servicio en Datadog

Los checks de servicios pueden visualizarse y utilizarse en 3 secciones de Datadog:

- [Resumen de checks][1]
- [Screenboards][2]
- [Monitor de checks de servicios][3]

### Resumen de checks

La página [Resumen de checks][1] enumera todos las checks informados en tu infraestructura en el último día. Selecciona un check para obtener información sobre su estado y sus etiquetas (tags).

{{< img src="developers/service_checks/check_summary.png" alt="Resumen de checks" >}}

### Screenboards

Puedes visualizar checks de servicios utilizando un widget **Check status** (Estado de checks) en un screenboard:

{{< img src="developers/service_checks/check_status_widget.png" alt="Widget **Check status** (Estado de checks)" >}}

Al hacer clic en el icono del widget **Check status** (Estado de checks), aparece la siguiente ventana emergente:

{{< img src="developers/service_checks/check_widget_config.png" alt="Configuración del widget de checks" >}}

En este formulario, puedes hacer lo siguiente:

- En **Check Name** (Nombre del check): puedes seleccionar el nombre de tu check de servicio.
- En **Reporting Timeframe** (Periodo de tiempo de informes): puedes seleccionar el periodo de tiempo en el que quieres agregar tu estado.
- En **Scoping** (Contexto): puedes seleccionar un único check o un clúster de estados de checks, informados por un único valor de etiqueta o una clave de etiqueta.
- En **Widget Title** (Título del widget): puedes definir el título de tu widget.

## Monitor de checks de servicios

Si no puedes representar gráficamente un check de servicio a lo largo del tiempo, como lo harías con las métricas, puedes monitorizarlo con un [monitor de checks de servicios][3].

{{< img src="developers/service_checks/service_check_monitor.png" alt="Monitor de checks" >}}

En este formulario, puedes:

- **Pick a service check** (Elegir un check de servicio): selecciona el nombre de estado del check que quieres monitorizar.
- **Pick monitor scope* (Elegir el contexto del monitor)*: selecciona el contexto para tu monitor (incluyendo/excluyendo etiquetas).
- **Set alert conditions** (Configurar condiciones de alerta): elige entre una simple alerta de check o una alerta de clúster.
- **Configure notifications and automations** (Configurar notificaciones y automatizaciones): elige a quién debe notificar este monitor y edita las notificaciones enviadas (para obtener más información, consulta las [notificaciones de Datadog][4]).
- **Define permissions and audit notifications** (Definir permisos y notificaciones de auditorías): edita los permisos de acceso de tu monitor y configura las notificaciones de auditorías.

Para obtener más información sobre la creación de un check de servicio, consulta [Monitor de checks de servicios][5].

[1]: https://app.datadoghq.com/check/summary
[2]: https://app.datadoghq.com/dashboard
[3]: https://app.datadoghq.com/monitors/create/custom
[4]: /es/monitors/notify/
[5]: /es/monitors/types/service_check/