---
further_reading:
- link: /integrations/ecs_fargate/
  tag: ドキュメント
  text: ECS Fargate
- link: https://www.datadoghq.com/blog/monitor-aws-fargate/
  tag: ブログ
  text: Datadog を使用した AWS Fargate アプリケーションの監視
- link: /agent/docker/integrations/
  tag: ドキュメント
  text: オートディスカバリー

title: ECS Fargate のインテグレーションセットアップ
---

[ECS Fargate][1] と [Docker Label Annotations][2] のインテグレーションを設定します。

## インテグレーションを追加する

すでに ECS Fargate で [Container Agent を設定][3]している場合は、以下の手順で既存のクラスターにインテグレーションを追加します。

### タスクの定義を更新する

1. [AWS Web Console][4] にログインし、ECS セクションに移動します。
2. Datadog Agent が実行しているクラスターを選択します。
3. **Tasks** タブをクリックし、Datadog Agent Container を含む**タスク定義**名をクリックします。
4. **Create new revision** ボタンをクリックし、**Add container** ボタンをクリックします。
5. **Container name**、**Image**、およびその他の環境設定を入力します。
6. **Docker labels** の下に以下を追加します。

| キー                           | 値                                           |
|-------------------------------|-------------------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": <PORT_NUMBER>}]` |
| com.datadoghq.ad.check_names  | `["<CHECK_NAME>"]`                              |
| com.datadoghq.ad.init_configs | `[{}]`                                          |

7. **Add** ボタンをクリックし、**Create** ボタンをクリックします。

### サービスを更新する

1. クラスター内で、**Services** タブをクリックし、**Service Name** をクリックします。
2. **Update** ボタンをクリックします。
3. **Task Definition** では、ドロップダウンメニューから最新の **Revision** を選択します。
4. **Next step** ボタンを 3 回クリックし、**Update Service** ボタンをクリックします。

### 検証

更新された **Task** が **RUNNING** ステータスを表示している場合、以下のページを使用して、Datadog に情報が報告されているかどうかを確認します。

- [Live Containers][5] でコンテナを表示します。
- [Metrics Explorer][6] でインテグレーションメトリクスを表示します。

## 例

{{< tabs >}}
{{% tab "Redis - Web UI" %}}
以下の表を参考に、Redis コンテナの [AWS Web Console][1] から Docker ラベルを入力します。

| キー                           | 値                                  |
|-------------------------------|----------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": 6379}]` |
| com.datadoghq.ad.check_names  | `["redisdb"]`                          |
| com.datadoghq.ad.init_configs | `[{}]`                                 |

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "Redis - AWS CLI" %}}
[AWS CLI ツール][1]から Redis コンテナを作成するには、`containerDefinitions` にある以下の JSON を使用します。

```json
{
  "name": "redis",
  "image": "redis:latest",
  "essential": true,
  "dockerLabels": {
    "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": 6379}]",
    "com.datadoghq.ad.check_names": "[\"redisdb\"]",
    "com.datadoghq.ad.init_configs": "[{}]"
  }
}
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/ecs_fargate/
[2]: /ja/agent/docker/integrations/?tab=dockerlabel#configuration
[3]: /ja/integrations/ecs_fargate/#container-agent-setup
[4]: https://aws.amazon.com/console
[5]: https://app.datadoghq.com/containers
[6]: https://app.datadoghq.com/metric/explorer
