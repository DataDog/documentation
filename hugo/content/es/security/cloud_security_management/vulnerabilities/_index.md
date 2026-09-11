---
aliases:
- /es/security/infrastructure_vulnerabilities/
- /es/security/vulnerabilities/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: Documentación
  text: Habilitar la recopilación de SBOM en Cloud Security Vulnerabilities
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: Documentación
  text: Configuración de vulnerabilidades de servidor
- link: /infrastructure/containers/container_images
  tag: Documentación
  text: Visualización de Container Images
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: Documentación
  text: Solución de problemas de Cloud Security Vulnerabilities
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Mejore su flujo de trabajo de solución de problemas con Container Images en
    Datadog Container Monitoring
- link: /security/cloud_security_management/setup/ci_cd/#link-dockerfile-to-vulnerabilities
  tag: Documentación
  text: Vincule un Dockerfile a las vulnerabilidades detectadas en producción
title: Cloud Security Vulnerabilities
---
## Descripción general {#overview}

Cloud Security Vulnerabilities le ayuda a mejorar su postura de seguridad y lograr el cumplimiento, mediante el escaneo continuo de imágenes de contenedores, servidores, imágenes de servidor y funciones sin servidor en busca de vulnerabilidades, desde canalizaciones de CI/CD hasta la producción en vivo. Aprovechando la observabilidad en tiempo de ejecución, le ayuda a priorizar y remediar vulnerabilidades explotables en sus flujos de trabajo diarios, todo en una sola visualización, y sin dependencias de otros productos de Datadog.

Con Cloud Security Vulnerabilities, puede gestionar su estrategia de gestión de seguridad en la nube, todo en un solo lugar:

- Cree un programa de gestión de vulnerabilidades, desde CI/CD pipelines hasta recursos de producción
- Supere auditorías de cumplimiento (como SOC2, PCI, HIPAA, CIS y FedRamp)
- Remedie vulnerabilidades emergentes (CVE de día cero)

**Nota**: Para la gestión de vulnerabilidades en bibliotecas de aplicaciones, consulte [Software Composition Analysis][5]. Para código de aplicación, consulte [Code Security][10].

## Capacidades clave {#key-capabilities}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Agentless Scanning no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Implemente utilizando Agentless o Unified Datadog Agent
: Escanee rápidamente toda su infraestructura en busca de vulnerabilidades, ya sea usando Agentless o utilizando el Unified Datadog Agent que ya tiene implementado.

Haga un inventario de los recursos en la nube, en tiempo real
: Haga un inventario de las imágenes de contenedor, los servidores, las funciones sin servidor y todos los paquetes implementados en su infraestructura, en tiempo real, y exporte su SBOM.

Detecte vulnerabilidades continuamente
: Analice las actualizaciones recientes y las CVE recién publicadas en las imágenes de contenedor en ejecución desde servidores y registros, servidores, imágenes de servidor y sin servidor, e identifique las capas de imágenes de contenedor vulnerables.

Priorice las vulnerabilidades explotables mediante la observabilidad en tiempo de ejecución
: Aproveche la puntuación de seguridad de Datadog, que se basa en CVSS, incorporando información de CISA KEV, EPSS y la disponibilidad vulneraciones públicas. Con la observabilidad en tiempo de ejecución, puede hacer un seguimiento de la producción, la exposición a ataques, el procesamiento de datos confidenciales y el acceso privilegiado.

Aproveche la remediación guiada
: Vea qué capas están afectadas, obtenga sugerencias específicas para cada imagen y actúe sobre la gestión del ciclo de vida de sus vulnerabilidades.

Implemente automatización e integraciones
: Automatice la creación de tickets de Jira e implemente SLAs. Utilice la API pública de Datadog para exportar vulnerabilidades, cobertura y SBOM.

Explore los informes
: Visualice y haga un seguimiento de los datos de vulnerabilidad en sus paneles.

## Métodos de implementación {#deployment-methods}

Comience con Cloud Security Vulnerabilities y cubra su infraestructura en minutos, utilizando:
- [Agentless Scanning][11]
- [Unified Datadog Agent][12]
- [CI/CD Container Image Scanning][21]

También puede utilizar varios métodos de implementación juntos: utilice el Unified Datadog Agent donde ya lo tenga implementado, la Agentless en otros lugares y el escaneo en CI/CD para detectar vulnerabilidades antes de la producción.

Después de habilitarlo, Datadog comienza a escanear sus recursos continuamente y comienza a informar vulnerabilidades priorizadas en su [{{< ui >}}Cloud Security Vulnerabilities Findings{{< /ui >}} página][1] en el transcurso de una hora.

Utilice estas tablas para decidir con qué solución comenzar:
| Feature | Agentless | Unified Datadog Agent |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| Tiempo de despliegue en su infraestructura | Minutos                                       | Horas a semanas                 |
| Priorización de vulnerabilidades              | Sí                                           | Sí, con contexto de tiempo de ejecución      |
| Frecuencia de escaneo de vulnerabilidades          | 12 horas                                      | Tiempo real                      |

| Contexto de detección de vulnerabilidades | Agentless | Unified Datadog Agent |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------|
| Servidor e imagen de servidor           | Paquetes de SO y paquetes de aplicaciones, asignados a la imagen                                                                                                                | Paquetes de SO                    |
| Imagen de contenedor               | Paquetes de SO y paquetes de aplicaciones, asignados a la imagen                                                                                                                | Paquetes de SO                    |
| Proveedor de nube                | AWS, Azure, GCP                                                                                                                                              | AWS, Azure, GCP, on‑prem, etc. |
| Sistema operativo              | Linux, Windows                                                                                                                                               | Linux, Windows                 |
| Serverless                    | AWS Lambda, Amazon ECS Fargate, Azure Container Apps, Azure Container Instances, GCP Cloud Run (solo despliegue de contenedores)                                   | No aplica                 |
| Registros de contenedores          | Amazon ECR y Google Artifact Registry (en ejecución + en reposo); Azure Container Registry, Docker Hub, GitHub Container Registry, Microsoft Container Registry y registro de Kubernetes (solo extracción autenticada). Consulte [Registros de imágenes de contenedor][24] para obtener más detalles | No aplica                 |

Para obtener más información sobre la compatibilidad, consulte [Cloud Security Vulnerabilities Hosts and Containers Compatibility][13]. Si necesita ayuda, consulte la [guía de solución de problemas][14] o comuníquese con support@datadoghq.com.

## Detecte, priorice y remedie continuamente las vulnerabilidades explotables {#continuously-detect-prioritize-and-remediate-exploitable-vulnerabilities}
La página [{{< ui >}}Cloud Security Vulnerabilities Findings{{< /ui >}}][1] le ayuda a investigar las vulnerabilidades detectadas en sus imágenes de contenedor, imágenes de host, hosts en ejecución y funciones sin servidor mediante capacidades de filtrado y agrupación.

Concéntrese primero en las vulnerabilidades explotables, utilizando el Datadog Severity Score, que combina la puntuación base CVSS con muchos factores de riesgo, incluidos datos confidenciales, sensibilidad del entorno, exposición a ataques, disponibilidad de vulneraciones o fuentes de inteligencia de amenazas.

Para las vulnerabilidades con correcciones disponibles, la página {{< ui >}}Findings{{< /ui >}} proporciona pasos de remediación guiados para ayudar a los equipos de desarrollo y operaciones a resolver problemas de manera más rápida y efectiva. También puede realizar triaje, silenciar, comentar y asignar vulnerabilidades para gestionar su ciclo de vida.

<div class="alert alert-info">Para reutilizar su configuración del explorador en la página de Hallazgos de vulnerabilidades, marque la URL completa de la página. Su consulta de búsqueda y las selecciones de facetas se conservan en la URL.</div>

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="La página de Cloud Security Vulnerabilities Findings que muestra una vulnerabilidad y las acciones que un usuario puede tomar para remediarla" width="100%">}}

En [{{< ui >}}Container Images{{< /ui >}}][7], puede rastrear las vulnerabilidades encontradas en una imagen hasta capas específicas, para que pueda identificar y remediar sus riesgos de seguridad más rápido.

{{< img src="infrastructure/containerimages/image_layer_vulnerabilities.png" alt="Una lista de vulnerabilidades asociadas con cada capa de una imagen" width="100%">}}

Para imágenes de contenedor de una sola etapa no aplanadas creadas a partir de una imagen base pública, Datadog identifica automáticamente la imagen base y distingue las vulnerabilidades heredadas de ella de los paquetes agregados por su imagen. Cuando la atribución está disponible, Datadog muestra el nombre y el resumen de la imagen base, indicando cuándo la remediación requiere actualizar esa imagen base en lugar de cambiar el código de la aplicación. [Visualizar imágenes de contenedor en Datadog][23].

## Rastrear vulnerabilidades de producción hasta el código fuente {#trace-production-vulnerabilities-to-source-code}

Cuando Datadog detecta un CVE en una imagen de contenedor en ejecución, puede vincular el CVE directamente al Dockerfile y la confirmación que introdujeron el paquete vulnerable. Esto cierra la brecha entre una alerta de producción y el cambio de código que la causó, brindando a los desarrolladores el contexto que necesitan para remediar en la fuente en lugar de buscar versiones de paquetes en los registros.

Para habilitar este mapeo de código a la nube, agregue anotaciones de imagen OCI a sus imágenes de contenedor en el momento de la compilación. Datadog utiliza estas anotaciones para mostrar una vista previa del Dockerfile dentro del panel de Vulnerabilidades de imágenes de contenedor y para mostrar el repositorio, la confirmación y la ruta de archivo exactos asociados con la vulnerabilidad.

Para configurar la vinculación de fuentes, consulte [Vincular Dockerfile a vulnerabilidades][22] en la guía de escaneo de imágenes de contenedor de CI/CD.

## Automatización e integración con Jira {#automation-and-jira-integration}
Haga que Cloud Security Vulnerabilities sea parte de su flujo de trabajo diario configurando [{{< ui >}}security notification rules{{< /ui >}}][17] y [pipelines de automatización (en vista previa)][20]:
- Reciba una alerta tras la detección de una vulnerabilidad explotable para su contexto
- Cree tickets de Jira automáticamente
- Configure SLAs para remediar vulnerabilidades

{{< img src="security/vulnerabilities/csm-notifications.png" alt="La pantalla de configuración de reglas de notificación" width="100%">}}

## Seguimiento y generación de informes {#tracking-and-reporting}
Utilice el [{{< ui >}}Cloud Security Vulnerabilities{{< /ui >}} dashboard][18] predeterminado para realizar el seguimiento e informar del progreso a las partes interesadas. Clónelo y modifíquelo según sea necesario para adaptarlo a sus necesidades específicas.

{{< img src="security/vulnerabilities/csm-vm-reporting.png" alt="El dashboard de Cloud Security Vulnerabilities" width="100%">}}

## Explorar paquetes de infraestructura {#explore-infrastructure-packages}

El [{{< ui >}}Infrastructure Packages Catalog{{< /ui >}}][19] proporciona un inventario en tiempo real de todos los paquetes en servidores, imágenes de servidor e imágenes de contenedor implementados en su infraestructura. Ofrece una interfaz que puede utilizar para investigar sus SBOMs, enriquecida con contexto de vulnerabilidad y de tiempo de ejecución.

Evalúe rápidamente el impacto de una vulnerabilidad emergente crítica buscando las versiones de paquete afectadas e identificando todos los recursos que la utilizan.

{{< img src="security/vulnerabilities/csm_package_explorer_3.png" alt="El inventario de paquetes implementados en la infraestructura con contexto de vulnerabilidad y pivot a los recursos que los utilizan" width="100%">}}

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
[23]: https://app.datadoghq.com/security/csm/vm?query=-%40risk.is_image_running%3Afalse%20%40status%3Aopen%20%40risk.has_exploit_available%3Atrue%20%40remediation.is_available%3Atrue%20%40severity%3A%28high%20OR%20critical%29%20%40vulnerability.is_inherited_from_base_image%3Atrue&group=none&order=desc&sort=score
[24]: /es/security/cloud_security_management/setup/agentless_scanning/compatibility/#container-image-registries

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}