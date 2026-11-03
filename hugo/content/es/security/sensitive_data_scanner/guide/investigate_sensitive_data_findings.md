---
aliases:
- /es/sensitive_data_scanner/investigate_sensitive_data_issues/
- /es/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
- /es/security/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
description: Realice el triaje e investigue los hallazgos de Sensitive Data Scanner
  en la página de Hallazgos, incluyendo el análisis de Blast Radius, los servicios
  afectados, Case Management y la integración con Incident Management.
further_reading:
- link: sensitive_data_scanner/setup/telemetry_data/
  tag: Documentación
  text: Configure Sensitive Data Scanner para Datos de Telemetría
- link: sensitive_data_scanner/setup/cloud_storage/
  tag: Documentación
  text: Configure Sensitive Data Scanner para Almacenamiento en la Nube
- link: https://www.datadoghq.com/blog/scaling-sensitive-data-scanner/
  tag: Blog
  text: Descubra, clasifique y remedie problemas de datos confidenciales a escala
    con Sensitive Data Scanner
title: Investigue los hallazgos de Sensitive Data Scanner
---
## Descripción general {#overview}

Sensitive Data Scanner de Datadog puede ayudar a prevenir fugas de datos sensibles y limitar los riesgos de incumplimiento al identificar, clasificar y, opcionalmente, redactar datos sensibles. Cuando se encuentra un hallazgo de Sensitive Data Scanner, es posible que tenga las siguientes preguntas:

- ¿Qué datos sensibles han sido expuestos?
- ¿Cuál es la prioridad de la exposición de datos sensibles?
- ¿Qué tan grave es el hallazgo en términos de propagación y volumen?
- ¿De dónde provienen los datos sensibles?

La página de [Hallazgos][1] de Sensitive Data Scanner categoriza y prioriza los hallazgos de datos sensibles para que usted pueda investigar, colaborar y documentar sus hallazgos, y responder a esas preguntas.

{{< img src="sensitive_data_scanner/sds_findings_explorer.png" alt="Explorador de hallazgos de Sensitive Data Scanner agrupado por regla, con la US Passport Scanner rule expandida para mostrar hallazgos críticos, conteos de coincidencias y gráficos de tendencias semanales." style="width:100%;" >}}

## Realice el triaje de los hallazgos de datos sensibles {#triage-sensitive-data-findings}

Navegue a la página de [Hallazgos][1] para ver todos los hallazgos de datos sensibles dentro del marco de tiempo seleccionado y comience a investigarlos.

{{< tabs >}}
{{% tab "Registros" %}}

El explorador de hallazgos de registros es una experiencia actualizada para investigar hallazgos de registros. Si tiene al menos un hallazgo de registro, este explorador se abre de forma predeterminada. Los hallazgos de APM, RUM y Eventos no están disponibles en este explorador. Para ver esos hallazgos, haga clic en {{< ui >}}Go back{{< /ui >}} en el banner en la parte superior de la página.

Para investigar un hallazgo de registro:

1. Use {{< ui >}}Group by{{< /ui >}} para organizar los hallazgos por {{< ui >}}Rule{{< /ui >}}, {{< ui >}}Logs Pattern{{< /ui >}} o {{< ui >}}Service{{< /ui >}}. Para mostrar los hallazgos donde los datos sensibles están expuestos activamente, filtre por {{< ui >}}Leaking{{< /ui >}} en la faceta {{< ui >}}Match State{{< /ui >}}.
2. Haga clic en un hallazgo para abrir el panel de detalles.
3. En la parte superior del panel, verifique {{< ui >}}First Detected{{< /ui >}} y {{< ui >}}Last Detected{{< /ui >}} para comprender cuánto tiempo ha estado activa la exposición.
4. En la sección de resumen, revise {{< ui >}}Match State{{< /ui >}}, {{< ui >}}Service{{< /ui >}}, {{< ui >}}Environment{{< /ui >}} y {{< ui >}}Total matches{{< /ui >}} para comprender el alcance de la exposición.
5. Revise el {{< ui >}}Logs Pattern{{< /ui >}} para comprender el formato de la línea de registro donde se detectaron datos sensibles.
6. En la sección {{< ui >}}Example Logs{{< /ui >}}, revise hasta cinco ejemplos representativos de registros afectados. Cuando un registro de ejemplo caduca, se reemplaza por el siguiente evento coincidente. Haga clic en {{< ui >}}Show log{{< /ui >}} para expandir un ejemplo e inspeccionar su mensaje de registro, campos y atributos en línea. De forma predeterminada, los registros de ejemplo se almacenan durante 7 días y son accesibles para todos los usuarios con el permiso Data Scanner Read. Para almacenar estos registros representativos durante un período diferente, comuníquese con [Support][1].
7. Revise {{< ui >}}Matches Trend{{< /ui >}} para ver cómo ha cambiado el volumen de coincidencias durante la última semana. Utilice {{< ui >}}Related Access and Configuration Events{{< /ui >}} para verificar si los eventos de acceso recientes o los cambios en el grupo de escaneo o en la regla de escaneo coinciden con los cambios en el volumen de coincidencias.

Además, puede:
- Utilice {{< ui >}}Apply Targeted Obfuscation{{< /ui >}} para ofuscar futuras coincidencias de datos sensibles en nuevos registros para este hallazgo, o extienda la ofuscación a todo el servicio. Si la redacción ya está habilitada, utilice esta sección para verificar cómo se ofuscan los registros coincidentes.
- Utilice {{< ui >}}Tune Detection Logic{{< /ui >}} para editar las palabras clave de la regla de escaneo o aplicar supresiones para falsos positivos o datos con riesgo aceptado.
- Utilice {{< ui >}}Generate Code Fix{{< /ui >}} para iniciar una sesión de [Bits Code][2] que identifique el patrón de registro que causa la fuga y proponga una solución. Revise la solución y cree una solicitud de extracción directamente desde la sesión. El repositorio fuente ya debe estar integrado en Bits Code.

[1]: /es/help
[2]: /es/bits_ai/bits_code/

{{% /tab %}}
{{% tab "APM, RUM y Eventos" %}}

En la pestaña {{< ui >}}Sensitive Data Rule Findings{{< /ui >}}, puede filtrar sus hallazgos de datos sensibles por estado de prioridad, estado de la incidencia y dominio.

Para investigar un hallazgo:

1. Haga clic en el hallazgo en la lista.
2. En el panel de hallazgos, haga clic en {{< ui >}}View Recent Changes{{< /ui >}} para navegar a [Audit Trail][3] y ver si hubo cambios de configuración recientes que causaron el hallazgo de datos sensibles.
3. Utilice las siguientes opciones para explorar diferentes tipos de datos que coincidan con la consulta:
   1. Para ver todos los registros relacionados con la consulta en el Explorador de registros, haga clic en {{< ui >}}View All Logs{{< /ui >}}.
   1. Para ver todos los traces que coincidan con la consulta en Trace Explorer, haga clic en {{< ui >}}View All APM Spans{{< /ui >}}.
   1. Para ver todos los eventos de RUM que coincidan con la consulta, haga clic en {{< ui >}}View All RUM Events{{< /ui >}}.
   1. Para ver todos los eventos que coincidan con la consulta, haga clic en {{< ui >}}View All Events{{< /ui >}}.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/findings_panel_20251015.png" alt="El panel de hallazgos que muestra un hallazgo crítico del escáner de tarjetas Visa" style="width:50%;">}}
4. En la sección {{< ui >}}Blast Radius{{< /ui >}}:
   1. Vea los 10 principales servicios, servidores y entornos afectados por estos hallazgos de datos sensibles.
   1. Haga clic en un servicio para ver más información sobre el servicio en {{< ui >}}Catalog{{< /ui >}}.
   1. Haga clic en un servidor para ver más información sobre el servidor en la página de la lista de infraestructura.
  {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/blast_radius_02_01_2024.png" alt="El panel de hallazgos que muestra los 10 principales servicios afectados" style="width:50%;">}}

   Para modificar la Regla de escaneo que se utilizó para detectar el hallazgo de datos sensibles, haga clic en {{< ui >}}Modify Rule{{< /ui >}} en la parte superior del panel.

Además, también puede:
- Utilice [Case Management][1] para realizar el seguimiento, la clasificación y la investigación del hallazgo; haga clic en {{< ui >}}Create Case{{< /ui >}} en la parte superior del panel. Los incidentes asociados aparecen en la página de Hallazgos.
- Use [Incident Management][2] para crear un incidente; puede agregar el hallazgo a un incidente existente o declarar un nuevo incidente. Haga clic en el menú desplegable {{< ui >}}Declare Incident{{< /ui >}} para agregar el hallazgo a un incidente existente. Haga clic en {{< ui >}}Declare Incident{{< /ui >}} para declarar un nuevo incidente.
- Use [Audit Trail][3] para ver quién pudo haber accedido a estos datos sensibles dentro de Datadog, {{< ui >}}View in Audit Trail{{< /ui >}} en la sección {{< ui >}}Users who accessed these events{{< /ui >}}.

{{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/case_mgmt_02_01_2024.png" alt="La página de la incidencia que muestra información sobre el hallazgo de seguridad, la persona asignada y el creador de la incidencia, y una línea de tiempo de los eventos" style="width:60%;">}}

[1]: /es/incident_response/work_management/
[2]: /es/incident_response/incident_management/
[3]: /es/account_management/audit_trail

{{% /tab %}}
{{% tab "Almacenamiento en la nube" %}}

Haga clic en la pestaña {{< ui >}}Datastores with Sensitive Data{{< /ui >}} para ver todos los hallazgos de datos sensibles para Almacenamiento en la nube.

Para investigar un almacén de datos:

1. Haga clic en un almacén de datos.
1. Puede ver los archivos donde se encontraron datos sensibles y luego hacer clic en un archivo para inspeccionarlo en AWS.
  Datadog recomienda hacer lo siguiente:
    - Revise algunos archivos para tener una idea de la precisión de la clasificación.
    - Haga un seguimiento con el equipo o el propietario del servicio que aparece en el panel lateral para confirmar si los datos sensibles deben estar en el bucket.
      - Si no se supone que deben estar en el bucket, elimine los archivos o muévalos a un bucket apropiado.
      - Si se supone que deben estar en el bucket, complete los siguientes pasos para mejorar su postura de seguridad:
        1. Haga clic en la pestaña {{< ui >}}Security{{< /ui >}} en el panel lateral y revise la sección {{< ui >}}Misconfigurations{{< /ui >}}.
        1. Haga clic en una configuración incorrecta para ver los detalles en Cloud Security.
        1. En la sección {{< ui >}}Next Steps{{< /ui >}}:
            1. En {{< ui >}}Triage{{< /ui >}}, haga clic en el menú desplegable para cambiar el estado de clasificación de la señal. El estado predeterminado es `OPEN`.
            1. Haga clic en {{< ui >}}Assign Signal{{< /ui >}} para asignarse una señal a usted mismo o a otro usuario de Datadog.
            1. Haga clic en {{< ui >}}See remediation{{< /ui >}} para ver más información sobre cómo solucionar el hallazgo.
            1. En {{< ui >}}More Actions{{< /ui >}}, puede agregar un ticket de Jira, ejecutar flujos de trabajo o agregar un comentario.
        Para ejecutar un flujo de trabajo, seleccione {{< ui >}}Run Workflow{{< /ui >}} y luego, en el explorador de flujos de trabajo, busque y seleccione un flujo de trabajo para ejecutar. Consulte [Automate Security Workflows with Workflow Automation][1] para obtener más información.
          1. Haga clic en las diferentes pestañas para ver el desglose de gravedad, los registros relacionados y la línea de tiempo del hallazgo.

        {{< img src="sensitive_data_scanner/investigate_sensitive_data_issues/datastore_side_panel.png" alt="El panel lateral de hallazgos del almacén de datos que muestra los buckets de S3 debería tener habilitada la misconfiguración de Block Public Access." style="width:90%;">}}

[1]: /es/security/cloud_security_management/review_remediate/workflows/

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/telemetry