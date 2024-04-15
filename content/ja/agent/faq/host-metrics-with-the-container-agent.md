---
aliases:
- /ja/agent/faq/getting-further-with-docker/
further_reading:
- link: /agent/docker/
  tag: Documentation
  text: Datadog Docker Agent の詳細

title: Container Agent によるホストメトリクス
---

## ディスクチェック

[ディスクチェック][1]は、ホストにマウントされ、ボリュームとしてコンテナに公開されているすべてのストレージについて、コンテナ Agent とともにホストのメトリクスを報告します。追加の設定は必要ありません。

### パーティションのメトリクス

Linux のストレージはブロックデバイス、論理ボリューム、パーティションと階層化されているため、パーティションの空き容量を報告するためには、パーティションをマウントする必要があります。

コンテナ Agent は、全体または部分的にアクセス可能なパーティションごとに、ディスクメトリクスとレートを報告します。Cgroups と Docker はこの分離を強制します。パーティションのディスク使用率レポートを許可するには、`docker run` の `-v` 引数で Docker ボリュームを通してそれを公開する必要があります。以下のオプションが利用可能です。

* ウォッチするファイルシステムにダミーファイルを作成し、Docker で公開します。Agent はこのパーティション上の他のファイルにはアクセスできません。
    ```
    -v /mnt/loop/dummyfile:/host/loop0:ro
    ```

* マウントポイント全体を読み取り専用として公開します。Agent は、フォルダ階層とワールドリーダブルファイルにアクセスできます。
    ```
    -v /mnt/loop:/host/loop0:ro
    ```

* マウントパスが不明 (動的にマウントされたボリューム) で、親ディレクトリが一定である場合、親フォルダを公開します。Agent はこのフォルダの子フォルダにマウントされたすべてのボリュームにアクセスすることができます。
    ```
    -v /mnt/:/host/mnt:ro
    ```

### トラブルシューティング

#### ディスクメトリクスの欠落

Docker イメージをカスタマイズした場合、または Agent の `conf.d` フォルダにカスタムディレクトリをマウントした場合、Disk チェックのために以下のいずれかを行ってください。

* デフォルトの `conf.yaml` が存在することを確認します。
* カスタマイズされた `conf.yaml` を有効にします。
* チェックを無効にします。

#### 権限拒否のエラー

コンテナ化 Agent で、特定の仮想マウントポイントからディスクメトリクスを収集するときに、権限拒否エラーが表示されることがあります。これは通常、ホストのルートファイルシステム全体がコンテナに公開されている場合に発生します。Agent は、メトリクスを生成できない `shm` または `netns` マウントポイントを見つけます。

Agent から報告される関連ログの例を示します。

```bash
10:12:52 PST | WARN | (datadog_agent.go:149 in LogMessage) | (disk.py:114) | Unable to get disk metrics for /run/docker/netns/9ec58235910c: [Errno 13] Permission denied: '/run/docker/netns/9ec58235910c'
```

理想的には、Agent のコンテナに有用なパスのみを公開する必要があります。必要に応じて、ディスクチェックの `conf.yaml` を更新し、以下のパラメーターのいずれかを使用して関連するファイルシステムを除外することで、これらのログが Agent によって報告されるのを防ぎます。

* Agent v6.24.0+ および v7.24.0+ の場合は `file_system_exclude`
* Agent v6.8.0 - v6.23.1/v7.23.1 の場合は `file_system_blacklist`
* それより古い Agent バージョンの場合は `excluded_filesystems`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/disk/
