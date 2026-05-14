const SUGGESTED_QUESTIONS = [
    'What is the Datadog Agent?',
    'How to define a Datadog monitor in Terraform (example)?',
    'Which OpenTelemetry semantic conventions should I use for LLM traces in Datadog?',
    'How do I install the Datadog Agent on a Linux host?',
    'What are Datadog API and application keys, and how do I create them?',
    'How do I tag my infrastructure in Datadog?',
    'How do I set up APM tracing for a Python application?',
    'What is the difference between a service, a resource, and a trace in Datadog APM?',
    'How do I send logs from a Docker container to Datadog?',
    'How do I create a log processing pipeline to parse custom logs?',
    'How do I monitor Kubernetes clusters with Datadog?',
    'How do I set up the AWS integration with Datadog?',
    'How do I create a metric monitor with alert conditions in Datadog?',
    'What monitor types are available in Datadog?',
    'How do I build a custom dashboard with template variables?',
    'How do I create a Synthetic API test to monitor an endpoint?',
    'How do I set up Real User Monitoring (RUM) for a web application?',
    'How do I monitor AWS Lambda functions with Datadog?',
    'How do I enable Continuous Profiler for a Java service?',
    'How do I trace LLM application calls with Datadog LLM Observability?',
    'How do I create a Service Level Objective (SLO) in Datadog?',
    'How do I send OpenTelemetry traces to Datadog?',
    'How do I track AWS cloud costs in Datadog?'
];

export function pickQuestions() {
    const indexes = new Set();
    // Pick 3 random distinct indexes
    while (indexes.size < 3) indexes.add(Math.floor(Math.random() * SUGGESTED_QUESTIONS.length));
    return [...indexes].map((index) => SUGGESTED_QUESTIONS[index]);
}
