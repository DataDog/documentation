---
aliases:
- /ja/agent/faq/downgrade-datadog-agent

title: Agent を以前のマイナーバージョンにダウングレードする
---

Datadog Agent の DEB または RPM パッケージの場合、Datadog Agent を以前のマイナーバージョンにダウングレードするには、以下の手順をご覧ください。

Datadog Agent を以前のメジャーバージョンにダウングレードするには、[専用ページ][1]に記載されている手順に従ってください。

**注**:

* これらの手順は、Datadog Agent バージョン 6.x 以降にのみ有効です。
* 以下の構成管理ツールに関する説明は、これらのツールの最新のメジャーバージョンでのみ動作します。Chef クックブックは v4.x、Puppet モジュールは v3.x、Ansible ロールは v4.x です。それ以前のバージョンを使用している場合は、各ツールのリポジトリにあるそのバージョンのドキュメントを参照してください ([Chef クックブック v3.x][2]、[Puppet モジュール v2.x][3]、[Ansible ロール v3.x][4])。

## Debian/Ubuntu

### CLI

```shell
sudo apt-get update && sudo apt-get install --allow-downgrades datadog-agent=1:X.Y.Z-1
```

**注**: お使いの apt のバージョンに `--allow-downgrades` というオプションがない場合は、代わりに `--force-yes` を使うことができます。

### 構成管理ツール

{{< tabs >}}
{{% tab "Chef" %}}

```rb
node["datadog"]["agent_version"] = "1:X.Y.Z-1"
node["datadog"]["agent_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

```conf
class { 'datadog_agent':
      ...
      agent_version => "1:X.Y.Z-1",
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

プレイブックに以下の属性を追加します。

```yaml
datadog_agent_version: "1:X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

## RHEL/CentOS/Amazon Linux

### CLI

```shell
sudo yum clean expire-cache metadata && sudo yum downgrade datadog-agent-X.Y.Z-1
```

### 構成管理ツール

{{< tabs >}}
{{% tab "Chef" %}}

ノードに以下の属性を設定します。

```rb
node["datadog"]["agent_version"] = "X.Y.Z-1"
node["datadog"]["agent_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

```conf
class { 'datadog_agent':
      ...
      agent_version => "X.Y.Z-1",
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

プレイブックに以下の属性を追加します (CentOS の場合、Ansible 2.4 以上でないと動作しません)。

```yaml
datadog_agent_version: "X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

## SUSE

### CLI

```shell
sudo zypper --no-gpg-check refresh datadog && sudo zypper install --oldpackage datadog-agent-1:X.Y.Z-1
```

### 構成管理ツール

{{< tabs >}}
{{% tab "Chef" %}}

ノードに以下の属性を設定します。

```rb
node["datadog"]["agent_version"] = "1:X.Y.Z-1"
node["datadog"]["agent_package_action"] = "install"
node["datadog"]["agent_allow_downgrade"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

Datadog のモジュールは SUSE をサポートしていません。

{{% /tab %}}
{{% tab "Ansible" %}}

プレイブックに以下の属性を追加します。

```yaml
datadog_agent_version: "1:X.Y.Z-1"
datadog_agent_allow_downgrade: yes
```

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/agent/faq/agent-downgrade-major/
[2]: https://github.com/DataDog/chef-datadog/tree/3.x
[3]: https://github.com/DataDog/puppet-datadog-agent/tree/2.x
[4]: https://github.com/DataDog/ansible-datadog/tree/3.x
