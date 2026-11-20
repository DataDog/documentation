---
aliases:
- /es/agent/faq/kubernetes-cluster-name-detection
- /es/agent/guide/kubernetes-cluster-name-detection
description: Detección automática del nombre del clúster en los clústeres de Kubernetes
  en GKE, AKS y EKS para mejorar la identificación de los nodos.
further_reading:
- link: /agent/autodiscovery/
  tag: documentation
  text: Autodiscovery del Docker Agent
- link: /agent/kubernetes/host_setup/
  tag: documentation
  text: Configuración del host de Kubernetes
- link: /agent/kubernetes/integrations/
  tag: documentation
  text: Integraciones personalizadas
title: Detección automática de nombres de clústeres de Kubernetes
---

Para el Agent v6.11+, el Datadog Agent puede detectar automáticamente el nombre del clúster de Kubernetes en Google Kubernetes Engine (GKE), Azure Kubernetes Service (AKS) y Amazon Elastic Kubernetes Service (EKS). El nombre del clúster también puede proporcionarse directamente o descubrirse a partir de las etiquetas de los nodos de Kubernetes. Si se detecta, el nombre del clúster se añade como sufijo al nombre del nodo en todos los datos recopilados. Esto facilita la identificación de los nodos en los clústeres de Kubernetes.

<div class="alert alert-info">
Este nombre del clúster debe ser un nombre único y respetar las siguientes restricciones:
<ul>
  <li/>Solo debe contener letras minúsculas, números y guiones
  <li/>Debe empezar con una letra
  <li/>Debe terminar con número o una letra
  <li/>Debe tener 80 caracteres o menos
</ul>
</div>

## Configuración

Puedes proporcionar directamente un nombre del clúster en la configuración de Datadog. Cuando se proporciona, esto tiene prioridad sobre todas las demás opciones.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En Datadog Operator, configura el valor en `global.clusterName`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
```
{{% /tab %}}
{{% tab "Helm" %}}

En tu gráfico de Helm, configura el valor en `datadog.clusterName`.

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
```

{{% /tab %}}
{{< /tabs >}}


## Proveedores de la nube
Si no se proporciona un nombre del clúster en la configuración, el Agent y el Agent del clúster se ponen en contacto con los servicios de metadatos del proveedor de la nube para recuperarlo.

### GKE
En GKE, el nombre del clúster se recupera del [servidor de metadatos de la máquina virtual][1]. El Agent realiza una solicitud para obtener los atributos de la instancia y utiliza el valor devuelto si es correcto.

Puedes test esta solicitud utilizando `kubectl exec` en el pod del Agent y ejecutando una solicitud `curl` como.

```shell
curl -v "http://169.254.169.254/computeMetadata/v1/instance/attributes/cluster-name" -H "Metadata-Flavor: Google"
```

Una solicitud correcta devuelve una respuesta 200 y el nombre del clúster de Kubernetes tal y como se ve en la consola de GKE. La activación de determinadas funciones de GKE, como Workload Identity, puede restringir este acceso.

### AKS
En AKS, el nombre del clúster se recupera del [Azure Instance Metadata Service][2]. El Agent solicita el nombre del grupo de recursos de la máquina virtual y, a continuación, analiza este valor para determinar el nombre del clúster de Kubernetes.

Puedes test esta solicitud utilizando `kubectl exec` en el pod del Agent y ejecutando una solicitud `curl` como.

```shell
curl -v "http://169.254.169.254/metadata/instance/compute/resourceGroupName?api-version=2017-08-01&format=text" -H "Metadata: true"
```
Una solicitud correcta devuelve una respuesta 200 y el nombre del grupo de recursos de AKS que debe analizarse. Por ejemplo, el Agent analiza `example-cluster-name` a partir del `MC_MyResourceGroup_example-cluster-name_eastus` devuelto.

### EKS
En EKS, el Agent recupera el nombre del clúster obteniendo las tags (etiquetas) de la instancia EC2 e identificando la tag (etiqueta) `kubernetes.io/cluster/<CLUSTER_NAME>: owned` rellenada previamente para determinar el nombre del clúster.

En forma predeterminada, el Agent utiliza el [Instance Metadata Service (IMDS)][3] para obtener la identidad de la instancia, utilizada por el kit de desarrollo de software (SDK) del Agent y de AWS para describir las tags (etiquetas) de la instancia. En Agent `7.64.0` y superiores, se utiliza IMDSv2 en forma predeterminada para obtener esta identidad. Esto requiere que la instancia EC2 y su rol IAM tengan el permiso `ec2:DescribeTags`. El Agent no admite la [identidad del pod de EKS][4] para los permisos IAM.

Como alternativa, el Agent puede obtener las tags (etiquetas) EC2 directamente de IMDS si se proporciona la siguiente variable de entorno.
```yaml
- name: DD_COLLECT_EC2_TAGS_USE_IMDS
  value: "true"
```
*Sin embargo*, IMDS no concede acceso a las tags (etiquetas) EC2 en forma predeterminada. Debes [activar el acceso a las tags (etiquetas)][5] y establecer su límite de saltos en 2 (o superior).

## Etiquetas del nodo

El último método de detección utiliza las etiquetas de los nodos Kubernetes. El Agent inspecciona su nodo actual de Kubernetes y busca las siguientes etiquetas:

- `alpha.eksctl.io/cluster-name`
- `kubernetes.azure.com/cluster`
- `ad.datadoghq.com/cluster-name`

Se pueden añadir etiquetas adicionales con la variable de entorno:

```yaml
- name: DD_KUBERNETES_NODE_LABEL_AS_CLUSTER_NAME
  value: "<NODE_LABEL_KEY>"
```

Si se encuentra la etiqueta del nodo, el valor se utiliza como nombre del clúster.

[1]: https://cloud.google.com/compute/docs/metadata/querying-metadata
[2]: https://learn.microsoft.com/en-us/azure/virtual-machines/instance-metadata-service?tabs=linux
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html
[4]: https://docs.aws.amazon.com/eks/latest/userguide/pod-id-how-it-works.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/work-with-tags-in-IMDS.html#allow-access-to-tags-in-IMDS