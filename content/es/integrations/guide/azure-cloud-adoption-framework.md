---
further_reading:
- link: /integrations/azure/
  tag: Documentación
  text: Integración de Azure con Datadog
- link: https://www.datadoghq.com/blog/migrate-to-azure-with-the-microsoft-cloud-adoption-framework/
  tag: Blog
  text: Migración a Azure con Microsoft Cloud Adoption Framework
title: Azure Cloud Adoption Framework con Datadog
---

## Información general

El uso del marco de adopción de la nube de Azure con Datadog puede ayudarte a garantizar migraciones seguras y rápidas a un nuevo entorno de nube, ya sea desde entornos on-premises u otros entornos de nube.

Puedes hacer lo siguiente:

1. Preparar tu cuenta de Datadog para que tus equipos ejecuten de manera eficiente sus migraciones de cargas de trabajo. Esta es la etapa de "planificación".
2. Utilizar Datadog para medir el estado de tus entornos originales y las nuevas cargas de trabajo a medida que tus equipos las lanzan en sus nuevas zonas de aterrizaje. Esta es la etapa de "migración".

Esta guía documenta el proceso de migración para organizaciones que siguen el Cloud Adoption Framework de Azure.

Si aún no tienes una cuenta de Datadog, puedes [iniciar una prueba de dos semanas][1].

## Planificación

Al planificar tu migración, prepara tu cuenta de Datadog para monitorizar tus nuevas cargas de trabajo tan pronto como se migren a tu cuenta de Azure haciendo lo siguiente:

1. Habilita la [integración de Azure con Datadog][2] para que tus nuevas cargas de trabajo puedan indicar su rendimiento y estado.
2. Documenta una estrategia etiquetado que tus equipos puedan usar para describir sus cargas de trabajo a medida que se migran.
3. Configura dashboards que las partes interesadas puedan utilizar para seguir el progreso de migración y comprender el estado general de las nuevas cargas de trabajo.
4. Establece canales de comunicación para la respuesta a incidentes.

### Habilitación de las integraciones de Azure con Datadog

Datadog y Azure se han asociado para ofrecer los servicios de Datadog dentro de tu cuenta de Azure. Puedes crear un recurso de Datadog para vincular tu cuenta de Datadog con tu cuenta de Azure para cada una de tus zonas de aterrizaje y acceder a tus datos de observabilidad en Azure.

Para obtener más información sobre este proceso a fin de determinar qué datos de Azure deseas recopilar en Datadog, consulta la [documentación de Microsoft Azure][2].

El recurso de Datadog simplifica la configuración de una gran lista de integraciones de Azure con Datadog y aumenta significativamente la visibilidad de tus equipos sobre el estado y el rendimiento de las nuevas cargas de trabajo de Azure. Datadog recomienda habilitar la [integración de Azure DevOps][3] para que tus equipos puedan correlacionar los datos del rendimiento de las cargas de trabajo con los eventos de compilación y lanzamiento.

Para obtener más información sobre la configuración de esta integración, consulta [Microsoft Azure DevOps][4].

Datadog ofrece muchas integraciones para mejorar la comunicación con tus equipos cuando algo necesita su atención, como Microsoft Teams o Slack.

Agrega todas las integraciones de comunicación que usa tu organización. Para obtener la lista completa de integraciones e instrucciones de configuración, consulta [Integraciones][5].

### Etiquetas (tags)

El etiquetado es fundamental para monitorizar de forma eficaz tus aplicaciones y entornos. Antes de comenzar a migrar a tu zona de aterrizaje de Azure, debes implementar una estrategia de etiquetado.

Si bien puede parecer intimidante, esto no requiere mucho tiempo ni complejidad. Los buenos candidatos para etiquetas incluyen cualquier dato que sea útil para categorizar tu infraestructura o servicios.

Añade las siguientes etiquetas a tus recursos siempre que corresponda:

| Nombre de la etiqueta       | Descripción                                                                                                                                                                                                     |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `env`          | Para `prod`, `staging` y `dev`.                                                                                                                                                                               |
| `service`      | En caso de duda, utiliza el mismo valor que `ApplicationName`.                                                                                                                                                         |
| `version`      | Identifica qué versión de una aplicación se está utilizando.                                                                                                                                                       |
| `team`         | Define qué equipo ha creado o gestiona el recurso. Crea un canal de Microsoft Teams independiente para cada equipo a fin de que puedan recibir comunicaciones sobre el estado de sus servicios. |
| `owner`        | Define quién es específicamente responsable de un recurso.                                                                                                                                                         |
| `workload`     | Aclara con qué carga de trabajo se relaciona un recurso y ayuda en las comparaciones de rendimiento y KPI entre el legacy y la nube.                                                                                                  |
| `landing-zone` | Identifica en qué zona de aterrizaje se encuentra un recurso (si existe) y ayuda en las comparaciones de rendimiento y KPI entre el legacy y la nube.                                                                                     |

Cloud Adoption Framework de Azure ofrece una [estrategia de etiquetado predefinida][6] que se superpone ligeramente con la lista anterior. Revisa este documento e implementa las etiquetas que corresponden a tu organización, especialmente las que se enumeran en la sección **Minimum Suggested Tags**.

### Dashboards

Datadog ofrece varios dashboards listos para usar para los clientes que utilizan servicios relacionados con Azure. Para obtener una lista de los dashboards disponibles, consulta [Integraciones de Azure][7].

Una vez que tengas una estrategia de etiquetado que se adapte bien a tu organización, Datadog recomienda [clonar dashboards listos para usar][8] y añadir [variables de plantilla de dashboard][9] de tu lista de etiquetas estandarizadas.

Con las variables de plantilla de dashboard, los dashboards de Datadog brindan visibilidad de amplios resúmenes de datos y subconjuntos específicos de datos por etiqueta. Por ejemplo, si añades una variable de plantilla para la etiqueta `workload` a un dashboard, puedes usar ese dashboard como resumen del rendimiento de muchas cargas de trabajo y filtrar todo el dashboard para obtener el rendimiento de una carga de trabajo específica.

De esta manera, un solo dashboard se vuelve útil para todas las cargas de trabajo sin necesidad de gestionar dashboards separados para cada carga de trabajo.

### Canales de comunicación para la respuesta a incidentes

Muchas organizaciones optan por configurar canales de comunicación dedicados que reflejen la jerarquía de propiedad de sus servicios o cargas de trabajo. Datadog recomienda combinar la convención de nomenclatura de estos canales de comunicación con la estrategia de etiquetado.

Por ejemplo, si has estandarizado el uso de una etiqueta `owner`, configura los grupos de correo electrónico de investigación o los canales de comunicación cuyos nombres estén definidos por ese valor de etiqueta `owner`. La configuración de [identificadores dinámicos][10] permite a los equipos garantizar que la alerta correcta llegue a la persona involucrada correspondiente.

## Migración

Una vez que tengas tu cuenta de Datadog preparada, tus equipos pueden usar Datadog para garantizar una migración sin problemas desde sus entornos originales a las nuevas cargas de trabajo de la zona de aterrizaje.

Para cada carga de trabajo, este proceso implica lo siguiente:

1. Instalar y configurar el Datadog Agent para garantizar una monitorización integral y consistente de los entornos heredados y las cargas de trabajo nuevas.
2. Configurar dashboards para poder observar el estado de los entornos heredados y las nuevas cargas de trabajo en paralelo.
3. Configurar monitores para que los equipos de investigación puedan responder a cambios importantes en los KPIs de rendimiento.
4. Añadir tests de Synthetics para monitorear de forma proactiva degradaciones inesperadas en la experiencia del usuario.
5. Configurar SLOs a fin de documentar el estado de los KPIs para que las partes interesadas puedan visualizarlos.

### Resolución de las brechas de observabilidad en el entorno original

Como propietario de una carga de trabajo o de un servicio, la mejor forma de obtener una observabilidad integral y consistente en el entorno original y en las nuevas cargas de trabajo de Azure es instalar el Datadog Agent.

El Datadog Agent es liviano y está diseñado para ejecutarse en todos los servidores (on-premise o en un proveedor de nube) y recopilar los datos que necesitas para verificar el estado de tus servicios y reunirlos en tu cuenta de Datadog.

[Esta página][11] te guía a través de la instalación del Agent en servidores individuales, así como también explica la instalación con la herramienta de gestión de configuración preferida.

Una vez que hayas instalado el Datadog Agent, añade los siguientes métodos de recopilación de datos para obtener una visibilidad más completa del estado de tu entorno:

  1. [Añade integraciones para recopilar datos][12] específicos de las tecnologías que emplean tus servicios.
  2. [Habilita Application Performance Monitoring (APM)][13] para medir los recuentos de solicitudes, la latencia y las tasas de error de tus servicios.
  3. [Captura los logs generados por tu entorno][14] para obtener un contexto más profundo sobre cuándo las métricas y trazas (traces) se comportan de manera inesperada. Si tienes muchos logs, [almacena solo los más críticos][15].
  4. [Habilita Cloud Network Monitoring (CNM)][16] para garantizar una comunicación eficiente entre tus servicios. CNM es esencial en los procesos de migración, ya que tu entorno original podría necesitar comunicarse con tu nuevo entorno en la nube.

Antes de migrar tu nueva carga de trabajo, instala el Agent, configura la recopilación de datos completa en tu entorno heredado y diseña tus nuevas cargas de trabajo para incluir el Datadog Agent con la misma recopilación de datos completa.

Sigue los estándares de etiquetado de tu organización para garantizar que todos los datos de rendimiento puedan comprenderse e identificarse de manera consistente para el equipo, la carga de trabajo y la zona de aterrizaje adecuados.

### Dashboards de migración y estado de las cargas de trabajo

Una vez que los datos sobre el estado fluyen hacia la cuenta de Datadog, puedes ver y comprender tu entorno desde los mapas de visualización de Datadog, incluidos los mapas de [host][17], [contenedor][18], [servicio][19] y [tráfico de red][20], y desde cualquiera de los [dashboards listos para usar][21] que son específicos de las tecnologías que has integrado.

Puedes clonar y personalizar esos dashboards o crear dashboards personalizados para ver los datos que necesitas para tus casos de uso específicos.

En algunos casos, puede tener sentido visualizar el rendimiento del entorno heredado y las nuevas cargas de trabajo en paralelo.

Sigue estos pasos para crear un dashboard de ejemplo:

1. [Crea un dashboard][22] en tu cuenta de Datadog.
2. Haz clic en el icono **Settings** de la esquina derecha.
3. Haz clic en **Import dashboard JSON**. Para obtener más información, consulta [Parámetros de dashboards][23].
4. Pega o carga la definición JSON del dashboard que se encuentra en [`azure_caf_side_by_side_dashboard.json`][24].

### Envío de alertas procesables a los propietarios de las cargas de trabajo

A medida que migras tus cargas de trabajo, asegúrate de que las personas adecuadas reciban alertas automáticas cuando se superen los umbrales de KPI de rendimiento importantes.

Para ello, crea monitores en Datadog que observen constantemente el estado de las cargas de trabajo y activen notificaciones para tus canales de comunicación a través de Microsoft Teams, Slack, servicios de localización y sistemas de tickets. Para obtener más información, consulta [Monitores][25].

Si tus etiquetas se asignan de manera efectiva a canales de investigación dedicados (por ejemplo, si tienes un canal de Teams para cada propietario, equipo o espacio de trabajo), puedes configurar tus monitores para [notificar dinámicamente al canal de comunicación apropiado][10] con variables de plantilla de monitor.

La configuración de alertas procesables y efectivas varía ampliamente entre las organizaciones, por lo que se recomienda configurar nuevos monitores para que se adapten específicamente a las necesidades de los equipos. Consulte el [archivo `azure_caf_service_errors_15_min.json`][26] para obtener la definición de un monitor de muestra.

### Synthetic Monitoring proactivo

Puedes configurar [tests de Synthetics][27] para verificar de forma proactiva que una experiencia de cliente esté en buen estado para tus usuarios finales.

Los tests de Synthetics son fundamentales cuando las nuevas cargas de trabajo sirven a los mismos usuarios finales que los entornos heredados. Si la migración introduce un error o una degradación inesperados, puedes señalar los problemas y responder a ellos antes de que los clientes se vean afectados.

También puedes [incorporar estos tests en tus canalizaciones de CI/CD][28] en Azure DevOps para probar la experiencia del usuario final como parte del proceso de implementación.

### Documentar el éxito con los SLOs

Configura los objetivos de nivel de servicio (SLOs) para documentar los objetivos de disponibilidad y el éxito de las cargas de trabajo durante la migración.

Para obtener más información sobre cómo configurar los SLOs y exponerlos a las partes interesadas mediante dashboards, consulta [Objetivos de nivel de servicio][29].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://us3.datadoghq.com/signup
[2]: /es/integrations/azure/?tab=link&site=us3
[3]: /es/integrations/azure_devops/#overview
[4]: /es/integrations/azure_devops/#setup
[5]: /es/integrations/#cat-collaboration
[6]: https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-tagging#minimum-suggested-tags
[7]: https://app.datadoghq.com/dashboard/lists/preset/3?q=azure
[8]: /es/dashboards/configure/#configuration-actions
[9]: /es/dashboards/template_variables/
[10]: /es/monitors/notify/variables/?tab=is_alert#dynamic-handles
[11]: https://app.datadoghq.com/account/settings/agent/latest
[12]: https://app.datadoghq.com/account/settings#integrations
[13]: https://app.datadoghq.com/apm/getting-started
[14]: https://app.datadoghq.com/logs/onboarding
[15]: /es/logs/guide/getting-started-lwl/
[16]: /es/network_monitoring/cloud_network_monitoring/
[17]: https://app.datadoghq.com/infrastructure/map
[18]: https://app.datadoghq.com/infrastructure/map?node_type=container
[19]: https://app.datadoghq.com/apm/map
[20]: https://app.datadoghq.com/network/map
[21]: https://app.datadoghq.com/dashboard/lists/preset/3
[22]: https://app.datadoghq.com/dashboard/lists#
[23]: /es/dashboards/#copy-import-or-export-dashboard-json
[24]: /resources/json/azure_caf_side_by_side_dashboard.json
[25]: /es/monitors/
[26]: /resources/json/azure_caf_service_errors_15_min.json
[27]: /es/synthetics/
[28]: /es/synthetics/cicd_integrations/configuration?tab=npm
[29]: /es/monitors/service_level_objectives/