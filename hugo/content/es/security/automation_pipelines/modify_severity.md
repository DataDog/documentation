---
further_reading:
- link: /security/automation_pipelines
  tag: Documentación
  text: Pipelines de automatización
- link: /security/manual_severity_adjustment/
  tag: Documentación
  text: Ajuste de gravedad
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Reglas de modificador de gravedad
---
{{< product-availability >}}

Configure reglas de modificador de gravedad para ajustar la gravedad de los hallazgos y reflejar el contexto empresarial de su organización. Por ejemplo, reduzca la gravedad de los hallazgos en entornos aislados para disminuir el ruido, o aumente la gravedad de los hallazgos en bases de datos que contienen información de identificación personal (PII) para que reciban atención inmediata.

## Crear una regla de modificador de gravedad {#create-a-severity-modifier-rule}

1. En Datadog, vaya a **Security** > **Settings** > [**Findings Automation**][2]. Haga clic en **Add a New Rule**, luego seleccione **Modify Severity Level**. Se abre la página Create a New Rule.
1. En **Rule name**, ingrese un nombre descriptivo para la regla; por ejemplo, "Increase severity for services accessing PII databases".
1. Agregue los criterios de su regla en los siguientes campos:
    - **Cualquiera de estos tipos**: Los tipos de hallazgos que la regla debe verificar. Los tipos disponibles incluyen:
      - Vulnerabilidad de código en tiempo de ejecución
      - Vulnerabilidad de código estático
      - Vulnerabilidad de biblioteca
      - Secreto
      - Infraestructura como código
      - Vulnerabilidad de imagen de contenedor
      - Vulnerabilidad de servidor
      - Configuración incorrecta
      - Ruta de ataque
      - Riesgo de identidad
      - Seguridad de API
      - Actividad de carga de trabajo
    - **Cualquiera de estas etiquetas o atributos**: Las etiquetas o atributos del recurso que deben coincidir para que se aplique la regla.
1. Opcionalmente, haga clic en **Add Severity** para filtrar los hallazgos por nivel de gravedad. La regla coincide con la gravedad ajustada por Datadog de cada hallazgo, antes de cualquier ajuste definido por el usuario.
1. Defina la acción de modificación de gravedad:
    - **Establecer en un nivel específico**: Establece los hallazgos coincidentes en una gravedad fija. Elija entre **Información / Ninguna**, **Baja**, **Media**, **Alta** o **Crítica**.
      <div class="alert alert-info"><strong>Info / None</strong> is only valid for some finding types; see <a href="#severity-floors-by-finding-type">Severity floors by finding type</a>.</div>
    - **Shift up or down one level**: Increases or decreases the severity of matching findings by one level. See [Severity floors by finding type](#severity-floors-by-finding-type) for the lowest severity a finding type can shift down to, and [Evaluation order](#evaluation-order) for what happens when a finding is already at that bound.
1. Opcionalmente, ingrese una **Description** que explique por qué se aplica la regla. Este texto aparece en el panel de desglose de gravedad cuando un usuario ve un hallazgo modificado.
1. Haga clic en **Guardar**. La regla se aplica a los nuevos hallazgos de inmediato y comienza a verificar los hallazgos existentes dentro de la próxima hora.

**Nota**: No puede usar `@severity` ni `@severity_details.user_adjusted` en la consulta de la regla. Las reglas de modificación de gravedad se evalúan con respecto a la gravedad ajustada por Datadog (`@severity_details.adjusted.value`), no al valor `@severity` almacenado en el hallazgo.

## Evaluation order {#evaluation-order}

Las reglas de modificación de gravedad son el primer paso en la canalización de automatización y se ejecutan antes que las mute rules, due date, inbox y ticket creation rules. Dentro de las reglas de modificador de gravedad, Datadog utiliza una política de primera coincidencia: los hallazgos se evalúan según sus reglas en orden, y se aplica la primera regla que coincida. No se evalúan más reglas de modificador de gravedad para ese hallazgo.

Una regla cuenta como coincidencia solo si la aplicación de su acción cambiara la gravedad del hallazgo. Si la acción dejara la gravedad sin cambios (por ejemplo, una shift action que ya ha alcanzado un límite de gravedad, o una set action que apunta a la gravedad actual del hallazgo), la regla no coincide y Datadog continúa evaluando las reglas de modificador de gravedad posteriores para ese hallazgo.

Debido a que las reglas de modificación de gravedad se ejecutan primero, todas las downstream automation rules —incluidas las mute rules— ven la gravedad modificada cuando se evalúan.

## Identify modified findings {#identify-modified-findings}

Los hallazgos afectados por una regla de modificador de gravedad muestran un indicador visual en las vistas de lista del explorador y en el encabezado del panel lateral del hallazgo. Al pasar el cursor sobre el indicador se muestra la regla de automatización responsable del cambio:

{{< img src="security/automation_pipelines/severity_pill_popover.png" alt="Un elemento del explorador que muestra una píldora de gravedad con un indicador de modificador. Un elemento emergente proporciona más información sobre la regla de automatización responsable de ajustar la gravedad del hallazgo." style="width:65%;" >}}

Para los hallazgos que tienen una puntuación CVSS (vulnerabilidad de imagen de contenedor, vulnerabilidad de servidor, vulnerabilidad de biblioteca y vulnerabilidad de código en tiempo de ejecución), la sección de gravedad del panel lateral también incluye un desglose que muestra:
- El nivel de gravedad original, la puntuación CVSS y el vector CVSS antes de la modificación.
- El nombre de la regla de automatización que se activó, con un enlace directo a la regla.
- El nivel de gravedad resultante y la puntuación CVSS ajustada.

{{< img src="security/automation_pipelines/severity_breakdown.png" alt="Un panel lateral de hallazgo que muestra el desglose de gravedad, con la gravedad original, la puntuación CVSS y el vector CVSS; la regla de automatización que activó el cambio; y el nivel de gravedad resultante y la puntuación CVSS ajustada." style="width:100%;" >}}

## Severity floors by finding type {#severity-floors-by-finding-type}

No todos los tipos de hallazgos utilizan la misma escala de gravedad. La siguiente tabla muestra la gravedad más baja disponible para cada tipo de hallazgo:

| Finding type | Lowest severity |
|---|---|
| API Security | Info |
| Attack Path | Info |
| Identity Risk | Info |
| Misconfiguration | Info |
| Workload Activity | Info |
| Container Image Vulnerability | None |
| Host Vulnerability | None |
| Library Vulnerability | None |
| Infrastructure as Code | Low |
| Runtime Code Vulnerability | Low |
| Secret | Low |
| Static Code Vulnerability | Low |

**Info / None** is not available for finding types that use **Low** as their lowest severity. Incluir dichos tipos de hallazgos en la regla y seleccionar **Info / None** resulta en un error de validación.

## Findings with Unknown severity {#findings-with-unknown-severity}

Las reglas de modificador de gravedad manejan los hallazgos con una gravedad **Unknown** de la siguiente manera:

- **Shift action**: La regla no coincide con los hallazgos con **Unknown** severity. Debido a que la regla no coincide, las reglas de modificador de gravedad posteriores aún pueden evaluarse para ese hallazgo.
- **Set action**: Si la gravedad **Unknown** se incluye en el selector de gravedad de la regla, la regla coincide y reemplaza **Unknown** con la gravedad objetivo especificada. No puede establecer la gravedad de un hallazgo en **Unknown** usando una regla de modificador de gravedad.

## Vulnerability findings and CVSS scores {#vulnerability-findings-and-cvss-scores}

Para los hallazgos de vulnerabilidad que tienen una puntuación CVSS ajustada por Datadog, un modificador de gravedad también actualiza la puntuación ajustada almacenada en `@severity_details.user_adjusted`. La puntuación actualizada se establece aproximadamente en el punto medio del rango CVSS v3 de la gravedad objetivo:

| Target severity | CVSS v3 range |
|---|---|
| None | 0.0 |
| Low | 0.1–3.9 |
| Medium | 4.0–6.9 |
| High | 7.0–8.9 |
| Critical | 9.0–10.0 |

El vector CVSS original nunca se modifica. No se genera ningún vector sintético para que coincida con la puntuación ajustada. Debido a que una regla solo coincide cuando cambia la gravedad del hallazgo, la puntuación se ajusta solo cuando la gravedad misma cambia; consulte [Evaluation order](#evaluation-order).

## Auto-closed and passed findings {#auto-closed-and-passed-findings}

Los modificadores de gravedad no se borran ni se actualizan para los hallazgos que pasan a estar cerrados automáticamente o cuando el resultado de la evaluación es "pass" **pass**. Si la regla que modificó originalmente un hallazgo se edita o elimina posteriormente, esos hallazgos conservan la gravedad que se estableció cuando se cerraron.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=modify_severity