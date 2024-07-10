---
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: ブログ
  text: Datadog で Synthetic プライベートロケーションを監視する
- link: /getting_started/synthetics/api_test
  tag: ドキュメント
  text: 初めての API テストを作成する
- link: /getting_started/synthetics/browser_test
  tag: Documentation
  text: 初めてのブラウザテストを作成する
- link: /synthetics/private_locations
  tag: ドキュメント
  text: プライベートロケーションの詳細
title: プライベートロケーションの概要
---

<div class="alert alert-info">
Windows プライベートロケーションベータ版への追加をご希望の場合は、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>にご連絡ください。
</div>

## 概要

プライベートロケーションから、**内部用アプリケーションの監視**や、パブリックインターネットから接続できないプライベート URL の監視を行えます。これは以下にも使用できます。

{{< img src="getting_started/synthetics/pl-list.png" alt="設定画面のプライベートロケーションの一覧" style="width:100%;">}}

プライベートロケーションは、次にも使用できます。

- ビジネスでミッションクリティカルな領域に、**カスタムロケーションを作成します**。
- [CI/CD パイプラインでの Synthetic テスト][1]を使用して本番環境に新機能をリリースする前に、**内部テスト環境でアプリケーションパフォーマンスを確認します**。
- 内部ネットワークの内外から**アプリケーションのパフォーマンスを比較します**。

プライベートロケーションは、プライベートネットワーク内のどこででもインストールできる Docker コンテナです。[プライベートロケーションワーカーイメージ][2]には、Google Container Registry からアクセスできます。

プライベートロケーションを作成してインストールしたら、通常のロケーションと同じように、[Synthetic テスト][3]をプライベートロケーションに割り当てることができます。

プライベートロケーションテストの結果は、管理ロケーションのテスト結果と同様に表示されます。

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Synthetic テストのプライベートロケーションへの割り当て" style="width:100%;">}}

## プライベートロケーションを作成する

1. Unix 系マシンに [Docker][4] をインストールするか、[Podman][10] などの他のコンテナランタイムを使用します。

   すばやく開始するには、Docker を [Vagrant Ubuntu 22.04][11] などの仮想マシンにインストールします。

2. Datadog サイトで **[UX Monitoring][5]** にカーソルを合わせ、**Settings** > **Private Locations** の順に選択します。
3. **Add Private Location** をクリックします。
4. プライベートロケーションの詳細を入力します。`Name` と `API key` フィールドのみが必須です。
5. **Save Location and Generate Configuration File** をクリックして、ワーカーのプライベートロケーションと関連付けられたコンフィギュレーションファイルを生成します。
6. プライベートロケーションをインストールした場所によっては、コンフィギュレーションファイルに追加のパラメーターを入力する必要があります。
    - プロキシをご利用の場合は、URL を`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` のように入力します。
    - 予約した IP をブロックする場合は、**Block reserved IPs** を切り替えて、IP 範囲を入力します。

    詳しくは、[プライベートロケーションの構成オプション][6]、[プライベートロケーションからの Synthetic テストの実行][7]をご覧ください。

7. プライベートロケーションコンフィギュレーションファイルをコピーして、作業ディレクトリに貼り付けます。

    **注**: コンフィギュレーションファイルには、プライベートロケーションの認証、テストコンフィギュレーションの復号、テスト結果の暗号といった秘密情報が含まれています。Datadog は秘密情報を保存しないため、**プライベートロケーション**作成フォームを離れる前に、これらの情報をローカルに保存してください。**プライベートロケーションにワーカーをさらに追加するには、この秘密情報を再度参照できる必要があります。**
8. 準備ができたら、**View Installation Instructions** をクリックします。
9. プライベートロケーションワーカーを実行したい環境に応じて、インストール手順に従います。
10. Docker を使っている場合、Docker の `run` コマンドとコンフィギュレーションファイルを使って、ワーカーをスタンドアロンコンテナとして起動します。

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

    このコマンドは、Docker コンテナを起動し、テストを実行するためのプライベートロケーションを準備します。Datadog は、適切な再起動ポリシーでコンテナをデタッチドモードで実行することを推奨しています。

    <div class="alert alert-info">Podman などの他のコンテナランタイムを使用することができます。詳しくは、<a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#install-your-private-location">プライベートロケーションのドキュメント</a>をご覧ください。</div>

11. プライベートロケーションが Datadog に正しく報告されている場合、ヘルスステータスが **Private Location Status** と **Settings** ページの **Private Locations** リストに `OK` と表示されます。

    {{< img src="synthetics/private_locations/pl_health.png" alt="プライベートロケーション健全性" style="width:100%;">}}

    さらに、端末でプライベートロケーションのログを確認することができます。

    ```text
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```
12. 内部エンドポイントのテストが完了したら、**OK** をクリックします。



## プライベートロケーションで Synthetics テストを実行する

管理ロケーションのように、新しいプライベートロケーションを Synthetics テストで使用します。

1. 監視する内部エンドポイントまたはアプリケーションに、[API テスト][2]、[マルチステップ API テスト][8]、または[ブラウザテスト][9]を作成します。
2. **Private Locations** で、新しいプライベートロケーションを選択します。

    {{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="Synthetics テストのプライベートロケーションへの割り当て" style="width:100%;">}}

3. 引き続きテストの詳細を入力します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_testing/cicd_integrations
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[3]: /ja/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/list
[6]: /ja/synthetics/private_locations/configuration/#configuration-options
[7]: /ja/synthetics/private_locations/?tab=docker#blocking-reserved-ips
[8]: /ja/getting_started/synthetics/api_test#create-a-multistep-api-test
[9]: /ja/getting_started/synthetics/browser_test
[10]: https://podman.io/
[11]: https://app.vagrantup.com/ubuntu/boxes/jammy64