---
title: Roles y permisos
---

A los miembros de un equipo Cloudcraft se les pueden asignar uno de los tres diferentes roles de usuario:

- Propietario de cuenta
- Administrador
- Usuario

## Roles y permisos de usuario predeterminados

**Nota**: Para conceder acceso de sólo lectura a los planos, puedes crear un enlace de plano compartible e incorporar el plano a una página wiki interna.

### Propietario de cuenta

El propietario de cuenta tiene acceso a todo el contenido en tu cuenta de Cloudcraft y es el único rol que puede cambiar la configuración de las suscripciones, o ver y cambiar la información de facturación.

Por defecto, una persona con una suscripción de pago de Cloudcraft es propietaria de la cuenta. Para asignar el rol a otros miembros de tu equipo, [ponte en contacto con el servicio de asistencia][1].

**Permisos:**

- Crear, editar y eliminar planos privados y compartidos por equipos
- Gestionar parámetros de suscripciones
- Gestionar parámetros de inicio de sesión único (SSO) (Enterprise)
- Gestionar parámetros de equipo
  - Crear nuevos equipos (Empresa)
  - Invitar a nuevos administradores y usuarios
  - Eliminar administradores y usuarios
  - Revocar invitaciones para unirse a tu equipo Cloudcraft
- Gestionar cuentas de AWS 
  - Conectar nuevas cuentas de AWS 
  - Eliminar cuentas de AWS 
  - Gestionar cuentas de AWS compartidas por equipos
- Gestionar claves de API
  - Crear claves de API
  - Eliminar claves de API
  - Gestionar claves de API compartidas por equipos

### Administrador

Los administradores son el segundo rol con más privilegios en Cloudcraft y tienen acceso a todo el contenido, excepto la facturación y las informaciones sobre suscripciones.

Este rol es para jefes de proyecto que necesitan permiso para gestionar sus equipos o subequipos en Cloudcraft.

**Permisos:**

- Crear, editar y eliminar planos privados y compartidos por equipos
- Gestionar parámetros de equipo (para los equipos que tengan asignados)
  - Invitar a nuevos administradores y usuarios
  - Eliminar administradores y usuarios
  - Revocar invitaciones para unirse a tu equipo Cloudcraft
- Gestionar cuentas de AWS 
  - Conectar nuevas cuentas de AWS 
  - Eliminar cuentas de AWS 
  - Gestionar cuentas de AWS compartidas por equipos
- Gestionar claves de API
  - Crear claves de API
  - Eliminar claves de API
  - Gestionar claves de API compartidas por equipos

### Usuario

Los usuarios son el tipo de rol con menos privilegios en Cloudcraft. Los usuarios son miembros de equipos con los que pueden compartir planos, colaborar en cuentas de AWS y, en general, trabajar juntos.

**Permisos:**

- Crear, editar y eliminar planos privados y compartidos por equipos
- Obtener un acceso de sólo visualización al equipo del que son miembros
- Analizar en directo cuentas de AWS que un propietario o administrador de cuenta compartieron con sus equipos
- Obtener un acceso de sólo visualización a la existencia de claves de API (no pueden generar ni visualizar claves de API activas)

## Equipos interorganizacionales

Para los clientes Enterprise, Cloudcraft también ofrece la posibilidad de crear equipos interorganizacionales. Los miembros de un equipo interorganizacional se añaden a la lista de miembros de cada equipo no interorganizacional y heredan sus roles interorganizacionales, a menos que ya sean miembros de otro equipo.

El siguiente es un ejemplo que ayuda a entender mejor:

- Ejemplo de empresa
  - Equipo interorganizacional 1
    - Usuario 1
  - Equipo 2
    - Usuario 2
    - [Usuario 1 del equipo interorganizacional 1]
  - Equipo 3
    - Usuario 3
    - Usuario 1
    - [Usuario 1 del equipo interorganizacional 1, pero la membresía explícita determina el rol del equipo]

En este ejemplo, si el "Equipo 1" es un equipo de auditoría con miembros de sólo lectura, el "Usuario 1" tendrá implícitamente acceso de sólo lectura al "Equipo 2", mientras que el rol asignado explícitamente al usuario en el "Equipo 3" tendrá prioridad.

[1]: https://app.cloudcraft.co/support
[2]: https://app.cloudcraft.co/app/support