import { CustomHtmlComponent } from '../helperModules/renderer';

export const regionParamDefinition = {
  render: 'RegionParam',
  children: [],
  attributes: {
    link: {
      type: Boolean,
      default: false
    },
    key: {
      type: String,
      required: true,
      matches: [
        'dd_datacenter',
        'dd_site',
        'dd_full_site',
        'dd_site_name',
        'tcp_endpoint',
        'tcp_endpoint_port',
        'tcp_endpoint_port_ssl',
        'web_integrations_endpoint',
        'web_integrations_port',
        'web_integrations_unencrypted_port',
        'agent_http_endpoint',
        'agent_http_port',
        'http_endpoint',
        'http_port',
        'lambda_endpoint',
        'lambda_port',
        'lambda_http_endpoint',
        'lambda_http_port',
        'functions_endpoint',
        'functions_port',
        'browser_sdk_endpoint_domain',
        'aws_region',
        'aws_private_link_api_service_name',
        'aws_private_link_containers_service_name',
        'aws_private_link_logs_agent_service_name',
        'aws_private_link_logs_user_service_name',
        'aws_private_link_metrics_service_name',
        'aws_private_link_process_service_name',
        'aws_private_link_profiling_service_name',
        'aws_private_link_traces_service_name',
        'aws_private_link_dbm_service_name',
        'aws_private_link_remote_config_service_name',
        'ip_ranges_url',
        'otlp_trace_endpoint'
      ]
    },
    code: {
      type: Boolean,
      default: false
    },
    text: {
      type: String
    }
  }
};

export class RegionParam extends CustomHtmlComponent {
  render() {
    const { attributes } = this.tag;

    if (attributes.code) {
      return `<code class="cdoc js-region-param region-param" data-region-param="${attributes.key}"></code>`;
    } else if (attributes.link) {
      return `<a class="cdoc js-region-param region-param" data-region-param="${attributes.key}" href="">${attributes.text}</a>`;
    } else {
      return `<span class="cdoc js-region-param region-param" data-region-param="${attributes.key}"></span>`;
    }
  }
}
