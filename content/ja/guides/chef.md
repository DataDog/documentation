---
last_modified: 2017/02/19
translation_status: complete
language: ja
title: Chef を使った Agent のデプロイ
kind: guide
listorder: 8
sidebar:
  nav:
    - header: Guide to Chef
    - text: Overview
      href: "#overview"
    - text: Deploying the Agent
      href: "#deployagent"
    - text: Deploying the Handler
      href: "#deployhandler"
    - text: Customizations
      href: "#customizations"
---

<!--
======================================================
OVERVIEW
======================================================
-->

<!-- <h3 id="overview">Overview</h3>

In this guide, we will explore how to leverage [Chef](https://www.chef.io/chef/)
to automate installation of the Datadog Agent

Deploying Datadog with Chef is meant to be very simple, and provide you with a method of getting the value of monitoring across all of your infrastructure as simply as possible.

We also provide a Chef [Execution and Report Handler](https://docs.chef.io/handlers.html) that can capture `chef-client` failures as well as metrics related to the Chef run, such as timing and resources updated. -->


### 概要

このガイドでは、[chef](https://www.chef.io/chef/) を活用して Datadog Agent のインストールを自動化する方法を解説します。

Chefを使って Datadog を導入することは、非常に簡単です。そして、最も簡単にインフラ全体からメトリクスを集取し、監視の意義を引き出す方法になります。

更に Datadog では、[Chef の実行とレポートハンドラ](https://docs.chef.io/handlers.html)を提供しています。これは、Chef の実行タイミングや更新リーソースなどのメトリクスを収集するのみでなく、`chef-client` の失敗に関しても情報を取得しています。


<!--
======================================================
DEPLOYING THE AGENT
======================================================
-->

<!-- <h3 id="deployagent">Deploying the Agent</h3>

We created a cookbook to assist with Agent deployment.

Install the latest released version of the Datadog Chef cookbook from the [Community Site](https://supermarket.chef.io/cookbooks/datadog) via knife, and upload to your Chef Server:

    knife cookbook site install datadog
    knife cookbook upload datadog

You may also be using another tool to manage your cookbook workflow, such as [Berkshelf](http://berkshelf.com/) or [Librarian Chef](https://github.com/applicationsonline/librarian-chef), in which case you will need to add a line like this to your Berksfile/Cheffile:

    cookbook 'datadog'

And follow the instructions for your tool to upload the cookbook to your Chef Server.

Before adding the cookbook's recipe to your node's `run_list`, you need to add account-specific details to be provided to the Agent configuration file.

This is commonly done via `role` or `environment` files, or another cookbook declaring the attributes.

Here is an example of a `base.rb` role file, typically applied to every host in an organization.

<%= snippet_code_block("guides-chef-base-role-agent.rb") %>

Note that there are two keys needed. Your API Key can be found in Datadog, under the Integrations => API menu item, or click [this link](https://app.datadoghq.com/account/settings#api) to log in and go there directly.

Then, on the same page, you must create an Application Key for use with Chef. You may name the key whatever you wish, we recommend something like 'chef_appkey' or something of that nature.

Provide both values in the attributes as shown above.

Then upload your role file to Chef Server like so:

    knife role from file roles/base.rb

The next time Chef runs, it should install the Agent and set the configuration file with the API and application keys.

**NOTE:** If you are using another cookbook to define these attributes, use a higher attribute precedence level than `default`. -->

### Agent のデプロイ

Agent のデプロイを支援するための cookbook を作成しました。

最新版の Datadog Chef cookbook をインストールするには、[コミュニティサイト](https://supermarket.chef.io/cookbooks/datadog) から、knife コマンドを使って、 Chef サーバにアップロードしてください:

    knife cookbook site install datadog
    knife cookbook upload datadog

また、[Berkshelf](http://berkshelf.com/) や[Librarian Chef](https://github.com/applicationsonline/librarian-chef) のような cookbook ワークフローの管理をするツールを使用することも可能です。その場合、Berksfile / Cheffile に次のような行を追加します:

    cookbook 'datadog'

その後、ツールの指示に従って Chef サーバに cookbook をアップロードしてください。

アップロードした cookbook の recipe をノードの`run_list` に追加する前に、Agent の設定ファイルに、Datadog アカウントに関連した情報(API キー, APP キー など)を追加する必要があります。

通常このプロセスは、`role` ファイルや`environment` ファイルなど介して設定するか、attribute(属性) を宣言する別の cookbook を介して行います。

以下に、組織内の全てのホストに適用する `base.rb` role ファイルの一般例を紹介します。

<%= snippet_code_block("guides-chef-base-role-agent.rb") %>

基本的に、二種類のキーが必要になることに注目してください。API キーは、Datadogのサイトで、"Integrations" タブ => "APIs" メニュー項目以下にあります。この[リンク](https://app.datadoghq.com/account/settings#api)をクリックすると、ログインして直接そのペ時にアクセスすることができます。

次に、同一ページで、Chef の設定で使うための App キーを作成すます。App キーの名前は自由に設定できます。しかしながら、'chef_appkey' のようなキーの用途を推測しやすい名前をお勧めします。

取得した attributes を上記で紹介したように指定します。

次に、Chef サーバに role ファイルをアップロードします:

    knife role from file roles/base.rb

Chefが次に実行されるタイミングでAgentがインストールされ、attributesに指定した API キーと App キーの情報を使用して設定ファイルが設置されます。

**注:** 別のcookbookを使用してこれらのattriburesを定義する場合は、`default` よりも高い attribute precedence レベルを使用してください。


<!--
======================================================
DEPLOYING THE HANDLER
======================================================
-->

<!-- <h3 id="deployhandler">Deploying the Handler</h3>

In order to further raise the visibility of your Chef runs, you may use the Datadog Chef Handler to monitor your Chef execution.

This has the added value of bringing the output of a Chef run back to Datadog's Event stream, so failures can be highlighted quickly, discussed amongst the team, and resolved.

Successes typically will be found in the "Low" priority, whereas failures are of "Normal" priority, and when the same node passes the Chef run, then it is put pack into "Low" priority.

Adding the handler is very simple, as you can see in this role snippet:

<%= snippet_code_block("guides-chef-base-role-handler.rb") %>

All we've done is add the `datadog::dd-handler` recipe to the beginning of the node's run list. Adding it to the beginning allows the handler to capture details about everything in it observes after being invoked, so if you added it to the end of the `run_list` and something failed prior to it being executed, you may not receive the full output.

Once set, upload the role to your Chef Server, and wait. After Chef has run on a few hosts, a new automatic Dashboard will be created, with the relevant Chef Metrics. You can find it in your [Dashboards List](https://app.datadoghq.com/dash/list), on the right-hand side. -->

### ハンドラのデプロイ

"Chef run" のプロセスから更に多くの情報を集取するために、 Datadogが公開している Chef ハンドラーを使用して Chef の実行状況を監視することができます。

この仕組みは "Chef run" の実行結果を Datadog のイベントストリームに報告し、実行時の異常に素早く焦点を当て、チーム間で議論し、解決することができるという付加価値を提供しています。

通常、"Chef run" の成功通知の重要性は "Low" になり、失敗通知は "Normal" になります。この失敗ノードが "Chef run" に成功すると それら一連の通知を"Low"になります。

以下の role のスニペットからわかるように、ハンドラの追加は非常に簡単です：

<%= snippet_code_block("guides-chef-base-role-handler.rb") %>

上記では、`datadog::dd-handler` recipe を、ノードの run list の先頭に追加しただけす。これを先頭に追加することで、これ以降に呼び出されたすべての内容をキャプチャすることができるようにるからです。もしも、`run_list` の最後にハンドラを追加した場合は、ハンドラが実行される前に発生した失敗に関して情報が集められていないため、完全な結果を得ることができません。

`datadog::dd-handler` を run list を設定したら、Chef サーバ に role をアップロードして待ちます。"Chef run" がいくつかのホストで実行されると、メトリクスが Datadog にレポートされ、Chef メトリクスに関連したダッシュボードが自動で生成されます。Chef のデフォルト ダッシュボードは、[Dashboards List](https://app.datadoghq.com/dash/list) ページの右コラムで見つけることができます。


<!--
======================================================
CUSTOMIZATIONS
======================================================
-->

<!-- <h3 id="customizations">Customizations</h3>

The Datadog Chef Cookbook provides more integration-specific recipes.

Including one of these recipes in your run list will install any monitoring dependencies, such as any Python modules that are required to monitor that service, as well as write out the correct configuration file.

Here's an example of how we've extended a `webserver.rb` role file to automatically monitor Apache via Datadog:

<%= snippet_code_block("guides-chef-integration-apache.rb", :nocomments => true) %>

As you can see, we've added the `datadog::apache` recipe to the run list, and provided some attributes to control what instances of Apache should be monitored by Datadog.


Read each recipe file for the exact details of the integration values to pass into the `instances` part of the attributes. -->

### カスタマイズ

Datadog の Chef Cookbook には、各インテグレーションの適応を目的とした recipe もあります。

これらの recipe を run list に追加することで、インテグレーションを使った監視に必要な他の依存部品をインストールします。例えば、特定のサービスの監視に必要な python モジュールや、設定ファイルを書き出します。

以下は、Datadog を使って Apache を監視するめに、`webserver.rb` のrole ファイルを拡張した例です:

<%= snippet_code_block("guides-chef-integration-apache.rb", :nocomments => true) %>

run list に `datadog::apache` recipe を追加し、Datadog で監視する Apache インスタンスに関連する attribute を指定しています。

インテグレーションの設定をする際に、`instances` attribute の部分で扱うことのできる設定項目については、各 recipe ファイルを参照してください。
