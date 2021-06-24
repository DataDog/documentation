---
title: プライベートロケーションの概要
kind: documentation
further_reading:
  - link: /getting_started/synthetics/api_test
    tag: ドキュメント
    text: 初めての API テストを作成する
  - link: /getting_started/synthetics/browser_test
    tag: ドキュメント
    text: 初めてのブラウザテストを作成する
  - link: /synthetics/private_locations
    tag: Documentation
    text: プライベートロケーションの詳細
---
<div class="alert alert-warning">
この機能へのアクセスは制限されています。アクセス権をお持ちではない場合、<a href="https://docs.datadoghq.com/help/">Datadog サポートチーム</a>にお問い合わせください。
</div>

## 概要

プライベートロケーションから、**内部用アプリケーションの監視や、パブリックインターネットから接続できないプライベート URL の監視**を行えます。これは以下にも使用できます。

* ビジネスでミッションクリティカルな領域に、**カスタムロケーションを作成します**。
* [Synthetic CI テストインテグレーション][1]を使用して本番環境に新機能をリリースする前に、**内部 CI 環境でアプリケーションパフォーマンスを確認します**。
* 内部ネットワークの内外両方から**アプリケーションのパフォーマンスを比較します**。

プライベートロケーションは、プライベートネットワーク内のどこにでもインストールできる Docker コンテナとして提供されます。作成してインストールしたら、通常の管理ロケーションと同じように、[Synthetic テスト][2]をプライベートロケーションに割り当てることができます。

プライベートロケーションワーカーは、HTTPS を使用してテストコンフィギュレーションを Datadog のサーバーからプルし、スケジュールまたはオンデマンドでテストを実行して、テスト結果を Datadog のサーバーに返します。次に、管理ロケーションから実行されているテストを視覚化する方法とまったく同じ方法で、プライベートロケーションのテスト結果を視覚化できます。

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Synthetics テストをプライベートロケーションに割り当てる"  style="width:100%;">}}

プライベートロケーションワーカーは Docker Hub で利用可能です:

| Docker Hub                                                                |
|---------------------------------------------------------------------------|
| [hub.docker.com/r/datadog/synthetics-private-location-worker][3]          |

## プライベートロケーションを作成する

1. [Vagrant Ubuntu 16.04 仮想マシン][2]をセットアップします。
2. マシンに [Docker][4] をインストールします。
3. Datadog アプリで、**[UX Monitoring][5]** にカーソルを合わせ、*Settings* -> *Private Locations* の順に選択します。**Add Private Location** をクリックします。
4. プライベートロケーションの詳細を入力します (`Name` と `API key` フィールドのみが必須です)。**Save Location and Generate Configuration File** をクリックして、ワーカーのプライベートロケーションに関連付けられたコンフィギュレーションファイルを生成します。
5. プライベートロケーションと Datadog 間のトラフィックがプロキシを経由する必要がある場合は、プロキシ URL を指定します。オプションで **Block reserved IPs** ボタンを切り替えて、予約済み IP 範囲のデフォルトセットをブロックすることもできます ([IPv4 アドレスレジストリ][6]および [IPv6 アドレスレジストリ][7])。
6. プライベートロケーションコンフィギュレーションファイルをコピーして、作業ディレクトリに貼り付けます。

    **注**: コンフィギュレーションファイルには、プライベートロケーションの認証、テストコンフィギュレーションの復号、テスト結果の暗号といった秘密情報が含まれています。Datadog は秘密情報を保存しないため、プライベートロケーション画面を離れる前に、これらの情報をローカルに保存してください。**ワーカーをさらに追加する場合、または別のホストにワーカーをインストールする場合は、これらの秘密情報を再度参照できる必要があります。**

7. 所定の Docker 実行コマンドと、上記で作成したコンフィギュレーションファイルを使用して、ワーカーを単独のコンテナとして起動します。

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

8. プライベートロケーションから Datadog への報告が正確なら、**Settings** セクションのプライベートロケーションのリストに `OK` のヘルスステータスが表示されます。

    {{< img src="synthetics/private_locations/pl_health.png" alt="プライベートロケーション健全性"  style="width:100%;">}}

   また、次の例のようにプライベートロケーションログが表示されます。

    ```text
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```

これで、他の Datadog 管理ロケーション同様、Synthetics テストを実行するために新しいプライベートロケーションを利用できます。

## プライベートロケーションで Synthetics テストを実行する

1. 監視する内部エンドポイントまたはアプリケーションに API またはブラウザを作成します。
2. **Private Locations** で新しいプライベートロケーションを選択します。

    {{< img src="synthetics/private_locations/assign_test_pl.png" alt="Synthetics テストをプライベートロケーションに割り当てる"  style="width:75%;">}}

3. テストを作成しましょう！

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/synthetics/api_test/
[2]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[3]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/list
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml