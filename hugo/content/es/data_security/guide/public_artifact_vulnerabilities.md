---
description: Busque información sobre CVE y vulnerabilidades de los artefactos disponibles
  públicamente de Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-public-artifact-vulnerabilities-openvex/
  tag: Blog
  text: Reduzca el ruido de CVE con evaluaciones OpenVEX en Datadog
title: Public Artifact Vulnerabilities
---
La página Public Artifact Vulnerabilities le permite visualizar información sobre vulnerabilidades y respuestas para los artefactos y bibliotecas disponibles públicamente de Datadog. Úsela para buscar:

- Qué vulnerabilidades afectan a un artefacto determinado (por imagen/versión)
- Qué artefactos se ven afectados por un CVE determinado
- Estado, justificación, impacto y declaraciones de acción para cada vulnerabilidad

## Cómo acceder a {#how-to-access}

La página Public Artifact Vulnerabilities es pública. No necesita iniciar sesión para visualizarla.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Abra la [página Public Artifact Vulnerabilities][1], o vaya a la página Help y haga clic en {{< ui >}}View Public Artifact Vulnerabilities{{< /ui >}}.

[1]: https://app.datadoghq.com/public-artifact-vulnerabilities
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
Abra la página Public Artifact Vulnerabilities en `https://app.datadoghq.com/public-artifact-vulnerabilities`.
{{< /site-region >}}

## Uso de la página {#using-the-page}

### Búsqueda por artefacto {#look-up-by-artifact}

Utilice la vista de artefactos para visualizar todas las vulnerabilidades de una familia, imagen y versión específicas (por ejemplo, la versión 7.52.0 de la imagen del Datadog Agent).

- {{< ui >}}Family{{< /ui >}}: Elija una categoría como {{< ui >}}Agent platform{{< /ui >}}, {{< ui >}}APM library injection{{< /ui >}}, {{< ui >}}Private action runners{{< /ui >}}, {{< ui >}}Telemetry collectors{{< /ui >}}, {{< ui >}}Serverless{{< /ui >}}, {{< ui >}}Private deployments{{< /ui >}} o {{< ui >}}Build & CI{{< /ui >}}. Su selección limita las opciones del menú desplegable {{< ui >}}Image{{< /ui >}}.
- {{< ui >}}Image{{< /ui >}}: Elija una imagen de la familia seleccionada. La lista se crea a partir de artefactos públicos disponibles.
- {{< ui >}}Version{{< /ui >}}: Elija una versión de la imagen seleccionada. Las versiones se ordenan de la más reciente a la más antigua.

La tabla se carga y muestra una fila por cada vulnerabilidad que afecta a esa imagen y versión.

<div class="alert alert-tip">Para filtrar sus resultados actuales, ingrese una palabra clave en el cuadro de búsqueda sin hacer clic en {{< ui >}}Find CVE in artifacts{{< /ui >}}.</div>

{{< img src="data_security/public_artifact_vulnerabilities/artifact-view.png" alt="Buscar por artefacto" style="width:100%;" >}}

**Columnas de la tabla (por imagen/versión):**

| Columna | Propósito |
|--------|---------|
| Severity | Gravedad de la vulnerabilidad (por ejemplo, Critical, High, Medium, Low e Info). |
| Vulnerability | Identificador CVE o identificador y nombre de la vulnerabilidad. |
| Platform | Plataformas aplicables. Pase el cursor sobre un valor de plataforma para ver las variantes específicas que cubre, incluyendo las compilaciones FIPS y no FIPS. |
| Status | Estado actual: por ejemplo, Not affected, Affected, Fixed y Under investigation. |
| Additional Information | Más información sobre el estado de la CVE y la justificación del estado si es necesario. Por ejemplo, si el estado es component_not_present, esta columna explica por qué la CVE no afecta al artefacto y cómo se llegó a esa conclusión. Algunos estados, como Under investigation, no tienen información adicional porque el impacto aún se está analizando. |

### Buscar por CVE {#look-up-by-cve}

Utilice la vista de CVE para encontrar qué artefactos y versiones están afectados por vulnerabilidades específicas, y el estado de cada uno.

1. En el cuadro de búsqueda en la parte superior de la tabla, ingrese uno o más ID de CVE (por ejemplo, `CVE-2024-1234` o `CVE-2024-1234, CVE-2024-5678` para varios).
2. Haga clic en {{< ui >}}Find CVE in artifacts{{< /ui >}}.

La tabla cambia al modo CVE y muestra una fila por cada combinación de CVE, artefacto y versión.

<div class="alert alert-tip">Para filtrar sus resultados actuales, ingrese una palabra clave en el cuadro de búsqueda sin hacer clic en {{< ui >}}Find CVE in artifacts{{< /ui >}}.</div>

{{< img src="data_security/public_artifact_vulnerabilities/cve-view.png" alt="Buscar por CVE" style="width:100%;" >}}

**Columnas de la tabla (por CVE):**

| Columna | Propósito |
|--------|---------|
| CVE | El ID de CVE. |
| Artifact Name | Nombre del artefacto (por ejemplo, agente, nombre de la biblioteca). |
| Version | Versión del artefacto. |
| Platform | Plataformas aplicables. Pase el cursor sobre un valor de plataforma para ver las variantes específicas que cubre, incluyendo las compilaciones FIPS y no FIPS. |
| Status | Estado de esta CVE/artefacto/versión (por ejemplo, Not affected, Affected, Fixed y Under investigation). |
| Additional Information | Más información sobre el estado de la CVE y la justificación del estado si es necesario. |


## Artefactos disponibles (imágenes) {#available-artifacts-images}

El menú desplegable **Image** se completa a partir de la lista de artefactos públicos rastreados. Public Artifact Vulnerabilities admite las **10 versiones más recientes** de imágenes públicas rastreadas. Si falta un artefacto esperado, comuníquese con [Datadog Support][1] para solicitar que se agregue.

## Opciones y acciones en la página {#options-and-actions-on-the-page}

| Opción o acción | Descripción |
|------------------|-------------|
| {{< ui >}}Search / global filter{{< /ui >}} | Filtre las filas de la tabla mediante cualquier texto. En el modo "por imagen/versión", se utiliza el mismo cuadro de búsqueda antes de hacer clic en {{< ui >}}Find CVE in artifacts{{< /ui >}} para ejecutar una búsqueda de CVE. |
| {{< ui >}}Find CVE in artifacts{{< /ui >}} | Ejecuta una búsqueda de CVE utilizando el valor actual del cuadro de búsqueda (admite ID de CVE separados por comas). Solo es relevante cuando desea realizar una búsqueda por CVE. |
| {{< ui >}}Pagination{{< /ui >}} | Utilice la paginación de la tabla para desplazarse por grandes conjuntos de resultados (por ejemplo, 50 filas por página). |
| {{< ui >}}Resizable columns{{< /ui >}} | Puede cambiar el ancho de las columnas para facilitar la lectura. |

[1]: /es/help

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}