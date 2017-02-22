---
last_modified: 2017/02/22
translation_status: complete
language: ja
title: Installing Core & Extra Integrations
kind: guide
listorder: 3
---

<!-- ### Overview
Starting with version 5.9 of the Datadog Agent, we are moving integrations from the dd-agent repository on GitHub to the integrations-core and integrations-extras repositories. This move will allow us to have a method to distribute more community-developed integrations, as well as being able to update supported integrations out of band with the Agent. Note: these integrations are not designed for Windows operating systems.

For more information on adding new integrations to `integrations-extras`, see the guide on the [Integration SDK](/guides/integration_sdk) -->

### 概要

Datadog Agentのバージョン5.9から、GitHubのdd-agentリポジトリから、統合コアおよび統合エクストラリポジトリへの統合を進めています。 この動きにより、より多くのコミュニティで開発された統合を配布する方法と、サポートされている統合をエージェントと帯域外で更新できる方法があります。 注：これらの統合は、Windowsオペレーティングシステム用に設計されたものではありません。

インテグレーション - エクストラへの新しいインテグレーションの追加の詳細については、インテグレーションSDKのガイドを参照してください

<!-- The two integration repositories are defined as follows:

* **[integrations-core](https://github.com/DataDog/integrations-core)** - Datadog-supported integrations that were formerly found in the core Agent.
* **[integrations-extras](https://github.com/DataDog/integrations-extras)** - Community-supported integrations that have been written according to the guidelines specified by Datadog

All core integrations will continue to be installed with the agent install. You only have to install an integration in core separately if there is an out of band update to that integration. To either install an out-of-band update to a core integration or to install one of the extra integrations, follow these steps: -->

2つの統合レポジトリは、以下のように定義されています。

integrations-core - 以前はコアエージェントに含まれていたDatadogでサポートされていた統合。
integations-extras - Datadogで指定されたガイドラインに従って作成されたコミュニティ対応の統合
すべてのコアインテグレーションは、引き続きエージェントのインストールとともにインストールされます。 その統合への帯域外更新がある場合は、統合をコアに個別にインストールするだけで済みます。 コア統合に帯域外更新をインストールするか、追加の統合の1つをインストールするには、次の手順を実行します。

<!-- ### Installing on yum-based systems

1.  Run `yum update` to ensure your system has access to the latest packages.
1.  Run `yum install dd-check-integration`, replacing `integration` with the name of the chosen integration. So if you are installing `mysql`, then run `yum install dd-check-mysql`. -->

### yumベースのシステムへのインストール

1. システムが最新のパッケージにアクセスできるようにyum updateを実行してください。
2. yum install dd-check-integrationを実行し、統合を選択した統合の名前に置き換えます。 したがって、mysqlをインストールする場合は、yum install dd-check-mysqlを実行します。


<!-- ### Installing on apt-get-based systems

1.  Run `apt-get update` to ensure your system has access to the latest packages.
1.  Run `apt-get install dd-check-integration`, replacing `integration` with the name of the chosen integration. So if you are installing `mysql`, then run `apt-get install dd-check-mysql`. -->

### apt-get-basedシステムへのインストール

1. システムが最新のパッケージにアクセスできるようにapt-get updateを実行してください。
2. apt-get install dd-check-integrationを実行し、統合を選択した統合の名前に置き換えます。 したがって、mysqlをインストールする場合は、apt-get install dd-check-mysqlを実行します。


<!-- ### Installing on systems with no package management

1.  Copy the Python script for your chosen integration to the `checks.d` directory where you installed the Agent.
1.  Copy the corresponding yaml configuration file to the `conf.d` directory where you installed the Agent. -->

### パッケージ管理のないシステムへのインストール

1. 選択した統合用のPythonスクリプトを、エージェントをインストールしたchecks.dディレクトリにコピーします。
2. 対応するyaml構成ファイルを、エージェントをインストールしたconf.dディレクトリにコピーします。
