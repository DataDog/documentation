---
aliases:
- /es/quality_gates/
- /es/quality_gates/explorer/
- /es/quality_gates/explorer/search_syntax/
- /es/quality_gates/explorer/facets/
- /es/quality_gates/explorer/saved_views/
- /es/quality_gates/search/
- /es/quality_gates/guide/
- /es/quality_gates/guide/understanding_rule_scopes/
- /es/pr_gates/explorer/
- /es/pr_gates/explorer/search_syntax/
- /es/pr_gates/explorer/facets/
- /es/pr_gates/explorer/saved_views/
- /es/pr_gates/search/
- /es/pr_gates/guide/
- /es/pr_gates/guide/understanding_rule_scopes/
description: Aprenda a usar PR Gates para permitir que su equipo controle qué código
  llega a producción.
further_reading:
- link: /tests/guides/setup_new_flaky_pr_gate/
  tag: Documentación
  text: Configure un [New Flaky Test PR Gate]
- link: https://www.datadoghq.com/blog/azure-devops-source-code-integration/
  tag: Blog
  text: Identifique y solucione problemas de código más rápido con la integración
    de Azure DevOps Source Code de Datadog
- link: https://www.datadoghq.com/blog/github-actions-iac-security/
  tag: Blog
  text: 'Detectar errores de configuración de CI/CD antes que los bots: Asegurar GitHub
    Actions con Datadog IaC Security'
- link: https://www.datadoghq.com/blog/datadog-quality-gates/
  tag: Blog
  text: Mejore la confiabilidad del código con Datadog Quality Gates
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: Blog
  text: Use los monitores de Datadog como Quality Gates para implementaciones de GitHub
    Actions
- link: https://www.datadoghq.com/blog/datadog-flaky-tests/
  tag: Blog
  text: 'Pruebas inestables: sus costos ocultos y cómo abordar el comportamiento inestable'
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Evite que las configuraciones erróneas de la nube lleguen a producción con
    Datadog IaC Security
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de la versión
  text: ¡Consulte las últimas versiones de Software Delivery! (Se requiere inicio
    de sesión en la aplicación).
is_beta: false
title: PR Gates
---
## Descripción general {#overview}

PR Gates le permite controlar la seguridad y la calidad del software configurando reglas para bloquear la fusión de solicitudes de extracción con código deficiente. Evitar que se fusionen solicitudes de extracción con código deficiente puede garantizar que el código que finalmente se implementa en producción cumpla con altos estándares organizacionales, reduciendo incidentes y minimizando comportamientos no deseados.

{{< img src="pr_gates/setup/sca_4.png" alt="Una regla de SCA que activa un error si se detecta alguna vulnerabilidad de biblioteca con gravedad crítica o alta en el repositorio." style="width:100%" >}}

PR Gates, similar a [Datadog Monitors][9], consume datos y hallazgos generados por productos compatibles de Datadog y aplica condiciones a estos hallazgos para determinar si una PR cumple con sus estándares organizacionales. Para evitar un impacto innecesario en la velocidad de sus desarrolladores, PR Gates solo bloquea las infracciones introducidas por los cambios de código de la PR en cuestión, no los hallazgos que ya existían en su repositorio antes de que se crearan la PR y su rama. Por ejemplo, si configura PR Gates para bloquear vulnerabilidades de código de gravedad crítica, PR Gates fallará y bloqueará la PR solo si un desarrollador introduce una nueva vulnerabilidad de código crítica como parte de esa PR.

Puede configurar reglas de PR Gates para las siguientes categorías. Tenga en cuenta que el producto compatible debe estar ejecutándose en sus repositorios deseados antes de que PR Gates pueda comenzar a tomar medidas sobre las PR relevantes: 

| Tipo de fuente     | Tipos de condición |
| --- | ----------- |
| [**Análisis de código estático (SAST)**][1] | - Vulnerabilidades de código<br/> - Infracciones de calidad de código |
| [**Software Composition Analysis**][2] | - Vulnerabilidades de biblioteca<br/> - Infracciones de licencia de biblioteca |
| [**Code Coverage**][3] | - Overall Code Coverage<br/> - Patch Code Coverage|
| [**Infrastructure as Code Scanning**][4] | - IaC vulnerabilities|
| [**Secret Scanning**][10] | - Secretos filtrados |
| [**Nuevas pruebas inestables**][11] | - Nuevas pruebas inestables |

Después de crear reglas de PR Gates, Datadog crea automáticamente comprobaciones en sus solicitudes de extracción utilizando las integraciones de [GitHub][5], [GitLab Source Code][13], [Azure DevOps Source Code][6] o [Bitbucket Cloud Source Code][14]. Para aplicar PR Gates, establezca esas comprobaciones como obligatorias en GitHub, Azure DevOps o Bitbucket Cloud cuando esté listo para aplicarlas. En GitLab, establezca la cuenta de servicio de Datadog como aprobador obligatorio en las solicitudes de fusión. Consulte [Configurar reglas de PR Gate][15].

PR Gates también habilita reacciones con emojis (similar a [Comentarios de PR][12]). Datadog publica una reacción 👀 en la descripción de la PR cuando un producto de Datadog que tiene PR Gates todavía está esperando que lleguen los resultados. Después de que hayan llegado todos los resultados:
  * Si todos los resultados son positivos, la reacción cambia a 👍.
  * Si hay al menos un hallazgo, la reacción 👀 se elimina porque el comentario de resumen incluye detalles sobre los hallazgos en su lugar.

<div class="alert alert-warning">
  PR Gates no es compatible con solicitudes de extracción dirigidas a una rama de destino en un repositorio diferente al de la rama fuente (es decir, repositorios bifurcados que intentan fusionarse en el repositorio principal). PR Gates no se puede establecer como obligatorio en repositorios de GitHub que utilizan una cola de fusión.
</div>

## Tipos de regla {#rule-types}

PR Gates ofrece los siguientes tipos de reglas:

{{< tabs >}}
{{% tab "Análisis estático de código (SAST)" %}}

Puede crear reglas para bloquear la fusión de cambios de código cuando las líneas modificadas de una solicitud de extracción introducen al menos una nueva vulnerabilidad de código o una violación de calidad de código de cierta gravedad.

{{< img src="pr_gates/setup/static_analysis_4.png" alt="Una regla de PR Gate que falla cuando el repositorio contiene una o más violaciones nuevas de calidad de código de nivel de gravedad de error" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis (SCA)" %}}

Puede crear reglas para bloquear la fusión de cambios de código cuando las líneas modificadas de una solicitud de extracción introducen al menos una nueva vulnerabilidad de biblioteca de cierta gravedad o al menos una nueva biblioteca con una licencia prohibida.

{{< img src="pr_gates/setup/sca_4.png" alt="Una regla de PR Gate que falla cuando el repositorio contiene una o más vulnerabilidades de biblioteca de gravedad crítica o alta" style="width:80%" >}}

{{% /tab %}}
{{% tab "Code Coverage" %}}
Puede crear reglas para bloquear la fusión de cambios de código cuando las líneas modificadas de una solicitud de extracción provocan que el Code Coverage global del repositorio caiga por debajo de un cierto porcentaje o si el Code Coverage de parches de esas líneas está por debajo de un cierto umbral.

{{< img src="pr_gates/setup/code_coverage_2.png" alt="Una regla de PR Gate que falla cuando el repositorio contiene una o más vulnerabilidades de biblioteca de gravedad crítica o alta" style="width:80%" >}}

{{% /tab %}}

{{% tab "Escaneo de Infrastructure as Code" %}}
Puede crear reglas para bloquear la fusión de cambios de código cuando las líneas modificadas de una solicitud de extracción introducen al menos una nueva vulnerabilidad de Infrastructure as Code (IaC) de cierta gravedad.

{{< img src="pr_gates/setup/iac_2.png" alt="Una regla de PR Gate que falla cuando el repositorio contiene una o más vulnerabilidades de biblioteca de gravedad crítica o alta" style="width:80%" >}}

{{% /tab %}}

{{% tab "Secret Scanning" %}}
Puede crear reglas para bloquear la fusión de cambios de código cuando las líneas modificadas de una solicitud de extracción introducen al menos un nuevo secreto filtrado de cierta gravedad.

{{< img src="pr_gates/setup/secret_scanning.png" alt="Una regla de PR Gate que falla cuando se detectan uno o más secretos filtrados de gravedad crítica o alta en el repositorio." style="width:80%" >}}

{{% /tab %}}

{{% tab "New Flaky Tests" %}}
Puede crear reglas para bloquear la fusión de cambios de código cuando una solicitud de extracción introduce al menos una nueva prueba inestable.

{{< img src="pr_gates/setup/flaky_tests.png" alt="Una regla de PR Gate que falla cuando una solicitud de extracción introduce al menos una nueva prueba inestable" style="width:80%" >}}

Utilice este PR Gate junto con [Early Flake Detection][1] para detectar nuevas pruebas inestables.

Lea [cómo configurar un New Flaky Test PR Gate][2].

[1]: /es/tests/flaky_tests/early_flake_detection
[2]: /es/tests/guides/setup_new_flaky_pr_gate/
{{% /tab %}}
{{< /tabs >}}

Para crear una regla de PR Gate, consulte la [documentación de configuración][7]. 

## Administrar reglas {#manage-rules}

Puede administrar y actualizar las reglas de PR Gates en la página [{{< ui >}}PR Gates Rules{{< /ui >}}][8]. Mejore sus prácticas de seguridad y calidad según los requisitos de su proyecto y sus tolerancias al riesgo. 

Puede ver todas las reglas definidas por la organización.

{{< img src="pr_gates/rules_list_3.png" alt="Lista de reglas de PR Gate en Datadog" style="width:100%" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/static_analysis
[2]: /es/security/code_security/software_composition_analysis
[3]: /es/code_coverage/
[4]: /es/security/code_security/iac_security/
[5]: /es/integrations/github/
[6]: /es/integrations/azure_devops_source_code/
[7]: /es/pr_gates/setup/
[8]: https://app.datadoghq.com/ci/pr-gates
[9]: /es/monitors/
[10]: /es/security/code_security/secret_scanning/
[11]: /es/tests/flaky_tests/
[12]: /es/source_code/features/#pr-comments
[13]: /es/integrations/gitlab-source-code/
[14]: /es/integrations/bitbucket-source-code/
[15]: /es/pr_gates/setup/