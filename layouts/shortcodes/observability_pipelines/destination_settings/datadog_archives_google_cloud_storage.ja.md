<div class="alert alert-warning">Google Cloud Storage の宛先は、<a href = "https://cloud.google.com/storage/docs/access-control/lists">アクセスコントロールリスト</a>のみをサポートしています。</div>

1. 以前に作成した Google Cloud ストレージバケットの名前を入力してください。
1. [以前に](#create-a-service-account-to-allow-workers-to-write-to-the-bucket)ダウンロードした認証情報 JSON ファイルのパスを入力します。
1. 作成したオブジェクトのストレージクラスを選択します。
1. 作成したオブジェクトのアクセスレベルを選択します。
1. 必要に応じて、プレフィックスを入力します。
   - プレフィックスはオブジェクトをパーティショニングするのに役立ちます。たとえば、特定のディレクトリ配下にオブジェクトを格納するために、プレフィックスをオブジェクトのキーとして使用できます。この目的でプレフィックスを使用する場合、プレフィックスがディレクトリパスとして機能するためには、`/` で終わる必要があります。末尾の `/` は自動的に追加されません。
   - ログ内の特定のフィールドに基づいて異なるオブジェクトキーにログをルーティングする場合は、[テンプレート構文][10051]を参照してください。
1. 必要に応じて、**Add Header** をクリックしてメタデータを追加します。

[10051]: /observability_pipelines/destinations/#template-syntax
