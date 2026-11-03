---
description: Bits Detection がどのようにして重要なサービスを自律的に特定し、システムの進化に合わせてモニターカバレッジを管理するかを学びます。
further_reading:
- link: https://www.datadoghq.com/blog/bits-detection/
  tag: ブログ
  text: Bits Detection で影響の大きい劣化を自律的に監視する
title: Bits Detection
---
{{< callout url="#" btn_hidden="true" header="false">}}
  Bits Detection はプレビュー版です。アクセスをリクエストするには、Datadog の担当者にお問い合わせください。
{{< /callout >}}

## 概要 {#overview}

モニターカバレッジは時間の経過とともに変化します。エンジニアがエンドポイントを追加したり、依存関係を移動したり、ユーザーフローを変更したりしても、モニターは以前のシステムのまま反映され続けます。サービスはトップレベルでは正常に見えても、1 つの重要なパスで障害が発生している可能性があります。Bits Detection は、どのエンドポイントにモニターカバレッジが必要かを特定し、観測された本番環境の動作から検出ロジックを設定します。また、チームがすべてのモニターを手動で作成、調整、維持することなく、モニターカバレッジを最新の状態に保ちます。

Bits Detection が問題をフラグ付けすると、トリアージの開始点として、影響を受けるエンドポイントと関連するテレメトリを指摘します。これは Bits AI ワークフローの最初のステップであり、[Bits Investigation][4] による調査を通じて、根本原因の分析と修復へと続きます。

## Bits Detection を有効にする {#enable-bits-detection}

<div class="alert alert-danger">Bits Detection はプレビュー版です。アクセスをリクエストするには、Datadog の担当者にお問い合わせください。</div>

Bits Detection を有効にすると、テレメトリ、依存関係、所有権メタデータ、最近の変更、ユーザーへの影響シグナルに基づいて、環境内で最も重要な 100 のサービスのモニターカバレッジが初期化されます。APM でインスツルメントされた HTTP および gRPC サービスでカバレッジがサポートされており、アプリケーションのエッジでの監視が優先されます。その他のリソースタイプのモニターカバレッジをリクエストするには、[Datadog サポート][1] にお問い合わせください。

チームの既存のモニターはそのまま維持されます。Bits Detection はそれらと並行して動作し、手動でモデル化するには変化が速すぎるシステム部分に対して適応型のモニターカバレッジを追加します。

いくつかのエントリーポイントから、追加のサービスの Bits Detection を有効にできます。

### オプション 1: Bits Detection Coverage Page {#enable-from-bits-ai}
1. Datadog で、[{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Detection{{< /ui >}}][5] に移動し、{{< ui >}}Enable New Detection Coverage{{< /ui >}} をクリックします。
1. サービス一覧をフィルタリングして有効にするサービスを見つけ、リストから 1 つ以上のサービスを選択します。
1. Bits Detection が重大な劣化を検出したときにチームが把握できるように通知先を設定します。
1. 初期化が完了したら、管理対象のカバレッジを確認します。新しいヘルス状況の準備が整うと、メールが送信されます。

### オプション 2: Service Page {#enable-from-service-page}

1. Datadog で、[{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][2] に移動し、サービスを選択します。
1. モニターのステータスバーまたは Bits Detection カードから、サービスのモニタリング概要を開きます。
1. プロンプトに従って、そのサービスの Bits Detection モニタリングを有効にします。
1. 初期化が完了したら、管理対象のカバレッジを確認します。新しいヘルス状況の準備が整うと、メールが送信されます。

## Bits Detection を使用する {#use-bits-detection}

Bits Detection は、3 つの段階でモニタリングを管理します。

- **重要なリソースを特定する**: Bits Detection は、サポートされているサービスとリソースを評価し、どのエンドポイント、依存関係、またはフローがユーザーやビジネスにとって重要である可能性が高いかを判断します。
- **意味のある劣化を検出する**: Bits Detection は、重要なリソースに対して管理対象モニターを作成および調整します。
- **サービスの変更に適応する**: Bits Detection は、リソースの重要度、モニタリングカバレッジ、およびアラート動作をサービスの進化に合わせて再評価することで、モニタリングを本番環境と一致させ続けます。

以下のセクションを使用して、モニターカバレッジの確認、アラートルーティングの設定、および Bits の長期的な適応を支援するためのフィードバックの提供を行います。

### Bits Detection モニタリングを確認する {#review-bits-detection-monitoring}

Bits Detection Coverage Page、Service Page、または Monitor List を使用して、Bits Detection がシステムをどのように監視しているかを確認します。

**Bits Detection Coverage Page**

Bits Detection がアクティブなすべてのスコープを確認するには、[{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Detection{{< /ui >}}][5] に移動します。各行は、Bits が維持するクリティカルなエンドポイントと管理対象モニターの数、スコープが最後にアラートを発した日時、アラート通知が構成されているかどうか、自動調査が有効になっているかどうかを示す検出スコープです。スコープを選択して Bits Detection の詳細を開くと、選択した期間の健全性ステータス、Bits が重要と見なすエンドポイント (それぞれに選択理由の根拠が記載されています)、Bits が管理するモニター、およびスコープのアラート履歴を確認できます。

Coverage ページから、以下のことが可能です。

- カバーされているすべてのサービスの Bits Detection の健全性ステータスを確認します。
- Bits に監視させるサービスを選択して、新しい検出用モニターカバレッジを有効にします。
- 管理対象スコープの詳細を表示します。
- Bits Detection でカバーされている重要なエンドポイントを確認します。
- エンドポイントを重要ではないとしてマークします。
- アラート通知ルールを管理します。

**Service Page**

サービスの Bits Detection ビューを開くには、[{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][2] に移動し、サービスを選択し、モニターのステータスバーまたは Bits Detection カードから監視の概要を開きます。

{{< img src="bits_ai/bits_detection/service_page_bits_detection_card.png" alt="APM Services Page の Bits Detection カードは、サービスの監視ステータスと重要なエンドポイントを表示します。" style="width:90%;" >}}

Service Page には、そのサービスの Bits Detection モニター (現在のステータスとアラート履歴を含む) と、Bits が重要と見なすエンドポイントが表示されます。Bits は、チェックアウト、サインアップ、認証パスなど、顧客に直接影響を与える可能性が最も高いエンドポイントを優先します。各エンドポイントには、それが選択された理由を説明する重要性の根拠が含まれています。

Service Page から、以下のことが可能です。

- サービスの Bits Detection の健全性ステータスを確認します。
- アクティブなアラートを開きます。
- 管理対象検出タイプの詳細を表示します。
- Bits Detection でカバーされている重要なエンドポイントを確認します。
- エンドポイントを重要ではないとしてマークします。
- アラート通知ルールを管理します。

**モニターリスト**

Bits Detection モニターを表示するには、[{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}List{{< /ui >}}][3] に移動し、{{< ui >}}Bits Managed{{< /ui >}} フィルターを選択します。概要バナーには、各ステータスの管理対象モニターの数が表示されます。サービス行を展開して、その管理対象モニターを表示します。

{{< img src="bits_ai/bits_detection/monitor_list_bits_managed.png" alt="モニターリストが Bits Managed モニターにフィルタリングされ、管理対象モニターのステータスごとにグループ化されたサービスが表示されます。" style="width:90%;" >}}

モニターリストは、Bits Detection モニターをサービスごとにグループ化します。各サービスについて、各管理対象モニターのステータス、優先度、モニター名、およびタグを確認できます。Bits Detection モニターにはスパークルアイコンのラベルが付いているため、チームが作成および管理するモニターと区別できます。

### Bits Detection 通知を管理する {#manage-bits-detection-notifications}

Bits Detection モニターは、静的なしきい値ではなく、本番環境の動作に合わせて調整されます。アラート通知ルールを使用して、適切なチームにアラートをルーティングします。ルールを設定するには、[サービスモニタリングの概要][2] に移動し、{{< ui >}}Set Up Alert Notification Rules{{< /ui >}} をクリックします。

1. {{< ui >}}Match notifications with specific tags{{< /ui >}} で、クエリを確認します。Datadog は、選択したサービスと Bits Detection 管理モニターのタグを使用して、ルールを自動的に入力します。さらにフィルタリングすることもできます。
1. {{< ui >}}Choose routing conditions and recipients{{< /ui >}} で、{{< ui >}}Manual Routing{{< /ui >}} または {{< ui >}}Dynamic Routing{{< /ui >}} を選択します。
1. 一致するモニター通知を受け取る受信者を追加します。
1. ルールに名前を付けます。
1. ルールの権限を定義します。
1. {{< ui >}}Create Rule{{< /ui >}} をクリックします。

通知ルールは、タグクエリに一致するモニターに適用されます。サイドパネルには、ルールに一致するモニターの数と、一致するモニターの例が表示されます。

### Bits の学習を支援する {#help-bits-learn}

フィードバックを使用して、環境に合わせて Bits Detection を調整します。アラートが有用か不要かをフラグ付けしたり、どのエンドポイントを重要と見なすかをサービスページから更新したりできます。

**アラートに関するフィードバックを提供する**

1. Bits Detection アラートを開きます。
1. フィードバックのプロンプトで、Bits がアラートを出すべきだった場合は {{< ui >}}Yes{{< /ui >}} をクリックし、出すべきではなかった場合は {{< ui >}}No, Because…{{< /ui >}} をクリックします。
1. {{< ui >}}No, Because…{{< /ui >}} をクリックした場合は、理由を選択します。
1. {{< ui >}}Send Feedback{{< /ui >}} をクリックします。

**リソースの重要度に関するフィードバックを提供する**

Bits Detection は重要度を使用して、どのリソースを管理対象の監視範囲に含めるかを判断します。[サービス監視の概要][2] から、重要な監視対象にすべきでないエンドポイントの横にある {{< ui >}}Mark as Not Critical{{< /ui >}} をクリックするか、{{< ui >}}Add a New Endpoint{{< /ui >}} をクリックしてエンドポイントを重要としてマークします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://app.datadoghq.com/apm/services
[3]: https://app.datadoghq.com/monitors/manage?bits_monitors=true
[4]: /ja/bits_ai/bits_investigation/
[5]: https://app.datadoghq.com/bits-ai/detection/scopes