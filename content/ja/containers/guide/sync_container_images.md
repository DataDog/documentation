---
aliases:
- /ja/agent/guide/sync_container_images
title: Datadog のイメージをプライベートレジストリに同期する
---

Datadog は、複数のパブリックコンテナレジストリでコンテナイメージを公開しています。これは多くのユーザーにとって便利ですが、組織によってはプライベートなコンテナレジストリを使用したい場合もあります。このガイドでは、Datadog のコンテナイメージをプライベートレジストリに同期する方法を説明します。

{{% container-images-table %}}

## プライベートレジストリへのイメージの同期

### Crane の使用

[Crane][1] は、Google が作成したコンテナイメージとレジストリを管理するツールで、異なるコンテナレジストリ間でイメージを同期するために使用できます。Crane の詳細については、[Crane のドキュメント][2]を参照してください。

#### Crane のインストール

Crane のインストール方法の詳細については、[Crane README.md][1] を参照してください。

#### Crane を使用したイメージの別のレジストリへのコピー

Crane は、イメージのダイジェストを保持したまま、異なるコンテナレジストリ間でイメージをコピーできます。

これは、コピーが同じマニフェストを保持し、マルチプラットフォームのイメージで動作することを意味します。

あるレジストリから別のレジストリにイメージをコピーするには、`crane copy` コマンドを使用します。

```shell
crane copy <REGISTRY>/<SOURCE_IMAGE>:<IMAGE_TAG> <REGISTRY>/<DEST_IMAGE>:<IMAGE_TAG>
```

`-n` フラグを使うことで、宛先レジストリにある既存のタグの上書きを避けることができます。

例えば、Datadog Operator に必要なデフォルトイメージを Docker Hub からプライベートレジストリにコピーするには、以下のようにします。
```shell
AGENT_VERSION=<AGENT_IMAGE_TAG>
OPERATOR_VERSION=<OPERATOR_IMAGE_TAG>
REGISTRY=<REGISTRY_URL>
crane copy gcr.io/datadoghq/operator:$OPERATOR_VERSION $REGISTRY/operator:$OPERATOR_VERSION
crane copy gcr.io/datadoghq/agent:$AGENT_VERSION $REGISTRY/agent:$AGENT_VERSION
crane copy gcr.io/datadoghq/cluster-agent:$AGENT_VERSION $REGISTRY/cluster-agent:$AGENT_VERSION
```

## プライベートレジストリの使い方

イメージの同期が完了したら、このガイドを使用して、お使いの環境で使用されている[コンテナレジストリを変更する][3]ことができます。

**注**: プライベートレジストリを使用する場合、イメージをプルできるようにするためにプルシークレットを作成する必要があるかもしれません。プルシークレットの作成の詳細については、[Kubernetes ドキュメント][4]を参照してください。


[1]: https://github.com/google/go-containerregistry/tree/main/cmd/crane
[2]: https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md
[3]: https://docs.datadoghq.com/ja/containers/guide/changing_container_registry
[4]: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials