---
aliases:
- /es/security_platform/cspm/resource_catalog
- /es/security/cspm/resource_catalog
- /es/security/misconfigurations/resource_catalog
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentación
  text: Misconfiguraciones de Cloud Security
- link: /security/threats/
  tag: Documentación
  text: Workload Protection
- link: https://www.datadoghq.com/blog/datadog-resource-catalog/
  tag: Blog
  text: Administra tus recursos de infraestructura con el Resource Catalog de Datadog
- link: https://www.datadoghq.com/blog/infrastructure-troubleshooting-recent-changes/
  tag: Blog
  text: Resuelve problemas de infraestructura más rápido con Cambios Recientes
- link: https://www.datadoghq.com/blog/resource-catalog-natural-language-querying
  tag: Blog
  text: Utiliza un inglés sencillo para consultar tu infraestructura multi-nube en
    el Resource Catalog
- link: https://www.datadoghq.com/blog/cambia-health-cost-optimization
  tag: Blog
  text: Cómo Cambia Health Solutions ahorró $30,000 mensuales con Cloud Cost Management
    y el Resource Catalog de Datadog
is_beta: true
title: Resource Catalog de Datadog
---
## Descripción general {#overview}

El Resource Catalog de Datadog es el centro de todos tus recursos de infraestructura. Puede ayudarte a gestionar la conformidad de los recursos, investigar las causas raíz de los incidentes y cerrar las brechas de observabilidad en tu infraestructura. Con el Resource Catalog, puedes entender información clave sobre los recursos, como metadatos, propiedad, configuraciones, relaciones entre activos y riesgos de seguridad activos para tus recursos.

El Resource Catalog aprovecha las integraciones en la nube de Datadog y el Datadog Agent para recopilar datos de recursos en la nube, como servidores, bases de datos y servicios de almacenamiento.

{{< img src="/infrastructure/resource_catalog/resource_catalog_new_2.png" alt="La página del Resource Catalog que muestra la pestaña 'Catalog', agrupada por tipo de recurso" width="100%">}}

### Casos de uso {#use-cases}

#### Políticas y reportes de recursos {#resource-policies-and-reporting}
- Obtén visibilidad sobre la conformidad de tu infraestructura en relación con la propiedad, versionado, migraciones, etc.
- Facilita buenas prácticas de etiquetado para optimizar los conocimientos de telemetría cruzada.
- Reduce los riesgos de aplicación identificando y corrigiendo vulnerabilidades de seguridad en las dependencias de tus servicios.
- Proporcionar liderazgo en ingeniería con una visión general de las prácticas de seguridad a través de los equipos y cuentas en la nube.
- Exportar recursos para el mantenimiento de registros o auditorías.

#### Resolver incidentes y problemas de rendimiento {#troubleshoot-incidents-and-performance-issues}
- Acceder a telemetría, tableros y otras visualizaciones de Datadog con información detallada para entender la salud y el rendimiento de tus recursos.
- Localizar a los propietarios de equipos y servicios de los recursos relevantes para acelerar la recuperación de incidentes.
- Ver cambios en la configuración de recursos para identificar posibles causas raíz.

#### Optimizar la observabilidad {#optimize-observability}
- Identificar recursos que pueden ser mejor monitoreados por Datadog y cerrar brechas de observabilidad.
- Asegurar una cobertura de seguridad adecuada identificando recursos que son más propensos a configuraciones incorrectas o que no están reportando activamente configuraciones de seguridad incorrectas.

## Configurar {#setup}

Por defecto, cuando navegas al Resource Catalog, puedes ver los servidores monitoreados por el Datadog Agent, así como los recursos en la nube rastreados para otros productos de Datadog como CNM (Cloud Network Monitoring) y DBM (Database Monitoring). Para ver recursos adicionales en la nube en el Resource Catalog, activa la opción **extend resource collection** desde la página de configuración del Resource Catalog. 

{{< img src="/infrastructure/resource_catalog/resource_catalog_settings.png" alt="La página de configuración del Resource Catalog para extender la colección de recursos" width="100%">}}

<div class="alert alert-warning">Habilitar la colección de recursos puede impactar tus costos de AWS CloudWatch. Para evitar estos cargos, desactiva las métricas de <strong>Uso</strong> en la pestaña de <strong>Colección de Métricas</strong> de la <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog AWS Integration</a>.
</div>

{{< img src="/infrastructure/resource_catalog/aws_usage_toggle.png" alt="Alternar uso de AWS en la configuración de la cuenta" style="width:100%;" >}}

## Navegar por el Resource Catalog {#browse-the-resource-catalog}

En la [página del Resource Catalog][2], explora los recursos en la nube en tu organización de Datadog. El Resource Catalog detecta un recurso ya sea porque tiene instalado el Datadog Agent, o porque se ha configurado una integración en la nube en él. 

### Pestaña Catalog{#catalog-tab}

La pestaña Catalog muestra el contexto de un recurso, incluyendo la propiedad del equipo y los servicios relacionados. Te ayuda a identificar proactivamente y completar la información de propiedad faltante antes de que sea necesaria en un incidente. El Resource Catalog también muestra atributos de recurso personalizados para cada tipo de recurso. Puedes buscar recursos por atributos específicos, como el tipo de instancia para un servidor o la versión de una base de datos.

Si utilizas [Datadog Teams][4], selecciona el interruptor de **Teams** en el panel izquierdo, y luego selecciona el interruptor de los equipos a los que estás asignado para ver solamente los recursos asignados a esos equipos. Además, puedes exportar tu lista del Resource Catalog como un archivo CSV desde la esquina superior derecha de la lista.

Para acceder a la consola de nube relevante para cualquier recurso en tu lista, haz clic en un recurso para abrir un panel lateral. Luego, haz clic en el menú desplegable **Abrir Recurso** en la esquina superior derecha para ser redirigido.

{{< img src="/infrastructure/resource_catalog/resource_catalog_sidepanel_2.png" alt="Panel lateral del Resource Catalog destacando el menú desplegable 'Abrir Recurso'." >}}

### Investigar un servidor o recurso {#investigate-a-host-or-resource}

<div class="alert alert-info">No se muestran secretos en este panel. Cualquier "secreto" mostrado son cadenas generadas aleatoriamente que no representan un riesgo de seguridad.</div>

Hacer clic en un servidor abre un panel lateral con detalles que incluyen:

- **Información del servidor**, como el nombre, la cuenta, el sistema operativo, el tipo de instancia, las etiquetas y los metadatos asociados al servidor.
- **Resumen del servidor** que muestra alertas de seguimiento activas y productos habilitados.
- **Telemetría** incluyendo métricas, registros, trazas y procesos
- **Containers** que muestran métricas para contenedores adjuntos al servidor.
- **Mapa de Infraestructura** que muestra un [diagrama de Cloudcraft][17]
- **Relaciones** que muestra un mapa interactivo de conexiones a otros recursos
- **Perfiles** correlacionados con el servidor (requiere [Profiler][20]).
- **Información** de la red, que puede ser filtrada por etiquetas y mostrada en gráficos personalizables
- **Cambios** que muestran un historial personalizable de cambios en el servidor
- **Seguridad** que muestra configuraciones incorrectas generales, [configuraciones incorrectas de IaC][21], señales, vulnerabilidades, riesgos de identidad y perspectivas de acceso
- **Costo** que incluye recomendaciones para reducir los costos del servidor
- **Agent** que muestra la configuración de tu Datadog Agent en formato JSON.
- **OTel Collector** que muestra la configuración de tu OpenTelemetry Collector (en Vista Previa).

{{< img src="/infrastructure/resource_catalog/resource_catalog_host_side_panel-2.png" alt="Resource Catalog con el panel lateral del servidor abierto" width="100%">}}

Hacer clic en cualquier recurso abre un panel lateral con detalles que incluyen:

- **Resource Info** incluyendo etiquetas específicas y la definición del recurso en formato JSON.
- **Telemetría** incluyendo métricas y registros
- **Relaciones** que muestra un mapa interactivo de conexiones a otros recursos
- **Cambios** que muestran un historial de cambios en el recurso
- **Seguridad** que muestra misconfiguraciones, señales, vulnerabilidades y riesgos de identidad.

## Cambios en el Recurso (en Vista Previa) {#resource-changes-in-preview}

{{< callout url="https://www.datadoghq.com/product-preview/recent-changes-tab/" >}}
Los Cambios en el Recurso están en Vista Previa. Haz clic en <strong>Request Access</strong> y completa el formulario para solicitar acceso.
{{< /callout >}} 

Los Cambios en el Recurso proporcionan visibilidad y control sobre los cambios de configuración en tu infraestructura en la nube. Ayuda a monitorear las modificaciones de los recursos, facilitando la resolución de incidentes y la comprensión de la evolución de tu entorno.

Para más información, consulta [Cambios en el Recurso][16].

{{< img src="/infrastructure/resource_catalog/resource-changes.png" alt="La interfaz de Cambios en el Recurso de Datadog muestra una lista de cambios en la configuración de la infraestructura. La pantalla muestra una instancia de VM llamada \"vm-new-jmcintyre-kafka\" con una actualización de StorageProfile, incluyendo una vista de diferencias lado a lado que resalta los cambios en formato JSON. La tabla muestra múltiples recursos con marcas de tiempo, tipos de cambio (principalmente \"UPDATE\") y detalles de las modificaciones. Los filtros están disponibles en la parte superior para nube, región, entorno y otros atributos." width="100%">}}


## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/setup
[2]: https://app.datadoghq.com/infrastructure/catalog
[3]: /es/integrations/#cat-notification
[4]: /es/account_management/teams
[5]: https://app.datadoghq.com/infrastructure/catalog/configuration
[6]: /es/integrations/amazon_config/#resource-changes-collection
[7]: https://app.datadoghq.com/integrations
[8]: /es/integrations/google_cloud_platform/#resource-changes-collection
[9]: https://www.datadoghq.com/product-preview/recent-changes-tab/
[10]: https://docs.datadoghq.com/es/security/cloud_security_management/misconfigurations/
[11]: https://docs.datadoghq.com/es/security/threats/
[12]: https://docs.datadoghq.com/es/security/cloud_security_management/identity_risks/
[13]: https://docs.datadoghq.com/es/security/cloud_security_management/vulnerabilities/
[14]: https://app.datadoghq.com/integrations/azure
[15]: https://docs.datadoghq.com/es/infrastructure/resource_catalog/schema/
[16]: /es/infrastructure/resource_catalog/resource_changes/
[17]: /es/datadog_cloudcraft/
[18]: /es/integrations/ntp/
[19]: /es/infrastructure/process/?tab=linuxwindows#installation
[20]: /es/profiler/enabling/
[21]: /es/security/code_security/iac_security/