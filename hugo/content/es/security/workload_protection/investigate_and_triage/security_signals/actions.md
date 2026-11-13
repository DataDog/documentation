---
description: Clasifique, escale, automatice y responda a una señal de Workload Protection
  desde el panel lateral de señales.
disable_toc: false
title: Clasifique y actúe sobre las señales de Security
---
Después de revisar una señal de Workload Protection, utilice la sección {{< ui >}}Next Steps{{< /ui >}} en el panel lateral de señales para clasificar, escalar, automatizar o responder a la amenaza.

Las señales de Workload Protection comparten los mismos flujos de trabajo de clasificación y respuesta que otras señales de Datadog Security. Para obtener una descripción general de las señales de Security en Cloud SIEM, App and API Protection y Workload Protection, consulte [Detection rules][1] y el [Security Signals Explorer][2] unificado.

## Clasifique una señal {#triage-a-signal}

Puede clasificar una señal asignándola a un usuario para una investigación adicional. El usuario asignado puede entonces realizar un seguimiento de su revisión actualizando el estado de la señal.

<div class="alert alert-info">Para modificar las señales de Security, debe tener el <code>security_monitoring_signals_write</code> permiso. Consulte <a href="/account_management/rbac/permissions/#cloud-security-platform">Control de acceso basado en roles</a> para obtener más información sobre los roles predeterminados de Datadog y los permisos granulares de control de acceso basado en roles disponibles para Workload Protection.</div>

1. En el [Signals Explorer][3], seleccione una señal de Security.
2. En la sección {{< ui >}}Triage{{< /ui >}}, haga clic en {{< ui >}}Assign Signal{{< /ui >}} y luego seleccione un usuario.
3. Para actualizar el estado de la señal de Security, haga clic en el menú desplegable de estado de clasificación y seleccione un estado. El estado predeterminado es {{< ui >}}Open{{< /ui >}}.
    - {{< ui >}}Open{{< /ui >}}: La señal aún no se ha resuelto.
    - {{< ui >}}Under Review{{< /ui >}}: La señal se está investigando activamente. Desde el estado {{< ui >}}Under Review{{< /ui >}}, puede cambiar la señal a {{< ui >}}Archived{{< /ui >}} o {{< ui >}}Open{{< /ui >}} según sea necesario.
    - {{< ui >}}Archived{{< /ui >}}: La detección que causó la señal se ha resuelto. Desde el estado {{< ui >}}Archived{{< /ui >}}, puede volver a cambiar la señal a {{< ui >}}Open{{< /ui >}} si se encuentra dentro de los 30 días posteriores a la detección original de la señal.

## Crear una incidencia {#create-a-case}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Case Management no es compatible con su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Use [Case Management][4] para realizar el seguimiento, la clasificación y la investigación de señales de Security.

1. En el [Explorador de señales][3], seleccione una señal de Security.
2. En el panel lateral de la señal, debajo de {{< ui >}}Next Steps{{< /ui >}}, busque la sección {{< ui >}}Respond{{< /ui >}} y haga clic en {{< ui >}}Create Security Case{{< /ui >}}. Para agregar la señal a una incidencia existente, abra el menú desplegable junto a {{< ui >}}Create Security Case{{< /ui >}} y seleccione {{< ui >}}Add to existing Security Case{{< /ui >}}.
3. Ingrese un título y una descripción opcional.
4. Haga clic en {{< ui >}}Create Case{{< /ui >}}.

## Declarar un incidente {#declare-an-incident}

Use [Incident Management][5] para crear un incidente para una señal de Security.

1. En el [Signals Explorer][3], seleccione una señal de Security.
2. En la sección {{< ui >}}Respond{{< /ui >}} del panel lateral de la señal, expanda {{< ui >}}More actions{{< /ui >}}.
3. Debajo de {{< ui >}}Escalate{{< /ui >}}, realice una de las siguientes acciones:
    - Para crear un incidente, haga clic en {{< ui >}}Declare Incident{{< /ui >}}. Configure el incidente especificando detalles como el nivel de gravedad y el comandante del incidente, luego haga clic en {{< ui >}}Declare Incident{{< /ui >}}.
    - Para agregar la señal a un incidente existente, abra el menú desplegable junto a {{< ui >}}Declare Incident{{< /ui >}}, seleccione un incidente y haga clic en {{< ui >}}Confirm{{< /ui >}}.

## Ejecutar un flujo de trabajo {#run-a-workflow}

Use [Workflow Automation][7] para activar manualmente un flujo de trabajo para una señal de Security. Consulte [Trigger a workflow from a security signal][6] para obtener más información.

1. En el [Signals Explorer][3], seleccione una señal de Security.
2. En la sección {{< ui >}}Respond{{< /ui >}} del panel lateral de señales, haga clic en {{< ui >}}Run Workflow{{< /ui >}}.
3. En el modal de flujo de trabajo, seleccione el flujo de trabajo que desea ejecutar. El flujo de trabajo debe tener un activador de seguridad para aparecer en la lista. Dependiendo del flujo de trabajo, es posible que deba ingresar parámetros de entrada adicionales.
4. Haga clic en {{< ui >}}Run Workflow{{< /ui >}}.

Alternativamente, haga clic en la pestaña {{< ui >}}Workflows{{< /ui >}} en el panel lateral de señales para ver qué flujos de trabajo se activaron para la señal y los flujos de trabajo sugeridos para ejecutar.

## Terminar contenedores o procesos {#kill-containers-or-processes}

Desde el panel lateral de señales, puede terminar un proceso o contenedor malicioso directamente. En {{< ui >}}Respond{{< /ui >}}, haga clic en {{< ui >}}Kill Containers or Processes{{< /ui >}}.

Esta acción requiere que la aplicación forzosa esté habilitada en el Datadog Agent. El Agente termina el proceso objetivo o todos los procesos en un contenedor comprometido, dependiendo del contexto configurado. Consulte [Manual response][8] para conocer los requisitos, la configuración y los estados de las acciones.

## Aislamiento de red {#network-isolation}

Desde el panel lateral de señales, puede aislar un proceso o contenedor comprometido de la red. En {{< ui >}}Respond{{< /ui >}}, haga clic en {{< ui >}}Network Isolation{{< /ui >}} para bloquear el tráfico de red de la carga de trabajo afectada mediante un filtro basado en eBPF.

El aislamiento de red requiere que la aplicación forzosa esté habilitada en el Agente, junto con las sondas de red que el Agente habilita de forma predeterminada. Consulte [Manual response][8] para conocer los requisitos y las opciones de aplicación forzosa disponibles.

[1]: /es/security/detection_rules/
[2]: https://app.datadoghq.com/security/signals
[3]: https://app.datadoghq.com/security/workload-protection/signals
[4]: /es/incident_response/work_management/
[5]: /es/incident_response/incident_management/
[6]: /es/security/cloud_security_management/workflows
[7]: /es/service_management/workflows
[8]: /es/security/workload_protection/respond_and_report/#response