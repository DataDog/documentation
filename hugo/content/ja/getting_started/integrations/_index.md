---
description: Agent ベース、認証ベース、およびライブラリ統合を使用して、インフラストラクチャーのメトリクスとログを統合します。
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: ラーニングセンター
  text: Integrations の概要
- link: https://learn.datadoghq.com/courses/getting-started-integrations
  tag: ラーニングセンター
  text: Integrations の利用を開始する
- link: /integrations/
  tag: ドキュメント
  text: Datadog integrations のリストを見る
- link: https://www.datadoghq.com/blog/1k-integrations-milestone/
  tag: ブログ
  text: 'Datadog のオブザーバビリティを拡張する: 1,000 以上のインテグレーションとカウント'
title: Integrations の概要
---
## 概要 {#overview}

これはインテグレーションを使用するためのガイドです。新しいインテグレーションの構築に関する情報をお探しの場合は、[新しいインテグレーションを作成する][1]というページをご覧ください。

インテグレーションとは、最も高いレベルで言えば、通常は別々に考えられるユニットからインテグレーションシステムを組み立てることです。Datadog では、インテグレーションを使用してインフラストラクチャーのすべてのメトリクスとログをまとめ、インテグレーションシステム全体を把握できます。個々の要素を確認できるだけでなく、個々の要素が全体にどのような影響を与えているかも確認できます。

**注**: プロジェクトのメトリクスの収集は、開発プロセスの早い段階で開始するのが最適ですが、どの段階からでも開始できます。

Datadog は、主に 3 種類のインテグレーションを提供しています。

- **エージェントベース**のインテグレーションは、Datadog Agent と共にインストールされ、`check` と呼ばれる Python クラスメソッドを使用して収集するメトリクスを定義します。
- **認証 (クローラー) ベース**のインテグレーションは、[Datadog][2] で設定され、API を使用してメトリクスを取得するための認証情報を提供します。これには、[Slack][3]、[AWS][4]、[Azure][5]、[PagerDuty][6] などの一般的なインテグレーションが含まれます。
- **ライブラリ**インテグレーションは、[Datadog API][7] を使用して、[Node.js][8] または [Python][9] など、アプリケーションが記述されている言語に基づいてアプリケーションを監視できるようにします。

[カスタムチェック][10]を構築して、独自の社内システムから Datadog にメトリクスを定義して送信することもできます。

## インテグレーションのセットアップ {#setting-up-an-integration}

Datadog Agent パッケージには、[インテグレーションコア][11]で Datadog が公式にサポートするインテグレーションが含まれます。これらのインテグレーションを使用するには、Datadog Agent をダウンロードしてください。コミュニティベースのインテグレーションは、[インテグレーションエクストラ][12]に含まれます。これらのインテグレーションのインストールや管理の詳細については、[インテグレーション管理ガイド][14]を参照してください。

### 権限 {#permissions}

インテグレーション管理権限が必要です。インテグレーションタイルを操作するには、インテグレーション管理権限が必要です。詳細については、[RBAC ロール][45]を参照してください。

### API キーとアプリケーションキー {#api-and-application-keys}

[Datadog Agent をインストール][15]するには、[API キー][16]が必要です。Agent がすでにダウンロードされている場合は、`datadog.yaml` ファイルに API キーが設定されていることを確認してください。メトリクスやイベントの送信以外の Datadog の追加機能のほとんどを使用するには、[アプリケーションキー][16]が必要です。アカウントの API キーとアプリケーションキーは、[API 設定ページ][17]で管理できます。

### インストール {#installation}

クローラーまたはライブラリベースのインテグレーションに接続する場合は、[Integrations ページ][18]で該当するプロバイダーに移動し、接続方法に関する具体的な手順を確認してください。その他のサポートされているインテグレーションについては、[Datadog Agent][15] をインストールしてください。ほとんどのインテグレーションは、コンテナ化された Agent である [Docker][19] および [Kubernetes][20] でサポートされています。Agent をダウンロードした後、[Integrations ページ][18]にアクセスして、個々のインテグレーションの具体的な構成手順を確認してください。

### Agent Integrations の構成 {#configuring-agent-integrations}

<div class="alert alert-info">中央の UI と API から <a href="/agent/fleet_automation/configure_integrations/">Fleet Automation</a> 使用して、各ホスト上のファイルを編集する代わりにフリート全体の Agent integrations を <code>conf.yaml</code> リモートで設定できます。自動検出されたサービスを検出し、タグやホストフィルターによって構成のスコープを任意のホストサブセットに設定し、1 つのアクションですべての一致する Agent にデプロイします。これには、Linux または Windows VM 上で Remote Configuration と Agent バージョン 7.76 以降が必要です。</div>

ほとんどの構成パラメータは、[個々のインテグレーション][18]に固有のものです。Agent integrations を構成するには、Agent の構成ディレクトリのルートにある `conf.d` フォルダーに移動します。各インテグレーションには `<INTEGRATION_NAME>.d` という名前のフォルダーがあり、その中に `conf.yaml.example` ファイルが含まれます。このサンプルファイルには、特定のインテグレーションで使用可能なすべての構成オプションが記載されています。

特定のインテグレーションを有効にするには、以下の手順に従います。

1. `conf.yaml.example`ファイル (対応する `<INTEGRATION_NAME>.d` フォルダー内) の名前を `conf.yaml` に変更します。
2. 新しく作成した構成ファイル内の必要なパラメータを、環境に対応する値に更新します。
3. [Datadog Agent を再起動][21]します。

**注**: すべての構成ファイルは、[@param specification][22] で文書化された形式に従います。

たとえば、[アパッチインテグレーション][23]からメトリクスとログを収集するために必要な最小限の `conf.yaml` 構成ファイルは以下のとおりです。

```yaml
init_config:
  service: apache

instances:
    - apache_status_url: http://localhost/server-status?auto

logs:
    - type: file
      path: /var/log/apache2/access.log
      source: apache
      sourcecategory: http_web_access
    - type: file
      path: /var/log/apache2/error.log
      source: apache
      sourcecategory: http_web_access
```

同じ Agent チェックで複数の Apache インスタンスを監視するには、`instances` セクションにインスタンスを追加します。

```yaml
init_config:

instances:
    - apache_status_url: "http://localhost/server-status?auto"
      service: local-apache

    - apache_status_url: "http://<REMOTE_APACHE_ENDPOINT>/server-status?auto"
      service: remote-apache
```

#### 収集間隔 {#collection-interval}

すべての Datadog 標準インテグレーションのデフォルトの収集間隔は 15 秒です。収集間隔を変更するには、パラメータ `min_collection_interval` を使用します。詳細については、[収集間隔の更新][24]を参照してください。

### タグ付け {#tagging}

タグ付けは、多くのソースから Datadog に送られてくるデータをフィルタリングおよび集計するための重要な要素です。タグ付けの詳細については、[タグの利用を開始する][25]を参照してください。

`datadog.yaml` ファイルでタグを定義すると、そのタグがすべてのインテグレーションデータに適用されます。`datadog.yaml` でタグを定義すると、すべての新しいインテグレーションにそのタグが継承されます。

たとえば、構成ファイルで `service` を設定することは、個別の独立したシステムを監視するための推奨される [Agent セットアップ][26]です。

環境をより適切に統合するために、Agent で `env` タグを構成することも推奨されます。詳細については、[Unified Service Tagging][27] を参照してください。

#### チェックごとのタグ構成 {#per-check-tag-configuration}
個々のチェックに対してタグの動作をカスタマイズし、グローバルな Agent レベルの設定を上書きできます。

1. **Autodiscovery タグを無効にする**

    デフォルトでは、インテグレーションによって報告されるメトリクスには、環境から自動的に検出されたタグが含まれます。たとえば、コンテナ内で実行される Redis チェックによって報告されるメトリクスには、`image_name` のようなコンテナに関連付けられたタグが含まれます。`ignore_autodiscovery_tags` パラメータを `true` に設定することで、この動作を無効にできます。

1. **インテグレーションチェックごとにタグのカーディナリティを設定する**

    `check_tag_cardinality` パラメータを使用して、チェックごとにタグのカーディナリティレベル (low、orchestrator、または high) を定義できます。これは、Agent 設定で定義されたグローバルなタグカーディナリティ設定を上書きします。

```yaml
init_config:
# Ignores tags coming from autodiscovery
ignore_autodiscovery_tags: true

# Override global tag cardinality setting
check_tag_cardinality: low

# Rest of the config here
```

コンテナ化された環境では、[Kubernetes Autodiscovery annotations][47] を通じてこれらのパラメータを設定することもできます。

### 検証 {#validation}

Agent とインテグレーションの構成を検証するには、[Agent の `status` サブコマンドを実行][28]し、Checks セクションの下に新しい構成があるか確認してください。

## 複数のインテグレーションのインストール {#installing-multiple-integrations}

複数のインテグレーションをインストールするには、対応する `<INTEGRATIONS>.d` フォルダー内の新しい `conf.yaml` ファイルに構成情報を追加します。`conf.yaml.example` ファイルから新しいインテグレーションに必要なパラメータを検索し、新しい `conf.yaml` ファイルに追加してから、同じ手順に従って構成を検証してください。

## 自動検出されたインテグレーション {#autodetected-integrations}

[プロセス収集][29]を設定すると、Datadog はホスト上で実行されているテクノロジーを自動検出します。これにより、これらのテクノロジーの監視に役立つ Datadog integrations が特定されます。これらの自動検出されたインテグレーションは、[Integrations 検索][2]に表示されます。

{{< img src="getting_started/integrations/ad_integrations_1.png" alt="自動検出されたインテグレーション" >}}

各インテグレーションには、4 つのステータスタイプのいずれかが割り当てられます。

- {{< ui >}}Detected{{< /ui >}}: テクノロジーはホスト上で実行されていますが、インテグレーションがインストールまたは構成されておらず、一部のメトリクスのみが収集されています。完全なカバレッジを得るには、インテグレーションを構成してください。自動検出されたテクノロジーを実行しているホストのリストを確認するには、インテグレーションタイルを開き、{{< ui >}}Hosts{{< /ui >}} タブを選択してください。
- {{< ui >}}Installed{{< /ui >}}: このインテグレーションはホストにインストールおよび構成されています。
- {{< ui >}}Available{{< /ui >}}: {{< ui >}}Installed{{< /ui >}} および {{< ui >}}Detected{{< /ui >}} カテゴリに該当しないすべてのインテグレーション。
- {{< ui >}}Missing Data{{< /ui >}}: 過去 24 時間以内にインテグレーションメトリクスが検出されていません。

## Security プラクティス {#security-practices}

Datadog がデータをどのように取り扱うか、およびその他のセキュリティ上の考慮事項については、[Security documentation][30] を参照してください。

## きめ細かなアクセス制御 {#granular-access-control}
デフォルトでは、インテグレーションリソース (アカウント、サービス、Webhook) へのアクセスは制限されていません。きめ細かなアクセス制御を使用すると、インテグレーションリソースレベルで、ユーザー、チーム、ロール、または組織全体の動作を制限できます。

**注**: 制限付きアクセスオプションは、そのインテグレーションがきめ細かなアクセス制御をサポートしている場合にのみ表示されます。インテグレーションできめ細かなアクセス制御がサポートされているかどうかを確認するには、その [インテグレーションのドキュメント][46]を確認してください。
{{< img src="getting_started/integrations/GRACE integration-account-modal.png" alt="きめ細かなアクセス制御" style="width:70%;" >}}

1. インテグレーションを表示している状態で、{{< ui >}}Configure{{< /ui >}} タブに移動し、きめ細かなアクセス制御を適用するリソース (アカウント、サービス、Webhook) を見つけます。
2. [{{< ui >}}Set Permissions{{< /ui >}}] をクリックします。
3. デフォルトでは、組織内の全員が完全なアクセス権を持っています。[{{< ui >}}Restrict Access{{< /ui >}}] をクリックします。
4. ダイアログボックスが更新され、組織のメンバーがデフォルトで {{< ui >}}Viewer{{< /ui >}} アクセス権を持っていることが表示されます。
5. ドロップダウンを使用して、モニターを編集できるチーム、ロール、またはユーザーを 1 つ以上選択します。
    **注**: 個々のリソースを編集するには、[インテグレーション管理][45]権限も必要です。 
6. [{{< ui >}}Add{{< /ui >}}] をクリックします。
7. ダイアログボックスが更新され、更新された権限が表示されます。
8. [{{< ui >}}Save{{< /ui >}}] をクリックします。インテグレーションページが自動的に更新され、権限が反映されます。

**注:** リソースへの編集アクセス権を維持するには、保存する前に、自身が所属するロールまたはチームを少なくとも 1 つ含める必要があります。

アクセスが制限されているインテグレーションリソースへの一般アクセスを復元するには、以下の手順に従います。

1. インテグレーションを表示している状態で、{{< ui >}}Configure{{< /ui >}} タブに移動し、一般アクセスを復元するリソース (アカウント、サービス、Webhook) を見つけます。
2. [{{< ui >}}Set Permissions{{< /ui >}}] をクリックします。
3. [{{< ui >}}Restore Full Access{{< /ui >}}] をクリックします。
4. [{{< ui >}}Save{{< /ui >}}] をクリックします。インテグレーションページが自動的に更新され、権限が反映されます。

## 次はどうしますか?{#whats-next}

最初のインテグレーションがセットアップされたら、アプリケーションから Datadog に送信されている[すべてのメトリクスをチェック][31]し、これらのメトリクスを使用して、データの監視を開始するための[ダッシュボード][32]と[アラート][33]のセットアップを行ってください。

Datadog の [ログ管理][34]、[APM][35]、および [Synthetic Monitoring][36] ソリューションも確認してください。

## トラブルシューティング {#troubleshooting}

インテグレーションのトラブルシューティングの最初のステップは、コードエディターのプラグインを使用するか、多数のオンラインツールのいずれかを使用して、YAML が有効であることを確認することです。次のステップは、[Agent トラブルシューティング][37]のすべての手順を実行することです。

それでも問題が解決しない場合は、[Datadog サポート][38]にお問い合わせください。

## 主要な用語 {#key-terms}

`conf.yaml`
: 作成した `conf.yaml` は、[Agent' の構成ディレクトリ][39]のルートにある `conf.d/<INTEGRATION_NAME>.d` フォルダーに保存します。このファイルを使用して、インテグレーションをシステムに接続し、その設定を構成します。

カスタムチェック
: 監視したい独自のシステムがある場合や、インテグレーションによってすでに送信されているメトリクスを拡張したい場合は、[カスタムチェック][10]を作成してメトリクスを定義し、Datadog に送信することができます。ただし、一般的に利用可能なアプリケーション、パブリックサービス、またはオープンソースプロジェクトを監視したい場合にインテグレーションが存在しないときは、カスタムチェックではなく[新しい構成を構築する][1]ことを検討してください。

`datadog.yaml`
: これは、Agent 全体が独自のインテグレーションやシステムとどのように連携するかを定義するメインの構成ファイルです。このファイルを使用して、API キー、プロキシ、ホストタグ、およびその他のグローバル設定を更新します。

イベント
: イベントは、システムに関する情報メッセージであり、[イベントエクスプローラー][40]によって取り込まれるため、それに基づいてモニターを構築できます。

インスタンス
: 監視対象のインスタンスは、`conf.yaml` ファイルで定義およびマッピングします。たとえば、[`http_check` インテグレーション][41]では、監視対象の HTTP エンドポイントのインスタンスに関連付けられた名前を定義し、稼働時間とダウンタイムを監視します。同じインテグレーション内で**複数のインスタンス**を監視することができ、その場合は `conf.yaml` ファイルですべてのインスタンスを定義します。

`<INTEGRATION_NAME>.d`
: 複雑な構成の場合は、複数の `YAML` ファイルに分割し、それらをすべて `<INTEGRATION_NAME>.d` フォルダーに保存して構成を定義することができます。Agent は、`<INTEGRATION_NAME>.d` フォルダー内の有効な `YAML` ファイルを読み込みます。

ロギング
: 監視対象のシステムにログがある場合は、[Log Management ソリューション][34]を使用して、Datadog に送信するログをカスタマイズしてください。

`metadata.csv`
: 各インテグレーションによって収集されたメトリクスをリストし、保存するファイルです。

メトリクス
: 各インテグレーションによってシステムから収集されるメトリクスのリスト。各インテグレーションのメトリクスは、そのインテグレーションの `metadata.csv` ファイル、およびインテグレーションのドキュメントページにある **Data Collected** テーブルで確認できます。そのテーブルで、*Shown as \<unit\>* と記載されているメトリクスには、インテグレーションのメタデータ内ですでに単位が定義されています。この表記がないメトリクスにはデフォルトで単位が設定されていないため、[メトリクスの概要][48]ページで手動で構成する必要があります。メトリクスの詳細については、[Metrics][42] 開発者ページをご覧ください。[カスタムメトリクス][43]を設定することもできるため、インテグレーションが標準でメトリクスを提供していない場合でも、通常は追加が可能です。

パラメータ
: `conf.yaml`ファイルのパラメータを使用して、インテグレーションのソースと Agent 間のアクセスを制御します。個々のインテグレーションの `conf.yaml.example` ファイルには、必須および任意のすべてのパラメータが記載されています。

サービスチェック
: サービスチェックは、サービスの稼働状況を追跡するために使用されるモニターの一種です。詳細については、[サービスチェックガイド][44]をご覧ください。

タグ付け
: [Tags][25] はメトリクスにカスタマイズを追加する方法であり、最も有用な方法でメトリクスをフィルタリングおよび視覚化できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/extend/integrations/agent_integration/
[2]: https://app.datadoghq.com/account/settings
[3]: /ja/integrations/slack/
[4]: /ja/integrations/amazon_web_services/
[5]: /ja/integrations/azure/
[6]: /ja/integrations/pagerduty/
[7]: /ja/api/
[8]: /ja/integrations/node/
[9]: /ja/integrations/python/
[10]: /ja/extend/custom_checks/write_agent_check/
[11]: https://github.com/DataDog/integrations-core
[12]: https://github.com/DataDog/integrations-extras
[14]: /ja/agent/guide/integration-management/
[15]: https://app.datadoghq.com/account/settings/agent/latest
[16]: /ja/account_management/api-app-keys/
[17]: https://app.datadoghq.com/organization-settings/api-keys
[18]: /ja/integrations/
[19]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[20]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[21]: /ja/agent/guide/agent-commands/#restart-the-agent
[22]: /ja/extend/integrations/check_references/#param-specification
[23]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[24]: /ja/extend/custom_checks/write_agent_check/#updating-the-collection-interval
[25]: /ja/getting_started/tagging/
[26]: /ja/getting_started/agent/#setup
[27]: /ja/getting_started/tagging/unified_service_tagging/
[28]: /ja/agent/guide/agent-commands/#agent-status-and-information
[29]: /ja/infrastructure/process/
[30]: /ja/data_security/
[31]: /ja/metrics/explorer/
[32]: /ja/dashboards/
[33]: /ja/monitors/
[34]: /ja/logs/
[35]: /ja/tracing/
[36]: /ja/synthetics/
[37]: /ja/agent/troubleshooting/
[38]: /ja/help/
[39]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[40]: https://app.datadoghq.com/event/explorer
[41]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[42]: /ja/metrics/
[43]: /ja/metrics/custom_metrics/
[44]: /ja/monitors/guide/visualize-your-service-check-in-the-datadog-ui/
[45]: /ja/account_management/rbac/permissions/#integrations
[46]: /ja/integrations/
[47]: /ja/containers/kubernetes/integrations/#tag-cardinality
[48]: https://app.datadoghq.com/metric/summary