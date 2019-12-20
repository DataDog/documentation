---
title: Downgrade the Agent v6 to a prior minor version
kind: faq
aliases:
- /agent/faq/downgrade-datadog-agent
---

For DEB or RPM packages of the Datadog Agent, find below instructions to downgrade the Datadog Agent to version `6.X.Y`.

**Note**: These instructions only work for Datadog Agent version 6.x and above.

## Debian/Ubuntu

### CLI

```
sudo apt-get update && sudo apt-get install --allow-downgrades datadog-agent=1:6.X.Y-1
```

**Note**: If the option `--allow-downgrades` doesn't exist for your apt version, you can use `--force-yes` instead.

### Configuration management tools

{{< tabs >}}
{{% tab "Chef Cookbook" %}}

Set the following attributes on your nodes:

```rb
node["datadog"]["agent6_version"] = "1:6.X.Y-1"
node["datadog"]["agent6_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

```
class { 'datadog_agent':
      ...
      agent_version => “1:6.X.Y-1”,
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Add the following attributes in your playbook:

```yaml
datadog_agent_version: "1:6.X.Y-1"
datadog_agent_allow_downgrade: true
```

{{% /tab %}}
{{< /tabs >}}

## RHEL/CentOS/Amazon Linux

### CLI

```
sudo yum clean expire-cache metadata && sudo yum downgrade datadog-agent-6.X.Y-1
```

### Configuration management tools

{{< tabs >}}
{{% tab "Chef Cookbook" %}}

Set the following attributes on your nodes:

```rb
node["datadog"]["agent6_version"] = "6.X.Y-1"
node["datadog"]["agent6_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

```
class { 'datadog_agent':
      ...
      agent_version => “6.X.Y-1”,
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Add the following attributes in your playbook (on CentOS, this only works with Ansible 2.4+):

```yaml
datadog_agent_version: "6.X.Y-1"
datadog_agent_allow_downgrade: true
```

{{% /tab %}}
{{< /tabs >}}

## SUSE

### CLI

```
sudo zypper --no-gpg-check refresh datadog && sudo zypper install --oldpackage datadog-agent-1:6.X.Y-1
```

### Configuration management tools

{{< tabs >}}
{{% tab "Chef Cookbook" %}}

Datadog's cookbook doesn’t support SUSE.

{{% /tab %}}
{{% tab "Puppet" %}}

Datadog's module doesn’t support SUSE.

{{% /tab %}}
{{% tab "Ansible" %}}

Add the following attributes in your playbook:

```yaml
datadog_agent_version: "1:6.X.Y-1"
datadog_agent_allow_downgrade: true
```

{{% /tab %}}
{{< /tabs >}}
