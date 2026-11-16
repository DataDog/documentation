---
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explore los resultados de la ejecución del pipeline y su rendimiento
- link: /continuous_integration/pipelines/github/
  tag: Documentación
  text: Configure CI Visibility para GitHub Actions
- link: /continuous_integration/pipelines/gitlab/
  tag: Documentación
  text: Configure CI Visibility para GitLab
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
title: Reintentos automáticos de trabajos
---
## Descripción general {#overview}

Los reintentos automáticos de trabajos ahorran tiempo a los desarrolladores al volver a ejecutar fallos que probablemente sean transitorios, como tiempos de espera de red, fallos de infraestructura o pruebas inestables. Los defectos de código genuinos no se reintentan. Datadog ejecuta cada trabajo fallido a través de un clasificador de errores impulsado por IA. Cuando el fallo se identifica como reintentable, Datadog activa un reintento a través de la API del proveedor de CI sin intervención manual.

Los reintentos automáticos reducen la cantidad de pipelines que los desarrolladores vuelven a ejecutar manualmente, acortan los ciclos de retroalimentación y mantienen las métricas de éxito de los pipelines enfocadas en fallos no transitorios.

<div class="alert alert-info">Los reintentos automáticos de trabajos están disponibles para <a href="/continuous_integration/pipelines/github/">GitHub Actions</a> y <a href="/continuous_integration/pipelines/gitlab/">GitLab</a>.</div>

## Cómo funcionan los reintentos automáticos de trabajos {#how-automatic-job-retries-work}

Cuando un trabajo en su pipeline de CI falla:
1. El clasificador de errores por IA de Datadog inspecciona los registros y el contexto de error del trabajo para determinar si el fallo es transitorio.
   - Este es el mismo clasificador de errores por IA que utiliza [Logs Analysis][6], el cual lee los registros de trabajo relevantes para decidir si un fallo es transitorio.
1. Si el fallo se clasifica como reintentable, Datadog solicita un reintento a través de la API del proveedor.
1. Datadog reintenta cada trabajo fallido hasta un número máximo de intentos (establecido por Datadog) para evitar bucles de reintento infinitos. Los reintentos se cuentan por trabajo y por commit; si el mismo trabajo vuelve a fallar en un nuevo commit, el contador se restablece.
1. Datadog registra el resultado del reintento en el pipeline original en CI Visibility.

## Requisitos previos {#prerequisites}

Para utilizar los reintentos automáticos de trabajos:
- CI Visibility debe estar habilitado para su integración de [GitHub Actions][1] o [GitLab][2].
- Para GitHub Actions, el [Datadog GitHub App][8] debe tener el permiso **Actions: Write**.
- El [Datadog Source Code Integration][3] debe configurarse para los repositorios en los que desee utilizar reintentos automáticos.
- Logs Analysis debe configurarse para los repositorios en los que desee utilizar reintentos automáticos (consulte [Logs Analysis para GitHub Actions][4] o [Logs Analysis para GitLab][5]).
- Para habilitar esta función, debe tener el permiso **CI Provider Settings Write** en Datadog.

## Habilitar reintentos automáticos de trabajos {#enable-automatic-job-retries}

Una vez cumplidos los requisitos previos, habilite los reintentos automáticos de trabajos desde la configuración de optimización de CI/CD:

1. Abra [**CI/CD Optimization** > **Settings** > **Repositories**][7].
1. Elija dónde aplicar la configuración:
   - Seleccione la pestaña **Organization** para habilitar Auto Job Retries para cada repositorio de forma predeterminada.
   - Seleccione la pestaña **Repository-specific** para habilitar Auto Job Retries para un solo repositorio. Para aplicar a muchos repositorios a la vez, selecciónelos y utilice **Bulk Apply Settings**.
1. En **Mitigación**, active **Auto Job Retries**.

{{< img src="continuous_integration/auto_job_retries_settings.png" alt="Interruptor de Auto Job Retries en la configuración de CI/CD." style="width:100%" >}}

## Comportamiento específico del proveedor {#provider-specific-behavior}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

### Reintentos automáticos de trabajos de GitHub Actions {#github-actions-automatic-job-retries}

GitHub Actions impone dos limitaciones a nivel de proveedor que determinan cómo funcionan los reintentos:

- **Los reintentos ocurren después de que finaliza el flujo de trabajo.** La API de GitHub no permite reintentar un trabajo individual mientras el resto del flujo de trabajo sigue ejecutándose. Datadog espera a que el flujo de trabajo llegue a un estado final antes de emitir reintentos.
- **Todos los trabajos fallidos se reintentan juntos, incluso aquellos clasificados como no reintentables.** La API de GitHub no admite el reintento de un solo trabajo cuando otros trabajos en el flujo de trabajo también han fallado. Datadog vuelve a ejecutar cada trabajo fallido en el flujo de trabajo mediante una única llamada a la API de GitHub. Esto podría aumentar el uso de cómputo de sus GitHub Actions.

### Ramas protegidas {#protected-branches}

Los permisos predeterminados del Datadog GitHub App no permiten reintentos en ramas protegidas. Para habilitar los reintentos automáticos en una rama protegida (por ejemplo, su rama predeterminada), otorgue al Datadog GitHub App acceso de nivel de Mantenedor en toda la organización. Revise las políticas de su organización antes de ampliar los permisos.

{{% /tab %}}
{{% tab "GitLab" %}}

### Reintentos automáticos de trabajos de GitLab {#gitlab-automatic-job-retries}

Tan pronto como un trabajo falla en GitLab, Datadog vuelve a ejecutar ese trabajo específico (si está clasificado como reintentable). Otros trabajos fallidos (que no están clasificados como reintentables) y los trabajos exitosos no se ven afectados. No hay costo de CI adicional más allá del trabajo o trabajos reintentados.

Los reintentos automáticos de trabajos funcionan tanto para SaaS (GitLab.com) como para instancias de GitLab autohospedadas.

{{% /tab %}}
{{< /tabs >}}

## ¿Cuándo no se reintenta un trabajo fallido? {#when-is-a-failed-job-not-retried}

Un trabajo fallido no se reintenta cuando:

- El clasificador de IA categoriza el fallo como no reintentable (por ejemplo, errores de compilación o fallos de prueba asertados).
- El trabajo ya ha sido reintentado manualmente o mediante reglas de reintento nativas del proveedor.

**Nota:** En GitHub Actions, los trabajos fallidos no reintentables aún podrían volver a ejecutarse si otro trabajo en el mismo flujo de trabajo se clasifica como reintentable. Datadog emite una única llamada a la API de GitHub de "volver a ejecutar trabajos fallidos", la cual vuelve a ejecutar cada trabajo fallido en el flujo de trabajo, incluidos los no reintentables.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/pipelines/github/
[2]: /es/continuous_integration/pipelines/gitlab/
[3]: /es/integrations/guide/source-code-integration/
[4]: /es/continuous_integration/pipelines/github/#logs-analysis
[5]: /es/continuous_integration/pipelines/gitlab/#logs-analysis
[6]: /es/continuous_integration/guides/use_ci_jobs_failure_analysis/
[7]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[8]: /es/continuous_integration/pipelines/github/#configure-a-github-app