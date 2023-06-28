---
description: Oracle データベースでのデータベースモニタリングの設定
disable_sidebar: true
is_beta: true
kind: documentation
private: true
title: Oracle の設定
---

{{< site-region region="gov" >}}
データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

<div class="alert alert-info">
このページで説明されている機能は非公開ベータ版です。
</div>

## サポートされる Oracle のバージョン、機能、およびアーキテクチャ

- **バージョン**: 19c と 21c
- **デプロイ構成**: セルフマネージド、RDS、RAC、Exadata
- **アーキテクチャ**: マルチテナント

Oracle Autonomous Database、ASM、および Data Guard のデプロイ構成、コンポーネント、および機能はサポートされていません。


## サポートされている Agent バージョン

`7.44.1~dbm~oracle~beta~0.28` のカスタムビルドがサポートされています。

## 前提条件

1. **Oracle インテグレーションをインストールします**: Datadog の [**Integrations**][1] ページで、組織用の [Oracle インテグレーション][2]をインストールしてください。これにより、Oracle データベースのパフォーマンスをモニタリングするために使用できる Oracle ダッシュボードがアカウントにインストールされます。
2. **Agent の Oracle インテグレーションをアップグレードします**: Oracle インテグレーションを初めてインストールする場合は、このステップをスキップできます。以前に Oracle インテグレーションをインストールしたことがある場合は、`conf.d/oracle.d/` ディレクトリにあるレガシー構成を、`conf.d/oracle-dbm.d/` ディレクトリにある新しいインテグレーションパスに移行します。

次のコマンドを使用して、Oracle インテグレーションをレガシーインテグレーションから新しいインテグレーションに移行します。

```bash
mv /etc/datadog-agent/conf.d/oracle.d/conf.yaml /etc/datadog-agent/conf.d/oracle-dbm.d/conf.yaml
```

## セットアップ

ホスティングタイプを選択して設定の手順を確認します。

{{< partial name="dbm/dbm-setup-oracle" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle