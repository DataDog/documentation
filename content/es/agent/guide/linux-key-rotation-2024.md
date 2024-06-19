---
title: Rotación de claves Linux de 2024
---

Como práctica habitual, Datadog rota periódicamente las claves y certificados utilizados para firmar los paquetes del Agent de Datadog. Los paquetes de Datadog incluyen:

- Los diferentes aspectos del Agent (`datadog-agent`, `datadog-iot-agent`, `datadog-heroku-agent` y `datadog-dogstatsd`).
- Paquetes adicionales: Observability Pipelines Worker (`observability-pipelines-worker`), el proxy FIPS (`datadog-fips-proxy`), la inyección APM y las bibliotecas del rastreador para Java, Python, .NET, Ruby y Node.js (todos ellos paquetes `datadog-apm-*` ).

Las siguientes claves GPG, utilizadas para firmar los paquetes RPM y DEB mencionados anteriormente, llegan al final de su vida útil en septiembre de 2024. La rotación está prevista para junio de 2024:

RPM
: Antiguo hash de clave de confianza: [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][1]
: Nuevo hash de clave de confianza: [`7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3`][2]
: Después de junio de 2024, instala la nueva clave de confianza antes de instalar cualquier versión de RPM lanzada después de junio de 2024.

DEB
: Antiguo hash de clave de confianza: [`D75CEA17048B9ACBF186794B32637D44F14F620E`][3]
: Nuevo hash de clave de confianza: [`5F1E256061D813B125E156E8E6266D4AC0962C7D`][4]
: APT comprueba la firma de metadatos del repositorio. Después de junio de 2024, instala la nueva clave de confianza antes de instalar cualquier versión de APT de `apt.datadoghq.com` lanzada después de junio de 2024.

Si utilizas los paquetes RPM o DEB de Datadog, es posible que tengas que importar manualmente la nueva clave en tus sistemas para instalar o actualizar los paquetes del Agent después de la rotación.

<div class="alert alert-info">
La rotación de claves no afecta a la funcionalidad de los Agents que ya están en ejecución. Sólo limita la capacidad de instalar o actualizar a una versión más reciente del Agent.<br><br>Los Agents Linux, Windows o macOS dockerizados no se ven afectados.
</div>

## Instala métodos que confíen automáticamente en la nueva clave GPG

Si utilizas uno de los siguientes métodos de instalación, tu host confía automáticamente en la nueva clave y no es necesaria ninguna otra acción:

- [Script de instalación del Agent][5], v1.18.0 o posterior (publicado el 27 de junio de 2023)
- [Cookbook de Chef][6], v4.18.0 o posterior (publicado el 26 de julio de 2023)
- [Rol Ansible][7], v4.20.0 o posterior (publicado el 18 de julio de 2023)
- [Recopilación Ansible][14], v5.0.0 o posterior (publicado el 18 de julio de 2023)
- [Módulo Puppet][8], v3.21.0 o posterior (publicado el 5 de julio de 2023)
- [Fórmula SaltStack][9], v3.6 o posterior (publicado el 10 de agosto de 2023)
- [Paquete de compilación Heroku][10], v2.11 o posterior (publicado el 15 de junio de 2023)
- Plantillas de configuración de [Elastic Beanstalk][11], actualizadas a partir del 27 de junio de 2023 (deben contener `source: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh`)
- Agents contenerizados (Docker/Kubernetes), para cualquier versión
- Agents de Windows/MacOS, para cualquier versión

Además, al instalar el paquete DEB del Agent v6.48.0 o v7.48.0 o posterior en `apt` desde el repositorio `apt.datadoghq.com`, se instala la versión 1.3.1 del [`paquete ``datadog-signing-keys``](#the-datadog-signing-keys-package). El paquete ``datadog-signing-keys``te garantiza automáticamente que tu host confiará en la nueva clave. Si tienes una versión 1.31 o posterior de ``datadog-signing-keys``, no necesitas realizar ninguna otra acción. Las versiones de ``datadog-signing-keys`anteriores a la versión 1.3.1 no garantizan que todo esté listo para la rotación de claves.

Si has instalado Observability Pipelines Worker o el rastreador de bibliotecas APM **utilizando los métodos de instalación anteriores**, estos ya vienen con las claves más recientes. No necesitas realizar ninguna otra acción.

Si estás instalando el paquete DEB del Agent desde un repositorio diferente o si no estás utilizando `apt` (o una herramienta similar que comprueba firmas de metadatos del repositorio), tu sistema no necesita conocer las claves de firma de Datadog. No necesitas realizar ninguna otra acción. Sin embargo, puede resultarte útil el [paquete`datadog-signing-keys`](#the-Datadog-signing-keys-paquete).

Si no sabes si un host confía en la nueva clave de firma, puedes [comprobar](#check-if-a-host-trusts-the-new-gpg-key).

Para los hosts que ejecutan versiones anteriores de los métodos de instalación mencionados anteriormente o versiones anteriores del paquete DEB, Datadog recomienda actualizar el método de instalación a la última versión. Alternativamente, los usuarios de Debian y Ubuntu pueden actualizar el Agent a la versión 7.48.0 o posterior. En caso contrario, se puede [actualizar manualmente](#manual-update).

## ¿Qué ocurre si no se confía en la nueva clave antes de rotarla?

Al intentar instalar o actualizar paquetes del Agent utilizando `apt`, `yum`, `dnf` o `zypper` desde `apt.datadoghq.com`/`yum.datadoghq.com`, sin confiar en la nueva clave, se produce un error.

Algunos de los posibles errores son:

```
E: The repository 'https://apt.datadoghq.com stable Release' is not signed.
```
```
E: Package 'datadog-agent' has no installation candidate
```
```
The following signatures couldn't be verified because the public key is not available: NO_PUBKEY
```
```
The GPG keys listed for the "Datadog, Inc." repository are already installed but they are not correct for this package.
Check that the correct key URLs are configured for this repository.
```
```
Public key for datadog-agent-7.57.1-1.x86_64.rpm is not installed. Failing package is: datadog-agent-1:7.57.1-1.x86_64
```
```
Error: GPG check FAILED
```

En el caso de `apt`, esto se aplica tanto a las nuevas versiones como a las ya existentes del Agent. En el caso de `yum`, `dnf` o `zypper`, las versiones ya existentes del Agent pueden seguir instalándose siempre que `repo_gpgcheck=0` esté configurado en el archivo `datadog.repo` o `datadog-observability-pipelines-worker.repo`.

Esta rotación de claves no afecta a las instalaciones realizadas descargando manualmente los paquetes e instalándolos con `dpkg` o `rpm`. Esto puede causar una advertencia para `rpm`.

## Actualización manual

Datadog te invita a utilizar uno de los [métodos de instalación](#install-methods-that-automatically-trust-the-new-gpg-key) anteriores, que confían automáticamente en la nueva clave GPG, así como en todas las claves futuras. Si esto no es una opción, utiliza las siguientes instrucciones para descargar manualmente y confiar en la nueva clave.

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Ejecuta los siguientes comandos en el host:

```bash
$ sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
$ sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
$ curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
$ curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo apt-key add -
```

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Ejecuta el siguiente comando en el host:

```
$ sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
```

{{% /tab %}}
{{< /tabs >}}

## Comprueba si un host confía en la nueva clave GPG

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Un host confía correctamente en la nueva clave, si se cumple alguna de las siguientes condiciones:

- El archivo `/usr/share/keyrings/datadog-archive-keyring.gpg` existe y el archivo con listas de origen de Datadog contiene la opción `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`.
  - En las instalaciones del Agent, el archivo con listas de origen suele ser `/etc/apt/sources.list.d/datadog.list`
  - Para las instalaciones de Observability Pipelines Worker, el archivo con listas de origen suele ser `/etc/apt/sources.list.d/datadog-observability-pipelines-worker.list`
- El archivo con listas de origen de Datadog no contiene la opción `signed-by`, pero la versión 1.3.1 o posterior de `datadog-signing-keys` está instalada, lo que da lugar a la presencia de un archivo `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`.

Los archivos `/usr/share/keyrings/datadog-archive-keyring.gpg` y, opcionalmente, `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` se crean mediante un [método de instalación](#install-methods-that-automatically-trust-the-new-gpg-key) compatible o instalando el [paquete`datadog-signing-keys`](#the-datadog-signing-keys-package). Asegúrate de que está instalada la versión 1.3.1 o posterior de `datadog-signing-keys`, a menos que utilices uno de los [métodos de instalación mencionados anteriormente](#install-methods-that-automatically-trust-the-new-gpg-key).

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Ejecuta el siguiente comando en el host:

```bash
$ rpm -qa | grep gpg-pubkey-b01082d3
```

Si el host confía en la clave, el comando tendrá un código de salida 0 y los siguientes resultados:

```
gpg-pubkey-b01082d3-644161ac
```

En caso contrario, el comando devuelve un código de salida distinto de 0 sin resultado.

Alternativamente, comprueba si el archivo de tu repositorio contiene `https://keys.datadoghq.com/Datadog_RPM_KEY_CURRENT.public` como una de las entradas `gpgkey`. El archivo del repositorio suele ser `datadog.repo`, para instalaciones del Agent, o `datadog-observability-pipelines-worker.repo`, para Observability Pipelines Worker. El archivo de claves `CURRENT` se actualiza con la nueva clave en cuanto está en uso.

{{% /tab %}}
{{< /tabs >}}

## El paquete `datadog-signing-keys`

<div class="alert alert-info">Esta sección sólo se aplica a los usuarios del paquete DEB del Agent.</div>

Desde las versiones 6.31.0 y v7.31.0 del Agent, todos los paquetes DEB de Datadog tienen una cierta dependencia del paquete `datadog-signing-keys`. Las siguientes versiones de paquetes del Agent tienen una cierta dependencia del paquete `datadog-signing-keys` versión `1.3.1`:
- datadog-agent, datadog-iot-agent, datadog-heroku-agent, datadog-dogstatsd, datadog-agent-dbg v6.48.1 y v7.48.1 o posterior
- datadog-fips-proxy v0.5.4 o posterior
- observability-pipelines-worker v1.3.1 o posterior
- datadog-apm-inject v0.10.7 o posterior
- datadog-apm-library-python v1.18.0 o posterior
- datadog-apm-library-java v1.19.1 o posterior
- datadog-apm-library-dotnet v2.36.0 o posterior
- datadog-apm-library-js v4.11.0 o posterior
- datadog-apm-library-all v0.3 o posterior

Una vez instalado, este paquete:

- Configura las claves APT en el conjunto de claves `/usr/share/keyrings/datadog-archive-keyring.gpg` y también en `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`, cuando sea necesario. **Esto asegura que la próxima clave de firma del siguiente repositorio APT es de confianza.** Se recomienda utilizar la versión 1.3.1 del paquete `datadog-signing-keys` para asegurar que todo está listo para la siguiente rotación de claves.
- Establece una [política `debsig-verify`][12] para paquetes de Datadog. Esto te permite comprobar firmas de paquetes DEB individuales de forma local.

Por ejemplo, para comprobar si un paquete DEB descargado localmente ha sido creado y firmado por Datadog, ejecuta el siguiente comando:

  ```bash
  $ debsig-verify datadog-dogstatsd_7.51.0-1_amd64.deb
  ```

Si la verificación tiene éxito, `debsig-verify` sale con el estado `0` e imprime un mensaje: `debsig: Verified package from 'Datadog, Inc.' (Datadog).` Los paquetes DEB de Datadog integran firmas a partir de las versiones 6.26.0/7.26.0, por lo que esta verificación no funciona en versiones anteriores.

Como la dependencia del paquete de Agent v6.48.0+/7.48.0 o posterior es `datadog-signing-keys` opcional , es posible que no se instale si:

- Descargas manualmente el paquete DEB del Agent y lo instalas sin tener el repositorio Datadog configurado como origen APT.
- Replicas el paquete DEB del Agent en tu propio repositorio de APT sin replicar también el paquete `datadog-signing-keys`.
- Tu APT está configurado para no instalar paquetes recomendados. Por ejemplo, ejecutando `apt` con ` --no-install-recommends` or by having `APT::Install-Recommends "0"` in `apt.conf`.

Los dos primeros métodos no requieren la verificación de los metadatos del repositorio de Datadog, por lo que la rotación de claves no tiene ningún impacto. Sin embargo, puede que te resulte útil utilizar los archivos de política `debsig-verify` incluidos en el paquete`datadog-signing-keys`.

Con el tercer método, necesitas instalar explícitamente el paquete `datadog-signing-keys`, si estás instalando el paquete del Agent de `apt.datadoghq.com` en `apt`. Como alternativa, utiliza uno de los [métodos de instalación](#install-methods-that-automatically-trust-the-new-gpg-key) compatibles.

## Impacto en los usuarios del Agent v5

Los usuarios del Agent v5 en sistemas basados en DEB (Debian/Ubuntu) también deben confiar en la nueva clave de firma para instalar o actualizar el Agent después de la fecha de rotación. Los usuarios del Agent v5 en sistemas basados en RPM (RedHat/CentOS/SUSE) no se ven afectados por esta rotación.

**Nota**: Agent v5 utiliza Python 2, que llegó al final de su vida útil el 1 de enero de 2020. Datadog recomienda [actualizar al Agent v7][13].

[1]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[5]: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog
[8]: https://github.com/DataDog/puppet-datadog-agent
[9]: https://github.com/DataDog/datadog-formula
[10]: https://github.com/DataDog/heroku-buildpack-datadog
[11]: https://docs.datadoghq.com/es/integrations/amazon_elasticbeanstalk
[12]: https://manpages.ubuntu.com/manpages/jammy/man1/debsig-verify.1.html
[13]: https://app.datadoghq.com/account/settings/agent/latest
[14]: https://github.com/ansible-collections/Datadog