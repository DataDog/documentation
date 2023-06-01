---
description: Oracle データベースでのデータベースモニタリングの設定
disable_sidebar: true
is_beta: true
kind: documentation
private: true
title: Oracle の設定
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

<div class="alert alert-info">
このページで説明されている機能は非公開ベータ版です。必要な Agent のビルドとインストール手順については、カスタマーサクセスマネージャーにお問い合わせください。
</div>

### サポートされる Oracle バージョン

|  | セルフホスト | RDS |
|--|-------------|-----| 
| Oracle 19c | {{< X >}} | {{< X >}} |
| Oracle 21c | {{< X >}} | {{< X >}} |

自己管理型、RDS、シングルノード、マルチテナントのデプロイ構成がサポートされています。RAC、Exadata、レガシーアーキテクチャは含まれません。

ホスティングタイプを選択して設定の手順を確認します。

{{< partial name="dbm/dbm-setup-oracle" >}}