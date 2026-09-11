---
aliases:
- /es/synthetics/explorer/search
- /es/continuous_testing/explorer/search/
description: Examina lotes de trabajos de CI ejecutados y corrige los resultados de
  tests fallidos.
further_reading:
- link: /synthetics/explore/results_explorer
  tag: Documentación
  text: Más información sobre Synthetic Monitoring & Testing Results Explorer
title: Buscar lotes de test
---

## Información general

Después de seleccionar un marco temporal en el menú desplegable de la parte superior derecha, puedes buscar lotes de trabajos de CI haciendo clic en el tipo de evento **CI Batches** (Lotes de CI) en el [Synthetic Monitoring & Testing Results Explorer][1].

{{< img src="continuous_testing/explorer/results_explorer.png" alt="Lotes de CI en el Synthetic Monitoring & Testing Results Explorer" style="width:100%;">}}

Puedes utilizar facetas para realizar las siguientes acciones:

- Observar los últimos lotes de tests que se ejecutan en un pipeline de CI.
- Agregar lotes de CI e identificar ID de tests para añadirlos a tu pipeline de CI.
- Comparar el número de tests fallidos según tu estado de bloqueo.

## Explorar facetas

El panel de facetas de la izquierda enumera varias facetas que puedes utilizar para buscar en tus lotes. Para empezar a personalizar la consulta de búsqueda, haz clic en la lista de facetas empezando por **Batch** (Lote).

### Atributos de los lotes

Las facetas **Batch** (Lotes) te permiten filtrar los atributos de tus lotes.

| Faceta            | Descripción                                                 |
|------------------|-------------------------------------------------------------|
| `Summary Status` | El estado del lote: `Passed`, `Failed` y `In Progress`. |
| `Duration`       | La duración total del lote.                          |
| `ID`             | El ID del lote.                                               |

### Atributos de CI

Las facetas **CI** te permiten filtrar los atributos relacionados con CI de tus lotes.

| Faceta          | Descripción                                 |
|----------------|---------------------------------------------|
| `CI Provider`  | El proveedor de CI asociado al lote.  |
| `Job Name`     | El nombre del trabajo asociado al lote.     |
| `Job URL`      | La URL del trabajo asociada al lote.      |
| `Pipeline ID`  | El ID del pipeline asociado al lote.  |
| `Pipeline Name` | El nombre del pipeline o repositorio asociado al lote. |
| `Pipeline Number` | El número de pipeline o compilación asociado al lote. |
| `Pipeline URL` | La URL del pipeline asociada al lote. |
| `Stage Name`   | El nombre de etapa asociado al lote.   |

### Atributos del resultado del test

Las facetas **Test result** (Resultado del test) te permiten filtrar los atributos de los resultados de los tests ejecutados.

| Faceta            | Descripción                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| <code>Regla de ejecución</code> | La regla de ejecución asociada al resultado del test del lote: `Blocking`, `Non Blocking` y `Skipped`. |
| `Fast Retries`   | Número de reintentos rápidos asociados al resultado del test del lote.                                |
| `Location`       | La localización asociada al resultado del test del lote.                                              |
| `Test ID`        | El ID del test asociado al resultado del test del lote.                                               |
| `Test Name`      | El nombre del test asociado al resultado del test del lote.                                             |

### Atributos Git

Las facetas **Git** te permiten filtrar los atributos relacionados con Git de tus lotes.

| Faceta       | Descripción                               |
|-------------|-------------------------------------------|
| `Author Email` | La dirección de correo electrónico del autor de la confirmación. |
| `Branch`    | La sucursal asociada al lote.     |
| `Commit SHA`| El SHA de confirmación asociado al lote. |
| `Repository URL`| La URL del repositorio Git asociado al lote. |
| `Tag`       | La etiqueta Git asociada al lote.    |

Para filtrar los lotes de trabajos de CI ejecutados durante el último día, crea una consulta de búsqueda como `@ci.provider.name:github` y establece el intervalo de tiempo en `1d`.

Para más información sobre la búsqueda de lotes de CI, consulta [Buscar sintaxis][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /es/continuous_testing/explorer/search_syntax