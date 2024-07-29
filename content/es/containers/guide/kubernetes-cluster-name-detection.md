---
aliases:
- /es/agent/faq/kubernetes-cluster-name-detection
- /es/agent/guide/kubernetes-cluster-name-detection
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

En el caso del Agent v6.11 o posterior, el Datadog Agent puede detectar automáticamente el nombre de los clústeres de Kubernetes en Google Kubernetes Engine (GKE), Azure Kubernetes Service (AKS) y Amazon Elastic Kubernetes Service (EKS). Si se detecta, el nombre del clúster se añade como sufijo en el nombre del nodo a todos los datos recopilados. Esto facilita la identificación de nodos en clústeres de Kubernetes. 

En GKE y AKS, el nombre del clúster se recupera de la API del proveedor de la nube. 

En Amazon EKS, el nombre del clúster se recupera de las etiquetas (tags) de la instancia EC2. Para que el Datadog Agent consulte las etiquetas de la instancia EC2 , debes añadir el [permiso][1] `ec2:DescribeInstances`  a tu política IAM de Datadog.

**Nota**: Puedes establecer manualmente este valor de nombre clúster con el Agent v6.5 o posterior utilizando el parámetro [`clusterName`][2] o la variable de entorno `DD_CLUSTER_NAME`.

[1]: /es/integrations/amazon_ec2/#configuration
[2]: https://github.com/DataDog/helm-charts/blob/896a355268ff6b3cfd33f945ae373912caa8b6e4/charts/datadog/values.yaml#L96