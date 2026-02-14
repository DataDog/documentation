---
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas con la protección de aplicaciones y API
title: Creación de aplicaciones Go para App and API Protection
---

Los requisitos de instalación de App and API Protection para Go pueden ser abstractos y la compilación cruzada de la cadena de herramientas Go
y las capacidades de CGO pueden dificultar la comprensión de los pasos precisos de instalación.

El objetivo de esta guía es proporcionar una guía paso a paso para un archivo Docker activo personalizado para tu caso de uso.

## Recorrido

Muchos de los archivos Docker que se encuentran en esta guía provienen del repositorio [appsec-go-test-app][4]. Para probarlo, primero clona el repositorio:

```sh
git clone https://github.com/DataDog/appsec-go-test-app.git
cd appsec-go-test-app
```

Puedes encontrar una lista de ejemplos de `Dockerfile` en el directorio [`examples/docker`][3].
Este es un ejemplo en su forma más simple:

```dockerfile
FROM golang:1.25.7 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion # Resolved from go.mod dependencies

RUN orchestrion go build -o=main .

FROM debian:bookworm
COPY --from=build /app/main /usr/local/bin

ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

Esta es la versión más simple de un archivo Docker activo para una aplicación de Go habilitada para Datadog WAF. Si es la primera vez que usas [Orchestrion][5], ten en cuenta que este archivo Docker requiere que ejecutes `orchestrion pin` de antemano y confirmes los cambios resultantes. Consulta [Introducción a Go][6].

Este archivo Docker se divide en dos etapas:
1. La fase de compilación utiliza una imagen Debian para compilar la aplicación Go, y utiliza la herramienta [Orchestrion][5] para instrumentar la aplicación con las funciones de App and API Protection.
2. La fase de tiempo de ejecución copia la aplicación integrada en una imagen mínima de Ubuntu y establece la variable de entorno `DD_APPSEC_ENABLED` en `true` para activar App and API Protection.

Este proceso de compilación en dos fases te permite mantener la imagen final pequeña y libre de herramientas de compilación innecesarias, al tiempo que garantiza que tu aplicación está instrumentada correctamente para App and API Protection.

Las siguientes secciones muestran diferentes escenarios de archivo Docker, cada uno con sus consideraciones específicas y ejemplos completos.

## Escenarios de archivos Docker

Hay dos dimensiones principales que influyen en la elección de archivo Docker para App and API Protection:
* **Implementación de libc**: glibc (Debian/Ubuntu) o musl (Alpine)
* **CGO**: activado o desactivado (con la variable de entorno `CGO_ENABLED`).

Estas dimensiones afectan tanto a los requisitos de compilación como a la compatibilidad en tiempo de ejecución. El WAF de Datadog requiere bibliotecas compartidas específicas (`libc.so.6`, `libpthread.so.0` y `libdl.so.2`) en tiempo de ejecución y el enfoque de compilación varía en función de estas opciones. Estas dependencias son necesarias para todos los programas creados con CGO activado, por lo que el WAF de Datadog funcionará de forma inmediata en entornos de ejecución que admitan dichos programas. 

Sin embargo, cuando CGO está deshabilitado, en general, Go produce un binario enlazado estáticamente por completo que no requiere estas bibliotecas, pero esto no es cierto cuando se utiliza el WAF de Datadog. Esta es la razón por la que, cuando CGO está deshabilitado, es necesario pasar el indicador `-tags=appsec` para habilitar el WAF de Datadog.

### Archivo Docker estándar basado en glibc

Este es el método recomendado para la mayoría de los usuarios, que utilizan imágenes basadas en Debian/Ubuntu:

```dockerfile
FROM golang:1.25.7 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion
RUN orchestrion go build -o=main .

FROM ubuntu:noble

COPY --from=build /app/main /usr/local/bin
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**Consideraciones clave:**
* Utiliza [Orchestrion][5] para la instrumentación en tiempo de compilación.
* CGO está activado por defecto, proporcionando las bibliotecas compartidas necesarias
* El tiempo de ejecución utiliza la misma implementación de libc (glibc) que la fase de compilación
* No se necesitan paquetes adicionales en la fase de tiempo de ejecución

### Tiempo de ejecución de Glibc-built y Alpine

Si necesitas CGO, pero quieres una imagen de tiempo de ejecución más ligera, compila con una imagen basada en Debian y ejecútala con Alpine:

```dockerfile
FROM golang:1.25.7 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion
RUN orchestrion go build -o=main .

FROM alpine

COPY --from=build /app/main /usr/local/bin/main
RUN apk add libc6-compat
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**Consideraciones clave:**
* No es necesario crear `appsec` 
* `apk add libc6-compat` añade enlaces simbólicos donde sea necesario para que un binario compilado con glibc funcione en Alpine.
* Esta configuración puede requerir la instalación de más paquetes en tiempo de ejecución si otras bibliotecas además de Datadog utilizan CGO

### Archivo Docker basado en Alpine (CGO desactivado)

Para minimizar el tamaño de la compilación y el tiempo de ejecución, utiliza compilaciones deshabilitadas para CGO (el valor predeterminado en Alpine):

```dockerfile
FROM golang:1.25.7-alpine AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion
RUN orchestrion go build -tags=appsec -o=main .

FROM alpine

COPY --from=build /app/main /usr/local/bin/main
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**Consideraciones clave:**
* Requiere el indicador `-tags=appsec` cuando CGO está desactivado

### Archivo Docker mínimo con extracción de bibliotecas

Para imágenes ultra minimalistas cuando se utiliza `CGO_ENABLED=0`:

```dockerfile
FROM golang:1.25.7 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion

# Build with appsec tag for CGO-disabled builds
ENV CGO_ENABLED=0
RUN orchestrion go build -tags=appsec -o=main .

# Install ldd and extract shared libraries that are necessary at runtime
RUN apt update && apt install -y binutils
RUN ldd main | tr -s '[:blank:]' '\n' | grep '^/' | \
      xargs -I % sh -c 'mkdir -p $(dirname libs%); cp % libs%;'

FROM scratch
COPY --from=build /app/libs /app/main /
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/main" ]
```

**Consideraciones clave:**
* Requiere el indicador `-tags=appsec` cuando CGO está desactivado
* Debes extraer y copiar manualmente las bibliotecas compartidas necesarias
* El resultado es el tamaño de imagen más pequeño posible
* El comando `ldd` identifica todas las dependencias en tiempo de ejecución

### Archivo Docker sin distribución

Para despliegues centrados en la seguridad mediante imágenes [sin distribución de Google][7]:

```dockerfile
FROM golang:1.25.7 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion

ENV CGO_ENABLED=0
RUN orchestrion go build -tags=appsec -o=main .

# Install ldd and extract shared libraries
RUN apt update && apt install -y binutils
RUN ldd main | tr -s '[:blank:]' '\n' | grep '^/' | \
      xargs -I % sh -c 'mkdir -p $(dirname libs%); cp % libs%;'

FROM gcr.io/distroless/base-debian12:nonroot
COPY --from=build /app/libs /app/main /
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/main" ]
```

**Consideraciones clave:**
* Aumenta la seguridad al eliminar los gestores de paquetes y los shells.
* Requiere una extracción de bibliotecas similar a la del enfoque scratch
* Se ejecuta por defecto como usuario no raíz
* Mantiene la compatibilidad con las bibliotecas compartidas basadas en glibc.

### Archivo Docker con compilación cruzada

Para crear aplicaciones destinadas a diferentes arquitecturas:

```dockerfile
FROM golang:1.25.7 AS build
# Install cross-compilation toolchain
RUN apt-get update && apt-get install -y gcc-aarch64-linux-gnu

WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion

# Cross-compile for ARM64
ENV CGO_ENABLED=1 CC=aarch64-linux-gnu-gcc GOOS=linux GOARCH=arm64
RUN orchestrion go build -o=main .

FROM arm64v8/debian
COPY --from=build /app/main /usr/local/bin
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**Consideraciones clave:**
* Requiere la instalación de la cadena de herramientas de compilación cruzada adecuada.
* Debes configurar las variables de entorno `CC`, `GOOS` y `GOARCH` 
* La fase de tiempo de ejecución debe coincidir con la arquitectura de destino
* CGO debe estar activado para una correcta integración con WAF

## Pruébalo

La mayoría de estos archivos Docker están disponibles en [appsec-go-test-app][4], probarlos es muy fácil:

```sh
docker build -f ./examples/alpine/Dockerfile -t appsec-go-test-app .
docker run appsec-go-test-app
```

### Verifica tu configuración

Para comprobar que App and API Protection funciona correctamente:

Para ver la detección de amenazas de App and API Protection en acción, envía patrones de ataque conocidos a tu aplicación. Por ejemplo, activa la regla [Security Scanner Detected][9] ejecutando un archivo que contenga el siguiente script curl:
<div>
<pre><code>for ((i=1;i<=250;i++)); <br>do<br># Target existing service’s routes<br>curl https://your-application-url/existing-route -A Arachni/v1.0;<br># Target non existing service’s routes<br>curl https://your-application-url/non-existing-route -A Arachni/v1.0;<br>done</code></pre></div>

Unos minutos después de activar tu aplicación y probarla, **la información sobre amenazas aparece en el [Application Trace and Signals Explorer][8] en Datadog**.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/setup/compatibility/go
[3]: https://github.com/DataDog/appsec-go-test-app/blob/main/examples/docker
[4]: https://github.com/DataDog/appsec-go-test-app
[5]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=compiletimeinstrumentation
[6]: /es/security/application_security/setup/go/setup
[7]: https://github.com/GoogleContainerTools/distroless
[8]: https://app.datadoghq.com/security/appsec
[9]: /es/security/default_rules/security-scan-detected/