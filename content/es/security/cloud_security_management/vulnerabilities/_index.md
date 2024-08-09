---
aliases:
- /es/security/infrastructure_vulnerabilities/
- /es/security/vulnerabilities/
further_reading:
- link: /security/cloud_security_management/setup/csm_pro/?tab=aws#configure-the-agent-for-containers
  tag: Documentación
  text: Configuración de las vulnerabilidades de imágenes de contenedor
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
<div class="alert alert-warning">Cloud Security Management Vulnerabilities no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Información general

Cloud Security Management Vulnerabilities (CSM Vulnerabilities) te ayuda a proteger de forma proactiva tu infraestructura en la nube mediante la detección, priorización y gestión de vulnerabilidades en tus imágenes de contenedor y hosts. Aprovecha el [contexto de observabilidad][6] detallado y los conocimientos del sector para ayudar a corregir las vulnerabilidades que son más importantes para ti en un momento dado.

**Nota**: Si buscas gestión de vulnerabilidades para tus bibliotecas de aplicación y código de aplicación personalizado, consulta [Análisis de composición de software][5].

## Explorar las vulnerabilidades
El [Vulnerabilities Explorer][1] muestra una lista completa de las vulnerabilidades detectadas en tu infraestructura, ordenándolas en función de su gravedad y ofreciendo funciones de grupos, filtros y clasificación para que puedas investigar, asignar y solucionar los problemas.

{{< img src="security/vulnerabilities/csm_vulnerabilities_3.png" alt="La página de CSM Vulnerability ordenada por vulnerabilidades únicas con el panel lateral" width="100%">}}

Selecciona una vulnerabilidad específica para ver sus detalles, incluidos qué contenedores y hosts están afectados, la puntuación de desglose de la gravedad y los pasos de corrección recomendados.
La gravedad de una vulnerabilidad se modifica a partir de la puntuación base para tener en cuenta lo siguiente:

- Si se está ejecutando la infraestructura subyacente y cuál es la amplitud del impacto.
- El entorno en el que se ejecuta la infraestructura subyacente. Por ejemplo, si el entorno no es de producción, se rebaja la gravedad.
- Si existe un exploit activo para una vulnerabilidad dada a partir de fuentes como [catálogo de CISA KEV][9].

{{< img src="security/vulnerabilities/container_vulnerability_3.png" alt="Detalles de una vulnerabilidad específica, que destaca los próximos pasos y el desglose de la gravedad" width="100%">}}

También puedes ver las vulnerabilidades de tus imágenes de contenedor en la página de [imágenes de contenedor][2]. Puedes ordenar por **fuente**, **etiqueta de imagen**, **repo digest** y más. Para ver detalles adicionales sobre cualquier vulnerabilidad, haz clic en la imagen de contenedor y revisa la pestaña **Vulnerabilities** (Vulnerabilidades).

{{< img src="security/vulnerabilities/container_images.png" alt="La pestaña Imágenes de contenedor que destaca vulnerabilidades y la función de ordenar por columna de contenedor" width="100%">}}

En el explorador de detalles, también puedes ver los recursos afectados en CSM para conocer mejor tu riesgo global.

{{< img src="security/vulnerabilities/container_vulnerability_side_panel.png" alt="Los detalles del panel lateral de Imágenes de contenedor en la pestaña de vulnerabilidades" width="100%">}}

Todas las vulnerabilidades incluyen una colección de enlaces y referencias a sitios web o fuentes de información que te ayudan a comprender el contexto que subyace a cada vulnerabilidad.

## Análisis y corrección

El [Vulnerabilities Explorer][1] también ofrece opciones de clasificación para las vulnerabilidades detectadas que te permiten cambiar el estado de una vulnerabilidad y asignarla a miembros individuales para su corrección y seguimiento.

**Nota**: Para ayudar a enforcarte en las vulnerabilidades que realmente importan, las vulnerabilidades se cierran automáticamente para la infraestructura que ya no se esté ejecutando o que contenga la versión corregida del paquete anteriormente vulnerable.

{{< img src="security/vulnerabilities/csm_remediate.png" alt="Explorador de detalles de una vulnerabilidad específica que destaca la capacidad de corregir y asignarla a un miembro de equipo" width="100%">}}

## Tutorial en vídeo

En el siguiente vídeo, se ofrece una descripción general de cómo activar y utilizar CSM Vulnerabilities:

{{< img src="security/csm/how-to-use-csm-vulnerabilities.mp4" alt="Vídeo que brinda una descripción general de cómo instalar y usar CSM Vulnerabilities" video=true >}}

[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /es/security/application_security/software_composition_analysis/
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}