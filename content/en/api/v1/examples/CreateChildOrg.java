import com.datadog.api.v1.client.api.OrgsApi;

public class OrgsApiExample {

    public static void main(String[] args) {
        OrgsApi apiInstance = new OrgsApi();
        OrgCreateBody body = ; // OrgCreateBody | 
        try {
            OrgCreateResponse result = apiInstance.createChildOrg(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling OrgsApi#createChildOrg");
            e.printStackTrace();
        }
    }
}