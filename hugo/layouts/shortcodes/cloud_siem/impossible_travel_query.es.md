1. En el menú desplegable **User attribute** (Atributo de usuario), seleccione el atributo de log que contiene el ID de usuario. Puede ser un identificador como una dirección de correo electrónico, un nombre de usuario o un identificador de cuenta.
1. El valor **Location attribute** (Atributo de localización) se define automáticamente en `@network.client.geoip`.
    - En `location attribute` se especifica qué campo contiene la información geográfica de un log.
    - El único valor compatible es `@network.client.geoip`, que es enriquecido por el [analizar GeoIP][801] para proporcionar la información de localización de un log en función de la dirección IP del cliente.
1. Haz clic en la casilla **Baseline user locations** (Localizaciones de usuario de referencia), si quieres que Datadog aprenda las localizaciones de acceso habituales antes de activar una señal.
    - Cuando se selecciona esta opción, las señales se suprimen durante las primeras 24 horas. Durante ese tiempo, Datadog aprende las localizaciones de acceso habituales del usuario. Esto puede ser útil para reducir el ruido e inferir el uso de VPN o el acceso a la API con credenciales.
    - Consulta [Funcionamiento del método de detección imposibl][802] para obtener más información.

[801]: /es/logs/log_configuration/processors/?tab=ui#geoip-parser
[802]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/impossible_travel/#how-the-impossible-travel-method-works