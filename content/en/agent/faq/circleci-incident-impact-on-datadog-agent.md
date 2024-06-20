---
title: Impact of the CircleCI Security Incident on the Datadog Agent
---
<details>
  <summary><strong>Page changelog</strong></summary>
  
  <table>
    <tr>
        <td><strong>Date</strong></td>
        <td><strong>Description</strong></td>
    </tr>
    <tr>
        <td>13 Jan 2023</td>
        <td>Initial publish</td>
    </tr>
    <tr>
        <td>16 Jan 2023</td>
        <td>Updated <code>rpm_check</code> script v1.1.0, edits for clarity</td>
    </tr>
    <tr>
        <td>17 Jan 2023</td>
        <td>Updated <a href="/resources/sh/rpm_check.sh"><code>rpm_check</code></a> script v1.2.0, clearer identify and remedy steps</td>
    </tr>
    <tr>
        <td>3 Feb 2023</td>
        <td>Clarify which Agents 5 versions are signed with the affected key</td>
    </tr>
</table>
</details>

<div class="alert alert-warning"><strong>Summary</strong>: Check your RPM-based Linux hosts (RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, SUSE/SLES, Fedora) to find and fix any that trust the key with fingerprint <code>60A389A44A0C32BAE3C03F0B069B56F54172A230</code>.</a></div>

On January 4th, 2023, Datadog was notified by CircleCI that they were investigating a [security incident][1] that may have led to leaking of stored secrets. Datadog identified a single secret stored in CircleCI that could theoretically be misused by a potential attacker, an old RPM GNU Privacy Guard (GPG) private signing key and its passphrase. This page provides information about the implications of the potential leak, actions you should take on your hosts, and the measures Datadog is taking to mitigate any risks to our customers.

<div class="alert alert-info">
<strong>Note</strong>: As of January 16th, 2023, Datadog has no indication that the key was actually leaked or misused, but we are still taking and advising the following actions out of an abundance of caution.
</div>

## The affected key

The impacted RPM GPG signing key has the fingerprint `60A389A44A0C32BAE3C03F0B069B56F54172A230`, and is accessible in [our signing keys location][2]. This key was historically used to sign:

* Agent 5 releases up to and including v5.32.8 and Agent 6 releases up to and including v6.13.0 (`datadog-agent` package)
* Standalone DogStatsD 6 releases and Standalone DogStatsD 7 releases up to and including v7.23.1 (`datadog-dogstatsd` package)

<div class="alert alert-info">
<strong>Note</strong>: Official Datadog repositories were <strong>not</strong> compromised. The signing key, if actually leaked, could be used to construct an RPM package that looks like it is from Datadog, but it would not be enough to place such a package in our official package repositories. To be effective, a hypothetical attacker with the affected key would need to be able to upload the constructed RPM package to a repository used by your hosts.
</div>

## Finding affected hosts

The incident can affect hosts running **RPM-based Linux distributions**, including RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, SUSE/SLES, and Fedora. Hosts running other operating systems such as macOS, Windows, Debian, and Ubuntu, and Container Agents are not affected.

Before you start, if you have a large infrastructure, **prioritize your search** for hosts that trust the key. Because of the variety of ways packages can be installed and updated over time, Datadog recommends you check **all** RPM-based Linux hosts with a Datadog package installed. To help you prioritize which hosts to check first, consider the following guidance. The following scenarios are **highly likely** to be affected:
   * Agent v5 or v6
   * Standalone DogStatsD v6 or v7.23.2 and earlier

   On RPM-based Linux hosts, the following scenarios are **unlikely** to be affected, but still worth checking your hosts:
   * Agent v7
   * Standalone DogStatsD v7.23.2+.

   The following scenarios are **not** affected:
   * The Agent was installed with Datadog packages on macOS, Windows, Debian, or Ubuntu.
   * The host uses the Container Agent.

Check each host to see if it trusts the affected key from either the RPM database or the Datadog repo file, or both:

1. Check the RPM database by running the following command:

   ```bash
   $ rpm -q gpg-pubkey-4172a230-55dd14f6
   ```

   **The host trusts the key and requires action** if the command runs successfully and prints `gpg-pubkey-4172a230-55dd14f6`.**The host does not trust the key in the RPM database** if the command fails, exiting with a non-0 exit code and outputting a message like `package gpg-pubkey-4172a230-55dd14f6 is not installed`.

2. Check the Datadog repo file. The default location for the file is:

   - RHEL, CentOS, Rocky Linux, AlmaLinux, Amazon Linux, and Fedora: `/etc/yum.repos.d/datadog.repo`
   - OpenSUSE and SLES:  `/etc/zypp/repos.d/datadog.repo`

   If the repo file mentions `DATADOG_RPM_KEY.public` under the `gpgkey` entry as shown in the following examples, **the host trusts the affected key and requires action**:

   * `https://s3.amazonaws.com/public-signing-keys/DATADOG_RPM_KEY.public`
   * `https://keys.datadoghq.com/DATADOG_RPM_KEY.public`
   * `https://s3.amazonaws.com/yum.datadoghq.com/DATADOG_RPM_KEY.public`
   * `https://yum.datadoghq.com/DATADOG_RPM_KEY.public`

If either one or both of these is identified as trusting the key, take the actions listed in the following sections to secure the affected host. If neither of these is identified as trusting the key, no further action is needed.

## Securing the affected hosts

Ensure that your hosts **stop trusting the affected key**. If the previous steps indicated that a host trusts the key, follow these steps:

1. If you use configuration automation tools or plugins, such as the Ansible Datadog role, update them to the latest version listed in [What Datadog is doing](#what-datadog-is-doing).

   Remaining on older versions of these automation tools or plugins might reverse your remediation efforts. If you can't yet update to the new fixed versions, add the manual key deletion steps (step 3 and 4) to your automation tool runbooks, and ensure these run _after_ the Datadog tools and plugins in your runbook order.

2. For hosts that are set up using the official Datadog install scripts, run the latest version of the install script to untrust the key and provision the updated repo files.

3. If running `rpm -q gpg-pubkey-4172a230-55dd14f6` still detects the key, delete the key from the RPM database and stop trusting it by running the following command:

   ```bash
   $ sudo rpm --erase gpg-pubkey-4172a230-55dd14f6
   ```

4. If `DATADOG_RPM_KEY.public` is still listed in the repo file, delete the key by removing the `gpgkey` line that ends with `DATADOG_RPM_KEY.public`. If this is the only `gpgkey` entry in your repo file, replace it with `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public`. Read more in the section [Implications of no longer trusting the affected key](#implications-of-no-longer-trusting-the-affected-key).

5. Out of an abundance of caution, verify that Datadog built the packages signed by the affected key on the affected hosts by running [this script][3]:

   ```bash
   $ curl -o /tmp/rpm_check.sh https://docs.datadoghq.com/resources/sh/rpm_check.sh && chmod +x /tmp/rpm_check.sh
   $ /tmp/rpm_check.sh
   ```

   This script verifies that any installed Datadog packages signed by the affected key were built by Datadog and searches for any packages signed by the affected key that weren't built by Datadog.

   If the output contains lines that start with `[ ERROR ]` **report these to [Datadog Support][4]** along with the full script output.

## Implications of no longer trusting the affected key

If the host in question uses Agent 7, there is no implication. Agent 7 packages were never signed with the affected key.

Hosts can no longer install:
- Agents earlier than v6.14.0. Upgrade to at least v6.14.0 or Agent v7.
- Standalone DogStatsD v6 or Standalone DogStatsD earlier than v7.24.0 (`datadog-dogstatsd` packages). Upgrade to Standalone DogStatsD 7.24.0+.
- Agents earlier than v5.32.8. Install Agent v5.32.9+ or upgrade to v6.14.0+ or Agent v7.

## What Datadog is doing

We released a **new Agent 5 RPM** for CentOS/RHEL, [5.32.9-1][5], signed with the [current RPM signing key][6], `C6559B690CA882F023BDF3F63F4D1729FD4BF915`. The RPM is available through the [Agent 5 RPM repository][7].

We released new versions of **Agent installation methods** to ensure they make hosts safe by explicitly removing the affected key from the RPM database and the Datadog repo file:
  * [Datadog Ansible role][8] release [4.18.0][9]
  * [Datadog Chef recipe][10] release [4.16.0][11]
  * [Datadog Puppet module][12] release [3.20.0][13]
  * [Datadog SaltStack formula][14] release [3.5][15]
  * Datadog Agent 6/7 Linux install scripts, released to the following locations with version 1.13.0 at 13:00 UTC on January 12th, 2023:
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh][16]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh][17]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script.sh][18] (Deprecated and no longer recommended, but updated.)
  * [Datadog Agent 5 Linux install script][19] released to its [download location][19] at 16:25 UTC on January 12th, 2023



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
