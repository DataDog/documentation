---
cascade:
  algolia:
    subcategory: Getting Started
description: Primeros pasos con Datadog para socios de ventas y servicios
title: Introducción
---
Datadog proporciona información sobre las infraestructuras de nube híbrida y las aplicaciones de sus clientes. La interfaz de usuario intuitiva y la potente API le permiten incorporar, aprovisionar y gestionar los diversos entornos de sus clientes, mientras establece la seguridad de los datos en cada cuenta.

Esta sección cubre las mejores prácticas y le ayuda a comenzar a monitorear los entornos de sus clientes a través de lo siguiente. Se cubren los siguientes temas:

- [Sentar las bases][1]: Contiene información sobre cómo comenzar y qué decisiones clave debe tomar desde el principio.
- [Ingesta de datos][2]: Explica cómo se pueden introducir datos en Datadog y qué requisitos previos deben cumplirse en sus entornos.
- [Entrega de valor][3]: Explica los pasos recomendados después de que tenga datos fluyendo hacia Datadog.
- [Facturación e informes de uso][4]: Cubre el monitoreo del uso individual de los clientes y el uso agregado de la plataforma Datadog en configuraciones de cuenta de organización única y múltiple.
- [Medición y facturación de uso multiinquilino][12]: Cubre el Admin Org, utilizado para gestionar de forma centralizada el uso, los costos y la facturación de los clientes finales.

## Guía de habilitación de ventas para socios {#partner-sales-enablement-guide}

Consulte la [guía de habilitación de ventas para socios][5] para obtener una hoja de ruta de capacitación que lo prepare para el proceso de ingeniería de ventas de Datadog.
## Manténgase actualizado con Datadog {#staying-up-to-date-with-datadog}

Existen varias formas en las que puede mantenerse actualizado con Datadog y conocer las nuevas funciones:
- Puede [ver las notas de la versión][6] en el sitio de Datadog
- Como miembro de Datadog Partner Network, tiene acceso exclusivo al [portal de Datadog Partner Network][7]. Allí encontrará:
  - Materiales de capacitación y material complementario
  - El seminario web informativo trimestral de DPN: vea las sesiones grabadas en la biblioteca de activos o esté atento a la invitación en su bandeja de entrada.
- Datadog comparte las muchas lecciones aprendidas sobre sistemas distribuidos y escalables en la nube con la serie [Datadog on...][8].

### Información de estado {#status-information}

Datadog proporciona los siguientes recursos para que obtenga información actualizada sobre el estado del servicio:
- Región de EE. UU.: [https://status.datadoghq.com][9]
- Región de la UE: [https://status.datadoghq.eu][10]

Suscríbase a esta página para recibir notificaciones sobre cambios de estado.

Si desea ver el estado de las integraciones de terceros que pueda haber habilitado con Datadog, consulte: [https://datadogintegrations.statuspage.io][11].

### Otros recursos {#other-resources}

Explore otros recursos importantes para mantenerse al día con Datadog:

{{< whatsnext desc="Repositorios de GitHub" >}}
    {{< nextlink href="https://github.com/DataDog/datadog-agent/" >}}Datadog Agent: El código fuente de la versión 7 y la versión 6 del Datadog Agent. {{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/integrations-core/" >}}Integrations core: Agent Integrations que Datadog desarrolla y admite oficialmente.{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/integrations-extras/" >}}Integrations extras: Datadog Integrations mantenidas por la comunidad.{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/Miscellany" >}}Miscellany: Scripts y herramientas diversos de Datadog.{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/dpn" >}}DPN: Aplicaciones de muestra para socios.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Blog y redes sociales de Datadog" >}}
    {{< nextlink href="https://www.datadoghq.com/blog/" >}}Blog de Datadog{{< /nextlink >}}
    {{< nextlink href="https://www.linkedin.com/company/datadog/" >}}LinkedIn{{< /nextlink >}}
    {{< nextlink href="https://x.com/datadoghq" >}}X{{< /nextlink >}}
    {{< nextlink href="https://www.facebook.com/datadoghq/" >}}Facebook{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="YouTube" >}}
    {{< nextlink href="https://www.youtube.com/user/DatadogHQ" >}}Canal oficial de YouTube{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE" >}}Lista de reproducción de consejos y trucos{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Listas de reproducción de Dash Conferences" >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPzYWUp9NA8IfbC47zxM57M" >}}Dash 2026{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaO91zHnerkZ5EZJ-qcqK4ib" >}}Dash 2025{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaNd5cmcY3ey4QoeyDk6aMKz" >}}Dash 2024{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPhn1p7Sz6nc_6-9YInd__u" >}}Dash 2023{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaOlLse2WlvFXYRJ8iirG2QO" >}}Dash 2022{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaO-_rgnDSBn221gWacNCkDr" >}}Dash 2021{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaMlgvtlJRyXGgt4i-9Oiyi1" >}}Dash 2020{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPkMoleskq9YcWMWvYfBCRB" >}}Dash 2019{{< /nextlink >}}

{{< /whatsnext >}}

[1]: /es/partners/laying-the-groundwork/
[2]: /es/partners/data-intake/
[3]: /es/partners/delivering-value/
[4]: /es/partners/billing-and-usage-reporting/
[5]: /es/partners/sales-enablement/
[6]: https://app.datadoghq.com/release-notes
[7]: https://partners.datadoghq.com/
[8]: https://datadogon.datadoghq.com/
[9]: https://status.datadoghq.com
[10]: https://status.datadoghq.eu
[12]: /es/partners/multi_tenant_billing/
[11]: https://datadogintegrations.statuspage.io