---
aliases:
- /es/integrations/faq/azure-vm-status-is-not-reporting
- /es/integrations/faq/azure-status-metric
title: Métricas de recuento y estado de Azure
---

## Información general

Datadog genera dos métricas adicionales para cada recurso monitorizado con la [integración de Azure][1]: `azure.*.status` y `azure.*.count`. Por ejemplo, las máquinas virtuales de Azure monitorizadas por Datadog reportan `azure.vm.status` y `azure.vm.count`. Estas dos métricas cubren información similar.

La métrica `azure.*.count` es una mejora con respecto a `azure.*.status`, que está obsoleta.

## Métrica de recuento

La métrica `azure.*.count` proporciona dos datos fundamentales:

- La cantidad de recursos de ese tipo.
- El estado de cada recurso según Azure.

La métrica `azure.*.count` se crea en el mismo espacio de nombres que las demás métricas para ese tipo de recurso, por ejemplo: `azure.network_loadbalancers.count`. Incluye las mismas etiquetas (tags) de metadatos que las demás métricas en ese espacio de nombres, además de una etiqueta adicional para `status`.

### Casos de uso

Usa la métrica `azure.*.count` para:

- Crear una vista de la cantidad de máquinas virtuales desglosadas por su estado a lo largo del tiempo al graficar `azure.vm.count` sobre todo y sumar por `status`.
- Crear widgets de consulta en los dashboards para mostrar la cantidad de un tipo de recurso determinado. Usa las etiquetas disponibles para delimitar el recuento a una agregación relevante, como región, grupo de recursos, tipo o estado.
- Crear monitores para recibir alertas sobre el estado de diferentes recursos de Azure.

**Nota**: En algunos casos, la configuración de visualización predeterminada puede hacer que parezca que los recursos se cuentan dos veces de manera intermitente en gráficos o widgets de consulta. Esto no afecta a los monitores o widgets que tienen un estado específico.
Puedes reducir este efecto al desactivar la [interpolación][2] en gráficos o widgets de consulta mediante la opción Interpolation > none (Interpolación > ninguna) o el uso de `.fill(null)`. 

Para la mayoría de los tipos de recursos, los posibles estados son:

- Running (En ejecución)
- Unavailable (No disponible)
- Unknown (Desconocido)
- Degraded (Degradado)
- Failed (Fallido)

Las máquinas virtuales tienen estados más detallados, incluido:

- Running (En ejecución)
- Stopped_deallocated
- Stopped (Detenido)
- Unknown (Desconocido)
- Unavailable (No disponible)
- Degraded (Degradado)
- Failed (Fallido)

Si ves el estado `query_failed`, debes habilitar el [proveedor de Resource Health](#troubleshooting) en Azure.

## Métrica de estado

La métrica `azure.*.status` es la solución anterior para este mismo tipo de información. Brinda informa sobre la cantidad de recursos disponibles para cada tipo de recurso de Azure.

### Diferencias

Las diferencias clave entre las métricas `.status` y `.count`:

- `azure.*.count` incluye todos los recursos que existen en la cuenta de Azure, mientras que `azure.*.status` solo informa la cantidad de recursos disponibles.
- `azure.*.count` incluye una etiqueta `status`, que informa el estado de disponibilidad específico del recurso, mientras que `azure.*.status` solo incluye las etiquetas estándar para el tipo de recurso.
- `azure.*.count` incluye mejoras en la precisión y fiabilidad del valor de la métrica.

## Solucionar problemas

Si tu integración de Azure informa métricas pero no `azure.*.status`, o `azure.*.count` devuelve `status:query_failed`, tu suscripción de Azure debe registrar el proveedor de Azure Resource Health.

Uso de la interfaz de línea de comandos de Azure:
```bash
azure login # Inicia sesión en el usuario de Azure asociado con tu cuenta de Datadog
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

La métrica `azure.*.status` se debería mostrar en Datadog dentro de 5 a 10 minutos.

[1]: /es/integrations/azure/
[2]: /es/metrics/guide/interpolation-the-fill-modifier-explained/