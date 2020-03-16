import com.datadog.api.v2.client.api.TagsApi;

public class TagsApiExample {

    public static void main(String[] args) {
        TagsApi apiInstance = new TagsApi();
        String hostName = hostName_example; // String | This endpoint allows you to update/replace all in an integration source with those supplied in the request.
        HostTags body = ; // HostTags | 
        String source = source_example; // String | The source of the tags (e.g. chef, puppet). [Complete list of source attribute values](https://docs.datadoghq.com/integrations/faq/list-of-api-source-attribute-value)
        try {
            HostTags result = apiInstance.updateHostTags(hostName, body, source);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling TagsApi#updateHostTags");
            e.printStackTrace();
        }
    }
}