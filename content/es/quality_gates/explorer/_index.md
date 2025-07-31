---
aliases:
- /es/continuous_integration/quality_gates/
description: Obtén más información sobre el explorador de puertas de calidad para
  puertas de calidad y ejecuciones de reglas.
further_reading:
- link: /quality_gates/
  tag: Documentación
  text: Más información sobre las puertas de calidad
- link: /quality_gates/explorer/saved_views/
  tag: Documentación
  text: Más información sobre las vistas guardadas
title: Explorador de puertas de calidad
---

## Información general

El explorador de puertas de calidad te permite [buscar y filtrar](#search-and-filter), [visualizar](#visualize), y [exportar](#export) puertas de calidad o ejecuciones de reglas en varios niveles con cualquier etiqueta (tag).

{{< tabs >}}
{{% tab "Puertas" %}}

Dirígete a [**Software Delivery** > **Quality Gates** > **Quality Gate Executions**][101] (Entrega de software > Puertas de calidad > Ejecuciones de puertas de calidad) para ver tus puertas de calidad.

{{< img src="/quality_gates/explorer/gates_3.png" text="Página de reglas de la puerta de calidad" style="width:100%" >}}

En el panel **Quality Gates** (Puertas de calidad) de la izquierda se muestran las facetas predeterminadas que puedes usar para buscar tus puertas.

| Faceta           | Descripción                                                   |
|-----------------|---------------------------------------------------------------|
| Estado       | Estado de la puerta de calidad: `Passed` o `Failed`.                   |
| ID de puerta      | ID de la puerta de calidad.                                      |

## Detalles de la puerta de calidad

Puedes ver datos agregados sobre las puertas de calidad durante el período de tiempo seleccionado. Usa el campo de búsqueda y las facetas para filtrar la lista y mostrar las puertas que quieres investigar.

### Datos de la puerta de calidad

Los datos de la puerta de calidad se encuentran disponibles en dashboards y notebooks, lo que permite a los equipos de ingeniería de construcción personalizar su comunicación sobre el trabajo de alta prioridad y las tendencias de CI a lo largo del tiempo.

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: https://app.datadoghq.com/dashboard/lists
[103]: https://app.datadoghq.com/notebook/list

{{% /tab %}}
{{% tab "Ejecuciones de reglas" %}}

Dirígete a [**Software Delivery** > **Quality Gates** > **Quality Gate Executions**][101] (Entrega de software > Puertas de calidad > Ejecuciones de puertas de calidad) para ver las ejecuciones de reglas de tu puerta de calidad.

{{< img src="/quality_gates/explorer/rules_1.png" text="Página de ejecuciones de reglas de puertas de calidad" style="width:100%" >}}

En el panel **Quality Gates** (Puertas de calidad) de la izquierda se muestran las facetas predeterminadas que puedes usar para buscar tus ejecuciones de reglas.

| Faceta           | Descripción                                                   |
|-----------------|---------------------------------------------------------------|
| Estado       | Estado de la puerta de calidad: `Passed` o `Failed`.                   |
| Nombre de la regla    | El nombre que le dio el usuario a una regla particular para identificarla.                                    |
| Estado de bloqueo | Determina si el estado de la regla provocará o no que falle el flujo de trabajo de CI: `true` o `false`.   |
| Creador      | El usuario que creó la regla de la puerta de calidad.                                 |
| Origen de datos  | El origen de los datos que se evalúa para la regla (tests, análisis estático).                             |
| ID de puerta      | ID de la puerta de calidad.                                      |

## Detalles de las ejecuciones de reglas

Puedes ver datos agregados sobre las ejecuciones de reglas durante el período de tiempo seleccionado. Usa el campo de búsqueda y las facetas para filtrar la lista y mostrar las ejecuciones que quieres investigar. 

### Datos de la ejecución de reglas

Los datos de las reglas de la puerta de calidad se encuentran disponibles en [dashboards][102] y [notebooks][103], lo que permite a los equipos de ingeniería de construcción personalizar su comunicación sobre el trabajo de alta prioridad y las tendencias de CI a lo largo del tiempo.

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: https://app.datadoghq.com/dashboard/lists
[103]: https://app.datadoghq.com/notebook/list

{{% /tab %}}
{{< /tabs >}}

## Buscar y filtrar

Puedes limitar, ampliar o cambiar el enfoque en un subconjunto de puertas de calidad o ejecuciones de reglas si haces clic en las facetas de la izquierda o si escribes tu propia consulta personalizada en la barra de búsqueda. Cuando selecciones o anules la selección de facetas, la barra de búsqueda reflejará los cambios de manera automática. Del mismo modo, puedes modificar la consulta desde la barra de búsqueda o escribir una consulta desde cero.

- Para aprender a buscar reglas de la puerta de calidad, consulta [Buscar y gestionar][1].
- Para aprender a crear consultas, consulta [Sintaxis de búsqueda][2].

## Analizar

Agrupa las puertas de calidad o las ejecuciones de reglas en campos, patrones y transacciones de nivel superior para derivar o consolidar información. No es necesario crear una faceta para buscar un atributo. Usa las [facetas][3] para:

- **Identificar tendencias y patrones en las ejecuciones de la puerta de calidad**: conoce qué repositorios o pipelines se bloquean con mayor frecuencia.
- **Identificar tendencias y patrones en las ejecuciones de reglas de la puerta de calidad**: conoce qué tipos de reglas fallan con mayor frecuencia en toda la organización.

## Visualizar

Selecciona un tipo de visualización para visualizar los resultados de los filtros y agregaciones y comprender mejor tus puertas de calidad o ejecuciones de reglas. Por ejemplo, puedes ver los resultados de la puerta en una lista para organizar los datos de las puertas en columnas o en una gráfica de series temporales a fin de medir los datos de la ejecución de la puerta a lo largo del tiempo.

## Exportar

Exporta tu vista en el [explorador de puertas de calidad][5] para reutilizarla más adelante o en diferentes contextos. Para obtener más información, consulta [Vistas guardadas][4].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/quality_gates/search
[2]: /es/quality_gates/explorer/search_syntax
[3]: /es/quality_gates/explorer/facets
[4]: /es/quality_gates/explorer/saved_views
[5]: /es/quality_gates/explorer