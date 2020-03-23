import com.datadog.api.v1.client.api.TagsApi;

public class TagsApiExample {

    public static void main(String[] args) {
        TagsApi apiInstance = new TagsApi();
        String hostName = hostName_example; // String | This endpoint allows you to add new tags to a host, optionally specifying where the tags came from.
        HostTags body = ; // HostTags | 
        String source = source_example; // String | The source of the tags (e.g. chef, puppet).
[Complete list of source attribute values](https://docs.datadoghq.com/integrations/faq/list-of-api-source-attribute-value)
        try {
            HostTags result = apiInstance.addToHostTags(hostName, body, source);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling TagsApi#addToHostTags");
            e.printStackTrace();
        }
    }
}