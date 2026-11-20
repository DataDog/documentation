---
aliases:
- /es/security/cloud_siem/entities_and_risk_scoring
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: Documentación
  text: Sincronice las identidades de usuario en Cloud SIEM con Entity Packs
- link: https://www.datadoghq.com/blog/risk-prioritization-entity-analytics/
  tag: Blog
  text: Acelere las investigaciones con Datadog Cloud SIEM Risk-based Insights y AWS
    Entity Analytics
- link: https://www.datadoghq.com/blog/ai-powered-threat-analysis
  tag: Blog
  text: 'IA en investigaciones de seguridad en la nube: el papel de UEBA y telemetría
    mejorada'
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Novedades en Cloud SIEM: investigaciones impulsadas por IA, inteligencia
    de amenazas mejorada y operaciones de seguridad escalables'
title: Riesgos de entidad
---
## Descripción general {#overview}

[Cloud SIEM's Entity Risks][4] consolida múltiples fuentes de datos, como amenazas de SIEM y Cloud Security insights, en un perfil que representa una única entidad de seguridad, como un usuario de IAM.

<div class="alert alert-info">Entity Risks se conocía anteriormente como Risk Insights.</div>

Con Entity Risks, usted puede:

- Explorar entidades, filtrándolas por atributos como proveedor de entidad, tipo de entidad, nombre de entidad, [gravedad de la puntuación de riesgo](#risk-scoring), puntuación de riesgo y riesgos de configuración.
- Ver todos los datos relevantes para una entidad, como señales, configuraciones erróneas y riesgos de identidad.
- Agrupar riesgos por identidad de usuario para ver una fila por persona, con su riesgo total en cada cuenta a través de la cual actúan.
- Configure notificaciones para que pueda abordar las entidades de riesgo, o las personas de riesgo, a medida que surjan.
- Realice el triaje de elementos relevantes de forma masiva.
- Tome medidas de mitigación, como crear una supresión global o crear una incidencia para una entidad.

## Requisitos previos {#prerequisites}

- Para usar Entity Risks, configure al menos una de las siguientes fuentes de registro compatibles para enviar registros a Cloud SIEM, con una canalización activa de Open Cybersecurity Schema Framework (OCSF):
  - **Fuentes que proporcionan entidades de identidad y recursos** (como usuarios, identidades de servicio, roles asumidos, instancias de cómputo y contenedores de almacenamiento): AWS, Azure, GCP, GitHub, Microsoft 365 y Okta.
  - **Fuentes que proporcionan entidades de usuario identificadas por dirección de correo electrónico**: 1Password, Cisco Duo, Cloudflare, CrowdStrike, Google Workspace, JumpCloud, LastPass, Salesforce, Slack y Zscaler Internet Access (ZIA).
- Muchas fuentes compatibles utilizan una [canalización OCSF lista para usar][8] que no requiere configuración adicional. Si una fuente compatible no está generando entidades, confirme que su canalización OCSF lista para usar esté activa. Los pipelines anteriores al soporte de OCSF y las canalizaciones personalizadas pueden no incluir el procesamiento OCSF requerido.
- Datadog recomienda configurar un [Entity Pack][9] para su proveedor de identidad (Okta, Google Workspace o Microsoft Entra ID) en la página [Content Packs][10]. Cuando las identidades de usuario se sincronizan, Entity Risks resuelve las cuentas de cada persona en una única identidad de usuario y acumula su riesgo. Las notificaciones de identidad de usuario también estarán disponibles. Sin un [Entity Pack], las entidades solo se evalúan y se notifican de forma individual. Consulte [Riesgo agrupado por identidad de usuario](#risk-grouped-by-user-identity).
- (Opcional) Para visualizar los Cloud Security insights asociados en el panel de entidades, [Cloud Security debe estar configurado][2].


## Explorar Entity Risks {#explore-entity-risks}

### Consultar y filtrar entidades {#query-and-filter-entities}

En la página [Entity Risks][4], puede visualizar todas las entidades que tienen una puntuación de riesgo distinta de cero asociada a ellas.

{{< img src="security/entities/entities-explorer4.png" alt="La página Entity Risks que enumera los riesgos y sus puntuaciones, con una fila de identidad de usuario expandida para mostrar las entidades debajo de ella" style="width:100%;" >}}

### Riesgo agrupado por identidad de usuario {#risk-grouped-by-user-identity}

En un entorno federado, una persona normalmente actúa a través de muchas entidades separadas, como varios alias de correo electrónico, un usuario de IAM, roles asumidos y una cuenta de repositorio de código. Vistas de forma individual, ninguna de estas entidades muestra el riesgo total de esa persona.

Cuando configura un [Entity Pack][9] para su proveedor de identidad, Cloud SIEM sincroniza las identidades de usuario de ese proveedor. Luego, resuelve las entidades que pertenecen a cada una. Las entidades que se resuelven en una sola persona se agrupan bajo una única fila de identidad de usuario, nombrada según esa persona. La puntuación de riesgo de esa fila es la suma de las puntuaciones de riesgo de las entidades debajo de ella. La agrupación se aplica automáticamente siempre que se conecta un proveedor de identidad.

Para investigar una identidad de usuario:

1. En [Entity Risks][4], busque una fila con una flecha de expansión y un recuento de entidades asociadas.
1. Haga clic en la flecha para expandir la fila y ver cada entidad resuelta para esa identidad de usuario, junto con su propia puntuación de riesgo, tipo, fuente y recuento de señales.
1. Haga clic en una entidad para abrir su panel lateral y continuar investigando, como se describe en [Cree rápidamente contexto sobre una entidad](#quickly-build-context-on-an-entity).

<div class="alert alert-info">Entity Risks solo agrupa las entidades que se resuelven de forma inequívoca en una identidad de usuario. Las entidades que no pueden resolverse en una sola identidad siguen apareciendo como filas individuales, por lo que la misma persona aún puede aparecer más de una vez.</div>

### Cree rápidamente contexto sobre una entidad {#quickly-build-context-on-an-entity}

Haga clic en una entidad en [Entity Risks][4] para abrir el panel lateral de la entidad.

{{< img src="security/entities/entity-side-panel4.png" alt="El panel lateral de una entidad, que muestra el resumen de What Happened y la lista de contribuyentes al riesgo" style="width:90%;" >}}

La sección {{< ui >}}What Happened{{< /ui >}} del panel resume el recuento de señales, configuraciones erróneas y riesgos de identidad y cómo han contribuido a la puntuación de riesgo, así como cualquier riesgo de configuración potencial.

La sección {{< ui >}}Risk Contributors{{< /ui >}} muestra la lista de señales activadas, configuraciones erróneas relevantes y riesgos de identidad.

Las secciones {{< ui >}}What Happened{{< /ui >}} y {{< ui >}}Risk Contributors{{< /ui >}} incluyen solo las señales, configuraciones erróneas y riesgos de identidad que contribuyen con puntos a la puntuación de riesgo de la entidad. Para ver todas las señales asociadas con la entidad, incluidas las que no afectan la puntuación, haga clic en {{< ui >}}View All Related Signals{{< /ui >}}; para configuraciones erróneas y riesgos de identidad, haga clic en {{< ui >}}View in Vulnerability Explorer{{< /ui >}}.

### Realice el triaje y mitigue amenazas de forma masiva {#triage-and-mitigate-threats-in-bulk}

La sección {{< ui >}}Risk Contributors{{< /ui >}} del panel lateral de la entidad incluye los pasos de mitigación disponibles. Seleccione los elementos sobre los que desea actuar y, a continuación, utilice las acciones integradas para establecer un estado de triaje, asignar un elemento, crear una incidencia, declarar un incidente o crear una supresión.

## Configure notificaciones para Entity Risks {#configure-notifications-for-entity-risks}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Las reglas de notificación no son compatibles con el {{< region-param key="dd_site_name" >}} sitio.</div>
{{< /site-region >}}

Puede configurar Datadog para que le envíe notificaciones tan pronto como detecte nuevas amenazas que coincidan con sus criterios.

1. Navegue a la página {{< ui >}}Create a new Entity Risk notification{{< /ui >}}. Hay dos formas de hacerlo:
   - En Datadog, vaya a la página [Entity Risks][4] y, a continuación, haga clic en {{< ui >}}Create Notification Rule{{< /ui >}}.
   - En Datadog, vaya a {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}. En {{< ui >}}Products{{< /ui >}}, en la sección {{< ui >}}Cloud SIEM{{< /ui >}}, haga clic en [{{< ui >}}Entity Risks{{< /ui >}}][7]; luego, en {{< ui >}}Notification rules{{< /ui >}}, haga clic en {{< ui >}}New notification rule{{< /ui >}}.
1. En {{< ui >}}Group risk by{{< /ui >}}, elija lo que mide la regla:
   - {{< ui >}}Individual entity{{< /ui >}}: La regla evalúa la propia puntuación de riesgo de cada entidad.
   - {{< ui >}}User identity{{< /ui >}}: La regla evalúa la puntuación de riesgo acumulada de una identidad de usuario, la cual suma las puntuaciones de cada entidad resuelta para esa persona. Esta opción está disponible después de configurar un [Entity Pack] y de que las identidades de usuario se estén sincronizando. Consulte [Notificar sobre el riesgo acumulado de la identidad de usuario](#notify-on-rolled-up-user-identity-risk).
   <div class="alert alert-warning">No puede cambiar la agrupación de una regla después de crearla. Para usar una agrupación diferente, cree otra regla.</div>
1. En {{< ui >}}Define entity attributes{{< /ui >}}, especifique los atributos que deben activar las notificaciones cuando Datadog los detecte en una entidad. Junto a {{< ui >}}Entities matching{{< /ui >}}, comience a escribir los atributos y valores de la entidad. A medida que escribe, la tabla de vista previa muestra dinámicamente las entidades que coinciden con sus criterios.
   <div class="alert alert-info">Este paso es opcional, pero si no ingresa ningún atributo, la notificación enviará alertas de forma predeterminada para todas las entidades.</div>
1. En {{< ui >}}Set notification conditions{{< /ui >}}, establezca la condición de activación según la gravedad de la entidad o el valor de la puntuación de riesgo:
   - {{< ui >}}Entity severity{{< /ui >}}: Activa una notificación cuando una entidad alcanza un determinado nivel de gravedad. Seleccione un operador y, a continuación, seleccione un nivel de gravedad. Para conocer la puntuación de riesgo que corresponde a cada nivel de gravedad, consulte [Umbrales de gravedad de entidad](#entity-severity-thresholds).
   - {{< ui >}}Risk score value{{< /ui >}}: Activa una notificación cuando la puntuación de riesgo de la entidad supera un umbral especificado. Especifique el umbral para las notificaciones.
1. En {{< ui >}}Configure notification{{< /ui >}}, ingrese un nombre para la notificación, agregue un cuerpo de mensaje personalizado y especifique los destinatarios a quienes enviarla.
   - Opcionalmente, también puede activar las renotificaciones y especificar el período de tiempo que debe transcurrir antes de que Datadog vuelva a notificar a los destinatarios que la entidad aún cumple con los criterios que especificó.
1. Para verificar su configuración, haga clic en {{< ui >}}Test Notification{{< /ui >}} para enviar una notificación de prueba a los destinatarios configurados.
1. Haga clic en {{< ui >}}Save Notification{{< /ui >}}.

### Notificar sobre el riesgo de identidad de usuario consolidado {#notify-on-rolled-up-user-identity-risk}

Una regla agrupada por {{< ui >}}User identity{{< /ui >}} le notifica cuando el riesgo total de un usuario en todas sus entidades supera un umbral. Esto le ayuda a identificar el riesgo que se distribuye entre varias entidades, donde ninguna entidad individual supera su umbral de entidad individual.

Las reglas agrupadas por identidad de usuario difieren de las reglas de entidad individual de las siguientes maneras:

- **Los atributos de coincidencia son atributos de usuario.** En lugar de atributos de entidad, usted consulta los atributos de la identidad de usuario resuelta, de manera consistente con lo que ve en User Inventory. Por ejemplo, puede realizar consultas por proveedor de identidad, tipo de usuario, departamento, cargo o ubicación de la oficina. La tabla de vista previa muestra las identidades de usuario coincidentes y sus puntuaciones de riesgo consolidadas.
- **Las condiciones evalúan la puntuación consolidada.** Al igual que con las reglas de entidad individual, puede activar una alerta según un nivel de gravedad de entidad o un valor de puntuación de riesgo, y se aplican los mismos [umbrales de gravedad de entidad](#entity-severity-thresholds). En ambos casos, la condición se evalúa con respecto a la puntuación de riesgo consolidada de la identidad de usuario en lugar de la puntuación de cualquier entidad individual.
- **Notifications se activan al cruzar el umbral.** Datadog le notifica cuando una identidad de usuario entra en el estado de superación del umbral, no en cada evaluación mientras permanezca por encima de este. Si una identidad de usuario ya está por encima del umbral cuando crea la regla, Datadog envía una notificación. Utilice las renotificaciones para recibir recordatorios mientras la identidad de usuario permanezca por encima del umbral.
- **El contenido del mensaje está centrado en el usuario.** Las variables de plantilla incluyen el nombre para mostrar de la identidad de usuario, el proveedor de identidad, la puntuación de riesgo consolidada, el número de entidades contribuyentes y las principales entidades contribuyentes con sus puntuaciones.
- **La notificación enlaza a User Inventory.** El enlace principal de la notificación abre el panel lateral de la identidad de usuario en User Inventory.

Las reglas agrupadas por identidad de usuario y las reglas agrupadas por entidad individual coexisten, y la lista de reglas etiqueta cada regla con su agrupación. Ambos tipos de reglas cuentan para el mismo límite de 100 reglas de notificación por organización.

## Puntuación de riesgo {#risk-scoring}

La puntuación de riesgo de una entidad aproxima el nivel de riesgo de la entidad durante los últimos 14 días de actividad. Datadog calcula la puntuación de riesgo a partir de las características de las señales asociadas a la entidad, como el nivel de gravedad de la señal y cuántas veces se ha activado la señal.

### Ver y personalizar los impactos de la puntuación de la señal {#view-and-customize-signal-score-impacts}

Cada señal tiene un impacto en la puntuación basado en su gravedad. Datadog asigna un número predeterminado de puntos a cada gravedad de señal. Para ver o anular los impactos de puntuación predeterminados para su organización, así como los impactos para las configuraciones incorrectas y los riesgos de identidad, vaya a la [página de configuración de Entity Risks][7].

Si cambia los impactos de la puntuación, Datadog los aplica inmediata y retroactivamente a todas las puntuaciones de riesgo de entidad existentes. Puede usar las puntuaciones actualizadas para evaluar el impacto de sus cambios en sus notificaciones de Entity Risks en el futuro, de modo que pueda reducir el ruido y aumentar la señal que proporcionan.

<div class="alert alert-info">El impacto de la puntuación de una señal dura 14 días, después de los cuales la puntuación cae a <code>0</code>.</div>

| Gravedad de la señal | Número de puntos |
|-----------------|------------------|
| `Critical`      | `100`            |
| `High`          | `50`             |
| `Medium`        | `5`              |
| `Low` y `Info`| `0`              |

### Umbrales de gravedad de entidad{#entity-severity-thresholds}

El umbral de gravedad de una entidad se calcula sumando el impacto de la puntuación de todas las señales asociadas con la entidad. Los mismos umbrales se aplican a una identidad de usuario: su gravedad se deriva de su puntuación de riesgo acumulada, que es la suma de las puntuaciones de riesgo de cada entidad resuelta a ella.

| Umbral de gravedad          | Puntuación de riesgo                                         |
|-----------------------------|----------------------------------------------------|
| `Critical`                  | Mayor o igual que `100`.                    |
| `High`                      | Mayor o igual que `50` y menor que `100`. |
| `Medium`                    | Mayor o igual que `25` y menor que `50`.  |
| `Low`                       | Mayor o igual que `10` y menor que `25`.  |
| `Info`                      | Menor que `10`.                                    |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://docs.datadoghq.com/es/security/cloud_security_management/setup
[3]: https://app.datadoghq.com/security
[4]: https://app.datadoghq.com/security/siem/entity-risks
[7]: https://app.datadoghq.com/security/configuration/siem/entity-risks
[8]: /es/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/#supported-out-of-the-box-ocsf-pipelines
[9]: /es/security/cloud_siem/ingest_and_enrich/entity_packs
[10]: /es/security/cloud_siem/ingest_and_enrich/content_packs