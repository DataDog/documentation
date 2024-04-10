---
further_reading:
- link: /service_catalog/
  tag: Documentación
  text: Java
- link: https://learn.datadoghq.com/courses/managing-service-catalog
  tag: Guías
  text: Gestión de servicios con el catálogo de servicio
- link: https://www.datadoghq.com/blog/service-owner-knowledge-with-datadog-service-catalog/
  tag: Blog
  text: Simplifica la gestión de microservicios con el catálogo de servicio de Datadog
- link: /service_catalog/troubleshooting
  tag: Documentación
  text: Python
- link: /service_catalog/scorecards
  tag: Documentación
  text: Python
kind: documentation
title: Empezando con el catálogo de servicio
---

{{< img src="/getting_started/service_catalog/overview_image.jpeg" alt="Vista de fiabilidad del catálogo de servicios que muestra varios servicios y su MTTR asociado, métricas de implementación, problemas, incidentes, SLO y estados de monitor." style="width:90%;" >}}

## Información general

El catálogo de servicio de Datadog proporciona una visión consolidada de tus servicios, al combinar metadatos de propiedad, perspectivas de rendimiento, análisis de seguridad, asignación de costes y mucho más. Disponer de este hub centralizado les permite a tus equipos de desarrollo descubrir y gestionar componentes críticos en tus entornos de tiempo de ejecución.

Esta página te guía a través de Empezando con catálogo de servicio en Datadog.

## Requisitos previos

Si aún no lo has hecho, crea una [cuenta de Datadog][1]. 

## Añadir entradas al catálogo de servicio

### Servicios detectados automáticamente

El catálogo de servicio descubre servicios automáticamente basados en telemetrías de rendimiento de la aplicación tales como [APM][2], [USM][3] y [RUM][4]. La integración con APM le permite a Datadog descubrir rutinariamente nuevos servicios con la misma frecuencia con la que se recopilan tus trazas (traces). Con USM, el Datadog Agent se conecta a tus hosts compatibles con eBPF .USM detecta automáticamente los servicios que se ejecutan en esta infraestructura y los etiqueta utilizando [el etiquetado de servicio unificado][5]. 

### Servicios definidos por el usuario

Si no utilizas estos productos, puedes declarar manualmente servicios como entradas en el registro `service.definition.yaml`. Las definiciones en este archivo incluyen todos los metadatos que el catálogo utiliza para archivar tus servicios. Pueden crearse y actualizarse mediante programación utilizando una API interna o con un servicio de gestión de Configuración como Terraform. Debes incluir este archivo en tu control de versiones y actualizarlo cada vez que se añadan nuevos recursos a tu entorno.

El siguiente ejemplo representa un servicio de `shopping-cart` desde una aplicación de comercio electrónico. Incluye metadatos importantes sobre el servicio, tales como el equipo propietario, los lenguajes utilizados, el enlace al runbook y el repositorio de código. 

{{< code-block lang="yaml" filename="servicio.Datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: shopping-cart
equipo: comercio electrónico
aplicación: shopping-app
nivel: "1"
tipo: web
lenguajes:
  - ir
  - Python
contactos:
  - tipo: slack
    contacto: https://yourorg.slack.com/archives/e-commerce
  - tipo: correo electrónico
    contacto: ecommerce@example.com
  - tipo: microsoft-teams
    contacto: https://teams.microsoft.com/example
enlaces:
  - nombre: Runbook
    tipo: runbook
    url: http://runbook/shopping-cart
  - nombre: Fuente
    tipo: repo
    proveedor: github
    url: https://github.com/shopping-cart
  - nombre: Implementación
    tipo: repo
    proveedor: github
    url: https://github.com/shopping-cart
  - nombre: Config
    tipo: repo
    proveedor: github
    url: https://github.com/consul-config/shopping-cart
  - nombre: Equipo de comercio electrónico
    tipo: doc
    proveedor: wiki
    url: https://wiki/ecommerce
  - nombre: Arquitectura del carrito de compras
    tipo: doc
    proveedor: wiki
    url: https://wiki/ecommerce/shopping-cart
  - nombre: RFC de carrito de compras
    tipo: doc
    proveedor: doc de google
    url: https://doc.google.com/shopping-cart
etiquetas (tags):
  - business-unit:retail
  - cost-center:engineering
integraciones:
  pagerduty:
    service-url: https://www.pagerduty.com/service-directory/PSHOPPINGCART
  opsgenie:
    service-url: "https://www.opsgenie.com/service/uuid"
    región: "EE. UU."
ci-pipeline-fingerprints:
  - id1
  - id2
extensiones:
  additionalProperties:
    customField1: customValue1
    customField2: customValue2
{{< /code-block >}}

También puedes utilizar cualquier fuente de conocimiento existente que mantenga tu organización, como las tablas de Configuration Management Database (CMDB) (a través de [integración de ServiceNow de Datadog][6]) y hojas de cálculo, para rellenar tu catálogo de servicio. Datadog también tiene una [integración con Backstage][7] que te permite importar cualquier dato o servicio registrado aquí en Datadog directamente.

Por último, también puedes crear entradas desde las etiquetas (tags) de `service` en otros productos de Datadog como Monitorización de infraestructura y Gestión de logs.

{{< img src="/getting_started/service_catalog/import_entries.jpeg" alt="Importar la pestaña de entradas en la configuración del catálogo de servicio y la sección de Configuración" style="width:90%;" >}}

## Metadatos de gestión en el catálogo de servicio

Después de crear estas entradas iniciales en tu catálogo de servicio, es importante mantener el catálogo actualizado de forma coherente para que siga siendo eficaz. Los archivos de definición de servicio deben existir en el control de versiones de tu equipo para facilitar la referencia de nuevas implementaciones y otros cambios en los servicios en los que pueda ser necesaria una actualización. 

También puedes automatizar la gestión de tus metadatos de servicio configurando una [acción de GitHub][8]. Esto también te permitirá asegurarte de que los equipos están declarando servicios de una manera que cumpla con tus estándares, como exigir que todos tus servicios de producción tengan enlaces de runbook válidos. 

Si tu organización dispone de un registro de propiedad existente, incluidos sistemas internos como [Backstage][9] o una hoja de cálculo, un equipo central puede programar actualizaciones de los archivos de definición de servicio mediante [llamadas de API][10]. 

### Conecta la telemetría desde todo tu stack de Monitorización.

Conecta los datos de Monitorización del resto de tu plataforma de observabilidad para mejorar la utilidad de tu catálogo.

Con [etiquetado de servicio unificado][5], puedes utilizar la etiqueta (tag) `service` para hacer referencias cruzadas a entidades de servicio del catálogo de servicio en todos los productos Datadog. Estas etiquetas (tags) pueden ayudar a enriquecer tus entidades de servicio con metadatos, métricas, y otras fuentes de contexto como Monitorización de infraestructura, RUM, Gestión de logs, Entrega de software y Seguridad. 

La telemetría del rendimiento de la aplicación de Universal Service Monitoring y APM también proporcionan un mapeo de dependencias listo para usar para tu ecosistema de sistemas, de modo que puedas ver cómo interactúan los componentes entre sí en todos tus entornos de tiempo de ejecución.

## Enriquecer tu catálogo de servicio.

Después de que los servicios se repitan en el catálogo, puedes enriquecer tus definiciones de servicio con contexto adicional para hacerlas más útiles. Para ello, puedes añadir metadatos clave de servicio a tus archivos de `service.definition.yaml`, por ejemplo: 

- Equipo
- Ingeniero de guardia
- Canal de contacto 
- Enlaces de documentación
- Última versión implementada
- Repositorios de código 
- Enlaces de runbook
- Dependencias de biblioteca y sus versiones
- Dashboards relevantes

El catálogo de servicio utiliza esquemas de definición de servicio para almacenar y mostrar estos metadatos sobre tus servicios. Los esquemas incorporan reglas de validación integradas para garantizar que solo se aceptan valores válidos. Actualmente existen [cuatro esquemas compatibles][11]: v2, v2.1, v2.2 y v3. 

## Utilización de los cuadros de mando del catálogo de servicio 

[Servicio de Scorecards][12] te ayuda a codificar las mejores prácticas de tu organización como reglas que pueden ser evaluadas. Al implementar cuadros de mandos en tu catálogo, tus equipos pueden medir muchas dimensiones de la calidad de servicio, entre ellas:

- Gestión de Monitorización
- Preparación de la producción
- Postura de seguridad
- Adopción de las últimas herramientas internas
- Checks de integración

Los Scorecards de Datadog incluyen 10 reglas predefinidas que abarcan prácticas de observabilidad, etiquetado de propiedad y puntos de control de preparación de la producción. También puedes definir tus propias reglas personalizadas. Por ejemplo, puedes crear un cuadro de mando que contenga un conjunto de reglas que se correspondan con los pasos de tu proceso de revisión de seguridad, de modo que puedas auditar rápidamente si cada uno de tus servicios cumple los requisitos. Estas reglas podrían incluir checks relacionados con el análisis de CVE, Configuración de RBAC u otros parámetros de seguridad.

Para añadir reglas personalizadas a tu dashboard de Scorecards: 

1. Haz clic en **Create Rule** (Crear regla) en la página de Scorecards.
2. Especifica el nombre de la regla, el cuadro de mando al que pertenece, una descripción de la regla y el equipo propietario. 
3. Envía un resultado de `pass`, `fail`, o `skip` para cada tupla `{rule, service}` que estés evaluando al endpoint [API de Scorecards][13] `/scorecard/outcomes/batch`. 
4. Ve un resumen de los resultados en el dashboard de Scorecards.

{{< img src="/getting_started/service_catalog/create_rule.jpeg" alt="Crear un modal de regla para añadir reglas personalizadas en el dashboard de Scorecards" style="width:90%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com
[2]: /es/tracing
[3]: /es/universal_service_monitoring
[4]: /es/real_user_monitoring
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: /es/integrations/servicenow/#service-ingestion
[7]: /es/service_catalog/setup#import-data-from-other-sources
[8]: https://www.datadoghq.com/blog/github-actions-service-catalog
[9]: https://backstage.io/docs/overview/what-is-backstage
[10]:/es/api/latest/service-definition
[11]: /es/service_catalog/add_metadata#metadata-structure-and-supported-versions
[12]: /es/service_catalog/scorecards
[13]: /es/api/latest/service-scorecards