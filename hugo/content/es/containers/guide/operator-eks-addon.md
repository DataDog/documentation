---
aliases:
- /es/agent/guide/operator-eks-addon
description: Instale y configure el Datadog Agent en Amazon EKS usando el Datadog
  Operator como un complemento de EKS.
further_reading:
- link: agent/kubernetes/log
  tag: Documentación
  text: Datadog y Kubernetes
title: Instalación del Datadog Agent en Amazon EKS con el complemento Datadog Operator
---
<div class="alert alert-info">A partir de la versión v0.1.9, el complemento Datadog Operator admite la inyección automática de sidecars del Agent en pods programados en instancias de Fargate. Consulte <a href="https://docs.datadoghq.com/integrations/eks_fargate/?tab=datadogoperator#admission-controller-using-datadog-operator">esta guía</a> para obtener más detalles.
</div>


Puede instalar el Datadog Agent en un clúster de Amazon EKS instalando el [Datadog Operator](/containers/datadog_operator)
como un [complemento de Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html) y aplicando el `DatadogAgent` manifiesto.

Los Agents instalados mediante el complemento Datadog Operator solo recopilan datos de pods que se ejecutan en instancias EC2. Para los pods que se ejecutan en AWS Fargate, siga la [documentación de Amazon EKS en AWS Fargate][10].

En comparación con la [instalación de Helm][4] regular, existen ciertas diferencias al realizar la instalación como complemento:
* Durante la instalación del Datadog Operator, las imágenes deben extraerse únicamente del repositorio de EKS. Esto no puede ser modificado por el usuario.
* Los valores del Helm Chart del Datadog Operator, que pueden ser sobrescritos, están restringidos a un [archivo de esquema][3].

Estas restricciones son necesarias para que el Datadog Operator cumpla con las políticas de complementos de EKS, permitir que EKS garantice la seguridad de la instalación y deshabilitar funciones que aún no son compatibles en el entorno de complementos.

## Requisitos previos {#prerequisites}

* Suscripción al producto [Datadog Operator][1].
* kubectl instalado
* Si está utilizando la interfaz de línea de comandos para configurar el complemento, [AWS CLI](https://aws.amazon.com/cli/)

## Instalación del Datadog Operator {#installing-operator}

{{< tabs >}}
{{% tab "Consola" %}}

* Vaya al clúster de EKS en la consola de AWS.
* Vaya a la pestaña de complementos y seleccione *Obtener más complementos*.
* Busque y seleccione *Datadog Operator*. Luego, siga las instrucciones para completar la instalación.

{{% /tab %}}
{{% tab "CLI" %}}

Para instalar el complemento del Datadog Operator, ejecute:
  ```bash
  aws eks create-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

La instalación del complemento es asíncrona. Para verificar el estado de la instalación, ejecute:
  ```bash
  aws eks describe-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```
{{% /tab %}}
{{< /tabs >}}

Para verificar que la instalación se realizó correctamente, utilice la consola de administración de AWS, `eksctl` o la CLI de AWS para confirmar que un pod `datadog-operator` se está ejecutando.

## Configurar el Agent {#configuring-the-agent}

Después de haber instalado el complemento del Datadog Operator, puede proceder a configurar el Datadog Agent.

Siga las instrucciones para configurar el Datadog Agent utilizando el recurso personalizado `DatadogAgent`.

1. Cambie al espacio de nombres de instalación del Datadog Operator, que es `datadog-agent` de forma predeterminada.
   ```bash
   kubectl config set-context --current --namespace=datadog-agent
   ```
2. Cree un secreto de Kubernetes con sus [Datadog API y claves de aplicación][5]:
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   Reemplace `<DATADOG_API_KEY>` y `<DATADOG_APP_KEY>` con sus [Datadog API y claves de aplicación][5].


3. Cree un archivo `datadog-agent.yaml` con la especificación de su configuración de implementación `DatadogAgent`. El Datadog Operator utiliza la configuración predeterminada de la imagen del Agent y del Cluster Agent, y las extrae de un registro público.

   Si desea extraer imágenes de un registro privado de EKS, puede agregar `global.registry`. La siguiente configuración habilita las métricas, los registros y APM:
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       # Required in case the Agent cannot resolve the cluster name through IMDS. See the note below.
       clusterName: <CLUSTER_NAME>
       registry: <PRIVATE_EKS_REGISTRY_PATH>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
     features:
       apm:
         enabled: true
       logCollection:
         enabled: true
   ```
   Esta configuración de instancia del Agent extrae la imagen del Datadog Agent de un repositorio de ECR alojado en AWS Marketplace, el cual también contiene la imagen para el complemento de Amazon EKS del Datadog Operator. Si necesita alternativas, edite la entrada 'global.registry' en el manifiesto anterior.

   Para todas las opciones de configuración, consulte la [especificación de configuración del Datadog Operator][6].

   **Nota:** Si el acceso a IMDS v1 está bloqueado en el nodo, el Agent no puede resolver el nombre del clúster y ciertas funciones (por ejemplo, [Orchestrator Explorer][6]) no funcionan. Por lo tanto, Datadog recomienda agregar `spec.global.ClusterName` en el manifiesto `DatadogAgent`. Para saber cómo configurar el Agent para solicitar metadatos mediante IMDS v2, consulte el parámetro `ec2_prefer_imdsv2` en el [archivo de configuración de ejemplo del Agent][8].

4. Implemente el Datadog Agent:
   ```bash
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```


## Desinstale el Datadog Operator {#uninstall-the-operator}

Si desea desinstalar el Agent y el Datadog Operator, primero elimine el recurso personalizado `DatadogAgent`:

  ```bash
  kubectl delete datadogagents.datadoghq.com datadog
  ```

Confirme que todos los recursos del Agent se hayan eliminado y proceda con la desinstalación del complemento:

{{< tabs >}}
{{% tab "Consola" %}}

* Vaya al clúster de EKS en la consola de AWS.
* Vaya a la pestaña de complementos y seleccione el complemento *Datadog Operator*.
* Haga clic en **Eliminar** y confirme cuando se le solicite.

{{% /tab %}}
{{% tab "CLI" %}}

Para eliminar el complemento, ejecute:
  ```bash
  aws eks delete-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

{{% /tab %}}
{{< /tabs >}}

 **Nota:** Si desinstala el complemento del Datadog Operator antes de eliminar el recurso personalizado `DatadogAgent`, los Agents seguirán ejecutándose en el clúster. La eliminación del espacio de nombres falla ya que el `DatadogAgent` no puede ser finalizado sin un Datadog Operator en ejecución. Consulte este [problema][9] de Github para obtener una solución alternativa.


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[2]: /es/getting_started/containers/datadog_operator
[3]: https://github.com/DataDog/helm-charts/blob/operator-eks-addon/charts/operator-eks-addon/aws_mp_configuration.schema.json
[4]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/es/infrastructure/containers/orchestrator_explorer/?tab=datadogoperator
[8]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[9]: https://github.com/DataDog/datadog-operator/issues/654
[10]: /es/integrations/eks_fargate/#setup