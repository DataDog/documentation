---
description: Más información sobre cómo correlacionar métricas de la infraestructura
  con tus ejecuciones de trabajos de GitLab Autoscale.
further_reading:
- link: /continuous_integration/pipelines/gitlab
  tag: Documentación
  text: Configurar CI Visibility en un pipeline de GitLab
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: Documentación
  text: Más información sobre cómo buscar y administrar las ejecuciones de tu pipeline
title: Correlacionar métricas de la infraestructura con GitLab Jobs en Datadog
---

<div class="alert alert-info"><strong>Nota</strong>: Este método sólo se aplica a los ejecutores que utilizan la "Instancia" o los ejecutores de "Docker Autoscaler".</div>

## Información general

Al hacer clic en un trabajo de GitLab en el [Explorador de CI Visibility][9], puedes acceder a una pestaña **infraestructura** con información sobre el host, el sistema, etiquetas (tags) del host, métricas del host y más.

{{< img src="continuous_integration/infrastructure_tab.png" alt="La pestaña de infraestructura que muestra información sobre un host y su sistema y las métricas del host como el uso de la CPU y los promedios de la carga" style="width:100%;">}}

En esta guía se explica cómo correlacionar las métricas de la infraestructura con tus trabajos de GitLab si estás utilizando la "Instancia" de GitLab o los ejecutores de "Docker Autoscaler" y [CI Visibility][1].

## Requisitos previos

El Datadog Agent debe instalarse en las máquinas virtuales (VM) donde se ejecutarán los trabajos de GitLab. Esto no es donde se ejecuta la [instancia de GitLab][2] ni el ejecutor de [Docker Autoscaler][3], sino en las VM que se crean con el complemento transitorio.

## Asegúrate de que el Datadog Agent esté instalado en tus instancias

Si estás utilizando un [AWS Autoscaling Group][4], debes asegurarte de que la imagen de la máquina que está configurada en la plantilla se lance con el [Datadog Agent ][5].

Para comprobar que hayas realizado este paso correctamente, puedes intentar ejecutar un trabajo y deberías ver aparecer el host en la [página de lista de infraestructuras][6].

Si utilizas AWS, asegúrate de que el nombre del host tenga el formato `“i-xxxxx”`. Si no es así, debes check que tu instancia sea compatible con IMDSv1. Para obtener más información, consulta la [documentación oficial de AWS][7].

Puedes configurar esto en la plantilla de tu AWS Autoscaling Group. El Datadog Agent utiliza el endpoint de servicio de metadatos para resolver el nombre del host.

## Configura CI Visibilility y la recopilación de logs para tus trabajos de GitLab

Para obtener instrucciones sobre cómo configurar CI Visibility para tus trabajos de GitLab, consulta [Configurar Pipeline Visibility en un pipeline de GitLab][1].

Para comprobar que hayas realizado la configuración correctamente, puedes intentar ejecutar un pipeline de GitLab y check si aparece en la [página **Ejecuciones**][8].

Debes activar la recopilación de logs de trabajos. Puedes check si Datadog está recibiendo los logs correctamente haciendo clic en la pestaña de logs de tu pipeline de ejecución.

Una vez completados estos pasos, los trabajos de GitLab deben correlacionarse con las métricas de la infraestructura. La correlación es por trabajo y no por pipeline, ya que diferentes trabajos pueden ejecutarse en hosts diferentes. La pestaña **infraestructura** aparece una vez finalizado el trabajo y Datadog recibe los logs para ese trabajo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/pipelines/gitlab
[2]: https://docs.gitlab.com/runner/executors/instance.html
[3]: https://docs.gitlab.com/runner/executors/docker_autoscaler.html
[4]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html
[5]: /es/agent/
[6]: https://app.datadoghq.com/infrastructure
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: /es/continuous_integration/explorer/?tab=pipelineexecutions