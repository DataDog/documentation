En la sección **Content anomaly detection options** (Opciones de detección de anomalías de contenido), especifica los parámetros para evaluar si un log es anómalo o no.
- La detección de anomalías en el contenido equilibra la precisión y la sensibilidad utilizando varios parámetros de reglas que puedes configurar:
    1. Umbral de similitud: Define cuán disímil debe ser un valor de campo para ser considerado anómalo (por defecto: `70%`).
    1. Mínimo de elementos similares: Define cuántos logs históricos similares deben existir para que un valor se considere normal (por defecto: `1`).
    1. Intervalo de evaluación: El marco temporal durante el cual las anomalías se contabilizan para una señal (por ejemplo, un marco temporal de 10 minutos).
- Estos parámetros ayudan a identificar el contenido del campo que es inusual y raro, filtrando las variaciones menores o comunes.
- Consulta [Parámetros de detección de anomalías][601] para obtener más información.

[601]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/content_anomaly/#anomaly-detection-parameters