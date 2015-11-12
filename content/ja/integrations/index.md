---
last_modified: 2015/03/31
translation_status: original
language: ja
title: インテグレーション(Integration)
sidebar:
  nav:
#    - header: ガイド
#    - text: Datadog Agent 入門
#      href: "/ja/guides/basic_agent_usage/"
#    - text: Datadog が提供するサービスの概要
#      href: "/ja/overview/"
#    - text: Datadog へのメトリクスの送信
#      href: "/ja/guides/metrics/"
#    - text: Datadog Agent によるログの解析方法
#      href: "/ja/guides/logs/"
#    - text: Agent Checkの書き方
#      href: "/ja/guides/agent_checks/"
#    - text: サービスチェックの設定方法
#      href: "/ja/guides/services_checks/"
#    - text: Chef を使ったDatadog Agent のインストール
#      href: "/ja/guides/chef/"
#    - text: Azure WindowsへDatadog Agentのインストール
#      href: "/ja/guides/azure/"
#    - text: アラートの設定方法
#      href: "/ja/guides/alerting/"
#    - text: ダッシュボードテンプレートの作成
#      href: "/ja/guides/templating/"
#    - text: SAML によるシングルサインオン
#      href: "/ja/guides/saml/"
#    - text: メールによるイベント情報の送信
#      href: "/ja/guides/eventsemail"

    - header: レファレンス
    - text: APIレファレンス
      href: "/ja/api/"
    - text: APIライブラリー
      href: "/ja/libraries/"
    - text: グラフ表示入門
      href: "/ja/graphing/"
    - text: ホスト名について
      href: "/ja/hostnames/"
    - text: インテグレーション
      href: "/ja/integrations/"
    - text: DogStatsDの解説
      href: "/ja/guides/dogstatsd/"
    - text: 課金に関するFAQ
      href: "/ja/guides/billing/"
    - text: FAQ
      href: "/ja/faq"
---

DatadogのIntegrationに関するドキュメントへようこそ。（注:随時追加中）

Integrationをインストール/設定するための細かい手順については、<a href="https://app.datadoghq.com/account/settings">Integrationタブ</a>から目的のタイルを選択した際に表示されるポップアップを参照してください。

下記で紹介するリンク先のヘージでは、Integrationの概要, 設定方法, トラブルシューティングを紹介しています。

**(注:随時、追加/更新中)**

<ul>
  <% $ja_integration_items.each do |i| %>
    <li><%= link_to i[:integration_title], i.path %></li>
<% end %>
</ul>

<!-- * <a href="/ja/integrations/activemq/">ActiveMQ</a>
* <a href="/ja/integrations/airbrake/">Airbrake</a>
* <a href="/ja/integrations/apache/">Apache</a>
* <a href="/ja/integrations/aws/">Amazon Web Services</a>
* <a href="/ja/integrations/rds/">AWS RDS</a>
* <a href="/ja/integrations/bitbucket/">Bitbucket</a>
* <a href="/ja/integrations/cacti/">Cacti</a>
* <a href="/ja/integrations/capistrano/">Capistrano</a>
* <a href="/ja/integrations/cassandra/">Cassandra</a>
* <a href="/ja/integrations/chef/">Chef</a>
* <a href="/ja/integrations/docker/">Docker</a>
* <a href="/ja/integrations/elasticsearch/">ElasticSearch</a>
* <a href="/ja/integrations/eventviewer/">Event Viewer</a>
* <a href="/ja/integrations/fabric/">Fabric</a>
* <a href="/ja/integrations/git/">Git</a>
* <a href="/ja/integrations/gearman/">Gearman</a>
* <a href="/ja/integrations/github/">Github</a>
* <a href="/ja/integrations/haproxy/">HAProxy</a>
* <a href="/ja/integrations/hipchat/">HipChat</a>
* <a href="/ja/integrations/iis/">IIS</a>
* <a href="/ja/integrations/jenkins/">Jenkins</a>
* <a href="/ja/integrations/java/">JMX Checks: Java, Cassandra, Solr, Tomcat, ActiveMQ</a>
* <a href="/ja/integrations/lighttpd/">Lighttpd</a>
* <a href="/ja/integrations/memcached/">Memcached</a>
* <a href="/ja/integrations/mongodb/">MongoDB</a>
* <a href="/ja/integrations/mysql/">MySQL</a>
* <a href="/ja/integrations/nagios/">Nagios</a>
* <a href="/ja/integrations/new_relic/">New Relic</a>
* <a href="/ja/integrations/nginx/">NGiNX</a>
* <a href="/ja/integrations/opsgenie/">OpsGenie</a>
* <a href="/ja/integrations/pagerduty/">Pagerduty</a>
* <a href="/ja/integrations/pingdom/">Pingdom</a>
* <a href="/ja/integrations/pivotal/">Pivotal</a>
* <a href="/ja/integrations/postgresql/">PostgreSQL</a>
* <a href="/ja/integrations/process/">Process Checks</a>
* <a href="/ja/integrations/puppet/">Puppet</a>
* <a href="/ja/integrations/rabbitmq/">RabbitMQ</a>
* <a href="/ja/integrations/redis/">Redis</a>
* <a href="/ja/integrations/redmine/">Redmine</a>
* <a href="/ja/integrations/riak/">Riak</a>
* <a href="/ja/integrations/rss/">RSS</a>
* <a href="/ja/integrations/snmp/">SNMP</a>
* <a href="/ja/integrations/solr/">Solr</a>
* <a href="/ja/integrations/splunk/">Splunk</a>
* <a href="/ja/integrations/sqlserver/">SQL Server</a>
* <a href="/ja/integrations/system/">System Integrations</a>
* <a href="/ja/integrations/varnish/">Varnish</a>
* <a href="/ja/integrations/vmware/">VMWare</a>
* <a href="/ja/integrations/webhooks/">Webhooks</a>
* <a href="/ja/integrations/zookeeper/">ZooKeeper</a> -->
