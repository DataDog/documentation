---
aliases:
- /es/agent/autodiscovery/template_variables
- /es/agent/faq/template_variables
- /es/agent/guide/template_variables
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Crea y carga una plantilla de integración de Autodiscovery
- link: /agent/guide/ad_identifiers/
  tag: Documentación
  text: Usa la plantilla de integración correspondiente a cada contenedor
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Determina qué contenedor debe incluirse en el Autodiscovery del Agent
title: Variables de plantilla de Autodiscovery
---

Utiliza las siguientes variables de plantilla al configurar Autodiscovery para asignar de manera dinámica los valores de tu contenedor:

| Variables de plantilla           | Descripción                                                                                                                                                                                                 |
| --------------------------  | ---                                                                                                                                                                                                         |
| `"%%host%%"`                | Detecta automáticamente la red. En contenedores de una sola red, devuelve la IP correspondiente.                                                                                                                   |
| `"%%host_<NETWORK NAME>%%"` | Especifica el nombre de la red que se utilizará, en caso de que esté asociada a varias redes.                                                                                                                                      |
| `"%%port%%"`                | Utiliza el puerto expuesto más alto **clasificado por orden numérico ascendente**.<br>Por ejemplo, devolvería `8443` si un contenedor expone los puertos `80`, `443` y `8443`.                                    |
| `"%%port_<NUMBER_X>%%"`     | Utiliza el puerto `<NUMBER_X>` **clasificado por orden numérico ascendente**.<br>Por ejemplo, si un contenedor expone los puertos `80`, `443` y `8443`, `"%%port_0%%` se refiere al puerto `80` y `"%%port_1%%"` se refiere al `443`. |
| `"%%port_<NAME>%%"`     | Utiliza el puerto asociado al nombre del puerto `<NAME>`.                                                                                                                                                           |
| `"%%pid%%"`                 | Obtiene el identificador de proceso del contenedor tal y como lo devuelve `docker inspect --format '{{.State.Pid}}' <CONTAINER_NAME>`.                                                                                              |
| `"%%hostname%%"`            | Obtiene el valor `hostname` de la configuración del contenedor. Solo se usa si la variable `"%%host%%"` no puede recuperar una IP fiable (por ejemplo: [modo awsvpc de ECS][1]).                                       |
| `"%%env_<ENV_VAR>%%"`       | Utiliza el contenido de la variable de entorno `$<ENV_VAR>` **tal y como se ve en el proceso del Agent**.                                                                                                                |
| `"%%kube_namespace%%"`      | Detecta automáticamente el espacio de nombres de Kubernetes |
| `"%%kube_pod_name%%"`       | Detecta automáticamente el nombre del pod de Kubernetes  |
| `"%%kube_pod_uid%%"`        | Detecta automáticamente el identificador de usuario del pod de Kubernetes   |

**Recurso alternativo**:

* En el caso de la variable de plantilla `"%%host%%"`: si el Agent no es capaz de encontrarla, esta variable de plantilla recurre a la IP de red `bridge`.
* En el caso de `"%%host_<NETWORK NAME>%%"`: si no se encuentra el `<NETWORK_NAME>` que se ha especificado, esta variable de plantilla actúa como `"%%host%%"`.

Dependiendo de la plataforma que utilices, no todas las variables de plantilla son compatibles:

| Plataforma    | Identificadores de detección automática  | Host | Puerto | Etiqueta (tag) | Pid | Variable de entorno | Nombre de host | Espacio de nombres de Kube | Nombre del pod | UID del pod |
| ----------- | ---                         | ---  | ---  | --- | --- | --- | ---      | ---            | ---      | ---     |
| Docker      | ✅                          | ✅   | ✅   | ✅  | ✅  | ✅  | ✅      | ❌      | ❌      | ❌      |
| ECS con Fargate | ✅                          | ✅   | ❌   | ✅  | ❌  | ✅  | ❌      | ❌      | ❌      | ❌      |
| Kubernetes  | ✅                          | ✅   | ✅   | ✅  | ❌  | ✅  | ❌      | ✅      | ✅      | ✅      |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html