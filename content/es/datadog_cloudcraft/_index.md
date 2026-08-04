---
description: Visualizar y analizar la infraestructura de la nube de AWS con diagramas
  en directo de Cloudcraft en Datadog para solucionar los problemas, analizar la seguridad
  y optimizar los costes
further_reading:
- link: https://www.datadoghq.com/blog/cloud-architecture-diagrams-cost-compliance-cloudcraft-datadog/
  tag: Blog
  text: Planificar nuevas arquitecturas y realiza un seguimiento de tu huella en la
    nube con Cloudcraft (independiente)
- link: https://www.datadoghq.com/blog/introducing-cloudcraft/
  tag: Blog
  text: Crear visualizaciones ricas y actualizadas de tu infraestructura AWS con Cloudcraft
    en Datadog
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: Blog
  text: Identificar y priorizar visualmente los riesgos de seguridad con Cloudcraft
title: Cloudcraft en Datadog
---

## Información general

Cloudcraft ofrece una potente herramienta de visualización en directo de solo lectura de la arquitectura de la nube que te permite explorar, analizar y gestionar tu infraestructura con facilidad. Esta guía, que no debe confundirse con la documentación de [Cloudcraft independiente][1], describe la funcionalidad, la configuración y los casos de uso de Cloudcraft *en Datadog*, detalla sus ventajas para varios usuarios y destaca las características y capacidades clave.

<div class="alert alert-info">Esta documentación se aplica al producto Cloudcraft <em>en Datadog</em>. Para obtener información sobre el producto Cloudcraft independiente, consulta la documentación <a href="/cloudcraft">Cloudcraft (independiente)</a>.</div>

La función central de Cloudcraft es su capacidad para generar diagramas de arquitectura detallados. Estos diagramas representan visualmente los recursos de la nube de AWS para permitirte explorar y analizar tus entornos. Los diagramas de Cloudcraft están optimizados para ofrecer claridad y rendimiento, y te proporcionan una interfaz intuitiva para navegar por despliegues a gran escala. Esto ayuda a los equipos a:

- Rastrear las causas de los incidentes a través de dependencias de la infraestructura.
- Determinar si la infraestructura es la causa de un incidente, como el tráfico entre regiones que genera latencia o mayores costes.
- Analizar y abordar los errores de configuración de seguridad más relevantes.
- Incorporar nuevos miembros al equipo.
- Acelerar el MTTR de los incidentes y las tareas de gobernanza proactivas, simplificando la navegación por la infraestructura.

{{< img src="datadog_cloudcraft/cloudcraft_with_ccm_2.mp4" alt="Cloudcraft en un vídeo de Datadog" video=true >}}

<div class="alert alert-info">Cloudcraft en Datadog solo está disponible actualmente para cuentas de AWS.</a></div>

### Requisitos previos

- Para acceder a Cloudcraft en Datadog, necesitas el [permiso](#permissions) `cloudcraft_read`.
- La [recopilación de recursos][2] debe estar activada para tus cuentas de AWS.
- Para obtener la mejor experiencia, Datadog recomienda altamente utilizar la política [`SecurityAudit`][5] administrada por AWS o la política [`ReadOnlyAccess`][6] más permisiva.
- La visualización de contenidos en la [superposición de seguridad][10] requiere la activación de productos adicionales:
  - Para ver errores de configuración de seguridad y riesgos de identidad, se debe activar [Cloud Security][3].
  - Para ver datos confidenciales, [Sensitive Data Scanner][12] debe estar activado. Para que un usuario active la capa, debe tener el permiso [`data_scanner_read`][13].

**Nota**: Cloudcraft se adapta a los permisos restrictivos excluyendo los recursos inaccesibles. Por ejemplo, si no concedes permiso para enumerar buckets S3, el diagrama excluye esos buckets. Si los permisos bloquean ciertos recursos, se muestra una alerta en la interfaz de usuario.

<div class="alert alert-warning">Activar la recopilación de recursos puede repercutir en los costes de AWS CloudWatch. Para evitar estos cargos, desactiva las métricas de <strong>uso</strong> en la pestaña <strong>Recopilación de métricas</strong> de la <a href="https://app.datadoghq.com/integrations/amazon-web-services">integración Datadog AWS</a>.<br/>

{{< img src="/infrastructure/resource_catalog/aws_usage_toggle.png" alt="Conmutador del uso de AWS en los parámetros de la cuenta" style="width:100%;" >}}</div>

## Empezando

Para empezar a utilizar Cloudcraft, sigue estos pasos:
1. Ve a [**Infrastructure > Resources > Cloudcraft** (Infraestructura > Recursos > Cloudcraft)][7].
2. Se muestra un diagrama en tiempo real de los recursos de tu entorno.

 **Nota**: Para entornos con más de 10.000 recursos, debes filtrar el diagrama por cuenta, región o etiquetas (tags) antes de poder mostrarlo.

{{< img src="datadog_cloudcraft/getting_started_3.mp4" alt="Vídeo que muestra cómo empezar en Cloudcraft seleccionando la cuenta, la región y el recurso" video=true;" >}}

**Nota**: El nombre de la cuenta en el desplegable **Account** (Cuenta) se origina a partir de las etiquetas de tu cuenta de AWS en el cuadro de integración de AWS.

### Agrupar por

Con la opción Agrupar por, Cloudcraft divide tu diagrama en distintas secciones basadas en diferentes tipos de grupos. Esta función ofrece una perspectiva clara y organizada de tus recursos, por lo que resulta especialmente útil para visualizar entornos de nube complejos.

Activa la casilla **Show All Controls** (Mostrar todos los controles) para mostrar las opciones disponibles de **Agrupar por**. También puedes eliminar agrupaciones específicas desmarcando opciones como VPC y Región. Para ver la estructura de anidamiento actual y añadir la capa ACL de red (lista de control de acceso de red), haz clic en el desplegable **More** (Más).

{{< img src="datadog_cloudcraft/cloudcraft_group_by_with_ccm.png" alt="Función Agrupar for en Cloudcraft, resaltando el menú Agrupar por" >}}

#### Agrupar por etiquetas

Puedes agrupar los recursos por etiquetas de AWS, como app, service, team o cost center, para organizar la vista por equipo o carga de trabajo.

**Nota**: La agrupación por etiquetas solo es compatible con las etiquetas de AWS. Las etiquetas del Datadog Agent (por ejemplo, `env`, o `team` de la configuración local) no son compatibles.

{{< img src="datadog_cloudcraft/group_by_tag.mp4" alt="Función Agrupar por etiqueta en Cloudcraft, donde se agrupa por equipo y centro de costes" video=true >}}

### Vistas guardadas 

Las vistas guardadas te permiten guardar en tu diagrama los filtros específicos que son más importantes para ti. Esto permite una solución eficiente de los problemas con consultas delimitadas a tus cuentas, regiones, entornos y recursos.

Para aplicar una vista guardada a tu diagrama:

- Ve a [**Infrastructure > Resources > Cloudcraft** (Infraestructura > Recursos > Cloudcraft)][7]. Selecciona una o más cuentas, regiones y recursos. Aplica los filtros deseados a la vista guardada y haz clic en **+Save as new view** (+Guardar como nueva vista).
- Selecciona la vista guardada deseada en el menú situado en la parte superior de la vista del diagrama. El diagrama se actualiza automáticamente para reflejar la vista elegida.

{{< img src="datadog_cloudcraft/saved_views.png" alt="Captura de pantalla de las vistas guardadas" style="width:50%;" >}}

### Explorar recursos

Utiliza las funciones de ampliar y pasar el cursor por encima para localizar los recursos más importantes. A medida que se amplía la imagen, aparecen más nombres de recursos. Al pasar el cursor por encima de un recurso, aparece un panel con información básica, mientras que al hacer clic en un recurso se abre un panel lateral con datos de observabilidad, costes y seguridad, junto con enlaces cruzados a otros productos relevantes de Datadog.

{{< img src="datadog_cloudcraft/cloudcraft_with_ccm_2.mp4" alt="Vídeo que muestra la función de ampliar y pasar el cursor por encima en Cloudcraft, y el clic en un recurso para abrir el panel lateral" video=true >}}

#### Conmutador de proyección

Cambia el conmutador de la proyección 3D (por defecto) a 2D para visualizar tus recursos desde arriba.

{{< img src="datadog_cloudcraft/cloudcraft_2D.png" alt="Págiuna de inicio de Cloudcraft con el conmutador 2D activado" >}}


### Filtrado y búsqueda

Los diagramas pueden filtrarse por etiquetas, como team, application o service, lo que te permite concentrarte en los recursos pertinentes y conservar el contexto en los recursos conectados. Además, Cloudcraft ofrece una potente función de búsqueda y resaltado que facilita la localización de recursos o grupos de recursos específicos.

Haz clic en el menú **\+Filter** (+Filtrar) para filtrar rápidamente tus recursos con las etiquetas más utilizadas, como service, team, region, etc. Además, haz clic en la opción **More Filters** (Más filtros) para filtrar por etiquetas AWS, etiquetas personalizadas y etiquetas Terraform. La opción de filtro vuelve a cargar el diagrama para mostrar solo la infraestructura que coincide con los criterios de filtrado.

{{< img src="datadog_cloudcraft/cloudcraft_filter.png" alt="Filtrar funciones en Cloudcraft" >}}

### Buscar y resaltar

Utiliza la barra de búsqueda para localizar recursos en el diagrama por nombre, ID o etiqueta. Esta función es muy eficaz para encontrar recursos específicos dentro de tu arquitectura de nube. Resalta los criterios de búsqueda en el diagrama, sin crear un nuevo diagrama, poniendo en gris los elementos que no coinciden con los criterios de búsqueda.

{{< img src="datadog_cloudcraft/search_highlight_2.mp4" alt="Vídeo que muestra la función de búsqueda y resaltado en Cloudcraft" video=true >}}

## Permisos

Para acceder a Cloudcraft en Datadog, necesitas el permiso `cloudcraft_read`. Este permiso está incluido por defecto en el rol de solo lectura de Datadog. Si tu organización utiliza roles personalizados, añade este permiso al rol apropiado. Para obtener más información sobre la gestión de permisos, consulta la [documentación de RBAC][14].

## Siguientes pasos

Aprende a navegar entre las [superposiciones integradas][4] para visualizar tu arquitectura desde diferentes perspectivas. Cada superposición está diseñada para respaldar objetivos operativos específicos, como:

- [Infraestructura][8]: Vista clara de servicios y recursos.
- [Observabilidad][9]: Indica qué hosts tienen instalado el Agent y qué características de observabilidad están activadas.
- [Seguridad][10]: Visibilidad de IAM, cortafuegos y grupos de seguridad.
- [Cloud Cost Management][11]: Seguimiento y optimización de gastos de recursos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloudcraft
[2]: /es/integrations/amazon_web_services/#resource-collection
[3]: /es/security/cloud_security_management
[4]: /es/datadog_cloudcraft/overlays
[5]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/SecurityAudit.html
[6]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html
[7]: https://app.datadoghq.com/cloud-maps
[8]: /es/datadog_cloudcraft/overlays#infrastructure
[9]: /es/datadog_cloudcraft/overlays#observability
[10]: /es/datadog_cloudcraft/overlays#security
[11]: /es/datadog_cloudcraft/overlays#cloud-cost-management
[12]: /es/security/sensitive_data_scanner
[13]: /es/account_management/rbac/permissions/#compliance
[14]: /es/account_management/rbac/