---
aliases:
- /es/getting_started/service_catalog
- /es/getting_started/software_catalog/
further_reading:
- link: /internal_developer_portal
  tag: Documentación
  text: Portal interno para desarrolladores
- link: /internal_developer_portal/software_catalog/
  tag: Documentación
  text: Software Catalog
- link: https://learn.datadoghq.com/courses/managing-service-catalog
  tag: Centro de aprendizaje
  text: Gestión de servicios con Service Catalog
- link: https://www.datadoghq.com/blog/service-owner-knowledge-with-datadog-service-catalog/
  tag: Blog
  text: Simplifica la governance (UI) / gobernanza (generic) con Service Catalog de
    Datadog
- link: /internal_developer_portal/scorecards
  tag: Documentación
  text: Scorecards
- link: /internal_developer_portal/self_service_actions
  tag: Documentación
  text: Acciones de Self-Service
- link: /internal_developer_portal/eng_reports
  tag: Documentación
  text: Informes de ingeniería
title: Empezando con el Portal interno para desarrolladores
---

{{< img src="tracing/internal_developer_portal/scrolling_the_catalog.mp4" alt="Un video que se desplaza por la page (página) del Catálogo del Portal interno para desarrolladores y hace clic en un servicio para mostrar un gráfico de dependencias con los servicios principales y secundarios representados" video=true >}}

## Información general

El Portal interno para desarrolladores (IDP) de Datadog te ayuda a unificar los metadatos de software, la telemetría en tiempo real y los workflows (UI) / procesos (generic) de los desarrolladores en una única plataforma. En esta guía se explica cómo configurar cada componente central de IDP:

- [Software Catalog][1]: Inventario en tiempo real de entidades y entornos, enriquecido con metadatos de propiedad y operativos.
- [Scorecards][2]: Miden la adopción de las prácticas recomendadas de ingeniería mediante evaluaciones basadas en reglas.
- [Acciones de Self-Service][3]: Permiten a los desarrolladores ejecutar tareas estandarizadas con un solo clic.
- [Informes de ingeniería][4]: Visualiza las métricas de calidad, fiabilidad y cumplimiento en todo tu stack tecnológico.
- [Páginas de información general][5]: Ofrecen a los desarrolladores y equipos una vista personalizada de sus entidades, incidencias y elementos de acción.

Tanto si empiezas desde cero como si te integras con sistemas existentes como Backstage o ServiceNow, utiliza esta guía para empezar con IDP.


## Requisitos previos

Si aún no lo has hecho, crea una [cuenta de Datadog][6]. 

## Step (UI) / paso (generic) 1: Rellenar Software Catalog 

IDP comienza con [Software Catalog][1], un inventario en tiempo real de los componentes clave de tu arquitectura de software. En Datadog, se denominan entidades y pueden representar servicios individuales, API o sistemas agrupados.

Puedes añadir entidades de:

- [APM, USM y RUM][7]: Descubierto automáticamente a partir de la telemetría de la aplicación
- [Definiciones manuales][8]: Creadas a través de [Datadog][9] o importadas a través de herramientas como Terraform, API de Datadog o la integración con GitHub.
- [Sistemas de terceros][10]: A través de integraciones con ServiceNow y Backstage

Empieza con una definición básica para registrar la entidad y, a continuación, enriquécela con metadatos para añadir propiedad y contexto operativo, entre otros:
- Información sobre la propiedad y contactos del equipo
- Documentación, dashboards, runbooks
- Pipelines de despliegue y enlaces de configuración
- Datos de disponibilidad de la producción mediante el etiquetado unificado de servicios

El siguiente ejemplo define una entidad `system` que representa una aplicación compuesta de varios servicios. Incluye metadatos como nombre para mostrar, propiedad, contactos, documentación relacionada, integraciones y componentes de servicios asociados.

{{< code-block lang="yaml" filename="entity.datadog.yaml" disable_copy="true" collapsible="true" >}}
apiVersion: v3
  kind: system
  metadata:
    name: myapp
    displayName: My App
    tags:
      - tag:value
    links:
      - name: shopping-cart runbook
        type: runbook
        url: https://runbook/shopping-cart
      - name: shopping-cart architecture
        provider: gdoc
        url: https://google.drive/shopping-cart-architecture
        type: doc
      - name: shopping-cart Wiki
        provider: wiki
        url: https://wiki/shopping-cart
        type: doc
      - name: shopping-cart source code
        provider: github
        url: http://github/shopping-cart
        type: repo
    contacts:
      - name: Support Slack
        type: slack
        contact: https://www.slack.com/archives/shopping-cart
    owner: myteam
    additionalOwners:
      - name: opsTeam
        type: operator
  integrations:
    pagerduty:
      serviceURL: https://www.pagerduty.com/service-directory/Pshopping-cart
  spec:
    components:
      - service:myservice
      - service:otherservice
{{< /code-block >}}

Lee la [Guía de configuración de Software Catalog ][11] para aprender a añadir o importar entidades y revisa la [referencia del modelo de entidad][12] para conocer los detalles del esquema.

## Step (UI) / paso (generic) 2: Evaluar la calidad de las entidades con scorecards

Utiliza scorecards para evaluar si las entidades cumplen las normas de tu organización. Los scorecards pueden medir:
- Cobertura de la monitorización
- Preparación para producción
- Protocolo de seguridad
- Adopción de herramientas internas
- Propiedad y documentación

Los scorecards de Datadog incluyen 10 reglas predefinidas que abarcan prácticas de observabilidad, etiquetado de propiedad y puntos de control de preparación para la producción. Puedes agrupar las reglas en niveles para clasificarlas según su nivel de criticidad 1 (expectativas básicas), nivel 2 (prácticas recomendadas) y nivel 3 (objetivos avanzados/aspiracionales).

Además de utilizar las reglas predeterminadas, puedes definir reglas personalizadas que reflejen tus normas internas:

1. Ve a la [page (página) Scorecards][13] y haz clic en Crear regla.
1. Especifica el nombre de la regla, el scorecard al que pertenece, una descripción y el equipo propietario.
1. Envía un resultado de `pass`, `fail`, o `skip` para cada entidad de una de las siguientes maneras:
   - Manualmente a través de la interfaz de usuario de Datadog 
   - Con programación a través de la API de Scorecards
   - Automáticamente, utilizando [Workflow Automation (automatización de procesos)][14] para publicar los resultados en un schedule (horario)
1. Consulta un información general de los resultados en la [page (página) Scorecards][13].

Obtén más información sobre la configuración de scorecards y las reglas personalizadas en la [Documentación sobre Scorecards][2].

## Step (UI) / paso (generic) 3: Utilizar acciones de Self-Service

Las acciones de Self-Service te permiten ejecutar tareas repetibles a través de una interfaz de usuario o API. Por ejemplo, utiliza acciones de Self-Service para:
- [Crear un bucket S3 con Terraform][16]
- [Generar un nuevo project (proyecto) in GitHub][17]
- [Gestionar despliegues de Kubernetes ][18]

Las acciones pueden estar respaldadas por sistemas de automatización como Terraform, acciones de GitHub o scripts internos. Las acciones de Self-Service ofrecen más de 1000 integraciones creadas previamente con herramientas a través de la gestión de código fuente (por ejemplo, GitHub y GitLab), gestión de tickets e incidents (incidentes) (por ejemplo, Jira, ServiceNow y PagerDuty), chat (por ejemplo, Slack y Microsoft Teams), proveedores de la nube (por ejemplo, AWS, GCP y Azure), etc. Puedes conectarte con cualquier endpoint adicional, incluidos los recursos privados, aprovechando las solicitudes HTTP y los ejecutores privados de acción.

Empieza explorando las acciones de Self-Service [Bibiloteca de blueprint (esquema)][19] en Datadog para ver ejemplos de aplicaciones que puedes personalizar para tu case (incidencia) de uso. 

Para empezar a automatizar los flujos de trabajo de los desarrolladores, explora la [Documentación sobre acciones de Self-Service][3].

## Step (UI) / paso (generic) 4: monitorizar el estado de ingeniería con informes

Los informes de ingeniería ofrecen una visión general de:
- Rendimiento de los scorecards en todos equipos
- Tendencias de fiabilidad en toda la organización basadas en los SLOs y en el rendimiento de incidents (incidentes) 
- Velocidad y estabilidad del desarrollo de software

Explora [Informes de ingeniería][20] en la aplicación Datadog. Estos informes se generan automáticamente y se actualizan en tiempo real. 

Lee la [Documentación sobre informes de ingeniería][4] para obtener más detalles sobre los informes disponibles y las opciones de configuración.

## Step (UI) / paso (generic) 5: Utilizar las páginas de información general para obtener información personalizada

En las páginas de información general se muestran métricas de alto nivel y elementos de acción adaptados a cada colaborador y equipo.

Comienza con la [page (página) de información general del desarrollador][21], en la que se muestra:
- Tus tickets de Jira y PR de GitHub abiertos
- Monitores, incidencias, SLOs y scorecards de tu equipo
- Problemas activos, errores y alertas Watchdog 

Para obtener consejos de configuración y personalización, lee la [Documentación sobre páginas de información general][22].


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/internal_developer_portal/software_catalog/
[2]: /es/internal_developer_portal/scorecards/
[3]: /es/internal_developer_portal/self_service_actions
[4]: /es/internal_developer_portal/eng_reports
[5]: /es/internal_developer_portal/overview_pages
[6]: https://www.datadoghq.com/
[7]: /es/internal_developer_portal/software_catalog/set_up/discover_entities/
[8]: /es/internal_developer_portal/software_catalog/set_up/create_entities/
[9]: https://app.datadoghq.com/software
[10]: /es/internal_developer_portal/software_catalog/set_up/import_entities/
[11]: /es/internal_developer_portal/software_catalog/set_up/
[12]: /es/internal_developer_portal/software_catalog/entity_model/entity_types/
[13]: https://app.datadoghq.com/software/scorecards
[14]: https://app.datadoghq.com/workflow/blueprints?selected_category=SCORECARDS
[16]: https://app.datadoghq.com/app-builder/apps/edit?startModalOpen=false&template=create-new-s3-bucket&viewMode=templatePreview
[17]: https://app.datadoghq.com/app-builder/apps/edit?startModalOpen=false&template=scaffold-github&viewMode=templatePreview
[18]: https://app.datadoghq.com/app-builder/apps/edit?startModalOpen=false&template=manage-kubernetes-deployments&viewMode=templatePreview
[19]: https://app.datadoghq.com/software/self-service-actions
[20]: https://app.datadoghq.com/idp/reports
[21]: https://app.datadoghq.com/idp/overview/developer
[22]: /es/internal_developer_portal/overview_pages/