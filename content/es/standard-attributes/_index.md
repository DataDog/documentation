---
attributes:
- description: El nombre del servidor de origen según se define en las métricas. Datadog
    recupera automáticamente las etiquetas de servidor correspondientes del servidor
    coincidente en Datadog y las aplica a tu telemetría. El Agente establece este
    valor automáticamente.
  domain: Reserved
  name: servidor
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: El tipo de dispositivo de origen.
  domain: Reserved
  name: dispositivo
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
  name: fuente
  product_source:
  - icon-log
  type: string
- description: Esto corresponde al nivel o severidad de los datos. Para los registros,
    se utiliza para definir [patrones de registro](/logs/explorer/patterns/) y tiene
    un diseño dedicado en la interfaz de usuario de Gestión de Registros.
  domain: Reserved
  name: estado
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: El [nombre de servicio unificado](/getting_started/tagging/unified_service_tagging/)
    para la aplicación o servicio que está generando los datos, utilizado para correlacionar
    sesiones de usuario. Se utiliza para cambiar de APM a otros productos, así que
    asegúrate de definir el mismo valor cuando utilices ambos productos. En el SDK
    del Navegador RUM, un servicio denota un conjunto de páginas construidas por un
    equipo que ofrece una funcionalidad específica en tu aplicación de navegador.
    Puedes asignar páginas web a un servicio con [seguimiento de vista manual](/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names).
  domain: Reserved
  name: servicio
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
    tus trazas con otros datos, incluidos los registros.
  domain: Reserved
  name: trace_id
  product_source:
  - icon-log
  - icon-apm
  type: number
- description: El cuerpo de una entrada de registro, resaltado y mostrado en Logs
    Live Tail, donde se indexa para búsqueda de texto completo.
  domain: Reserved
  name: mensaje
  product_source:
  - icon-log
  type: string
- description: Número total de bytes transmitidos desde el cliente al servidor cuando
    se emite el registro.
  domain: Network communications
  name: red.bytes_leídos
  product_source:
  - icon-log
  type: number
- description: Número total de bytes transmitidos desde el servidor al cliente cuando
    se emite el registro.
  domain: Network communications
  name: red.bytes_escritos
  product_source:
  - icon-log
  type: number
- description: Nombre del país.
  domain: Geolocation
  name: red.cliente.geoip.pais.nombre
  product_source:
  - icon-log
  type: string
- description: '[Código ISO](https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_ISO_3166-1)
    del país (por ejemplo, `US` para Estados Unidos, `FR` para Francia).'
  domain: Geolocation
  name: red.cliente.geoip.pais.codigo_iso
  product_source:
  - icon-log
  type: string
- description: Código ISO del continente (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).
  domain: Geolocation
  name: red.cliente.geoip.continente.codigo
  product_source:
  - icon-log
  type: string
- description: Nombre del continente (`Europa`, `Australia`, `América del Norte`,
    `África`, `Antártida`, `América del Sur`, `Oceanía`).
  domain: Geolocation
  name: red.cliente.geoip.continente.nombre
  product_source:
  - icon-log
  type: string
- description: Nombre del primer nivel de subdivisión del país (por ejemplo, `California`
    en Estados Unidos o el departamento `Sarthe` en Francia).
  domain: Geolocation
  name: red.cliente.geoip.subdivisión.nombre
  product_source:
  - icon-log
  type: string
- description: '[Código ISO](https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_ISO_3166-1)
    del primer nivel de subdivisión del país (por ejemplo, `CA` en Estados Unidos
    o el departamento `SA` en Francia).'
  domain: Geolocation
  name: red.cliente.geoip.subdivisión.codigo_iso
  product_source:
  - icon-log
  type: string
- description: El nombre de la ciudad (por ejemplo, `París`, `Nueva York`).
  domain: Geolocation
  name: red.cliente.geoip.ciudad.nombre
  product_source:
  - icon-log
  type: string
- description: Campo del encabezado HTTP que identifica la dirección de la página
    web que enlazó al recurso solicitado.
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
- description: La familia del sistema operativo reportada por el User-Agent.
  domain: User-Agent
  name: http.useragent_details.os.family
  product_source:
  - icon-log
  type: string
- description: La familia del navegador reportada por el User-Agent.
  domain: User-Agent
  name: http.useragent_details.browser.family
  product_source:
  - icon-log
  type: string
- description: La familia del dispositivo reportada por el User-Agent.
  domain: User-Agent
  name: http.useragent_details.device.family
  product_source:
  - icon-log
  type: string
- description: El nombre del registrador.
  domain: Source code
  name: registrador.nombre
  product_source:
  - icon-log
  type: string
- description: El nombre del hilo actual cuando se genera el registro.
  domain: Source code
  name: registrador.nombre_hilo
  product_source:
  - icon-log
  type: string
- description: El nombre del método de la clase.
  domain: Source code
  name: registrador.nombre_metodo
  product_source:
  - icon-log
  type: string
- description: La versión del registrador.
  domain: Source code
  name: registrador.version
  product_source:
  - icon-log
  type: string
- description: El tipo o clase de error (o código en algunos casos).
  domain: Source code
  name: error.tipo
  product_source:
  - icon-log
  type: string
- description: El nombre de la base de datos a la que se está conectando. Por ejemplo,
    en Java, si `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, el nombre de la
    instancia es `customers`.
  domain: Database
  name: db.instancia
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 'Una declaración de base de datos para el tipo de base de datos dado.
    Por ejemplo, para mySQL: `''SELECT * FROM wuser_table'';` y para Redis: `''SET
    mykey ''WuValue''''`.'
  domain: Database
  name: db.declaración
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: Usuario que realiza la operación.
  domain: Database
  name: db.usuario
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 'Una duración de cualquier tipo en **nanosegundos**: tiempo de respuesta
    HTTP, tiempo de consulta de base de datos, latencia, etc. [Remap](/logs/log_configuration/processors/#remapper)
    cualquier duración dentro de los registros a este atributo porque Datadog lo muestra
    y lo utiliza como una medida predeterminada para la búsqueda de trazas.'
  domain: Performance
  name: duración
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
- description: El nombre del servidor.
  domain: Syslog and log shippers
  name: syslog.hostname
  product_source:
  - icon-log
  type: string
- description: El nombre de la aplicación. Generalmente se remapea al atributo reservado
    `service`.
  domain: Syslog and log shippers
  name: syslog.appname
  product_source:
  - icon-log
  type: string
- description: La severidad del registro. Generalmente se remapea al atributo reservado
    `status`.
  domain: Syslog and log shippers
  name: syslog.severity
  product_source:
  - icon-log
  type: number
- description: La marca de tiempo del registro. Generalmente se remapea al atributo
    reservado `date`.
  domain: Syslog and log shippers
  name: syslog.timestamp
  product_source:
  - icon-log
  type: string
- description: El nombre del entorno del cual provienen los registros.
  domain: Syslog and log shippers
  name: syslog.env
  product_source:
  - icon-log
  type: string
- description: El identificador de consulta DNS.
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
    que especifica el tipo de consulta DNS.
  domain: DNS
  name: dns.question.type
  product_source:
  - icon-log
  type: string
- description: La clase buscada por la consulta DNS (como IP al usar internet).
  domain: DNS
  name: dns.question.class
  product_source:
  - icon-log
  type: string
- description: El tamaño de la consulta DNS en bytes.
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
- description: El código de respuesta DNS.
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
  name: fecha
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: integer
- description: El tipo de evento (por ejemplo, `vista` o `recurso`).
  domain: RUM core attributes
  name: tipo
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: El ID de la aplicación de Datadog generado al crear una aplicación
    RUM.
  domain: RUM core attributes
  name: application.id
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: El nombre de la aplicación de Datadog.
  domain: RUM core attributes
  name: application.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  type: string
- description: El tipo de dispositivo según lo informado por el dispositivo (User-Agent
    del sistema).
  domain: Device (Android, iOS, Roku)
  name: device.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La marca del dispositivo según lo informado por el dispositivo (User-Agent
    del sistema).
  domain: Device (Android, iOS, Roku)
  name: device.brand
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El modelo del dispositivo según lo informado por el dispositivo (User-Agent
    del sistema).
  domain: Device (Android, iOS, Roku)
  name: device.model
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El nombre del dispositivo según lo informado por el dispositivo (User-Agent
    del sistema).
  domain: Device (Android, iOS, Roku)
  name: device.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Estado de la conectividad de la red del dispositivo (`conectado`, `no
    conectado` o `quizás`).
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
- description: El nombre del sistema operativo según lo informado por el dispositivo
    (User-Agent del sistema).
  domain: Operating System (Android, iOS, Roku)
  name: os.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La versión del sistema operativo según lo informado por el dispositivo
    (User-Agent del sistema).
  domain: Operating System (Android, iOS, Roku)
  name: os.version
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La versión principal del sistema operativo según lo informado por el
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
    en Estados Unidos o el departamento `Sarthe` en Francia).
  domain: Geolocation
  name: geo.country_subdivision
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: código ISO del continente (`EU`, `AS`, `NA`, `AF`, `AN`, `SA` o `OC`).
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
  name: geo.continente
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
  name: geo.ciudad
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Identificador del usuario.
  domain: RUM user attributes (Android, Roku)
  name: usuario.id
  product_source:
  - icon-rum
  - android
  - roku
  type: string
- description: Identificador del usuario.
  domain: RUM user attributes (iOS, Browser)
  name: usr.id
  product_source:
  - icon-rum
  - ios
  - browser
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
  name: sesión.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Tipo de la sesión (`usuario`).
  domain: Session (Android events, iOS events, Roku events)
  name: sesión.tipo
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Indica si la sesión está actualmente activa. La sesión termina si un
    usuario navega fuera de la aplicación o cierra la ventana del navegador, y expira
    después de 4 horas de actividad o 15 minutos de inactividad.
  domain: Session (Android events, iOS events, Roku events)
  name: sesión.está_activa
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: boolean
- description: URL de la vista inicial de la sesión.
  domain: Session (Android events, iOS events, Roku events)
  name: sesión.vista_inicial.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Nombre de la vista inicial de la sesión.
  domain: Session (Android events, iOS events, Roku events)
  name: sesión.vista_inicial.nombre
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: URL de la última vista de la sesión.
  domain: Session (Android events, iOS events, Roku events)
  name: sesión.última_vista.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Nombre de la última vista de la sesión.
  domain: Session (Android events, iOS events, Roku events)
  name: sesión.última_vista.nombre
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Dirección IP de la sesión extraída de la conexión TCP de la entrada.
    Si desea dejar de recopilar este atributo, cambie la configuración en los [detalles
    de la aplicación](/data_security/real_user_monitoring/#ip-address).
  domain: Session (Android events, iOS events, Roku events)
  name: sesión.ip
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Información del sistema `User-Agent` para interpretar la información
    del dispositivo.
  domain: Session (Android events, iOS events, Roku events)
  name: sesión.useragent
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: ID único de la vista inicial correspondiente al evento.
  domain: View (Android events, iOS events, Roku events)
  name: vista.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Nombre canónico de la clase correspondiente al evento. Para iOS, la
    URL de la clase `UIViewController` correspondiente al evento.
  domain: View (Android events, iOS events, Roku events)
  name: vista.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Nombre personalizable de la vista correspondiente al evento.
  domain: View (Android events, iOS events, Roku events)
  name: vista.nombre
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Identificador único del recurso.
  domain: Resource (Android events, iOS events, Roku events)
  name: recurso.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El tipo de recurso que se está recopilando (por ejemplo, `xhr`, `imagen`,
    `fuente`, `css` o `js`).
  domain: Resource (Android events, iOS events, Roku events)
  name: recurso.tipo
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
- description: El tipo de proveedor del recurso (por ejemplo, `de primera parte`,
    `cdn`, `anuncio` o `analítica`).
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
  name: error.pila
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
  domain: Error (Android events, iOS events, Roku events)
  name: error.id_de_asunto
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El código de estado de la respuesta.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.recurso.codigo_de_estado
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: number
- description: El método HTTP (por ejemplo, `POST` o `GET`).
  domain: Network error (Android events, iOS events, Roku events)
  name: error.recurso.metodo
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La URL del recurso.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.recurso.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El nombre del proveedor del recurso. El valor predeterminado es `desconocido`.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.recurso.proveedor.nombre
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El dominio del proveedor del recurso.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.recurso.proveedor.dominio
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: El tipo de proveedor del recurso (por ejemplo, `de primera parte`,
    `cdn`, `anuncio` o `analítica`).
  domain: Network error (Android events, iOS events, Roku events)
  name: error.recurso.proveedor.tipo
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: UUID de la acción del usuario.
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: acción.id
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Tipo de la acción del usuario (por ejemplo, `tap` o `inicio_de_aplicación`).
    Para [Acciones de Usuario Personalizadas del Navegador](/real_user_monitoring/application_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions),
    se establece en `personalizado`.
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: acción.tipo
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Un nombre amigable para el usuario (por ejemplo, `Clic en finalizar
    compra`). Para [Acciones de Usuario Personalizadas del Navegador](/real_user_monitoring/application_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions),
    el nombre de la acción dado en la llamada a la API.
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: acción.nombre
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Elemento con el que el usuario interactuó. Solo para acciones recolectadas
    automáticamente.
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: accion.destino.nombre
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: ID generado aleatoriamente para cada vista de página.
  domain: View (Browser)
  name: vista.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: El tipo de carga de página, `carga_inicial` o `cambio_de_ruta`. Para
    más información, consulte la [documentación de soporte de aplicaciones de una
    sola página](/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa).
  domain: View (Browser)
  name: vista.tipo_de_carga
  product_source:
  - icon-rum
  - browser
  type: string
- description: La URL de la página web anterior desde la cual se siguió un enlace
    a la página actualmente solicitada.
  domain: View (Browser)
  name: vista.referente
  product_source:
  - icon-rum
  - browser
  type: string
- description: La URL de la vista.
  domain: View (Browser)
  name: vista.url
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte hash de la URL.
  domain: View (Browser)
  name: vista.hash_url
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte host de la URL.
  domain: View (Browser)
  name: vista.host_url
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte de la ruta de la URL.
  domain: View (Browser)
  name: vista.ruta_url
  product_source:
  - icon-rum
  - browser
  type: string
- description: El grupo de URL automático generado para URLs similares (por ejemplo,
    `/dashboard/?` para `/dashboard/123` y `/dashboard/456`).
  domain: View (Browser)
  name: vista.grupo_ruta_url
  product_source:
  - icon-rum
  - browser
  type: string
- description: Las partes de la cadena de consulta de la URL descompuestas como atributos
    clave/valor de parámetros de consulta.
  domain: View (Browser)
  name: vista.consulta_url
  product_source:
  - icon-rum
  - browser
  type: object
- description: La parte del esquema de la URL.
  domain: View (Browser)
  name: vista.esquema_url
  product_source:
  - icon-rum
  - browser
  type: object
- description: El tipo de dispositivo según lo informado por el dispositivo (encabezado
    HTTP User-Agent).
  domain: Device (Browser)
  name: device.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: La marca del dispositivo según lo informado por el dispositivo (encabezado
    HTTP User-Agent).
  domain: Device (Browser)
  name: device.brand
  product_source:
  - icon-rum
  - browser
  type: string
- description: El modelo del dispositivo según lo informado por el dispositivo (encabezado
    HTTP User-Agent).
  domain: Device (Browser)
  name: device.model
  product_source:
  - icon-rum
  - browser
  type: string
- description: El nombre del dispositivo según lo informado por el dispositivo (encabezado
    HTTP User-Agent).
  domain: Device (Browser)
  name: nombre_del_dispositivo
  product_source:
  - icon-rum
  - browser
  type: string
- description: El nombre del sistema operativo según lo informado por el dispositivo
    (encabezado HTTP User-Agent).
  domain: Operating system (Browser)
  name: nombre_del_sistema_operativo
  product_source:
  - icon-rum
  - browser
  type: string
- description: La versión del sistema operativo según lo informado por el dispositivo
    (encabezado HTTP User-Agent).
  domain: Operating system (Browser)
  name: versión_del_sistema_operativo
  product_source:
  - icon-rum
  - browser
  type: string
- description: La versión principal del sistema operativo según lo informado por el
    dispositivo (encabezado HTTP User-Agent).
  domain: Operating system (Browser)
  name: versión_principal.del.sistema.operativo
  product_source:
  - icon-rum
  - browser
  type: string
- description: ID generado aleatoriamente para cada sesión.
  domain: Session (Browser events)
  name: sesión.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: Dirección IP del cliente. Si desea dejar de recopilar este atributo,
    cambie la configuración en los [detalles de la aplicación](/data_security/real_user_monitoring/#ip-address).
  domain: Session (Browser events)
  name: sesión.ip
  product_source:
  - icon-rum
  - browser
  type: string
- description: Indica si la sesión está actualmente activa. La sesión termina después
    de 4 horas de actividad o 15 minutos de inactividad.
  domain: Session (Browser events)
  name: sesión.está_activa
  product_source:
  - icon-rum
  - browser
  type: boolean
- description: El tipo de sesión, `usuario` o `sintéticos`. Las sesiones de [Pruebas
    de Navegador Sintético](/synthetics/browser_tests/) están excluidas de la facturación.
  domain: Session (Browser events)
  name: sesión.tipo
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
- description: La parte host de la URL.
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
- description: La parte host de la URL.
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
- description: El tipo de recurso que se está recopilando (por ejemplo, `css`, `javascript`,
    `media`, `XHR` o `imagen`).
  domain: Resource (Browser events)
  name: recurso.tipo
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
- description: La parte host de la URL.
  domain: Resource (Browser events)
  name: recurso.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: La parte de la ruta de la URL.
  domain: Resource (Browser events)
  name: recurso.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: Las partes de la cadena de consulta de la URL descompuestas como atributos
    clave/valor de parámetros de consulta.
  domain: Resource (Browser events)
  name: recurso.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: El nombre del protocolo de la URL (HTTP o HTTPS).
  domain: Resource (Browser events)
  name: recurso.url_scheme
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
- description: El tipo de proveedor del recurso (por ejemplo, `de primera parte`,
    `cdn`, `anuncio` o `analítica`).
  domain: Resource (Browser events)
  name: resource.provider.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: Los clics muertos detectados por el SDK del navegador RUM.
  domain: Frustration signals (Browser events)
  name: acción.frustración.tipo:clic_muerto
  product_source:
  - icon-rum
  - browser
  type: string
- description: Los clics de rabia detectados por el SDK del navegador RUM.
  domain: Frustration signals (Browser events)
  name: acción.frustración.tipo:clic_de_rabia
  product_source:
  - icon-rum
  - browser
  type: string
- description: Los clics de error detectados por el SDK del navegador RUM.
  domain: Frustration signals (Browser events)
  name: acción.frustración.tipo:clic_de_error
  product_source:
  - icon-rum
  - browser
  type: string
- description: El parámetro en la URL que rastrea la fuente de tráfico.
  domain: UTM (Browser events)
  name: visualización.url_query.utm_source
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
    vinculada a esa visualización.
  domain: UTM (Browser events)
  name: view.url_query.utm_campaign
  product_source:
  - icon-rum
  - browser
  type: string
- description: El parámetro en la URL que identifica el elemento específico en el
    que un usuario hizo clic dentro de una campaña de marketing.
  domain: UTM (Browser events)
  name: view.url_query.utm_content
  product_source:
  - icon-rum
  - browser
  type: string
- description: El parámetro en la URL que rastrea la palabra clave que un usuario
    buscó para activar una campaña determinada.
  domain: UTM (Browser events)
  name: view.url_query.utm_term
  product_source:
  - icon-rum
  - browser
  type: string
- description: El lenguaje del SDK del cliente utilizado para generar el tramo. Puede
    ser uno de `cpp`, `dotnet`, `go`, `jvm`, `javascript`, `php`, `python`, `ruby`.
  domain: APM core
  name: lenguaje
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
  name: componente
  product_source:
  - icon-apm
  type: string
- description: La dirección IP del cliente que inició la conexión entrante.
  domain: Network communications
  name: red.cliente.ip
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La dirección IP a la que se está realizando la conexión saliente.
  domain: Network communications
  name: red.destino.ip
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La dirección IP del host local.
  domain: Network communications
  name: red.host.ip
  product_source:
  - icon-apm
  type: string
- description: El puerto del cliente que inició la conexión.
  domain: Network communications
  name: red.cliente.puerto
  product_source:
  - icon-apm
  - icon-log
  type: number
- description: El número de puerto remoto de la conexión saliente.
  domain: Network communications
  name: red.destino.puerto
  product_source:
  - icon-apm
  - icon-log
  type: number
- description: El nombre del host del cliente que inició la conexión entrante.
  domain: Network communications
  name: red.cliente.nombre
  product_source:
  - icon-apm
  type: string
- description: El nombre del host local.
  domain: Network communications
  name: red.host.nombre
  product_source:
  - icon-apm
  type: string
- description: El protocolo de transporte utilizado para realizar la conexión entrante.
  domain: Network communications
  name: red.cliente.transporte
  product_source:
  - icon-apm
  type: string
- description: El protocolo de transporte utilizado para realizar la conexión saliente.
  domain: Network communications
  name: red.destino.transporte
  product_source:
  - icon-apm
  type: string
- description: El código de estado de la respuesta HTTP.
  domain: HTTP requests
  name: código de estado http
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La URL de la solicitud HTTP, incluyendo la cadena de consulta ofuscada.
    Para más información sobre la ofuscación, consulte [Configurar la Seguridad de
    Datos](https://docs.datadoghq.com/tracing/configure_data_security/).
  domain: HTTP requests
  name: url.http
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La versión de HTTP utilizada para la solicitud.
  domain: HTTP requests
  name: versión.http
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: El puerto del cliente que inició la conexión.
  domain: HTTP requests
  name: método.http
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La ruta coincidente (plantilla de ruta). Por ejemplo, `/users/:userID`.
  domain: HTTP requests
  name: ruta.http
  product_source:
  - icon-apm
  type: string
- description: La dirección IP del cliente original detrás de todos los proxies, si
    se conoce. Descubierto a partir de encabezados como `X-Forwarded-For`.
  domain: HTTP requests
  name: ip_cliente.http
  product_source:
  - icon-apm
  type: string
- description: El encabezado `User-Agent` recibido con la solicitud.
  domain: HTTP requests
  name: useragent.http
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: El tamaño del cuerpo de la carga útil de la solicitud en bytes.
  domain: HTTP requests
  name: longitud_contenido.solicitud.http
  product_source:
  - icon-apm
  type: number
- description: El tamaño del cuerpo de la carga útil de la respuesta en bytes.
  domain: HTTP requests
  name: longitud_contenido.respuesta.http
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
- description: El tamaño del cuerpo de la carga útil de respuesta descomprimida después
    de la decodificación del transporte.
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
- description: Identificador del sistema de gestión de bases de datos (DBMS) que se
    está utilizando.
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
    el nombre de la base de datos (si corresponde).
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
  name: sistema.mensajería
  product_source:
  - icon-apm
  type: string
- description: El nombre del destino del mensaje.
  domain: Message queue spans
  name: destino.mensajería
  product_source:
  - icon-apm
  type: string
- description: El tipo de destino del mensaje.
  domain: Message queue spans
  name: tipo_destino.mensajería
  product_source:
  - icon-apm
  type: string
- description: El nombre del protocolo de transporte.
  domain: Message queue spans
  name: protocolo.mensajería
  product_source:
  - icon-apm
  type: string
- description: La versión del protocolo de transporte.
  domain: Message queue spans
  name: versión_protocolo.mensajería
  product_source:
  - icon-apm
  type: string
- description: La cadena de conexión al sistema de mensajería.
  domain: Message queue spans
  name: url.mensajería
  product_source:
  - icon-apm
  type: string
- description: Un valor utilizado por el sistema de mensajería como un identificador
    para el mensaje, representado como una cadena.
  domain: Message queue spans
  name: id_mensaje.mensajería
  product_source:
  - icon-apm
  type: string
- description: El ID de la conversación que identifica la conversación a la que pertenece
    el mensaje, representado como una cadena.
  domain: Message queue spans
  name: id_conversación.mensajería
  product_source:
  - icon-apm
  type: string
- description: El tamaño de la carga útil del mensaje sin comprimir en bytes.
  domain: Message queue spans
  name: tamaño_carga_mensaje.mensajería
  product_source:
  - icon-apm
  type: number
- description: Una cadena que identifica el tipo de consumo del mensaje. Por ejemplo,
    `enviar` (un mensaje enviado a un productor), `recibir` (un mensaje recibido por
    un consumidor) o `procesar` (un mensaje previamente recibido que es procesado
    por un consumidor).
  domain: Message queue spans
  name: operación.mensajería
  product_source:
  - icon-apm
  type: string
- description: El identificador del consumidor que recibe un mensaje.
  domain: Message queue spans
  name: mensajería.consumer_id
  product_source:
  - icon-apm
  type: string
- description: El identificador del sistema remoto.
  domain: Remote procedure calls
  name: rpc.sistema
  product_source:
  - icon-apm
  type: string
- description: El nombre del servicio que se está llamando.
  domain: Remote procedure calls
  name: rpc.servicio
  product_source:
  - icon-apm
  type: string
- description: El nombre del método que se está llamando.
  domain: Remote procedure calls
  name: rpc.método
  product_source:
  - icon-apm
  type: string
content: The following table lists the attributes automatically applied to data sent
  to Datadog by the Agent by each of the RUM, Logs, and APM products, as applicable
  to the data domain. Optionally, filter the list by product or search by keyword
  or description text to find the attributes you're interested in.
description: Una tabla de los atributos que se aplican automáticamente a los datos
  enviados a Datadog por el Agent de cada uno de los productos RUM, Logs y APM, según
  corresponda al dominio de datos.
disable_sidebar: true
filter_all: All
further_reading:
- link: /data_security/
  tag: Documentation
  text: Asegurando la seguridad de los datos enviados a Datadog
- link: /tracing/trace_collection/tracing_naming_convention/
  tag: Documentation
  text: Semántica de la etiqueta de tramo
title: Atributos estándar predeterminados
---
## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}