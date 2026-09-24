---
description: Data Access Control を使用して、Agent Observability プロジェクトとその内部のすべてのコンテンツを、特定のチームまたはロールに制限します。
further_reading:
- link: /account_management/rbac/data_access/
  tag: ドキュメント
  text: Data Access Control
- link: /llm_observability/data_governance/
  tag: ドキュメント
  text: データガバナンス
- link: /account_management/rbac/permissions/#access-management
  tag: ドキュメント
  text: アクセス管理の権限
title: Agent Observability における Data Access Control
---
## 概要 {#overview}

Agent Observability プロジェクトには、データセットのプロンプトや期待される出力、実験の実行からのトレース、評価結果、アノテーションキューでレビュー中のトレースなど、機密性の高い素材が含まれる可能性があります。[Data Access Control][1] を使用すると、プロジェクトを制限して、指定したチームまたはロールのみがプロジェクトを表示できるようにすることができます。

プロジェクトが制限されている場合、アクセス権を付与されたチームまたはロール以外のユーザーは、次の操作を行えません。

- リストビューや検索結果で、プロジェクト、またはその実験、データセット、アノテーションキューを表示する
- プロジェクトのデータセットレコード (入力と期待される出力を含む) を読み取る
- プロジェクトの実験の実行によって生成された評価メトリクスを読み取る
- それらの実行によって生成されたスパンを読み取る (SDK 経由で実行された実験を除く) (「[制限](#limitations)」を参照)
- プロジェクトのアノテーションキューを読み取る (レビュー中のトレースや、それらに適用されたラベルを含む)
- プロジェクト内の項目を作成、変更、または削除する (以前に入手した ID を使用する場合でも)

これらのチームまたはロール以外のユーザーが、プロジェクトまたはその内部の項目への直接リンクを開くと、*not found* 応答が返されます。

制限は Datadog UI および API に適用されます。アプリケーションキーには、その所有者であるユーザーと同じ制限が適用されます。

## 前提条件 {#prerequisites}

- Data Access Control が組織に対して構成されていること。「[Data Access Control][1]」を参照してください。
- Datadog Admin ロール、または [`user_access_manage` 権限][2] を持つ別のロールが付与されていること。
- 制限するプロジェクトが、すでに Agent Observability に存在していること。

## UI でプロジェクトを制限する {#restrict-a-project-in-the-ui}

<div class="alert alert-info">Datadog は、再設計されたアクセス制御ページを順次提供しています。組織は、<strong>Data Access Controls</strong> ページ、または再設計された <strong>Access Control</strong> ページのいずれかを利用できます。ステップ 1 のリンクから、利用可能なページに移動できます。どちらのページでも同じ制限を設定できます。</div>

1. [Organization Settings (組織の設定) > Data Access Controls][3] に移動します。
2. データのサブセットを対象とする制限を作成します。
   - Data Access Controls ページで、[**New Restricted Dataset**] (新しい制限付きデータセット) をクリックします。
   - Access Control ページで、**[New Policy] (新しいポリシー) > [Sensitive Data Partition] (機密データパーティション)** をクリックします。
3. 保護するプロジェクトを識別できる名前を付けます (例: `Experiments - Fraud Detection`)。
4. **Agent Observability** 製品にフィルターを追加して、プロジェクトを指定します。
   - Access Control ページで、値のリストからプロジェクトを選択します。リストには、自分のプロジェクトと、Agent Observability にトレースを送信するアプリケーションという 2 つのグループがあります。プロジェクトグループから選択します。
       
       <div class="alert alert-warning"><ul><li>プロジェクト名を一部だけ入力した場合や誤字がある場合は、Experiments データと一致しません。プロジェクトは全員に表示されたままとなり、制限が機能しているように見えます。</li><li>別の Restricted Dataset の対象となっているプロジェクトは、リストに表示されません。1 つのプロジェクトは、一度に 1 つの Restricted Dataset にのみ属することができます。</li></ul></div>
   
   - Data Access Controls ページで、プロジェクト ID を `ml_app` 値として入力します。「[プロジェクト ID を見つける](#find-a-projects-id)」を参照してください。

5. プロジェクトへのアクセスを維持する必要があるチームまたはロールにアクセス権を付与します。1 つの Restricted Dataset には、最大 50 のチームまたはロールを割り当てることができます。
6. Restricted Dataset を保存します。

**注**: フィルターキーがロックされている場合があります。Agent Observability は、アプリケーションとプロジェクトの両方に 1 つのタグキー `ml_app` を使用し、Data Access Control はテレメトリタイプごとに 1 つのタグキーを許可します。組織にすでに Agent Observability の Restricted Dataset がある場合、新しいデータセットは同じキーを再利用します。

制限は保存されるとすぐに有効になります。プロジェクトとその実験、データセット、データセットレコード、およびアノテーションキューは、作成時期に関係なく、即座に非表示になります。スパンと評価メトリクスには、「[制限事項](#limitations)」にある例外が適用されます。

## API を使用してプロジェクトを制限する {#restrict-a-project-through-the-api}

Data Access Control の [Datasets API][5] を使用して制限を作成することもできます。`ml_obs` 製品フィルターは、プロジェクト ID をその `ml_app` 値として受け取ります。

```json
{
  "data": {
    "type": "dataset",
    "attributes": {
      "name": "Experiments - Fraud Detection",
      "product_filters": [
        {
          "product": "ml_obs",
          "filters": ["ml_app:3547f4ac-3af4-4733-9a70-8fe596e1e76d"]
        }
      ],
      "principals": ["team:f771276e-0847-4c24-a277-6744f8520bb4"]
    }
  }
}
```

## アノテーションキュー{#annotation-queues}

プロジェクトに属するアノテーションキューは、そのプロジェクトの制限を継承します。プロジェクトを制限すると、そのキュー、レビュー用に保持されているトレース、レビュアーが適用したラベル、および各キューのラベルスキーマが非表示になります。許可されたチームまたはロール以外のユーザーは、キューのアノテーション、編集、削除を行うことができず、アノテーション済みのインタラクションをデータセットや CSV にエクスポートすることもできません。

キュー独自の [アクセス設定][7] は別に設定されます。レビュアーおよび担当者に関する制限は、ユーザーがすでに表示できるキューに対して誰がアノテーションを付けられるかを制御します。Data Access Control は、誰がそのキューを表示できるかを制御します。

作成するすべてのアノテーションキューは、プロジェクトに属している必要があります。この要件が有効になる前に作成されたキューには、プロジェクトが設定されていない場合があります。「[制限事項](#limitations)」を参照してください。

## プロジェクト ID を見つける {#find-a-projects-id}

Data Access Controls ページおよび Datasets API では、プロジェクト名ではなく、`ml_app` 値をプロジェクト ID として使用します。Experiments のプロジェクトの URL から、またはプロジェクトを一覧表示する際に [Experiments API][4] によって返される `id` フィールドから、プロジェクト ID を取得します。

## アクセス権の付与と取り消し{#grant-and-revoke-access}

Restricted Dataset のチームまたはロールを編集して、アクセス権を付与します。チームまたはロールを削除すると、すぐに反映されます。Restricted Dataset を削除すると制限が完全に解除され、Agent Observability の読み取りアクセス権を持つ組織内のすべてのユーザーに対してプロジェクトが再び表示されるようになります。

管理者であっても、制限の対象外にはなりません。`user_access_manage` 権限により、Restricted Dataset の作成および編集が可能になりますが、制限付きプロジェクトへのアクセスはチームおよびロールのメンバーシップのみによって決まります。付与されたチームまたはロールに属していない管理者は、他のユーザーと同様に、プロジェクトが見つからないものとして表示されます。

## 制限事項 {#limitations}

- **SDK 経由で実行された実験のスパンは、プロジェクト上の Restricted Dataset によって制限されません。**これらのスパンは、プロジェクトではなく、実験を実行したアプリケーションに紐付けられます。プロジェクト上の Restricted Dataset により、プロジェクトとそのデータセット、データセットレコード、評価メトリクスは非表示になりますが、それらのスパンに含まれる入力と出力は非表示になりません。それらのスパンも制限するには、同じ Restricted Dataset にアプリケーションの `ml_app` 値に対する 2 つ目のフィルターを追加します。
- **取り込み時にプロジェクトでタグ付けされなかったスパンおよび評価メトリクスは制限されません。**プロジェクトは取り込み時にタグとしてこれらのイベントに付加され、過去のイベントが再タグ付けされることはありません。タグが付いているイベントは、制限が保存されるとすぐに非表示になります。リストビュー、メタデータ、およびデータセットレコードは、作成時期に関係なく非表示になります。
- **Managed Prompts は、**Data Access Control ではサポートされていません。サポートされているテレメトリの全リストについては、「Data Access Control[1]」を参照してください。
- **プロジェクトに属していないアノテーションキューは、Agent Observability の読み取りアクセス権を持つすべてのユーザーに表示され**、Restricted Dataset で非表示にすることはできません。キューをプロジェクトに移動するか、プロジェクト内に再作成して、制限の対象にしてください。
- **Restricted Dataset がないプロジェクトは、Agent Observability の読み取りアクセス権を持つすべてのユーザーに表示されます。**組織で Agent Observability の [厳格モード][6] が有効になっていない限り、Data Access Control はデフォルトでは許可方式で動作します。値がどのプロジェクトとも一致しない Restricted Dataset は、何も制限しません。すべての新しい制限を、付与されたチームやロール以外のユーザーで確認してください。
- **[厳格モード][6] では、Restricted Dataset にプロジェクト ID が指定されている場合にのみ、プロジェクトが表示されます。**アプリケーション名を `ml_app` の値として指定しても、Experiments ではアクセス権が付与されないため、他の Restricted Dataset のチームやロールを含め、すべてのユーザーにプロジェクトが非表示のままになります。「[プロジェクト ID を見つける](#find-a-projects-id)」を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/data_access/
[2]: /ja/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/data-access-controls/
[4]: /ja/llm_observability/improve/experiments/api/
[5]: /ja/api/latest/datasets/
[6]: /ja/account_management/rbac/data_access/#strict-mode
[7]: /ja/llm_observability/investigate/annotation_queues/#managing-queue-access