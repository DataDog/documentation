---
title: Synthetics のトラブルシューティング
kind: documentation
description: Synthetics でよくある問題のトラブルシューティング。
further_reading:
  - link: synthetics/
    tag: ドキュメント
    text: Synthetics テストの管理
  - link: synthetics/browser_tests
    tag: ドキュメント
    text: ブラウザテストの設定
  - link: synthetics/api_tests
    tag: ドキュメント
    text: APIテストの設定
---
Datadog Synthetics のセットアップや構成で問題が発生した場合は、こちらの情報を参考にしてトラブルシューティングをお試しください。問題が解決されない場合は、[サポートチームまでお問い合わせ][1]ください。

## API テスト

### 稼働中エンドポイントでのリクエストの失敗

ブラウザでウェブサイトを訪問 (または cURL) すると、`2xx` ステータスコードが返されるため、エンドポイントが稼働中であることがわかります。しかし、速度テストを実施するためにこのエンドポイントで API テストを設定したり、`Test URL` を入力したりすると、`5xx` や `4xx` といったステータスコードが返されることがあります。

これは、cURL では `user-agent` が自動的にリクエストヘッダーとして (ブラウザとして) 設定されますが、Datadog API  テストでは自動的に設定されないためです。
一部のウェブサイトでは、`user-agent` が設定されていないリクエストを禁止するためこれが問題となり、Datadog API テストで `5xx` または `4xx` ステータスコードが返されることになります。

この問題を解決するには、API テストに `user-agent` を手動で設定します。API テストに `user-agent` を手動で設定するには、**Make a request** > **Advanced Options** > **Header** > **Request Header** の順に選択して、`user-agent` に **Name** を設定します。次に、`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9` など、Safari ブラウザを使用する Mac OS X ベースのコンピューターを示す有効な `user-agent`  値に **Value** を設定します。


{{< img src="synthetics/user-agent.gif" alt="Synthetics ホームページ" >}}

## API およびブラウザのテスト

### Forbidden エラー

Synthetics テストを作成する際、最初に `403 Forbidden` エラーが返されることがあります。これは、Datadog により自動的に送信される `Sec-Datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <テスト_ID>` ヘッダーから返されています。
このエラーを除去するには、このヘッダーがサーバーによってブラックリスト化されていないことを確認します。
さらに、Datadog サーバーが確実にインフラストラクチャーにリクエストを送信できるように、[Datadog Synthetics IP レンジ][2]をホワイトリスト化する必要がある場合もあります。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help
[2]: https://ip-ranges.datadoghq.com/synthetics.json