---
title: Downgrade the Agent to a prior minor version
kind: faq
further_reading:
---

For DEB or RPM package of the Datadog Agent, find below instructions to downgrade the Datadog Agent to a version `6.X.Y`.

**Note**: Those instructions works only for Datadog Agent version 6.x and above.

## Debian/Ubuntu

### CLI

```
sudo apt-get update && sudo apt-get install --force-yes datadog-agent=1:6.X.Y-1
```

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

Add the following attributes in you playbook:

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

Add the following attributes in you playbook (on centos this will only work with ansible 2.4 and up):

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

Datadog cookbook doesn’t support SUSE.

{{% /tab %}}
{{% tab "Puppet" %}}

Datadog Module doesn’t support SUSE at the moment

{{% /tab %}}
{{% tab "Ansible" %}}

Add the following attributes in you playbook:

```yaml
datadog_agent_version: "1:6.X.Y-1"
datadog_agent_allow_downgrade: true
```

{{% /tab %}}
{{< /tabs >}}

