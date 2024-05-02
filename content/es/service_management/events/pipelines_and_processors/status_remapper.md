---
kind: Documentación
title: Reasignador de estados
---

Utiliza el procesador de reasignación de estados para asignar atributos como estado oficial a tus eventos. Por ejemplo, añade un nivel de gravedad del evento a tus eventos con el reasignador de estados.

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="Gravedad del log después de la reasignación" style="width:40%;" >}}

Cada valor de estado entrante se asigna de la siguiente manera:

* Los números enteros del 0 al 7 corresponden a los [estándares de gravedad de Syslog][4]
* Las cadenas que empiezan por **emerg** o **f** (sin distinguir mayúsculas de minúsculas) se asignan a **emerg (0)**
* Las cadenas que empiezan por **a** (sin distinguir mayúsculas de minúsculas) se asignan a **alert (1)**
* Las cadenas que empiezan por **c** (sin distinguir mayúsculas de minúsculas) se asignan a **critical (2)**
* Las cadenas que empiezan por **e** (sin distinguir mayúsculas de minúsculas), que no coinciden con `emerg`, se asignan a **error (3)**
* Las cadenas que empiezan por **w** (sin distinguir mayúsculas de minúsculas) se asignan a **warning (4)**
* Las cadenas que empiezan por **n** (sin distinguir mayúsculas de minúsculas) se asignan a **notice (5)**
* Las cadenas que empiezan por **i** (sin distinguir mayúsculas de minúsculas) se asignan a **info (6)**
* Las cadenas que empiezan por **d**, **trace** o **verbose** (sin distinguir mayúsculas de minúsculas) se asignan a **debug (7)**
* Las cadenas que empiezan por **o** o **s**, o que coinciden con **OK** o **Success** (sin distinguir mayúsculas de minúsculas) se asignan a **OK**
* Todas los demás se asignan a **info (6)**.

**Nota**: Si se aplican varios procesadores de reasignación de estados de eventos a un evento determinado en el pipeline, solo se tiene en cuenta el primero (según el orden del pipeline).

Reasignador de estados de ejemplo 

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="Reasignación de la gravedad del log" style="width:60%;" >}}