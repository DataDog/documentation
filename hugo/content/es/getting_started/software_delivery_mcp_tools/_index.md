---
description: Conecte agentes de IA a sus datos de CI Visibility, Test Optimization
  y Deployment Gates usando el Datadog MCP Server.
further_reading:
- link: mcp_server/setup
  tag: Documentación
  text: Configuración del Datadog MCP Server
- link: continuous_integration/
  tag: Documentación
  text: CI Visibility
- link: tests/
  tag: Documentación
  text: Test Optimization
- link: deployment_gates/
  tag: Documentación
  text: Puertas de despliegue
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Conecte sus agentes de IA a las herramientas y el contexto de Datadog mediante
    el Datadog MCP Server
title: Introducción a las herramientas de Software Delivery MCP
---
## Descripción general {#overview}

El [Datadog MCP Server][1] permite que los agentes de IA accedan a sus datos de Software Delivery a través del [Model Context Protocol (MCP)][2]. El conjunto de herramientas `software-delivery` proporciona herramientas para interactuar con [CI Visibility][3], [Test Optimization][4], [Code Coverage][8], [métricas DORA][9] y [Deployment Gates][10] directamente desde clientes impulsados por IA como Cursor, Claude Code o OpenAI Codex.

## Casos de uso {#use-cases}

Las herramientas de Software Delivery MCP desbloquean flujos de trabajo asistidos por IA para:

- **Depuración de fallas en pipelines**: Pida a su agente de IA que encuentre fallas recientes en pipelines, analice registros de errores y sugiera correcciones.
- **Identificación de pruebas inestables**: Consulte las pruebas inestables en su repositorio y obtenga recomendaciones priorizadas sobre cuáles corregir primero.
- **Análisis del rendimiento de CI**: Obtenga estadísticas agregadas sobre duraciones de pipelines, tasas de fallas y tendencias a lo largo del tiempo.
- **Triaje de fallas en pruebas**: Entienda qué pruebas están fallando, su propiedad y sus patrones históricos.
- **Revisión de Code Coverage**: Obtenga resúmenes de Code Coverage para ramas o commits, incluyendo cobertura de parches y desgloses por servicio o propietario del código.
- **Medición de métricas DORA**: Consulte la frecuencia de despliegue, el tiempo de entrega de cambios, la tasa de fallas en cambios y el tiempo de recuperación por servicio o equipo.
- **Verificación de configuraciones de optimización de pruebas**: Vea qué funciones de Test Optimization están activas para un servicio, incluyendo Test Impact Analysis, Early Flake Detection y Auto Test Retries.
- **Reintento de trabajos de CI fallidos**: Ponga en cola un reintento para un trabajo fallido de GitHub Actions o GitLab sin salir de la sesión del agente.
- **Verificación del estado de PR**: Obtenga una vista combinada de fallas de CI, Code Coverage y violaciones de calidad o seguridad para una solicitud de extracción (pull request).
- **Investigación de fallas en Deployment Gates**: Descubra qué reglas causaron que una puerta fallara y si la falla bloqueó el despliegue.
- **Revisión de la configuración de Deployment Gates**: Vea qué puertas y reglas se aplican a un servicio y entorno.

## Herramientas disponibles {#available-tools}

El conjunto de herramientas `software-delivery` incluye las siguientes herramientas:

`search_datadog_ci_pipeline_events`
: Busque eventos de pipeline de CI con filtros y obtenga detalles sobre fallas, duraciones y estados.

`aggregate_datadog_ci_pipeline_events`
: Agregue eventos de pipeline de CI para estadísticas como duraciones promedio, conteos de fallos y análisis de percentiles.

`get_datadog_flaky_tests`
: Encuentre pruebas inestables con detalles de triaje que incluyen tasa de fallos, categoría, propietarios e impacto en CI.

`update_datadog_flaky_test_states`
: Establezca el estado de una o más pruebas inestables en `quarantined` (suprimir fallos), `disabled` (omitir prueba), `fixed` (marcar como resuelto) o `active` (restaurar). Esta es una operación de escritura que requiere el permiso `TestOptimizationWrite` y la aprobación explícita del usuario. Todos los cambios de estado son reversibles.

`aggregate_datadog_test_events`
: Agregue eventos de prueba para analizar tendencias de confiabilidad y rendimiento.

`search_datadog_test_events`
: Busque eventos de prueba con filtros y obtenga detalles sobre ellos.

`get_datadog_code_coverage_branch_summary`
: Obtenga métricas resumidas de Code Coverage agregadas para una rama de repositorio, incluyendo la cobertura total, la cobertura de parches y los desgloses por servicio/propietario del código.

`get_datadog_code_coverage_commit_summary`
: Obtenga métricas resumidas de Code Coverage agregadas para un commit de repositorio, incluyendo la cobertura total, la cobertura de parches y los desgloses por servicio/propietario del código.

`get_datadog_test_optimization_settings`
: Recupere qué funciones de Test Optimization están habilitadas para un servicio, incluyendo el Test Impact Analysis (ITR), la Detección Temprana de Inestabilidad (EFD), los Reintentos Automáticos de Pruebas (ATR), la Reproducción de Pruebas Fallidas, la recopilación de Code Coverage y los Comentarios de PR.

`get_datadog_flaky_tests_management_policies`
: Recupere las políticas de gestión de pruebas inestables configuradas para un repositorio, incluyendo ventanas de cuarentena automática, reglas de rama, umbrales de tasa de fallos, políticas de desactivación y configuraciones de reintento.

`search_dora_deployments`
: Busque eventos de implementación DORA con filtros, u obtenga los detalles completos de una implementación específica por ID. Para tendencias agregadas (frecuencia de implementación, tiempo de entrega de cambios, tasa de fallos), utilice `aggregate_dora_deployments` en su lugar.

`aggregate_dora_deployments`Devuelve métricas DORA (frecuencia de implementación, tiempo de entrega de cambios, tasa de fallos en cambios, tiempo de recuperación) para un servicio, equipo o repositorio, como valores escalares o series temporales.
: Agregue métricas DORA (frecuencia de implementación, tiempo de entrega de cambios, tasa de fallos en cambios y tiempo de recuperación) como valores escalares o series temporales. Para un resumen completo de DORA, llame a esta herramienta cuatro veces en paralelo, una por cada métrica.

`retry_datadog_ci_job`
: Ponga en cola un reintento para un trabajo de CI fallido en GitHub Actions o GitLab. Una operación de escritura que modifica el estado de CI, lo que requiere el permiso `CiVisibilityWrite`. Los límites del lado del servidor restringen los reintentos a dos por trabajo durante siete días. Para otros proveedores de CI, utilice la interfaz de usuario del proveedor para volver a ejecutar.

`search_datadog_deployment_gates`
: Busque puertas de implementación configuradas por servicio o entorno. Devuelve la configuración de la puerta, no los resultados de la evaluación.

`get_datadog_deployment_gate`
: Obtenga una puerta de implementación configurada por su ID de puerta, incluyendo sus reglas y configuraciones.

`search_datadog_deployment_gate_evaluations`
: Busque evaluaciones de puertas de implementación por servicio, entorno o estado (`in_progress`, `pass` o `fail`). Busca en las últimas 24 horas de forma predeterminada, hasta un máximo de 30 días.

`get_datadog_deployment_gate_evaluation`
: Obtenga una evaluación de puerta de implementación con el resultado de cada regla. Utilice esto para explicar por qué falló una puerta.

`search_datadog_deployment_gate_rule_evaluations`
: Busque resultados de reglas individuales en las evaluaciones de Deployment Gate. Los resultados incluyen evidencia de fallos, como monitores activados o insights de Watchdog. Use esto para encontrar qué reglas fallan con mayor frecuencia para un servicio.

Las herramientas de Deployment Gates son de solo lectura y requieren el permiso `DeploymentGatesRead`. Las puertas y reglas en modo de prueba (dry run) se evalúan pero no bloquean los despliegues, por lo que un estado `fail` con `dry_run: true` significa que el despliegue continuó.

## Ejemplos de prompts {#example-prompts}

Después de conectarse, pruebe con prompts como:

- Muéstreme todas las canalizaciones para mi commit `58b1488`.
- ¿Qué está causando que el trabajo `integration-test` falle en mi rama?
- Encuentre pruebas inestables activas para el servicio de checkout ordenadas por tasa de fallos.
- ¿Cuántas canalizaciones fallidas ha habido en las últimas 2 semanas?
- Muéstreme el percentil 95 de la duración de la canalización agrupado por nombre de canalización.
- ¿Cuál es la cobertura de código en la rama `main` para `github.com/my-org/my-repo`?
- Muéstreme las métricas de Code Coverage para el commit `abc123abc123abc123abc123abc123abc123abcd`.
- ¿Cuál es la frecuencia de despliegue y la tasa de fallos en los cambios para el servicio `checkout` en los últimos 30 días?
- ¿Qué funciones de Test Optimization están habilitadas para `auth-service`?
- Ponga en cuarentena todas las pruebas inestables activas en el repositorio `checkout-service`.
- ¿Por qué falló el Deployment Gate para `checkout` en `prod` en el último despliegue?
- ¿Qué reglas de Deployment Gate para el servicio `checkout` en `prod` están en modo de prueba (dry run)?
- ¿Qué reglas de Deployment Gate fallaron con mayor frecuencia para el servicio `payments` en los últimos 7 días?

## Configuración {#setup}

Para usar las herramientas de Software Delivery, conéctese al Datadog MCP Server con el conjunto de herramientas `software-delivery` habilitado. Agregue el parámetro de consulta `toolsets` a la URL del punto de conexión para su [sitio de Datadog][5]:

```text
https://mcp.{{< region-param key="dd_site" >}}/v1/mcp?toolsets=core,software-delivery
```

Para obtener instrucciones de configuración completas, incluida la configuración del cliente para Cursor, Claude Code, VS Code y otros clientes de IA, consulte [Configurar el Datadog MCP Server][1].

## Agent skills {#agent-skills}

Las Agent skills son conjuntos de instrucciones predefinidos para agentes de codificación de IA que automatizan los flujos de trabajo comunes de Software Delivery. El conjunto de habilidades `dd-software-delivery` está disponible en el repositorio [Datadog agent-skills][6]. Proporciona dos habilidades para clasificar pruebas inestables y desbloquear pipelines de PR fallidos utilizando sus datos en vivo de CI y Test Optimization.

Después de conectar el `software-delivery` conjunto de herramientas MCP, su asistente de IA carga automáticamente las habilidades cuando su mensaje coincide con su propósito. Por ejemplo, ingresar "TestCheckoutServiceIntegration sigue fallando en CI — investígalo" carga `/triage-flaky-test` sin necesidad de instalación.

Para invocar las habilidades explícitamente con un comando de barra diagonal, instálelas localmente:

### Instalar {#install}

```shell
npx skills add datadog-labs/agent-skills \
  --skill unblock-pr \
  --skill triage-flaky-test \
  --full-depth -y
```

Reinicie Claude Code después de instalar para que aparezcan los comandos de barra diagonal.

Cada habilidad utiliza automáticamente el Datadog MCP Server si está conectado, y recurre a la CLI de [pup][7] en caso contrario. Para usar la alternativa de pup, instale y autentique pup:

```shell
brew install datadog-labs/pack/pup
pup auth login
```

### Habilidades disponibles {#available-skills}

| Habilidad | Invocar con | Lo que hace |
|-------|-------------|-------------|
| Clasificar prueba inestable | `/triage-flaky-test` | Obtenga el historial, el patrón de falla y la categoría de IA para una prueba inestable específica, luego recomiende solucionar, poner en cuarentena o escalar |
| Desbloquear PR | `/unblock-pr` | Atribuya cada falla de CI en una PR como inestable, de infraestructura o regresión, muestre la cobertura de código y las violaciones de calidad o seguridad, y proponga una acción dirigida |

### Clasificar prueba inestable {#triage-flaky-test}

`/triage-flaky-test` investiga una prueba inestable específica. Extrae el historial de fallas de 30 días, extrae los principales mensajes de error y trazas de pila, y verifica cuántos pipelines ha impactado la prueba. Propone una solución dirigida basada en la categoría de pruebas inestables y la traza de pila, o recomienda poner en cuarentena cuando la causa raíz no esté clara. Produce un resumen de clasificación estructurado con una recomendación para solucionar, poner en cuarentena o escalar al equipo propietario.

Si la habilidad recomienda poner en cuarentena, presenta la acción propuesta y requiere su aprobación explícita antes de escribir. Todos los cambios de estado son reversibles.

```
/triage-flaky-test TestCheckoutServiceIntegration
/triage-flaky-test TestCheckoutServiceIntegration github.com/my-org/my-service
```

### Desbloquear PR {#unblock-pr}

`/unblock-pr` investiga un pipeline de CI de PR fallido. Para cada trabajo fallido, verifica si la falla ya estaba presente en la rama predeterminada o en otras ramas. La habilidad clasifica la falla como **inestable**, **infraestructura** o **regresión**. En paralelo, obtiene la cobertura de código de la rama y cualquier violación de calidad de código o seguridad de los insights de PR. Produce un resumen de triaje con clasificación por trabajo, evidencia, una acción recomendada y una sección de Salud de PR que resume la cobertura y las violaciones.

Para fallas inestables, la habilidad se encadena a `triage-flaky-test` para una investigación más profunda. Para fallas de infraestructura transitorias en GitHub Actions o GitLab, reintenta los trabajos fallidos usando `retry_datadog_ci_job` (MCP) o `gh run rerun` (respaldo de pup, solo para GitHub Actions); para otros proveedores de CI, proporciona un enlace a la interfaz de usuario del proveedor. Para regresiones, le solicita que investigue sus cambios de código.

**Nota**: Los datos de violaciones de calidad de código y seguridad en la sección de Salud de PR requieren el conjunto de herramientas MCP y no están disponibles en el modo pup.

```
/unblock-pr
/unblock-pr feat/add-retry-logic
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /es/continuous_integration/
[4]: /es/tests/
[5]: /es/getting_started/site/
[6]: https://github.com/datadog-labs/agent-skills
[7]: https://github.com/DataDog/pup
[8]: /es/code_coverage/
[9]: /es/delivery_performance/dora_metrics/
[10]: /es/deployment_gates/