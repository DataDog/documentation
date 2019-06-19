---
title: インフラストラクチャーリスト
kind: documentation
aliases:
  - /ja/hostnames
  - /ja/infrastructure/
further_reading:
  - link: graphing/infrastructure/hostmap
    tag: グラフの作成方法
    text: ホストマップを使用してすべてのホストを 1 画面に表示
  - link: graphing/infrastructure/livecontainers
    tag: グラフの作成方法
    text: 環境内のすべてのコンテナのリアルタイム表示
  - link: graphing/infrastructure/process
    tag: グラフの作成方法
    text: システムのあらゆるレベルの事象把握
---
## 概要

インフラストラクチャーリストのページには、Datadog アプリケーションによって監視されているすべてのホストが表示されます。

{{< img src="graphing/infrastructure/index/infrastructure_list.png" alt="Infrastructure list" responsive="true" >}}

注: 24 時間データを送信しなかったホストは、インフラストラクチャーリストから削除されます。そのホストに対するクエリは引き続き実行できますが、ドロップダウンには表示されません。

## ホストの詳細

いずれかのホストをクリックすると、そのホストに適用されているタグが表示されます。

{{< img src="graphing/infrastructure/index/infrastructure_list_host_details.png" alt="Infrastructure list host details" responsive="true" style="width:80%;">}}

### Agent のホスト名

Datadog Agent は、さまざまなソースからあり得るホスト名を収集します。
 Agent が検出したすべての名前を確認するには、[Agent ステータスコマンドを実行][1]します。

    $ sudo /etc/init.d/datadog-agent info

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

これらの名前から、ホストの正規名が選択されます。この名前は、
主に Agent が Datadog から見て自分自身を識別するために使用します。その他の名前も
同様に送信されますが、それらは[エイリアス](#host-aliases)の候補として送信されるだけです。

ホストの正規名は、以下の規則に従って最初に
一致した名前が選択されます。

 1. `agent-hostname`: Agent 構成ファイルでホスト名が明示的に設定されている場合。
 2. `hostname`: DNS ホスト名が EC2 のデフォルトでない場合 (例: `ip-192-0-0-1`)。
 3. `instance-id`: Agent がホストから EC2 メタデータエンドポイントに到達できる場合。
 4. `hostname`: DNS ホスト名が EC2 のデフォルトである場合でも、それが使用されます。

名前が明らかに一意でないと認められる場合 (例: `localhost.localdomain`)、
その規則は失敗となり、次の規則に進みます。

**注**: EC2 インスタンスが ECS ホストである場合は、[DNS ホスト名が EC2 のデフォルトでない場合でも][2]、Datadog は `instance-id` をホスト名として使用します。`instance-id` を使用したくない場合、Agent 構成ファイルでホスト名を設定してください。

<div class="alert alert-warning">
ホスト名は、Datadog アカウント内で一意である必要があります。<br> 
そうでない場合、ホストのメトリクスグラフに不整合が生じる可能性があります。
</div>

### ホストのエイリアス

EC2 で実行している単一のホストは、インスタンス ID (`i-abcd1234`)、ホストの IP アドレスに基づいて EC2 が提供する汎用ホスト名 (`ip-192-0-0-1`)、および内部 DNS サーバーまたは config で管理されるホストファイルが提供するわかりやすいホスト名 (`myhost.mydomain`) を持つ可能性があります。

Datadog は、1 つのホストに一意に識別可能な名前が複数ある場合、ホスト名のエイリアスを作成します。Agent によって収集されたこれらの名前 (詳細は[上述](#agent-host-names)) は、選択された正規名のエイリアスとして追加されます。

アカウント内のすべてのホストのリストは、Datadog の Infrastructure タブで
確認できます。Inspect パネルから、(他の情報と共に) 各ホストに関連付けられているエイリアスのリストを表示できます。

{{< img src="graphing/infrastructure/index/host_aliases.png" alt="host aliases" responsive="true" style="width:80%;">}}

### インフラストラクチャーリストと Agent バージョンのエクスポート

ホストリストレポートを出力または Datadog にエクスポートする必要がある場合は、インフラストラクチャーリストの下部にある "JSON API permalink"を使用します。

{{< img src="graphing/infrastructure/index/infrastructure_list.png" alt="inf list" responsive="true" style="width:80%;">}}

このリンクをクリックすると、全ホストのリストが JSON 形式で表示されます。

最新バージョンの Agent を実行していることを確認したり、最新のリリース後に更新を行ったりする場合も、現在の Agent バージョン番号を調べることが役立ちます。

これは、JSON パーマリンクを利用する次のスクリプトを使用して、簡単に行うことができます。

`https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion`

このスクリプトは、現在実行中のすべての Agent とそのバージョン番号を別のドキュメントに出力します。また、特定のバージョン番号で実行されているすべての Agent を出力する場合は、スクリプトを編集して目的のバージョン番号を指定することもできます。さらに、JSON 出力を CSV ファイルに変換してレビューする場合は、別のファイルに出力することができます。

更新するホストを決定したら、[インストールページ][3]から Agent を手動でインストールするか、[Chef][4]、[Puppet][5]、[Ansible][6] などの Datadog 自動インテグレーションのいずれかを使用してインストールできます。

### Datadog Agent がインストールされていない EC2 インスタンスのリスト

Datadog の[インフラストラクチャーリストページ][7]に表示されるホストリストとすべてのホスト情報は、ページ下部にある "JSON API permalink" から取得できます。

ホスト情報にプログラムでアクセスして、必要なインサイトを得ることができます。たとえば、この Python スクリプトは、以下のホストのリストを出力します。

* そのホストについて、Datadog が Datadog-AWS インテグレーションを通じて Cloudwatch から AWS EC2 の情報を受け取っている。
* ただし、そのホストに Agent はインストールされていない。

{{< img src="graphing/infrastructure/index/ec2_instances_without_dd_agent.png" alt="ec2_instances_without_dd_agent" responsive="true" style="width:90%;">}}

ホストリストを出力するスクリプトについては、[こちら][8]をご参照ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/agent-commands/#agent-status-and-information
[2]: https://github.com/DataDog/dd-agent/blob/5.14.1/utils/hostname.py#L104
[3]: https://app.datadoghq.com/account/settings#agent
[4]: /ja/integrations/chef
[5]: /ja/integrations/puppet
[6]: /ja/integrations/ansible
[7]: https://app.datadoghq.com/infrastructure
[8]: https://gist.github.com/Martiflex/2803a28ec562fc9a15d404a539f85d38