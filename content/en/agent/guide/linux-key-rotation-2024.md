---
title: 2024 Linux Key Rotation
---

As a common best practice, Datadog periodically rotates the keys and certificates used to sign Datadog's Agent packages. Datadog packages include:

- the different flavors of Agent (`datadog-agent`, `datadog-iot-agent`, `datadog-heroku-agent` and `datadog-dogstatsd`).
- additional packages: Observability Pipelines Worker (`observability-pipelines-worker`), FIPS proxy (`datadog-fips-proxy`) and the APM injection and tracer libraries for Java, Python, .NET, Ruby and Node.js (all `datadog-apm-*` packages).

The following GPG keys, used to sign the above RPM and DEB packages, reach their end-of-life in September 2024. The rotation is planned for June 2024:

RPM
: Old trusted key hash: [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][1]
: New trusted key hash: [`7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3`][2]
: After June 2024, install the new trusted key prior to installing any RPM release published after June 2024.

DEB
: Old trusted key hash: [`D75CEA17048B9ACBF186794B32637D44F14F620E`][3]
: New trusted key hash: [`5F1E256061D813B125E156E8E6266D4AC0962C7D`][4]
: APT checks the repo metadata signature. After June 2024, install the new trusted key prior to installing any APT release from `apt.datadoghq.com` published after June 2024.

If you're using Datadog's RPM or DEB packages, you might need to manually import the new key on your systems to install or upgrade the Agent packages after the rotation takes place.

<div class="alert alert-info">
Key rotation does not affect the functionality of already running Agents. It only limits the ability to install or upgrade to a newer version of the Agent.<br><br>Dockerized Linux Agents, Windows, or macOS Agents are not affected.
</div>

## Install methods that automatically trust the new GPG key

If you're using one of the following installation methods, your host automatically trusts the new key and no further action is required:

- [Agent install script][5] v1.18.0+ (released Jun 27, 2023)
- [Chef cookbook][6] v4.18.0+ (released Jul 26, 2023)
- [Ansible role][7] v4.20.0+ (released Jul 18, 2023)
- [Ansible collection][14] v5.0.0+ (released Jul 18, 2023)
- [Puppet module][8] v3.21.0+ (released Jul 05, 2023)
- [SaltStack formula][9] v3.6+ (released Aug 10, 2023)
- [Heroku buildpack][10] v2.11+ (released Jun 15, 2023)
- [Elastic Beanstalk][11] config templates updated as of Jun 27, 2023 or later (should contain `source: https://install.datadoghq.com/scripts/install_script_agent7.sh`)
- Containerized Agents (Docker/Kubernetes) for any version
- Windows/MacOS Agents for any version

Additionally, installing the DEB Agent v6.48.0+ or v7.48.0+ package through `apt` from the `apt.datadoghq.com` repository installs the [`datadog-signing-keys` package](#the-datadog-signing-keys-package) version 1.3.1. The `datadog-signing-keys` package automatically ensures that your host trusts the new key. If you have `datadog-signing-keys` version 1.3.1 or later installed, no further action is needed. Versions of `datadog-signing-keys` older than version 1.3.1 don't guarantee full preparedness for the key rotation.

If you installed Observability Pipelines Worker or APM tracer libraries **using the above install methods**, they already come with the newest keys. No further action is required.

If you're installing the DEB Agent package from a different repository or you are not using `apt` (or a similar tool that checks repo metadata signatures), your system doesn't need to know the Datadog signing keys. No further action is needed. However, you may benefit from the [`datadog-signing-keys` package](#the-datadog-signing-keys-package).

If you're unsure if a host trusts the new signing key, you can [check](#check-if-a-host-trusts-the-new-gpg-key).

For hosts running older versions of the install methods listed above or older versions of the DEB package, Datadog recommends updating the install method to the latest version. Alternatively, Debian and Ubuntu users can update the Agent to version 7.48.0+. Otherwise, the key can be [manually updated](#manual-update).

## What happens if the new key is not trusted before it is rotated?

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
Public key for datadog-agent-7.57.1-1.x86_64.rpm is not installed. Failing package is: datadog-agent-1:7.57.1-1.x86_64
```
```
Error: GPG check FAILED
```

For `apt`, this applies to both newly released and existing versions of the Agent. For `yum`, `dnf` or `zypper`, existing versions of the Agent can still be installed as long as `repo_gpgcheck=0` is set in the `datadog.repo` or `datadog-observability-pipelines-worker.repo` file.

This key rotation does not affect installations done by manually downloading the packages and installing them with `dpkg` or `rpm`. This may cause a warning for `rpm`.

## Manual update

Datadog encourages you to use one of the [install methods](#install-methods-that-automatically-trust-the-new-gpg-key) above, which trust the new GPG key as well as all future keys automatically. If this is not an option, use the following instructions to manually download and trust the new key.

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

Run the following commands on the host:

```bash
$ sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
$ sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
$ curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
$ curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo apt-key add -
```

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Run the following command on the host:

```
$ sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
```

{{% /tab %}}
{{< /tabs >}}

## Check if a host trusts the new GPG key

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

A host correctly trusts the new key if either one of these conditions is true:

- The file `/usr/share/keyrings/datadog-archive-keyring.gpg` exists and the Datadog source list file contains the option `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`.
  - For Agent installations, the source list file is usually `/etc/apt/sources.list.d/datadog.list`
  - For Observability Pipelines Worker installations, the source list file is usually `/etc/apt/sources.list.d/datadog-observability-pipelines-worker.list`
- The Datadog source list file doesn't contain the `signed-by` option, but `datadog-signing-keys` version 1.3.1 or later is installed, which results in the presence of a `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` file.

Files `/usr/share/keyrings/datadog-archive-keyring.gpg` and, optionally, `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` are created either by a supported [installation method](#install-methods-that-automatically-trust-the-new-gpg-key) or by installing the [`datadog-signing-keys` package](#the-datadog-signing-keys-package). Ensure that `datadog-signing-keys` version 1.3.1 or later is installed unless using one of the [installation method versions listed above](#install-methods-that-automatically-trust-the-new-gpg-key).

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

Run the following command on the host:

```bash
$ rpm -qa | grep gpg-pubkey-b01082d3
```

If the key is trusted, the command has a 0 exit code and outputs:

```
gpg-pubkey-b01082d3-644161ac
```

Otherwise, the command returns a non-0 exit code with no output.

Alternatively, check if your repo file contains `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public` as one of the `gpgkey` entries. Repo file is usually `datadog.repo` for Agent installations or `datadog-observability-pipelines-worker.repo` for Observability Pipelines Worker. The `CURRENT` key file is updated with the new key as soon as it is in use.

{{% /tab %}}
{{< /tabs >}}

## The `datadog-signing-keys` package

<div class="alert alert-info">This section only applies to DEB Agent package users.</div>

Since Agent v6.31.0 and v7.31.0, all Datadog DEB packages have a soft dependency on the `datadog-signing-keys` package. The following versions of Agent packages have a soft dependency on the `datadog-signing-keys` package version `1.3.1`:
- datadog-agent, datadog-iot-agent, datadog-heroku-agent, datadog-dogstatsd, datadog-agent-dbg v6.48.1+ & v7.48.1+
- datadog-fips-proxy v0.5.4+
- observability-pipelines-worker v1.3.1+
- datadog-apm-inject v0.10.7+
- datadog-apm-library-python v1.18.0+
- datadog-apm-library-java v1.19.1+
- datadog-apm-library-dotnet v2.36.0+
- datadog-apm-library-js v4.11.0+
- datadog-apm-library-all v0.3+

Upon installation, this package:

- Configures APT keys in the `/usr/share/keyrings/datadog-archive-keyring.gpg` keyring and also in `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` when necessary. **This ensures that the upcoming APT repository signing key is trusted.** Using the package `datadog-signing-keys` version 1.3.1 is recommended to ensure preparedness for the upcoming key rotation.
- Sets up a [`debsig-verify` policy][12] for Datadog packages. This allows you to verify signatures for individual DEB packages locally.

For example, to verify that a locally downloaded DEB package was built and signed by Datadog, run the following command:

  ```bash
  $ debsig-verify datadog-dogstatsd_7.51.0-1_amd64.deb
  ```

If the verification is successful, `debsig-verify` exits with status `0` and prints a message: `debsig: Verified package from 'Datadog, Inc.' (Datadog).` Datadog's DEB packages embed signatures since v6.26.0/7.26.0, so this verification does not work on earlier versions.

Because the Agent v6.48.0+/7.48.0+'s package dependency on `datadog-signing-keys` is optional, it may not install if:

- You manually download the Agent DEB package and install it without having the Datadog repository configured as an APT source.
- You mirror the Agent DEB package to your own APT repository without also mirroring the `datadog-signing-keys` package.
- Your APT configuration is set to not install recommended packages. For example, by running `apt` with ` --no-install-recommends` or by having `APT::Install-Recommends "0"` in `apt.conf`.

The first two methods do not require verification for Datadog's repo metadata, so the key rotation has no impact. However, you may benefit from using the `debsig-verify` policy files shipped in the `datadog-signing-keys` package.

With the third method, you need to explicitly install the `datadog-signing-keys` package if you are installing the Agent package from `apt.datadoghq.com` through `apt`. Alternatively, use one of the supported [installation methods](#install-methods-that-automatically-trust-the-new-gpg-key).

## Impact for Agent v5 users

Agent v5 users on DEB-based systems (Debian/Ubuntu) are also required to trust the new signing key to install or upgrade the Agent after the rotation date. Agent v5 users on RPM-based systems (RedHat/CentOS/SUSE) are not affected by this rotation.

**Note**: Agent v5 uses Python 2 which reached end-of-life on January 1, 2020. Datadog recommends [upgrading to Agent v7][13].

[1]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[5]: https://install.datadoghq.com/scripts/install_script_agent7.sh
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog
[8]: https://github.com/DataDog/puppet-datadog-agent
[9]: https://github.com/DataDog/datadog-formula
[10]: https://github.com/DataDog/heroku-buildpack-datadog
[11]: https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk
[12]: https://manpages.ubuntu.com/manpages/jammy/man1/debsig-verify.1.html
[13]: https://app.datadoghq.com/account/settings/agent/latest
[14]: https://github.com/ansible-collections/Datadog
