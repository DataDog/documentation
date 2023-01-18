---
kind: faq
title: CircleCI セキュリティインシデントによる Datadog Agent への影響について
---

2023 年 1 月 4 日、Datadog は CircleCI から、保存されているシークレットの漏洩につながる可能性のある[セキュリティインシデント][1]を調査していると通知されました。Datadog は、潜在的な攻撃者が理論的に悪用する可能性のある CircleCI に保存された 1 つのシークレット、古い RPM GNU Privacy Guard (GPG) プライベート署名キーとそのパスフレーズを特定しました。このページでは、潜在的な漏洩の意味と、お客様へのリスクを軽減するために Datadog が取っている対策について記載しています。

<div class="alert alert-info">
<strong>注</strong>: 2023 年 1 月 12 日現在、Datadog では実際にキーが流出したり悪用されたりした形跡はありませんが、慎重を期して以下のようなアクションをとっています。
</div>

## 影響を受けるキー

RPM の GPG 署名キーはフィンガープリント `60A389A44A0C32BAE3C03F0B069B56F54172A230` で、[私たちの署名キーの場所][2]からアクセス可能です。このキーは、歴史的に Agent 5 リリースと Agent 6 の 6.13.0 まで (これを含む) のリリースを署名するために使用されていました。

<div class="alert alert-info">
<strong>注</strong>: Datadog の公式リポジトリは侵害されて<strong>いません</strong>。署名キーが実際に流出した場合、Datadog からのものと見せかけた RPM パッケージを構築するために使用される可能性があります。しかし、そのようなパッケージを公式のパッケージリポジトリに配置するには十分ではないでしょう。
</div>

## 私は影響を受けているのでしょうか？

以下の場合は、何もアクションを起こす必要はありません。

* macOS、Windows、Debian/Ubuntu に Datadog パッケージで Agent をインストールしている場合
* Container Agent を使用している場合
* RPM ベースの Linux ディストリビューション (RHEL、CentOS、Rocky Linux、AlmaLinux、Amazon Linux、SUSE/SLES、Fedora) を使用しているが、システムが対象の GPG キーを信用していない場合 (確認方法は下記を参照)

Datadog では、以下の場合はアクションを起こすことを推奨しています。
* RPM ベースの Linux ディストリビューション (RHEL、CentOS、Rocky Linux、AlmaLinux、Amazon Linux、SUSE/SLES、Fedora) を使用しており、**さらに**システムが対象の GPG キーを信用している場合

## 私のシステムは、影響を受けるキーを信頼していますか？

RPM データベースと Datadog リポジトリファイルの 2 箇所をチェックして、システムが影響を受けるキーを信頼しているかどうかを確認する必要があります。これらのいずれかがキーを信頼していることが確認された場合、次のセクションに記載されているアクションを実行することをお勧めします。これらのどちらもキーを信頼していないと判明した場合、これ以上のアクションは必要ありません。

### RPM データベースにキーがインポートされているかどうかを確認する

次のコマンドを実行します。

```bash
$ rpm -q gpg-pubkey-4172a230-55dd14f6
```

コマンドが 0 で終了し、`gpg-pubkey-4172a230-55dd14f6` と表示されれば、あなたのシステムはそのキーを信頼していることになります。そうでない場合は、信用していません (0 以外の終了コードで終了し、`package gpg-pubkey-4172a230-55dd14f6 is not installed` のようなメッセージが表示される)。

### Datadog リポジトリファイルでキーが使用されているかどうかを確認する

デフォルトのインストールでは、Datadog リポジトリファイルは、次の場所にあります。

* RHEL、CentOS、Rocky Linux、AlmaLinux、Amazon Linux、Fedora では `/etc/yum.repos.d/datadog.repo`
* OpenSUSE と SLES では `/etc/zypp/repos.d/datadog.repo`

もし、リポジトリファイルが `gpgkey` エントリの下にあるこれらの行への参照を含んでいれば、あなたのシステムは影響を受けるキーを信頼していることになります。

* `https://s3.amazonaws.com/public-signing-keys/DATADOG_RPM_KEY.public`
* `https://keys.datadoghq.com/DATADOG_RPM_KEY.public`
* `https://s3.amazonaws.com/yum.datadoghq.com/DATADOG_RPM_KEY.public`
* `https://yum.datadoghq.com/DATADOG_RPM_KEY.public`

(簡単に確認する方法は、`DATADOG_RPM_KEY.public` で終わるエントリがあるかどうかを確認することです)。

## アクションを起こす

Datadog では、影響を受ける全てのお客様に、お使いのシステムが該当するキーを信頼しないようにすることを推奨しています。もし、お使いのシステムが上記の基準の少なくとも 1 つに基づいてキーを信頼していることが分かった場合、以下の手順に従ってください。

### キーを削除する

ここでは、システムが影響を受けるキーを信頼しないようにする方法を説明します。

RPM データベースからキーを削除するには、次のコマンドを実行します。

```bash
$ sudo rpm --erase gpg-pubkey-4172a230-55dd14f6
```

Datadog リポジトリファイルからキーを削除するには、`DATADOG_RPM_KEY.public` で終わっている `gpgkey` 行を削除します。もし、リポジトリファイルの `gpgkey` のエントリがこれだけだった場合は、`https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public` に置き換えてください。これは[影響を受けるキーを信頼しなくなることの意味](#implications-of-no-longer-trusting-the-affected-key)のセクションで説明されている意味があることに注意してください。

#### 自動化ツールの活用

Datadog Ansible ロール ([影響を緩和するために Datadog が行っていること](#what-datadog-is-doing to-mitigate-the-implications)の最新バージョンの全リストを参照) などの古いバージョンの自動化ツールを使用すると、上で推奨した手動変更が逆効果になる場合があります。これを修正する新しいバージョンにまだ更新できない場合は、自動化ツールのランブックにこれらの手動変更を追加することをお勧めします。

### インストールされたパッケージの検証

GPG キーが流出した場合、攻撃者は RPM が Datadog から来たと検証するパッケージを構築し、システムにインストールすることが可能です。Datadog では、細心の注意を払い、システム上の署名されたパッケージがすべて Datadog によってビルドされたものであることを確認することを推奨しています。[このスクリプト][3]を実行することで、検証することができます。

```bash
$ curl -o /tmp/rpm_check.sh https://docs.datadoghq.com/resources/sh/rpm_check.sh && chmod +x /tmp/rpm_check.sh
$ /tmp/rpm_check.sh
```

スクリプトは、

* RPM ヘッダーとペイロードの完全な GPG 署名を検証することで、インストールされた Datadog パッケージが、影響を受けるキーによって署名され、実際に Datadog によってビルドされたことを確認します。
* Datadog によってビルドされていない、影響を受けるキーによって署名されたパッケージを検索します。

`[ ERROR ]` で始まる行は、スクリプトの全出力と一緒に [Datadog サポート][4]に報告してください。

## 影響を受けるキーが信頼されなくなることの意味

* お使いのシステムが Agent 7 を使用している場合、影響はありません。Agent 7 のパッケージは、影響を受けるキーで署名されていません。
* お使いのシステムでは、Agent 6 < 6.14.0 をインストールすることができなくなります。Agent 6 >= 6.14.0 または Agent 7 へのアップグレードをお勧めします。
* お使いのシステムが Agent 5 を使用している場合、Agent 5 <= 5.32.8 をインストールすることはできなくなります。Agent 5.32.9 をインストールするか、6 >= 6.14.0 または Agent 7 にアップグレードすることができます。

## 影響を緩和するために Datadog が行っていること

* [現在の RPM 署名キー](https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public)、`C6559B690CA882F023BDF3F63F4D1729FD4BF915` で署名された CentOS/RHEL 用の新しい Agent 5 RPM、[5.32.9-1][17] をリリースしました。この RPM は、[Agent 5 RPM リポジトリ][18]から入手できます。
* 私たちは、RPM データベースと Datadog リポジトリファイルから影響を受けるキーを明示的に削除することにより、システムを安全にするための新しいバージョンの Agent のインストールをリリースしました。
  * Datadog Ansible ロール: [https://github.com/DataDog/ansible-datadog/][5]
    * リリース [4.18.0][13] では、この問題が修正されています
  * Datadog Chef レシピ: [https://github.com/DataDog/chef-datadog][6]
    * リリース [4.16.0][14] では、この問題が修正されています
  * Datadog Puppet モジュール: [https://github.com/DataDog/puppet-datadog-agent][7]
    * リリース [3.20.0][15] では、この問題が修正されています
  * Datadog Saltstack 式: [https://github.com/DataDog/datadog-formula][8]
    * リリース [3.5][16] では、この問題が修正されています
  * Datadog Agent 6/7 Linux インストールスクリプトのセット:
    * 以下のスクリプトは、2023 年 1 月 12 日 13 時 (UTC) にバージョン 1.13.0 として、以下の場所にリリースされました
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh][9]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh][10]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script.sh][11] (こちらは非推奨で、もはや使用することは推奨されませんが、同様にアップデートされる予定です)
  * Datadog Agent 5 Linux インストールスクリプト: [https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh][12]
    * 2023 年 1 月 12 日 16:25 (UTC) にその[ダウンロード場所][12]にリリースされました

[1]: https://circleci.com/blog/january-4-2023-security-alert/
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY.public
[3]: /resources/sh/rpm_check.sh
[4]: /ja/help/
[5]: https://github.com/DataDog/ansible-datadog/
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/puppet-datadog-agent
[8]: https://github.com/DataDog/datadog-formula
[9]: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh
[10]: https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh
[11]: https://s3.amazonaws.com/dd-agent/scripts/install_script.sh
[12]: https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh
[13]: https://github.com/DataDog/ansible-datadog/releases/tag/4.18.0
[14]: https://github.com/DataDog/chef-datadog/releases/tag/v4.16.0
[15]: https://github.com/DataDog/puppet-datadog-agent/releases/tag/v3.20.0
[16]: https://github.com/DataDog/datadog-formula/releases/tag/3.5
[17]: https://yum.datadoghq.com/rpm/x86_64/datadog-agent-5.32.9-1.x86_64.rpm
[18]: https://yum.datadoghq.com/rpm/x86_64/