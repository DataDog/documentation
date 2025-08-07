---
description: MongoDB Atlas 用 Database Monitoring をインストールして設定する
further_reading:
- link: /ja/integrations/mongo/
  tag: ドキュメント
  text: MongoDB 基本インテグレーション
title: MongoDB Atlas で Database Monitoring をセットアップする
---

Database Monitoring は、重要なメトリクス、スロー オペレーション、オペレーション サンプル、実行計画、レプリケーション状態変更へのアクセスを提供し、MongoDB データベースの包括的なインサイトを提供します。MongoDB で Database Monitoring を活用するには、Datadog Agent をインストールし、MongoDB Atlas インスタンスに接続するように設定してください。本ガイドでは MongoDB Atlas 用 Database Monitoring のセットアップ手順を説明します。

## 開始する前に

"サポートされている MongoDB メジャー バージョン
: 4.4, 5.0, 6.0, 7.0, 8.0"

サポートされている MongoDB Atlas クラスター ティア
: M10 以上<br/><br/>
**注**: MongoDB Atlas Serverless インスタンスまたは共有クラスター (M0 Sandbox, M2, M5) はサポートされていません。

{{% dbm-mongodb-before-you-begin %}}

## セットアップ

Database Monitoring をデータベースで有効にするには:

1. [MongoDB Atlas クラスターへの Datadog Agent のアクセスを付与](#grant-the-agent-access-to-your-mongodb-atlas-cluster)
2. [Agent のインストールと設定](#install-and-configure-the-agent)
3. [(任意) MongoDB Atlas インテグレーションのインストール](#install-the-mongodb-atlas-integration)

### Datadog Agent に MongoDB Atlas クラスターへのアクセスを付与する

統計情報とクエリを収集するため、Datadog Agent には MongoDB Atlas クラスターへの読み取り専用アクセスが必要です。

#### カスタム監視ロールを作成する

1. MongoDB Atlas UI で **Database Access** タブに移動します。
2. **Custom Roles** タブで **Add New Custom Role** をクリックします。
3. `datadog` などの **Custom Role Name** を入力します。
4. カスタム ロールに次の権限を追加します:
    - `admin` データベースに対する `read`
    - `local` データベースに対する `read`
    - `config` データベースに対する `read` (シャード クラスターのみ)
    - `admin` データベースに対する `clusterMonitor`
    - 監視対象のユーザー作成データベースに対する `read`、またはすべてのデータベースを監視する場合は `readAnyDatabase`
5. **Add Custom Role** をクリックします。

#### カスタム監視ロールで監視ユーザーを作成する

1. MongoDB Atlas UI で **Database Access** タブに移動します。
2. **Database Users** タブで **Add New Database User** をクリックします。
3. **Authentication Method** で **Password** を選択します。
4. ユーザー名とパスワードを入力します。
5. **Database User Privileges** で **Custom Roles** を展開し、前の手順で作成したカスタム監視ロールを選択します。
6. **Add User** をクリックします。
7. Agent の設定に使用できるよう、監視ユーザーのユーザー名とパスワードを控えておいてください。

### パスワードを安全に保管してください

{{% dbm-secret %}}

### Agent をインストールして設定する

MongoDB Atlas クラスターを監視するには、[リモート アクセス][1] 可能なホストに Datadog Agent をインストールして設定する必要があります。このホストは Linux ホスト、Docker コンテナ、または Kubernetes ポッドでかまいません。

#### SRV 接続文字列から MongoDB インスタンスごとのホスト名とポートを取得する

アプリケーションは通常、SRV 接続文字列を使用して MongoDB Atlas に接続しますが、Datadog Agent は監視対象の MongoDB インスタンスに直接接続する必要があります。Agent の実行中にフェイルオーバーやロード バランシングなどで別の MongoDB インスタンスに切り替わると、2 台のホスト間の統計差分を計算してしまい、メトリクスが不正確になります。

個々の MongoDB インスタンスのホスト名とポートを取得するには、Linux なら `dig`、Windows なら `nslookup` などのネットワーク ユーティリティ コマンド ライン ツールで SRV 接続文字列を解決します。

{{< tabs >}}
{{% tab "Replica Set" %}}

##### レプリカ セット メンバー

SRV 接続文字列 `mongodb+srv://XXXXX.XXX.mongodb.net/` を持つ非シャード (レプリカ セット) クラスターの場合:

Linux で `dig` を使用して SRV 接続文字列を解決します:

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

出力例:

{{< code-block lang="shell" >}}
0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Windows で `nslookup` を使用して SRV 接続文字列を解決します:

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

出力例:

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

この例では、レプリカ セットから取得した MongoDB インスタンス `<HOST>:<PORT>` は次のとおりです:

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

SRV 接続文字列から取得した `<HOST>:<PORT>` を Agent の設定に使用できます。
{{% /tab %}}
{{% tab "Sharded Cluster" %}}

##### mongos ルーター

SRV 接続文字列 `mongodb+srv://XXXXX.XXX.mongodb.net/` を持つシャード クラスターの場合:

Linux で `dig` を使用して SRV 接続文字列を解決します:

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

出力例:

{{< code-block lang="shell" >}}
0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Windows で `nslookup` を使用して SRV 接続文字列を解決します:

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

出力例:

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

この例では、`mongos` ルーターは次のとおりです:

-   `XXXXX-00-00.4zh9o.mongodb.net:27016`
-   `XXXXX-00-01.4zh9o.mongodb.net:27016`
-   `XXXXX-00-02.4zh9o.mongodb.net:27016`.

SRV 接続文字列から取得した `<HOST>:<PORT>` を Agent の設定に使用できます。

##### シャード メンバー

各シャードの MongoDB インスタンスを取得するには、`mongos` ルーターに接続して次のコマンドを実行します:

{{< code-block lang="shell" >}}
use admin
db.runCommand("getShardMap")
{{< /code-block >}}

出力例:

{{< code-block lang="shell" >}}
{
"map" : {
"shard-0": "shard-0/XXXXX-00-00.4zh9o.mongodb.net:27017,XXXXX-00-01.4zh9o.mongodb.net:27017,XXXXX-00-02.4zh9o.mongodb.net:27017",
"shard-1": "shard-1/XXXXX-01-00.4zh9o.mongodb.net:27017,XXXXX-01-01.4zh9o.mongodb.net:27017,XXXXX-01-02.4zh9o.mongodb.net:27017"
},
"hosts": {
"XXXXX-00-00.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-00-01.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-00-02.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-01-00.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-01-01.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-01-02.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-00-00-config.4zh9o.mongodb.net:27017": "config",
"XXXXX-00-01-config.4zh9o.mongodb.net:27017": "config",
"XXXXX-00-02-config.4zh9o.mongodb.net:27017": "config"
},
"ok" : 1
}
{{< /code-block >}}

この例では、shard‑0 の MongoDB インスタンスは次のとおりです:

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

shard‑1 の場合:

-   `XXXXX-01-00.4zh9o.mongodb.net:27017`
-   `XXXXX-01-01.4zh9o.mongodb.net:27017`
-   `XXXXX-01-02.4zh9o.mongodb.net:27017`

config サーバーの場合:

-   `XXXXX-00-00-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02-config.4zh9o.mongodb.net:27017`

これらのホスト名のいずれかを Agent の設定に使用できます。
{{% /tab %}}
{{< /tabs >}}

#### 構成ファイルを作成する

{{< tabs >}}
{{% tab "Replica Set" %}}
{{% dbm-mongodb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "Sharded Cluster" %}}
{{% dbm-mongodb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

#### Agent をセットアップする

{{< tabs >}}
{{% tab "Linux Host" %}}
{{% dbm-mongodb-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

### MongoDB Atlas インテグレーションをインストールする

MongoDB Atlas からより包括的なデータベース メトリクスを収集するには、[MongoDB Atlas インテグレーション][3] をインストールしてください (任意)。

## 収集データ

### メトリクス

MongoDB インテグレーションが収集するメトリクスの包括的な一覧については、[MongoDB インテグレーション ドキュメント][4] を参照してください。

{{% dbm-mongodb-agent-data-collected %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/database_monitoring/architecture/#cloud-managed-databases
[2]: /ja/account_management/api-app-keys/
[3]: /ja/integrations/mongodb_atlas/
[4]: /ja/integrations/mongodb_atlas/#metrics