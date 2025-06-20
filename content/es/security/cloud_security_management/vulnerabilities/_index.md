---
aliases:
- /es/security/infrastructure_vulnerabilities/
- /es/security/vulnerabilities/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: Documentación
  text: Activar la recopilación de SBOM en CSM Vulnerabilities
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: Documentación
  text: Configuración de vulnerabilidades de host
- link: /infrastructure/containers/container_images
  tag: Documentación
  text: Visualización de las imágenes de contenedor
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: Documentación
  text: Solucionar problemas de CSM Vulnerabilities
- link: https://www.datadoghq.com/blog/csm-vulnerability-management/
  tag: Blog
  text: Mitigar las vulnerabilidades de infraestructura con Datadog Cloud Security
    Management
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Mejorar el flujo de trabajo de solución de problemas con imágenes de contenedor
    en Datadog Container Monitoring
title: Cloud Security Management Vulnerabilities
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management Vulnerabilities está en Vista previa para el <a href="/getting_started/site">sitio Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).
Solicita acceso <a href="https://www.datadoghq.com/product-preview/csm-vulnerability-management-govcloud/">rellenando este formulario</a>.
</div>
{{< /site-region >}}

## Información general

Cloud Security Management Vulnerabilities (CSM Vulnerabilities) te ayuda a mejorar tu postura de seguridad y lograr el cumplimiento mediante el análisis continuo de imágenes de contenedor, hosts, imágenes de host y funciones serverless en busca de vulnerabilidades, desde los pipelines CI/CD hasta la producción en directo. Aprovechando la capacidad de observación en tiempo de ejecución, te ayuda a priorizar y corregir vulnerabilidades explotables en tus flujos de trabajo diarios, todo en una única vista y sin dependencias de otros productos de Datadog.

Con CSM Vulnerabilities, puedes gestionar tu estrategia de gestión de la seguridad en la nube, todo en un solo lugar:

- Crea un programa de gestión de vulnerabilidades, desde los pipelines CI/CD hasta los recursos de producción.
- Aprobar auditorías de cumplimiento (como SOC2, PCI, HIPAA, CIS y FedRamp)
- Corregir vulnerabilidades emergentes (CVE de día cero)

**Nota**: Para la gestión de vulnerabilidades en bibliotecas de aplicaciones, consulta [Software Composition Analysis][5]. Para el código de las aplicaciones, consulta [Code Security][10].

## Capacidades clave

Desplegar utilizando Agentless o el Datadog Agent unificado
: Analiza rápidamente todo tu infraestructura en busca de vulnerabilidades, ya sea utilizando Agentless el Datadog Agent unificado que ya tienes desplegado.

Inventariar recursos en la nube, en tiempo real
: Realiza un inventario en tiempo real de imágenes de contenedor, hosts, funciones serverless y todos los paquetes desplegados en tu infraestructura y exporta tu SBOM.

Detectar vulnerabilidades de forma continua 
: Analiza actualizaciones recientes y CVE recientemente publicados, en imágenes de contenedor en ejecución, hosts, imágenes de host y funciones serverless, e identifica las capas vulnerables de las imágenes de contenedor.

Priorizar vulnerabilidades explotables, utilizando la capacidad de observación en tiempo de ejecución
: Aprovecha la puntuación de la seguridad de Datadog, basada en CVSS, incorporando información de CISA KEV, EPSS y la disponibilidad pública de exploits. Con la capacidad de observación en tiempo de ejecución, puedes monitorizar la producción, la exposición a ataques, el procesamiento de datos confidenciales y el acceso privilegiado.

Aprovechar la corrección guiada
: Observa qué capas están afectadas, obtén sugerencias específicas para cada imagen y actúa sobre la gestión del ciclo de vida de tus vulnerabilidades.

Implementar la automatización y las integraciones
: Automatiza la creación de tickets de Jira e implementa SLA. Utiliza la API pública de Datadog para exportar vulnerabilidades, cobertura y SBOM.

Explorar informes
: Observa y monitoriza datos de vulnerabilidad en tus dashboards.

## Métodos de despliegue

Empieza con CSM Vulnerabilities y cubre tu infraestructura en minutos, utilizando:
- [Análisis Agentless][11]
- [Datadog Agent unificado][12]

También puedes utilizar ambos métodos de despliegue: el Datadog Agent unificado, donde ya lo tienes desplegado, y Agentless, en otros lugares.

Luego de la activación, Datadog comienza a analizar tus recursos de forma continua y comienza a informar de las vulnerabilidades priorizadas en tu [Explorador de CSM Vulnerabilities][1] en una hora. 

Utiliza estas tablas para decidir con qué solución empezar: 
| Característica                              | Agentless                                    | Datadog Agent unificado         |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| Tiempo de despliegue en infraestructura | Minutos                                      |  Horas a semanas             |
| Priorización de vulnerabilidades           | Sí                                        | Sí, con contexto en tiempo de ejecución        |
| Frecuencia de análisis de vulnerabilidades     |  12 horas                            | Tiempo real                      |

| Contexto de detección de vulnerabilidades             | Agentless                                     | Datadog Agent unificado          |
|-------------------------------------------|-----------------------------------------------|--------------------------------|
| Host e imagen de host                       | Paquetes de sistema operativo y de aplicaciones, asignados a la imagen | Paquetes de sistema operativo                    |
| Imagen de contenedor                           | Paquetes de sistema operativo y de aplicaciones, asignados a la imagen | Paquetes de sistema operativo                    |
| Proveedor de la nube                            | AWS, [Azure (Vista previa)][15]                    | AWS, Azure, GCP, on-prem, etc. |
| Sistema operativo                          | Linux                                         | Linux, Windows                 |
| Serverless                                | AWS Lambda                                    | No aplicable                 |
| Registros de contenedores                      | [Amazon ECR (Vista previa)][16]                    | No aplicable                 |

Para obtener más información sobre compatibilidad, consulta [Compatibilidad de hosts y contenedores de CSM Vulnerabilities][13]. Si necesitas ayuda, consulte la [guía para solucionar problemas][14] o ponte en contacto con support@datadoghq.com.

## Detectar, priorizar y corregir continuamente vulnerabilidades explotables
El [Explorador de CSM Vulnerabilities][1] te ayuda a investigar las vulnerabilidades detectadas en tus imágenes de contenedor y host, hosts en ejecución y funciones serverless utilizando funciones de filtrado y agrupación.

Céntrate primero en las vulnerabilidades explotables, utilizando la puntuación de gravedad de Datadog que combina la puntuación CVSS base con varios factores de riesgo, como datos confidenciales, sensibilidad del entorno, exposición a ataques, disponibilidad de exploits o fuentes de información sobre amenazas.

Para vulnerabilidades con correcciones disponibles, el Explorador proporciona pasos de corrección guiados para ayudar a los equipos de desarrollo y operaciones a resolver los problemas de forma más rápida y eficaz. También puedes clasificar, silenciar, comentar y asignar vulnerabilidades para gestionar su ciclo de vida.

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability.png" alt="Explorador de CSM Vulnerabilities que muestra una vulnerabilidad y las acciones que puede realizar el usuario para corregirla" width="100%">}}

## Automatización e integración Jira
Permite que CSM Vulnerabilities forme parte de tu flujo de trabajo diario, configurando [reglas de notificación de seguridad][17] y [pipelines de automatización (en Vista previa)][20]:
- Recibir alertas cuando se detectan vulnerabilidades explotables en tu contexto
- Crear tickets de Jira automáticamente
- Configurar SLA para corregir vulnerabilidades

{{< img src="security/vulnerabilities/csm-notifications.png" alt="Pantalla de configuración de una regla de notificación" width="100%">}}

## Seguimiento e informes
Utiliza el [dashboard de CSM Vulnerabilities][18] predefinido para realizar un seguimiento e informar de los progresos a las partes interesadas. Clónalo y modifícalo según tus necesidades.

{{< img src="security/vulnerabilities/csm-vm-reporting.png" alt="Dashboard de CSM Vulnerabilities" width="100%">}}

## Explorar paquetes de infraestructura

El [Catálogo de paquetes de infraestructura][19] proporciona un inventario en tiempo real de todos los paquetes en hosts, imágenes de host e imágenes de contenedor desplegados en tu infraestructura. Ofrece una interfaz que puedes utilizar para investigar tus SBOM, enriquecida con vulnerabilidades y contextos de tiempo de ejecución.

Evalúa rápidamente el impacto de una vulnerabilidad crítica emergente buscando las versiones de paquetes afectadas e identificando todos los recursos que la utilizan.

{{< img src="security/vulnerabilities/csm_package_explorer.png" alt="Inventario de paquetes desplegados en la infraestructura con un contexto de vulnerabilidades y la vista de los recursos que los utilizan" width="100%">}}

## Tutorial en vídeo

En el siguiente vídeo, se ofrece una descripción general de cómo activar y utilizar CSM Vulnerabilities:

{{< img src="security/csm/how-to-use-csm-vulnerabilities.mp4" alt="Vídeo que brinda una descripción general de cómo instalar y usar CSM Vulnerabilities" video=true >}}

[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /es/security/code_security/software_composition_analysis/
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[10]: /es/security/code_security/iast/
[11]: /es/security/cloud_security_management/setup/agentless_scanning/
[12]: /es/security/cloud_security_management/setup/agent
[13]: /es/security/cloud_security_management/vulnerabilities/hosts_containers_compatibility
[14]: /es/security/cloud_security_management/troubleshooting/vulnerabilities/
[15]: https://www.datadoghq.com/product-preview/agentless-vulnerability-scanning-for-azure/
[16]: https://www.datadoghq.com/product-preview/ecr-vulnerability-scanning/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: https://app.datadoghq.com/dash/integration/csm_vulnerabilities?fromUser=true&refresh_mode=sliding&from_ts=1733323465252&to_ts=1733928265252&live=true
[19]: https://app.datadoghq.com/security/catalog/libraries
[20]: https://www.datadoghq.com/product-preview/security-automation-pipelines/

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}