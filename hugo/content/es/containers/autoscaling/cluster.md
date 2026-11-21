---
description: Escale automáticamente sus clústeres con Kubernetes Cluster Autoscaling.
site_support_id: containers_autoscaling_cluster
title: Kubernetes Cluster Autoscaling
---
<div class="alert alert-warning">Durante el período de disponibilidad limitada, Datadog recomienda el <strong>uso exclusivo en entornos que no sean de producción</strong> de Datadog Kubernetes Cluster Autoscaling. Envíe un correo electrónico a <a href="mailto:kubernetes-beta@datadoghq.com">kubernetes-beta@datadoghq.com</a> para obtener más información y soporte.</div>

## Requisitos {#requirements}
- Datadog Agent v7.75+
- Datadog Operator v1.23.0+ **o** Datadog Helm chart v3.155.1+
- [Remote Configuration][1] debe estar habilitado tanto a nivel de organización como en los Datadog Agent de su clúster de destino. Consulte [Enabling Remote Configuration][2] para obtener instrucciones de configuración.
- Permisos de usuario de Datadog:
  - Org Management
  - API Keys Write
  - Administración de escalado automático

  De forma predeterminada, todos los usuarios administradores de Datadog tienen Autoscaling Manage, y todos los usuarios de Datadog tienen acceso de lectura para visualizar recomendaciones e informes.

  Para otorgar Autoscaling Manage a un usuario con un rol estándar o personalizado adicional, consulte [Datadog Role Permissions][3] para obtener instrucciones.

## Configuración {#setup}

1. Active Cluster Autoscaling.

   {{< tabs >}}
{{% tab "Datadog Operator" %}}

Establezca `features.autoscaling.cluster.enabled` en `true` en su especificación `DatadogAgent`.

```yaml
spec:
  features:
    autoscaling:
      cluster:
        enabled: true
```
{{% /tab %}}

{{% tab "Helm" %}}

Establezca `datadog.autoscaling.cluster.enabled` en `true` en su archivo `datadog-values.yaml`.

```yaml
datadog:
  autoscaling:
    cluster:
      enabled: true
```

Luego, ejecute `helm upgrade`.
{{% /tab %}}
{{< /tabs >}}
2. Si no tiene una instalación existente de Karpenter, instale el [plugin de Datadog `kubectl`][4]. Este plugin ayuda a instalar o conectarse a su configuración existente de Karpenter.
   ```shell
   kubectl krew install datadog
   ```
3. Ejecute el plugin `kubectl` e introduzca las credenciales de AWS para el proyecto de AWS en el que se está ejecutando el clúster:
   ```shell
   AWS_PROFILE=<foo> AWS_REGION=<bar> kubectl datadog autoscaling cluster install
   ```

   Este comando crea:
   - Dos stacks de CloudFormation llamados `dd-karpenter-$CLUSTER_NAME`
   - Un release de Helm llamado `karpenter` en el namespace de Kubernetes `dd-karpenter`
   - Objetos `EC2NodeClass` y `NodePool` de Karpenter

   Para opciones de comando más detalladas, ejecute [`kubectl datadog autoscaling cluster install --help`][4].

## Escale automáticamente un clúster {#autoscale-a-cluster}

En Datadog, navegue a [Kubernetes Autoscaling][5]. Puede revisar todos sus clústeres que están disponibles para autoescalado en la página [Autoscaling Settings][7]. Active la columna {{< ui >}}Enabled{{< /ui >}} para el clúster de su elección.

{{< img src="containers/autoscaling/settings.png" alt=" La página Autoscaling Settings que muestra la sección Enable Clusters for Autoscaling. Muestra una tabla filtrable de clústeres de Kubernetes con columnas para el nombre del clúster, nodos, capacidad de CPU, capacidad de memoria, porcentaje de uso de CPU con barras visuales, porcentaje de uso de memoria con barras visuales, recuento de cargas de trabajo autoescaladas, disponibilidad de escalado del clúster, disponibilidad de escalado de cargas de trabajo y un interruptor de habilitación. Los interruptores a la derecha muestran qué clústeres tienen habilitado el autoescalado." style="width:100%;" >}}

Use la página [Cluster Scaling][6] y seleccione un clúster para revisar sus recomendaciones. Identifique un clúster que desee comenzar a optimizar. Durante el período de disponibilidad limitada, Datadog recomienda seleccionar un **clúster que no sea de producción**.

{{< img src="containers/autoscaling/cluster-view.png" alt="La página de detalles de Cluster Scaling para el clúster dev-eks-shopist-a-us-east-1. La sección Cost Summary muestra cuatro métricas: costo del clúster de $140.7k con una variación mensual de -$3.1k, costo inactivo de $93.66k con una variación de -$2.29k, eficiencia de uso/solicitud de CPU del 27.24% y eficiencia de uso/solicitud de memoria del 35.15%. La sección Scaling Events muestra dos gráficos de series temporales que rastrean las métricas de CPU y memoria durante el último mes, con patrones de uso fluctuantes, junto con una línea de tiempo de eventos de escalado recientes que incluyen actividades de pod y DatadogPodAutoscaler. La sección Scaling Recommendations muestra una tabla de cargas de trabajo con CPU y memoria inactivas, que muestra un 8,7 % de autoescalado habilitado." style="width:100%;" >}}

Haga clic en {{< ui >}}Start Autoscaling{{< /ui >}} para aplicar las recomendaciones.

[1]: /es/agent/remote_config
[2]: /es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /es/account_management/rbac/permissions/#overview
[4]: /es/containers/kubernetes/kubectl_plugin/
[5]: https://app.datadoghq.com/orchestration/scaling/summary
[6]: https://app.datadoghq.com/orchestration/scaling/cluster
[7]: https://app.datadoghq.com/orchestration/scaling/settings