---
description: Datadog が AWS インテグレーションを通じて Amazon EC2 インスタンスと AWS Lambda 関数をどのようにインスツルメントするか
  (作成される AWS リソース、インスツルメンテーションのメカニズム、セキュリティモデル、Datadog がどのようにインスツルメンテーションを維持するか) を理解します。
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
  tag: ドキュメント
  text: AWS インテグレーションを通じて Datadog インスツルメンテーションをインストールする
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: ドキュメント
  text: AWS インテグレーション
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: ドキュメント
  text: Fleet Automation
- link: https://docs.datadoghq.com/account_management/workload_identity_federation/
  tag: ドキュメント
  text: ワークロードアイデンティティフェデレーション
private: true
title: AWS インテグレーションを介した Datadog インスツルメンテーションの仕組み
---
このページでは、Datadog が AWS インテグレーションを通じてどのように AWS ワークロードをインスツルメンテーションし、維持するかを説明します。セットアップ手順および Datadog が必要とする権限については、[AWS インテグレーションを通じて Datadog インスツルメンテーションをインストールする][1]を参照してください。

このページでは、Amazon EC2 インスタンスと AWS Lambda 関数について説明します。Amazon EKS はサポートされていません。

Datadog は、Lambda 関数向けの[リモートインスツルメンテーション][4]も提供しています。リモートインスツルメンテーションは、Datadog から変更を行うのではなく、自身のアカウントにインスツルメンター関数をデプロイします。両者の比較については、セットアップガイドの [AWS インテグレーションとリモートインスツルメンテーションから選択する][6]を参照してください。

## Datadog が作成する AWS リソース {#aws-resources-that-datadog-creates}

### CloudFormation スタックによって一度だけ作成 {#created-once-by-the-cloudformation-stack}

起動する CloudFormation テンプレートは、以下のリソースを単一のスタック内で一度だけ作成します。

| リソース | 名前 | 目的 |
|---|---|---|
| EventBridge コネクション | `datadog-agent-resource-update-intake-connection` | イベントを Datadog に送信できるように、Datadog API キーとアプリケーションキーを保持する |
| EventBridge API 送信先 | `datadog-agent-resource-update-intake-destination` | リソース変更イベントを Datadog に送信する |
| EventBridge ルール | `datadog-agent-resource-update-rule-ec2` | 対象インスタンスが変更されたときに Datadog に通知します。EC2 ワークロードを選択したときに作成 |
| EventBridge ルール | `datadog-agent-resource-update-rule-lambda` | 対象関数が変更されたときに Datadog に通知します。Lambda ワークロードを選択したときに作成 |
| IAMロール | 自動命名 | EventBridge が `datadog-agent-resource-update-intake-destination` API送信先にイベントを送信できるようにする |
| IAM ロール | `datadog-eventbridge-cross-region-role` | 他のリージョンからプライマリリージョンへイベントを転送できるようにする |

このスタックはまた、選択したワークロードに必要な IAM 権限を AWS インテグレーションロールに付与します。Lambda ワークロードのみを選択した場合、スタックは EC2 権限を付与しません。

### EC2 インスタンス用に必要に応じて作成 {#created-as-needed-for-ec2-instances}

| リソース | 名前 | 目的 |
|---|---|---|
| Systems Manager ドキュメント | `datadog-ec2-instrumenter` | インストールおよびアンインストールスクリプト。アカウントごとに 1 つのドキュメント。|
| Secrets Manager シークレット | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | インスタンス自身が取得できるように Datadog API キーを保持します。デフォルトの AWS 管理キーで暗号化されます。|
| IAM ロールおよびインスタンスプロファイル | `datadog-ssm-<INSTANCE_ID>` および `datadog-ssm-profile-<INSTANCE_ID>` | インスタンスにインスタンスプロファイルがない場合にのみ、識別できるように IAMパス `/datadog-ec2-instrumenter/` の下に作成されます。Systems Manager がインスタンスにアクセスできるように、AWS 管理の `AmazonSSMManagedInstanceCore` ポリシーが付与されます。|
| インライン IAM ポリシー | `datadog-ec2-instrumenter-secrets` | インスタンスのロールに追加されます。`/datadog/ec2-instrumenter/` の下のシークレットへの読み取りアクセス権のみを付与します。|
| 他のリージョンの EventBridge ルール | プライマリリージョンのリソースと同じ名前 | 変更イベントをプライマリリージョンに転送します。|

Datadog は、S3 バケット、イベントバス、ロググループ、SSM パラメーターを作成せず、インスタンスにタグ付けもしません。

### Lambda 関数に対して追加のリソースは作成されません {#no-additional-resources-created-for-lambda-functions}

CloudFormation スタックが作成する Lambda EventBridge ルールを除き、Datadog は Lambda インスツルメンテーションのために AWS リソースを作成しません。唯一の変更点は、ルールが対象とする関数の設定に対するものです。Datadog は、Lambda 用にシークレット、IAM ロール、SSM ドキュメントを作成せず、関数にタグ付けもしません。

## インスツルメンテーションの仕組み {#how-instrumentation-works}

インスツルメンテーションルールを保存すると、Datadog は定義したクエリをアカウントに対して評価して対象リソースを特定し、各リソースに対して以下のシーケンスを実行します。サポート対象プラットフォームおよびランタイムなどの前提条件については、セットアップガイドの[前提条件][2]を参照してください。

### Amazon EC2 {#on-amazon-ec2}

1. Datadog は、対象となる各インスタンスが実行中であり、サポートされているプラットフォーム上にあり、AWS Systems Manager からリーチできることを確認します。
2. インスタンスに IAM インスタンスプロファイルがない場合、Datadog は Systems Manager がリーチできるように作成します。インスタンスにすでにプロファイルがある場合、Datadog は既存のロールに SSM ポリシーとスコープ付きのシークレット読み取りポリシーを追加します。
3. Datadog は Agent がすでに存在するかどうかを確認します。Datadog がインストールしたものではない Agent が存在する場合、Datadog は処理を停止し、そのインスタンスには何も行いません。
4. Datadog は `ssm:SendCommand` を一度に 1 インスタンスずつ呼び出し、`datadog-ec2-instrumenter` ドキュメントを実行します。
5. インスタンス上で、ドキュメントはインスタンス自身の IAM ロールを使用して Secrets Manager から API キーを取得します。その後、ログ収集と APM ホストインスツルメンテーションを有効にした状態で、Datadog の標準 Agent インストーラー (Linux では `install_script_agent7.sh`、Windows では標準の MSI) を実行します。

Datadog はインスタンスの再起動を行いません。Datadog が操作する唯一のサービスは Datadog Agent 自体であり、インストール時に開始され、アンインストール時に停止されます。アプリケーションやその他のサービスには一切影響しません。

### AWS Lambda {#on-aws-lambda}

Lambda のインスツルメンテーションは、完全に Datadog 側で実行されます。Datadog は、関数をインスツルメントするためにインスツルメンター関数などのコンピューティングリソースをアカウントにデプロイすることはありません。

1. Datadog は関数の現在の構成とタグを読み取り、[Lambda の前提条件][3]を満たしているかを確認します。
2. Datadog は、関数がすでにインスツルメントされているかどうかを確認します。Datadog は、Datadog レイヤー、Datadog ハンドラー、または Datadog が適用していない Datadog 環境変数が含まれている関数をスキップします。Datadog は、[リモートインスツルメンテーション][4]によって管理されている関数もスキップし、2 つの理由のうちどちらが適用されるかを報告します。
3. Datadog は、関数のランタイム、アーキテクチャ、リージョン、および AWS パーティションの Datadog レイヤーバージョンを解決します。Datadog は、その時点で最新のものを使用するのではなく、検証済みのレイヤーバージョンを適用するため、インストールを再現可能です。
4. Datadog は、完全に目的の構成を計算し、何かを変更する前に、何を変更しようとしているかを正確に記録します。
5. Datadog は、関数の実行ロールが Datadog 組織にテレメトリを送信することを許可します。[Lambda テレメトリの認証方法](#how-lambda-telemetry-is-authenticated)のセクションを参照してください。
6. Datadog は `lambda:UpdateFunctionConfiguration` を 1 回呼び出し、完全なレイヤーリストと環境マップを送信します。Datadog は、AWS が成功を報告した後にのみ、変更を適用済みとしてマークします。

Lambda の更新は置換形式の操作であり、送信されたレイヤーリストと環境マップが新しい構成になります。そのため、Datadog は既存のレイヤーや環境変数を保持するために追記するのではなく、完全に目的の状態を計算します。更新には関数のリビジョン ID が含まれるため、Datadog の読み取りと書き込みの間にアカウントで行われた変更は、上書きされるのではなく、更新が失敗する原因となります。

### Datadog が関数に対して行う変更 {#what-datadog-changes-on-a-function}

| 変更 | 適用対象 |
|---|---|
| Datadog 拡張レイヤーを追加する (`Datadog-Extension` または `Datadog-Extension-ARM`) | サポート対象のランタイム |
| 一致する Datadog トレーシングレイヤーを追加する | Node.js、Python、Ruby、Java、および .NET |
| 次を設定する: `DD_SITE` および `DD_ORG_UUID` | サポート対象のすべてのランタイム|
| ハンドラーを Datadog ハンドラーにリダイレクトし、元のハンドラーを次に移動する: `DD_LAMBDA_HANDLER` |  Node.js および Python|
|  `AWS_LAMBDA_EXEC_WRAPPER`を次に設定する: `/opt/datadog_wrapper` | Java および .NET|

Datadog は、関数コード、メモリサイズ、タイムアウト、VPC 構成、同時実行数、またはその他の関数設定を変更しません。

### Datadog が除外するリソース {#resources-that-datadog-excludes}

EC2 において、Datadog は以下を除外します。

- 実行されていないインスタンス
- EKS ワーカーノード
- ECS コンテナインスタンス
- Datadog 以外の Agent がすでにインストールされているインスタンス

Lambda において、Datadog は以下を除外します。

- コンテナイメージ関数、およびサポートされていないランタイムまたはアーキテクチャ上の関数
- 商用 `aws` パーティション外の関数
- Lambda@Edge レプリカおよびそれらが複製する関数
- ユーザー自身またはリモートインスツルメンテーションによってすでにインスツルメントされている関数
- `AWS_LAMBDA_EXEC_WRAPPER`が Datadog 以外のラッパーにすでに設定されている関数
- Datadog レイヤーを追加すると AWS の 5 レイヤー制限を超える関数

## セキュリティ、監査、および変更管理 {#security-auditing-and-change-control}

### Datadog がアクセスを取得する方法 {#how-datadog-gets-access}

Datadog は、AWS インテグレーションと同じクロスアカウント IAM ロールを使用し、外部 ID で認証を行います。Datadog は短期間有効な一時的認証情報を受け取り、各作業タイプ (EC2 の読み取り、IAM の管理、コマンドの送信、関数の更新) には広範なセッションではなく個別にスコープ設定された認証セッションを使用します。Datadog は、長期有効な AWS キーを一切保存しません。

### Datadog のアクションの監査 {#auditing-datadogs-actions}

Datadog が実行するすべてのアクションは標準の AWS API 呼び出しであるため、すべてのアクションが AWS CloudTrail に記録されます。Datadog が作成するすべてのものは名前で識別可能です。リソースには `datadog-` というプレフィックスが付き、シークレットは `/datadog/ec2-instrumenter/` の下に保存され、IAM ロールは不変のパス `/datadog-ec2-instrumenter/` を使用します。IAM パスは作成後に編集できないため、パスが暗黙に変更されることはありません。インスタンス上のコマンド結果は、Systems Manager Run Command の履歴に表示されます。Lambda 設定の変更は、AWS 統合ロールに起因する `UpdateFunctionConfiguration` イベントとして表示されます。

### EC2 での API キーの処理方法 {#how-the-api-key-is-handled-on-ec2}

API キーは、自身の Secrets Manager に保存され、保存時に暗号化されます。シークレットの Amazon Resource Name (ARN) のみが SSM コマンドで渡され、キー自体がコマンドパラメーターや CloudTrail に表示されることはありません。インスタンスは、単一のパスに制限された独自の IAM ロールを使用してシークレットを読み取ります。Datadog は、キー自体ではなく、キーへの参照のみを内部的に保存します。

### Lambda テレメトリの認証方法 {#how-lambda-telemetry-is-authenticated}

Lambda インスツルメンテーションは、アカウントに Datadog の認証情報を保存しません。Datadog 拡張機能は、[Workload Identity Federation][5] を通じて関数の AWS 実行 ID で認証を行い、Datadog が関数に設定する `DD_ORG_UUID` および `DD_SITE` の値を使用します。Datadog API キー、シークレット ARN、または KMS 暗号化キーは、関数の設定には書き込まれません。

その認証を成功させるために、Datadog は関数の実行ロールが Datadog 組織にテレメトリを送信することを許可します。Datadog は、関数を更新する前にこの認可を設定し、より広範なパターンではなく実行ロールと正確に一致させます。

単一の実行ロールが複数の関数間で共有されることが多いため、Datadog はこれらの認可を作成しますが、アンインストール時に削除することはありません。共有ロールの認可を削除すると、それに依存している他の関数が機能しなくなる可能性があります。

### インスツルメンテーションを変更できるユーザー {#who-can-change-instrumentation}

- **AWS の場合**: アクセスは自身の IAM ポリシーによって管理されます。クロスアカウント権限を削除すると、Datadog は直ちに停止します。
- **Datadog の場合**: インスツルメンテーションルールを表示するには、**Hosts Read** 権限が必要です。ルールを作成、編集、または削除するには、**Agent Install** 権限が必要です。ルール変更にはレート制限があります。

### ガードレール {#guardrails}

- Datadog は、自身がインストールしていないインスツルメンテーションを削除することはありません。
- Datadog はインスツルメントしたリソースを追跡するため、自身の作業のみをクリーンアップします。
- EC2 において、一部のリージョンをリストできない場合、Datadog は一括でインスツルメンテーションを削除するリスクを避けるため、クリーンアップをスキップします。
- Lambda において、Datadog はインスツルメンテーション前に記録した構成から関数を復元するため、アンインストールによって Datadog が行った変更が正確に元に戻されます。
- 障害は個々のリソースに限定されます。1 つのリソースで障害が発生しても、すでにインスツルメントされているリソースには影響しません。

## Datadog がインスツルメンテーションを維持する方法 {#how-datadog-maintains-instrumentation}

### 継続的な調整 {#continuous-reconciliation}

Datadog は、対象リソースに対して定義された状態を継続的に維持します。

- Datadog は定期的に対象リソースを再チェックし、欠落しているインスツルメンテーションを復元し、失敗した処理を再試行し、存在しなくなったリソースをクリーンアップします。
- アカウントから転送された変更イベントにより、Datadog は次回のスケジュールを待つことなく数分以内に対応できます。Datadog は、変更された対象リソースと、クエリベースのルールに一致する新規作成リソースの両方に対応します。
  - **EC2**: イベントは CloudFormation スタックの EventBridge ルールから送信されます。
  - **Lambda**: `datadog-agent-resource-update-rule-lambda` ルールは、関数の作成、構成の更新、タグ付け、およびタグの削除のイベントを転送します。
- EC2 では、不要なアクティビティを避けるため、すでに Agent がインストールされているインスタンスの再検証頻度が低く設定されています。
- Lambda では、Datadog は変更が必要な関数に対してのみアカウントで Lambda API を呼び出します。現在のレイヤーバージョンを使用しているフリートでは、関数ごとのアクティビティは発生しません。

### Lambda 関数が新しいレイヤーバージョンを取得する方法 {#how-lambda-functions-pick-up-new-layer-versions}

Datadog は対象となる関数のレイヤーを、最初のインスツルメンテーション時に適用されたバージョンではなく Datadog がデプロイするバージョンと比較します。Datadog が新しいレイヤーバージョンをリリースすると、対象となる関数はそれらのバージョンに更新されます。したがって、何もしなくても関数は Datadog のレイヤーリリースに合わせて更新されます。

進行中のLambda設定更新はそのままにされ、その後すぐに再試行されるため、Datadogが適用中の変更と競合することはありません。

### ルールがカバレッジを決定する方法 {#how-a-rule-determines-coverage}

ルールは一度限りの選択ではありません。Datadog はクエリを継続的に再評価し、アカウントから転送される変更イベントに対応します。Datadog は、以下のいずれかの場合に一致を検出するとすぐにリソースをインスツルメントします。

- **ルールを保存した後に作成された場合。**`RunInstances` および `CreateFunction` イベントが転送されるため、新しいリソースは数分以内に検出されます。
- **すでに存在しており、一致し始めた場合。**リソースにタグを付けてスコープ内に含めるのが一般的なケースであるため、タグイベントも転送されます。EC2 では `CreateTags` および `DeleteTags`、Lambda では `TagResource` および `UntagResource` が転送されます。これにより、まず `@Tags:datadog:true` のようなルールを作成し、その後必要に応じてリソースにタグを付けてルールに含めることができます。

特定のリソースを選択して作成したルールにはそれらのリソースを指定するクエリが含まれているため、他のリソースが一致することはありません。

固定タグに一致させる場合など、クエリの作成方法に関するガイダンスについては、セットアップガイドの[ルールによるリソースの一致方法を選択する][7]を参照してください。

### カバレッジが変更された場合に何が起こるか {#what-happens-when-coverage-changes}

Datadog はルールを再評価し、対象リソースを以前のセットと比較します。対象外となったリソースからはインスツルメンテーションが削除されます。新たに対象となったリソースにはインスツルメンテーションが適用されます。ルールを削除すると、そのルールが対象としていたすべてのリソースからインスツルメンテーションが削除されます。

<div class="alert alert-warning">
Datadog での編集、または AWS でのリソースの再タグ付けや再設定のいずれによる変更であっても、リソースがルールに一致しなくなった場合、Datadog はインスツルメンテーションを削除します。他のチームが変更できるタグに基づいてルールを作成する場合は、この動作に留意してください。
</div>

### 終了、停止、または削除されたリソース {#terminated-stopped-or-deleted-resources}

EC2 では、Datadog は終了したインスタンスを検出し、それらのために作成した IAM リソースをクリーンアップします。Datadog は停止したインスタンスが復帰するまでそのままの状態にします。Lambda では、削除された関数はカバレッジから外れます。

### インスツルメンテーションが失敗した場合 {#when-instrumentation-fails}

Datadog は試行間の遅延を増やしながら自動的に再試行します。権限の不足やレイヤー制限に達した関数など、ユーザーによる対応が必要な問題は報告され、解決されるまで再試行されなくなります。権限不足の問題は、**AWS インテグレーションタイル**および Fleet インストールページに問題として表示されます。

<div class="alert alert-warning">
誰かが手動で対象リソースからインスツルメンテーションを削除した場合、Datadog はそれを復元します。ルールが唯一のソースとなります。カバレッジを停止するには、ルールを変更してください。
</div>

## Datadog インスツルメンテーションを削除する {#remove-datadog-instrumentation}

インスツルメンテーションを削除するには、ルールからリソースを削除するか、ルールのクエリを編集するか、ルールを削除してください。

- **EC2**: Datadog は、Datadog Agent、Linux 上の `/etc/datadog-agent` および `/opt/datadog-agent` ディレクトリ (または Windows での MSI アンインストール)、および各インスタンスに対して Datadog が作成した IAM ロールやインスタンスプロファイルを削除します。
- **Lambda**: Datadog は追加したレイヤーを削除し、関数が以前保持していた環境変数とハンドラーを復元します。Datadog はまず、元の構成の記録と関数の現在の構成を比較するため、自身が追加していないレイヤーや変数を削除することはありません。実行ロールのテレメトリ認証は、他の関数と共有されている可能性があるため、そのまま残されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/ja/integrations/guide/aws-agent-installation/#prerequisites
[3]: https://docs.datadoghq.com/ja/integrations/guide/aws-agent-installation/#aws-lambda-functions
[4]: https://docs.datadoghq.com/ja/serverless/aws_lambda/remote_instrumentation/
[5]: https://docs.datadoghq.com/ja/account_management/workload_identity_federation/
[6]: https://docs.datadoghq.com/ja/integrations/guide/aws-agent-installation/#choose-between-the-aws-integration-and-remote-instrumentation
[7]: https://docs.datadoghq.com/ja/integrations/guide/aws-agent-installation/#choose-how-your-rule-matches-resources