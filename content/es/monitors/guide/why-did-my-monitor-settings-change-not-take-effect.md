---
aliases:
- /es/monitors/faq/why-did-my-monitor-settings-change-not-take-effect
kind: Guía
title: Monitorizar cambios de configuración que no surten efecto
---

Datadog mantiene los grupos de monitores disponibles en la interfaz de usuario durante 24 horas, a menos que se modifique la consulta. Los monitores de host y los checks de servicios que notifican en los casos *Sin datos* están disponibles durante 48 horas. Si no tienes activada la configuración de alerta *Sin datos* y tu grupo para un monitor de métricas deja de notificar datos, el grupo permanece en la página de estado del monitor hasta que se agota, aunque ese grupo deje de ser evaluado tras una breve ausencia. El tiempo específico de permanencia del grupo depende de tu configuración.

Sin embargo, en el caso de monitores de eventos, Datadog también conserva los grupos para las evaluaciones durante al menos 24 horas. Esto significa que si se actualiza un monitor y se cambian los grupos en la consulta, es posible que algunos grupos antiguos permanezcan. Si necesitas cambiar la configuración de los grupos en tu monitor de eventos, puede que quieras clonar o crear un nuevo monitor que refleje tus nuevos grupos. También puedes silenciarlos, si quieres conservar el monitor pero silenciar cualquier alerta que pueda resultar de los cambios.