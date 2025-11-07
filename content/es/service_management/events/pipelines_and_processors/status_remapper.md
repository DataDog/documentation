---
title: Reasignador de estados
---

Utiliza el procesador de reasignación de estados para asignar atributos como estado oficial a tus eventos. Por ejemplo, añade un nivel de gravedad del evento a tus eventos con el reasignador de estados.

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="Nivel de gravedad del log tras la reasignación" style="width:40%;" >}}

Cada valor de estado entrante se asigna de la siguiente manera:

* Los números enteros de 0 a 7 asignan según las [normas de gravedad de syslog][4].
* Las cadenas que empiezan por **emerg** o **f** (no distingue entre mayúsculas minúsculas) corresponden a **emergencia (0)**.
* Las cadenas que empiezan por **a** (sin distinción entre mayúsculas y minúsculas) asignan a **alert (1)**.
* Las cadenas que empiezan por **c** (sin distinción entre mayúsculas y minúsculas) asignan a **critical (2)**.
* Las cadenas que empiezan por **e** (sin distinción entre mayúsculas y minúsculas) que no coinciden con `emerg` asignan a **error (3)**
* Las cadenas que empiezan por **w** (sin distinción entre mayúsculas y minúsculas) asignan a **warning (4)**.
* Las cadenas que empiezan por **n** (sin distinción entre mayúsculas y minúsculas) asignan a **notice (5)**.
* Las cadenas que empiezan por **i** (sin distinción entre mayúsculas y minúsculas) asignan a **info (6)**.
* Las cadenas que empiezan por **d**, **trace** o **verbose** (sin distinguir mayúsculas de minúsculas) se asignan a **debug (7)**
* Las cadenas que empiezan por **o** o **s**, o que coinciden con **OK** o **Success** (no distingue entre mayúsculas minúsculas) se asignan a **ok**
* Todos los demás se asignan a **info (6)**.

**Nota**: Si se aplican varios procesadores de reasignadores de estados de eventos a un determinado evento en un pipeline, solo se tendrá en cuenta el primero en el orden del pipeline. Además, para todos los pipelines que coincidan con un evento, solo se aplicará el primer reasignador de estados encontrado (de todos los pipelines aplicables).

Reasignador de estados de ejemplo 

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="Reasignación de la gravedad de logs" style="width:60%;" >}}