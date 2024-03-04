---
description: Postgres データベースでのデータベースモニタリングの設定
disable_sidebar: true
kind: documentation
title: Postgres の設定
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

### サポートされる Postgres バージョン

|  | セルフホスト | Amazon RDS | Amazon Aurora | Google Cloud SQL | Azure |
|--|------------|---------|------------|------------------|---------|
| Postgres 9.6 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 10 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 11 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 12 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 13 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 14 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 15 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 16 | {{< X >}} | {{< X >}} | {{< X >}} |  |  |

ホスティングタイプを選択して設定の手順を確認します。

{{< partial name="dbm/dbm-setup-postgres" >}}

<br>

### Agent インテグレーションのオーバーヘッド

Agent インテグレーションのオーバーヘッドテストは、Amazon EC2 マシン `c5.xlarge` インスタンス (4 vCPU、8 GB RAM) で実行しました。テストに使用したデータベースは、Amazon RDS の `db.m5.large` インスタンス (2 vCPU、8 GB RAM) で動作する PostgreSQL 14.10 インスタンスです。このデータベースは、20 個の倉庫を持つ TPC-C ワークロードを実行していました。

| 設定                           | 収集間隔 |
| --------------------------------- | ------------------- |
| 最小収集間隔のチェック     | 15 秒                 |
| クエリメトリクスの収集間隔 | 10 秒                 |
| クエリサンプルの収集間隔 | 10 秒                 |
| 設定の収集間隔      | 600 秒                |
| スキーマの収集間隔        | 600 秒                |

* Agent テストのバージョン: `7.50.2`
* CPU: 平均で CPU の約 0.98% を使用
* メモリ: 約 290 MiB の RAM を使用 (RSS メモリ)
* ネットワーク帯域幅: 約 28 KB/秒 ▼ | 23 KB/秒 ▲
* Agent によるデータベースへのクエリオーバーヘッド: 約 1% の CPU 時間