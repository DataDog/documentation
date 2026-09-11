Observability Pipelines の Sumo Logic 宛先を使用するには、Sumo Logic ホスト型コレクターと HTTP ログソース、および以下の情報が必要です。
- Observability Pipelines Worker がログを受信するためにリッスンするバインドアドレス。例えば、`0.0.0.0:80`。   
- Worker が処理されたログを送信する Sumo Logic HTTP ログソースの URL。この URL は、ホスト型コレクターを構成して、HTTP ログとメトリクスソースを設定すると、Sumo Logic から提供されます。

詳細については、[Sumo Logic で HTTP ログソースを構成する][101]を参照してください。

[101]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/