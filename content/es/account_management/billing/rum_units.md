---
beta: true
private: true
title: Detalles de facturación de RUM
---

<div class="alert alert-warning">
Las funciones que se mencionan esta página están en fase beta privada. Ponte en contacto con tu asesor de clientes para obtener más información.
</div>

Una **sesión** es el recorrido que hace un usuario por tu aplicación web. Caduca tras 15 minutos de inactividad o tras 4 horas de actividad continua.

**Mobile RUM Session** (Sesión RUM para móvil): Datadog recopila todas las pantallas visitadas por los usuarios finales en tus aplicaciones para móviles (Android, iOS, React Native), junto con la telemetría importante: errores y fallos de móviles y carga de recursos (XHR, imágenes, archivos CSS, scripts JS, etc). Todo esto se incluye en la sesión RUM para móvil.

**RUM Lite Session** (Sesión RUM reducida): Datadog recopila todas las páginas visitadas por los usuarios finales en tus aplicaciones de navegador, junto con la telemetría importante: errores de frontend y métricas de rendimiento. Todo esto se incluye en la sesión RUM reducida.

**RUM Replay Session** (Sesión de reproducción de RUM): Datadog recopila todas las páginas visitadas por los usuarios finales en tus aplicaciones de navegador, junto con la telemetría importante: errores de frontend, métricas de rendimiento, carga de recursos (XHR, imágenes, archivos CSS, scripts JS, etc). Además, puedes recopilar una reproducción de las acciones de tus usuarios al representar su experiencia en formato de película. Todo esto se incluye en la sesión de reproducción de RUM.