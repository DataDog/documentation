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
description: Aprende a utilizar PR Gates para que tu equipo pueda controlar qué código
  llega a producción.
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de versiones
  text: Consulta las últimas versiones de Software Delivery (Es necesario iniciar
    sesión en la aplicación)
- link: https://www.datadoghq.com/blog/datadog-quality-gates/
  tag: Blog
  text: Mejorar la fiabilidad del código con las Puertas de calidad de Datadog
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: Blog
  text: Uso de monitores de Datadog como puertas de calidad para despliegues de GitHub
    Actions
- link: https://www.datadoghq.com/blog/datadog-flaky-tests/
  tag: Blog
  text: 'Pruebas defectuosas: sus costes ocultos y cómo tratar comportamientos defectuosos'
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Evita que los errores de configuración de la nube lleguen a la producción
    con Datadog IaC Security
is_beta: false
title: PR Gates
---

## Información general

Las PR Gates te permiten controlar la seguridad y la calidad del software configurando reglas para bloquear la fusión de solicitudes pull con código de calidad inferior. Impedir la fusión de solicitudes pull con código de calidad inferior puede garantizar que el código que finalmente se despliega en producción se adhiere a los altos estándares de la organización, reduciendo los incidentes y minimizando los comportamientos no deseados.

{{< img src="pr_gates/setup/sca_3.png" alt="Una regla SCA que activa un error si cualquier vulnerabilidad de la biblioteca con gravedad crítica o alta se detecta en el repositorio." style="width:100%" >}}

Utiliza PR Gates para:

* Crear reglas que bloqueen las solicitudes pull utilizando los datos de Datadog, garantizando que solo se fusione el código que cumpla tus normas.
* Proporciona a tu organización la capacidad de evitar que los cambios de código que no cumplan las normas lleguen a producción.
* Mejora continuamente la seguridad y la calidad del código con una aplicación precisa y normas personalizables.

Puedes configurar reglas de PR Gates para las siguientes categorías: 

| Tipo de fuente     | Tipos de condiciones |
| --- | ----------- |
| [**Static Code Analysis**][1] | - Vulnerabilidades del código<br/>: violaciones de la calidad del código |
| [**Software Composition Analysis**][2] | - Vulnerabilidades de la biblioteca<br/>: violaciones de la licencia de la biblioteca |
| [**Code Coverage**][3] | - Cobertura total del código<br/>: cobertura del código parcheado |
| [**Infrastructure as Code Scanning**][4] | - Vulnerabilidades en IaC |

Tras crear las reglas de PR Gates, Datadog creará automáticamente checks en tus solicitudes pull mediante la [integración con GitHub][5] o la [integración con el código fuente de Azure DevOps][6]. Establece esos checks según sea necesario en GitHub o Azure DevOps cuando estés listo para aplicarlos.

<div class="alert alert-warning">
  Las PR Gates no se admiten en las solicitudes pull en repositorios públicos, o en solicitudes pull que tengan como destino una rama en un repositorio diferente de la rama fuente (es decir, repositorios bifurcados que intentan fusionarse en el repositorio principal).
</div>

## Tipos de reglas

PR Gates ofrece los siguientes tipos de reglas:

{{< tabs >}}
{{% tab "Static Code Analysis (SAST)" %}}

Puedes crear reglas para bloquear la fusión de código cuando una solicitud pull introduce al menos una vulnerabilidad o violación de la calidad del código de una determinada gravedad.

{{< img src="pr_gates/setup/static_analysis_3.png" alt="Una regla de PR Gate que falla cuando una o más violaciones de calidad de código nuevo con gravedad de error están incluidas en el repositorio" style="width:80%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis (SCA)" %}}

Puedes crear reglas para bloquear la fusión de código cuando una solicitud pull introduce al menos una vulnerabilidad de biblioteca de cierta gravedad o al menos una biblioteca con una licencia prohibida.

{{< img src="pr_gates/setup/sca_3.png" alt="Una regla de PR Gate que falla cuando una o más vulnerabilidades de biblioteca de gravedad crítica o alta están incluidas en el repositorio" style="width:80%" >}}

{{% /tab %}}
{{% tab "Code Coverage" %}}
Puedes crear reglas para bloquear la fusión de código cuando una solicitud pull hace que la cobertura de código general del repositorio caiga por debajo de un determinado porcentaje o si la cobertura de parches está por debajo de un determinado umbral.

{{< img src="pr_gates/setup/code_coverage.png" alt="Una regla de PR Gate que falla cuando una o más vulnerabilidades de biblioteca con gravedad crítica o alta están incluidas en el repositorio" style="width:80%" >}}

{{% /tab %}}

{{% pestaña "Escaneo de Infraestructura como Código" %}}
Puede crear reglas para bloquear la fusión de código cuando una solicitud de extracción introduce al menos una vulnerabilidad de infraestructura como código (IaC) de cierta gravedad.

{{< img src="pr_gates/setup/iac.png" alt="Una regla de PR Gate que falla cuando una o más vulnerabilidades de biblioteca con gravedad crítica o alta están incluidas en el repositorio" style="width:80%" >}}

{{% /tab %}}
{{< /tabs >}}

Para crear una regla de PR Gate, consulta la [documentación de configuración][7]. 

## Gestionar reglas

Puedes gestionar y actualizar las reglas de PR Gates en la página [**PR Gates Rules**][8] (Reglas de PR Gates). Mejora tus prácticas de seguridad y calidad en función de los requisitos y tolerancias de riesgo en tu proyecto.

Puedes ver todas las reglas definidas por la organización.

{{< img src="pr_gates/rules_list_3.png" alt="Lista de las reglas de PR Gate en Datadog" style="width:100%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/static_analysis
[2]: /es/security/code_security/software_composition_analysis
[3]: /es/code_coverage/
[4]: /es/security/code_security/iac_security/
[5]: /es/integrations/github/
[6]: /es/integrations/azure_devops_source_code/
[7]: /es/pr_gates/setup/
[8]: https://app.datadoghq.com/ci/pr-gates