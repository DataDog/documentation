---
aliases:
- /ja/agent/faq/linux-agent-2022-key-rotation
kind: ガイド
title: 2022 Linux Agent キーローテーション
---

一般的なベストプラクティスとして、Datadog は Datadog の Agent パッケージの署名に使用されるキーと証明書を定期的にローテーションしています。Agent RPM および DEB パッケージに署名するために使用される以下の GPG キーは、2022 年 6 月に耐用年数を迎え、2022 年 4 月にローテーションされる予定です。

- ハッシュ [`A4C0B90D7443CF6E4E8AA341F1068E14E09422B3`][1] の RPM 署名キーは、2022 年 4 月 11 日 12:00 UTC にローテーションされ、ハッシュ [`C6559B690CA882F023BDF3F63F4D1729FD4BF915`][2] のキーに置き換えられる予定です。この日以降の最初の RPM リリース (6.36 と 7.36) では、インストールに信頼できる新しいキーが必要になります。
- ハッシュ [`A2923DFF56EDA6E76E55E492D3A80E30382E94DE`][3] の DEB 署名キーは、2022 年 5 月 2 日 12:00 UTC にローテーションされ、ハッシュ [`D75CEA17048B9ACBF186794B32637D44F14F620E`][4] のキーと交換される予定です。APT はレポジトリのメタデータ署名をチェックするので、`apt.datadoghq.com` から Agent の将来または既存のバージョンをインストールするには、新しいキーがこの日付までに信頼される必要があります。

Datadog の RPM または DEB パッケージを使用しているお客様は、ローテーションが行われた後に Agent をインストールまたはアップグレードするために、システム上に新しいキーをインポートする手動アクションが必要になる場合があります。

<div class="alert alert-info">
<strong>注</strong>: これは、すでに実行されている Agent の機能には影響せず、Agent の新しいバージョンへのインストールまたはアップグレードの機能を制限するだけです。また、Docker 化された Linux Agent、Windows、または macOS Agent には影響しません。
</div>

## 新しい GPG キーを自動的に信頼するメソッドをインストールする

以下のインストール方法のいずれかを使用している場合、ホストは自動的に新しいキーを信頼します (さらなる操作は必要ありません)。

- [Agent インストールスクリプト][5] v1.6.0+ (2021 年 7 月 26 日リリース)
- [Chef クックブック][6] v4.11.0+ (2021 年 8 月 10 日リリース)
- [Ansible ロール][7] v4.10.0+ (2021 年 5 月 25 日リリース)
- [Puppet モジュール][8] v3.13.0+ (2021 年 8 月 11 日リリース)
- [SaltStack 式][9] v3.4+ (2021 年 8 月 12 日リリース)
- [Heroku ビルドパック][10] v1.26+ (2021 年 5 月 26 日リリース)
- 2021 年 3 月 29 日以降に更新された [Elastic Beanstalk][11] 構成テンプレート (`gpgkey` の下に `DATADOG_RPM_KEY_FD4BF915.public` を含む)
- コンテナ型 Agent (Docker/Kubernetes) の全バージョン
- Windows/MacOS Agents の全バージョン

さらに、DEB Agent v6.35.1+ または v7.35.1+ パッケージを `apt` を通じて `apt.datadoghq.com` レポジトリからインストールすると、 [`datadog-signing-keys` パッケージ ](#the-datadog-signing-keys-package) バージョン 1.1.0 をインストールし、自動的に新しいキーをホストから信用できるようにします。`datadog-signing-keys` バージョン 1.1.0 以降がインストールされている場合、これ以上の操作は必要ありません。[バージョン 1.1.0](#datadog-signing-keys-version-110) より古いバージョンの `datadog-signing-keys` は、キーのローテーションに対する完全な準備を保証するものではありません。

DEB Agent パッケージを別のリポジトリからインストールしている場合や、`apt` (あるいはリポジトリのメタデータ署名をチェックする同様のツール) を使用していない場合、システムは Datadog 署名キーを知る必要がありません (これ以上のアクションは必要ありません)。しかし、[`datadog-signing-keys` パッケージ](#the-datadog-signing-keys-package)を利用すると便利かもしれません。

ホストが新しい署名キーを信頼しているかどうかわからない場合は、[確認](#check-if-a-host-trusts-the-new-gpg-key)できます。

上記の古いバージョンのインストール方法、または古いバージョンの DEB パッケージを実行しているホストでは、Datadog はインストール方法を最新バージョンに更新することを推奨しています。また、Debian や Ubuntu のユーザーは、Agent をバージョン 7.31.0+ に更新することができます。それ以外の場合は、キーを[手動で更新](#manual-update)することができます。

## ローテーションする前の新しいキーが信用できない場合はどうなりますか？

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
Public key for datadog-agent-7.35.1-1.x86_64.rpm is not installed. Failing package is: datadog-agent-1:7.35.1-1.x86_64
```
```
Error: GPG check FAILED
```

`adapt` では、新しくリリースされたバージョンと既存のバージョンの Agent の両方に適用されます。`yum`、`dnf`、`zypper` では、`datadog.repo` ファイルに `repo_gpgcheck=0` が設定されていれば、既存のバージョンの Agent をインストールすることができます。

このキーローテーションは、手動でパッケージをダウンロードし、`dpkg` や `rpm` を使ってインストールした場合には影響しません。これは `rpm` の警告を引き起こす場合があります。

## 手動更新

Datadog では、上記の[インストール方法](#install-methods-that-automatically-trust-the-new-gpg-key)のいずれかを使用して、新しい GPG キーと将来のすべてのキーを自動的に信頼することを推奨しています。この方法が使えない場合は、以下の手順で新しいキーを手動でダウンロードし、信頼するようにしてください。

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

ホスト上で以下のコマンドを実行します。

```bash
$ curl -o /tmp/DATADOG_APT_KEY_F14F620E https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
$ sudo apt-key add /tmp/DATADOG_APT_KEY_F14F620E
$ sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
$ cat /tmp/DATADOG_APT_KEY_F14F620E | sudo gpg --import --batch --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg
$ sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
```

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

ホスト上で以下のコマンドを実行します。

```
$ curl -o /tmp/DATADOG_RPM_KEY_FD4BF915 https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
$ sudo rpm --import /tmp/DATADOG_RPM_KEY_FD4BF915
```

{{% /tab %}}
{{< /tabs >}}

## ホストが新しい GPG キーを信頼しているかどうかを確認する

{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

以下の条件のいずれかが真である場合、ホストは新しいキーを正しく信頼します。

- ファイル `/usr/share/keyrings/datadog-archive-keyring.gpg` が存在し、Datadog ソースリストファイル (通常 `/etc/apt/sources.list.d/datadog.list`) にオプション `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]` が含まれている場合。
- Datadog のソースリストファイルには `signed-by` オプションがないが、 `datadog-signing-keys` バージョン 1.1.0 以降がインストールされており、`/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` ファイルが存在している場合。

ファイル `/usr/share/keyrings/datadog-archive-keyring.gpg` と、オプションとして `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` が、サポートされる[インストール方法](#install-methods-that-automatically-trust-the-new-gpg-key)または [`datadog-signing-keys` パッケージ](#the-datadog-signingkeys-package)をインストールすることで作成されている場合。[上記のインストール方法のバージョン](#install-methods-that-automatically-trust-the-new-gpg-key)のひとつを使用しない限り、 `datadog-signing-keys` [バージョン 1.1.0](#datadog-signing-keys-version-110) またはそれ以上がインストールされていることを確認してください。

{{% /tab %}}
{{% tab "RedHat/CentOS/SUSE" %}}

ホスト上で以下のコマンドを実行します。

```bash
$ rpm -qa | grep gpg-pubkey-fd4bf915
```

キーが信頼できる場合は、コマンドの終了コードが 0 になり、以下が出力されます。

```
gpg-pubkey-fd4bf915-5f573efe
```

それ以外の場合は、0 以外の終了コードを返し、何も出力されません。

あるいは、`datadog.repo` ファイルに `https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public` が `gpgkey` のエントリの 1 つとして含まれているかどうか確認してみてください。このキーファイルは、使用されるとすぐに新しいキーで更新されます。

{{% /tab %}}
{{< /tabs >}}

## `datadog-signing-keys` パッケージ

<div class="alert alert-info"><strong>注:</strong> このセクションは、DEB Agent パッケージのユーザーにのみ適用されます。</div>

Agent v6.31.0 と v7.31.0 以降、すべての Datadog DEB パッケージは `datadog-signing-keys` パッケージにソフト的に依存しています。Agent v6.35.1 と v7.35.1 以降、すべての Datadog DEB パッケージは、 `datadog-signing-keys` パッケージのバージョン `1.1.0` にソフト的に依存していることに注意してください。

インストール時、このパッケージ:

- APT キーを `/usr/share/keyrings/datadog-archive-keyring.gpg` キーリングに構成し、必要に応じて `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` にも構成します。**これは今後の APT リポジトリの署名キーが信頼できることを保証します。**今後のキーローテーションに備えるために、パッケージ [`datadog-signing-keys` バージョン 1.1.0](#datadog-signing-keys-version-110) を使うことが推奨されます。
- Datadog パッケージに対して、[`debsig-verify` ポリシー][12]を設定します。これにより、個々の DEB パッケージの署名をローカルで検証することができます。

例えば、ローカルにダウンロードした DEB パッケージがビルドされ、Datadog によって署名されたことを確認するには、次のコマンドを実行します。

  ```bash
  $ debsig-verify datadog-dogstatsd_7.34.0-1_amd64.deb
  ```

検証に成功した場合、`debsig-verify` はステータス `0` で終了し、メッセージ `debsig: Verified package from 'Datadog, Inc.' (Datadog).` を表示します。Datadog の DEB パッケージは v6.26.0/7.26.0 以降に署名を埋め込んでいるので、それ以前のバージョンではこの検証はうまくいきません。

Agent v6.31.0+/7.31.0+ のパッケージ依存の `datadog-signing-keys` はオプションなので、以下の場合はインストールされない可能性があります。

- Datadog リポジトリを APT ソースとして構成することなく、Agent DEB パッケージを手動でダウンロードし、インストールします。
- `datadog-signing-keys` パッケージをミラーリングせずに、Agent DEB パッケージを自分の APT リポジトリにミラーリングします。
- APT の構成は、推奨パッケージをインストールしない設定になっています。例えば、`apt` を ` --no-install-recommends` で実行したり、`apt::Install-Recommends "0"` を `apt.conf` に記述します。

最初の 2 つの方法は、Datadog のリポジトリメタデータに対する検証を必要としないため、キーローテーションの影響はありません。しかし、`datadog-signing-keys` パッケージに同梱されている `debsig-verify` ポリシーファイルを使用すると、より効果的です。

3 番目の方法では、`apt` 経由で `apt.datadoghq.com` から Agent パッケージをインストールする場合、明示的に `datadog-signing-keys` パッケージをインストールする必要があります。あるいは、サポートされている[インストール方法](#install-methods-that-automatically-trust-the-new-gpg-key)のいずれかを使用することも可能です。

### datadog-signing-keys バージョン 1.1.0

<div class="alert alert-info"><strong>注:</strong> このセクションは、DEB Agent パッケージのユーザーにのみ適用されます。</div>

1.1.0 以前の `datadog-signing-keys` のバージョンでは、以下のコーナーケースを処理できません。

* Ubuntu >= 16 と Debian >= 9 では `/usr/share/keyrings/datadog-archive-keyring.gpg` だけは作成されましたが、`/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` は作成されていません。
* APT のソースリストファイル (例: `/etc/apt/sources.list.d/datadog.list`) に `[signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg]` オプションがなければ、APT は新しいキーを認識することはありません。Datadog リポジトリに対する全ての操作は、キーローテーションの後、失敗します。

`datadog-signing-keys` バージョン 1.1.0 では、 `/etc/apt/trusted.gpg.d/datadog-archive-keyring.gpg` が、 `/etc/apt/sources.list.d/datadog.list` に正しい `signed-by` オプションがない場合に作成され、この問題を解決しています。これにより、上記のコーナーケースもカバーされるようになりました。

Datadog のデフォルトのソースを使用している、サポートされている最新の[インストール方法](#install-methods-that-automatically-trust-the-new-gpg-key)のユーザーは、常に正しい `signed-by` オプションが構成されているので、この問題の影響を受けることはありません。Datadog は、今後のキーローテーションに備えるため、他の全てのユーザーに対して `datadog-signing-keys` 1.1.0 へのアップグレードを強く推奨しています。DEB Agent v6.35.1+ または v7.35.1+ を `apt.datadoghq.com` レポジトリから `apt` を通してインストールすると、`datadog-signing-keys` 1.1.0 が確実にインストールされます。

## Agent v5 ユーザーへの影響

DEB ベースのシステム (Debian/Ubuntu) の Agent v5 ユーザーは、ローテーション日以降に Agent をインストールまたはアップグレードする際にも、新しい署名キーを信頼する必要があります。RPM ベースのシステム (RedHat/CentOS/SUSE) の Agent v5 ユーザーは、このローテーションの影響を受けません。

**注**: Agent v5 は 2021 年 1 月 1 日に耐用年数を迎えた Python 2 を使用しています。Datadog では、[Agent v7 へのアップグレード][13]を推奨しています。

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
[11]: https://docs.datadoghq.com/ja/integrations/amazon_elasticbeanstalk
[12]: https://manpages.ubuntu.com/manpages/jammy/man1/debsig-verify.1.html
[13]: https://app.datadoghq.com/account/settings#agent