---
title: IP 許可リスト
---

{{< callout url="/help/" header="IP Allowlist の使用を開始する" >}}
IP allowlist 機能はエンタープライズ プランのお客様のみが利用できます。サポートに問い合わせてアクセスをリクエストしてください。
{{< /callout >}}

## 概要

{{< img src="account_management/org_settings/ip_allowlist_list.png" alt="4 つの IP 範囲を含む IP 許可リスト UI を示すスクリーンショット" >}}

IP 許可リストは、Datadog のデータにアクセスするために使用できるネットワークを制御します。許可されたネットワークを制限することで、データの流出や内部脅威からリソースを保護することができます。

IP 許可リストを有効にすると、許可リストに含まれる IP アドレスまたは CIDR 範囲のみが Datadog API および UI にアクセスできるようになります。

### ブロックされたリソースと許可されたリソース

ユーザーの IP が IP 許可リストに含まれていない場合、ユーザーは事実上、以下のアクセスおよび使用をブロックされます。

- Datadog の Web UI
- Datadog の公開 [API][1] (ドキュメントと未公開エンドポイントの両方を含む)
- Datadog のモバイルアプリ(iOS、Android)
- OAuth で Datadog にアクセスするサードパーティのインテグレーションおよびアプリケーション

IP 許可リスト機能は、以下へのアクセスをブロックしません。
- Agent がメトリクス、トレース、ログなどのデータを送信するデータ取り込みエンドポイント
- Agent がデータを送信する前に使用する [validate API key][2] のエンドポイント
- [Agent フレアの送信][3]
- [パブリック ダッシュボード][4]

Agent からテレメトリー (metrics、traces、logs) を送信するアプリケーションおよびインテグレーション、ならびにユーザーが提供した API キーを使用するものは、IP allowlist の影響を受けません。Datadog は、サードパーティのアプリケーションおよびインテグレーションからの IP アドレスを監視するために [Audit Trail][5] を利用することを推奨します。

IP allowlist 機能が有効な場合にモバイル アプリ クライアントが Datadog に接続できるようにするには、モバイル デバイスを VPN 経由で許可されたネットワーク範囲に接続させることを Datadog は推奨します。

### 機能性

IP 許可リストは、**Org Management** 権限を持つユーザーのみが設定できます。

IP 許可リスト API または UI を使用すると、次のことができます。
- IP 許可リストのステータスを確認できます。IP 許可リスト がオンかオフかによって、組織が IP アドレス許可リストのメンバーシップによってリクエストを制限しているかどうかが決まります。
- IP 許可リストのオン/オフを切り替えることができます。
- IP 許可リストでカバーされている IP アドレス (CIDR 範囲として) を表示できます。
- IP アドレス (IPv4 または IPv6) または CIDR 範囲を、オプションのメモとともに IP 許可リストに追加できます。
- すでに IP 許可リストに登録されている IP アドレスのメモを編集できます。
- IP 許可リストから 1 つのエントリを削除することができます。
- IP 許可リスト全体を新しいエントリで置き換えることができます (API を通じてのみ利用可能)。

### ロックアウト防止

IP 許可リストを有効化または変更すると、あなたがデータにアクセスできなくならないようにシステムは制約を適用します。
- IP 許可リストの少なくとも 1 つのエントリに、現在の IP が含まれている
- 許可リストには、少なくとも 1 つのエントリが含まれている

## UI で IP 許可リストを管理する

**注:** IP 許可リスト ページは、Datadog 組織がこの機能をオンにしている場合にのみ UI に表示されます。

[IP allowlist UI][6] を見つけるには:

1. アカウントメニューから、**Organization Settings** に移動します。
1. **Security** で **IP Allowlist** を選択します。

IP 許可リストテーブルには、IP 許可リストに含まれる CIDR 範囲が一覧表示されます。

### IP 許可リストの有効化・無効化

ページ上部のバナーには、IP 許可リストの有効/無効のステータスが表示されます。また、IP とその IP が許可リストにあるかどうかも表示されます。

IP 許可リストのステータスを切り替えるには、**Enable** または **Disable** ボタンをクリックします。

### IP アドレスまたは CIDR 範囲を追加する

{{< img src="account_management/org_settings/add_ip_2.png" alt="「Add IP to allowlist」というタイトルのダイアログ ボックスを示すスクリーンショット" >}}

1. ページ右上の **Add IP** ボタンをクリックします。
1. 有効な IP アドレスまたは CIDR 範囲を入力します。
1. オプションで、例えば、特定のアドレスへのアクセスを許可する理由を思い出すために、メモを追加します。
1. **Confirm** をクリックします。

### IP アドレスまたは CIDR 範囲を編集する

1. IP 許可リストテーブルで、編集したい行にカーソルを合わせます。
1. 鉛筆 (**Edit**) のアイコンをクリックします。
1. 説明文の **Note** のテキストを変更します。
1. **Confirm** をクリックします。

### IP アドレスまたは CIDR 範囲を削除する

1. IP 許可リストテーブルで、削除したい行にカーソルを合わせます。
1. ゴミ箱 (**Delete**) のアイコンをクリックし、削除することを確認します。

## プログラムで IP 許可リストを管理する

API 経由で IP allowlist を管理するには、[IP Allowlist API ドキュメント][7] を参照してください。

Terraform で IP allowlist を管理するには、[`ip_allowlist` リソース][8] を参照してください。


[1]: /ja/api/latest/
[2]: /ja/api/latest/authentication/#validate-api-key
[3]: https://docs.datadoghq.com/ja/agent/troubleshooting/send_a_flare/
[4]: /ja/dashboards/sharing/
[5]: /ja/account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/ip-allowlist
[7]: /ja/api/latest/ip-allowlist/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ip_allowlist