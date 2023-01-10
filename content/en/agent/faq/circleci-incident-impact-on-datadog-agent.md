---
title: Impact of the CircleCI Security Incident on the Datadog Agent
kind: faq
---

On January 4th, 2023, we were notified by CircleCI that they were investigating a [security incident](https://circleci.com/blog/january-4-2023-security-alert/) that may have led to leaking stored secrets. We identified a single secret stored in CircleCI that could theoretically be misused by a potential attacker, an old RPM GNU Privacy Guard (GPG) private signing key and its passphrase. This page documents the implications of the potential leak and the measures we are taking to mitigate any risks to our customers.

<div class="alert alert-info">
<strong>Note</strong>: As of January 10th, 2023, we have no indication that the key was actually leaked or misused, but we are still taking the following actions out of an abundance of caution.
</div>

## The Affected Key

The RPM GPG signing key has fingerprint `4172A230`, and is accessible in [our signing keys location](https://keys.datadoghq.com/DATADOG_RPM_KEY.public). This key was historically used to sign Agent 5 releases and Agent 6 releases up to (and including) 6.13.0.

<div class="alert alert-info">
<strong>Note</strong>: Official Datadog repositories were **not** compromised. The signing key, if actually leaked, could be used to construct an RPM package that looks like it's from Datadog.
</div>

## Am I Affected?

You don't need to take any action if:

* You're installing Agent with Datadog packages on macOS, Windows, Debian/Ubuntu
* You're using the Container Agent
* You're on an RPM-based Linux distribution (RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, SUSE/SLES, Fedora), but your system doesn't trust the affected GPG key (see below on how to check)

We recommend you take action if:
* You're on an RPM-based Linux distribution (RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, SUSE/SLES, Fedora), and your system trusts the affected GPG key

## Does my System Trust the Affected Key?

Two places need to be checked to verify if your system trusts the affected key: the RPM database and the Datadog repofile. If either one of these is identified as trusting the key, we recommend taking the actions listed in the following sections. If neither of these is identified as trusting the key, no further action is needed.

### Verifying if the key is imported in the RPM database

Run the following command:

```bash
$ rpm -q gpg-pubkey-4172a230-55dd14f6
```

If the command exits with 0 and prints `gpg-pubkey-4172a230-55dd14f6`, your system trusts the affected key, otherwise, it doesn't (it will exit with a non-0 exit code and print a message like `package gpg-pubkey-4172a230-55dd14f6 is not installed`).

### Verifying if the key is used in the Datadog repofile

In default installations, the Datadog repofile can be found at:

* `/etc/yum.repos.d/datadog.repo` on RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux and Fedora
* `/etc/zypp/repos.d/datadog.repo` on OpenSUSE and SLES

If the repofile contains a reference to one of these lines under the `gpgkey` entry, your system trusts the affected key:

* `https://s3.amazonaws.com/public-signing-keys/DATADOG_RPM_KEY.public`
* `https://keys.datadoghq.com/DATADOG_RPM_KEY.public`
* `https://s3.amazonaws.com/yum.datadoghq.com/DATADOG_RPM_KEY.public`
* `https://yum.datadoghq.com/DATADOG_RPM_KEY.public`

(The easy way to check is to see if there's an entry that ends with `DATADOG_RPM_KEY.public`).

## Taking Action

We recommend that all customers ensure that their systems stop trusting the affected key. If you find out that your system trusts the key based on at least one of the above criteria, here's how you can make your system stop trusting it:

To delete the key from the RPM database, run the following command:

```bash
$ sudo rpm --erase gpg-pubkey-4172a230-55dd14f6
```

To delete the key from the Datadog repofile, remove the `gpgkey` line that ends with `DATADOG_RPM_KEY.public`. If this was the only `gpgkey` entry in your repofile, replace it with `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public`. Note that this has implications explained in the section [Implications of no Longer Trusting the Affected Key](#implications-of-no-longer-trusting-the-affected-key).

### Usage of Automation Tools

Usage of automation tools like the Datadog Ansible role (see full list in [What we're doing to mitigate the implications](#what-were-doing-to-mitigate-the-implications)) might reverse the manual changes recommended above. Until we release new versions that fix this, we recommend adding these manual changes to your automation tool runbooks.

### Verifying Installed Agent Packages

If the GPG key was leaked, it is possible for an attacker to build a package that RPM will verify as coming from Datadog and install it on the system. Out of abundance of caution, we also recommend that you verify that all packages on your system signed by the affected key were built by Datadog. You can run [this script](/resources/sh/rpm_check.sh) to verify that:

```bash
$ curl -o /tmp/rpm_check.sh https://docs.datadoghq.com/resources/sh/rpm_check.sh && chmod +x /tmp/rpm_check.sh
$ /tmp/rpm_check.sh
```

The script will:

* Verify that any installed Datadog packages signed by the affected key were indeed built by Datadog by verifying the full GPG signature of RPM headers and payload.
* Search for any packages signed by the affected key that weren't built by Datadog.

Lines starting with `[ ERROR ]` are considered suspicious and should be reported to [Datadog Support](https://www.datadoghq.com/support/) along with the full script output.

## Implications of no Longer Trusting the Affected Key

* If your system uses Agent 7, there is no implication. Agent 7 packages were never signed with the affected key.
* Your system will no longer be able to install Agent 6 < 6.14.0. We recommend upgrading to Agent 6 >= 6.14.0 or Agent 7.
* If your system uses Agent 5, you will no longer be able to install any currently released Agent 5 version.

## What We're Doing to Mitigate the Implications

* We're working towards releasing a new Agent 5 version signed with the [current RPM signing key](https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public), `FD4BF915`.
* We're working on new releases to Agent installation methods to ensure they make systems safe by explicitly removing the affected key from the RPM database and the Datadog repofile. We will be updating this section as we release the new versions:
  * Datadog Ansible role: https://github.com/DataDog/ansible-datadog/
  * Datadog Chef recipe: https://github.com/DataDog/chef-datadog
  * Datadog Puppet module: https://github.com/DataDog/puppet-datadog-agent
  * Datadog Saltstack formula: https://github.com/DataDog/datadog-formula
  * The set of Datadog Agent 6/7 Linux install scripts:
    * https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh
    * https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh
    * https://s3.amazonaws.com/dd-agent/scripts/install_script.sh (this one is deprecated and no longer recommended to use, but we will update it as well)
  * The Datadog Agent 5 Linux install script: https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh
