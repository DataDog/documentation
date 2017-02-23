---
last_modified: 2017/02/22
translation_status: complete
language: ja
title: integration-core と、integration-extra のインストール
kind: guide
listorder: 3
---

<!-- ### Overview
Starting with version 5.9 of the Datadog Agent, we are moving integrations from the dd-agent repository on GitHub to the integrations-core and integrations-extras repositories. This move will allow us to have a method to distribute more community-developed integrations, as well as being able to update supported integrations out of band with the Agent. Note: these integrations are not designed for Windows operating systems.

For more information on adding new integrations to `integrations-extras`, see the guide on the [Integration SDK](/guides/integration_sdk) -->

### 概要

Datadog Agent のバージョン 5.9 より、旧来 GitHub の dd-agent リポジトリ内に存在していたインテグレーション コードを integrations-core (コア インテグレーション) と integrations-extras (追加インテグレーション) に分類/分離し、それぞれ個別のレポジトリで管理することになりました。このことにより、コミュニティにより開発されてたインテグレーションの配布の道を開くと同時に、Agentの更新タイミングに縛られない新規インテグレーションの追加を実現していきます。(注): これらのインテグレーションは、Windows OS 用に設計されたものではありません。

`integrations-extras`に、新しいインテグレーションを開発/追加する方法に関しては、[Integration SDK](/guides/integration_sdk) を参照してください。


<!-- The two integration repositories are defined as follows:

* **[integrations-core](https://github.com/DataDog/integrations-core)** - Datadog-supported integrations that were formerly found in the core Agent.
* **[integrations-extras](https://github.com/DataDog/integrations-extras)** - Community-supported integrations that have been written according to the guidelines specified by Datadog

All core integrations will continue to be installed with the agent install. You only have to install an integration in core separately if there is an out of band update to that integration. To either install an out-of-band update to a core integration or to install one of the extra integrations, follow these steps: -->

上記で定義した二つのインテグレーション レポジトリは、以下のように定義されています。

* **[integrations-core](https://github.com/DataDog/integrations-core)** - Datadogが公式にサポートしているインテグレーション。これまでは、Agent-core 内に存在していたもの。
* **[integrations-extras](https://github.com/DataDog/integrations-extras)** - Datadog が公開しているガイドラインに従い、コミュニティにより開発されたインテグレーション。

すべてのコア インテグレーションは、引き続き Agent のインストールと共にインストールされます。特定インテグレーションのみの更新が発生していた場合にのみ、追加のインストレーションが必要になります。

特定インテグレーションのみの更新をコアインテグレーションに適応したり、追加インテグレーションをインストールするには、次の手順を実行してください。手順は、次のようになります:


<!-- ### Installing on yum-based systems

1.  Run `yum update` to ensure your system has access to the latest packages.
1.  Run `yum install dd-check-integration`, replacing `integration` with the name of the chosen integration. So if you are installing `mysql`, then run `yum install dd-check-mysql`. -->

### yum ベースのシステムへのインストール

1. システムが最新のパッケージにアクセスできるように、`yum update` を実行します。
2. `yum install dd-check-integration` を実行します。この際、`integration` の部分をインストールしたいインテグレーション名にします。従って、`mysql` をインストールしたい場合は、`yum install dd-check-mysql` を実行します。


<!-- ### Installing on apt-get-based systems

1.  Run `apt-get update` to ensure your system has access to the latest packages.
1.  Run `apt-get install dd-check-integration`, replacing `integration` with the name of the chosen integration. So if you are installing `mysql`, then run `apt-get install dd-check-mysql`. -->

### apt-get ベースのシステムへのインストール

1. システムが最新のパッケージにアクセスできるように `apt-get update` を実行します。
2. `apt-get install dd-check-integration` を実行します。この際、`integration` の部分をインストールしたいインテグレーション名にします。従って、`mysql` をインストールしたい場合は、`apt-get install dd-check-mysql` を実行します。


<!-- ### Installing on systems with no package management

1.  Copy the Python script for your chosen integration to the `checks.d` directory where you installed the Agent.
1.  Copy the corresponding yaml configuration file to the `conf.d` directory where you installed the Agent. -->

### パッケージ管理を採用していないシステムへのインストール

1. インストールしたいインテグレーション用の Python スクリプトを、 Agent の `checks.d` ディレクトリにコピーします。
2. 先にインストールしたインテグレーションに対応する yaml 形式の設定ファイルを、Agent の `conf.d` ディレクトリにコピーします。












