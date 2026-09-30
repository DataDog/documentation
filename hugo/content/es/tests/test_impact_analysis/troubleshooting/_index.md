---
aliases:
- /es/intelligent_test_runner/troubleshooting
further_reading:
- link: /intelligent_test_runner
  tag: Documentación
  text: Más información sobre Test Impact Analysis
title: Solucionar problemas de Test Impact Analysis
---

## Información general

Esta página proporciona información para solucionar problemas con Test Impact Analysis. Si necesitas más información, ponte en contacto con el [soporte de Datadog][1].

## Test Impact Analysis no funciona

[Test Impact Analysis][2] funciona analizando el historial de confirmaciones junto con información sobre la cobertura del código de tests anteriores para determinar qué tests deben ejecutarse y cuáles pueden omitirse. Para que Test Impact Analysis funcione correctamente, debe existir un mínimo de información:

- El ejecutable `git` debe estar disponible en los tests de ejecución de host.
- Tu repositorio debe tener un historial de confirmaciones de al menos dos confirmaciones en el último mes.
- Es necesario haber recopilado la cobertura del código de test en confirmaciones anteriores, lo que ocurre en las ejecuciones de test en los que se activó Test Impact Analysis.
- Tu clon git debe contener el historial de confirmaciones y árboles. Test Impact Analysis intenta deshabilitar los clones git que no contienen historial (`git clone --depth=1`), pero puede que no funcione en versiones antiguas de git. La desprotección automática puede requerir una configuración adicional en algunos proveedores de CI (Harness CI, por ejemplo, requiere [una configuración adicional][3] para asegurarte de que tu pipeline puede ejecutar comandos git). Si tu trabajo de CI está usando clones git superficiales, puedes cambiarlo para usar clones git parciales usando el siguiente comando: `git clone --filter=blob:none`.

Debido a estas restricciones, la primera vez que actives Test Impact Analysis, no podrás ver ningún test omitido y el tiempo de ejecución de test puede ser más lento de lo habitual porque la cobertura del código se recopila automáticamente.

Test Impact Analysis sólo tiene en cuenta el historial de confirmaciones y la información de cobertura del código de test del último mes. Además, no tiene en cuenta la información de cobertura de código que se genera más de una semana después de que se realizara una confirmación.

### Sincronizar un fork a través de la interfaz de GitHub

[Sincronizar un fork a través de la interfaz de GitHub][4] hace que se ejecuten todos los tests para la confirmación de sincronización generada.

### Recopilación de coberturas en Acciones de CI de GitHub activadas por eventos de solicitud pull

Los tests ejecutados en Acciones de CI de GitHub utilizando el [disparador `pull_request`][5] no pueden ser omitidas en confirmaciones posteriores dentro de la rama de solicitud pull. El activador introduce cambios mediante una nueva confirmación de fusión que no se tiene en cuenta en Test Impact Analysis.

### Comprimir y fusiona tus confirmaciones

El uso de [comprimir y fusionar][6] para integrar confirmaciones en la rama base hace que se pierda el historial git de la rama de características. Como resultado, es posible que Test Impact Analysis no omita pruebas en la rama base que fueron omitidas recientemente en la rama de características.

## Test Impact Analysis omitió incorrectamente un test

Test Impact Analysis realiza un análisis del impacto de los tests basado en la cobertura del código para determinar qué tests se ven afectados por una confirmación o un conjunto de confirmaciones determinado. Aunque esta estrategia funciona para la mayoría de los tests, existen escenarios conocidos en los que Test Impact Analysis podría omitir un test que debería haberse ejecutado:

- Cambios en las dependencias de librería.
- Cambios en las opciones del compilador.
- Cambios en los servicios externos.
- Cambios en los archivos de datos en los tests basados en datos.

Si estás creando una confirmación que incluye cualquiera de estos casos, puedes forzar la omisión de pruebas en Test Impact Analysis añadiendo `ITR:NoSkip` (sin distinguir mayúsculas de minúsculas) en cualquier parte del mensaje de confirmación de Git.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/tests/test_impact_analysis/
[3]: https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui
[5]: https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request
[6]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits
