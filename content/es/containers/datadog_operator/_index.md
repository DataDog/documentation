---
aliases:
- /es/agent/kubernetes/operator_configuration
- /es/containers/kubernetes/operator_configuration
description: Despliega y gestiona el Datadog Agent en Kubernetes utilizando el Datadog
  Operator
further_reading:
- link: /getting_started/containers/datadog_operator
  tag: guía
  text: Introducción al Datadog Operator
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: Código fuente
  text: 'Datadog Operator: Instalación avanzada'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: Código fuente
  text: 'Datadog Operator: Configuración'
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Centro de arquitectura
  text: Instrumente su aplicación utilizando el Datadog Operator y Admission Controller
title: Datadog Operator
---
[Datadog Operator][1] es un [Kubernetes Operator][2] de código abierto que le permite desplegar y configurar el Datadog Agent en un entorno de Kubernetes. 

Al utilizar el Operator, puede usar una única Definición de Recurso Personalizado (CRD) para desplegar el Datadog Agent basado en nodos, el [Cluster Agent][3] y el [cluster checks runner][4]. El Operator informa sobre el estado de despliegue, salud y errores en el estado de la CRD del Operator. Debido a que el Operator utiliza opciones de configuración de nivel superior, limita el riesgo de mala configuración.

Una vez que haya desplegado el Datadog Agent, el Datadog Operator proporciona lo siguiente:

- Validación de sus configuraciones de Datadog Agent
- Mantener todos los Datadog Agent actualizados con su configuración
- Orquestación para crear y actualizar recursos de Datadog Agent
- Informe del estado de configuración de Datadog Agent en el estado de la CRD del Operator
- Opcionalmente, uso de un despliegue avanzado de DaemonSet utilizando el [ExtendedDaemonSet][5] de Datadog

### ¿Por qué usar el Datadog Operator en lugar de un gráfico de Helm o DaemonSet? {#why-use-the-datadog-operator-instead-of-a-helm-chart-or-daemonset}

También puede usar un gráfico de Helm o un DaemonSet para instalar el Datadog Agent en Kubernetes. Sin embargo, el uso del Datadog Operator ofrece las siguientes ventajas:

- El Operator tiene valores predeterminados integrados basados en las mejores prácticas de Datadog.
- La configuración del Operator es más flexible para futuras mejoras.
- Como un [Kubernetes Operator][2], el Datadog Operator es tratado como un recurso de primera clase por la API de Kubernetes.
- A diferencia del gráfico de Helm, el Operator está incluido en el ciclo de reconciliación de Kubernetes.

Datadog admite completamente el uso de un DaemonSet para desplegar el Datadog Agent, pero la configuración manual del DaemonSet deja un margen significativo para errores. Por lo tanto, no se recomienda encarecidamente el uso de un DaemonSet.

## Uso {#usage}

Consulte la guía de [Introducción al Datadog Operator][6] para aprender cómo usar el Operator para desplegar el Datadog Agent. 

Para todas las opciones de instalación y configuración, consulte las páginas detalladas de [instalación][7] y de [configuración][8] en el repositorio [`datadog-operator`][1]. 

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://github.com/DataDog/datadog-operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: /es/containers/cluster_agent
[4]: /es/containers/cluster_agent/clusterchecks
[5]: https://github.com/DataDog/extendeddaemonset
[6]: /es/getting_started/containers/datadog_operator
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md