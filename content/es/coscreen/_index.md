---
cascade:
  algolia:
    rank: 70
description: Utiliza CoScreen para reuniones de colaboración y uso compartido de pantallas.
  CoScreen está diseñado para casos de uso en ingeniería como la programación por
  parejas y la gestión de incidentes.
further_reading:
- link: https://www.datadoghq.com/blog/collaborative-screen-sharing-with-datadog-coscreen/
  tag: Blog
  text: Aprovechar la posibilidad de compartir pantallas de forma colaborativa con
    Datadog CoScreen
title: CoScreen
---

{{< img src="coscreen/collab-v2.mp4" alt="Tres usuarios comparten tres ventanas al mismo tiempo." width=80% vídeo="true">}}

## Información general
[CoScreen][1] es una herramienta colaborativa para reuniones que permite a varios participantes compartir e interactuar simultáneamente con cualquier ventana de aplicación en sus escritorios. Se ha diseñado específicamente para casos de uso en ingeniería, como la programación en parejas, la gestión de incidentes, la resolución conjunta de problemas, las reuniones de equipo y la incorporación de empleados.

## Configuración
#### Requisitos
{{< tabs >}}
{{% tab "Escritorio" %}}
La aplicación de escritorio CoScreen está disponible para Windows v10 y macOS v10.15 Catalina y posterior.

[Descarga CoScreen][1].

Tras instalar CoScreen, inicia la aplicación de escritorio. Puedes iniciar sesión con tu cuenta de Datadog.

[1]: https://www.coscreen.co/download
{{% /tab %}}
{{% tab "Web" %}}
La [aplicación web CoScreen][1] es compatible con Chrome v87, Edge v87 y Safari v16 o sus versiones posteriores.

La aplicación web CoScreen tiene una funcionalidad limitada. Para aprovechar al máximo las funciones de CoScreen, utiliza la aplicación de escritorio.

[1]: https://app.coscreen.co/
{{% /tab %}}
{{< /tabs >}}

## Utilización
### Unirse a CoScreen

Si te han invitado a un CoScreen, haz clic en el enlace. Puedes hacer clic en **Join from browser** (Unirse desde el navegador) para unirte a CoScreen a través de la aplicación web o puedes iniciar la aplicación de escritorio. También puedes unirte manualmente introduciendo el enlace o el ID de la reunión.

Cuando te unes a una CoScreen, esta se añade a tu lista de _CoScreens recientes_ en el menú principal. Puedes volver a unirte a cualquiera de ellas en cualquier momento.

Para activar la reducción de ruido en la aplicación de escritorio, ve a **Configuración** > **Audio** y selecciona _Aplicar reducción de ruido a mi micrófono_.

En macOS, puedes activar el desenfoque del fondo en **Configuración** > **Cámara** > **Efectos de vídeo**.

### Invitar a tus colaboradores

Invita a tus colaboradores compartiendo el enlace.

También puedes añadir a tus colaboradores más cercanos a la lista de _Tus colaboradores_ en el menú principal. Una vez que un colaborador acepte tu solicitud, podrás ver si está conectado y disponible y llamarlo con un clic.

### Compartir ventanas

Con la aplicación de escritorio CoScreen, puedes compartir ventanas de aplicaciones de varias maneras.

#### Seleccionar la ventana individual que se quiere compartir

{{< img src="coscreen/sharewindow2.mp4" alt="En la parte superior de una ventana aparece un botón con forma de pestaña 'Compartir ventana'. Al hacer clic en este botón, la ventana se resalta en color púrpura. El texto cambia a 'Dejar de compartir ventana'." width=50% vídeo="true">}}

Una vez que te hayas unido a una CoScreen, puedes pasar el ratón por encima de cualquier ventana de cualquiera de tus visualizaciones y aparecerá la pestaña **Compartir**. Puedes compartir y dejar de compartir ventanas haciendo clic en esta pestaña. También puedes utilizar el cuadro de diálogo para compartir ventanas para seleccionar la(s) ventana(s) de la aplicación que quieres compartir con otros miembros de la CoScreen a la que te hayas unido.

Varios usuarios pueden compartir varias ventanas al mismo tiempo. Las ventanas compartidas tienen un borde alrededor, de un color diferente asignado a cada participante de CoScreen.

#### Uso del cuadro de diálogo para compartir ventanas para compartir visualizaciones enteras o ventanas individuales

Haz clic en el botón **Share windows** (Compartir ventanas) para abrir el cuadro de diálogo para compartir ventanas.

{{< img src="coscreen/share_windows_button.png" alt="Panel de botones de la interfaz de usuario del escritorio de CoScreen. El botón **Share windows** (Compartir ventanas) está resaltado" style="width:50%;">}}

Si tienes varias visualizaciones, puedes seleccionar una y hacer clic en **Share the entire display** (Compartir toda la visualización) para compartir todas las pantallas abiertas en esa visualización. Mientras la opción de compartir pantallas esté activada, todas las ventanas que abras o arrastres a la visualización compartida también se compartirán.

También puedes seleccionar cualquier número de ventanas en cualquiera de tus visualizaciones para compartirlas.

La opción de compartir pantallas está desactivada por defecto cuando te unes a una CoScreen.

### Colaborar en ventanas compartidas

{{< img src="coscreen/v5-control-tabs.mp4" alt="Dos cursores interactúan con una ventana compartida al mismo tiempo." video="true" width=70% >}}

Puedes ver los punteros del ratón de los participantes remotos siempre que muevan sus punteros sobre una ventana compartida. Al visualizar una ventana remota, aparecen dos pestañas: **Control**, que te permite interactuar con la ventana, hacer clic en los botones y escribir en los campos de texto; y **Dibujar**, que te permite dibujar en la ventana.

### Colaborar en un terminal compartido

CoScreen incluye un terminal compartido y colaborativo que permite a los usuarios ejecutar comandos y escribir y depurar código juntos.

Para iniciar un terminal compartido, haz clic en el botón **Share terminal** (Compartir terminal) del menú de la reunión:

{{< img src="coscreen/share_terminal.png" alt="Panel de botones de la interfaz de usuario del escritorio de CoScreen. El botón **Share terminal** (Compartir terminal) está resaltado." style="width:70%;">}}

Ahora, tú y todos los demás participantes en la sesión de CoScreen pueden visualizar el terminal compartido. Si activas el control remoto en CoScreen, otros usuarios podrán escribir y hacer clic en tu terminal.

{{< img src="coscreen/coterm.png" alt="Ventana compartida del terminal CoScreen." style="width:60%;">}}

Para dejar de compartir, haz clic en la pestaña **Dejar de compartir** en la ventana del terminal o en el botón del menú de la reunión. 

En cuanto a la privacidad, CoScreen utiliza [Sensitive Data Scanner][8] y filtros de entropía para detectar y ocultar los datos sensibles.

### Integraciones

Puedes integrar CoScreen con Slack, Google Calendar, VS Code y otras aplicaciones. [Consulta todas las integraciones CoScreen.][3]

#### CoScreen + Slack

Para instalar la aplicación Slack en CoScreen, ve a [coscreen.co/slack][4] y haz clic en _Add to Slack_ (Añadir a Slack). Para activar CoScreen en canales privados, escribe `@coscreen`, pulsa Intro/Return y haz clic en _Invite to Channel_ (Invitar al canal). Para activar CoScreen en DM multiusuario, ve a _Ver lista de miembros_ -> _Añadir personas_ -> _CoScreen_.

#### CoScreen + Google Calendar

Para configurar esta integración, instala la [extensión CoScreen Chrome][5] e inicia sesión. Abre cualquier evento de Google Calendar y utiliza el botón **Add CoScreen** (Añadir CoScreen) para convertir el evento en una reunión de CoScreen.

#### CoScreen + Gestión de incidentes de Datadog

En [Gestión de incidentes][9], utiliza el botón **Meet on CoScreen** (Reunirse en CoScreen) para iniciar una reunión de CoScreen con los responsables del incidente. Para configurarlo, ve a la página [Configuración de la integración de Gestión de incidentes][10] y activa la opción **Activar los botones para unirse a la reunión de CoScreen**.

## Seguridad y privacidad

 - **Seguridad de red**

CoScreen utiliza una conexión P2P (peer-to-peer) siempre que tú y otro participante puedan conectarse directamente (por ejemplo, cuando no hay cortafuegos corporativos o proxies entre ustedes). Ninguna de sus entradas de audio, vídeo, ventana o control entra en contacto con los servidores de CoScreen. Las conexiones se cifran de extremo a extremo mediante DTLS-SRTP. Si hay tres o más usuarios en una sesión, la conexión se realiza a través de un puente de vídeo.

 - **Infraestructura de vídeo**

Los participantes colaboran a través de una infraestructura de vídeo compatible con HIPAA y de nivel empresarial con cientos de servidores que ejecutan el framework Jitsi. Todos los datos de vídeo se cifran mediante DTLS-SRTP durante la transmisión.


 - **Almacenamiento de datos**

CoScreen no graba ni almacena ninguna información compartida (por ejemplo, ventanas compartidas, audio, vídeo o entradas de control remoto).

CoScreen captura datos generales de uso, como las funciones utilizadas de la aplicación y las estadísticas de sesión, para conocer los errores y los patrones de uso. CoScreen nunca registra ni accede a pantallas compartidas ni a entradas de control, aparte de permitirte intercambiar contenido de ventanas y controles con tus compañeros. Para obtener más información, consulta la [política de privacidad de CoScreen][6].

Para conocer todos los detalles sobre cómo CoScreen permite una colaboración segura, consulta la [documentación técnica de seguridad de CoScreen][7].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://coscreen.co/
[2]: https://www.coscreen.co/download
[3]: https://www.coscreen.co/integrations
[4]: https://coscreen.co/slack
[5]: https://chrome.google.com/webstore/detail/coscreen/pahmjnapohdeedmdhmbeddgmhebhegme
[6]: https://www.datadoghq.com/legal/privacy/
[7]: https://www.coscreen.co/security
[8]: /es/security/sensitive_data_scanner/
[9]: /es/incident_response/incident_management/
[10]: https://app.datadoghq.com/incidents/settings#Integrations