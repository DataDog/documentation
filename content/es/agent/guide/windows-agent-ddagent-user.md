---
aliases:
- /es/agent/faq/windows-agent-ddagent-user/
kind: guía
title: Usuario del Datadog Windows Agent
---

A partir de la versión `6.11.0`, los componentes de base y APM/rastreo del Windows Agent se ejecutan en una cuenta de usuario exclusiva en lugar de la cuenta `LOCAL_SYSTEM`, tal como ocurría en versiones anteriores. Sin embargo, si el componente Live Processes está activado, seguirá ejecutándose en la cuenta `LOCAL_SYSTEM`.

El instalador del Agent crea una nueva cuenta de forma predeterminada (`ddagentuser`), pero también puede utilizar una cuenta que el usuario facilite.
Durante la instalación, la cuenta se asigna a los siguientes grupos:

* “Performance Monitor Users” (Usuarios del monitor de rendimiento)
  * Necesario para acceder a la información de WMI
  * Necesario para acceder a los datos del contador de rendimiento de Windows
* “Event Log Readers” (Lectores de logs de eventos)

**Nota**: El instalador no añade de forma predeterminada la cuenta que crea a los grupos de `Users`. En ocasiones poco frecuentes, es posible que se produzcan problemas con los permisos. Si es así, añade manualmente el usuario creado al grupo de `Users`.

Además, durante la instalación, se aplican las siguientes políticas de seguridad a la cuenta:
* Se deniega el acceso a este ordenador desde la red
* Se deniega el inicio de sesión local
* Se deniega el inicio de sesión a través de servicios de escritorio remoto
* Se inicia sesión como servicio

**Importante**: Dado que la cuenta se modifica durante la instalación para restringir sus privilegios, como pueden ser los de inicio de sesión, verifica que no se trata de una cuenta de usuario “real”, sino de una cuenta destinada exclusivamente a ejecutar el Datadog Agent.

**Nota**: Todos los ejemplos de comandos de esta página utilizan `<>` para indicar las variables que deben sustituirse. Por ejemplo, si la cuenta de usuario es `ddagentuser` y el comando contiene `DDAGENTUSER_NAME=<USERNAME>`, habrá que introducir `DDAGENTUSER_NAME=ddagentuser` en la línea de comandos.

**Nota**: A partir de la versión `7.38.0/6.38.0`, el instalador admite el uso de una **cuenta de servicio administrada de grupo (gMSA)**. Para especificar una cuenta de este tipo, añade **$** al final del nombre de usuario: `<DOMAIN>\<USERNAME>`$. Recuerda que esta cuenta debe existir *antes* de la instalación, ya que el instalador no puede crearla.

## Instalación

Si no se define ninguna cuenta de usuario en la línea de comandos, el instalador intentará crear una cuenta de usuario local llamada `ddagentuser` con una contraseña generada de forma aleatoria.

Si se especifica una cuenta de usuario en la línea de comandos, pero la cuenta no se encuentra en el sistema, el instalador intentará crearla. Si se ha proporcionado una contraseña, el instalador la utilizará; de lo contrario, generará una contraseña aleatoria.

Para definir el nombre de usuario (USERNAME) y la contraseña (PASSWORD) opcionales en la línea de comandos, se han de introducir las siguientes propiedades en el comando `msiexec` (elimina los corchetes `<>` de los parámetros correspondientes):

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<USERNAME> DDAGENTUSER_PASSWORD=<PASSWORD>
```

**Nota**: El `<USERNAME>` debe contener 20 caracteres como máximo para cumplir los requisitos del [atributo del nombre de cuenta SAM del esquema de Active Directory (esquema de AD)][1] de Microsoft.

**Nota**: Debido a una restricción del instalador MSI, la propiedad `DDAGENTUSER_PASSWORD` no puede contener el carácter del punto y coma: `;`.

**Nota**: Si después de haber realizado la instalación tienes algún problema de permisos con los checks `system` y `winproc`, asegúrate de que `ddagentuser` es miembro de los grupos “Performance Monitor Users” y “Event Log Readers”.

**Nota**: No es posible definir el usuario en la IU del instalador. Utiliza la línea de comandos para introducir el `DDAGENTUSER_NAME` y otros parámetros. Estos parámetros se tendrán en cuenta incluso para instalar IU.

### Instalación con política de grupo

El instalador cambia la política de grupo local para permitir que la cuenta de usuario recién creada **se ejecute como servicio**.
Si la política de grupo del dominio no lo permite, la configuración de la instalación se anulará y deberás actualizar esa política para permitir que la cuenta de usuario se ejecute como servicio.

### Instalación en un entorno de dominio

#### Máquinas unidas a un dominio

En las máquinas unidas a un dominio, el instalador del Agent puede utilizar una cuenta proporcionada por el usuario, ya sea de dominio o local, o bien crear una cuenta local.

Si se define una cuenta de dominio en la línea de comandos, esta debe existir antes de la instalación, ya que solo los controladores de dominio pueden crear cuentas de dominio.

Si se especifica una cuenta de usuario en la línea de comandos, pero la cuenta no se encuentra en el sistema, el instalador intentará crearla. Si se ha proporcionado una contraseña, el instalador la utilizará; de lo contrario, generará una contraseña aleatoria.

Para definir un nombre de usuario de una cuenta de dominio, utiliza el siguiente formulario de la propiedad `DDAGENTUSER_NAME`:

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<DOMAIN>\<USERNAME> DDAGENTUSER_PASSWORD=<PASSWORD>
```

El `<DOMAIN>` puede ser un nombre de dominio completo (con el formato `mydomain.com`) o el nombre NETBIOS (el nombre anterior a Windows 2000).
Además, debe separarse del `<USERNAME>` con una barra inversa: `\`.

**Nota**: El `<USERNAME>` debe contener 20 caracteres como máximo para cumplir los requisitos del [atributo del nombre de cuenta SAM del esquema de Active Directory (esquema de AD)][1] de Microsoft.

**Nota**: Debido a una restricción del instalador MSI, la propiedad `DDAGENTUSER_PASSWORD` no puede contener el carácter del punto y coma: `;`.

#### Controladores de dominio

##### Controladores de dominio principal y secundario

Cuando se instala el Agent en un controlador de dominio, el concepto de cuenta de usuario local no existe. Por tanto, si el instalador crea una cuenta de usuario, se tratará de un usuario de dominio en lugar de un usuario local.

Si se especifica una cuenta de usuario en la línea de comandos, pero la cuenta no se encuentra en el sistema, el instalador intentará crearla. Para que la instalación se realice correctamente, debe especificarse una contraseña.

Si la cuenta de usuario indicada es de un dominio superior, el instalador utilizará esa cuenta.
Si la cuenta de usuario no existe, la creará en el dominio secundario (el dominio al que está unido el controlador). El instalador nunca creará una cuenta de usuario en el dominio superior.

##### Controladores de dominio de solo lectura

El instalador solo puede utilizar una cuenta de dominio existente cuando instala en un controlador de dominio de solo lectura.

### Instalación con Chef

Si utilizas Chef y el cookbook oficial de `datadog` para desplegar el Agent en hosts de Windows, **usa la versión 2.18.0 (o una posterior)** del cookbook para asegurarte de que los archivos de configuración del Agent disponen de los permisos adecuados.

## Actualización

En las versiones anteriores al Agent `7.25.0`, cuando se actualice el Datadog Agent en un controlador de dominio o host en los que el usuario haya proporcionado un nombre de usuario para el Agent, habrá que introducir el `DDAGENTUSER_NAME`, pero no la `DDAGENTUSER_PASSWORD`.

A partir de la versión `7.25.0` del Agent, el instalador mantiene el nombre de usuario utilizado para instalar el Agent y lo reutiliza en futuras actualizaciones.
Aun así, es posible anular el valor guardado con `DDAGENTUSER_NAME`.

## Integraciones del Agent

### Permisos generales

Se ha hecho todo lo posible para garantizar que la transición de `LOCAL_SYSTEM` a `ddagentuser` se realice sin problemas. Sin embargo, se ha detectado una clase de problemas por los que, una vez instalado el Agent, es necesario realizar una modificación determinada de la configuración. Estos problemas se producen porque, anteriormente, el Windows Agent estaba sujeto a los derechos del administrador. En cambio, la nueva versión del Agent no necesita estos derechos de forma predeterminada.

Por ejemplo, si el check de directorio está monitorizando un directorio con unos derechos de acceso concretos, como puede ser permitir la lectura solo a los miembros del grupo de administradores, el Agent existente puede monitorizar ese directorio adecuadamente, dado que `LOCAL_SYSTEM` tiene derechos de administrador. Tras la actualización, el administrador deberá añadir `ddagentuser` a la lista de control de acceso de ese directorio para que el check de directorio funcione.

**Nota**: En el caso del sistema operativo Windows Server, la integración de servicios de Windows no puede comprobar el servicio del servidor DHCP debido a la lista de control de acceso especial del servicio `DHCPServer`. En este caso, el check devuelve `UNKNOWN`.

**Nota**: Lo mismo ocurre con los archivos de logs que pueden ser monitorizados por las funciones de recopilación de logs del Agent.

### Integraciones basadas en JMX

Con el cambio a `ddagentuser`, tus integraciones basadas en JMX se verán afectadas si el JMXFetch del Agent está configurado para conectarse a través de la extensión Attach API a las máquinas JVM monitorizadas. Por ejemplo:

1. Si utilizas una integración basada en JMX, como:
   * [ActiveMQ][2]
   * [ActiveMQ_XML][3]
   * [Cassandra][4]
   * [JMX][5]
   * [Presto][6]
   * [Solr][7]
   * [Tomcat][8]
   * [Kafka][9]

2. **Y** si has configurado la integración con el parámetro `process_name_regex` en lugar de con los parámetros `host` y `port`.

Si utilizas Attach API, el cambio que se produce respecto al contexto de usuario implica que el JMXFetch del Agent solo podrá conectarse a las máquinas JVM que también se ejecuten en el contexto de usuario `ddagentuser`. En la mayoría de los casos, se recomienda cambiar a JMXFetch para utilizar JMX Remote activando JMX Remote en las máquinas JVM de destino y configurando las integraciones JMX con `host` y `port`. Para obtener más información, consulta la [documentación acerca de JMX][5].

### Check del proceso

En la versión 6.11 y posteriores, el Agent se ejecuta como `ddagentuser` en lugar de `Local System`. Por este motivo, el Agent no tiene acceso a la línea de comandos completa de los procesos que se ejecutan en otros usuarios ni al usuario de los procesos de otros usuarios. Esto provoca que las siguientes opciones del check no funcionen:

* `exact_match`, cuando se defina como `false`
* `user`, que permite seleccionar los procesos que pertenecen a un usuario concreto

Para restablecer el comportamiento anterior y ejecutar el Agent como `Local System` (no recomendado), abre una consola del administrador y ejecuta el siguiente comando: `sc.exe config "datadogagent" obj= LocalSystem`. Otra posibilidad es abrir el administrador de servicios, ir al Datadog Agent > Properties (Propiedades) y definir “Log On” (Iniciar sesión) como `Local System`.

### Integración de Cassandra Nodetool

Para que la integración de Cassandra Nodetool siga funcionando, aplica los siguientes cambios en tu entorno:

* Permite que el directorio de instalación de Nodetool acceda al `ddagentuser`.
* Configura las variables de entorno del directorio de instalación de Nodetool (`CASSANDRA_HOME` y `DSCINSTALLDIR`) como variables para todo el sistema y no solo para el usuario que realiza la instalación de Nodetool.

## Canal de logs de seguridad

Si vas a utilizar la [integración de Win32 Event Log con Datadog][10], debes añadir el usuario `ddagentuser` de Datadog al grupo “Event Log Readers” para recopilar logs del canal de logs de seguridad:

1. Abre la ventana Ejecutar con el atajo *Windows+R* y escribe `compmgmt.msc` en el campo de texto.
2. Dirígete a *System Tools* (Herramientas del sistema) -> *Local Users and Groups* (Grupos y usuarios locales) -> *Groups* (Grupos).
3. Haz clic con el botón derecho del ratón en **Event Log Readers** y selecciona *Properties* (Propiedades).
4. Haz clic en *Add* (Añadir) e introduce `ddagentuser` -> *Check Names* (Nombres de checks).
5. Haz clic en *OK* (Aceptar) y *Apply* (Aplicar).

[1]: https://docs.microsoft.com/en-us/windows/win32/adschema/a-samaccountname?redirectedfrom=MSDN
[2]: /es/integrations/activemq/
[3]: /es/integrations/activemq/#activemq-xml-integration
[4]: /es/integrations/cassandra/
[5]: /es/integrations/java/
[6]: /es/integrations/presto/
[7]: /es/integrations/solr/
[8]: /es/integrations/tomcat/
[9]: /es/integrations/kafka/
[10]: /es/integrations/win32_event_log/