---
attributes:
- description: Le nom de l'hôte d'origine tel que défini dans les métriques. Datadog
    récupère automatiquement les balises d'hôte correspondantes de l'hôte correspondant
    dans Datadog et les applique à votre télémétrie. L'Agent définit cette valeur
    automatiquement.
  domain: Reserved
  name: host
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: Le type de dispositif d'origine.
  domain: Reserved
  name: device
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: Cela correspond au nom de l'intégration, à la technologie dont les
    données sont issues. Lorsqu'il correspond à un nom d'intégration, Datadog installe
    automatiquement les parseurs et facettes correspondants. Par exemple, `nginx`,
    `postgresql`, etc.
  domain: Reserved
  name: source
  product_source:
  - icon-log
  type: string
- description: Cela correspond au niveau ou à la gravité des données. Pour les journaux,
    il est utilisé pour définir [les modèles de journaux](/logs/explorer/patterns/)
    et a une mise en page dédiée dans l'interface de gestion des journaux.
  domain: Reserved
  name: status
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: Le [nom de service unifié](/getting_started/tagging/unified_service_tagging/)
    pour l'application ou le service qui génère les données, utilisé pour corréler
    les sessions utilisateur. Il est utilisé pour passer de l'APM à d'autres produits,
    donc assurez-vous de définir la même valeur lorsque vous utilisez les deux produits.
    Dans le SDK RUM Browser, un service désigne un ensemble de pages construites par
    une équipe qui offre une fonctionnalité spécifique dans votre application de navigateur.
    Vous pouvez assigner des pages web à un service avec [le suivi de vue manuel](/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names).
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
- description: L'ID de trace utilisé pour les traces. Il est utilisé pour corréler
    vos traces avec d'autres données, y compris les journaux.
  domain: Reserved
  name: trace_id
  product_source:
  - icon-log
  - icon-apm
  type: number
- description: Le corps d'une entrée de journal, mis en évidence et affiché dans Logs
    Live Tail, où il est indexé pour une recherche en texte intégral.
  domain: Reserved
  name: message
  product_source:
  - icon-log
  type: string
- description: Le nombre total d'octets transmis depuis le client vers le serveur
    lorsque le log est envoyé.
  domain: Network communications
  name: network.bytes_read
  product_source:
  - icon-log
  type: number
- description: Le nombre total d'octets transmis depuis le serveur vers le client
    lorsque le log est envoyé.
  domain: Network communications
  name: network.bytes_written
  product_source:
  - icon-log
  type: number
- description: Le nom du pays.
  domain: Geolocation
  name: network.client.geoip.country.name
  product_source:
  - icon-log
  type: string
- description: Le [code ISO](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
    du pays (par exemple, `US` pour les États-Unis, `FR` pour la France).
  domain: Geolocation
  name: network.client.geoip.country.iso_code
  product_source:
  - icon-log
  type: string
- description: Code ISO du continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).
  domain: Geolocation
  name: network.client.geoip.continent.code
  product_source:
  - icon-log
  type: string
- description: Nom du continent (`Europe`, `Australia`, `North America`, `Africa`,
    `Antartica`, `South America`, `Oceania`).
  domain: Geolocation
  name: network.client.geoip.continent.name
  product_source:
  - icon-log
  type: string
- description: 'Nom du premier niveau de division du pays (par exemple : `California`
    aux États-Unis ou le département de la `Sarthe` en France).'
  domain: Geolocation
  name: network.client.geoip.subdivision.name
  product_source:
  - icon-log
  type: string
- description: Le [code ISO](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
    du premier niveau de division du pays (par exemple, `CA` aux États-Unis ou le
    département `SA` en France).
  domain: Geolocation
  name: network.client.geoip.subdivision.iso_code
  product_source:
  - icon-log
  type: string
- description: Le nom de la ville (par exemple, `Paris` ou `New York`).
  domain: Geolocation
  name: network.client.geoip.city.name
  product_source:
  - icon-log
  type: string
- description: Le champ d'un en-tête HTTP qui identifie l'adresse de la page Web liée
    à la ressource demandée.
  domain: HTTP
  name: http.referer
  product_source:
  - icon-log
  type: string
- description: L'ID de la requête HTTP.
  domain: HTTP
  name: http.request_id
  product_source:
  - icon-log
  type: string
- description: La partie du host HTTP de l'URL.
  domain: HTTP, URL Details
  name: http.url_details.host
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: La partie du port HTTP de l'URL.
  domain: HTTP, URL Details
  name: http.url_details.port
  product_source:
  - icon-log
  - icon-apm
  type: number
- description: La partie du chemin HTTP de l'URL.
  domain: HTTP, URL Details
  name: http.url_details.path
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: Les parties de chaîne de requête HTTP de l'URL décomposées en attributs
    key/value des paramètres de requête.
  domain: HTTP, URL Details
  name: http.url_details.queryString
  product_source:
  - icon-log
  - icon-apm
  type: object
- description: Le nom du protocole de l'URL (HTTP ou HTTPS).
  domain: HTTP, URL Details
  name: http.url_details.scheme
  product_source:
  - icon-log
  - icon-apm
  type: string
- description: La famille du système d'exploitation indiquée par le user-agent.
  domain: User-Agent
  name: http.useragent_details.os.family
  product_source:
  - icon-log
  type: string
- description: La famille de navigateurs indiquée par le user-agent.
  domain: User-Agent
  name: http.useragent_details.browser.family
  product_source:
  - icon-log
  type: string
- description: La famille d'appareils indiquée par le user-agent.
  domain: User-Agent
  name: http.useragent_details.device.family
  product_source:
  - icon-log
  type: string
- description: Le nom de l'enregistreur.
  domain: Source code
  name: logger.name
  product_source:
  - icon-log
  type: string
- description: Le nom du thread actuel lorsque le log est déclenché.
  domain: Source code
  name: logger.thread_name
  product_source:
  - icon-log
  type: string
- description: Le nom de la méthode de la classe.
  domain: Source code
  name: logger.method_name
  product_source:
  - icon-log
  type: string
- description: La version du logger.
  domain: Source code
  name: logger.version
  product_source:
  - icon-log
  type: string
- description: Le type ou la catégorie d'erreur (ou le code dans certains cas).
  domain: Source code
  name: error.kind
  product_source:
  - icon-log
  type: string
- description: Le nom de la base de données à laquelle la connexion est établie. Par
    exemple, en Java, si `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, le nom
    de l'instance est `customers`.
  domain: Database
  name: db.instance
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 'Une instruction de base de données pour le type de base de données
    donné. Par exemple, pour mySQL : `''SELECT * FROM wuser_table'';` et pour Redis
    : `''SET mykey ''WuValue''''`.'
  domain: Database
  name: db.statement
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: L'utilisateur à l'origine de l'opération.
  domain: Database
  name: db.user
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: 'Une durée de tout type en **nanosecondes** : temps de réponse HTTP,
    temps de requête de base de données, latence, etc. [Remap](/logs/log_configuration/processors/#remapper)
    toutes les durées dans les journaux à cet attribut car Datadog l''affiche et l''utilise
    comme mesure par défaut pour la recherche de traces.'
  domain: Performance
  name: duration
  product_source:
  - icon-log
  type: number
- description: L'identificateur de l'utilisateur.
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
- description: Le nom courant de l'utilisateur.
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
- description: L'adresse e-mail de l'utilisateur.
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
- description: Le hostname.
  domain: Syslog and log shippers
  name: syslog.hostname
  product_source:
  - icon-log
  type: string
- description: Le nom de l'application. Généralement remappé à l'attribut réservé
    `service`.
  domain: Syslog and log shippers
  name: syslog.appname
  product_source:
  - icon-log
  type: string
- description: La gravité du journal. Généralement remappé à l'attribut réservé `status`.
  domain: Syslog and log shippers
  name: syslog.severity
  product_source:
  - icon-log
  type: number
- description: L'horodatage du journal. Généralement remappé à l'attribut réservé
    `date`.
  domain: Syslog and log shippers
  name: syslog.timestamp
  product_source:
  - icon-log
  type: string
- description: Le nom de l'environnement d'où provient la source des logs.
  domain: Syslog and log shippers
  name: syslog.env
  product_source:
  - icon-log
  type: string
- description: L'identificateur de la requête DNS.
  domain: DNS
  name: dns.id
  product_source:
  - icon-log
  type: string
- description: Le nom de domaine interrogé.
  domain: DNS
  name: dns.question.name
  product_source:
  - icon-log
  type: string
- description: Un [code de deux octets](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
    spécifiant le type de question DNS.
  domain: DNS
  name: dns.question.type
  product_source:
  - icon-log
  type: string
- description: La classe recherchée par la question DNS (par exemple, IP lorsque vous
    utilisez Internet).
  domain: DNS
  name: dns.question.class
  product_source:
  - icon-log
  type: string
- description: La taille de la requête DNS en octets.
  domain: DNS
  name: dns.question.size
  product_source:
  - icon-log
  type: number
- description: L'adresse IP avec laquelle le DNS répond.
  domain: DNS
  name: dns.answer.name
  product_source:
  - icon-log
  type: string
- description: Un [code de deux octets](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
    spécifiant le type de réponse DNS.
  domain: DNS
  name: dns.answer.type
  product_source:
  - icon-log
  type: string
- description: La classe correspondant à la réponse du DNS.
  domain: DNS
  name: dns.answer.class
  product_source:
  - icon-log
  type: string
- description: La taille de la réponse du DNS en octets.
  domain: DNS
  name: dns.answer.size
  product_source:
  - icon-log
  type: number
- description: Le code de réponse du DNS.
  domain: DNS
  name: dns.flags.rcode
  product_source:
  - icon-log
  type: string
- description: Le nom partagé entre les événements générés par une même activité (par
    exemple, authentification).
  domain: Events
  name: evt.name
  product_source:
  - icon-log
  type: string
- description: Le résultat de l'événement (par exemple, `success`, `failure`).
  domain: Events
  name: evt.outcome
  product_source:
  - icon-log
  type: string
- description: Le début de l'événement en millisecondes (format epoch).
  domain: RUM core attributes
  name: date
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: integer
- description: Le type de l'événement (par exemple, `view` ou `resource`).
  domain: RUM core attributes
  name: type
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: L'ID d'application Datadog généré lorsque vous créez une application
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
- description: Le nom de l'application Datadog.
  domain: RUM core attributes
  name: application.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  type: string
- description: Le type d'appareil indiqué par l'appareil (User-Agent système)
  domain: Device (Android, iOS, Roku)
  name: device.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La marque d'appareil indiquée par l'appareil (User-Agent système)
  domain: Device (Android, iOS, Roku)
  name: device.brand
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le modèle d'appareil indiqué par l'appareil (User-Agent système)
  domain: Device (Android, iOS, Roku)
  name: device.model
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le nom d'appareil indiqué par l'appareil (User-Agent système)
  domain: Device (Android, iOS, Roku)
  name: device.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le statut de l'accessibilité au réseau de l'appareil (`connected`,
    `not connected` ou `maybe`).
  domain: Connectivity (Android, iOS)
  name: connectivity.status
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: La liste des interfaces réseau disponibles (par exemple, `bluetooth`,
    `cellular`, `ethernet` ou `wifi`).
  domain: Connectivity (Android, iOS)
  name: connectivity.interfaces
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: Le type de technologie radio utilisée pour la connexion cellulaire.
  domain: Connectivity (Android, iOS)
  name: connectivity.cellular.technology
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: Le nom de l'opérateur de la carte SIM.
  domain: Connectivity (Android, iOS)
  name: connectivity.cellular.carrier_name
  product_source:
  - icon-rum
  - android
  - ios
  type: string
- description: Le nom du système d'exploitation indiqué par l'appareil (User-Agent
    système).
  domain: Operating System (Android, iOS, Roku)
  name: os.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La version du système d'exploitation indiquée par l'appareil (User-Agent
    système).
  domain: Operating System (Android, iOS, Roku)
  name: os.version
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La version majeure du système d'exploitation indiquée par l'appareil
    (User-Agent système).
  domain: Operating System (Android, iOS, Roku)
  name: os.version_major
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le nom du pays.
  domain: Geolocation
  name: geo.country
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Le [code ISO](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
    du pays (par exemple, `US` pour les États-Unis ou `FR` pour la France).
  domain: Geolocation
  name: geo.country_iso_code
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: 'Nom du premier niveau de division du pays (par exemple : `California`
    aux États-Unis ou le département de la `Sarthe` en France).'
  domain: Geolocation
  name: geo.country_subdivision
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Le code ISO du continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA` ou `OC`).
  domain: Geolocation
  name: geo.continent_code
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Le nom du continent (`Europe`, `Australia`, `North America`, `Africa`,
    `Antarctica`, `South America` ou `Oceania`).
  domain: Geolocation
  name: geo.continent
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Le nom de la ville (par exemple, `San Francisco`, `Paris` ou `New York`).
  domain: Geolocation
  name: geo.city
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: L'identificateur de l'utilisateur.
  domain: RUM user attributes (Android, Roku)
  name: user.id
  product_source:
  - icon-rum
  - android
  - roku
  type: string
- description: L'identificateur de l'utilisateur.
  domain: RUM user attributes (iOS, Browser)
  name: usr.id
  product_source:
  - icon-rum
  - ios
  - browser
  type: string
- description: Le nom de l'utilisateur.
  domain: Global user attributes (Android, iOS, Browser, Roku)
  name: usr.name
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: L'adresse e-mail de l'utilisateur.
  domain: Global user attributes (Android, iOS, Browser, Roku)
  name: usr.email
  product_source:
  - icon-rum
  - android
  - ios
  - browser
  - roku
  type: string
- description: Identifiant unique de la session.
  domain: Session (Android events, iOS events, Roku events)
  name: session.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le type de la session (`user`).
  domain: Session (Android events, iOS events, Roku events)
  name: session.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le statut d'activité de la session. La session se termine si un utilisateur
    navigue en dehors de l'application ou ferme la fenêtre du navigateur, et expire
    après 4 heures d'activité ou 15 minutes d'inactivité.
  domain: Session (Android events, iOS events, Roku events)
  name: session.is_active
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: boolean
- description: L'URL de la vue initiale de la session.
  domain: Session (Android events, iOS events, Roku events)
  name: session.initial_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le nom de la vue initiale de la session.
  domain: Session (Android events, iOS events, Roku events)
  name: session.initial_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: L'URL de la dernière vue de la session.
  domain: Session (Android events, iOS events, Roku events)
  name: session.last_view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le nom de la dernière vue de la session.
  domain: Session (Android events, iOS events, Roku events)
  name: session.last_view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: L'adresse IP de la session extraite à partir de la connexion TCP de
    l'admission. Si vous souhaitez arrêter de collecter cet attribut, modifiez le
    paramètre dans vos [détails de l'application](/data_security/real_user_monitoring/#ip-address).
  domain: Session (Android events, iOS events, Roku events)
  name: session.ip
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Les informations `User-Agent` système interprétant les informations
    de l'appareil.
  domain: Session (Android events, iOS events, Roku events)
  name: session.useragent
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: L'ID unique de la vue initiale correspondant à l'événement.
  domain: View (Android events, iOS events, Roku events)
  name: view.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Nom canonique de la classe correspondant à l'événement. Pour iOS, l'URL
    de la classe `UIViewController` correspondant à l'événement.
  domain: View (Android events, iOS events, Roku events)
  name: view.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Nom personnalisable de la vue correspond à l'événement.
  domain: View (Android events, iOS events, Roku events)
  name: view.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Identifiant unique de la ressource.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le type de ressource à recueillir (par exemple, `xhr`, `image`, `font`,
    `css` ou `js`).
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: La méthode HTTP (par exemple, `POST`, `GET` `PATCH` ou `DELETE`).
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le code de statut de la réponse.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: number
- description: L'URL de la ressource.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le nom du fournisseur de ressources. Par défaut, c'est `unknown`.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le domaine du fournisseur de ressource.
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le type de fournisseur de ressources (par exemple, `first-party`, `cdn`,
    `ad` ou `analytics`).
  domain: Resource (Android events, iOS events, Roku events)
  name: resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: L'origine de l'erreur (par exemple, `webview`, `logger` ou `network`).
  domain: Error (Browser events, Android events, iOS events, Roku events)
  name: error.source
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Le type d'erreur (ou le code dans certains cas).
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
- description: Un message d'une ligne lisible et concis décrivant l'événement.
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
- description: La trace de pile ou toutes informations complémentaires relatives à
    l'erreur.
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
- description: La trace de pile ou toutes informations complémentaires relatives à
    l'erreur.
  domain: Error (Android events, iOS events, Roku events)
  name: error.issue_id
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le code de statut de la réponse.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.status_code
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: number
- description: La méthode HTTP (par exemple, `POST` ou `GET`).
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.method
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: L'URL de la ressource.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.url
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le nom du fournisseur de ressources. Par défaut, c'est `unknown`.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.name
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le domaine du fournisseur de ressource.
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.domain
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: Le type de fournisseur de ressources (par exemple, `first-party`, `cdn`,
    `ad` ou `analytics`).
  domain: Network error (Android events, iOS events, Roku events)
  name: error.resource.provider.type
  product_source:
  - icon-rum
  - android
  - ios
  - roku
  type: string
- description: UUID de l'action utilisateur.
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.id
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Le type de l'action utilisateur (par exemple, `tap` ou `application_start`).
    Pour [Actions Utilisateur Personnalisées du Navigateur](/real_user_monitoring/application_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions),
    il est défini sur `custom`.
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.type
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Un nom convivial (par exemple, `Cliquer sur le paiement`). Pour [Actions
    Utilisateur Personnalisées du Navigateur](/real_user_monitoring/application_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions),
    le nom de l'action donné dans l'appel API.
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: Élément avec lequel l'utilisateur a interagi. Uniquement pour les actions
    collectées automatiquement.
  domain: Action (Browser events, Android events, iOS events, Roku events)
  name: action.target.name
  product_source:
  - icon-rum
  - android
  - browser
  - ios
  - roku
  type: string
- description: ID généré aléatoirement pour chaque vue de page.
  domain: View (Browser)
  name: view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le type de chargement de page, `initial_load` ou `route_change`. Pour
    plus d'informations, consultez la [documentation de support des applications à
    page unique](/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa).
  domain: View (Browser)
  name: view.loading_type
  product_source:
  - icon-rum
  - browser
  type: string
- description: L'URL de la page web précédente, à partir de laquelle un lien vers
    la page demandée à été sélectionné.
  domain: View (Browser)
  name: view.referrer
  product_source:
  - icon-rum
  - browser
  type: string
- description: L'URL de la vue.
  domain: View (Browser)
  name: view.url
  product_source:
  - icon-rum
  - browser
  type: string
- description: La partie de l'URL correspondant au hachage.
  domain: View (Browser)
  name: view.url_hash
  product_source:
  - icon-rum
  - browser
  type: string
- description: La partie de l'URL correspondant au host.
  domain: View (Browser)
  name: view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: La partie de l'URL correspondant au chemin.
  domain: View (Browser)
  name: view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le groupe d'URL généré automatiquement pour les URL connexes (par exemple,
    `/dashboard/?` pour `/dashboard/123` et `/dashboard/456`).
  domain: View (Browser)
  name: view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: Les parties de l'URL correspondant à la chaîne de requête, décomposées
    en attributs key/value de paramètres de requête.
  domain: View (Browser)
  name: view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: La partie de l'URL correspondant au format.
  domain: View (Browser)
  name: view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: Le type d'appareil indiqué par l'appareil (en-tête HTTP User-Agent).
  domain: Device (Browser)
  name: device.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: La marque de l'appareil indiquée par l'appareil (en-tête HTTP User-Agent).
  domain: Device (Browser)
  name: device.brand
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le modèle de l'appareil indiqué par l'appareil (en-tête HTTP User-Agent).
  domain: Device (Browser)
  name: device.model
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le nom de l'appareil indiqué par l'appareil (en-tête HTTP User-Agent).
  domain: Device (Browser)
  name: device.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le nom du système d'exploitation indiqué par l'appareil (en-tête HTTP
    User-Agent).
  domain: Operating system (Browser)
  name: os.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: La version du système d'exploitation indiquée par l'appareil (en-tête
    HTTP User-Agent).
  domain: Operating system (Browser)
  name: os.version
  product_source:
  - icon-rum
  - browser
  type: string
- description: La version majeure du système d'exploitation indiquée par l'appareil
    (en-tête HTTP User-Agent).
  domain: Operating system (Browser)
  name: os.version_major
  product_source:
  - icon-rum
  - browser
  type: string
- description: Un ID généré aléatoirement pour chaque session.
  domain: Session (Browser events)
  name: session.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: Adresse IP du client. Si vous souhaitez arrêter de collecter cet attribut,
    modifiez le paramètre dans vos [détails de l'application](/data_security/real_user_monitoring/#ip-address).
  domain: Session (Browser events)
  name: session.ip
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le statut d'activité de la session. La session se termine après 4 heures
    d'activité ou 15 minutes d'inactivité.
  domain: Session (Browser events)
  name: session.is_active
  product_source:
  - icon-rum
  - browser
  type: boolean
- description: Le type de session, `user` ou `synthetics`. Les sessions provenant
    des [Tests de Navigateur Synthétiques](/synthetics/browser_tests/) sont exclues
    de la facturation.
  domain: Session (Browser events)
  name: session.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: L'URL de la page web précédente, à partir de laquelle un lien vers
    la page demandée à été sélectionné.
  domain: Session (Browser events)
  name: session.referrer
  product_source:
  - icon-rum
  - browser
  type: string
- description: L'ID de la première vue RUM générée par l'utilisateur.
  domain: Session (Browser events)
  name: session.initial_view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: La partie de l'URL correspondant au host.
  domain: Session (Browser events)
  name: session.initial_view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: La partie de l'URL correspondant au chemin.
  domain: Session (Browser events)
  name: session.initial_view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le groupe d'URL généré automatiquement pour les URL connexes (par exemple,
    `/dashboard/?` pour `/dashboard/123` et `/dashboard/456`).
  domain: Session (Browser events)
  name: session.initial_view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: Les parties de l'URL correspondant à la chaîne de requête, décomposées
    en attributs key/value de paramètres de requête.
  domain: Session (Browser events)
  name: session.initial_view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: La partie de l'URL correspondant au format.
  domain: Session (Browser events)
  name: session.initial_view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: L'ID de la dernière vue RUM générée par l'utilisateur.
  domain: Session (Browser events)
  name: session.last_view.id
  product_source:
  - icon-rum
  - browser
  type: string
- description: La partie de l'URL correspondant au host.
  domain: Session (Browser events)
  name: session.last_view.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: La partie de l'URL correspondant au chemin.
  domain: Session (Browser events)
  name: session.last_view.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le groupe d'URL généré automatiquement pour les URL connexes (par exemple,
    `/dashboard/?` pour `/dashboard/123` et `/dashboard/456`).
  domain: Session (Browser events)
  name: session.last_view.url_path_group
  product_source:
  - icon-rum
  - browser
  type: string
- description: Les parties de l'URL correspondant à la chaîne de requête, décomposées
    en attributs key/value de paramètres de requête.
  domain: Session (Browser events)
  name: session.last_view.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: La partie de l'URL correspondant au format.
  domain: Session (Browser events)
  name: session.last_view.url_scheme
  product_source:
  - icon-rum
  - browser
  type: object
- description: Le type de ressource à recueillir (par exemple, `css`, `javascript`,
    `media`, `XHR` ou `image`).
  domain: Resource (Browser events)
  name: resource.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: La méthode HTTP (par exemple, `POST` ou `GET`).
  domain: Resource (Browser events)
  name: resource.method
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le code de statut de la réponse.
  domain: Resource (Browser events)
  name: resource.status_code
  product_source:
  - icon-rum
  - browser
  type: number
- description: L'URL de la ressource.
  domain: Resource (Browser events)
  name: resource.url
  product_source:
  - icon-rum
  - browser
  type: string
- description: La partie de l'URL correspondant au host.
  domain: Resource (Browser events)
  name: resource.url_host
  product_source:
  - icon-rum
  - browser
  type: string
- description: La partie de l'URL correspondant au chemin.
  domain: Resource (Browser events)
  name: resource.url_path
  product_source:
  - icon-rum
  - browser
  type: string
- description: Les parties de l'URL correspondant à la chaîne de requête, décomposées
    en attributs key/value de paramètres de requête.
  domain: Resource (Browser events)
  name: resource.url_query
  product_source:
  - icon-rum
  - browser
  type: object
- description: Le nom du protocole de l'URL (HTTP ou HTTPS).
  domain: Resource (Browser events)
  name: resource.url_scheme
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le nom du fournisseur de ressources. Par défaut, c'est `unknown`.
  domain: Resource (Browser events)
  name: resource.provider.name
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le domaine du fournisseur de ressource.
  domain: Resource (Browser events)
  name: resource.provider.domain
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le type de fournisseur de ressources (par exemple, `first-party`, `cdn`,
    `ad` ou `analytics`).
  domain: Resource (Browser events)
  name: resource.provider.type
  product_source:
  - icon-rum
  - browser
  type: string
- description: Clics sans effet détectés par le SDK Browser RUM.
  domain: Frustration signals (Browser events)
  name: action.frustration.type:dead_click
  product_source:
  - icon-rum
  - browser
  type: string
- description: Clics de rage détectés par le SDK Browser RUM.
  domain: Frustration signals (Browser events)
  name: action.frustration.type:rage_click
  product_source:
  - icon-rum
  - browser
  type: string
- description: Clics effectués par erreur détectés par le SDK Browser RUM.
  domain: Frustration signals (Browser events)
  name: action.frustration.type:error_click
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le paramètre de l'URL effectuant le suivi de la source du trafic.
  domain: UTM (Browser events)
  name: view.url_query.utm_source
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le paramètre de l'URL effectuant le suivi du canal à l'origine du trafic.
  domain: UTM (Browser events)
  name: view.url_query.utm_medium
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le paramètre de l'URL identifiant la campagne marketing spécifique
    liée à cette vue.
  domain: UTM (Browser events)
  name: view.url_query.utm_campaign
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le paramètre de l'URL identifiant l'élément spécifique sur lequel un
    utilisateur a cliqué dans une campagne marketing.
  domain: UTM (Browser events)
  name: view.url_query.utm_content
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le paramètre de l'URL effectuant le suivi du mot clé recherché par
    un utilisateur et ayant déclenché une campagne donnée.
  domain: UTM (Browser events)
  name: view.url_query.utm_term
  product_source:
  - icon-rum
  - browser
  type: string
- description: Le langage du SDK client utilisé pour générer le span. Il peut s'agir
    de `cpp`, `dotnet`, `go`, `jvm`, `javascript`, `php`, `python`, `ruby`.
  domain: APM core
  name: language
  product_source:
  - icon-apm
  type: string
- description: La valeur de la variable d'environnement `DD_ENV` ou du paramètre `env`
    défini par l'utilisateur pour le processus en cours d'exécution.
  domain: APM core (Reserved)
  name: env
  product_source:
  - icon-apm
  type: string
- description: La valeur de la variable d'environnement `DD_VERSION` ou du paramètre
    `version` défini par l'utilisateur pour le processus en cours d'exécution.
  domain: APM core (Reserved)
  name: version
  product_source:
  - icon-apm
  type: string
- description: La chaîne représentant le type d'unité de travail gérée par le span.
    Il peut s'agir de serveur, client, producteur, consommateur ou interne. Pour plus
    d'informations, consultez la [documentation OpenTelemetry SpanKind](https://opentelemetry.io/docs/specs/otel/trace/api/#spankind).
  domain: APM core
  name: span.kind
  product_source:
  - icon-apm
  type: string
- description: Le nom de la bibliothèque ou de l'intégration qui a créé la span.
  domain: APM core
  name: component
  product_source:
  - icon-apm
  type: string
- description: L'adresse IP du client à l'origine de la connexion entrante.
  domain: Network communications
  name: network.client.ip
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: L'adresse IP de destination de la connexion sortante.
  domain: Network communications
  name: network.destination.ip
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: L'adresse IP du host local.
  domain: Network communications
  name: network.host.ip
  product_source:
  - icon-apm
  type: string
- description: Le port du client qui a établi la connexion.
  domain: Network communications
  name: network.client.port
  product_source:
  - icon-apm
  - icon-log
  type: number
- description: Le numéro de port distant de la connexion sortante.
  domain: Network communications
  name: network.destination.port
  product_source:
  - icon-apm
  - icon-log
  type: number
- description: Le hostname du client à l'origine de la connexion entrante.
  domain: Network communications
  name: network.client.name
  product_source:
  - icon-apm
  type: string
- description: Le hostname local.
  domain: Network communications
  name: network.host.name
  product_source:
  - icon-apm
  type: string
- description: Le protocole de transport utilisé pour la connexion entrante.
  domain: Network communications
  name: network.client.transport
  product_source:
  - icon-apm
  type: string
- description: Le protocole de transport utilisé pour la connexion sortante.
  domain: Network communications
  name: network.destination.transport
  product_source:
  - icon-apm
  type: string
- description: Le code de statut de la réponse HTTP.
  domain: HTTP requests
  name: http.status_code
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: L'URL de la requête HTTP, y compris la chaîne de requête obfusquée.
    Pour plus d'informations sur l'obfuscation, consultez [Configurer la Sécurité
    des Données](https://docs.datadoghq.com/tracing/configure_data_security/).
  domain: HTTP requests
  name: http.url
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La version HTTP utilisée pour la requête.
  domain: HTTP requests
  name: http.version
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: Le port du client qui a établi la connexion.
  domain: HTTP requests
  name: http.method
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La route correspondante (modèle de chemin). Par exemple, `/users/:userID`.
  domain: HTTP requests
  name: http.route
  product_source:
  - icon-apm
  type: string
- description: L'adresse IP du client d'origine derrière tous les proxies, si connue.
    Découverte à partir d'en-têtes tels que `X-Forwarded-For`.
  domain: HTTP requests
  name: http.client_ip
  product_source:
  - icon-apm
  type: string
- description: Le `User-Agent` indiqué dans l'en-tête de la requête reçue.
  domain: HTTP requests
  name: http.useragent
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: La taille en octets du corps de la charge utile de la requête.
  domain: HTTP requests
  name: http.request.content_length
  product_source:
  - icon-apm
  type: number
- description: La taille en octets du corps de la charge utile de la réponse.
  domain: HTTP requests
  name: http.response.content_length
  product_source:
  - icon-apm
  type: number
- description: La taille du corps de la charge utile de la requête sans compression
    après décodage du transport.
  domain: HTTP requests
  name: http.request.content_length_uncompressed
  product_source:
  - icon-apm
  type: number
- description: La taille du corps de la charge utile de la réponse sans compression
    après décodage du transport.
  domain: HTTP requests
  name: http.response.content_length_uncompressed
  product_source:
  - icon-apm
  type: number
- description: Les en-têtes HTTP de la requête. Aucun n'est collecté par défaut, mais
    peut être configuré en option avec `DD_TRACE_HEADER_TAGS`.
  domain: HTTP requests
  name: http.request.headers.*
  product_source:
  - icon-apm
  type: string
- description: L'identifiant du système de gestion de bases de données (solution SGBD)
    utilisé.
  domain: Database spans
  name: db.system
  product_source:
  - icon-apm
  type: string
- description: Les en-têtes HTTP de la réponse. Aucun n'est collecté par défaut, mais
    peut être configuré en option avec `DD_TRACE_HEADER_TAGS`.
  domain: HTTP requests
  name: http.response.headers.*
  product_source:
  - icon-apm
  type: string
- description: La chaîne utilisée pour la connexion à la base de données.
  domain: Database spans
  name: db.connection_string
  product_source:
  - icon-apm
  type: string
- description: Le nom de l'opération en cours d'exécution. Par exemple, `SELECT`,
    `findAndModify`, `HMSET`.
  domain: Database spans
  name: db.operation
  product_source:
  - icon-apm
  - icon-log
  type: string
- description: Le nom de la table principale à laquelle s'applique l'opération, y
    compris le nom de la base de données (le cas échéant).
  domain: Database spans
  name: db.sql.table
  product_source:
  - icon-apm
  type: string
- description: Le nombre de lignes/résultats renvoyés par la requête ou l'opération.
  domain: Database spans
  name: db.row_count
  product_source:
  - icon-apm
  type: number
- description: L'identifiant du système de messagerie.
  domain: Message queue spans
  name: messaging.system
  product_source:
  - icon-apm
  type: string
- description: Le nom de la destination du message.
  domain: Message queue spans
  name: messaging.destination
  product_source:
  - icon-apm
  type: string
- description: Le type de la destination du message.
  domain: Message queue spans
  name: messaging.destination_kind
  product_source:
  - icon-apm
  type: string
- description: Le nom du protocole de transport.
  domain: Message queue spans
  name: messaging.protocol
  product_source:
  - icon-apm
  type: string
- description: La version du protocole de transport.
  domain: Message queue spans
  name: messaging.protocol_version
  product_source:
  - icon-apm
  type: string
- description: La chaîne de connexion au système de messagerie.
  domain: Message queue spans
  name: messaging.url
  product_source:
  - icon-apm
  type: string
- description: Une valeur utilisée par le système de messagerie en tant qu'identifiant
    pour le message, sous forme de chaîne.
  domain: Message queue spans
  name: messaging.message_id
  product_source:
  - icon-apm
  type: string
- description: L'ID de conversation identifiant la conversation à laquelle le message
    appartient ; représenté par une chaîne.
  domain: Message queue spans
  name: messaging.conversation_id
  product_source:
  - icon-apm
  type: string
- description: La taille en octets de la charge utile du message sans compression.
  domain: Message queue spans
  name: messaging.message_payload_size
  product_source:
  - icon-apm
  type: number
- description: Une chaîne identifiant le type de consommation de message. Par exemple,
    `envoyer` (un message envoyé à un producteur), `recevoir` (un message reçu par
    un consommateur), ou `traiter` (un message précédemment reçu est traité par un
    consommateur).
  domain: Message queue spans
  name: messaging.operation
  product_source:
  - icon-apm
  type: string
- description: L'identifiant du consommateur recevant un message.
  domain: Message queue spans
  name: messaging.consumer_id
  product_source:
  - icon-apm
  type: string
- description: L'identifiant du système distant.
  domain: Remote procedure calls
  name: rpc.system
  product_source:
  - icon-apm
  type: string
- description: Le nom du service appelé.
  domain: Remote procedure calls
  name: rpc.service
  product_source:
  - icon-apm
  type: string
- description: Le nom de la méthode appelée.
  domain: Remote procedure calls
  name: rpc.method
  product_source:
  - icon-apm
  type: string
content: The following table lists the attributes automatically applied to data sent
  to Datadog by the Agent by each of the RUM, Logs, and APM products, as applicable
  to the data domain. Optionally, filter the list by product or search by keyword
  or description text to find the attributes you're interested in.
description: Un tableau des attributs appliqués automatiquement aux données envoyées
  à Datadog par l'Agent pour chacun des produits RUM, Logs et APM, selon le domaine
  de données.
disable_sidebar: true
filter_all: All
further_reading:
- link: /data_security/
  tag: Documentation
  text: Assurer la sécurité des données envoyées à Datadog
- link: /tracing/trace_collection/tracing_naming_convention/
  tag: Documentation
  text: Sémantique des tags de span
title: Attributs standard par défaut
---
## Lecture complémentaire {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}