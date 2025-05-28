---
code_lang: java
code_lang_weight: 10
is_beta: false
private: false
title: Activar Autocompletar y Buscar para Java
type: multi-code-lang
---

## Requisitos

- [Dynamic Instrumentation][1] está activado para tu servicio.
- Biblioteca de rastreo [`dd-trace-java`][6] 1.42.0 o posterior está instalada.

## Instalación

Ejecuta tu servicio con Dynamic Instrumentation activado, Autocompletar y Buscar se activan automáticamente.

## Configuración adicional

### Desactivar Autocompletar y Buscar

Para desactivar Autocompletar y Buscar para tu servicio, utiliza la siguiente opción:

```
export DD_SYMBOL_DATABASE_UPLOAD_ENABLED=false
```

o:

```
  -Ddd.symbol.database.upload.enabled=false
```

### Detección de terceros

Si no aparecen sugerencias de autocompletar para tu paquete o módulo, es posible que se reconozca incorrectamente como código de terceros. Las funciones de Autocompletar y Buscar utilizan una heurística para filtrar el código de terceros, lo que a veces puede dar lugar a una clasificación errónea accidental.

Para asegurarte de que tu código se reconoce correctamente y para permitir la funcionalidad precisa de Autocompletar y Buscar, puedes establecer la configuración de detección de terceros utilizando las siguientes opciones:

```
export DD_THIRD_PARTY_EXCLUDES=<LIST_OF_USER_CODE_PACKAGE_PREFIXES>
export DD_THIRD_PARTY_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES>
```

o:

```
  -Ddd.third.party.excludes=<LIST_OF_USER_CODE_PACKAGE_PREFIXES> \
  -Ddd.third.party.includes=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES> \
```

Donde la lista significa una lista de prefijos de paquete separado por comas, por ejemplo

```
export DD_THIRD_PARTY_EXCLUDES=com.mycompany,io.mycompany
```

[1]: /es/dynamic_instrumentation
[6]: https://github.com/DataDog/dd-trace-java