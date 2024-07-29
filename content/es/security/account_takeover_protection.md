---
disable_toc: false
further_reading:
- link: security/application_security/terms/
  tag: Documentación
  text: Términos y conceptos de ASM
- link: security/application_security/threats/add-user-info/?tab=set_user
  tag: Documentación
  text: Monitorización y protección de usuarios
- link: security/application_security/guide/
  tag: Documentación
  text: Guías de Application Security Management
title: Protección contra la apropiación de cuentas
---

ASM proporciona protección contra la apropiación de cuentas (ATO) para detectar y mitigar los ataques cuyo objetivo es la apropiación de cuentas.

La protección contra la ATO ofrece las siguientes ventajas:

* Bloquea a los atacantes y desactiva a los usuarios.
* Identifica a los usuarios objetivo y comprometidos.
* Diferencia a los usuarios existentes de los que no lo son.
* Agrupa a los atacantes en grupos lógicos para su mitigación.

## Información general sobre la protección contra la apropiación de cuentas

La apropiación de cuentas se produce cuando un atacante obtiene acceso a las credenciales de la cuenta de un usuario y asume el control.

Las siguientes tablas presentan la *motivación del atacante por empresa*:

| Robo de dinero                           | Reventa de cuentas              |
|------------------------------------------|---------------------------------|
| Aplicaciones bancarias para particulares                    | Plataformas SaaS                  |
| Aplicaciones de servicios financieros que emiten tarjetas de crédito | Plataformas de consumidores con tarjetas de regalo almacenadas |

## Estrategias de los atacantes

Los ataques utilizan herramientas automatizadas de acceso público para comprometer las credenciales de la cuenta de un usuario. La sofisticación y escala de estas herramientas tienen capacidades variables.

Las siguientes son algunas estrategias frecuentes:

Relleno de credenciales
: Ciberataque automatizado en el que se utilizan credenciales de cuenta robadas (nombres de usuario, direcciones de correo electrónico, contraseñas, etc.) para obtener acceso no autorizado a cuentas de usuario. El acceso se obtiene a través de solicitudes de inicio de sesión automatizadas de gran escala, dirigidas a una aplicación web.
: El relleno de credenciales se basa en el volcado de credenciales.

Volcado de credenciales
: Los volcados de credenciales se producen cuando las credenciales robadas debido a fallos de seguridad se publican o se venden en los mercados de la web oscura. Esto a menudo resulta en la liberación de un gran número de nombres de usuario, contraseñas y otros datos de cuentas.

Crackeo de credenciales
: El crackeo de credenciales consiste en intentar descifrar la contraseña de un usuario probando sistemáticamente diferentes combinaciones de contraseñas hasta encontrar la correcta. Este método suele utilizar herramientas informáticas que aplican diversas técnicas de adivinación de contraseñas.

Fuerza bruta
: La fuerza bruta es un método de ensayo y error utilizado para obtener información como una contraseña de usuario o un número de identificación personal (PIN). En este ataque, se utiliza la automatización para generar conjeturas consecutivas y obtener acceso no autorizado a un sistema.

## Configuración de la detección y prevención de la ATO

ASM proporciona detecciones gestionadas de ataques ATO.

La detección y prevención eficaces de la ATO requieren lo siguiente:

1. Instrumentación de tus endpoints de inicio de sesión de producción. Esto permite la detección mediante reglas gestionadas por ASM.
2. Configuración remota. Permite bloquear ataques y activar la instrumentación remota desde la interfaz de usuario Datadog.
3. Notificaciones. Garantiza que se te notifiquen las cuentas que están comprometidas.
4. Revisión de tu primera detección. Para comprender cómo se ajusta la protección automatizada a tus ataques y requisitos de escalado.


## Instrumentación de tus endpoints de inicio de sesión de producción

Los siguientes eventos de actividad de usuario se utilizan para el seguimiento de la ATO.

| Enriquecimiento              | Auto-instrumentado | Caso práctico                                     |
|-------------------------|-------------------|----------------------------------------------|
| `users.login.success`     | Verdadero              | Requisito de la norma de detección de la apropiación de cuentas       |
| `users.login.failure`     | Verdadero              | Requisito de la norma de detección de la apropiación de cuentas       |
| `users.password_reset`     | Falso             | Requisito de la norma de detección para identificar la enumeración de usuarios mediante el restablecimiento de contraseñas |

Estos enriquecimientos necesitan tener un identificador de usuario (único para un usuario, numérico o no) como `usr.id`. En el caso de fallos en el inicio de sesión, también necesita saber si el usuario existía o no en la base de datos (`usr.exists`). Esto ayuda a identificar la actividad maliciosa que se dirige regularmente a las cuentas que faltan.

Para conocer los pasos necesarios para habilitar el seguimiento de eventos que no se instrumentan automáticamente, consulta [Monitorización y protección de usuarios][1].

Para consultar la última lista de detecciones relevantes y requisitos de instrumentación, consulta la página [Normas de detección][2].

La [instrumentación automática][3] es una función de Datadog que identifica automáticamente el éxito y el fracaso del inicio de sesión del usuario en varias implementaciones de autenticación.

La forma en que Datadog define estos enriquecimientos no es exhaustiva. Muchos productos de plataforma optan por añadir enriquecimientos adicionales, como la identificación de la organización del cliente o el rol del usuario.

## Configuración remota

La [configuración remota][4] permite a los usuarios de ASM instrumentar aplicaciones con datos de [lógica empresarial][5] personalizados, casi en tiempo real.

## Notificaciones

Las [notificaciones][6] son un método flexible para garantizar que se informe de un ataque a los miembros correctos del equipo. Las [integraciones][7] de colaboración con métodos de comunicación comunes están disponibles desde el primer momento.


## Revisión de tu primera detección

ASM resalta la información más relevante y sugiere acciones en función del tipo de detección. También indica qué acciones se han llevado a cabo.

{{<img src="security/ato/review_first_detection2.png" alt="An Account Takeover signal showing different highlighted areas of interest" style="width:100%;">}}

**Usuarios comprometidos**

Los usuarios objetivo y comprometidos pueden ser revisados y bloqueados en **Señales** y **Trazas**.

**Señales**

Los usuarios individuales pueden ser bloqueados en **Señales** mediante **Usuarios objetivo**.

{{<img src="security/ato/compromised_users_signals2.png" alt="Compromised users shown on a security signal" style="width:100%;">}}

**Trazas**

Los usuarios individuales pueden ser bloqueados en **Trazas**, en **Usuario**. Haz clic en cualquier usuario para mostrar esta opción.

{{<img src="security/ato/traces_block_user.png" alt="Compromised users shown in the security rastrear explorer" style="width:100%;">}}

## Prácticas recomendadas para la revisión y protección de señales

Revisa las siguientes prácticas recomendadas para ayuda a detectar y mitigar los ataques de apropiación de cuentas.

### Desarrollo de un plan de respuesta a incidentes

Revisa las siguientes secciones para ayudarte a desarrollar un plan de respuesta a incidentes.

#### ¿Utilizas analizadores autenticados?

Identifica las IP de confianza para evitar que sean bloqueadas automáticamente. Este paso es útil para: 

- Fuentes de análisis aprobadas que intentan iniciar sesión.
- Sitios corporativos con un gran número de usuarios detrás de direcciones IP únicas.

Para Configurar las IP de confianza, utiliza [Passlist][12] y añade una entrada `Monitored`. Las entradas monitorizadas se excluyen del bloqueo automático.

{{<img src="security/ato/passlist2.png" alt="Monitored passlist" style="width:100%;">}}

#### Para conocer el perfil de autenticación de tus clientes

Revisa las redes desde las que se autentican tus clientes. Por ejemplo:

- ISP móviles
- VPN de empresas
- IP residenciales
- Centros de datos

Comprender las fuentes de autenticación puede ayudar a tu estrategia de bloqueo. 

Por ejemplo, es posible que *no* esperes que los clientes se autentiquen con tu aplicación de consumo desde los centros de datos. En consecuencia, podrías tener más libertad para bloquear las IP asociadas a un centro de datos determinado.

Pero si tus clientes proceden en su totalidad de ISP móviles, podrías afectar al tráfico legítimo si bloqueas esos ISP.

Ten en cuenta quiénes son tus clientes y su estructura de nombres de cuenta.

¿Coinciden tus clientes con estos atributos?

- Empleados con un formato de ID esperado, como números enteros, dominios corporativos o combinaciones de números y texto.
- Clientes de SaaS que utilizan nombres de dominio asociados a la empresa cliente.
- Consumidores que utilizan proveedores gratuitos como Gmail o Proton Mail.

Comprender la estructura de nombres de cuenta de tus clientes te ayuda a determinar si los ataques son dirigidos o intentos ciegos de relleno de credenciales.


### Ataques distribuidos

Bloquear los ataques distribuidos avanzados suele ser una decisión empresarial, ya que los ataques pueden afectar a la disponibilidad, a los fondos de los usuarios y a los usuarios legítimos.

Los siguientes son tres componentes críticos para el éxito de la mitigación de estos ataques:

1. Incorporación adecuada: ¿Tienes configurado el bloqueo con ASM?
2. Configuración adecuada: Asegúrate de que has configurado correctamente las IP del cliente y las cabeceras HTTP X-Forwarded-For (XFF).
3. Planes de comunicación interna: La comunicación con los equipos de seguridad, los propietarios de servicios y los jefes de producto es fundamental para comprender el impacto de la mitigación de los ataques a gran escala.

<div class="alert alert-info">Los respondedores pueden identificar a los propietarios de servicios utilizando las etiquetas (tags) en todas las señales ASM.</div>

### Para conocer tus tendencias

Utiliza el [Resumen de amenazas][11] para monitorizar tendencias de lógica empresarial, como picos de inicios de sesión fallidos en tus servicios.

{{<img src="security/ato/threats_overview2.png" alt="Threats Overview" style="width:100%;">}}


### Revisión de señales

Revisa las siguientes prácticas recomendadas para las señales.

#### Direcciones IP

Utiliza duraciones cortas para bloquear a los atacantes. Se recomiendan duraciones de 15 minutos o menos. No es habitual que los atacantes vuelvan a utilizar direcciones IP en las apropiaciones de cuentas distribuidas.

#### Centros de datos

Algunos ataques se lanzan utilizando servidores privados virtuales (VPS) y proveedores de alojamiento de bajo coste. Los atacantes están motivados porque su bajo coste y automatización les permiten acceder a nuevas direcciones IP en el centro de datos.

Muchas aplicaciones de consumo tienen bajas ocurrencias de autenticación de usuarios desde centros de datos, especialmente centros de datos y proveedores de VPS de bajo coste. Considera bloquear todo el centro de datos o el ASN cuando el rango de red sea pequeño y no esté dentro del comportamiento de autenticación esperado de tus usuarios.

<div class="alert alert-info">Datadog utiliza fuentes de datos de terceros, como IPinfo y Spur, para determinar si una IP es un proveedor de alojamiento. Datadog procesos estos datos dentro de la infraestructura de Datadog.</div>

#### Proxies

Datadog utiliza [Spur][8] para determinar si una IP es un proxy. Datadog correlaciona los indicadores de compromiso (IOC) con los ataques de apropiación de cuentas para una detección más rápida con reglas de apropiación de cuentas gestionadas por ASM.

Datadog recomienda no bloquear nunca direcciones IP basándose únicamente en los IOC de información sobre amenazas para direcciones IP. Para obtener más detalles, consulta nuestras [prácticas recomendadas] para la información sobre amenazas[9].

Los detalles sobre las IP, incluida la propiedad y la información sobre amenazas, están disponibles en los detalles de la dirección IP. Haz clic en una dirección IP para ver estos detalles.

En las apropiaciones de cuentas distribuidas se observan con frecuencia dos tipos de proxies:

- Proxies de alojamiento: Son proxies que existen en los centros de datos y a menudo son el resultado de un host comprometido en ese centro de datos. La guía para interactuar con proxies de alojamiento es similar a la de los centros de datos.

- Proxies residenciales: Son proxies que existen detrás de IP residenciales. Los proxies residenciales suelen estar habilitados por SDK de aplicaciones móviles o complementos de navegadores. El usuario del SDK o del complemento suele no ser consciente de que está ejecutando un proxy. Es habitual ver tráfico benigno procedente de direcciones IP identificadas como proxies residenciales.

#### ISP móviles

Datadog utiliza terceros como IPinfo y Spur para determinar si una IP es un ISP móvil.

Ten cuidado al bloquear ISP móviles. Los ISP móviles utilizan [CGNAT][10] y suelen tener un gran número de teléfonos detrás de cada dirección IP. 

#### Atributos de los atacantes

Utiliza los atributos de los atacantes para dirigir las acciones de respuesta.

Datadog agrupa a los atacantes por la similitud de sus atributos. Los respondedores pueden utilizar reglas personalizadas para bloquear los atributos de atacantes persistentes.


### Protección

Revisa las siguientes prácticas de protección recomendadas.

#### Protección automatizada

Evalúa el conjunto de reglas gestionadas para determinar qué reglas se ajustan a tus políticas internas de bloqueo automatizado. 

Si no tienes un política, revisa tus detecciones existentes y empieza con las respuestas sugeridas en **Señales**. Construye tu política basándote en las acciones más relevantes realizadas a lo largo del tiempo.

#### Usuarios

En **Señales**, las secciones **Qué ocurrió** y **Usuarios objetivo** proporcionan ejemplos de los nombres de usuario intentados.

La sección **Trazas** identifica si los usuarios existen. Comprender si los usuarios existen puede influir en tus decisiones de respuesta a incidentes.

Desarrolla un plan de respuesta a incidentes utilizando los siguientes pasos posteriores al incidente:

1. Monitorización de cuentas de usuario comprometidas.
2. Plan para invalidar credenciales y ponerse en contacto con los usuarios para actualizarlas.
3. Considera la posibilidad de bloquear a los usuarios mediante ASM.

La motivación del ataque puede influir en la actividad posterior al incidente. Es poco probable que los atacantes que quieren revender cuentas las utilicen inmediatamente después de un incidente.
Los atacantes que intentan acceder a fondos almacenados utilizarán las cuentas inmediatamente después del incidente.

Además de bloquear al atacante, considera bloquear a los usuarios comprometidos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/security/application_security/threats/add-user-info/
[2]: https://app.datadoghq.com/security/configuration/asm/rules?query=type%3Aapplication_security%20defaultRule%3Atrue%20dependency%3A%28business_logic.users.%2A%29%20&deprecated=hide&groupBy=none&sort=rule_name
[3]: https://app.datadoghq.com/security/configuration/asm/rules?query=type%3Aapplication_security%20defaultRule%3Atrue%20dependency%3A%28business_logic.users.%2A%29%20&deprecated=hide&groupBy=none&sort=rule_name
[4]: https://docs.datadoghq.com/es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: https://app.datadoghq.com/security/appsec/business-logic
[6]: https://docs.datadoghq.com/es/security/notifications/rules/
[7]: https://app.datadoghq.com/integrations?category=Collaboration
[8]: https://docs.datadoghq.com/es/security/threat_intelligence#threat-intelligence-sources
[9]: https://docs.datadoghq.com/es/security/threat_intelligence#best-practices-in-threat-intelligence
[10]: https://en.wikipedia.org/wiki/Carrier-grade_NAT
[11]: https://app.datadoghq.com/security/appsec/threat
[12]: https://app.datadoghq.com/security/appsec/passlist