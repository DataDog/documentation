---
is_beta: false
title: Optimizar y solucionar problemas de CoScreen
---

### ¿Por qué se degrada la calidad del audio cuando utilizo el micrófono de mis auriculares Bluetooth como entrada en CoScreen, Zoom y otras herramientas?

Si estás utilizando auriculares Bluetooth, la calidad de la reproducción puede degradarse cuando seleccionas el micrófono de tus auriculares como dispositivo de entrada de audio. Puedes notarlo si reproduces audio (por ejemplo, un vídeo de YouTube) mientras estás en una sesión de CoScreen. Esto puede ocurrir porque los auriculares Bluetooth pasaron a utilizar un perfil Bluetooth diferente.

Cuando sólo se reproduce audio, los auriculares Bluetooth suelen utilizar el [perfil A2DP][2], que está optimizado para una alta calidad de audio, pero no admite el uso del micrófono. Si eliges el micrófono de tus auriculares como entrada de audio (por ejemplo, durante una sesión de CoScreen o una reunión de Zoom), los auriculares cambian a un perfil diferente, normalmente [HFP][3] o [HSP][4], que admiten el uso del micrófono, pero tienen una calidad de sonido inferior. La mayoría de los auriculares Bluetooth sólo pueden utilizar un perfil a la vez.

Para evitar este problema, puedes utilizar una entrada de audio diferente, como el micrófono integrado del portátil. Es posible que tengas que reiniciar la aplicación para recuperar un audio de alta calidad.

### ¿Cómo puedo optimizar la calidad de la pantalla compartida y la latencia del mando a distancia?

Puedes influir en algunos factores clave de la calidad de la ventana que tú y tus compañeros compartís.

#### Ancho de banda y estabilidad de red

* Asegúrate de que todos los participantes disponen de una conexión a Internet rápida y estable, con al menos 5 Mbps de subida y bajada.
* Asegúrate de que tu sistema no tiene una pérdida de paquetes superior al 2 por ciento. Las vídeoconferencias se vuelven inestables por encima de ese umbral, independientemente del proveedor. Ejecuta un [test de pérdida de paquetes][1]. Si observas problemas, prueba a reiniciar el router o el módem, acércate más al router o haz el test con una conexión a Internet alternativa.
* CoScreen funciona más rápido si sólo dos participantes pueden conectarse de igual a igual (es decir, directamente, sin que haya un proxy corporativo o un cortafuegos entre ellos). Cuando hay tres o más participantes, o no puede establecerse una conexión directa, el tráfico se dirige a través de una infraestructura de vídeo distribuida globalmente, lo que garantiza la conectividad en cualquier circunstancia.

#### Resolución de pantalla
CoScreen admite el uso compartido de pantallas de alta resolución, incluso si tú y tus compañeros tenéis resoluciones de pantalla ultra altas de 4k o superiores. Asegúrate de que tu ancho de banda de red y tu CPU pueden soportar la carga correspondiente. Si surgen problemas, probad con resoluciones más bajas en ambos extremos.

#### CPU
Compartir ventanas puede ocupar hasta el 60 por ciento de un núcleo de CPU en sistemas antiguos, ya que CoScreen las captura con una calidad mucho mayor que muchas otras herramientas. Comprueba tu asignación de CPU.

### Cortafuegos y SSL
Si tu organización utiliza un cortafuegos corporativo o una inspección SSL, es posible que el cliente CoScreen no pueda conectarse al servidor CoScreen y, por tanto, no pueda establecer una conexión entre tú y los miembros de tu equipo. Ponte en contacto con el servicio de asistencia para obtener una lista de direcciones URL permitidas.

### Solucionar problemas en macOS

#### La interfaz de usuario del panel lateral aparece en gris y nunca se establece una conexión.

Es posible que te encuentres con un problema en el que la interfaz de usuario se queda atascada en la fase de unión en gris, pero que nunca recibas el cuadro de diálogo "No se puede conectar a CoScreen". Esto se debe a que CoScreen espera residir en un único escritorio no fijo. Este problema puede producirse si configuraste la aplicación para que resida específicamente en más de un escritorio.

Para resolver este problema:

1. Haz clic con el botón derecho del ratón en el icono de la aplicación CoScreen y ve a _Opciones_.
2. Asegúrate de que _Asignar a_ está en _Ninguno_.
3. Sal de _Opciones_ y vuelve a CoScreen.

{{< img src="coscreen/assign-to-none.png" alt="Captura de pantalla de la barra de inicio de macOS. Al hacer clic con el botón derecho del ratón en CoScreen aparece un menú y al pasar el cursor del ratón sobre 'Opciones' se abre un segundo menú. En 'Asignar a', el usuario seleccionó 'Ninguno.'" style="width:60%;" >}}

### Solucionar problemas en Windows

#### ¿Cómo funciona CoScreen con el modo administrador de Windows?

Si ejecutas CoScreen en modo administrador y compartes una aplicación que también se inició en modo administrador, todos los usuarios remotos podrán controlar la ventana compartida. Sin embargo, si ejecutas CoScreen en modo no administrador y compartes una aplicación que se inició en modo administrador, los usuarios remotos no podrán controlar esa ventana.

#### La interfaz de usuario de CoScreen parece pequeña

Si la interfaz de usuario de CoScreen parece más pequeña que otras aplicaciones de tu ordenador Windows, esto está relacionado con el factor de escala configurado en los parámetros de pantalla y con la forma en que interactúa con CoScreen. Puedes reducir el factor de escala y la resolución de tu pantalla para mejorar la experiencia.

#### Mi voz es difícil de entender o suena robótica

Algunos dispositivos utilizan una función de reconocimiento de voz de Realtek que puede hacer que tu voz suene robótica cuando utilizas CoScreen. Si tienes problemas con la calidad de audio de tu voz, abre la consola de audio de Realtek y desactiva la opción **Reconocimiento de voz** para ver si la situación mejora.

{{< img src="coscreen/windows_screenshot.png" alt="Captura de pantalla de un diálogo de Windows sobre la consola de audio de Realtek. El interruptor 'Reconocimiento de voz' está desactivado" style="width:70%;" >}}

[1]: https://packetlosstest.com/
[2]: https://www.bluetooth.com/specifications/specs/advanced-audio-distribution-profile-1-4/
[3]: https://www.bluetooth.com/specifications/specs/hands-free-profile/
[4]: https://www.bluetooth.com/specifications/specs/headset-profile-1-2/