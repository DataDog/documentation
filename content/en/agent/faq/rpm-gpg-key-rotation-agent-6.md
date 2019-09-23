---
title: RPM GPG Key Rotation for Agent v6
kind: faq
---

Starting with v6.14.0, the Agent RPM packages are signed with a new GPG key.

As a common best practice, we periodically update our GPG key.

Hosts using RPM packages located in the [Datadog Yum repository][1] to install or upgrade the Agent v6.14.0+ are affected by this change and need to trust this new key by importing the associated public key in their hosts' keyrings.

Trying to install or upgrade the Agent package without trusting the new key results in `NOKEY` errors when installing the package.

The fingerprint of the associated public key is: `A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`.

If you're using the latest version for one of the following officially supported install methods, then your hosts will automatically trust the new key and no further action is needed.

* [Agent installation page][2]

* [Chef cookbook][3]

* [Ansible role][4]

* [Puppet module][5]

* [SaltStack formula][6]


## How to check if a host trusts the new GPG key

To check that a particular host does trust the new key, run this command on the host:
```bash
rpm -q gpg-pubkey-e09422b3
```

If the new key is trusted, the command has a 0 exit code and outputs:
```bash
gpg-pubkey-e09422b3-57744e9e
```

Otherwise, the command returns a non-0 exit code and the following output:
```bash
package gpg-pubkey-e09422b3 is not installed
```

## How to trust the new GPG key

This step is not required if hosts already trust the new key or if a recent version of an official installation method listed above is used.

### Import command

Run the following commands on the host:

```bash
$ curl -o /tmp/DATADOG_RPM_KEY_E09422B3.public https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public

$ rpm --import /tmp/DATADOG_RPM_KEY_E09422B3.public
```

Then check if the new key is trusted by following the steps in [How to check if a host trusts the new GPG key](#how-to-check-if-a-host-trusts-the-new-gpg-key).

### Yum repository file update

Alternatively, on CentOS, RHEL, and Amazon Linux, if your Yum repository file used to define the Datadog repository (usually called `datadog.repo`) looks like this:

```
[datadog]
name = Datadog, Inc.
baseurl = https://yum.datadoghq.com/stable/6/x86_64/
enabled=1
gpgcheck=1
gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
```

update it to add the new key `https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public` as one of the trusted keys:

```
[datadog]
name = Datadog, Inc.
baseurl = https://yum.datadoghq.com/stable/6/x86_64/
enabled=1
gpgcheck=1
gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
       https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
```

**Note**: This method doesn't work on SUSE-based systems. [Use the import command instead](#import-command).

[1]: https://yum.datadoghq.com/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/chef-datadog
[4]: https://github.com/DataDog/ansible-datadog
[5]: https://github.com/DataDog/puppet-datadog-agent
[6]: https://github.com/DataDog/datadog-formula
