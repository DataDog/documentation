---
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/set_up_pipelines/
  tag: Documentación
  text: Configurar pipelines
- link: observability_pipelines/configuration/install_the_worker/
  tag: Documentación
  text: Instalar el Worker
- link: observability_pipelines/configuration/live_capture/
  tag: Documentación
  text: Más información sobre Live Capture
- link: observability_pipelines/troubleshooting
  tag: Documentación
  text: Solucionar problemas
title: Configuración
---

## Información general

{{< img src="observability_pipelines/setup/pipeline_ui.png" alt="La página de pipelines con una fuente que va a dos grupos de procesadores y dos destinos" style="width:100%;" >}}

Observability Pipelines te permite recopilar, procesar y enrutar logs dentro de tu propia infraestructura. Un pipeline consta de tres componentes básicos:

- [Fuente][1]: eecibe logs de una herramienta como el Datadog Agent.
- [Procesadores][2]: transformar, enriquecer o filtrar logs.
- [Destinos][3]: dónde se envían los logs (por ejemplo, Datadog, Amazon S3, Splunk, Google Security Operations y Microsoft Sentinel).

Crea e despliega pipelines para recopilar, transformar y enrutar tus logs utilizando uno de estos métodos:

 - Interfaz de usuario de pipeline
 - [API][4]
 - [Terraform][5]

 Consulta [Configurar pipelines][6] para obtener información detallada sobre la configuración de la fuente, el procesador y el destino.

 ## Referencias adicionales

 {{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/sources/
[2]: /es/observability_pipelines/processors/
[3]: /es/observability_pipelines/destinations/
[4]: /es/api/latest/observability-pipelines/#create-a-new-pipeline
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[6]: /es/observability_pipelines/configuration/set_up_pipelines/