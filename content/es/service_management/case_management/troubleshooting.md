---
kind: Documentación
title: Solucionar problemas
---

## Información general

El objetivo de esta guía es ayudarte a resolver problemas con integraciones de terceros en Case Management. Si continúas teniendo problemas, ponte en contacto con el [equipo de asistencia de Datadog][1] para obtener más ayuda.

## Jira

Los tipos de incidencia de Jira con campos personalizados, los proyectos privados de Jira y las instancias locales de Jira no son compatibles. Si tienes problemas con la creación automática de tickets de Jira con sincronización, consulta las siguientes secciones:

### Configuración

1. Si los proyectos de Jira no aparecen en el menú desplegable de la pantalla de configuración de integraciones de Jira, asegúrate de que dispones del permiso `manage_integrations`. 

1. Asegúrate de que has configurado un webhook para recibir eventos desde Jira.

### Sincronización y actualizaciones

1. Si mueves un caso que se está sincronizando con una incidencia de Jira a un proyecto de Case Management diferente, la sincronización se detiene. Después de moverlo, el caso en el proyecto nuevo no tiene una incidencia de Jira adjunta. 
1. Si estás actualizando el estado de un caso de una manera que no permite un flujo de trabajo de Jira, el caso se desincroniza con la asignación de estado. 
1. Las actualizaciones de los comentarios, incluidas las eliminaciones, tanto en Case Management como en Jira no se reflejan en el otro lado. 
1. Solo se sincronizan los casos creados después de la habilitación de la integración bidireccional. Datadog no sincroniza de manera retroactiva los casos que existían antes de la habilitación de la integración. 

### Informador de incidencias de Jira

1. Existen algunos casos en los que el informador de incidencias de Jira se refleja como el usuario de Datadog que configuró la integración de Jira. Algunos de estos casos incluyen:
    - Cuando un usuario de Datadog que crea un caso no tiene una cuenta de Jira
    - Un usuario de Jira ha ocultado la visibilidad del correo electrónico
1. Si se actualiza el informador en la incidencia reflejada en Jira, no se refleja en Case Management, ya que el campo «creado por» no es editable. 



[1]: https://docs.datadoghq.com/es/help/