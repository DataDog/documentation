---
aliases:
- /es/agent/kubernetes/operator_configuration
- /es/containers/kubernetes/operator_configuration
further_reading:
- link: /getting_started/containers/datadog_operator
  tag: guía
  text: Empezando con el Datadog Operator
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: Código fuente
  text: 'Datadog Operator: instalación avanzada'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: Código fuente
  text: 'Datadog Operator: configuración'
title: Datadog Operator
---

El [Operator de Datadog][1] es un [operador de Kubernetes][2] de código abierto que te permite implementar y configurar el Datadog Agent en un entorno de Kubernetes. 

Si utilizas el Operator, bastará con que uses una sola definición de recursos personalizados (CRD) para implementar el Agent del nodo, el [Cluster Agent][3] y el [ejecutor de checks del clúster][4]. El Operator ofrece información sobre la salud y los errores de la implementación a través del estado de su CRD. Como el Operator utiliza opciones de configuración de alto nivel, se limita el riesgo de que se produzcan errores de configuración.

Una vez que hayas implementado el Agent, el Operator de Datadog proporciona lo siguiente:

- Validación de las configuraciones del Agent
- Actualización constante de todos los Agents con tu configuración
- Orquestación para crear y actualizar los recursos del Agent
- Información sobre el estado de configuración de Agent a través del estado de la CRD del Operator
- Opcionalmente, uso de una implementación avanzada de un DaemonSet utilizando el [ExtendedDaemonSet][5] de Datadog

### ¿Por qué debería usar el Datadog Operator en vez de un Helm chart o un DaemonSet?

Si quieres, también puedes usar un Helm chart o un DaemonSet para instalar el Datadog Agent en Kubernetes. Sin embargo, el Datadog Operator te ofrece estas ventajas:

- Los valores predeterminados del Operator parten de las prácticas recomendadas de Datadog.
- La configuración del Operator presenta una mayor flexibilidad de cara a futuras mejoras.
- Debido a que el Operator de Datadog es un [operador de Kubernetes][2], la API de Kubernetes lo trata como un recurso de primera clase.
- Al contrario de lo que ocurre con los Helm charts, el Operator forma parte del bucle de conciliación de Kubernetes.

Datadog admite sin problemas el uso de un DaemonSet para desplegar el Agent. Sin embargo, no es una opción muy recomendada, dado que la configuración manual de un DaemonSet conlleva un significante margen de error

## Uso

Consulta la guía [Empezando con el Operator de Datadog][6] para obtener información sobre cómo utilizar el Operator para implementar el Datadog Agent. 

Para conocer todas las opciones de configuración, consulta las páginas detalladas de [instalación][7] y [configuración][8] del repositorio [`datadog-operator`][1]. 

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://github.com/DataDog/datadog-operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: /es/containers/cluster_agent
[4]: /es/containers/cluster_agent/clusterchecks
[5]: https://github.com/DataDog/extendeddaemonset
[6]: /es/getting_started/containers/datadog_operator
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md