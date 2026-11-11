---
description: Data Access Control を使用して、テレメトリデータへのアクセスを制限します。
further_reading:
- link: /account_management/rbac/data_access
  tag: ドキュメント
  text: Data Access Control
- link: /security/sensitive_data_scanner/
  tag: ドキュメント
  text: Sensitive Data Scanner
- link: /administrators_guide/plan/#resource-tagging
  tag: ドキュメント
  text: 'Administrator''s Guide: タグ付け'
- link: /tracing/configure_data_security/
  tag: ドキュメント
  text: Data Security
title: 機密データの保護
---
## 概要{#overview}

[アセットの保護][1]では、誰がダッシュボード、モニター、その他のオブジェクトを編集または表示できるかを説明していますが、このセクションでは *テレメトリ*、つまり Datadog を流れる基盤データについて説明します。すべての組織がデータレベルの制限を必要とするわけではありませんが、機密データや規制対象データを扱う組織には [Data Access Control][2] が必要です。Data Access Control を使用すると、タグ値によって定義され、そのデータが表示される可能性のあるすべてのビューで適用される、データに対する行レベルの制限を作成できます。

このセクションは、データの機密性パターンを特定し、アクセスを制限するための適切なアプローチを選択するのに役立ちます。

## データの機密性パターンの特定 {#identifying-your-data-sensitivity-patterns}

機密データの制限には、3 つの一般的なパターンがあります。これら 3 つのうちの 1 つ、または複数を組み合わせて使用できます。

### パターン 1: データのタイプに基づく {#pattern-1-based-on-the-type-of-data}

特定のタイプのデータはすべて、どこから送信されたかに関わらず機密扱いとなります。

*たとえば、ログデータには常に機密情報が含まれるため、低権限ユーザーには閲覧を許可しないようにします。または、RUM セッションにはエンドユーザーの PII が含まれる可能性があるため、請負業者がアクセスできないようにします。*

**推奨されるアプローチ:** 関連する読み取り権限を持たない[カスタムロール][3]を作成します。そのタイプのデータを一切閲覧できないようにすべきサードパーティの請負業者などのユーザーに、そのロールを割り当てます。これは権限レベルの制限であり、Data Access Control の制限ではありません。

### パターン 2: サービス、インフラストラクチャー、または所有者に基づく {#pattern-2-based-on-the-service-infrastructure-or-owner}

データの機密性は、データタイプそのものではなく、誰が、または何がそのデータを生成しているかによって決まります。一部のサービスやインフラストラクチャーコンポーネントは、特定のチームにのみ制限すべきデータを生成します。

*たとえば、決済処理サービスは、Payments チームと上位管理者のみが閲覧できる APM トレース、ログ、および RUM データを生成します。そのサービスからのすべてのテレメトリは、タイプにかかわらず機密情報です。*

**推奨されるアプローチ:** [Data Access Control][2] を使用して、関連するテレメトリタイプ全体で、タグ (`service:payment-processor` など) に基づいた制限付きデータセットを作成します。担当チーム、およびその他の承認されたロールやチームにアクセス権を割り当てます。

### パターン 3: サービス内の保護されたデータクラスに基づく {#pattern-3-based-on-protected-classes-of-data-within-a-service}

機密データが、同じソースおよびテレメトリタイプの非機密データと混在しています。これは、データストリーム内の特定のレコードのみが機密情報である規制業界において一般的です。

*たとえば、医療機関では、サービスが組織内の誰もが閲覧できる日常的な運用ログを生成する一方で、アクセス制限が必要な HIPAA 保護データも生成する場合があります。または金融機関において、APM、ログ、RUM にまたがる取引データはコンプライアンスで承認されたユーザーのみに制限する必要がありますが、同じ環境からの一般的なインフラストラクチャーデータは広くアクセス可能です。*

**推奨されるアプローチ:** Data Access Control を使用して、影響を受けるテレメトリタイプ全体で、分類タグ (`data_sensitivity:hipaa` または `data_classification:trading` など) に基づいた制限付きデータセットを作成します。そのクラスのデータを閲覧する権限を持つロールまたはチームにアクセス権を割り当てます。

## Sensitive Data Scanner {#sensitive-data-scanner}

[Sensitive Data Scanner][4] は、機密データが予期せず現れる状況に対して、自動化されたセーフティネットを提供します。たとえば、開発者が誤ってクレジットカード番号、メールアドレス、またはマイナンバー/社会保障番号をログに記録してしまうことがあります。

Sensitive Data Scanner は、特にインジェスト時に機密データが一貫してタグ付けされていることを保証できない場合に、Data Access Control と併用する多層防御策として有用です。

## 制限付きデータセット外のデータのアクセス設定を選択する {#choosing-the-access-setting-for-data-outside-restricted-datasets}

デフォルトの **Unrestricted** 設定を使用して、段階的に制限を適用します。すべてのデータはデフォルトで表示され、特定のデータへのアクセスを制限するために制限付きデータセットを作成します。このモデルは、機密データが例外であり、原則ではない場合に適しています。

厳しい規制要件がある組織 (たとえば防衛) や、同じ Datadog テナント内で複数の外部ビジネスパートナーと連携する組織向けに、Datadog は制限付きデータセットに含まれないデータに対して [**Restricted** 設定][6] を提供しています。この設定では、データはデフォルトで非表示になり、ユーザーは明示的にアクセス権が付与されたデータのみを閲覧できます。機密データのサブセットを制限する代わりに、すべてへのアクセスを明示的に許可する必要があります。

**Restricted** 設定は例外であり、原則ではありません。テレメトリへのアクセスに対してデフォルト拒否モデルが規制または法的枠組みで求められている場合にのみ、これを使用します。

## 推奨事項 {#recommendations}

データセットを作成する前に、- **どのパターンが自分たちに適用されるかを特定**します。多くの組織では、パターン 2 (サービスベースの制限) を主要モデルとして使用し、パターン 1 (ロールを通じたタイプベースの制限) を補足として使用しています。
- **タグを一貫して使用します。**Data Access Control による制限は、タグ付けが適切に行われてこそ有効になります。サービス、インフラストラクチャー、およびデータ分類が、インジェスト時に一貫してタグ付けされていることを確認します。適切なタグが確実に存在するように、タグ付け戦略 ([管理者ガイド][5]を参照) に従って作業します。
- **最も機密性の高いデータから開始します。**一度にすべてのデータセットを作成しようとしないでください。最も機密性の高いサービスまたはデータクラスを上位 3〜5 つ特定し、まずそれらを制限します。
- **データセット外のデータを制限する規制上の理由がない限り、デフォルトの Unrestricted 設定を維持します。**デフォルト拒否は重大な運用オーバーヘッドを生じさせるため、規制環境で要求される場合にのみ使用します。
- **Data Access Control と Sensitive Data Scanner を組み合わせ**、特にログに対する多層防御策とします。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/access_for_enterprises/protecting_assets/
[2]: /ja/account_management/rbac/data_access
[3]: /ja/getting_started/access_for_enterprises/permissions/#custom-roles
[4]: /ja/sensitive_data_scanner/
[5]: /ja/administrators_guide/plan/#resource-tagging
[6]: /ja/account_management/rbac/data_access/#strict-mode