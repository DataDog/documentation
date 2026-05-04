---
attributes:
- description: メトリクスで定義された発信ホストの名前です。Datadog は、Datadog 内の一致するホストから対応するホストタグを自動的に取得し、それをテレメトリに適用します。エージェントはこの値を自動的に設定します。
  domain: Reserved
  name: host
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: 送信元デバイスのタイプ。
  domain: Reserved
  name: device
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: これは、データが発生した技術である統合名に対応します。統合名と一致する場合、Datadog は対応するパーサーとファセットを自動的にインストールします。例えば、`nginx`、`postgresql`
    などです。
  domain: Reserved
  name: source
  product_source:
  - icon-log
  type: string
- description: これは、データのレベルまたは重大度に対応します。ログの場合、[ログパターン](/logs/explorer/patterns/)を定義するために使用され、ログ管理
    UI には専用のレイアウトがあります。
  domain: Reserved
  name: status
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: データを生成しているアプリケーションまたはサービスの[統一サービス名](/getting_started/tagging/unified_service_tagging/)で、ユーザーセッションを相関させるために使用されます。APM
    から他の製品に切り替えるために使用されるので、両方の製品を使用する際には同じ値を定義することを確認してください。RUM ブラウザ SDK では、サービスは特定の機能を提供するチームによって構築されたページのセットを示します。[手動ビュー追跡](/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names)を使用して、ウェブページをサービスに割り当てることができます。
  domain: Reserved
  name: service
  product_source:
  - icon-log
  - icon-rum
  - icon-apm
  - android
  - ios
  - browser
  - roku
  type: string
- description: トレースに使用されるトレース ID です。これは、トレースをログを含む他のデータと相関させるために使用されます。
  domain: Reserved
  name: trace_id
  product_source:
  - icon-log
  - icon-apm
  type: number
- description: Logs Live Tail でハイライトして表示されるログエントリの本文。全文検索のためにインデックス化されています。
  domain: Reserved
  name: message
  product_source:
  - icon-log
  type: string
- description: ログの送信時にクライアントからサーバーに転送された合計バイト数。
  domain: Network communications
  name: network.bytes_read
  product_source:
  - icon-log
  type: number
- description: ログの送信時にサーバーからクライアントに転送された合計バイト数。
  domain: Network communications
  name: network.bytes_written
  product_source:
  - icon-log
  type: number
- description: 国名。
  domain: Geolocation
  name: network.client.geoip.country.name
  product_source:
  - icon-log
  type: string
- description: 国の[ISO コード](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)（例えば、アメリカなら
    `US`、フランスなら `FR`）。
  domain: Geolocation
  name: network.client.geoip.country.iso_code
  product_source:
  - icon-log
  type: string
- description: 大陸の ISO コード (`EU`、`AS`、`NA`、`AF`、`AN`、`SA`、`OC`)。
  domain: Geolocation
  name: network.client.geoip.continent.code
  product_source:
  - icon-log
  type: string
- description: 大陸名 (`Europe`、`Australia`、`North America`、`Africa`、`Antartica`、`South
    America`、`Oceania`)。
  domain: Geolocation
  name: network.client.geoip.continent.name
  product_source:
  - icon-log
  type: string
- description: その国で最大規模の地方区分 (米国は `California` 州、フランスは `Sarthe` 県など)。
  domain: Geolocation
  name: network.client.geoip.subdivision.name
  product_source:
  - icon-log
  type: string
- description: 国の第一小区分レベルの[ISO コード](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)（例えば、アメリカなら
    `CA`、フランスなら `SA` 県）。
  domain: Geolocation
  name: network.client.geoip.subdivision.iso_code
  product_source:
  - icon-log
  type: string
- description: 都市名 (`Paris`、`New York` など)。
  domain: Geolocation
  name: network.client.geoip.city.name
  product_source:
  - icon-log
  type: string
- description: リクエスト中のリソースにリンクした Web ページのアドレスを識別する HTTP ヘッダーフィールド。
  domain: HTTP
  name: http.referer
  product_source:
  - icon-log
  type: string
- description: HTTP リクエストの ID。
  domain: HTTP
  name: http.request_id
  product_source:
  - icon-log
  type: string
- description: URL の HTTP ホスト部分。
  domain: HTTP, URL Details
  name: http.url_details.host
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: URL の HTTP ポート部分。
  domain: HTTP, URL Details
  name: http.url_details.port
  product_source:
  - icon-log
  - icon-apm
  type: number
- description: URL の HTTP パス部分。
  domain: HTTP, URL Details
  name: http.url_details.path
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: クエリパラメーターの key/value 属性として分解された、URL の HTTP クエリ文字列部分。
  domain: HTTP, URL Details
  name: http.url_details.queryString
  product_source:
  - icon-log
  - icon-apm
  type: object
- description: URL のプロトコル名 (HTTP または HTTPS)。
  domain: HTTP, URL Details
  name: http.url_details.scheme
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: User-Agent によって報告された OS ファミリー。
  domain: User-Agent
  name: http.useragent_details.os.family
  product_source:
  - icon-log
  type: string
- description: User-Agent によって報告されたブラウザファミリー。
  domain: User-Agent
  name: http.useragent_details.browser.family
  product_source:
  - icon-log
  type: string
- description: User-Agent によって報告されたデバイスファミリー。
  domain: User-Agent
  name: http.useragent_details.device.family
  product_source:
  - icon-log
  type: string
- description: ロガーの名前。
  domain: Source code
  name: logger.name
  product_source:
  - icon-log
  type: string
- description: ログの生成時の現在のスレッドの名前。
  domain: Source code
  name: logger.thread_name
  product_source:
  - icon-log
  type: string
- description: クラスメソッド名。
  domain: Source code
  name: logger.method_name
  product_source:
  - icon-log
  type: string
- description: ロガーのバージョン。
  domain: Source code
  name: logger.version
  product_source:
  - icon-log
  type: string
- description: エラーのタイプまたは種類 (場合によってはコード)。
  domain: Source code
  name: error.kind
  product_source:
  - icon-log
  type: string
- description: 接続中のデータベースの名前。例えば、Java で `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`
    の場合、インスタンス名は `customers` です。
  domain: Database
  name: db.instance
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: '指定されたデータベースタイプのデータベースステートメントです。例えば、mySQL の場合: `''SELECT * FROM wuser_table'';`、Redis
    の場合: `''SET mykey ''WuValue''''`。'
  domain: Database
  name: db.statement
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 処理を実行するユーザー。
  domain: Database
  name: db.user
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: '**nanoseconds** 単位の任意の種類の時間。HTTP 応答時間、データベースクエリ時間、レイテンシーなどがあります。[リマップ](/logs/log_configuration/processors/#remapper)ログ内の任意の期間をこの属性にマッピングしてください。Datadog
    はこれをトレース検索のデフォルトの測定値として表示および使用します。'
  domain: Performance
  name: duration
  product_source:
  - icon-log
  type: number
- description: ユーザーの識別子。
  domain: User
  name: usr.id
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: わかりやすい名前。
  domain: User
  name: usr.name
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: ユーザーの電子メール。
  domain: User
  name: usr.email
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: ホスト名。
  domain: Syslog and log shippers
  name: syslog.hostname
  product_source:
  - icon-log
  type: string
- description: アプリケーション名。通常は、予約済み属性 `service` に再マップされます。
  domain: Syslog and log shippers
  name: syslog.appname
  product_source:
  - icon-log
  type: string
- description: ログの重大度。通常は、予約済み属性 `status` に再マップされます。
  domain: Syslog and log shippers
  name: syslog.severity
  product_source:
  - icon-log
  type: number
- description: ログのタイムスタンプ。通常は、予約済み属性 `date` に再マップされます。
  domain: Syslog and log shippers
  name: syslog.timestamp
  product_source:
  - icon-log
  type: string
- description: ログのソースが由来する環境名。
  domain: Syslog and log shippers
  name: syslog.env
  product_source:
  - icon-log
  type: string
- description: DNS のクエリ識別子。
  domain: DNS
  name: dns.id
  product_source:
  - icon-log
  type: string
- description: クエリ対象のドメイン名。
  domain: DNS
  name: dns.question.name
  product_source:
  - icon-log
  type: string
- description: DNS のクエリタイプを指定する [2 オクテットコード](https://en.wikipedia.org/wiki/List_of_DNS_record_types)。
  domain: DNS
  name: dns.question.type
  product_source:
  - icon-log
  type: string
- description: DNS の質問で検索されるクラス (インターネットを使用する場合は IP など) 。
  domain: DNS
  name: dns.question.class
  product_source:
  - icon-log
  type: string
- description: DNS 質問のバイトサイズ。
  domain: DNS
  name: dns.question.size
  product_source:
  - icon-log
  type: number
- description: DNS で回答する際の IP アドレス。
  domain: DNS
  name: dns.answer.name
  product_source:
  - icon-log
  type: string
- description: DNS の回答タイプを指定する [2 オクテットコード](https://en.wikipedia.org/wiki/List_of_DNS_record_types)。
  domain: DNS
  name: dns.answer.type
  product_source:
  - icon-log
  type: string
- description: DNS によって回答されるクラス。
  domain: DNS
  name: dns.answer.class
  product_source:
  - icon-log
  type: string
- description: DNS 回答のバイトサイズ。
  domain: DNS
  name: dns.answer.size
  product_source:
  - icon-log
  type: number
- description: DNS の返答コード。
  domain: DNS
  name: dns.flags.rcode
  product_source:
  - icon-log
  type: string
- description: '同じアクティビティ (例: 認証) によって生成されたイベント間での共有名。'
  domain: Events
  name: evt.name
  product_source:
  - icon-log
  type: string
- description: 'イベントの結果 (例: `success`、`failure`)。'
  domain: Events
  name: evt.outcome
  product_source:
  - icon-log
  type: string
- description: Epoch からのイベント開始時間 (ミリ秒)
  domain: RUM core attributes
  name: date
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: integer
- description: イベントのタイプ (`view` や `resource` など)。
  domain: RUM core attributes
  name: type
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: RUM アプリケーションを作成する際に生成される Datadog アプリケーション ID。
  domain: RUM core attributes
  name: application.id
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Datadog アプリケーション名。
  domain: RUM core attributes
  name: application.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  type: string
- description: デバイスにより報告されたデバイスタイプ（システムユーザーエージェント）。
  domain: Device (Android, iOS, Roku)
  name: device.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: デバイスにより報告されたデバイスのブランド（システムユーザーエージェント）。
  domain: Device (Android, iOS, Roku)
  name: device.brand
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: デバイスにより報告されたデバイスモデル（システムユーザーエージェント）。
  domain: Device (Android, iOS, Roku)
  name: device.model
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: デバイスにより報告されたデバイス名（システムユーザーエージェント）。
  domain: Device (Android, iOS, Roku)
  name: device.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: デバイスのネットワーク到達可能性の状態 (`connected`、`not connected`、または `maybe`)。
  domain: Connectivity (Android, iOS)
  name: connectivity.status
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: 利用可能なネットワークインターフェースのリスト (`bluetooth`、`cellular`、`ethernet`、または `wifi`
    など)。
  domain: Connectivity (Android, iOS)
  name: connectivity.interfaces
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: 携帯電話の接続に使用される無線技術のタイプ。
  domain: Connectivity (Android, iOS)
  name: connectivity.cellular.technology
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: SIMを取り扱う事業者名。
  domain: Connectivity (Android, iOS)
  name: connectivity.cellular.carrier_name
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: デバイスにより報告された OS 名 (System User-Agent)。
  domain: Operating System (Android, iOS, Roku)
  name: os.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: デバイスにより報告される OS バージョン (System User-Agent)。
  domain: Operating System (Android, iOS, Roku)
  name: os.version
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: デバイスにより報告される OS バージョンメジャー (System User-Agent)。
  domain: Operating System (Android, iOS, Roku)
  name: os.version_major
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 国名。
  domain: Geolocation
  name: geo.country
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: 国の [ISO コード](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
    (例えば、アメリカなら `US`、フランスなら `FR`)。
  domain: Geolocation
  name: geo.country_iso_code
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: その国で最大規模の地方区分 (米国は `California` 州、フランスは `Sarthe` 県など)。
  domain: Geolocation
  name: geo.country_subdivision
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: 大陸の ISO コード (`EU`、`AS`、`NA`、`AF`、`AN`、`SA`、または `OC`)。
  domain: Geolocation
  name: geo.continent_code
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: 大陸名 (`Europe`、`Australia`、`North America`、`Africa`、`Antarctica`、`South
    America`、または `Oceania`)。
  domain: Geolocation
  name: geo.continent
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: 都市名 (`San Francisco`、`Paris`、`New York` など)。
  domain: Geolocation
  name: geo.city
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: ユーザーの識別子。
  domain: RUM user attributes (Android, Roku)
  name: user.id
  product_source:
  - icon-rum
  - android
  - roku
  type: string
- description: ユーザーの識別子。
  domain: RUM user attributes (iOS, Browser)
  name: usr.id
  product_source:
  - icon-rum
  - ios
  - browser
  type: string
- description: ユーザーの名前。
  domain: Global user attributes (Android, iOS, Browser, Roku)
  name: usr.name
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: ユーザーのメールアドレス。
  domain: Global user attributes (Android, iOS, Browser, Roku)
  name: usr.email
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: セッションのユニーク ID。
  domain: Session (Android events, iOS events, Roku events)
  name: session.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: セッションのタイプ (`user`)。
  domain: Session (Android events, iOS events, Roku events)
  name: session.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: セッションが現在アクティブかどうかを示します。ユーザーがアプリケーションから移動したり、ブラウザウィンドウを閉じたりするとセッションは終了し、4時間の活動または15分の非活動時間が経過すると失効します。
  domain: Session (Android events, iOS events, Roku events)
  name: session.is_active
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: boolean
- description: セッションの初期ビューの URL。
  domain: Session (Android events, iOS events, Roku events)
  name: session.initial_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: セッションの初期ビューの名前。
  domain: Session (Android events, iOS events, Roku events)
  name: session.initial_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: セッションの最後のビューの URL。
  domain: Session (Android events, iOS events, Roku events)
  name: session.last_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: セッションの最後のビューの名前。
  domain: Session (Android events, iOS events, Roku events)
  name: session.last_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: インテークの TCP 接続から抽出されたセッションの IP アドレス。この属性の収集を停止したい場合は、[アプリケーションの詳細](/data_security/real_user_monitoring/#ip-address)で設定を変更してください。
  domain: Session (Android events, iOS events, Roku events)
  name: session.ip
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: デバイスの情報を解釈するためのシステム `User-Agent` 情報。
  domain: Session (Android events, iOS events, Roku events)
  name: session.useragent
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: イベントに対応する初期ビューのユニーク ID。
  domain: View (Android events, iOS events, Roku events)
  name: view.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: イベントに対応するクラスの正規の名前。iOSの場合、イベントに対応する `UIViewController` クラスのURL。
  domain: View (Android events, iOS events, Roku events)
  name: view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: イベントに対応する、カスタマイズ可能なビューの名前。
  domain: View (Android events, iOS events, Roku events)
  name: view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: リソースの一意の識別子。
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 収集されるリソースのタイプ (`xhr`、`image`、`font`、`css`、または `js` など)。
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: HTTP メソッド (`POST`、`GET` `PATCH`、または `DELETE` など)。
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 応答ステータスコード
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: number
- description: リソースの URL。
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: リソースプロバイダー名。デフォルトは `unknown` です。
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: リソースプロバイダーのドメイン。
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: リソースプロバイダーのタイプ (`first-party`、`cdn`、`ad`、または `analytics` など)。
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: エラーの発生元 (`webview`、`logger`、`network` など)。
  domain: Error (Browser events, Android events, iOS events, Roku events)
  name: error.source
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: エラーのタイプ (場合によってはエラーコード)。
  domain: Error (Browser events, Android events, iOS events, Roku events)
  name: error.type
  product_source:
  - icon-apm
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: イベントについて簡潔にわかりやすく説明する 1 行メッセージ。
  domain: Error (Browser events, Android events, iOS events, Roku events)
  name: error.message
  product_source:
  - icon-apm
  - icon-log
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: スタックトレースまたはエラーに関する補足情報。
  domain: Error (Browser events, Android events, iOS events, Roku events)
  name: error.stack
  product_source:
  - icon-apm
  - icon-log
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: スタックトレースまたはエラーに関する補足情報。
  domain: Error (Android events, iOS events, Roku events)
  name: error.issue_id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 応答ステータスコード
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: number
- description: HTTP メソッド (`POST` または `GET` など)。
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: リソースの URL。
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: リソースプロバイダー名。デフォルトは `unknown` です。
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: リソースプロバイダーのドメイン。
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: リソースプロバイダーのタイプ (`first-party`、`cdn`、`ad`、または `analytics` など)。
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: ユーザーアクションの UUID。
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.id
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: ユーザーアクションのタイプ (`tap` または `application_start` など)。[カスタムブラウザユーザーアクション](/real_user_monitoring/application_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions)の場合には、`custom`
    に設定されます。
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.type
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: わかりやすい名前 (例えば、`Click on checkout`)。[カスタムブラウザユーザーアクション](/real_user_monitoring/application_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions)の場合には、APIコールで指定されたアクション名。
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: ユーザーが操作した要素。自動的に収集されたアクションのみ。
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.target.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: ページビューごとにランダムに生成された ID。
  domain: View (Browser)
  name: view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: 'ページ読み込みのタイプ: `initial_load` または `route_change`。詳細については、[シングルページアプリケーションサポートドキュメント](/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa)を参照してください。'
  domain: View (Browser)
  name: view.loading_type
  product_source:
  - icon-rum
  - browser
  type: string
- description: 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。
  domain: View (Browser)
  name: view.referrer
  product_source:
  - icon-rum
  - browser
  type: string
- description: ビューの URL。
  domain: View (Browser)
  name: view.url
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL のハッシュ部分。
  domain: View (Browser)
  name: view.url_hash
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL のホスト部分。
  domain: View (Browser)
  name: view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL のパス部分。
  domain: View (Browser)
  name: view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: 同様の URL に対して生成された自動 URL グループ。( `/dashboard/123` と `/dashboard/456`
    に対する `/dashboard/?`　など)。
  domain: View (Browser)
  name: view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。
  domain: View (Browser)
  name: view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: URL のスキーム部分。
  domain: View (Browser)
  name: view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: デバイスによって報告されたデバイスタイプ (User-Agent HTTP ヘッダー)。
  domain: Device (Browser)
  name: device.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: デバイスによって報告されたデバイスブランド (User-Agent HTTP ヘッダー)。
  domain: Device (Browser)
  name: device.brand
  product_source:
  - icon-rum
  - browser
  type: string
- description: デバイスによって報告されたデバイスモデル (User-Agent HTTP ヘッダー)。
  domain: Device (Browser)
  name: device.model
  product_source:
  - icon-rum
  - browser
  type: string
- description: デバイスによって報告されたデバイス名 (User-Agent HTTP ヘッダー)。
  domain: Device (Browser)
  name: device.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: デバイスによって報告された OS 名 (User-Agent HTTP ヘッダー)。
  domain: Operating system (Browser)
  name: os.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: デバイスによって報告された OS バージョン (User-Agent HTTP ヘッダー)。
  domain: Operating system (Browser)
  name: os.version
  product_source:
  - icon-rum
  - browser
  type: string
- description: デバイスによって報告された OS バージョンメジャー (User-Agent HTTP ヘッダー)。
  domain: Operating system (Browser)
  name: os.version_major
  product_source:
  - icon-rum
  - browser
  type: string
- description: セッションごとにランダムに生成された ID。
  domain: Session (Browser events)
  name: session.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: クライアントのIPアドレス。この属性の収集を停止したい場合は、[アプリケーションの詳細](/data_security/real_user_monitoring/#ip-address)で設定を変更してください。
  domain: Session (Browser events)
  name: session.ip
  product_source:
  - icon-rum
  - browser
  type: string
- description: セッションが現在アクティブかどうかを示します。セッションは4時間の活動または15分の非活動時間が経過すると終了します。
  domain: Session (Browser events)
  name: session.is_active
  product_source:
  - icon-rum
  - browser
  type: boolean
- description: セッションのタイプ、`user` または `synthetics`。[Synthetic Browser Tests](/synthetics/browser_tests/)
    からのセッションは請求の対象外です。
  domain: Session (Browser events)
  name: session.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: 現在リクエストされているページへのリンクがたどられた前のウェブページの URL。
  domain: Session (Browser events)
  name: session.referrer
  product_source:
  - icon-rum
  - browser
  type: string
- description: ユーザーによって生成された最初の RUM ビューの ID。
  domain: Session (Browser events)
  name: session.initial_view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL のホスト部分。
  domain: Session (Browser events)
  name: session.initial_view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL のパス部分。
  domain: Session (Browser events)
  name: session.initial_view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: 同様の URL に対して生成された自動 URL グループ。( `/dashboard/123` と `/dashboard/456`
    に対する `/dashboard/?`　など)。
  domain: Session (Browser events)
  name: session.initial_view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。
  domain: Session (Browser events)
  name: session.initial_view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: URL のスキーム部分。
  domain: Session (Browser events)
  name: session.initial_view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: ユーザーによって生成された最後の RUM ビューの ID。
  domain: Session (Browser events)
  name: session.last_view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL のホスト部分。
  domain: Session (Browser events)
  name: session.last_view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL のパス部分。
  domain: Session (Browser events)
  name: session.last_view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: 同様の URL に対して生成された自動 URL グループ。( `/dashboard/123` と `/dashboard/456`
    に対する `/dashboard/?`　など)。
  domain: Session (Browser events)
  name: session.last_view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。
  domain: Session (Browser events)
  name: session.last_view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: URL のスキーム部分。
  domain: Session (Browser events)
  name: session.last_view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: 収集されるリソースのタイプ (`css`、`javascript`、`media`、`XHR`、または `image` など)。
  domain: Resource (Browser events)
  name: resource.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: HTTP メソッド (`POST` または `GET` など)。
  domain: Resource (Browser events)
  name: resource.method
  product_source:
  - icon-rum
  - browser
  type: string
- description: 応答ステータスコード
  domain: Resource (Browser events)
  name: resource.status_code
  product_source:
  - icon-rum
  - browser
  type: number
- description: リソースの URL。
  domain: Resource (Browser events)
  name: resource.url
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL のホスト部分。
  domain: Resource (Browser events)
  name: resource.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL のパス部分。
  domain: Resource (Browser events)
  name: resource.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: クエリパラメーターの key/value 属性として分解された、URL のクエリ文字列部分。
  domain: Resource (Browser events)
  name: resource.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: URL のプロトコル名 (HTTP または HTTPS)。
  domain: Resource (Browser events)
  name: resource.url_scheme
  product_source:
  - icon-rum
  - browser
  type: string
- description: リソースプロバイダー名。デフォルトは `unknown` です。
  domain: Resource (Browser events)
  name: resource.provider.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: リソースプロバイダーのドメイン。
  domain: Resource (Browser events)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - browser
  type: string
- description: リソースプロバイダーのタイプ (`first-party`、`cdn`、`ad`、または `analytics` など)。
  domain: Resource (Browser events)
  name: resource.provider.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: RUM ブラウザ SDK で検出されたデッドクリック。
  domain: Frustration signals (Browser events)
  name: action.frustration.type:dead_click
  product_source:
  - icon-rum
  - browser
  type: string
- description: RUM ブラウザ SDK で検出されたレイジークリック。
  domain: Frustration signals (Browser events)
  name: action.frustration.type:rage_click
  product_source:
  - icon-rum
  - browser
  type: string
- description: RUM ブラウザ SDK で検出されたエラークリック。
  domain: Frustration signals (Browser events)
  name: action.frustration.type:error_click
  product_source:
  - icon-rum
  - browser
  type: string
- description: トラフィックのソースを追跡する URL のパラメーター。
  domain: UTM (Browser events)
  name: view.url_query.utm_source
  product_source:
  - icon-rum
  - browser
  type: string
- description: トラフィックの発信元チャンネルを追跡する URL のパラメーター。
  domain: UTM (Browser events)
  name: view.url_query.utm_medium
  product_source:
  - icon-rum
  - browser
  type: string
- description: そのビューに紐づく特定のマーケティングキャンペーンを識別する URL のパラメーター。
  domain: UTM (Browser events)
  name: view.url_query.utm_campaign
  product_source:
  - icon-rum
  - browser
  type: string
- description: マーケティングキャンペーン内でユーザーがクリックした特定の要素を特定する URL 内のパラメーター。
  domain: UTM (Browser events)
  name: view.url_query.utm_content
  product_source:
  - icon-rum
  - browser
  type: string
- description: ユーザーが特定のキャンペーンをトリガーするために検索したキーワードを追跡する URL のパラメーター。
  domain: UTM (Browser events)
  name: view.url_query.utm_term
  product_source:
  - icon-rum
  - browser
  type: string
- description: スパンを生成するために使用されるクライアント SDK の言語。`cpp`、`dotnet`、`go`、`jvm`、`javascript`、`php`、`python`、`ruby`
    のいずれかです。
  domain: APM core
  name: language
  product_source:
  - icon-apm
  type: string
- description: 実行中のプロセスの `DD_ENV` 環境変数の値、またはユーザー定義の `env` の値。
  domain: APM core (Reserved)
  name: env
  product_source:
  - icon-apm
  type: string
- description: 実行中のプロセスの `DD_VERSION` 環境変数の値、またはユーザー定義の `version` の値。
  domain: APM core (Reserved)
  name: version
  product_source:
  - icon-apm
  type: string
- description: スパンが処理する作業単位のタイプを表す文字列。サーバー、クライアント、プロデューサー、コンシューマー、または内部のいずれかです。詳細については、[OpenTelemetry
    SpanKind ドキュメント](https://opentelemetry.io/docs/specs/otel/trace/api/#spankind)を参照してください。
  domain: APM core
  name: span.kind
  product_source:
  - icon-apm
  type: string
- description: スパンを作成したライブラリまたはインテグレーションの名前。
  domain: APM core
  name: component
  product_source:
  - icon-apm
  type: string
- description: インバウンド接続を開始したクライアントの IP アドレス。
  domain: Network communications
  name: network.client.ip
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: アウトバウンド接続が行われる IP アドレス。
  domain: Network communications
  name: network.destination.ip
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: ローカルホストの IP アドレス。
  domain: Network communications
  name: network.host.ip
  product_source:
  - icon-apm
  type: string
- description: 接続を開始したクライアントのポート。
  domain: Network communications
  name: network.client.port
  product_source:
  - icon-apm
  - icon-log
  type: number
- description: アウトバウンド接続のリモートポート番号。
  domain: Network communications
  name: network.destination.port
  product_source:
  - icon-apm
  - icon-log
  type: number
- description: インバウンド接続を開始したクライアントのホスト名。
  domain: Network communications
  name: network.client.name
  product_source:
  - icon-apm
  type: string
- description: ローカルホスト名。
  domain: Network communications
  name: network.host.name
  product_source:
  - icon-apm
  type: string
- description: インバウンド接続に使用されるトランスポートプロトコル。
  domain: Network communications
  name: network.client.transport
  product_source:
  - icon-apm
  type: string
- description: アウトバウンド接続に使用されるトランスポートプロトコル。
  domain: Network communications
  name: network.destination.transport
  product_source:
  - icon-apm
  type: string
- description: HTTP 応答ステータスコード。
  domain: HTTP requests
  name: http.status_code
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: HTTP リクエストの URL、難読化されたクエリ文字列を含みます。難読化に関する詳細は、[データセキュリティの構成](https://docs.datadoghq.com/tracing/configure_data_security/)を参照してください。
  domain: HTTP requests
  name: http.url
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 'リクエストに使用された HTTP のバージョン。 '
  domain: HTTP requests
  name: http.version
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 接続を開始したクライアントのポート。
  domain: HTTP requests
  name: http.method
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: マッチしたルート (パステンプレート)。例えば、`/users/:userID`。
  domain: HTTP requests
  name: http.route
  product_source:
  - icon-apm
  type: string
- description: すべてのプロキシの背後にいる元のクライアントの IP アドレス、もし知られている場合。`X-Forwarded-For` などのヘッダーから発見されました。
  domain: HTTP requests
  name: http.client_ip
  product_source:
  - icon-apm
  type: string
- description: リクエストとともに受け取った `User-Agent` ヘッダー。
  domain: HTTP requests
  name: http.useragent
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: リクエストペイロード本文のサイズ (バイト単位)。
  domain: HTTP requests
  name: http.request.content_length
  product_source:
  - icon-apm
  type: number
- description: レスポンスペイロード本文のサイズ (バイト単位)。
  domain: HTTP requests
  name: http.response.content_length
  product_source:
  - icon-apm
  type: number
- description: トランスポートデコード後の非圧縮リクエストペイロードのサイズ。
  domain: HTTP requests
  name: http.request.content_length_uncompressed
  product_source:
  - icon-apm
  type: number
- description: トランスポートデコード後の非圧縮レスポンスペイロードのサイズ。
  domain: HTTP requests
  name: http.response.content_length_uncompressed
  product_source:
  - icon-apm
  type: number
- description: リクエストの HTTP ヘッダー。デフォルトでは何も収集されませんが、オプションで `DD_TRACE_HEADER_TAGS` を用いて構成することができます。
  domain: HTTP requests
  name: http.request.headers.*
  product_source:
  - icon-apm
  type: string
- description: 使用しているデータベース管理システム (DBMS) 製品の識別子。
  domain: Database spans
  name: db.system
  product_source:
  - icon-apm
  type: string
- description: レスポンスの HTTP ヘッダー。デフォルトでは何も収集されませんが、オプションで `DD_TRACE_HEADER_TAGS` を用いて構成することができます。
  domain: HTTP requests
  name: http.response.headers.*
  product_source:
  - icon-apm
  type: string
- description: データベースへの接続に使用する接続文字列。
  domain: Database spans
  name: db.connection_string
  product_source:
  - icon-apm
  type: string
- description: 実行されている操作の名前。例えば、`SELECT`、`findAndModify`、`HMSET`。
  domain: Database spans
  name: db.operation
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: データベース名 (該当する場合) を含む、操作の対象となる主テーブルの名前。
  domain: Database spans
  name: db.sql.table
  product_source:
  - icon-apm
  type: string
- description: クエリまたは操作の行数/結果数。
  domain: Database spans
  name: db.row_count
  product_source:
  - icon-apm
  type: number
- description: メッセージングシステムの識別子。
  domain: Message queue spans
  name: messaging.system
  product_source:
  - icon-apm
  type: string
- description: メッセージの宛先名。
  domain: Message queue spans
  name: messaging.destination
  product_source:
  - icon-apm
  type: string
- description: メッセージの宛先の種類。
  domain: Message queue spans
  name: messaging.destination_kind
  product_source:
  - icon-apm
  type: string
- description: トランスポートプロトコルの名前。
  domain: Message queue spans
  name: messaging.protocol
  product_source:
  - icon-apm
  type: string
- description: トランスポートプロトコルのバージョン。
  domain: Message queue spans
  name: messaging.protocol_version
  product_source:
  - icon-apm
  type: string
- description: メッセージングシステムへの接続文字列。
  domain: Message queue spans
  name: messaging.url
  product_source:
  - icon-apm
  type: string
- description: メッセージングシステムがメッセージの識別子として使用する値で、文字列として表される。
  domain: Message queue spans
  name: messaging.message_id
  product_source:
  - icon-apm
  type: string
- description: メッセージが属する会話を識別する会話の ID で、文字列として表現される。
  domain: Message queue spans
  name: messaging.conversation_id
  product_source:
  - icon-apm
  type: string
- description: 圧縮されていないメッセージペイロードのサイズ (バイト数)。
  domain: Message queue spans
  name: messaging.message_payload_size
  product_source:
  - icon-apm
  type: number
- description: 消費メッセージの種類を示す文字列。例えば、`send` (プロデューサーに送るメッセージ)、`receive` (コンシューマーが受け取るメッセージ)、または
    `process` (以前に受け取ったメッセージをコンシューマーが処理する)。
  domain: Message queue spans
  name: messaging.operation
  product_source:
  - icon-apm
  type: string
- description: メッセージを受信するコンシューマーの識別子。
  domain: Message queue spans
  name: messaging.consumer_id
  product_source:
  - icon-apm
  type: string
- description: リモートシステムの識別子。
  domain: Remote procedure calls
  name: rpc.system
  product_source:
  - icon-apm
  type: string
- description: 呼び出されるサービスの名前。
  domain: Remote procedure calls
  name: rpc.service
  product_source:
  - icon-apm
  type: string
- description: 呼び出されるメソッドの名前。
  domain: Remote procedure calls
  name: rpc.method
  product_source:
  - icon-apm
  type: string
content: 以下の表は、データドッグにエージェントによって送信されるデータドメインに適用される各RUM、ログ、APM製品によって自動的に適用される属性を示しています。オプションで、製品別にリストをフィルタリングしたり、キーワードや説明文で検索して興味のある属性を見つけることができます。
description: データドッグにエージェントによって送信されるデータドメインに適用される各RUM、ログ、APM製品によって自動的に適用される属性の表です。
disable_sidebar: true
filter_all: All
further_reading:
- link: /data_security/
  tag: よくあるご質問
  text: Datadog に送信されるデータのセキュリティ確保
- link: /tracing/trace_collection/tracing_naming_convention/
  tag: よくあるご質問
  text: スパンタグのセマンティクス
title: デフォルトの標準属性
---
参考資料

{{< partial name="whats-next/whats-next.html" >}}