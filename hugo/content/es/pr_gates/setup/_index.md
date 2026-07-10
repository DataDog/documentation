---
aliases:
- /es/quality_gates/setup/
description: Aprende a configurar las reglas de PR Gate en Datadog.
further_reading:
- link: /pr_gates
  tag: Documentación
  text: Más información sobre PR Gates
title: Establecer las reglas de PR Gate
---

## Información general

Para utilizar Datadog PR Gates, puedes definir una o varias reglas en la página de [**PR Gate Rules**][1] (Reglas de PR Gate).

{{< img src="pr_gates/rules_list_3.png" alt="Página de PR Gates en Datadog" style="width:100%" >}}

PR Gates garantiza que solo se despliegue el código que cumpla con tus normas de calidad, automatizando los procesos de aseguramiento de la calidad y mejorando la fiabilidad del software.

## Crear una regla

Para crear una regla de PR Gates en Datadog:

1. Ve a [**Software Delivery** > **PR Gates** > **PR Gate Rules**][1] (Software Delivery > PR Gates > Reglas de PR Gate) y haz clic en **New Rule** (Nueva regla).

1. En **Select your source** (Seleccionar tu fuente), selecciona un tipo de regla:
   - Static Code Analysis
   - Software Composition Analysis
   - Cobertura de código
   - Infrastructure as Code Scanning

1. En **Define condition** (Definir condición), establece las condiciones que harán que falle la regla, que también falla el pipeline relacionado. Cada tipo de regla tiene sus propias opciones de condición, y puedes utilizar las opciones de condición predeterminadas existentes cuando seleccionas un tipo de regla.

1. En **Define scope** (Definir ámbito), establece qué repositorios debe evaluar la regla:
   - **Todos los repositorios**: la regla evalúa todos los repositorios configurados para el tipo de regla.
   - **Repositorios seleccionados**: la regla evalúa solo los repositorios que especifiques. Utiliza `IN` para incluir solo los repositorios especificados, o `NOT IN` para evaluar todos los repositorios configurados _excepto_ los que especifiques.

   El siguiente ejemplo ilustra una regla de Static Code Analysis que falla cuando una solicitud pull introduce al menos una violación de vulnerabilidad de código de Static Code Analysis con al menos gravedad `Critical`. La regla evalúa todos los repositorios configurados para Static Code Analysis:

   {{< img src="pr_gates/setup/static_analysis_3.png" alt="Una regla de Static Analysis que se ejecuta en todos los repositorios y falla cuando una solicitud pull tiene al menos una vulnerabilidad de código de Static Code Analysis con al menos gravedad `Critical`" style="width:100%" >}}

1. En **Preview checks** (Previsualizar checks), selecciona tu proveedor de CI para previsualizar el check de estado que se añadirá a las solicitudes pull. Para configurar el check de modo que bloquee el pipeline cuando falle, sigue las instrucciones de tu proveedor para hacer que un check de estado sea _obligatorio_:

   - [GitHub][2]
   - [Azure DevOps][3]

   No bloquear las reglas puede ser útil cuando se lanza una nueva regla y se quiere verificar su comportamiento antes de hacerla bloquear.

1. Haz clic en **Create Rule** (Crear regla).

### Gestionar los checks de solicitud pull

PR Gates crea automáticamente checks de solicitudes pull en las solicitudes pull de [GitHub][4] o [Azure DevOps][5] para cada tipo de regla evaluada. El check contiene información adicional sobre la evaluación de la regla, como el motivo del fallo y los eventos coincidentes en Datadog.

<div class="alert alert-info"><strong>Nota</strong>: Volver a ejecutar un check en la interfaz de usuario de la solicitud pull no vuelve a ejecutar la regla de PR Gates correspondiente.</div>

Para garantizar que PR Gates pueda crear checks de solicitud pull, debes instalar la integración para tu proveedor de SCM. Si no tienes instalada la integración, sigue la documentación de integración de [GitHub][6] o [código fuente de Azure DevOps][7] para configurarla.

## Gestionar reglas

Puedes editar o eliminar una regla de PR Gates pasando el ratón sobre ella en la lista [**PR Gates Rules**][1] (Reglas de PR Gates) y haciendo clic en el icono **Edit** (Editar) o **Delete** (Eliminar).

{{< img src="pr_gates/setup/delete_3.png" alt="Editar, clonar o eliminar una regla de PR Gates" style="width:100%;">}}

## Permisos

Solo los usuarios con el permiso `quality_gate_rules_write` pueden crear y editar reglas de PR Gate. Los usuarios con el permiso `quality_gate_rules_read` pueden ver las reglas de PR Gate.

Para más información, consulta la [documentación de Permisos RBAC][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pr-gates
[2]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
[3]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pr-status-policy?view=azure-devops
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks
[5]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-request-status?view=azure-devops
[6]: /es/integrations/github/
[7]: /es/integrations/azure-devops-source-code/
[8]: /es/account_management/rbac/permissions