---
categories:
- cloud
- google cloud
- ログの収集
- セキュリティ
dependencies: []
description: 監査ログダッシュボードを表示します。
doc_link: ''
draft: false
git_integration_title: google_cloud_audit_logs
has_logo: true
integration_id: google-cloud-audit-logs
integration_title: Datadog Google 監査ログダッシュボード
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_audit_logs
public_title: Datadog Google 監査ログダッシュボードのインテグレーション
short_description: 監査ログダッシュボードを表示します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

GCP 監査ログを監視すると、リソースにアクセスしているユーザー、アクセス方法、アクセスが許可されているかどうかをよりよく理解できます。

監査ログには 4 種類あります。
* **システムイベント監査ログ**: GCP によってデフォルトで記録されるシステムイベント監査ログには、リソースの構成を変更する Google Cloud アクションのログエントリが含まれます。システムイベント監査ログは Google システムによって生成されます。ユーザーの直接のアクションによって駆動されるわけではありません。
* **管理アクティビティ監査ログ**: GCP によってデフォルトで記録される管理アクティビティ監査ログには、リソースのコンフィギュレーションまたはメタデータを変更する API 呼び出しまたはその他のアクションのログエントリが含まれます。たとえば、これらのログは、ユーザーが VM インスタンスを作成したとき、または ID とアクセス管理の権限を変更したときを記録します。
* **データアクセス監査ログ**: リソースごとに[個別に有効化][1]され、データアクセス監査ログには、リソースのコンフィギュレーションまたはメタデータを読み取る API 呼び出しと、ユーザー提供のリソースデータを作成、変更、または読み取るユーザー主導の API 呼び出しが含まれます。データアクセス監査ログには、パブリックに共有されているリソースに対するデータアクセス操作は記録されません。
* **ポリシー拒否監査ログ**: デフォルトで生成されるクラウドロギングレコードポリシー拒否監査ログは、セキュリティポリシー違反のために Google Cloud サービスがユーザーまたは[サービスアカウント][2]へのアクセスを拒否した場合に記録されます。

Google Cloud Platform インテグレーションページの[ログ収集手順][3]を使用して、これらのログを Pub/Sub トピック経由で転送できます。

詳細は、[監査ログを理解する][4]または[GCP 監査ログを監視するためのベストプラクティス][5]を参照してください。

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://cloud.google.com/logging/docs/audit/configure-data-access
[2]: https://cloud.google.com/iam/docs/service-accounts
[3]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[4]: https://cloud.google.com/logging/docs/audit/understanding-audit-logs
[5]: https://www.datadoghq.com/blog/monitoring-gcp-audit-logs/
[6]: https://docs.datadoghq.com/ja/help/