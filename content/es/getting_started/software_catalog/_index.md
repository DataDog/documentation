---
aliases:
- /es/getting_started/service_catalog
further_reading:
- link: /software_catalog/
  tag: Documentación
  text: Catálogo de software
- link: https://learn.datadoghq.com/courses/managing-service-catalog
  tag: Centro de aprendizaje
  text: Gestión de servicios con el catálogo de servicios
- link: https://www.datadoghq.com/blog/service-owner-knowledge-with-datadog-service-catalog/
  tag: Blog
  text: Simplifica la gestión de microservicios con el catálogo de servicios de Datadog
- link: /software_catalog/troubleshooting
  tag: Documentación
  text: Solucionar problemas
- link: /software_catalog/scorecards
  tag: Documentación
  text: Cuadros de mando de servicio
title: Empezando con Software Catalog
---

{{< img src="/getting_started/software_catalog/overview_image.jpeg" alt="Vista de Software Catalog Reliability que muestra varios servicios y sus MTTR asociados, métricas de despliegue, errores, incidentes, SLOs y estados de monitor." style="width:90%;" >}}

## Información general

Datadog Software Catalog proporciona una visión consolidada de tus servicios, combinando metadatos de propiedad, perspectivas de rendimiento, análisis de seguridad, asignación de costes y mucho más. Disponer de este eje centralizado permite a tus equipos de desarrollo detectar y gestionar componentes críticos en tus entornos de tiempo de ejecución.

Esta página te guiará a través de Empezando con Software Catalog en Datadog.

## Requisitos previos

Si aún no lo has hecho, crea una [cuenta de Datadog][1]. 

## Añadir entradas a Software Catalog

### Servicios detectados automáticamente

Software Catalog detecta automáticamente servicios según telemetrías de rendimiento de aplicaciones como [APM][2], [USM][3] y [RUM][4]. La integración con APM permite a Datadog detectar rutinariamente nuevos servicios con la misma frecuencia con la que se recopilan tus trazas. Con USM, el Datadog Agent se conecta a tus hosts compatibles con eBPF. USM detecta automáticamente los servicios que se ejecutan en esta infraestructura y las etiquetas utilizando el [etiquetado de servicios unificado][5]. 

### Servicios definidos por el usuario

Si no utilizas estos productos, puedes declarar manualmente servicios como entradas en el registro `service.definition.yaml`. Las definiciones en este archivo incluyen todos los metadatos que el catálogo utiliza para archivar tus servicios. Pueden crearse y actualizarse mediante programación utilizando una API interna o con un servicio de gestión de configuración como Terraform. Debes incluir este archivo en tu control de versiones y actualizarlo cada vez que se añadan nuevos recursos a tu entorno.

El siguiente ejemplo representa un servicio de `shopping-cart` desde una aplicación de comercio electrónico. Incluye metadatos importantes sobre el servicio, tales como el equipo propietario, los lenguajes utilizados, el enlace al runbook y el repositorio de código. 

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: shopping-cart
team: e-commerce
application: shopping-app
tier: "1"
type: web
languages:
  - go
  - python
contacts:
  - type: slack
    contact: https://yourorg.slack.com/archives/e-commerce
  - type: email
    contact: ecommerce@example.com
  - type: microsoft-teams
    contact: https://teams.microsoft.com/example
links:
  - name: Runbook
    type: runbook
    url: http://runbook/shopping-cart
  - name: Source
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Deployment
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Config
    type: repo
    provider: github
    url: https://github.com/consul-config/shopping-cart
  - name: E-Commerce Team
    type: doc
    provider: wiki
    url: https://wiki/ecommerce
  - name: Shopping Cart Architecture
    type: doc
    provider: wiki
    url: https://wiki/ecommerce/shopping-cart
  - name: Shopping Cart RFC
    type: doc
    provider: google doc
    url: https://doc.google.com/shopping-cart
tags:
  - business-unit:retail
  - cost-center:engineering
integrations:
  pagerduty:
    service-url: https://www.pagerduty.com/service-directory/PSHOPPINGCART
  opsgenie:
    service-url: "https://www.opsgenie.com/service/uuid"
    region: "US"
ci-pipeline-fingerprints:
  - id1
  - id2
extensions:
  additionalProperties:
    customField1: customValue1
    customField2: customValue2
{{< /code-block >}}

También puedes utilizar cualquier fuente de conocimiento existente que mantenga tu organización, como tablas de Configuration Management Database (CMDB) (a través de la [integración de ServiceNow de Datadog][6]) y hojas de cálculo, para rellenar tu Software Catalog. Datadog también tiene una [integración con Backstage][7] que te permite importar cualquier dato o servicio registrado aquí en Datadog directamente.

Por último, también puedes crear entradas desde las etiquetas de `service` en otros productos de Datadog como Monitorización de infraestructura y Gestión de logs.

{{< img src="/getting_started/software_catalog/import_entries.jpeg" alt="La pestaña Importar entradas en la sección de configuración del Software Catalog" style="width:90%;" >}}

## Gestión de metadatos en el Software Catalog

Después de crear estas entradas iniciales en tu Software Catalog, es importante mantener el catálogo actualizado de forma coherente para que siga siendo eficaz. Los archivos de definición de servicio deben existir en el control de versiones de tu equipo para facilitar la referencia de nuevos despliegues y otros cambios en los servicios en los que pueda ser necesaria una actualización. 

También puedes automatizar la gestión de los metadatos de tus servicios configurando una [acción de GitHub][8]. Esto también te permitirá asegurarte de que los equipos estén declarando servicios de una manera acorde a tus estándares, como exigir que todos tus servicios de producción tengan enlaces de runbook válidos. 

Si tu organización dispone de un registro de propiedad existente, incluidos sistemas internos como [Backstage][9] o una hoja de cálculo, un equipo central puede programar actualizaciones de los archivos de definición de servicio mediante [llamadas de API][10]. 

### Conecta la telemetría desde todo tu stack de Monitorización.

Conecta los datos de Monitorización del resto de tu plataforma de observabilidad para mejorar la utilidad de tu catálogo.

Con el [etiquetado de servicios unificado][5], puedes utilizar la etiqueta  `service` para hacer referencias cruzadas a entidades de Software Catalog en todos los productos de Datadog. Estas etiquetas pueden ayudar a complementar tus entidades de servicio con metadatos, métricas y otras fuentes de contexto, como Infrastructure Monitoring, RUM, Log Management, Entrega de software y Seguridad.

La telemetría del rendimiento de la aplicación de Universal Service Monitoring y APM también proporcionan un mapeo de dependencias listo para usar para tu ecosistema de sistemas, de modo que puedes ver cómo interactúan los componentes entre sí en todos tus entornos de tiempo de ejecución.

## Enriquecer tu Software Catalog

Cuando la información sobre los servicios se rellene en el catálogo, puedes complementar tus definiciones de servicio con más contexto para que resulten más útiles. Para ello, puedes añadir metadatos clave de servicio a tus archivos de `service.definition.yaml`, por ejemplo: 

- Equipo
- Ingeniero de guardia
- Canal de contacto 
- Enlaces de documentación
- Última versión implementada
- Repositorios de código 
- Enlaces de runbook
- Dependencias de biblioteca y sus versiones
- Dashboards relevantes

Software Catalog utiliza esquemas de definición de servicio para almacenar y mostrar estos metadatos sobre tus servicios. Los esquemas incorporan reglas de validación para garantizar que sólo se aceptan valores válidos. Actualmente existen [cuatro esquemas compatibles][11]: v2, v2.1, v2.2 y v3. 

## Uso de los cuadros de mando de Software Catalog

Los [cuadros de mando de servicios][12] te ayudan a codificar las mejores prácticas de tu organización como reglas que pueden ser evaluadas. Al implementar cuadros de mandos en tu catálogo, tus equipos podrán evaluar la calidad de los servicios desde muchos puntos de vista, por ejemplo:

- Cobertura de la monitorización
- Preparación para producción
- Protocolo de seguridad
- Adopción de las últimas herramientas internas
- Checks de integración

Los cuadros de mando de Datadog incluyen 10 reglas predefinidas que abarcan prácticas de observabilidad, etiquetado de propiedades y puntos de control de preparación para producción. También puedes definir tus propias reglas personalizadas. Por ejemplo, puedes crear un cuadro de mando que contenga un conjunto de reglas que se correspondan con los pasos de tu proceso de revisión de seguridad, de modo que puedas auditar rápidamente si cada uno de tus servicios cumple los requisitos. Estas reglas podrían incluir checks relacionados con el análisis de CVE, configuración de RBAC u otros parámetros de seguridad.

Para añadir reglas personalizadas a tu dashboard de controles de mando: 

1. Haz clic en **Create Rule** (Crear regla) en la página de Scorecards (Cuadros de mando).
2. Especifica el nombre de la regla, el cuadro de mando al que pertenece, una descripción de la regla y el equipo propietario. 
3. Envía un resultado de `pass`, `fail` o `skip` para cada tupla `{rule, service}` que estés evaluando al endpoint [API de Scorecards][13] `/scorecard/outcomes/batch`. 
4. Consulta un resumen de los resultados en el dashboard de controles de mando.

{{< img src="/getting_started/software_catalog/create_rule.jpeg" alt="Crear un modal de Reglas para añadir reglas personalizadas en el dashboard de Cuadros de mando" style="width:90%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com
[2]: /es/tracing
[3]: /es/universal_service_monitoring
[4]: /es/real_user_monitoring
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: /es/integrations/servicenow/#service-ingestion
[7]: /es/integrations/backstage/
[8]: https://www.datadoghq.com/blog/github-actions-service-catalog
[9]: https://backstage.io/docs/overview/what-is-backstage
[10]:/es/api/latest/service-definition
[11]: /es/software_catalog/add_metadata
[12]: /es/software_catalog/scorecards
[13]: /es/api/latest/service-scorecards