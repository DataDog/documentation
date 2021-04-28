---
title: RPM GPG Key Rotation
kind: faq
---

Starting with v6.14.0, the Agent RPM packages are signed with a different GPG key. As a common best practice, Datadog periodically updates the GPG key.

Hosts using RPM packages located in the [Datadog Yum repository][1] are affected by this change and need to trust the key by importing the associated public key in their hosts' keyrings.

Trying to install or upgrade the Agent package without trusting the key results in `NOKEY` errors when installing the package.

The fingerprint of the associated public key is: `A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`.

If you're using the latest version for one of the following officially supported install methods, your hosts will automatically trust the key and no further action is needed.

* [Agent installation page][2]
* [Chef cookbook][3]
* [Ansible role][4]
* [Puppet module][5]
* [SaltStack formula][6]

## Check if a host trusts the GPG key

To check if a particular host trusts the key, run this command on the host:

```bash
rpm -q gpg-pubkey-e09422b3
```

If the key is trusted, the command has a 0 exit code and outputs:

```bash
gpg-pubkey-e09422b3-57744e9e
```

Otherwise, the command returns a non-0 exit code and the following output:

```bash
package gpg-pubkey-e09422b3 is not installed
```

## Trust the GPG keys

This step is not required if hosts already trust the keys or if a recent version of an official installation method is used.

### Import command

Run the following commands on the host:

```bash
$ curl -o /tmp/DATADOG_RPM_KEY_CURRENT.public https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
$ curl -o /tmp/DATADOG_RPM_KEY_FD4BF915.public https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
$ curl -o /tmp/DATADOG_RPM_KEY_E09422B3.public https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public

$ rpm --import /tmp/DATADOG_RPM_KEY_CURRENT.public
$ rpm --import /tmp/DATADOG_RPM_KEY_FD4BF915.public
$ rpm --import /tmp/DATADOG_RPM_KEY_E09422B3.public
```

Then check if the keys are trusted by following the steps in [Check if a host trusts the GPG key](#check-if-a-host-trusts-the-gpg-key).

### Yum repository file update

On CentOS, RHEL, and Amazon Linux, if your Yum repository file is used to define the Datadog repository (`datadog.repo`), update it to add the key as a trusted key:

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
       https://keys.datadoghq.com/DATADOG_RPM_KEY.public
```

{{% /tab %}}
{{< /tabs >}}

**Note**: due to a [bug in dnf][7], use `repo_gpgcheck=0` instead of `repo_gpgcheck=1` on RHEL/CentOS 8.1.

**Note**: This method doesn't work on SUSE-based systems. Use the [import command](#import-command) instead.

[1]: https://yum.datadoghq.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/chef-datadog
[4]: https://github.com/DataDog/ansible-datadog
[5]: https://github.com/DataDog/puppet-datadog-agent
[6]: https://github.com/DataDog/datadog-formula
[7]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
