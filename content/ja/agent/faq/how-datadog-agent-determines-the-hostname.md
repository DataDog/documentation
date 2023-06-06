---
aliases:
- /ja/agent/faq/how-can-i-change-the-hostname/
comments: <!–– オリジナルのフローチャートは lucidchart にあります。リンクは Trello を検索するか、Grant にお尋ねください。
  ––>
kind: faq
title: Datadog が Agent ホスト名を決定する方法
---

## 想定されるホスト名

Datadog Agent は、多くの異なるソースからホスト名の候補を収集します。Agent の[ status サブコマンド][1]を実行すると、Agent が検出しているすべての名前を確認することができます。
```text
...
Hostnames
=========

  hostname: my.special.hostname
  agent-hostname: my.special.hostname
  ec2-hostname: ip-192-0-0-1.internal
  instance-id: i-deadbeef
  socket-hostname: myhost
  socket-fqdn: myhost.mydomain
...
```

これらの名前から、ホストの標準的な名前が選択されます。Agent は、この名前を使用して Datadog に自分自身を識別します。他の名前も同様に送信されますが、エイリアシングの候補としてのみ使用されます。

ホストの正規名は、以下の規則に従って最初に一致した名前が選択されます。

1. **agent-hostname**: [Agent 構成ファイル][2]で明示的に設定されたホスト名で、ip- または domu で始まらない場合。
2. **hostname** (Linux では `hostname -f`): DNS ホスト名が EC2 のデフォルトでない場合。例: `ip-192-0-0-1`
3. **instance-id**: Agent がホストから EC2 メタデータエンドポイントに到達できる場合。
4. **hostname**: DNS ホスト名が EC2 のデフォルトである場合でも、それが使用されます。

名前が一般的な一意でない名前と認められる場合 (例: `localhost.localdomain`)、その規則は失敗となり、次の規則に進みます。

### AWS ホスト

[Datadog API][3] から AWS ホストの情報を引き出すと、アベイラビリティに応じて以下のような属性が表示されます。

| 属性      | 説明                                         |
|----------------|-----------------------------------------------------|
| `aws_id`       | インスタンス ID。インスタンス ID がない場合はホストにフォールバックする |
| `aws_name`     | クラウドの `providername` タグ                        |
| `display_name` | 正規のホスト名 (ホスト識別子の値)   |

### ホストのエイリアス

EC2 で稼働する1台のホストは、インスタンス ID (i-abcd1234)、ホストの IP アドレスに基づいて EC2 が提供する一般的なホスト名 (ip-192-0-0-1)、内部 DNS サーバーまたは設定管理されたホストファイルによって提供される意味のあるホスト名 (myhost.mydomain) を持っているかもしれません。Datadog は、1 つのホストに対して一意に識別可能な複数の名前がある場合、ホスト名のエイリアスを作成します。

Agent によって収集された名前 (上記の詳細) は、選択された正規名のエイリアスとして追加されます。

[インフラストラクチャーリスト][4]から、アカウントにあるすべてのホストのリストを見ることができます。各ホストに関連するエイリアスは、ホストの行にカーソルを置いた状態で **Inspect** ボタンをクリックすることでアクセスできる検査パネルで確認できます。

{{< img src="agent/faq/host_aliases.png" alt="ホストのエイリアス" >}}

**注**: これらのエイリアスは、検索やフィルターには使用できません。これらのエイリアスは、上記の検査パネルでのみ利用可能です。

## Agent バージョン

Agent v5 と Agent v6 では、ホスト名解決に違いがあります。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

### Linux と macOS

Agent v5 から Agent v6 へのアップグレードの際、Agent から報告されるホスト名に違いが生じる場合があります。システムホスト名を解決するために、Agent v5 は `hostname -f` コマンドを使用し、Agent v6 は Golang API `os.Hostname()` を使用します。アップグレードの際、Agent のホスト名が FQDN (Fully-Qualified Domain Name) から短いホスト名に変更されることがあります。

`sub.domain.tld` --> `sub`

**注**: Agent v6.3 から、Agent v6 で Agent v5 と同じ動作をさせるための `hostname_fqdn` 構成オプションが導入されました。 バージョン 6.3+ ではこのフラグはデフォルトで無効化されています。このオプションを有効にするには、[datadog.yaml の例][1]を参照してください。

#### 影響を受けるかどうかの判断

v6.3.0 以降、この変更の影響を受ける場合、Agent は以下の警告をログに記録します。
```text
DEPRECATION NOTICE: The agent resolved your hostname as <HOSTNAME>. However in a future version, it will be resolved as <FQDN> by default. To enable the future behavior, please enable the `hostname_fqdn` flag in the configuration.
```

以下のいずれかに該当する場合は、影響を受けません。

* Agent が GCE で実行されている。
* ホスト名が [Agent のメインコンフィギュレーション][2]ファイル、または環境変数 `DD_HOSTNAME` で設定されている。
* Agent が、Docker または Kubernetes API にアクセスできるコンテナで実行されている。
* `cat /proc/sys/kernel/hostname` と `hostname -f` のホスト名出力が同じ。

#### 推奨アクション

この変更の影響を受ける場合、Datadog では Agent をアップグレードする際に以下のアクションを取ることを推奨しています。

* **Agent v5 から Agent v < 6.3 にアップグレードする場合**: Agent のメインコンフィギュレーション][2]ファイルにホスト名をハードコードします。
* **Agent v5 から Agent >= v6.3 にアップグレードする場合**: [Agent のメインコンフィギュレーション][2]ファイルの `hostname_fqdn` オプションを有効にします。これにより、同じホスト名を維持することができます。
* **Agent v5 から Agent v6 (デフォルトで fqdn を使用する将来のバージョン) にアップグレードする場合**: 何もアクションを起こす必要はありません。
* 将来 Agent をアップグレードする際に、Agent v6 の現在のデフォルトの動作を確実に維持したい場合は、`hostname_fqdn` を `false` に設定します。とはいえ、Datadog では、可能な限り `hostname_fqdn` を `true` に切り替えることを推奨しています。

### Windows

Agent v5 では、Windows Agent はデフォルトで未修飾ホスト名を報告しました。後方互換性を維持するために、この動作は Agent v6 で維持されます。新しいフラグ `hostname_fqdn` は Windows ではデフォルトで無効のままであり、将来の **v6** バージョンでもデフォルトで無効のままです。

Windows Agent は、v6.5 からこの構成フラグを尊重します。`hostname_fqdn` を true に設定すると、Windows Agent は完全修飾ホスト名を報告するようになります。

#### 推奨アクション

デフォルトでは、推奨アクションは何もしないことです。これは、特に Agent v5 からアップグレードする場合、既存の動作を維持するものです。

Windows ホストで完全修飾ホスト名を報告させたい場合は、[Agent のメインコンフィギュレーションファイル][2]に `true` に設定された `hostname_fqdn` を追加します。

### GCE

_GCE 上で動作する Agent にのみ影響します_

デフォルトでは、Agent v6 は GCE から提供されたインスタンスのホスト名を使用します。これは、Agent v5.5.1+ の `datadog.conf` で `gce_updated_hostname` を true に設定した場合の動作と同じです。

Agent v5 で `gce_updated_hostname` が未設定または false に設定されていて、Agent のホスト名が `datadog.conf`/`datadog.yaml` でハードコードされていない場合、Datadog で報告されるホスト名が GCE インスタンス `name` から完全な GCE インスタンス `hostname` (GCE プロジェクト ID を含む) に変更されます。

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/faq/agent_hostname.jpeg" alt="Agent のホスト名スキーム" >}}

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/agent/guide/agent-commands/#agent-status-and-information
[2]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /ja/api/v1/hosts/
[4]: https://app.datadoghq.com/infrastructure