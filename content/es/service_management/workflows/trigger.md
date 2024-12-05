---
algolia:
  tags:
  - flujo de trabajo
  - flujos de trabajo
  - automatización de flujos de trabajo
aliases:
- /es/workflows/trigger
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentación
  text: Empezando con la automatización de flujos de trabajo
- link: /service_management/workflows/access/#service-accounts/
  tag: Documentación
  text: Más información sobre cuentas de servicio para flujos de trabajo
- link: npm
  tag: Documentación
  text: Más información sobre la creación de un dashboard
- link: /security
  tag: Documentación
  text: Más información sobre señales de seguridad
- link: monitores
  tag: Documentación
  text: Más información sobre monitores
- link: /security/cloud_security_management/workflows
  tag: Documentación
  text: Automatiza flujos de trabajo de seguridad con la automatización de flujos
    de trabajo
title: Activar un flujo de trabajo
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La automatización de flujos de trabajo no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Puedes activar un flujo de trabajo manual o automáticamente.

Un flujo de trabajo puede ejecutarse con la identidad del usuario propietario o con la identidad de una cuenta de servicio asociada al flujo de trabajo. Para obtener más información sobre las cuentas de servicio, consulta las [cuentas de servicio para la automatización de flujos de trabajo][1].

## Activar un flujo de trabajo manualmente

Para activar un flujo de trabajo manualmente:
1. En la página del flujo de trabajo, haz clic en **Run** (Ejecutar).
2. Introduce los valores de las variables de activación existentes.
3. Cuando el flujo de trabajo esté listo para ser ejecutado, haz clic en **Save & Run** (Guardar y ejecutar).

## Activar un flujo de trabajo desde un dashboard

Para activar un flujo de trabajo a partir de un dashboard, añade el widget **Run Workflow** (Ejecutar flujo de trabajo):
1. En tu dashboard, haz clic en **Add Widget** (Añadir widget).
2. Busca `workflows` y añade el widget **Run Workflow** (Ejecutar flujo de trabajo).
3. En **Select the workflow** (Seleccionar el flujo de trabajo), busca tu flujo de trabajo en el menú desplegable.
4. Asigna variables de plantilla de dashboard a los parámetros de entrada del flujo de trabajo. Esto permite que los valores de las variables de plantilla de tu dashboard se asignen directamente a los parámetros de entrada cuando ejecutes el flujo de trabajo.
5. Introduce un título para el widget y haz clic en **Save** (Guardar).

{{< img src="service_management/workflows/trigger-from-dashboard2.png" alt="Haz clic en Run Workflow (Ejecutar flujo de trabajo) para activar un flujo de trabajo a partir de un widget de dashboard." >}}

Para ejecutar el flujo de trabajo:
1. Haz clic en **Run Workflow** (Ejecutar flujo de trabajo) en el widget de tu dashboard.
2. En **Execution Parameters** (Parámetros de ejecución), cualquier variable de plantilla que hayas asignado a las entradas del flujo de trabajo se rellena automáticamente. Introduce los valores de los parámetros de ejecución no asignados o edita los valores existentes, si es necesario.
3 Haz clic en **Run** (Ejecutar) para ejecutar el flujo de trabajo.

## Activar un flujo de trabajo a partir de un flujo de trabajo

Puedes activar un flujo de trabajo secundario a partir de otro flujo de trabajo utilizando la acción **Trigger Workflow** (Activar flujo de trabajo). Por ejemplo, si tienes una serie compleja de pasos que necesitas reutilizar en varios flujos de trabajo, no hay necesidad de recrear esos pasos para todos tus flujos de trabajo. En su lugar, añade los pasos a un nuevo flujo de trabajo y actívalo en tus otros flujos de trabajo, utilizando la acción Trigger Workflow (Activar flujo de trabajo).

<div class="alert alert-info">Para la facturación, la activación de un flujo de trabajo secundario se registra como la ejecución de un nuevo flujo de trabajo.</div>

Si el flujo de trabajo secundario tiene [parámetros de entrada][5], estos aparecen como campos obligatorios en la acción Trigger Workflow (Activar flujo de trabajo). En el ejemplo siguiente, el parámetro de entrada **service_name** es obligatorio porque `service_name` está configurado como parámetro de entrada en el flujo de trabajo secundario.

{{< img src="service_management/workflows/trigger-workflow-step.png" alt="El parámetro de entrada service_name es necesario para el flujo de trabajo secundario" style="width:100%;" >}}

## Activar un flujo de trabajo a partir de un monitor

Para activar un flujo de trabajo a partir de un monitor:
1. En el lienzo del flujo de trabajo, haz clic en **Add an Automated Trigger** (Añadir un activador automatizado) y selecciona **@mention**.
1. Guarda tu flujo de trabajo.
1. Ve a la página [**Monitors** (Monitores)][2] en Datadog.
1. Busca el monitor que quieres utilizar para activar el flujo de trabajo y edítalo o crea un nuevo monitor.
1. En la sección de mensajes, añade el nombre completo de la mención del flujo de trabajo:
   - El nombre de la mención debe empezar por `@workflow-`. Por ejemplo, `@workflow-my-workflow`
   - Para pasar variables de activación al flujo de trabajo, utiliza una lista separada por comas con la sintaxis `@workflow-name(key=value, key=value)`. Por ejemplo `@workflow-my-workflow(name="Bits", alert_threshold=threshold)`
1. Guarda el monitor.

{{< img src="service_management/workflows/monitor-trigger.png" alt="Añadir un activador de monitor a la sección de mensajes de un monitor" >}}

Cada vez que se alcanza el umbral del monitor, este activa la ejecución de un flujo de trabajo.

<div class="alert alert-info">Los flujos de trabajo programados y activados no se ejecutarán automáticamente hasta que los hayas publicado. Para publicar el flujo de trabajo, haz clic en <strong>Publish</strong> (Publicar) en la página del flujo de trabajo. Los flujos de trabajo publicados acumulan costes en función de las ejecuciones de flujos de trabajo. Para obtener más información, consulta la <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">página de precios de Datadog</a>.</div>

### Prueba de un activador de monitor 

Puedes probar un activador de monitor durante la creación del flujo de trabajo. Al probar un monitor se genera un fragmento que puedes pegar en la ventana de notificaciones de tu monitor para activar el flujo de trabajo.

Para probar un activador de monitor:
1. Selecciona la acción de activación de monitores en tu flujo de trabajo.
1. Haz clic en **Test from Monitor** (Prueba desde monitor).
1. Si tu monitor pasa entradas al flujo de trabajo, introduce un valor de prueba en **Workflow Inputs* (Entradas del flujo de trabajo).
1. Selecciona un monitor para realizar la prueba.
1. Selecciona un estado de monitor.
1. Haz clic en **Run From Monitor* (Ejecutar desde monitor).

{{< img src="service_management/workflows/test-monitor.mp4" alt="Probar tu monitor con el botón Test from Monitor (Prueba desde monitor)" video="true" >}}

## Activar un flujo de trabajo a partir de una señal de seguridad

Puedes activar un flujo de trabajo automáticamente para cualquier señal de seguridad o activarlo manualmente desde un panel de señales de seguridad de Cloud SIEM.

### Activar automáticamente un flujo de trabajo a partir de las reglas sobre notificaciones de señales de seguridad

Puedes configurar un flujo de trabajo para que se active cada vez que se activa una regla sobre notificaciones de señales de seguridad.

Para activar un flujo de trabajo a partir de una regla sobre notificaciones:
1. En el lienzo del flujo de trabajo, haz clic en **Add an Automated Trigger** (Añadir un activador automatizado) y selecciona **@mention**.
1. Junto a **@workflow-**, introduce un nombre de mención para el activador. El nombre de la mención debe ser único.
1. Guarda tu flujo de trabajo.
1. En la página de [configuración][3], busca la regla sobre notificaciones que quieres utilizar para activar tu flujo de trabajo, o crea una nueva regla.
1. En la sección **Recipient** (Destinatario), añade el nombre completo de la mención del flujo de trabajo. Por ejemplo, `@workflow-my-workflow`.
1. Añade un nombre de notificación único.
1. Haz clic en **Save and Activate** (Guardar y activar).

{{< img src="service_management/workflows/notificación-rule-trigger2.png" alt="Añadir el nombre del flujo de trabajo a la sección del destinatario de una regla sobre notificaciones" >}}

Cada vez que se activa la regla sobre notificaciones, se ejecuta un flujo de trabajo.

<div class="alert alert-info">Los flujos de trabajo programados y activados no se ejecutarán automáticamente hasta que los hayas publicado. Para publicar el flujo de trabajo, haz clic en <strong>Publish</strong> (Publicar), en la página del flujo de trabajo. Los flujos de trabajo publicados acumulan costes en función de las ejecuciones de flujos de trabajo. Para obtener más información, consulta la <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">página de precios de Datadog</a>.</div>

### Activar manualmente un flujo de trabajo a partir de las señales de seguridad de Cloud SIEM

Puedes iniciar manualmente un flujo de trabajo a partir de un panel de señales de seguridad de Cloud SIEM.

1. Haz clic en **Run Workflow** (Ejecutar flujo de trabajo), en la parte superior del panel de señales de seguridad.
1. En el modal de búsqueda, introduce el nombre del flujo de trabajo que quieres ejecutar. Selecciona el flujo de trabajo. 
1. Si tu flujo de trabajo requiere parámetros de entrada, introduce los valores necesarios. Puedes copiar los valores del objeto de señal JSON que se muestra junto a los parámetros de entrada y pegarlos en los campos de parámetros.
1. Haz clic en **Run** (Ejecutar).
1. Puedes ver el estado de ejecución del flujo de trabajo en la sección **Workflow** (Flujo de trabajo) de las señales de seguridad.

Para ver ejemplos adicionales de flujos de trabajo de seguridad que puedes automatizar, consulta [Automate Security Workflows with Workflow Automation "Automatizar flujos de trabajo de seguridad con la automatización de flujos de trabajo][4].

## Activar un flujo de trabajo a partir de incidentes

Para activar un flujo de trabajo a partir de incidentes, crea una regla de notificación de incidentes:
1. Crea un flujo de trabajo con un activador **Monitor, Incident, or Security signal (Monitor, Incidente o Señal de seguridad), o añada ese activador a un flujo de trabajo existente.
1. Haz clic en el activador en el lienzo del flujo de trabajo y copia el **identificador de mención**.
1. En la página de [configuración de Incidentes][6], selecciona **Rules** (Reglas).
1. Haga clic en **New Rule** (Nueva regla).
1. Configurar a **Severity** (Gravedad), **Service** (Servicio) y **Other attributes** (Otros atributos) para tu regla de notificación.
1. En **Notify** (Notificar), pega el identificador de flujo de trabajo que has copiado anteriormente.
1. Introduce un **Template** (Plantilla) y configura los parámetros de **Renotify** (Volver a notificar) para la regla de notificación.
1. Haz clic en **Save** (Guardar).

## Activar un flujo de trabajo en un cronograma

Para programar la ejecución de un flujo de trabajo:
1. En el lienzo del flujo de trabajo, haz clic en **Add an Automated Trigger** (Añadir un activador automatizado) y selecciona **Schedule** (Cronograma).
1. Haz clic en **Create** (Crear) para crear una cuenta de servicio. Para obtener más información, consulta [Uso de una cuenta de servicio][1].
1. Introduce una hora y una frecuencia para la ejecución.
1. (Opcional) Introduce una descripción para el flujo de trabajo en el campo **Memo**.
1. Haz clic en **Save** (Guardar).

<div class="alert alert-info">Los flujos de trabajo programados y activados no se ejecutarán automáticamente hasta que los hayas publicado. Para publicar el flujo de trabajo, haz clic en <strong>Publish</strong> (Publicar), en la página del flujo de trabajo. Los flujos de trabajo publicados acumulan costes, en función de las ejecuciones de flujos de trabajo. Para obtener más información, consulta la <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">página de precios de Datadog</a>.</div>

## Historial de ejecuciones

Después de activar un flujo de trabajo, la página del flujo de trabajo cambia al **Run History** (Historial de ejecuciones) del flujo de trabajo. Haz clic en **Configuration** (Configuración) o **Historial de ejecución**, en la parte superior izquierda, para cambiar entre las vistas de configuración e historial de ejecuciones.

Utiliza el historial de ejecuciones para ver el progreso de un flujo de trabajo activado o depurar un paso con errores. Al hacer clic en un paso con errores, se muestran las entradas, las salidas y el contexto de ejecución del paso, así como el mensaje de error asociado. El siguiente ejemplo muestra un paso con errores _GitHub pull request status_. El mensaje de error muestra que el paso falló debido a la falta de permisos:

{{< img src="service_management/workflows/failed-step4.png" alt="Flujo de trabajo con un paso con errores" >}}

El historial de ejecución inicial de un flujo de trabajo proporciona un panel con la lista de las ejecuciones de flujos de trabajo anteriores, donde se indica si cada ejecución ha tenido éxito o ha fracasado. Los errores incluyen un enlace al paso del flujo de trabajo con fallas. Haz clic en la ejecución de un flujo de trabajo de la lista para inspeccionarla. Puedes volver al historial de ejecuciones inicial en cualquier momento haciendo clic en cualquier parte del lienzo del flujo de trabajo.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/workflows/access/#use-a-service-account
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/notification-rules
[4]: /es/security/cloud_security_management/workflows
[5]: /es/service_management/workflows/build/#input-parameters
[6]: https://app.datadoghq.com/incidents/settings#Rules