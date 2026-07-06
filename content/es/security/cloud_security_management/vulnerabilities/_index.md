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
  text: Configurando vulnerabilidades de host
- link: /infrastructure/containers/container_images
  tag: Documentación
  text: Visualizando Imágenes de Contenedores
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: Documentación
  text: Resolviendo problemas de Vulnerabilidades de Seguridad en la Nube
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Mejore su flujo de trabajo de resolución de problemas con Imágenes de Contenedores
    en la Monitorización de Contenedores de Datadog
title: Vulnerabilidades de Seguridad en la Nube
---
## Descripción General {#overview}

Las Vulnerabilidades de Seguridad en la Nube le ayudan a mejorar su postura de seguridad y lograr cumplimiento, al escanear continuamente imágenes de contenedores, hosts, imágenes de host y funciones sin servidor en busca de vulnerabilidades, desde pipelines de CI/CD hasta producción en vivo. Aprovechando la observabilidad en tiempo de ejecución, le ayuda a priorizar y remediar vulnerabilidades explotables en sus flujos de trabajo diarios, todo en una sola vista, y sin depender de otros productos de Datadog.

Con Vulnerabilidades de Seguridad en la Nube, puede gestionar su estrategia de gestión de seguridad en la nube, todo en un solo lugar:

- Cree un programa de gestión de vulnerabilidades, desde pipelines de CI/CD hasta recursos de producción
- Aprobar auditorías de cumplimiento (como SOC2, PCI, HIPAA, CIS y FedRamp)
- Remediar vulnerabilidades emergentes (CVE de 0 días)

**Nota**: Para la gestión de vulnerabilidades en bibliotecas de aplicaciones, consulte [Análisis de Composición de Software][5]. Para el código de aplicación, consulte [Seguridad del Código][10].

## Capacidades clave {#key-capabilities}

{{< site-region region="gov" >}}
<div class="alert alert-danger">El Escaneo sin Agente no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Desplegar utilizando Agente sin Agente o Agente unificado de Datadog
: Escanea rápidamente toda tu infraestructura en busca de vulnerabilidades, ya sea utilizando sin agente, o usando el Agente unificado de Datadog que ya tienes desplegado.

Inventario de recursos en la nube, en tiempo real
: Inventario de imágenes de contenedores, hosts, funciones sin servidor y todos los paquetes desplegados en tu infraestructura, en tiempo real, y exporta tu SBOM (factura de materiales de software).

Detecta vulnerabilidades de manera continua
: Escanea actualizaciones recientes y CVEs recién publicados, a través de imágenes de contenedores en ejecución desde hosts y registros, imágenes de hosts y funciones sin servidor, e identifica las capas de imágenes de contenedores vulnerables.

Prioriza las vulnerabilidades explotables, utilizando la observabilidad en tiempo de ejecución
: Aprovecha la puntuación de seguridad de Datadog, que se basa en CVSS, incorporando información de CISA KEV, EPSS y disponibilidad pública de exploits. Con la observabilidad en tiempo de ejecución, puedes monitorear la producción, la exposición a ataques, el procesamiento de datos sensibles y el acceso privilegiado.

Aprovecha la remediación guiada
: Ve qué capas están afectadas, obtén sugerencias específicas para cada imagen y actúa en la gestión del ciclo de vida de tus vulnerabilidades.

Implementa automatización e integraciones
: Automatiza la creación de tickets de Jira e implementa SLAs. Usa la API pública de Datadog para exportar vulnerabilidades, cobertura y SBOMs.

Explora informes
: Ve y monitorea los datos de vulnerabilidad en tus paneles.

## Métodos de despliegue {#deployment-methods}

Comienza con Vulnerabilidades de Seguridad en la Nube y cubre tu infraestructura en minutos, utilizando:
- [Escaneo sin Agente][11]
- [Agente Unificado de Datadog][12]
- [Escaneo de Imágenes de Contenedores CI/CD][21]

También puedes usar múltiples métodos de implementación juntos: utiliza el Agente unificado de Datadog donde ya lo tengas desplegado, sin agente en otros lugares, y escaneo de CI/CD para detectar vulnerabilidades antes de la producción.

Una vez que lo hayas habilitado, Datadog comienza a escanear tus recursos de manera continua y comienza a reportar vulnerabilidades priorizadas en tu [página de Hallazgos de Vulnerabilidades de Seguridad en la Nube][1] en menos de una hora.

Utiliza estas tablas para decidir con qué solución comenzar:
| Característica                                   | Sin agente                                     | Agente unificado de Datadog          |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| Tiempo para desplegar en tu infraestructura | Minutos                                       | Horas a semanas                 |
| Priorización de vulnerabilidades              | Sí                                           | Sí, con contexto de ejecución      |
| Frecuencia de escaneo de vulnerabilidades          | 12 horas                                      | En tiempo real                      |

| Alcance de detección de vulnerabilidades | Sin agente                                                                         | Agente unificado de Datadog          |
|-------------------------------|-----------------------------------------------------------------------------------|--------------------------------|
| Host e imagen del host           | Paquetes de OS y paquetes de aplicaciones, mapeados a la imagen                                     | Paquetes de OS                    |
| Imagen de contenedor               | Paquetes de OS y paquetes de aplicaciones, mapeados a la imagen                                     | Paquetes de OS                    |
| Proveedor de nube                | AWS, Azure, GCP                                                                   | AWS, Azure, GCP, en local, etc. |
| Sistema operativo              | Linux, Windows                                                                    | Linux, Windows                 |
| Sin servidor                    | AWS Lambda, Amazon ECS Fargate, Azure Container Apps, Azure Container Instances, GCP Cloud Run (solo implementación de contenedor) | No aplicable                 |
| Registros de contenedores          | Amazon ECR (en ejecución + en reposo), Google Artifact Registry (solo cargas de trabajo en ejecución), Azure Container Registry (solo imágenes de contenedor en ejecución) | No aplicable                 |

Para más información sobre compatibilidad, consulta [Compatibilidad de Hosts y Contenedores de Vulnerabilidades de Seguridad en la Nube][13]. Si necesitas asistencia, consulta la [guía de solución de problemas][14], o contacta a support@datadoghq.com.

## Detectar, priorizar y remediar continuamente vulnerabilidades explotables {#continuously-detect-prioritize-and-remediate-exploitable-vulnerabilities}
La [página de Hallazgos de Vulnerabilidades de Seguridad en la Nube][1] te ayuda a investigar vulnerabilidades detectadas en tus imágenes de contenedor, imágenes de host, hosts en ejecución y funciones sin servidor utilizando capacidades de filtrado y agrupamiento.

Enfócate primero en las vulnerabilidades explotables, utilizando el Puntaje de Severidad de Datadog, combinando el puntaje base de CVSS con muchos factores de riesgo, incluyendo datos sensibles, sensibilidad del entorno, exposición a ataques, disponibilidad de explotación o fuentes de inteligencia de amenazas.

Para vulnerabilidades con soluciones disponibles, la página de Hallazgos proporciona pasos de remediación guiados para ayudar a los equipos de Dev y Ops a resolver problemas de manera más rápida y efectiva. También puedes clasificar, silenciar, comentar y asignar vulnerabilidades para gestionar su ciclo de vida.

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="La página de Hallazgos de Vulnerabilidades de Seguridad en la Nube que muestra una vulnerabilidad y las acciones que un usuario puede tomar para remediarla." width="100%">}}

En [Imágenes de Contenedores][7], puedes rastrear las vulnerabilidades encontradas en una imagen hasta capas específicas, para que puedas identificar y remediar tus riesgos de seguridad más rápido.

{{< img src="infrastructure/containerimages/image_layer_vulnerabilities.png" alt="Una lista de vulnerabilidades asociadas con cada capa de una imagen." width="100%">}}

## Automatización e integración con Jira {#automation-and-jira-integration}
Haz que las Vulnerabilidades de Seguridad en la Nube sean parte de tu flujo de trabajo diario configurando [reglas de notificación de seguridad][17] y [canales de automatización (en Vista Previa)][20]:
- Recibe alertas al detectar una vulnerabilidad explotable para tu ámbito.
- Crea automáticamente tickets en Jira.
- Configura SLA para remediar vulnerabilidades.

{{< img src="security/vulnerabilities/csm-notifications.png" alt="La pantalla de configuración de reglas de notificación." width="100%">}}

## Seguimiento e informes {#tracking-and-reporting}
Utiliza el [tablero de Vulnerabilidades de Seguridad en la Nube][18] listo para usar para rastrear e informar el progreso a las partes interesadas. Clona y modifícalo según sea necesario para adaptarlo a tus necesidades únicas.

{{< img src="security/vulnerabilities/csm-vm-reporting.png" alt="El tablero de Vulnerabilidades de Seguridad en la Nube." width="100%">}}

## Explorar paquetes de infraestructura {#explore-infrastructure-packages}

El [Catálogo de Paquetes de Infraestructura][19] proporciona un inventario en tiempo real de todos los paquetes a través de hosts, imágenes de host e imágenes de contenedores desplegadas en tu infraestructura. Ofrece una interfaz que puedes usar para investigar tus SBOMs, enriquecida con contexto de vulnerabilidad y tiempo de ejecución.

Evalúa rápidamente el impacto de una vulnerabilidad crítica emergente buscando versiones de paquetes afectadas e identificando todos los recursos que la utilizan.

{{< img src="security/vulnerabilities/csm_package_explorer_3.png" alt="El inventario de paquetes desplegados en la infraestructura con contexto de vulnerabilidad y un giro hacia los recursos que los utilizan." width="100%">}}

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

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}