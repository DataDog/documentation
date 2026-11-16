---
description: Actualice de forma remota los SDK que impulsan APM, Profiler y Dynamic
  Instrumentation.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentación
  text: Fleet Automation
site_support_id: fleet-automation-standard-features
title: Actualizar SDK
---
{{< callout url="https://www.datadoghq.com/product-preview/remote-upgrade-of-sdk-versions/" btn_hidden="false" header="¡Únase a la vista previa!" >}}
Actualice de forma remota los SDK que impulsan APM, Profiler, Dynamic Instrumentation y más. Solicite acceso para unirse a la vista previa.
{{< /callout >}}

Fleet Automation puede administrar de forma centralizada las actualizaciones remotas de los SDK que impulsan APM, Continuous Profiler, Dynamic Instrumentation y más. Mantener actualizadas las versiones de los SDK de sus servicios le permite beneficiarse de las funciones más recientes, mejoras de rendimiento, correcciones de errores y actualizaciones de seguridad.

<div class="alert alert-info">
No se admite la programación de actualizaciones de SDK.
</div>

## Requisitos previos {#prerequisites}

- Los servicios deben estar instrumentados con [Single Step Instrumentation (SSI)][1].
- Los servicios deben ejecutarse en máquinas virtuales Linux o Windows. No se admite la actualización remota de SDK en entornos de contenedores o Kubernetes.

## Actualice las versiones de SDK {#upgrade-sdk-versions}

1. En Fleet Automation, abra la pestaña [Upgrades][2] y haga clic en {{< ui >}}Upgrade Now{{< /ui >}}.

   {{< img src="/agent/fleet_automation/upgrade-screen2.png" alt="La pestaña Upgrades con el botón Upgrade Now." style="width:100%;" >}}

1. Seleccione {{< ui >}}SDK language{{< /ui >}} y {{< ui >}}version{{< /ui >}}. Puede actualizar un SDK de lenguaje a la vez.

   {{< img src="agent/fleet_automation/sdk-upgrade-language.png" alt="Menú desplegable de selección de lenguaje y versión del SDK." style="width:100%;" >}}

1. Seleccione los hosts que desea actualizar. Filtre por información de servidor o etiquetas para dirigirse a un grupo específico.

   {{< img src="agent/fleet_automation/sdk-upgrade-hosts.png" alt="Pantalla de selección de servicios con opciones de filtrado para reducir la lista de servicios a actualizar." style="width:100%;" >}}

1. Revise el plan de implementación y haga clic en {{< ui >}}Upgrade Hosts{{< /ui >}} para iniciar la actualización.

   {{< img src="agent/fleet_automation/sdk-upgrade-plan.png" alt="Vista del plan de implementación que muestra la lista de servicios preparados para la actualización del SDK." style="width:100%;" >}}

1. Reinicie los servicios para comenzar a usar los SDK actualizados.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[2]: https://app.datadoghq.com/fleet/agent-upgrades