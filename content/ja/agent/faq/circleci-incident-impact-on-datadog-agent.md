---

title: CircleCI セキュリティインシデントによる Datadog Agent への影響について
---
<details>
  <summary><strong>ページ変更ログ</strong></summary>

  <table>
    <tr>
        <td><strong>日付</strong></td>
        <td><strong>説明</strong></td>
    </tr>
    <tr>
        <td>2023 年 1 月 13 日</td>
        <td>初公開</td>
    </tr>
    <tr>
        <td>2023 年 1 月 16 日</td>
        <td><code>rpm_check</code> スクリプト v1.1.0 の更新、わかりやすさのための編集</td>
    </tr>
    <tr>
        <td>2023 年 1 月 17 日</td>
        <td><a href="/resources/sh/rpm_check.sh"><code>rpm_check</code></a> スクリプト v1.2.0 を更新し、より明確な特定と改善手順を追加しました</td>
    </tr>
    <tr>
        <td>2023 年 2 月 3 日</td>
        <td>どの Agent 5 のバージョンが影響を受けるキーで署名されているかを明確にしました</td>
    </tr>
</table>
</details>

<div class="alert alert-warning"><strong>サマリー</strong>: RPM ベースの Linux ホスト (RHEL、CentOS、Rocky Linux、AlmaLinux、Amazon Linux、SUSE/SLES、Fedora) をチェックし、フィンガープリント <code>60A389A44A0C32BAE3C03F0B069B56F54172A230</code> 付きのキーを信頼しているものを見つけて修正します。</a></div>

2023 年 1 月 4 日、Datadog は CircleCI から、保存されているシークレットの漏洩につながる可能性のある[セキュリティインシデント][1]を調査していると通知されました。Datadog は、潜在的な攻撃者が理論的に悪用する可能性のある CircleCI に保存された 1 つのシークレット、古い RPM GNU Privacy Guard (GPG) プライベート署名キーとそのパスフレーズを特定しました。このページでは、情報漏洩の可能性がある場合の影響、お客様のホスト上で取るべきアクション、Datadog がお客様に対するリスクを軽減するために取っている措置についての情報を提供します。

<div class="alert alert-info">
<strong>注</strong>: 2023 年 1 月 16 日現在、Datadog では実際にキーが流出したり悪用されたりした形跡はありませんが、慎重を期して以下のようなアクションをとり、助言しています。
</div>

## 影響を受けるキー

RPM の GPG 署名キーはフィンガープリント `60A389A44A0C32BAE3C03F0B069B56F54172A230` で、[私たちの署名キーの場所][2]からアクセス可能です。このキーは、歴史的に以下を署名するために使用されていました。

* v5.32.8 まで (これを含む) の Agent 5 リリースと v6.13.0 まで (これを含む) の Agent 6 リリース (`datadog-agent` パッケージ)
* スタンドアロン版 DogStatsD 6 リリースとスタンドアロン版 DogStatsD 7 リリース v7.23.1 (`datadog-dogstatsd` パッケージ) まで

<div class="alert alert-info">
<strong>注</strong>: Datadog の公式リポジトリは侵害されて<strong>いません</strong>。署名キーが実際に流出した場合、Datadog からのものと見せかけた RPM パッケージを構築するために使用される可能性があります。しかし、そのようなパッケージを公式のパッケージリポジトリに配置するには十分ではないでしょう。効果的であるためには、影響を受けるキーを持つ仮想的な攻撃者は、構築された RPM パッケージをお客様のホストが使用するリポジトリにアップロードできる必要があります。
</div>

## 影響を受けるホストの発見

このインシデントは、RHEL、CentOS、Rocky Linux、AlmaLinux、Amazon Linux、SUSE/SLES、Fedora などの **RPM ベースの Linux ディストリビューション**を実行しているホストに影響を与える可能性があります。macOS、Windows、Debian、Ubuntu などの他の OS を実行しているホスト、および Container Agent は影響を受けません。

開始する前に、大規模なインフラストラクチャーがある場合は、キーを信頼するホストを **優先的に検索してください**。パッケージは様々な方法でインストールされ、更新されるため、Datadog では、Datadog パッケージがインストールされている RPM ベースの Linux ホストを**すべて**確認することを推奨しています。どのホストを最初にチェックするかの優先順位を決めるために、以下のガイダンスを検討してください。以下のシナリオは、影響を受ける可能性が **高い** です。
   * Agent v5 または v6
   * スタンドアロン版 DogStatsD v6 または v7.23.2 以前

   RPM ベースの Linux ホストでは、以下のシナリオは影響を受ける可能性は**低い**ですが、それでもホストを確認する価値はあります。
   * Agent v7
   * スタンドアロン版 DogStatsD v7.23.2+。

   以下のシナリオは影響を**受けません**。
   * Agent が、macOS、Windows、Debian、Ubuntu の Datadog パッケージでインストールされた場合。
   * ホストが Container Agent を使用している場合。

各ホストをチェックして、RPM データベースか Datadog リポジトリファイルのどちらか、または両方から影響を受けるキーを信頼しているかどうかを確認します。

1. 以下のコマンドを実行して、RPM データベースを確認します。

   ```bash
   $ rpm -q gpg-pubkey-4172a230-55dd14f6
   ```

   コマンドの実行に成功し、`gpg-pubkey-4172a230-55dd14f6` と出力された場合、**ホストはキーを信頼し、アクションを要します**。コマンドが失敗し、0 以外の終了コードで終了し、`package gpg-pubkey-4172a230-55dd14f6 is not installed` などのメッセージが出力された場合、**ホストは RPM データベース内のキーを信頼していません**。

2. Datadog のリポジトリファイルを確認します。ファイルのデフォルトの場所は以下の通りです。

   - RHEL、CentOS、Rocky Linux、AlmaLinux、Amazon Linux、Fedora: `/etc/yum.repos.d/datadog.repo`
   - OpenSUSE および SLES:  `/etc/zypp/repos.d/datadog.repo`

   以下の例のように、リポジトリファイルが `gpgkey` の項目に `DATADOG_RPM_KEY.public` と言及している場合、**そのホストは影響を受けるキーを信頼し、アクションを要します**。

   * `https://s3.amazonaws.com/public-signing-keys/DATADOG_RPM_KEY.public`
   * `https://keys.datadoghq.com/DATADOG_RPM_KEY.public`
   * `https://s3.amazonaws.com/yum.datadoghq.com/DATADOG_RPM_KEY.public`
   * `https://yum.datadoghq.com/DATADOG_RPM_KEY.public`

これらのうち、どちらか一方または両方がキーを信頼していると確認された場合、 影響を受けるホストを保護するために以下のセクションに記載されているアクションを実行します。どちらもキーを信頼していないと確認された場合、それ以上のアクションは必要ありません。

## 影響を受けるホストの保護

ホストが**影響を受けるキーの信頼を停止している**ことを確認します。前の手順でホストがキーを信頼していることが示された場合、次の手順を実行します。

1. Ansible Datadog ロールなどの構成自動化ツールやプラグインを使用している場合は、[Datadog が行っていること](#what-datadog-is-doing)に記載の最新バージョンにアップデートしてください。

   これらの自動化ツールやプラグインの旧バージョンのままでは、せっかくの修復作業が逆効果になる可能性があります。まだ新しい固定バージョンにアップデートできない場合は、手動キー削除の手順 (ステップ 3 および 4) を自動化ツールのランブックに追加し、ランブックの順序で Datadog ツールおよびプラグインの後にこれらが実行されるようにしてください。

2. Datadog の公式インストールスクリプトを使用してセットアップされているホストでは、最新バージョンのインストールスクリプトを実行してキーの信頼性を解除し、更新されたリポジトリファイルをプロビジョニングしてください。

3. `rpm -q gpg-pubkey-4172a230-55dd14f6` を実行してもキーが検出される場合は、次のコマンドを実行して RPM データベースからキーを削除し、信頼するのをやめてください。

   ```bash
   $ sudo rpm --erase gpg-pubkey-4172a230-55dd14f6
   ```

4. `DATADOG_RPM_KEY.public` がまだリポジトリに残っている場合は、`DATADOG_RPM_KEY.public` で終わる `gpgkey` 行を削除してキーを削除してください。もし、リポジトリファイルの `gpgkey` のエントリーがこれだけであれば、`https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public` に置き換えてください。詳しくは、[影響を受けるキーを信頼しなくなることの意味](#implications-of-no-longer-trusting-the-affected-key)のセクションをご覧ください。

5. 用心のため、[このスクリプト][3]を実行して、影響を受けるホスト上で影響を受けるキーによって署名されたパッケージを Datadog がビルドしたことを確認します。

   ```bash
   $ curl -o /tmp/rpm_check.sh https://docs.datadoghq.com/resources/sh/rpm_check.sh && chmod +x /tmp/rpm_check.sh
   $ /tmp/rpm_check.sh
   ```

   このスクリプトは、影響を受けるキーによって署名されたインストールされた Datadog パッケージが Datadog によってビルドされたことを確認し、Datadog によってビルドされていない、影響を受けるキーによって署名されたパッケージを検索します。

   出力に `[ ERROR ]` で始まる行が含まれる場合、スクリプトの完全な出力と共に、**これらを [Datadog サポート][4]に報告してください**。

## 影響を受けるキーが信頼されなくなることの意味

該当するホストが Agent 7 を使用している場合、影響はありません。Agent 7 のパッケージは、影響を受けるキーで署名されていません。

ホストは以下をインストールできなくなりました。
- v6.14.0 より前の Agent。少なくとも v6.14.0 または Agent v7 にアップグレードしてください。
- スタンドアロン版 DogStatsD v6 またはスタンドアロン版 DogStatsD v7.24.0 より前のバージョン (`datadog-dogstatsd` パッケージ)。スタンドアロン版 DogStatsD 7.24.0+ にアップグレードしてください。
- v5.32.8 より前の Agent。Agent v5.32.9+ をインストールするか、v6.14.0+ または Agent v7 にアップグレードしてください。

## Datadog が行っていること

[現在の RPM 署名キー][6]、`C6559B690CA882F023BDF3F63F4D1729FD4BF915` で署名された CentOS/RHEL 用の **新しい Agent 5 RPM **、[5.32.9-1][5] をリリースしました。この RPM は、[Agent 5 RPM リポジトリ][7]から入手できます。

私たちは、RPM データベースと Datadog リポジトリファイルから影響を受けるキーを明示的に削除することにより、ホストを安全にするための新しいバージョンの **Agent のインストール**をリリースしました。
  * [Datadog Ansible ロール][8]リリース [4.18.0][9]
  * [Datadog Chef レシピ][10]リリース [4.16.0][11]
  * [Datadog Puppet モジュール][12]リリース [3.20.0][13]
  * [Datadog SaltStack 式][14]リリース [3.5][15]
  * Datadog Agent 6/7 Linux インストールスクリプト、2023 年 1 月 12 日 13 時 (UTC) にバージョン 1.13.0 を以下の場所にリリースしました。
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh][16]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh][17]
    * [https://s3.amazonaws.com/dd-agent/scripts/install_script.sh][18] (非推奨となりましたが、更新しました。)
  * [Datadog Agent 5 Linux インストールスクリプト][19]が 2023 年 1 月 12 日 16:25 UTC にその[ダウンロード場所][19]にリリースされました



[1]: https://circleci.com/blog/january-4-2023-security-alert/
[2]: https://keys.datadoghq.com/DATADOG_RPM_KEY.public
[3]: /resources/sh/rpm_check.sh
[4]: /ja/help/
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
