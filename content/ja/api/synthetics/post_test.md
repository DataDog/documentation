---
title: テストの作成
type: apicontent
order: 29.1
external_redirect: '/api/#create-tests'
---
## テストの作成

Datadog からお客様の API エンドポイントまたはブラウザアプリに送信するテストを始動および構成するための Synthetics テストを作成します。テスト対象のエンドポイント、テストの回数、およびテストの送信元を構成することができます。必要なパラメーターは API テストとブラウザテストで異なり、それに応じてマークされています。**required** とマークされたパラメーターは、両方のテストに必要です。作成したテストは、UI の [Synthetics リスト][1]に表示されます。

ブラウザテストは GET API テストと同様に処理されます。この方法でブラウザテストを作成できますが、[テストを記録する][2]には UI を使用する必要があります。

##### 引数

*   **`assertions`** - 必須 - テストに合格したと見なせる状態を正確に定義する場所です。各アサーションは、`type`、`operator`、`target` のほかに、1 つの `property` を持つことがあります。
    *   **`type`** - API テストで必須 - 評価する応答の部分。有効なタイプは、`header`、`body`、`responseTime`、および `statusCode` です。ヘッダーを定義する際は、`property` パラメーターでヘッダーパラメーターキーを指定し、`target` パラメーターでヘッダーパラメーター値を指定する必要があります。他のタイプでは、`target` を使用して本文、応答時間、およびエラーメッセージを指定します。たとえば、`"type":"statusCode"` に対して `"target":403` になります。
    *   **`operator`** - API テストで必須 - ターゲットと、応答からの実際の値を比較する方法を定義します。有効な演算子はアサーションの `type` に依存します。以下に、タイプ別の有効な演算子をリストします。

<table>
 <tr>
    <th><code>type</code></th>
    <th>有効な <code>operator</code></th>
    <th>値の型</th>
  </tr>
  <tr>
    <td>statusCode</td>
    <td><code>is</code>、<code>is not</code></td>
    <td>整数</td>
  </tr>
  <tr>
    <td>responseTime</td>
    <td><code>lessThan</code></td>
    <td>整数</td>
  </tr>
  <tr>
    <td>headers</td>
    <td><code>contains</code>、<code>does not contain</code>、<code>is</code>、<code>is not</code>、<code>matches</code>、<code>does not match</code></td>
    <td><code>contains</code>/<code>does not contain</code>/<code>is</code>/<code>is not</code> の場合は文字列、<code>matches</code>/<code>does not match</code> の場合は <a href="https://docs.datadoghq.com/tagging/using_tags">RegexString</a></td>
  </tr>
  <tr>
    <td>body</td>
    <td><code>contains</code>、<code>does not contain</code>、<code>is</code>、<code>is not</code>、<code>matches</code>、<code>does not match</code></td>
    <td><code>contains</code>/<code>does not contain</code>/<code>is</code>/<code>is not</code> の場合は文字列、<code>matches</code>/<code>does not match</code> の場合は <a href="https://docs.datadoghq.com/tagging/using_tags">RegexString</a></td>
  </tr>
</table>

   *   **`target`** - API テストで必須 - アサーションに対して期待される値。`header` の場合、有効な値は、`property` で定義されたヘッダーキーに対する有効な値のいずれかです。`statusCode` の場合、有効な値は有効なステータスコードです。`responseTime` の場合、有効な値は期待される応答時間です。
   *   **`property`** - オプション - `type` を `header` に設定する場合は、これを使用してヘッダーのパラメーターキーを定義する必要があります。有効な値は、`Content-Type` や `Authorization` などのヘッダーキーです。
*   **`request`** - API テストで必須 - エンドポイントに対するリクエストの実行に必要な情報をすべて含むオブジェクト。
   *   **`method`** - 必須 - テストする API のメソッド。有効な値は、`GET`、`POST`、`PUT`、`PATCH`、および `DELETE` です。ブラウザテストの場合は `GET` を使用します。
   *   **`url`** - 必須 - Datadog がテストする API のエンドポイント。ブラウザテストの場合は、Datadog がテストする Web サイトの URL。
   *   **`timeout`** - オプション - API リクエストがいつタイムアウトするか。
   *   **`headers`** - オプション - API リクエストのヘッダー。
   *   **`body`** - _オプション_ - API リクエストの本文。テキスト文字列を受け取ります (JSON テキスト文字列など)。`headers` パラメーターで、`Content-Type` `property` パラメーターと `application/json`、`text/plain` などを使用してタイプを指定します。
*   **`locations`** - 必須 - テストの送信元になる場所のリスト。少なくとも 1 つの値が必要で、すべての場所を使用できます。有効な場所のリストについては、`使用可能な場所の取得`メソッドを使用してください。
*   **`message`** - 必須 - テストの説明。
*   **`name`** - 必須 - テストの一意の名前。
*   **`options`** - 必須 - 高度なオプションを使用します。カスタムリクエストヘッダー、認証資格情報、本文コンテンツ、cookie を指定したり、リダイレクトされるままテストを行ったりすることができます。値が指定されないオプションパラメーターはすべてデフォルト値を取ります。リクエストオブジェクトで有効な値は次のとおりです。
    *  ** `tick_every`:** - 必須 - どのくらいの頻度でテストを実行するか (秒単位。現在使用できる値は 60、300、900、1800、3600、21600、43200、86400、604800)。
    *  **`min_failure_duration`** - オプション - どのくらいの時間テストが失敗するとアラートになるか (整数の秒数。最大値は 7200)。デフォルトは 0 です。
    *  **`min_location_failed`** - オプション -`min_failure_duration` 期間の少なくともある瞬間に少なくとも何個の場所が同時に失敗する必要があるか (min_location_failed および min_failure_duration は、高度なアラート規則の一部です。- 1 以上の整数)。デフォルトは 1 です。
    *  **`follow_redirects`** - オプション - ブール値 - リダイレクトに従うかどうか (最大 10 回のリダイレクトに従い、それを超えると「Too many redirects」エラーをトリガーします)。有効な値は `true` または `false` です。デフォルト値は `false` です。
    *  **`device_ids`** - ブラウザテストで必須 - テストに使用するデバイスの種類。使用できるデバイスのリストを取得するには、`ブラウザチェック用デバイスの取得`メソッドを使用し、その応答に含まれる `id` を使用します。少なくとも 1 つのデバイスが必要です。
*   **`tags`** - オプション - Datadog でテストを表示する際に、テストを絞り込むために使用するタグ。カスタムタグの詳細については、[タグの使用方法][3]を参照してください。
*   **`type`** - 必須 - テストの種類。有効な値は `api` と `browser` です。

[1]: https://app.datadoghq.com/synthetics/list
[2]: /ja/synthetics/browser_tests/#record-test
[3]: /ja/tagging/using_tags