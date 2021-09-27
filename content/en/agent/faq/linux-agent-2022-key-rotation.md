---
title: 2022 Linux Agent Key Rotation
kind: faq
---

As a common best practice, Datadog periodically rotates the keys and certificates used to sign our Agent packages. The following GPG keys, used to sign the Agent RPM and DEB packages, reach their end-of-life in June 2022 and will be rotated in April 2022:

- The RPM signing key with hash [`A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`][1] will be rotated in April 4th 2022 and will be replaced by the key with hash [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][2]
- The DEB signing key with hash [`A2923DFF56EDA6E76E55E492D3A80E30382E94DE`][3] will be rotated in April 18th 2022 and will be replaced by the key with hash `D75CEA17048B9ACBF186794B32637D44F14F620E`[4]

Customers using Datadog's RPM or DEB packages might require a manual action to import the new key on their systems in order to install or upgrade the Agent after the rotation takes place.

<div class="alert alert-info">
Note that this DOES NOT affect the functionality of already running Agents, and only limits the ability to install or upgrade to a newer version of the Agent. This also doesn't affect Windows or MacOS Agents, nor Dockerized Linux Agents.
</div>

If you're using one of the following install methods, your hosts trust the key automatically and no further action is needed:

* [Agent install script][5] v1.5.0 (released Jun 29, 2021)
* [Chef cookbook][6] v4.11.0 (released Aug 10, 2021)
* [Ansible role][7] v4.9.0 (released May 6, 2021)
* [Puppet module][8] v3.13 (released Aug 11, 2021)
* [SaltStack formula][9] v3.4 (released Aug 12, 2021)
* [Elastic Beanstalk][10] config templates updated as of Mar 29, 2021 (should contain `DATADOG_RPM_KEY_FD4BF915.public` under `gpgkey`)
* Containerized Agents (Docker/Kubernetes): No action needed on any version

Additionally, if you are using the DEB version of the Agent version 7.31.0 or greater, your hosts should also trust the new key autmatically.

If unsure, refer to the steps in [Check if a host trusts the new GPG key](#check-if-a-host-trusts-the-new-gpg-key).

Trying to install or upgrade the Agent package without trusting the new key will result in `NOKEY` errors when installing the RPM package and `NO_PUBKEY` errors when installing the DEB package.

For hosts running older versions of the install methods listed above or older versions of the DEB package, we recommend you update your install method to the last available version. Alternatively, for Debian/Ubuntu users, update the Agent to version 7.31.0 or greater. Otherwise, you can also add the new keys manually following these instructions:

### Manual update

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Run the following commands on the host:

```bash
$ wget -qO - https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo apt-key add -
```

{{% /tab %}}
{{% tab "RedHat/CentOS" %}}

Edit the `/etc/yum.repos.d/datadog.repo` and make sure it includes both the old and new keys in the `gpgkey` section:

```
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY.public
```

{{% /tab %}}
{{% tab "SUSE" %}}

Edit the `/etc/zypp/repos.d/datadog.repo` and make sure it includes both the old and new keys in the `gpgkey` section:

```
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY.public
```

{{% /tab %}}
{{< /tabs >}}

## Check if a host trusts the new GPG key


{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Run the following commands on the host:

```bash
$ apt-key list
```

And check the output for Datadog's key fingerprint `F14F620E` (sometimes a space is included: `F14F 620E`).

{{% /tab %}}
{{% tab "RedHat/CentOS" %}}

Run the following commands on the host:

```bash
$ grep DATADOG_RPM_KEY_FD4BF915.public /etc/yum.repos.d/*datadog*.repo
```

And check the output is not empty.

{{% /tab %}}
{{% tab "SUSE" %}}

Run the following commands on the host:

```bash
$ grep DATADOG_RPM_KEY_FD4BF915.public /etc/zypp/repos.d/datadog.repo
```

And check the output is not empty.

{{% /tab %}}
{{< /tabs >}}


[1]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog
[8]: https://github.com/DataDog/puppet-datadog-agent
[9]: https://github.com/DataDog/datadog-formula
[10]: https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk
