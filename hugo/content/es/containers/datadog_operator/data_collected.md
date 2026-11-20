---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/data_collected.md
title: Datos recopilados del Datadog Operator
---
El Datadog Operator envía métricas y eventos a Datadog para monitorizar el despliegue de componentes del Datadog Agent en el clúster.

Para consultar una lista de todas las métricas de Kubernetes recopiladas por Datadog, consulta [Datos recopilados de Kubernetes][1].

## Métricas

| Nombre de la métrica                                              | Tipo de métrica | Descripción                                                                                                                         |
| -------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `datadog.operator.agent.deployment.success`              | gauge       | `1` si el número deseado de réplicas del Agent es igual al número de pods disponibles del Agent, `0` en caso contrario.                               |
| `datadog.operator.clusteragent.deployment.success`       | gauge       | `1` si el número deseado de réplicas del Cluster Agent es igual al número de pods del Cluster Agent disponibles, `0` en caso contrario.               |
| `datadog.operator.clusterchecksrunner.deployment.success` | gauge       | `1` si el número deseado de réplicas del ejecutador de checks del clúster es igual al número de pods del ejecutor de checks del clúster disponibles, `0` en caso contrario. |
| `datadog.operator.reconcile.success`                     | gauge       | `1` si el último error de conciliación registrado es nulo, `0` en caso contrario. La etiqueta `reconcile_err` describe el último error registrado.         |

**Nota:** Las [claves de API y aplicaciones de Datadog][2] son necesarias para reenviar métricas a Datadog. Deben proporcionarse en el campo `credentials` de la definición del recurso personalizado.

## OpenMetrics

El Datadog Operator expone las métricas de Golang y Controller en formato OpenMetrics. Puedes recopilarlas con la [integración de OpenMetrics][3].

El check de OpenMetrics está habilitado por defecto a través de anotaciones de Autodiscovery y es programado por el Agent que se ejecuta en el mismo nodo que el pod del Datadog Operator. Consulta [Kubernetes e integraciones][4].

## Eventos

- Detectar/Borrar recurso personalizado <Namespace/Name>
- Crear/Actualizar/Borrar servicio <Namespace/Name>
- Crear/Actualizar/Borrar ConfigMap <Namespace/Name>
- Crear/Actualizar/Borrar DaemonSet <Namespace/Name>
- Crear/Actualizar/Borrar ExtendedDaemonSet <Namespace/Name>
- Crear/Actualizar/Borrar despliegue <Namespace/Name>
- Crear/Actualizar/Borrar ClusterRole </Name>
- Crear/Actualizar/Borrar rol <Namespace/Name>
- Crear/Actualizar/Borrar ClusterRoleBinding </Name>
- Crear/Actualizar/Borrar RoleBinding <Namespace/Name>
- Crear/Actualizar/Borrar secreto <Namespace/Name>
- Crear/Actualizar/Borrar PDB <Namespace/Name>
- Crear/Borrar ServiceAccount <Namespace/Name>

[1]: https://docs.datadoghq.com/es/containers/kubernetes/data_collected/
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/es/integrations/openmetrics/
[4]: https://docs.datadoghq.com/es/containers/kubernetes/integrations/?tab=annotations