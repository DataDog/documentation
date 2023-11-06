---
kind: faq
title: RPM GPG キーローテーション
---

<div class="alert alert-warning">
このページは、2019 年のキーローテーションに関するものです。2022 年のキーローテーションについては、<a href="/agent/faq/linux-agent-2022-key-rotation">2022 年 Linux Agent キーローテーション</a>のドキュメントを参照してください。
</div>


v6.14.0 以降、Agent RPM パッケージは、別の GPG キーで署名されています。一般的なベストプラクティスとして、Datadog は定期的に GPG キーを更新しています。

[Datadog Yum リポジトリ][1]にある RPM パッケージを使用しているホストは、この変更の影響を受け、ホストのキーリングに関連する公開鍵をインポートすることによってキーを信頼する必要があります。

キーを信頼せずに Agent パッケージをインストールまたはアップグレードしようとすると、パッケージのインストール時に `NOKEY` エラーが発生します。

関連する公開鍵のフィンガープリントは、`A4C0B90D7443CF6E4E8AA341F1068E14E09422B3` です。

以下の公式にサポートされているインストール方法で最新版を使用している場合、ホストはキーを自動的に信頼するので、それ以上のアクションは必要ありません。

* [Agent のインストールページ][2]
* [Chef クックブック][3]
* [Ansible ロール][4]
* [Puppet モジュール][5]
* [SaltStack 式][6]

## ホストが GPG キーを信頼しているかどうかを確認する

特定のホストがキーを信頼しているかどうかを確認するには、そのホストで次のコマンドを実行します。

```bash
rpm -q gpg-pubkey-e09422b3
```

キーが信頼できる場合は、コマンドの終了コードが 0 になり、以下が出力されます。

```bash
gpg-pubkey-e09422b3-57744e9e
```

それ以外の場合は、0 以外の終了コードと次のような出力が返されます。

```bash
package gpg-pubkey-e09422b3 is not installed
```

## GPG キーを信頼する

ホストがすでにキーを信頼している場合、または公式のインストール方法の最新バージョンを使用している場合は、この手順は必要ありません。

### インポートコマンド

ホスト上で以下のコマンドを実行します。

```bash
$ curl -o /tmp/DATADOG_RPM_KEY_CURRENT.public https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
$ curl -o /tmp/DATADOG_RPM_KEY_B01082D3.public https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
$ curl -o /tmp/DATADOG_RPM_KEY_FD4BF915.public https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
$ curl -o /tmp/DATADOG_RPM_KEY_E09422B3.public https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public

$ rpm --import /tmp/DATADOG_RPM_KEY_CURRENT.public
$ rpm --import /tmp/DATADOG_RPM_KEY_B01082D3.public
$ rpm --import /tmp/DATADOG_RPM_KEY_FD4BF915.public
$ rpm --import /tmp/DATADOG_RPM_KEY_E09422B3.public
```

その後、[ホストが GPG キーを信頼しているかどうかを確認する](#check-if-a-host-trusts-the-gpg-key)の手順でキーが信頼されているか確認します。

### Yum リポジトリファイルの更新

CentOS、RHEL、Amazon Linux では、Datadog のリポジトリ (`datadog.repo`) を定義するために Yum リポジトリファイルを使用している場合、それを更新して信頼できるキーとして追加してください。

{{< tabs >}}
{{% tab "Agent v7" %}}

```conf
[datadog]
name = Datadog, Inc.
baseurl = https://yum.datadoghq.com/stable/7/x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
```

{{% /tab %}}
{{% tab "Agent v6" %}}

```conf
[datadog]
name = Datadog, Inc.
baseurl = https://yum.datadoghq.com/stable/6/x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
```

{{% /tab %}}
{{< /tabs >}}

**注**: [dnf にバグ][7]が発生しているため、RHEL/CentOS 8.1 では `repo_gpgcheck=1` の代わりに `repo_gpgcheck=0` を使用してください。

**注**: この方法は、SUSE ベースのシステムでは動作しません。代わりに [インポートコマンド](#import-command)を使ってください。

[1]: https://yum.datadoghq.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/chef-datadog
[4]: https://github.com/DataDog/ansible-datadog
[5]: https://github.com/DataDog/puppet-datadog-agent
[6]: https://github.com/DataDog/datadog-formula
[7]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506