---
aliases:
- /es/agent/faq/how-can-i-change-the-hostname/
comments: <!–– El diagrama de flujo original se encuentra en Lucidchart. Busca el
  enlace en Trello o pregunta a Grant. ––>

title: ¿Cómo determina Datadog el nombre de host del Agent?
---

## Posibles nombres de host

El Datadog Agent recopila posibles nombres de host de muchas fuentes diferentes. Ejecuta el [subcomando de estado][1] del Agent para consultar todos los nombres que ha detectado.
```text
...
Hostnames
=========

  hostname: my.special.hostname
  agent-hostname: my.special.hostname
  ec2-hostname: ip-192-0-0-1.internal
  instance-id: i-deadbeef
  socket-hostname: myhost
  socket-fqdn: myhost.mydomain
...
```

De entre todos ellos, se elige un nombre canónico para el host con el que el Agent se identifica ante Datadog. Los otros nombres también se envían, pero solo se proponen como candidatos para designar un alias.

El nombre de host canónico se elige de acuerdo con las siguientes reglas. Se selecciona el primer resultado.

1. **agent-hostname** (nombre de host del Agent): Nombre de host que se establece explícitamente en el [archivo de configuración del Agent][2], siempre que no empiece por ip- o domu.
2. **hostname** o `hostname -f` en Linux (nombre de host): Si el nombre de host DNS no es un valor predeterminado de EC2. Ejemplo: `ip-192-0-0-1`.
3. **instance-id** (identificador de instancia): Si el Agent puede alcanzar el endpoint de metadatos de EC2 desde el host.
4. **hostname** (nombre de host): Usa el nombre de host DNS incluso si es un valor predeterminado de EC2.

En caso de que el nombre sea reconocido como nombre común no único (por ejemplo, `localhost.localdomain`), la regla que se está aplicando fallará y se pasará a la siguiente.

### Hosts de AWS

Al obtener información sobre tus hosts de AWS de la [API de Datadog][3], se muestran los siguientes atributos según la disponibilidad:

| Atributo      | Descripción                                         |
|----------------|-----------------------------------------------------|
| `aws_id`       | El identificador de instancia. Si no hay identificador de instancia, se utiliza el host |
| `aws_name`     | La etiqueta `providername` de nube                        |
| `display_name` | El nombre de host canónico (valor del identificador de host)   |

### Alias de host

Un único host que se ejecuta en EC2 puede tener un identificador de instancia (i-abcd1234), un nombre de host genérico proporcionado por EC2 basado en la dirección IP del host (ip-192-0-0-1) y un nombre de host importante que proporciona un servidor DNS interno o un archivo de hosts gestionado por configuración (myhost.mydomain). Datadog crea alias para los nombres de host cuando para un mismo host existen varios nombres identificables únicos.

Los nombres recopilados por el Agent (tal como se detalla con anterioridad) se añaden para determinar un alias del nombre canónico seleccionado.

Consulta la lista de todos los hosts de tu cuenta en [Infrastructure List][4] (Lista de infraestructuras). Encontrarás los alias asociados a cada host en el panel de inspección, al que se accede haciendo clic en el botón **Inspect** (Inspeccionar) al pasar el cursor por encima de la fila de un host:

{{< img src="agent/faq/host_aliases.png" alt="Alias de host"  >}}

**Nota**: Estos alias no se pueden buscar ni filtrar. Solo se puede acceder a ellos a través del panel de inspección anteriormente mencionado.

## Versiones del Agent

Entre el Agent v5 y el Agent v6, existen diferencias a la hora de determinar la resolución de los nombres de host.

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

### Linux y macOS

Cuando se pasa del Agent v5 al v6, es posible que se produzca una diferencia en el nombre de host enviado por tu Agent. Para determinar el nombre de host del sistema, el Agent v5 utiliza el comando `hostname -f`, mientras que el Agent v6 utiliza el `os.Hostname()` de API en Golang. Al actualizar la versión, el nombre de host del Agent puede cambiar de un nombre de dominio completo (FQDN) a un nombre de host corto. Ejemplo:

`sub.domain.tld` --> `sub`

**Nota**: En el Agent v6.3 y versiones posteriores, se introdujo la opción de configuración `hostname_fqdn` que permite al Agent v6 tener el mismo comportamiento que el Agent v5. Sin embargo, esta opción está desactivada de forma predeterminada. Consulta el [ejemplo datadog.yaml][1] para activarla.

#### Comprueba si este cambio te afecta

Desde la versión v6.3.0, el Agent loguea la siguiente advertencia cuando te afecta este cambio:
```text
AVISO DE OBSOLESCENCIA: El Agent determinó que tu nombre de host es <HOSTNAME>. Sin embargo, en una próxima versión, el nombre que determinará será <FQDN> por defecto. Para adoptar este comportamiento en el futuro, activa la opción `hostname_fqdn` en la configuración.
```

Este cambio no te afectará si se cumple alguna de las siguientes condiciones:

* El Agent se ejecuta en GCE.
* El nombre de host se configura en el archivo de [configuración principal del Agent][2] o a través de la variable de entorno `DD_HOSTNAME`.
* El Agent se ejecuta en un contenedor con acceso a la API de Docker o Kubernetes.
* Las salidas del nombre de host de `cat /proc/sys/kernel/hostname` y `hostname -f` son iguales.

#### Acción recomendada

Si este cambio te afecta, Datadog recomienda que hagas lo siguiente cuando actualices tu Agent:

* **Si vas a actualizar el Agent v5 a una versión anterior a la 6.3**: introduce tu nombre de host en el archivo de [configuración principal del Agent][2].
* **Si vas a actualizar el Agent v5 a la versión 6.3 o posterior**: activa la opción `hostname_fqdn` en el archivo de [configuración principal del Agent][2]. De este modo, tendrás la seguridad de que se mantiene el mismo nombre de host.
* **Si vas a actualizar el Agent v5 a la v6 (una versión próxima que utilice el FQDN por defecto): no tienes que hacer nada.
* Si quieres asegurarte de que el actual comportamiento predeterminado del Agent v6 se mantiene cuando actualices el Agent más adelante, define `hostname_fqdn` como `false`. No obstante, Datadog recomienda definir `hostname_fqdn` como `true` siempre que sea posible.

### Windows

En el Agent v5, el Agent de Windows enviaba por defecto el nombre de host incompleto. Para preservar la compatibilidad con versiones anteriores, este comportamiento se ha mantenido en el Agent v6. La nueva opción `hostname_fqdn` permanece desactivada de manera predeterminada en Windows, así como en versiones **v6** posteriores.

El Agent de Windows respeta esta opción de configuración desde la versión v6.5. Si se establece `hostname_fqdn` como "true", el Agent de Windows enviará el nombre de host completo.

#### Acción recomendada

Como medida predeterminada, se recomienda no hacer nada. De esta manera, se mantiene el comportamiento existente, especialmente si se realiza una actualización desde el Agent v5.

Si quieres que los hosts de Windows envíen expresamente los nombres de host completos, añade la opción `hostname_fqdn` configurada como `true` en tu [archivo de configuración principal del Agent][2].

### GCE

_Solo afecta a los Agents que se ejecutan en GCE_

Como medida predeterminada, el Agent v6 utiliza el nombre de host de la instancia proporcionado por GCE. Este comportamiento coincide con el del Agent v5.5.1 y versiones posteriores, siempre que `gce_updated_hostname` esté configurado como "true" en `datadog.conf`.

Si vas a actualizar el Agent v5 con el parámetro `gce_updated_hostname` sin configurar o configurado como "false", y el nombre de host del Agent no está definido en `datadog.conf`/`datadog.yaml`, el nombre de host enviado a Datadog cambiará de la instancia de GCE `name` a la instancia completa de GCE `hostname` (que incluye el identificador de proyecto de GCE).

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/faq/agent_hostname.jpeg" alt="Esquema de nombres de host del Agent"  >}}

{{% /tab %}}
{{< /tabs >}}

[1]: /es/agent/guide/agent-commands/#agent-status-and-information
[2]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /es/api/v1/hosts/
[4]: https://app.datadoghq.com/infrastructure
