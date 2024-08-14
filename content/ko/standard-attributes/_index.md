---
attributes:
- description: 메트릭에 정의된 원본 호스트 이름입니다. Datadog에서는 Datadog에 있는 일치 호스트에서 해당되는 호스트 태그를
    자동으로 검색하고 이를 텔레메트리에 적용합니다. 에이전트는 이 값을 자동으로 설정합니다.
  domain: 예약됨
  name: 호스트
  product_source:
  - icon-log
  - icon-apm
  type: 문자열
- description: 원본 장치의 유형입니다.
  domain: 예약됨
  name: 장치
  product_source:
  - icon-rum
  - android
  - ios
  - 브라우저
  - roku
  type: 문자열
- description: 이는 데이터의 출처가 된 기술로 통합 이름을 가르킵니다. 해당 항목이 통합 이름과 일치하면 Datadog 은 해당 파서와
    패싯을 자동으로 설치합니다. 예를 들어 `nginx`, `postgresql` 등이 있습니다.
  domain: 예약됨
  name: 소스
  product_source:
  - icon-log
  - icon-apm
  type: 문자열
- description: 이는 데이터의 수준 또는 심각도를 가르킵니다. 로그의 경우 [로그 패턴](/logs/explorer/patterns/)
    을 정의하는 데 사용되며 로그 관리 UI에 전용 레이아웃이 있습니다.
  domain: 예약됨
  name: status
  product_source:
  - icon-log
  - icon-apm
  type: 문자열
- description: 데이터를 생성하는 애플리케이션 또는 서비스 의 [통합 서비스 이름](/getting_started/tagging/unified_service_tagging/))은
    사용자 세션을 상호 연계하는 데 사용됩니다. 애플리케이션 성능 모니터링(APM)에서 다른 제품으로 전환하는 데 사용되므로 두 제품을 모두 사용할
    때 동일한 값을 정의해야 합니다. RUM 브라우저 SDK에서 서비스는 브라우저 애플리케이션에서 특정 기능을 제공하는, 팀에서 구축한 페이지
    집합을 나타냅니다. [수동 보기 추적](/real_user_monitoring/browser/advanced_configuration/?탭=npm#override-default-rum-view-names)을
    사용하여 서비스에 웹 페이지를 할당할 수 있습니다.
  domain: 예약됨
  name: 서비스
  product_source:
  - icon-log
  - icon-rum
  - icon-apm
  - android
  - ios
  - 브라우저
  - roku
  type: 문자열
- description: 트레이스에 사용되는 트레이스 ID입니다. 로그를 포함해 트레이스를 다른 데이터와 연계하는 데 사용됩니다.
  domain: 예약됨
  name: trace_id
  product_source:
  - icon-log
  - icon-apm
  type: 숫자
- description: 로그 항목의 본문으로, 강조 표시되어 Logs Live Tail에 표시됩니다. 여기에서 전체 텍스트 검색을 위해 인덱싱됩니다.
  domain: 예약됨
  name: message
  product_source:
  - icon-log
  type: 문자열
- description: TCP 연결을 시작한 클라이언트의 IP 주소입니다.
  domain: 네트워크 커뮤니케이션
  name: network.client.ip
  product_source:
  - icon-log
  type: 문자열
- description: 클라이언트가 연결하는 IP 주소입니다.
  domain: 네트워크 커뮤니케이션
  name: network.destination.ip
  product_source:
  - icon-log
  type: 문자열
- description: 연결을 시작한 클라이언트의 포트.
  domain: 네트워크 커뮤니케이션
  name: network.client.port
  product_source:
  - icon-log
  type: 숫자
- description: 클라이언트가 연결하는 TCP 포트입니다.
  domain: 네트워크 커뮤니케이션
  name: network.destination.port
  product_source:
  - icon-log
  type: 숫자
- description: 로그 전송 시 클라이언트에서 서버로 전송된 총 바이트 수입니다.
  domain: 네트워크 커뮤니케이션
  name: network.bytes_read
  product_source:
  - icon-log
  type: 숫자
- description: 로그 전송 시 서버에서 클라이언트로 전송된 총 바이트 수입니다.
  domain: 네트워크 커뮤니케이션
  name: network.bytes_written
  product_source:
  - icon-log
  type: 숫자
- description: 국가 이름.
  domain: 지리적 위치
  name: network.client.geoip.country.name
  product_source:
  - icon-log
  type: 문자열
- description: 해당 국가의 [ISO 코드](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)로,
    예를 들어 미국의 경우 `US`, 프랑스의 경우 `FR`를 입력합니다.
  domain: 지리적 위치
  name: network.client.geoip.country.iso_code
  product_source:
  - icon-log
  type: 문자열
- description: 대륙의 ISO 코드 (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).
  domain: 지리적 위치
  name: network.client.geoip.continent.code
  product_source:
  - icon-log
  type: 문자열
- description: 대륙 이름입니다(`Europe`, `Australia`, `North America`, `Africa`, `Antartica`,
    `South America`, `Oceania`).
  domain: 지리적 위치
  name: network.client.geoip.continent.name
  product_source:
  - icon-log
  type: 문자열
- description: '국가의 첫 번째 세분 수준 이름 (예: 미국에서 `California` 또는 프랑스에서 `Sarthe` 부서).'
  domain: 지리적 위치
  name: network.client.geoip.subdivision.name
  product_source:
  - icon-log
  type: 문자열
- description: '[ISO 코드](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)로
    해당 국가의 첫 번째 하위 수준 지역 코드입니다. 예를 들어 미국의 경우 `CA`, 프랑스의 경우 `SA`가 이에 해당할 수 있습니다.'
  domain: 지리적 위치
  name: network.client.geoip.subdivision.iso_code
  product_source:
  - icon-log
  type: 문자열
- description: '도시 이름입니다(예: `Paris`, `New York`).'
  domain: 지리적 위치
  name: network.client.geoip.city.name
  product_source:
  - icon-log
  type: 문자열
- description: HTTP 요청의 URL입니다.
  domain: HTTP
  name: http.url
  product_source:
  - icon-log
  type: 문자열
- description: HTTP 응답 상태 코드입니다.
  domain: HTTP
  name: http.status_code
  product_source:
  - icon-log
  type: 숫자
- description: 주어진 리소스에 대해 수행하려는 작업을 나타냅니다.
  domain: HTTP
  name: http.method
  product_source:
  - icon-log
  type: 문자열
- description: 요청 중인 리소스에 연결된 웹페이지의 주소를 식별하는 HTTP 헤더 필드입니다.
  domain: HTTP
  name: http.referer
  product_source:
  - icon-log
  type: 문자열
- description: HTTP 요청의 ID입니다.
  domain: HTTP
  name: http.request_id
  product_source:
  - icon-log
  type: 문자열
- description: 전송되는 사용자-에이전트(원시 형식)입니다. 사용자-에이전트 속성도 참조하세요.
  domain: HTTP
  name: http.useragent
  product_source:
  - icon-log
  type: 문자열
- description: 요청에 사용된 HTTP 버전입니다.
  domain: HTTP
  name: http.version
  product_source:
  - icon-log
  type: 문자열
- description: URL의 HTTP 호스트 부분.
  domain: HTTP, URL 세부 정보
  name: http.url_details.host
  product_source:
  - icon-log
  type: 문자열
- description: URL의 HTTP 호스트 부분.
  domain: HTTP, URL 세부 정보
  name: http.url_details.port
  product_source:
  - icon-log
  type: 숫자
- description: URL의 HTTP 호스트 부분.
  domain: HTTP, URL 세부 정보
  name: http.url_details.path
  product_source:
  - icon-log
  type: 문자열
- description: URL의 HTTP 쿼리 문자열 부분은 쿼리 파라미터 키/값 속성으로 나누어볼 수 있습니다.
  domain: HTTP, URL 세부 정보
  name: http.url_details.queryString
  product_source:
  - icon-log
  type: 오브젝트
- description: URL의 프로토콜 이름(HTTP 또는 HTTPS).
  domain: HTTP, URL 세부 정보
  name: http.url_details.scheme
  product_source:
  - icon-log
  type: 문자열
- description: 사용자가 보고한 OS 제품군-에이전트입니다.
  domain: 사용자-에이전트
  name: http.useragent_details.os.family
  product_source:
  - icon-log
  type: 문자열
- description: 사용자가 보고한 브라우저 제품군-에이전트입니다.
  domain: 사용자-에이전트
  name: http.useragent_details.browser.family
  product_source:
  - icon-log
  type: 문자열
- description: 사용자가 보고한 디바이스 제품군-에이전트입니다.
  domain: 사용자-에이전트
  name: http.useragent_details.device.family
  product_source:
  - icon-log
  type: 문자열
- description: 로거의 이름입니다.
  domain: 소스 코드
  name: logger.name
  product_source:
  - icon-log
  type: 문자열
- description: 로그가 실행될 때 현재 스레드의 이름입니다.
  domain: 소스 코드
  name: logger.thread_name
  product_source:
  - icon-log
  type: 문자열
- description: 클래스 메서드 이름입니다.
  domain: 소스 코드
  name: logger.method_name
  product_source:
  - icon-log
  type: 문자열
- description: 로거의 버전입니다.
  domain: 소스 코드
  name: logger.version
  product_source:
  - icon-log
  type: 문자열
- description: 오류 유형 또는 종류(또는 경우에 따라 코드).
  domain: 소스 코드
  name: error.kind
  product_source:
  - icon-log
  type: 문자열
- description: 이벤트를 설명하는 간결하고 사람이 읽을 수 있는 한 줄 메시지.
  domain: 소스 코드
  name: error.message
  product_source:
  - icon-log
  type: 문자열
- description: 오류에 대한 스택 트레이스 또는 보완 정보.
  domain: 소스 코드
  name: error.stack
  product_source:
  - icon-log
  type: 문자열
- description: 데이터베이스 인스턴스 이름입니다. 예를 들어 자바(Java) 에서 `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`이면
    인스턴스 이름은 `customers` 입니다.
  domain: 데이터베이스ㅜ
  name: db.instance
  product_source:
  - icon-log
  type: 문자열
- description: '지정된 데이터베이스 유형에 대한 데이터베이스 문입니다. 예를 들어, mySQL의 경우: `''SELECT * FROM
    wuser_table'';`, Redis의 경우: `''SET mykey ''WuValue''''` 입니다.'
  domain: 데이터베이스ㅜ
  name: db.statement
  product_source:
  - icon-log
  type: 문자열
- description: 수행한 작업("쿼리", "업데이트", "삭제" 등)입니다.
  domain: 데이터베이스ㅜ
  name: db.operation
  product_source:
  - icon-log
  type: 문자열
- description: 작업을 수행하는 사용자입니다.
  domain: 데이터베이스ㅜ
  name: db.user
  product_source:
  - icon-log
  type: 문자열
- description: '모든 종류의 기간(**나노초** 단위): HTTP 응답 시간, 데이터베이스 쿼리 시간, 지연 시간 등이 있습니다. 로그
    이내의 모든 기간을 이 속성에 [리매핑](/logs/log_configuration/processors/#remapper)하면 Datadog가
    트레이스 검색의 기본 측정 단위로 이를 표시하고 사용합니다.'
  domain: 성능
  name: duration
  product_source:
  - icon-log
  type: 숫자
- description: 사용자 식별자입니다.
  domain: 사용자
  name: usr.id
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - 브라우저
  - roku
  type: 문자열
- description: 사용자 친화적인 이름입니다.
  domain: 사용자
  name: usr.name
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - 브라우저
  - roku
  type: 문자열
- description: 사용자 이메일입니다.
  domain: 사용자
  name: usr.email
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - 브라우저
  - roku
  type: 문자열
- description: 호스트 이름입니다.
  domain: Syslog 및 로그 운송자
  name: syslog.hostname
  product_source:
  - icon-log
  type: 문자열
- description: 애플리케이션 이름입니다. 일반적으로 `service` 예약 속성으로 리매핑됩니다.
  domain: Syslog 및 로그 운송자
  name: syslog.appname
  product_source:
  - icon-log
  type: 문자열
- description: 로그 심각도입니다. 일반적으로 `status` 예약 속성으로 리매핑됩니다.
  domain: Syslog 및 로그 운송자
  name: syslog.severity
  product_source:
  - icon-log
  type: 숫자
- description: 로그를 남기다 타임스탬프입니다. 일반적으로 `date` 예약 속성으로 리매핑됩니다.
  domain: Syslog 및 로그 운송자
  name: syslog.timestamp
  product_source:
  - icon-log
  type: 문자열
- description: 로그의 출처가 된 환경 이름입니다.
  domain: Syslog 및 로그 운송자
  name: syslog.env
  product_source:
  - icon-log
  type: 문자열
- description: DNS 쿼리 식별자입니다.
  domain: DNS
  name: dns.id
  product_source:
  - icon-log
  type: 문자열
- description: 쿼리한 도메인 이름입니다.
  domain: DNS
  name: dns.question.name
  product_source:
  - icon-log
  type: 문자열
- description: DNS 질문 유형을 지정하는 [2옥텟 코드](https://en.wikipedia.org/wiki/List_of_DNS_record_types)입니다.
  domain: DNS
  name: dns.question.type
  product_source:
  - icon-log
  type: 문자열
- description: '클래스는 DNS 질문(예: 인터넷 사용 시 IP)으로 조회됩니다.'
  domain: DNS
  name: dns.question.class
  product_source:
  - icon-log
  type: 문자열
- description: 바이트 단위의 DNS 질문 크기입니다.
  domain: DNS
  name: dns.question.size
  product_source:
  - icon-log
  type: 숫자
- description: DNS가 응답하는 IP 주소입니다.
  domain: DNS
  name: dns.answer.name
  product_source:
  - icon-log
  type: 문자열
- description: DNS 응답 유형을 지정하는 [2옥텟 코드](https://en.wikipedia.org/wiki/List_of_DNS_record_types)입니다.
  domain: DNS
  name: dns.answer.type
  product_source:
  - icon-log
  type: 문자열
- description: DNS가 응답한 클래스입니다.
  domain: DNS
  name: dns.answer.class
  product_source:
  - icon-log
  type: 문자열
- description: The DNS answer size in bytes.
  domain: DNS
  name: dns.answer.size
  product_source:
  - icon-log
  type: 숫자
- description: DNS 응답 코드입니다.
  domain: DNS
  name: dns.flags.rcode
  product_source:
  - icon-log
  type: 문자열
- description: '동일한 활동(예: 인증)에 의해 생성된 이벤트 전반에 걸친 공유 이름입니다.'
  domain: 이벤트
  name: evt.name
  product_source:
  - icon-log
  type: 문자열
- description: '이벤트(예: `success`, `failure`)의 결과입니다.'
  domain: 이벤트
  name: evt.outcome
  product_source:
  - icon-log
  type: 문자열
- description: 에포크에서 이벤트 시작 시간(밀리초).
  domain: RUM 핵심 속성
  name: 날짜
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 정수
- description: '이벤트 유형 (예: `view` 또는 `resource`).'
  domain: RUM 핵심 속성
  name: 타입
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: RUM 애플리케이션을 만들 때 생성되는 Datadog 애플리케이션 ID.
  domain: RUM 핵심 속성
  name: application.id
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: Datadog 애플리케이션 이름.
  domain: RUM 핵심 속성
  name: application.name
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  type: 문자열
- description: 디바이스에서 보고한 디바이스 유형 (System User-Agent).
  domain: 장치(Android, iOS, 로쿠(Roku))
  name: device.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 디바이스에서 보고한 디바이스 브랜드 (System User-Agent).
  domain: 장치(Android, iOS, 로쿠(Roku))
  name: device.brand
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 디바이스에서 보고한 디바이스 모델 (System User-Agent).
  domain: 장치(Android, iOS, 로쿠(Roku))
  name: device.model
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 디바이스에서 보고한 디바이스 이름 (System User-Agent).
  domain: 장치(Android, iOS, 로쿠(Roku))
  name: device.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 디바이스 네트워크 도달 가능성 상태 (`connected`, `not connected` 또는 `maybe`).
  domain: 연결성(Android, iOS)
  name: connectivity.status
  product_source:
  - icon-rum
  - android
  - ios
  type: 문자열
- description: '사용 가능한 네트워크 인터페이스 목록 (예: `bluetooth`, `cellular`, `ethernet`, 또는 `wifi`).'
  domain: 연결성(Android, iOS)
  name: connectivity.interfaces
  product_source:
  - icon-rum
  - android
  - ios
  type: 문자열
- description: 셀룰러 연결에 사용되는 무선 기술의 유형.
  domain: 연결성(Android, iOS)
  name: connectivity.cellular.technology
  product_source:
  - icon-rum
  - android
  - ios
  type: 문자열
- description: SIM 캐리어의 이름.
  domain: 연결성(Android, iOS)
  name: connectivity.cellular.carrier_name
  product_source:
  - icon-rum
  - android
  - ios
  type: 문자열
- description: 디바이스에서 보고한 OS 이름 (System User-Agent).
  domain: 운영 체제(Android, iOS, 로쿠(Roku))
  name: os.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 디바이스에서 보고한 OS 버전 (System User-Agent).
  domain: 운영 체제(Android, iOS, 로쿠(Roku))
  name: os.version
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 디바이스에서 보고한 주요 OS 버전 (System User-Agent).
  domain: 운영 체제(Android, iOS, 로쿠(Roku))
  name: os.version_major
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 국가 이름.
  domain: 지리적 위치
  name: geo.country
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: '해당 국가의 [ISO 코드](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)(예:
    미국의 경우 `US`, 프랑스의 경우 `FR` ).'
  domain: 지리적 위치
  name: geo.country_iso_code
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: '국가의 첫 번째 세분 수준 이름 (예: 미국에서 `California` 또는 프랑스에서 `Sarthe` 부서).'
  domain: 지리적 위치
  name: geo.country_subdivision
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: 대륙의 ISO 코드 (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, 또는 `OC`).
  domain: 지리적 위치
  name: geo.continent_code
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: 대륙 이름 (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`,
    `South America`, 또는 `Oceania`).
  domain: 지리적 위치
  name: geo.continent
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: '도시 이름 (예: `San Francisco`, `Paris`, 또는 `New York`).'
  domain: 지리적 위치
  name: geo.city
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: 사용자의 식별자.
  domain: RUM 사용자 속성(Android, 로쿠(Roku))
  name: user.id
  product_source:
  - icon-rum
  - android
  - roku
  type: 문자열
- description: 사용자의 식별자.
  domain: RUM 사용자 속성(iOS)
  name: usr.id
  product_source:
  - icon-rum
  - ios
  type: 문자열
- description: 사용자의 이름.
  domain: 글로벌 사용자 속성(Android, iOS, 로쿠(Roku))
  name: usr.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 사용자의 이메일.
  domain: 글로벌 사용자 속성(Android, iOS, 로쿠(Roku))
  name: usr.email
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 세션의 고유 ID.
  domain: 세션(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: session.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 세션 유형 (`user`).
  domain: 세션(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: 세션 유형
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 세션이 현재 활성 상태인지 여부를 나타냅니다. 사용자가 애플리케이션에서 벗어나 탐색하거나 브라우저 창을 닫으면 세션이 종료되며,
    4시간 동안 활동 후 또는 15분 동안 활동하지 않을 시 만료됩니다.
  domain: 세션(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: session.is_active
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: boolean
- description: 세션의 초기 보기 URL.
  domain: 세션(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: session.initial_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 세션의 초기 보기 이름.
  domain: 세션(Android 이벤트, iOS 이벤트, Roku 이벤트)
  name: session.initial_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 세션의 마지막 보기 URL.
  domain: 세션(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: session.last_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 세션의 마지막 보기 이름.
  domain: 세션(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: session.last_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 인테이크의 TCP 연결에서 추출한 세션의 IP 주소입니다. 이 속성 수집을 중지하려면 [애플리케이션 세부 정보](/data_security/real_user_monitoring/#ip-address)에서
    설정을 변경하세요.
  domain: 세션(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: session.ip
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 시스템 `User-Agent` 정보를 통해 장치 정보를 해석합니다.
  domain: 세션(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: session.useragent
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 이벤트에 해당하는 초기 보기의 고유 ID.
  domain: 보기(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: view.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 이벤트에 해당하는 클래스의 정식 이름입니다. iOS의 경우 이벤트 에 해당하는 `UIViewController` 클래스의
    URL입니다.
  domain: 보기(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 이벤트에 해당하는 보기의 사용자 지정 이름.
  domain: 보기(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 리소스의 고유 식별자.
  domain: 리소스(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: resource.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: '수집 중인 리소스 유형 (예: `xhr`, `image`, `font`, `css`, 또는 `js`).'
  domain: 리소스(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: resource.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 'HTTP 메서드 (예: `POST`, `GET`, `PATCH`, 또는 `DELETE`).'
  domain: 리소스(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 응답 상태 코드.
  domain: 리소스(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 숫자
- description: 리소스 URL.
  domain: 리소스(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 리소스 공급자 이름. 기본값은 `unknown`.
  domain: 리소스(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 리소스 공급자 도메인.
  domain: 리소스(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: '리소스 공급자 유형 (예: `first-party`, `cdn`, `ad`, 또는 `analytics`).'
  domain: 리소스(Android 이벤트, iOS 이벤트, Roku 이벤트)
  name: resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: '오류가 발생하는 곳 (예: `webview`, `logger`, 또는 `network`).'
  domain: 오류(브라우저 이벤트, 안드로이드 이벤트, iOS 이벤트, 로쿠 이벤트)
  name: error.source
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: 오류 유형(또는 경우에 따라 오류 코드).
  domain: 오류(브라우저 이벤트, Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: error.type
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: 이벤트를 설명하는 간결하고 사람이 읽을 수 있는 한 줄 메시지.
  domain: 오류(브라우저 이벤트, Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: error.message
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: 스택 트레이스 또는 오류에 대한 보완 정보.
  domain: 네트워크 오류(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: error.stack
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: 스택 트레이스 또는 오류에 대한 보완 정보.
  domain: 네트워크 오류(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: error.issue_id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 응답 상태 코드.
  domain: 네트워크 오류(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: error.resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 숫자
- description: 'HTTP 메서드 (예: `POST` 또는 `GET`).'
  domain: 네트워크 오류(Android 이벤트, iOS 이벤트, 로쿠(Roku) 이벤트)
  name: error.resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 리소스 URL.
  domain: 네트워크 오류 (안드로이드 이벤트, iOS 이벤트, 로쿠 이벤트)
  name: error.resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 리소스 공급자 이름. 기본값은 `unknown`.
  domain: 네트워크 오류 (안드로이드 이벤트, iOS 이벤트, 로쿠 이벤트)
  name: error.resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 리소스 공급자 도메인.
  domain: 네트워크 오류 (안드로이드 이벤트, iOS 이벤트, 로쿠 이벤트)
  name: error.resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: '리소스 공급자 유형 (예: `first-party`, `cdn`, `ad`, 또는 `analytics`).'
  domain: 네트워크 오류 (안드로이드 이벤트, iOS 이벤트, 로쿠 이벤트)
  name: error.resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: 문자열
- description: 사용자 액션의 UUID.
  domain: 액션(브라우저 이벤트, 안드로이드 이벤트, iOS 이벤트, 로쿠 이벤트)
  name: action.id
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: '사용자 액션의 유형(예: `tap` 또는 `application_start`). 커스텀 브라우저 사용자 액션](/real_user_monitoring/browser/tracking_user_actions/?탭=npm#커스텀-actions)의
    경우 `custom` 로 설정됩니다.'
  domain: 액션(브라우저 이벤트, 안드로이드 이벤트, iOS 이벤트, 로쿠 이벤트)
  name: action.type
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: '사용자 친화적인 이름(예: `Click on checkout`). 커스텀 브라우저 사용자 액션](/real_user_monitoring/browser/tracking_user_actions/?탭=npm#커스텀-actions)의
    경우, API 호출에 지정된 액션 이름입니다.'
  domain: 액션(브라우저 이벤트, 안드로이드 이벤트, iOS 이벤트, 로쿠 이벤트)
  name: action.name
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: 사용자가 상호 작용한 요소. 자동으로 수집된 액션에만 해당합니다.
  domain: 액션(브라우저 이벤트, 안드로이드 이벤트, iOS 이벤트, 로쿠 이벤트)
  name: action.target.name
  product_source:
  - icon-rum
  - android
  - 브라우저
  - ios
  - roku
  type: 문자열
- description: 각 페이지 뷰에 대해 임의로 생성된 ID.
  domain: 보기(브라우저)
  name: view.id
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 페이지 로드 유형, `initial_load` 또는 `route_change`. 자세한 내용은 [단일 페이지 애플리케이션
    지원 문서](/real_user_monitoring/브라우저/모니터링_페이지_성능/#모니터링-single-page-applications-spa)를
    참조하세요.
  domain: 보기(브라우저)
  name: view.loading_type
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 현재 요청된 페이지로 연결되는 링크를 따라간 이전 웹 페이지의 URL.
  domain: 보기(브라우저)
  name: view.referrer
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 보기 URL.
  domain: 보기(브라우저)
  name: view.url
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 해시 부분.
  domain: 보기(브라우저)
  name: view.url_hash
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 호스트 부분.
  domain: 보기(브라우저)
  name: view.url_host
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 경로 부분.
  domain: 보기(브라우저)
  name: view.url_path
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: '유사한 URL(예: `/dashboard/123`및 `/dashboard/456`의 경우 `/dashboard/?`)에
    대해 생성된 자동 URL 그룹.'
  domain: 보기(브라우저)
  name: view.url_path_group
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 쿼리 문자열 부분이 쿼리 파라미터 키/값 속성으로 분해됩니다.
  domain: 보기(브라우저)
  name: view.url_query
  product_source:
  - icon-rum
  - 브라우저
  type: 오브젝트
- description: URL의 스키마 부분.
  domain: 보기(브라우저)
  name: view.url_scheme
  product_source:
  - icon-rum
  - 브라우저
  type: 오브젝트
- description: 디바이스에서 보고한 디바이스 유형 (User-Agent HTTP 헤더).
  domain: 디바이스(브라우저)
  name: device.type
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 디바이스에서 보고한 디바이스 브랜드 (User-Agent HTTP 헤더).
  domain: 디바이스(브라우저)
  name: device.brand
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 디바이스에서 보고한 디바이스 모델 (User-Agent HTTP 헤더).
  domain: 디바이스(브라우저)
  name: device.model
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 디바이스에서 보고한 디바이스 이름 (User-Agent HTTP 헤더).
  domain: 디바이스(브라우저)
  name: device.name
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 디바이스에서 보고한 OS 이름 (User-Agent HTTP 헤더).
  domain: 운영 체제(브라우저)
  name: os.name
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 디바이스에서 보고한 OS 버전 (User-Agent HTTP 헤더).
  domain: 운영 체제(브라우저)
  name: os.version
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 디바이스에서 보고한 OS 버전 (User-Agent HTTP 헤더).
  domain: 운영 체제(브라우저)
  name: os.version_major
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 각 세션에 대해 임의로 생성된 ID.
  domain: 세션(브라우저 이벤트)
  name: session.id
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 클라이언트 IP 주소. 이 속성 수집을 중지하려면 [애플리케이션 세부 정보](/data_security/real_user_monitoring/#ip-address)에서
    설정을 변경하세요.
  domain: 세션 (브라우저 이벤트)
  name: session.ip
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 세션이 현재 활성 상태인지 여부를 나타냅니다. 세션은 4시간 동안 활동하거나 15분 동안 활동하지 않으면 종료됩니다.
  domain: 세션 (브라우저 이벤트)
  name: session.is_active
  product_source:
  - icon-rum
  - 브라우저
  type: boolean
- description: 세션 유형, `user` 또는 `synthetics`입니다. [신서틱(Synthetic) 브라우저 테스트](/synthetics/browser_tests/)의
    세션은 빌링 에서 제외됩니다.
  domain: 세션 (브라우저 이벤트)
  name: 세션 유형
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 현재 요청된 페이지로 연결되는 링크를 따라간 이전 웹 페이지의 URL.
  domain: 세션(브라우저 이벤트)
  name: 세션.참조자
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 사용자가 생성한 첫 번째 RUM 보기의 ID.
  domain: 세션(브라우저 이벤트)
  name: session.initial_view.id
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 호스트 부분.
  domain: 세션(브라우저 이벤트)
  name: session.initial_view.url_host
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 경로 부분.
  domain: 세션(브라우저 이벤트)
  name: session.initial_view.url_path
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: '유사한 URL(예: `/dashboard/123`및 `/dashboard/456`의 경우 `/dashboard/?`)에
    대해 생성된 자동 URL 그룹.'
  domain: 세션(브라우저 이벤트)
  name: session.initial_view.url_path_group
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 쿼리 문자열 부분이 쿼리 파라미터 키/값 속성으로 분해됩니다.
  domain: 세션(브라우저 이벤트)
  name: session.initial_view.url_query
  product_source:
  - icon-rum
  - 브라우저
  type: 오브젝트
- description: URL의 스키마 부분.
  domain: 세션(브라우저 이벤트)
  name: session.initial_view.url_scheme
  product_source:
  - icon-rum
  - 브라우저
  type: 오브젝트
- description: 사용자가 생성한 마지막 RUM 보기의 ID.
  domain: 세션(브라우저 이벤트)
  name: session.last_view.id
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 호스트 부분.
  domain: 세션(브라우저 이벤트)
  name: session.last_view.url_host
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 경로 부분.
  domain: 세션(브라우저 이벤트)
  name: session.last_view.url_path
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: '유사한 URL(예: `/dashboard/123`및 `/dashboard/456`의 경우 `/dashboard/?`)에
    대해 생성된 자동 URL 그룹.'
  domain: 세션(브라우저 이벤트)
  name: session.last_view.url_path_group
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 쿼리 문자열 부분이 쿼리 파라미터 키/값 속성으로 분해됩니다.
  domain: 세션(브라우저 이벤트)
  name: session.last_view.url_query
  product_source:
  - icon-rum
  - 브라우저
  type: 오브젝트
- description: URL의 스키마 부분.
  domain: 세션(브라우저 이벤트)
  name: session.last_view.url_scheme
  product_source:
  - icon-rum
  - 브라우저
  type: 오브젝트
- description: '수집 중인 리소스 유형 (예: `css`, `javascript`, `media`, `XHR`, 또는 `image`).'
  domain: 리소스(브라우저 이벤트)
  name: resource.type
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 'HTTP 메서드 (예: `POST` 또는 `GET`).'
  domain: 리소스(브라우저 이벤트)
  name: resource.method
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 응답 상태 코드.
  domain: 리소스(브라우저 이벤트)
  name: resource.status_code
  product_source:
  - icon-rum
  - 브라우저
  type: 숫자
- description: 리소스 URL.
  domain: 리소스(브라우저 이벤트)
  name: resource.url
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 호스트 부분.
  domain: 리소스(브라우저 이벤트)
  name: resource.url_host
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 경로 부분.
  domain: 리소스(브라우저 이벤트)
  name: resource.url_path
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: URL의 쿼리 문자열 부분이 쿼리 파라미터 키/값 속성으로 분해됩니다.
  domain: 리소스(브라우저 이벤트)
  name: resource.url_query
  product_source:
  - icon-rum
  - 브라우저
  type: 오브젝트
- description: URL의 프로토콜 이름(HTTP 또는 HTTPS).
  domain: 리소스(브라우저 이벤트)
  name: resource.url_scheme
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 리소스 공급자 이름. 기본값은 `unknown`.
  domain: 리소스(브라우저 이벤트)
  name: resource.provider.name
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 리소스 공급자 도메인.
  domain: 리소스(브라우저 이벤트)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: '리소스 공급자 유형 (예: `first-party`, `cdn`, `ad`, 또는 `analytics`).'
  domain: 리소스(브라우저 이벤트)
  name: resource.provider.type
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 오류 유형(또는 경우에 따라 오류 코드).
  domain: 소스 오류(브라우저 이벤트)
  name: error.type
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: RUM Browser SDK에서 감지한 데드 클릭 수.
  domain: 좌절 신호(브라우저 이벤트)
  name: action.frustration.type:dead_click
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: RUM Browser SDK에서 감지한 레이지 클릭 수.
  domain: 좌절 신호(브라우저 이벤트)
  name: action.frustration.type:rage_click
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: RUM Browser SDK에서 감지한 오류 클릭 수.
  domain: 좌절 신호(브라우저 이벤트)
  name: action.frustration.type:error_click
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 트래픽의 원본을 추적하는 URL의 파라미터.
  domain: UTM 브라우저 이벤트)
  name: view.url_query.utm_source
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 트래픽이 전송되는 채널을 추적하는 URL의 파라미터.
  domain: UTM(브라우저 이벤트)
  name: view.url_query.utm_medium
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 해당 뷰에 연결된 특정 마케팅 캠페인을 식별하는 URL의 파라미터입니다.
  domain: UTM(브라우저 이벤트)
  name: view.url_query.utm_campaign
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 마케팅 캠페인 내에서 사용자가 클릭한 특정 요소를 식별하는 URL의 파라미터입니다.
  domain: UTM(브라우저 이벤트)
  name: view.url_query.utm_content
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 특정 캠페인을 트리거하기 위해 사용자가 검색한 키워드를 추적하는 URL의 파라미터.
  domain: UTM(브라우저 이벤트)
  name: view.url_query.utm_term
  product_source:
  - icon-rum
  - 브라우저
  type: 문자열
- description: 스팬(span) 을 생성하는 데 사용되는 클라이언트 SDK 언어는 `cpp`, `dotnet`, `go`, `jvm`,
    `javascript`, `php`, `python`, `ruby` 중 하나 일 수 있습니다 .
  domain: 애플리케이션 성능 모니터링(APM) 핵심
  name: 언어
  product_source:
  - icon-apm
  type: 문자열
- description: 실행 중인 프로세스에 대한 `DD_ENV` 환경 변수 또는 사용자 정의 `env` 의 값입니다.
  domain: 애플리케이션 성능 모니터링(APM) 핵심(예약됨)
  name: env
  product_source:
  - icon-apm
  type: 문자열
- description: 실행 중인 프로세스 에 대한 `DD_VERSION` 환경 변수 또는 사용자 정의 `version` 의 값입니다.
  domain: 애플리케이션 성능 모니터링(APM) 핵심(예약됨)
  name: 버전
  product_source:
  - icon-apm
  type: 문자열
- description: 스팬(span)에서 처리하는 작업 단위의 유형을 나타내는 문자열입니다. 서버, 클라이언트, 생산자, 소비자 또는 내부 중
    하나일 수 있습니다. 자세한 내용은 [OpenTelemetry SpanKind 문서](https://opentelemetry.io/docs/specs/otel/추적하다/API/#spankind)를
    참조하세요.
  domain: 애플리케이션 성능 모니터링(APM) 핵심
  name: span.kind
  product_source:
  - icon-apm
  type: 문자열
- description: 스팬(span)을 생성한 라이브러리 또는 통합의 이름입니다.
  domain: 애플리케이션 성능 모니터링(APM) 핵심
  name: 구성 요소
  product_source:
  - icon-apm
  type: 문자열
- description: 인바운드 연결을 시작한 클라이언트의 IP 주소입니다.
  domain: 네트워크 커뮤니케이션
  name: network.client.ip
  product_source:
  - icon-apm
  type: 문자열
- description: 아웃바운드 연결이 이루어지는 IP 주소입니다.
  domain: 네트워크 커뮤니케이션
  name: network.destination.ip
  product_source:
  - icon-apm
  type: 문자열
- description: 로컬 호스트 IP 주소.
  domain: 네트워크 커뮤니케이션
  name: network.host.ip
  product_source:
  - icon-apm
  type: 문자열
- description: 연결을 시작한 클라이언트의 포트.
  domain: 네트워크 커뮤니케이션
  name: network.client.port
  product_source:
  - icon-apm
  type: 숫자
- description: 아웃바운드 연결의 원격 포트 번호.
  domain: 네트워크 커뮤니케이션
  name: network.destination.port
  product_source:
  - icon-apm
  type: 숫자
- description: 인바운드 연결을 시작한 클라이언트의 호스트 이름.
  domain: 네트워크 커뮤니케이션
  name: network.client.name
  product_source:
  - icon-apm
  type: 문자열
- description: 로컬 호스트네임.
  domain: 네트워크 커뮤니케이션
  name: network.host.name
  product_source:
  - icon-apm
  type: 문자열
- description: 인바운드 연결을 만드는 데 사용되는 트랜스포트 프로토콜.
  domain: 네트워크 커뮤니케이션
  name: network.client.transport
  product_source:
  - icon-apm
  type: 문자열
- description: 아웃바운드 연결을 만드는 데 사용되는 전송 프로토콜.
  domain: 네트워크 커뮤니케이션
  name: network.destination.transport
  product_source:
  - icon-apm
  type: 문자열
- description: HTTP 응답 상태 코드입니다.
  domain: HTTP 요청
  name: http.status_code
  product_source:
  - icon-apm
  type: 문자열
- description: 난독화된 쿼리 문자열을 포함한 HTTP 요청의 URL입니다. 난독화에 대한 자세한 내용은 설정하다 데이터 보안을 참조하세요.
  domain: HTTP 요청
  name: http.url
  product_source:
  - icon-apm
  type: 문자열
- description: 요청에 사용된 HTTP 버전입니다.
  domain: HTTP 요청
  name: http.version
  product_source:
  - icon-apm
  type: 문자열
- description: 연결을 시작한 클라이언트의 포트.
  domain: HTTP 요청
  name: http.method
  product_source:
  - icon-apm
  type: 문자열
- description: '일치하는 경로(경로 템플릿)입니다. 예: `/users/:userID`.'
  domain: HTTP 요청
  name: http.route
  product_source:
  - icon-apm
  type: 문자열
- description: 모든 프록시 뒤에 있는 원본 클라이언트 의 IP 주소(알려진 경우)입니다. `X-Forwarded-For`와 같은 헤더에서
    발견됩니다.
  domain: HTTP 요청
  name: http.client_ip
  product_source:
  - icon-apm
  type: 문자열
- description: 요청과 함께 수신된 `User-Agent` 헤더입니다.
  domain: HTTP 요청
  name: http.useragent
  product_source:
  - icon-apm
  type: 문자열
- description: 요청 페이로드 본문의 바이트 단위 크기입니다.
  domain: HTTP 요청
  name: http.request.content_length
  product_source:
  - icon-apm
  type: 숫자
- description: 응답 페이로드 본문의 바이트 단위 크기입니다.
  domain: HTTP 요청
  name: http.response.content_length
  product_source:
  - icon-apm
  type: 숫자
- description: 전송 디코딩 후 압축되지 않은 요청 페이로드 본문의 크기입니다.
  domain: HTTP 요청
  name: http.request.content_length_uncompressed
  product_source:
  - icon-apm
  type: 숫자
- description: 전송 디코딩 후 압축되지 않은 응답 페이로드 본문의 크기입니다.
  domain: HTTP 요청
  name: http.response.content_length_uncompressed
  product_source:
  - icon-apm
  type: 숫자
- description: 요청 HTTP 헤더. 기본적으로 수집되는 헤더는 없지만 `DD_TRACE_HEADER_TAGS`를 사용하여 선택적으로 설정할
    수 있습니다.
  domain: HTTP 요청
  name: http.request.headers.*
  product_source:
  - icon-apm
  type: 문자열
- description: 사용 중인 데이터베이스 관리 시스템(DBMS) 제품의 식별자입니다.
  domain: 데이터베이스 스팬(span)
  name: db.system
  product_source:
  - icon-apm
  type: 문자열
- description: 데이터베이스 연결에 사용되는 연결 문자열.
  domain: 데이터베이스 스팬(span)
  name: db.connection_string
  product_source:
  - icon-apm
  type: 문자열
- description: 데이터베이스에 액세스한 사용자 이름입니다.
  domain: 데이터베이스 스팬(span)
  name: db.user
  product_source:
  - icon-apm
  type: 문자열
- description: 연결되는 데이터베이스의 이름.
  domain: 데이터베이스 스팬(span)
  name: db.instance
  product_source:
  - icon-apm
  type: 문자열
- description: 실행 중인 데이터베이스 문.
  domain: 데이터베이스 스팬(span)
  name: db.statement
  product_source:
  - icon-apm
  type: 문자열
- description: '실행 중인 작업의 이름입니다. 예: `SELECT`, `findAndModify`, `HMSET`.'
  domain: 데이터베이스 스팬(span)
  name: db.operation
  product_source:
  - icon-apm
  type: 문자열
- description: 데이터베이스 이름(해당되는 경우)을 포함하여 작업이 수행되는 기본 테이블의 이름입니다.
  domain: 데이터베이스 스팬(span)
  name: db.sql.table
  product_source:
  - icon-apm
  type: 숫자
- description: 쿼리 또는 작업의 행/결과 수.
  domain: 데이터베이스 스팬(span)
  name: db.row_count
  product_source:
  - icon-apm
  type: 숫자
- description: 메시징 시스템의 식별자.
  domain: 메시지 대기 스팬(span)
  name: messaging.system
  product_source:
  - icon-apm
  type: 문자열
- description: 메시지 대상 이름.
  domain: 메시지 대기 스팬(span)
  name: messaging.destination
  product_source:
  - icon-apm
  type: 문자열
- description: 메시지 대상의 종류.
  domain: 메시지 대기 스팬(span)
  name: messaging.destination_kind
  product_source:
  - icon-apm
  type: 문자열
- description: 전송 프로토콜의 이름.
  domain: 메시지 대기 스팬(span)
  name: messaging.protocol
  product_source:
  - icon-apm
  type: 문자열
- description: 전송 프로토콜의 버전.
  domain: 메시지 대기 스팬(span)
  name: messaging.protocol_version
  product_source:
  - icon-apm
  type: 문자열
- description: 메시징 시스템에 대한 연결 문자열.
  domain: 메시지 대기 스팬(span)
  name: messaging.url
  product_source:
  - icon-apm
  type: 문자열
- description: 메시징 시스템에서 메시지 식별자로 사용하는 값으로, 문자열로 표시됨.
  domain: 메시지 대기 스팬(span)
  name: messaging.message_id
  product_source:
  - icon-apm
  type: 문자열
- description: 메시지가 속한 대화를 식별하는 대화 ID로, 문자열로 표시됨.
  domain: 메시지 대기 스팬(span)
  name: messaging.conversation_id
  product_source:
  - icon-apm
  type: 문자열
- description: 압축되지 않은 메시지 페이로드의 크기(바이트).
  domain: 메시지 대기 스팬(span)
  name: messaging.message_payload_size
  product_source:
  - icon-apm
  type: 숫자
- description: 메시지 소비량 유형을 식별하는 문자열입니다. 예를 들어 `send`(생산자에게 보낸 메시지), `receive` (소비자가
    메시지를 수신함) 또는 `process`(이전에 수신한 메시지를 소비자가 처리함)입니다.
  domain: 메시지 대기 스팬(span)
  name: messaging.operation
  product_source:
  - icon-apm
  type: 문자열
- description: 메시지를 받는 소비자의 식별자.
  domain: 메시지 대기 스팬(span)
  name: messaging.consumer_id
  product_source:
  - icon-apm
  type: 문자열
- description: 원격 시스템의 식별자.
  domain: 원격 프로시저 호출
  name: rpc.system
  product_source:
  - icon-apm
  type: 문자열
- description: 호출되는 서비스의 이름.
  domain: 원격 프로시저 호출
  name: rpc.service
  product_source:
  - icon-apm
  type: 문자열
- description: 호출되는 메서드의 이름.
  domain: 원격 프로시저 호출
  name: rpc.method
  product_source:
  - icon-apm
  type: 문자열
- description: 오류 유형 또는 종류(또는 경우에 따라 코드).
  domain: 오류
  name: error.type
  product_source:
  - icon-apm
  type: 문자열
- description: 이벤트를 설명하는 간결하고 사람이 읽을 수 있는 한 줄 메시지.
  domain: 오류
  name: error.message
  product_source:
  - icon-apm
  type: 문자열
- description: 오류에 대한 스택 트레이스 또는 보완 정보.
  domain: 오류
  name: error.stack
  product_source:
  - icon-apm
  type: 문자열
content: 다음 표에는 데이터 도메인에 해당하는 각 RUM, 로그, 애플리케이션 성능 모니터링(APM) 제품에 의해 에이전트 에서 Datadog로
  전송된 데이터에 자동으로 적용되는 속성이 나열되어 있습니다. 선택적으로 제품별로 목록을 필터링하거나 키워드나 설명 텍스트로 검색하여 관심 있는
  속성을 찾을 수 있습니다.
disable_sidebar: true
filter_all: 전체
further_reading:
- link: /data_security/
  tag: 설명서
  text: Datadog에 전송되는 데이터 보안 보장
title: 기본 표준 속성
---



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}