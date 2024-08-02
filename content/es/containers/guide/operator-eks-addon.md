---
aliases:
- /es/agent/guide/operator-eks-addon
further_reading:
- link: agent/kubernetes/log
  tag: Documentación
  text: Datadog y Kubernetes
title: Instalación de Datadog Agent en Amazon EKS con el complemento Datadog Operator
---

Puedes instalar Datadog Agent en un clúster de Amazon EKS instalando el [Datadog Operator](/containers/datadog_operator)
como un [complemento de Amazon EKS](https://docs.AWS.amazon.com/eks/latest/userguide/eks-add-ons.html) y aplicando el manifiesto `DatadogAgent`.

Los Agents instalados mediante el complemento Operator solo recopilan datos de pods que se ejecutan en instancias de EC2. Para los pods que se ejecutan en AWS Fargate, sigue la [documentación de Amazon EKS en AWS Fargate][10].

En comparación con la instalación normal de [Helm][4], existen ciertas diferencias cuando se instala como complemento:
* Durante la instalación del Operator, las imágenes deben extraerse únicamente del repositorio de EKS. El usuario no puede cambiar esto.
* Los valores de la tabla Helm del Operator que pueden anularse están restringidos a un [archivo de esquema][3].

Estas restricciones son necesarias para que Operator cumpla las políticas de complementos de EKS, para permitir que EKS garantice la seguridad de la instalación y para desactivar funciones que aún no se admiten en el entorno del complemento.

## Requisitos previos

* Suscripción al producto [Datadog Operator][1].
* kubectl instalado
* Si utilizas la interfaz de línea de comandos para configurar el complemento, [AWS CLI](https://aws.amazon.com/cli/)

## Instalar el Operator

{{< tabs >}}
{{% tab "Console" %}}

* Ve al clúster de EKS en la consola de AWS.
* Ve a la pestaña del complemento y selecciona *Get more add-ons* (Obtener más complementos).
* Busca y selecciona *Datadog Operator*. A continuación, sigue las instrucciones para completar la instalación.

{{% /tab %}}
{{% tab "CLI" %}}

Para instalar el complemento Operator, ejecuta:
  ```bash
  aws eks create-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

La instalación del complemento es asíncrona. Para consultar el estado de la instalación, ejecuta:
  ```bash
  aws eks describe-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```
{{% /tab %}}
{{< /tabs >}}

Para comprobar que la instalación se ha realizado correctamente, utiliza la Consola de administración de AWS, `eksctl`, o la AWS CLI para confirmar que se está ejecutando un pod `datadog-operator`.

## Configuración del Agent

Una vez instalado el complemento Operator, puedes proceder a configurar el Datadog Agent.

Sigue las instrucciones para configurar el Datadog Agent utilizando el recurso personalizado `DatadogAgent`.

1. Cambia al espacio de nombres de instalación de Operator, que es `datadog-agent` por defecto.
   ```bash
   kubectl config set-context --current --namespace=datadog-agent
   ```
2. Crea un secreto Kubernetes con tus [claves API de Datadog y claves de aplicación][5]:
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   Reemplaza `<DATADOG_API_KEY>` y `<DATADOG_APP_KEY>` por tus [claves API de Datadog y claves de aplicación][5].


3. Crea un archivo `datadog-agent.yaml` con las especificaciones de configuración del despliegue de `DatadogAgent`. El Datadog Operator utiliza la configuración predeterminada de imagen de Agent y Cluster Agent, y las extrae de un registro público.

   Si deseas extraer imágenes de un registro de EKS privado, puedes añadir `global.registry`. La siguiente configuración habilita métricas, logs y APM:
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       # Required in case the Agent cannot resolve the cluster name through IMDS. See the note below.
       clusterName: <CLUSTER_NAME>
       registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com/datadog
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
   Esta configuración de instancia del Agent extrae la imagen del Datadog Agent de un repositorio de ECR alojado en AWS Marketplace, que también contiene la imagen para el complemento Datadog Operator Amazon EKS. Si necesitas alternativas, edita la entrada 'global.registry' en el manifiesto anterior.

   Para conocer todas las opciones de configuración, consulta la [especificación de configuración del Operator][6].

   **Nota:** Si el acceso a IMDS v1 está bloqueado en el nodo, Agent no puede resolver el nombre del clúster, y ciertas características (por ejemplo, [Orchestrator Explorer][6]) no funcionan. Por ello, Datadog recomienda añadir `spec.global.ClusterName` en el manifiesto `DatadogAgent`. Consulta este [comentario][8] sobre cómo configurar el Agent para solicitar metadatos con IMDS v2.

4. Despliega el Datadog Agent:
   ```bash
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```


## Desinstalar el Operator

Si deseas desinstalar Agent y Operator, elimina primero el recurso personalizado `DatadogAgent`:

  ```bash
  kubectl delete datadogagents.datadoghq.com datadog
  ```

Confirma que se han eliminado todos los recursos del Agent y procede con la desinstalación del complemento:

{{< tabs >}}
{{% tab "Console" %}}

* Ve al clúster de EKS en la consola de AWS.
* Ve a la pestaña del complemento y selecciona el complemento *Datadog Operator*.
* Haz clic en **Delete** (Eliminar) y confirma cuando se te solicite.

{{% /tab %}}
{{% tab "CLI" %}}

Para eliminar el complemento, ejecuta:
  ```bash
  aws eks delete-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

{{% /tab %}}
{{< /tabs >}}

 **Nota:** Si desinstalas el complemento Operator antes de eliminar el recurso personalizado `DatadogAgent`, los Agents se seguirán ejecutando en el clúster. La eliminación del espacio de nombres falla, ya que `DatadogAgent` no puede finalizarse sin un Operator en ejecución. Consulta esta [incidencia][9] de Github para encontrar una solución.


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[2]: /es/getting_started/containers/datadog_operator
[3]: https://github.com/DataDog/helm-charts/blob/operator-eks-addon/charts/operator-eks-addon/aws_mp_configuration.schema.json
[4]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/es/infrastructure/containers/orchestrator_explorer/?tab=datadogoperator
[8]: https://github.com/DataDog/datadog-agent/blob/4896a45f586f74de1da2e985f98988f0181afc36/pkg/config/config_template.yaml#L407-L416
[9]: https://github.com/DataDog/datadog-operator/issues/654
[10]: /es/integrations/eks_fargate/#setup