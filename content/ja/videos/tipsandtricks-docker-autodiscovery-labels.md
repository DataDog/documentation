---
title: Datadog のヒントとコツ - Docker におけるラベルを使用した Datadog オートディスカバリー (Agent v6 を使用)
kind: ビデオ
language: en
wistiaid: mlxx0j6txw
videos:
  - Datadog Tips & Tricks
  - Introduction
  - Docker
  - Autodiscovery
summary: Docker、Kubernetes、Amazon ECS などのオーケストレーションプラットフォームは、ワークロードスケジューリングとリクエストルーティングを処理することで、コンテナ化サービスの実行を容易にし、回復性を高めます。しかし、監視はより困難になります。アプリケーションがホストからホストに移動するために、設計上「正常」の定義が絶えず変化するサービスを、どうすれば信頼性高く監視できるでしょうか。Datadog Agent は、オートディスカバリー機能を使用して、どのサービスがどこで実行されているかを自動的に追跡できます。このビデオでは、Docker ラベルを使用して、Docker 上で Datadog のオートディスカバリーを簡単に使用できることを説明しています。
private: true
---
Docker、Kubernetes、Amazon ECS などのオーケストレーションプラットフォームは、ワークロードスケジューリングとリクエストルーティングを処理することで、コンテナ化サービスの実行を容易にし回復性を高めます。しかし、監視はより困難になります。アプリケーションがホストからホストに移動するために、設計上「正常」の定義が絶えず変化するサービスを、どうすれば信頼性高く監視できるでしょうか。Datadog Agent は、オートディスカバリー機能を使用して、どのサービスがどこで実行されているかを自動的に追跡できます。このビデオでは、Docker ラベルを使用して、Docker 上で Datadog のオートディスカバリーを簡単に使用できることを示します。

注: このビデオでは、Datadog Agent v6 を使用しています。古いバージョンの Agent を使用する場合は、[Agent v5 向けのビデオ][1]を参照してください。

* [コンテナの課題](?wtime=5)
* [Documentation](?wtime=41)
* [Docker への Agent の追加](?wtime=71)
* [Redis の自動構成](?wtime=86)
* [構成チェック](?wtime=100)
* [別のインテグレーションの構成](?wtime=133)
* [3 つのオートディスカバリーシナリオ](?wtime=162)
* [Docker ラベルのセットアップ](?wtime=199)
* [複数の構成のセットアップ](?wtime=283)

[1]: /ja/videos/tipsandtricks-docker-autodiscovery-labels-v5