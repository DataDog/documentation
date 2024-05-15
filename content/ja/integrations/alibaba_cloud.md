---
categories:
- cloud
dependencies: []
description: Alibaba Cloud サービスを Datadog と統合
doc_link: https://docs.datadoghq.com/integrations/alibaba_cloud/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-alibaba-cloud-datadog/
  tag: ブログ
  text: Alibaba Cloud を Datadog で監視
git_integration_title: alibaba_cloud
has_logo: true
integration_id: alibaba-cloud
integration_title: Alibaba Cloud
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: alibaba_cloud
public_title: Datadog-Alibaba Cloud インテグレーション
short_description: Alibaba Cloud サービスを Datadog と統合
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog Alibaba Cloud インテグレーションは、政府関係のサイトに対する Datadog の使用をサポートしていません。</div>
{{< /site-region >}}

## 概要

Alibaba Cloud に接続して、以下からメトリクスを取得します。

- Alibaba Cloud Servers Load Balancer (SLB)
- Alibaba Elastic Compute Service インスタンス
- Alibaba Cloud ApsaraDB for RDS インスタンス
- Alibaba Cloud ApsaraDB for Redis インスタンス
- Alibaba Cloud Content Delivery Network (CDN) インスタンス
- Alibaba Cloud Container Service クラスター
- Alibaba Cloud Express Connect インスタンス

## セットアップ

### インストール

[Datadog-Alibaba Cloud インテグレーションコンフィギュレーションタイル][1]に移動し、_add account_ を押します。

### コンフィギュレーション

Datadog を Alibaba Cloud API と統合するには、以下のパラメーターを入力します。

- **`Account Id`**

これを見つけるには、Alibaba Cloud コンソールの右上にあるアバターの上にカーソルを置き、_Security Settings_ を選択します。アカウント ID がこのページの上部に表示されます。

{{< img src="integrations/alibaba_cloud/account_id_ac.png" alt="アカウント ID AC" style="width:30%;">}}

- **`Access Key Id`** と **`Access Key Secret`**

Alibaba Cloud のアカウントで

1. _RAM_ タブで、以下のようにパラメーターを指定して新しいユーザーを作成します。

    - `Logon Name`: Datadog
    - `display name`: Datadog
    - `description`: Datadog-Alibaba Cloud インテグレーションの Datadog ユーザー

2. _Programmatic Access_ を選択:

    {{< img src="integrations/alibaba_cloud/ac_programmatic_access.png" alt="Programmatic access" style="width:40%;">}}

3. _OK_ をクリックしたら、`AccessKeyID` と `AccessKeySecret` をコピーして [Datadog-Alibaba Cloud インテグレーションタイル][1]に貼り付け、_install integration_ をクリックします。

    {{< img src="integrations/alibaba_cloud/ac_access_keys.png" alt="AC アクセスキー" style="width:40%;">}}

4. Alibaba Cloud アカウントで、作成したユーザーに対して `Add Permissions` を選択し、以下のアクセス許可をすべて追加します。

    ```text
    AliyunCloudMonitorReadOnlyAccess
    AliyunECSReadOnlyAccess
    AliyunKvstoreReadOnlyAccess
    AliyunRDSReadOnlyAccess
    AliyunSLBReadOnlyAccess
    AliyunCDNReadOnlyAccess
    AliyunCSReadOnlyAccess
    AliyunExpressConnectReadOnlyAccess
    ```

5. _Update_ を押すと、約 15 分後に、Datadog-Alibaba Cloud インテグレーションタイルの _Metrics_ タブに表示されているメトリクスが、以下のリソースやタグに追加したカスタムタグでタグ付けされて、[メトリクスエクスプローラーページ][2]に表示され始めます。

    - [kvstore/redis DescribeInstances][3]
    - [ECS DescribeInstances][4]
    - [DescribeDBInstances][5]
    - [DescribeLoadBalancers][6]

6. オプション - [Datadog-Alibaba Cloud インテグレーションタイル][1]で、`Optionally Limit Metrics Collection` を設定します。この Alibaba Cloud タグのカンマ区切りリスト (`<KEY:VALUE>` 形式) は、Alibaba Cloud からメトリクスを収集する際に使用するフィルターを定義します。`?` (1 文字の場合) や `*` (複数文字の場合) などのワイルドカードを使用できます。定義されたラベルのいずれかに一致するホストだけが Datadog にインポートされ、それ以外は無視されます。ラベルの前に `!` を追加することで、指定されたラベルに一致するホストを除外することもできます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "alibaba_cloud" >}}


### イベント

Alibaba Cloud のイベントは、Alibaba Cloud サービスごとに収集されます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/alibaba_cloud
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://www.alibabacloud.com/help/doc-detail/60933.htm
[4]: https://www.alibabacloud.com/help/doc-detail/25506.htm
[5]: https://www.alibabacloud.com/help/doc-detail/26232.htm
[6]: https://www.alibabacloud.com/help/doc-detail/27582.htm
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/alibaba_cloud/alibaba_cloud_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/