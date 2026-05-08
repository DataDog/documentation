---
further_reading:
- link: https://docs.aws.amazon.com/step-functions/latest/dg/redrive-executions.html
  tag: AWS 開発者ガイド
  text: Step Functions でリドライブを使用してステート マシンの実行を再開する
- link: /service_management/app_builder/
  tag: ドキュメント
  text: Datadog App Builder
title: AWS Step Functions の実行をリドライブする
---

このページでは、Datadog から直接 [リドライブ][1]を実行し、失敗した AWS Step Functions の実行をステート マシンを再起動せずに失敗時点から継続する方法を説明します。

{{< img src="serverless/step_functions/redrive_2.png" alt="失敗した Step Functions の実行の可視化。" style="width:100%;" >}}

## Datadog 内でリドライブを有効にする
Datadog 内でリドライブを使用できるようにするには、[Datadog App Builder][4] を使って [AWS Connection][3] を構成します。IAM ロールに、リトライ アクション (`StartExecution`) でステート マシンを実行する権限、またはリドライブ アクション (`RedriveExecution`) でステート マシンをリドライブする権限が含まれていることを確認してください。

## 使用方法
Datadog でステート マシンに対するアクションを実行するには:
1. [Step Functions][2] ページに移動します。 
2. リドライブする Step Function を見つけます。
3. このステート マシンのサイド パネルを開きます。**Executions** タブで、リドライブしたい失敗した実行を見つけます。
4. **Failed** ピルをクリックして、リドライブ モーダルを開きます。
5. **Redrive** ボタンをクリックします。

## リドライブのトレーシング
リドライブされた実行を監視する際は、元の実行とリドライブの間に大きな間隔が生じるため、Flame Graph ビューでは視認しづらくなることがあります。Waterfall ビューを使用します。

### リドライブ トレースが表示されない場合のトラブル シューティング
リドライブのサンプリングの判断が元の実行と同じとは限りません。リドライブされた実行もサンプリングされるようにするには、保持クエリで `@redrive:true` の span タグを参照します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/step-functions/latest/dg/redrive-executions.html
[2]: https://app.datadoghq.com/functions?cloud=aws&entity_view=step_functions
[3]: https://docs.aws.amazon.com/dtconsole/latest/userguide/welcome-connections.html
[4]: /ja/service_management/app_builder/