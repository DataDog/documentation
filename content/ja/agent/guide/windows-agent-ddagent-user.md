---
algolia:
  tags:
  - Windows Agent ユーザー
  - Windows ユーザー
  - ddagentuser
  - グループポリシー
aliases:
- /ja/agent/faq/windows-agent-ddagent-user/
title: Datadog Windows Agent ユーザー
---

リリース `6.11.0` からは、Windows Agent のコアおよび APM/トレースコンポーネントは、以前のバージョンのように `LOCAL_SYSTEM` アカウントで実行するのではなく、専用のユーザーアカウントで実行するようになりました。有効にした場合、ライブプロセスコンポーネントは引き続き `LOCAL_SYSTEM` アカウントで実行されます。

Agent のインストーラーは、デフォルトで新しいアカウント (`ddagentuser`) を作成しますが、ユーザー指定のアカウントを使用することも可能です。
このアカウントは、インストール時に以下のグループに割り当てられます。

* "Performance Monitor Users" グループのメンバーになる
  * WMI 情報へのアクセスに必要
  * Windows のパフォーマンスカウンターデータにアクセスするために必要
* "Event Log Readers" グループのメンバーになる

**注**: インストーラーは、作成したアカウントをデフォルトで `Users` グループに追加しません。まれに、権限の問題が発生することがあります。その場合、作成したユーザーを手動で `Users` グループに追加してください。

さらに、インストール時に以下のセキュリティポリシーがアカウントに適用されます。
* ネットワークからこのコンピューターへのアクセスを拒否する
* ローカルでのログオンを拒否する
* Remote Desktop Services によるログオンを拒否する
* サービスとしてのログオン

**重要**: アカウントはインストール中に変更され、ログイン権限を含む特権が制限されるため、「実際の」ユーザーアカウントではなく、Datadog Agent を実行するためだけの専用アカウントであることを確認してください。

**注**: このページのすべてのコマンド例では、置換されるべき変数を示すために `<>` が使用されています。例えば、ユーザーアカウントが `ddagentuser` で、コマンドに `DDAGENTUSER_NAME=<USERNAME>` が含まれている場合、コマンドラインには `DDAGENTUSER_NAME=ddagentuser` と入力する必要があります。

**注**: `7.38.0/6.38.0` リリースから、インストーラーは **Grouped Managed Service Account (gMSA)** の使用をサポートします。Grouped Managed Service Account を指定するには、ユーザー名の最後に **$** を追加します: `<DOMAIN>\<USERNAME>**注**: 7.38.0/6.38.0 リリースから、インストーラーは **Grouped Managed Service Account (gMSA)** の使用をサポートします。Grouped Managed Service Account を指定するには、ユーザー名の最後に **$** を追加します。Grouped Managed Service Account は、インストーラーが作成できないため、インストール前に存在する必要があります。

## インストール

コマンドラインでユーザーアカウントが指定されなかった場合、インストーラーはランダムに生成されたパスワードで `ddagentuser` という名前のローカルユーザーアカウントを作成しようとします。

コマンドラインでユーザーアカウントが指定され、そのユーザーアカウントがシステム上にない場合、インストーラーはその作成を試行します。パスワードが指定されている場合、インストーラーはそのパスワードを使用し、そうでない場合はランダムなパスワードを生成します。

オプションの USERNAME と PASSWORD をコマンドラインで指定するには、`msiexec` コマンドに以下のプロパティを渡します (ユーザー名とパスワードのプレースホルダーから`<>`の文字を削除してください)。

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<USERNAME> DDAGENTUSER_PASSWORD=<PASSWORD>
```

**注**: `<USERNAME>` は、Microsoft の [Active Directory Schema (AD Schema) SAM-Account-Name 属性][1]に準拠するため、20 文字以下でなければなりません。

**注**: MSI インストーラーの制限により、`DDAGENTUSER_PASSWORD` プロパティにセミコロン文字 `;` を含めることができません。

**注**: インストール時に `system` と `winproc` のチェックで権限の問題が発生した場合、`ddagentuser` が Performance Monitor Users と Event Log Readers グループのメンバであることを確認してください。

**注**: インストーラーの UI ではユーザーを指定することができません。コマンドラインを使用して `DDAGENTUSER_NAME` と他のパラメータを渡してください。UI インストールであっても、それらは考慮されます。

### グループポリシーによるインストール

インストーラーは、新しく作成されたユーザーアカウントが**サービスとして実行**できるように、ローカルのグループポリシーを変更します。
ドメイングループポリシーがそれを許可しない場合、インストールの設定が上書きされ、ユーザーアカウントがサービスとして実行できるようにドメイングループポリシーを更新する必要があります。

### ドメイン環境でのインストール

#### ドメイン参加マシン

ドメインに参加したマシンでは、Agent インストーラーは、ドメインまたはローカルのいずれであっても、ユーザー提供のアカウントを使用するか、またはローカルアカウントを作成することができます。

ドメインアカウントをコマンドラインで指定する場合、ドメインコントローラのみがドメインアカウントを作成できるため、インストール前に存在している必要があります。

コマンドラインでユーザーアカウントが指定され、そのユーザーアカウントがシステム上にない場合、インストーラーはその作成を試行します。パスワードが指定されている場合、インストーラーはそのパスワードを使用し、そうでない場合はランダムなパスワードを生成します。

ドメインアカウントのユーザー名を指定するには、`DDAGENTUSER_NAME` プロパティに以下の形式を使用します。

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<DOMAIN>\<USERNAME> DDAGENTUSER_PASSWORD=<PASSWORD>
```

`<DOMAIN>` には完全修飾ドメイン名 (`mydomain.com` 形式) か、NETBIOS 名 (Windows2000 以前の名前) のどちらかを指定することができます。
また、`<USERNAME>` とはバックスラッシュ `\` で区切らなければなりません。

**注**: `<USERNAME>` は、Microsoft の [Active Directory Schema (AD Schema) SAM-Account-Name 属性][1]に準拠するため、20 文字以下でなければなりません。

**注**: MSI インストーラーの制限により、`DDAGENTUSER_PASSWORD` プロパティにセミコロン文字 `;` を含めることができません。

#### ドメインコントローラ

##### プライマリおよびバックアップドメインコントローラ

ドメインコントローラ上に Agent をインストールする場合、ローカルユーザーアカウントという概念は存在しません。そのため、インストーラがユーザーアカウントを作成する場合、それはローカルユーザーではなくドメインユーザーとなります。

コマンドラインでユーザーアカウントが指定され、そのユーザーアカウントがシステム上にない場合、インストーラーはその作成を試行します。インストールを成功させるには、パスワードの指定が必要です。

指定されたユーザーアカウントが親ドメインのものである場合、インストーラーはそのユーザーアカウントを使用します。インストーラーが親ドメインにユーザーアカウントを作成することはないため、インストール前に親ドメインにユーザーアカウントが存在することを確認してください。

##### 読み取り専用のドメインコントローラ

読み取り専用のドメインコントローラにインストールする場合、インストーラーは既存のドメインアカウントのみを使用することができます。

### Chef によるインストール

Windows ホストに Agent をデプロイするために Chef と公式の `datadog` クックブックを使用する場合、**バージョン 2.18.0 以上**のクックブックを使用して Agent のコンフィギュレーションファイルが正しい権限であることを確認してください。

## アップグレード

Agent のバージョンが `7.25.0` 未満の場合、ユーザーが Agent 用のユーザー名を提供しているドメインコントローラまたはホスト上の Datadog Agent をアップグレードするときに、`DDAGENTUSER_NAME` を指定する必要がありますが、`DDAGENTUSER_PASSWORD` は指定しないでください。

Agent バージョン `7.25.0` 以降では、インストーラーは Agent のインストールに使用したユーザー名を保持し、アップグレード時にそれを再利用します。
保存された値を `DDAGENTUSER_NAME` でオーバーライドすることは可能です。

## Agent インテグレーション

### 一般権限

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

v6.11 以降では、Agent は `Local System` ではなく、`ddagentuser` として実行されます。このため、他のユーザーで実行されているプロセスの完全なコマンドラインや他のユーザーのプロセスのユーザーにアクセスすることができません。このため、以下のチェックのオプションは機能しません。

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
[2]: /ja/integrations/activemq/
[3]: /ja/integrations/activemq/#activemq-xml-integration
[4]: /ja/integrations/cassandra/
[5]: /ja/integrations/java/
[6]: /ja/integrations/presto/
[7]: /ja/integrations/solr/
[8]: /ja/integrations/tomcat/
[9]: /ja/integrations/kafka/
[10]: /ja/integrations/win32_event_log/