---
app_id: amazon_gamelift
categories:
- aws
- nube
- configuración y despliegue
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon Gamelift.
title: Amazon Gamelift
---
## Información general

Amazon GameLift es un servicio totalmente gestionado para desplegar, operar y escalar tus servidores de juegos multijugador basados en sesiones en la nube.

Habilita esta integración para ver todas tus métricas de Gamelift en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Game Lift` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon GameLift](https://app.datadoghq.com/integrations/amazon-gamelift).

### Recopilación de logs

#### Activar logging

Configura Amazon GameLift para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_gamelift` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon GameLift en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.gamelift.activating_game_sessions** <br>(count) | Número medio de sesiones de juego con el estado activo.|
| **aws.gamelift.activating_game_sessions.maximum** <br>(count) | Número máximo de sesiones de juego con el estado activo.|
| **aws.gamelift.activating_game_sessions.minimum** <br>(count) | Número mínimo de sesiones de juego con el estado activo.|
| **aws.gamelift.active_game_sessions** <br>(count) | Número medio de sesiones de juego con el estado activo.|
| **aws.gamelift.active_game_sessions.maximum** <br>(count) | Número máximo de sesiones de juego con el estado activo.|
| **aws.gamelift.active_game_sessions.minimum** <br>(count) | Número mínimo de sesiones de juego con el estado activo.|
| **aws.gamelift.active_instances** <br>(count) | Número medio de instancias con el estado activo.|
| **aws.gamelift.active_instances.maximum** <br>(count) | Número máximo de instancias con el estado activo.|
| **aws.gamelift.active_instances.minimum** <br>(count) | Número mínimo de instancias con el estado activo.|
| **aws.gamelift.active_server_processes** <br>(count) | Número medio de procesos de servidor con el estado activo.|
| **aws.gamelift.active_server_processes.maximum** <br>(count) | Número máximo de procesos de servidor con el estado activo.|
| **aws.gamelift.active_server_processes.minimum** <br>(count) | Número mínimo de procesos de servidor con el estado activo.|
| **aws.gamelift.available_game_servers** <br>(count) | Servidores de juegos que están disponibles para ejecutar una partida y que no están ocupados en ese momento con juegos.|
| **aws.gamelift.available_game_sessions** <br>(count) | Número medio de ranuras de sesiones de juego con procesos activos y sanos que no se están utilizando.|
| **aws.gamelift.available_game_sessions.maximum** <br>(count) | Número máximo de ranuras de sesiones de juego con procesos activos y sanos que no se están utilizando.|
| **aws.gamelift.available_game_sessions.minimum** <br>(count) | Número mínimo de ranuras de sesiones de juego con procesos activos y sanos que no se están utilizando.|
| **aws.gamelift.average_wait_time** <br>(count) | Cantidad media de tiempo que las solicitudes de una sesión de juego han estado esperando en la cola con estado pendiente.|
| **aws.gamelift.average_wait_time.maximum** <br>(count) | Cantidad máxima de tiempo que las solicitudes de una sesión de juego han estado esperando en la cola con estado pendiente.|
| **aws.gamelift.average_wait_time.minimum** <br>(count) | Cantidad mínima de tiempo que las solicitudes de una sesión de juego han estado esperando en la cola con estado pendiente.|
| **aws.gamelift.average_wait_time.sum** <br>(count) | Suma de la cantidad de tiempo que las solicitudes de una sesión de juego han estado esperando en la cola con estado pendiente.|
| **aws.gamelift.current_player_sessions** <br>(count) | Número medio de sesiones de jugador con el estado activo o reservado.|
| **aws.gamelift.current_player_sessions.maximum** <br>(count) | Número máximo de sesiones de jugador con el estado activo o reservado.|
| **aws.gamelift.current_player_sessions.minimum** <br>(count) | Número mínimo de sesiones de jugador con el estado activo o reservado.|
| **aws.gamelift.current_player_sessions.sum** <br>(count) | Número total de sesiones de jugador con el estado activo o reservado.|
| **aws.gamelift.current_tickets** <br>(count) | Solicitudes de emparejamiento que están siendo procesadas o que esperan serlo.|
| **aws.gamelift.desired_instances** <br>(count) | Número medio de instancias activas que trabajan para mantener la flota.|
| **aws.gamelift.desired_instances.maximum** <br>(count) | Número máximo de instancias activas que trabajan para mantener la flota.|
| **aws.gamelift.desired_instances.minimum** <br>(count) | Número mínimo de instancias activas que trabajan para mantener la flota.|
| **aws.gamelift.draining_available_game_servers** <br>(count) | Servidores de juego en instancias cuya finalización está programada y que actualmente no admiten juegos.|
| **aws.gamelift.draining_utilized_game_servers** <br>(count) | Servidores de juego en instancias cuya finalización está programada y que actualmente admiten juegos.|
| **aws.gamelift.first_choice_not_viable** <br>(count) | Número medio de sesiones de juego colocadas exitosamente pero no en la flota de la primera elección ya que la flota no es viable.|
| **aws.gamelift.first_choice_not_viable.maximum** <br>(count) | Número máximo de sesiones de juego colocadas exitosamente pero no en la flota de la primera elección ya que la flota no es viable.|
| **aws.gamelift.first_choice_not_viable.minimum** <br>(count) | Número mínimo de sesiones de juego colocadas exitosamente pero no en la flota de la primera elección ya que la flota no es viable.|
| **aws.gamelift.first_choice_not_viable.sum** <br>(count) | Suma del número de sesiones de juego colocadas exitosamente pero no en la flota de la primera elección ya que la flota no es viable.|
| **aws.gamelift.first_choice_out_of_capacity** <br>(count) | Número medio de sesiones de juego colocadas exitosamente pero no en la flota de la primera elección ya que la flota no tiene recursos disponibles.|
| **aws.gamelift.first_choice_out_of_capacity.maximum** <br>(count) | Número máximo de sesiones de juego colocadas exitosamente pero no en la flota de la primera elección ya que la flota no tiene recursos disponibles.|
| **aws.gamelift.first_choice_out_of_capacity.minimum** <br>(count) | Número mínimo de sesiones de juego colocadas exitosamente pero no en la flota de la primera elección ya que la flota no tiene recursos disponibles.|
| **aws.gamelift.first_choice_out_of_capacity.sum** <br>(count) | Suma del número de sesiones de juego colocadas exitosamente pero no en la flota de la primera elección ya que la flota no tiene recursos disponibles.|
| **aws.gamelift.game_server_interruptions** <br>(count) | Servidores de juego en instancias Spot que se han interrumpido debido a la disponibilidad limitada de Spot.|
| **aws.gamelift.game_session_interruptions** <br>(count) | Número medio de sesiones de juego que se han interrumpido.|
| **aws.gamelift.game_session_interruptions.maximum** <br>(count) | Número máximo de sesiones de juego que se han interrumpido.|
| **aws.gamelift.game_session_interruptions.minimum** <br>(count) | Número mínimo de sesiones de juego que se han interrumpido.|
| **aws.gamelift.game_session_interruptions.sum** <br>(count) | Suma del número de sesiones de juego que se han interrumpido.|
| **aws.gamelift.healthy_server_processes** <br>(count) | Número medio de procesos de servidor que se encuentran en buen estado.|
| **aws.gamelift.healthy_server_processes.maximum** <br>(count) | Número máximo de procesos de servidor que se encuentran en buen estado.|
| **aws.gamelift.healthy_server_processes.minimum** <br>(count) | Número mínimo de procesos de servidor que se encuentran en buen estado.|
| **aws.gamelift.idle_instances** <br>(count) | Número medio de instancias activas que alojan 0 sesiones de juego.|
| **aws.gamelift.idle_instances.maximum** <br>(count) | Número máximo de instancias activas que alojan 0 sesiones de juego.|
| **aws.gamelift.idle_instances.minimum** <br>(count) | Número mínimo de instancias activas que alojan 0 sesiones de juego.|
| **aws.gamelift.instance_interruptions** <br>(count) | Número medio de instancias Spot que se han interrumpido.|
| **aws.gamelift.instance_interruptions.maximum** <br>(count) | Número máximo de instancias Spot que se han interrumpido.|
| **aws.gamelift.instance_interruptions.minimum** <br>(count) | Número mínimo de instancias Spot que se han interrumpido.|
| **aws.gamelift.instance_interruptions.sum** <br>(count) | Suma del número de instancias Spot que se han interrumpido.|
| **aws.gamelift.lowest_latency_placement** <br>(count) | Número medio de sesiones de juego colocadas en una región que ofrece la latencia más baja posible de la cola.|
| **aws.gamelift.lowest_latency_placement.maximum** <br>(count) | Número máximo de sesiones de juego colocadas en una región que ofrece la latencia más baja posible de la cola.|
| **aws.gamelift.lowest_latency_placement.minimum** <br>(count) | Número mínimo de sesiones de juego colocadas en una región que ofrece la latencia más baja posible de la cola.|
| **aws.gamelift.lowest_latency_placement.sum** <br>(count) | Suma del número de sesiones de juego colocadas en una región que ofrece la latencia más baja posible de la cola.|
| **aws.gamelift.lowest_price_placement** <br>(count) | Número medio de sesiones de juego colocadas en una región que ofrece el precio más bajo de la cola para la región.|
| **aws.gamelift.lowest_price_placement.maximum** <br>(count) | Número máximo de sesiones de juego colocadas en una región que ofrece el precio más bajo de la cola para la región.|
| **aws.gamelift.lowest_price_placement.minimum** <br>(count) | Número mínimo de sesiones de juego colocadas en una región que ofrece el precio más bajo de la cola para la región.|
| **aws.gamelift.lowest_price_placement.sum** <br>(count) | Suma del número de sesiones de juego colocadas en una región que ofrece el precio más bajo de la cola para la región.|
| **aws.gamelift.matches_accepted** <br>(count) | Emparejamientos aceptados exitosamente por todos los jugadores desde el último informe.|
| **aws.gamelift.matches_created** <br>(count) | Posibles emparejamientos creados desde el último informe.|
| **aws.gamelift.matches_placed** <br>(count) | Emparejamientos colocados exitosamente en una sesión de juego desde el último informe.|
| **aws.gamelift.matches_rejected** <br>(count) | Para las configuraciones de emparejamiento que requieren aceptación, los emparejamientos potenciales rechazados por al menos un jugador desde el último informe.|
| **aws.gamelift.max_instances** <br>(count) | Media del número máximo de instancias permitidas para la flota.|
| **aws.gamelift.max_instances.maximum** <br>(count) | Número máximo total de instancias permitidas para la flota.|
| **aws.gamelift.max_instances.minimum** <br>(count) | Mínimo del número máximo de instancias permitidas para la flota.|
| **aws.gamelift.min_instances** <br>(count) | Media del número mínimo de instancias permitidas para la flota.|
| **aws.gamelift.min_instances.maximum** <br>(count) | Máximo del número mínimo de instancias permitidas para la flota.|
| **aws.gamelift.min_instances.minimum** <br>(count) | Número mínimo absoluto de instancias permitidas para la flota.|
| **aws.gamelift.minimum_instances** <br>(count) | Media del número mínimo de instancias permitidas para la flota.|
| **aws.gamelift.minimum_instances.maximum** <br>(count) | Máximo del número mínimo de instancias permitidas para la flota.|
| **aws.gamelift.minimum_instances.minimum** <br>(count) | Número mínimo absoluto de instancias permitidas para la flota.|
| **aws.gamelift.percent_available_game_sessions** <br>(count) | Número medio de ranuras de sesiones de juego en todos los procesos de servidor activos que no se están utilizando.<br>_Se muestra como porcentaje_ |
| **aws.gamelift.percent_healthy_server_processes** <br>(count) | Porcentaje medio de procesos de servidor que se encuentran en buen estado.<br>_Se muestra como porcentaje_ |
| **aws.gamelift.percent_healthy_server_processes.maximum** <br>(count) | Porcentaje máximo de procesos de servidor que se encuentran en buen estado.<br>_Se muestra como porcentaje_ |
| **aws.gamelift.percent_healthy_server_processes.minimum** <br>(count) | Porcentaje mínimo de procesos de servidor que se encuentran en buen estado.<br>_Se muestra como porcentaje_ |
| **aws.gamelift.percent_idle_instances** <br>(count) | Porcentaje medio de instancias activas que están inactivas.|
| **aws.gamelift.percent_idle_instances.maximum** <br>(count) | Porcentaje máximo de instancias activas que están inactivas.|
| **aws.gamelift.percent_idle_instances.minimum** <br>(count) | Porcentaje mínimo de instancias activas que están inactivas.|
| **aws.gamelift.percent_utilized_game_servers** <br>(count) | Porción de servidores de juego que admiten actualmente ejecuciones de juegos.<br>_Se muestra como porcentaje_ |
| **aws.gamelift.placements_cancelled** <br>(count) | Número medio de solicitudes de colocación de sesiones de juego canceladas.|
| **aws.gamelift.placements_cancelled.maximum** <br>(count) | Número máximo de solicitudes de colocación de sesiones de juego canceladas.|
| **aws.gamelift.placements_cancelled.minimum** <br>(count) | Número mínimo de solicitudes de colocación de sesiones de juego canceladas.|
| **aws.gamelift.placements_cancelled.sum** <br>(count) | Suma del número de solicitudes de colocación de sesiones de juego canceladas.|
| **aws.gamelift.placements_failed** <br>(count) | Número medio de solicitudes de colocación de sesiones de juego fallidas.|
| **aws.gamelift.placements_started** <br>(count) | Número medio de solicitudes de colocación de sesiones de juego añadidas a la cola.|
| **aws.gamelift.placements_started.maximum** <br>(count) | Número máximo de solicitudes de colocación de sesiones de juego añadidas a la cola.|
| **aws.gamelift.placements_started.minimum** <br>(count) | Número mínimo de solicitudes de colocación de sesiones de juego añadidas a la cola.|
| **aws.gamelift.placements_started.sum** <br>(count) | Suma del número de solicitudes de colocación de sesiones de juego añadidas a la cola.|
| **aws.gamelift.placements_succeeded** <br>(count) | Número medio de solicitudes de colocación de sesiones de juego que han dado lugar a una nueva sesión.|
| **aws.gamelift.placements_succeeded.maximum** <br>(count) | Número máximo de solicitudes de colocación de sesiones de juego que han dado lugar a una nueva sesión.|
| **aws.gamelift.placements_succeeded.minimum** <br>(count) | Número mínimo de solicitudes de colocación de sesiones de juego que han dado lugar a una nueva sesión.|
| **aws.gamelift.placements_succeeded.sum** <br>(count) | Suma del número de solicitudes de colocación de sesiones de juego que han dado lugar a una nueva sesión.|
| **aws.gamelift.placements_timed_out** <br>(count) | Número medio de solicitudes de colocación de sesiones de juego que han alcanzado el límite de tiempo de espera de la cola.|
| **aws.gamelift.placements_timed_out.maximum** <br>(count) | Número máximo de solicitudes de colocación de sesiones de juego que han alcanzado el límite de tiempo de espera de la cola.|
| **aws.gamelift.placements_timed_out.minimum** <br>(count) | Número mínimo de solicitudes de colocación de sesiones de juego que han alcanzado el límite de tiempo de espera de la cola.|
| **aws.gamelift.placements_timed_out.sum** <br>(count) | Suma del número de solicitudes de colocación de sesiones de juego que han alcanzado el límite de tiempo de espera de la cola.|
| **aws.gamelift.player_session_activations** <br>(count) | Número medio de sesiones de jugadores que han pasado de reservadas a activas.|
| **aws.gamelift.player_session_activations.maximum** <br>(count) | Número máximo de sesiones de jugadores que han pasado de reservadas a activas.|
| **aws.gamelift.player_session_activations.minimum** <br>(count) | Número mínimo de sesiones de jugadores que han pasado de reservadas a activas.|
| **aws.gamelift.player_session_activations.sum** <br>(count) | Suma del número de sesiones de jugadores que han pasado de reservadas a activas.|
| **aws.gamelift.players_started** <br>(count) | Jugadores en registros de emparejamiento añadidos desde el último informe.|
| **aws.gamelift.queue_depth** <br>(count) | Número medio de solicitudes de colocación de sesiones de juego en la cola con el estado pendiente.|
| **aws.gamelift.queue_depth.maximum** <br>(count) | Número máximo de solicitudes de colocación de sesiones de juego en la cola con el estado pendiente.|
| **aws.gamelift.queue_depth.minimum** <br>(count) | Número mínimo de solicitudes de colocación de sesiones de juego en la cola con el estado pendiente.|
| **aws.gamelift.queue_depth.sum** <br>(count) | Suma del número de solicitudes de colocación de sesiones de juego en la cola con el estado pendiente.|
| **aws.gamelift.rule_evaluations_failed** <br>(count) | Evaluaciones de reglas durante el emparejamiento que han fallado desde el último informe. Esta métrica se limita a las 50 reglas principales.|
| **aws.gamelift.rule_evaluations_passed** <br>(count) | Evaluaciones de reglas durante el emparejamiento que han sido aprobadas desde el último informe. Esta métrica se limita a las 50 reglas principales.|
| **aws.gamelift.server_process_abnormal_terminations** <br>(count) | Número medio de procesos de servidor que se han cerrado debido a circunstancias anormales.|
| **aws.gamelift.server_process_abnormal_terminations.maximum** <br>(count) | Número máximo de procesos de servidor que se han cerrado debido a circunstancias anormales.|
| **aws.gamelift.server_process_abnormal_terminations.minimum** <br>(count) | Número mínimo de procesos de servidor que se han cerrado debido a circunstancias anormales.|
| **aws.gamelift.server_process_abnormal_terminations.sum** <br>(count) | Suma del número de procesos de servidor que se han cerrado debido a circunstancias anormales.|
| **aws.gamelift.server_process_activations** <br>(count) | Número medio de procesos de servidor que se han activado.|
| **aws.gamelift.server_process_activations.maximum** <br>(count) | Número máximo de procesos de servidor que se han activado.|
| **aws.gamelift.server_process_activations.minimum** <br>(count) | Número mínimo de procesos de servidor que se han activado.|
| **aws.gamelift.server_process_activations.sum** <br>(count) | Suma del número de procesos de servidor que se han activado.|
| **aws.gamelift.server_process_terminations** <br>(count) | Número medio de procesos de servidor que se han finalizado.|
| **aws.gamelift.server_process_terminations.maximum** <br>(count) | Número máximo de procesos de servidor que se han finalizado.|
| **aws.gamelift.server_process_terminations.minimum** <br>(count) | Número mínimo de procesos de servidor que se han finalizado.|
| **aws.gamelift.server_process_terminations.sum** <br>(count) | Suma del número de procesos de servidor que se han finalizado.|
| **aws.gamelift.tickets_failed** <br>(count) | Solicitudes de emparejamiento que han fallado desde el último informe.|
| **aws.gamelift.tickets_started** <br>(count) | Nuevas solicitudes de emparejamiento creadas desde el último informe.|
| **aws.gamelift.tickets_timed_out** <br>(count) | Solicitudes de emparejamiento que han alcanzado el límite de tiempo de espera desde el último informe.|
| **aws.gamelift.time_to_match** <br>(gauge) | Para las solicitudes de emparejamiento colocadas en un emparejamiento potencial antes del último informe, el tiempo transcurrido entre la creación del registro y la creación del emparejamiento potencial.<br>_Se muestra como segundos_ |
| **aws.gamelift.time_to_ticket_cancel** <br>(gauge) | Para las solicitudes de emparejamiento canceladas antes del último informe, el tiempo transcurrido entre la creación de la solicitud y su cancelación.<br>_Se muestra como segundos_ |
| **aws.gamelift.time_to_ticket_success** <br>(gauge) | Para las solicitudes de emparejamiento que han tenido éxito antes del último informe, el tiempo transcurrido entre la creación del registro y la colocación exitosa del emparejamiento.<br>_Se muestra como segundos_ |
| **aws.gamelift.utilized_game_servers** <br>(count) | Servidores de juego que están actualmente ocupados con juegos.|

### Eventos

La integración de Amazon GameLift no incluye ningún evento.

### Checks de servicio

La integración de Amazon GameLift no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).