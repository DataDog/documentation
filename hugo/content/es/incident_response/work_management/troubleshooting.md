---
aliases:
- /es/service_management/case_management/troubleshooting/
- /es/incident_response/case_management/troubleshooting/
title: Solución de problemas
---
## Resumen {#overview}

Esta guía tiene como objetivo ayudarle a resolver problemas con integraciones de terceros en Work Management. Si continúa teniendo problemas, comuníquese con el [soporte de Datadog][1] para obtener más ayuda.

## Jira {#jira}

Los tipos de incidencias de Jira con campos personalizados, los proyectos privados de Jira y las instancias de Jira locales no son compatibles. Si tiene problemas con la creación automática de tickets de Jira con la sincronización, consulte las siguientes secciones:

### Configuración {#configuration}

1. Si los proyectos de Jira no aparecen en el menú desplegable en la pantalla de configuración de la integración de Jira, verifique que tenga el permiso `manage_integrations`. 

1. Asegúrese de haber configurado un webhook para recibir eventos de Jira.

### Sincronización y actualizaciones {#syncing-and-updates}

1. Si mueve un elemento de trabajo que se está sincronizando con una incidencia de Jira a un proyecto de Work Management diferente, la sincronización se detiene. Después de moverlo, el elemento de trabajo en el nuevo proyecto no tiene una incidencia de Jira adjunta.
1. Si actualiza el estado de un elemento de trabajo de una manera que no está permitida por un flujo de trabajo de Jira, el elemento de trabajo pierde la sincronización con el mapeo de estados.
1. Las actualizaciones de comentarios, incluidas las eliminaciones, ya sea en Work Management o en Jira, no se reflejan en el otro lado.
1. Solo se sincronizan los elementos de trabajo creados después de que se habilitó la integración bidireccional. Datadog no sincroniza retroactivamente los elementos de trabajo que existían antes de que se habilitara la integración.

### Reportero de la incidencia de Jira {#jira-issue-reporter}

1. Existen algunos escenarios en los que el reportero de la incidencia de Jira se refleja como el usuario de Datadog que configuró la integración de Jira. Algunos de estos escenarios incluyen:
    - Cuando un usuario de Datadog que crea un elemento de trabajo no tiene una cuenta de Jira
    - Un usuario de Jira tiene la visibilidad de correo electrónico oculta
1. Si el reportero de la incidencia de Jira reflejada se actualiza, no se refleja en Work Management, ya que el campo "creado por" no es editable.



[1]: https://docs.datadoghq.com/es/help/