---
title: RPM GPG key rotation for Agent 6 packages
kind: faq
---

Starting with the 6.14.0 release, the RPM packages of the Agent are signed with a new GPG key.

Hosts which are using our RPM packages located in our [yum repository][1] and want to install or upgrade the Agent 6.14.0 or later are affected by this change and need to trust this new key by importing the associated public key in their hosts' keyrings.

Trying to install or upgrade the Agent package without trusting the new key will result in `NOKEY` errors when installing the package.

The fingerprint of the associated public key is: `A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`.

If you're using the latest version of one of the following officially supported install methods:

* the [Agent installation page][2],

* the `datadog` [chef cookbook][3],

* the `Datadog.datadog` [ansible role][4],

* the `datadog_agent` [puppet module][5],

* the `datadog` [saltstack formula][6],

then your hosts will automatically trust the new key, and no further action needs to be done to be able to install Agent 6 packages signed with the new key.

## How to check if a host trusts the new GPG key

To check that a particular host does trust the new key, run this command on the host:
```bash
rpm -q gpg-pubkey-e09422b3
```

If the new key is indeed trusted, the command has a 0 exit code and its output is:
```bash
gpg-pubkey-e09422b3-57744e9e
```

Otherwise, the command will return with a non-0 exit code and the following output:
```bash
package gpg-pubkey-e09422b3 is not installed
```

## How to manually trust the new GPG key

If you want to manually make a host trust the new key, run the following command on the host:

```bash
rpm --import https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
```

You can then check that the new key is indeed trusted by following the steps in the [How to check if a host trusts the new GPG key](#how-to-check-if-a-host-trusts-the-new-GPG-key) section.

[1]: https://yum.datadoghq.com/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/chef-datadog
[4]: https://github.com/DataDog/ansible-datadog
[5]: https://github.com/DataDog/puppet-datadog-agent
[6]: https://github.com/DataDog/datadog-formula
