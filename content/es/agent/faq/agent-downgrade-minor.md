---
aliases:
- /es/agent/faq/downgrade-datadog-agent
kind: faq
title: Cambiar a una versión secundaria anterior del Agent
---

Para paquetes DEB o RPM del Datadog Agent, encontrarás las instrucciones para cambiar a una versión secundaria anterior a continuación.

Para cambiar el Datadog Agent a una versión principal anterior, sigue las instrucciones en esta [página específica][1].

**Notas**:

* Estas instrucciones solo son válidas para el Datadog Agent 6.x y versiones posteriores.
* Las instrucciones que aparecen a continuación para las herramientas de gestión de configuración solo funcionan con la versión principal más reciente de estas: v4.x para la guía paso a paso de Chef, v3.x para el módulo de Puppet y v4.x para el rol de Ansible. Si utilizas una versión anterior, consulta la documentación de esa versión en los repositorios de herramientas: [Guía paso a paso de Chef v3.x][2], [Módulo de Puppet v2.x][3] o [Rol de Ansible v3.x][4].

## Debian/Ubuntu

### CLI

```shell
sudo apt-get update && sudo apt-get install --allow-downgrades datadog-agent=1:X.Y.Z-1
```

**Nota**: Si tu versión de APT no tiene la opción `--allow-downgrades`, puedes usar `--force-yes`.

### Herramientas de gestión de configuración

{{< tabs >}}
{{% tab "Chef" %}}

```rb
node["datadog"]["agent_version"] = "1:X.Y.Z-1"
node["datadog"]["agent_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

```conf
class { 'datadog_agent':
      ...
      agent_version => "1:X.Y.Z-1",
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Añade los siguientes atributos a tu cuaderno de estrategias:

```yaml
datadog_agent_version: "1:X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

## RHEL/CentOS/Amazon Linux

### CLI

```shell
sudo yum clean expire-cache metadata && sudo yum downgrade datadog-agent-X.Y.Z-1
```

### Herramientas de gestión de configuración

{{< tabs >}}
{{% tab "Chef" %}}

Establece los siguientes atributos en tus nodos:

```rb
node["datadog"]["agent_version"] = "X.Y.Z-1"
node["datadog"]["agent_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

```conf
class { 'datadog_agent':
      ...
      agent_version => "X.Y.Z-1",
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Añade los siguientes atributos a tu cuaderno de estrategias (en CentOS, esto solo funciona con Ansible 2.4+):

```yaml
datadog_agent_version: "X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

## SUSE

### CLI

```shell
sudo zypper --no-gpg-check refresh datadog && sudo zypper install --oldpackage datadog-agent-1:X.Y.Z-1
```

### Herramientas de gestión de configuración

{{< tabs >}}
{{% tab "Chef" %}}

Establece los siguientes atributos en tus nodos:

```rb
node["datadog"]["agent_version"] = "1:X.Y.Z-1"
node["datadog"]["agent_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

El módulo de Datadog no es compatible con SUSE.

{{% /tab %}}
{{% tab "Ansible" %}}

Añade los siguientes atributos a tu cuaderno de estrategias:

```yaml
datadog_agent_version: "1:X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

[1]: /es/agent/faq/agent-downgrade-major/
[2]: https://github.com/DataDog/chef-datadog/tree/3.x
[3]: https://github.com/DataDog/puppet-datadog-agent/tree/2.x
[4]: https://github.com/DataDog/ansible-datadog/tree/3.x