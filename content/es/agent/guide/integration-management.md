---
algolia:
  tags:
  - Gestión de integraciones
title: Gestión de integraciones
---

## Información general

El Agent viene con una serie de integraciones oficiales de Datadog para que los usuarios puedan monitorizar sus aplicaciones de forma rápida. Estas integraciones están disponibles como paquetes individuales de Python y pueden actualizarse por separado.

**Nota**: Las integraciones Community, Partner y Marketplace no se conservan cuando se actualiza Agent. Estas integraciones deben volver a instalarse al actualizar la versión del Agent.

Para el Agent 6.8 o versiones posteriores, el comando `datadog-agent integration` permite a los usuarios gestionar las integraciones oficiales de Datadog que están disponibles para el Agent. Incluye los siguientes subcomandos:

 * [instalar](#install)
 * [eliminar](#remove)
 * [mostrar](#show)
 * [inmovilizar](#freeze)

Imprime el uso y la documentación de estos comandos con `datadog-agent integration --help`.
Para Linux, ejecuta el comando como usuario `dd-agent`. En el caso de Windows, ejecuta el comando como `administrator`.

## Comandos de integraciones

### Flujo de trabajo

1. Comprueba la versión de la integración instalada en tu Agent con el comando `show`.
2. Revisa el log de cambios de la integración específica en el repositorio [integrations-core][1] para identificar la versión que quieres.
3. Instala la integración con el comando `install`.
4. Reinicia tu Agent.

**Nota**: Si usas una herramienta de gestión de configuraciones, te recomendamos anclar la integración a la versión deseada. Cuando tengas todo a punto para actualizar el Agent, retira el anclaje. Actualizar el Agent sin desanclar la integración puede causar que la herramienta de gestión de configuraciones falle si la versión de la integración no es compatible con la nueva versión del Agent.

### Instalar

Usa el comando `datadog-agent integration install` para instalar una versión específica de alguna integración oficial de Datadog (disponible en el [integrations-core repository][1]), siempre que sea compatible con la versión del Agent. El comando lleva a cabo esta verificación y finaliza con un error en caso de incompatibilidades.

Una integración es compatible y se puede instalar si se dan ambas condiciones:

1. La versión es más reciente que la [incluida con el Agent][2].
2. Es compatible con la versión de la [datadog_checks_base][3] en el Agent instalado.

**Nota**: `datadog_checks_base` no se puede instalar manualmente. La verificación básica solo se puede cambiar a una versión superior actualizando el Agent.

La sintaxis de este comando es `datadog-agent integration install <INTEGRATION_PACKAGE_NAME>==<VERSION>`, donde `<INTEGRATION_PACKAGE_NAME>` es el nombre de la integración con el prefijo `datadog-`.

Por ejemplo, para instalar la versión 3.6.0 de la integración vSphere deberás ejecutar:

{{< tabs >}}
{{% tab "Linux" %}}
```shell
sudo -u dd-agent -- datadog-agent integration install datadog-vsphere==3.6.0
```
{{% /tab %}}
{{% tab "Windows PowerShell" %}}
Ejecuta `powershell.exe` como **elevado** (como administrador).
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration install datadog-vsphere==3.6.0
```
{{% /tab %}}
{{< /tabs >}}

El comando instala el paquete Python de la integración y copia los archivos de configuración (`conf.yaml.example`, `conf.yaml.default`, `auto_conf.yaml`) al directorio `conf.d`, sobrescribiendo los existentes. Lo mismo sucede en las actualizaciones completas del Agent. Si ocurre algún fallo al copiar los archivos, el comando finaliza con un error, pero la versión de la integración que hayas especificado se instalará igualmente.

Tras la actualización, reinicia el Agent para empezar a usar la nueva integración instalada.

Este comando está pensado específicamente para permitir a los usuarios actualizar una integración individual y obtener las nuevas funciones o correcciones de errores en cuanto están disponibles, sin necesidad de esperar a la próxima versión del Agent. **Nota**: Aun así, se recomienda actualizar el Agent cuando sea posible, ya que siempre incluye la última versión de cada integración en el momento del lanzamiento.

Tras actualizar el Agent, cada integración que se haya actualizado individualmente mediante el comando se sobrescribirá con la integración incluida en el Agent.

#### Herramientas de gestión de configuración

Las herramientas de gestión de configuraciones pueden aprovechar este comando para implementar la versión de una integración en toda tu infraestructura.

### Eliminar

Para eliminar una integración, usa el comando `datadog-agent integration remove` . La sintaxis de este comando es  `datadog-agent integration remove <INTEGRATION_PACKAGE_NAME>`, donde  `<INTEGRATION_PACKAGE_NAME>` es el nombre de la integración con el prefijo `datadog-`.

Por ejemplo, para eliminar la integración vSphere deberás ejecutar:

{{< tabs >}}
{{% tab "Linux" %}}
```shell
sudo -u dd-agent -- datadog-agent integration remove datadog-vsphere
```
{{% /tab %}}
{{% tab "Windows PowerShell" %}}
Ejecuta `powershell.exe` como **elevado** (como administrador).
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration remove datadog-vsphere
```
{{% /tab %}}
{{< /tabs >}}

Al eliminar una integración, no se borra la carpeta de configuración correspondiente en el directorio `conf.d` .

### Mostrar

Para obtener más información sobre una integración instalada (por ejemplo, la versión), usa el comando `datadog-agent integration show`. La sintaxis de este comando es `datadog-agent integration show <INTEGRATION_PACKAGE_NAME>`, donde `<INTEGRATION_PACKAGE_NAME>` es el nombre de la integración con el prefijo `datadog-`.

Por ejemplo, para mostrar información sobre la integración vSphere deberás ejecutar:

{{< tabs >}}
{{% tab "Linux" %}}
```shell
sudo -u dd-agent -- datadog-agent integration show datadog-vsphere
```
{{% /tab %}}
{{% tab "Windows PowerShell" %}}
Ejecuta `powershell.exe` como **elevado** (como administrador).
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration show datadog-vsphere
```
{{% /tab %}}
{{< /tabs >}}

### Inmovilizar

Para enumerar todos los paquetes de Python instalados en el entorno de Python del Agent, usa el comando `datadog-agent integration freeze`. Se mostrará una lista de todas las integraciones de Datadog (paquetes que empiezan por `datadog-`) y las dependencias de Python necesarias para ejecutar las integraciones.

{{< tabs >}}
{{% tab "Linux" %}}
```text
sudo -u dd-agent -- datadog-agent integration freeze
```
{{% /tab %}}
{{% tab "Windows PowerShell" %}}
Ejecuta `powershell.exe` como **elevado** (como administrador).
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration freeze
```
{{% /tab %}}
{{< /tabs >}}

[1]: https://github.com/DataDog/integrations-core
[2]: https://github.com/DataDog/integrations-core/blob/master/AGENT_INTEGRATIONS.md
[3]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base