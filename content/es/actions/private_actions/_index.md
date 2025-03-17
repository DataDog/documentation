---
aliases:
- /es/service_management/workflows/private_actions/
- /es/service_management/app_builder/private_actions/
disable_toc: false
further_reading:
- link: service_management/app_builder/connections
  tag: Documentación
  text: Conexiones de App Builder
- link: service_management/workflows/connections
  tag: Documentación
  text: Conexiones de flujos de trabajo
- link: actions/private_actions/use_private_actions
  tag: Documentación
  text: Uso de las acciones privadas
- link: actions/private_actions/private_action_credentials
  tag: Documentación
  text: Gestión de credenciales de acciones privadas
title: Información general de las acciones privadas
---

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header="Únete a la vista previa">}}
Las acciones privadas están en vista previa. Utiliza este formulario para solicitar acceso hoy mismo.
{{< /callout >}}

Las acciones privadas permiten a tus flujos de trabajo y aplicaciones Datadog interactuar con servicios alojados en tu red privada sin exponerlos a la Internet pública. Para utilizar acciones privadas, debes instalar un ejecutor de acciones privadas en un host de tu red utilizando Docker o [Kubernetes][1] y emparejar el ejecutor con una [conexión][2].

Cuando inicias el ejecutor por primera vez, éste genera una clave privada para autenticarse con los servidores de Datadog. Esta clave privada nunca es accesible por Datadog y te garantiza un acceso exclusivo. Datadog utiliza una clave pública derivada de la clave privada como medio para autenticar a determinados ejecutores.

## Modos

Un ejecutor de acciones privadas puede utilizarse con App Builder, Automatización de flujos de trabajo o ambos.

A continuación se presenta un esquema general de las acciones privadas:

{{< img src="service_management/private_action_runner_-_diagram_general.png" alt="Diagrama de información general que muestra cómo las acciones privadas interactúan con Datadog y el navegador del usuario" style="width:90%;" >}}

### Diferencias de modo

La siguiente tabla explica algunas distinciones entre los modos App Builder y Flujos de trabajo, incluidos sus mecanismos de activación y modelos operativos.

| Distinción              | Modo App Builder | Modo Flujos de trabajo |
|--------------------------| -----------------|----------------|
| **Mecanismo<br>activador** | Impulsado por el ser humano: cada acción se inicia mediante la interacción del usuario con una aplicación.      | Puede funcionar automáticamente sin intervención humana directa    |
| **Modelo<br>activador**     | Modelo push: las acciones se activan accediendo directamente a una URL en el ejecutor | Modelo pull: comprueba periódicamente checks las tareas a ejecutar      |
| **Manejo<br>datos**     | Guarda los datos en tu entorno privado y no los envía a Datadog       | Informa del resultado de las ejecuciones de acciones privadas a Datadog |

La diferencia en los modelos puede dar lugar a latencias variables. El modelo push del modo App Builder puede dar lugar a respuestas más inmediatas, mientras que el modelo pull del modo Flujos de trabajo puede introducir retrasos en función de la frecuencia de sondeo.

### Modo App Builder

Cuando tu ejecutor de acciones privadas está en modo App Builder, las consultas que llaman a tus servicios privados se envían directamente desde el navegador del usuario al ejecutor de acciones privadas, que representa las solicitudes a tus servicios. Cuando el ejecutor está en modo App Builder, tus datos nunca ingresan a Datadog, sólo se comunica con Datadog a efectos de inscripción y autenticación.

En el siguiente diagrama, **App Management** se refiere a las acciones backend de App Builder que no están relacionadas con el ejecutor de acciones privadas, como la eliminación de una aplicación.

{{< img src="service_management/private_action_runner_-_diagram_app_builder.png" alt="Diagrama de información general que muestra cómo funcionan las acciones privadas en el modo App Builder, incluida la autenticación" style="width:90%;" >}}

#### Autenticación

Para garantizar una comunicación segura, el frontend Datadog envía un token limitado de un solo uso con cada solicitud, que el ejecutor valida utilizando una clave privada. Este mecanismo garantiza que tus datos permanezcan dentro de tu red y no ingresen a Datadog, al tiempo que mantiene la integridad y seguridad de tus acciones privadas.

#### Nombre de host del ejecutor

En el modo App Builder, el navegador del usuario habla directamente con tu ejecutor de acciones privadas. Como resultado, debes especificar un nombre de dominio personalizado que apunte a tu ejecutor. Para configurar tu dominio, apunta un registro `A` o `CNAME` al ingreso de tu red. Tu ingreso debe ser capaz de terminar solicitudes HTTPS y reenviarlas al contenedor del ejecutor en el puerto 9016. El dominio y el ingreso no necesitan ser accesibles a la Internet pública. El registro `A` o `CNAME` puede apuntar, por ejemplo, a un balanceador de carga que sólo sea accesible a través de la VPN de tu empresa.

### Modo Automatización de flujos de trabajo

Si el ejecutor de acciones privadas se ejecuta en modo de sólo Flujos de trabajo, no es necesario realizar ninguna configuración más allá de la inscripción inicial. El ejecutor de acciones privadas sondea continuamente las tareas de tu cuenta Datadog, las ejecuta interactuando con tu servicio interno e informa del resultado a Datadog.

{{< img src="service_management/private_action_runner_-_diagram_workflow.png" alt="Diagrama de información general que muestra cómo funcionan las acciones privadas en el modo Automatización de flujos de trabajo" style="width:90%;" >}}

### Ambos

Cuando se selecciona la opción de utilizar ambos modos, el ejecutor ajusta dinámicamente el modo que utiliza en función del tipo de solicitud que recibe. Esto garantiza un funcionamiento sin problemas, tanto si el ejecutor gestiona solicitudes de aplicaciones, ejecuciones de Automatización de flujos de trabajo o una combinación de ambos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/private-action-runner
[2]: /es/service_management/workflows/connections/