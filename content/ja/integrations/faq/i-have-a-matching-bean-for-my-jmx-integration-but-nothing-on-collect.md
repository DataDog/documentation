---

title: JMX インテグレーションに一致する Bean がありますが収集できません。
---

JMX インテグレーションのセットアップに問題がありますか？このような場合は、以下の記事を参考にしてください。

* [JMX インテグレーションのトラブルシューティング][1]
* [jConsole で jmx データを表示し、jmx.yaml でデータの収集をセットアップする][2]
* [jmx.yaml エラー: Include Section][3]
* [複合型の JMX 属性を収集する][4]
* [Windows で JMX コマンドを実行するには？][5]

上記の記事で説明されているようにすべてが適切にセットアップされており、*さらに*メトリクスが [Agent ログファイル][6]に表示される場合 (ただし [status コマンド][1] には*表示されない*)、おそらく使用している `metric_type` に問題があると思われます。

以下は、`list_matching_attributes.log` ファイルの出力です。

```text
Matching: 0/350. Bean name: Hadoop:service=HBase,name=Master,sub=Server - Attribute name: tag.isActiveMaster  - Attribute type: java.lang.String
```

## どうすれば解決できますか？

[Agent ログファイル][6]にアクセスし、以下のようなエラーを検索してください。

```text
2016-12-05 03:08:33,261 | WARN | JMXAttribute | Unable to get metrics from Hadoop:service=HBase,name=Master,sub=Server - tag.isActiveMaster
java.lang.NumberFormatException: For input string: "false"
 [...]
```

これは、`Hadoop:service=HBase,name=Master,sub=Server - tag.isActiveMaster` が文字列の値を返していることを意味します。

`jmx.yaml` ファイルをチェックしてください。次の抜粋は似たようなものを示しているはずです。

```yaml
init_config:
instances:
  - name: hbase_master
    host: localhost
    port: xxx
    tags:
      application: hbase
      service: master
    conf:
      - include:
          bean: "Hadoop:service=HBase,name=Master,sub=Server"
          [...]
            tag.isActiveMaster:
              alias: jmx.hadoop.hbase.master.server.tag.isActiveMaster
              metric_type: java.lang.String
```

`java.lang.String` の metric_type は、ログに表示されていた問題を確認します。

この問題を解決するには、関連する metric_type を変更し、`jmx.yaml` ファイルが以下の構成になっていることを確認します (最後の 4 行の変更点に注意)。

```yaml
init_config:
instances:
  - name: hbase_master
    host: localhost
    port: xxx
    tags:
      application: hbase
      service: master
    conf:
      - include:
          bean: "Hadoop:service=HBase,name=Master,sub=Server"
          [...]
            tag.isActiveMaster:
              alias: jmx.hadoop.hbase.master.server.tag.isActiveMaster
              metric_type: gauge
              values:
                true: 1
                false: 0
              # 注: Agent 6 を使用する場合、ブーリアンキーは引用符で囲まれた値でなければなりません: {"true": 1, "false": 0, default: 0}
```

Jmxfetch はそれが文字列であることを認識し、このルールを使ってそれを数値メトリクスに変換します。

まだ問題がある場合は、[Datadog サポートチーム][7]に連絡してください。

[1]: /ja/integrations/faq/troubleshooting-jmx-integrations/
[2]: /ja/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
[3]: /ja/integrations/faq/jmx-yaml-error-include-section/
[4]: /ja/integrations/guide/collecting-composite-type-jmx-attributes/
[5]: /ja/integrations/faq/how-to-run-jmx-commands-in-windows/
[6]: /ja/agent/guide/agent-log-files/
[7]: /ja/help/
