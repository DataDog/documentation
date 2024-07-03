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
- コンテナ型 Agent (Docker/Kubernetes) の全バージョン
- Windows/MacOS Agents の全バージョン

Additionally, installing the DEB Agent v6.48.0+ or v7.48.0+ package through `apt` from the `apt.datadoghq.com` repository installs the [`datadog-signing-keys` package](#the-datadog-signing-keys-package) version 1.3.1. The `datadog-signing-keys` package automatically ensures that your host trusts the new key. If you have `datadog-signing-keys` version 1.3.1 or later installed, no further action is needed. Versions of `datadog-signing-keys` older than version 1.3.1 don't guarantee full preparedness for the key rotation.

If you installed Observability Pipelines Worker or APM tracer libraries **using the above install methods**, they already come with the newest keys. No further action is required.

If you're installing the DEB Agent package from a different repository or you are not using `apt` (or a similar tool that checks repo metadata signatures), your system doesn't need to know the Datadog signing keys. No further action is needed. However, you may benefit from the [`datadog-signing-keys` package](#the-datadog-signing-keys-package).

ホストが新しい署名キーを信頼しているかどうかわからない場合は、[確認](#check-if-a-host-trusts-the-new-gpg-key)できます。

For hosts running older versions of the install methods listed above or older versions of the DEB package, Datadog recommends updating the install method to the latest version. Alternatively, Debian and Ubuntu users can update the Agent to version 7.48.0+. Otherwise, the key can be [manually updated](#manual-update).

## What happens if the new key is not trusted before it is rotated?

新しいキーを信頼せずに `apt`、`yum`、`dnf`、`zypper` を使って Agent パッケージを `apt.datadoghq.com`/`yum.datadoghq.com` からインストールまたはアップグレードしようとすると、エラーが発生することがあります。

考えられるエラーは以下の通りです。

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

`apt` では、新しくリリースされたバージョンと既存のバージョンの Agent の両方に適用されます。`yum`、`dnf`、`zypper` では、`datadog.repo` または `datadog-observability-pipelines-worker.repo` ファイルに `repo_gpgcheck=0` が設定されている限り、既存のバージョンの Agent は引き続きインストールすることができます。

このキーローテーションは、手動でパッケージをダウンロードし、`dpkg` や `rpm` を使ってインストールした場合には影響しません。これは `rpm` の警告を引き起こす場合があります。

## 手動更新

Datadog では、上記の[インストール方法](#install-methods-that-automatically-trust-the-new-gpg-key)のいずれかを使用して、新しい GPG キーと将来のすべてのキーを自動的に信頼することを推奨しています。この方法が使えない場合は、以下の手順で新しいキーを手動でダウンロードし、信頼するようにしてください。

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

ホスト上で以下のコマンドを実行します。

```bash
$ sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
$ sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
$ curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
$ curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo apt-key add -
```

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

ホスト上で以下のコマンドを実行します。

```
$ sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
```

{{% /tab %}}
{{< /tabs >}}

## ホストが新しい GPG キーを信頼しているかどうかを確認する

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

以下の条件のいずれかが真である場合、ホストは新しいキーを正しく信頼します。

- The file `/usr/share/keyrings/datadog-archive-keyring.gpg` exists and the Datadog source list file contains the option `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]`.
  - For Agent installations, the source list file is usually `/etc/apt/sources.list.d/datadog.list`
  - For Observability Pipelines Worker installations, the source list file is usually `/etc/apt/sources.list.d/datadog-observability-pipelines-worker.list`
- The Datadog source list file doesn't contain the `signed-by` option, but `datadog-signing-keys` version 1.3.1 or later is installed, which results in the presence of a `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` file.

Files `/usr/share/keyrings/datadog-archive-keyring.gpg` and, optionally, `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` are created either by a supported [installation method](#install-methods-that-automatically-trust-the-new-gpg-key) or by installing the [`datadog-signing-keys` package](#the-datadog-signing-keys-package). Ensure that `datadog-signing-keys` version 1.3.1 or later is installed unless using one of the [installation method versions listed above](#install-methods-that-automatically-trust-the-new-gpg-key).

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

ホスト上で以下のコマンドを実行します。

```bash
$ rpm -qa | grep gpg-pubkey-b01082d3
```

キーが信頼できる場合は、コマンドの終了コードが 0 になり、以下が出力されます。

```
gpg-pubkey-b01082d3-644161ac
```

それ以外の場合は、0 以外の終了コードを返し、何も出力されません。

Alternatively, check if your repo file contains `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public` as one of the `gpgkey` entries. Repo file is usually `datadog.repo` for Agent installations or `datadog-observability-pipelines-worker.repo` for Observability Pipelines Worker. The `CURRENT` key file is updated with the new key as soon as it is in use.

{{% /tab %}}
{{< /tabs >}}

## `datadog-signing-keys` パッケージ

<div class="alert alert-info">This section only applies to DEB Agent package users.</div>

Agent v6.31.0 と v7.31.0 以降、すべての Datadog DEB パッケージは `datadog-signing-keys` パッケージにソフト的に依存しています。以下のバージョンの Agent パッケージは、 `datadog-signing-keys` パッケージのバージョン `1.3.1` にソフト的に依存しています。
- datadog-agent, datadog-iot-agent, datadog-heroku-agent, datadog-dogstatsd, datadog-agent-dbg v6.48.1+ & v7.48.1+
- datadog-fips-proxy v0.5.4+
- observability-pipelines-worker v1.3.1+
- datadog-apm-inject v0.10.7+
- datadog-apm-library-python v1.18.0+
- datadog-apm-library-java v1.19.1+
- datadog-apm-library-dotnet v2.36.0+
- datadog-apm-library-js v4.11.0+
- datadog-apm-library-all v0.3+

インストール時、このパッケージ:

- Configures APT keys in the `/usr/share/keyrings/datadog-archive-keyring.gpg` keyring and also in `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` when necessary. **This ensures that the upcoming APT repository signing key is trusted.** Using the package `datadog-signing-keys` version 1.3.1 is recommended to ensure preparedness for the upcoming key rotation.
- Datadog パッケージに対して、[`debsig-verify` ポリシー][12]を設定します。これにより、個々の DEB パッケージの署名をローカルで検証することができます。

例えば、ローカルにダウンロードした DEB パッケージがビルドされ、Datadog によって署名されたことを確認するには、次のコマンドを実行します。

  ```bash
  $ debsig-verify datadog-dogstatsd_7.51.0-1_amd64.deb
  ```

If the verification is successful, `debsig-verify` exits with status `0` and prints a message: `debsig: Verified package from 'Datadog, Inc.' (Datadog).` Datadog's DEB packages embed signatures since v6.26.0/7.26.0, so this verification does not work on earlier versions.

Because the Agent v6.48.0+/7.48.0+'s package dependency on `datadog-signing-keys` is optional, it may not install if:

- Datadog リポジトリを APT ソースとして構成することなく、Agent DEB パッケージを手動でダウンロードし、インストールします。
- `datadog-signing-keys` パッケージをミラーリングせずに、Agent DEB パッケージを自分の APT リポジトリにミラーリングします。
- APT の構成は、推奨パッケージをインストールしない設定になっています。例えば、`apt` を ` --no-install-recommends` で実行したり、`apt::Install-Recommends "0"` を `apt.conf` に記述します。

最初の 2 つの方法は、Datadog のリポジトリメタデータに対する検証を必要としないため、キーローテーションの影響はありません。しかし、`datadog-signing-keys` パッケージに同梱されている `debsig-verify` ポリシーファイルを使用すると、より効果的です。

3 番目の方法では、`apt` 経由で `apt.datadoghq.com` から Agent パッケージをインストールする場合、明示的に `datadog-signing-keys` パッケージをインストールする必要があります。あるいは、サポートされている[インストール方法](#install-methods-that-automatically-trust-the-new-gpg-key)のいずれかを使用することも可能です。

## Agent v5 ユーザーへの影響

DEB ベースのシステム (Debian/Ubuntu) の Agent v5 ユーザーは、ローテーション日以降に Agent をインストールまたはアップグレードする際にも、新しい署名キーを信頼する必要があります。RPM ベースのシステム (RedHat/CentOS/SUSE) の Agent v5 ユーザーは、このローテーションの影響を受けません。

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
[11]: https://docs.datadoghq.com/ja/integrations/amazon_elasticbeanstalk
[12]: https://manpages.ubuntu.com/manpages/jammy/man1/debsig-verify.1.html
[13]: https://app.datadoghq.com/account/settings/agent/latest
[14]: https://github.com/ansible-collections/Datadog