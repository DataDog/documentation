---
aliases:
- /es/sensitive_data_scanner/investigate_sensitive_data_issues/
- /es/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
- /es/security/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
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
title: Investigar los hallazgos de datos confidenciales
---

## Información general

Sensitive Data Scanner de Datadog puede ayudar a evitar fugas de datos confidenciales y a limitar los riesgos de incumplimiento mediante la identificación, la clasificación y, opcionalmente, la redacción de los datos confidenciales. Cuando se encuentra un dato confidencial, pueden surgir las siguientes preguntas:

- ¿Qué datos confidenciales se han expuesto?
- ¿Cuál es la prioridad de la exposición de datos confidenciales?
- ¿Cuál es la gravedad del hallazgo en términos de difusión y volumen?
- ¿De dónde proceden los datos confidenciales?

La page (página) [Hallazgos][1] de Sensitive Data Scanner categoriza y prioriza los hallazgos de datos confidenciales para que puedas investigar, colaborar y documentar tus hallazgos y responder a esas preguntas.

{{< img src="sensitive_data_scanner/findings_20251014.png" alt="La page (página) Hallazgos en la que se muestra la información general de los datos confidenciales desglosados por prioridad" style="width:100%;" >}}

## Triaje de los datos confidenciales

Ve a la page (página) [Hallazgos][1] para ver todos los hallazgos de datos confidenciales en el período de tiempo seleccionado y empezar a investigarlos.

{{< tabs >}}
{{% tab "Datos de telemetría" %}}

En la pestaña **Sensitive Data Rule Findings** (Hallazgos de reglas de datos confidenciales), puedes filtrar tus hallazgos de datos confidenciales por estado de prioridad, estado de case (incidencia) y dominio.

Investigar un hallazgo:

1. Haz clic en el hallazgo de la lista.
2. En el panel de hallazgos, haz clic en **View Recent Changes** (Ver cambios recientes) para ir a [Audit Trail][3] y ver si hay algún cambio de configuración reciente que haya causado el hallazgo de datos confidenciales.
3. Utiliza las siguientes opciones para explorar diferentes tipos de datos que coincidan con la consulta:
   1. Para ver todos los logs relacionados con la consulta en el Explorer de logs, haz clic en **View All Logs** (Ver todos los logs).
   1. Para ver todas las traces (trazas) que coinciden con la consulta en Trace Explorer, haz clic en **View All APM Spans** (Ver todos los spans (tramos) de APM **.
   1. Para ver todos los eventos de RUM que coincidan con la consulta, haz clic en **View All RUM Events** (Ver todos los eventos de RUM).
   1. Para ver todos los eventos que coinciden con la consulta, haz clic en **View All Events** (Ver todos los eventos).
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/findings_panel_20251015.png" alt="El panel de hallazgos en el que se muestra un dato del explorador de tarjetas Visa" style="width:50%;">}}
4. En la sección **Blast Radius** (Radio de explosión):
   1. Mira los 10 principales servicios, hosts y entornos afectados por este hallazgo de datos confidenciales.
   1. Haz clic en un servicio para ver más información sobre él en **Software Catalog** (Catálogo de software).
   1. Haz clic en un host para ver más información sobre él en la page (página) Lista de infraestructuras.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="El panel de hallazgos en el que se muestran los 10 principales servicios afectados" style="width:50%;">}}

   Si deseas modificar la regla de exploración que se utilizó para detectar el hallazgo de datos confidenciales, haz clic en **Modify Rule** (Modificar la regla) en la parte superior del panel.

Además, también puedes:
- Utiliza [Case Management][1] para rastrear, clasificar e investigar el hallazgo, haz clic en **Create Case** (Crear case (incidencia)) en la parte superior del panel. Los cases (incidencias) asociados aparecerán en la page (página) de Hallazgos.
- Utiliza [Incident Management][2] para crear un incident (incidente), puedes añadir el hallazgo a un incident (incidente) existente o declarar un nuevo incident (incidente). Haz clic en el menú desplegable **Declare Incident** (Declarar un incident (incidente)) para añadir el hallazgo a un incident (incidente) existente. Haz clic en **Declare Incident** (Declarar un incident (incidente)) para declarar un nuevo incident (incidente).
- Utiliza [Audit Trail][3] para ver quién puede haber accedido a estos datos confidenciales en Datadog, **View in Audit Trail** (Ver en Audit Trail) en la sección **Users who accessed these events** (Usuarios que accedieron a estos eventos).

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="La page (página) de case (incidencia) en la que se muestra información acerca del hallazgo de seguridad, el cesionario y el creador del case (incidencia) y una escala de tiempo de eventos" style="width:60%;">}}

[1]: /es/incident_response/case_management/
[2]: /es/incident_response/incident_management/
[3]: /es/account_management/audit_trail

{{% /tab %}}
{{% tab "Cloud Storage" %}}

Haz clic en la pestaña **Datastores with Sensitive Data** (Almacenes de datos con datos confidenciales) para ver todos los hallazgos de datos confidenciales para Cloud Storage.

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
            1. Haz clic en **See remediation** (Ver corrección) para obtener más información sobre cómo solucionar el problema.
            1. En **More Actions** (Más acciones), puedes añadir un problema de Jira, ejecutar workflows (UI) / procesos (generic) o añadir un comentario.
        Para ejecutar un workflow (UI) / proceso (generic), selecciona **Run Workflow** (Ejecutar workflow (UI) / proceso (generic)) y, a continuación, en el explorador de workflows (UI) / procesos (generic), busca y selecciona un workflow (UI) / proceso (generic) para ejecutarlo. Consulta [Automatizar workflows (UI) / procesos (generic) de seguridad con la Workflow Automation (automatización de procesos)][1] para obtener más información.
          1. Haz clic en las distintas pestañas para ver el desglose de la gravedad, los logs relacionados y la escala de tiempo del hallazgo.

        {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/datastore_side_panel.png" alt="El panel lateral de hallazgos del almacén de datos en el que se muestra que los buckets S3 deben tener una configuración incorrecta de acceso público a bloques activado" style="width:90%;">}}

[1]: /es/security/cloud_security_management/review_remediate/workflows/

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/telemetry