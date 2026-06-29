---
aliases:
- /es/security/infrastructure_vulnerabilities/
- /es/security/vulnerabilities/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: Documentación
  text: Habilitar la recopilación de SBOM en Vulnerabilidades de Seguridad en la Nube
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: Documentación
  text: Configurando vulnerabilidades del host
- link: /infrastructure/containers/container_images
  tag: Documentación
  text: Visualizando Imágenes de Contenedores
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: Documentación
  text: Resolviendo problemas de Vulnerabilidades de Seguridad en la Nube
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Mejore su flujo de trabajo de resolución de problemas con Imágenes de Contenedores
    en Datadog Container Monitoring
- link: /security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities
  tag: Documentación
  text: Vincule un Dockerfile a las vulnerabilidades detectadas en producción
title: Vulnerabilidades de Seguridad en la Nube
---
## Resumen {#overview}

Las Vulnerabilidades de Seguridad en la Nube le ayudan a mejorar su postura de seguridad y lograr cumplimiento, al escanear continuamente imágenes de contenedores, hosts, imágenes de hosts y funciones sin servidor en busca de vulnerabilidades, desde canalizaciones de CI/CD hasta producción en vivo. Aprovechando la observabilidad en tiempo de ejecución, le ayuda a priorizar y remediar vulnerabilidades explotables en sus flujos de trabajo diarios, todo en una sola vista, y sin depender de otros productos de Datadog.

Con las Vulnerabilidades de Seguridad en la Nube, puede gestionar su estrategia de seguridad en la nube, todo en un solo lugar:

- Cree un programa de gestión de vulnerabilidades, desde canalizaciones de CI/CD hasta recursos de producción
- Aprobar auditorías de cumplimiento (como SOC2, PCI, HIPAA, CIS y FedRamp)
- Remediar vulnerabilidades emergentes (CVE de 0 días)

**Nota**: Para la gestión de vulnerabilidades en bibliotecas de aplicaciones, consulte [Análisis de Composición de Software][5]. Para el código de aplicación, consulte [Code Security][10].

## Capacidades clave {#key-capabilities}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Agentless Scanning no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Despliegue utilizando Agentless o el Unified Datadog Agent
: Escanee rápidamente toda su infraestructura en busca de vulnerabilidades, ya sea utilizando Agentless, o mediante el Unified Datadog Agent que ya tiene desplegado.

Inventario de recursos en la nube, en tiempo real
: Inventario de imágenes de contenedor, hosts, funciones sin servidor y todos los paquetes desplegados en su infraestructura, en tiempo real, y exporte su SBOM (Software Bill of Materials).

Detecte vulnerabilidades de manera continua
: Escanee actualizaciones recientes y CVEs recién publicados, a través de imágenes de contenedor en ejecución desde hosts y registros, imágenes de host y funciones sin servidor, e identifique las capas de imágenes de contenedor vulnerables.

Priorice las vulnerabilidades explotables, utilizando la observabilidad en tiempo de ejecución
: Aproveche la puntuación de seguridad de Datadog, que se basa en CVSS, incorporando información de CISA KEV, EPSS y la disponibilidad pública de exploits. Con la observabilidad en tiempo de ejecución, puede monitorear la producción, la exposición a ataques, el procesamiento de datos sensibles y el acceso privilegiado.

Aproveche la remediación guiada
: Vea qué capas están afectadas, obtenga sugerencias específicas para cada imagen y actúe en la gestión del ciclo de vida de sus vulnerabilidades.

Implemente automatización e integraciones
: Automatice la creación de tickets de Jira e implemente SLAs. Utilice la API pública de Datadog para exportar vulnerabilidades, cobertura y SBOMs.

Explore informes
: Vea y realice seguimiento de los datos de vulnerabilidad en sus tableros.

## Métodos de implementación {#deployment-methods}

Comience con las Vulnerabilidades de Seguridad en la Nube y cubra su infraestructura en minutos, utilizando:
- [Agentless Scanning][11]
- [Unified Datadog Agent][12]
- [CI/CD Container Image Scanning][21]

También puede utilizar múltiples métodos de implementación en conjunto: use el Unified Datadog Agent donde ya lo tenga desplegado, Agentless en otros casos, y CI/CD Container Image Scanning para detectar vulnerabilidades antes de la producción.

Después de habilitarlo, Datadog comienza a escanear sus recursos de manera continua y empieza a reportar vulnerabilidades priorizadas en su [Cloud Security Vulnerabilities Findings page][1] en menos de una hora.

Utilice estas tablas para decidir con qué solución comenzar:
| Feature | Agentless | Unified Datadog Agent |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| Tiempo para implementar en su infraestructura | Minutos                                       | Horas a semanas                 |
| Priorización de vulnerabilidades              | Sí                                           | Sí, con contexto en tiempo de ejecución      |
| Frecuencia de escaneo de vulnerabilidades          | 12 horas                                      | En tiempo real                      |

| Vulnerability detection scope | Agentless | Unified Datadog Agent |
|-------------------------------|-----------------------------------------------------------------------------------|--------------------------------|
| Host e imagen del host           | Paquetes de OS y paquetes de aplicaciones, mapeados a la imagen                                     | Paquetes de OS                    |
| Imagen de contenedor               | Paquetes de OS y paquetes de aplicaciones, mapeados a la imagen                                     | Paquetes de OS                    |
| Proveedor de nube                | AWS, Azure, GCP                                                                   | AWS, Azure, GCP, en local, etc. |
| Sistema operativo              | Linux, Windows                                                                    | Linux, Windows                 |
| Serverless | AWS Lambda, Amazon ECS Fargate, Azure Container Apps, Azure Container Instances, GCP Cloud Run (container deployment only) | Not applicable |
| Registros de contenedores          | Amazon ECR (en ejecución + en reposo), Google Artifact Registry (solo cargas de trabajo en ejecución), Azure Container Registry (solo imágenes de contenedores en ejecución) | No aplicable                 |

Para más información sobre compatibilidad, consulte [Cloud Security Vulnerabilities Hosts and Containers Compatibility][13]. Si necesita asistencia, consulte la [troubleshooting guide][14], o comuníquese con support@datadoghq.com.

## Detectar, priorizar y remediar continuamente vulnerabilidades explotables {#continuously-detect-prioritize-and-remediate-exploitable-vulnerabilities}
La [Cloud Security Vulnerabilities Findings page][1] le ayuda a investigar vulnerabilidades detectadas en sus imágenes de contenedor, imágenes de host, hosts en ejecución y funciones sin servidor utilizando capacidades de filtrado y agrupamiento.

Enfóquese primero en las vulnerabilidades explotables, utilizando el Puntaje de Severidad de Datadog, combinando el puntaje base de CVSS con muchos factores de riesgo, incluidos datos sensibles, sensibilidad del entorno, exposición a ataques, disponibilidad de explotación o fuentes de inteligencia de amenazas.

Para las vulnerabilidades con soluciones disponibles, la página de Resultados proporciona pasos de remediación guiados para ayudar a los equipos de Dev y Ops a resolver problemas de manera más rápida y efectiva. También puede clasificar, silenciar, comentar y asignar vulnerabilidades para gestionar su ciclo de vida.

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="La página de Resultados de Vulnerabilidades de Seguridad en la Nube que muestra una vulnerabilidad y las acciones que un usuario puede tomar para remediarla" width="100%">}}

En [Imágenes de Contenedor][7], puedes rastrear vulnerabilidades encontradas en una imagen a capas específicas, para que puedas identificar y remediar tus riesgos de seguridad más rápido.

{{< img src="infrastructure/containerimages/image_layer_vulnerabilities.png" alt="Una lista de vulnerabilidades asociadas con cada capa de una imagen" width="100%">}}

## Rastree las vulnerabilidades de producción hasta el código fuente {#trace-production-vulnerabilities-to-source-code}

Cuando Datadog detecta un CVE en una imagen de contenedor en ejecución, puede vincular el CVE directamente al Dockerfile y al commit que introdujo el paquete vulnerable. Esto cierra la brecha entre una alerta de producción y el cambio de código que la causó, proporcionando a los desarrolladores el contexto que necesitan para remediar en la fuente en lugar de perseguir versiones de paquetes a través de registros.

Para habilitar este mapeo de código a nube, agregue anotaciones de imagen OCI a sus imágenes de contenedor en el momento de la construcción. Datadog utiliza estas anotaciones para mostrar una vista previa del Dockerfile dentro del panel de Container Image Vulnerabilities y para mostrar el repositorio exacto, commit y ruta de archivo asociados con la vulnerabilidad.

Para configurar el enlace de origen, consulte [Link Dockerfile to vulnerabilities][22] en la guía de CI/CD Container Image Scanning.

## Automatización e integración con Jira {#automation-and-jira-integration}
Haga que las Vulnerabilidades de Seguridad en la Nube sean parte de su flujo de trabajo diario configurando [security notification rules][17] y [automation pipelines (in Preview)][20]:
- Reciba alertas al detectar una vulnerabilidad explotable para su contexto
- Cree tickets de Jira automáticamente
- Configure SLAs para remediar vulnerabilidades

{{< img src="security/vulnerabilities/csm-notifications.png" alt="La pantalla de configuración de reglas de notificación" width="100%">}}

## Seguimiento e informes {#tracking-and-reporting}
Utilice el out-of-the-box [Cloud Security Vulnerabilities dashboard][18] para rastrear e informar el progreso a las partes interesadas. Clónelo y modifíquelo según sea necesario para adaptarlo a sus necesidades únicas.

{{< img src="security/vulnerabilities/csm-vm-reporting.png" alt="El Cloud Security Vulnerabilities dashboard" width="100%">}}

## Explorar paquetes de infraestructura {#explore-infrastructure-packages}

El [Catálogo de Paquetes de Infraestructura][19] proporciona un inventario en tiempo real de todos los paquetes en servidores, imágenes de servidor e imágenes de contenedor desplegadas en su infraestructura. Ofrece una interfaz que puede usar para investigar sus SBOMs, enriquecida con contexto de vulnerabilidad y tiempo de ejecución.

Evalúe rápidamente el impacto de una vulnerabilidad crítica emergente buscando versiones de paquetes afectadas e identificando todos los recursos que la utilizan.

{{< img src="security/vulnerabilities/csm_package_explorer_3.png" alt="El inventario de paquetes desplegados en la infraestructura, con contexto de vulnerabilidad y posibilidad de pivotar hacia los recursos que los utilizan." width="100%">}}

[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /es/security/code_security/software_composition_analysis/
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[7]: https://app.datadoghq.com/container-images
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[10]: /es/security/code_security/iast/
[11]: /es/security/cloud_security_management/setup/agentless_scanning/
[12]: /es/security/cloud_security_management/setup/agent
[13]: /es/security/cloud_security_management/vulnerabilities/hosts_containers_compatibility
[14]: /es/security/cloud_security_management/troubleshooting/vulnerabilities/
[16]: https://www.datadoghq.com/product-preview/ecr-vulnerability-scanning/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: https://app.datadoghq.com/dash/integration/csm_vulnerabilities?fromUser=true&refresh_mode=sliding&from_ts=1733323465252&to_ts=1733928265252&live=true
[19]: https://app.datadoghq.com/security/catalog/libraries
[20]: https://www.datadoghq.com/product-preview/security-automation-pipelines/
[21]: /es/security/cloud_security_management/setup/ci_cd
[22]: /es/security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}