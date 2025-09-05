---
description: Aprende cómo configurar contextos de regla para las reglas de Quality
  Gate.
further_reading:
- link: /quality_gates/setup
  tag: Documentación
  text: Aprende cómo instalar Quality Gates
title: Cómo funcionan los contextos de regla en Quality Gates
---

## Información general

Quality Gates te permite bloquear tus flujos de trabajo basándose en las señales de Datadog. Al crear una regla, puedes definir un contexto de regla, que establece cuándo debe evaluarse la regla. 

Para filtrar las reglas que se evalúan para un CI pipeline específico, puedes añadir un contexto personalizado al crear una regla. Este proceso requiere que utilices la opción `--scope` con el [comando `datadog-ci gate evaluate`][1] en tu configuración de compilación.

Por ejemplo: 

```shell
datadog-ci gate evaluate --scope team:backend --scope team:frontend
```

## Definir un contexto de regla

Cuando se invoca el comando `datadog-ci gate evaluate`, se evalúan las reglas que tienen un contexto que coincide con el contexto del comando, y se pueden filtrar las reglas que etiquetan los equipos `backend` o `frontend`.

{{< img src="ci/rule_scope_always_evaluate.png" alt="Contexto de regla para reglas siempre evaluadas" style="width:80%;">}}

Para cada contexto (por ejemplo, `branch`), puedes seleccionar valores incluidos o excluidos.

- Cuando se seleccionan valores incluidos, la regla se evalúa si uno o más valores incluidos forman parte del contexto del comando.
- Cuando se seleccionan valores excluidos, la regla no se evalúa si alguno de los valores excluidos forma parte del contexto del comando.

Para crear una regla que se evalúe en todas las ramas excepto `main` del repositorio `example-repository`, puedes crear una regla con el siguiente contexto.

1. Haz clic en `Select when to evaluate`. 
1. Introduce `example-repository` en el campo **Repository** (Repositorio) y haz clic en **Include** (Incluir). 
1. Haz clic en **Add Filter** (Añadir filtro) y selecciona **Branch** (Rama). 
1. Introduce `main` en el campo **Branch** (Rama) y haz clic en **Exclude** (Excluir).

{{< img src="ci/scope_not_main_example_repository.png" alt="Contexto de regla de example-repository y no la rama principal" style="width:90%;">}}

Si una regla no contiene un contexto, se evalúa para todos los valores de ese contexto.
Por ejemplo, si una regla no contiene el contexto `repository`, se evalúa para todos los repositorios.

## Añadir un contexto personalizado

Además de la rama y el repositorio, puedes definir contextos personalizados para filtrar las reglas que se evalúan para un CI pipeline específico.

{{< img src="quality_gates/setup/custom_scope.png" alt="Añadir un contexto personalizado para un contexto de regla en Quality Gates" style="width:80%;">}}

Para añadir un contexto personalizado al crear una regla:

1. Haz clic en **+ Add Filter** (+ Añadir filtro) y selecciona **Custom Scope** (Contexto personalizado).
2. Define el nombre de contexto, por ejemplo, `team`.
3. Define los valores incluidos o excluidos en contexto.

A diferencia de los contextos `branch` y `repository`, los contextos personalizados deben pasarse al [ comando `datadog-ci gate evaluate`][1] utilizando la opción `--contexto`.

Por ejemplo, puedes crear una regla que se evalúe para el repositorio `example-repository`, pero sólo cuando el equipo sea `backend`.

1. Haz clic en `Select when to evaluate`. 
1. Introduce `example-repository` en el campo **Repository** (Repositorio) y haz clic en **Include** (Incluir).
1. Haz clic en **Add Filter** (Añadir filtro) y selecciona **Custom scope** (Contexto personalizado).
1. Introduce un nombre de etiqueta y haz clic en **Add Custom Scope** (Añadir contexto personalizado).

   {{< img src="quality_gates/setup/add_tag.png" alt="Contexto de regla para example-repository y el equipo de backend" style="width:50%;">}}

1. Introduce `backend` en el campo **team** (equipo) y hax clic en **Include** (Incluir).

{{< img src="ci/rule_scope_example_repository_team_backend.png" alt="Contexto de regla para example-repository y el equipo de backend" style="width:80%;">}}

La regla se evalúa cuando se invoca el siguiente comando en un CI pipeline del repositorio `example-repository`:
- `datadog-ci gate evaluate --scope team:backend`

La regla **no** se evalúa cuando en su lugar se invocan los siguientes comandos:
- `datadog-ci gate evaluate`que no especifica ningún equipo.
- `datadog-ci gate evaluate --scope team:api --scope team:frontend`que especifica equipos distintos de `backend`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci