---
title: Datadog Windows Agent User
aliases:
  - /agent/faq/windows-agent-ddagent-user/
algolia:
  tags: [windows agent user, windows user,ddagentuser, group policy]
---

By default, the Windows Agent uses the `ddagentuser` account created at install time. The account is assigned to the following groups during installation:

* "Performance Monitor Users" グループのメンバーになる
  * Necessary to access WMI information
  * Windows のパフォーマンスカウンターデータにアクセスするために必要
* "Event Log Readers" グループのメンバーになる
* It becomes a member of the "Performance Log Users" group (since 7.51)

**注**: インストーラーは、作成したアカウントをデフォルトで `Users` グループに追加しません。まれに、権限の問題が発生することがあります。その場合、作成したユーザーを手動で `Users` グループに追加してください。

Additionally, the following security policies are applied to the account during installation:
* ネットワークからこのコンピューターへのアクセスを拒否する
* ローカルでのログオンを拒否する
* Remote Desktop Services によるログオンを拒否する
* サービスとしてのログオン

The Windows Agent can also use a user-supplied account. Do not use a 'real' user account. The user-supplied account should be solely dedicated to running the Datadog Agent. The account is modified during installation to restrict its privileges, including login privileges.

**注**: `7.38.0/6.38.0` リリースから、インストーラーは **Grouped Managed Service Account (gMSA)** の使用をサポートします。Grouped Managed Service Account を指定するには、ユーザー名の最後に **$** を追加します: `<DOMAIN>\<USERNAME>**注**: 7.38.0/6.38.0 リリースから、インストーラーは **Grouped Managed Service Account (gMSA)** の使用をサポートします。Grouped Managed Service Account を指定するには、ユーザー名の最後に **$** を追加します。Grouped Managed Service Account は、インストーラーが作成できないため、インストール前に存在する必要があります。

## インストール

コマンドラインでユーザーアカウントが指定されなかった場合、インストーラーはランダムに生成されたパスワードで `ddagentuser` という名前のローカルユーザーアカウントを作成しようとします。

If a user account is specified on the command line, but this user account is not found on the system, the installer attempts to create it. If a password was specified, the installer uses that password, otherwise it generates a random password.

To specify the optional USERNAME and PASSWORD on the command line, pass the following properties to the `msiexec` command (The bracket `<>` characters indicate a variable that should be replaced):

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<USERNAME> DDAGENTUSER_PASSWORD=<PASSWORD>
```

要件:
* The username must be 20 characters or fewer to comply with Microsoft's [Active Directory Schema (AD Schema) SAM-Account-Name attribute][1].
* Due to a restriction in the MSI installer, the `DDAGENTUSER_PASSWORD` property cannot contain the semicolon character `;`.

**注**: インストール時に `system` と `winproc` のチェックで権限の問題が発生した場合、`ddagentuser` が Performance Monitor Users と Event Log Readers グループのメンバであることを確認してください。

**注**: インストーラーの UI ではユーザーを指定することができません。コマンドラインを使用して `DDAGENTUSER_NAME` と他のパラメータを渡してください。UI インストールであっても、それらは考慮されます。

### グループポリシーによるインストール

インストーラーは、新しく作成されたユーザーアカウントが**サービスとして実行**できるように、ローカルのグループポリシーを変更します。
ドメイングループポリシーがそれを許可しない場合、インストールの設定が上書きされ、ユーザーアカウントがサービスとして実行できるようにドメイングループポリシーを更新する必要があります。

### ドメイン環境でのインストール

#### ドメイン参加マシン

ドメインに参加したマシンでは、Agent インストーラーは、ドメインまたはローカルのいずれであっても、ユーザー提供のアカウントを使用するか、またはローカルアカウントを作成することができます。

ドメインアカウントをコマンドラインで指定する場合、ドメインコントローラのみがドメインアカウントを作成できるため、インストール前に存在している必要があります。

If a user account is specified on the command line, but this user account is not found on the system, the installer attempts to create it. If a password was specified, the installer uses that password, otherwise it generates a random password.

To specify a username from a domain account, use the following form for the `DDAGENTUSER_NAME` property:

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<DOMAIN>\<USERNAME> DDAGENTUSER_PASSWORD=<PASSWORD>
```

`<DOMAIN>` には完全修飾ドメイン名 (`mydomain.com` 形式) か、NETBIOS 名 (Windows2000 以前の名前) のどちらかを指定することができます。
また、`<USERNAME>` とはバックスラッシュ `\` で区切らなければなりません。

**注**: `<USERNAME>` は、Microsoft の [Active Directory Schema (AD Schema) SAM-Account-Name 属性][1]に準拠するため、20 文字以下でなければなりません。

**注**: MSI インストーラーの制限により、`DDAGENTUSER_PASSWORD` プロパティにセミコロン文字 `;` を含めることができません。

#### ドメインコントローラ

##### プライマリおよびバックアップドメインコントローラ

When installing the Agent on a domain controller, there is no notion of local user account. So if the installer creates a user account, it is a domain user rather than a local one.

コマンドラインでユーザーアカウントが指定され、そのユーザーアカウントがシステム上にない場合、インストーラーはその作成を試行します。インストールを成功させるには、パスワードの指定が必要です。

指定されたユーザーアカウントが親ドメインのものである場合、インストーラーはそのユーザーアカウントを使用します。インストーラーが親ドメインにユーザーアカウントを作成することはないため、インストール前に親ドメインにユーザーアカウントが存在することを確認してください。

##### 読み取り専用のドメインコントローラ

読み取り専用のドメインコントローラにインストールする場合、インストーラーは既存のドメインアカウントのみを使用することができます。

### Chef によるインストール

Windows ホストに Agent をデプロイするために Chef と公式の `datadog` クックブックを使用する場合、**バージョン 2.18.0 以上**のクックブックを使用して Agent のコンフィギュレーションファイルが正しい権限であることを確認してください。

## アップグレード

For Agent version < `7.25.0` when you upgrade the Datadog Agent on a domain controller or host where the user has supplied a username for the Agent, you must supply the `DDAGENTUSER_NAME` but not the `DDAGENTUSER_PASSWORD`.

Starting with Agent version `7.25.0` the installer retains the username used to install the Agent and re-uses it during upgrades.
It is still possible to override the saved value with `DDAGENTUSER_NAME`.

## Agent インテグレーション

### General permissions

`LOCAL_SYSTEM` から `ddagentuser` への移行がシームレスに行われるよう、あらゆる努力が払われています。しかし、Agent のインストール時に特定の構成に特化した修正を必要とする問題があります。これらの問題は、Windows Agent が以前は管理者権限に依存していたが、新しい Agent にはデフォルトで欠けている場合に発生します。

例えば、ディレクトリチェックが特定のアクセス権、例えば Administrators グループのメンバーのみに読み取りアクセスを許可するディレクトリを監視している場合、`LOCAL_SYSTEM` は管理者権限を持っているので、既存の Agent はそのディレクトリを正常に監視することができます。アップグレードの際、管理者はディレクトリチェックが機能するように、そのディレクトリのアクセスコントロールリストに `ddagentuser` を追加する必要があります。

**注**: Windows Server OS の場合、Windows サービスインテグレーションは、`DHCPServer` サービスに対する特別な ACL のために、DHCP Server サービスに対してチェックすることができません。このような場合、チェックは `UNKNOWN` を返します。

**注**: Agent の Logs Collection 機能によって監視されるログファイルにも同じ考慮事項が適用されます。

### JMX ベースのインテグレーション

Agent の JMXFetch が、Attach API を通じて監視対象の JVM に接続するように構成されている場合、`ddagentuser` への変更は、JMX ベースのインテグレーションに影響を及ぼします。例えば、次の場合:

1. 以下などの JMX ベースのインテグレーションを使用している。
   * [ActiveMQ][2]
   * [ActiveMQ_XML][3]
   * [Cassandra][4]
   * [JMX][5]
   * [Presto][6]
   * [Solr][7]
   * [Tomcat][8]
   * [Kafka][9]

2. **且つ**、`host` と `port` の設定ではなく、`process_name_regex` 設定でインテグレーションを構成している。

Attach API を使用している場合、ユーザーコンテキストの変更は、Agent の JMXFetch が、`ddagentuser` ユーザーコンテキスト下で実行されている JVM にしか接続できないことを意味します。ほとんどの場合、ターゲット JVM 上で JMX Remote を有効にし、`host` と `port` を使用して JMX インテグレーションを構成することにより、JMXFetch を JMX Remote 使用に切り替えることが推奨されます。詳細については、[JMX ドキュメント][5]を参照してください。

### プロセスチェック

In v6.11 +, the Agent runs as `ddagentuser` instead of `Local System`. Because of this, it does not have access to the full command line of processes running under other users and to the user of other users' processes. This causes the following options of the check to not work:

* `false` に設定した場合の `exact_match`
* 特定のユーザーに属するプロセスを選択することができる `user`

古い動作を復元し、Agent を `Local System` として実行するには (推奨しません)、管理者コンソールを開き、コマンド `sc.exe config "datadogagent" obj= LocalSystem` を実行してください。または、サービスマネージャーを開き、DataDog Agent > Properties に移動して、`Local System` として Log On を指定します。

### Cassandra Nodetool インテグレーション

Cassandra Nodetool インテグレーションが引き続き動作するように、次の変更を環境に適用してください。

* Nodetool のインストールディレクトリへのアクセスを `ddagentuser` に許可します。
* Nodetool のインストールディレクトリの環境変数 (`CASSANDRA_HOME` と `DSCINSTALLDIR`) を、Nodetool のインストールを行うユーザーだけの変数ではなく、システム全体の変数として設定するようにします。

## セキュリティログチャンネル

[Datadog- Win 32 イベントログインテグレーション][10]を使用している場合、セキュリティログチャンネルからログを収集するには、Datadog ユーザー `ddagentuser` を Event Log Readers Group に追加する必要があります。

1. *Windows+R* ホットキーでファイル名を指定して実行を開き、`compmgmt.msc` と入力します。
2. *System Tools* -> *Local Users and Groups* -> *Groups* に移動します。
3. **Event Log Readers** を右クリックし、*Properties* を選択します。
4. *Add* をクリックし、`ddagentuser` を入力し、*Check Names* をクリックします。
5. *OK*、*Apply* をクリックします。

[1]: https://docs.microsoft.com/en-us/windows/win32/adschema/a-samaccountname?redirectedfrom=MSDN
[2]: /integrations/activemq/
[3]: /integrations/activemq/#activemq-xml-integration
[4]: /integrations/cassandra/
[5]: /integrations/java/
[6]: /integrations/presto/
[7]: /integrations/solr/
[8]: /integrations/tomcat/
[9]: /integrations/kafka/
[10]: /integrations/win32_event_log/
