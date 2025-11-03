---
further_reading:
- link: /dashboards/widgets
  tag: Documentación
  text: Lista de widget de dashboards
title: Enlaces contextuales
---

## Información general

Los dashboards recogen datos de múltiples fuentes y los muestran en forma de visualizaciones. 

Puedes adjuntar dashboards a [notificaciones de monitor][1], utilizarlos como paneles de pantalla para observar indicadores técnicos o empresariales clave, o hacer referencia a ellos en [runbooks][2] para aportar un contexto adicional. Con dashboards, puedes ver snapshots del estado actual de tu plataforma, así como interacciones, de modo que puedes ver preventivamente los problemas y analizarlos en detalle en páginas especializadas.

En el siguiente vídeo, se muestra a un usuario consultando a un dashboard de resumen por una aplicación web. El usuario identifica un pico en una métrica técnica, amplía para obtener detalles y accede al dashboard del host subyacente para buscar posibles causas raíz.

{{< img src="dashboards/guide/context_links/overview.mp4" alt="Flujo de trabajo para solucionar problemas desde un gráfico de métrica de dashboard, mediante enlaces contextuales para encontrar la causa raíz del problema" video="true" style="width:80%;" >}}

En esta guía, se introducen los **enlaces contextuales** en tus dashboards y se aborda lo siguiente:

1. [Cómo funcionan los enlaces contextuales y cómo adaptarlos a tus necesidades concretas](#introduction-to-context-links).
2. [Ejemplos de uso de la configuración de enlaces contextuales](#example-use-cases).

## Introducción a los enlaces contextuales

Los enlaces contextuales conectan widgets de dashboard con otras páginas de Datadog, y con las aplicaciones de terceros que hayas integrado en tus flujos de trabajo.

Los usuarios con [permisos de edición][3] de dashboards pueden configurar a qué enlaces se puede acceder en la lista de enlaces.

### Enlaces contextuales por defecto

 {{< img src="dashboards/guide/context_links/default-links.png" alt="Enlaces contextuales por defecto" style="width:75%;" >}}

Por defecto, el menú de widget muestra enlaces a tu host, [trazas (traces)][4] y [logs][5], junto con enlaces que corresponden a las fuentes de datos del widget. Por ejemplo, el menú muestra un enlace a [**RUM Explorer**][6] si tu widget utiliza [datos RUM][7]. Haz clic en **More Related Data Actions** (Más acciones de datos relacionadas) para ver más enlaces en el menú desplegable. 

El widget contiene enlaces a las siguientes páginas:

| Enlace           | Descripción                                                                           |
|----------------|---------------------------------------------------------------------------------------|
| Hosts          | Enlaces al [Mapa del host][8], si la serie consta de más de un host. Enlaces al [Dashboard del host][9], si la serie consta de un host.|
| Contenedores     | Enlaces a la página de [Live Containers][10].                                                |
| Procesos    | Enlaces a la página de [Live Processes][11].                                                 |
| Trazas de APM     | Abre un panel lateral que muestra trazas subyacente que se vinculan con el [Trace Explorer][12].|
| Eventos RUM     | Enlaces a [RUM Explorer][13].                                                      |
| Perfiles       | Enlaces a la página de APM [Profile Explorer][14].                                              |
| Logs           | Abre un panel lateral que muestra logs subyacentes que se vinculan con el [Log Explorer][15].    |

Cuando proceda, los enlaces contextuales incluyen:

* Un **filtro** que combina el filtro o filtros del widget con las variables de plantilla (si existen) y, para las consultas agrupadas, la serie en la que los usuarios hacen clic. 
* Un **intervalo de tiempo**. Para widgets de series temporales y mapas térmicos, el intervalo de tiempo corresponde al intervalo del punto de datos. Para otros widgets, el intervalo de tiempo es el intervalo completo del widget.


### Personalizar los enlaces contextuales

Para cualquier [widget genérico][16], entra en su modo de edición para acceder a la sección **Context Links** (Enlaces de contexto). Puedes crear tus propios enlaces contextuales, anular los enlaces predeterminados y promocionar u ocultar enlaces.

{{< img src="dashboards/guide/context_links/edit-links.png" alt="Editar enlaces" style="width:75%;" >}}

Para definir enlaces personalizados o anular los enlaces predeterminados, especifica el nombre del enlace en el campo **Label** (Etiqueta) y la ruta del enlace en el campo **URL**. Haz clic en **+ Add URL Parameter** (+ Añadir parámetro URL) para utilizar el auxiliar clave-valor.


#### Variables de enlaces contextuales

{{< img src="dashboards/guide/context_links/custom-link.png" alt="Establecer un par de clave-valor para un parámetro de URL en la URL" style="width:75%;" >}}

Los tipos de variables disponibles para los enlaces contextuales incluyen:

* **Variables de intervalo de tiempo** `{{timestamp_start}}` y `{{timestamp_end}}`. Estas variables corresponden al intervalo de tiempo del widget. 
* **Variables de consulta** (`{{@MerchantTier}}` y `{{@MerchantTier.value}}` en el ejemplo anterior). Estas variables son para widgets con consultas agrupadas, e identifican el grupo específico sobre el que un usuario hace clic.
* **Variables de plantilla del dashboard** (`{{$env}}` y `{{$env.value}}` en el ejemplo anterior). Estas variables identifican el valor actual en uso para la variable de plantilla cuando el usuario hace clic.
* **`{{tags}}`**, la combinación por defecto de todas las variables anteriores.

Cuando tienes que elegir entre `{{something}}` y `{{something.value}}`:

* `{{something}}` devuelve el valor prefijado por su clave. Por ejemplo, `env:prod`.
* `{{something.value}}` devuelve el valor en bruto. Por ejemplo, `prod`.
* Consulta el [ejemplo de uso para configurar múltiples variables](#configure-multiple-variables).


En este ejemplo, al hacer clic en **View in Acme** (Ver en Acme), el enlace te dirige a `https://prod.acme.io/search?what=basic&when=1643021787564`.

{{< img src="dashboards/guide/context_links/view-in-acme.png" alt="Ejemplo de enlace contextual a Acme" style="width:60%;" >}}

El enlace contextual:

* Sustituye `{{env.value}}` por `prod`
* Sustituye `{{@MerchantTier.value}}` por `basic`
* Y sustituye `{{timestamp_end}}` por `1643021787564`.


#### Enlace contextual de arranque con copiar y pegar

{{< img src="dashboards/guide/context_links/override-link.mp4" alt="Enlaces de copiar-pegar a la configuración de arranque" video="true" style="width:75%;" >}}

En un enlace contextual complejo que codifique una amplia variedad de parámetros, puede ser más conveniente copiar y pegar la URL completa en el campo **URL** para arrancar el configuración y reelaborar las variables a partir de ahí.


#### Codificación de URL

{{< img src="dashboards/guide/context_links/url-encoding.png" alt="Captura de pantalla de una URL y parámetros de clave-valor" style="width:75%;" >}}

Datadog gestiona la codificación de URL en los enlaces contextuales.

El ejemplo anterior muestra un enlace con un parámetro de consulta, `status:error source:nginx {{@shopist.webstore.merchant.tier}}`. Aquí, `{{@shopist.webstore.merchant.tier}}` se interpreta como `@shopist.webstore.merchant.tier:basic`. A continuación, el parámetro de consulta completo se traduce como `&query=status%3Aerror%20source%3Anginx%20%40shopist.webstore.merchant.tier%3Abasic`.


## Ejemplos de uso

Esta sección contiene ejemplos que demuestran cómo puedes aprovechar los enlaces contextuales para integrar tus dashboards en tus flujos de trabajo.

### Los dashboards hacen un enlace a una solución de atención al cliente 

El siguiente ejemplo explica cómo crear un enlace desde un usuario en un dashboard a su página de usuario de Zendesk correspondiente.

#### Contexto

Utilizas Datadog para monitorizar tu sitio web comercial. Tu equipo de atención al cliente utiliza un dashboard configurado por tus equipos de [Frontend][17] y [Seguridad][18] para identificar de forma proactiva a los clientes más comprometidos, o a los clientes con una experiencia problemática, y ponerse potencialmente en contacto con ellos.

Para acelerar este flujo de trabajo de solucionar problemas, el equipo de atención al cliente desea tener una conexión directa entre los dashboards y una solución de soporte, por ejemplo: Zendesk.

#### Enfoque

El ID principal que realiza el seguimiento de los usuarios registrados en toda tu plataforma en Datadog es el correo electrónico del usuario, que es una faceta que aparece en algunos widgets de dashboard.

{{< img src="dashboards/guide/context_links/zendesk_query.png" alt="Consulta de Zendesk" style="width:90%;">}}

Un enlace típico de Zendesk para buscar usuarios es `https://acme.zendesk.com/agent/search/1?type=user&q=email%3Ashane%40doe.com`, donde el correo electrónico del usuario es un parámetro de búsqueda.

Añade una variable en la URL, y el enlace predefinido se convierte en `https://acme.zendesk.com/agent/search/1?type=user&q=email:{{@usr.email.value}}`.

{{< img src="dashboards/guide/context_links/zendesk_link.png" alt="Enlace contextual de la página de usuario de Zendesk" style="width:80%;">}}

#### Resultado

El widget de dashboard del equipo de soporte contiene un enlace contextual que te lleva a la plataforma de soporte con el contexto adecuado.

{{< img src="dashboards/guide/context_links/zendesk_interaction.png" alt="Enlace contextual de la página de usuario de Zendesk" style="width:80%;">}}

Al hacer clic en el enlace **Página de usuario de Zendesk** te dirige a la página de este usuario en Zendesk.

{{< img src="dashboards/guide/context_links/zendesk_result.png" alt="Resultado de Zendesk" style="width:80%;">}}

### Enlaces de dashboard a la consola de AWS 

En el siguiente ejemplo, se explica cómo crear un enlace desde un host en un widget de dashboard a su correspondiente página de instancia de Amazon EC2 en la consola de AWS.

#### Contexto

Tu plataforma se aloja en instancias de [Amazon EC2][19], y los procedimientos para aumentar y reducir la escala de tu plataforma son en su mayoría manuales.

Tienes un dashboard en el que has unificado las métricas de estado clave para tu infraestructura en Datadog. 

Para acelerar este flujo de trabajo de operaciones, deseas tener una conexión directa entre este dashboard y tu [Consola de AWS][20]; por ejemplo, para actualizar de `t2.micro` a `t2.large`.

#### Enfoque

Un enlace de resumen de instancia de Amazon EC2 típico es `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94`, donde se incluye:

* `eu-west-3`: la región del centro de datos mostrada como un subdominio y un parámetro de URL.
* `i-04b737b9f8bf94a94`: el ID de host mostrado como un parámetro hash.

Si tu plataforma solo funciona en una región, incorpora el identificador de host en la plantilla del enlace contextual, entonces `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId={{host.value}}`.

Si tus plataformas funcionan en varias regiones, tu widget de configuración depende de lo siguiente:

* Si la región forma parte de la agregación de la consulta (por ejemplo, en la captura de pantalla siguiente), el enlace predefinido es `https://{{region.value}}.console.aws.amazon.com/ec2/v2/home?region={{region.value}}#InstanceDetails:instanceId={{host.value}}`, donde `{{region.value}}` es una variable de **consulta**.

{{< img src="dashboards/guide/context_links/ec2_query.png" alt="Consulta de Amazon EC2" style="width:90%;" >}}

* Si la región forma parte de la agregación de la consulta (por ejemplo, en la captura de pantalla siguiente), el enlace de plantilla es `https://{{$region.value}}.console.aws.amazon.com/ec2/v2/home?region={{$region.value}}#InstanceDetails:instanceId={{host.value}}`, donde `{{region.value}}` es una variable **de plantilla**. 

{{< img src="dashboards/guide/context_links/ec2_query2.png" alt="Contulta de Amazon EC2" style="width:90%;" >}}

#### Resultado

Tu widget de dashboard contiene un enlace que te lleva al host apropiado en la Consola de AWS.

{{< img src="dashboards/guide/context_links/ec2_interaction.png" alt="Enlace contextual de consulta de Amazon EC2" style="width:90%;" >}}

Al hacer clic en el enlace **Amazon EC2 Instance Summary** (Resumen de instancias de Amazon EC2)** se te redirige a la página de instancias de Amazon EC2 en la consola de AWS.

{{< img src="dashboards/guide/context_links/ec2_result.png" alt="Resultado de consulta de Amazon EC2" style="width:70%;" >}}

### Enlaces de dashboard a las vistas guardadas y atributos reasignados en Datadog

En el siguiente ejemplo, se explica cómo crear un enlace desde un evento de RUM en un widget de dashboard a sus logs correspondientes.

#### Contexto

Monitoriza tu sitio web corporativo con Datadog. Puedes utilizar [RUM][17] para comprender a tus usuarios y [Logs][21] para [supervisar tus API Gateways][22] desde una perspectiva más técnica.

Tus ingenieros de frontend suelen utilizar dashboards con información de RUM muy útil. Tu equipo de API Gateways mantiene una [Vista guardada][23] en Log Explorer, que es una perspectiva configurada en la que el equipo de monitorización de frontend se basa en monitores para obtener información relevante para ellos. 

{{< img src="dashboards/guide/context_links/logs-saved-view_result.jpg" alt=" Resultado de vistas guardadas de logs" style="width:90%;" >}}

Para acelerar este flujo de trabajo de solucionar problemas, los equipos de monitorización de frontend desean acceder a la vista guardada con el contexto actual del dashboard.

#### Enfoque de las vistas guardadas

Las [Vistas guardadas][23] definen las opciones predeterminadas de consulta, visualización y configuración en el Log Explorer. Un enlace de vista guardada típico es `https://app.datadoghq.com/logs?saved_view=305130`, que codifica la URL del Log Explorer en segundo plano. 

Puedes añadir el enlace corto de la vista guardada para anular cualquier parámetro en la URL resultante de Log Explorer.

Por ejemplo, `https://app.datadoghq.com/logs?saved_view=305130&query=@source:nginx @network.client.ip:123.123.12.1` te lleva al [Log Explorer][15] como si hubieras abierto primero la vista guardada, pero el filtro de consulta por defecto se sustituye por `@source:nginx @network.client.ip:123.123.12.1`.

#### Enfoque de la reasignación de atributos

Si la navegación en tu sitio web es anónima, puedes utilizar una dirección IP como proxy para identificar a tus usuarios.

Te gustaría identificar el atributo `@session.ip` de tus eventos de RUM con el atributo `@network.client.ip` de tus logs. Los dos atributos tienen nombres diferentes porque generalmente tienen significados diferentes, pero en este contexto de autenticación de logs, puedes identificar ambos.

Para ello, incorpora `@session.ip` en un filtro basado en `@network.client.ip` y crea el filtro apropiado `@network.client.ip:{{@session.ip.value}}`.

{{< img src="dashboards/guide/context_links/logs-saved-view_query.png" alt="Ejemplo de consulta de búsqueda de vistas guardadas" style="width:70%;">}}

Si deseas ver el widget de dashboard de RUM con la información por IP de sesión y por país específico, sigue esta configuración de enlace.

{{< img src="dashboards/guide/context_links/logs-saved-view_link.png" alt="Ejemplo de configuración de URL para las vistas guardadas" style="width:70%;">}}

#### Resultado

A medida que el equipo de API Gateways actualiza la vista guardada para dar cuenta de las últimas actualizaciones en los logs de entrada, el enlace contextual permanece actualizado. 

Al reasignar la dirección IP, se crea un enlace contextual que conecta tus eventos de RUM con los logs correspondientes.

### Configurar múltiples variables

El siguiente ejemplo explica cómo configurar múltiples variables y condiciones en tu consulta de enlace contextual.

#### Contexto

Añade enlaces contextuales para investigar logs o condiciones específicas. 
- Tienes varios valores de etiqueta con el mismo contexto (por ejemplo, `env:production OR env:prod`). 
- Deseas filtrar los logs por múltiples condiciones (por ejemplo, `env:prod AND service:backend`)

#### Enfoque

Después de seleccionar las variables de plantilla que deseas solucionar, la configuración del enlace contextual toma esas variables de plantilla y las inserta en la consulta. **Nota**: La sintaxis y el cierre de los paréntesis influyen en la consulta. 

Por ejemplo, si deseas configurar un enlace contextual con `service:backend` Y (`env:production` O `env:prod`), utiliza la siguiente configuración:

```
service:backend (env:{{$env.value}})
```

#### Resultado

El paréntesis traduce `(env:{{$env.value}})` a `(env:*)`, lo que te permite introducir múltiples variables en tu consulta de enlaces contextuales.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/monitors/notify/
[2]: /es/notebooks/
[3]: /es/dashboards/configure/#permissions
[4]: https://app.datadoghq.com/apm/traces/
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/rum/explorer/
[7]: /es/real_user_monitoring/data_collected/
[8]: /es/infrastructure/hostmap/#overview
[9]: /es/getting_started/dashboards/#explore-out-of-the-box-dashboards
[10]: /es/infrastructure/livecontainers/
[11]: /es/infrastructure/process/?tab=linuxwindows
[12]: /es/tracing/trace_explorer/?tab=listview
[13]: /es/real_user_monitoring/explorer/
[14]: /es/profiler/profile_visualizations/
[15]: /es/logs/explorer/
[16]: /es/dashboards/widgets/
[17]: /es/real_user_monitoring/
[18]: /es/security/cloud_siem/
[19]: /es/integrations/amazon_ec2/
[20]: https://aws.amazon.com/console/
[21]: /es/logs/
[22]: /es/integrations/#cat-log-collection
[23]: /es/logs/explorer/saved_views/