---
aliases:
- /ja/agent/guide/datadog-disaster-recovery/
further_reading:
- link: agent/remote_config/?tab=configurationyamlfile
  tag: ドキュメント
  text: Remote Configuration
- link: /getting_started/site/
  tag: ドキュメント
  text: Datadog サイトの概要
- link: https://www.datadoghq.com/blog/ddr-mitigates-cloud-provider-outages/
  tag: ブログ
  text: Datadog Disaster Recovery でクラウドプロバイダーの障害の影響を軽減
site_support_id: datadog_disaster_recovery
title: Datadog Disaster Recovery
---
## 概要 {#overview}

Datadog Disaster Recovery (DDR) では、クラウドサービスプロバイダーのリージョンや、クラウドプロバイダーのリージョン内で実行されている Datadog サービスに影響する可能性があるイベントの発生時に、監視可能性を維持できます。DDR を使用すると、機能する代替 Datadog サイトでリアルタイムの監視可能性を復旧できるため、重要な監視可能性の可用性目標を達成できます。

DDR では、定期的に災害復旧訓練を実施して、障害イベントからの復旧能力をテストすることに加えて、ビジネスのニーズや規制コンプライアンスのニーズに対応することができます。

## 前提条件{#prerequisites}
必要な Datadog Agent の最小バージョンは、使用するテレメトリの種類によって異なります。

|サポートされているテレメトリ |対応製品          |必要な Agent バージョン | 
|--------------------|----------------------------|-----------------------|
|ログ                |Logs                        | v7.54+                |
|メトリクス             |Infrastructure Monitoring   | v7.54+                |
|トレース              |APM                         | v7.68+                |



<div class="alert alert-info">
Datadog は、他の製品で DDR に対応するため、お客様からのリクエストを引き続き評価しています。上記でカバーされていない特定のニーズや今後の機能については、<a href="mailto:disaster-recovery@datadoghq.com">Disaster Recovery チーム</a>にお問い合わせください。
</div>
<br>

## セットアップ {#setup}

Datadog Disaster Recovery を有効にするには、以下の手順に従います。手順についてご不明な点がありましたら、[カスタマーサクセスマネージャー][14] または [Datadog サポート][15] にお問い合わせください。

### 1. DDR オーガニゼーションを作成してライマリオーガニゼーションにリンクする {#1-create-a-ddr-org-and-link-it-to-your-primary-org}

{{% collapse-content title="DDR オーガニゼーションの作成と共有" level="h4" %}}

<div class="alert alert-info">必要に応じて Datadog が代わりにセットアップを行うことも可能です。</div>

#### DDR オーガニゼーションの作成 {#create-your-ddr-org}

1. [[Get Started with Datadog]][16] (Datadog を始める) に移動します。場合によっては、このページにアクセスするには、現在のセッションからログアウトするか、シークレットモードを使用する必要があります。
2. プライマリとは異なる Datadog サイトを選択します (例: `US1` を使用している場合は `EU` または `US5` を選択します)。
3. プロンプトに従ってアカウントを作成します。

すべての Datadog サイトは地理的に分離されています。オプションについては、[Datadog サイトのリスト][17] を参照してください。

クラウドプロバイダーインテグレーションを使用して Datadog にテレメトリを送信している場合には、DDR オーガニゼーションにクラウドプロバイダーアカウントを追加する必要があります。DDR サイトがパッシブである (フェイルオーバー状態ではない) 間、Datadog はテレメトリデータの受信にクラウドプロバイダーを使用しません。

#### Datadog との DDR オーガニゼーション情報の共有 {#share-the-ddr-org-information-with-datadog}

新しいオーガニゼーション名を [カスタマーサクセスマネージャー][14] にメールでご連絡ください。その後、カスタマーサクセスマネージャーがこの新しいオーガニゼーションを DDR オーガニゼーションとして設定します。

{{% /collapse-content %}}

{{% collapse-content title="パブリック ID を取得し、DDR オーガニゼーションとプライマリオーガニゼーションをリンクします" level="h4" %}}

セキュリティ上の理由から、Datadog がお客様に代わってオーガニゼーションをリンクすることはできません。

Datadog チームが DDR オーガニゼーションを設定した後で、Datadog の [パブリック API エンドポイント][1] を使用して、プライマリオーガニゼーションと DDR オーガニゼーションのパブリック ID を取得してください。

DDR オーガニゼーションをプライマリオーガニゼーションにリンクするには、次のようにします。

- プライマリオーガニゼーションのアプリケーションキーに `disaster_recovery_status_write` スコープを追加します。
- プレースホルダーを適切な値に置き換えて、以下のコマンドを実行します。

```shell
export PRIMARY_DD_API_KEY=<PRIMARY_ORG_API_KEY>
export PRIMARY_DD_APP_KEY=<PRIMARY_ORG_APP_KEY>
export PRIMARY_DD_API_URL=<PRIMARY_ORG_API_SITE>

export DDR_ORG_ID=<DDR_ORG_PUBLIC_ID>
export PRIMARY_ORG_ID=<PRIMARY_ORG_PUBLIC_ID>
export USER_EMAIL=<USER_EMAIL>
export CONNECTION='{"data":{"id":"'${PRIMARY_ORG_ID}'","type":"hamr_org_connections","attributes":{"TargetOrgUuid":"'${DDR_ORG_ID}'","HamrStatus":1,"ModifiedBy":"'${USER_EMAIL}'", "IsPrimary":true}}}'

curl -v -H "Content-Type: application/json" -H \
"dd-api-key:${PRIMARY_DD_API_KEY}" -H \
"dd-application-key:${PRIMARY_DD_APP_KEY}" --data "${CONNECTION}" --request POST ${PRIMARY_DD_API_URL}/api/v2/hamr
```

オーガニゼーションをリンクした後では、フェイルオーバーオーガニゼーションでのみこのバナーが表示されます。

{{< img src="agent/guide/ddr/ddr-banner.png" alt="DDR オーガニゼーションの DDR バナー" >}}

{{% /collapse-content %}}

### 2. アクセス、インテグレーション、同期、およびエージェントをセットアップする {#2-set-up-access-integrations-syncing-and-agents}

{{% collapse-content title="DDR オーガニゼーションの SSO の構成" level="h4" %}}

障害発生時にすべてのユーザーが DDR オーガニゼーションにログインできるようにするため、**Datadog はシングルサインオン (SSO) を使用することを推奨しています**。

DDR オーガニゼーションの [[Organization Settings] (オーガニゼーション設定])[2] に移動し、ユーザーの [SAML][3] または {{< ui >}}Google Login{{< /ui >}} を構成します。

マネージド同期により、プライマリオーガニゼーションから DDR オーガニゼーションにユーザーアカウントが複製されます。Datadog では [SAML を使用したジャストインタイムプロビジョニング][4] を構成することを推奨しています。これにより、ユーザーはフェイルオーバー中にパスワードをリセットすることなく DDR オーガニゼーションにアクセスできます。

{{% /collapse-content %}}

{{% collapse-content title="クラウドインテグレーション (AWS、Azure、Google Cloud) のセットアップ" level="h4" %}}

セットアップ手順については、[AWS][5]、[Azure][6]、および [Google Cloud][7] のインテグレーションを参照してください。

プライマリオーガニゼーションと DDR オーガニゼーションの両方でクラウドインテグレーションを構成する必要がありますが、クラウドインテグレーションは一度にいずれか 1 つの組織でのみ実行されます。デフォルトではプライマリオーガニゼーションで実行され、フェイルオーバー中は DDR オーガニゼーションで実行されます。

詳細については、[クラウドインテグレーションのフェイルオーバー](#id-for-cloud)のセクションを参照してください。

{{% /collapse-content %}}

{{% collapse-content title="マネージドリソース同期の認証情報のセットアップ" level="h4" id="syncing-data" %}}

Datadog はオープンソースの [datadog-sync-cli][8] ツールを使用して、お客様に代わってリソース同期を管理します。このツールをお客様自身で実行または運用する必要はありません。

マネージド同期により、定期的なスケジュールでプライマリオーガニゼーションから DDR オーガニゼーションにリソースが複製されます。複製されるリソースには、ダッシュボード、モニター、ユーザー、ノートブック、および [34 種類以上のその他のリソース][9] が含まれます。複製はこのスケジュールで実行されます。これにより、障害発生までに DDR オーガニゼーションが最新の状態に保たれます。

**ユーザーは各 Datadog サイトにスコープ設定されます。**マネージド同期により、ユーザーアカウントが DDR オーガニゼーションに複製されます。ただし、ユーザーが DDR オーガニゼーションに初めてログインするときに、パスワードのリセットが必要になる場合があります。Datadog では、[SAML を使用したジャストインタイムプロビジョニング][4] を構成することを推奨しています。これにより、手動でのパスワードリセットなしでユーザーが DDR オーガニゼーションにアクセスできるようになります。

**マネージド同期は、Datadog の [サービスアカウント][10] を使用します。**プライマリオーガニゼーションからリソースを読み取って複製するために、オンボーディング中に DDR オーガニゼーションでサービスアカウントを作成します。マネージド同期によって同期されたリソースは、可能な場合には元のオーナーにマッピングされたユーザーによってプロビジョニングされます。

{{% /collapse-content %}}

{{% collapse-content title="Remote Configuration の有効化 [**推奨]" level="h4" %}}

[Remote Configuration (RC)][11] では、インフラストラクチャーにデプロイされた Datadog Agent の構成とその動作の変更をリモートで行うことができます。

Remote Configuration は新しいオーガニゼーションに対してデフォルトで有効になっています。作成する新しい API キーに対し、Agent で使用するために Remote Configuration が有効になります。。詳細については、[Remote Configuration のドキュメント][11] を参照してください。

Datadog では、より優れたフェイルオーバー制御のために Remote Configuration を使用することを強く推奨しています。Remote Configuration の代替手段として、Datadog Agent を手動で構成するか、Puppet、Ansible、Chef などの構成管理ツールを使用できます。

{{% /collapse-content %}}

{{% collapse-content title="フェイルオーバーまたは訓練中の DDR オーガニゼーションへのテレメトリのデュアルシッピング" level="h4" %}}


デュアルシッピングを有効にするには、大規模な管理のために [Fleet Automation][12] を使用することが推奨されます。または、`datadog.yaml` ファイルを編集して手動で構成することもできます。

パフォーマンスと目標復旧時間 (RTO) を測定するフェイルオーバーテストのための専用時間枠をスケジュールするには、Datadog カスタマーサクセスマネージャーまでご連絡ください。

{{< tabs >}}
{{% tab "Fleet Automation の使用 (推奨)" %}}

フェイルオーバーオーガニゼーションの [[Fleet Automation]][100] ページにある [{{< ui >}}Configure Agents{{< /ui >}}] (エージェントの構成) タブで、フェイルオーバーポリシーを作成または既存のポリシーを再利用して、Agent のフリートに適用できます。ポリシーが有効になるとすぐに、Agent はプライマリと DDR (フェイルオーバー) の両方の監視可能性サイトへのテレメトリのデュアルシッピングを開始します。

フェイルオーバーポリシーを作成するには、[{{< ui >}}Create Failover Policy{{< /ui >}}] (フェイルオーバーポリシーを作成) をクリックします。

{{< img src="/agent/guide/ddr/ddr-fa-policy.png" alt="DDR ポリシーの管理" style="width:80%;" >}}

次に、プロンプトに従ってフェイルオーバーする必要があるホストとテレメトリ (メトリクス、ログ、トレース) のスコープを設定します。

{{< img src="/agent/guide/ddr/ddr-fa-policy-scope.png" alt="フェイルオーバーする必要があるホストとテレメトリのスコープ設定" style="width:80%;" >}}

<div class="alert alert-danger">Cloud Integrations は、プライマリ Datadog サイトまたは DDR Datadog サイトのいずれか 1 つでのみ実行できますが、両方で同時に実行することはできません。そのためフェイルオーバーすると、プライマリサイトで Cloud Integrations データが停止します。<strong>インテグレーションのフェイルオーバー中には、インテグレーションは DDR データセンターでのみ実行されます。</strong>フェイルオーバーでなくなった場合は、フェイルオーバーポリシーを無効にして、インテグレーションデータ収集をプライマリオーガニゼーションに戻します。</div>

[100]: https://app.datadoghq.com/fleet

{{% /tab %}}

{{% tab "手動" %}}

フェイルオーバー中またはフェイルオーバーの演習中には、以下の例に示すように Datadog Agent の `datadog.yaml` 構成ファイルを更新し、Agent を再起動します。

- `enabled: true`では、Agent が {{< tooltip text="metadata" tooltip="Agent とインフラストラクチャーホストに関するデータ。例: `host name`、`host tags`、`Agent version`。" >}} を DDR Datadog サイトに送信できるようになり、DDR オーガニゼーションで Agent とインフラストラクチャーホストを確認できます。これにより、フェイルオーバーオーガニゼーションで Agent とインフラストラクチャーホストを確認できるようになります。

- `failover_metrics`、`failover_logs`、および`failover_apm` はデフォルトで `false` です。これらを `true` に設定すると、Agent が DDR オーガニゼーションへの {{< tooltip text="telemetry" tooltip="Datadog プラットフォームに送信されるデータ。例:`logs`、`metrics`、`traces`。" >}} の送信を開始します。

```shell
multi_region_failover:
  enabled: true
  failover_metrics: false
  failover_logs: false
  failover_apm: false
  site: <DDR_SITE>  # For example "site: us5.datadoghq.com" for a US5 site
  api_key: <DDR_SITE_API_KEY>
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="DNS ベースのフェイルオーバーの構成" level="h4" %}}

DNS ベースのフェイルオーバーは、Agent ベースのフェイルオーバーを補完するアプローチです。Agent にセカンダリサイトのエンドポイントを構成する代わりに、すべてのデータソースが Datadog 提供の単一カスタムインテイク URL にテレメトリを送信するように構成します。フェイルオーバーイベントの発生中は、Datadog がその URL の DNS レコードを更新し、トラフィックをプライマリサイトから DDR サイトへリダイレクトします。

<div class="alert alert-info">DNS フェイルオーバーは、完全に実行されるか、または一切実行されないかのいずれかです。カスタムエンドポイントを使用しているすべてのテレメトリソースが同時に切り替わります。</div>

#### カスタム DNS エンドポイントの受信{#receive-your-custom-dns-endpoint}

DNS ベースのフェイルオーバーを使用することを選択した場合、Datadog はオーガニゼーションのカスタムインテイク URL (例: `<your-org>.intake.datadoghq.com`) をプロビジョニングします。すべてのデータソース (Agent、ログシッパー、カスタムインスツルメンテーション) が、デフォルトの Datadog インテイク URL ではなくこのエンドポイントにテレメトリを送信するように構成します。これは一度限りの構成変更です。

#### DNS フェイルオーバーのトリガー {#trigger-a-dns-failover}

DNS フェイルオーバーを開始するには、[カスタマーサクセスマネージャー][14] または [Datadog サポート][15] を通じて Datadog にご連絡ください。Datadog はトラフィックをプライマリサイトから DDR サイトにリダイレクトするため、DNS レコードを更新します。フェイルオーバー開始時点からの目標復旧時間 (RTO) は 2 時間です。

<div class="alert alert-info">お客様が制御できる DDR オーガニゼーションから直接 DNS フェイルオーバーをトリガーする手法は、プレビュー版です。詳細については、<a href="mailto:success@datadoghq.com">カスタマーサクセスマネージャー</a>にお問い合わせください。</div>

{{% /collapse-content %}}

### 3. さまざまな環境でフェイルオーバーテストを実行する {#3-run-failover-tests-in-various-environments}

{{% collapse-content title="Agent ベースの環境での DDR フェイルオーバーの有効化とテスト" level="h4" %}}

Agent のフェイルオーバーをトリガーするには、DDR オーガニゼーションの [Fleet Automation][13] にあるポリシーの 1 つをクリックし、[{{< ui >}}Enable{{< /ui >}}] (有効化) をクリックします。フェイルオーバーが発生すると、各ホストのステータスが更新されます。

{{< img src="/agent/guide/ddr/ddr-fa-policy-enable3.png" alt="DDR オーガニゼーションでのフェイルオーバーポリシーの有効化" style="width:80%;" >}}

ご使用の環境に該当する手順を使用して、DDR フェイルオーバーを有効にしてテストします。

{{< tabs >}}
{{% tab "非コンテナ化環境の Agent" %}}

非コンテナ化環境へ Agent をデプロイするには、以下の Agent CLI コマンドを使用してください。

```shell
agent config set multi_region_failover.failover_metrics true
agent config set multi_region_failover.failover_logs true
agent config set multi_region_failover.failover_apm true
```

{{% /tab %}}

{{% tab "コンテナ化環境の Agent" %}}

Kubernetes のようなコンテナ化環境で Agent を実行している場合でも Agent コマンドラインツールを使用できますが、Agent を実行しているコンテナで呼び出す必要があります。必要に応じて、以下のいずれかを使用して変更を行うことができます。

- [kubectl](#using-kubectl)
- [Agent 構成ファイル (`datadog.yaml`)](#using-the-agent-configuration-file)
- [Helm チャートまたは Datadog Operator](#using-the-helm-chart-or-datadog-operator)

##### kubectl の使用 {#using-kubectl}

`kubectl` を使用して、公式 Helm チャートまたは Datadog Operator のいずれかでデプロイされた Datadog Agent Pod のメトリクスとログをフェイルオーバーする例を以下に示します。`<POD_NAME>` は、Agent Pod の名前に置き換える必要があります。

```shell
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_metrics true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_logs true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_apm true
```

##### Agent 構成ファイル {#using-the-agent-configuration-file} の使用

あるいは、メインの Agent 構成ファイル (`datadog.yaml`) で以下の設定を指定し、Datadog Agent を再起動して変更を適用することもできます。

```shell
multi_region_failover:
  enabled: true
  failover_metrics: true
  failover_logs: true
  failover_apm: true
  site: NEW_ORG_SITE
  api_key: NEW_SITE_API_KEY
```

##### Helm チャートまたは Datadog Operator の使用 {#using-the-helm-chart-or-datadog-operator}

カスタム構成を指定する必要がある場合は、公式 Helm チャートまたは Datadog Operator のいずれかで同様の変更を行うことができます。それ以外の場合は、設定を環境変数として渡すことができます。

```shell
DD_MULTI_REGION_FAILOVER_ENABLED=true
DD_MULTI_REGION_FAILOVER_FAILOVER_METRICS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_LOGS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_APM=true
DD_MULTI_REGION_FAILOVER_SITE=ADD_NEW_ORG_SITE
DD_MULTI_REGION_FAILOVER_API_KEY=ADD_NEW_SITE_API_KEY
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="クラウドインテグレーションでの DDR フェイルオーバーの有効化とテスト" level="h4" id="id-for-cloud" %}}

DDR オーガニゼーションのランディングページから、クラウドインテグレーションのフェイルオーバーをテストできます。

{{< img src="/agent/guide/ddr/ddr-failover-main-page.png" alt="DDR オーガニゼーションでのフェイルオーバーポリシーの有効化" style="width:80%;" >}}

フェイルオーバーのランディングページで、DDR オーガニゼーションのステータスを確認するか、[{{< ui >}}Fail over your integrations{{< /ui >}}] (インテグレーションをフェイルオーバー) をクリックしてクラウドインテグレーションのフェイルオーバーをテストします。

フェイルオーバーでなくなった場合は、DDR オーガニゼーションで**フェイルオーバーポリシーを無効にして**、インテグレーションデータ収集をプライマリオーガニゼーションに戻します。

テスト中、インテグレーションテレメトリは両方のオーガニゼーションに分散されますフェイルオーバーテストをキャンセルすると、インテグレーションは再びプライマリデータセンターで実行されます。

{{% /collapse-content %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/organizations/#list-your-managed-organizations
[2]: https://app.datadoghq.com/organization-settings/users
[3]: /ja/account_management/saml/#overview
[4]: /ja/account_management/saml/#just-in-time-jit-provisioning
[5]: /ja/integrations/amazon-web-services/
[6]: /ja/integrations/azure/
[7]: /ja/integrations/google-cloud-platform/?tab=organdfolderlevelprojectdiscovery#overview
[8]: https://github.com/DataDog/datadog-sync-cli
[9]: https://github.com/DataDog/datadog-sync-cli#supported-resources
[10]: /ja/account_management/org_settings/service_accounts/
[11]: /ja/agent/remote_config/?tab=configurationyamlfile
[12]: /ja/agent/fleet_automation/#overview
[13]: https://app.datadoghq.com/fleet
[14]: mailto:success@datadoghq.com
[15]: https://www.datadoghq.com/support/
[16]: https://app.datadoghq.com/signup
[17]: /ja/getting_started/site#access-the-datadog-site