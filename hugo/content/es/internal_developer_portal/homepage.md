---
aliases:
- /es/software_catalog/developer_homepage
- /es/internal_developer_portal/developer_homepage
description: La Internal Developer Portal Homepage le ofrece una vista centralizada
  de las entidades de su equipo, las solicitudes de extracción de GitHub, las solicitudes
  de fusión de GitLab, los tickets de Jira y Linear, y los elementos de trabajo de
  Datadog en un solo lugar.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-idp-homepage/
  tag: blog
  text: Comience su día con el IDP Homepage
- link: /integrations/github/
  tag: Documentación
  text: Obtenga información sobre la integración con GitHub
- link: /integrations/gitlab-source-code/
  tag: Documentación
  text: Obtenga información sobre la integración de código fuente de GitLab
- link: /integrations/jira/#configure-a-jira-webhook
  tag: Documentación
  text: Obtenga información sobre la integración con Jira
- link: /integrations/linear/#configure-a-linear-webhook
  tag: Documentación
  text: Obtenga información sobre la integración con Linear
site_support_id: idp
title: Página de inicio
---
{{< img src="tracing/software_catalog/idp_homepage_2.png" alt="La IDP Homepage muestra las solicitudes de extracción pendientes de revisión y los tickets asignados." style="width:100%;" >}}

## Descripción general {#overview}

La [IDP Homepage][5] proporciona una vista centralizada de las entidades de su equipo y sus tareas diarias.  

Con esta vista, usted puede:
- Visualizar información clave sobre las entidades de su equipo, incluyendo tarjetas de puntuación, implementaciones recientes, seguimientos, problemas, incidentes, tableros y estado de guardia. 
- Realizar un seguimiento de las tareas que se le han asignado en GitHub, GitLab, Jira y Linear.
- Identificar seguimientos con alertas o implementaciones fallidas.

## Requisitos previos {#prerequisites}

La página de inicio agrega datos de sus integraciones de Datadog. Configure lo siguiente antes de usar la página de inicio:

- **GitHub**: Requerido para la pestaña **GitHub** en **Sus PR**. Un administrador configura la [integración con GitHub][1] y el webhook, y cada usuario inicia sesión con su cuenta de GitHub.
- **Código fuente de GitLab**: Requerido para la pestaña **GitLab** en **Sus PR**. Un administrador configura la [integración de código fuente de GitLab][2] y el webhook, y cada usuario inicia sesión con su cuenta de GitLab.
- **Jira**: Requerido para la pestaña **Jira** en **Sus tickets**. Un administrador [configura el webhook de Jira][3].
- **Linear**: Requerido para la pestaña **Linear** en **Sus tickets**. Un administrador [configura el webhook de Linear][4].

## Configurar la página de inicio {#configure-the-homepage}

Haga clic en **Configurar** en la parte superior de la [IDP Homepage][5] para personalizar la página. El panel **Configuración de la página de inicio** se abre con dos pestañas: **Diseño de sección** e **Integraciones**. Después de realizar cambios, haga clic en **Guardar** para aplicarlos, o en **Cancelar** para descartarlos.

### Diseño de sección {#section-layout}

La pestaña **Diseño de sección** controla qué secciones aparecen en la página de inicio y el orden en que se muestran. Las secciones disponibles son: **Sus PRs**, **Sus tickets**, **Servicios y entidades** y **Aplicaciones**.

- Para reordenar una sección, arrástrela por su controlador a una nueva posición.
- Para mostrar u ocultar una sección, haga clic en el icono de visibilidad junto a ella.
- Para restaurar las secciones y el orden predeterminados, haga clic en **Restablecer diseño**.

### Integraciones {#integrations}

La pestaña **Integraciones** controla qué integraciones están habilitadas y qué muestra cada una en la página de inicio. Las integraciones se agrupan por la sección que completan, como **PRs** y **Elementos de trabajo**.

Cada integración tiene un interruptor para habilitarla o deshabilitarla. Cuando deshabilita una integración, sus datos ya no aparecen en la página de inicio. Dependiendo de la integración, también puede: 

- Seleccione qué cuenta conectada, instancia u organización mostrar. Por ejemplo, la integración de GitLab incluye un selector de **Instancia**.
- Abra la configuración de la integración para administrar su conexión. Por ejemplo, la integración de GitHub incluye una opción de **Configurar**. 

## Sus PRs {#your-prs}

La sección **Sus PRs** consolida sus elementos de acción personales del control de versiones, para que pueda realizar un seguimiento de las solicitudes de extracción y de fusión que se le asignaron sin salir de la página de inicio. Cambie entre las pestañas de **GitHub** y **GitLab** para visualizar cada fuente.

{{< img src="tracing/software_catalog/your_prs_table.png" alt="La sección Sus PR muestra las solicitudes de extracción de GitHub agrupadas por estado." style="width:100%;" >}}

### GitHub {#github}

La pestaña **GitHub** muestra las solicitudes de extracción que requieren su atención, agrupadas por estado de revisión, para que pueda actuar sobre ellas sin salir de la página de inicio. 

Después de iniciar sesión con su cuenta de GitHub, la pestaña carga sus solicitudes de extracción, agrupadas por estado. Si su organización no ha configurado la integración de GitHub, esta pestaña muestra un estado vacío con un aviso para habilitarla desde el [mosaico de integración de GitHub][1]. Para leer las PR de GitHub, esta integración requiere los siguientes permisos:

- Miembros: Lectura
- Metadatos: Lectura
- Solicitudes de extracción: Lectura
- Contenido: Lectura
- Estados: Lectura
- Verificaciones: Lectura

Si hay varias organizaciones de GitHub conectadas en Datadog, necesita el permiso de Integrations Read para cambiar entre ellas.

### GitLab {#gitlab}

La pestaña **GitLab** muestra las solicitudes de fusión que requieren su atención, agrupadas por estado de revisión. Para cada uno, muestra el estado de revisión y aprobación, el estado del pipeline y los bloqueadores de fusión, así como el recuento de discusiones resueltas y no resueltas. 

Después de iniciar sesión con su cuenta de GitLab, la pestaña carga sus solicitudes de fusión, agrupadas por estado. Si su organización no ha configurado la integración de GitLab Source Code, esta pestaña muestra un estado vacío con un aviso para habilitarla desde el [mosaico de integración de GitLab Source Code][2].

Si tiene varias instancias de GitLab conectadas dentro de Datadog, utilice el selector **Instance** para elegir qué instancia visualizar. 

## Sus tickets {#your-tickets}

La sección **Your Tickets** consolida los elementos asignados a usted en Jira, Linear y Datadog Work Management, para que pueda realizar un seguimiento de su trabajo pendiente sin salir de la página de inicio. Cambie entre las pestañas **Jira**, **Linear** y **Work Items** para visualizar cada fuente, y utilice **Display** para cambiar la forma en que se muestran los elementos.

{{< img src="tracing/software_catalog/your_tickets_table.png" alt="La sección Sus tickets muestra los tickets de Jira agrupados por estado." style="width:100%;" >}}

### Jira {#jira}

La pestaña **Jira** enumera los tickets de Jira asignados a usted, agrupados por estado. Después de la configuración, sus tickets asignados aparecen automáticamente.

### Linear {#linear}

La pestaña **Linear** enumera los problemas de Linear asignados a usted, agrupados por estado. Después de la configuración, sus problemas asignados aparecen automáticamente.

### Work Items {#work-items}

La pestaña **Work Items** enumera los elementos de trabajo de Datadog Work Management asignados a usted, agrupados por estado. Los elementos de trabajo aparecen automáticamente cuando se le asignan. Para obtener más información, consulte [Work Management][6].

## Servicios y entidades {#services-and-entities}

{{< img src="tracing/software_catalog/services_entities_table_2.png" alt="La sección de Servicios y entidades que muestra los servicios del equipo con información de scorecard, seguimiento y estado de guardia." style="width:100%;" >}}

La sección **Services & Entities** muestra los servicios y entidades clave de su equipo, agregados automáticamente desde productos e integraciones de Datadog vinculados. Cada entrada resume el contexto operativo de la entidad, como el estado del scorecard, implementaciones recientes, estado de seguimiento e incidente, tableros vinculados y actuales en guardia. Puede filtrar por entidades visualizadas recientemente, entidades propiedad de su equipo o entidades que haya marcado como favoritas. 

## Extienda la página de inicio con aplicaciones personalizadas {#extend-the-homepage-with-custom-apps}

Además de las secciones integradas, la sección **Apps** le permite agregar aplicaciones personalizadas a la página de inicio, para que pueda reunir los datos y las acciones que le resulten más útiles, ya sea que provengan de Datadog, una herramienta interna o un servicio de terceros. Datadog ofrece dos formas de crear estas aplicaciones: 

- **App Builder**: Un generador de bajo código, de arrastrar y soltar, para herramientas internas. Las aplicaciones combinan componentes de interfaz de usuario preconstruidos, fuentes de datos de Datadog (como métricas, logs y monitores) y acciones listas para usar para servicios como GitHub y AWS. Para obtener más información, consulte [App Builder][7].
- **Datadog Apps**: Una ruta basada en código para las aplicaciones que usted construya localmente con React y TypeScript (o JavaScript), utilizando una CLI y su flujo de trabajo de desarrollo estándar. Elija Datadog Apps cuando necesite colaboración en equipo con control de versiones y CI/CD, desarrollo local asistido por IA, integración con servicios más allá del Action Catalog o control total sobre la interfaz y la lógica de la aplicación. Para obtener más información, consulte [Datadog Apps][8].

Para que una aplicación personalizada esté disponible aquí, primero publíquela y defina sus permisos para que su equipo pueda visualizarla y usarla.

Para agregar una aplicación a la página de inicio:

1. En la sección **Apps**, haga clic en **Add App**.
2. Elija un **blueprint** para comenzar desde una aplicación preconstruida, o elija una **aplicación personalizada** que su organización ya haya creado.
3. Configure la aplicación y luego agréguela a la página de inicio.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}  

[1]: /es/integrations/github/  
[2]: /es/integrations/gitlab-source-code/
[3]: /es/integrations/jira/#configure-a-jira-webhook
[4]: /es/integrations/linear/#configure-a-linear-webhook
[5]: https://app.datadoghq.com/idp/home
[6]: /es/service_management/case_management
[7]: /es/actions/app_builder/
[8]: /es/actions/datadog_apps