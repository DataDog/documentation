---
aliases:
- /ja/logs/log_configuration/sensitive_data_detection
beta: true
further_reading:
- link: /security/logs/
  tag: ドキュメント
  text: セキュリティ
- link: /logs/explorer/
  tag: ドキュメント
  text: ログエクスプローラー
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: ブログ
  text: Datadog の機密データスキャナーで最新のデータコンプライアンス戦略を構築する
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: ブログ
  text: 機密データ管理のベストプラクティス
kind: documentation
title: センシティブ データ スキャナー
---

## 概要

クレジットカード番号、銀行コード、API キーなどの機密データは、アプリケーションログやトレースイベントで意図せずに公開されることが多く、組織が財務リスクやプライバシーリスクにさらされる可能性があります。

多くの場合、企業は、組織のポリシー、コンプライアンス要件、業界規制、およびプライバシーの懸念から、ログ内のそのような機密データの公開を識別、修正、および防止する必要があります。これは、銀行、金融サービス、ヘルスケア、保険などの業界内に特に当てはまります。

## センシティブ データ スキャナー

機密データスキャナーは、ストリームベースのパターンマッチングサービスで、機密データの特定、タグ付け、オプションでリダクトやハッシュ化に使用することができます。セキュリティおよびコンプライアンスチームは、機密データスキャナーを新たな防御策として導入し、機密データ漏洩の防止とコンプライアンス違反リスクの抑制に役立てることができます。

機密データスキャナーは、[組織設定][1]で確認することができます。

{{< img src="logs/sensitive_data_scanner/sds_main_apr_22.png" alt="組織設定の機密データスキャナー" style="width:90%;">}}

### セットアップ

- **スキャンルールの定義:** スキャングループは、スキャンするログの種類を示すフィルタークエリと、これらのログ内でスキャンする特定の種類の機密データを示すスキャンルールのセットで構成されます。フィルタークエリの詳細については、[ログ検索構文][2]のドキュメントを参照してください。
- **スキャンルールの定義:** スキャングループ内では、Datadog のスキャンルールライブラリから定義済みのスキャンルールを追加したり、ゼロから独自のルールを作成して、カスタム正規表現パターンを使用してスキャンすることができます。

### カスタムスキャンルール

- **パターンの定義:** ログイベントとの照合に使用する正規表現パターンを指定します。サンプルデータでテストして、正規表現パターンが有効であることを確認します。
- **スコープの定義:** ログイベント全体をスキャンするか、特定のログ属性のみをスキャンするかを指定します。スキャンから特定の属性を除外することもできます。
- **タグの追加:** 値が指定された正規表現パターンと一致するログイベントに関連付けるタグを指定します。Datadog は、タグ `sensitive_data` と `sensitive_data_category` の使用を推奨しています。これらのタグは、検索、ダッシュボード、およびモニターで使用できます。
- **一致する値の処理:** オプションで、一致する値を冗長化、部分冗長化、またはハッシュ化するかどうかを指定します。編集する場合は、一致する値を置換するプレースホルダーテキストを指定します。部分的に編集する場合は、一致する値の中で編集する位置 (開始/終了) と長さ (文字数) を指定します。編集、部分的な編集、およびハッシュはすべて不可逆的なアクションです。
- **ルールに名前を付ける:** ルールに人間が読みやすい名前を付けます。

{{< img src="logs/sensitive_data_scanner/sds_rule_apr_22.png" alt="機密データスキャナーカスタムルール" style="width:90%;">}}

### すぐに使えるスキャンルール

スキャンルールライブラリには、メールアドレス、クレジットカード番号、API キー、認証トークンなどの共通パターンを検出するために Datadog が維持する定義済みルールのコレクションが増え続けています。
{{< img src="logs/sensitive_data_scanner/sds_library_apr_22.png" alt="スキャンルールライブラリ"  style="width:90%;">}}

### アクセス許可

デフォルトでは、Datadog 管理者ロールを持つユーザーは、スキャンルールを表示および定義するためのアクセス権を持っています。他のユーザーアクセスを許可するには、**Access Management** でデータスキャナーのアクセス許可を付与します。ロールとアクセス許可の詳細については、[カスタム RBAC ドキュメント][3]を参照してください。

{{< img src="logs/sensitive_data_scanner/scanner_permission.png" alt="機密データスキャナーの権限" style="width:90%;">}}

### クエリベースの RBAC でのタグの使用

機密データを含むログイベントにアクセスできるユーザーを制御します。機密データスキャナーによって追加されたタグを使用して、RBAC でクエリを作成し、保持期間後にデータが期限切れになるまで特定の個人またはチームへのアクセスを制限します。

### すぐに使えるダッシュボード

Sensitive Data Scanner を有効にすると、機密データの発見事項をまとめたすぐに使える[ダッシュボード][4]がアカウントに自動的にインストールされます。

{{<img src="account_management/sensitive_data_scanner/sdslight.png" alt="Sensitive Data Scanner Overview dashboard" style="width:70%;">}}

このダッシュボードにアクセスするには、**Dashboards > Dashboards List** に移動し、`Sensitive Data Scanner Overview` を検索します。

**注:**
- 追加または更新するルールは、ルールが定義された後に Datadog に送られるデータにのみ影響します。
- 機密データスキャナーは、Datadog Agent で直接定義するルールには影響しません。
- 機密データスキャナーを完全にオフにするには、トグルを**オフ**に設定して、各スキャングループとスキャンルールを無効にしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[2]: /ja/logs/explorer/search_syntax/
[3]: /ja/logs/guide/logs-rbac-permissions/?tab=ui#overview
[4]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner