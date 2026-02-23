Cada procesador tiene una consulta de filtro correspondiente en sus campos. Los procesadores solo procesan las métricas que coinciden con su consulta de filtro. Y en todos los procesadores, excepto el procesador de filtro, las métricas que no coinciden con la consulta se envían al siguiente paso del pipeline. Para el procesador de filtro, las métricas que no coinciden con la consulta se descartan.

A continuación se ofrecen ejemplos de consultas de filtro de métricas:

- `NOT system.cpu.user`: Filtra las métricas que no tienen el campo `name:system.cpu.user`.
- `system.cpu.user OR system.cpu.user.total`: Esta consulta de filtro solo coincide con las métricas que tienen `name:system.cpu.user` o `name:system.cpu.user.total`.
- `tags:(env\:prod OR env\:test)`: Filtra las métricas con `env:prod` o `env:test` en `tags`.

Obtén más información sobre la escritura de consultas de filtros de métricas en [Sintaxis de búsqueda de métricas de Observability Pipelines][4002].

[4002]: /es/observability_pipelines/search_syntax/metrics/
