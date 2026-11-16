### S3 バケットを Datadog ログアーカイブに接続する {#connect-the-s3-bucket-to-datadog-log-archives}

1. Datadog の [Log Forwarding][201] に移動します。
1. [**New archive**] (新規アーカイブ) をクリックします。
1. わかりやすいアーカイブ名を入力します。
1. **Define Which Data To Forward (転送するデータの定義)** セクションで、Log Management パイプラインを通過するすべてのログを除外するクエリを追加し、Log Archive がこのバケットにログを送信しないようにします。そうしないと、Log Archive と Worker の両方がバケットにログを送信することになり、アーカイブされたログが重複してしまいます。
    - たとえば、クエリ `observability_pipelines_read_only_archive` を追加し、Log Management パイプラインを通過するログにそのタグが含まれていない場合、Worker はバケットにログを送信し、Log Archive はバケットからの読み取りとリハイドレートのみを行います。
    - クエリを入力した後 (例: `observability_pipelines_read_only_archive`)、ページ上部のログプレビューに一致する結果が表示されないはずです。
1. **AWS S3** を選択します。
1. バケットが存在する AWS アカウントを選択します。
1. S3 バケットの名前を入力します。
1. オプションで、パスを入力します。
1. 確認事項にチェックを入れます。
1. オプションで、タグを追加し、リハイドレートの最大スキャンサイズを定義します。詳細については、[高度な設定][202]を参照してください。
1. **Save** をクリックします。

詳細については [Log Archives のドキュメント][203]を参照してください。

[201]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[202]: /ja/logs/log_configuration/archives/?tab=awss3#advanced-settings
[203]: /ja/logs/log_configuration/archives
