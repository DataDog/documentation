---
title: 2022 Linux Agent Key Rotation
private: true
aliases:
  - /agent/guide/linux-agent-2022-key-rotation
---

As a common best practice, Datadog periodically rotates the keys and certificates used to sign Datadog's Agent packages. The following GPG keys, used to sign the Agent RPM and DEB packages, reach their end-of-life in June 2022 and will be rotated in April 2022:

- The RPM signing key with hash [`A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`][1] will be rotated on April 11 at 12:00 UTC, 2022 and replaced by the key with hash [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][2]. The first RPM release after that date (6.36 and 7.36) will require the new key to be trusted to be installed.
- The DEB signing key with hash [`A2923DFF56EDA6E76E55E492D3A80E30382E94DE`][3] will be rotated on May 2 at 12:00 UTC, 2022 and replaced by the key with hash [`D75CEA17048B9ACBF186794B32637D44F14F620E`][4]. APT checks the repo metadata signature so the new key needs to be trusted by this date to install any future or existing version of the Agent from `apt.datadoghq.com`.

Customers using Datadog's RPM or DEB packages might require a manual action to import the new key on their systems to install or upgrade the Agent after the rotation takes place.

<div class="alert alert-info">
<strong>Note</strong>: This DOES NOT affect the functionality of already running Agents, and only limits the ability to install or upgrade to a newer version of the Agent. Also, this doesn't affect Dockerized Linux Agents, Windows, or macOS Agents.
</div>

## Install methods that automatically trust the new GPG key

Your host automatically trusts the new key (no further action is required) if you're using one of the following install methods:

- [Agent install script][5] v1.6.0+ (released Jul 26, 2021)
- [Chef cookbook][6] v4.11.0+ (released Aug 10, 2021)
- [Ansible role][7] v4.10.0+ (released May 25, 2021)
- [Puppet module][8] v3.13.0+ (released Aug 11, 2021)
- [SaltStack formula][9] v3.4+ (released Aug 12, 2021)
- [Heroku buildpack][10] v1.26+ (released May 26, 2021)
- [Elastic Beanstalk][11] config templates updated as of Mar 29, 2021 or later (should contain `DATADOG_RPM_KEY_FD4BF915.public` under `gpgkey`)
- Containerized Agents (Docker/Kubernetes) for any version
- Windows/MacOS Agents for any version

Additionally, installing the DEB Agent v6.35.1+ or v7.35.1+ package through `apt` from the `apt.datadoghq.com` repository installs the [`datadog-signing-keys` package](#the-datadog-signing-keys-package) version 1.1.0, which automatically ensures that your host trusts the new key. If you have `datadog-signing-keys` version 1.1.0 or later installed, no further action is needed. Versions of `datadog-signing-keys` older than [version 1.1.0](#datadog-signing-keys-version-110) don't guarantee full preparedness for the key rotation.

If you are installing the DEB Agent package from a different repository or you are not using `apt` (or a similar tool that checks repo metadata signatures), your system doesn't need to know the Datadog signing keys (no further action is needed). However, you may benefit from the [`datadog-signing-keys` package](#the-datadog-signing-keys-package).

If you're unsure if a host trusts the new signing key, you can [check](#check-if-a-host-trusts-the-new-gpg-key).

For hosts running older versions of the install methods listed above or older versions of the DEB package, Datadog recommends updating the install method to the latest version. Alternatively Debian and Ubuntu users can update the Agent to version 7.31.0+. Otherwise, the key can be [manually updated](#manual-update).

## What happens if I don't trust the new key before it is rotated?

Trying to install or upgrade Agent packages using `apt`, `yum`, `dnf` or `zypper` from `apt.datadoghq.com`/`yum.datadoghq.com` without trusting the new key results in an error.

Possible errors include:

```
E: The repository 'https://apt.datadoghq.com stable Release' is not signed.
```
```
E: Package 'datadog-agent' has no installation candidate
```
```
The following signatures couldn't be verified because the public key is not available: NO_PUBKEY
```
```
The GPG keys listed for the "Datadog, Inc." repository are already installed but they are not correct for this package.
Check that the correct key URLs are configured for this repository.
```
```
Public key for datadog-agent-7.35.1-1.x86_64.rpm is not installed. Failing package is: datadog-agent-1:7.35.1-1.x86_64
```
```
Error: GPG check FAILED
```

For `apt`, this applies to both newly released and existing versions of the Agent. For `yum`, `dnf` or `zypper`, existing versions of the Agent can still be installed as long as `repo_gpgcheck=0` is set in the `datadog.repo` file.

This key rotation does not affect installations done by manually downloading the packages and installing them with `dpkg` or `rpm`. This may cause a warning for `rpm`.

## Manual update

Datadog encourages you to use one of the [install methods](#install-methods-that-automatically-trust-the-new-gpg-key) above, which trust the new GPG key as well as all future keys automatically. If this is not an option, use the following instructions to manually download and trust the new key.

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Run the following commands on the host:

```bash
$ curl -o /tmp/DATADOG_APT_KEY_F14F620E https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
$ sudo apt-key add /tmp/DATADOG_APT_KEY_F14F620E
$ sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
$ cat /tmp/DATADOG_APT_KEY_F14F620E | sudo gpg --import --batch --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg
$ sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
```

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Run the following commands on the host:

```
$ curl -o /tmp/DATADOG_RPM_KEY_FD4BF915 https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
$ sudo rpm --import /tmp/DATADOG_RPM_KEY_FD4BF915
```

{{% /tab %}}
{{< /tabs >}}

## Check if a host trusts the new GPG key

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

A host correctly trusts the new key if either one of these conditions is true:

- The file `/usr/share/keyrings/datadog-archive-keyring.gpg` exists and the Datadog source list file (usually `/etc/apt/sources.list.d/datadog.list`) contains the option `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`.
- The Datadog source list file doesn't contain the `signed-by` option, but `datadog-signing-keys` version 1.1.0 or later is installed, which results in the presence of a `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` file.

Files `/usr/share/keyrings/datadog-archive-keyring.gpg` and, optionally, `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` are created either by a supported [installation method](#install-methods-that-automatically-trust-the-new-gpg-key) or by installing the [`datadog-signing-keys` package](#the-datadog-signing-keys-package). Ensure that `datadog-signing-keys` [version 1.1.0](#datadog-signing-keys-version-110) or later is installed unless using one of the [installation method versions listed above](#install-methods-that-automatically-trust-the-new-gpg-key).

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Run the following command on the host:

```bash
$ rpm -qa | grep gpg-pubkey-fd4bf915
```

If the key is trusted, the command has a 0 exit code and outputs:

```
gpg-pubkey-fd4bf915-5f573efe
```

Otherwise, the command returns a non-0 exit code with no output.

Alternatively, check if your `datadog.repo` file contains `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public` as one of the `gpgkey` entries. This key file will be updated with the new key as soon as it is in use.

{{% /tab %}}
{{< /tabs >}}

## The `datadog-signing-keys` package

<div class="alert alert-info"><strong>Note:</strong> This section only applies to DEB Agent package users.</div>

Since Agent v6.31.0 and v7.31.0, all Datadog DEB packages have a soft dependency on the `datadog-signing-keys` package. Since Agent v6.35.1 and v 7.35.1, all Datadog DEB packages have a soft dependency on the `datadog-signing-keys` package version `1.1.0`.

Upon installation, this package:

- Configures APT keys in the `/usr/share/keyrings/datadog-archive-keyring.gpg` keyring and also in `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` when necessary. **This ensures that the upcoming APT repository signing key is trusted.** Using the package [`datadog-signing-keys` version 1.1.0](#datadog-signing-keys-version-110) is recommended to ensure preparedness for the upcoming key rotation.
- Sets up a [`debsig-verify` policy][12] for Datadog packages. This allows you to verify signatures for individual DEB packages locally.

For example, to verify that a locally downloaded DEB package was built and signed by Datadog, run the following command:

  ```bash
  $ debsig-verify datadog-dogstatsd_7.34.0-1_amd64.deb
  ```

If the verification is successful, `debsig-verify` exits with status `0` and prints a message: `debsig: Verified package from 'Datadog, Inc.' (Datadog).`. Datadog's DEB packages embed signatures since v6.26.0/7.26.0, so this verification does not work on earlier versions.

Because the Agent v6.31.0+/7.31.0+'s package dependency on `datadog-signing-keys` is optional, it may not install if:

- You manually download the Agent DEB package and install it without having the Datadog repository configured as an APT source.
- You mirror the Agent DEB package to your own APT repository without also mirroring the `datadog-signing-keys` package.
- Your APT configuration is set to not install recommended packages. For example, by running `apt` with ` --no-install-recommends` or by having `APT::Install-Recommends "0"` in `apt.conf`.

The first two methods do not require verification for Datadog's repo metadata, so the key rotation has no impact. However, you may benefit from using the `debsig-verify` policy files shipped in the `datadog-signing-keys` package.

With the third method, you need to explicitly install the `datadog-signing-keys` package if you are installing the Agent package from `apt.datadoghq.com` through `apt`. Alternatively, use one of the supported [installation methods](#install-methods-that-automatically-trust-the-new-gpg-key).

### datadog-signing-keys version 1.1.0

<div class="alert alert-info"><strong>Note:</strong> This section only applies to DEB Agent package users.</div>

`datadog-signing-keys` versions before 1.1.0 do not handle the following corner cases:

* On Ubuntu >= 16 and Debian >= 9, only `/usr/share/keyrings/datadog-archive-keyring.gpg` was created, but `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` was not.
* If the APT source list file (For example, `/etc/apt/sources.list.d/datadog.list`) does not contain the option `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`, APT never knows about the new key. Any operations with the Datadog repository will fail after the key rotation.

`datadog-signing-keys` version 1.1.0 addresses this issue by creating `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` when `/etc/apt/sources.list.d/datadog.list` doesn't contain the proper `signed-by` option. This ensures that the above corner case is covered as well.

Users of supported up-to-date [installation methods](#install-methods-that-automatically-trust-the-new-gpg-key) using the default Datadog sources always have the proper `signed-by` option configured, so they are not affected by this issue. Datadog highly recommends that all other users to upgrade to `datadog-signing-keys` 1.1.0 to ensure preparedness for the upcoming key rotation. Installing DEB Agent v6.35.1+ or v7.35.1+ through `apt` from the `apt.datadoghq.com` repository ensures that `datadog-signing-keys` 1.1.0 is installed.

## Impact for Agent v5 users

Agent v5 users on DEB-based systems (Debian/Ubuntu) are also required to trust the new signing key to install or upgrade the Agent after the rotation date. Agent v5 users on RPM-based systems (RedHat/CentOS/SUSE) are not affected by this rotation.

**Note**: Agent v5 uses Python 2 which reached end-of-life on January 1, 2021. Datadog recommends [upgrading to Agent v7][13].

[1]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://install.datadoghq.com/scripts/install_script.sh
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog
[8]: https://github.com/DataDog/puppet-datadog-agent
[9]: https://github.com/DataDog/datadog-formula
[10]: https://github.com/DataDog/heroku-buildpack-datadog
[11]: https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk
[12]: https://manpages.ubuntu.com/manpages/jammy/man1/debsig-verify.1.html
[13]: https://app.datadoghq.com/account/settings/agent/latest
