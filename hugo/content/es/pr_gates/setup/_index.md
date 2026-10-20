---
aliases:
- /es/quality_gates/setup/
description: Aprenda a configurar las reglas de PR Gate en Datadog.
further_reading:
- link: /pr_gates
  tag: Documentación
  text: Aprenda sobre PR Gates.
title: Configure las reglas de PR Gate.
---
## Descripción general {#overview}

Para usar PR Gates en Datadog, defina una o más reglas en la página [{{< ui >}}PR Gate Rules{{< /ui >}}][1].

{{< img src="pr_gates/rules_list_3.png" alt="Página de PR Gates en Datadog" style="width:100%" >}}

PR Gates garantizan que solo se fusionen los cambios de código que cumplan con sus estándares de seguridad y calidad.

## Cree una regla {#create-a-rule}

Para crear una regla de PR Gates en Datadog:

1. Vaya a [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}PR Gates{{< /ui >}} > {{< ui >}}PR Gate Rules{{< /ui >}}][1] y haga clic en {{< ui >}}New Rule{{< /ui >}}.

1. En {{< ui >}}Select your source{{< /ui >}}, seleccione un tipo de regla:
   - {{< ui >}}Static Code Analysis (SAST){{< /ui >}}
   - {{< ui >}}Software Composition Analysis (SCA){{< /ui >}}
   - {{< ui >}}Code Coverage{{< /ui >}}
   - {{< ui >}}Infrastructure as Code Scanning (IaC){{< /ui >}}
   - {{< ui >}}Secret Scanning{{< /ui >}}
   - {{< ui >}}New Flaky Tests{{< /ui >}}

1. En {{< ui >}}Define scope{{< /ui >}}, establezca qué repositorios debe evaluar la regla:
   - {{< ui >}}All repositories{{< /ui >}}: La regla evalúa todos los repositorios configurados para el tipo de regla.
   - {{< ui >}}Selected repositories{{< /ui >}}: La regla evalúa solo los repositorios que usted especifique. Use `IN` para incluir solo los repositorios especificados, o `NOT IN` para evaluar todos los repositorios configurados _excepto_ los que usted especifique.

1. En {{< ui >}}Define condition{{< /ui >}}, establezca las condiciones que harán que la regla falle. Cada tipo de regla tiene sus propias opciones de condición, y puede usar la configuración de condición predeterminada existente cuando selecciona un tipo de regla.

   El siguiente ejemplo ilustra una regla de Análisis de código estático (SAST) que falla cuando una solicitud de extracción introduce al menos una violación de vulnerabilidad de código de Análisis de código estático con al menos una gravedad de `Critical`. La regla evalúa todos los repositorios configurados para el Análisis de código estático:

   {{< img src="pr_gates/setup/static_analysis_4.png" alt="Una regla de Análisis de código estático que se ejecuta en todos los repositorios y falla cuando un PR tiene al menos una vulnerabilidad de código de Análisis de código estático con al menos una gravedad `Crítica`" style="width:100%" >}}

1. En {{< ui >}}Preview checks{{< /ui >}}, seleccione su proveedor de gestión de código fuente para obtener una vista previa de la comprobación de estado que se agregará a las solicitudes de extracción. Para bloquear PR cuando una regla falla, siga las instrucciones de su proveedor para requerir que las PR Gates se aprueben antes de realizar la fusión (merge). En GitHub, Azure DevOps y Bitbucket Cloud, esto se hace configurando las comprobaciones de PR Gates como obligatorias. En GitLab, esto se hace configurando la cuenta de servicio de Datadog que creó al instalar la integración de fuente de GitLab como un aprobador obligatorio:

   - [GitHub][2]
   - [GitLab][9]
   - [Azure DevOps][3]
   - [Bitbucket Cloud][10]

   Las reglas que no bloquean pueden ser útiles cuando implementa una regla nueva y desea verificar su comportamiento antes de hacer que sea bloqueante.

1. Haga clic en {{< ui >}}Create Rule{{< /ui >}}.

1. Se recomienda que pruebe su regla de PR Gate creando una nueva rama y un PR que introduzca a propósito cambios de código que violarían la condición de la regla. Tenga en cuenta que PR Gates no:
   - Bloqueará retroactivamente los PR existentes a menos que se envíen nuevas confirmaciones (commits) a ellos después de que se haya creado la regla de PR Gate
   - Bloqueará nuevos PR que no introduzcan violaciones como parte de sus líneas modificadas

### Administrará las comprobaciones de PR {#manage-pr-checks}

PR Gates crea automáticamente comprobaciones de PR en solicitudes de extracción (merge requests en GitLab) de [GitHub][4], [GitLab][11], [Azure DevOps][5] o [Bitbucket Cloud][12] para cada tipo de regla evaluado. La comprobación contiene información adicional sobre la evaluación de la regla, como el motivo del error y los eventos coincidentes en Datadog. En GitLab, PR Gates también utiliza una cuenta de servicio de Datadog para aprobar solicitudes de fusión cuando se cumplen todas las condiciones de sus reglas de PR Gate. La cuenta de servicio es la misma que creó cuando instaló la integración de fuente de GitLab.

<div class="alert alert-info"><strong>Nota</strong>: Volver a ejecutar una comprobación en la interfaz de usuario de la solicitud de extracción no vuelve a ejecutar la regla de PR Gates correspondiente.</div>

Para asegurarse de que PR Gates pueda crear comprobaciones de PR, debe instalar la integración para su proveedor de SCM. Si no tiene instalada la integración, siga la documentación de integración de [GitHub][6], [GitLab fuente][13], [Azure DevOps fuente][7] o [Bitbucket Cloud fuente][14] para configurar una.

### Configure comprobaciones de PR para que sean bloqueantes {#configure-pr-checks-to-be-blocking}

<div class="alert alert-info">
Para Bitbucket Cloud, las comprobaciones solo se pueden configurar como bloqueantes si utiliza <strong>Bitbucket Cloud Premium</strong>.
</div>

Para que estas comprobaciones sean bloqueantes, deben establecerse como obligatorias en las políticas de rama de su proveedor de gestión de fuente (o la cuenta de servicio debe establecerse como aprobador obligatorio de sus MR en el caso de GitLab):

- [GitHub][2]
- [GitLab][9]
- [Azure DevOps][3]
- [Bitbucket Cloud][10]

## Administrar reglas {#manage-rules}

Puede editar o eliminar una regla de PR Gates pasando el cursor sobre ella en la lista [{{< ui >}}PR Gates Rules{{< /ui >}}][1] y haciendo clic en el icono {{< ui >}}Edit{{< /ui >}} o {{< ui >}}Delete{{< /ui >}}.

{{< img src="pr_gates/setup/delete_3.png" alt="Edite, clone o elimine una regla de PR Gates" style="width:100%;">}}

## Permisos {#permissions}

Solo los usuarios con el permiso `quality_gate_rules_write` pueden crear y editar reglas de PR Gate. Los usuarios con el permiso `quality_gate_rules_read` pueden visualizar las reglas de PR Gate.

Para obtener más información, consulte la [documentación de permisos de RBAC][8].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pr-gates
[2]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
[3]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pr-status-policy?view=azure-devops
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks
[5]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-request-status?view=azure-devops
[6]: /es/integrations/github/
[7]: /es/integrations/azure-devops-source-code/
[8]: /es/account_management/rbac/permissions
[9]: https://docs.gitlab.com/user/project/merge_requests/approvals/rules/
[10]: https://support.atlassian.com/bitbucket-cloud/docs/suggest-or-require-checks-before-a-merge/
[11]: https://docs.gitlab.com/ci/ci_cd_for_external_repos/external_commit_statuses/
[12]: https://support.atlassian.com/bitbucket-cloud/docs/check-build-status-in-a-pull-request/
[13]: /es/integrations/gitlab-source-code/
[14]: /es/integrations/bitbucket-source-code/