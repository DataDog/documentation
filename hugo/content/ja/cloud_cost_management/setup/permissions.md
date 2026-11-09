---
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: /account_management/rbac/
  tag: ドキュメント
  text: ロールベースの Access Control について
- link: /account_management/rbac/data_access/
  tag: ドキュメント
  text: Data Access Control について
title: 権限
---
## 概要{#overview}

権限は、ユーザーが Datadog で実行できるアクションを制御します。ユーザーはロールに割り当てられ、各ロールにはそのユーザーが表示および実行できる内容を決定する一連の権限があります。

Cloud Cost Management (CCM) は、コストデータおよびほとんどの CCM 構成へのアクセスを制御するために、`cloud_cost_management_read` と `cloud_cost_management_write` という 2 つの主要な権限を使用します。予算の編集 (`ccm_budget_write`)、予算内の予測のカスタマイズ (`ccm_forecast_write`)、レポートスケジュールの管理 (`generate_ccm_report_schedules`、`manage_ccm_report_schedules`) など、特定の機能に対して追加の製品レベルの権限を利用できます。これらの権限を [ロールベースの Access Control (RBAC)][1] を通じてロールに割り当てます。

CCM は、タグによってコストデータをさらに制限するための [Data Access Control](#data-access-control) もサポートしています。

## 利用可能な権限 {#available-permissions}

| アクセス許可 | 説明 |
|------------|-------------|
| `cloud_cost_management_read` | CCM ページおよび外部統合全体で、コストデータ、予算、推奨事項、設定を表示するための読み取り専用アクセス権を付与します。|
| `cloud_cost_management_write` | カスタムコストのアップロードやクラウドアカウントの管理など、CCM 構成を変更するためのアクセス権を付与します。予算の作成、編集、削除のアクセス権は付与されません。`ccm_budget_write` を参照してください。|
| `ccm_budget_write` | 予算のメタデータやエントリごとの予算額など、Cloud Cost Management 予算を作成、更新、削除するためのアクセス権を付与します。ページにアクセスするには、読み取り権限が必要です。|
| `ccm_forecast_write` | Cloud Cost Management 予算のカスタム予測値を編集するためのアクセス権を付与します。ページにアクセスするには、読み取り権限が必要です。|
| `generate_ccm_report_schedules` | すべてのレポートスケジュールを表示し、ユーザー自身が作成したもののみを管理するためのアクセス権を付与します。|
| `manage_ccm_report_schedules` | 組織全体のすべてのレポートスケジュールを表示、作成、および完全に管理するためのアクセス権を付与します。|
| `ccm_report_write` | Cloud Cost Management レポートを作成、更新、削除するためのアクセス権を付与します。ページにアクセスするには、cloud_cost_management_read が必要です。|


## ページごとの権限要件 {#permission-requirements-by-page}

以下のテーブルは、各 CCM ページおよび関連機能に必要な権限を示しています。

| ページ/機能| 読み取り権限| 書き込み権限|
|-----------------------------------------------|--------------------------------------------------|---------------------------------------------------|
| CCM サマリーページ                              | コストサマリーデータの表示に必要               | 該当なし                                               |
| CCM コンテナページ                           | コンテナコスト配分データの表示に必要  | 該当なし                                               |
| CCM 推奨事項ページ                      | コストに関する推奨事項の表示に必要            | 該当なし                                               |
| CCM エクスプローラーページ                             | コストデータのクエリおよび表示に必要             | 該当なし                                               |
| CCM プランページ                                 | 予算の表示に必要                         | `ccm_budget_write`予算の作成、編集、または削除に必要|
| CCM 設定ページ - カスタムコスト              | カスタムコスト設定の表示に必要           | カスタムコストのアップロードに必要                   |
| CCM 設定ページ - タグパイプライン             | タグパイプラインの表示に必要                   | タグパイプラインの作成に必要                  |
| CCM 設定ページ - SaaS インテグレーション         | SaaS インテグレーション設定の表示に必要       | CCM のインテグレーションを有効にするために必要            |
| CCM 設定ページ - アカウント                  | クラウドアカウントの表示に必要                  | アカウントの変更または作成に必要             |
| CCM 設定ページ - 推奨事項の構成 | 推奨事項設定の表示に必要         | 推奨事項のカスタマイズに必要             |
| Dashboards/Notebooks (外部)               | ウィジェットの作成およびコストデータの表示に必要 | 該当なし                                               |
| Monitors (外部)                           | CCM モニターの作成に必要                  | 該当なし                                               |
| Service Catalog (外部)                    | コストデータの表示に必要                       | 該当なし                                               |
| Resource Catalog (外部)                   | コストデータの表示に必要                       | 該当なし                                               |
| コストデータ用 API クエリ                     | API 経由でのコストデータクエリに必要      | 該当なし                                               |

## Data Access Control {#data-access-control}

[Data Access Control][2] を使用して、特定のタグによってコストデータへのアクセスを制限します。この機能を使用すると、チームが自身の関連リソースのコストのみを表示するように制限できます。たとえば、チームが `team:payments` または `env:production` のタグが付いたコストのみを表示できるように制限します。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/
[2]: /ja/account_management/rbac/data_access/