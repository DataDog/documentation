---
title: Facturación de contenedores
---

## Información general

Los contenedores son compatibles con los planes Pro y Enterprise. En función del plan que tengas, puedes monitorizar 5 o 10 contenedores gratis por cada licencia de host. El count de contenedores se calcula haciendo un promedio de toda tu infraestructura.

Los contenedores adicionales se facturan con un [coste extra][1] por contenedor y hora. Además, se pueden adquirir contenedores de prepago. Ponte en contacto con [Ventas][2] o con tu [asesor de clientes][3] para informarte sobre los contenedores para tu cuenta.

### Kubernetes

Kubernetes crea contenedores "pause" (se requiere el Agent v5.8 o posterior) para adquirir la dirección IP del pod correspondiente y configurar el espacio de nombres de red para el resto de contenedores que se unan a ese pod. Datadog no incluye ningún contenedor "pause" en tu cuota y no te cobra por ellos (para excluir este tipo de contenedores de AWS EKS, es necesario tener instalado el Agent v7.20 o posterior).

### Fargate

Fargate se cobra en función del número de tareas simultáneas. Para conocer los precios, consulta la sección [Infraestructura][4] de la página de precios.

### GKE Autopilot

Los entornos [GKE Autopilot][5] se facturan igual que los entornos [GKE Standard][6].

## Preguntas frecuentes

**¿Cómo calcula Datadog el uso bajo demanda por hora?**

Los contenedores se miden en incrementos de cinco minutos. La diferencia se calcula entre el número de contenedores observados y la cuota asignada a la cuenta. La cuota de la cuenta equivale al total de los contenedores incluidos (por defecto, 5/host para planes Pro y 10/host para Enterprise) y a cualquier otro contenedor contratado. El número de contenedores que supera esa cuota se obtiene haciendo un cálculo medio por hora para determinar el uso que se realiza bajo demanda cada hora. El promedio se calcula sumando cada incremento de cinco minutos por hora y dividiéndolo por doce. Este método permite normalizar el uso bajo demanda para paliar los picos a corto plazo y las variaciones entre hosts.

**¿Qué ocurre si un usuario ejecuta un número muy elevado de contenedores durante un breve periodo de tiempo?**

Si se aplica el cálculo del uso bajo demanda por hora anterior, en el caso de que se ejecuten 1200 contenedores bajo demanda durante un único intervalo de cinco minutos (1/12 de hora), la medida de estos contenedores será de 100 horas de contenedor (1200/12).

**¿Qué ocurre si los contenedores están distribuidos de forma desigual entre los hosts?**

Siempre que el número total de contenedores en ejecución no supere el total de la cuota asignada a la cuenta, se incluirán en el plan de infraestructura de la cuenta.

**Si se utilizan grupos de escalado automático, habrá horas punta y horas valle. ¿Cómo repercute esto en el uso de contenedores bajo demanda?**

Los cálculos del uso bajo demanda se realizan utilizando la cuota basada en el número de hosts de la infraestructura. Dado que los grupos de escalado automático aumentan el número de hosts durante las horas punta, la cuota total de contenedores también aumenta durante esos periodos.

**¿Los contenedores del Datadog Agent cuentan para la asignación?**

No, los contenedores de Datadog Agent no cuentan para tu asignación de 5 (nivel Pro) o 10 (nivel Enterprise).

**¿Se contabilizan los contenedores pertenecientes a pods en `CrashLoopBackoff` constante?**

Si un contenedor del pod está en ejecución durante más de diez segundos, se contabiliza en la cuota durante el intervalo de medición. Al tratarse de un pod no apto, los datos recogidos en estas situaciones son de gran utilidad para la resolución de problemas. Además, los datos se etiquetan con el nombre del pod, de modo que, cuando los contenedores subyacentes intentan volver a ejecutarse (como un nuevo `container_id` de cada vez), todo el contexto (como eventos relevantes y entradas de logs) se mantiene junto en la vista del pod.


## Solucionar problemas

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][7].

Si tienes alguna pregunta sobre facturación, ponte en contacto con tu [asesor de clientes][3].

[1]: https://www.datadoghq.com/pricing/#tab-faq-infrastructure
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://www.datadoghq.com/pricing/#section-infra
[5]: /es/agent/kubernetes/distributions/?tab=helm#autopilot
[6]: /es/integrations/google_kubernetes_engine/
[7]: /es/help/