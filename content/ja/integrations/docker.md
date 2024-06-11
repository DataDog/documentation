---
categories:
- 構成 & デプロイ
- コンテナ
dependencies: []
description: Datadog を使用した Docker メトリクスの監視
doc_link: https://docs.datadoghq.com/integrations/docker/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-kubernetes-docker/
  tag: ブログ
  text: Datadog を使用した Kubernetes と Docker の監視方法
- link: https://www.datadoghq.com/blog/docker-logging/
  tag: ブログ
  text: Docker ロギングのベストプラクティス
git_integration_title: docker
has_logo: true
integration_id: docker
integration_title: Docker
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: docker
public_title: Datadog-Docker インテグレーション
short_description: Datadog を使用した Docker メトリクスの監視
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Docker は、ソフトウェアコンテナ内のアプリケーションのデプロイを自動化するオープンソースプロジェクトです。

Docker からメトリクスをリアルタイムに取得して、以下のことができます。

- コンテナのパフォーマンスを視覚化します
- コンテナのパフォーマンスを内部で実行されているアプリケーションと関連付けることができます

## 計画と使用

コンテナ内で Agent を実行したい場合は、[Docker Agent ドキュメント][1]を参照してください。


## リアルユーザーモニタリング

メトリクス、イベント、サービスチェックについては、[Docker の収集データ][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ja/containers/docker/
[2]: https://docs.datadoghq.com/ja/containers/docker/data_collected/