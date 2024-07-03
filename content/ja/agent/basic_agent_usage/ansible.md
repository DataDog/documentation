---
dependencies:
- https://github.com/ansible-collections/Datadog/blob/main/README.md
title: Ansible
---
## 概要

Datadog Ansible コレクションである `datadog.dd` は、Ansible 関連の Datadog コンテンツの公式コレクションです。現時点では、[Ansible Datadog Role](https://github.com/DataDog/ansible-datadog/) のみが含まれています。このロールには `datadog.dd.agent` としてアクセスすることができ、Datadog Agent とインテグレーションをインストール、構成することを可能にします。Agent のバージョン 7 がデフォルトでインストールされます。

## セットアップ

### 要件

- Ansible v2.10 以上。
- Debian、RHEL ベース、SUSE ベースの Linux ディストリビューションのほとんど、並びに macOS と Windows をサポートしていること。
- Windows ホストを管理するために使用する場合、`ansible.windows` コレクションをインストールする必要があります。

  ```shell
  ansible-galaxy collection install ansible.windows
  ```
- openSUSE/SLES ホストを管理するために使用する場合、`community.general` コレクションをインストールする必要があります。

  ```shell
  ansible-galaxy collection install community.general
  ```

### インストール

Ansible Galaxy からインストールするには、以下を実行します。

```shell
ansible-galaxy collection install datadog.dd
```

Datadog Ansible コレクションは [Red Hat Automation Hub](https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/) からも入手可能で、Red Hat によって正式に認定されています。

### 使用方法

Datadog Agent をホストにデプロイするには、Datadog のロールと API キーをプレイブックに追加します。

```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

Ansible Automation Hub 経由でコレクションをインストールするユーザーへの注: OpenSUSE/SLES の機能は `community.general` というコミュニティコレクションに依存しています。Red Hat サポートでは、コミュニティコンテンツに関する問題のサポートは提供していません。したがって、OpenSUSE/SLES に関するすべてのサポート問題は、Datadog サポートに直接お問い合わせください。

### コレクションロールリスト

- `datadog.dd.agent`: Datadog Agent のインストールと構成。
  - [ロールに関する公式ドキュメント](https://docs.datadoghq.com/agent/guide/ansible_standalone_role/#setup)を参照してください。
  - [スタンドアロンロールのリポジトリ](https://github.com/DataDog/ansible-datadog#readme)を参照してください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Ansible コレクションによる Agent インストールの自動化](https://www.datadoghq.com/blog/datadog-ansible-collection/)