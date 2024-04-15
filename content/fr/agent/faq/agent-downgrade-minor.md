---
aliases:
- /fr/agent/faq/downgrade-datadog-agent

title: Rétrograder lʼAgent vers une version mineure antérieure
---

Pour les paquets DEB ou RPM de lʼAgent Datadog, les instructions ci-dessous vous aideront à rétrograder lʼAgent Datadog vers une version mineure antérieure.

Pour rétrograder lʼAgent Datadog vers une version majeure antérieure, suivez les instructions de la [page dédiée][1].

**Remarques** :

* Ces instructions ne fonctionnent que pour lʼAgent Datadog version 6.x et supérieure.
* Les instructions ci-dessous concernant les outils de gestion de la configuration ne fonctionnent qu'avec la dernière version majeure de ces outils : v4.x pour le cookbook Chef, v3.x pour le module Puppet et v4.x pour le rôle Ansible. Si vous utilisez une version antérieure, consultez la documentation de cette version sur les référentiels des outils : [cookbook Chef, v3.x][2], [module Puppet v2.x][3], ou [rôle Ansible v3.x][4].

## Debian/Ubuntu

### Interface de ligne de commande

```shell
sudo apt-get update && sudo apt-get install --allow-downgrades datadog-agent=1:X.Y.Z-1
```

**Remarque** : si l'option `--allow-downgrades` doesn't exist for your apt version, you can use `--force-yes` est utilisée.

### Outils de gestion des configurations

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

Ajoutez les attributs suivants dans votre playbook :

```yaml
datadog_agent_version: "1:X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

## RHEL/CentOS/Amazon Linux

### Interface de ligne de commande

```shell
sudo yum clean expire-cache metadata && sudo yum downgrade datadog-agent-X.Y.Z-1
```

### Outils de gestion des configurations

{{< tabs >}}
{{% tab "Chef" %}}

Définissez les attributs suivants sur vos nœuds :

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

Ajoutez les attributs suivants dans votre playbook (sur CentOS, cela ne fonctionne qu'avec Ansible 2.4+) :

```yaml
datadog_agent_version: "X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

## SUSE

### Interface de ligne de commande

```shell
sudo zypper --no-gpg-check refresh datadog && sudo zypper install --oldpackage datadog-agent-1:X.Y.Z-1
```

### Outils de gestion des configurations

{{< tabs >}}
{{% tab "Chef" %}}

Définissez les attributs suivants sur vos nœuds :

```rb
node["datadog"]["agent_version"] = "1:X.Y.Z-1"
node["datadog"]["agent_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

Le module de Datadog ne prend pas en charge SUSE.

{{% /tab %}}
{{% tab "Ansible" %}}

Ajoutez les attributs suivants dans votre playbook :

```yaml
datadog_agent_version: "1:X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

[1]: /fr/agent/faq/agent-downgrade-major/
[2]: https://github.com/DataDog/chef-datadog/tree/3.x
[3]: https://github.com/DataDog/puppet-datadog-agent/tree/2.x
[4]: https://github.com/DataDog/ansible-datadog/tree/3.x
