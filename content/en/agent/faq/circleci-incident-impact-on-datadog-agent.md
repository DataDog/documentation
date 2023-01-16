---
title: Impact of the CircleCI Security Incident on the Datadog Agent
kind: faq
---

On January 4th, 2023, Datadog was notified by CircleCI that they were investigating a [security incident][1] that may have led to leaking of stored secrets. Datadog identified a single secret stored in CircleCI that could theoretically be misused by a potential attacker, an old RPM GNU Privacy Guard (GPG) private signing key and its passphrase. This page documents the implications of the potential leak and the measures Datadog is taking to mitigate any risks to our customers.

<div class="alert alert-info">
<strong>Note</strong>: As of January 16th, 2023, Datadog has no indication that the key was actually leaked or misused, but we are still taking the following actions out of an abundance of caution.
</div>

## The affected key

The impacted RPM GPG signing key has the fingerprint `60A389A44A0C32BAE3C03F0B069B56F54172A230`, and is accessible in [our signing keys location][2]. This key was historically used to sign:

* Agent 5 releases and Agent 6 releases up to (and including) v6.13.0 (`datadog-agent` package)
* Standalone DogStatsD 6 releases and Standalone DogStatsD 7 releases up to (and including) v7.23.1 (`datadog-dogstatsd` package)

<div class="alert alert-info">
<strong>Note</strong>: Official Datadog repositories were <strong>not</strong> compromised. The signing key, if actually leaked, could be used to construct an RPM package that looks like it is from Datadog but it would not be enough to place such a package in our official package repositories. A hypothetical attacker with the affected key would need to be able upload the constructed RPM package to a repository used by the system.
</div>

## Am I affected?

You don't need to take any action if:

* You are installing the Agent with Datadog packages on macOS, Windows, Debian/Ubuntu
* You are using the Container Agent
* You are on an RPM-based Linux distribution (RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, SUSE/SLES, Fedora), but your system doesn't trust the affected GPG key (see below on how to check)

Datadog recommends you take action if:

* You are on an RPM-based Linux distribution (RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, SUSE/SLES, Fedora), **and** your system trusts the affected GPG key

## Does my system trust the affected key?

Two places need to be checked to verify if your system trusts the affected key: the RPM database and the Datadog repo file. If either one of these is identified as trusting the key, we recommend taking the actions listed in the following sections. If neither of these is identified as trusting the key, no further action is needed.

### Verifying if the key is imported in the RPM database

Run the following command:

```bash
$ rpm -q gpg-pubkey-4172a230-55dd14f6
```

* If the command runs successfully and prints `gpg-pubkey-4172a230-55dd14f6`, your system trusts the affected key.
* If the command fails (exiting with a non-0 exit code and outputting a message like `package gpg-pubkey-4172a230-55dd14f6 is not installed`), your system does not trust the affected key.

### Verifying if the key is used in the Datadog repo file

For default installations, the Datadog repo file can be found at:

* `/etc/yum.repos.d/datadog.repo` on RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, and Fedora
* `/etc/zypp/repos.d/datadog.repo` on OpenSUSE and SLES

If the repo file contains a reference to `DATADOG_RPM_KEY.public` under the `gpgkey` entry as in the following examples, your system trusts the affected key:

* `https://s3.amazonaws.com/public-signing-keys/DATADOG_RPM_KEY.public`
* `https://keys.datadoghq.com/DATADOG_RPM_KEY.public`
* `https://s3.amazonaws.com/yum.datadoghq.com/DATADOG_RPM_KEY.public`
* `https://yum.datadoghq.com/DATADOG_RPM_KEY.public`

## Taking action

Datadog recommends that all affected customers ensure that their systems stop trusting the affected key. If you find out that your system trusts the key based on at least one of the above criteria, follow the steps below.

### Delete the key

To delete the key from the RPM database and stop trusting it, run the following command:

```bash
$ sudo rpm --erase gpg-pubkey-4172a230-55dd14f6
```

To delete the key from the Datadog repo file, remove the `gpgkey` line that ends with `DATADOG_RPM_KEY.public`. If this was the only `gpgkey` entry in your repo file, replace it with `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public`. Note that this has implications explained in the section [Implications of no Longer Trusting the Affected Key](#implications-of-no-longer-trusting-the-affected-key).

#### Usage of automation tools

Usage of old versions of automation tools like the Datadog Ansible role (see the full list with updated versions in [What Datadog is doing to mitigate the implications](#what-datadog-is-doing-to-mitigate-the-implications)) might reverse the manual changes recommended above. If you can't yet update to the new versions that fix this, we recommend adding these manual changes to your automation tool runbooks.

### Verify installed packages

Out of an abundance of caution, Datadog also recommends that, on your impacted systems, you verify that all packages signed by the affected key were built by Datadog. You can run [this script][3] to verify that:

```bash
$ curl -o /tmp/rpm_check.sh https://docs.datadoghq.com/resources/sh/rpm_check.sh && chmod +x /tmp/rpm_check.sh
$ /tmp/rpm_check.sh
```

This script will:

* Verify that any installed Datadog packages signed by the affected key were built by Datadog.
* Search for any packages signed by the affected key that weren't built by Datadog.

Lines starting with `[ ERROR ]` should be reported to [Datadog Support][4] along with the full script output.

## Implications of no longer trusting the affected key

* If your system uses Agent 7, there is no implication. Agent 7 packages were never signed with the affected key.
* Your system will no longer be able to install Agent 6 < 6.14.0. We recommend upgrading to Agent 6 >= 6.14.0 or Agent 7.
* Your system will no longer be able to install Standalone DogStatsD 6 and Standalone DogStatsD < 7.24.0 (`datadog-dogstatsd` packages). We recommend upgrading to Standalone DogStatsD >= 7.24.0.
* If your system uses Agent 5, you will no longer be able to install Agent 5 <= 5.32.8. You will only be able to install Agent 5.32.9 or later, or you can upgrade to 6 >= 6.14.0 or Agent 7.

## What Datadog is doing to mitigate the implications

* We've released a new Agent 5 RPM for CentOS/RHEL, [5.32.9-1][5], signed with the [current RPM signing key][6], `C6559B690CA882F023BDF3F63F4D1729FD4BF915`. The RPM is available through the [Agent 5 RPM repository][7].
* We've released new versions of Agent installation methods to ensure they make systems safe by explicitly removing the affected key from the RPM database and the Datadog repo file:
  * Datadog Ansible role: [https://github.com/DataDog/ansible-datadog/][8]
    * Release [4.18.0][9] fixes the issue
  * Datadog Chef recipe: [https://github.com/DataDog/chef-datadog][10]
    * Release [4.16.0][11] fixes the issue
  * Datadog Puppet module: [https://github.com/DataDog/puppet-datadog-agent][12]
    * Release [3.20.0][13] fixes the issue
  * Datadog Saltstack formula: [https://github.com/DataDog/datadog-formula][14]
    * Release [3.5][15] fixes the issue
  * The set of Datadog Agent 6/7 Linux install scripts:
    * All the below scripts were released to the below locations with version 1.13.0 at 13:00 UTC on January 12th, 2023
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh][16]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh][17]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script.sh][18] (this one is deprecated and no longer recommended to use, but we have updated it as well)
  * The Datadog Agent 5 Linux install script: [https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh][19]
    * Released to its [download location][19] at 16:25 UTC on January 12th, 2023

[1]: https://circleci.com/blog/january-4-2023-security-alert/
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY.public
[3]: /resources/sh/rpm_check.sh
[4]: /help/
[5]: https://yum.datadoghq.com/rpm/x86_64/datadog-agent-5.32.9-1.x86_64.rpm
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
[7]: https://yum.datadoghq.com/rpm/x86_64/
[8]: https://github.com/DataDog/ansible-datadog/
[9]: https://github.com/DataDog/ansible-datadog/releases/tag/4.18.0
[10]: https://github.com/DataDog/chef-datadog
[11]: https://github.com/DataDog/chef-datadog/releases/tag/v4.16.0
[12]: https://github.com/DataDog/puppet-datadog-agent
[13]: https://github.com/DataDog/puppet-datadog-agent/releases/tag/v3.20.0
[14]: https://github.com/DataDog/datadog-formula
[15]: https://github.com/DataDog/datadog-formula/releases/tag/3.5
[16]: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh
[17]: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh
[18]: https://s3.amazonaws.com/dd-agent/scripts/install_script.sh
[19]: https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh
