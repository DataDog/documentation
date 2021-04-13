---
categories:
  - containers
ddtype: check
dependencies: []
description: Datadog を使用した Docker メトリクスの監視
doc_link: 'https://docs.datadoghq.com/integrations/docker/'
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-kubernetes-docker/'
    tag: ブログ
    text: Datadog を使用した Kubernetes と Docker の監視方法
  - link: 'https://www.datadoghq.com/blog/docker-logging/'
    tag: ブログ
    text: Docker ロギングのベストプラクティス
git_integration_title: docker
has_logo: true
integration_title: Docker
is_public: true
kind: integration
manifest_version: '1.0'
name: docker
public_title: Datadog-Docker インテグレーション
short_description: Datadog を使用した Docker メトリクスの監視
version: '1.0'
---
## 概要

Docker は、ソフトウェアコンテナ内のアプリケーションのデプロイを自動化するオープンソースプロジェクトです。

Docker からメトリクスをリアルタイムに取得して、以下のことができます。

- コンテナのパフォーマンスを視覚化します
- コンテナのパフォーマンスを内部で実行されているアプリケーションと関連付けることができます

## セットアップ

Docker の場合は、コンテナ内で Agent を実行することをお勧めします。[Docker Agent][1] のドキュメントを参照してください。

## 収集データ

[Docker の収集データ][2] のドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ja/agent/docker/
[2]: https://docs.datadoghq.com/ja/agent/docker/data_collected/