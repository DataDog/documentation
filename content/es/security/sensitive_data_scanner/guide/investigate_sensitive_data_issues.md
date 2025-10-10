---
aliases:
- /es/sensitive_data_scanner/investigate_sensitive_data_issues/
- /es/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
further_reading:
- link: sensitive_data_scanner/setup/telemetry_data/
  tag: Documentación
  text: Configurar Sensitive Data Scanner para datos de telemetría
- link: sensitive_data_scanner/setup/cloud_storage/
  tag: Documentación
  text: Configurar Sensitive Data Scanner para el almacenamiento en la nube
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: Blog
  text: Descubre, clasifica y corrige los problemas de datos confidenciales a escala
    con Sensitive Data Scanner.
title: Investigar problemas de datos confidenciales
---

## Información general

Sensitive Data Scanner de Datadog puede ayudar a evitar fugas de datos confidenciales y limitar los riesgos de incumplimiento mediante la identificación, la clasificación y, opcionalmente, la redacción de datos confidenciales. Cuando se detecta un problema de datos confidenciales, pueden surgir las siguientes preguntas:

- ¿Qué datos confidenciales se han expuesto?
- ¿Cuál es la prioridad de la exposición de datos confidenciales?
- ¿Cuál es la gravedad del problema en términos de difusión y volumen?
- ¿De dónde proceden los datos confidenciales?

La página [Resumen][1] de Sensitive Data Scanner clasifica y prioriza los problemas de datos confidenciales para que puedas investigar, colaborar y documentar tus hallazgos, y responder a esas preguntas.

{{< img src="sensitive_data_scanner/sds_summary_20250203.png" alt="Page (página) de resumen en que se muestra información general de problemas de datos confidenciales desglosados por prioridad" style="width:100%;" >}}

## Analizar los problemas relacionados con datos confidenciales

Ve a la Page (página) [Resumen][1] para ver todos los problemas de datos confidenciales dentro del periodo de tiempo seleccionado y empezar a investigar los problemas.

{{< tabs >}}
{{% tab "Datos de telemetría" %}}

En la sección **Sensitive Data Issue** (Problema de datos confidenciales), filtra por un nivel de prioridad para ver solo los problemas con ese nivel de prioridad en la sección **Issues Overview** (Información general de problemas). En la sección **Cases** (Casos), filtra por un estado de caso para ver los problemas asociados a los casos con ese estado en la sección **Issues Overview"" (Información general de problemas).

Para investigar un problema:

1. Haz clic en el problema en **Issues Overview** (Información general de problemas).
2. En el panel de problemas, haz clic en **View Recent Changes** (Ver cambios recientes) para ir a [Audit Trail][3] y ver si hay algún cambio reciente en la configuración que haya causado el problema de los datos confidenciales.
3. Utiliza las siguientes opciones para explorar diferentes tipos de datos que coincidan con la consulta:
    a. Para ver todos los logs relacionados con la consulta en el Explorer de logs, haz clic en **View All Logs** (Ver todos los logs).<br>
    b. Para ver todas las traces (trazas) que coincidan con la consulta en Trace Explorer, haz clic en **View All APM Spans** (Ver todos los spans (tramos) de APM).<br>
    c. Para ver todos los eventos de RUM que coincidan con la consulta, haz clic en **View All RUM Events** (Ver todos los eventos de RUM).<br>
    d. Para ver todos los eventos que coincidan con la consulta, haz clic en **View All Events"" (Ver todos los eventos).
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/issues_panel_02_01_2024.png" alt="El panel de problemas que muestra un problema crítico del Scanner con la tarjeta Visa" style="width:50%;">}}
4. En la sección **Blast Radius** (Radio de explosión):<br>
    a. Visualiza los 10 principales servicios, hosts y entornos afectados por este problema de datos confidenciales.<br>
    b. Haz clic en un servicio para ver más información sobre servicio en el **Software Catalog**.<br>
    c. Haz clic en un host para ver más información sobre el host en la página Infrastructure List (Lista de infraestructura).
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="El panel de problemas que muestra los 10 principales servicios afectados" style="width:50%;">}}
Si deseas modificar la regla de escaneo que se utilizó para detectar el problema de datos confidenciales, haz clic en **Modify Rule** (Modificar regla) en la parte superior del panel.

Además, también puedes:
- Utiliza [Case Management][1] para realizar el rastreo, el triaje y la investigación del problema, haz clic en **Create Case** (Crear case (incidencia)) en la parte superior del panel. Los cases (incidencias) asociados aparecen en la page (página) Resumen.
- Utiliza [Incident Management][2] para crear un incident (incidente), puedes añadir el problema a un incident (incidente) existente o declarar un nuevo incident (incidente). Haz clic en el menú desplegable **Declare Incident** (Declarar incident (incidente)) para añadir el problema a un incident (incidente) existente. Haz clic en **Declare Incident** para declarar un nuevo incident (incidente).
- Utiliza [Audit Trail][3] para ver quién puede haber accedido a estos datos confidenciales en Datadog, **View in Audit Trail** (Ver en Audit Trail) en la sección **Users who accessed these events** (Usuarios que accedieron a estos eventos).

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="La page (página) del case (incidencia) que muestra la información sobre el problema de seguridad, el encargado y el creador del case (incidencia) y una línea temporal de los eventos" style="width:60%;">}}

[1]: /es/service_management/case_management/
[2]: /es/service_management/incident_management/
[3]: /es/account_management/audit_trail

{{% /tab %}}
{{% tab "Cloud Storage" %}}

Haz clic en la pestaña **Datastores with Sensitive Data** (Almacenes de datos con datos confidenciales) para ver todos los problemas de datos confidenciales para Cloud Storage.

En la **xxx Datastores with Sensitive section** (sección Almacenes de datos con datos confidenciales), haz clic en cualquiera de los menús desplegables para filtrar los almacenes de datos en función del tipo de datos confidenciales, cuenta, región, equipo, etc.

Para investigar un almacén de datos:

1. Haz clic en un almacén de datos.
1. Puede ver los archivos en los que se han encontrado datos confidenciales y, a continuación, hacer clic en un archivo para inspeccionarlo en AWS.
  Datadog recomienda hacer lo siguiente:
    - Revisa algunos archivos para hacerte una idea de la precisión de la clasificación.
    - Ponte en contacto con el propietario del equipo o del servicio que aparece en el panel lateral para confirmar si los datos confidenciales deben estar en el bucket.
      - Si no debe estar en el bucket, elimina los archivos o muévelos a un bucket apropiado.
      - Si debe estar en el bucket, completa los siguientes steps (UI) / pasos (generic) para mejorar tu postura de seguridad:
        1. Haz clic en la pestaña **Security** (Seguridad) en el panel lateral y revisa la sección **Misconfiguratiions** (Errores de configuración).
        1. Haz clic en un error de configuración para ver los detalles en Cloud Security.
        1. En la sección **Next Steps** (Siguientes pasos):
            1. En **Triage** (Triaje), haz clic en el menú desplegable para cambiar el estado de triaje de la señal. El estado predeterminado es `OPEN`.
            1. Haz clic en **Assign Signal** (Asignar señal) para asignarte una señal a ti mismo o a otro usuario de Datadog.
            1. Haz clic en **See remediation** (Ver solución) para obtener más información sobre cómo solucionar el problema.
            1. En **More Actions** (Más acciones), puedes añadir un problema de Jira, ejecutar workflows (UI) / procesos (generic) o añadir un comentario.
        Para ejecutar un workflow (UI) / proceso (generic), selecciona **Run Workflow** (Ejecutar workflow (UI) / proceso (generic)) y, a continuación, en el explorador de workflows (UI) / procesos (generic), busca y selecciona un workflow (UI) / proceso (generic) para ejecutarlo. Consulta [Automatizar workflows (UI) / procesos (generic) de seguridad con la Workflow Automation (automatización de procesos)][1] para obtener más información.
          1. Haz clic en las distintas pestañas para ver el desglose de la gravedad, los logs relacionados y la línea temporal del problema.

        {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/datastore_side_panel.png" alt="El panel lateral de problemas del almacén de datos que muestra los buckets S3 debe tener un error de configuración de Bloqueo del acceso público activado" style="width:90%;">}}

[1]: /es/security/cloud_security_management/review_remediate/workflows/

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary