---
aliases:
- /es/agent/faq/linux-agent-2022-key-rotation
kind: guía
title: Rotación de claves del Agent de Linux de 2022
---

Como práctica recomendada habitual, Datadog rota periódicamente las claves y certificados utilizados para firmar los paquetes del Datadog Agent. Las siguientes claves GPG, que se usan para firmar los paquetes RPM y DEB del Agent, llegarán al final de su vida útil en junio de 2022 y rotarán en abril de 2022:

- La clave de firma del RPM con codificación mediante hash [`A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`][1] rotará el 11 de abril de 2022 a las 12:00 UTC y se sustituirá por la clave con codificación mediante hash [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][2]. Para poder instalar el primer RPM que se publique después de esa fecha (6.36 y 7.36), será necesaria la nueva clave de confianza.
- La clave de firma del DEB con codificación mediante hash [`A2923DFF56EDA6E76E55E492D3A80E30382E94DE`][3] rotará el 2 de mayo de 2022 a las 12:00 UTC y se sustituirá por la clave con codificación mediante hash [`D75CEA17048B9ACBF186794B32637D44F14F620E`][4]. APT comprueba la firma de los metadatos del repositorio, por lo que la nueva clave debe ser considerada de confianza antes de esa fecha para instalar cualquier versión futura o existente del Agent de `apt.datadoghq.com`.

Es posible que los clientes que utilizan los paquetes RPM o DEB de Datadog necesiten importar manualmente la nueva clave en sus sistemas para instalar o actualizar el Agent después de la rotación.

<div class="alert alert-info">
<strong>Nota</strong>: Esto NO influye en la funcionalidad de los Agents que ya se están ejecutando, sino que solo limita la posibilidad de instalar o actualizar el Agent a una versión más reciente. Tampoco influye en los Agents dockerizados de Linux, ni en los de Windows o macOS.
</div>

## Instalar métodos que confíen automáticamente en la nueva clave GPG

Si utilizas uno de los siguientes métodos de instalación, el host confiará automáticamente en la nueva clave (sin necesidad de hacer nada más):

- [Script de instalación del Agent][5], versión 1.6.0 y posteriores (lanzada el 26 de julio de 2021)
- [Cookbook de Chef][6], versión 4.11.0 y posteriores (lanzada el 10 de agosto de 2021)
- [Rol de Ansible][7], versión 4.10.0 y posteriores (lanzada el 25 de mayo de 2021)
- [Módulo Puppet][8], versión 3.13.0 y posteriores (lanzada el 11 de agosto de 2021)
- [Fórmula SaltStack][9], versión 3.4 y posteriores (lanzada el 12 de agosto de 2021)
- [Paquete de compilación de Heroku][10], versión 1.26 y posteriores (lanzada el 26 de mayo de 2021)
- Plantillas de configuración de [Elastic Beanstalk][11], actualizadas a partir del 29 de marzo de 2021 (deben contener `DATADOG_RPM_KEY_FD4BF915.public` en `gpgkey`)
- Agents contenedorizados (Docker/Kubernetes), cualquier versión
- Agents de Windows/MacOS, cualquier versión

Además, al instalar el paquete DEB del Agent 6.35.1 o 7.35.1 (o posteriores) a través de `apt` desde el repositorio `apt.datadoghq.com`, también se instala la versión 1.1.0 del [paquete `datadog-signing-keys`](#the-datadog-signing-keys-package), que garantiza de forma automática que tu host confía en la nueva clave. Si tienes instalada la versión 1.1.0 (o posterior) del `datadog-signing-keys`, no tienes de qué preocuparte. Sin embargo, las versiones del `datadog-signing-keys` anteriores a la [versión 1.1.0](#datadog-signing-keys-version-110) no garantizan que todo esté listo para la rotación de claves.

Si vas a instalar el paquete DEB del Agent desde un repositorio diferente o no usas `apt` (ni ninguna herramienta similar que compruebe las firmas de los metadatos del repositorio), tu sistema no necesitará conocer las claves de firma de Datadog (por lo que no es necesario hacer nada más). No obstante, el [paquete `datadog-signing-keys`](#el-paquete-datadog-signing-keys) podría resultarte útil.

Si no sabes si un host confía en la nueva clave de firma, puedes hacer un [check](#check-if-a-host-trusts-the-new-gpg-key).

En el caso de los hosts que ejecutan versiones anteriores de los métodos de instalación arriba mencionados o del paquete DEB, Datadog recomienda actualizar el método de instalación a la última versión disponible. Como alternativa, los usuarios de Debian y Ubuntu pueden actualizar el Agent a la versión 7.31.0 o posteriores. Si no, la clave se puede [actualizar manualmente](#manual-update).

## ¿Qué ocurre si no confío en la nueva clave antes de su rotación?

Si intentas instalar o actualizar paquetes del Agent utilizando `apt`, `yum`, `dnf` o `zypper` de `apt.datadoghq.com`/`yum.datadoghq.com` sin confiar en la nueva clave, se producirá un error.

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
Public key for datadog-agent-7.35.1-1.x86_64.rpm is not installed. Failing package is: datadog-agent-1:7.35.1-1.x86_64
```
```
Error: GPG check FAILED
```

En el caso de `apt`, esto afecta tanto a las nuevas versiones del Agent como a las ya existentes. En `yum`, `dnf` o `zypper`, es posible instalar las versiones existentes del Agent siempre que `repo_gpgcheck=0` esté configurado en el archivo `datadog.repo`.

Esta rotación de claves no afecta a las instalaciones que se hayan realizado descargando los paquetes de forma manual e instalándolos con `dpkg` o `rpm`. Sin embargo, es posible que aparezca una advertencia en el caso de `rpm`.

## Actualización manual

Datadog recomienda utilizar uno de los [métodos de instalación](#install-methods-that-automatically-trust-the-new-gpg-key) anteriores, que confían de forma automática en la nueva clave GPG, así como en todas las claves que se creen más adelante. Si esto no es una opción, sigue las siguientes instrucciones para descargar manualmente la nueva clave y confiar en ella.

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Ejecuta los siguientes comandos en el host:

```bash
$ curl -o /tmp/DATADOG_APT_KEY_F14F620E https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
$ sudo apt-key add /tmp/DATADOG_APT_KEY_F14F620E
$ sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
$ cat /tmp/DATADOG_APT_KEY_F14F620E | sudo gpg --import --batch --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg
$ sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
```

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Ejecuta los siguientes comandos en el host:

```
$ curl -o /tmp/DATADOG_RPM_KEY_FD4BF915 https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
$ sudo rpm --import /tmp/DATADOG_RPM_KEY_FD4BF915
```

{{% /tab %}}
{{< /tabs >}}

## Comprobar si un host confía en la nueva clave GPG

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Un host confía correctamente en la nueva clave si se cumple alguna de las siguientes condiciones:

- Existe el archivo `/usr/share/keyrings/datadog-archive-keyring.gpg`, y el archivo de la lista de fuentes de Datadog (normalmente `/etc/apt/sources.list.d/datadog.list`) contiene la opción `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`.
- El archivo de la lista de fuentes de Datadog no contiene la opción `signed-by`, pero la versión 1.1.0 o posteriores del `datadog-signing-keys` está instalada, por lo que aparecerá un archivo `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`.

Los archivos `/usr/share/keyrings/datadog-archive-keyring.gpg` y, de manera opcional, `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` se crean mediante un [método de instalación] (#install-methods-that-automatically-trust-the-new-gpg-key) compatible o instalando el [paquete `datadog-signing-keys`](#the-datadog-signing-keys-package). Si no utilizas uno de los [métodos de instalación anteriores](#install-methods-that-automatically-trust-the-new-gpg-key), asegúrate de que está instalada la [versión 1.1.0](#datadog-signing-keys-version-110) o alguna posterior del`datadog-signing-keys`.

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Ejecuta el siguiente comando en el host:

```bash
$ rpm -qa | grep gpg-pubkey-fd4bf915
```

Si se confía en la clave, el comando tendrá un código de salida 0 y arrojará el siguiente resultado:

```
gpg-pubkey-fd4bf915-5f573efe
```

En caso contrario, el comando mostrará un código de salida distinto de 0 y no arrojará ningún resultado.

Si lo prefieres, comprueba si tu archivo `datadog.repo` contiene `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public` como una de las entradas de `gpgkey`. Este archivo de claves se actualizará con la nueva clave en cuanto esté en uso.

{{% /tab %}}
{{< /tabs >}}

## El paquete `datadog-signing-keys`

<div class="alert alert-info"><strong>Nota:</strong> Esta sección solo va dirigida a los usuarios del paquete DEB del Agent.</div>

A partir del Agent v6.31.0 y v7.31.0, todos los paquetes DEB de Datadog tienen algún tipo de dependencia en el paquete `datadog-signing-keys`. A partir del Agent v6.35.1 y v7.35.1, todos los paquetes DEB de Datadog tienen algún tipo de dependencia en la versión `1.1.0` del paquete `datadog-signing-keys`.

Una vez instalado, este paquete:

- Configura las claves APT en el conjunto de claves `/usr/share/keyrings/datadog-archive-keyring.gpg` y, cuando sea necesario, también en `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`. **Así, se garantiza la confianza en las próximas claves de firma del repositorio APT.** Para tener la seguridad de todo está listo para la siguiente rotación de claves, se recomienda utilizar la [versión 1.1.0 del paquete `datadog-signing-keys`](#datadog-signing-keys-version-110).
- Establece una [política `debsig-verify`][12] para los paquetes de Datadog para poder verificar las firmas de paquetes DEB concretos de forma local.

Por ejemplo, para verificar que un paquete DEB descargado localmente ha sido creado y firmado por Datadog, ejecuta el siguiente comando:

  ```bash
  $ debsig-verify datadog-dogstatsd_7.34.0-1_amd64.deb
  ```

Si la verificación es correcta, `debsig-verify` se cierra con el estado `0` y muestra el siguiente mensaje: `debsig: Verified package from 'Datadog, Inc.' (Datadog).`. Los paquetes DEB de Datadog integran firmas a partir de la versión 6.26.0/7.26.0, por lo que esta verificación no funciona en versiones anteriores.

La dependencia de los paquetes del Agent v6.31.0/7.31.0 (y posteriores) en el `datadog-signing-keys` es opcional, por lo que es posible que no se instale en los siguientes casos:

- Si descargas de manera manual el paquete DEB del Agent y lo instalas sin tener el repositorio de Datadog configurado como fuente APT.
- Si replicas el paquete DEB del Agent en tu propio repositorio APT sin replicar también el paquete `datadog-signing-keys`.
- Si tu configuración de APT está establecida para no instalar paquetes recomendados. Por ejemplo, si se ejecuta `apt` con ` --no-install-recommends` o si se tiene `APT::Install-Recommends "0"` en `apt.conf`.

Los dos primeros métodos no requieren la verificación de los metadatos del repositorio de Datadog, por lo que la rotación de claves no tendrá ningún efecto. No obstante, podría resultarte útil utilizar los archivos de la política `debsig-verify` incluidos en el paquete `datadog-signing-keys`.

Con el tercer método, necesitarás instalar expresamente el paquete `datadog-signing-keys` si planeas instalar el paquete del Agent de `apt.datadoghq.com` mediante `apt`. Si lo prefieres, puedes utilizar uno de los [métodos de instalación](#install-methods-that-automatically-trust-the-new-gpg-key) compatibles.

### Versión 1.1.0 de datadog-signing-keys

<div class="alert alert-info"><strong>Nota:</strong> Esta sección solo va dirigida a los usuarios del paquete DEB del Agent.</div>

Las versiones anteriores a la 1.1.0 del `datadog-signing-keys` no gestionan los siguientes casos particulares:

* En Ubuntu 16 y Debian 9 (así como en sus respectivas versiones posteriores), solo se crea `/usr/share/keyrings/datadog-archive-keyring.gpg`, pero no `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`.
* Si el archivo de la lista de fuentes de APT (por ejemplo, `/etc/apt/sources.list.d/datadog.list`) no contiene la opción `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`, APT nunca tendrá constancia de la nueva clave. Cualquier operación que se realice con el repositorio de Datadog fallará tras la rotación de la clave.

La versión 1.1.0 del `datadog-signing-keys` soluciona este problema mediante la creación de `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` cuando `/etc/apt/sources.list.d/datadog.list` no contiene la opción `signed-by` adecuada, lo que garantiza que también se solucione el caso anterior.

Los usuarios de [métodos de instalación](#install-methods-that-automatically-trust-the-new-gpg-key) compatibles y actualizados que utilicen las fuentes predeterminadas de Datadog siempre tendrán configurada la opción `signed-by` adecuada, por lo que este problema no les afecta. Datadog recomienda encarecidamente a todos los demás usuarios que se pasen a la versión 1.1.0 del `datadog-signing-keys` para asegurarse de que todo está listo para la próxima rotación de claves. Al instalar el DEB del Agent v6.35.1 o v7.35.1 (y posteriores) a través de `apt` desde el repositorio `apt.datadoghq.com`, se garantiza que la versión 1.1.0 del `datadog-signing-keys` está instalada.

## Cómo afecta a los usuarios del Agent v5

Los usuarios del Agent v5 que utilicen sistemas basados en DEB (Debian/Ubuntu) también deberán confiar en la nueva clave de firma para instalar o actualizar el Agent después de la fecha de rotación. En cambio, los usuarios del Agent v5 con sistemas basados en RPM (RedHat/CentOS/SUSE) no se verán afectados por esta rotación.

**Nota**: El Agent v5 utiliza Python 2, que llegó al final de su vida útil el 1 de enero de 2021. Datadog recomienda [actualizar el Agent a la versión 7][13].

[1]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://s3.amazonaws.com/dd-agent/scripts/install_script.sh
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog
[8]: https://github.com/DataDog/puppet-datadog-agent
[9]: https://github.com/DataDog/datadog-formula
[10]: https://github.com/DataDog/heroku-buildpack-datadog
[11]: https://docs.datadoghq.com/es/integrations/amazon_elasticbeanstalk
[12]: https://manpages.ubuntu.com/manpages/jammy/man1/debsig-verify.1.html
[13]: https://app.datadoghq.com/account/settings#agent