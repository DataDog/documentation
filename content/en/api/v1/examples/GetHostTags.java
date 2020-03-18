import com.datadog.api.v1.client.api.TagsApi;

public class TagsApiExample {

    public static void main(String[] args) {
        TagsApi apiInstance = new TagsApi();
        String hostName = hostName_example; // String | When specified, filters list of tags to those tags with the specified source.
        String source = source_example; // String | Source to filter
        try {
            HostTags result = apiInstance.getHostTags(hostName, source);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling TagsApi#getHostTags");
            e.printStackTrace();
        }
    }
}