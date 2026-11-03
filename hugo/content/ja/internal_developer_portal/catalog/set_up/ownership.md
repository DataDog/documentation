---
aliases:
- /ja/internal_developer_portal/software_catalog/set_up/ownership
description: サービスやその他のエンティティを Datadog Teams にリンクすることで、ビューのフィルタリング、通知のルーティング、ソフトウェアポートフォリオ全体でのアカウンタビリティの促進が可能になります。
further_reading:
- link: /account_management/teams/
  tag: ドキュメント
  text: Teams
- link: /internal_developer_portal/catalog/entity_model/
  tag: ドキュメント
  text: Datadog UI からメタデータを追加する
title: Catalog エンティティのオーナーシップを定義する
---
## 概要 {#overview}

Catalog でオーナーシップを定義し、エンティティを、各エンティティを担当する Datadog Teams に関連付けることができます。オーナーシップ情報は各エンティティの詳細ページに表示され、以下のことが可能になります。
- Datadog 製品全体でチームごとにビューをフィルタリングする。
- Scorecards と Campaigns を適切なオーナーに割り当てる。
- 通知とオンコールコンテキストを適切なチームにルーティングする。

## Team を作成する {#create-a-team}

チームは、[[Datadog Organization Settings][3]] (Datadog 組織の設定) から、または [Catalog][1] から直接作成できます。詳細な手順については、「[Team のセットアップと設定][2]」を参照してください。

Team の定義には下記が含まれます。
1. **Team 名**: 例:「Bits Demo」。
2. **ハンドル**: `bits-demo` のような一意の識別子。ハンドルは検索ファセットとして使用できます (例: `team:bits-demo`)。
3. **メンバー**: 1 人以上の Datadog ユーザー。
4. **説明**: 任意ですが、コンテキストのために設定することを推奨します。

Team を作成した後、参照リンクの追加、通知の設定、および Monitors や Dashboards などの Datadog リソースと Team の関連付けを行うことができます。

## エンティティのオーナーシップを設定する {#configure-entity-ownership}

### Datadog {#in-datadog}

Datadog でエンティティのオーナーを追加または更新するには、次のようにします。

1. **Catalog** に移動し、エンティティを開きます。
2. エンティティページで [**Edit in UI**] (UI で編集) をクリックします。
3. [**Ownership**] (オーナーシップ) セクションで、**オーナー**を設定し、必要に応じて**追加のオーナー**を追加します。
   - チーム名で検索するか、ハンドル (例: `team:example-team`) を貼り付けます。
5. [**Save Entry**] (エントリーを保存) をクリックします。

### 構成ファイルを使用 {#through-configuration-files}

エンティティをコードとして管理している場合 (リポジトリで管理するサービス定義や自動化など)、オーナーにマッピングされるエンティティメタデータフィールドに Team のハンドルを含めます。ハンドルが既存の Datadog Teams と完全に一致していることを確認してください。

## ベストプラクティス {#best-practices}

- **個人ではなく Teams を使用する:** メンバーシップの変更によってオーナーシップの関連付け、フィルター、通知に影響が出ないように、エンティティを Teams に割り当ててください。
- **プライマリオーナーを選択する:** 責任を持つ Team を 1 つ指定し、必要な場合にのみセカンダリオーナーを追加します。
- **ハンドルを統一する:** 一貫性と検索性を保つため、小文字とハイフンを使用したハンドルを使用してください (例: `Payments Platform` ではなく、`payments-platform`)。
- **IDP から同期する:** 可能であれば、SAML または SCIM から Teams をプロビジョニングし、メンバーシップを最新の状態に保ってください。
- **Team フィルターを使用する:** エンジニアが [Team フィルター][4] で自分の Team を選択し、担当するエンティティにビューを絞りむように促します。
- **Team 階層を使用する**: [サブチーム][5] を作成して組織構造を反映させ、階層的なフィルタリングを可能にします。



[1]: https://app.datadoghq.com/teams
[2]: /ja/account_management/teams/
[3]: https://app.datadoghq.com/organization-settings/teams
[4]: /ja/account_management/teams/#team-filter
[5]: /ja/account_management/teams/manage/#team-hierarchies