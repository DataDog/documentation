---
aliases:
- /es/security/cloud_security_management/review_remediate/jira
description: Integraciones de tickets de Security
further_reading:
- link: /security/assignee_management/
  tag: Documentación
  text: Gestión de asignados
- link: /incident_response/work_management/
  tag: Documentación
  text: Work Management
- link: /api/latest/security-monitoring/#create-cases-for-security-findings
  tag: API
  text: API de integración de tickets
- link: https://www.datadoghq.com/blog/work-management/
  tag: Blog
  text: Centralice el trabajo humano y agente con Datadog Work Management
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
site_support_id: case_management
title: Integrations de tickets
---
{{< product-availability >}}

Puede usar [Datadog Work Management][1] para gestionar tickets en herramientas de terceros como [Jira][2], [ServiceNow][21] y [Linear][23]. Para obtener más detalles, consulte [Work Management integration with third-party ticketing tools][3].

Esta página trata sobre el uso de Datadog Security con Datadog Work Management para la gestión de tickets.

Para asignar un usuario de Datadog a un hallazgo sin crear un ticket, consulte [Assignee Management][30].


## Work Management y productos de seguridad {#work-management-and-security-products}

Work Management es compatible con todos los productos de seguridad que utilizan señales o hallazgos:

- Code Security (en [Findings][5])
- Cloud Security (en [Findings][11])
- Cloud SIEM (en [Signals][4])
- App and API Protection (en [Signals][6] y [Findings][12])
- Workload Protection (en [Signals][7] y [Findings][13])

Abra cualquier señal o hallazgo en estos productos o realice una selección masiva de hallazgos en los exploradores, y use el botón {{< ui >}}Create Ticket{{< /ui >}} para crear una incidencia en Datadog.


## Sincronización bidireccional de tickets {#bidirectional-ticket-syncing}

La sincronización bidireccional le permite actualizar tickets automáticamente cuando ocurren cambios en Datadog, y actualizar cierta información de Datadog cuando ocurren cambios en su herramienta de tickets.

### Productos compatibles {#supported-products}

La sincronización bidireccional es compatible con las siguientes categorías de hallazgos de Code Security y Cloud Security:

- Bibliotecas (SCA)
- Código estático (SAST)
- Código en tiempo de ejecución (IAST)
- Secret Scanning 
- Infraestructura como código (IaC)
- Configuraciones incorrectas
- Riesgos de identidad
- Vulnerabilidades de servidor y contenedor
- App and API Protection
- Workload Protection

### Única fuente de verdad {#single-source-of-truth}

La sincronización bidireccional le permite sincronizar tickets con incidencias de Datadog. Sin embargo, Datadog es la única fuente de verdad para la detección y resolución de problemas.

El ticket relacionado con un hallazgo de Datadog puede cerrarse manualmente. Sin embargo, el hallazgo de Datadog permanece abierto si Datadog no puede confirmar que el problema se ha solucionado. Esta restricción ayuda a garantizar que un hallazgo no se cierre ni se elimine cuando alguien cierra un ticket relacionado.

Cerrar una incidencia de Datadog sin remediación tampoco cierra el hallazgo.

La remediación del hallazgo en Datadog o la definición de una excepción al [silenciar el hallazgo][14] son las únicas formas de cerrar un hallazgo. Después de que el hallazgo se remedia, sus incidencias y tickets relacionados se cierran.

### Configurar la sincronización bidireccional {#set-up-bidirectional-syncing}

{{< tabs >}}

{{% tab "Jira" %}}

Los siguientes pasos configuran la sincronización bidireccional con Jira y verifican que la configuración sea exitosa.

1. Configure los siguientes requisitos previos en su cuenta de Datadog, o verifique que ya estén configurados. Los requisitos previos se enumeran en su orden de configuración.
   1. La [integración de Datadog con Jira][2].
   2. Un [webhook para la integración de Jira][8]. Configurar un webhook permite que los casos creados en Work Management creen automáticamente incidencias en Jira y mantengan ambos recursos sincronizados.
   3. Un [nuevo proyecto de Work Management][9]. Un proyecto es un objeto contenedor que alberga un conjunto de incidencias.
   4. La [integración de Jira está configurada dentro del proyecto][3].
      1. Habilite la opción {{< ui >}}Sync data between Work Management and Jira{{< /ui >}}.
      2. En {{< ui >}}Title{{< /ui >}}, seleccione {{< ui >}}Two-way sync{{< /ui >}}.
      3. Complete la configuración restante y luego haga clic en {{< ui >}}Save changes{{< /ui >}}.
2. Verifique que la integración bidireccional de Work Management con Jira esté funcionando:
   1. Abra [cualquier producto que admita la sincronización bidireccional de tickets][20].
   2. Localice la opción de menú desplegable de tickets en la página del explorador o de hallazgos y seleccione {{< ui >}}Jira{{< /ui >}}. El botón abre un modal de {{< ui >}}Jira Ticket{{< /ui >}}.
   3. Verifique que la sección {{< ui >}}Work Management  ↔ Jira Integration{{< /ui >}} exista y que la sincronización bidireccional esté habilitada.

{{< img src="security/jira_modal-1.png" alt="Modal utilizado para crear un ticket de Jira para un hallazgo de Security, con la sincronización bidireccional habilitada." responsive="true" style="width:50%;">}}

Está listo para comenzar a crear tickets bidireccionales de Work Management.

Si no ve la sección {{< ui >}}Work Management  ↔ Jira Integration{{< /ui >}}, verifique que haya completado los requisitos previos.

[2]: /es/integrations/jira/
[3]: /es/incident_response/work_management/notifications_integrations/#third-party-tickets
[8]: /es/integrations/jira/#configure-a-jira-webhook
[9]: /es/incident_response/work_management/projects/
[20]: /es/security/ticketing_integrations/#supported-products

{{% /tab %}}

{{% tab "ServiceNow" %}}

Los siguientes pasos configuran la sincronización bidireccional con ServiceNow y verifican que la configuración sea exitosa.

1. Configure los siguientes requisitos previos en su cuenta de Datadog, o verifique que ya estén configurados. Los requisitos previos se enumeran en su orden de configuración.
   1. La [integración de Datadog con ServiceNow][21].
      1. Vaya a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}ServiceNow{{< /ui >}} > {{< ui >}}Work Management{{< /ui >}}.
      2. Elija `Datadog Cases ITSM` como la tabla de incidencias para la sincronización bidireccional. 
   2. Un [proyecto de gestión de trabajo][9] para vincular a su grupo de asignación. Un proyecto es un objeto contenedor que contiene un conjunto de incidencias vinculadas a su tabla de ServiceNow. Si no hay un proyecto vinculado, Datadog crea un proyecto cuando usted crea un ticket.
   3. Para la sincronización bidireccional de ITSM, asegúrese de que los usuarios de ServiceNow que actualizan incidentes tengan al menos el rol `itil`. Consulte la [configuración de ServiceNow ITOM/ITSM][22] para obtener más detalles.
2. Verifique que la integración bidireccional de gestión de trabajo con ServiceNow esté funcionando:
   1. Abra [cualquier producto que admita la sincronización bidireccional de tickets][20].     
   2. Localice la opción de menú desplegable de tickets en la página del explorador o de hallazgos y seleccione {{< ui >}}ServiceNow{{< /ui >}}. El botón abre un modal de {{< ui >}}ServiceNow Ticket{{< /ui >}}.
   3. Verifique que la sincronización bidireccional esté habilitada para los {{< ui >}}Instance{{< /ui >}} y {{< ui >}}Assignment Group{{< /ui >}} configurados.

{{< img src="security/servicenow_modal.png" alt="Modal utilizado para crear un ticket de ServiceNow para un hallazgo de Security, con sincronización bidireccional y mapeo de estados habilitado." responsive="true" style="width:50%;">}}

Está listo para comenzar a crear tickets bidireccionales de Work Management.

Si no ve la sección {{< ui >}}Work Management ↔ ServiceNow Integration{{< /ui >}}, verifique que haya completado los requisitos previos.

[3]: /es/incident_response/work_management/notifications_integrations/#third-party-tickets
[9]: /es/incident_response/work_management/projects/
[20]: /es/security/ticketing_integrations/#supported-products
[21]: /es/integrations/servicenow/
[22]: /es/integrations/guide/servicenow-itom-itsm-setup/

{{% /tab %}}

{{% tab "Linear" %}}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">La integración de tickets de Linear no está disponible en el {{< region-param key="dd_site_name" >}} sitio.</div>
{{< /site-region >}}

Los siguientes pasos configuran la sincronización bidireccional con Linear y verifican que la configuración sea exitosa.

1. Configure los siguientes requisitos previos en su cuenta de Datadog, o verifique que ya estén configurados. Los requisitos previos se enumeran en su orden de configuración.
   1. La [integración de Datadog con Linear][23].
   2. Un [webhook para la integración con Linear][24]. Configurar un webhook mantiene sincronizadas las incidencias creadas en Work Management y sus incidencias de Linear.
   3. Un [nuevo proyecto de Work Management][9]. Un proyecto es un objeto contenedor que alberga un conjunto de incidencias.
   4. La [integración con Linear se configura dentro del proyecto][3].
      1. Habilite Linear para el proyecto y, luego, seleccione una cuenta y un equipo de Linear para la creación de incidencias.
      2. Para cada campo que desee mantener sincronizado, seleccione {{< ui >}}Two-way sync{{< /ui >}}.
      3. Complete la configuración restante y, luego, guarde sus cambios.
2. Verifique que la integración bidireccional de Work Management con Linear esté funcionando:
   1. Abra [cualquier producto que admita la sincronización bidireccional de tickets][20].
   2. Ubique la opción del menú desplegable de tickets en el explorador o en la página de hallazgos y seleccione {{< ui >}}Linear{{< /ui >}}. El botón abre un modal de {{< ui >}}Linear Issue{{< /ui >}}.
   3. Verifique que la sección {{< ui >}}Work Management ↔ Linear Integration{{< /ui >}} exista y que la sincronización bidireccional esté habilitada.

{{< img src="security/linear_modal.png" alt="Modal utilizado para crear una incidencia de Linear para un hallazgo de Security, con la sincronización bidireccional habilitada." responsive="true" style="width:50%;">}}

Está listo para comenzar a crear tickets bidireccionales de Work Management.

Si no ve la sección {{< ui >}}Work Management ↔ Linear Integration{{< /ui >}}, verifique que haya completado los requisitos previos.

[3]: /es/incident_response/case_management/notifications_integrations/#third-party-tickets
[9]: /es/incident_response/case_management/projects/
[20]: /es/security/ticketing_integrations/#supported-products
[23]: /es/integrations/linear/
[24]: /es/integrations/linear/#configure-a-linear-webhook

{{% /tab %}}

{{< /tabs >}}

### Crear tickets bidireccionales {#create-bidirectional-tickets}

Los siguientes pasos crean un ticket bidireccional para un hallazgo de Security.

1. Abra [cualquier producto que admita la sincronización bidireccional de tickets][20].
2. Ubique la opción del menú desplegable del icono {{< ui >}}Ticketing{{< /ui >}} para un hallazgo en el explorador o en {{< ui >}}Next Steps{{< /ui >}} en la página del hallazgo.
3. También puede seleccionar hasta 50 hallazgos a la vez para crear múltiples tickets o un ticket para múltiples hallazgos.
4. Seleccione la herramienta de terceros del menú desplegable.
5. Cree un ticket para cualquier herramienta de terceros admitida (consulte las secciones a continuación).

{{% collapse-content title="Ticket de Jira" level="h4" expanded=false %}}
1. Abra el modal {{< ui >}}Jira Ticket{{< /ui >}}. Puede usar un ticket nuevo o existente. Veamos cómo crear un nuevo ticket de Jira.
2. Configure los siguientes ajustes:
   1. {{< ui >}}Jira account{{< /ui >}}:** seleccione la cuenta de Jira donde desea que se cree el ticket.
   2. {{< ui >}}Jira Project{{< /ui >}}:** seleccione el proyecto de Jira que desea usar.
   3. {{< ui >}}Jira work type{{< /ui >}}:** seleccione el tipo de trabajo de Jira que desea crear.
   4. {{< ui >}}Assignee and Priority{{< /ui >}}:** opcionalmente, seleccione el usuario asignado y la prioridad.
3. Para agregar más campos al ticket de Jira que crea Datadog, use {{< ui >}}Add Optional Field{{< /ui >}} para agregar los campos.
4. Visualice {{< ui >}}Data Sync Settings{{< /ui >}} para revisar y actualizar el proyecto de Work Management vinculado y los ajustes de sincronización bidireccional por campo.
5. Haga clic en {{< ui >}}Create{{< /ui >}}.

**Notas**:
- La sincronización bidireccional con Jira está disponible para ciertos atributos de tickets de Jira, como el estado, el asignado y los comentarios, pero no todos los campos de Jira están disponibles.
{{% /collapse-content %}}

{{% collapse-content title="Ticket de ServiceNow" level="h4" expanded=false %}}
1. Abra el modal {{< ui >}}ServiceNow Ticket{{< /ui >}}. Puede usar un ticket nuevo o existente. Veamos cómo crear un nuevo ticket de ServiceNow.
2. Configure los siguientes ajustes:
   1. {{< ui >}}Instance{{< /ui >}}:** seleccione la instancia de ServiceNow donde desea que se cree el ticket.
   2. {{< ui >}}Assignment group{{< /ui >}}:** seleccione el grupo de ServiceNow al que se asignará el ticket.
3. Si está creando un ticket para múltiples hallazgos, elija un modo de creación:
   - {{< ui >}}Single Ticket{{< /ui >}}:** crea un único ticket agregado vinculado a todos los hallazgos seleccionados.
   - {{< ui >}}Multiple Tickets{{< /ui >}}:** crea un ticket individual para cada hallazgo seleccionado.
4. Visualice {{< ui >}}Data Sync Settings{{< /ui >}} para revisar y actualizar el proyecto de Work Management vinculado y los ajustes de sincronización bidireccional por campo.
5. Haga clic en {{< ui >}}Create{{< /ui >}}.

**Notas**:
- La sincronización bidireccional es compatible solo para el modo `ITSM`. `ITOM` los eventos no admiten la sincronización bidireccional.
- Adjuntar a un ticket existente es compatible solo para el modo `ITSM`.
- Solo se admiten las URL de incidentes de ServiceNow. No se aceptan las URL de problemas y solicitudes de cambio.
{{% /collapse-content %}}

{{% collapse-content title="Incidencia de Linear" level="h4" expanded=false %}}
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">La integración de tickets de Linear no está disponible en el {{< region-param key="dd_site_name" >}} sitio.</div>
{{< /site-region >}}

1. Abra el modal {{< ui >}}Linear Issue{{< /ui >}}. Puede usar una incidencia nuevo o existente.
2. Configure los siguientes ajustes:
   1. {{< ui >}}Linear account{{< /ui >}}:** seleccione la cuenta de Linear donde desea que se cree la incidencia.
   2. {{< ui >}}Linear team{{< /ui >}}:** seleccione el equipo de Linear en el que desea crear la incidencia.
3. Opcionalmente, establezca un proyecto, etiquetas, responsable y prioridad de Linear.
4. Visualice {{< ui >}}Data Sync Settings{{< /ui >}} para revisar y actualizar el proyecto de Work Management vinculado y los ajustes de sincronización bidireccional por campo.
5. Haga clic en {{< ui >}}Create{{< /ui >}}.

**Notas**:
- La sincronización bidireccional con Linear está disponible para atributos de incidencia como estado, responsable, título, descripción, prioridad y comentarios.
- Para usar una incidencia existente, proporcione la URL de la incidencia de Linear.
{{% /collapse-content %}}

### Administre tickets de Gestión de Trabajo bidireccionales {#manage-bidirectional-work-management-tickets}

**Nota**: Para obtener ayuda sobre cómo resolver problemas de sincronización bidireccional, consulte [Solución de problemas de Gestión de Trabajo][24].

{{< tabs >}}

{{% tab "Jira" %}}

Los tickets de Jira bidireccionales existentes se enumeran en las secciones {{< ui >}}Ticketing{{< /ui >}} o {{< ui >}}Next Steps{{< /ui >}} del hallazgo.

Aquí hay un ejemplo de un hallazgo de Código Estático (SAST):

{{< img src="security/bidir-jira-existing-1.png" alt="hallazgo con ticket de Jira existente: en la sección Próximos pasos, bajo Ticket creado, una píldora con el logotipo de Jira y el texto 'CJT-16'" responsive="true" style="width:100%;">}}

Pase el cursor sobre el ticket de Jira para ver sus detalles.

{{< img src="security/bidir-jira-existing-hover-1.png" alt="Estado al pasar el mouse sobre la píldora en la imagen anterior. Modal con los detalles del ticket de Jira." responsive="true" style="width:100%;">}}

Se proporcionan detalles como el responsable y el estado, junto con una línea de tiempo de la incidencia de Jira y de los cambios en la incidencia de Datadog.

Los tickets de Jira cerrados son de color verde.

En {{< ui >}}Datadog Associated Case{{< /ui >}}, se proporciona la incidencia de Datadog relacionada. Haga clic en el nombre de la incidencia para abrirla en [Work Management][1].

[1]: /es/incident_response/work_management/
{{% /tab %}}

{{% tab "ServiceNow" %}}

Los tickets de ServiceNow bidireccionales existentes se enumeran en las secciones {{< ui >}}Ticketing{{< /ui >}} o {{< ui >}}Next Steps{{< /ui >}} del hallazgo.

{{< img src="security/bidir-servicenow-existing.png" alt="Hallazgo con un ticket de ServiceNow existente: en la sección Próximos pasos, bajo Seguimiento, una píldora de Visualizar incidente de ServiceNow." responsive="true" style="width:100%;">}}

Pase el cursor sobre el ticket de ServiceNow para ver sus detalles, incluyendo el estado y una línea de tiempo de los cambios sincronizados entre ServiceNow y Datadog.

{{< img src="security/bidir-servicenow-existing-hover.png" alt="Información sobre una píldora de ticket de ServiceNow que muestra el número de incidente, el estado y una línea de tiempo de los cambios sincronizados entre ServiceNow y Datadog." responsive="true" style="width:100%;">}}

En {{< ui >}}Datadog Associated Case{{< /ui >}}, se proporciona la incidencia de Datadog relacionada. Haga clic en el nombre de la incidencia para abrirla en [Work Management][1].

[1]: /es/incident_response/case_management/
{{% /tab %}}

{{% tab "Linear" %}}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">La integración de tickets de Linear no está disponible en el {{< region-param key="dd_site_name" >}} sitio.</div>
{{< /site-region >}}

Las incidencias de Linear bidireccionales existentes se enumeran en las secciones {{< ui >}}Ticketing{{< /ui >}} o {{< ui >}}Next Steps{{< /ui >}} del hallazgo.

{{< img src="security/bidir-linear-existing.png" alt="Hallazgo con una incidencia de Linear existente en la sección Próximos pasos." responsive="true" style="width:100%;">}}

Pase el cursor sobre la incidencia de Linear para ver sus detalles, incluyendo el estado, el responsable y una línea de tiempo de los cambios sincronizados entre Linear y Datadog.

{{< img src="security/bidir-linear-existing-hover.png" alt="Información sobre una píldora de incidencia de Linear que muestra el estado de la incidencia, el responsable y una línea de tiempo de los cambios sincronizados entre Linear y Datadog." responsive="true" style="width:100%;">}}

En {{< ui >}}Datadog Associated Case{{< /ui >}}, se proporciona la incidencia de Datadog relacionada. Haga clic en el nombre de la incidencia para abrirla en [Work Management][1].

[1]: /es/incident_response/work_management/
{{% /tab %}}

{{< /tabs >}}

#### Desvinculación automática y apertura/cierre de tickets {#automatic-detachment-and-ticket-openingclosing}

Archivar una incidencia no elimina los tickets relacionados, pero eliminar un proyecto de incidencia desvincula todos los tickets de los hallazgos de Security relacionados.

Desvincular un ticket de un hallazgo de Security no lo elimina.

Si no quedan hallazgos abiertos vinculados a un ticket (porque todos están desvinculados, resueltos o silenciados), este se cierra automáticamente.
De manera similar, si al menos un hallazgo abierto está adjunto a un ticket cerrado (porque fue adjuntado o detectado nuevamente o se le quitó el silencio), se vuelve a abrir automáticamente.

### Facetas de gestión de trabajo bidireccional {#bidirectional-work-management-facets}

Hay varias facetas de gestión de trabajo bajo {{< ui >}}Triage{{< /ui >}}, que incluyen:

- Clave de incidencia
- Clave de Jira
- Estado de Jira
- Clave de incidencia de Linear
- Estado de Linear
- Estado de la incidencia
- Tiene ticket adjunto

Puede consultar atributos y crear tableros utilizando estas facetas.

## API de integraciones de tickets {#ticketing-integration-api}

El vínculo entre las incidencias de Datadog y los hallazgos de Security existentes se puede gestionar con la API pública.

Los puntos de conexión dedicados permiten a los usuarios [crear una incidencia de Datadog para hallazgos de Security existentes][15], [adjuntar hallazgos de Security a una incidencia de Datadog existente][16] y [separar hallazgos de Security de su incidencia][17].

Los usuarios también pueden [crear incidencias de Jira para hallazgos de Security][18] y [adjuntar hallazgos de Security a una incidencia de Jira][19].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/work_management/
[2]: /es/integrations/jira/
[3]: /es/incident_response/work_management/notifications_integrations/#third-party-tickets
[4]: https://app.datadoghq.com/security/siem/signals
[5]: https://app.datadoghq.com/security/code-security
[6]: https://app.datadoghq.com/security/appsec/signals
[7]: https://app.datadoghq.com/security/workload-protection/signals
[8]: /es/integrations/jira/#configure-a-jira-webhook
[9]: /es/incident_response/work_management/projects/
[10]: /es/security/ticketing_integrations/#prerequisites
[11]: https://app.datadoghq.com/security/compliance
[12]: https://app.datadoghq.com/security/appsec/inventory/finding
[13]: https://app.datadoghq.com/security/workload-protection/findings
[14]: https://app.datadoghq.com/security/automation_pipelines/mute
[15]: /es/api/latest/security-monitoring/#create-cases-for-security-findings
[16]: /es/api/latest/security-monitoring/#attach-security-findings-to-a-case
[17]: /es/api/latest/security-monitoring/#detach-security-findings-from-their-case
[18]: /es/api/latest/security-monitoring/#create-jira-issues-for-security-findings
[19]: /es/api/latest/security-monitoring/#attach-security-findings-to-a-jira-issue
[20]: /es/security/ticketing_integrations/#supported-products
[21]: /es/integrations/servicenow/
[22]: /es/integrations/guide/servicenow-itom-itsm-setup/
[23]: /es/integrations/linear/
[24]: /es/incident_response/case_management/troubleshooting/
[30]: /es/security/assignee_management/