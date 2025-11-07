#### S3 バケットを Datadog Log Archives に接続する

1. Datadog の [Log Forwarding][201] に移動します。
1. Click **New archive**.
1. わかりやすいアーカイブ名を入力します。
1. ログパイプラインを通過するすべてのログをフィルタリングして、それらのログがこのアーカイブに入らないようにするクエリを追加します。例えば、クエリ `observability_pipelines_read_only_archive` を追加します。これは、パイプラインを通過するログにそのタグが追加されていないと仮定しています。
1. **AWS S3** を選択します。
1. バケットが存在する AWS アカウントを選択します。
1. S3 バケットの名前を入力します。
1. オプションでパスを入力します。
1. 確認文をチェックします。
1. オプションで、タグを追加し、再ハイドレートのための最大スキャンサイズを定義します。詳細については、[高度な設定][202]を参照してください。
1. **Save** をクリックします。

詳細については [Log Archives のドキュメント][203]を参照してください。

[201]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[202]: /ja/logs/log_configuration/archives/?tab=awss3#advanced-settings
[203]: /ja/logs/log_configuration/archives