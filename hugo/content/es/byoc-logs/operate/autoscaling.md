---
aliases:
- /es/cloudprem/operate/autoscaling/
description: Configure Horizontal Pod Autoscalers para las cargas de trabajo del indexador
  y compactador de BYOC Logs.
further_reading:
- link: /byoc-logs/operate/sizing/
  tag: Documentación
  text: Dimensionamiento del clúster
- link: /byoc-logs/operate/monitoring/
  tag: Documentación
  text: Hacer un seguimiento de BYOC Logs
- link: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/values.yaml
  tag: Fuente
  text: Valores predeterminados del chart de Helm de CloudPrem
title: Escalar automáticamente indexadores y compactadores
---
## Descripción general {#overview}

El chart de Helm `datadog/cloudprem` crea Horizontal Pod Autoscalers (HPAs) para los indexadores y compactadores independientes de BYOC (Bring Your Own Cloud) Logs cuando usted los habilita. Los HPA están deshabilitados de forma predeterminada y cada componente se configura de forma independiente.

## Antes de comenzar {#before-you-begin}

Antes de habilitar el escalado automático, usted necesita:

- Una implementación de BYOC Logs instalada con el chart de Helm `datadog/cloudprem`.
- Versión del chart `0.4.6` o posterior para el escalado automático del compactador independiente.
- Kubernetes Metrics Server, u otra implementación de API de métricas, instalada en el clúster.
- Suficiente capacidad de nodos para el número máximo de pods de indexador y compactador.
- Solicitudes de CPU configuradas para las cargas de trabajo con escalado automático.

Los cálculos de HPA basados en CPU utilizan la solicitud de CPU del pod. Los indexadores obtienen las solicitudes de CPU de `indexer.podSize` o `indexer.resources.requests.cpu`. Para los compactadores independientes, configure `compactor.resources.requests.cpu`.

## Habilitar el escalado automático del indexador {#enable-indexer-autoscaling}

Para habilitar el HPA del indexador, establezca `indexer.autoscaling.enabled` en `true`:

```yaml
indexer:
  autoscaling:
    enabled: true
```

Cuando habilita el escalado automático del indexador, el HPA controla el número de pods del indexador e ignora `indexer.replicaCount`.

Configuración predeterminada del HPA del indexador:

| Configuración | Predeterminado | Descripción |
|---|---:|---|
| `indexer.autoscaling.minReplicas` | `2` | Número mínimo de pods del indexador |
| `indexer.autoscaling.maxReplicas` | `10` | Número máximo de pods del indexador |
| Objetivo de CPU | `70%` | Objetivo de utilización promedio de CPU en los pods del indexador |

## Habilitar el escalado automático del compactador {#enable-compactor-autoscaling}

Para habilitar el HPA del compactador, habilite los compactadores independientes y establezca `compactor.autoscaling.enabled` en `true`:

```yaml
enableStandaloneCompactors: true

compactor:
  autoscaling:
    enabled: true
```

El chart crea el HPA del compactador solo cuando establece `enableStandaloneCompactors` y `compactor.autoscaling.enabled` en `true`. Cuando habilita el escalado automático del compactador, el HPA controla el número de pods del compactador e ignora `compactor.replicaCount`.

Configuración predeterminada del HPA del compactador:

| Configuración | Predeterminado | Descripción |
|---|---:|---|
| `compactor.autoscaling.minReplicas` | `1` | Número mínimo de pods del compactador |
| `compactor.autoscaling.maxReplicas` | `10` | Número máximo de pods del compactador |
| Objetivo de CPU | `80%` | Objetivo de utilización promedio de CPU en los pods del compactador |

## Anular los valores predeterminados {#override-the-defaults}

Establezca `minReplicas` y `maxReplicas` junto con `enabled` para dimensionar el rango de escalado para su carga de trabajo. Utilice la guía [Dimensionamiento del clúster][1] para elegir un máximo que admita la capacidad de su nodo:

```yaml
indexer:
  autoscaling:
    enabled: true
    minReplicas: 4
    maxReplicas: 20
```

## Aplique la configuración {#apply-the-configuration}

Agregue los valores de escalado automático a su archivo de valores de BYOC Logs y, a continuación, actualice su versión:

```shell
helm upgrade <RELEASE_NAME> datadog/cloudprem \
  --namespace <NAMESPACE_NAME> \
  --values datadog-values.yaml
```

## Verifique los HPA {#verify-the-hpas}

Liste los HPA en el espacio de nombres de BYOC Logs:

```shell
kubectl get hpa -n <NAMESPACE_NAME>
```

Describa un HPA para verificar las métricas y los eventos de escalado recientes:

```shell
kubectl describe hpa <RELEASE_NAME>-indexer -n <NAMESPACE_NAME>
kubectl describe hpa <RELEASE_NAME>-compactor -n <NAMESPACE_NAME>
```

`<RELEASE_NAME>-indexer` y `<RELEASE_NAME>-compactor` son los nombres de HPA predeterminados creados por el chart. Si configuró `nameOverride` o `fullnameOverride`, utilice los nombres resultantes en su lugar.

Si `kubectl get hpa` muestra `<unknown>` en la columna `TARGETS`, el HPA no puede leer las métricas de CPU. Verifique que la API de métricas se esté ejecutando y que los pods de destino tengan solicitudes de CPU.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/byoc-logs/operate/sizing/