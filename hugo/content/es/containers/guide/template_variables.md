---
aliases:
- /es/agent/autodiscovery/template_variables
- /es/agent/faq/template_variables
- /es/agent/guide/template_variables
description: Guía de referencia para las variables de plantilla disponibles en la
  configuración de la integración de Autodiscovery para entornos de contenedores dinámicos
further_reading:
- link: /contenedores/Kubernetes/integraciones/
  tag: Documentación
  text: Configurar integraciones con Autodiscovery en Kubernetes
- link: /contenedores/Docker/integraciones/
  tag: Documentación
  text: Configurar integraciones con Autodiscovery en Docker
- link: /agent/guide/ad_identifiers/
  tag: Documentación
  text: Usa la plantilla de integración correspondiente a cada contenedor
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Determina qué contenedor debe incluirse en el Autodiscovery del Agent
title: Variables de plantilla de Autodiscovery
---

[Autodiscovery][1] permite establecer configuraciones estáticas para recursos dinámicos como los contenedores.

Puedes utilizar la siguiente dirección variables de plantilla para asignar dinámicamente los valores de tu contenedor:

| Variables de plantilla | Descripción |
| --------------------------  | ---    |
| `"%%host%%"`                | La IP de red del contenedor. |
| `"%%host_<NETWORK NAME>%%"` | Cuando el contenedor está conectado a varias redes, devuelve el nombre de la red que se debe utilizar. |
| `"%%port%%"`                | El puerto expuesto más alto **ordenado numéricamente y en orden ascendente**.<br>Por ejemplo, devuelve `8443` para un contenedor que expone los puertos `80`, `443` y `8443`. |
| `"%%port_<NUMBER_X>%%"`     | El puerto `<NUMBER_X>` **ordenado numéricamente y en orden ascendente**.<br>Por ejemplo, si un contenedor expone los puertos `80`, `443` y `8443`, `"%%port_0%%` se refiere al puerto `80` y `"%%port_1%%"` se refiere a `443`. |
| `"%%port_<NAME>%%"`     | El puerto asociado al nombre del puerto `<NAME>`. |
| `"%%pid%%"`                 | El ID de proceso del contenedor devuelto por `docker inspect --format '{{.State.Pid}}' <CONTAINER_NAME>`. |
| `"%%hostname%%"`            | El valor `hostname` de la configuración del contenedor. Utiliza esta variable sólo si la variable `"%%host%%"` no puede obtener una IP fiable (por ejemplo, en [modo awsvpc ECS][2]).                                       |
| `"%%env_<ENV_VAR>%%"`       | El contenido de la variable de entorno `$<ENV_VAR>` **visto por el proceso del Agent**.  |
| `"%%kube_namespace%%"`      | El espacio de nombres Kubernetes. |
| `"%%kube_pod_name%%"`       | El nombre del pod Kubernetes.  |
| `"%%kube_pod_uid%%"`        | El UID del pod Kubernetes.   |

**Recurso alternativo**:

* Para la variable de plantilla `"%%host%%"`: en caso de que el Agent no pueda encontrar la IP, esta variable de plantilla regresa a la IP de red `bridge`.
* Para el `"%%host_<NETWORK NAME>%%"`: si no se encuentra el `<NETWORK_NAME>` especificado, esta variable de plantilla se comporta como `"%%host%%"`.

Dependiendo de la plataforma que utilices, no todas las variables de plantilla son compatibles:

| Plataforma    | Identificadores de detección automática  | Host | Puerto | Etiqueta (tag) | Pid | Entorno | Nombre de host | Espacio de nombres de Kube | Nombre del pod | UID del pod |
| ----------- | ---                         | ---  | ---  | --- | --- | --- | ---      | ---            | ---      | ---     |
| Docker      | ✅                          | ✅   | ✅   | ✅  | ✅  | ✅  | ✅      | ❌      | ❌      | ❌      |
| ECS Fargate | ✅                          | ✅   | ❌   | ✅  | ❌  | ✅  | ❌      | ❌      | ❌      | ❌      |
| Kubernetes  | ✅                          | ✅   | ✅   | ✅  | ❌  | ✅  | ❌      | ✅      | ✅      | ✅      |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/containers/autodiscovery
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html