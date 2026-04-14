---
aliases:
- /es/integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
title: SNMP de uso común y OIDs compatibles
---

Para los dispositivos de Cisco, puedes utilizar el comando:

```text
show snmp-server oidlist
```

Para ver los OIDs disponibles para tu sistema, inicia sesión en tu cuenta de Cisco y busca en el navegador de objetos: http://tools.cisco.com/Support/SNMP/do/BrowseOID.do?local=en

OIDs de Linux (también suelen funcionar para dispositivos de red como F5)

## Estadísticas

### CPU

* Carga de 1 minuto: .1.3.6.1.4.1.2021.10.1.3.1
* Carga de 5 minutos: .1.3.6.1.4.1.2021.10.1.3.2
* Carga de 15 minutos: .1.3.6.1.4.1.2021.10.1.3.3
* porcentaje de tiempo de CPU del usuario: .1.3.6.1.4.1.2021.11.9.0
* tiempo de cpu usuario sin formato: .1.3.6.1.4.1.2021.11.50.0
* porcentajes de tiempo de CPU del sistema: .1.3.6.1.4.1.2021.11.10.0
* tiempo de cpu del sistema sin formato: .1.3.6.1.4.1.2021.11.52.0
* porcentajes de tiempo de CPU inactivo: .1.3.6.1.4.1.2021.11.11.0
* tiempo de cpu inactivo sin formato: .1.3.6.1.4.1.2021.11.53.0
* tiempo de cpu positivo sin formato: .1.3.6.1.4.1.2021.11.51.0

### Memoria

* Tamaño total de intercambio: .1.3.6.1.4.1.2021.4.3.0
* Espacio de intercambio disponible: .1.3.6.1.4.1.2021.4.4.0
* RAM total en la máquina: .1.3.6.1.4.1.2021.4.5.0
* RAM total utilizada: .1.3.6.1.4.1.2021.4.6.0
* RAM total libre: .1.3.6.1.4.1.2021.4.11.0
* RAM total compartida: .1.3.6.1.4.1.2021.4.13.0
* RAM total en búfer: .1.3.6.1.4.1.2021.4.14.0
* Memoria caché total: .1.3.6.1.4.1.2021.4.15.0

### Disco

* Ruta donde está montado el disco: .1.3.6.1.4.1.2021.9.1.2.1
* Ruta del dispositivo para la partición: .1.3.6.1.4.1.2021.9.1.3.1
* Tamaño total del disco/partición (kBytes): .1.3.6.1.4.1.2021.9.1.6.1
* Espacio disponible en el disco: .1.3.6.1.4.1.2021.9.1.7.1
* Espacio utilizado en el disco: .1.3.6.1.4.1.2021.9.1.8.1
* Porcentaje de espacio utilizado en disco: .1.3.6.1.4.1.2021.9.1.9.1
* Porcentaje de inodos utilizados en disco: .1.3.6.1.4.1.2021.9.1.10.1

### Tiempo de actividad

* Tiempo de actividad del sistema: .1.3.6.1.2.1.1.3.0