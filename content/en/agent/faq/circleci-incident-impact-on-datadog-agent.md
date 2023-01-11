---
title: Impact of the CircleCI Security Incident on the Datadog Agent
kind: faq
---

On January 4th, 2023, Datadog was notified by CircleCI that they were investigating a [security incident][1] that may have led to leaking stored secrets. Datadog identified a single secret stored in CircleCI that could theoretically be misused by a potential attacker, an old RPM GNU Privacy Guard (GPG) private signing key and its passphrase. This page documents the implications of the potential leak and the measures Datadog is taking to mitigate any risks to our customers.

<div class="alert alert-info">
<strong>Note</strong>: As of January 11th, 2023, Datadog has no indication that the key was actually leaked or misused, but we are still taking the following actions out of an abundance of caution.
</div>

## The affected key

The RPM GPG signing key has fingerprint `60A389A44A0C32BAE3C03F0B069B56F54172A230`, and is accessible in [our signing keys location][2]. This key was historically used to sign Agent 5 releases and Agent 6 releases up to (and including) 6.13.0.

<div class="alert alert-info">
<strong>Note</strong>: Official Datadog repositories were <strong>not</strong> compromised. The signing key, if actually leaked, could be used to construct an RPM package that looks like it's from Datadog but it would not be enough to place such a package in our official package repositories.
</div>

## Am I affected?

You don't need to take any action if:

* You're installing Agent with Datadog packages on macOS, Windows, Debian/Ubuntu
* You're using the Container Agent
* You're on an RPM-based Linux distribution (RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, SUSE/SLES, Fedora), but your system doesn't trust the affected GPG key (see below on how to check)

Datadog recommends you take action if:
* You're on an RPM-based Linux distribution (RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, SUSE/SLES, Fedora), **and** your system trusts the affected GPG key

## Does my system trust the affected key?

Two places need to be checked to verify if your system trusts the affected key: the RPM database and the Datadog repo file. If either one of these is identified as trusting the key, we recommend taking the actions listed in the following sections. If neither of these is identified as trusting the key, no further action is needed.

### Verifying if the key is imported in the RPM database

Run the following command:

```bash
$ rpm -q gpg-pubkey-4172a230-55dd14f6
```

If the command exits with 0 and prints `gpg-pubkey-4172a230-55dd14f6`, your system trusts the affected key, otherwise, it doesn't (it will exit with a non-0 exit code and print a message like `package gpg-pubkey-4172a230-55dd14f6 is not installed`).

### Verifying if the key is used in the Datadog repo file

In default installations, the Datadog repo file can be found at:

* `/etc/yum.repos.d/datadog.repo` on RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux and Fedora
* `/etc/zypp/repos.d/datadog.repo` on OpenSUSE and SLES

If the repo file contains a reference to one of these lines under the `gpgkey` entry, your system trusts the affected key:

* `https://s3.amazonaws.com/public-signing-keys/DATADOG_RPM_KEY.public`
* `https://keys.datadoghq.com/DATADOG_RPM_KEY.public`
* `https://s3.amazonaws.com/yum.datadoghq.com/DATADOG_RPM_KEY.public`
* `https://yum.datadoghq.com/DATADOG_RPM_KEY.public`

(The easy way to check is to see if there's an entry that ends with `DATADOG_RPM_KEY.public`).

## Taking action

Datadog recommends that all customers ensure that their systems stop trusting the affected key. If you find out that your system trusts the key based on at least one of the above criteria, here's how you can make your system stop trusting it:

To delete the key from the RPM database, run the following command:

```bash
$ sudo rpm --erase gpg-pubkey-4172a230-55dd14f6
```

To delete the key from the Datadog repo file, remove the `gpgkey` line that ends with `DATADOG_RPM_KEY.public`. If this was the only `gpgkey` entry in your repo file, replace it with `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public`. Note that this has implications explained in the section [Implications of no Longer Trusting the Affected Key](#implications-of-no-longer-trusting-the-affected-key).

### Usage of automation tools

Usage of automation tools like the Datadog Ansible role (see the full list in [What Datadog is doing to mitigate the implications](#what-datadog-is-doing-to-mitigate-the-implications)) might reverse the manual changes recommended above. Until we release new versions that fix this, we recommend adding these manual changes to your automation tool runbooks.

### Verifying installed Agent packages

If the GPG key was leaked, it is possible for an attacker to build a package that RPM will verify as coming from Datadog and install it on the system. Out of an abundance of caution, Datadog also recommends that you verify that all packages on your system signed by the affected key were built by Datadog. You can run [this script][3] to verify that:

```bash
$ curl -o /tmp/rpm_check.sh https://docs.datadoghq.com/resources/sh/rpm_check.sh && chmod +x /tmp/rpm_check.sh
$ /tmp/rpm_check.sh
```

The script will:

* Verify that any installed Datadog packages signed by the affected key were indeed built by Datadog by verifying the full GPG signature of RPM headers and payload.
* Search for any packages signed by the affected key that weren't built by Datadog.

Lines starting with `[ ERROR ]` should be reported to [Datadog Support][4] along with the full script output.

## Implications of no longer trusting the affected key

* If your system uses Agent 7, there is no implication. Agent 7 packages were never signed with the affected key.
* Your system will no longer be able to install Agent 6 < 6.14.0. We recommend upgrading to Agent 6 >= 6.14.0 or Agent 7.
* If your system uses Agent 5, you will no longer be able to install any currently released Agent 5 version.

## What Datadog is doing to mitigate the implications

* We're working towards releasing a new Agent 5 version for CentOS/RHEL signed with the [current RPM signing key](https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public), `C6559B690CA882F023BDF3F63F4D1729FD4BF915`.
* We're working on new releases to Agent installation methods to ensure they make systems safe by explicitly removing the affected key from the RPM database and the Datadog repo file. We will be updating this section as we release the new versions:
  * Datadog Ansible role: [https://github.com/DataDog/ansible-datadog/][5]
  * Datadog Chef recipe: [https://github.com/DataDog/chef-datadog][6]
  * Datadog Puppet module: [https://github.com/DataDog/puppet-datadog-agent][7]
  * Datadog Saltstack formula: [https://github.com/DataDog/datadog-formula][8]
  * The set of Datadog Agent 6/7 Linux install scripts:
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh][9]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh][10]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script.sh][11] (this one is deprecated and no longer recommended to use, but we will update it as well)
  * The Datadog Agent 5 Linux install script: [https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh][12]

[1]: https://circleci.com/blog/january-4-2023-security-alert/
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY.public
[3]: /resources/sh/rpm_check.sh
[4]: /help/
[5]: https://github.com/DataDog/ansible-datadog/
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/puppet-datadog-agent
[8]: https://github.com/DataDog/datadog-formula
[9]: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh
[10]: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh
[11]: https://s3.amazonaws.com/dd-agent/scripts/install_script.sh
[12]: https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh
