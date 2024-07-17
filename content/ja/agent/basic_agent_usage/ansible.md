---
dependencies:
- https://github.com/ansible-collections/Datadog/blob/main/README.md
title: Ansible
---
## Description

Datadog Ansible コレクションである `datadog.dd` は、Ansible 関連の Datadog コンテンツの公式コレクションです。[Ansible Datadog Role](https://github.com/DataDog/ansible-datadog/) が含まれており、`datadog.dd.agent` としてアクセスすることで、Datadog Agent とインテグレーションをインストール・構成することができます。Agent バージョン 7 がデフォルトでインストールされます。

## Requirements

- Ansible v2.10+
- Supports most Debian, RHEL-based and SUSE-based Linux distributions, macOS, and Windows.
- Windows ホストを管理するには、`ansible.windows` コレクションをインストールしてください。

  ```shell
  ansible-galaxy collection install ansible.windows
  ```
- openSUSE/SLES ホストを管理する場合は、`community.general` コレクションをインストールしてください。

  ```shell
  ansible-galaxy collection install community.general
  ```

## Installation

このコレクションを使用する前に、Ansible Galaxy コマンドラインツールを使用してインストールしてください。

```
ansible-galaxy collection install datadog.dd
```

または、`requirements.yml` ファイルに以下を含めて、`ansible-galaxy collection install -r requirements.yml` でインストールします。


```yaml
collections:
  - name: datadog.dd
```

**注**: Ansible Galaxy からコレクションをインストールした場合、Ansible パッケージをアップグレードしても自動的にアップグレードされません。
コレクションを最新バージョンにアップグレードするには、次のコマンドを実行します。

```
ansible-galaxy collection install datadog.dd --upgrade
```

例えば、最新バージョンで問題が発生した場合などにダウングレードが必要な場合、コレクションの特定のバージョンをインストールすることができます (このリポジトリで問題を報告してください)。以下の構文でバージョン 5.0.0 をインストールする方法を示します。

```
ansible-galaxy collection install datadog.dd:==5.0.0
```

詳細は [Ansible コレクションの使用](https://docs.ansible.com/ansible/devel/user_guide/collections_using.html)を参照してください。

The Datadog Ansible collection is also available through the [Red Hat Automation Hub](https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/), where it is officially certified by Red Hat.

## Use cases

To deploy the Datadog Agent on hosts, add the Datadog role and your API key to your playbook:

```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

**注**: Ansible Automation Hub を使用してコレクションをインストールする場合、OpenSUSE/SLES の機能はコミュニティコレクション `community.general` に依存します。Red Hat サポートでは、コミュニティコンテンツに関する問題のサポートは提供していません。OpenSUSE/SLES に関するすべてのサポートは、[Datadog サポート][1]に直接お問い合わせください。


## Testing

Datadog Collection は CentOS、Debian、Rocky Linux、OpenSUSE、Windows、macOS でテストされています。テストは最新の `ansible-lint` バージョンで実行され、サニティチェックは Python 3.9 から Python 3.12 で実行されています。

## Support

サポートが必要な場合は、`ansible-collections` GitHub リポジトリに issue を作成するか、[Datadog サポート][1]に連絡してください。

## リリースノート

変更点は [CHANGELOG][2] ファイルで確認できます。

## Further reading

- [Datadog Ansible コレクションで Agent のインストールを自動化する][6]
- コレクションのロール: `datadog.dd.agent`: Datadog Agent のインストールと構成。
  - このロールの公式ドキュメントは[こちら][3]を参照してください。
  - スタンドアロンロールのリポジトリは[こちら][4]を参照してください。

## ライセンス情報

Datadog Ansible コレクションは [Apache License 2.0][5] の下で公開されています。

[1]: https://docs.datadoghq.com/ja/help/
[2]: https://github.com/ansible-collections/Datadog/blob/main/CHANGELOG.rst
[3]: https://docs.datadoghq.com/ja/agent/guide/ansible_standalone_role/#setup
[4]: https://github.com/DataDog/ansible-datadog#readme
[5]: https://github.com/ansible-collections/Datadog/blob/main/LICENSE
[6]: https://www.datadoghq.com/blog/datadog-ansible-collection/