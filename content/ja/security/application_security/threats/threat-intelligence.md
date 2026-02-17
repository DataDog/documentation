---
further_reading:
- link: https://docs.datadoghq.com/security/threat_intelligence/
  tag: ドキュメント
  text: Datadog の Threat Intelligence
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog App and API Protection で脅威から保護する
title: Threat Intelligence
---

## 概要

このトピックでは、App and API Protection (AAP) の [脅威インテリジェンス][1] について説明します。

Datadog には、AAP 向けの脅威インテリジェンス [データ セット][1] が組み込まれています。これにより、セキュリティ アクティビティに対応する際の根拠が増えるほか、一部のビジネス ロジック検知では検知しきい値が引き下げられます。

さらに AAP は、*独自の脅威インテリジェンスの持ち込み (bring your own threat intelligence)* にも対応しています。この機能により、業務固有の脅威インテリジェンスで検知結果を補強できます。

## ベストプラクティス

Datadog は、脅威インテリジェンスの活用方法として以下を推奨しています。

1. クレデンシャルスタッフィングなどのビジネスロジックに対する脅威の検出ルールのしきい値を低く設定すること。ユーザーは、デフォルトの[クレデンシャルスタッフィング][6]ルールを複製し、ニーズに応じてカスタマイズすることができます。
2. セキュリティ活動において、脅威インテリジェンスをレピュテーションの指標として活用すること。

Datadog は、以下を推奨しません。
1. セキュリティ活動に対応していない脅威インテリジェンスのトレースをブロックすること。IP アドレスの背後には多くのホストが存在する可能性があり、住宅用プロキシが検出された場合、その IP アドレスの背後にあるホストが関連する活動を行っていたことを示しますが、そのホストがマルウェアやプロキシを実行しているホストと、あなたのサービスと通信しているホストが同一であることを保証するものではありません。
2. すべての脅威インテリジェンスカテゴリーに対してブロックを行うこと。これにより、企業の VPN からの良性のトラフィックや悪意のないトラフィックもブロックされる可能性があります。

## AAP で脅威インテリジェンスを使ってフィルタリングする

ユーザーは、Signal Explorer と Traces Explorer 上でファセットや検索バーを使用して脅威インテリジェンスをフィルタリングできます。

特定のソースによってフラグ付けされたすべてのトレースを検索するには、次のクエリをソース名と共に使用します。

    @threat_intel.results.source.name:<SOURCE_NAME> 

任意のソースからの脅威インテリジェンスを含むすべてのトレースを検索するには、次のクエリを使用します。

    @appsec.threat_intel:true 

## Bring Your Own Threat Intelligence

AAP は、Datadog のリファレンス テーブルに保存された脅威インテリジェンスの侵害指標 (IoC) を使って、トレースをエンリッチし、検索できるようにできます。[リファレンス テーブル][2] を使うと、メタデータを Datadog に既にある情報と組み合わせられます。

### 侵害指標をリファレンステーブルに格納

Threat Intelligence は CSV 形式に対応しており、次の列が必要となります。

**CSV 構造**

| フィールド            | データ  | 説明| 必須 | 例|
|------------------|-------|----|-----|--|
| ip_address       | テキスト | IPv4 のドット表記形式のリファレンステーブルのプライマリキー。 | true | 192.0.2.1  |
| additional_data  | json      | トレースを強化するための追加データ。 | false | `{"ref":"hxxp://example.org"}`
| category         | テキスト  | 脅威インテリジェンスの[カテゴリー][7]。これは、すぐに使える検出ルールで使用されます。 | true | `residential_proxy` |
| intention        | テキスト | 脅威インテリジェンスの[意図][8]。すぐに使える検出ルールで使用されます。| true | 悪意がある | |
| source           | テキスト  | ソースの名前とそのサイトへのリンク (例: あなたのチームとチームの Wiki)。 | true| `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` | | 



サポートされているカテゴリーと意図の全リストは、[Threat Intelligence Facets][3] で確認できます。

<div class="alert alert-info">CSV 内の JSON には二重引用符が必要です。以下はその例です。</div>

```
ip_address,additional_data,category,intention,source
192.0.2.1,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.2,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.3,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

### 独自の脅威インテリジェンスをアップロードして有効化する

Datadog では、手動でアップロードするか、[Amazon S3、Azure Storage、Google Cloud Storage][10] から定期的にデータを取得することで参照テーブルを作成できます。

注:
- テーブルを作成してから AAP トレースのエンリッチが始まるまで、10～30 分かかる場合があります。
- プライマリキーが重複している場合、該当する行はスキップされ、そのキーに関するエラーメッセージが表示されます。

新しい[リファレンステーブル][4]ページで、

1. テーブルに名前を付けます。テーブル名は AAP の **Threat Intel** 設定で参照されます。
2. ローカルの CSV ファイルをアップロードするか、クラウドストレージバケットから CSV をインポートできます。ファイルは正規化および検証されます。
3. テーブルスキーマをプレビューし、IP アドレスをプライマリキーとして選択します。

   {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table.png" alt="新しいリファレンステーブル" style="width:100%;" >}}
4. テーブルを保存します。
5. [Threat Intel][5] で新しいテーブルを見つけ、トグルを選択して有効にします。

   {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table_enabled.png" alt="有効なリファレンステーブル" style="width:100%;" >}}

#### クラウドストレージを使用する場合

参照テーブルがクラウドストレージから作成された場合、定期的にリフレッシュされます。テーブル全体が*置き換え*られ、データはマージされません。

関連する参照テーブルのドキュメントを参照してください。
- [Amazon S3][11]
- [Azure storage][12]
- [Google Cloud storage][13]

#### クラウドインポートのトラブルシューティング

参照テーブルがリフレッシュされていない場合、参照テーブル詳細ページの設定から **View Change Events** リンクを選択します。

**View Change Events** を選択すると、**Event Management** ページが開き、取り込みに関する潜在的なエラーイベントが表示されます。また、参照テーブル名を使用して **Event Management** 内でフィルタリングすることもできます。

<div class="alert alert-info">Datadog の Event Management 上では、クラウドからデータが取得されたように見えることがありますが、これらの変更が Threat Intelligence に反映されるまでには、さらに数分かかる場合があります。</div>

その他、クラウドインポートに関して覚えておくと有用なポイント:

- ソースがアップロードまたは更新された後、更新されたエンリッチメントが利用可能になるまでの予想レイテンシーは 10～30 分です。
- 更新が適用されたかどうかを知るには、変更は参照テーブルまたはスパン内で確認できます。関連イベントを確認するには、参照テーブル詳細ページの設定から **View Change Events** リンクを選択してください。
- 更新によって*テーブル全体*が新しいデータで置き換えられます。
- 重複するプライマリキーがある場合、その重複キーの行は書き込まれず、参照テーブル詳細ページにエラーが表示されます。

### リファレンステーブルとリストを結合してトレースをフィルタリングする

Datadog では、トレース テーブルをリファレンス テーブルと結合することで AAP トレースをフィルタリングできます。

リファレンステーブルをトレースクエリと結合するには、Datadog のトレーステーブルとリファレンステーブルの関連する列に基づいて、それらのテーブルの行を結合します。トレースクエリは、両方のテーブルで一致するものがあるトレースのみを返します。

リファレンステーブルとの結合を使用することで、既存のトレースとの過去の一致を検索し、強化前の影響を評価することができます。

IP アドレスに限らず、任意のフィールドを使用できます。たとえば、リファレンステーブルの特定の URL とセキュリティトレースを関連付けることで、アプリケーションのどの部分が攻撃の標的となっているかを特定できます。これにより、アプリケーション内の脆弱性やリスクの高い領域を正確に特定できます。

例:

- 調査とインシデント対応。攻撃の IP アドレスやその他のフィールドをアップロードして結合し、そのインシデントに関連するトラフィックを確認することができます。
- リファレンステーブルの IP アドレスとセキュリティトレースを結合し、例えば IP アドレスを地理的な場所や組織の詳細と関連付けることで、セキュリティチームは攻撃の試みに関するより優れたコンテキストを得ることができます。これにより、攻撃の起源や潜在的な動機を理解するのに役立ちます。


リファレンステーブルにトレースを結合するには

1. [独自の脅威インテリジェンスをアップロードして有効化する](#uploading-and-enabling-your-own-threat-intel)で説明されているように、使用するリファレンステーブルをアップロードします。
2. トレースをリファレンステーブルと結合するには、[Traces][9] で **Add** を選択し、その後 **Join with Reference Table** を選択します。
3. **Inner join with reference table** で使用するリファレンステーブルを選択します。
4. **where field** で、結合に使用する Datadog トレースフィールドを選択します。
5. **column** では、結合に使用するリファレンステーブルのフィールドを選択します。

{{< img src="security/application_security/threats/threat_intel/threat_intel_ref_join.png" alt="イメージの説明" style="width:100%;" >}}

### 検出ルール用のトレースの強化

トレースのエンリッチでは、侵害指標が AAP トレース内の `http.client_ip` キーの値と一致した場合に、脅威インテリジェンスの属性が AAP トレースへ追加されます。これにより、既存の Facets を使って脅威インテリジェンス一致のトレースを検索したり、検知ルールで脅威インテリジェンスを活用したりできます。



## ユーザーインターフェイスにおける脅威インテリジェンス

AAP Traces Explorer でトレースを表示すると、`@appsec` 属性の下に脅威インテリジェンス データが表示されます。`category` と `security_activity` の属性はいずれも設定されます。

{{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="脅威インテリジェンスデータを含む appsec 属性の例">}}

`@threat_intel.results` の下には、どのソースから一致したかの詳細が常に表示されます。

{{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="脅威インテリジェンスデータを含む threat_intel 属性の例">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/threat_intelligence/#threat-intelligence-sources
[2]: /ja/integrations/guide/reference-tables
[3]: /ja/security/threat_intelligence/#threat-intelligence-facets
[4]: https://app.datadoghq.com/reference-tables/create
[5]: https://app.datadoghq.com/security/configuration/threat-intel
[6]: https://app.datadoghq.com/security/configuration/asm/rules/edit/kdb-irk-nua?product=appsec
[7]: /ja/security/threat_intelligence#threat-intelligence-categories
[8]: /ja/security/threat_intelligence#threat-intelligence-intents
[9]: https://app.datadoghq.com/security/appsec/traces
[10]: /ja/integrations/guide/reference-tables/?tab=manualupload#create-a-reference-table
[11]: /ja/integrations/guide/reference-tables/?tab=amazons3#create-a-reference-table
[12]: /ja/integrations/guide/reference-tables/?tab=azurestorage#create-a-reference-table
[13]: /ja/integrations/guide/reference-tables/?tab=googlecloudstorage#create-a-reference-table