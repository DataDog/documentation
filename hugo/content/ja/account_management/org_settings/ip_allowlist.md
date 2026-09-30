---
description: 企業セキュリティのため、API および UI へのアクセスを特定の IP アドレスまたは CIDR 範囲に制限することで、Datadog
  へのネットワークアクセスを制御します。
title: IP 許可リスト
---
{{< callout url="/help/" header="IP 許可リストの利用を開始する" >}}
IP 許可リスト機能は、Pro+ または Enterprise プランのお客様にご利用いただけます。アクセスをリクエストするには、サポートにお問い合わせください。
{{< /callout >}}

## 概要{#overview}

{{< img src="account_management/org_settings/ip_allowlist_list.png" alt="4 つの IP 範囲を含む IP 許可リスト UI を示すスクリーンショット" >}}

IP 許可リストは、どのネットワークを使用して Datadog 内のデータにアクセスできるかを制御します。許可されるネットワークを制限することで、データ流出や内部の脅威からリソースを保護できます。

IP 許可リストを有効にすると、許可リストに含まれる IP アドレスまたは CIDR 範囲しか Datadog API および UI にアクセスできなくなります。

IP 許可リストは組織全体の設定です。これは『[ブロックされたリソースと許可されたリソース](#blocked-and-allowed-resources)』にリストされているすべてのトラフィックに一律に適用され、特定のトークン、API キー、ユーザー、またはエンドポイントに限定することはできません。

### ブロックされたリソースと許可されたリソース{#blocked-and-allowed-resources}

ユーザーの IP が IP 許可リストに含まれていない場合、ユーザーは事実上、以下のアクセスおよび使用をブロックされます。

- Datadog の Web UI
- Datadog の公開 [API][1] (文書化されているものと未公開エンドポイントの両方を含む)
- Datadog のモバイルアプリ (iOS、Android)
- OAuth で Datadog にアクセスするサードパーティのインテグレーションおよびアプリケーション
- [Datadog MCP Server][9] (AI Agent や MCP クライアントからのリモート接続を含む)

IP 許可リスト機能で、以下へのアクセスはブロックされません。
- Agent がメトリクス、トレース、ログなどのデータを送信するデータ取り込みエンドポイント
- Agent がデータを送信する前に使用する [validate API キー][2] のエンドポイント
- [Agent フレアの送信][3]
- [パブリック ダッシュボード][4]

Agent からテレメトリ (メトリクス、トレース、ログ) を送信するアプリケーションやインテグレーション、およびユーザーが提供した API キーを使用するものは、IP 許可リストの影響を受けません。Datadog は、[Audit Trail][5] を利用してサードパーティ製アプリケーションやインテグレーションからの IP アドレスを監視することを推奨します。

IP 許可リスト機能が有効な場合にモバイル アプリ クライアントが Datadog に接続できるようにするには、モバイル デバイスが VPN 経由で許可されたネットワーク範囲に接続することを Datadog は推奨します。

### 機能{#functionality}

{{< ui >}}Org Management{{< /ui >}} 権限を持つユーザーのみが IP 許可リストを構成できます。

IP 許可リスト API または UI を使用すると、次のことができます。
- IP 許可リストのステータスをチェックする。IP 許可リストがオンかオフかによって、組織が IP アドレス許可リストのメンバーシップによってリクエストを制限しているかどうかが決まります。
- IP 許可リストのオン・オフを切り替える。
- IP 許可リストでカバーされている IP アドレスを (CIDR 範囲として) 表示する。
- IP アドレス (IPv4 または IPv6) または CIDR 範囲を、オプションのメモ付きで IP 許可リストに追加する。
- すでに IP 許可リストに登録されている IP アドレスのメモを編集する。
- IP 許可リストから 1 つのエントリを削除する。
- IP 許可リスト全体を新しいエントリで置き換える (API 経由でのみ可能)。

### ロックアウト防止{#lockout-prevention}

IP 許可リストを有効にする、または変更するときに、システムは以下の制約を適用して、自分のデータにアクセスできなくならないようにします。
- IP 許可リストの少なくとも 1 つのエントリに、現在の IP が含まれている
- 許可リストに少なくとも 1 つのエントリが含まれている

## UI で IP 許可リストを管理する{#managing-the-ip-allowlist-in-the-ui}

**注:** IP 許可リスト ページが UI に表示されるのは、Datadog 組織でこの機能がオンになっている場合だけです。

[IP 許可リスト UI][6] を見つけるには、以下の手順に従います。

1. アカウントメニューから [{{< ui >}}Organization Settings{{< /ui >}}] に移動します。
1. [{{< ui >}}Security{{< /ui >}}] で [{{< ui >}}IP Allowlist{{< /ui >}}] を選択します。

IP 許可リストテーブルには、IP 許可リストに含まれる CIDR 範囲が一覧表示されます。

### IP 許可リストの有効化と無効化 {#enable-and-disable-the-ip-allowlist}

ページ上部のバナーに、IP 許可リストの有効/無効ステータスが表示されます。お客様の IP アドレスと、その IP アドレスが許可リストに含まれているかどうかも表示されます。

IP 許可リストのステータスを切り替えるには、[{{< ui >}}Enable{{< /ui >}}] または [{{< ui >}}Disable{{< /ui >}}] ボタンをクリックします。

### IP アドレスまたは CIDR 範囲を追加する{#add-ip-addresses-or-cidr-ranges}

{{< img src="account_management/org_settings/add_ip_2.png" alt="「Add IP to allowlist」というタイトルのダイアログボックスを示すスクリーンショット" >}}

1. ページ右上の {{< ui >}}Add IP{{< /ui >}} ボタンをクリックします。
1. 有効な IP アドレスまたは CIDR 範囲を入力します。
1. オプションで、たとえば、特定のアドレスへのアクセスを許可する理由を思い出せるように、メモを追加します。
1. [{{< ui >}}Confirm{{< /ui >}}] をクリックします。

### IP アドレスまたは CIDR 範囲を編集する{#edit-ip-addresses-or-cidr-ranges}

1. IP 許可リストテーブルで、編集したい行にカーソルを合わせます。
1. 鉛筆 ({{< ui >}}Edit{{< /ui >}}) アイコンをクリックします。
1. [{{< ui >}}Note{{< /ui >}}] の説明テキストを変更します。
1. [{{< ui >}}Confirm{{< /ui >}}] をクリックします。

### IP アドレスまたは CIDR 範囲を削除する{#delete-ip-addresses-or-cidr-ranges}

1. IP 許可リストテーブルで、削除したい行にカーソルを合わせます。
1. ゴミ箱 ({{< ui >}}Delete{{< /ui >}}) アイコンをクリックし、削除することを確認します。

## プログラムで IP 許可リストを管理する{#managing-the-ip-allowlist-programmatically}

API 経由で IP 許可リストを管理するには、[IP 許可リスト API のドキュメント][7] を参照してください。

Terraform で IP 許可リストを管理するには、[`ip_allowlist` リソース][8] を参照してください。


[1]: /ja/api/latest/
[2]: /ja/api/latest/authentication/#validate-api-key
[3]: https://docs.datadoghq.com/ja/agent/troubleshooting/send_a_flare/
[4]: /ja/dashboards/sharing/
[5]: /ja/account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/ip-allowlist
[7]: /ja/api/latest/ip-allowlist/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ip_allowlist
[9]: /ja/mcp_server/