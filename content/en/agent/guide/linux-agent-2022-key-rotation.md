---
title: 2022 Linux Agent Key Rotation
kind: guide
aliases:
  - /agent/faq/linux-agent-2022-key-rotation
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

Additionally, if you are installing the DEB Agent v7.31.0+ package through `apt` from the `apt.datadoghq.com` repository, your hosts should have the `datadog-signing-keys` package installed, which automatically adds the new key (no further action is needed). 

If you are installing the DEB Agent package from a different repository or you are not using `apt` (or a similar tool that checks repo metadata signatures), your system doesn't need to know the Datadog signing keys (no further action is needed). However, you may benefit from the [`datadog-signing-keys` package](#the-datadog-signing-keys-package).

If you're unsure if a host trusts the new signing key, you can [check](#check-if-a-host-trusts-the-new-gpg-key).

For hosts running older versions of the install methods listed above or older versions of the DEB package, Datadog recommends updating the install method to the latest version. Alternatively Debian and Ubuntu users can update the Agent to version 7.31.0+. Otherwise, the key can be [manually updated](#manual-update).

## What happens if I don't trust the new key before it is rotated?

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Trying to install or upgrade Agent packages by `apt` from `apt.datadoghq.com` without trusting the new key results in `NO_PUBKEY` errors. This applies to both newly released and existing versions of the Agent.

```
The following signatures couldn't be verified because the public key is not available: NO_PUBKEY
```


This key rotation does not affect installations done from sources other than `apt.datadoghq.com` or those done by manually downloading the package from `apt.datadoghq.com` and installing it.

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Installing new versions of the Agent released since April 2022 causes `NOKEY` errors. Older versions of the Agent can still be installed.

```
The GPG keys listed for the "Datadog, Inc." repository are already installed but they are not correct for this package.
Check that the correct key URLs are configured for this repository.
```

{{% /tab %}}
{{< /tabs >}}

## Manual update

Datadog encourages you to use one of the install methods above, which trust the new GPG key as well as all future keys automatically. If this is not an option, use the following instructions to manually download and trust the new key.

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

If the file `/usr/share/keyrings/datadog-archive-keyring.gpg` exists, the new key is trusted and no further action is needed. This file is created either by an [installation method](#install-methods-that-automatically-trust-the-new-gpg-key) or by installing the [`datadog-signing-keys` package](#the-datadog-signing-keys-package).

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

Since Agent v6.31.0 and v7.31.0, all Datadog DEB packages have a soft dependency on the `datadog-signing-keys` package. 

Upon installation, this package:

- Configures APT keys in the `/usr/share/keyrings/datadog-archive-keyring.gpg` keyring and also through `apt-key` when necessary. **This ensures that the upcoming APT repository signing key is trusted.**
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

## Impact for Agent v5 users

Agent v5 users on DEB-based systems (Debian/Ubuntu) are also required to trust the new signing key to install or upgrade the Agent after the rotation date. Agent v5 users on RPM-based systems (RedHat/CentOS/SUSE) are not affected by this rotation.

**Note**: Agent v5 uses Python 2 which reached end-of-life on January 1, 2021. Datadog recommends [upgrading to Agent v7][13].

[1]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://s3.amazonaws.com/dd-agent/scripts/install_script.sh
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog
[8]: https://github.com/DataDog/puppet-datadog-agent
[9]: https://github.com/DataDog/datadog-formula
[10]: https://github.com/DataDog/heroku-buildpack-datadog
[11]: https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk
[12]: https://manpages.ubuntu.com/manpages/jammy/man1/debsig-verify.1.html
[13]: https://app.datadoghq.com/account/settings#agent
