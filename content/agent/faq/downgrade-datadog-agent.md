---
title: Downgrade the Agent between two version 6 minors versions
kind: faq
further_reading:
---

If you are using the DEB or RPM package of the version `6.<VERSION>` of Agent and want to downgrade to the version `6.<NEW_VERSION>`

**Note**: Those instructions works only for Datadog Agent version 6.x and above.

## Debian/Ubuntu

### CLI

```
sudo apt-get update && sudo apt-get install --force-yes datadog-agent=1:6.<NEW_VERSION>
```

### Configuration management tools

{{< tabs >}}
{{% tab "Chef Cookbook" %}}

Set the following attributes on your nodes:

```rb
node["datadog"]["agent6_version"] = "1:6.<NEW_VERSION>"
node["datadog"]["agent6_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

```
class { 'datadog_agent':
      ...
      agent_version => “1:6.<NEW_VERSION>”,
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Add the following attributes in you playbook:

```yaml
datadog_agent_version: "1:6.<NEW_VERSION>"
datadog_agent_allow_downgrade: true
```

{{% /tab %}}
{{< /tabs >}}

## RHEL/CentOS/Amazon Linux

### CLI

```
sudo yum clean expire-cache metadata && sudo yum downgrade datadog-agent-6.<NEW_VERSION>
```

### Configuration management tools

{{< tabs >}}
{{% tab "Chef Cookbook" %}}

Set the following attributes on your nodes:

```rb
node["datadog"]["agent6_version"] = "6.<NEW_VERSION>"
node["datadog"]["agent6_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

```
class { 'datadog_agent':
      ...
      agent_version => “6.<NEW_VERSION>”,
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Add the following attributes in you playbook (on centos this will only work with ansible 2.4 and up):

```yaml
datadog_agent_version: "6.<NEW_VERSION>"
datadog_agent_allow_downgrade: true
```

{{% /tab %}}
{{< /tabs >}}

## SUSE

### CLI

```
sudo zypper --no-gpg-check refresh datadog && sudo zypper install --oldpackage datadog-agent-1:6.<NEW_VERSION>
```

### Configuration management tools

{{< tabs >}}
{{% tab "Chef Cookbook" %}}

Datadog cookbook doesn’t support SUSE.

{{% /tab %}}
{{% tab "Puppet" %}}

Datadog cookbook doesn’t support SUSE at the moment

{{% /tab %}}
{{% tab "Ansible" %}}

Add the following attributes in you playbook:

```yaml
datadog_agent_version: "1:6.<NEW_VERSION>"
datadog_agent_allow_downgrade: true
```

{{% /tab %}}
{{< /tabs >}}

