---
title: Public Artifact Vulnerabilities
---

## Descripción general

La página Public Artifact Vulnerabilities permite consultar información de vulnerabilidades y respuestas de los artefactos y bibliotecas públicos de Datadog. Es el lugar de referencia para:

- Saber qué vulnerabilidades afectan a un artefacto determinado (por imagen/versión)
- Saber qué artefactos están afectados por una CVE determinada
- Consultar el estado, la justificación, el impacto y las acciones de cada vulnerabilidad

Esta función está en versión beta.

## Cómo acceder

La página Public Artifact Vulnerabilities es accesible desde la página de ayuda, en **Public Artifact Vulnerabilities**.

![Página de ayuda con el enlace Public Artifact Vulnerabilities](/images/data_security/public_artifact_vulnerabilities/help-page.png)

![Página Public Artifact Vulnerabilities](/images/data_security/public_artifact_vulnerabilities/public-artifact-vulnerabilities-page.png)

## Dos formas de usar la página

### 1. Búsqueda por imagen y versión (centrada en el artefacto)

Usa este modo cuando quieras ver todas las vulnerabilidades de un artefacto y versión concretos (por ejemplo, la imagen del Agent de Datadog versión 7.52.0).

- **Image**: Elige un artefacto en el desplegable **Image** (por ejemplo, agent, cluster-agent, synthetic-private-location-worker). La lista se genera a partir de los artefactos públicos disponibles.
- **Version**: Elige una **Version** para esa imagen. Las versiones se ordenan de la más reciente a la más antigua.

La tabla muestra una fila por cada vulnerabilidad que afecta a esa imagen/versión.

**Columnas de la tabla (por imagen/versión):**

| Columna | Propósito |
|---------|-----------|
| Severity | Gravedad de la vulnerabilidad (por ej. Critical, High, Medium, Low, Info). |
| Vulnerability | CVE o identificador de vulnerabilidad y nombre. |
| Platform | Plataforma(s) a la(s) que aplica (por ej. Linux, Windows). La columna Platform también muestra la lista de variantes afectadas por la CVE (por ej. fips, jmx, servercore). |
| Status | Estado actual: por ej. Not affected, Affected, Fixed, Under investigation. |
| Additional Information | Más información sobre el estado de la CVE y la justificación si aplica. Por ejemplo, si el estado es component_not_present, esta columna explica por qué la CVE no afecta al artefacto y cómo se llegó a esa conclusión. Algunos estados no tienen información adicional (por ej. Under investigation significa que aún estamos analizando el impacto de la CVE). |

Puedes usar el cuadro de búsqueda/filtro encima de la tabla para filtrar las filas por palabra clave.

![Búsqueda por imagen y versión](/images/data_security/public_artifact_vulnerabilities/by-image-version.png)

### 2. Búsqueda por CVE (centrada en la CVE)

Usa este modo cuando tengas un ID de CVE y quieras ver qué artefactos/versiones están afectados y cuál es nuestra respuesta para cada uno.

1. En el cuadro de búsqueda en la parte superior de la tabla, introduce uno o más ID de CVE (por ejemplo, `CVE-2024-1234` o `CVE-2024-1234, CVE-2024-5678` para varios).
2. Haz clic en **Find CVE in artifacts**.

La tabla cambia al modo CVE y muestra una fila por cada combinación (CVE, artefacto, versión, estado).

**Columnas de la tabla (por CVE):**

| Columna | Propósito |
|---------|-----------|
| CVE | El ID de la CVE. |
| Artifact Name | Nombre del artefacto (por ej. agent, nombre de biblioteca). |
| Version | Versión del artefacto. |
| Platform | Plataforma(s) de esta fila (por ej. Linux, Windows). |
| Status | Estado de esta CVE/artefacto/versión (por ej. Not affected, Affected, Fixed, Under investigation). |
| Additional Information | Más información sobre el estado de la CVE y la justificación si aplica. |

Tras una búsqueda por CVE, el filtro de la tabla se restablece para que se muestren todas las filas devueltas. Puedes volver a escribir en el cuadro de búsqueda para filtrar los resultados mostrados.

![Búsqueda por CVE](/images/data_security/public_artifact_vulnerabilities/by-cve.png)

## Artefactos disponibles (imágenes)

El desplegable **Image** se rellena con la lista de artefactos públicos que seguimos. Si no ves un artefacto que esperabas, contacta con [Asistencia de Datadog](/help) para solicitar que se añada.

## Opciones y acciones en la página

| Opción o acción | Descripción |
|-----------------|-------------|
| **Search / global filter** | Filtrar las filas de la tabla por cualquier texto. En modo "por imagen/versión", el mismo cuadro de búsqueda se usa antes de hacer clic en **Find CVE in artifacts** para realizar una búsqueda por CVE. |
| **Find CVE in artifacts** | Ejecuta una búsqueda por CVE con el valor actual del cuadro de búsqueda (admite varios ID de CVE separados por comas). Solo aplica cuando quieres buscar por CVE. |
| **Pagination** | Usa la paginación de la tabla para recorrer conjuntos de resultados grandes (por ej. 50 filas por página). |
| **Resizable columns** | Puedes redimensionar el ancho de las columnas para mejorar la legibilidad. |
