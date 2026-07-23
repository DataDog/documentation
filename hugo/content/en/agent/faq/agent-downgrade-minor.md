---
title: Downgrade the Agent to a Prior Minor Version
aliases:
- /agent/faq/downgrade-datadog-agent
---

For DEB or RPM packages of the Datadog Agent, find the instructions below to downgrade the Datadog Agent to a prior minor version.

To downgrade the Datadog Agent to a prior major version, follow the instructions on the [dedicated page][1].

**Notes**:

* These instructions only work for Datadog Agent version 6.x and above.
* The instructions below for configuration management tools only work with the latest major version of these tools: v4.x for the Chef cookbook, v3.x for the Puppet module, and v4.x for the Ansible role. If you are using a prior version, see the documentation for that version on the tools' repositories: [Chef cookbook v3.x][2], [Puppet module v2.x][3], or [Ansible role v3.x][4].

## Debian/Ubuntu

### CLI

```shell
sudo apt-get update && sudo apt-get install --allow-downgrades datadog-agent=1:X.Y.Z-1
```

**Note**: If the option `--allow-downgrades` doesn't exist for your apt version, you can use `--force-yes` instead.

### Configuration management tools

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

Add the following attributes in your playbook:

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

### Configuration management tools

{{< tabs >}}
{{% tab "Chef" %}}

Set the following attributes on your nodes:

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

Add the following attributes in your playbook (on CentOS, this only works with Ansible 2.4+):

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

### Configuration management tools

{{< tabs >}}
{{% tab "Chef" %}}

Set the following attributes on your nodes:

```rb
node["datadog"]["agent_version"] = "1:X.Y.Z-1"
node["datadog"]["agent_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

Datadog's module doesn't support SUSE.

{{% /tab %}}
{{% tab "Ansible" %}}

Add the following attributes in your playbook:

```yaml
datadog_agent_version: "1:X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

[1]: /agent/faq/agent-downgrade-major/
[2]: https://github.com/DataDog/chef-datadog/tree/3.x
[3]: https://github.com/DataDog/puppet-datadog-agent/tree/2.x
[4]: https://github.com/DataDog/ansible-datadog/tree/3.x
