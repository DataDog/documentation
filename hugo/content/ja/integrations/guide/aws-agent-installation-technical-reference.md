---
description: AWSインテグレーションを通じてDatadogがAmazon EC2上でDatadog Agentをインストールおよび維持する方法（作成されるAWSリソース、インストールメカニズム、セキュリティモデル、Agentのライフサイクル）について理解します。
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
  tag: ドキュメント
  text: AWSインテグレーションを通じてDatadog Agentをインストールしてください。
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: ドキュメント
  text: AWS インテグレーション
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: ドキュメント
  text: Fleet Automation
private: true
title: AWSインテグレーションによるAgentインストールの仕組み
---
このページでは、AWSインテグレーションを通じてDatadogがAmazon EC2上でAgentをインストールおよび維持する方法について説明します。セットアップ手順およびDatadogが必要とする権限については、[AWSインテグレーションを通じてDatadog Agentをインストールする][1]を参照してください。

<div class="alert alert-info">このページはAmazon EC2のエクスペリエンスのみを対象としています。</div>

## Datadogが作成するAWSリソース {#aws-resources-that-datadog-creates}

起動するCloudFormationテンプレートは、単一のスタック内で以下のリソースを一度だけ作成します。

| リソース | 名前 | 目的 |
|---|---|---|
| EventBridgeコネクション | `datadog-agent-resource-update-intake-connection` | Datadogにイベントを送信できるように、Datadog API キーとアプリケーションキーを保持します |
| EventBridge API送信先 | `datadog-agent-resource-update-intake-destination` | にイベントを送信します `https://api.<YOUR_DD_SITE>/api/unstable/instrumenter/events`（1秒あたり10イベントに制限） |
| EventBridgeルール | `datadog-agent-resource-update-rule-ec2` | 対象のインスタンスに変更があった場合にDatadogに通知します |
| IAMロール | 自動命名 | EventBridgeが`datadog-agent-resource-update-intake-destination` API送信先にイベントを送信できるようにします |
| IAMロール | `datadog-eventbridge-cross-region-role` | 他のリージョンがプライマリリージョンにイベントを転送できるようにします |

Datadogは、インストール時に必要に応じて以下のリソースを作成します。

| リソース | 名前 | 目的 |
|---|---|---|
| Systems Managerドキュメント | `datadog-ec2-instrumenter` | インストールおよびアンインストールスクリプトです。アカウントごとに1つのドキュメントが作成されます。|
| Secrets Managerシークレット | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | インスタンス自身が取得できるようにDatadog API キーを保持します。デフォルトのAWS管理キーで暗号化されます。|
| IAMロールおよびインスタンスプロファイル| `datadog-ssm-<INSTANCE_ID>`と`datadog-ssm-profile-<INSTANCE_ID>` | インスタンスにインスタンスプロファイルがない場合にのみ、IAMパス`/datadog-ec2-instrumenter/`の下で作成されるため、識別可能です。Systems Managerがインスタンスに到達できるように、AWS管理の`AmazonSSMManagedInstanceCore`ポリシーを受け取ります。|
| インラインIAMポリシー| `datadog-ec2-instrumenter-secrets` | インスタンスのロールに追加されます。`/datadog/ec2-instrumenter/`の下にあるシークレットへの読み取りアクセスのみを許可します。|
| 他のリージョンのEventBridgeルール| プライマリリージョンのリソースと同じ名前| 変更イベントをプライマリリージョンに転送します。|

DatadogはS3バケット、イベントバス、ロググループ、SSMパラメータを作成せず、インスタンスのタグ付けも行いません。

## Agentのインストール方法{#how-agent-installation-works}

インストールルールを保存すると、Datadogはそれに一致するインスタンスを検索し、その後も新しい一致がないか継続的に確認します。Datadogは、対象となる各インスタンスに対して以下の順序で処理を実行します。前提条件（サポートされているプラットフォームを含む）については、セットアップガイドの「[Prerequisites][2]」を参照してください。

1. Datadogは、対象となる各インスタンスが実行中であり、サポートされているプラットフォーム上にあり、AWS Systems Managerから到達可能であることを確認します。
2. インスタンスにIAMインスタンスプロファイルがない場合、Systems Managerが到達できるようにDatadogがインスタンスプロファイルを作成します。インスタンスにすでにプロファイルがある場合、DatadogはSSMポリシーとスコープ付きシークレット読み取りポリシーを既存のロールに追加します。
3. Datadogは、Agentがすでに存在するかどうかを確認します。DatadogがインストールしたものではないAgentが存在する場合、Datadogは処理を停止し、そのインスタンスには何も行いません。
4. Datadogは`ssm:SendCommand`を呼び出し、一度に1つのインスタンスに対して`datadog-ec2-instrumenter`ドキュメントを実行します。
5. インスタンス上で、そのドキュメントはインスタンス自身のIAMロールを使用してSecrets ManagerからAPIキーを取得します。その後、ログ収集とAPMホストインスツルメンテーションを有効にした状態で、Datadogの標準Datadog Agentインストーラー（Linuxの場合は`install_script_agent7.sh`、Windowsの場合は標準のMSI）を実行します。コマンドは6分後にタイムアウトします。

Datadogはインスタンスの再起動を行いません。Datadogが触れるサービスはDatadog Agentのみであり、インストール時に開始され、アンインストール時に停止されます。お客様のアプリケーションやその他のサービスには一切触れません。

### Datadogが除外するインスタンス{#instances-that-datadog-excludes}

Datadogは自動的に以下を除外します。

- 実行されていないインスタンス
- EKSワーカーノード
- ECSコンテナインスタンス
- Datadog以外のAgentが既にインストールされているインスタンス

## セキュリティ、監査、および変更管理{#security-auditing-and-change-control}

### Datadogのアクセス方法{#how-datadog-gets-access}

Datadogは、AWSインテグレーションと同じクロスアカウントIAMロールを使用し、外部IDで認証されます。Datadogは短期間の有効な一時的認証情報を受け取り、各作業タイプ（EC2の読み取り、IAMの管理、コマンドの送信）には、広範なセッションではなく、個別にスコープ設定された認証セッションが使用されます。Datadogは、長期有効なAWSキーを一切保存しません。

### Datadogのアクションの監査{#auditing-datadogs-actions}

Datadogが実行するすべてのアクションは標準のAWS API呼び出しであるため、すべてのアクションがAWS CloudTrailに記録されます。Datadogが作成するすべてのものは名前で識別可能です。リソースには`datadog-`というプレフィックスが付き、シークレットは`/datadog/ec2-instrumenter/`の下に保存され、IAMロールには不変のパス`/datadog-ec2-instrumenter/`が使用されます。IAMパスは作成後に編集できないため、パスが密かに変更されることはありません。インスタンス上のコマンド結果は、Systems Manager Run Commandの履歴に表示されます。

### API キーの取り扱い方法{#how-the-api-key-is-handled}

API キーは、お客様自身のSecrets Managerに保存され、保存時に暗号化されます。SSMコマンドにはシークレットのAmazonリソースネーム（ARN）のみが渡され、キー自体がコマンドパラメータやCloudTrailに表示されることはありません。インスタンスは、単一のパスに制限された独自のIAMロールを使用してシークレットを読み取ります。Datadogは内部的にキーへの参照のみを保存し、キー自体は保存しません。

### インストールを変更できるのは誰ですか {#who-can-change-installations}

- **AWSの場合**: アクセスは独自のIAMポリシーによって管理されます。クロスアカウント権限を削除すると、Datadogは直ちに停止します。
- **Datadogの場合**: インストールルールを表示するには、**Hosts Read**権限が必要です。ルールの作成、編集、削除には、**Agent Install**権限が必要です。ルールの変更にはレート制限が適用されます。

### ガードレール {#guardrails}

- Datadogは、自身がインストールしていないAgentを削除することはありません。
- Datadogは、どのインスタンスにAgentをインストールしたかを追跡しているため、自身の作業のみをクリーンアップします。
- 一部のリージョンをリストできない場合、Datadogは一括アンインストールのリスクを避けるため、そのパスのクリーンアップをスキップします。

## Agentのライフサイクルとカバレッジ {#agent-life-cycle-and-coverage}

### ルールカバレッジは時間の経過とともに評価されます {#rule-coverage-is-evaluated-over-time}

ルールは一致するインスタンスをカバーし、Datadogは時間の経過とともに新しい一致がないかを確認します。ルールを保存した後に起動された、またはタグが変更されたためにインスタンスが後から一致するようになった場合、Datadogは自動的にそのインスタンスをインストルメントします。Datadogは、ルールが一致しないインスタンスをインストルメントしません。

カバレッジを特定のインスタンスセットに固定するには、それらのインスタンスを個別に選択してください。その場合、ルールは選択したインスタンスのみに一致するため、その後のチェックで新しいインスタンスが追加されることはありません。

固定セットが大きすぎて個別に選択できない場合は、`datadog:true`のように管理しているタグで一致させてください。そのタグは、インストルメント化したいインスタンスにのみ適用してください。カバレッジは、タグを変更したときにのみ変化します。

### Datadogが対象インスタンスを同期し続ける仕組み {#how-datadog-keeps-covered-instances-in-sync}

Datadogは、対象インスタンスに対して定義した状態を継続的に維持します。

- Datadogは定期的にルールをチェックし、一致するインスタンスをインストルメント化します。
- Datadogは、Agentが見当たらない場合は再インストールし、インストールに失敗した場合は再試行し、存在しなくなったインスタンスをクリーンアップします。
- 新しい一致は通常1時間以内、多くの場合数分以内にインストルメント化されます。
- すでにAgentがインストールされているインスタンスは、チェックの頻度が低くなります。

### カバレッジが変更された場合 {#what-happens-when-coverage-changes}

カバレッジが変更されると、Datadogはどのインスタンスがルールのカバレッジに追加または削除されたかを判断します。カバレッジは、ルールを編集したとき、またはインスタンスが変更されたときに変化します。Datadogは、新たに対象となったインスタンスにAgentをインストールし、対象外となったインスタンスからはアンインストールします。ルールを削除すると、そのルールが対象としていたすべてのインスタンスからAgentがアンインストールされます。

<div class="alert alert-warning">
Datadogでの編集、またはAWSでのインスタンスの再タグ付けや再構成によってインスタンスがルールに一致しなくなった場合、DatadogはAgentをアンインストールします。他のチームが変更できるタグに基づいてルールを作成する場合は、この動作に留意してください。
</div>

### 終了または停止したインスタンス {#terminated-or-stopped-instances}

Datadogは終了したインスタンスを検出し、そのインスタンスのために作成したIAMリソースをクリーンアップします。Datadogは、停止したインスタンスが復帰するまでそのままにします。

### インストールが失敗した場合 {#when-an-install-fails}

Datadogは遅延時間を増やしながら（1時間、次に2時間、最大で1日1回まで）再試行を継続します。権限不足の問題は、**AWS統合タイル**およびFleetインストールページで問題として表示されます。

<div class="alert alert-warning">
誰かが手動で対象インスタンスからAgentを削除すると、Datadogはそれを再インストールします。そのルールが唯一のソースです。カバレッジを停止するには、インスタンスが一致しなくなるようにルールを変更してください。
</div>

## Agent のアンインストール {#uninstall-the-agent}

アンインストールすると、Datadog Agent、Linux上の`/etc/datadog-agent`および`/opt/datadog-agent`ディレクトリ（またはWindowsでのMSIアンインストール）、およびDatadogがそのインスタンスのために作成したIAMロールやインスタンスプロファイルが削除されます。アンインストールするには、インスタンスが一致しなくなるようにルールのクエリを編集するか、ルールからインスタンスを削除するか、またはルールを削除してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/ja/integrations/guide/aws-agent-installation/#prerequisites