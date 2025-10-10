---
attributes:
- description: El nombre del host de origen tal y como se define en las métricas.
    Datadog recupera automáticamente las etiquetas de host correspondientes del host
    coincidente en Datadog y las aplica a tu telemetría. El Agent configura este valor
    automáticamente.
  domain: Reservado
  name: host
  product_source:
  - icon-log
  - icon-apm
  type: cadena
- description: El tipo de dispositivo de origen.
  domain: Reservado
  name: device
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: cadena
- description: Corresponde al nombre de la integración, la tecnología de la que proceden
    los datos. Cuando coincide con un nombre de integración, Datadog instala automáticamente
    los analizadores y las facetas correspondientes. Por ejemplo, `nginx`, `postgresql`,
    etc.
  domain: Reservado
  name: source
  product_source:
  - icon-log
  type: cadena
- description: Esto corresponde al nivel o la severidad de los datos. En el caso de
    los logs, se utilizan para definir [patrones de logs](/logs/explorer/patterns/)
    y tiene un diseño dedicado en la interfaz de usuario de gestión de logs.
  domain: Reservado
  name: status
  product_source:
  - icon-log
  - icon-apm
  type: cadena
- description: El [nombre de servicio unificado](/getting_started/tagging/unified_service_tagging/)
    para la aplicación o el servicio que genera los datos, que se utiliza para correlacionar
    las sesiones de usuario. Se utiliza para cambiar de APM a otros productos, por
    lo que debes asegurarte de definir el mismo valor cuando utilices ambos productos.
    En el SDK del navegador RUM, un servicio denota un conjunto de páginas creadas
    por un equipo que ofrece una funcionalidad específica en tu aplicación de navegador.
    Puedes asignar páginas web a un servicio con [rastreo de vista manual](/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names).
  domain: Reservado
  name: Servicio
  product_source:
  - icon-log
  - icon-rum
  - icon-apm
  - android
  - ios
  - browser
  - roku
  type: cadena
- description: El ID de traza (trace) que se utiliza para las trazas. Se utiliza para
    correlacionar las trazas con otros datos, incluidos los logs.
  domain: Reservado
  name: trace_id
  product_source:
  - icon-log
  - icon-apm
  type: número
- description: El cuerpo de una entrada de log, resaltado y mostrado en Logs Live
    Tail, donde está indexado para la búsqueda de texto completo.
  domain: Reservado
  name: message
  product_source:
  - icon-log
  type: cadena
- description: Número total de bytes transmitidos del cliente al servidor cuando se
    emite el log.
  domain: Comunicaciones de red
  name: network.bytes_read
  product_source:
  - icon-log
  type: número
- description: Número total de bytes transmitidos del servidor al cliente cuando se
    emite el log.
  domain: Comunicaciones de red
  name: network.bytes_written
  product_source:
  - icon-log
  type: número
- description: Nombre del país.
  domain: Geolocalización
  name: network.client.geoip.country.name
  product_source:
  - icon-log
  type: cadena
- description: '[Código ISO](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
    del país (por ejemplo, `US` para Estados Unidos, `FR` para Francia).'
  domain: Geolocalización
  name: network.client.geoip.country.iso_code
  product_source:
  - icon-log
  type: cadena
- description: Código ISO del continente (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).
  domain: Geolocalización
  name: network.client.geoip.continent.code
  product_source:
  - icon-log
  type: cadena
- description: Nombre del continente (`Europe`, `Australia`, `North America`, `Africa`,
    `Antartica`, `South America`, `Oceania`).
  domain: Geolocalización
  name: network.client.geoip.continent.name
  product_source:
  - icon-log
  type: cadena
- description: Nombre del primer nivel de subdivisión del país (por ejemplo, `California`
    en Estados Unidos o el departamento `Sarthe` en Francia).
  domain: Geolocalización
  name: network.client.geoip.subdivision.name
  product_source:
  - icon-log
  type: cadena
- description: '[Código ISO](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
    del primer nivel de subdivisión del país (por ejemplo, `CA` en Estados Unidos
    o el departamento `SA` en Francia).'
  domain: Geolocalización
  name: network.client.geoip.subdivision.iso_code
  product_source:
  - icon-log
  type: cadena
- description: El nombre de la ciudad (por ejemplo, `Paris`, `New York`).
  domain: Geolocalización
  name: network.client.geoip.city.name
  product_source:
  - icon-log
  type: cadena
- description: Campo de encabezado HTTP que identifica la dirección de la página web
    vinculada al recurso solicitado.
  domain: HTTP
  name: http.referer
  product_source:
  - icon-log
  type: cadena
- description: El ID de la solicitud HTTP.
  domain: HTTP
  name: http.request_id
  product_source:
  - icon-log
  type: cadena
- description: La parte del host HTTP de la URL.
  domain: HTTP, detalles de la URL
  name: http.url_details.host
  product_source:
  - icon-log
  - icon-apm
  type: cadena
- description: La parte del puerto HTTP de la URL.
  domain: HTTP, detalles de la URL
  name: http.url_details.port
  product_source:
  - icon-log
  - icon-apm
  type: número
- description: La parte de la ruta HTTP de la URL.
  domain: HTTP, detalles de la URL
  name: http.url_details.path
  product_source:
  - icon-log
  - icon-apm
  type: cadena
- description: Las partes de la cadena de la consulta HTTP de la URL desglosadas como
    atributos de clave/valor de parámetros de consulta.
  domain: HTTP, detalles de la URL
  name: http.url_details.queryString
  product_source:
  - icon-log
  - icon-apm
  type: objecto
- description: El nombre de protocolo de la URL (HTTP o HTTPS).
  domain: HTTP, detalles de la URL
  name: http.url_details.scheme
  product_source:
  - icon-log
  - icon-apm
  type: cadena
- description: La familia del SO informada por el User-Agent.
  domain: User-Agent
  name: http.useragent_details.os.family
  product_source:
  - icon-log
  type: cadena
- description: La familia de navegadores informada por el User-Agent.
  domain: User-Agent
  name: http.useragent_details.browser.family
  product_source:
  - icon-log
  type: cadena
- description: La familia de dispositivos informada por el User-Agent.
  domain: User-Agent
  name: http.useragent_details.device.family
  product_source:
  - icon-log
  type: cadena
- description: El nombre del registrador.
  domain: Código de origen
  name: logger.name
  product_source:
  - icon-log
  type: cadena
- description: El nombre del subproceso actual cuando se activa el log.
  domain: Código de origen
  name: logger.thread_name
  product_source:
  - icon-log
  type: cadena
- description: El nombre del método de clase.
  domain: Código de origen
  name: logger.method_name
  product_source:
  - icon-log
  type: cadena
- description: La versión del registrador.
  domain: Código de origen
  name: logger.version
  product_source:
  - icon-log
  type: cadena
- description: El tipo o la clase de error (o código en algunos casos).
  domain: Código de origen
  name: error.kind
  product_source:
  - icon-log
  type: cadena
- description: El nombre de la base de datos a la que te estás conectando. Por ejemplo,
    en Java, si `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, el nombre de instancia
    es `customers`.
  domain: Base de datos
  name: db.instance
  product_source:
  - icon-apm
  - icon-log
  type: cadena
- description: 'Una declaración de base de datos para el tipo de base de datos indicado.
    Por ejemplo, para MySQL: `''SELECT * FROM wuser_table'';`, y para Redis: `''SET
    mykey ''WuValue''''`.'
  domain: Base de datos
  name: db.statement
  product_source:
  - icon-apm
  - icon-log
  type: cadena
- description: El usuario que realiza la operación.
  domain: Base de datos
  name: db.user
  product_source:
  - icon-apm
  - icon-log
  type: cadena
- description: 'Una duración de cualquier tipo en **nanosegundos**: tiempo de respuesta
    HTTP, tiempo de consulta de base de datos, latencia, etc. [Reasigna](/logs/log_configuration/processors/#remapper)
    cualquier duración dentro de los logs a este atributo porque Datadog lo muestra
    y lo usa como una medida predeterminada para la búsqueda de trazas.'
  domain: Rendimiento
  name: duration
  product_source:
  - icon-log
  type: número
- description: El identificador del usuario.
  domain: Usuario
  name: usr.id
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: cadena
- description: El nombre descriptivo.
  domain: Usuario
  name: usr.name
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: cadena
- description: El correo electrónico del usuario.
  domain: Usuario
  name: usr.email
  product_source:
  - icon-log
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: cadena
- description: El nombre de host.
  domain: Syslog y trasvasadores de logs
  name: syslog.hostname
  product_source:
  - icon-log
  type: cadena
- description: El nombre de la aplicación. Generalmente reasignado al atributo reservado
    `service`.
  domain: Syslog y trasvasadores de logs
  name: syslog.appname
  product_source:
  - icon-log
  type: cadena
- description: La severidad del log. Generalmente reasignado al atributo reservado
    `status`.
  domain: Syslog y trasvasadores de logs
  name: syslog.severity
  product_source:
  - icon-log
  type: número
- description: La marca de tiempo del log. Generalmente reasignado al atributo reservado
    `date`.
  domain: Syslog y trasvasadores de logs
  name: syslog.timestamp
  product_source:
  - icon-log
  type: cadena
- description: El nombre del entorno de donde procede la fuente de los logs.
  domain: Syslog y trasvasadores de logs
  name: syslog.env
  product_source:
  - icon-log
  type: cadena
- description: El identificador de la consulta DNS.
  domain: DNS
  name: dns.id
  product_source:
  - icon-log
  type: cadena
- description: El nombre de dominio consultado.
  domain: DNS
  name: dns.question.name
  product_source:
  - icon-log
  type: cadena
- description: Un [código de dos octetos](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
    que especifica el tipo de pregunta DNS.
  domain: DNS
  name: dns.question.type
  product_source:
  - icon-log
  type: cadena
- description: La clase buscada por la pregunta DNS (como el IP cuando se utiliza
    Internet).
  domain: DNS
  name: dns.question.class
  product_source:
  - icon-log
  type: cadena
- description: El tamaño de la pregunta DNS en bytes.
  domain: DNS
  name: dns.question.size
  product_source:
  - icon-log
  type: número
- description: La dirección IP con la que responde el DNS.
  domain: DNS
  name: dns.answer.name
  product_source:
  - icon-log
  type: cadena
- description: Un [código de dos octetos](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
    que especifica el tipo de respuesta DNS.
  domain: DNS
  name: dns.answer.type
  product_source:
  - icon-log
  type: cadena
- description: La clase contestada por el DNS.
  domain: DNS
  name: dns.answer.class
  product_source:
  - icon-log
  type: cadena
- description: El tamaño de la respuesta DNS en bytes.
  domain: DNS
  name: dns.answer.size
  product_source:
  - icon-log
  type: número
- description: El código de respuesta DNS.
  domain: DNS
  name: dns.flags.rcode
  product_source:
  - icon-log
  type: cadena
- description: El nombre compartido a través de eventos generado por la misma actividad
    (por ejemplo, autenticación).
  domain: Eventos
  name: evt.name
  product_source:
  - icon-log
  type: cadena
- description: El resultado del evento (por ejemplo, `success`, `failure`).
  domain: Eventos
  name: evt.outcome
  product_source:
  - icon-log
  type: cadena
- description: Inicio del evento en milisegundos desde la época.
  domain: Atributos básicos del RUM
  name: date
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: entero
- description: El tipo de evento (por ejemplo, `view` o `resource`).
  domain: Atributos básicos del RUM
  name: tipo
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: El ID de aplicación de Datadog generado al crear una aplicación de
    RUM.
  domain: Atributos básicos del RUM
  name: application.id
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: El nombre de la aplicación Datadog.
  domain: Atributos básicos del RUM
  name: application.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  type: cadena
- description: El tipo de dispositivo notificado por el dispositivo (System User-Agent).
  domain: Dispositivo (Android, iOS, Roku)
  name: device.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: La marca del dispositivo notificada por el dispositivo (System User-Agent).
  domain: Dispositivo (Android, iOS, Roku)
  name: device.brand
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El modelo del dispositivo notificado por el dispositivo (System User-Agent).
  domain: Dispositivo (Android, iOS, Roku)
  name: device.model
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El nombre del dispositivo notificado por el dispositivo (System User-Agent).
  domain: Dispositivo (Android, iOS, Roku)
  name: device.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Estado de la accesibilidad a la red del dispositivo (`connected`, `not
    connected` o `maybe`).
  domain: Conectividad (Android, iOS)
  name: connectivity.status
  product_source:
  - icon-rum
  - android
  - ios
  type: cadena
- description: La lista de interfaces de red disponibles (por ejemplo, `bluetooth`,
    `cellular`, `ethernet` o `wifi`).
  domain: Conectividad (Android, iOS)
  name: connectivity.interfaces
  product_source:
  - icon-rum
  - android
  - ios
  type: cadena
- description: El tipo de tecnología de radio utilizada para la conexión celular.
  domain: Conectividad (Android, iOS)
  name: connectivity.cellular.technology
  product_source:
  - icon-rum
  - android
  - ios
  type: cadena
- description: El nombre del operador de la SIM.
  domain: Conectividad (Android, iOS)
  name: connectivity.cellular.carrier_name
  product_source:
  - icon-rum
  - android
  - ios
  type: cadena
- description: El nombre del sistema operativo notificado por el dispositivo (System
    User-Agent).
  domain: Sistema operativo (Android, iOS, Roku)
  name: os.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: La versión del sistema operativo notificada por el dispositivo (System
    User-Agent).
  domain: Sistema operativo (Android, iOS, Roku)
  name: os.version
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: La versión principal del sistema operativo notificada por el dispositivo
    (System User-Agent).
  domain: Sistema operativo (Android, iOS, Roku)
  name: os.version_major
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Nombre del país.
  domain: Geolocalización
  name: geo.country
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: El [Código ISO](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
    del país (por ejemplo, `US` para Estados Unidos o `FR` para Francia).
  domain: Geolocalización
  name: geo.country_iso_code
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: Nombre del primer nivel de subdivisión del país (por ejemplo, `California`
    en Estados Unidos o el departamento `Sarthe` en Francia).
  domain: Geolocalización
  name: geo.country_subdivision
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: Código ISO del continente (`EU`, `AS`, `NA`, `AF`, `AN`, `SA` o `OC`).
  domain: Geolocalización
  name: geo.continent_code
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: Nombre del continente (`Europe`, `Australia`, `North America`, `Africa`,
    `Antarctica`, `South America` o `Oceania`).
  domain: Geolocalización
  name: geo.continent
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: El nombre de la ciudad (por ejemplo, `San Francisco`, `Paris` o `New
    York`).
  domain: Geolocalización
  name: geo.city
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: Identificador del usuario.
  domain: Atributos de usuario de RUM (Android, Roku)
  name: user.id
  product_source:
  - icon-rum
  - android
  - roku
  type: cadena
- description: Identificador del usuario.
  domain: Atributos de usuario de RUM (iOS)
  name: usr.id
  product_source:
  - icon-rum
  - ios
  type: cadena
- description: Nombre del usuario.
  domain: Atributos de usuario globales (Android, iOS, Roku)
  name: usr.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Correo electrónico del usuario.
  domain: Atributos de usuario globales (Android, iOS, Roku)
  name: usr.email
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: ID único de la sesión.
  domain: Sesión (eventos Android, eventos iOS, eventos Roku)
  name: session.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Tipo de sesión (`user`).
  domain: Sesión (eventos Android, eventos iOS, eventos Roku)
  name: session.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Indica si la sesión está actualmente activa. La sesión finaliza si
    un usuario sale de la aplicación o cierra la ventana del navegador y expira tras
    4 horas de actividad o 15 minutos de inactividad.
  domain: Sesión (eventos Android, eventos iOS, eventos Roku)
  name: session.is_active
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: booleano
- description: URL de la vista inicial de la sesión.
  domain: Sesión (eventos Android, eventos iOS, eventos Roku)
  name: session.initial_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Nombre de la vista inicial de la sesión.
  domain: Sesión (eventos Android, eventos iOS, eventos Roku)
  name: session.initial_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: URL de la última vista de la sesión.
  domain: Sesión (eventos Android, eventos iOS, eventos Roku)
  name: session.last_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Nombre de la última vista de la sesión.
  domain: Sesión (eventos Android, eventos iOS, eventos Roku)
  name: session.last_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Dirección IP de la sesión extraída de la conexión TCP de la entrada.
    Si deseas dejar de recopilar este atributo, cambia la configuración en tus [detalles
    de la aplicación](/data_security/real_user_monitoring/#ip-address).
  domain: Sesión (eventos Android, eventos iOS, eventos Roku)
  name: session.ip
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Información del `User-Agent` del sistema para interpretar la información
    del dispositivo.
  domain: Sesión (eventos Android, eventos iOS, eventos Roku)
  name: session.useragent
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: ID único de la vista inicial correspondiente al evento.
  domain: Vista (eventos Android, eventos iOS, eventos Roku)
  name: view.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Nombre canónico de la clase correspondiente al evento. Para iOS, la
    URL de la clase `UIViewController` correspondiente al evento.
  domain: Vista (eventos Android, eventos iOS, eventos Roku)
  name: view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Nombre personalizable de la vista correspondiente al evento.
  domain: Vista (eventos Android, eventos iOS, eventos Roku)
  name: view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Identificador único del recurso.
  domain: Recurso (eventos Android, eventos iOS, eventos Roku)
  name: resource.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El tipo de recurso que se recopila (por ejemplo, `xhr`, `image`, `font`,
    `css` o `js`).
  domain: Recurso (eventos Android, eventos iOS, eventos Roku)
  name: resource.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El método HTTP (por ejemplo, `POST`, `GET`, `PATCH` o `DELETE`).
  domain: Recurso (eventos Android, eventos iOS, eventos Roku)
  name: resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El código de estado de la respuesta.
  domain: Recurso (eventos Android, eventos iOS, eventos Roku)
  name: resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: número
- description: La URL del recurso.
  domain: Recurso (eventos Android, eventos iOS, eventos Roku)
  name: resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El nombre del proveedor de recursos. De forma predeterminada es `unknown`.
  domain: Recurso (eventos Android, eventos iOS, eventos Roku)
  name: resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El dominio del proveedor del recurso.
  domain: Recurso (eventos Android, eventos iOS, eventos Roku)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El tipo de proveedor del recurso (por ejemplo, `first-party`, `cdn`,
    `ad` o `analytics`).
  domain: Recurso (eventos Android, eventos iOS, eventos Roku)
  name: resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: Procedencia del error (por ejemplo, `webview`, `logger` o `network`).
  domain: Error (eventos de navegador, eventos Android, eventos iOS, eventos Roku)
  name: error.source
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: El tipo de error (o código de error en algunos casos).
  domain: Error (eventos de navegador, eventos Android, eventos iOS, eventos Roku)
  name: error.type
  product_source:
  - icon-apm
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: Un mensaje conciso, legible, de una línea, que explique el evento.
  domain: Error (eventos de navegador, eventos Android, eventos iOS, eventos Roku)
  name: error.message
  product_source:
  - icon-apm
  - icon-log
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: La stack trace o información complementaria sobre el error.
  domain: Error (eventos de navegador, eventos Android, eventos iOS, eventos Roku)
  name: error.stack
  product_source:
  - icon-apm
  - icon-log
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: La stack trace o información complementaria sobre el error.
  domain: Error (eventos Android, eventos iOS, eventos Roku)
  name: error.issue_id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El código de estado de la respuesta.
  domain: Error de red (eventos Android, eventos iOS, eventos Roku)
  name: error.resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: número
- description: El método HTTP (por ejemplo, `POST` o `GET`).
  domain: Error de red (eventos Android, eventos iOS, eventos Roku)
  name: error.resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: La URL del recurso.
  domain: Error de red (eventos Android, eventos iOS, eventos Roku)
  name: error.resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El nombre del proveedor de recursos. De forma predeterminada es `unknown`.
  domain: Error de red (eventos Android, eventos iOS, eventos Roku)
  name: error.resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El dominio del proveedor del recurso.
  domain: Error de red (eventos Android, eventos iOS, eventos Roku)
  name: error.resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: El tipo de proveedor del recurso (por ejemplo, `first-party`, `cdn`,
    `ad` o `analytics`).
  domain: Error de red (eventos Android, eventos iOS, eventos Roku)
  name: error.resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: cadena
- description: UUID de la acción del usuario.
  domain: Acción (eventos de navegador, eventos Android, eventos iOS, eventos Roku)
  name: action.id
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: Tipo de la acción de usuario (por ejemplo, `tap` o `application_start`).
    Para [Acciones de usuario del navegador personalizadas](/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions),
    se establece en `custom`.
  domain: Acción (eventos de navegador, eventos Android, eventos iOS, eventos Roku)
  name: action.type
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: Un nombre descriptivo (por ejemplo, `Click on checkout`). Para [Acciones
    de usuario del navegador personalizadas](/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions),
    el nombre de acción dado en la llamada a la API.
  domain: Acción (eventos de navegador, eventos Android, eventos iOS, eventos Roku)
  name: action.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: Elemento con el que ha interactuado el usuario. Solo para acciones
    recopiladas automáticamente.
  domain: Acción (eventos de navegador, eventos Android, eventos iOS, eventos Roku)
  name: action.target.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: cadena
- description: ID generado aleatoriamente para cada vista de página.
  domain: Vista (navegador)
  name: view.id
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El tipo de carga de la página, `initial_load` o `route_change`. Para
    obtener más información, consulta los [documentos de soporte de aplicaciones de
    una sola página](/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa).
  domain: Vista (navegador)
  name: view.loading_type
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La URL de la página web anterior desde la que se siguió un enlace a
    la página solicitada actualmente.
  domain: Vista (navegador)
  name: view.referrer
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La URL de la vista.
  domain: Vista (navegador)
  name: view.url
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La parte de hash de la URL.
  domain: Vista (navegador)
  name: view.url_hash
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La parte de host de la URL.
  domain: Vista (navegador)
  name: view.url_host
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La parte de ruta de la URL.
  domain: Vista (navegador)
  name: view.url_path
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El grupo de URL automático generado para URLs similares (por ejemplo,
    `/dashboard/?` para `/dashboard/123` y `/dashboard/456`).
  domain: Vista (navegador)
  name: view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: Las partes de la cadena de consulta de la URL desglosadas como atributos
    clave/valor de parámetros de consulta.
  domain: Vista (navegador)
  name: view.url_query
  product_source:
  - icon-rum
  - browser
  type: objecto
- description: La parte de esquema de la URL.
  domain: Vista (navegador)
  name: view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: objecto
- description: El tipo de dispositivo según lo que indica el dispositivo (cabecera
    HTTP User-Agent).
  domain: Dispositivo (navegador)
  name: device.type
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La marca del dispositivo según lo que indica el dispositivo (cabecera
    HTTP User-Agent).
  domain: Dispositivo (navegador)
  name: device.brand
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El modelo del dispositivo según lo que indica el dispositivo (cabecera
    HTTP User-Agent).
  domain: Dispositivo (navegador)
  name: device.model
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El nombre del dispositivo según lo que indica el dispositivo (cabecera
    HTTP User-Agent).
  domain: Dispositivo (navegador)
  name: device.name
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El nombre del SO según lo que indica el dispositivo (cabecera HTTP
    User-Agent).
  domain: Sistema operativo (navegador)
  name: os.name
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La versión del SO según lo que indica el dispositivo (cabecera HTTP
    User-Agent).
  domain: Sistema operativo (navegador)
  name: os.version
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La versión principal del SO según lo que indica el dispositivo (cabecera
    HTTP User-Agent).
  domain: Sistema operativo (navegador)
  name: os.version_major
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: ID generado aleatoriamente para cada sesión.
  domain: Sesión (eventos del navegador)
  name: session.id
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: Dirección IP del cliente. Si deseas dejar de recopilar este atributo,
    cambia la configuración en tus [detalles de la aplicación](/data_security/real_user_monitoring/#ip-address).
  domain: Sesión (eventos del navegador)
  name: session.ip
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: Indica si la sesión se encuentra activa en estos momentos. La sesión
    termina después de 4 horas de actividad o 15 minutos de inactividad.
  domain: Sesión (eventos del navegador)
  name: session.is_active
  product_source:
  - icon-rum
  - browser
  type: booleano
- description: El tipo de sesión, `user` o `synthetics`. Las sesiones de [Synthetic
    Browser Tests](/synthetics/browser_tests/) se excluyen de la facturación.
  domain: Sesión (eventos del navegador)
  name: session.type
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La URL de la página web anterior desde la que se siguió un enlace a
    la página solicitada actualmente.
  domain: Sesión (eventos del navegador)
  name: session.referrer
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El ID de la primera vista de RUM generada por el usuario.
  domain: Sesión (eventos del navegador)
  name: session.initial_view.id
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La parte de host de la URL.
  domain: Sesión (eventos del navegador)
  name: session.initial_view.url_host
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La parte de ruta de la URL.
  domain: Sesión (eventos del navegador)
  name: session.initial_view.url_path
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El grupo de URL automático generado para URLs similares (por ejemplo,
    `/dashboard/?` para `/dashboard/123` y `/dashboard/456`).
  domain: Sesión (eventos del navegador)
  name: session.initial_view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: Las partes de la cadena de consulta de la URL desglosadas como atributos
    clave/valor de parámetros de consulta.
  domain: Sesión (eventos del navegador)
  name: session.initial_view.url_query
  product_source:
  - icon-rum
  - browser
  type: objecto
- description: La parte de esquema de la URL.
  domain: Sesión (eventos del navegador)
  name: session.initial_view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: objecto
- description: El ID de la última vista de RUM generada por el usuario.
  domain: Sesión (eventos del navegador)
  name: session.last_view.id
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La parte de host de la URL.
  domain: Sesión (eventos del navegador)
  name: session.last_view.url_host
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La parte de ruta de la URL.
  domain: Sesión (eventos del navegador)
  name: session.last_view.url_path
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El grupo de URL automático generado para URLs similares (por ejemplo,
    `/dashboard/?` para `/dashboard/123` y `/dashboard/456`).
  domain: Sesión (eventos del navegador)
  name: session.last_view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: Las partes de la cadena de consulta de la URL desglosadas como atributos
    clave/valor de parámetros de consulta.
  domain: Sesión (eventos del navegador)
  name: session.last_view.url_query
  product_source:
  - icon-rum
  - browser
  type: objecto
- description: La parte de esquema de la URL.
  domain: Sesión (eventos del navegador)
  name: session.last_view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: objecto
- description: El tipo de recurso que se recopila (por ejemplo, `css`, `javascript`,
    `media`, `XHR` o `image`).
  domain: Recurso (eventos del navegador)
  name: resource.type
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El método HTTP (por ejemplo, `POST` o `GET`).
  domain: Recurso (eventos del navegador)
  name: resource.method
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El código de estado de la respuesta.
  domain: Recurso (eventos del navegador)
  name: resource.status_code
  product_source:
  - icon-rum
  - browser
  type: número
- description: La URL del recurso.
  domain: Recurso (eventos del navegador)
  name: resource.url
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La parte de host de la URL.
  domain: Recurso (eventos del navegador)
  name: resource.url_host
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: La parte de ruta de la URL.
  domain: Recurso (eventos del navegador)
  name: resource.url_path
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: Las partes de la cadena de consulta de la URL desglosadas como atributos
    clave/valor de parámetros de consulta.
  domain: Recurso (eventos del navegador)
  name: resource.url_query
  product_source:
  - icon-rum
  - browser
  type: objecto
- description: El nombre de protocolo de la URL (HTTP o HTTPS).
  domain: Recurso (eventos del navegador)
  name: resource.url_scheme
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El nombre del proveedor de recursos. De forma predeterminada es `unknown`.
  domain: Recurso (eventos del navegador)
  name: resource.provider.name
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El dominio del proveedor del recurso.
  domain: Recurso (eventos del navegador)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El tipo de proveedor del recurso (por ejemplo, `first-party`, `cdn`,
    `ad` o `analytics`).
  domain: Recurso (eventos del navegador)
  name: resource.provider.type
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: Los clics sin efecto detectados por el SDK de RUM Browser.
  domain: Señales de frustración (eventos del navegador)
  name: action.frustration.type:dead_click
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: Los clics de frustración detectados por el SDK de RUM Browser.
  domain: Señales de frustración (eventos del navegador)
  name: action.frustration.type:rage_click
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: Los clics de error detectados por el SDK RUM Browser.
  domain: Señales de frustración (eventos del navegador)
  name: action.frustration.type:error_click
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El parámetro de la URL que rastrea la fuente de tráfico.
  domain: UTM (eventos del navegador)
  name: view.url_query.utm_source
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El parámetro de la URL que rastrea el canal del que procede el tráfico.
  domain: UTM (eventos del navegador)
  name: view.url_query.utm_medium
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El parámetro de la URL que identifica la campaña de marketing específica
    vinculada a esa vista.
  domain: UTM (eventos del navegador)
  name: view.url_query.utm_campaign
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El parámetro de la URL que identifica el elemento específico en el
    que un usuario ha hecho clic en una campaña de marketing.
  domain: UTM (eventos del navegador)
  name: view.url_query.utm_content
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: El parámetro de la URL que rastrea la palabra clave que un usuario
    buscó para activar una campaña determinada.
  domain: UTM (eventos del navegador)
  name: view.url_query.utm_term
  product_source:
  - icon-rum
  - browser
  type: cadena
- description: 'El idioma del SDK cliente utilizado para generar el tramo (span).
    Puede ser uno de los siguientes: `cpp`, `dotnet`, `go`, `jvm`, `javascript`, `php`,
    `python`, `ruby`.'
  domain: APM básico
  name: language
  product_source:
  - icon-apm
  type: cadena
- description: El valor de la variable de entorno `DD_ENV` o `env` definido por el
    usuario para el proceso en ejecución.
  domain: APM básico (Reservado)
  name: env
  product_source:
  - icon-apm
  type: cadena
- description: El valor de la variable de entorno `DD_VERSION` o `version` definido
    por el usuario para el proceso en ejecución.
  domain: APM básico (Reservado)
  name: version
  product_source:
  - icon-apm
  type: cadena
- description: La cadena que representa el tipo de unidad de trabajo manejada por
    el tramo. Puede ser servidor, cliente, productor, consumidor o interno. Para obtener
    más información, consulta la [documentación de OpenTelemetry SpanKind](https://opentelemetry.io/docs/specs/otel/trace/api/#spankind).
  domain: APM básico
  name: span.kind
  product_source:
  - icon-apm
  type: cadena
- description: El nombre de la librería o la integración que creó el tramo.
  domain: APM básico
  name: component
  product_source:
  - icon-apm
  type: cadena
- description: La dirección IP del cliente que inició la conexión entrante.
  domain: Comunicaciones de red
  name: network.client.ip
  product_source:
  - icon-apm
  - icon-log
  type: cadena
- description: La dirección IP donde se realiza la conexión saliente.
  domain: Comunicaciones de red
  name: network.destination.ip
  product_source:
  - icon-apm
  - icon-log
  type: cadena
- description: La dirección IP del host local.
  domain: Comunicaciones de red
  name: red.host.ip
  product_source:
  - icon-apm
  type: cadena
- description: El puerto del cliente que inició la conexión.
  domain: Comunicaciones de red
  name: network.client.port
  product_source:
  - icon-apm
  - icon-log
  type: número
- description: El número de puerto remoto de la conexión saliente.
  domain: Comunicaciones de red
  name: network.destination.port
  product_source:
  - icon-apm
  - icon-log
  type: número
- description: El nombre de host del cliente que inició la conexión entrante.
  domain: Comunicaciones de red
  name: network.client.name
  product_source:
  - icon-apm
  type: cadena
- description: El nombre de host local.
  domain: Comunicaciones de red
  name: network.host.name
  product_source:
  - icon-apm
  type: cadena
- description: El protocolo de transporte utilizado para realizar la conexión entrante.
  domain: Comunicaciones de red
  name: network.client.transport
  product_source:
  - icon-apm
  type: cadena
- description: El protocolo de transporte utilizado para realizar la conexión saliente.
  domain: Comunicaciones de red
  name: network.destination.transport
  product_source:
  - icon-apm
  type: cadena
- description: El código de estado de la respuesta HTTP.
  domain: Solicitudes HTTP
  name: http.status_code
  product_source:
  - icon-apm
  - icon-log
  type: cadena
- description: La URL de la solicitud HTTP, incluida la cadena de consulta enmascarada.
    Para obtener más información sobre el enmascaramiento, consulta [Configurar la
    seguridad de datos](https://docs.datadoghq.com/tracing/configure_data_security/).
  domain: Solicitudes HTTP
  name: http.url
  product_source:
  - icon-apm
  - icon-log
  type: cadena
- description: La versión de HTTP utilizada para la solicitud.
  domain: Solicitudes HTTP
  name: http.version
  product_source:
  - icon-apm
  - icon-log
  type: cadena
- description: El puerto del cliente que inició la conexión.
  domain: Solicitudes HTTP
  name: http.method
  product_source:
  - icon-apm
  - icon-log
  type: cadena
- description: La ruta coincidente (plantilla de ruta). Por ejemplo, `/users/:userID`.
  domain: Solicitudes HTTP
  name: http.route
  product_source:
  - icon-apm
  type: cadena
- description: La dirección IP del cliente original detrás de todos los servidores
    proxy, si se conoce. Se detecta a partir de encabezados como `X-Forwarded-For`.
  domain: Solicitudes HTTP
  name: http.client_ip
  product_source:
  - icon-apm
  type: cadena
- description: El encabezado `User-Agent` recibido con la solicitud.
  domain: Solicitudes HTTP
  name: http.useragent
  product_source:
  - icon-apm
  - icon-log
  type: cadena
- description: El tamaño del cuerpo de la carga útil de la solicitud en bytes.
  domain: Solicitudes HTTP
  name: http.request.content_length
  product_source:
  - icon-apm
  type: número
- description: El tamaño del cuerpo de la carga útil de la respuesta en bytes.
  domain: Solicitudes HTTP
  name: http.response.content_length
  product_source:
  - icon-apm
  type: número
- description: El tamaño del cuerpo de la carga útil de la solicitud sin comprimir
    tras la descodificación de transporte.
  domain: Solicitudes HTTP
  name: http.request.content_length_uncompressed
  product_source:
  - icon-apm
  type: número
- description: El tamaño del cuerpo de la carga útil de la respuesta sin comprimir
    tras la descodificación de transporte.
  domain: Solicitudes HTTP
  name: http.response.content_length_uncompressed
  product_source:
  - icon-apm
  type: número
- description: Los encabezados HTTP de la solicitud. No se recopila ninguno de forma
    predeterminada, pero se puede configurar opcionalmente con `DD_TRACE_HEADER_TAGS`.
  domain: Solicitudes HTTP
  name: http.request.headers.*
  product_source:
  - icon-apm
  type: cadena
- description: Identificador del producto de sistema de gestión de bases de datos
    (SGBD) utilizado.
  domain: Tramos de bases de datos
  name: db.system
  product_source:
  - icon-apm
  type: cadena
- description: Los encabezados HTTP de la respuesta. No se recopila ninguno de forma
    predeterminada, pero se puede configurar opcionalmente con `DD_TRACE_HEADER_TAGS`.
  domain: Peticiones de HTTP
  name: http.response.headers.*
  product_source:
  - icon-apm
  type: cadena
- description: La cadena de conexión utilizada para conectarse a la base de datos.
  domain: Tramos de bases de datos
  name: db.connection_string
  product_source:
  - icon-apm
  type: cadena
- description: El nombre de la operación que se está ejecutando. Por ejemplo, `SELECT`,
    `findAndModify`, `HMSET`.
  domain: Tramos de bases de datos
  name: db.operation
  product_source:
  - icon-apm
  - icon-log
  type: cadena
- description: El nombre de la tabla primaria sobre la que actúa la operación, incluido
    el nombre de la base de datos (si procede).
  domain: Tramos de bases de datos
  name: db.sql.table
  product_source:
  - icon-apm
  type: cadena
- description: El número de filas/resultados de la consulta u operación.
  domain: Tramos de bases de datos
  name: db.row_count
  product_source:
  - icon-apm
  type: número
- description: El identificador del sistema de mensajería.
  domain: Tramos de colas de mensajes
  name: messaging.system
  product_source:
  - icon-apm
  type: cadena
- description: El nombre del destino del mensaje.
  domain: Tramos de colas de mensajes
  name: messaging.destination
  product_source:
  - icon-apm
  type: cadena
- description: El tipo de destino del mensaje.
  domain: Tramos de colas de mensajes
  name: messaging.destination_kind
  product_source:
  - icon-apm
  type: cadena
- description: El nombre del protocolo de transporte.
  domain: Tramos de colas de mensajes
  name: messaging.protocol
  product_source:
  - icon-apm
  type: cadena
- description: La versión del protocolo de transporte.
  domain: Tramos de colas de mensajes
  name: messaging.protocol_version
  product_source:
  - icon-apm
  type: cadena
- description: La cadena de conexión al sistema de mensajería.
  domain: Tramos de colas de mensajes
  name: messaging.url
  product_source:
  - icon-apm
  type: cadena
- description: Valor utilizado por el sistema de mensajería como identificador del
    mensaje, representado como una cadena.
  domain: Tramos de colas de mensajes
  name: messaging.message_id
  product_source:
  - icon-apm
  type: cadena
- description: El ID de la conversación que identifica la conversación a la que pertenece
    el mensaje, representado como una cadena.
  domain: Tramos de colas de mensajes
  name: messaging.conversation_id
  product_source:
  - icon-apm
  type: cadena
- description: El tamaño de la carga útil del mensaje sin comprimir en bytes.
  domain: Tramos de colas de mensajes
  name: messaging.message_payload_size
  product_source:
  - icon-apm
  type: número
- description: 'Cadena que identifica el tipo de consumo del mensaje. Por ejemplo:
    `send` (un mensaje enviado a un productor), `receive` (un mensaje recibido por
    un consumidor), o `process` (un mensaje previamente recibido procesado por un
    consumidor).'
  domain: Tramos de colas de mensajes
  name: messaging.operation
  product_source:
  - icon-apm
  type: cadena
- description: El identificador del consumidor que recibe un mensaje.
  domain: Tramos de colas de mensajes
  name: messaging.consumer_id
  product_source:
  - icon-apm
  type: cadena
- description: El identificador del sistema remoto.
  domain: Llamadas a procedimientos remotos
  name: rpc.system
  product_source:
  - icon-apm
  type: cadena
- description: El nombre del servicio al que se llama.
  domain: Llamadas a procedimientos remotos
  name: rpc.service
  product_source:
  - icon-apm
  type: cadena
- description: El nombre del método al que se llama.
  domain: Llamadas a procedimientos remotos
  name: rpc.method
  product_source:
  - icon-apm
  type: cadena
content: En la siguiente tabla se enumeran los atributos que el Agent aplica automáticamente
  a los datos que envía a Datadog cada uno de los productos RUM, Logs y APM, según
  corresponda al dominio de datos. Opcionalmente, filtra la lista por producto o busca
  por palabra clave o texto de descripción para encontrar los atributos que te interesan.
disable_sidebar: true
filter_all: Todas
further_reading:
- link: /data_security/
  tag: Documentación
  text: Garantizar la seguridad de los datos enviados a Datadog
- link: /tracing/trace_collection/tracing_naming_convention/
  tag: Documentación
  text: Semántica de span tags
title: Atributos estándar por defecto
---



## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}
