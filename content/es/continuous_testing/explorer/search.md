---
aliases:
- /es/synthetics/explorer/search
description: Examina lotes de trabajos CI ejecutados y corrige los resultados de tests
  fallidos.
further_reading:
- link: /continuous_testing/explorer
  tag: Documentación
  text: Más información sobre el Explorador de monitorización Synthetic y de resultados
    de tests
title: Buscar lotes de prueba
---

## Información general

Después de seleccionar un marco temporal en el menú desplegable de la parte superior derecha, puedes buscar lotes de trabajos CI haciendo clic en el tipo de evento **Lotes de CI** en el [Explorador de monitorización Synthetic y de resultados de tests][1].

{{< img src="continuous_testing/explorer/results_explorer.png" alt="Lotes de CI en el Explorador de Monitorización Synthetic y resultados de tests" style="width:100%;">}}

Puedes utilizar facetas para realizar las siguientes acciones:

- Observar los lotes de tests más recientes que se ejecutan en un pipeline CI.
- Agregar lotes de CI e identificar ID de tests para añadirlos a tu pipeline CI.
- Comparar el número de ejecuciones de tests fallidas según su estado de bloqueo.

## Explorar facetas

El panel de facetas de la izquierda muestra varias facetas que puedes utilizar para buscar en tus lotes. Para empezar a personalizar la consulta de búsqueda, haz clic en la lista de las facetas que empiezan con **Lote**.

### Atributos de lotes

Las facetas **Lotes** te permiten filtrar los atributos de tus lotes.

| Faceta            | Descripción                                                 |
|------------------|-------------------------------------------------------------|
| `Summary Status` | El estado del lote: `Passed`, `Failed` y `In Progress`. |
| `Duration`       | La duración total del lote.                          |
| `ID`             | El ID del lote.                                               |

### Atributos CI

Las facetas **CI** te permiten filtrar los atributos de tus lotes relacionados con CI.

| Faceta          | Descripción                                 |
|----------------|---------------------------------------------|
| `CI Provider`  | El proveedor CI asociado al lote.  |
| `Job Name`     | El nombre del trabajo asociado al lote.     |
| `Job URL`      | La URL del trabajo asociada al lote.      |
| `Pipeline ID`  | El ID del pipeline asociado al lote.  |
| `Pipeline Name` | El nombre del pipeline o del repositorio asociado al lote. |
| `Pipeline Number` | El número del pipeline o la compilación asociado al lote. |
| `Pipeline URL` | La URL del pipeline asociada al lote. |
| `Stage Name`   | El nombre de la etapa asociado al lote.   |

### Atributos de resultados de tests

Las facetas **Resultados de tests** te permiten filtrar atributos de los resultados de tests ejecutados.

| Faceta            | Descripción                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| <code>Regla de ejecución</code> | La regla de ejecución asociada al resultado del test del lote: `Blocking`, `Non Blocking` y `Skipped`. |
| `Fast Retries`   | El número de reintentos rápidos asociados al resultado del test del lote.                                |
| `Location`       | La localización asociada al resultado del test del lote.                                              |
| `Test ID`        | El ID del test asociado al resultado del test del lote.                                               |
| `Test Name`      | El nombre del test asociado al resultado del test del lote.                                             |

### Atributos Git

Las facetas **Git** te permiten filtrar los atributos de tus lotes relacionados con Git.

| Faceta       | Descripción                               |
|-------------|-------------------------------------------|
| `Author Email` | La dirección de correo electrónico del autor de la confirmación. |
| `Branch`    | La rama asociada al lote.     |
| `Commit SHA`| El algoritmo hash seguro (SHA) de confirmación asociado al lote. |
| `Repository URL`| La URL del repositorio Git asociado al lote. |
| `Tag`       | La etiqueta (tag) Git asociada al lote.    |

Para filtrar los lotes de los trabajos CI ejecutados durante el último día, crea una consulta de búsqueda como `@ci.provider.name:github` y configura el intervalo de tiempo en `1d`.

Para obtener más información sobre la búsqueda de lotes CI, consulta la [sintaxis de búsqueda][2].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /es/continuous_testing/explorer/search_syntax