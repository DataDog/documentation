---
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: ドキュメント
  text: Cloud Security の誤設定
- link: /security/cloud_security_management/vulnerabilities/
  tag: ドキュメント
  text: Cloud Security の脆弱性
- link: /security/sensitive_data_scanner/
  tag: ドキュメント
  text: Sensitive Data Scanner
title: Crown Jewels
---
{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="プレビューに参加しましょう">}}
Crown Jewels はプレビュー中です。今すぐこのフォームからリクエストを送信してください。
{{< /callout >}}

## 概要 {#overview}

Crown Jewels は最も重要なクラウドリソースのインベントリです。これは、Datadog にすでに送信されているテレメトリから自動的に検出されます。このリストは、Cloud Security 全体での修正作業の優先順位を付けるための出発点になります。Crown Jewels に関連する脆弱性、誤設定、アイデンティティリスクを、他の所見とは異なる方法でソート、フィルタリング、ルーティングできます。

ほとんどのセキュリティチームは、対応できる以上の所見を持っていますが、どのリソースが最も重要かを知ることで、最初に注意が必要な所見のサブセットに取り組み始めることができます。

APM、ログ、クラウドストレージを含む既存のテレメトリを分析することにより、Datadog は初期リストを生成します。そこから、環境で最も重要なものに合わせてリストをキュレーションできます。

## 検出されるもの {#what-gets-detected}

Crown Jewels は、3 つのリソースタイプを評価します。

| リソースタイプ | 評価されるデータ |
|---|---|
| サービス | APM で計測されたサービスと推定されたサービス |
| データベース | APM および Database Monitoring を通じて観察されるデータベースインスタンス |
| バケット | エージェントレススキャンおよび Sensitive Data Scanner によって観察される S3 バケット |

リソースがセンシティブデータを扱っている、資格情報を保持している、または環境内で構造的に重要な位置にあることを 1 つ以上の検出信号が示すときに、Datadog はリソースをリストに追加します。

### 検出信号 {#detection-signals}

Crown Jewels は、特定のリソースに対して有効なテレメトリソースに基づいてのみ検出を行うことができます。カバレッジは、Datadog のインスツルメンテーションの深さに応じて拡大します。インスツルメンテーションが充実していればいるほど、Datadog が評価できる範囲が広がり、結果として自動的に検出されるリストの精度が向上します。

信号タイプのテレメトリソースが欠けていて、Datadog が関連リソースを自動的に補充できない場合、リソースを手動で追加することができます。

| 信号 | ソース | 例 |
|---|---|---|
| APM スパン内のシークレット | APM 上の Sensitive Data Scanner | スパン属性で観測される AWS アクセスキーがあるサービス |
| ログ内のセンシティブフィールド| ログ上の Sensitive Data Scanner| ログイベントでクレジットカード番号、メールアドレス、または資格情報が検出されるサービス|
| センシティブなカラム名| APM 上の Sensitive Data Scanner| `password`、`ssn`、`email` などの名前の列があるデータベース|
| 静止状態のセンシティブデータ| エージェントレススキャン + Sensitive Data Scanner| PII、資格情報、またはその他のセンシティブコンテンツを含む S3 バケット|
| サービス依存関係のファンイン| APMサービスマップ| 広範な依存関係を持つファンインが高いサービスは、侵害された場合の影響範囲が大きくなります。|
| API トラフィック内のセンシティブデータ| アプリと API の保護| PII のようなセンシティブデータを持つエンドポイントを公開するサービス|

## リストを使って所見をフィルタリングします{#use-the-list-to-filter-findings}

Crown Jewels リストのすべての所見には、`@risk.is_crown_jewel:true`でタグが付けられています。そのタグは、Datadog のセキュリティデータモデルを通じて、そのリソースに関連する所見に伝播されます。以下のすべては、Crown Jewels の所見としてマークされます。

- Crown Jewels サービスに接続された仮想マシンの誤設定
- Crown Jewelsサービスによって使用されるコンテナイメージの脆弱性

この伝播により、`@risk.is_crown_jewel:true`を以下においてフィルターまたはファセットとして使用できます。

- **脆弱性エクスプローラー**で、重要なリソースに関連する所見に対する修正に焦点を当てます。
- **誤設定エクスプローラー**で、最も重要な資産に対する強化作業の範囲を設定します。
- **通知**で、Crown Jewels 資産に対して通知を異なる方法でルーティングします。
- **所見の自動化**で、Crown Jewels に関連する所見のためのカスタム修正パターンを定義します。

フィルターを他の基準と組み合わせることができます。例えば、脆弱性エクスプローラーを `severity:critical` AND `@risk.is_crown_jewel:true` でフィルタリングできます。

## リストのレビューと編集{#review-and-edit-the-list}

Crown Jewels を表示するには、[**Security**] (セキュリティ) > [**Settings**] (設定) > [**Cloud Security**] > [[**Crown Jewels**][1]] と移動してください。Datadog は、以下の情報を示すエントリでリストに自動的に値を設定します。

- リソースの種類と名前。
- 含めることをトリガーした検出信号。
- 基礎となる証拠の概要。

自動生成されたリストは、あなたがキュレーションできるドラフトとして扱い、実際にあなたのビジネスにとって重要なものを反映させてください。以下が可能です。

- **重要であるとあなたが理解している内容に一致しないエントリ**を削除する (例えば、低価値の URL 文字列のためにフラグが立てられたサービスなど)。
- **Datadog が自動検出しなかったが、**あなたのビジネスにとって重要であることが分かっているリソースを追加する。

## プライバシーとデータ処理{#privacy-and-data-handling}

Crown Jewels は、すでに Datadog に送信されたテレメトリに基づいて実行されます。あなたの Datadog アカウントの外に移動されたり、第三者に送信されたりしません。検出は、他の Cloud Security データと同じ地域のインフラストラクチャーで実行されます。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/crown-jewels