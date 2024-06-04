---
description: SQL Server データベースでのデータベースモニタリングの設定
disable_sidebar: true
kind: documentation
title: SQL Server の設定
---

### サポートされる SQL Server バージョン

|                 | セルフホスト | Azure     | Amazon RDS | Google Cloud SQL | 注 |
|-----------------|-------------|-----------|------------|------------------|------|
| SQL Server 2012 | {{< X >}}   |           |            |                  | SQL Server 2012 は 2022 年 7 月 12 日にサポートが終了しました。Database Monitoring は、SQL Server 2012 を[既知の制限][1]付きで引き続きサポートします。 |
| SQL Server 2014 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2016 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2017 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2019 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2022 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |

ホスティングタイプを選択して設定の手順を確認します。

{{< partial name="dbm/dbm-setup-sql-server" >}}

<br>