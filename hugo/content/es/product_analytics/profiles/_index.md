---
description: Analice y comprenda a los usuarios individuales y a los segmentos de
  su base de usuarios.
further_reading:
- link: /product_analytics/
  tag: Documentación
  text: Product Analytics
title: Administración de perfiles e integración de atributos personalizados
---
## Descripción general {#overview}

Las páginas [User Profiles][7] y [Account Profiles][8] contienen datos enriquecidos sobre los usuarios y las cuentas que interactúan con su producto.

Estas páginas de perfil integran atributos extraídos de eventos recopilados con información de fuentes de terceros. Ejemplos de estos atributos incluyen la marca de tiempo `first_seen` de un usuario o el código ISO del `last_seen_country` del usuario. Juntos, ayudan a crear perfiles integrales y centralizados.

Estos perfiles enriquecidos permiten una segmentación más precisa y un análisis más profundo del comportamiento del usuario, lo que le ayuda a identificar patrones a lo largo del tiempo, realizar un seguimiento de cohortes clave (por ejemplo, usuarios activos después de seis meses) y guiar las decisiones de producto y las estrategias de participación.

## Perfiles {#profiles}

Los perfiles de usuario y de cuenta se generan a partir de eventos RUM recopilados a través del SDK de RUM. Utilice `datadogRum.setUser` para [establecer atributos de usuario][2] y `datadogRum.setAccount` para establecer [atributos de cuenta][3].

Los perfiles de usuario se agrupan por el atributo `user_id`, mientras que los perfiles de cuenta se agrupan por `account_id`.

Para usuarios no autenticados o visitantes que nunca llaman a `setUser`, el SDK de RUM rastrea automáticamente la actividad mediante `usr.anonymous_id`. Consulte [Seguimiento de usuarios no autenticados][9] para obtener más detalles.

También puede personalizar estas páginas añadiendo los atributos que sean más importantes para su equipo. Consulte la sección [Custom Attributes](#use-custom-attributes-to-enrich-profiles) para saber cómo adaptar los datos del perfil a sus necesidades.


### Perfiles de usuario {#user-profiles}

La página [User Profiles][7] lista a los usuarios que interactúan con su aplicación. Puede seleccionar a un usuario para visualizar información detallada sobre su actividad, incluidas sus páginas más visitadas, acciones frecuentes e historial de sesiones.

{{< img src="product_analytics/user_profile2ui.png" alt="Una vista de la página User profiles." style="width:80%;" >}}

Cada perfil tiene atributos para ayudarle a segmentar mejor a sus usuarios. Puede realizar una búsqueda de texto completo o clasificar y filtrar según cualquiera de estos atributos. También puede personalizar esta página con atributos relevantes para sus necesidades analíticas. Consulte la sección [Custom Attributes](#use-custom-attributes-to-enrich-profiles) para saber cómo.


{{% collapse-content title="Lista de atributos del perfil de usuario" level="h4" expanded=true id="user-profile-attributes" %}}

<!-- #### User attributes  -->
ID de usuario `REQUIRED`
: `type:string` <br> Un identificador de usuario único.<br>

Correo electrónico del usuario
: `type:string` <br> La dirección de correo electrónico del usuario.

Nombre de usuario
: `type:string` <br> El nombre completo del usuario.

<!-- #### Time based attributes  -->
Visto por primera vez
: `type:timestamp` <br> La fecha de la primera sesión del usuario.

Visto por última vez
: `type:timestamp`  <br> La fecha de la sesión más reciente del usuario.


<!-- #### application based attributes  -->
Primera aplicación a la que accedió el usuario
: `type:string`  <br> El ID de la primera aplicación a la que accedió el usuario.

Última aplicación a la que accedió el usuario
: `type:string`  <br> El ID de la última aplicación a la que accedió el usuario.


<!-- #### Geo based attributes  -->
Primera ciudad
: `type:string` <br> La ciudad de la primera sesión del usuario.

Última ciudad
: `type:string` <br> La ciudad de la última sesión del usuario.

País de la primera sesión
: `type:string` <br> El código ISO del país de la primera sesión del usuario. El código del país se guarda en el backend y el nombre del país se muestra en la UI.

País de la última sesión
: `type:string` <br> El código ISO del país de la última sesión del usuario. El código del país se guarda en el backend y el nombre del país se muestra en la UI.

Primera región
: `type:string` <br> La región de la primera sesión del usuario.

Última región
: `type:string` <br> La región de la última sesión del usuario.


<!-- #### Device related attributes  -->
Primer tipo de dispositivo
: `type:string` <br> El dispositivo utilizado en la primera sesión del usuario (por ejemplo: computadora de escritorio, tableta).

Último tipo de dispositivo
: `type:string` <br> El dispositivo utilizado en la última sesión del usuario (por ejemplo: computadora de escritorio, tableta).


<!-- #### OS related attributes  -->
Nombre del sistema operativo de la primera sesión
: `type:string` <br> El sistema operativo de la primera sesión del usuario (por ejemplo: Windows, iOS).

Nombre del sistema operativo de la última sesión
: `type:string` <br> El sistema operativo de la última sesión del usuario (por ejemplo: Windows, iOS).

Versión del sistema operativo de la primera sesión
: `type:string` <br> La versión del SO de la primera sesión del usuario.

Versión del sistema operativo de la última sesión
: `type:string` <br> La versión del SO de la última sesión del usuario.


<!-- #### Browser related attributes  -->
Nombre del navegador de la primera sesión
: `type:string` <br> El navegador utilizado en la primera sesión del usuario (por ejemplo: Chrome, Safari).

Nombre del navegador de la última sesión
: `type:string` <br> El navegador utilizado en la última sesión del usuario (por ejemplo: Chrome, Safari).

Versión del navegador de la primera sesión
: `type:string` <br> La versión del navegador de la primera sesión del usuario.

Versión del navegador de la última sesión
: `type:string` <br> La versión del navegador de la última sesión del usuario.

{{% /collapse-content %}}
<br>


### Perfiles de cuenta {#account-profiles}
La página Account Profiles muestra una lista de las organizaciones que interactúan con su aplicación.

{{< img src="product_analytics/account_profile_ui3.png" alt="Una vista de la página User profiles." style="width:80%;" >}}

Cada perfil incluye cuatro atributos predeterminados para ayudarle a identificar y realizar un seguimiento de la actividad de la cuenta a lo largo del tiempo. Estos atributos predeterminados son:
- `account_id`
- `account_name`
- `first_seen`
- `last_seen`

Puede personalizar la página Account Profiles para incluir atributos adicionales, lo que le brinda la flexibilidad de adaptar la vista a sus necesidades de observabilidad y análisis de producto.



## Utilice atributos personalizados para enriquecer los perfiles {#use-custom-attributes-to-enrich-profiles}

### Cómo configurar atributos personalizados mediante integraciones {#how-to-configure-custom-attributes-using-integrations}

Utilice integraciones o tablas de referencia para importar automáticamente datos de atributos personalizados a los perfiles. Estos datos se sincronizan según un horario regular y reflejan los valores más recientes del sistema fuente para garantizar que los perfiles permanezcan actualizados y precisos.

En la [página de Integrations][4], puede explorar las integraciones que son compatibles con atributos personalizados.

En esta misma página, puede seleccionar la pestaña [{{< ui >}}Custom Attributes{{< /ui >}}][5] para visualizar los atributos importados para los perfiles de usuario y de cuenta.

{{< img src="product_analytics/integration_page5.png" alt="Consulte las integraciones que son compatibles con Product Analytics." style="width:80%;" >}}

Para importar atributos desde una tabla de referencia o desde una integración como Salesforce o Snowflake, seleccione el botón {{< ui >}}Add Attributes{{< /ui >}} y elija si los atributos son para perfiles de usuario o de cuenta. Luego, siga las instrucciones para:


{{< img src="product_analytics/add_attribute2_button.png" alt="Agregue nuevos atributos para enriquecer sus perfiles." style="width:80%;" >}}


1. Elija un {{< ui >}}source of the data{{< /ui >}} para importar.

{{< img src="product_analytics/choose_integration1.png" alt="Elija una fuente de los datos que se van a importar." style="width:80%;" >}}


2. Seleccione la {{< ui >}}table{{< /ui >}} que contiene los datos de usuario deseados.

{{< img src="product_analytics/add_table_and_key3.png" alt="seleccione los datos que se combinarán con sus perfiles." style="width:80%;" >}}


3. Seleccione la {{< ui >}}join key{{< /ui >}} y la {{< ui >}}Product Analytics key{{< /ui >}} para combinar la tabla con sus perfiles. Luego, seleccione qué {{< ui >}}attributes{{< /ui >}} de la lista agregar a sus perfiles. Cada fila necesita un valor en la columna de clave de unión para coincidir con un perfil, y las filas que no tienen uno se omiten. Si ninguna fila tiene un valor de clave de unión, la sincronización programada se completa correctamente pero no importa ningún atributo. Si esto sucede, verifique que la clave de unión esté configurada en la columna correcta de su tabla.

{{< img src="product_analytics/select_integration_attributes5.png" alt="El modal Configure import de Snowflake muestra la configuración de la clave de unión y una lista de atributos seleccionables con nombres de columna, tipos y valores de muestra." style="width:80%;" >}}


<br>

## Cómo consultar sus atributos personalizados {#how-to-query-your-custom-attributes}

Puede filtrar estos atributos personalizados en toda la plataforma de análisis de productos sin necesidad de agregarlos primero a un [segment][6]. Por ejemplo, puede crear un gráfico de análisis para ver el volumen de sesiones de los usuarios que gastaron más de $100.

{{< img src="product_analytics/query_custom_attribute_analytics3.png" alt="Consulte sus atributos personalizados en un gráfico de análisis." style="width:80%;" >}}


## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}


[2]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#identify-user-session
[3]: https://docs.datadoghq.com/es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#identify-account
[4]: https://app.datadoghq.com/product-analytics/integrations
[5]: https://app.datadoghq.com/product-analytics/integrations/custom-attributes
[6]: https://app.datadoghq.com/product-analytics/segments
[7]: https://app.datadoghq.com/product-analytics/profiles
[8]: https://app.datadoghq.com/product-analytics/profiles/accounts
[9]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/#track-unauthenticated-users