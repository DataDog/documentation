---
title: マーケットプレイス
type: ドキュメント
---

<div class="alert alert-info">マーケットプレイスのパートナーになるには、アイディアを <a href="mailto:marketplace@datadog.com">marketplace@datadog.com</a> までお送りください！</div>

## はじめに

リリースプロセスを開始する前に、Datadog により承認されたマーケットプレイスへの申請、マーケットプレイスリポジトリへのアクセスおよびビルトインテグレーションが必要です。また、Datadog のデベロッパーツールキット [ddev][1] をセットアップする必要があります。

## インテグレーションのリリース

リリースをするには、メンテナンスツールが 2 つのファイルを同時プルリクエスト (PR) で更新する必要があります。

1. CHANGELOG.md ファイルの更新
    このファイルは、以下のコマンドを使用して ddev により自動更新することが可能です。
    ```
    ddev release changelog <INTEGRATION_NAME> <VERSION>
    ```
    コマンドにより、最新リリース以降のすべてのマージ済みプルリクエストがリストアップされ、プルリクエストラベルに基づき changelog エントリが作成されます。changelog のタイプについては、[Changelog の維持][2]の定義に従ってください。

2. `about.py` ファイルの更新
    Agent ベースのインテグレーションでは、ファイルの階層がいつも同じで、インテグレーションバージョンに唯一信頼して使用できるファイルは、 `datadog_checks/<INTEGRATION>/about.py` ファイルです。例として、[Aqua][3] チェックをご覧ください。
ファイルの更新は手動で行います。

3. この変更を Datadog マーケットプレイスレポジトリにプッシュし、PR を作成します。PR がマスターにマージされたら、`about.py` ファイルで指定されたバージョン番号でリリースがトリガーされます。数秒後 (15 分以内) に、新規リリースはここにある Datadog リポジトリにプッシュされ、以下のコマンドを使用してインテグレーションがインストール可能になります。

    ```
    sudo -u dd-agent datadog-agent integration install --third-party datadog-<INTEGRATION_NAME>==X.Y.Z
    ```




[1]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[2]: https://keepachangelog.com/en/1.1.0/#how
[3]: https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/__about__.py#L4
