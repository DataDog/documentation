Para utilizar la fuente Google Pub/Sub de Observability Pipelines, necesitas disponer de la siguiente información:

- La fuente Google Pub/Sub requiere una suscripción Pub/Sub.
- El worker utiliza los métodos de autenticación estándar de Google. Consulta [Métodos de autenticación en Google][10022] para obtener más información sobre cómo elegir el método de autenticación para tu uso caso.
- Utiliza `roles/pubsub.subscriber` para el rol Pub/Sub IAM. Consulta [Roles Pub/Sub disponibles][10023] para obtener más información.

[10022]: https://cloud.google.com/docs/authentication#auth-flowchart
<!-- El enlace 10022 también se utiliza en layouts/shortcodes/observability_pipelines/source_settings/google_pubsub.en.md -->
[10023]: https://cloud.google.com/pubsub/docs/access-control#roles