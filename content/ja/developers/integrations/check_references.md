---
description: Learn about the various assets that need to be included when preparing a Datadog integration.
further_reading:
- link: "https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md"
  tag: ソースコード
  text: Contributing Guidelines for the Documentation Site
- link: /developers/integrations/
  tag: Documentation
  text: Learn about creating an Agent or API-based integration
- link: /developers/integrations/oauth_for_integrations/
  tag: Documentation
  text: Learn about using OAuth for integrations
title: Integration Assets Reference
---
## 概要

このページでは、[** Integrations** ページ][12]または [**Marketplace** ページ][9]で製品を作成するために入力する必要があるファイルについて説明します。

## 構成ファイル

新しいインテグレーションを用意する際は、必要なオプションと適正なデフォルトを設定したコンフィギュレーションサンプルを追加する必要があります。この例のサンプルコンフィギュレーションファイルは `<チェック名>/datadog_checks/<チェック名>/data/conf.yaml.example` にあり、`init_config` と `instances` という 2 つのトップレベル要素を持っています。

`init_config` 下のコンフィギュレーションはインテグレーションにグローバルに適用され、インテグレーションのすべてのインスタンスで使用されます。一方、`instances` 内のコンフィギュレーションは特定のインスタンスに適用されます。

どちらのセクションの構成ブロックも次の形式になります。

```yaml
## @<COMMAND> [- <ARGS>]
## <DESCRIPTION LINE 1>
## <DESCRIPTION LINE 2>
#
<KEY>: <VALUE>
```

構成ブロックは以下のガイドラインに従います。

- 説明を空にすることはできません。
- プレースホルダーは常に `<THIS_IS_A_PLACEHOLDER>` のフォーマットに従ってください。詳しくは、[ドキュメントサイトの寄稿ガイドライン][1]を参照してください。
- すべての必須パラメーターはデフォルトでコメントに**されません**。
- すべてのオプションパラメーターはデフォルトでコメントにされます。
- プレースホルダーにインテグレーションのデフォルト値がある場合 (たとえば、インテグレーションのステータスエンドポイント)、それを汎用プレースホルダーの代わりに使用できます。

### `@param` の指定

`@param` コマンドは、構成ブロックを記述し、構成のドキュメントを提供するために使用することができます。

`param` は、以下のいずれかの形式で実装されます。

```text
@param <name> - <type> - 必須
@param <name> - <type> - オプション
@param <name> - <type> - オプション - デフォルト: <defval>
```

**引数**:

- `name`: パラメーターの名前。例: `search_string` (必須)。
- `type`: パラメーター値のデータタイプ (必須)。
          Possible values include the following: _boolean_, _string_, _integer_, _double_, _float_, _dictionary_, _list\*_, and _object\*_.
- `defval`: パラメーターのデフォルト値。空でもかまいません (オプション)。

`list` および `object` 変数は複数行にまたがり、特別な規則があります。

- `list` の個々の要素は、`@param` 指定を使用して文書化されません。
- `object` の場合は、`@param` 指定を使用して要素を個別に文書化することも、オブジェクト自体の指定に続けてトップレベルに共通の説明を付けることもできます。

### オプションパラメーター

オプションパラメーターはデフォルトでコメントにする必要があります。パラメーターの記述に使用される各行の前に、`@param` 指定と同じインデントで `#` を追加します。

### ブロックコメント

次の規則に従って、構成ファイルの任意の場所にブロックコメントを追加できます。

- コメントは `##` で開始されます。
- コメントは変数と同様にインデントされます (ハイフンはカウントされません)。

YAML 構文についての詳細は、[YAMLに関する Wikipedia の記事][2]を参照してください。また、[Online YAML Parser][3] を調べることもできます。

## マニフェストファイル

[**Integrations** ページ][4]または [**Marketplace** ページ][11]にあるすべての製品には、動作パラメーター、より大きなDatadog インテグレーションエコシステム内での位置づけ、追加のメタデータを定義する `manifest.json` ファイルがあります。

{{% integration-assets-reference %}}

### 分類子タグ

`classifier_tags` パラメーターを使用して、複数のカテゴリーを設定し、インテグレーションに送信またはクエリされるデータタイプを定義することができます。

`manifest.json` ファイルに対する分類子タグの完全なリストは、以下の通りです。

{{% integration_categories %}}

## サービスチェックファイル

`service_check.json` ファイルは、インテグレーションによって作成されたサービスチェックを記述します。

`service_checks.json` ファイルの必須属性の完全なリストは、以下の通りです。

| 属性       | 説明                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `agent_version` | サポートされている Agent の最小バージョン。                                                                                           |
| `integration`   | このサービスチェックを送信するインテグレーションの名前。これは、`manifest.json` にある正規化されていない `tile.title` です。   |
| `check`         | サービスチェックの名前。一意である必要があります。                                                                              |
| `statuses`      | チェックのさまざまなステータスのリスト。`ok`、`warning`、`critical` から選択します。`unknown` も可能です。   |
| `groups`        | サービスチェックと共に送信される[タグ][8]。                                                                                     |
| `name`          | サービスチェックの表示名。表示名はわかりやすく、すべてのインテグレーションで一意である必要があります。       |
| `description`   | サービスチェックの説明。                                                                                           |


## メトリクスメタデータファイル

`metadata.csv` ファイルには、インテグレーションが収集できるすべてのメトリクスが記述されます。

以下に、`metadata.csv` ファイルの必須属性とオプション属性の完全なリストを示します。

| 列名     | 必須またはオプション | 説明                                                                                                                                                                                                                                                                                                                             |
| --------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metric_name`   | 必須          | メトリクスの名前。                                                                                                                                                                                                                                                                                                                     |
| `metric_type`   | 必須          | メトリクスのタイプ。利用可能なメトリクス送信タイプの一覧は、[メトリクスタイプ][6]を参照してください。                                                                                                                                                                                                                                                                                                                |
| `interval`      | オプション           | メトリクスの収集間隔 (秒単位)。                                                                                                                                                                                                                                                                                            |
| `unit_name`     | オプション           | メトリクスの単位。対応する単位の一覧は、[メトリクスの単位][7]を参照してください。                                                                                                                                                                                                                                                                              |
| `per_unit_name` | オプション           | 単位の下位区分がある場合。`request per second` (1 秒あたりのリクエスト) など。                                                                                                                                                                                                                                                                               |
| `description`   | オプション           | メトリクスの説明。                                                                                                                                                                                                                                                                                                              |
| `orientation`   | 必須          | `myapp.turnover` のように、大きい方がよいメトリクスの場合は `1` に設定します。メトリクスの変動が特に重要でない場合は `0` に設定します。`myapp.latency` のように、小さい方がよいメトリクスの場合は `-1` に設定します。                                                                                                                                                         |
| `integration`   | 必須          | メトリクスを送信するインテグレーションの名前。これは、`manifest.json` ファイルにある `tile.title` を正規化した文字列です。文字、アンダースコア、ダッシュ、数字以外の文字はアンダースコアに変換されます。例: `Openstack Controller` -> `openstack_controller`、`ASP.NET` -> `asp_net`、`CRI-o` -> `cri-o`。 |
| `short_name`    | 必須          | メトリクスの明示的な一意の ID。                                                                                                                                                                                                                                                                                                      |
| `curated_metric`| オプション           | インテグレーションのためのどのメトリクスが、与えられたタイプで注目すべきかをマークします (`cpu`と`memory`の両方が受け入れられる)。これらは、UI で他のインテグレーションメトリクスの上に表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/documentation/blob/master/CONTRIBUTING.md#code-substitution
[2]: https://en.wikipedia.org/wiki/YAML
[3]: http://yaml-online-parser.appspot.com/
[4]: https://docs.datadoghq.com/integrations/
[5]: https://www.uuidgenerator.net
[6]: https://docs.datadoghq.com/metrics/types/#metric-types
[7]: https://docs.datadoghq.com/metrics/units/#unit-list
[8]: https://docs.datadoghq.com/getting_started/tagging/
[9]: https://app.datadoghq.com/marketplace/
[10]: https://docs.datadoghq.com/developers/datadog_apps/
[11]: https://docs.datadoghq.com/developers/integrations/marketplace_offering
[12]: https://app.datadoghq.com/integrations
