---
aliases:
- /es/agent/kubernetes/operator_configuration
- /es/containers/kubernetes/operator_configuration
description: Implemente y administre el Datadog Agent en Kubernetes mediante el Datadog
  Operator
further_reading:
- link: /getting_started/containers/datadog_operator
  tag: guía
  text: Primeros pasos con el Datadog Operator
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: Código fuente
  text: 'Datadog Operator: Instalación avanzada'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: Código fuente
  text: 'Datadog Operator: Configuración'
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Centro de arquitectura
  text: Instrumente su aplicación utilizando el Datadog Operator y el Admission Controller
title: Datadog Operator
---
[Datadog Operator][1] es un [Kubernetes Operator][2] de código abierto que le permite implementar y configurar el Datadog Agent en un entorno de Kubernetes.

Al usar el Operator, puede utilizar una única Definición de Recursos Personalizados (CRD) para implementar el Agent basado en nodos, el [Cluster Agent][3] y el [ejecutor de comprobaciones de clúster][4]. El Operator informa el estado de la implementación, el estado de salud y los errores en el estado del CRD del Operator. Debido a que el Operator utiliza opciones de configuración de nivel superior, limita el riesgo de una configuración incorrecta.

Una vez que haya implementado el Agent, el Datadog Operator proporciona lo siguiente:

- Validación para sus configuraciones del Agent
- Mantenimiento de todos los Agents actualizados con su configuración
- Orquestación para crear y actualizar recursos del Agent
- Informes del estado de configuración del Agent en el estado del CRD del Operator
- Configuración del Agent por grupo de nodos desde un único recurso con [DatadogAgentProfiles][10]
- Detección automática del [proveedor][11] del clúster, que aplica la configuración correspondiente, como el monitoreo del plano de control en Amazon EKS y Red Hat OpenShift
- Administración remota con Fleet Automation (vista previa privada)

### ¿Por qué usar el Datadog Operator en lugar de un Helm chart o un DaemonSet? {#why-use-the-datadog-operator-instead-of-a-helm-chart-or-daemonset}

También puede instalar el Datadog Agent con el [`datadog` Helm chart][9] o un DaemonSet. Datadog recomienda el Operator para nuevas implementaciones.

Helm y el Operator difieren en la forma en que administran el Agent. Helm renderiza los objetos de Kubernetes del Agent a partir de un archivo `values.yaml` al momento de la instalación y actualización. El Operator ejecuta un controlador que reconcilia un único recurso personalizado `DatadogAgent` hacia su estado deseado de forma continua, no solo al momento de la instalación.

El Datadog Operator también ofrece capacidades que el Helm chart no tiene. Por ejemplo, [DatadogAgentProfiles][10] aplica diferentes configuraciones a diferentes grupos de nodos desde un solo recurso, mientras que Helm requiere una release de Helm chart separada por grupo de nodos con reglas de afinidad escritas manualmente.

En Datadog Operator v1.29.0 y versiones posteriores, el Datadog Operator alcanza la paridad de funciones con el Helm chart en los principales proveedores de nube, por lo que no pierde funcionalidad al elegirlo. También se puede instalar y actualizar a través de catálogos de plataformas nativas en los que el Helm chart no se publica: Red Hat OperatorHub, el Amazon EKS add-on [12] y Google Cloud Marketplace [13].

Utilice el Helm chart `datadog` cuando el Datadog Operator no se ajuste a su entorno: en plataformas que el Datadog Operator aún no admite (como Talos o Flatcar), en GKE en Google Distributed Cloud (GDC), o cuando necesite una función de Helm que el Datadog Operator no expone. Para las plataformas y proveedores que admite el Datadog Operator, consulte la [documentación de proveedores][11].

Datadog admite completamente el uso de un DaemonSet para implementar el Datadog Agent, pero la configuración manual del DaemonSet deja un margen significativo para errores y no se recomienda.

## Uso {#usage}

Consulte la guía [Getting Started with the Datadog Operator][6] para aprender cómo usar el Datadog Operator para implementar el Datadog Agent.

Para todas las opciones de instalación y configuración, consulte las páginas detalladas de [instalación][7] y [configuración][8] en el repositorio [`datadog-operator`][1].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://github.com/DataDog/datadog-operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: /es/containers/cluster_agent
[4]: /es/containers/cluster_agent/clusterchecks
[5]: https://github.com/DataDog/extendeddaemonset
[6]: /es/getting_started/containers/datadog_operator
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[9]: /es/containers/kubernetes/installation?tab=helm
[10]: /es/containers/datadog_operator/datadog_agent_profiles
[11]: /es/containers/datadog_operator/providers
[12]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[13]: https://console.cloud.google.com/marketplace/product/datadog-saas/datadog