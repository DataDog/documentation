---
further_reading:
- link: /security/automation_pipelines
  tag: Documentación
  text: Pipelines de automatización
- link: /security/ticketing_integrations
  tag: Documentación
  text: Integrations de tickets
- link: /incident_response/work_management
  tag: Documentación
  text: Case Management
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
site_support_id: case_management
title: Reglas de creación de tickets
---
{{< product-availability >}}

Configure las reglas de creación de tickets para crear tickets automáticamente en Jira o en Case Management cuando se descubran nuevos hallazgos. Este enfoque rastrea los problemas de seguridad en sus flujos de trabajo de ingeniería existentes sin necesidad de clasificación manual, lo que ayuda a los equipos a responder rápidamente a nuevas amenazas a escala. Para obtener más información sobre las integraciones de tickets con hallazgos de seguridad, consulte [Ticketing Integrations][3].

## Crear una regla de creación de tickets {#create-a-ticket-creation-rule}

1. En Datadog, vaya a **Security** > **Settings** > [Findings Automation][2]. Haga clic en **Add a New Rule**, luego seleccione **Create Ticket**. Se abre la página Create a New Rule.
1. En **Rule name**, ingrese un nombre descriptivo para la regla; por ejemplo, "Critical vulnerabilities for engineering team".
1. Agregue los criterios de su regla en los siguientes campos:
    - **Cualquiera de estos tipos**: Los tipos de hallazgos que la regla debe verificar. Los tipos disponibles incluyen:
      - Vulnerabilidad de código en tiempo de ejecución
      - Vulnerabilidad de código estático
      - Vulnerabilidad de biblioteca
      - Secreto
      - Infraestructura como código
      - Vulnerabilidad de imagen de contenedor
      - Vulnerabilidad de servidor
      - Configuración incorrecta
      - Ruta de ataque
      - Riesgo de identidad
      - Seguridad de API
      - Actividad de carga de trabajo
    - **Cualquiera de estas etiquetas o atributos**: Las etiquetas o atributos del recurso que deben coincidir para que se aplique la regla.
1. Para agregar criterios de gravedad a la regla, haga clic en **Add Severity**.
1. Seleccione el sistema de tickets y configure el destino del ticket:
   - **Jira**
     - **Jira Account**: Seleccione la instancia de Atlassian que desea utilizar.
     - **Space**: Seleccione el proyecto de Jira. Verifique que este Space se haya agregado al [Jira Webhook][5].
     - **Ticket Type**: Seleccione el tipo de Jira issue que desea crear, por ejemplo, **Task**.
     - **Assignee** (optional): Especifique un usuario al cual asignar los tickets creados automáticamente.
     - Para agregar más campos al ticket de Jira que crea Datadog, use **Add Optional Field**.
     - Expanda **Data Sync Settings** para revisar o actualizar el proyecto de Case Management vinculado y la configuración de sincronización bidireccional.
   - **Case Management**
     - **Case Management Project**: Seleccione un proyecto de Case Management existente o cree uno.
     - **Assignee** (optional): Especifique un usuario al cual asignar los casos creados automáticamente.
1. En **Rate limit**, ingrese [maximum number of tickets](#daily-ticket-limit) que esta regla puede crear por día UTC.
1. Para probar la regla antes de guardarla, haga clic en **Test Rule**, seleccione un hallazgo coincidente y haga clic en **Run Test**. Después de que se completa la prueba, puede visualizar el ticket creado o separar el ticket de prueba del hallazgo.
1. Haga clic en **Guardar**. La regla se aplica solo a nuevos hallazgos. Puede tomar hasta unos minutos después de que se detecta un hallazgo para crear el ticket correspondiente.

**Nota**: Las reglas de creación de tickets solo crean tickets para nuevos hallazgos. Datadog no crea tickets retroactivos para hallazgos existentes cuando usted crea una regla.

## Identificar tickets creados automáticamente {#identify-automatically-created-tickets}

{{< img src="security/automation_pipelines/ticket_creation_lightning_indicator.png" alt="Ventana emergente de ticket de Case Management que muestra una incidencia creada por una Regla de Automatización, indicada con un icono de rayo, y un enlace para visualizar todos los hallazgos con tickets que fueron creados a partir de la misma regla." style="width:60%;" >}}

Los tickets creados por una regla están marcados con un indicador de rayo en el panel lateral de hallazgos y en las vistas del explorador. Al pasar el cursor sobre el indicador se muestra la regla de automatización responsable del ticket y se proporciona un enlace a la regla.

## Rule matching order {#rule-matching-order}

Cuando Datadog identifica un hallazgo, lo evalúa con respecto a su secuencia de reglas de creación de tickets. Comenzando con la primera regla, si hay una coincidencia, Datadog crea un ticket utilizando la configuración de esa regla y deja de evaluar más. Si no ocurre ninguna coincidencia, Datadog pasa a la siguiente regla. Este proceso continúa hasta que se encuentra una coincidencia o se revisan todas las reglas sin encontrar ninguna.

## Daily ticket limit {#daily-ticket-limit}

Cada regla tiene un límite diario de tickets configurable que se restablece a la medianoche UTC. Cuando se alcanza el límite, Datadog crea un ticket final en el mismo proyecto explicando que la regla alcanzó su límite diario, luego deja de crear tickets por el resto de ese día. Los hallazgos que exceden el límite no se registran retroactivamente cuando el límite se restablece, pero puede crear tickets para ellos manualmente.

## Broken rules {#broken-rules}

Si un error de configuración del proyecto impide la creación de tickets —por ejemplo, si el proyecto de Jira conectado ya no es válido—, Datadog deshabilita automáticamente la regla y la marca como broken.

{{< img src="security/automation_pipelines/ticket_creation_broken_rule.png" alt="Lista de Automation Pipelines que muestra una regla de creación de tickets con un tooltip de advertencia que dice 'Rule auto-disabled due to a ticketing integration error'" style="width:100%;" >}}

Para reanudar la creación automática de tickets, corrija la configuración del proyecto y vuelva a habilitar la regla.

## Disabled or deleted rules {#disabled-or-deleted-rules}

Cuando deshabilita o elimina una regla de creación de tickets, los tickets que fueron creados previamente por la regla permanecen adjuntos a sus hallazgos. No se separan ni se eliminan.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=create_ticket
[3]: /es/security/ticketing_integrations/
[5]: /es/integrations/jira/#configure-a-jira-webhook