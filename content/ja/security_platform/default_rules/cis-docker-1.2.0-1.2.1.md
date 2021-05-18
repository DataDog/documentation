---
aliases:
  - /ja/3wk-jj4-zxc
  - /ja/security_monitoring/default_rules/3wk-jj4-zxc
  - /ja/security_monitoring/default_rules/cis-docker-1.2.0-1.2.1
control: 1.2.1
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
  - インフラストラクチャーコンフィギュレーション
scope: docker
security: コンプライアンス
source: docker
title: コンテナに別のパーティションが作成されました
type: security_rules
---
## 説明

Docker のすべてのコンテナおよびそのデータとメタデータは `/var/lib/docker` ディレクトリに保存されています。デフォルトで、使用する Linux オペレーティングシステムの構成方法により `/var/lib/docker` が `/` または `/var` パーティションにマウントされています。

## 根拠

Docker は、`/var/lib/docker` をデフォルトのディレクトリとして依存します。ここには、画像を含むすべての Docker 関連ファイルが保存されています。このディレクトリはすぐにいっぱいになり、Docker およびホストが使用できなくなるため、Docker ファイルの保存には別のパーティション（論理ボリューム）を作成することをお勧めします。

## 監査

`/var/lib/docker` マウントポイントのパーティションに関する詳細を確認するには、Docker ホストで次を実行します。

```
grep '/var/lib/docker\s' /proc/mounts 
```

また、構成済みのルートディレクトリがマウントポイントであるかどうか確認するには、以下を実行します。

```
mountpoint -- "$(docker info -f '{{ .DockerRootDir }}')" 
```

## 修復

新しくインストールする場合は、`/var/lib/docker` マウントポイントに別のパーティションを作成します。既にインストールされているシステムには、Linux 内で Logical Volume Manager (LVM) を使用して新しいパーティションを作成します。

## 影響

なし

## デフォルト値

デフォルトで、`/var/lib/docker` は OS の構成方法により `/` または `/var` パーティションにマウントされています。

## リファレンス

1. [https://www.projectatomic.io/docs/docker-storage-recommendation/][1]

## CIS Controls

Need to Knowの原則に基づくバージョン 6.14 のアクセス制御                

[1]: https://www.projectatomic.io/docs/docker-storage-recommendation/