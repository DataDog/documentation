---
description: Agent ベース、認証ベース、およびライブラリのインテグレーションを使用して、インフラストラクチャーのメトリクスとログを統合します。
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: ラーニングセンター
  text: Integrations の概要
- link: https://learn.datadoghq.com/courses/getting-started-integrations
  tag: ラーニングセンター
  text: Integrations の使用を開始する
- link: /integrations/
  tag: ドキュメント
  text: Datadog のインテグレーションの一覧を見る
- link: https://www.datadoghq.com/blog/1k-integrations-milestone/
  tag: ブログ
  text: 'Datadog のオブザーバビリティの拡張: 1,000 件を超えるインテグレーション'
title: Integrations の概要
---
## 概要 {#overview}

これはインテグレーションの使用方法を説明するガイドです。新しいインテグレーションの構築に関する情報をお探しの場合は、[新しいインテグレーションを作成する][1]ページを参照してください。

インテグレーションとは、最も広い意味では、通常は別々に扱われる要素を組み合わせて統合システムを構築することです。Datadog では、インテグレーションを使用してインフラストラクチャーのすべてのメトリクスとログをまとめ、統合システム全体を把握しながら、個々の要素と、それぞれが全体に与える影響も確認できます。

**注**: プロジェクトのメトリクス収集は、開発プロセスの可能な限り早い段階で開始するのが最適ですが、どのステージからでも開始できます。

Datadog は、主に 3 種類のインテグレーションを提供しています。

- **Agent ベース**のインテグレーションは、Datadog Agent と共にインストールされ、`check` と呼ばれる Python のクラスメソッドを使用して収集するメトリクスを定義します。
- **認証 (クローラー) ベース**のインテグレーションは、API を使用してメトリクスを取得するための資格情報を指定し、[Datadog][2] で設定します。これには、[Slack][3]、[AWS][4]、[Azure][5]、[PagerDuty][6] などの一般的なインテグレーションが含まれます。
- **ライブラリ**のインテグレーションでは、[Datadog API][7] を使用して、[Node.js][8] や [Python][9] など、記述された言語に基づいてアプリケーションを監視できます。

また、[カスタムチェック][10]を作成して、独自の社内システムのメトリクスを定義し、Datadog に送信することもできます。

## インテグレーションの設定{#setting-up-an-integration}

Datadog Agent パッケージには、[integrations core][11] に含まれる、Datadog が公式にサポートするインテグレーションが含まれます。これらのインテグレーションを使用するには、Datadog Agent をダウンロードします。コミュニティベースのインテグレーションは、[integrations extras][12] に含まれています。これらのインテグレーションのインストールや管理の詳細については、[Integrations 管理ガイド][14]を参照してください。

### 権限 {#permissions}

インテグレーションタイルを操作するには、Integrations Manage 権限が必要です。詳細については、[RBAC ロール][45]を参照してください。

### API キーとアプリケーションキー {#api-and-application-keys}

[Datadog Agent をインストール][15]するには、[API キー][16]が必要です。Agent をすでにダウンロードしている場合は、`datadog.yaml` ファイルに API キーが設定されていることを確認します。メトリクスやイベントの送信以外のほとんどの Datadog 機能を使用するには、[アプリケーションキー][16]が必要です。アカウントの API キーとアプリケーションキーは、[API 設定ページ][17]で管理できます。

### インストール {#installation}

クローラーまたはライブラリベースのインテグレーションに接続する場合は、[Integrations ページ][18]でそのプロバイダーに移動し、接続方法に関する具体的な手順を確認してください。その他のサポートされているインテグレーションについては、[Datadog Agent][15] をインストールします。ほとんどのインテグレーションは、コンテナ化された Agent である [Docker][19] および [Kubernetes][20] に対応しています。Agent をダウンロードした後、[Integrations ページ][18]に移動して、個々のインテグレーションの具体的な構成手順を確認します。

### Agent インテグレーションの構成 {#configuring-agent-integrations}

<div class="alert alert-info"><a href="/agent/fleet_automation/configure_integrations/">Fleet Automation</a> を使用すると、個々のホスト上のファイルを編集する代わりに、中央の UI と API からフリート全体の Agent インテグレーションを <code>conf.yaml</code> リモートで構成できます。自動検出されたサービスを検出し、タグまたはホストフィルターによって任意のホストサブセットに構成をスコープし、一致するすべての Agent に 1 回の操作でデプロイします。これには、Remote Configuration と、Linux または Windows VM 上の Agent バージョン 7.76 以降が必要です。</div>

ほとんどの構成パラメーターは、[個々のインテグレーション][18]に固有のものです。Agent の構成ディレクトリのルートにある `conf.d` フォルダーに移動して、Agent インテグレーションを構成します。各インテグレーションには `<INTEGRATION_NAME>.d` という名前のフォルダーがあり、その中に `conf.yaml.example` ファイルが含まれています。このサンプルファイルには、特定のインテグレーションで使用可能なすべての構成オプションが記載されています。

特定のインテグレーションを有効にするには、

1. 対応する `<INTEGRATION_NAME>.d` フォルダー内の `conf.yaml.example` ファイルの名前を `conf.yaml` に変更します。
2. 新しく作成した構成ファイル内の必須パラメーターを、環境に応じた値に更新します。
3. [Datadog Agent を再起動][21]します。

**注**: すべての構成ファイルは、[@param specification][22] に記載されている形式に従います。

たとえば、これは [apache インテグレーション][23]からメトリクスとログを収集するために必要な最小限の `conf.yaml` 構成ファイルです。

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

同じ Agent チェックで複数の Apache インスタンスを監視するには、`instances` セクションに追加のインスタンスを追加します。

```yaml
init_config:

instances:
    - apache_status_url: "http://localhost/server-status?auto"
      service: local-apache

    - apache_status_url: "http://<REMOTE_APACHE_ENDPOINT>/server-status?auto"
      service: remote-apache
```

#### 収集間隔 {#collection-interval}

すべての Datadog 標準インテグレーションのデフォルトの収集間隔は 15 秒です。収集間隔を変更するには、パラメーター `min_collection_interval` を使用します。詳細については、[収集間隔の更新][24]を参照してください。

### タグ付け {#tagging}

タグ付けは、多くのソースから Datadog に送られてくるデータをフィルタリングおよび集計するための重要な要素です。タグ付けの詳細については、[タグの概要][25] を参照してください。

`datadog.yaml` ファイルでタグを定義すると、そのタグがすべてのインテグレーションデータに適用されます。`datadog.yaml` でタグを定義すると、すべての新しいインテグレーションにそのタグが継承されます。

たとえば、個別の独立したシステムを監視するには、構成ファイルで `service` を設定することが、推奨される [Agent セットアップ][26]です。

環境をより適切に統合するために、Agent で `env` タグを構成することも推奨されます。詳細については、[Unified Service Tagging][27] を参照してください。

#### チェックごとのタグ構成 {#per-check-tag-configuration}
個々のチェックに対してタグの動作をカスタマイズし、グローバルな Agent レベルの設定を上書きできます。

1. **Autodiscovery タグを無効にする**

    デフォルトでは、インテグレーションによって報告されるメトリクスには、環境から自動的に検出されたタグが含まれます。たとえば、コンテナ内で実行される Redis チェックによって報告されるメトリクスには、`image_name` などのコンテナに関連付けられたタグが含まれます。`ignore_autodiscovery_tags` パラメーターを `true` に設定することで、この動作をオフにします。

1. **インテグレーションチェックごとにタグカーディナリティを設定する**

    `check_tag_cardinality` パラメーターを使用して、チェックごとにタグカーディナリティのレベル (low、orchestrator、または high) を定義できます。これにより、Agent の構成で定義されたグローバルなタグカーディナリティ設定が上書きされます。

```yaml
init_config:
# Ignores tags coming from autodiscovery
ignore_autodiscovery_tags: true

# Override global tag cardinality setting
check_tag_cardinality: low

# Rest of the config here
```

コンテナ化された環境では、[Kubernetes Autodiscovery アノテーション][47]を通じてこれらのパラメーターを設定することもできます。

### 検証 {#validation}

Agent とインテグレーションの構成を検証するには、[Agent の `status` サブコマンドを実行][28]し、Checks セクションで新しい構成を確認します。

## 複数のインテグレーションのインストール {#installing-multiple-integrations}

複数のインテグレーションをインストールするには、対応する `<INTEGRATIONS>.d` フォルダー内の新しい `conf.yaml` ファイルに構成情報を追加します。`conf.yaml.example` ファイルで新しいインテグレーションに必要なパラメーターを調べ、新しい `conf.yaml` ファイルに追加してから、同じ手順に従って構成を検証します。

## 自動検出インテグレーション {#autodetected-integrations}

[プロセス収集][29]を設定すると、Datadog はホスト上で実行されているテクノロジーを自動検出します。これにより、こうしたテクノロジーのモニターに役立つ Datadog インテグレーションが識別されます。これらの自動検出されたインテグレーションは、[Integrations 検索][2]に表示されます。

{{< img src="getting_started/integrations/ad_integrations_1.png" alt="自動検出インテグレーション" >}}

各インテグレーションには、次の 4 つのステータスタイプのいずれかがあります。

- {{< ui >}}Detected{{< /ui >}}: テクノロジーはホスト上で実行されていますが、インテグレーションがインストールまたは構成されておらず、一部のメトリクスのみが収集されます。完全なカバレッジを実現するためにインテグレーションを構成します。自動検出されたテクノロジーを実行しているホストのリストを見つけるには、インテグレーションタイルを開き、{{< ui >}}Hosts{{< /ui >}} タブを選択します。
- {{< ui >}}Installed{{< /ui >}} : このインテグレーションはホスト上にインストールおよび構成されています。
- {{< ui >}}Available{{< /ui >}} : {{< ui >}}Installed{{< /ui >}} および {{< ui >}}Detected{{< /ui >}} のカテゴリに分類されないすべてのインテグレーション。
- {{< ui >}}Missing Data{{< /ui >}} : 過去 24 時間、インテグレーションのメトリクスが検出されていません。

## セキュリティプラクティス {#security-practices}

Datadog がデータをどのように処理するか、およびその他のセキュリティに関する考慮事項については、[セキュリティドキュメント][30]を参照してください。

## きめ細かなアクセス制御 {#granular-access-control}
デフォルトでは、インテグレーションリソース (アカウント、サービス、Webhook) へのアクセスは制限されていません。きめ細かなアクセス制御を使用して、インテグレーションリソースレベルでユーザー、チーム、ロール、または組織全体の動作を制限できます。

**注** : 制限付きアクセスオプションは、そのインテグレーションがきめ細かなアクセス制御をサポートしている場合にのみ表示されます。インテグレーションがきめ細かなアクセス制御をサポートしているかどうかを確認するには、その[インテグレーションのドキュメント][46]を確認します。
{{< img src="getting_started/integrations/GRACE integration-account-modal.png" alt="きめ細かなアクセス制御" style="width:70%;" >}}

1. インテグレーションを表示している状態で {{< ui >}}Configure{{< /ui >}} タブに移動し、きめ細かなアクセス制御を適用するリソース (アカウント、サービス、Webhook) を見つけます。
2. {{< ui >}}Set Permissions{{< /ui >}} をクリックします。
3. デフォルトでは、組織内の全員がフルアクセス権を持っています。{{< ui >}}Restrict Access{{< /ui >}}をクリックします。
4. ダイアログボックスが更新され、組織のメンバーにはデフォルトで {{< ui >}}Viewer{{< /ui >}} アクセス権があることが表示されます。
5. ドロップダウンを使用して、モニターを編集できるチーム、ロール、またはユーザーを 1 つ以上選択します。
    **注**:  個々のリソースを編集するには、[Integrations Manage][45] 権限も必要です。 
6. {{< ui >}}Add{{< /ui >}} をクリックします。
7. ダイアログボックスが更新され、更新された権限が表示されます。
8. {{< ui >}}Save{{< /ui >}} をクリックします。インテグレーションページが自動的に更新され、権限が反映されます。

**注 :** リソースの編集権限を維持するには、保存する前に、自分が所属するロールまたはチームを少なくとも 1 つ含める必要があります。

アクセスが制限されたインテグレーションリソースへの一般的なアクセスを復元するには、次の手順に従います。

1. インテグレーションを表示している状態で {{< ui >}}Configure{{< /ui >}} タブに移動し、一般的なアクセスを復元するリソース (アカウント、サービス、Webhook) を見つけます。
2. {{< ui >}}Set Permissions{{< /ui >}} をクリックします。
3. {{< ui >}}Restore Full Access{{< /ui >}} をクリックします。
4. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。インテグレーションページが自動的に更新され、権限が反映されます。

## 次のステップ{#whats-next}

最初のインテグレーションが設定されたら、アプリケーションから Datadog に送信されている[すべてのメトリクスを探索][31]し、これらのメトリクスを使用して [Dashboards][32] と [Alerts][33] の設定を開始し、データを監視します。

また、Datadog の [Logs management][34]、[APM][35]、[Synthetic Monitoring][36] ソリューションも確認します。

## トラブルシューティング{#troubleshooting}

インテグレーションのトラブルシューティングの最初のステップは、コードエディターのプラグインを使用するか、多数のオンラインツールのいずれかを使用して、YAML が有効であることを確認することです。次のステップは、すべての [Agent トラブルシューティング][37]手順を実行することです。

引き続き問題が解決しない場合は、[Datadog サポート][38]にお問い合わせください。

## 主要用語 {#key-terms}

`conf.yaml`
: [Agent の構成ディレクトリ][39]のルートにある `conf.d/<INTEGRATION_NAME>.d` フォルダーに `conf.yaml` を作成します。このファイルを使用して、インテグレーションをシステムに接続し、その設定を構成します。

カスタムチェック
: 監視したい独自のシステムがある場合、またはインテグレーションによってすでに送信されているメトリクスを拡張する場合は、[カスタムチェック][10]を構築して、メトリクスを定義し、Datadog に送信できます。ただし、一般的に利用可能なアプリケーション、パブリックサービス、またはオープンソースプロジェクトを監視したい場合で、そのインテグレーションが存在しないときは、カスタムチェックの代わりに[新しいインテグレーションの構築][1]を検討してください。

`datadog.yaml`
: これは、Agent 全体が独自のインテグレーションおよびシステムとどのように連携するかを定義するメイン構成ファイルです。このファイルを使用して、API キー、プロキシ、ホストタグ、およびその他のグローバル設定を更新します。

イベント
: イベントは、システムに関する情報メッセージであり、[イベントエクスプローラー][40]によって処理されるため、それらに基づいてモニターを構築できます。

インスタンス
: 監視対象のインスタンスを `conf.yaml` ファイルで定義およびマッピングします。たとえば、[`http_check` インテグレーション][41]では、稼働時間とダウンタイムを監視する HTTP エンドポイントのインスタンスに関連付けられる名前を定義します。同じインテグレーションで**複数のインスタンス**を監視できます。これを行うには、`conf.yaml` ファイルですべてのインスタンスを定義します。

`<INTEGRATION_NAME>.d`
: 複雑な構成の場合は、複数の `YAML` ファイルに分割し、それらをすべて `<INTEGRATION_NAME>.d` フォルダーに保存して構成を定義できます。Agent は、`<INTEGRATION_NAME>.d` フォルダー内の有効な `YAML` ファイルをすべて読み込みます。

ログ記録
: 監視対象のシステムにログがある場合は、[Log Management ソリューション][34]を使用して、Datadog に送信するログをカスタマイズします。

`metadata.csv`
: 各インテグレーションによって収集されたメトリクスを一覧表示し、保存するファイル。

メトリクス
: 各インテグレーションによってシステムから収集される項目のリスト。各インテグレーションのメトリクスは、そのインテグレーションの `metadata.csv` ファイル、およびインテグレーションのドキュメントページにある **Data Collected** テーブルで確認できます。そのテーブルで *Shown as <unit\>* と記載されているメトリクスには、インテグレーションのメタデータで単位がすでに定義されています。この表記がないメトリクスにはデフォルトで単位が設定されていないため、[Metrics Catalog][48] ページで手動で構成する必要があります。メトリクスの詳細については、[Metrics][42] 開発者ページを参照してください。[Custom Metrics][43] を設定することもできるため、インテグレーションが標準でメトリクスを提供していない場合でも、通常は追加できます。

パラメーター
: `conf.yaml` ファイルのパラメーターを使用して、インテグレーションのデータソースと Agent 間のアクセスを制御します。個々のインテグレーションの `conf.yaml.example` ファイルには、必須および任意のすべてのパラメーターが記載されています。

サービスチェック
: サービスチェックは、サービスの稼働状況を追跡するために使用されるモニターの一種です。詳細については、[サービスチェックガイド][44]を参照してください。

タグ付け
: [Tags][25] は、メトリクスにカスタマイズを追加するための仕組みであり、最も効果的な方法でメトリクスをフィルタリングおよび可視化できます。

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
[48]: https://app.datadoghq.com/metric/catalog