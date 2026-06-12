---
algolia:
  tags:
  - Usuario del Windows Agent
  - Usuario de Windows
  - ddagentuser
  - Política de grupo
aliases:
- /es/agent/faq/windows-agent-ddagent-user/
title: Usuario del Datadog Windows Agent
---

Por defecto, el Windows Agent utiliza la cuenta `ddagentuser` creada en el momento de la instalación. La cuenta se asigna a los siguientes grupos durante la instalación:

* Se convierte en miembro del grupo «Performance Monitor Users» (Usuarios del monitor de rendimiento)
  * Necesario para acceder a la información de WMI
  * Necesario para acceder a los datos del contador de rendimiento de Windows
* «Event Log Readers» (Lectores de logs de eventos)

**Nota**: El instalador no añade de forma predeterminada la cuenta que crea a los grupos de `Users`. En ocasiones poco frecuentes, es posible que se produzcan problemas con los permisos. Si es así, añade manualmente el usuario creado al grupo de `Users`.

Además, las siguientes políticas de seguridad se aplican a la cuenta durante la instalación:
* Denegar el acceso a este ordenador desde la red
* Denegar el inicio de sesión local
* Denegar el inicio de sesión a través de los servicios de escritorio remoto
* Iniciar sesión como servicio

El Windows Agent también puede utilizar una cuenta proporcionada por el usuario. No utilices una cuenta de usuario «real». La cuenta de usuario debe dedicarse exclusivamente a ejecutar el Datadog Agent. La cuenta se modifica durante la instalación para restringir sus privilegios, incluidos los de inicio de sesión.

**Nota**: A partir de la versión `7.38.0/6.38.0`, el instalador admite el uso de una **cuenta de servicio administrada de grupo (gMSA)**. Para especificar una cuenta de este tipo, añade **$** al final del nombre de usuario: `<DOMAIN>\<USERNAME>. La cuenta de servicio administrada de grupo debe existir *antes* de la instalación, ya que el instalador no puede crearla.

## Instalación

Si no se especifica una cuenta de usuario en la línea de comandos, el instalador intentará crear una cuenta de usuario local llamada `ddagentuser` con una contraseña generada de forma aleatoria.

Si se especifica una cuenta de usuario en la línea de comandos, pero esta cuenta de usuario no se encuentra en el sistema, el instalador intentará crearla. Si se especificó una contraseña, el instalador utilizará esa contraseña; de lo contrario generará una contraseña aleatoria.

Para especificar el NOMBRE DE USUARIO y la CONTRASEÑA opcionales en la línea de comandos, pasa las siguientes propiedades al comando `msiexec` (Los caracteres `<>` entre paréntesis indican una variable que debe sustituirse):

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<USERNAME> DDAGENTUSER_PASSWORD=<PASSWORD>
```

Requisitos:
* El nombre de usuario debe tener 20 caracteres como máximo para cumplir con el [atributo SAM-Account-Name del Esquema de Active Directory (Esquema de AD)][1] de Microsoft.
* Debido a una restricción del instalador MSI, la propiedad `DDAGENTUSER_PASSWORD` no puede contener el carácter punto y coma `;`.

**Nota**: Si después de haber realizado la instalación tienes algún problema de permisos con los checks `system` y `winproc`, asegúrate de que `ddagentuser` es miembro de los grupos «Usuarios de monitorización del rendimiento» y «Lectores de logs de eventos».

**Nota**: No es posible especificar el usuario en la IU del instalador. Utiliza la línea de comandos para introducir el `DDAGENTUSER_NAME` y otros parámetros. Estos parámetros se tendrán en cuenta incluso para instalar IU.

### Instalación con política de grupo

El instalador cambia la política de grupo local para permitir que la cuenta de usuario recién creada **se ejecute como servicio**.
Si la política de grupo del dominio no lo permite, la configuración de la instalación se anulará y deberás actualizar esta política de grupo para permitir que la cuenta de usuario se ejecute como servicio.

### Instalación en un entorno de dominio

#### Equipos unidos a un dominio

En los equipos unidos a un dominio, el instalador del Agent puede utilizar una cuenta proporcionada por el usuario, ya sea de dominio o local, o bien crear una cuenta local.

Si se especifica una cuenta de dominio en la línea de comandos, esta debe existir antes de la instalación, ya que solo los controladores de dominio pueden crear cuentas de dominio.

Si se especifica una cuenta de usuario en la línea de comandos, pero esta cuenta de usuario no se encuentra en el sistema, el instalador intentará crearla. Si se especificó una contraseña, el instalador utilizará esa contraseña; de lo contrario generará una contraseña aleatoria.

Para definir un nombre de usuario de una cuenta de dominio, utiliza el siguiente formato de propiedad `DDAGENTUSER_NAME`:

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<DOMAIN>\<USERNAME> DDAGENTUSER_PASSWORD=<PASSWORD>
```

El `<DOMAIN>` puede ser un nombre de dominio completamente cualificado (con el formato `mydomain.com`) o el nombre de NETBIOS (el nombre anterior a Windows 2000).
Además, debe separarse del `<USERNAME>` con una barra inversa `\`.

**Nota**: El `<USERNAME>` debe contener 20 caracteres como máximo para cumplir con el [atributo SAM-Account-Name del Esquema de Active Directory (esquema de AD)][1] de Microsoft.

**Nota**: Debido a una restricción del instalador MSI, la propiedad `DDAGENTUSER_PASSWORD` no puede contener el carácter del punto y coma `;`.

#### Controladores de dominio

##### Controladores de dominio principal y secundario

Cuando se instala el Agent en un controlador de dominio, el concepto de cuenta de usuario local no existe. Por lo tanto, si el instalador crea una cuenta de usuario, se tratará de un usuario de dominio en lugar de un usuario local.

Si se especifica una cuenta de usuario en la línea de comandos, pero la cuenta no se encuentra en el sistema, el instalador intentará crearla. Para que la instalación se realice correctamente, debe especificarse una contraseña.

Si la cuenta de usuario especificada es de un dominio de nivel superior, el instalador utilizará esa cuenta de usuario. Asegúrate de que existe una cuenta de usuario en este dominio antes de la instalación, ya que este nunca crea una cuenta de usuario en el dominio de nivel superior.

##### Controladores de dominio de solo lectura

El instalador solo puede utilizar una cuenta de dominio existente cuando se instala en un controlador de dominio de solo lectura.

### Instalación con Chef

Si utilizas Chef y el cookbook oficial de `datadog` para implementar el Agent en los hosts de Windows, **utiliza la versión 2.18.0 o posterior** del cookbook para asegurarte de que los archivos de configuración del Agent disponen de los permisos adecuados.

## Actualizar

En las versiones del Agent anteriores a `7.25.0`, cuando actualices el Datadog Agent en un controlador de dominio o host en que el usuario ha proporcionado un nombre de usuario para el Agent, deberás introducir el `DDAGENTUSER_NAME`, pero no la `DDAGENTUSER_PASSWORD`.

A partir de la versión `7.25.0` del Agent, el instalador conserva el nombre de usuario utilizado para instalar el Agent y lo reutiliza en futuras actualizaciones.
Aun así, es posible anular el valor guardado con `DDAGENTUSER_NAME`.

## Integraciones del Agent

### Permisos generales

Se ha hecho todo lo posible para garantizar que la transición de `LOCAL_SYSTEM` a `ddagentuser` sea fluida. Sin embargo, se han detectado una serie de problemas que requieren que se realice una modificación determinada de la configuración después de instalar el Agent. Estos problemas se producen porque el Windows Agent anteriormente dependía de derechos de administrador que la nueva versión del Agent no posee de forma predeterminada.

Por ejemplo, si el check de directorios está monitorizando un directorio con derechos de acceso específicos, como por ejemplo permitir la lectura solo a miembros del grupo de administradores, el Agent existente puede monitorizar ese directorio adecuadamente, ya que `LOCAL_SYSTEM` cuenta con derechos de administrador. Tras la actualización, el administrador debe añadir `ddagentuser` a la lista de control de acceso de ese directorio para que el check de directorios funcione.

**Nota**: En el caso del sistema operativo Windows Server, la integración de servicios de Windows no puede comprobar el servicio del servidor DHCP debido a la lista de control de acceso especial del servicio `DHCPServer`. En este caso, el check devuelve `UNKNOWN`.

**Nota**: Lo mismo ocurre con los archivos de logs que pueden ser monitorizados por las funciones de recopilación de logs del Agent.

### Integraciones basadas en JMX

El cambio a `ddagentuser` afectará a las integraciones basadas en JMX, si el JMXFetch del Agent está configurado para conectarse a través de la extensión Attach API a las máquinas JVM monitorizadas. Por ejemplo:

1. Si utilizas una integración basada en JMX, como:
   * [ActiveMQ][2]
   * [ActiveMQ_XML][3]
   * [Cassandra][4]
   * [JMX][5]
   * [Presto][6]
   * [Solr][7]
   * [Tomcat][8]
   * [Kafka][9]

2. **Y** si has configurado la integración con el parámetro `process_name_regex`, en lugar de con los parámetros `host` y `port`.

Si utilizas Attach API, el cambio que se produce en el contexto de usuario implica que el JMXFetch del Agent solo podrá conectarse a las máquinas JVM que también se ejecuten en el contexto de usuario `ddagentuser`. En la mayoría de los casos, se recomienda cambiar de JMXFetch a JMX Remote activando JMX Remote en tus máquinas JVM de destino y configurando las integraciones JMX con el `host` y el `port`. Para obtener más información, consulta la [documentación de JMX][5].

### Check del proceso

En la versión 6.11 y posteriores, el Agent se ejecuta como `ddagentuser` en lugar de `Local System`. Por este motivo, no hay acceso a la totalidad de la línea de comandos de los procesos que se ejecutan en otros usuarios, ni al usuario de los procesos de otros usuarios. Esto hace que no funcionen las siguientes opciones de check:

* `exact_match`, cuando se define como `false`
* `user`, que permite seleccionar los procesos que pertenecen a un usuario específico

Para restablecer el comportamiento anterior y ejecutar el Agent como `Local System` (no recomendado), abre una consola de administrador y ejecuta el siguiente comando: `sc.exe config "datadogagent" obj= LocalSystem`. Alternativamente, se puede abrir el administrador de servicios, ir a Datadog Agent > Properties (Propiedades) y definir Log On (Inicio de sesión) como `Local System`.

### Integración de Cassandra Nodetool

Para que la integración de Cassandra Nodetool siga funcionando, aplica los siguientes cambios en tu entorno:

* Permite que el directorio de instalación de Nodetool acceda al `ddagentuser`.
* Configura las variables de entorno del directorio de instalación de Nodetool (`CASSANDRA_HOME` y `DSCINSTALLDIR`) como variables para todo el sistema en lugar de variables solo para el usuario que instala Nodetool.

## Canal de logs de seguridad

Si vas a utilizar la [integración de logs de eventos Win32 de Datadog][10], debes añadir el usuario `ddagentuser` de Datadog al grupo «Event Log Readers» (Lectores de logs de eventos) para recopilar logs del canal de logs de seguridad:

1. Abre la ventana de ejecución utilizando el atajo *Windows+R* y escribe `compmgmt.msc` en el campo de texto.
2. Ve a *System Tools* -> *Local Users and Groups* -> *Groups* (Herramientas del sistema -> Grupos y usuarios locales -> Grupos).
3. Haz clic con el botón derecho del ratón en **Lectores de logs de eventos** y selecciona *Propiedades*.
4. Haz clic en *Add* (Añadir) e introduce `ddagentuser` -> *Check Names* (Nombres de checks).
5. Haz clic en *OK* (Aceptar) y en *Apply* (Aplicar).

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