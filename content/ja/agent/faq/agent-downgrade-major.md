---
aliases:
- /ja/agent/faq/agent-downgrade
kind: faq
title: Agent を以前のメジャーバージョンにダウングレードする
---

## Agent を v7 から v6 にダウングレードする

{{< tabs >}}
{{% tab "Linux" %}}

まず、[Agent v7 をシステムからアンインストール][1]します。

次に、[v6 から v7 へのアップグレード][2]手順に従った場合、Agent をバージョン 7 からバージョン 6 にダウングレードするために、以下の Agent インストールコマンドを実行します。

```shell
DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

このコマンドは、Amazon Linux、CentOS、Debian、Fedora、Red Hat、Ubuntu、および SUSE のサポートされているすべてのバージョンで動作します。

[1]: /ja/agent/guide/how-do-i-uninstall-the-agent/
[2]: /ja/agent/versions/upgrade_to_agent_v6/
{{% /tab %}}
{{% tab "Windows" %}}

1. [システムから Agent v7 をアンインストール][1]します。
2. [Datadog Agent インストーラーをダウンロードします][2]。
3. `datadog-agent-6-latest.amd64.msi` を開き、インストーラを (**管理者として**) 実行します。
4. プロンプトに従ってライセンス契約に同意し、[Datadog API キー][3]を入力します。
5. インストールが終了したら、オプションから Datadog Agent Manager を起動できます。

**注**: Windows インストーラーの利用可能な全バージョンのリンクは、[JSON 形式で提供されています][4]。

[1]: /ja/agent/guide/how-do-i-uninstall-the-agent/
[2]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-6-latest.amd64.msi
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
{{% /tab %}}
{{% tab "MacOS" %}}

まず、[Agent v7 をシステムからアンインストール][1]します。

次に、[v6 から v7 へのアップグレード][2]手順に従った場合、Agent をバージョン 7 からバージョン 6 にダウングレードするために、環境変数 `DD_AGENT_MAJOR_VERSION=6` で Agent インストールコマンドを実行します。

```shell
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"
```

[1]: /ja/agent/guide/how-do-i-uninstall-the-agent/
[2]: /ja/agent/versions/upgrade_to_agent_v6/
{{% /tab %}}
{{< /tabs >}}

## Agent を v6 から v5 にダウングレードする

このガイドは、[アップグレードガイド][1]を使用して Agent v6 にアップグレードしたことを想定しています。その場合、お使いの OS を選択して、Agent をバージョン 6 からバージョン 5 にダウングレードする方法の詳細な手順をご覧ください。

{{< tabs >}}
{{% tab "Linux" %}}

**Debian Flavored Systems**:

1. https でダウンロードできるように apt を設定し、`curl` と `gnupg` をインストールする

    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. ベータ版のリポジトリを削除し、安定版のリポジトリが存在することを確認します。

    ```shell
    sudo rm /etc/apt/sources.list.d/datadog-beta.list
    [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Ubuntu 14 以前または Debian 8 以前を実行している場合は、キーリングを `/etc/apt/trusted.gpg.d` にコピーします。

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. apt を更新し、Agent をダウングレードします。

    ```shell
    sudo apt-get update
    sudo apt-get remove datadog-agent
    sudo apt-get install datadog-agent
    ```

5. 構成とオートディスカバリーテンプレートの同期 (オプション)

   構成やテンプレートを変更した場合、Agent v5 用にこれらを同期することをお勧めします。

   **注**: Agent v6 のみのオプションをサポートするために構成に変更を加えた場合、Agent v5 では動作しません。

6. カスタムチェックを同期します (オプション)。

   &nbsp;Agent 6 のテスト中に何らかの変更または新しいカスタムチェックを追加した場合、Agent 5 に戻して有効にすることができます。**注**: 変更したチェックのみコピーバックする必要があります。

    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<CHECK>.py /etc/dd-agent/checks.d/
    ```

7. Agent を再起動します。

    ```shell
    sudo systemctl restart datadog-agent # Systemd
    sudo /etc/init.d/datadog-agent restart # Upstart
    ```

8. `/etc/datadog-agent` をクリーンアウトします (オプション)。

    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

**Red Hat Flavored Systems**:

1. ベータ版 Yum リポジトリをシステムから削除します。

    ```shell
    rm /etc/yum.repos.d/datadog-beta.repo
    [ ! -f /etc/yum.repos.d/datadog.repo ] && echo -e '[datadog]\nname = Datadog, Inc.\nbaseurl = https://yum.datadoghq.com/rpm/x86_64/   \nenabled=1\ngpgcheck=1\nrepo_gpgcheck=1\npriority=1\ngpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public\n       https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public\n       https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public\n       https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public' | sudo tee /etc/yum.repos.d/datadog.repo
    ```

   **注**: [dnf にバグ][1]が発生しているため、RHEL/CentOS 8.1 では `repo_gpgcheck=1` の代わりに `repo_gpgcheck=0` を使用してください。

2. ローカルの yum キャッシュを更新し、Agent をダウングレードする

    ```shell
    sudo yum clean expire-cache metadata
    sudo yum check-update
    sudo yum remove datadog-agent
    sudo yum install datadog-agent
    ```

3. 構成とオートディスカバリーテンプレートの同期 (オプション)

   構成やテンプレートを変更した場合、Agent v5 用にこれらを同期することをお勧めします。

   **注**: Agent v6 のみのオプションをサポートするために構成に変更を加えた場合、Agent v5 では動作しません。

4. カスタムチェックを同期します (オプション)。

   &nbsp;Agent 6 のテスト中に何らかの変更または新しいカスタムチェックを追加した場合、Agent 5 に戻して有効にすることができます。**注**: 変更したチェックのみコピーバックする必要があります。

    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<CHECK>.py /etc/dd-agent/checks.d/
    ```

5. Agent を再起動します。

    ```shell
    sudo systemctl restart datadog-agent # Systemd
    sudo /etc/init.d/datadog-agent restart # Upstart
    ```

6. `/etc/datadog-agent` をクリーンアウトします (オプション)。

    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

[1]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}
{{% tab "Windows" %}}

最新の 5.x バージョンの Agent インストーラーパッケージを実行します。手順は、[Datadog Agent インテグレーションページ][1]に記載されています。

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
{{% /tab %}}
{{% tab "MacOS" %}}

1. Agent が起動している場合は、Systray アプリで Agent を停止します。
2. systray アプリを終了します。
3. Datadog Agent アプリケーションをアンインストールします。
4. お好きなインストール方法で Agent 5 DMG パッケージをインストールしてください。

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/agent/guide/upgrade-to-agent-v6/