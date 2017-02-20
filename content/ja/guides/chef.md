---
last_modified: 2017/02/19
translation_status: complete
language: ja
title: Deploying the Agent with Chef
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

更にDatadogでは、[Chefの実行とレポートハンドラ](https://docs.chef.io/handlers.html)を提供しています。これは、Chefの実行タイミングや更新リーソースなどのメトリクスを収集するのみでなく、`chef-client`の失敗に関しても情報を取得しています。


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

### エージェントの展開

エージェントの展開を支援するための料理本を作成しました。

ナイフを介してコミュニティサイトからDatadog Chef料理の最新版をインストールし、Chefサーバーにアップロードしてください：

    knife cookbook site install datadog
    knife cookbook upload datadoghq

また、BerkshelfやLibrarian Chefのようなあなたの料理のワークフローを管理する別のツールを使用しているかもしれません。この場合、Berksfile / Cheffileに次のような行を追加する必要があります：

    cookbook 'datadog'

シェフサーバーにクックブックをアップロードするためのツールの指示に従ってください。

cookbookのレシピをノードのrun_listに追加する前に、エージェント固有の詳細をエージェント設定ファイルに追加する必要があります。

これは、通常、ロールファイルまたは環境ファイル、または属性を宣言する別の料理ブックを介して行われます。

次に、組織のすべてのホストに適用されるbase.rbロールファイルの例を示します。

<%= snippet_code_block("guides-chef-base-role-agent.rb") %>

2つのキーが必要であることに注意してください。あなたのAPIキーはDatadogのIntegrations => APIメニュー項目にあります。このリンクをクリックすると、ログインして直接そこに行くことができます。

同じページで、シェフと一緒に使用するためのアプリケーションキーを作成する必要があります。あなたが望むところに鍵を付けることができます。私たちは 'chef_appkey'かそのようなものを推奨します。

上記のように属性に両方の値を指定します。

次に、Chef Serverにロールファイルをアップロードします。

    knife role from file roles/base.rb

シェフが次に実行されるときには、エージェントをインストールし、APIとアプリケーションキーを使用して設定ファイルを設定する必要があります。

注：別の料理本を使用してこれらの属性を定義する場合は、デフォルトよりも高い属性優先レベルを使用してください。


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

あなたのシェフランの可視性をさらに高めるために、Datadogシェフハンドラーを使用してシェフの実行を監視することができます。

これはシェフの出力をDatadogのイベントストリームに戻すという付加価値があるため、失敗を迅速に強調し、チーム間で議論し、解決することができます。

成功は通常 "低"優先順位に、失敗は "通常"優先順位に、同じノードがシェフ実行に合格するとパックは "低"優先順位になります。

このロールのスニペットからわかるように、ハンドラの追加は非常に簡単です：

<%= snippet_code_block("guides-chef-base-role-handler.rb") %>

すべての作業は、ノードの実行リストの先頭にdatadog :: dd-handlerレシピを追加するだけです。これを最初に追加すると、呼び出された後のすべての詳細をキャプチャすることができます。したがって、run_listの最後に追加して実行する前に何かが失敗した場合、完全な出力が得られないことがあります。

設定したら、シェフサーバーにロールをアップロードしてお待ちください。シェフがいくつかのホストで実行された後、関連するシェフメトリックを持つ新しい自動ダッシュボードが作成されます。ダッシュボードリスト、右側のsidで見つけることができます


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
Datadog Chef Cookbookは、より統合的なレシピを提供します。

実行リストにこれらのレシピの1つを含めると、そのサービスを監視するために必要なPythonモジュールや正しい設定ファイルを書き出すなどの監視依存関係がインストールされます。

次に、webserver.rbロールファイルを拡張して、Datadog経由で自動的にApacheを監視する方法の例を示します。

<%= snippet_code_block("guides-chef-integration-apache.rb", :nocomments => true) %>

ご覧のとおり、実行リストにdatadog :: apacheレシピを追加し、Datadogで監視するApacheのインスタンスを制御するための属性をいくつか用意しました。

各レシピファイルを読んで、インテグレーション値の正確な詳細を調べ、属性のインスタンスの一部に渡します。
