---
description: プライベートロケーションを設定して、内部アプリケーションやプライベート URL を監視します。ミッションクリティカルな領域や内部テスト環境用にカスタムロケーションを作成します。
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: ブログ
  text: Datadog で Synthetic プライベートロケーションを監視する
- link: /synthetics/private_locations
  tag: ドキュメント
  text: プライベートロケーションの詳細
- link: /synthetics/guide/kerberos-authentication/
  tag: ガイド
  text: Synthetic Monitoring の Kerberos 認証
title: プライベートロケーションの概要
---
## 概要 {#overview}

プライベートロケーションを使用すると、**内部用アプリケーションの監視**や、パブリックインターネットからアクセスできないプライベート URL の監視を行えます。

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Synthetic Monitoring におけるプライベートロケーションの仕組みを示すアーキテクチャ図" style="width:100%;">}}

プライベートロケーションを使用すると、以下も可能です。

ビジネスのミッションクリティカルな領域に- **カスタムロケーションを作成**します。
[CI/CD パイプラインでの Synthetic テスト][1]を使用して新機能を本番環境にリリースする前に、- **内部テスト環境でのアプリケーションパフォーマンスを検証**します。
内部ネットワークの内側と外側から- **アプリケーションパフォーマンスを比較**します。
Windows ベースの内部サイトや内部 API で、- **[Kerberos SSO を使用して Synthetic Monitoring テストを認証します][16]**。

プライベートロケーションは、プライベートネットワーク内の任意の場所にインストールできる Docker コンテナまたは Windows サービスです。[Docker Hub][2] で Docker イメージを取得するか、[Windows インストーラー][13]をダウンロードします。**\*** 

**注**: Docker コンテナ上のプライベートロケーションは、amd64 アーキテクチャでのみサポートされています。arm64 のサポートについてご質問がある場合は、[Datadog サポート][15]までお問い合わせください。

**\*** **このソフトウェアの使用および操作には、[こちら][14]から入手可能なエンドユーザーライセンス契約が適用されます。**

プライベートロケーションを作成してインストールしたら、管理ロケーションと同様に、[Synthetic テスト][3]をプライベートロケーションに割り当てることができます。

プライベートロケーションのテスト結果は、管理ロケーションのテスト結果と同じ形式で表示されます。

{{< img src="synthetics/private_locations/test_results_pl.png" alt="Synthetic テストをプライベートロケーションに割り当てる" style="width:100%;">}}

## プライベートロケーションを作成する {#create-your-private-location}

1. Datadog サイトで、{{< ui >}}Digital Experience{{< /ui >}} にカーソルを合わせ、{{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Private Locations{{< /ui >}}][5] を選択します。
2. {{< ui >}}Add Private Location{{< /ui >}} をクリックします。
3. プライベートロケーションの詳細を入力します。{{< ui >}}Name{{< /ui >}} と {{< ui >}}API key{{< /ui >}} のフィールドのみが必須です。
4. ワーカー上でプライベートロケーションに関連付けられた構成ファイルを生成するには、{{< ui >}}Save Location and Generate Configuration File{{< /ui >}} をクリックします。
5. プライベートロケーションをインストールした場所によっては、構成ファイルに追加のパラメータを入力しなければならない場合があります。
    - プロキシを使用している場合は、URL を `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` として入力します。
    - {{< ui >}}Block reserved IPs{{< /ui >}} はデフォルトでオンになっており、プライベートロケーションの予約済み IP へのアクセスを制限します。特定のエンドポイントへのアクセスを許可するには、IP 範囲および/またはドメイン名を入力します。 

    詳細については、[プライベートロケーションの構成オプション][6]、[プライベートロケーションから Synthetic テストを実行する][7]、および[プライベートロケーションネットワークのセキュリティ強化][17]を参照してください。

6. プライベートロケーションの構成ファイルをコピーして、作業ディレクトリに貼り付けます。

    **注**: 構成ファイルには、プライベートロケーションの認証、テスト構成の復号化、およびテスト結果の暗号化に関するシークレットが含まれています。Datadog はシークレットを保存しないため、{{< ui >}}Private Locations{{< /ui >}} 作成フォームを離れる前にローカルに保存してください。**プライベートロケーションにワーカーを追加するには、シークレットを再度参照できるようにしておく必要があります**。
7. 準備ができたら、{{< ui >}}View Installation Instructions{{< /ui >}} をクリックします。
8. プライベートロケーションワーカーを実行する環境に基づいて、インストール手順に従います。
9. Docker を使用している場合は、Docker `run` コマンドと構成ファイルを使用して、ワーカーをスタンドアロンコンテナとして起動します。

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```
    
    This command starts a Docker container and prepares your private location to run tests. Datadog recommends running the container in detached mode with proper restart policy.

    <div class="alert alert-info">Podman などの別のコンテナランタイムを使用することもできます。詳細については、<a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#install-your-private-location">プライベートロケーションのドキュメント</a>を参照してください。</div>
    
    If you are using Windows, [run the Synthetics Private Location Installer with a GUI][12] or run the `msiexec` command on the command line inside the directory where you downloaded the installer:

    ```shell
    msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
    ```

10. プライベートロケーションが Datadog に正しくレポートされると、{{< ui >}}Private Location Status{{< /ui >}} の下および {{< ui >}}Settings{{< /ui >}} ページの {{< ui >}}Private Locations{{< /ui >}} リストに `OK` 健全性ステータスが表示されます。

    {{< img src="synthetics/private_locations/pl_health.png" alt="プライベートロケーションの健全性" style="width:100%;">}}

    Additionally, you can see private location logs in your terminal:

    ```text
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```
11. 内部エンドポイントのテストが完了したら、{{< ui >}}OK{{< /ui >}} をクリックします。

## プライベートロケーションで Synthetic テストを実行する {#run-synthetic-tests-with-your-private-location}

Synthetic テストでは、新しいプライベートロケーションを管理ロケーションと同じように使用できます。

1. 監視対象の内部エンドポイントまたはアプリケーションで、[API テスト][2]、[マルチステップ API テスト][8]、または[ブラウザテスト][9]を作成します。
2. {{< ui >}}Private Locations{{< /ui >}}で、新しいプライベートロケーションを選択します。

    {{< img src="synthetics/private_locations/assign-test-pl_3.png" alt="Synthetic テストをプライベートロケーションに割り当てる" style="width:100%;">}}

3. テストの入力を続けます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}



[1]: /ja/continuous_testing/cicd_integrations
[2]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[3]: /ja/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/settings/private-locations
[6]: /ja/synthetics/platform/private_locations/configuration/#all-configuration-options
[7]: /ja/synthetics/private_locations/?tab=docker#blocking-reserved-ips
[8]: /ja/getting_started/synthetics/api_test#create-a-multistep-api-test
[9]: /ja/getting_started/synthetics/browser_test
[10]: https://podman.io/
[11]: https://app.vagrantup.com/ubuntu/boxes/jammy64
[12]: /ja/synthetics/private_locations?tab=windows#install-your-private-location
[13]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[14]: https://www.datadoghq.com/legal/eula/
[15]: https://www.datadoghq.com/support/
[16]: /ja/synthetics/guide/kerberos-authentication/
[17]: /ja/synthetics/platform/private_locations/network_security/