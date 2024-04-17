---
aliases:
- /es/agent/guide/linux-agent-2022-key-rotation
kind: guía
private: true
title: Rotación de claves del Agent de Linux de 2022
---

Como práctica habitual, Datadog rota periódicamente las claves y certificados utilizados para firmar los paquetes Agent de Datadog. Las siguientes claves GPG, utilizadas para firmar los paquetes RPM y DEB de Agent, llegan al final de su vida útil en junio de 2022 y se rotarán en abril de 2022:

- La clave de firma RPM con hash [`A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`][1] será rotada el 11 de abril a las 12:00 UTC de 2022 y será reemplazada por la clave con hash [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][2]. La primera versión de RPM después de esa fecha (6.36 y 7.36) requerirá la instalación de la nueva clave de confianza.
- La clave de firma DEB con hash [`A2923DFF56EDA6E76E55E492D3A80E30382E94DE`][3] será rotada el 2 de mayo a las 12:00 UTC de 2022 y será reemplazada por la clave con hash [`D75CEA17048B9ACBF186794B32637D44F14F620E`][4]. APT comprueba la firma de metadatos del repositorio por lo que la nueva clave debe ser de confianza en esta fecha para instalar cualquier versión futura o existente de Agent desde `apt.datadoghq.com`.

Los clientes que utilizan los paquetes RPM o DEB de Datadog podrían necesitar importar manualmente la nueva clave en sus sistemas para instalar o actualizar el Agent luego de que se produzca la rotación.

<div class="alert alert-info">
<strong>Nota</strong>: Esto NO afecta a la funcionalidad de los Agents que se están ejecutando y solo limita la capacidad de instalar o actualizar a una versión más reciente de Agent. Además, esto no afecta a Agents de Linux, Windows o macOS dockerizados.
</div>

## Instala métodos que confíen automáticamente en la nueva clave GPG

Tu host confía automáticamente en la nueva clave (no se requiere ninguna acción adicional) si estás utilizando uno de los siguientes métodos de instalación:

- [Script de instalación del Agent][5], v1.6.0 y posteriores (lanzado el 26 de julio de 2021)
- [Cookbook de Chef][6], v4.11.0 y posteriores (lanzado el 10 de agosto de 2021)
- [Rol de Ansible][7], v4.10.0 y posteriores (lanzado el 25 de mayo de 2021)
- [Módulo Puppet][8], v3.13.0 y posteriores (lanzado el 11 de agosto de 2021)
- [Fórmula SaltStack][9], v3.4 y posteriores (lanzada el 12 de agosto de 2021)
- [Paquete de compilación de Heroku][10], v1.26 y posteriores (lanzado el 26 de mayo de 2021)
- Plantillas de configuración de [Elastic Beanstalk][11], actualizadas a partir del 29 de marzo de 2021 (deben contener `DATADOG_RPM_KEY_FD4BF915.public` en `gpgkey`)
- Agents contenedorizados (Docker/Kubernetes), cualquier versión
- Agents de Windows/MacOS, cualquier versión

Además, al instalar el paquete del Agent DEB versiones 6.35.1, v7.35.1 o posteriores en `apt` desde el repositorio `apt.datadoghq.com` se instala la versión 1.1.0 del [paquete `datadog-signing-keys`](#the-datadog-signing-keys-paquete), lo que garantiza automáticamente que tu host confiará en la nueva clave. Si tienes instalada la versión 1.1.0 o posterior de `datadog-signing-keys`, no es necesario realizar ninguna otra acción. Las versiones de `datadog-signing-keys` anteriores a la [versión 1.1.0](#datadog-signing-keys-version-110) no garantizan la plena preparación para la rotación de claves.

Si estás instalando el paquete del Agent DEB desde un repositorio diferente o si no estás utilizando `apt` (o una herramienta similar para comprobar las firmas de metadatos del repositorio), tu sistema no necesita conocer las claves de firma de Datadog (no es necesaria ninguna acción adicional). Sin embargo, puedes beneficiarte del [paquete`datadog-signing-keys` ](#the-datadog-signing-keys-package).

Si no estás seguro de si un host confía en la nueva clave de firma, puedes [comprobar](#check-if-a-host-trusts-the-new-gpg-key).

Para los hosts que ejecutan versiones anteriores de los métodos de instalación mencionados más arriba o versiones anteriores del paquete DEB, Datadog recomienda actualizar el método de instalación a la última versión. Alternativamente, los usuarios de Debian y Ubuntu pueden actualizar Agent a la versión 7.31.0+. Si no, se puede [actualizar manualmente](#manual-update).

## ¿Qué ocurre si no confío en la nueva clave antes de su rotación?

Al intentar instalar o actualizar paquetes de Agent utilizando `apt`, `yum`, `dnf` o `zypper` desde `apt.datadoghq.com`/`yum.datadoghq.com` sin confiar en la nueva clave se produce un error.

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

En el caso de `apt`, esto afecta tanto a las nuevas versiones del Agent como a las ya existentes. En el caso de `yum`, `dnf` o `zypper`, es posible instalar las versiones existentes del Agent siempre que `repo_gpgcheck=0` esté configurado en el archivo `datadog.repo`.

Esta rotación de claves no afecta a las instalaciones realizadas descargando manualmente los paquetes e instalándolos con `dpkg` o `rpm`. Esto puede causar una advertencia para `rpm`.

## Actualización manual

Datadog te incentiva a utilizar uno de los [métodos de instalación](#install-methods-that-automatically-trust-the-new-gpg-key) anteriores, que confían automáticamente en la nueva clave GPG, así como en todas las claves futuras. Si esto no es una opción, utiliza las siguientes instrucciones para descargar manualmente la nueva clave y confiar en ella.

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

## Comprueba si un host confía en la nueva clave GPG

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Un host confía correctamente en la nueva clave si se cumple alguna de las siguientes condiciones:

- El archivo `/usr/share/keyrings/datadog-archive-keyring.gpg` existe y el archivo de la lista de orígenes de Datadog (normalmente `/etc/apt/sources.list.d/datadog.list`) contiene la opción `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`.
- El archivo de la lista de orígenes de Datadog no contiene la opción `signed-by`, pero la versión 1.1.0 o posteriores de las `datadog-signing-keys` está instalada, por lo que aparecerá un archivo `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`.

Los archivos `/usr/share/keyrings/datadog-archive-keyring.gpg` y, opcionalmente, `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`, se crean mediante un [método de instalación] compatible (#install-methods-that-automatically-trust-the-new-gpg-key) o instalando el [paquete`datadog-signing-keys`](#the-datadog-signing-keys-package). Asegúrate de que`datadog-signing-keys` [versión 1.1.0](#datadog-signing-keys-version-110) o posterior está instalado, a menos que utilices una de las [versiones del método de instalación mencionadas anteriormente](#install-methods-that-automatically-trust-the-new-gpg-key).

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Ejecuta el siguiente comando en el host:

```bash
$ rpm -qa | grep gpg-pubkey-fd4bf915
```

Si el host confía en la clave, el comando tendrá un código de salida 0 y las siguientes salidas:

```
gpg-pubkey-fd4bf915-5f573efe
```

Si no, el comando devuelve un código de salida distinto de 0 sin salida.

Si lo prefieres, comprueba si tu archivo `datadog.repo` contiene `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public` como una de las entradas `gpgkey`. Este archivo de claves se actualizará con la nueva clave en cuanto esté en uso.

{{% /tab %}}
{{< /tabs >}}

## El paquete `datadog-signing-keys`

<div class="alert alert-info"><strong>Nota:</strong> Esta sección solo se aplica a los usuarios del paquete del Agent DEB.</div>

Desde Agent v6.31.0 y v7.31.0, todos los paquetes DEB de Datadog dependen en alguna medida del paquete `datadog-signing-keys`. Desde Agent v6.35.1 y v 7.35.1, todos los paquetes DEB de Datadog dependen del paquete `datadog-signing-keys`, versión `1.1.0` .

Una vez instalado, este paquete:

- Configura las claves APT en el conjunto de claves `/usr/share/keyrings/datadog-archive-keyring.gpg` y, si es necesario, también lo hace en `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`. **Esto garantiza la confianza en la próxima clave de firma del repositorio de APT.** Para asegurarse de que todo está listo para la siguiente rotación de claves, recomendamos utilizar el paquete [`datadog-signing-keys` versión 1.1.0](#datadog-signing-keys-version-110).
- Establece una [política `debsig-verify`][12] para los paquetes de Datadog. Esto te permite verificar firmas para paquetes de DEB individuales localmente.

Por ejemplo, para verificar que un paquete de DEB descargado localmente ha sido creado y firmado por Datadog, ejecuta el siguiente comando:

  ```bash
  $ debsig-verify datadog-dogstatsd_7.34.0-1_amd64.deb
  ```

Si la verificación tiene éxito, `debsig-verify` sale con el estado `0` e imprime un mensaje: `debsig: Verified package from 'Datadog, Inc.' (Datadog).`. Los paquetes DEB de Datadog se integran a las firmas desde las versiones 6.26.0/7.26.0, por lo que esta verificación no funciona en versiones anteriores.

Debido a que la dependencia del paquete de Agent versiones 6.31.0+/7.31.0 y posteriores de `datadog-signing-keys` es opcional, es posible que no se instale si:

- Descarga manualmente el paquete DEB de Agent e instálalo sin tener el repositorio de Datadog configurado como origen APT.
- Puedes replicar el paquete DEB del Agent en tu propio repositorio de APT sin replicar también el paquete `datadog-signing-keys`.
- La configuración de tu APT está definida para no instalar paquetes recomendado. Por ejemplo, ejecutando `apt` con ` --no-install-recommends` or by having `APT::Install-Recommends "0"` in `apt.conf`.

Los dos primeros métodos no requieren la verificación de los metadatos del repositorio de Datadog, por lo que la rotación de claves no tiene ningún impacto. Sin embargo, puede que te resulte útil utilizar los archivos de políticas `debsig-verify` incluidos en el paquete`datadog-signing-keys`.

Con el tercer método, necesitas instalar explícitamente el paquete `datadog-signing-keys` si estás instalando el paquete de Agent de `apt.datadoghq.com` a `apt`. Como alternativa, utiliza uno de los [métodos de instalación](#install-methods-that-automatically-trust-the-new-gpg-key) compatibles.

### Versión 1.1.0 de datadog-signing-keys

<div class="alert alert-info"><strong>Nota:</strong> Esta sección solo se aplica a los usuarios del paquete DEB del Agent.</div>

Las versiones de `datadog-signing-keys` anteriores a la v1.1.0 no gestionan los siguientes casos de esquina:

* En Ubuntu >= 16 y Debian >= 9, solo se creó `/usr/share/keyrings/datadog-archive-keyring.gpg`, pero no se creó `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg`.
* Si el archivo de listas de orígenes de APT (por ejemplo, `/etc/apt/sources.list.d/datadog.list`) no contiene la opción `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`, APT nunca conocerá la nueva clave. Cualquier operación con el repositorio de Datadog fallará después de la rotación de claves.

`datadog-signing-keys`, v1.1.0 soluciona este problema creando `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` cuando `/etc/apt/sources.list.d/datadog.list` no contiene la opción `signed-by` adecuada. Esto asegura que el caso anterior también está cubierto.

Los usuarios de [métodos de instalación](#install-methods-that-automatically-trust-the-new-gpg-key) actualizados compatibles que utilicen las fuentes predeterminadas de Datadog siempre tienen configurada la opción `signed-by` adecuada, por lo que no se ven afectados por este problema. Datadog recomienda encarecidamente a todos los demás usuarios que actualicen a `datadog-signing-keys` v1.1.0 para asegurarse de estar preparados para la próxima rotación de claves. La instalación de DEB Agent, versiones 6.35.1, v7.35.1 o posteriores, en `apt` desde el repositorio `apt.datadoghq.com` garantiza la instalación de `datadog-signing-keys` v1.1.0.

## Impacto en usuarios de Agent v5

Los usuarios de Agent v5 en sistemas basados en DEB (Debian/Ubuntu) también deben confiar en la nueva clave de firma para instalar o actualizar el Agent después de la fecha de rotación. Los usuarios de Agent v5 en sistemas basados en RPM (RedHat/CentOS/SUSE) no se ven afectados por esta rotación.

**Nota**: Agent v5 utiliza Python 2, que llegó al final de su vida útil el 1 de enero de 2021. Datadog recomienda [actualizar a la versión 7 de Agent][13].

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
[13]: https://app.datadoghq.com/account/settings/agent/latest