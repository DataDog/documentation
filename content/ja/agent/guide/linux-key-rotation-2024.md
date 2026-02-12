---
description: Datadog の RPM / DEB パッケージに対して 2024 年に実施される GPG キー ローテーションの概要と、システムを更新する方法に関する情報。
title: 2024 Linux キーローテーション
---

一般的なベストプラクティスとして、Datadog は Agent パッケージの署名に使用される鍵や証明書を定期的にローテーションします。Datadog パッケージには以下が含まれます。

- Agent の各種パッケージ (`datadog-agent`、`datadog-iot-agent`、`datadog-heroku-agent`、`datadog-dogstatsd`)
- 追加パッケージ: Observability Pipelines Worker (`observability-pipelines-worker`)、FIPS プロキシ (`datadog-fips-proxy`)、Java、Python、.NET、Ruby、Node.js 向けの APM インジェクションおよびトレーサーライブラリ (すべて `datadog-apm-*` パッケージ)

以下の GPG 鍵は、上記の RPM および DEB パッケージを署名するために使用されており、2024 年 9 月に有効期限を迎えます。キーのローテーションは 2024 年 6 月に予定されています。

RPM
古いトラステッドキーのハッシュ: [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][1]
新しいトラステッドキーのハッシュ: [`7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3`][2]
2024 年 6 月以降に公開される RPM リリースをインストールする前に、新しいトラステッドキーをインストールしてください。

DEB
古いトラステッドキーのハッシュ: [`D75CEA17048B9ACBF186794B32637D44F14F620E`][3]
新しいトラステッドキーのハッシュ: [`5F1E256061D813B125E156E8E6266D4AC0962C7D`][4]
APT はリポジトリのメタデータ署名をチェックします。2024 年 6 月以降に apt.datadoghq.com から公開される APT リリースをインストールする前に、新しいトラステッドキーをインストールしてください。

Datadog の RPM または DEB パッケージを使用している場合、キーのローテーション後に Agent パッケージをインストールまたはアップグレードするには、新しい鍵を手動でシステムにインポートする必要がある場合があります。

<div class="alert alert-info">
キーのローテーションは、すでに稼働している Agent の機能には影響しません。Agent の新バージョンをインストールまたはアップグレードする能力のみが制限されます。<br><br>Linux 用 Docker イメージや Windows、macOS 向け Agent には影響しません。
</div>

## 新しい GPG 鍵を自動的に信頼するインストール方法

以下のいずれかのインストール方法を使用している場合、ホストは自動的に新しい鍵を信頼するため、追加の操作は必要ありません。

- [Agent インストールスクリプト][5] バージョン 1.18.0 以降 (2023 年 6 月 27 日リリース)
- [Chef クックブック][6] バージョン 4.18.0 以降 (2023 年 7 月 26 日リリース)
- [Ansible ロール][7] バージョン 4.20.0 以降 (2023 年 7 月 18 日リリース)
- [Ansible コレクション][14] バージョン 5.0.0 以降 (2023 年 7 月 18 日リリース)
- [Puppet モジュール][8] バージョン 3.21.0 以降 (2023 年 7 月 5 日リリース)
- [SaltStack 式][9] バージョン 3.6 以降 (2023 年 8 月 10 日リリース)
- [Heroku ビルドブック][10] バージョン 2.11 以降 (2023 年 6 月 15 日リリース)
- [Elastic Beanstalk][11] 用の設定テンプレート (2023 年 6 月 27 日以降に更新されたもの) で、source: `source: https://install.datadoghq.com/scripts/install_script_agent7.sh` を含むもの
- コンテナ型 Agent (Docker/Kubernetes) の全バージョン
- Windows/MacOS Agents の全バージョン

さらに、`apt.datadoghq.com` リポジトリから `apt` を使って DEB Agent v6.48.0+ または v7.48.0+ をインストールすると、`datadog-signing-keys` パッケージバージョン 1.3.1 がインストールされます。`datadog-signing-keys` パッケージはホストが自動的に新しい鍵を信頼するようにします。バージョン 1.3.1 以降がインストールされている場合、追加の操作は必要ありません。1.3.1 よりも古いバージョンの `datadog-signing-keys` では、キーのローテーションに完全に対応できない場合があります。

**上記のインストール方法を使用**して Observability Pipelines Worker や APM トレーサーライブラリをインストールしている場合、それらはすでに最新の鍵を含んでいます。追加の操作は不要です。

DEB Agent パッケージを別のリポジトリからインストールしている、あるいは apt (または同様にリポジトリメタデータ署名をチェックするツール) を使用していない場合、システムは Datadog の署名鍵を必ずしも必要としません。追加の操作は必要ありませんが、datadog-signing-keys パッケージの利用によりメリットを得られる可能性があります。

ホストが新しい署名キーを信頼しているかどうかわからない場合は、[確認](#check-if-a-host-trusts-the-new-gpg-key)できます。

上記のインストール方法の古いバージョン、または古いバージョンの DEB パッケージを使用しているホストについては、Datadog はインストール方法を最新バージョンに更新することを推奨しています。あるいは Debian や Ubuntu を使用している場合は、Agent を 7.48.0 以降のバージョンにアップデートすることも可能です。そうでなければ、[手動でキーを更新](#manual-update)することもできます。

## 新しい鍵がローテーションされる前に信頼されていない場合、どうなりますか？

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

- ファイル `/usr/share/keyrings/datadog-archive-keyring.gpg` が存在し、Datadog ソースリストファイルにオプション `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]` が含まれています。
  - Agent のインストールの場合、ソースリストファイルは通常 `/etc/apt/sources.list.d/datadog.list` です。
  - Observability Pipelines Worker のインストールの場合、ソースリストファイルは通常 `/etc/apt/sources.list.d/datadog-observability-pipelines-worker.list` です。
- Datadog ソースリストファイルに `signed-by` オプションが含まれていなくても、バージョン 1.3.1 以降の `datadog-signing-keys` がインストールされている場合は、`/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` ファイルが存在します。

ファイル `/usr/share/keyrings/datadog-archive-keyring.gpg` と、必要に応じて `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` は、サポートされている[インストール方法](#install-methods-that-automatically-trust-the-new-gpg-key)を使用するか、[`datadog-signing-keys` パッケージ](#the-datadog-signing-keys-package)をインストールすることで作成されます。[上記](#install-methods-that-automatically-trust-the-new-gpg-key)の自動的に新しい GPG 鍵を信頼するインストール方法のいずれかを使っていない場合は、`datadog-signing-keys` バージョン 1.3.1 以降がインストールされていることを確認してください。

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

あるいは、リポジトリファイルに `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public` が `gpgkey` の項目の 1 つとして含まれているかどうかを確認することもできます。リポジトリファイルは、Agent のインストール用なら通常 `datadog.repo`、Observability Pipelines Worker の場合は `datadog-observability-pipelines-worker.repo` となります。`CURRENT` キーファイルは新しい鍵が使用され始めると同時に更新されます。

{{% /tab %}}
{{< /tabs >}}

## `datadog-signing-keys` パッケージ

<div class="alert alert-info">このセクションは DEB Agent パッケージのユーザーにのみ適用されます。</div>

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

- APT キーを `/usr/share/keyrings/datadog-archive-keyring.gpg` キーリングに設定し、必要に応じて `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` にも設定します。**これにより、今後追加される APT リポジトリの署名鍵が信頼されるようになります。**今後のキーのローテーションに備えて、`datadog-signing-keys` バージョン 1.3.1 の利用が推奨されます。
- Datadog パッケージに対して、[`debsig-verify` ポリシー][12]を設定します。これにより、個々の DEB パッケージの署名をローカルで検証することができます。

例えば、ローカルにダウンロードした DEB パッケージがビルドされ、Datadog によって署名されたことを確認するには、次のコマンドを実行します。

  ```bash
  $ debsig-verify datadog-dogstatsd_7.51.0-1_amd64.deb
  ```

`debsig-verify` の検証が成功すると、ステータスコード `0` で終了し、次のようなメッセージが表示されます: `debsig: Verified package from 'Datadog, Inc.' (Datadog).` Datadog の DEB パッケージは v6.26.0 / v7.26.0 以降で署名が埋め込まれているため、より古いバージョンではこの検証は機能しません。

Agent v6.48.0+/v7.48.0+ のパッケージが `datadog-signing-keys` に依存するのはオプションであるため、以下の場合にはインストールされない可能性があります。

- Datadog リポジトリを APT ソースとして構成することなく、Agent DEB パッケージを手動でダウンロードし、インストールします。
- `datadog-signing-keys` パッケージをミラーリングせずに、Agent DEB パッケージを自分の APT リポジトリにミラーリングします。
- APT の構成は、推奨パッケージをインストールしない設定になっています。例えば、`apt` を ` --no-install-recommends` で実行したり、`apt::Install-Recommends "0"` を `apt.conf` に記述します。

最初の 2 つの方法は、Datadog のリポジトリメタデータに対する検証を必要としないため、キーローテーションの影響はありません。しかし、`datadog-signing-keys` パッケージに同梱されている `debsig-verify` ポリシーファイルを使用すると、より効果的です。

3 番目の方法では、`apt` 経由で `apt.datadoghq.com` から Agent パッケージをインストールする場合、明示的に `datadog-signing-keys` パッケージをインストールする必要があります。あるいは、サポートされている[インストール方法](#install-methods-that-automatically-trust-the-new-gpg-key)のいずれかを使用することも可能です。

## Agent v5 ユーザーへの影響

DEB ベースのシステム (Debian/Ubuntu) の Agent v5 ユーザーは、ローテーション日以降に Agent をインストールまたはアップグレードする際にも、新しい署名キーを信頼する必要があります。RPM ベースのシステム (RedHat/CentOS/SUSE) の Agent v5 ユーザーは、このローテーションの影響を受けません。

**注**: Agent v5 は 2020 年 1 月 1 日にサポート終了 (EOL) を迎えた Python 2 を使用します。Datadog は [Agent v7 へのアップグレード][13]を推奨します。

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