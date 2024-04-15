---

title: Rotación de claves GPG en paquetes RPM
---

<div class="alert alert-warning">
Esta página hace referencia a la rotación de claves de 2019. Para más información, consulta la documentación sobre la <a href="/agent/guide/linux-agent-2022-key-rotation">rotación de claves del Agent de Linux de 2022</a>.
</div>


A partir de la versión 6.14.0, los paquetes RPM del Agent se firman con una clave GPG diferente. Como práctica recomendada habitual, Datadog actualiza periódicamente esta clave GPG.

Este cambio afecta a los hosts que utilizan paquetes RPM ubicados en el [repositorio Yum de Datadog][1] y necesitan confiar en la clave importando la clave pública asociada en los conjuntos de llaves de sus hosts.

Si se intenta instalar o actualizar el paquete del Agent sin confiar en la clave, se producirán errores `NOKEY` al instalarlo.

La huella digital de la clave pública asociada es: `A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`.

Si utilizas la última versión de uno de los siguientes métodos de instalación admitidos de forma oficial, tus hosts confiarán en la clave automáticamente y no tendrás que hacer nada más.

* [Página de instalación del Agent][2]
* [Guía paso a paso de Chef][3]
* [Rol de Ansible][4]
* [Módulo de Puppet][5]
* [Fórmula SaltStack][6]

## Comprobar si un host confía en la clave GPG

Para verificar si un determinado host confía en la clave, ejecuta el siguiente comando en el host:

```bash
rpm -q gpg-pubkey-e09422b3
```

Si el host confía en la clave, el comando tendrá un código de salida 0 y las siguientes salidas:

```bash
gpg-pubkey-e09422b3-57744e9e
```

En caso contrario, el comando mostrará un código de salida distinto de 0 y la siguiente salida:

```bash
package gpg-pubkey-e09422b3 is not installed
```

## Confiar en las claves GPG

Este paso no es necesario si los hosts ya confían en las claves o si se utiliza una versión reciente de un método de instalación oficial.

### Comando de importación

Ejecuta los siguientes comandos en el host:

```bash
$ curl -o /tmp/DATADOG_RPM_KEY_CURRENT.public https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
$ curl -o /tmp/DATADOG_RPM_KEY_FD4BF915.public https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
$ curl -o /tmp/DATADOG_RPM_KEY_E09422B3.public https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public

$ rpm --import /tmp/DATADOG_RPM_KEY_CURRENT.public
$ rpm --import /tmp/DATADOG_RPM_KEY_FD4BF915.public
$ rpm --import /tmp/DATADOG_RPM_KEY_E09422B3.public
```

A continuación, comprueba si se confía en las claves siguiendo los pasos indicados en [Comprobar si un host confía en la clave GPG](#check-if-a-host-trusts-the-gpg-key).

### Actualización del archivo del repositorio Yum

En CentOS, RHEL y Amazon Linux, si para definir el repositorio de Datadog (`datadog.repo`) se utiliza tu archivo del repositorio Yum, actualízalo para añadir la clave como una de confianza:

{{< tabs >}}
{{% tab "Agent v7" %}}

```conf
[datadog]
name = Datadog, Inc.
baseurl = https://yum.datadoghq.com/stable/7/x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
```

{{% /tab %}}
{{% tab "Agent v6" %}}

```conf
[datadog]
name = Datadog, Inc.
baseurl = https://yum.datadoghq.com/stable/6/x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
```

{{% /tab %}}
{{< /tabs >}}

**Nota**: Debido a un [error en dnf][7], utiliza `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` con RHEL/CentOS 8.1.

**Nota**: Este método no funciona en sistemas basados en SUSE. En su lugar, utiliza el [comando de importación](#import-command).

[1]: https://yum.datadoghq.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/chef-datadog
[4]: https://github.com/DataDog/ansible-datadog
[5]: https://github.com/DataDog/puppet-datadog-agent
[6]: https://github.com/DataDog/datadog-formula
[7]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
