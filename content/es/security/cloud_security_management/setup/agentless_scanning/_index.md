---
aliases:
- /es/security/agentless_scanning
- /es/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: Documentación
  text: Más información sobre Cloud Security Vulnerabilities
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentación
  text: Configurar Sensitive Data Scanner para el almacenamiento en la nube
title: Cloud Security Agentless Scanning
---

## Información general

Agentless Scanning proporciona visibilidad de las vulnerabilidades que existen en tu infraestructura en la nube, sin necesidad de instalar el Datadog Agent . Datadog recomienda activar Agentless Scanning como primer paso para obtener una visibilidad completa de tus recursos en la nube y luego instalar el Datadog Agent en tus activos principales con el tiempo para obtener un contexto de seguridad y observabilidad más profundo.

## Cómo funciona

Después de [configurar el Agentless scanning][1] para tus recursos, Datadog programa escaneos automatizados en intervalos de 12 horas a través de la [Configuración remota][2]. Durante un ciclo de escaneo, los escáneres Agentless recopilan dependencias de código Lambda y crean snapshots de tus instancias de VM. Con estos snapshots, los escáneres Agentless escanean, generan y transmiten una lista de paquetes a Datadog para check en busca de vulnerabilidades, junto con dependencias de código Lambda. Una vez finalizados los escaneos de un snapshot, se elimina el snapshot. Nunca se transmite información personal confidencial o privada fuera de tu infraestructura.

Si tienes configurados [Filtros de evaluación de seguridad en la nube][15], Agentless Scanning respeta estos filtros y solo explora los recursos que coinciden con los criterios configurados.

El siguiente diagrama ilustra el funcionamiento de Agentless Scanning:

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagrama que muestra el funcionamiento de Agentless Scanning" width="90%" >}}

1. Datadog programa un análisis y determina qué recursos analizar mediante configuración remota.

    **Nota**: Los análisis programados ignoran hosts que ya tienen el [Datadog Agent instalado con Cloud Security habilitado](#agentless-scanning-with-existing-Agent-installations). Datadog programa nuevos análisis continuos de los recursos cada 12 horas para proporcionar información actualizada sobre vulnerabilidades y debilidades potenciales.

2. Para las funciones Lambda, los analizadores obtienen el código de la función.
3. El escáner crea snapshots de volúmenes utilizados en instancias de VM en ejecución. Estos snapshots sirven como base para realizar escaneos. Utilizando los snapshots, o el código, el escáner genera un lista de paquetes.
4. Una vez finalizado el escaneado, la lista de paquetes y la información relacionada con los hosts recopilados se transmiten a Datadog, mientras que el resto de los datos permanece dentro de tu infraestructura. Los snapshots creados durante el ciclo de escaneado se eliminan.
5. Aprovechando la lista de paquetes recopilados junto con el acceso de Datadog a la base de datos de vulnerabilidades de Trivy, Datadog encuentra las vulnerabilidades afectadas coincidentes en tus recursos y tu código.

**Notas**:
- El escáner funciona como una instancia de VM independiente dentro de tu infraestructura, lo que garantiza un impacto mínimo en los sistemas y recursos existentes.
- Para AWS, las instancias de escáner se escalan automáticamente en función de la carga de trabajo. Cuando no hay recursos que escanear, los escáneres se escalan a cero para minimizar los costes del proveedor de la nube.
- El analizador recopila de forma segura una lista de paquetes de tus hosts, sin transmitir ninguna información personal confidencial o privada fuera de tu infraestructura.
- El escáner limita su uso de la API del proveedor de la nube para evitar alcanzar cualquier límite de velocidad y utiliza un backoff exponencial si es necesario.

## On-demand scanning

Por defecto, Agentless Scanning analiza automáticamente los recursos cada 12 horas. También puedes activar un análisis inmediato de un recurso específico (host, contenedor, función de Lambda o bucket de S3) mediante la API On-Demand Scanning.

Esto es útil cuando se necesita:
- Verificar que una vulnerabilidad ha sido parcheada
- Obtener resultados inmediatos de los recursos recién desplegados
- Validar la postura de seguridad antes del despliegue en producción

Para más información, consulta la [Documentación de la API On-Demand Scanning][14].

## Datos que se envían a Datadog
El analizador Agentless utiliza el formato OWASP [cycloneDX][3] para transmitir una lista de paquetes a Datadog. Nunca se transmite información personal confidencial o privada fuera de tu infraestructura.

Datadog **no** envía:
- Configuraciones de sistemas y paquetes 
- Claves de cifrado y certificados
- Logs y registros de auditoría
- Datos empresariales sensibles

## Cuestiones de seguridad

Dado que las instancias de escáner conceden [permisos][4] para crear y copiar snapshots y describir volúmenes, Datadog aconseja restringir el acceso a estas instancias únicamente a los usuarios administrativos.

Para reducir aún más este riesgo, Datadog aplica las siguientes medidas de seguridad:

- El analizador de Datadog funciona _dentro_ de tu infraestructura, garantizando que todos los datos, incluidos los snapshots y la lista de paquetes, permanecen aislados y seguros.
- Toda la transmisión de datos entre el analizador y Datadog se cifra mediante protocolos estándar del sector (como HTTPS) para garantizar la confidencialidad e integridad de los datos.
- El analizador de Datadog opera bajo el principio de mínimo privilegio. Esto significa que sólo se conceden los permisos mínimos necesarios para realizar eficazmente las funciones deseadas.
- Datadog revisa y limita cuidadosamente los permisos concedidos al analizador para garantizar que pueda realizar análisis sin acceder innecesariamente a datos o recursos confidenciales.
- Las actualizaciones de seguridad no supervisadas están habilitadas en las instancias del analizador de Datadog. Esta función automatiza el proceso de instalación de parches y actualizaciones de seguridad críticos sin necesidad de una intervención manual.
- Las instancias de escáner de Datadog se rotan automáticamente cada 24 horas. Esta rotación garantiza que las instancias de escáner se actualicen continuamente con las últimas imágenes de Ubuntu.
- El acceso a las instancias del analizador está estrictamente controlado mediante el uso de grupos de seguridad. No se permite el acceso entrante al analizador, lo que restringe la posibilidad de comprometer la instancia.
- Nunca se transmite información personal confidencial o privada fuera de tu infraestructura.

## Agentless Scanning con instalaciones existentes del Agent 

Una vez instalado, el Datadog Agent ofrece una visibilidad profunda y en tiempo real de los riesgos y las vulnerabilidades existentes en tus cargas de trabajo en la nube. Se recomienda instalar completamente el Datadog Agent.

Como resultado, Agentless Scanning excluye de tus análisis los recursos que tienen instalado y configurado el Datadog Agent para [Vulnerability Management][5]. De este modo, Cloud Security te ofrece una visibilidad completa de tu panorama de riesgos sin anular las ventajas de la instalación del Datadog Agent con Vulnerability Management.

El siguiente diagrama muestra cómo funciona Agentless Scanning con las instalaciones existentes del Agent:

{{< img src="/security/agentless_scanning/agentless_existing.png" alt="Diagrama que muestra cómo funciona Agentless Scanning cuando el Agent ya está instalado con Cloud Security Vulnerability Management" width="90%" >}}

## Análisis del almacenamiento en la nube

{{< callout url="https://www.datadoghq.com/product-preview/data-security" >}}
  La capacidad de escaneo para buckets de Amazon S3 e instancias RDS está en vista previa. Para inscribirte, haz clic en <strong>Request Access</strong> (Solicitar acceso).
{{< /callout >}}

Si tienes habilitado [Sensitive Data Scanner][8], puedes catalogar y clasificar los datos confidenciales en tus buckets de Amazon S3.

Sensitive Data Scanner escanea en busca de datos confidenciales desplegando [escáneres sin agent][1] en tus entornos en la nube. Estas instancias de escaneo recuperan una lista de todos los buckets de S3 a través de la [Configuración remota][10] y tienen establecidas instrucciones para escanear archivos de texto, como CSV y JSON, a lo largo del tiempo. Sensitive Data Scanner aprovecha su [biblioteca completa de reglas][11] para encontrar coincidencias. Cuando se encuentra una coincidencia, la instancia de escaneo envía la ubicación de la coincidencia a Datadog. Los almacenes de datos y sus archivos solo se leen en tu entorno; no se envía ningún dato confidencial a Datadog.

Además de mostrar las coincidencias de datos confidenciales, Sensitive Data Scanner muestra cualquier problema de seguridad detectado por [Cloud Security][9] que afecte a los almacenes de datos confidenciales. Puedes hacer clic en cualquier problema para continuar con la clasificación y la corrección dentro de Cloud Security.

## Coste del proveedor de servicio en la nube

Cuando se utiliza Agentless Scanning, existen costos adicionales del proveedor de la nube para ejecutar los escáneres y analizar tus entornos de la nube.

Tu configuración de la nube afecta a los costos de tu proveedor de la nube. Normalmente, utilizando la [configuración recomendada][13], estos oscilan en torno a 1 USD por host escaneado y por año. Consulta la información de tu proveedor de la nube para conocer los importes exactos, que están sujetos a cambios sin la participación de Datadog.

Para grandes cargas de trabajo en la nube distribuidas en varias regiones, Datadog recomienda configurar [Agentless Scanning con Terraform][6] para evitar la creación de redes entre regiones.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/setup/agentless_scanning#setup
[2]: /es/remote_configuration
[3]: https://cyclonedx.org/
[4]: /es/security/cloud_security_management/setup/agentless_scanning/enable#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: #terraform
[7]: mailto:success@datadoghq.com
[8]: /es/security/sensitive_data_scanner
[9]: /es/security/cloud_security_management
[10]: /es/remote_configuration
[11]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods#recommended-configuration
[14]: /es/api/latest/agentless-scanning/#create-aws-on-demand-task
[15]: /es/security/cloud_security_management/guide/resource_evaluation_filters