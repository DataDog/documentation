---
categories:
- configuración y despliegue
- rastreo
custom_kind: integración
dependencies: []
description: Monitorización de métricas de Docker con Datadog
doc_link: https://docs.datadoghq.com/integrations/docker/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-kubernetes-docker/
  tag: Blog
  text: Monitorización de Kubernetes + Docker con Datadog
- link: https://www.datadoghq.com/blog/docker-logging/
  tag: Blog
  text: Prácticas recomendadas para la generación de logs en Docker
git_integration_title: Docker
has_logo: true
integration_id: Docker
integration_title: Docker
integration_version: ''
is_public: true
manifest_version: '1.0'
name: Docker
public_title: Integración de Datadog y Docker
short_description: Monitorización de métricas de Docker con Datadog
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Docker es un proyecto de código abierto que automatiza el despliegue de aplicaciones dentro de contenedores de software.

Obtén métricas de Docker en tiempo real para:

- Visualizar el rendimiento de tus contenedores
- Correlacionar el rendimiento de los contenedores con las aplicaciones que se ejecutan en su interior

## Configuración

Si quieres ejecutar el Agent dentro de un contenedor, consulta la [documentación de Docker Agent][1].


## Datos recopilados

Para obtener información sobre métricas, eventos, y checks de servicio, consulta [Datos de Docker recopilados][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/es/containers/docker/
[2]: https://docs.datadoghq.com/es/containers/docker/data_collected/