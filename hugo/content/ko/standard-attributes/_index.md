---
attributes:
- description: 메트릭에 정의된 원본 호스트 이름입니다. Datadog은 Datadog의 일치하는 호스트에서 해당하는 호스트 태그를 자동으로
    검색해 사용자의 텔레메트리에 적용합니다. Agent가 이 값을 자동으로 설정합니다.
  domain: Reserved
  name: host
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: 원본 장치의 유형입니다.
  domain: Reserved
  name: device
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: 이것은 데이터의 출처가 되는 기술, 즉 통합 이름에 해당합니다. 이것이 통합 이름과 일치하면 Datadog이 해당하는 파서
    및 패싯을 자동으로 설치합니다. 예를 들어 `nginx`, `postgresql` 등과 같습니다.
  domain: Reserved
  name: source
  product_source:
  - icon-log
  type: string
- description: 이것은 데이터의 수준 또는 심각도에 해당합니다. 로그의 경우, [로그 패턴](/logs/explorer/patterns/)을
    정의하는 데 사용되며 Log Management UI에 전용 레이아웃이 있습니다.
  domain: Reserved
  name: status
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: 데이터를 생성 중인 애플리케이션 또는 서비스의 [unified service name](/getting_started/tagging/unified_service_tagging/)이며,
    사용자 세션을 상호 연계하는 데 사용됩니다. 이것은 APM에서 다른 제품으로 전환하는 데 사용되므로, 두 제품을 모두 사용하는 경우 같은 값을
    정의해야 합니다. RUM 브라우저 SDK에서 서비스는 브라우저 애플리케이션에서 특정 기능을 제공하도록 팀에서 구축한 일련의 페이지를 나타냅니다.
    [수동 뷰 추적](/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names)을
    사용하여 서비스에 웹 페이지를 할당할 수 있습니다.
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
- description: 트레이스에 사용되는 트레이스 ID입니다. 트레이스를 로그 등 다른 데이터와 상호 연계하는 데 사용됩니다.
  domain: Reserved
  name: trace_id
  product_source:
  - icon-log
  - icon-apm
  type: number
- description: 로그 항목의 본문으로, Logs Live Tail에 강조 표시되어 표시되며 전체 텍스트 검색을 위해 인덱싱됩니다.
  domain: Reserved
  name: message
  product_source:
  - icon-log
  type: string
- description: 로그 전송 시 클라이언트에서 서버로 전송된 총 바이트 수입니다.
  domain: Network communications
  name: network.bytes_read
  product_source:
  - icon-log
  type: number
- description: 로그 전송 시 서버에서 클라이언트로 전송된 총 바이트 수입니다.
  domain: Network communications
  name: network.bytes_written
  product_source:
  - icon-log
  type: number
- description: 국가 이름입니다.
  domain: Geolocation
  name: network.client.geoip.country.name
  product_source:
  - icon-log
  type: string
- description: '해당 국가의 [ISO 코드](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)(예:
    미국의 경우 `US`, 프랑스의 경우 `FR`)입니다.'
  domain: Geolocation
  name: network.client.geoip.country.iso_code
  product_source:
  - icon-log
  type: string
- description: 대륙의 ISO 코드입니다(`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).
  domain: Geolocation
  name: network.client.geoip.continent.code
  product_source:
  - icon-log
  type: string
- description: 대륙 이름입니다(`Europe`, `Australia`, `North America`, `Africa`, `Antartica`,
    `South America`, `Oceania`).
  domain: Geolocation
  name: network.client.geoip.continent.name
  product_source:
  - icon-log
  type: string
- description: '국가의 첫 번째 하위 행정 구역 이름입니다(예: 미국의 `California` 또는 프랑스의 `Sarthe` 데파르트망).'
  domain: Geolocation
  name: network.client.geoip.subdivision.name
  product_source:
  - icon-log
  type: string
- description: '국가의 첫 번째 하위 행정 구역 [ISO 코드](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)입니다(예:
    미국의 `CA` 또는 프랑스의 `SA` 데파르트망).'
  domain: Geolocation
  name: network.client.geoip.subdivision.iso_code
  product_source:
  - icon-log
  type: string
- description: '도시 이름입니다(예: `Paris`, `New York`).'
  domain: Geolocation
  name: network.client.geoip.city.name
  product_source:
  - icon-log
  type: string
- description: 요청 중인 리소스에 연결된 웹페이지의 주소를 식별하는 HTTP 헤더 필드입니다.
  domain: HTTP
  name: http.referer
  product_source:
  - icon-log
  type: string
- description: HTTP 요청의 ID입니다.
  domain: HTTP
  name: http.request_id
  product_source:
  - icon-log
  type: string
- description: URL의 HTTP 호스트 부분입니다.
  domain: HTTP, URL Details
  name: http.url_details.host
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: URL의 HTTP 포트 부분입니다.
  domain: HTTP, URL Details
  name: http.url_details.port
  product_source:
  - icon-log
  - icon-apm
  type: number
- description: URL의 HTTP 경로 부분입니다.
  domain: HTTP, URL Details
  name: http.url_details.path
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: URL의 HTTP 쿼리 문자열 부분을 쿼리 파라미터의 키/값 속성으로 분해한 것입니다.
  domain: HTTP, URL Details
  name: http.url_details.queryString
  product_source:
  - icon-log
  - icon-apm
  type: object
- description: URL의 프로토콜 이름입니다(HTTP 또는 HTTPS).
  domain: HTTP, URL Details
  name: http.url_details.scheme
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: User-Agent에서 보고한 OS 제품군입니다.
  domain: User-Agent
  name: http.useragent_details.os.family
  product_source:
  - icon-log
  type: string
- description: User-Agent에서 보고한 브라우저 제품군입니다.
  domain: User-Agent
  name: http.useragent_details.browser.family
  product_source:
  - icon-log
  type: string
- description: User-Agent에서 보고한 장치 제품군입니다.
  domain: User-Agent
  name: http.useragent_details.device.family
  product_source:
  - icon-log
  type: string
- description: 로거 이름입니다.
  domain: Source code
  name: logger.name
  product_source:
  - icon-log
  type: string
- description: 로그가 실행될 때 현재 스레드의 이름입니다.
  domain: Source code
  name: logger.thread_name
  product_source:
  - icon-log
  type: string
- description: 클래스 메서드 이름입니다.
  domain: Source code
  name: logger.method_name
  product_source:
  - icon-log
  type: string
- description: 로거 버전입니다.
  domain: Source code
  name: logger.version
  product_source:
  - icon-log
  type: string
- description: 오류 유형 또는 종류(또는 경우에 따라 오류 코드)입니다.
  domain: Source code
  name: error.kind
  product_source:
  - icon-log
  type: string
- description: 연결되는 데이터베이스의 이름입니다. 예를 들어 Java에서 `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`이면
    인스턴스 이름은 `customers`입니다.
  domain: Database
  name: db.instance
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 주어진 데이터베이스 유형의 데이터베이스 문입니다. 예를 들어 mySQL의 경우 `'SELECT * FROM wuser_table';`이고
    Redis의 경우 `'SET mykey 'WuValue''`입니다.
  domain: Database
  name: db.statement
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 작업을 수행하는 사용자입니다.
  domain: Database
  name: db.user
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: HTTP 응답 시간, 데이터베이스 쿼리 시간, 지연 시간 등 종류를 불문한 기간을 **나노초** 단위로 나타낸 것입니다.
    로그 내 각종 기간을 이 속성으로 [리매핑](/logs/log_configuration/processors/remapper/)합니다. Datadog가
    이것을 트레이스 검색의 기본 측정 단위로 표시 및 사용하기 때문입니다.
  domain: Performance
  name: duration
  product_source:
  - icon-log
  type: number
- description: 사용자 식별자입니다.
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
- description: 사용자 친화적인 이름입니다.
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
- description: 사용자 이메일입니다.
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
- description: 호스트 이름입니다.
  domain: Syslog and log shippers
  name: syslog.hostname
  product_source:
  - icon-log
  type: string
- description: 애플리케이션 이름입니다. 일반적으로 `service` 예약 속성에 리매핑됩니다.
  domain: Syslog and log shippers
  name: syslog.appname
  product_source:
  - icon-log
  type: string
- description: 로그 심각도입니다. 일반적으로 `status` 예약 속성에 리매핑됩니다.
  domain: Syslog and log shippers
  name: syslog.severity
  product_source:
  - icon-log
  type: number
- description: 로그 타임스탬프입니다. 일반적으로 `date` 예약 속성에 리매핑됩니다.
  domain: Syslog and log shippers
  name: syslog.timestamp
  product_source:
  - icon-log
  type: string
- description: 로그의 출처가 된 환경 이름입니다.
  domain: Syslog and log shippers
  name: syslog.env
  product_source:
  - icon-log
  type: string
- description: DNS 쿼리 식별자입니다.
  domain: DNS
  name: dns.id
  product_source:
  - icon-log
  type: string
- description: 쿼리한 도메인 이름입니다.
  domain: DNS
  name: dns.question.name
  product_source:
  - icon-log
  type: string
- description: DNS 질문 유형을 지정하는 [2옥텟 코드](https://en.wikipedia.org/wiki/List_of_DNS_record_types)입니다.
  domain: DNS
  name: dns.question.type
  product_source:
  - icon-log
  type: string
- description: 'DNS 질문으로 조회된 클래스입니다(예: 인터넷 사용 시 IP).'
  domain: DNS
  name: dns.question.class
  product_source:
  - icon-log
  type: string
- description: 바이트 단위의 DNS 질문 크기입니다.
  domain: DNS
  name: dns.question.size
  product_source:
  - icon-log
  type: number
- description: DNS가 응답하는 IP 주소입니다.
  domain: DNS
  name: dns.answer.name
  product_source:
  - icon-log
  type: string
- description: DNS 응답 유형을 지정하는 [2옥텟 코드](https://en.wikipedia.org/wiki/List_of_DNS_record_types)입니다.
  domain: DNS
  name: dns.answer.type
  product_source:
  - icon-log
  type: string
- description: DNS가 응답한 클래스입니다.
  domain: DNS
  name: dns.answer.class
  product_source:
  - icon-log
  type: string
- description: 바이트 단위의 DNS 답변 크기입니다.
  domain: DNS
  name: dns.answer.size
  product_source:
  - icon-log
  type: number
- description: DNS 응답 코드입니다.
  domain: DNS
  name: dns.flags.rcode
  product_source:
  - icon-log
  type: string
- description: '동일한 활동(예: 인증)에 의해 생성된 이벤트 전반에 걸친 공유 이름입니다.'
  domain: Events
  name: evt.name
  product_source:
  - icon-log
  type: string
- description: '이벤트의 결과입니다(예: `success`, `failure`).'
  domain: Events
  name: evt.outcome
  product_source:
  - icon-log
  type: string
- description: 에포크 기준 이벤트 시작 시각(밀리초 단위)입니다.
  domain: RUM core attributes
  name: date
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: integer
- description: '이벤트 유형입니다(예: `view` 또는 `resource`).'
  domain: RUM core attributes
  name: type
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: RUM 애플리케이션을 만들 때 생성되는 Datadog 애플리케이션 ID입니다.
  domain: RUM core attributes
  name: application.id
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Datadog 애플리케이션 이름입니다.
  domain: RUM core attributes
  name: application.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  type: string
- description: 장치에서 보고한 장치 유형입니다(시스템 User-Agent).
  domain: Device (Android, iOS, Roku)
  name: device.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 장치에서 보고한 장치 브랜드입니다(시스템 User-Agent).
  domain: Device (Android, iOS, Roku)
  name: device.brand
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 장치에서 보고한 장치 모델입니다(시스템 User-Agent).
  domain: Device (Android, iOS, Roku)
  name: device.model
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 장치에서 보고한 장치 이름입니다(시스템 User-Agent).
  domain: Device (Android, iOS, Roku)
  name: device.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 장치 네트워크 도달 가능성 상태입니다(`connected`, `not connected` 또는 `maybe`).
  domain: Connectivity (Android, iOS)
  name: connectivity.status
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: '사용 가능한 네트워크 인터페이스 목록입니다(예: `bluetooth`, `cellular`, `ethernet` 또는
    `wifi`).'
  domain: Connectivity (Android, iOS)
  name: connectivity.interfaces
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: 셀룰러 연결에 사용되는 무선 기술의 유형입니다.
  domain: Connectivity (Android, iOS)
  name: connectivity.cellular.technology
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: SIM 캐리어 이름입니다.
  domain: Connectivity (Android, iOS)
  name: connectivity.cellular.carrier_name
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: 장치에서 보고한 OS 이름입니다(시스템 User-Agent).
  domain: Operating System (Android, iOS, Roku)
  name: os.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 장치에서 보고한 OS 버전입니다(시스템 User-Agent).
  domain: Operating System (Android, iOS, Roku)
  name: os.version
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 장치에서 보고한 OS 주요 버전입니다(시스템 User-Agent).
  domain: Operating System (Android, iOS, Roku)
  name: os.version_major
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 국가 이름입니다.
  domain: Geolocation
  name: geo.country
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: '해당 국가의 [ISO 코드](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)(예:
    미국의 경우 `US`, 프랑스의 경우 `FR`)입니다.'
  domain: Geolocation
  name: geo.country_iso_code
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: '국가의 첫 번째 하위 행정 구역 이름입니다(예: 미국의 `California` 또는 프랑스의 `Sarthe` 데파르트망).'
  domain: Geolocation
  name: geo.country_subdivision
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: 대륙의 ISO 코드(`EU`, `AS`, `NA`, `AF`, `AN`, `SA` 또는 `OC`)입니다.
  domain: Geolocation
  name: geo.continent_code
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: 대륙의 이름(`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`,
    `South America` 또는 `Oceania`)입니다.
  domain: Geolocation
  name: geo.continent
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: '도시 이름입니다(예: `San Francisco`, `Paris` 또는 `New York`).'
  domain: Geolocation
  name: geo.city
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: 사용자의 식별자입니다.
  domain: RUM user attributes
  name: usr.id
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: 사용자 이름입니다.
  domain: Global user attributes (Android, iOS, Browser, Roku)
  name: usr.name
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: 사용자의 이메일입니다.
  domain: Global user attributes (Android, iOS, Browser, Roku)
  name: usr.email
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: 세션의 고유 ID입니다.
  domain: Session (Android events, iOS events, Roku events)
  name: session.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 세션 유형입니다(`user`).
  domain: Session (Android events, iOS events, Roku events)
  name: session.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 세션이 현재 활성인지 나타냅니다. 사용자가 애플리케이션 밖으로 이동하거나 브라우저 창을 닫으면 세션이 종료되고, 활동한지
    4시간 또는 활동 없이 15분이 지나면 만료됩니다.
  domain: Session (Android events, iOS events, Roku events)
  name: session.is_active
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: boolean
- description: 세션 초기 조회의 URL입니다.
  domain: Session (Android events, iOS events, Roku events)
  name: session.initial_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 세션 초기 조회의 이름입니다.
  domain: Session (Android events, iOS events, Roku events)
  name: session.initial_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 세션 마지막 조회의 URL입니다.
  domain: Session (Android events, iOS events, Roku events)
  name: session.last_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 세션 마지막 조회의 이름입니다.
  domain: Session (Android events, iOS events, Roku events)
  name: session.last_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 인테이크의 TCP 연결에서 추출한 세션의 IP 주소입니다. 이 속성의 수집을 중지하려면, [애플리케이션 세부 정보](/data_security/real_user_monitoring/#ip-address)에서
    설정을 변경하세요.
  domain: Session (Android events, iOS events, Roku events)
  name: session.ip
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 장치 정보를 해석하는 시스템 `User-Agent` 정보입니다.
  domain: Session (Android events, iOS events, Roku events)
  name: session.useragent
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 이벤트에 해당하는 초기 조회의 고유 ID입니다.
  domain: View (Android events, iOS events, Roku events)
  name: view.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 이벤트에 해당하는 클래스의 정식 이름입니다. iOS의 경우, 이벤트에 해당하는 `UIViewController` 클래스의
    URL입니다.
  domain: View (Android events, iOS events, Roku events)
  name: view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 이벤트에 해당하는 조회의 사용자 지정 가능한 이름입니다.
  domain: View (Android events, iOS events, Roku events)
  name: view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 리소스의 고유 식별자입니다.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: '수집 중인 리소스의 유형입니다(예: `xhr`, `image`, `font`, `css` 또는 `js`).'
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 'HTTP 메서드(예: `POST`, `GET`, `PATCH` 또는 `DELETE`)입니다.'
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 응답 상태 코드입니다.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: number
- description: 리소스 URL입니다.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 리소스 공급자 이름입니다. 기본값은 `unknown`입니다.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 리소스 공급자 도메인입니다.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: '리소스 공급자 유형입니다(예: `first-party`, `cdn`, `ad` 또는 `analytics`).'
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: '오류가 발생하는 곳입니다(예: `webview`, `logger` 또는 `network`).'
  domain: Error (Browser events, Android events, iOS events, Roku events)
  name: error.source
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: 오류 유형(또는 경우에 따라 오류 코드)입니다.
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
- description: 이벤트를 설명하는 간결하고 사람이 읽을 수 있는 한 줄짜리 메시지입니다.
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
- description: 스택 트레이스(stack trace) 또는 오류에 대한 보완 정보입니다.
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
- description: 오류의 UUID입니다.
  domain: Error (Android events, iOS events, Roku events)
  name: error.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 응답 상태 코드입니다.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: number
- description: 'HTTP 메서드입니다(예: `POST` 또는 `GET`).'
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 리소스 URL입니다.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 리소스 공급자 이름입니다. 기본값은 `unknown`입니다.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 리소스 공급자 도메인입니다.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: '리소스 공급자 유형입니다(예: `first-party`, `cdn`, `ad` 또는 `analytics`).'
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: 사용자 액션의 UUID입니다.
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.id
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: '사용자 액션의 유형입니다(예: `tap`또는 `application_start`). [사용자 지정 브라우저 사용자 액션](/real_user_monitoring/application_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions)의
    경우, `custom`으로 설정됩니다.'
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.type
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: '자동으로 수집된 액션의 경우, 사용자가 상호작용한 요소의 이름입니다. 사용자 지정 액션의 경우, API 호출에 제공된
    이름입니다(예: `Click on checkout`).'
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.target.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: 각 페이지 뷰에 대해 임의로 생성된 ID입니다.
  domain: View (Browser)
  name: view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: 페이지 로드의 유형, `initial_load` 또는 `route_change`입니다. 자세한 내용은 [단일 페이지 애플리케이션
    지원 문서](/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa)를
    참조하세요.
  domain: View (Browser)
  name: view.loading_type
  product_source:
  - icon-rum
  - browser
  type: string
- description: 현재 요청된 페이지로 연결된 링크가 포함되어 있던 이전 웹 페이지의 URL입니다.
  domain: View (Browser)
  name: view.referrer
  product_source:
  - icon-rum
  - browser
  type: string
- description: 조회 URL입니다.
  domain: View (Browser)
  name: view.url
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 해시 부분입니다.
  domain: View (Browser)
  name: view.url_hash
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 호스트 부분입니다.
  domain: View (Browser)
  name: view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 경로 부분입니다.
  domain: View (Browser)
  name: view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: '유사한 URL(예: `/dashboard/123`및 `/dashboard/456`의 경우 `/dashboard/?`)에
    대해 생성된 자동 URL 그룹입니다.'
  domain: View (Browser)
  name: view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 쿼리 문자열 부분을 쿼리 파라미터의 키/값 속성으로 분해한 것입니다.
  domain: View (Browser)
  name: view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: URL의 스키마 부분입니다.
  domain: View (Browser)
  name: view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: 장치에서 보고한 장치 유형입니다(User-Agent HTTP 헤더).
  domain: Device (Browser)
  name: device.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: 장치에서 보고한 장치 브랜드입니다(User-Agent HTTP 헤더).
  domain: Device (Browser)
  name: device.brand
  product_source:
  - icon-rum
  - browser
  type: string
- description: 장치에서 보고한 장치 모델입니다(User-Agent HTTP 헤더).
  domain: Device (Browser)
  name: device.model
  product_source:
  - icon-rum
  - browser
  type: string
- description: 장치에서 보고한 장치입니다(User-Agent HTTP 헤더).
  domain: Device (Browser)
  name: device.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: 장치에서 보고한 OS 이름입니다(User-Agent HTTP 헤더).
  domain: Operating system (Browser)
  name: os.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: 장치에서 보고한 OS 버전입니다(User-Agent HTTP 헤더).
  domain: Operating system (Browser)
  name: os.version
  product_source:
  - icon-rum
  - browser
  type: string
- description: 장치에서 보고한 OS 주요 버전입니다(User-Agent HTTP 헤더).
  domain: Operating system (Browser)
  name: os.version_major
  product_source:
  - icon-rum
  - browser
  type: string
- description: 각 세션에 대해 임의로 생성된 ID입니다.
  domain: Session (Browser events)
  name: session.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: 클라이언트 IP 주소입니다. 이 속성의 수집을 중지하려면, [애플리케이션 세부 정보](/data_security/real_user_monitoring/#ip-address)에서
    설정을 변경하세요.
  domain: Session (Browser events)
  name: session.ip
  product_source:
  - icon-rum
  - browser
  type: string
- description: 세션이 현재 활성인지 나타냅니다. 세션은 4시간 동안 활동하거나 15분 동안 활동하지 않으면 종료됩니다.
  domain: Session (Browser events)
  name: session.is_active
  product_source:
  - icon-rum
  - browser
  type: boolean
- description: 세션의 유형, `user` 또는 `synthetics`입니다. [Synthetic 브라우저 테스트](/synthetics/browser_tests/)의
    세션은 청구에서 제외됩니다.
  domain: Session (Browser events)
  name: session.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: 현재 요청된 페이지로 연결된 링크가 포함되어 있던 이전 웹 페이지의 URL입니다.
  domain: Session (Browser events)
  name: session.referrer
  product_source:
  - icon-rum
  - browser
  type: string
- description: 사용자가 생성한 첫 번째 RUM 조회의 ID입니다.
  domain: Session (Browser events)
  name: session.initial_view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 호스트 부분입니다.
  domain: Session (Browser events)
  name: session.initial_view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 경로 부분입니다.
  domain: Session (Browser events)
  name: session.initial_view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: '유사한 URL(예: `/dashboard/123`및 `/dashboard/456`의 경우 `/dashboard/?`)에
    대해 생성된 자동 URL 그룹입니다.'
  domain: Session (Browser events)
  name: session.initial_view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 쿼리 문자열 부분을 쿼리 파라미터의 키/값 속성으로 분해한 것입니다.
  domain: Session (Browser events)
  name: session.initial_view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: URL의 스키마 부분입니다.
  domain: Session (Browser events)
  name: session.initial_view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: 사용자가 생성한 마지막 RUM 조회의 ID입니다.
  domain: Session (Browser events)
  name: session.last_view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 호스트 부분입니다.
  domain: Session (Browser events)
  name: session.last_view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 경로 부분입니다.
  domain: Session (Browser events)
  name: session.last_view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: '유사한 URL(예: `/dashboard/123`및 `/dashboard/456`의 경우 `/dashboard/?`)에
    대해 생성된 자동 URL 그룹입니다.'
  domain: Session (Browser events)
  name: session.last_view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 쿼리 문자열 부분을 쿼리 파라미터의 키/값 속성으로 분해한 것입니다.
  domain: Session (Browser events)
  name: session.last_view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: URL의 스키마 부분입니다.
  domain: Session (Browser events)
  name: session.last_view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: '수집 중인 리소스의 유형입니다(예: `css`, `javascript`, `media`, `XHR` 또는 `image`).'
  domain: Resource (Browser events)
  name: resource.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: 'HTTP 메서드입니다(예: `POST` 또는 `GET`).'
  domain: Resource (Browser events)
  name: resource.method
  product_source:
  - icon-rum
  - browser
  type: string
- description: 응답 상태 코드입니다.
  domain: Resource (Browser events)
  name: resource.status_code
  product_source:
  - icon-rum
  - browser
  type: number
- description: 리소스 URL입니다.
  domain: Resource (Browser events)
  name: resource.url
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 호스트 부분입니다.
  domain: Resource (Browser events)
  name: resource.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 경로 부분입니다.
  domain: Resource (Browser events)
  name: resource.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: URL의 쿼리 문자열 부분을 쿼리 파라미터의 키/값 속성으로 분해한 것입니다.
  domain: Resource (Browser events)
  name: resource.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: URL의 프로토콜 이름입니다(HTTP 또는 HTTPS).
  domain: Resource (Browser events)
  name: resource.url_scheme
  product_source:
  - icon-rum
  - browser
  type: string
- description: 리소스 공급자 이름입니다. 기본값은 `unknown`입니다.
  domain: Resource (Browser events)
  name: resource.provider.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: 리소스 공급자 도메인입니다.
  domain: Resource (Browser events)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - browser
  type: string
- description: '리소스 공급자 유형입니다(예: `first-party`, `cdn`, `ad` 또는 `analytics`).'
  domain: Resource (Browser events)
  name: resource.provider.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: RUM 브라우저 SDK가 감지한 불만 신호의 유형입니다(`rage_click`, `dead_click` 또는 `error_click`).
  domain: Frustration signals (Browser events)
  name: action.frustration.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: 트래픽의 소스를 추적하는 URL의 파라미터입니다.
  domain: UTM (Browser events)
  name: view.url_query.utm_source
  product_source:
  - icon-rum
  - browser
  type: string
- description: 트래픽 유입 채널을 추적하는 URL의 파라미터입니다.
  domain: UTM (Browser events)
  name: view.url_query.utm_medium
  product_source:
  - icon-rum
  - browser
  type: string
- description: 해당 조회에 연결된 특정 마케팅 캠페인을 식별하는 URL의 파라미터입니다.
  domain: UTM (Browser events)
  name: view.url_query.utm_campaign
  product_source:
  - icon-rum
  - browser
  type: string
- description: 마케팅 캠페인 내에서 사용자가 클릭한 특정 요소를 식별하는 URL의 파라미터입니다.
  domain: UTM (Browser events)
  name: view.url_query.utm_content
  product_source:
  - icon-rum
  - browser
  type: string
- description: 사용자가 지정된 캠페인을 트리거하기 위해 검색한 키워드를 추적하는 URL의 파라미터입니다.
  domain: UTM (Browser events)
  name: view.url_query.utm_term
  product_source:
  - icon-rum
  - browser
  type: string
- description: 스팬을 생성하는 데 사용된 클라이언트 SDK 언어입니다. `cpp`, `dotnet`, `go`, `jvm`, `javascript`,
    `php`, `python`, `ruby` 중 하나일 수 있습니다.
  domain: APM core
  name: language
  product_source:
  - icon-apm
  type: string
- description: 실행 중인 프로세스에 대한 `DD_ENV` 환경 변수 또는 사용자 정의 `env`의 값입니다.
  domain: APM core (Reserved)
  name: env
  product_source:
  - icon-apm
  type: string
- description: 실행 중인 프로세스에 대한 `DD_VERSION` 환경 변수 또는 사용자 정의 `version`의 값입니다.
  domain: APM core (Reserved)
  name: version
  product_source:
  - icon-apm
  type: string
- description: 스팬이 처리하는 작업 단위의 유형을 나타내는 문자열입니다. server, client, producer, consumer
    또는 internal 중 하나일 수 있습니다. 자세한 내용은 [OpenTelemetry SpanKind 설명서](https://opentelemetry.io/docs/specs/otel/trace/api/#spankind)를
    참조하세요.
  domain: APM core
  name: span.kind
  product_source:
  - icon-apm
  type: string
- description: 스팬을 생성한 라이브러리 또는 통합의 이름입니다.
  domain: APM core
  name: component
  product_source:
  - icon-apm
  type: string
- description: 인바운드 연결을 시작한 클라이언트의 IP 주소입니다.
  domain: Network communications
  name: network.client.ip
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 아웃바운드 연결이 이루어지는 IP 주소입니다.
  domain: Network communications
  name: network.destination.ip
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 로컬 호스트 IP 주소입니다.
  domain: Network communications
  name: network.host.ip
  product_source:
  - icon-apm
  type: string
- description: 연결을 시작한 클라이언트의 포트입니다.
  domain: Network communications
  name: network.client.port
  product_source:
  - icon-apm
  - icon-log
  type: number
- description: 아웃바운드 연결의 원격 포트 번호입니다.
  domain: Network communications
  name: network.destination.port
  product_source:
  - icon-apm
  - icon-log
  type: number
- description: 인바운드 연결을 시작한 클라이언트의 호스트 이름입니다.
  domain: Network communications
  name: network.client.name
  product_source:
  - icon-apm
  type: string
- description: 로컬 호스트 이름입니다.
  domain: Network communications
  name: network.host.name
  product_source:
  - icon-apm
  type: string
- description: 인바운드 연결을 만드는 데 사용되는 전송 프로토콜입니다.
  domain: Network communications
  name: network.client.transport
  product_source:
  - icon-apm
  type: string
- description: 아웃바운드 연결을 만드는 데 사용되는 전송 프로토콜입니다.
  domain: Network communications
  name: network.destination.transport
  product_source:
  - icon-apm
  type: string
- description: HTTP 응답 상태 코드입니다.
  domain: HTTP requests
  name: http.status_code
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 난독화된 쿼리 문자열을 포함한 HTTP 요청의 URL입니다. 난독화에 대한 자세한 내용은 [Data Security 구성](https://docs.datadoghq.com/tracing/configure_data_security/)을
    참조하세요.
  domain: HTTP requests
  name: http.url
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 요청에 사용된 HTTP 버전입니다.
  domain: HTTP requests
  name: http.version
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 연결을 시작한 클라이언트의 포트입니다.
  domain: HTTP requests
  name: http.method
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 매칭되는 경로(경로 템플릿)입니다. 예를 들어 `/users/:userID`와 같습니다.
  domain: HTTP requests
  name: http.route
  product_source:
  - icon-apm
  type: string
- description: 모든 프록시 뒤의 원본 클라이언트 IP 주소입니다(알려진 경우). `X-Forwarded-For`와 같은 헤더에서 검색됩니다.
  domain: HTTP requests
  name: http.client_ip
  product_source:
  - icon-apm
  type: string
- description: '`public`, `private` 또는 `reserved`와 같은 IP 주소 유형입니다.'
  domain: HTTP client IP details
  name: http.client_ip_details.type
  product_source:
  - icon-apm
  type: string
- description: 클라이언트 IP가 리졸브되는 대상 국가의 이름입니다.
  domain: HTTP client IP details
  name: http.client_ip_details.country.name
  product_source:
  - icon-apm
  type: string
- description: '해당 국가의 [ISO 코드](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)(예:
    미국의 경우 `US`, 프랑스의 경우 `FR`)입니다.'
  domain: HTTP client IP details
  name: http.client_ip_details.country.iso_code
  product_source:
  - icon-apm
  type: string
- description: 대륙의 ISO 코드입니다(`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).
  domain: HTTP client IP details
  name: http.client_ip_details.continent.code
  product_source:
  - icon-apm
  type: string
- description: 클라이언트 IP가 리졸브되는 대상 대륙의 이름입니다.
  domain: HTTP client IP details
  name: http.client_ip_details.continent.name
  product_source:
  - icon-apm
  type: string
- description: 클라이언트 IP가 리졸브되는 대상인 첫 번째 수준 하위 행정 구역(예를 들어 주 또는 지역)의 이름입니다.
  domain: HTTP client IP details
  name: http.client_ip_details.subdivision.name
  product_source:
  - icon-apm
  type: string
- description: 첫 번째 수준 하위 행정 구역의 [ISO 코드](https://en.wikipedia.org/wiki/ISO_3166-2)입니다(예를
    들어 캐나다 온타리오주인 경우 `CA-ON`).
  domain: HTTP client IP details
  name: http.client_ip_details.subdivision.iso_code
  product_source:
  - icon-apm
  type: string
- description: 클라이언트 IP가 리졸브되는 대상 도시의 이름입니다.
  domain: HTTP client IP details
  name: http.client_ip_details.city.name
  product_source:
  - icon-apm
  type: string
- description: 클라이언트 IP가 리졸브되는 대상 위치의 위도입니다.
  domain: HTTP client IP details
  name: http.client_ip_details.location.latitude
  product_source:
  - icon-apm
  type: number
- description: 클라이언트 IP가 리졸브되는 대상 위치의 경도입니다.
  domain: HTTP client IP details
  name: http.client_ip_details.location.longitude
  product_source:
  - icon-apm
  type: number
- description: 클라이언트 IP와 연결된 IANA 시간대 식별자입니다(예를 들어 `America/Toronto`).
  domain: HTTP client IP details
  name: http.client_ip_details.timezone
  product_source:
  - icon-apm
  type: string
- description: 클라이언트 IP가 속하는 자율 시스템 번호(ASN)입니다(예를 들어 `AS577`).
  domain: HTTP client IP details
  name: http.client_ip_details.as.number
  product_source:
  - icon-apm
  type: string
- description: 해당 자율 시스템을 운영하는 조직의 이름입니다(예를 들어 `Bell Canada`).
  domain: HTTP client IP details
  name: http.client_ip_details.as.name
  product_source:
  - icon-apm
  type: string
- description: 해당 자율 시스템과 연결된 기본 도메인입니다(예를 들어 `bell.ca`).
  domain: HTTP client IP details
  name: http.client_ip_details.as.domain
  product_source:
  - icon-apm
  type: string
- description: 해당 자율 시스템이 선언한 IP 접두사입니다(예를 들어 `65.95.0.0/16`).
  domain: HTTP client IP details
  name: http.client_ip_details.as.route
  product_source:
  - icon-apm
  type: string
- description: 해당 자율 시스템의 분류입니다(예를 들어 `isp`, `hosting`, `business`, `education`).
  domain: HTTP client IP details
  name: http.client_ip_details.as.type
  product_source:
  - icon-apm
  type: string
- description: 요청과 함께 수신된 `User-Agent` 헤더입니다.
  domain: HTTP requests
  name: http.useragent
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 요청 페이로드 본문의 바이트 단위 크기입니다.
  domain: HTTP requests
  name: http.request.content_length
  product_source:
  - icon-apm
  type: number
- description: 응답 페이로드 본문의 바이트 단위 크기입니다.
  domain: HTTP requests
  name: http.response.content_length
  product_source:
  - icon-apm
  type: number
- description: 전송 디코딩 후 압축되지 않은 요청 페이로드 본문의 크기입니다.
  domain: HTTP requests
  name: http.request.content_length_uncompressed
  product_source:
  - icon-apm
  type: number
- description: 전송 디코딩 후 압축되지 않은 응답 페이로드 본문의 크기입니다.
  domain: HTTP requests
  name: http.response.content_length_uncompressed
  product_source:
  - icon-apm
  type: number
- description: 요청 HTTP 헤더입니다. 기본적으로는 수집되지 않지만, `DD_TRACE_HEADER_TAGS`를 사용하여 선택 사항으로
    구성할 수 있습니다.
  domain: HTTP requests
  name: http.request.headers.*
  product_source:
  - icon-apm
  type: string
- description: 사용 중인 데이터베이스 관리 시스템(DBMS) 제품의 식별자입니다.
  domain: Database spans
  name: db.system
  product_source:
  - icon-apm
  type: string
- description: 응답 HTTP 헤더입니다. 기본적으로는 수집되지 않지만, `DD_TRACE_HEADER_TAGS`를 사용하여 선택 사항으로
    구성할 수 있습니다.
  domain: HTTP requests
  name: http.response.headers.*
  product_source:
  - icon-apm
  type: string
- description: 데이터베이스 연결에 사용되는 연결 문자열입니다.
  domain: Database spans
  name: db.connection_string
  product_source:
  - icon-apm
  type: string
- description: 실행 중인 작업의 이름입니다. 예를 들어 `SELECT`, `findAndModify`, `HMSET`과 같습니다.
  domain: Database spans
  name: db.operation
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 데이터베이스 이름(해당되는 경우)을 포함하여 작업이 수행되는 기본 표의 이름입니다.
  domain: Database spans
  name: db.sql.table
  product_source:
  - icon-apm
  type: string
- description: 쿼리 또는 작업의 행/결과 수입니다.
  domain: Database spans
  name: db.row_count
  product_source:
  - icon-apm
  type: number
- description: 메시징 시스템의 식별자입니다.
  domain: Message queue spans
  name: messaging.system
  product_source:
  - icon-apm
  type: string
- description: 메시지 대상 이름입니다.
  domain: Message queue spans
  name: messaging.destination
  product_source:
  - icon-apm
  type: string
- description: 메시지 대상의 종류입니다.
  domain: Message queue spans
  name: messaging.destination_kind
  product_source:
  - icon-apm
  type: string
- description: 전송 프로토콜의 이름입니다.
  domain: Message queue spans
  name: messaging.protocol
  product_source:
  - icon-apm
  type: string
- description: 전송 프로토콜의 버전입니다.
  domain: Message queue spans
  name: messaging.protocol_version
  product_source:
  - icon-apm
  type: string
- description: 메시징 시스템에 대한 연결 문자열입니다.
  domain: Message queue spans
  name: messaging.url
  product_source:
  - icon-apm
  type: string
- description: 메시징 시스템에서 메시지 식별자로 사용하는 값으로, 문자열로 표시됩니다.
  domain: Message queue spans
  name: messaging.message_id
  product_source:
  - icon-apm
  type: string
- description: 메시지가 속한 대화를 식별하는 대화 ID로, 문자열로 표시됩니다.
  domain: Message queue spans
  name: messaging.conversation_id
  product_source:
  - icon-apm
  type: string
- description: 압축되지 않은 메시지 페이로드의 크기(바이트)입니다.
  domain: Message queue spans
  name: messaging.message_payload_size
  product_source:
  - icon-apm
  type: number
- description: 메시지 사용의 종류를 나타내는 문자열입니다. 예를 들어 `send`(생산자에게 보낸 메시지), `receive`(소비자가
    메시지를 수신함) 또는 `process`(이전에 수신한 메시지를 소비자가 처리함) 등이 있습니다.
  domain: Message queue spans
  name: messaging.operation
  product_source:
  - icon-apm
  type: string
- description: 메시지를 받는 소비자의 식별자입니다.
  domain: Message queue spans
  name: messaging.consumer_id
  product_source:
  - icon-apm
  type: string
- description: 원격 시스템의 식별자입니다.
  domain: Remote procedure calls
  name: rpc.system
  product_source:
  - icon-apm
  type: string
- description: 호출되는 서비스의 이름입니다.
  domain: Remote procedure calls
  name: rpc.service
  product_source:
  - icon-apm
  type: string
- description: 호출되는 메서드의 이름입니다.
  domain: Remote procedure calls
  name: rpc.method
  product_source:
  - icon-apm
  type: string
- description: 요청에서 감지된 보안 활동의 종류를 `<category>.<type>`으로 표현한 것입니다(예를 들어 `attack_attempt.sql_injection`,
    `business_logic.users.login.failure`). 일치하는 규칙이 여러 개인 경우, 스팬 하나에 값이 둘 이상 포함될 수
    있습니다.
  domain: Application & API Protection (AAP)
  name: appsec.security_activity
  product_source:
  - icon-apm
  type: string
- description: '감지된 보안 활동의 최상위 수준 분류입니다(예: `attack_attempt`, `business_logic`).'
  domain: Application & API Protection (AAP)
  name: appsec.category
  product_source:
  - icon-apm
  type: string
- description: '카테고리 내 특정 위협 또는 이벤트 유형입니다(예: `sql_injection`, `xss`, `users.login.failure`).'
  domain: Application & API Protection (AAP)
  name: appsec.type
  product_source:
  - icon-apm
  type: string
- description: '요청과 일치한 AAP 규칙의 식별자입니다(예: `crs-942-100`). 두 개 이상의 규칙이 트리거되는 경우 스팬
    하나에 값이 여러 개일 수 있습니다.'
  domain: Application & API Protection (AAP)
  name: appsec.rule_id
  product_source:
  - icon-apm
  type: string
- description: 요청이 AAP로 차단되었는지 여부입니다. 요청이 차단된 경우 `true`이고, 그렇지 않으면 `false`입니다.
  domain: Application & API Protection (AAP)
  name: appsec.blocked
  product_source:
  - icon-apm
  type: string
content: 다음 표에는 Agent가 Datadog에 보낸 데이터에 자동으로 적용되는 속성을 데이터 도메인에 해당하는 대로 각각 RUM, 로그,
  APM 제품 기준으로 나열했습니다. 선택 사항으로, 목록을 제품 기준으로 필터링하거나 키워드 또는 설명 텍스트로 검색하여 관심 있는 속성을 찾을
  수 있습니다.
description: Agent가 Datadog에 보낸 데이터에 데이터 도메인에 따라 RUM, 로그 및 APM 제품을 기준으로 자동 적용되는 속성
  표입니다.
disable_sidebar: true
filter_all: All
further_reading:
- link: /data_security/
  tag: 설명서
  text: Datadog에 전송되는 데이터 보안 보장
- link: /tracing/trace_collection/tracing_naming_convention/
  tag: 설명서
  text: 스팬 태그 시맨틱
title: 기본 표준 특성
---
## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}