---
attributes:
- description: El nombre del servidor de origen según lo definido en las métricas.
    Datadog recupera automáticamente las etiquetas de servidor correspondientes del
    servidor coincidente en Datadog y las aplica a su telemetría. El Agent establece
    este valor automáticamente.
  domain: Reserved
  name: host
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: El tipo de dispositivo de origen.
  domain: Reserved
  name: device
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: Esto corresponde al nombre de la integración, la tecnología de la cual
    se originaron los datos. Cuando coincide con un nombre de integración, Datadog
    instala automáticamente los analizadores y facetas correspondientes. Por ejemplo,
    `nginx`, `postgresql`, y así sucesivamente.
  domain: Reserved
  name: source
  product_source:
  - icon-log
  type: string
- description: Esto corresponde al nivel o severidad de los datos. Para los registros,
    se utiliza para definir [patrones de registro](/logs/explorer/patterns/) y tiene
    un diseño dedicado en la Log Management UI.
  domain: Reserved
  name: status
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: El [nombre de servicio unificado](/getting_started/tagging/unified_service_tagging/)
    para la aplicación o servicio que está generando los datos, utilizado para correlacionar
    sesiones de usuario. Se utiliza para cambiar de APM a otros productos, así que
    asegúrese de definir el mismo valor cuando use ambos productos. En el SDK del
    Navegador RUM, un servicio denota un conjunto de páginas construidas por un equipo
    que ofrece una funcionalidad específica en su aplicación de navegador. Puede asignar
    páginas web a un servicio con [seguimiento de vista manual](/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names).
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
- description: El ID de traza utilizado para las trazas. Se utiliza para correlacionar
    sus trazas con otros datos, incluidos los registros.
  domain: Reserved
  name: trace_id
  product_source:
  - icon-log
  - icon-apm
  type: number
- description: El cuerpo de una entrada de registro, resaltado y mostrado en Logs
    Live Tail, donde se indexa para búsqueda de texto completo.
  domain: Reserved
  name: message
  product_source:
  - icon-log
  type: string
- description: Número total de bytes transmitidos desde el cliente al servidor cuando
    se emite el registro.
  domain: Network communications
  name: network.bytes_read
  product_source:
  - icon-log
  type: number
- description: Número total de bytes transmitidos desde el servidor al cliente cuando
    se emite el registro.
  domain: Network communications
  name: network.bytes_written
  product_source:
  - icon-log
  type: number
- description: Nombre del país.
  domain: Geolocation
  name: network.client.geoip.country.name
  product_source:
  - icon-log
  type: string
- description: '[Código ISO](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
    del país (por ejemplo, `US` para Estados Unidos, `FR` para Francia).'
  domain: Geolocation
  name: network.client.geoip.country.iso_code
  product_source:
  - icon-log
  type: string
- description: Código ISO del continente (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).
  domain: Geolocation
  name: network.client.geoip.continent.code
  product_source:
  - icon-log
  type: string
- description: Nombre del continente (`Europa`, `Australia`, `América del Norte`,
    `África`, `Antártida`, `América del Sur`, `Oceanía`).
  domain: Geolocation
  name: network.client.geoip.continent.name
  product_source:
  - icon-log
  type: string
- description: Nombre del primer nivel de subdivisión del país (por ejemplo, `California`
    en los Estados Unidos o el departamento de `Sarthe` en Francia).
  domain: Geolocation
  name: network.client.geoip.subdivision.name
  product_source:
  - icon-log
  type: string
- description: '[Código ISO](https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_ISO_3166-2)
    del primer nivel de subdivisión del país (por ejemplo, `CA` en los Estados Unidos
    o el departamento de `SA` en Francia).'
  domain: Geolocation
  name: network.client.geoip.subdivision.iso_code
  product_source:
  - icon-log
  type: string
- description: El nombre de la ciudad (por ejemplo, `París`, `Nueva York`).
  domain: Geolocation
  name: network.client.geoip.city.name
  product_source:
  - icon-log
  type: string
- description: Campo de encabezado HTTP que identifica la dirección de la página web
    que enlazó al recurso que se está solicitando.
  domain: HTTP
  name: http.referer
  product_source:
  - icon-log
  type: string
- description: El ID de la solicitud HTTP.
  domain: HTTP
  name: http.request_id
  product_source:
  - icon-log
  type: string
- description: La parte del host HTTP de la URL.
  domain: HTTP, URL Details
  name: http.url_details.host
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: La parte del puerto HTTP de la URL.
  domain: HTTP, URL Details
  name: http.url_details.port
  product_source:
  - icon-log
  - icon-apm
  type: number
- description: La parte de la ruta HTTP de la URL.
  domain: HTTP, URL Details
  name: http.url_details.path
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: Las partes de la cadena de consulta HTTP de la URL descompuestas como
    atributos clave/valor de parámetros de consulta.
  domain: HTTP, URL Details
  name: http.url_details.queryString
  product_source:
  - icon-log
  - icon-apm
  type: object
- description: El nombre del protocolo de la URL (HTTP o HTTPS).
  domain: HTTP, URL Details
  name: http.url_details.scheme
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: La familia de sistemas operativos reportada por el User-Agent.
  domain: User-Agent
  name: http.useragent_details.os.family
  product_source:
  - icon-log
  type: string
- description: La familia de navegadores reportada por el User-Agent.
  domain: User-Agent
  name: http.useragent_details.browser.family
  product_source:
  - icon-log
  type: string
- description: La familia de dispositivos reportada por el User-Agent.
  domain: User-Agent
  name: http.useragent_details.device.family
  product_source:
  - icon-log
  type: string
- description: El nombre del registrador.
  domain: Source code
  name: logger.name
  product_source:
  - icon-log
  type: string
- description: El nombre del hilo actual cuando se genera el registro.
  domain: Source code
  name: logger.thread_name
  product_source:
  - icon-log
  type: string
- description: El nombre del método de la clase.
  domain: Source code
  name: logger.method_name
  product_source:
  - icon-log
  type: string
- description: La versión del registrador.
  domain: Source code
  name: logger.version
  product_source:
  - icon-log
  type: string
- description: El tipo o clase de error (o código en algunos casos).
  domain: Source code
  name: error.kind
  product_source:
  - icon-log
  type: string
- description: El nombre de la base de datos a la que se está conectando. Por ejemplo,
    en Java, si `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, el nombre de la
    instancia es `customers`.
  domain: Database
  name: db.instance
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 'Una declaración de base de datos para el tipo de base de datos dado.
    Por ejemplo, para mySQL: `''SELECT * FROM wuser_table'';` y para Redis: `''SET
    mykey ''WuValue''''`.'
  domain: Database
  name: db.statement
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: Usuario que realiza la operación.
  domain: Database
  name: db.user
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 'Una duración de cualquier tipo en **nanosegundos**: tiempo de respuesta
    HTTP, tiempo de consulta de base de datos, latencia, etc. [Remap](/logs/log_configuration/processors/remapper/)
    cualquier duración dentro de los registros a este atributo porque Datadog lo muestra
    y lo utiliza como medida predeterminada para la búsqueda de trazas.'
  domain: Performance
  name: duration
  product_source:
  - icon-log
  type: number
- description: El identificador del usuario.
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
- description: El nombre amigable del usuario.
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
- description: El correo electrónico del usuario.
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
- description: El nombre del host.
  domain: Syslog and log shippers
  name: syslog.hostname
  product_source:
  - icon-log
  type: string
- description: El nombre de la aplicación. Generalmente remapeado al atributo reservado
    `service`.
  domain: Syslog and log shippers
  name: syslog.appname
  product_source:
  - icon-log
  type: string
- description: La severidad del registro. Generalmente remapeado al atributo reservado
    `status`.
  domain: Syslog and log shippers
  name: syslog.severity
  product_source:
  - icon-log
  type: number
- description: La marca de tiempo del registro. Generalmente remapeado al atributo
    reservado `date`.
  domain: Syslog and log shippers
  name: syslog.timestamp
  product_source:
  - icon-log
  type: string
- description: El nombre del entorno de donde provienen los registros.
  domain: Syslog and log shippers
  name: syslog.env
  product_source:
  - icon-log
  type: string
- description: El identificador de la consulta DNS.
  domain: DNS
  name: dns.id
  product_source:
  - icon-log
  type: string
- description: El nombre de dominio consultado.
  domain: DNS
  name: dns.question.name
  product_source:
  - icon-log
  type: string
- description: Un [código de dos octetos](https://es.wikipedia.org/wiki/Lista_de_tipos_de_registros_DNS)
    que especifica el tipo de pregunta DNS.
  domain: DNS
  name: dns.question.type
  product_source:
  - icon-log
  type: string
- description: La clase buscada por la pregunta DNS (como IP al usar internet).
  domain: DNS
  name: dns.question.class
  product_source:
  - icon-log
  type: string
- description: El tamaño de la pregunta DNS en bytes.
  domain: DNS
  name: dns.question.size
  product_source:
  - icon-log
  type: number
- description: La dirección IP con la que responde el DNS.
  domain: DNS
  name: dns.answer.name
  product_source:
  - icon-log
  type: string
- description: Un [código de dos octetos](https://es.wikipedia.org/wiki/Lista_de_tipos_de_registros_DNS)
    que especifica el tipo de respuesta DNS.
  domain: DNS
  name: dns.answer.type
  product_source:
  - icon-log
  type: string
- description: La clase respondida por el DNS.
  domain: DNS
  name: dns.answer.class
  product_source:
  - icon-log
  type: string
- description: El tamaño de la respuesta DNS en bytes.
  domain: DNS
  name: dns.answer.size
  product_source:
  - icon-log
  type: number
- description: El código de respuesta del DNS.
  domain: DNS
  name: dns.flags.rcode
  product_source:
  - icon-log
  type: string
- description: El nombre compartido entre eventos generados por la misma actividad
    (por ejemplo, autenticación).
  domain: Events
  name: evt.name
  product_source:
  - icon-log
  type: string
- description: El resultado del evento (por ejemplo, `éxito`, `fracaso`).
  domain: Events
  name: evt.outcome
  product_source:
  - icon-log
  type: string
- description: Inicio del evento en milisegundos desde la época.
  domain: RUM core attributes
  name: date
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: integer
- description: El tipo de evento (por ejemplo, `visualización` o `recurso`).
  domain: RUM core attributes
  name: type
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: El ID de la aplicación Datadog generado al crear una aplicación RUM.
  domain: RUM core attributes
  name: application.id
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: El nombre de la aplicación Datadog.
  domain: RUM core attributes
  name: application.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  type: string
- description: El tipo de dispositivo según lo reportado por el dispositivo (User-Agent
    del sistema).
  domain: Device (Android, iOS, Roku)
  name: device.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La marca del dispositivo según lo reportado por el dispositivo (User-Agent
    del sistema).
  domain: Device (Android, iOS, Roku)
  name: device.brand
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El modelo del dispositivo según lo reportado por el dispositivo (User-Agent
    del sistema).
  domain: Device (Android, iOS, Roku)
  name: device.model
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El nombre del dispositivo según lo reportado por el dispositivo (User-Agent
    del sistema).
  domain: Device (Android, iOS, Roku)
  name: device.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Estado de la conexión de red del dispositivo (`conectado`, `no conectado`
    o `quizás`).
  domain: Connectivity (Android, iOS)
  name: connectivity.status
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: La lista de interfaces de red disponibles (por ejemplo, `bluetooth`,
    `celular`, `ethernet` o `wifi`).
  domain: Connectivity (Android, iOS)
  name: connectivity.interfaces
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: El tipo de tecnología de radio utilizada para la conexión celular.
  domain: Connectivity (Android, iOS)
  name: connectivity.cellular.technology
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: El nombre del operador de la SIM.
  domain: Connectivity (Android, iOS)
  name: connectivity.cellular.carrier_name
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: El nombre del sistema operativo según lo reportado por el dispositivo
    (User-Agent del sistema).
  domain: Operating System (Android, iOS, Roku)
  name: os.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La versión del sistema operativo según lo reportado por el dispositivo
    (User-Agent del sistema).
  domain: Operating System (Android, iOS, Roku)
  name: os.version
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La versión principal del sistema operativo según lo reportado por el
    dispositivo (User-Agent del sistema).
  domain: Operating System (Android, iOS, Roku)
  name: os.version_major
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Nombre del país.
  domain: Geolocation
  name: geo.country
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: El [código ISO](https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_ISO_3166-1)
    del país (por ejemplo, `US` para Estados Unidos o `FR` para Francia).
  domain: Geolocation
  name: geo.country_iso_code
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Nombre del primer nivel de subdivisión del país (por ejemplo, `California`
    en los Estados Unidos o el departamento de `Sarthe` en Francia).
  domain: Geolocation
  name: geo.country_subdivision
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Código ISO del continente (`EU`, `AS`, `NA`, `AF`, `AN`, `SA` o `OC`).
  domain: Geolocation
  name: geo.continent_code
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Nombre del continente (`Europa`, `Australia`, `América del Norte`,
    `África`, `Antártida`, `América del Sur` o `Oceanía`).
  domain: Geolocation
  name: geo.continent
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: El nombre de la ciudad (por ejemplo, `San Francisco`, `París` o `Nueva
    York`).
  domain: Geolocation
  name: geo.city
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Identificador del usuario.
  domain: RUM user attributes
  name: usr.id
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: Nombre del usuario.
  domain: Global user attributes (Android, iOS, Browser, Roku)
  name: usr.name
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: Correo electrónico del usuario.
  domain: Global user attributes (Android, iOS, Browser, Roku)
  name: usr.email
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: ID único de la sesión.
  domain: Session (Android events, iOS events, Roku events)
  name: session.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Tipo de la sesión (`usuario`).
  domain: Session (Android events, iOS events, Roku events)
  name: session.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Indica si la sesión está actualmente activa. La sesión finaliza si
    un usuario navega fuera de la aplicación o cierra la ventana del navegador, y
    expira después de 4 horas de actividad o 15 minutos de inactividad.
  domain: Session (Android events, iOS events, Roku events)
  name: session.is_active
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: boolean
- description: URL de la vista inicial de la sesión.
  domain: Session (Android events, iOS events, Roku events)
  name: session.initial_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Nombre de la vista inicial de la sesión.
  domain: Session (Android events, iOS events, Roku events)
  name: session.initial_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: URL de la última vista de la sesión.
  domain: Session (Android events, iOS events, Roku events)
  name: session.last_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Nombre de la última vista de la sesión.
  domain: Session (Android events, iOS events, Roku events)
  name: session.last_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Dirección IP de la sesión extraída de la conexión TCP de la ingesta.
    Si desea dejar de recopilar este atributo, cambie la configuración en los [detalles
    de la aplicación](/data_security/real_user_monitoring/#ip-address).
  domain: Session (Android events, iOS events, Roku events)
  name: session.ip
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Información del `User-Agent` del sistema para interpretar la información
    del dispositivo.
  domain: Session (Android events, iOS events, Roku events)
  name: session.useragent
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: ID único de la vista inicial correspondiente al evento.
  domain: View (Android events, iOS events, Roku events)
  name: view.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Nombre canónico de la clase correspondiente al evento. Para iOS, la
    URL de la clase `UIViewController` correspondiente al evento.
  domain: View (Android events, iOS events, Roku events)
  name: view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Nombre personalizable de la vista correspondiente al evento.
  domain: View (Android events, iOS events, Roku events)
  name: view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Identificador único del recurso.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El tipo de recurso que se está recopilando (por ejemplo, `xhr`, `imagen`,
    `fuente`, `css` o `js`).
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El método HTTP (por ejemplo, `POST`, `GET`, `PATCH` o `DELETE`).
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El código de estado de la respuesta.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: number
- description: La URL del recurso.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El nombre del proveedor del recurso. El valor predeterminado es `desconocido`.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El dominio del proveedor del recurso.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El tipo de proveedor del recurso (por ejemplo, `primera parte`, `cdn`,
    `anuncio` o `analítica`).
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: De dónde proviene el error (por ejemplo, `webview`, `logger` o `red`).
  domain: Error (Browser events, Android events, iOS events, Roku events)
  name: error.source
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: El tipo de error (o código de error en algunos casos).
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
- description: Un mensaje conciso, legible por humanos, de una línea que explica el
    evento.
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
- description: La traza de pila o información complementaria sobre el error.
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
- description: UUID del error.
  domain: Error (Android events, iOS events, Roku events)
  name: error.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El código de estado de la respuesta.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: number
- description: El método HTTP (por ejemplo, `POST` o `GET`).
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La URL del recurso.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El nombre del proveedor del recurso. El valor predeterminado es `desconocido`.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El dominio del proveedor del recurso.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El tipo de proveedor del recurso (por ejemplo, `primera parte`, `cdn`,
    `anuncio` o `analítica`).
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: UUID de la acción del usuario.
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.id
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Tipo de la acción del usuario (por ejemplo, `tap` o `inicio_de_aplicación`).
    Para [Acciones de Usuario de Navegador Personalizadas](/real_user_monitoring/application_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions),
    se establece en `custom`.
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.type
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Para acciones recolectadas automáticamente, el nombre del elemento
    con el que interactuó el usuario. Para acciones personalizadas, el nombre proporcionado
    en la llamada a la API (por ejemplo, `Clic en finalizar compra`).
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.target.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: ID generado aleatoriamente para cada vista de página.
  domain: View (Browser)
  name: view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: El tipo de carga de página, `carga_inicial` o `cambio_de_ruta`. Para
    más información, consulte la [documentación de soporte para aplicaciones de una
    sola página](/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa).
  domain: View (Browser)
  name: view.loading_type
  product_source:
  - icon-rum
  - browser
  type: string
- description: La URL de la página web anterior desde la cual se siguió un enlace
    a la página actualmente solicitada.
  domain: View (Browser)
  name: view.referrer
  product_source:
  - icon-rum
  - browser
  type: string
- description: La URL de la visualización.
  domain: View (Browser)
  name: view.url
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte hash de la URL.
  domain: View (Browser)
  name: view.url_hash
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte del servidor de la URL.
  domain: View (Browser)
  name: view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte de la ruta de la URL.
  domain: View (Browser)
  name: view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: El grupo de URL automático generado para URLs similares (por ejemplo,
    `/dashboard/?` para `/dashboard/123` y `/dashboard/456`).
  domain: View (Browser)
  name: view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: Las partes de la cadena de consulta de la URL descompuestas como atributos
    clave/valor de parámetros de consulta.
  domain: View (Browser)
  name: view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: La parte del esquema de la URL.
  domain: View (Browser)
  name: view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: El tipo de dispositivo reportado por el dispositivo (encabezado HTTP
    User-Agent).
  domain: Device (Browser)
  name: device.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: La marca del dispositivo reportada por el dispositivo (encabezado HTTP
    User-Agent).
  domain: Device (Browser)
  name: device.brand
  product_source:
  - icon-rum
  - browser
  type: string
- description: El modelo del dispositivo según lo reportado por el dispositivo (encabezado
    HTTP User-Agent).
  domain: Device (Browser)
  name: device.model
  product_source:
  - icon-rum
  - browser
  type: string
- description: El nombre del dispositivo según lo reportado por el dispositivo (encabezado
    HTTP User-Agent).
  domain: Device (Browser)
  name: device.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: El nombre del sistema operativo según lo reportado por el dispositivo
    (encabezado HTTP User-Agent).
  domain: Operating system (Browser)
  name: os.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: La versión del sistema operativo según lo reportado por el dispositivo
    (encabezado HTTP User-Agent).
  domain: Operating system (Browser)
  name: os.version
  product_source:
  - icon-rum
  - browser
  type: string
- description: La versión principal del sistema operativo según lo reportado por el
    dispositivo (encabezado HTTP User-Agent).
  domain: Operating system (Browser)
  name: os.version_major
  product_source:
  - icon-rum
  - browser
  type: string
- description: ID generado aleatoriamente para cada sesión.
  domain: Session (Browser events)
  name: session.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: Dirección IP del cliente. Si desea dejar de recopilar este atributo,
    cambie la configuración en los [detalles de la aplicación](/data_security/real_user_monitoring/#ip-address).
  domain: Session (Browser events)
  name: session.ip
  product_source:
  - icon-rum
  - browser
  type: string
- description: Indica si la sesión está actualmente activa. La sesión termina después
    de 4 horas de actividad o 15 minutos de inactividad.
  domain: Session (Browser events)
  name: session.is_active
  product_source:
  - icon-rum
  - browser
  type: boolean
- description: El tipo de sesión, `usuario` o `synthetics`. Las sesiones de [Pruebas
    de Navegador Sintético](/synthetics/browser_tests/) están excluidas de la facturación.
  domain: Session (Browser events)
  name: session.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: La URL de la página web anterior desde la cual se siguió un enlace
    a la página actualmente solicitada.
  domain: Session (Browser events)
  name: session.referrer
  product_source:
  - icon-rum
  - browser
  type: string
- description: El ID de la primera visualización RUM generada por el usuario.
  domain: Session (Browser events)
  name: session.initial_view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte del servidor de la URL.
  domain: Session (Browser events)
  name: session.initial_view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte de la ruta de la URL.
  domain: Session (Browser events)
  name: session.initial_view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: El grupo de URL automático generado para URLs similares (por ejemplo,
    `/dashboard/?` para `/dashboard/123` y `/dashboard/456`).
  domain: Session (Browser events)
  name: session.initial_view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: Las partes de la cadena de consulta de la URL descompuestas como atributos
    clave/valor de parámetros de consulta.
  domain: Session (Browser events)
  name: session.initial_view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: La parte del esquema de la URL.
  domain: Session (Browser events)
  name: session.initial_view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: El ID de la última visualización RUM generada por el usuario.
  domain: Session (Browser events)
  name: session.last_view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte del host de la URL.
  domain: Session (Browser events)
  name: session.last_view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte de la ruta de la URL.
  domain: Session (Browser events)
  name: session.last_view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: El grupo de URL automático generado para URLs similares (por ejemplo,
    `/dashboard/?` para `/dashboard/123` y `/dashboard/456`).
  domain: Session (Browser events)
  name: session.last_view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: Las partes de la cadena de consulta de la URL descompuestas como atributos
    clave/valor de parámetros de consulta.
  domain: Session (Browser events)
  name: session.last_view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: La parte del esquema de la URL.
  domain: Session (Browser events)
  name: session.last_view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: El tipo de recurso que se está recolectando (por ejemplo, `css`, `javascript`,
    `media`, `XHR` o `imagen`).
  domain: Resource (Browser events)
  name: resource.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: El método HTTP (por ejemplo, `POST` o `GET`).
  domain: Resource (Browser events)
  name: resource.method
  product_source:
  - icon-rum
  - browser
  type: string
- description: El código de estado de la respuesta.
  domain: Resource (Browser events)
  name: resource.status_code
  product_source:
  - icon-rum
  - browser
  type: number
- description: La URL del recurso.
  domain: Resource (Browser events)
  name: resource.url
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte del servidor de la URL.
  domain: Resource (Browser events)
  name: resource.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte de la ruta de la URL.
  domain: Resource (Browser events)
  name: resource.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: Las partes de la cadena de consulta de la URL descompuestas como atributos
    clave/valor de parámetros de consulta.
  domain: Resource (Browser events)
  name: resource.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: El nombre del protocolo de la URL (HTTP o HTTPS).
  domain: Resource (Browser events)
  name: resource.url_scheme
  product_source:
  - icon-rum
  - browser
  type: string
- description: El nombre del proveedor del recurso. El valor predeterminado es `desconocido`.
  domain: Resource (Browser events)
  name: resource.provider.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: El dominio del proveedor del recurso.
  domain: Resource (Browser events)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - browser
  type: string
- description: El tipo de proveedor del recurso (por ejemplo, `primera parte`, `cdn`,
    `anuncio` o `analítica`).
  domain: Resource (Browser events)
  name: resource.provider.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: El tipo de señal de frustración detectada por el SDK del Navegador
    RUM (`rage_click`, `dead_click` o `error_click`).
  domain: Frustration signals (Browser events)
  name: action.frustration.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: El parámetro en la URL que rastrea la fuente del tráfico.
  domain: UTM (Browser events)
  name: view.url_query.utm_source
  product_source:
  - icon-rum
  - browser
  type: string
- description: El parámetro en la URL que rastrea el canal de donde proviene el tráfico.
  domain: UTM (Browser events)
  name: view.url_query.utm_medium
  product_source:
  - icon-rum
  - browser
  type: string
- description: El parámetro en la URL que identifica la campaña de marketing específica
    vinculada a esa vista.
  domain: UTM (Browser events)
  name: view.url_query.utm_campaign
  product_source:
  - icon-rum
  - browser
  type: string
- description: El parámetro en la URL que identifica el elemento específico que un
    usuario hizo clic dentro de una campaña de marketing.
  domain: UTM (Browser events)
  name: view.url_query.utm_content
  product_source:
  - icon-rum
  - browser
  type: string
- description: El parámetro en la URL que rastrea la palabra clave que un usuario
    buscó para activar una campaña dada.
  domain: UTM (Browser events)
  name: view.url_query.utm_term
  product_source:
  - icon-rum
  - browser
  type: string
- description: El lenguaje del SDK del cliente utilizado para generar el tramo. Puede
    ser uno de `cpp`, `dotnet`, `go`, `jvm`, `javascript`, `php`, `python`, `ruby`.
  domain: APM core
  name: language
  product_source:
  - icon-apm
  type: string
- description: El valor de la variable de entorno `DD_ENV` o `env` definido por el
    usuario para el proceso en ejecución.
  domain: APM core (Reserved)
  name: env
  product_source:
  - icon-apm
  type: string
- description: El valor de la variable de entorno `DD_VERSION` o `version` definido
    por el usuario para el proceso en ejecución.
  domain: APM core (Reserved)
  name: version
  product_source:
  - icon-apm
  type: string
- description: La cadena que representa el tipo de unidad de trabajo manejada por
    el tramo. Puede ser uno de servidor, cliente, productor, consumidor o interno.
    Para más información, consulte la [documentación de OpenTelemetry SpanKind](https://opentelemetry.io/docs/specs/otel/trace/api/#spankind).
  domain: APM core
  name: span.kind
  product_source:
  - icon-apm
  type: string
- description: El nombre de la biblioteca o integración que creó el tramo.
  domain: APM core
  name: component
  product_source:
  - icon-apm
  type: string
- description: La dirección IP del cliente que inició la conexión entrante.
  domain: Network communications
  name: network.client.ip
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La dirección IP a la que se está realizando la conexión saliente.
  domain: Network communications
  name: network.destination.ip
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La dirección IP del servidor local.
  domain: Network communications
  name: network.host.ip
  product_source:
  - icon-apm
  type: string
- description: El puerto del cliente que inició la conexión.
  domain: Network communications
  name: network.client.port
  product_source:
  - icon-apm
  - icon-log
  type: number
- description: El número de puerto remoto de la conexión saliente.
  domain: Network communications
  name: network.destination.port
  product_source:
  - icon-apm
  - icon-log
  type: number
- description: El nombre del servidor del cliente que inició la conexión entrante.
  domain: Network communications
  name: network.client.name
  product_source:
  - icon-apm
  type: string
- description: El nombre del servidor local.
  domain: Network communications
  name: network.host.name
  product_source:
  - icon-apm
  type: string
- description: El protocolo de transporte utilizado para realizar la conexión entrante.
  domain: Network communications
  name: network.client.transport
  product_source:
  - icon-apm
  type: string
- description: El protocolo de transporte utilizado para realizar la conexión saliente.
  domain: Network communications
  name: network.destination.transport
  product_source:
  - icon-apm
  type: string
- description: El código de estado de la respuesta HTTP.
  domain: HTTP requests
  name: http.status_code
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La URL de la solicitud HTTP, incluyendo la cadena de consulta ofuscada.
    Para más información sobre ofuscación, consulte [Configurar la Seguridad de Datos](https://docs.datadoghq.com/tracing/configure_data_security/).
  domain: HTTP requests
  name: http.url
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La versión de HTTP utilizada para la solicitud.
  domain: HTTP requests
  name: http.version
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: El puerto del cliente que inició la conexión.
  domain: HTTP requests
  name: http.method
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La ruta coincidente (plantilla de ruta). Por ejemplo, `/users/:userID`.
  domain: HTTP requests
  name: http.route
  product_source:
  - icon-apm
  type: string
- description: La dirección IP del cliente original detrás de todos los proxies, si
    se conoce. Descubierto a partir de encabezados como `X-Forwarded-For`.
  domain: HTTP requests
  name: http.client_ip
  product_source:
  - icon-apm
  type: string
- description: El tipo de dirección IP, como `pública`, `privada` o `reservada`.
  domain: HTTP client IP details
  name: http.client_ip_details.type
  product_source:
  - icon-apm
  type: string
- description: El nombre del país al que se resuelve la IP del cliente.
  domain: HTTP client IP details
  name: http.client_ip_details.country.name
  product_source:
  - icon-apm
  type: string
- description: Código [ISO](https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_ISO_3166-1)
    del país (por ejemplo, `US` para Estados Unidos, `FR` para Francia).
  domain: HTTP client IP details
  name: http.client_ip_details.country.iso_code
  product_source:
  - icon-apm
  type: string
- description: El código ISO del continente (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).
  domain: HTTP client IP details
  name: http.client_ip_details.continent.code
  product_source:
  - icon-apm
  type: string
- description: El nombre del continente al que se resuelve la IP del cliente.
  domain: HTTP client IP details
  name: http.client_ip_details.continent.name
  product_source:
  - icon-apm
  type: string
- description: El nombre de la subdivisión de primer nivel (como un estado o región)
    a la que se resuelve la IP del cliente.
  domain: HTTP client IP details
  name: http.client_ip_details.subdivision.name
  product_source:
  - icon-apm
  type: string
- description: El [código ISO](https://es.wikipedia.org/wiki/ISO_3166-2) de la subdivisión
    de primer nivel (por ejemplo, `CA-ON` para Ontario, Canadá).
  domain: HTTP client IP details
  name: http.client_ip_details.subdivision.iso_code
  product_source:
  - icon-apm
  type: string
- description: Nombre de la ciudad a la que se resuelve la IP del cliente.
  domain: HTTP client IP details
  name: http.client_ip_details.city.name
  product_source:
  - icon-apm
  type: string
- description: La latitud de la ubicación a la que se resuelve la IP del cliente.
  domain: HTTP client IP details
  name: http.client_ip_details.location.latitude
  product_source:
  - icon-apm
  type: number
- description: La longitud de la ubicación a la que se resuelve la IP del cliente.
  domain: HTTP client IP details
  name: http.client_ip_details.location.longitude
  product_source:
  - icon-apm
  type: number
- description: El identificador de zona horaria de IANA (por ejemplo, `America/Toronto`)
    asociado con la IP del cliente.
  domain: HTTP client IP details
  name: http.client_ip_details.timezone
  product_source:
  - icon-apm
  type: string
- description: El número de sistema autónomo (ASN) al que pertenece la IP del cliente
    (por ejemplo, `AS577`).
  domain: HTTP client IP details
  name: http.client_ip_details.as.number
  product_source:
  - icon-apm
  type: string
- description: El nombre de la organización que opera el sistema autónomo (por ejemplo,
    `Bell Canada`).
  domain: HTTP client IP details
  name: http.client_ip_details.as.name
  product_source:
  - icon-apm
  type: string
- description: El dominio principal asociado con el sistema autónomo (por ejemplo,
    `bell.ca`).
  domain: HTTP client IP details
  name: http.client_ip_details.as.domain
  product_source:
  - icon-apm
  type: string
- description: El prefijo IP anunciado por el sistema autónomo (por ejemplo, `65.95.0.0/16`).
  domain: HTTP client IP details
  name: http.client_ip_details.as.route
  product_source:
  - icon-apm
  type: string
- description: La clasificación del sistema autónomo (por ejemplo, `isp`, `hosting`,
    `negocios`, `educación`).
  domain: HTTP client IP details
  name: http.client_ip_details.as.type
  product_source:
  - icon-apm
  type: string
- description: El encabezado `User-Agent` recibido con la solicitud.
  domain: HTTP requests
  name: http.useragent
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: El tamaño del cuerpo de la carga útil de la solicitud en bytes.
  domain: HTTP requests
  name: http.request.content_length
  product_source:
  - icon-apm
  type: number
- description: El tamaño del cuerpo de la carga útil de la respuesta en bytes.
  domain: HTTP requests
  name: http.response.content_length
  product_source:
  - icon-apm
  type: number
- description: El tamaño del cuerpo de la carga útil de la solicitud sin comprimir
    después de la decodificación del transporte.
  domain: HTTP requests
  name: http.request.content_length_uncompressed
  product_source:
  - icon-apm
  type: number
- description: El tamaño del cuerpo de la carga útil de la respuesta sin comprimir
    después de la decodificación del transporte.
  domain: HTTP requests
  name: http.response.content_length_uncompressed
  product_source:
  - icon-apm
  type: number
- description: Los encabezados HTTP de la solicitud. Ninguno se recopila por defecto,
    pero se puede configurar opcionalmente con `DD_TRACE_HEADER_TAGS`.
  domain: HTTP requests
  name: http.request.headers.*
  product_source:
  - icon-apm
  type: string
- description: Identificador del producto del sistema de gestión de bases de datos
    (DBMS) que se está utilizando.
  domain: Database spans
  name: db.system
  product_source:
  - icon-apm
  type: string
- description: Los encabezados HTTP de la respuesta. Ninguno se recopila por defecto,
    pero se puede configurar opcionalmente con `DD_TRACE_HEADER_TAGS`.
  domain: HTTP requests
  name: http.response.headers.*
  product_source:
  - icon-apm
  type: string
- description: La cadena de conexión utilizada para conectarse a la base de datos.
  domain: Database spans
  name: db.connection_string
  product_source:
  - icon-apm
  type: string
- description: El nombre de la operación que se está ejecutando. Por ejemplo, `SELECT`,
    `findAndModify`, `HMSET`.
  domain: Database spans
  name: db.operation
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: El nombre de la tabla principal sobre la que actúa la operación, incluyendo
    el nombre de la base de datos (si aplica).
  domain: Database spans
  name: db.sql.table
  product_source:
  - icon-apm
  type: string
- description: El número de filas/resultados de la consulta u operación.
  domain: Database spans
  name: db.row_count
  product_source:
  - icon-apm
  type: number
- description: El identificador del sistema de mensajería.
  domain: Message queue spans
  name: messaging.system
  product_source:
  - icon-apm
  type: string
- description: El nombre del destino del mensaje.
  domain: Message queue spans
  name: messaging.destination
  product_source:
  - icon-apm
  type: string
- description: El tipo de destino del mensaje.
  domain: Message queue spans
  name: messaging.destination_kind
  product_source:
  - icon-apm
  type: string
- description: El nombre del protocolo de transporte.
  domain: Message queue spans
  name: messaging.protocol
  product_source:
  - icon-apm
  type: string
- description: La versión del protocolo de transporte.
  domain: Message queue spans
  name: messaging.protocol_version
  product_source:
  - icon-apm
  type: string
- description: La cadena de conexión al sistema de mensajería.
  domain: Message queue spans
  name: messaging.url
  product_source:
  - icon-apm
  type: string
- description: Un valor utilizado por el sistema de mensajería como un identificador
    para el mensaje, representado como una cadena.
  domain: Message queue spans
  name: messaging.message_id
  product_source:
  - icon-apm
  type: string
- description: El ID de la conversación que identifica la conversación a la que pertenece
    el mensaje, representado como una cadena.
  domain: Message queue spans
  name: messaging.conversation_id
  product_source:
  - icon-apm
  type: string
- description: El tamaño de la carga útil del mensaje sin comprimir en bytes.
  domain: Message queue spans
  name: messaging.message_payload_size
  product_source:
  - icon-apm
  type: number
- description: Una cadena que identifica el tipo de consumo del mensaje. Por ejemplo,
    `enviar` (un mensaje enviado a un productor), `recibir` (un mensaje recibido por
    un consumidor) o `procesar` (un mensaje previamente recibido que es procesado
    por un consumidor).
  domain: Message queue spans
  name: messaging.operation
  product_source:
  - icon-apm
  type: string
- description: El identificador del consumidor que recibe un mensaje.
  domain: Message queue spans
  name: messaging.consumer_id
  product_source:
  - icon-apm
  type: string
- description: El identificador del sistema remoto.
  domain: Remote procedure calls
  name: rpc.system
  product_source:
  - icon-apm
  type: string
- description: El nombre del servicio que se está llamando.
  domain: Remote procedure calls
  name: rpc.service
  product_source:
  - icon-apm
  type: string
- description: El nombre del método que se está llamando.
  domain: Remote procedure calls
  name: rpc.method
  product_source:
  - icon-apm
  type: string
- description: El tipo de actividad de seguridad detectada en la solicitud, expresada
    como `<categoría>.<tipo>` (por ejemplo, `intento_de_ataque.inyección_sql`, `lógica_de_negocios.usuarios.login.fallo`).
    Un tramo puede tener más de un valor cuando múltiples reglas coinciden.
  domain: Application & API Protection (AAP)
  name: appsec.security_activity
  product_source:
  - icon-apm
  type: string
- description: La clasificación de nivel superior de la actividad de seguridad detectada
    (por ejemplo, `intento_de_ataque`, `lógica_de_negocios`).
  domain: Application & API Protection (AAP)
  name: appsec.category
  product_source:
  - icon-apm
  type: string
- description: El tipo de amenaza o evento específico dentro de la categoría (por
    ejemplo, `inyección_sql`, `xss`, `usuarios.login.fallo`).
  domain: Application & API Protection (AAP)
  name: appsec.type
  product_source:
  - icon-apm
  type: string
- description: El identificador de la regla AAP que coincidió con la solicitud (por
    ejemplo, `crs-942-100`). Un tramo puede tener múltiples valores cuando más de
    una regla se activa.
  domain: Application & API Protection (AAP)
  name: appsec.rule_id
  product_source:
  - icon-apm
  type: string
- description: Si la solicitud fue bloqueada por AAP. `true` si la solicitud fue bloqueada,
    `false` de lo contrario.
  domain: Application & API Protection (AAP)
  name: appsec.blocked
  product_source:
  - icon-apm
  type: string
content: La siguiente tabla enumera los atributos aplicados automáticamente a los
  datos enviados a Datadog por el Agent de cada uno de los productos RUM, Logs y APM,
  según corresponda al dominio de datos. Opcionalmente, filtre la lista por producto
  o busque por palabra clave o texto de descripción para encontrar los atributos que
  le interesan.
description: Una tabla de los atributos aplicados automáticamente a los datos enviados
  a Datadog por el Agent de cada uno de los productos RUM, Logs y APM, según corresponda
  al dominio de datos.
disable_sidebar: true
filter_all: All
further_reading:
- link: /data_security/
  tag: Documentación
  text: Asegurando la seguridad de los datos enviados a Datadog
- link: /tracing/trace_collection/tracing_naming_convention/
  tag: Documentación
  text: Semántica de las etiquetas de tramo
title: Atributos estándar predeterminados
---
## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}