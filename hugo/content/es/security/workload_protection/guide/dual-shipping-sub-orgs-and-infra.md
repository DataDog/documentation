---
description: Requisitos y consideraciones para el envío doble de datos de Workload
  Protection a dos organizaciones de Datadog.
disable_toc: false
further_reading:
- link: /agent/configuration/dual-shipping/
  tag: Documentación
  text: Envío doble
- link: /account_management/multi_organization/
  tag: Documentación
  text: Administración de cuentas de múltiples organizaciones
- link: /infrastructure/
  tag: Documentación
  text: Infrastructure Monitoring
title: Implementación dual segura de Workload Protection en varias organizaciones
---
Esta guía explica por qué y cómo realizar el envío doble de datos de Workload Protection a dos organizaciones de Datadog; por ejemplo, una organización principal utilizada por los equipos de plataforma y una segunda organización utilizada solo por los equipos de seguridad.

{{< partial name="security-platform/WP-billing-note.html" >}}

## ¿Por qué realizar el envío doble de datos de Workload Protection? {#why-dual-ship-workload-protection-data}

El [envío doble][1] envía los mismos eventos de tiempo de ejecución de Workload Protection desde un único Datadog Agent a dos organizaciones. Esto es útil cuando diferentes equipos necesitan acceso a diferentes datos en Datadog. Por ejemplo, un equipo de seguridad necesita señales, hallazgos y flujos de trabajo de investigación de Workload Protection, mientras que los equipos de plataforma o de aplicaciones en la organización principal no deberían ver datos de seguridad.

En cada organización de destino, habilite Workload Protection para que Datadog pueda analizar los eventos de tiempo de ejecución entrantes y generar señales y hallazgos.

## Requisito de Infrastructure Monitoring {#infrastructure-monitoring-requirement}

<div class="alert alert-warning">
Datadog no recomienda ejecutar Workload Protection en una organización o suborganización que no tenga habilitado Infrastructure Monitoring.
</div>

Workload Protection depende de [Infrastructure Monitoring][2] para ofrecer una experiencia completa:

- Las reglas de backend enriquecen los eventos del Agent con **contexto de infraestructura** (proveedor de nube, servidor, clúster de Kubernetes, contenedor e imagen), lo que potencia los flujos de trabajo de detección, hallazgos e investigación.
- **Las etiquetas de servidor y contenedor** definen el contexto para el despliegue de políticas y los filtros de reglas en todo su entorno.
- La página [Coverage][3] y los flujos de trabajo de investigación pivotan hacia vistas de infraestructura para identificar servidores sin protección y reconstruir historias de ataques.

Sin Infrastructure Monitoring, la experiencia de Workload Protection está incompleta.

## Envío doble y suborganizaciones {#dual-shipping-and-sub-organizations}

Para configurar el envío doble, consulte la siguiente documentación:

- [Dual Shipping][1]: configuración del Agent para eventos de tiempo de ejecución de Workload Protection, métricas de infraestructura y otros tipos de telemetría. Consulte la sección [Workload Protection][1] para obtener `runtime_security_config.endpoints` configuraciones.
- [Administración de cuentas de múltiples organizaciones][4]: Cómo funcionan las suborganizaciones, incluyendo el aislamiento de datos entre organizaciones y el seguimiento del uso desde una organización principal.

<div class="alert alert-warning">
El envío doble puede afectar la facturación si envía datos a múltiples organizaciones de Datadog. Para obtener más información, contacte a <a href="/help/">Datadog Support</a>.
</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/dual-shipping/
[2]: /es/infrastructure/
[3]: /es/security/workload_protection/inventory/
[4]: /es/account_management/multi_organization/