---
attributes:
- description: メトリクスに定義されている送信元ホストの名前。Datadog は Datadog 内の一致するホストから対応するホストタグを自動的に取得し、そしてそれらをあなたのテレメトリーに適用します。Agent
    はこの値を自動的に設定します。
  domain: 予約済み
  name: ホスト
  product_source:
  - icon-log
  - icon-apm
  type: 文字列
- description: 送信元デバイスのタイプ。
  domain: 予約済み
  name: デバイス
  product_source:
  - icon-rum
  - android
  - ios
  - ブラウザ
  - roku
  type: 文字列
- description: これは、インテグレーション名 (データが生じる技術) に対応します。インテグレーション名と一致する場合、対応するパーサーとファセットが自動的にインストールされます。例えば、`nginx`、`postgresql`
    などです。
  domain: 予約済み
  name: source
  product_source:
  - icon-log
  type: 文字列
- description: これはデータのレベルや重大度に対応します。ログについては、[ログパターン](/logs/explorer/patterns/)を定義するために使用され、ログ管理
    UI に専用のレイアウトがあります。
  domain: 予約済み
  name: status
  product_source:
  - icon-log
  - icon-apm
  type: 文字列
- description: データを生成しているアプリケーションまたはサービスの [統一サービス名](/getting_started/tagging/unified_service_tagging/)
    で、ユーザー セッションを相関付けるために使用します。APM から他の製品に切り替えるためにも使用されるため、APM と他の製品の両方を使用する場合は同じ値を定義してください。RUM
    Browser SDK では、service はブラウザー アプリケーション内で特定の機能を提供する、チームによって構築されたページの集合を表します。 [手動ビュー
    トラッキング](/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names)
    を使用して、Web ページを service に割り当てることができます。
  domain: 予約済み
  name: サービス
  product_source:
  - icon-log
  - icon-rum
  - icon-apm
  - android
  - ios
  - ブラウザ
  - roku
  type: 文字列
- description: トレースに使用されるトレース ID。ログを含む他のデータとトレースを相関付けるために使用されます。
  domain: 予約済み
  name: trace_id
  product_source:
  - icon-log
  - icon-apm
  type: 数値
- description: Logs Live Tail でハイライトして表示されるログエントリの本文。全文検索のためにインデックス化されています。
  domain: 予約済み
  name: message
  product_source:
  - icon-log
  type: 文字列
- description: ログの送信時にクライアントからサーバーに転送された合計バイト数。
  domain: ネットワーク通信
  name: network.bytes_read
  product_source:
  - icon-log
  type: 数値
- description: ログの送信時にサーバーからクライアントに転送された合計バイト数。
  domain: ネットワーク通信
  name: network.bytes_written
  product_source:
  - icon-log
  type: 数値
- description: 国名。
  domain: 位置情報
  name: network.client.geoip.country.name
  product_source:
  - icon-log
  type: 文字列
- description: '国の [ISO コード](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
    (例: アメリカ合衆国は `US`、フランスは `FR`)。'
  domain: 位置情報
  name: network.client.geoip.country.iso_code
  product_source:
  - icon-log
  type: 文字列
- description: 大陸の ISO コード (`EU`、`AS`、`NA`、`AF`、`AN`、`SA`、`OC`)。
  domain: 位置情報
  name: network.client.geoip.continent.code
  product_source:
  - icon-log
  type: 文字列
- description: 大陸名 (`Europe`、`Australia`、`North America`、`Africa`、`Antartica`、`South
    America`、`Oceania`)。
  domain: 位置情報
  name: network.client.geoip.continent.name
  product_source:
  - icon-log
  type: 文字列
- description: その国で最大規模の地方区分 (米国は `California` 州、フランスは `Sarthe` 県など)。
  domain: 位置情報
  name: network.client.geoip.subdivision.name
  product_source:
  - icon-log
  type: 文字列
- description: '国の第 1 レベルの行政区の [ISO コード](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
    (例: アメリカ合衆国では `CA`、フランスでは `SA` 県)。'
  domain: 位置情報
  name: network.client.geoip.subdivision.iso_code
  product_source:
  - icon-log
  type: 文字列
- description: 都市名 (`Paris`、`New York` など)。
  domain: 位置情報
  name: network.client.geoip.city.name
  product_source:
  - icon-log
  type: 文字列
- description: リクエスト中のリソースにリンクした Web ページのアドレスを識別する HTTP ヘッダーフィールド。
  domain: HTTP
  name: http.referer
  product_source:
  - icon-log
  type: 文字列
- description: HTTP リクエストの ID。
  domain: HTTP
  name: http.request_id
  product_source:
  - icon-log
  type: 文字列
- description: URL の HTTP ホスト部分。
  domain: HTTP, URL Details
  name: http.url_details.host
  product_source:
  - icon-log
  - icon-apm
  type: 文字列
- description: URL の HTTP ポート部分。
  domain: HTTP, URL Details
  name: http.url_details.port
  product_source:
  - icon-log
  - icon-apm
  type: 数値
- description: URL の HTTP パス部分。
  domain: HTTP, URL Details
  name: http.url_details.path
  product_source:
  - icon-log
  - icon-apm
  type: 文字列
- description: クエリパラメーターの key/value 属性として分解された、URL の HTTP クエリ文字列部分。
  domain: HTTP, URL Details
  name: http.url_details.queryString
  product_source:
  - icon-log
  - icon-apm
  type: オブジェクト
- description: URL のプロトコル名 (HTTP または HTTPS)。
  domain: HTTP, URL Details
  name: http.url_details.scheme
  product_source:
  - icon-log
  - icon-apm
  type: 文字列
- description: User-Agent によって報告された OS ファミリー。
  domain: User-Agent
  name: http.useragent_details.os.family
  product_source:
  - icon-log
  type: 文字列
- description: User-Agent によって報告されたブラウザファミリー。
  domain: User-Agent
  name: http.useragent_details.browser.family
  product_source:
  - icon-log
  type: 文字列
- description: User-Agent によって報告されたデバイスファミリー。
  domain: User-Agent
  name: http.useragent_details.device.family
  product_source:
  - icon-log
  type: 文字列
- description: ロガーの名前。
  domain: ソースコード
  name: logger.name
  product_source:
  - icon-log
  type: 文字列
- description: ログの生成時の現在のスレッドの名前。
  domain: ソースコード
  name: logger.thread_name
  product_source:
  - icon-log
  type: 文字列
- description: クラスメソッド名。
  domain: ソースコード
  name: logger.method_name
  product_source:
  - icon-log
  type: 文字列
- description: ロガーのバージョン。
  domain: ソースコード
  name: logger.version
  product_source:
  - icon-log
  type: 文字列
- description: エラーのタイプまたは種類 (場合によってはコード)。
  domain: ソースコード
  name: error.kind
  product_source:
  - icon-log
  type: 文字列
- description: 接続先のデータベース名。例えば、 Java の場合、 `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`
    であれば、インスタンス名は `customers` です。
  domain: データベース
  name: db.instance
  product_source:
  - icon-apm
  - icon-log
  type: 文字列
- description: 指定されたデータベースタイプのデータベースステートメント。例えば、mySQL の場合は `'SELECT * FROM wuser_table';`
    、Redis の場合は `'SET mykey 'WuValue''` です。
  domain: データベース
  name: db.statement
  product_source:
  - icon-apm
  - icon-log
  type: 文字列
- description: 処理を実行するユーザー。
  domain: データベース
  name: db.user
  product_source:
  - icon-apm
  - icon-log
  type: 文字列
- description: '**ナノ秒**単位の持続時間: HTTP 応答時間、データベースクエリ時間、レイテンシーなど。Datadog は、トレース検索のためのデフォルトのメジャーとしてこれを表示、使用するため、ログ内の任意の持続時間をこの属性に[再マップ](/logs/log_configuration/processors/#remapper)してください。'
  domain: パフォーマンス
  name: duration
  product_source:
  - icon-log
  type: 数値
- description: ユーザーの識別子。
  domain: ユーザー
  name: usr.id
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - ブラウザ
  - roku
  type: 文字列
- description: わかりやすい名前。
  domain: ユーザー
  name: usr.name
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - ブラウザ
  - roku
  type: 文字列
- description: ユーザーの電子メール。
  domain: ユーザー
  name: usr.email
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - ブラウザ
  - roku
  type: 文字列
- description: ホスト名。
  domain: Syslog とログシッパー
  name: syslog.hostname
  product_source:
  - icon-log
  type: 文字列
- description: アプリケーション名。通常は、予約済み属性 `service` に再マップされます。
  domain: Syslog とログシッパー
  name: syslog.appname
  product_source:
  - icon-log
  type: 文字列
- description: ログの重大度。通常は、予約済み属性 `status` に再マップされます。
  domain: Syslog とログシッパー
  name: syslog.severity
  product_source:
  - icon-log
  type: 数値
- description: ログのタイムスタンプ。通常は、予約済み属性 `date` に再マップされます。
  domain: Syslog とログシッパー
  name: syslog.timestamp
  product_source:
  - icon-log
  type: 文字列
- description: ログのソースが由来する環境名。
  domain: Syslog とログシッパー
  name: syslog.env
  product_source:
  - icon-log
  type: 文字列
- description: DNS のクエリ識別子。
  domain: DNS
  name: dns.id
  product_source:
  - icon-log
  type: 文字列
- description: クエリ対象のドメイン名。
  domain: DNS
  name: dns.question.name
  product_source:
  - icon-log
  type: 文字列
- description: DNS のクエリタイプを指定する [2 オクテットコード](https://en.wikipedia.org/wiki/List_of_DNS_record_types)。
  domain: DNS
  name: dns.question.type
  product_source:
  - icon-log
  type: 文字列
- description: DNS の質問で検索されるクラス (インターネットを使用する場合は IP など) 。
  domain: DNS
  name: dns.question.class
  product_source:
  - icon-log
  type: 文字列
- description: DNS 質問のバイトサイズ。
  domain: DNS
  name: dns.question.size
  product_source:
  - icon-log
  type: 数値
- description: DNS で回答する際の IP アドレス。
  domain: DNS
  name: dns.answer.name
  product_source:
  - icon-log
  type: 文字列
- description: DNS の回答タイプを指定する [2 オクテットコード](https://en.wikipedia.org/wiki/List_of_DNS_record_types)。
  domain: DNS
  name: dns.answer.type
  product_source:
  - icon-log
  type: 文字列
- description: DNS によって回答されるクラス。
  domain: DNS
  name: dns.answer.class
  product_source:
  - icon-log
  type: 文字列
- description: DNS 回答のバイトサイズ。
  domain: DNS
  name: dns.answer.size
  product_source:
  - icon-log
  type: 数値
- description: DNS の返答コード。
  domain: DNS
  name: dns.flags.rcode
  product_source:
  - icon-log
  type: 文字列
- description: '同じアクティビティ (例: 認証) によって生成されたイベント間での共有名。'
  domain: イベント
  name: evt.name
  product_source:
  - icon-log
  type: 文字列
- description: 'イベントの結果 (例: `success`、`failure`)。'
  domain: イベント
  name: evt.outcome
  product_source:
  - icon-log
  type: 文字列
- description: Epoch からのイベント開始時間 (ミリ秒)
  domain: RUM のコア属性
  name: date
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 整数
- description: イベントのタイプ (`view` や `resource` など)。
  domain: RUM のコア属性
  name: type
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: RUM アプリケーションを作成する際に生成される Datadog アプリケーション ID。
  domain: RUM のコア属性
  name: application.id
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: Datadog アプリケーション名。
  domain: RUM のコア属性
  name: application.name
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  type: 文字列
- description: デバイスにより報告されたデバイスタイプ (System User-Agent)。
  domain: デバイス (Android、iOS、Roku)
  name: device.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: デバイスにより報告されたデバイスのブランド (System User-Agent)。
  domain: デバイス (Android、iOS、Roku)
  name: device.brand
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: デバイスにより報告されたデバイスモデル (System User-Agent)。
  domain: デバイス (Android、iOS、Roku)
  name: device.model
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: デバイスにより報告されたデバイス名 (System User-Agent)。
  domain: デバイス (Android、iOS、Roku)
  name: device.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: デバイスのネットワーク到達可能性の状態 (`connected`、`not connected`、または `maybe`)。
  domain: 接続性 (Android、iOS)
  name: connectivity.status
  product_source:
  - icon-rum
  - android
  - ios
  type: 文字列
- description: 利用可能なネットワークインターフェースのリスト (`bluetooth`、`cellular`、`ethernet`、または `wifi`
    など)。
  domain: 接続性 (Android、iOS)
  name: connectivity.interfaces
  product_source:
  - icon-rum
  - android
  - ios
  type: 文字列
- description: 携帯電話の接続に使用される無線技術のタイプ。
  domain: 接続性 (Android、iOS)
  name: connectivity.cellular.technology
  product_source:
  - icon-rum
  - android
  - ios
  type: 文字列
- description: SIMを取り扱う事業者名。
  domain: 接続性 (Android、iOS)
  name: connectivity.cellular.carrier_name
  product_source:
  - icon-rum
  - android
  - ios
  type: 文字列
- description: デバイスにより報告された OS 名 (System User-Agent)。
  domain: オペレーティングシステム (Android、iOS、Roku)
  name: os.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: デバイスにより報告される OS バージョン (System User-Agent)。
  domain: オペレーティングシステム (Android、iOS、Roku)
  name: os.version
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: デバイスにより報告される OS バージョンメジャー (System User-Agent)。
  domain: オペレーティングシステム (Android、iOS、Roku)
  name: os.version_major
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: 国名。
  domain: 地理的位置
  name: geo.country
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: 国の [ISO コード](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
    (例えば、アメリカなら `US`、フランスなら `FR`)。
  domain: 地理的位置
  name: geo.country_iso_code
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: その国で最大規模の地方区分 (米国は `California` 州、フランスは `Sarthe` 県など)。
  domain: 地理的位置
  name: geo.country_subdivision
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: 大陸の ISO コード (`EU`、`AS`、`NA`、`AF`、`AN`、`SA`、または `OC`)。
  domain: 地理的位置
  name: geo.continent_code
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: 大陸名 (`Europe`、`Australia`、`North America`、`Africa`、`Antarctica`、`South
    America`、または `Oceania`)。
  domain: 地理的位置
  name: geo.continent
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: 都市名 (`San Francisco`、`Paris`、`New York` など)。
  domain: 地理的位置
  name: geo.city
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: ユーザーの識別子。
  domain: RUM のユーザー属性 (Android、Roku)
  name: user.id
  product_source:
  - icon-rum
  - android
  - roku
  type: 文字列
- description: ユーザーの識別子。
  domain: RUM ユーザー属性 (iOS, Browser)
  name: usr.id
  product_source:
  - icon-rum
  - ios
  - ブラウザ
  type: 文字列
- description: ユーザーの名前。
  domain: グローバル ユーザー属性 (Android, iOS, Browser, Roku)
  name: usr.name
  product_source:
  - icon-rum
  - android
  - ios
  - ブラウザ
  - roku
  type: 文字列
- description: ユーザーのメールアドレス。
  domain: グローバル ユーザー属性 (Android, iOS, Browser, Roku)
  name: usr.email
  product_source:
  - icon-rum
  - android
  - ios
  - ブラウザ
  - roku
  type: 文字列
- description: セッションのユニーク ID。
  domain: セッション (Android イベント、iOS イベント、Roku イベント)
  name: session.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: セッションのタイプ (`user`)。
  domain: セッション (Android イベント、iOS イベント、Roku イベント)
  name: session.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: セッションが現在アクティブであるかどうかを示します。セッションは、ユーザーがアプリケーションから移動したり、ブラウザウィンドウを閉じたりすると終了し、4
    時間の活動または 15 分の非活動時間が経過すると失効します。
  domain: セッション (Android イベント、iOS イベント、Roku イベント)
  name: session.is_active
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: ブール値
- description: セッションの初期ビューの URL。
  domain: セッション (Android イベント、iOS イベント、Roku イベント)
  name: session.initial_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: セッションの初期ビューの名前。
  domain: セッション (Android イベント、iOS イベント、Roku イベント)
  name: session.initial_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: セッションの最後のビューの URL。
  domain: セッション (Android イベント、iOS イベント、Roku イベント)
  name: session.last_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: セッションの最後のビューの名前。
  domain: セッション (Android イベント、iOS イベント、Roku イベント)
  name: session.last_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: 受信時の TCP 接続から抽出されたセッションの IP アドレス。この属性の収集を停止したい場合は、[アプリケーションの詳細](/data_security/real_user_monitoring/#ip-address)で設定を変更してください。
  domain: セッション (Android イベント、iOS イベント、Roku イベント)
  name: session.ip
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: デバイスの情報を解釈するためのシステム `User-Agent` 情報。
  domain: セッション (Android イベント、iOS イベント、Roku イベント)
  name: session.useragent
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: イベントに対応する初期ビューのユニーク ID。
  domain: ビュー (Android イベント、iOS イベント、Roku イベント)
  name: view.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: イベントに対応するクラスの標準名。iOS の場合は、イベントに対応する `UIViewController` クラスの URL。
  domain: ビュー (Android イベント、iOS イベント、Roku イベント)
  name: view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: イベントに対応する、カスタマイズ可能なビューの名前。
  domain: ビュー (Android イベント、iOS イベント、Roku イベント)
  name: view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: リソースの一意の識別子。
  domain: リソース (Android イベント、iOS イベント、Roku イベント)
  name: resource.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: 収集されるリソースのタイプ (`xhr`、`image`、`font`、`css`、または `js` など)。
  domain: リソース (Android イベント、iOS イベント、Roku イベント)
  name: resource.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: HTTP メソッド (`POST`、`GET` `PATCH`、または `DELETE` など)。
  domain: リソース (Android イベント、iOS イベント、Roku イベント)
  name: resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: 応答ステータスコード。
  domain: リソース (Android イベント、iOS イベント、Roku イベント)
  name: resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 数値
- description: リソースの URL。
  domain: リソース (Android イベント、iOS イベント、Roku イベント)
  name: resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: リソースプロバイダー名。デフォルトは `unknown` となります。
  domain: リソース (Android イベント、iOS イベント、Roku イベント)
  name: resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: リソースプロバイダーのドメイン。
  domain: リソース (Android イベント、iOS イベント、Roku イベント)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: リソースプロバイダーのタイプ (`first-party`、`cdn`、`ad`、または `analytics` など)。
  domain: リソース (Android イベント、iOS イベント、Roku イベント)
  name: resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: エラーの発生元 (`webview`、`logger`、`network` など)。
  domain: エラー (ブラウザイベント、Android イベント、iOS イベント、Roku イベント)
  name: error.source
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: エラーのタイプ (場合によってはエラーコード)。
  domain: エラー (ブラウザイベント、Android イベント、iOS イベント、Roku イベント)
  name: error.type
  product_source:
  - icon-apm
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: イベントについて簡潔にわかりやすく説明する 1 行メッセージ。
  domain: エラー (ブラウザイベント、Android イベント、iOS イベント、Roku イベント)
  name: error.message
  product_source:
  - icon-apm
  - icon-log
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: スタックトレースまたはエラーに関する補足情報。
  domain: エラー (ブラウザイベント、Android イベント、iOS イベント、Roku イベント)
  name: error.stack
  product_source:
  - icon-apm
  - icon-log
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: スタックトレースまたはエラーに関する補足情報。
  domain: エラー (Android イベント、iOS イベント、Roku イベント)
  name: error.issue_id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: 応答ステータスコード。
  domain: ネットワークエラー (Android イベント、iOS イベント、Roku イベント)
  name: error.resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 数値
- description: HTTP メソッド (`POST` または `GET` など)。
  domain: ネットワークエラー (Android イベント、iOS イベント、Roku イベント)
  name: error.resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: リソースの URL。
  domain: ネットワークエラー (Android イベント、iOS イベント、Roku イベント)
  name: error.resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: リソースプロバイダー名。デフォルトは `unknown` となります。
  domain: ネットワークエラー (Android イベント、iOS イベント、Roku イベント)
  name: error.resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: リソースプロバイダーのドメイン。
  domain: ネットワークエラー (Android イベント、iOS イベント、Roku イベント)
  name: error.resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: リソースプロバイダーのタイプ (`first-party`、`cdn`、`ad`、または `analytics` など)。
  domain: ネットワークエラー (Android イベント、iOS イベント、Roku イベント)
  name: error.resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 文字列
- description: ユーザーアクションの UUID。
  domain: アクション (ブラウザイベント、Android イベント、iOS イベント、Roku イベント)
  name: action.id
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: ユーザーアクションのタイプ (例えば、`tap` や `application_start` など)。[カスタムブラウザユーザーアクション](/real_user_monitoring/application_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions)の場合には、`custom`
    に設定されます。
  domain: アクション (ブラウザイベント、Android イベント、iOS イベント、Roku イベント)
  name: action.type
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: わかりやすい名前 (例えば、`Click on checkout`)。[カスタムブラウザユーザーアクション](/real_user_monitoring/application_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions)の場合には、API
    コールで指定されたアクション名。
  domain: アクション (ブラウザイベント、Android イベント、iOS イベント、Roku イベント)
  name: action.name
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: ユーザーが操作したエレメント。自動収集されたアクションのみ対象。
  domain: アクション (ブラウザイベント、Android イベント、iOS イベント、Roku イベント)
  name: action.target.name
  product_source:
  - icon-rum
  - android
  - ブラウザ
  - ios
  - roku
  type: 文字列
- description: ページビューごとにランダムに生成された ID。
  domain: ビュー (ブラウザ)
  name: view.id
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: 'ページ読み込みのタイプ: `initial_load` または `route_change`。詳細については、[シングルページアプリケーションサポートドキュメント](/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa)を参照してください。'
  domain: ビュー (ブラウザ)
  name: view.loading_type
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。
  domain: ビュー (ブラウザ)
  name: view.referrer
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: ビューの URL。
  domain: ビュー (ブラウザ)
  name: view.url
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: URL のハッシュ部分。
  domain: ビュー (ブラウザ)
  name: view.url_hash
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: URL のホスト部分。
  domain: ビュー (ブラウザ)
  name: view.url_host
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: URL のパス部分。
  domain: ビュー (ブラウザ)
  name: view.url_path
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: 同様の URL に対して生成された自動 URL グループ。( `/dashboard/123` と `/dashboard/456`
    に対する `/dashboard/?`　など)。
  domain: ビュー (ブラウザ)
  name: view.url_path_group
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。
  domain: ビュー (ブラウザ)
  name: view.url_query
  product_source:
  - icon-rum
  - ブラウザ
  type: オブジェクト
- description: URL のスキーム部分。
  domain: ビュー (ブラウザ)
  name: view.url_scheme
  product_source:
  - icon-rum
  - ブラウザ
  type: オブジェクト
- description: デバイスによって報告されたデバイスタイプ (User-Agent HTTP ヘッダー)。
  domain: デバイス (ブラウザ)
  name: device.type
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: デバイスによって報告されたデバイスブランド (User-Agent HTTP ヘッダー)。
  domain: デバイス (ブラウザ)
  name: device.brand
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: デバイスによって報告されたデバイスモデル (User-Agent HTTP ヘッダー)。
  domain: デバイス (ブラウザ)
  name: device.model
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: デバイスによって報告されたデバイス名 (User-Agent HTTP ヘッダー)。
  domain: デバイス (ブラウザ)
  name: device.name
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: デバイスによって報告された OS 名 (User-Agent HTTP ヘッダー)。
  domain: オペレーティングシステム (ブラウザ)
  name: os.name
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: デバイスによって報告された OS バージョン (User-Agent HTTP ヘッダー)。
  domain: オペレーティングシステム (ブラウザ)
  name: os.version
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: デバイスによって報告された OS バージョンメジャー (User-Agent HTTP ヘッダー)。
  domain: オペレーティングシステム (ブラウザ)
  name: os.version_major
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: セッションごとにランダムに生成された ID。
  domain: セッション (ブラウザイベント)
  name: session.id
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: クライアントの IP アドレス。この属性の収集を停止したい場合は、[アプリケーションの詳細](/data_security/real_user_monitoring/#ip-address)で設定を変更してください。
  domain: セッション (ブラウザイベント)
  name: session.ip
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: セッションが現在アクティビティであるかどうかを示します。セッションは、4 時間のアクティビティまたは 15 分の非アクティブの後に終了します。
  domain: セッション (ブラウザイベント)
  name: session.is_active
  product_source:
  - icon-rum
  - ブラウザ
  type: ブール値
- description: 'セッションのタイプ: `user` または `synthetics`。[Synthetic ブラウザテスト](/synthetics/browser_tests/)からのセッションは請求から除外されます。'
  domain: セッション (ブラウザイベント)
  name: session.type
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。
  domain: セッション (ブラウザイベント)
  name: session.referrer
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: ユーザーによって生成された最初の RUM ビューの ID。
  domain: セッション (ブラウザイベント)
  name: session.initial_view.id
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: URL のホスト部分。
  domain: セッション (ブラウザイベント)
  name: session.initial_view.url_host
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: URL のパス部分。
  domain: セッション (ブラウザイベント)
  name: session.initial_view.url_path
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: 同様の URL に対して生成された自動 URL グループ。( `/dashboard/123` と `/dashboard/456`
    に対する `/dashboard/?`　など)。
  domain: セッション (ブラウザイベント)
  name: session.initial_view.url_path_group
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。
  domain: セッション (ブラウザイベント)
  name: session.initial_view.url_query
  product_source:
  - icon-rum
  - ブラウザ
  type: オブジェクト
- description: URL のスキーム部分。
  domain: セッション (ブラウザイベント)
  name: session.initial_view.url_scheme
  product_source:
  - icon-rum
  - ブラウザ
  type: オブジェクト
- description: ユーザーによって生成された最後の RUM ビューの ID。
  domain: セッション (ブラウザイベント)
  name: session.last_view.id
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: URL のホスト部分。
  domain: セッション (ブラウザイベント)
  name: session.last_view.url_host
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: URL のパス部分。
  domain: セッション (ブラウザイベント)
  name: session.last_view.url_path
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: 同様の URL に対して生成された自動 URL グループ。( `/dashboard/123` と `/dashboard/456`
    に対する `/dashboard/?`　など)。
  domain: セッション (ブラウザイベント)
  name: session.last_view.url_path_group
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。
  domain: セッション (ブラウザイベント)
  name: session.last_view.url_query
  product_source:
  - icon-rum
  - ブラウザ
  type: オブジェクト
- description: URL のスキーム部分。
  domain: セッション (ブラウザイベント)
  name: session.last_view.url_scheme
  product_source:
  - icon-rum
  - ブラウザ
  type: オブジェクト
- description: 収集されるリソースのタイプ (`css`、`javascript`、`media`、`XHR`、または `image` など)。
  domain: リソース (ブラウザイベント)
  name: resource.type
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: HTTP メソッド (`POST` または `GET` など)。
  domain: リソース (ブラウザイベント)
  name: resource.method
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: 応答ステータスコード。
  domain: リソース (ブラウザイベント)
  name: resource.status_code
  product_source:
  - icon-rum
  - ブラウザ
  type: 数値
- description: リソースの URL。
  domain: リソース (ブラウザイベント)
  name: resource.url
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: URL のホスト部分。
  domain: リソース (ブラウザイベント)
  name: resource.url_host
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: URL のパス部分。
  domain: リソース (ブラウザイベント)
  name: resource.url_path
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。
  domain: リソース (ブラウザイベント)
  name: resource.url_query
  product_source:
  - icon-rum
  - ブラウザ
  type: オブジェクト
- description: URL のプロトコル名 (HTTP または HTTPS)。
  domain: リソース (ブラウザイベント)
  name: resource.url_scheme
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: リソースプロバイダー名。デフォルトは `unknown` となります。
  domain: リソース (ブラウザイベント)
  name: resource.provider.name
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: リソースプロバイダーのドメイン。
  domain: リソース (ブラウザイベント)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: リソースプロバイダーのタイプ (`first-party`、`cdn`、`ad`、または `analytics` など)。
  domain: リソース (ブラウザイベント)
  name: resource.provider.type
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: RUM ブラウザ SDK で検出されたデッドクリック。
  domain: フラストレーションシグナル (ブラウザイベント)
  name: action.frustration.type:dead_click
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: RUM ブラウザ SDK で検出されたレイジークリック。
  domain: フラストレーションシグナル (ブラウザイベント)
  name: action.frustration.type:rage_click
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: RUM ブラウザ SDK で検出されたエラークリック。
  domain: フラストレーションシグナル (ブラウザイベント)
  name: action.frustration.type:error_click
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: トラフィックのソースを追跡する URL のパラメーター。
  domain: UTM (ブラウザイベント)
  name: view.url_query.utm_source
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: トラフィックの発信元チャンネルを追跡する URL のパラメーター。
  domain: UTM (ブラウザイベント)
  name: view.url_query.utm_medium
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: そのビューに紐づく特定のマーケティングキャンペーンを識別する URL のパラメーター。
  domain: UTM (ブラウザイベント)
  name: view.url_query.utm_campaign
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: マーケティングキャンペーン内でユーザーがクリックした特定の要素を特定する URL 内のパラメーター。
  domain: UTM (ブラウザイベント)
  name: view.url_query.utm_content
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: ユーザーが特定のキャンペーンをトリガーするために検索したキーワードを追跡する URL のパラメーター。
  domain: UTM (ブラウザイベント)
  name: view.url_query.utm_term
  product_source:
  - icon-rum
  - ブラウザ
  type: 文字列
- description: スパンを生成するために使用されるクライアント SDK の言語。`cpp`、`dotnet`、`go`、`jvm`、`javascript`、`php`、`python`、`ruby`
    のいずれかになります。
  domain: APM コア
  name: language
  product_source:
  - icon-apm
  type: 文字列
- description: 実行中のプロセスの `DD_ENV` 環境変数の値、またはユーザー定義の `env` の値。
  domain: APM コア (予約済み)
  name: env
  product_source:
  - icon-apm
  type: 文字列
- description: 実行中のプロセスの `DD_VERSION` 環境変数の値、またはユーザー定義の `version` の値。
  domain: APM コア (予約済み)
  name: version
  product_source:
  - icon-apm
  type: 文字列
- description: スパンが扱う作業単位のタイプを表す文字列。server、client、producer、consumer、internal のいずれかになります。詳細は、[OpenTelemetry
    SpanKind のドキュメント](https://opentelemetry.io/docs/specs/otel/trace/api/#spankind)を参照してください。
  domain: APM コア
  name: span.kind
  product_source:
  - icon-apm
  type: 文字列
- description: スパンを作成したライブラリまたはインテグレーションの名前。
  domain: APM コア
  name: component
  product_source:
  - icon-apm
  type: 文字列
- description: インバウンド接続を開始したクライアントの IP アドレス。
  domain: ネットワーク通信
  name: network.client.ip
  product_source:
  - icon-apm
  - icon-log
  type: 文字列
- description: アウトバウンド接続が行われる IP アドレス。
  domain: ネットワーク通信
  name: network.destination.ip
  product_source:
  - icon-apm
  - icon-log
  type: 文字列
- description: ローカルホストの IP アドレス。
  domain: ネットワーク通信
  name: network.host.ip
  product_source:
  - icon-apm
  type: 文字列
- description: 接続を開始したクライアントのポート。
  domain: ネットワーク通信
  name: network.client.port
  product_source:
  - icon-apm
  - icon-log
  type: 数値
- description: アウトバウンド接続のリモートポート番号。
  domain: ネットワーク通信
  name: network.destination.port
  product_source:
  - icon-apm
  - icon-log
  type: 数値
- description: インバウンド接続を開始したクライアントのホスト名。
  domain: ネットワーク通信
  name: network.client.name
  product_source:
  - icon-apm
  type: 文字列
- description: ローカルホスト名。
  domain: ネットワーク通信
  name: network.host.name
  product_source:
  - icon-apm
  type: 文字列
- description: インバウンド接続に使用されるトランスポートプロトコル。
  domain: ネットワーク通信
  name: network.client.transport
  product_source:
  - icon-apm
  type: 文字列
- description: アウトバウンド接続に使用されるトランスポートプロトコル。
  domain: ネットワーク通信
  name: network.destination.transport
  product_source:
  - icon-apm
  type: 文字列
- description: HTTP 応答ステータスコード。
  domain: HTTP リクエスト
  name: http.status_code
  product_source:
  - icon-apm
  - icon-log
  type: 文字列
- description: 難読化されたクエリ文字列を含む、 HTTP リクエストの URL。難読化の詳細については、 [データ セキュリティの構成](https://docs.datadoghq.com/tracing/configure_data_security/)
    を参照してください。
  domain: HTTP リクエスト
  name: http.url
  product_source:
  - icon-apm
  - icon-log
  type: 文字列
- description: リクエストに使用された HTTP のバージョン。
  domain: HTTP リクエスト
  name: http.version
  product_source:
  - icon-apm
  - icon-log
  type: 文字列
- description: 接続を開始したクライアントのポート。
  domain: HTTP リクエスト
  name: http.method
  product_source:
  - icon-apm
  - icon-log
  type: 文字列
- description: '一致したルート (パステンプレート)。例: `/users/:userID`'
  domain: HTTP リクエスト
  name: http.route
  product_source:
  - icon-apm
  type: 文字列
- description: すべてのプロキシの背後にいるオリジナルのクライアントの IP アドレス (既知の場合)。`X-Forwarded-For` のようなヘッダーから取得します。
  domain: HTTP リクエスト
  name: http.client_ip
  product_source:
  - icon-apm
  type: 文字列
- description: リクエストとともに受け取った `User-Agent` ヘッダー。
  domain: HTTP リクエスト
  name: http.useragent
  product_source:
  - icon-apm
  - icon-log
  type: 文字列
- description: リクエストペイロード本文のサイズ (バイト単位)。
  domain: HTTP リクエスト
  name: http.request.content_length
  product_source:
  - icon-apm
  type: 数値
- description: レスポンスペイロード本文のサイズ (バイト単位)。
  domain: HTTP リクエスト
  name: http.response.content_length
  product_source:
  - icon-apm
  type: 数値
- description: トランスポートデコード後の非圧縮リクエストペイロードのサイズ。
  domain: HTTP リクエスト
  name: http.request.content_length_uncompressed
  product_source:
  - icon-apm
  type: 数値
- description: トランスポートデコード後の非圧縮レスポンスペイロードのサイズ。
  domain: HTTP リクエスト
  name: http.response.content_length_uncompressed
  product_source:
  - icon-apm
  type: 数値
- description: リクエストの HTTP ヘッダー。デフォルトでは何も収集されませんが、オプションで `DD_TRACE_HEADER_TAGS` を用いて構成することができます。
  domain: HTTP リクエスト
  name: http.request.headers.*
  product_source:
  - icon-apm
  type: 文字列
- description: 使用しているデータベース管理システム (DBMS) 製品の識別子。
  domain: データベーススパン
  name: db.system
  product_source:
  - icon-apm
  type: 文字列
- description: レスポンス HTTP ヘッダー。デフォルトでは収集されませんが、 `DD_TRACE_HEADER_TAGS` で任意に設定できます。
  domain: HTTP リクエスト
  name: http.response.headers.*
  product_source:
  - icon-apm
  type: 文字列
- description: データベースへの接続に使用する接続文字列。
  domain: データベーススパン
  name: db.connection_string
  product_source:
  - icon-apm
  type: 文字列
- description: '実行中の操作の名前。例: `SELECT`、`findAndModify`、`HMSET`'
  domain: データベーススパン
  name: db.operation
  product_source:
  - icon-apm
  - icon-log
  type: 文字列
- description: データベース名 (該当する場合) を含む、操作の対象となる主テーブルの名前。
  domain: データベーススパン
  name: db.sql.table
  product_source:
  - icon-apm
  type: 文字列
- description: クエリまたは操作の行数/結果数。
  domain: データベーススパン
  name: db.row_count
  product_source:
  - icon-apm
  type: 数値
- description: メッセージングシステムの識別子。
  domain: メッセージキュースパン
  name: messaging.system
  product_source:
  - icon-apm
  type: 文字列
- description: メッセージの宛先名。
  domain: メッセージキュースパン
  name: messaging.destination
  product_source:
  - icon-apm
  type: 文字列
- description: メッセージの宛先の種類。
  domain: メッセージキュースパン
  name: messaging.destination_kind
  product_source:
  - icon-apm
  type: 文字列
- description: トランスポートプロトコルの名前。
  domain: メッセージキュースパン
  name: messaging.protocol
  product_source:
  - icon-apm
  type: 文字列
- description: トランスポートプロトコルのバージョン。
  domain: メッセージキュースパン
  name: messaging.protocol_version
  product_source:
  - icon-apm
  type: 文字列
- description: メッセージングシステムへの接続文字列。
  domain: メッセージキュースパン
  name: messaging.url
  product_source:
  - icon-apm
  type: 文字列
- description: メッセージングシステムがメッセージの識別子として使用する値で、文字列として表される。
  domain: メッセージキュースパン
  name: messaging.message_id
  product_source:
  - icon-apm
  type: 文字列
- description: メッセージが属する会話を識別する会話の ID で、文字列として表現される。
  domain: メッセージキュースパン
  name: messaging.conversation_id
  product_source:
  - icon-apm
  type: 文字列
- description: 圧縮されていないメッセージペイロードのサイズ (バイト数)。
  domain: メッセージキュースパン
  name: messaging.message_payload_size
  product_source:
  - icon-apm
  type: 数値
- description: '消費メッセージの種類を示す文字列。例: `send` (メッセージをプロデューサーに送信)、`receive` (コンシューマーがメッセージを受け取る)、または
    `process` (コンシューマーが以前に受け取ったメッセージを処理)。'
  domain: メッセージキュースパン
  name: messaging.operation
  product_source:
  - icon-apm
  type: 文字列
- description: メッセージを受信するコンシューマーの識別子。
  domain: メッセージキュースパン
  name: messaging.consumer_id
  product_source:
  - icon-apm
  type: 文字列
- description: リモートシステムの識別子。
  domain: リモートプロシージャコール
  name: rpc.system
  product_source:
  - icon-apm
  type: 文字列
- description: 呼び出されるサービスの名前。
  domain: リモートプロシージャコール
  name: rpc.service
  product_source:
  - icon-apm
  type: 文字列
- description: 呼び出されるメソッドの名前。
  domain: リモートプロシージャコール
  name: rpc.method
  product_source:
  - icon-apm
  type: 文字列
content: 以下の表は、RUM、Logs、APM の各製品が Agent によって Datadog に送信されるデータにデータドメインに応じて自動的に適用される属性の一覧です。製品別にリストをフィルタリングするか、キーワードや説明テキストで検索することもできます。
description: RUM、Logs、APM の各製品が Agent によって Datadog に送信されるデータにデータドメインに応じて自動的に適用される属性の表です。
disable_sidebar: true
filter_all: All
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: Datadog に送信されるデータのセキュリティ確保
- link: /tracing/trace_collection/tracing_naming_convention/
  tag: ドキュメント
  text: スパンタグのセマンティクス
title: デフォルトの標準属性
---



## 関連情報

{{< partial name="whats-next/whats-next.html" >}}