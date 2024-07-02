---
title: Data intake
description: "How data can be fed into Datadog and which prerequisites need to be met in your or your clients' environments."
private: true
---

下地ができたので、いよいよ Datadog にデータを取り込みます。

当初、このフェーズの目的は、あなたやクライアントにすぐに価値を提供するためのデータを集めることであるべきです。しかし、長期的には、以下のような質問をすることで、常に環境の変化を評価する継続的なプロセスであると考えるべきです。
- あなたやクライアントは、新しいテクノロジーを採用しましたか？
- あなたやクライアントは、新しいプロセスを導入しましたか？
- Datadog は、あなたが使うことができる新しい製品機能を導入しましたか？

これらの質問を定期的に検討し、必要なテレメトリーがすべて Datadog に取り込まれていることを確認します。

## インテグレーション

インテグレーションを通じて、クライアントに即座に価値を提供することができます。Datadog は、幅広いテクノロジーからメトリクスやログを収集する {{< translate key="integration_count" >}} のインテグレーションを提供しています。

インテグレーションには、大きく分けて 3 つのカテゴリーがあります。
- クラウドサービスインテグレーション
- Datadog Agent と Agent ベースのインテグレーション
- API / ライブラリインテグレーションとカスタムチェック

インテグレーションの種類については、[インテグレーションの紹介][1]を参照してください。

## クラウドサービスインテグレーション

クラウドサービスや「クローラー」ベースのインテグレーションは、認証された接続を使用して、API を使用してクラウドサービスからインフラストラクチャー情報、メトリクス、ログ、およびイベントを収集します。

クラウドサービスインテグレーションは、通常数分で設定でき、メトリクスやイベントが Datadog に流れ込むため、すぐに価値を発揮します。

**注**: クラウドサービスインテグレーションは、大量のデータを生成するため、Datadog とクラウドプロバイダーの両方から請求の影響を受ける可能性があります。

ほとんどのシナリオにおいて、インフラストラクチャーや、特にこれらの環境で実行されているアプリケーションを完全に理解するためには、クラウドサービスインテグレーションを使用するだけでは不十分であることに注意してください。Datadog では、クラウドサービスインテグレーションに加え、あらゆるデータ収集手段を活用することを推奨しています。

クラウド環境のモニタリングについて、詳しくはこちらをご覧ください。
- [クラウドの監視][2] (電子書籍)
- [AWS クラウドモニタリング入門][3] (ブログ)
- [Cloud クラウドモニタリング入門][4] (ブログ)
- [Azure クラウドモニタリング入門][5] (ブログ)

## Datadog Agent と Agent ベースのインテグレーション

Datadog Agent は、ホスト上で動作し、Datadog に送信するイベントやメトリクスを収集するソフトウェアです。Agent は、一般的に使用されている全てのプラットフォームで利用可能です。Agent 自体は、実行中のホストに関する多くのメトリクス (CPU、メモリ、ディスク、ネットワークメトリクスなど) を収集できますが、Agent の本当の強みはそのインテグレーションにあります。

Agent ベースのインテグレーションにより、Agent は、ホスト上で直接、またはホスト上で実行されているコンテナで実行されているアプリケーションやテクノロジーからメトリクス、ログ、トレース、およびイベントを収集することができます。

インテグレーションと Datadog Agent について、詳しくはこちらをご覧ください。
- [Datadog インテグレーション一覧][6]
- [Datadog Agent][7]
- [Agent の概要][8]

## API / ライブラリインテグレーションとカスタムチェック

Datadog はスケーラビリティと拡張機能に重点を置いており、以下のような状況でプラットフォームを拡張するための API や SDK をいくつか提供しています。
- IoT デバイスなどでは、セキュリティなどの制約により Agent をインストールできない場合がある。
- Datadog Agent とそのインテグレーションが持つ機能が、技術や要件をカバーしていない。

このような場合、API を使用することで、クライアントの観測可能性プラットフォームに関連するテレメトリーをキャプチャすることができます。

サービスプロバイダーとして最も関心の高い API は、次の 3 つでしょう。
- データ取り込みのための公開 API
- カスタムチェック
- Agent 上のデータ取り込みのためのローカル API

### データ取り込みのための公開 API

クラウドサービスインテグレーションや Agent を利用できない、あるいは利用したくない場合、以下の API を利用するとデータ取り込みに便利です。

- ログは、Datadog の[ログ取り込みエンドポイント][9]に直接転送することが可能です。
- メトリクスは、Datadog の[メトリクス API][10] に直接転送することが可能です。
- イベントは、Datadog の[イベント API][11] に直接転送することが可能です。
- トレースは、Datadog の[トレース/スパン API][12] に直接転送することが可能です。

### カスタムチェック

Datadog は {{< translate key="integration_count" >}} のインテグレーションを提供していますが、クライアントは、既存のどのインテグレーションでもカバーできないカスタムアプリケーションを実行している場合があります。これらのアプリケーションを監視するために、クライアントは Agent を使用してカスタムチェックを実行することができます。

詳しくは、[カスタムチェック][13]をご覧ください。

### Agent 上のデータ取り込みのためのローカル API

Datadog Agent には、メトリクス集計サービスである DogStatsD がバンドルされており、UDP を使用してデータを受け付けます。DogStatsD は、カスタムチェックがユースケースに合わず、アプリケーションのための既存のインテグレーションがない場合の良い代替手段です。例えば、cron ジョブからイベントとメトリクスデータを収集するために DogStatsD を使うことができますが、おそらくそのジョブは独自のログファイルを持っていないでしょう。

DogStatsD のエンドポイントを使用するか、Datadog のクライアントライブラリを使用して DogStatsD へのメトリクスやイベントの送信を容易にすることができます。

詳しくは、こちらをご覧ください。
- [イベントの送信][14]
- [カスタムメトリクスの送信][15]
- [ライブラリ][16]
- [API リファレンス][17]

## タグ付け戦略

Datadog の全機能を利用するためには、優れたタグ付け戦略が不可欠です。

タグはデータに付けられるラベルで、Datadog 全体でデータのフィルタリング、グループ化、相関付けを行うことができます。タグは、Datadog の異なるテレメトリータイプを結合し、メトリクス、トレース、ログ間の相関とアクションの呼び出しを可能にします。これは、予約されたタグキーで実現されます。

一貫したタグ付け戦略を事前に設定することで、Datadog の実装を成功させ、最終的にクライアントの価値実現を高めることができます。

タグ付けを考える際には、以下のような点に配慮してください。
- **テクノロジー**: チーム間やクライアント間で、同じ技術の使用状況を比較することができます。
- **環境**: テスト環境、本番環境、その他の環境間のパフォーマンスを比較することができます。
- **場所**: 特定のデータセンターやクラウドサービスプロバイダーのアベイラビリティゾーンに関連する問題を理解することができます。
- **ビジネスサービス**: 技術に関係なく、ビジネスサービスの構成要素をフィルターにかけることができます。
- **役割**: ビジネスサービスにおいて、エンティティがどのような役割を担っているかを把握することができます。
- **責任**: 担当チームがすべてのリソースをフィルターできるようにし、他のユーザーやチームが特定のサービスを担当するチームを識別できるようにします。

[タグ入門][18]を読んで、成功するための準備をしましょう。

タグ付けとタグ付け戦略について、詳しくはこちらをご覧ください。
- インフラストラクチャーとアプリケーションにタグを付けるためのベストプラクティス][19] (ブログ)
- [タグ付けのベストプラクティス][20] (トレーニング)
- [統合サービスタグ付け][21]
- [Kubernetes タグ抽出][22]
- [AWS タグ付け][23] (AWS ドキュメント)
- [サーバーレスタグ付け][24]
- [ライブコンテナタグ付け][25]

## Agent のロールアウト

ここでは、Agent を展開するための主なフェーズを紹介します。
- Agent デプロイのための前提条件
- 既存インフラストラクチャーへの Agent の初期デプロイ
- 新インフラストラクチャーのプロビジョニング
- 継続的なプロビジョニングプロセスの監視

### Agent デプロイのための前提条件

プラットフォームやオペレーティングシステムによっては、Agent の前提条件が異なる場合があります。これらの要件については、[Agent の公式ドキュメント][7]を参照してください。

どのプラットフォームでも Agent の主な前提条件は、ネットワーク接続性です。トラフィックは常に Agent から Datadog へ開始されます。Datadog から Agent に戻るセッションが開始されることはありません。稀なケースを除き、インバウンド接続 (ローカルファイアウォールによる制限) は、Agent のデプロイには関係ありません。

Agent が正常に動作するためには、443/tcp 上の SSL で Datadog サービスにトラフィックを送信する機能が必要です。Agent が使用するポートの全リストは、[ネットワークトラフィック][26]を参照してください。

状況によっては、Agent のバージョン固有のエンドポイントがメンテナンスの問題を引き起こすことがありますが、その場合、Datadog はバージョンに依存しないエンドポイントを提供することができます。バージョンに依存しないエンドポイントが必要な場合は、Datadog のサポートにお問い合わせください。

#### Agent プロキシ

多くのクライアント環境では、Agent から Datadog への直接接続を開始することは不可能であるか、または希望されません。接続を可能にするために、Datadog は Agent のトラフィックをプロキシするいくつかの異なるオプションを提供しています。

詳しくは、[Agent プロキシの構成][27]をご覧ください。

### Agent のデプロイ、アップグレード、構成

Datadog Agent を自社やクライアントのインフラストラクチャーにデプロイするには、様々な方法があります。ほとんどのサービスプロバイダーは、すでに構成管理ツールを導入しているため、Agent の展開には既存のツールを使用するのがよいでしょう。

Datadog Agent を構成管理ツールで管理する例をご紹介します。
- [Chef を使用した Datadog Agent のデプロイ][28] (ブログ)
- [Puppet + Datadog: システムの自動化 + 監視][7] (ブログ)
- [CloudFormation を使用した Datadog のデプロイと構成][29] (ブログ)
- [Ansible を使って Datadog の構成を自動化する方法][30] (ビデオ)
- [Ansible のダイナミックインベントリを使って AWS ホストに Datadog Agent をデプロイする方法][31] (ブログ)

Datadog のリポジトリを使用する予定がない場合は、常に[パブリック GitHub リポジトリ][32]で最新の Agent のリリースを見つけることができます。デプロイ前に Agent パッケージの[ディストリビューションチャンネルを確認][33]することをお勧めします。

### 継続的なプロビジョニングプロセスの監視

Datadog のデプロイには構成管理ツールを使用することが望ましいですが、Datadog を活用してこれらのツールの適切な運用を監視することも可能です。以下はその例です。
- [システムに現状を聞く: Datadog を使って Chef を監視する][34] (ブログ)
- [Ansible + Datadog: 自動化を監視し、監視を自動化する][35] (ブログ)

## 次のステップ

Datadog にデータが流れ込んだら、次はクライアントに[価値を提供する][36]ことに集中する時です。


[1]: /getting_started/integrations/
[2]: https://www.datadoghq.com/pdf/monitoring-in-the-cloud-ebook.pdf
[3]: https://www.datadoghq.com/solutions/aws/
[4]: https://www.datadoghq.com/solutions/gcp/
[5]: https://www.datadoghq.com/solutions/azure/
[6]: /integrations/
[7]: /agent/
[8]: /getting_started/agent/
[9]: /getting_started/logs
[10]: /api/latest/metrics
[11]: /api/latest/events
[12]: /api/latest/tracing/
[13]: /developers/custom_checks/
[14]: /service_management/events/guides/dogstatsd/
[15]: /metrics/custom_metrics/
[16]: /developers/community/libraries/#api-and-dogstatsd-client-libraries
[17]: /api/latest/
[18]: /getting_started/tagging/
[19]: https://www.datadoghq.com/blog/tagging-best-practices/
[20]: https://learn.datadoghq.com/courses/tagging-best-practices
[21]: /getting_started/tagging/unified_service_tagging?tab=kubernetes
[22]: /agent/kubernetes/tag/
[23]: https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
[24]: /serverless/serverless_tagging/?tab=serverlessframework#overview
[25]: /infrastructure/livecontainers
[26]: /agent/configuration/network/
[27]: /agent/configuration/proxy/
[28]: https://www.datadoghq.com/blog/deploying-datadog-with-chef-roles/
[29]: https://www.datadoghq.com/blog/monitor-puppet-datadog/
[30]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
[31]: https://www.youtube.com/watch?v=EYoqwiXFrlQ
[32]: https://github.com/DataDog/datadog-agent/releases
[33]: /data_security/agent/#agent-distribution
[34]: https://www.datadoghq.com/blog/monitor-chef-with-datadog/
[35]: https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring/
[36]: /partners/delivering-value/
