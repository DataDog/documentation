---
title: Facturación de contenedores
---

## Información general

Los contenedores son compatibles con los planes Pro y Enterprise. En función del plan que tengas, puedes monitorizar 5 o 10 contenedores gratis por cada licencia de host. El recuento de contenedores se calcula haciendo un promedio de toda tu infraestructura.

Los contenedores adicionales se cobran con un [coste extra][1] por contenedor y hora. Además, se pueden adquirir contenedores de prepago. Ponte en contacto con [Ventas][2] o con tu gestor de [satisfacción del cliente][3] para informarte sobre los contenedores para tu cuenta.

Para limitar los contenedores monitorizados con Datadog, consulta [Gestión de la detección de contenedores][8].

### Kubernetes

Kubernetes crea contenedores "pause" (se requiere el Agent v5.8 o posterior) para adquirir la dirección IP del pod correspondiente y configurar el espacio de nombres de red para el resto de contenedores que se unan a ese pod. Datadog no incluye ningún contenedor "pause" en tu cuota y no te cobra por ellos (para excluir este tipo de contenedores de AWS EKS es necesario el Agent v7.20 o posterior).

### Fargate

Fargate se cobra en función del número de tareas monitorizadas concurrentes en ECS Fargate y del número de pods monitorizados concurrentes para EKS Fargate. Para conocer los precios, consulta la sección [infraestructura][4] de la página de precios.

### GKE Autopilot

Los entornos [GKE Autopilot][5] se facturan igual que los entornos [GKE Standard][6].

## Preguntas frecuentes

**¿Cómo calcula Datadog el uso a demanda por hora?**

Los contenedores se miden por intervalos de cinco minutos. La diferencia se calcula entre el número de contenedores observados y la asignación de la cuenta. La asignación de la cuenta es el total de los contenedores incluidos (5/host para Pro y 10/host para Enterprise por defecto) y cualquier compromiso contratado de contenedor.

En primer lugar, los incrementos de uso de cinco minutos se promedian a lo largo de la hora, dividiendo el uso total por doce. En segundo lugar, se deduce la asignación de cada hora. Por último, el consumo total bajo demanda es la suma del consumo bajo demanda de cada hora. Este método normaliza el uso bajo demanda para los picos a corto plazo y las variaciones entre hosts.

**¿Qué ocurre si un usuario ejecuta un número muy elevado de contenedores durante un breve periodo de tiempo?**

Si se aplica el cálculo del uso a demanda por hora anterior, en el caso de que se ejecuten 1200 contenedores a demanda durante un único intervalo de cinco minutos (1/12 sobre una hora), estos contenedores se contabilizarán como 100 horas de contenedor (1200/12).

**¿Qué ocurre si los contenedores están distribuidos de forma desigual entre los hosts?**

Siempre que el número total de contenedores en ejecución no supere el total de la cuota asignada a la cuenta, se incluirán en el plan de infraestructuras de la cuenta.

**Si se utilizan grupos de escalado automático habrá horas punta y horas valle. ¿Cómo repercute esto en el uso de contenedores a demanda?**

Los cálculos del uso a demanda se realizan utilizando la cuota basada en el número de hosts de la infraestructura. Dado que los grupos de escalado automático aumentan el número de hosts durante las horas punta, la cuota total de contenedores también aumenta durante esos periodos.

**¿Los contenedores del Datadog Agent cuentan para la asignación?**

No, los contenedores de Datadog Agent no cuentan para tu asignación de 5 (nivel Pro) o 10 (nivel Enterprise).

**¿Se contabilizan los contenedores pertenecientes a pods en `CrashLoopBackoff` constante?**

Si un contenedor del pod está en ejecución durante más de diez segundos, se descuenta de la cuota durante el intervalo de contabilización. Al tratarse de un pod no apto, los datos recogidos en estas situaciones son de gran utilidad para la resolución de problemas. Además, los datos se etiquetan con el nombre del pod, de modo que cuando los contenedores subyacentes intentan volver a ejecutarse (cada vez como un nuevo `container_id`) todo el contexto (como eventos relevantes y entradas de logs) se mantiene junto en la vista del pod.


## Solucionar problemas

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][7].

Si tienes preguntas sobre facturación, ponte en contacto con tu [asesor de clientes][3].

[1]: https://www.datadoghq.com/pricing/#tab-faq-infrastructure
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://www.datadoghq.com/pricing/#section-infra
[5]: /es/agent/kubernetes/distributions/?tab=helm#autopilot
[6]: /es/integrations/google_kubernetes_engine/
[7]: /es/help/
[8]: /es/containers/guide/container-discovery-management