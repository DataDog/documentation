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

プライベートロケーションから、**内部用アプリケーションの監視**や、パブリックインターネットから接続できないプライベート URL の監視を行えます。これは以下にも使用できます。

プライベートロケーションは、次にも使用できます。

- ビジネスでミッションクリティカルな領域に、**カスタムロケーションを作成します**。
- [Synthetic CI/CD テスト][1]を使用して本番環境に新機能をリリースする前に、**内部テスト環境でアプリケーションパフォーマンスを確認します**。
- 内部ネットワークの内外から**アプリケーションのパフォーマンスを比較します**。

プライベートロケーションは、プライベートネットワーク内のどこででもインストールできる Docker コンテナです。[プライベートロケーションワーカーイメージ][2]には、Google Container Registry からアクセスできます。

プライベートロケーションを作成してインストールしたら、通常のロケーションと同じように、[Synthetic テスト][3]をプライベートロケーションに割り当てることができます。プライベートロケーションテストの結果は、管理ロケーションのテスト結果と同様に表示されます。

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Synthetic テストのプライベートロケーションへの割り当て" style="width:100%;">}}

## プライベートロケーションを作成する

1. [Docker][4] をマシンにインストールします。すばやく開始するには、Docker を [Vagrant Ubuntu 16.04][2] などの仮想マシンにインストールします。
2. Datadog サイトで **[UX Monitoring][5]** にカーソルを合わせ、**Settings** > **Private Locations** の順に選択します。
3. **Add Private Location** をクリックします。
4. プライベートロケーションの詳細を入力します (`Name` と `API key` フィールドのみが必須です)。プライベートロケーションをインストールした場所によっては (プロキシの後方など)、追加のパラメーターを構成する必要があります。詳しくは、[プライベートロケーションのコンフィギュレーションオプション][6]を参照してください。
5. **Save Location and Generate Configuration File** をクリックして、ワーカーのプライベートロケーションと関連付けられたコンフィギュレーションファイルを生成します。
6. プライベートロケーションコンフィギュレーションファイルをコピーして、作業ディレクトリに貼り付けます。

    **注**: コンフィギュレーションファイルには、プライベートロケーションの認証、テストコンフィギュレーションの復号、テスト結果の暗号といった秘密情報が含まれています。Datadog は秘密情報を保存しないため、**プライベートロケーション**のページを離れる前に、これらの情報をローカルに保存してください。**プライベートロケーションにワーカーをさらに追加するには、この秘密情報を再度参照できる必要があります。**

7. Docker の `run` コマンドと、上記で作成したコンフィギュレーションファイルを使用して、ワーカーを単独のコンテナとして起動します。

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

8. プライベートロケーションから Datadog への報告が正確なら、**Settings** の **Private Locations** リストに `OK` のヘルスステータスが表示されます。

    {{< img src="synthetics/private_locations/pl_health.png" alt="プライベートロケーション健全性" style="width:100%;">}}

    ターミナルでプライベートロケーションログも受信します。

    ```text
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:03 [info]: Fetching 10 messages from queue - 10 slots available
    2019-12-17 13:05:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```

管理ロケーションのように、新しいプライベートロケーションを使用して Synthetics テストを実行できます。

## プライベートロケーションで Synthetics テストを実行する

1. 監視する内部エンドポイントまたはアプリケーションに、[API テスト][2]、[マルチステップ API テスト][7]、または[ブラウザテスト][8]を作成します。
2. **Private Locations** で、新しいプライベートロケーションを選択します。

    {{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Synthetics テストのプライベートロケーションへの割り当て" style="width:100%;">}}

3. 引き続きテストの詳細を入力します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/cicd_testing
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[3]: /ja/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/list
[6]: /ja/synthetics/private_locations/configuration/#configuration-options
[7]: /ja/getting_started/synthetics/api_test#create-a-multistep-api-test
[8]: /ja/getting_started/synthetics/browser_test