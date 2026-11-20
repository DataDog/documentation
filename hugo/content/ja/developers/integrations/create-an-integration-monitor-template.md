---
aliases:
- /ja/developers/integrations/create-an-integration-recommended-monitor
description: インテグレーション用のモニターを作成する方法をご紹介します。
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/
  tag: ドキュメント
  text: モニターの構成
title: インテグレーション モニター テンプレートを作成する
---
## 概要

本ガイドでは、モニター テンプレートの作成手順と、作成時に従うべきベスト プラクティスを説明します。

[Datadog モニター][1]は、キーとなるメトリクスを追跡するので、インフラストラクチャーやインテグレーションを効率的に監視することができます。Datadog は、多くの機能やインテグレーションに対して、すぐに使えるモニターを提供しています。これらのモニターは、[Monitors Template リスト][2]で表示できます。

Datadog インテグレーションからユーザーが価値を見いだせるよう、すぐに使えるモニターを作成します。Datadog インテグレーションを作成するには、[新しいインテグレーションの作成][3] を参照してください。

## モニターの作成
Datadog サンドボックスでモニターを作成します。

{{< img src="developers/integrations/new_monitor.png" alt="Datadog の Monitors Template リスト" style="width:100%;" >}}


このガイドに記載されている[ベストプラクティス](#configuration-best-practices)に従ってモニターを構成します。

## モニターをアップロードする
Integration Developer Platform 内の該当インテグレーションで Content タブに移動します。そこから **import monitor** を選択し、利用可能なモニターのリストから選びます。インテグレーションに含めるモニターは最大 10 個まで選択できます。

{{< img src="developers/integrations/content_tab.png" alt="Integration Developer Platform の Content タブ" style="width:100%;" >}}


## モニターを本番環境で検証する

すぐに使えるモニターを確認するには:
1. Monitor Template リストで検出ルールを見つけてクリックし、展開します。
2. ロゴが正しく表示されることを確認します。
3. モニターが有効になっていることを確認します。

[Monitors Template リスト][2]でモニターを検索します。Monitors Template リストページでロゴが正しく表示されることを確認します。

## 構成のベストプラクティス

モニター定義に加えて、モニター テンプレートには [タイトル](#title)、 [説明](#description)、および Tags フィールドが必須です。タグは "integration:<app_id>" に設定し、利用可能なその他のモニター タグは [こちら][8] を参照してください。詳細は [モニターの設定][7] のドキュメントを参照してください。

### タイトル

タイトルは、アラートが対象とする基盤となる障害モードをユーザーが素早く理解できるようにします。
- 能動態を用い、目的語から始めて動詞を続けます。
- テンプレート変数は使用しないでください。

| 要修正                                       | より良い                                 | 最良                                        |
| -----------                                          | -----------                            | -----------                                 |
|未 ACK メッセージの高水準が {{host.name}} で報告| 未 ACK メッセージの高水準が報告  |未 ACK メッセージが通常より多い|

### Description

説明は、障害モードに関する追加のコンテキストと、このモードがシステムに与えうる影響についても提供します。これにより、ユーザーはこのテンプレートからモニターを作成することが自分に関連するかどうかを一目で判断できるようにします。

- これはタイトルのコピーではありません。
- タイトルで述べられた問題を定義します。
- なぜアラートするに値する問題なのかを説明します。
- 問題の影響を説明します。

| 要修正                                         | より良い                                       | 最良                                    |
| -----------                                          | -----------                                  | -----------                             |
|未確認メッセージが多い場合は、チームに通知してください。 | 未 ACK メッセージとは、コンシューマに配信されたものの、処理またはハンドリング済みとしての確認応答 (ACK) が行われていないメッセージを指します。このモニターは、未 ACK メッセージの比率を追跡します。|未 ACK メッセージとは、コンシューマに配信されたものの、処理またはハンドリング済みとしての確認応答 (ACK) が行われていないメッセージを指します。このモニターは、メッセージ処理の遅延につながりうる潜在的なボトルネックを回避するため、未 ACK メッセージの比率を追跡します。| 

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/monitors/
[2]: https://app.datadoghq.com/monitors/recommended
[3]: https://docs.datadoghq.com/ja/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/monitors/create
[5]: https://docs.datadoghq.com/ja/developers/integrations/check_references/#manifest-file
[6]: https://github.com/DataDog/integrations-extras
[7]: https://docs.datadoghq.com/ja/monitors/configuration/
[8]: https://docs.datadoghq.com/ja/monitors/manage/#monitor-tags
[9]: https://github.com/DataDog/marketplace